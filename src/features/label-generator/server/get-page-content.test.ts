import { describe, expect, it } from '@jest/globals';
import { getAllSlugs, getPageContent } from './get-page-content';

describe('getPageContent', () => {
  it('returns the default marketing page when no slug is provided', () => {
    const page = getPageContent();

    expect(page).not.toBeNull();
    expect(page?.h1).toBe('Turn a CSV into printable barcode labels.');
    expect(page?.eyebrow).toBe('CSV to Avery 5160 barcode labels');
  });

  it('returns the matching configured slug page', () => {
    const page = getPageContent('official-upc-barcodes');

    expect(page).not.toBeNull();
    expect(page?.title).toBe('Official UPC Barcode Guidance');
    expect(page?.h1).toBe('Official UPC barcodes and GS1');
  });

  it('returns null for unknown slugs', () => {
    expect(getPageContent('missing-page')).toBeNull();
  });
});

describe('getAllSlugs', () => {
  it('returns all configured marketing slugs', () => {
    expect(getAllSlugs()).toContain('official-upc-barcodes');
    expect(getAllSlugs()).toContain('bulk-barcode-generator');
  });
});
