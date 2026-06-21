import { describe, expect, it } from '@jest/globals';
import { buildPageMetadata } from './metadata';

describe('buildPageMetadata', () => {
  it('builds homepage metadata from the default page', () => {
    const metadata = buildPageMetadata();

    expect(metadata.title).toBe('CSV Barcode Label PDF Generator');
    expect(metadata.description).toBe('Turn CSV product data into printable barcode labels.');
  });

  it('builds slug metadata from the matching page', () => {
    const metadata = buildPageMetadata('shopify-barcode-labels-from-csv');

    expect(metadata.title).toBe('Shopify Barcode Labels from CSV');
    expect(metadata.description).toBe(
      'Create barcode labels from a Shopify product export CSV.'
    );
  });

  it('falls back to not found metadata for unknown slugs', () => {
    const metadata = buildPageMetadata('missing-page');

    expect(metadata.title).toBe('Not Found');
    expect(metadata.description).toBeUndefined();
  });
});
