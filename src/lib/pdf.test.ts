import { describe, expect, it } from '@jest/globals';
import { getAvery5160Position, getExportRowLimit } from './pdf';

describe('Avery 5160 layout', () => {
  it('places the first label at the top-left margin', () => {
    expect(getAvery5160Position(0)).toEqual({ x: 4.8, y: 12.7 });
  });

  it('places the fourth label on the second row', () => {
    expect(getAvery5160Position(3)).toEqual({ x: 4.8, y: 38.1 });
  });

  it('places the third label in the right-most column of the first row', () => {
    expect(getAvery5160Position(2)).toEqual({ x: 144.6, y: 12.7 });
  });

  it('limits free preview exports to 10 rows', () => {
    expect(getExportRowLimit(false)).toBe(10);
    expect(getExportRowLimit(true)).toBe(1000);
  });
});
