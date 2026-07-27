import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import * as Rx from 'rxjs';
import { WebSocket } from 'ws';

import { deployContract } from '@midnight-ntwrk/midnight-js-contracts';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';

import { getOrCreateSeed, recordDeployment, resolveNetwork } from './network';
import { createWallet, persistWalletState, unshieldedToken, type WalletContext } from './wallet';

// Enable WebSocket for GraphQL subscriptions
// @ts-expect-error Required for wallet sync
globalThis.WebSocket = WebSocket;

const PRIVATE_STATE_ID = 'privateEmployeeAccessCardPrivateState';

const { network, config: networkConfig } = resolveNetwork();
const SEED = getOrCreateSeed(network);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const zkConfigPath = path.resolve(__dirname, '..', 'contracts', 'managed', 'private-employee-access-card');

const contractPath = path.join(zkConfigPath, 'contract', 'index.js');
const ContractModule = await import(pathToFileURL(contractPath).href);

const compiledContract = CompiledContract.make('private-employee-access-card', ContractModule.Contract).pipe(
  CompiledContract.withVacantWitnesses,
  CompiledContract.withCompiledFileAssets(zkConfigPath),
);

async function waitForProofServer(maxAttempts = 30): Promise<boolean> {
  const url = networkConfig.proofServer;
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const resp = await fetch(url + '/health', { signal: AbortSignal.timeout(3000) });
      if (resp.ok) return true;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

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
  console.log('║        Deploying Private Employee Access Card Contract        ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  console.log('  Network: ' + network);
  console.log('  Indexer: ' + networkConfig.indexer);
  console.log('  Node:    ' + networkConfig.node);

  console.log('\n─── Wallet Setup ──────────────────────────────────────────────\n');
  const walletCtx = await createWallet({ network, networkConfig, seed: SEED });
  const address = walletCtx.unshieldedKeystore.getBech32Address();
  console.log('  Wallet Address: ' + address + '\n');

  console.log('  Syncing wallet with network...');
  const state = await walletCtx.wallet.waitForSyncedState();
  let balance = state.unshielded.balances[unshieldedToken().raw] ?? 0n;
  console.log('  tNIGHT balance: ' + balance.toLocaleString() + '\n');

  if (balance === 0n) {
    if (network === 'undeployed') {
      console.log('  Requesting tNIGHT tokens from devnet faucet...');
      try {
        const resp = await fetch('http://127.0.0.1:8080/api/v1/faucet', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address: address.toString() }),
        });
        if (resp.ok) {
          console.log('  Faucet request sent! Waiting for balance sync...');
          await walletCtx.wallet.waitForSyncedState();
          const s = await Rx.firstValueFrom(
            walletCtx.wallet.state().pipe(Rx.filter((x) => (x.unshielded.balances[unshieldedToken().raw] ?? 0n) > 0n)),
          );
          balance = s.unshielded.balances[unshieldedToken().raw] ?? 0n;
          console.log('  Funded! tNIGHT balance: ' + balance.toLocaleString() + '\n');
        }
      } catch (e: any) {
        console.log('  Note on devnet faucet: ' + e.message);
      }
    } else if (networkConfig.faucet) {
      console.log('  ⚠ Wallet has no tNIGHT. Fund it using the public faucet:');
      console.log('     ' + networkConfig.faucet);
      console.log('     Address: ' + address + '\n');
    }
  }

  // DUST token setup
  console.log('─── DUST Token Setup ───────────────────────────────────────────\n');
  const dustState = await Rx.firstValueFrom(walletCtx.wallet.state().pipe(Rx.filter((s) => s.isSynced)));
  const unregisteredUtxos = dustState.unshielded.availableCoins.filter(
    (c: any) => !c.meta?.registeredForDustGeneration,
  );
  if (unregisteredUtxos.length > 0) {
    console.log('  Registering ' + unregisteredUtxos.length + ' NIGHT UTXOs for DUST generation...');
    const recipe = await walletCtx.wallet.registerNightUtxosForDustGeneration(
      unregisteredUtxos,
      walletCtx.unshieldedKeystore.getPublicKey(),
      (payload) => walletCtx.unshieldedKeystore.signData(payload),
    );
    const finalized = await walletCtx.wallet.finalizeRecipe(recipe);
    await walletCtx.wallet.submitTransaction(finalized);
  }

  if (dustState.dust.balance(new Date()) === 0n) {
    console.log('  Waiting for DUST tokens...');
    await Rx.firstValueFrom(
      walletCtx.wallet.state().pipe(
        Rx.throttleTime(5000),
        Rx.filter((s) => s.isSynced),
        Rx.filter((s) => s.dust.balance(new Date()) > 0n),
      ),
    );
  }
  console.log('  DUST tokens ready!\n');

  // Deploy
  console.log('─── Deploy Contract ────────────────────────────────────────────\n');
  console.log('  Checking proof server...');
  const proofServerReady = await waitForProofServer();
  if (!proofServerReady) {
    console.log('\n  ❌ Proof server not responding on port 6300\n');
    await walletCtx.wallet.stop();
    process.exit(1);
  }
  console.log('  Proof server ready!\n');

  const providers = await createProviders(walletCtx);

  process.stdout.write('  Generating DUST...');
  await new Promise((r) => setTimeout(r, 6000));
  process.stdout.write(' done.\n');

  console.log('  Deploying contract...\n');
  const MAX_RETRIES = 20;
  const RETRY_DELAY_MS = 5000;
  let deployed: Awaited<ReturnType<typeof deployContract>> | undefined;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      deployed = await deployContract(providers, {
        compiledContract: compiledContract as any,
        args: [],
        privateStateId: PRIVATE_STATE_ID,
        initialPrivateState: {},
      });
      break;
    } catch (err: any) {
      const errMsg = err?.message || err?.toString() || '';
      const errCause = err?.cause?.message || err?.cause?.toString() || '';
      const fullError = errMsg + ' ' + errCause;
      const isDustShortage =
        fullError.includes('Not enough Dust') ||
        fullError.includes('Insufficient Funds') ||
        fullError.includes('could not balance dust');

      if (!(isDustShortage && attempt === 1)) {
        console.error('\n  Attempt ' + attempt + ' error: ' + errMsg);
      }

      if (isDustShortage) {
        const currentState = await walletCtx.wallet.waitForSyncedState();
        const dustBalance = currentState.dust.balance(new Date());
        if (attempt < MAX_RETRIES) {
          console.log('  ⏳ DUST balance: ' + dustBalance.toLocaleString() + ' (attempt ' + attempt + '/' + MAX_RETRIES + '); retrying...');
          await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
        } else {
          console.log('  ❌ Not enough DUST after ' + MAX_RETRIES + ' retries');
          await walletCtx.wallet.stop();
          process.exit(1);
        }
      } else {
        throw err;
      }
    }
  }

  if (!deployed) throw new Error('Deployment failed');

  const contractAddress = deployed.deployTxData.public.contractAddress;
  console.log('  ✅ Contract deployed successfully!\n');
  console.log('  Contract Address: ' + contractAddress + '\n');

  recordDeployment(network, contractAddress, address.toString());
  console.log('  Saved to .midnight-state.json\n');

  await persistWalletState(network, walletCtx);
  await walletCtx.wallet.stop();
  console.log('─── Deployment complete ────────────────────────────────────────\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
