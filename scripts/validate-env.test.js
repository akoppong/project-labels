import { describe, expect, it } from '@jest/globals';
import {
  formatValidationSummary,
  validateEnvironment
} from './validate-env.js';

describe('validateEnvironment', () => {
  it('passes in local mode when public checkout urls are omitted', () => {
    const result = validateEnvironment({}, { strict: false });

    expect(result.ok).toBe(true);
    expect(result.errors).toEqual([]);
    expect(result.warnings).toEqual([
      'NEXT_PUBLIC_STRIPE_EXPORT_PASS_LINK is not set. Checkout for this plan will be unavailable until configured.',
      'NEXT_PUBLIC_STRIPE_PRO_LINK is not set. Checkout for this plan will be unavailable until configured.'
    ]);
  });

  it('fails in strict mode when required public urls are omitted', () => {
    const result = validateEnvironment({}, { strict: true });

    expect(result.ok).toBe(false);
    expect(result.errors).toEqual([
      'NEXT_PUBLIC_STRIPE_EXPORT_PASS_LINK is required in strict mode.',
      'NEXT_PUBLIC_STRIPE_PRO_LINK is required in strict mode.'
    ]);
  });

  it('fails when a configured checkout url is not an absolute http url', () => {
    const result = validateEnvironment(
      {
        NEXT_PUBLIC_STRIPE_EXPORT_PASS_LINK: 'not-a-url',
        NEXT_PUBLIC_STRIPE_PRO_LINK: '/pricing#pro'
      },
      { strict: true }
    );

    expect(result.ok).toBe(false);
    expect(result.errors).toEqual([
      'NEXT_PUBLIC_STRIPE_EXPORT_PASS_LINK must be an absolute http(s) URL.',
      'NEXT_PUBLIC_STRIPE_PRO_LINK must be an absolute http(s) URL.'
    ]);
  });

  it('passes in strict mode when both checkout urls are absolute http urls', () => {
    const result = validateEnvironment(
      {
        NEXT_PUBLIC_STRIPE_EXPORT_PASS_LINK: 'https://checkout.stripe.com/pay/export-pass',
        NEXT_PUBLIC_STRIPE_PRO_LINK: 'https://checkout.stripe.com/pay/pro'
      },
      { strict: true }
    );

    expect(result.ok).toBe(true);
    expect(result.errors).toEqual([]);
    expect(result.warnings).toEqual([]);
  });
});

describe('formatValidationSummary', () => {
  it('renders warnings and errors into readable output', () => {
    const output = formatValidationSummary({
      ok: false,
      errors: ['strict error'],
      warnings: ['local warning']
    });

    expect(output).toContain('Environment validation failed.');
    expect(output).toContain('- local warning');
    expect(output).toContain('- strict error');
  });
});
