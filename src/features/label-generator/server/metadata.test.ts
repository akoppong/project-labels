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

  describe('canonical URLs', () => {
    it('sets canonical to / for the homepage', () => {
      const metadata = buildPageMetadata();
      expect(metadata.alternates?.canonical).toBe('/');
    });

    it('sets canonical to the slug path for marketing pages', () => {
      const metadata = buildPageMetadata('bulk-barcode-generator');
      expect(metadata.alternates?.canonical).toBe('/bulk-barcode-generator');
    });

    it('does not include alternates for unknown slugs', () => {
      const metadata = buildPageMetadata('missing-page');
      expect(metadata.alternates).toBeUndefined();
    });
  });

  describe('Open Graph', () => {
    it('includes OG title, description, url, and type for the homepage', () => {
      const metadata = buildPageMetadata();
      expect(metadata.openGraph).toMatchObject({
        title: 'CSV Barcode Label PDF Generator',
        description: 'Turn CSV product data into printable barcode labels.',
        url: '/',
        type: 'website',
      });
    });

    it('includes OG url matching the canonical path for slug pages', () => {
      const metadata = buildPageMetadata('barcode-label-generator');
      expect(metadata.openGraph).toMatchObject({
        title: 'Barcode Label Generator',
        url: '/barcode-label-generator',
      });
    });

    it('does not include OpenGraph for unknown slugs', () => {
      const metadata = buildPageMetadata('missing-page');
      expect(metadata.openGraph).toBeUndefined();
    });
  });
});
