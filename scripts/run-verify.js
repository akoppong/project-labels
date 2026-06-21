import { spawnSync } from 'node:child_process';
import path from 'node:path';

const defaultCheckoutUrls = {
  NEXT_PUBLIC_STRIPE_EXPORT_PASS_LINK: 'https://checkout.stripe.com/pay/example-export-pass',
  NEXT_PUBLIC_STRIPE_PRO_LINK: 'https://checkout.stripe.com/pay/example-pro'
};

const steps = [
  { label: 'env:check', args: ['run', 'env:check'] },
  { label: 'validate:blog', args: ['run', 'validate:blog'] },
  { label: 'lint', args: ['run', 'lint'] },
  { label: 'lint:design', args: ['run', 'lint:design'] },
  { label: 'test', args: ['test'] },
  {
    label: 'build',
    args: ['run', 'build'],
    env: {
      NEXT_PUBLIC_STRIPE_EXPORT_PASS_LINK:
        process.env.NEXT_PUBLIC_STRIPE_EXPORT_PASS_LINK ??
        defaultCheckoutUrls.NEXT_PUBLIC_STRIPE_EXPORT_PASS_LINK,
      NEXT_PUBLIC_STRIPE_PRO_LINK:
        process.env.NEXT_PUBLIC_STRIPE_PRO_LINK ?? defaultCheckoutUrls.NEXT_PUBLIC_STRIPE_PRO_LINK
    }
  }
];

// Ensure node_modules/.bin is on PATH so tools like eslint are found in
// spawned subprocesses (the pre-push hook context may not include it).
const localBin = path.resolve('node_modules', '.bin');
const augmentedPath = `${localBin}${path.delimiter}${process.env.PATH ?? ''}`;

// When npm_execpath is set (we were launched by npm run), invoke npm as
// `node <npm-cli-path> <args>` so we use the exact same npm binary.
// When running directly via `node scripts/run-verify.js`, just call `npm`
// from PATH — no node wrapper needed.
const npmExecPath = process.env.npm_execpath;
function buildSpawnArgs(stepArgs) {
  if (npmExecPath) {
    const nodeExe = `"${process.execPath}"`;
    const npmCli = npmExecPath.includes(' ') ? `"${npmExecPath}"` : npmExecPath;
    return { cmd: nodeExe, args: [npmCli, ...stepArgs] };
  }
  return { cmd: 'npm', args: stepArgs };
}

for (const step of steps) {
  const { cmd, args } = buildSpawnArgs(step.args);
  const result = spawnSync(cmd, args, {
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      PATH: augmentedPath,
      ...step.env
    }
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
