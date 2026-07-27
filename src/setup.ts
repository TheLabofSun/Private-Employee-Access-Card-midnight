import { spawnSync } from 'node:child_process';
import { resolveNetwork, setActiveNetwork, parseNetworkFlag } from './network';

function run(cmd: string, args: string[]): void {
  const r = spawnSync(cmd, args, {
    stdio: 'inherit',
    shell: true,
    env: process.env,
  });
  if (r.status !== 0) {
    process.stderr.write('\nCommand failed: ' + cmd + ' ' + args.join(' ') + '\n');
    process.exit(r.status ?? 1);
  }
}

async function main(): Promise<void> {
  const argv = process.argv;
  const flag = parseNetworkFlag(argv);
  if (flag) setActiveNetwork(flag);
  const { network, config } = resolveNetwork({ argv });

  process.stdout.write('\n→ Setting up private-employee-access-card on network: ' + network + '\n\n');

  // 1. Bring up required Docker services
  run('docker', ['compose', 'up', '-d', '--wait', ...config.composeServices]);

  // 2. Compile contract
  run('npm', ['run', 'compile']);

  // 3. Deploy contract
  const deployArgs = network === 'undeployed' ? [] : ['--', '--network', network];
  run('npm', ['run', 'deploy', ...deployArgs]);
}

main().catch((e) => {
  process.stderr.write('\nSetup failed: ' + (e as Error).message + '\n');
  process.exit(1);
});
