import { spawnSync } from 'node:child_process';

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

// npm_execpath is set by npm when running scripts, pointing to the npm binary
// that invoked us. Falling back to 'npm' works on POSIX; on Windows spawnSync
// needs the exact executable path since npm may be a .ps1 or .cmd shim.
const npm = process.env.npm_execpath ?? 'npm';
const spawnOptions = process.env.npm_execpath ? { execPath: process.execPath } : {};

for (const step of steps) {
  const result = spawnSync(process.execPath, [npm, ...step.args], {
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      ...step.env
    }
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
