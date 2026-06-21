import { describe, expect, it } from '@jest/globals';
import { parseCsv } from './csv';

describe('parseCsv', () => {
  it('uses sku, name, and price columns when present', () => {
    const parsed = parseCsv('sku,name,price\nSKU-1001,Blue Shirt,24.00');

    expect(parsed.rows).toEqual([
      { id: 'row-1', code: 'SKU-1001', name: 'Blue Shirt', price: '24.00' }
    ]);
    expect(parsed.errors).toEqual([]);
  });

  it('uses the first column as the code when no named code column exists', () => {
    const parsed = parseCsv('item,title\nABC-1,Canvas Tote');

    expect(parsed.rows[0]).toEqual({
      id: 'row-1',
      code: 'ABC-1',
      name: 'Canvas Tote',
      price: ''
    });
  });

  it('returns an error for blank input', () => {
    expect(parseCsv('')).toEqual({
      rows: [],
      errors: ['Paste at least one row of CSV data.']
    });
  });

  it('returns an error when every row is missing a usable value', () => {
    expect(parseCsv('name,price\n,')).toEqual({
      rows: [],
      errors: ['No barcode values found. Add a sku, code, barcode, or id column.']
    });
  });

  it('trims header names and values before mapping fields', () => {
    const parsed = parseCsv(' SKU , Product Name , Retail Price \n SKU-1001 , Blue Shirt , 24.00 ');

    expect(parsed.rows).toEqual([
      { id: 'row-1', code: 'SKU-1001', name: 'Blue Shirt', price: '24.00' }
    ]);
  });
});
