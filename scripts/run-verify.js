import { spawnSync } from 'node:child_process';

const defaultCheckoutUrls = {
  NEXT_PUBLIC_STRIPE_EXPORT_PASS_LINK: 'https://checkout.stripe.com/pay/example-export-pass',
  NEXT_PUBLIC_STRIPE_PRO_LINK: 'https://checkout.stripe.com/pay/example-pro'
};

const steps = [
  { label: 'env:check', args: ['run', 'env:check'] },
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

for (const step of steps) {
  const result = spawnSync('npm', step.args, {
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
