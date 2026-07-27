/**
 * CLI for interacting with private-employee-access-card contract
 */
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { WebSocket } from 'ws';
import { Buffer } from 'node:buffer';

import { findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { resolveNetwork, getOrCreateSeed, getDeployment } from './network';
import { createWallet, persistWalletState, unshieldedToken, type WalletContext } from './wallet';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';

globalThis.WebSocket = WebSocket;

const PRIVATE_STATE_ID = 'privateEmployeeAccessCardPrivateState';

const { network, config: networkConfig } = resolveNetwork();
const SEED = getOrCreateSeed(network);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const zkConfigPath = path.resolve(__dirname, '..', 'contracts', 'managed', 'private-employee-access-card');

const contractPath = path.join(zkConfigPath, 'contract', 'index.js');

if (!fs.existsSync(contractPath)) {
  console.error('\n❌ Contract not compiled! Run: npm run compile\n');
  process.exit(1);
}

const ContractModule = await import(pathToFileURL(contractPath).href);

const compiledContract = CompiledContract.make('private-employee-access-card', ContractModule.Contract).pipe(
  CompiledContract.withVacantWitnesses,
  CompiledContract.withCompiledFileAssets(zkConfigPath),
);

async function createProviders(walletCtx: WalletContext) {
  const privateStatePassword = process.env.PRIVATE_STATE_PASSWORD?.trim() || 'Local-Devnet-Development-Placeholder-1';

  const walletProvider = {
    getCoinPublicKey: () => walletCtx.shieldedSecretKeys.coinPublicKey,
    getEncryptionPublicKey: () => walletCtx.shieldedSecretKeys.encryptionPublicKey,
    async balanceTx(tx: any, ttl?: Date) {
      const recipe = await walletCtx.wallet.balanceUnboundTransaction(
        tx,
        { shieldedSecretKeys: walletCtx.shieldedSecretKeys, dustSecretKey: walletCtx.dustSecretKey },
        { ttl: ttl ?? new Date(Date.now() + 30 * 60 * 1000) },
      );
      return walletCtx.wallet.finalizeRecipe(recipe);
    },
    submitTx: (tx: any) => walletCtx.wallet.submitTransaction(tx) as any,
  };

  const zkConfigProvider = new NodeZkConfigProvider(zkConfigPath);
  const accountId = walletCtx.unshieldedKeystore.getBech32Address().toString();

  return {
    privateStateProvider: levelPrivateStateProvider({
      privateStateStoreName: 'private-employee-access-card-state',
      accountId,
      privateStoragePasswordProvider: () => privateStatePassword,
    }),
    publicDataProvider: indexerPublicDataProvider(networkConfig.indexer, networkConfig.indexerWS),
    zkConfigProvider,
    proofProvider: httpClientProofProvider(networkConfig.proofServer, zkConfigProvider),
    walletProvider,
    midnightProvider: walletProvider,
  };
}

async function main() {
  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║       Private Employee Access Card - Interactive CLI         ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  const rl = createInterface({ input: stdin, output: stdout });

  const deployment = getDeployment(network);
  if (!deployment) {
    console.error('No deployment found for network ' + network + '. Run 
pm run setup -- --network ' + network + ' first.');
    process.exit(1);
  }
  console.log('  Contract Address: ' + deployment.address);
  console.log('  Target Network:   ' + network + '\n');

  try {
    console.log('  Connecting wallet & syncing state...');
    const walletCtx = await createWallet({ network, networkConfig, seed: SEED });
    const state = await walletCtx.wallet.waitForSyncedState();
    await persistWalletState(network, walletCtx);

    const balance = state.unshielded.balances[unshieldedToken().raw] ?? 0n;
    console.log('  tNIGHT balance: ' + balance.toLocaleString() + '\n');

    console.log('  Connecting to contract on Midnight Network...');
    const providers = await createProviders(walletCtx);

    const deployed: any = await findDeployedContract(providers, {
      compiledContract: compiledContract as any,
      contractAddress: deployment.address,
      privateStateId: PRIVATE_STATE_ID,
      initialPrivateState: {},
    });

    console.log('  ✅ Connected successfully!\n');

    let running = true;
    while (running) {
      console.log('─── Main Menu ──────────────────────────────────────────────────');
      console.log('  1. Read Public Ledger Access State');
      console.log('  2. Verify Zone Access Privately (Zero-Knowledge Proof)');
      console.log('  3. Issue New Employee Access Card (Admin)');
      console.log('  4. Update Facility Clearance Policy (Admin)');
      console.log('  5. Check Wallet Balances');
      console.log('  6. Exit\n');

      const choice = await rl.question('  Select option [1-6]: ');

      switch (choice.trim()) {
        case '1': {
          console.log('\n  Reading public ledger state...');
          try {
            const contractState = await providers.publicDataProvider.queryContractState(deployment.address);
            if (contractState) {
              const ledgerState = ContractModule.ledger(contractState.data);
              console.log('\n  ═════ Public Ledger State ═════');
              console.log('  Company ID:            ' + Buffer.from(ledgerState.companyId).toString());
              console.log('  Issued Cards Count:    ' + ledgerState.issuedCardsCount);
              console.log('  Access Grants Count:   ' + ledgerState.accessGrantsCount);
              console.log('  Min Clearance Policy:  ' + ledgerState.minClearancePolicy);
              console.log('  Latest Access Zone:    ' + ledgerState.latestAccessZone);
              console.log('  Latest Access Result:  ' + (ledgerState.latestAccessResult ? 'APPROVED' : 'DENIED') + '\n');
            } else {
              console.log('\n  📋 Contract state is empty.\n');
            }
          } catch (error) {
            console.error('\n  ❌ Failed to query ledger state:', error instanceof Error ? error.message : error);
          }
          break;
        }

        case '2': {
          console.log('\n  ─── Private Zone Access Verification ───');
          console.log('  Enter your private credential details:');
          const clearanceInput = await rl.question('  Employee Clearance Level (1=Standard, 2=Secret, 3=TopSecret, 4=Executive) [default: 2]: ');
          const zoneInput = await rl.question('  Facility Zone ID (e.g. 101, 202, 303) [default: 202]: ');
          const requiredClearanceInput = await rl.question('  Required Zone Clearance [default: 2]: ');

          const employeeClearance = parseInt(clearanceInput.trim() || '2', 10);
          const accessZoneId = parseInt(zoneInput.trim() || '202', 10);
          const requiredClearance = parseInt(requiredClearanceInput.trim() || '2', 10);

          const currentTimestamp = BigInt(Math.floor(Date.now() / 1000));
          const cardExpiration = currentTimestamp + 86400n * 365n;

          console.log('\n  Generating Zero-Knowledge Proof locally...');
          console.log('  🔒 Private witness: Employee clearance level & card expiration date stay ON-DEVICE.');
          console.log('  🌐 Public disclosure: Only verification result & Zone ID are sent to Midnight Network.\n');
          console.log('  Submitting proof transaction (this may take 30-60s)...');

          try {
            const tx = await deployed.callTx.verifyAccess(
              employeeClearance,
              cardExpiration,
              requiredClearance,
              accessZoneId,
              currentTimestamp
            );
            console.log('\n  ✅ Access verification transaction confirmed!');
            console.log('  Tx ID: ' + tx.public.txId);
            console.log('  Block Height: ' + tx.public.blockHeight + '\n');
          } catch (error) {
            console.error('\n  ❌ Access verification failed:', error instanceof Error ? error.message : error);
          }
          break;
        }

        case '3': {
          console.log('\n  ─── Issue New Employee Access Card ───');
          const secretHashInput = await rl.question('  Employee Secret Key Hash [default: secret-001]: ');
          const clearanceInput = await rl.question('  Assigned Clearance Level (1-4) [default: 2]: ');
          const deptInput = await rl.question('  Department Code [default: 101]: ');

          const clearance = parseInt(clearanceInput.trim() || '2', 10);
          const dept = parseInt(deptInput.trim() || '101', 10);
          const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400 * 365);
          const dummyHash = new Uint8Array(32);
          Buffer.from((secretHashInput.trim() || 'secret-001').padStart(32, '0')).copy(dummyHash);

          console.log('\n  Submitting card issuance to ledger...');
          try {
            const tx = await deployed.callTx.issueCard(dummyHash, clearance, dept, expiration);
            console.log('\n  ✅ Employee Access Card registered successfully!');
            console.log('  Tx ID: ' + tx.public.txId + '\n');
          } catch (error) {
            console.error('\n  ❌ Issuance failed:', error instanceof Error ? error.message : error);
          }
          break;
        }

        case '4': {
          console.log('\n  ─── Update Facility Clearance Policy ───');
          const minClearanceInput = await rl.question('  New Minimum Facility Clearance Level (1-4) [default: 2]: ');
          const newMin = parseInt(minClearanceInput.trim() || '2', 10);

          console.log('\n  Submitting policy update...');
          try {
            const tx = await deployed.callTx.updateFacilityPolicy(newMin);
            console.log('\n  ✅ Facility clearance policy updated!');
            console.log('  Tx ID: ' + tx.public.txId + '\n');
          } catch (error) {
            console.error('\n  ❌ Update failed:', error instanceof Error ? error.message : error);
          }
          break;
        }

        case '5': {
          console.log('\n  Checking wallet balances...');
          const currentState = await walletCtx.wallet.waitForSyncedState();
          const currentBalance = currentState.unshielded.balances[unshieldedToken().raw] ?? 0n;
          const dustBalance = currentState.dust.balance(new Date());
          console.log('  tNIGHT: ' + currentBalance.toLocaleString());
          console.log('  DUST:    ' + dustBalance.toLocaleString() + '\n');
          break;
        }

        case '6':
          running = false;
          console.log('\n  👋 Goodbye! Access session closed.\n');
          break;

        default:
          console.log('\n  Invalid option. Please choose 1 to 6.\n');
      }
    }

    await walletCtx.wallet.stop();
    rl.close();
  } catch (error) {
    console.error('\n❌ Error during CLI execution:', error);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
