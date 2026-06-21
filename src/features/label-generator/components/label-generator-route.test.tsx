import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { LabelGeneratorRoute } from './label-generator-route';

const storage = new Map<string, string>();

beforeEach(() => {
  storage.clear();
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
      removeItem: (key: string) => storage.delete(key),
      clear: () => storage.clear()
    },
    configurable: true
  });
});

afterEach(() => {
  storage.clear();
  cleanup();
});

describe('LabelGeneratorRoute', () => {
  it('renders the default marketing copy', () => {
    render(<LabelGeneratorRoute />);

    expect(
      screen.getByRole('heading', { name: 'Turn a CSV into printable barcode labels.' })
    ).toBeInTheDocument();
    expect(screen.getByText('CSV to Avery 5160 barcode labels')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Paste SKUs from Shopify, Etsy, Square, or your inventory spreadsheet. Preview labels free. Export a clean PDF when it is ready to print.'
      )
    ).toBeInTheDocument();
  });

  it('renders route-specific seo copy when a known slug is requested', () => {
    render(<LabelGeneratorRoute slug="official-upc-barcodes" />);

    expect(screen.getByRole('heading', { name: 'Official UPC barcodes and GS1' })).toBeInTheDocument();
    expect(
      screen.getByText(
        'This tool renders barcode labels from codes you provide. It does not issue official UPC, GTIN, or GS1 identifiers.'
      )
    ).toBeInTheDocument();
  });
});
