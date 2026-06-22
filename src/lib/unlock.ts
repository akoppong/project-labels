// TODO(post-10-customers): Replace this soft unlock with webhook-backed
// entitlements. This validation version grants access purely client-side:
// Stripe Payment Link success URL redirects to `?unlock=...`, which is then
// persisted to localStorage (see workflow-client.tsx). There is no account,
// no server-side verification, and no link between a live Stripe subscription
// and the unlock — so a Pro subscriber who clears their browser or switches
// devices loses access while still being billed, and anyone visiting
// `?unlock=pro` unlocks for free. Migrate to Stripe Checkout + webhook +
// Supabase entitlements once we have 10 paying customers.
// See docs/launch/stripe-setup.md.
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
