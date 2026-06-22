export type PlanId = 'export-pass' | 'pro';

export function isUnlockedFromSearch(search: string): boolean {
  const params = new URLSearchParams(search);
  return params.get('unlock') === 'pro' || params.get('unlock') === 'export-pass';
}

// Static property access is required — bundlers only inline NEXT_PUBLIC_ vars
// for direct `process.env.VAR` access, not dynamic `process.env[key]` bracket notation.
export function getCheckoutUrl(planId: PlanId): string | null {
  if (planId === 'pro') {
    return process.env.NEXT_PUBLIC_STRIPE_PRO_LINK?.trim() || null;
  }

  return process.env.NEXT_PUBLIC_STRIPE_EXPORT_PASS_LINK?.trim() || null;
}
