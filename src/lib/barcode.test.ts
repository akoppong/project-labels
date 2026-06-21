import { describe, expect, it } from '@jest/globals';
import { validateCode128 } from './barcode';

describe('validateCode128', () => {
  it('accepts printable SKU values', () => {
    expect(validateCode128('SKU-1001')).toEqual({ valid: true });
  });

  it('rejects empty values', () => {
    expect(validateCode128('')).toEqual({
      valid: false,
      reason: 'Barcode value is required.'
    });
  });

  it('rejects non-printable characters', () => {
    expect(validateCode128('SKU\n1001')).toEqual({
      valid: false,
      reason: 'Use printable characters only.'
    });
  });
});
