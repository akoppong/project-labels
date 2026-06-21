import { afterEach, describe, expect, it } from '@jest/globals';
import { getCheckoutUrl, isUnlockedFromSearch } from './unlock';

afterEach(() => {
  delete process.env.NEXT_PUBLIC_STRIPE_EXPORT_PASS_LINK;
  delete process.env.NEXT_PUBLIC_STRIPE_PRO_LINK;
});

describe('unlock helpers', () => {
  it('detects a pro unlock from query string', () => {
    expect(isUnlockedFromSearch('?unlock=pro')).toBe(true);
  });

  it('detects an export pass unlock from query string', () => {
    expect(isUnlockedFromSearch('?unlock=export-pass')).toBe(true);
  });

  it('does not unlock for unrelated query string', () => {
    expect(isUnlockedFromSearch('?utm_source=test')).toBe(false);
  });

  it('returns null for export pass checkout when no payment link is configured', () => {
    expect(getCheckoutUrl('export-pass')).toBeNull();
  });

  it('returns null for pro checkout when no payment link is configured', () => {
    expect(getCheckoutUrl('pro')).toBeNull();
  });

  it('reads checkout links from next public env vars when present', () => {
    process.env.NEXT_PUBLIC_STRIPE_EXPORT_PASS_LINK = 'https://checkout.example/export-pass';
    process.env.NEXT_PUBLIC_STRIPE_PRO_LINK = 'https://checkout.example/pro';

    expect(getCheckoutUrl('export-pass')).toBe('https://checkout.example/export-pass');
    expect(getCheckoutUrl('pro')).toBe('https://checkout.example/pro');
  });
});
