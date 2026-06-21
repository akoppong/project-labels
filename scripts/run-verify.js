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

// npm_execpath is set by npm when running scripts, pointing to npm-cli.js.
// When present we invoke it via process.execPath (node) without a shell so
// Windows paths with spaces (e.g. C:\Program Files\nodejs\node.exe) are
// passed directly to the OS and never mangled by cmd.exe's tokeniser.
// When absent (running as `node scripts/run-verify.js`) we fall back to
// 'npm' via shell, which resolves npm.cmd/.ps1 through PATH.
const npmCliPath = process.env.npm_execpath;

for (const step of steps) {
  const result = npmCliPath
    ? spawnSync(process.execPath, [npmCliPath, ...step.args], {
        stdio: 'inherit',
        env: { ...process.env, ...step.env }
      })
    : spawnSync('npm', step.args, {
        stdio: 'inherit',
        shell: true,
        env: { ...process.env, ...step.env }
      });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
