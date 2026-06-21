export type PlanId = 'export-pass' | 'pro';

function getEnvValue(key: string) {
  return process.env[key]?.trim() || null;
}

export function isUnlockedFromSearch(search: string): boolean {
  const params = new URLSearchParams(search);
  return params.get('unlock') === 'pro' || params.get('unlock') === 'export-pass';
}

export function getCheckoutUrl(planId: PlanId): string | null {
  if (planId === 'pro') {
    return getEnvValue('NEXT_PUBLIC_STRIPE_PRO_LINK');
  }

  return getEnvValue('NEXT_PUBLIC_STRIPE_EXPORT_PASS_LINK');
}
