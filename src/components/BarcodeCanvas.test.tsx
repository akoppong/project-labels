import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { BarcodeCanvas } from './BarcodeCanvas';

jest.mock('bwip-js/browser', () => ({
  toCanvas: jest.fn()
}));

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

describe('BarcodeCanvas', () => {
  it('renders a canvas element for a valid code', async () => {
    render(<BarcodeCanvas code="SKU-1001" />);

    await waitFor(() => {
      expect(screen.getByRole('img', { name: 'Barcode for SKU-1001' })).toBeInTheDocument();
    });
  });

  it('falls back to the code text when barcode generation fails', async () => {
    const bwipjs = await import('bwip-js/browser');
    (bwipjs.toCanvas as jest.Mock).mockImplementationOnce(() => {
      throw new Error('invalid barcode value');
    });

    render(<BarcodeCanvas code="INVALID-SKU" />);

    await waitFor(() => {
      expect(screen.getByText('INVALID-SKU')).toBeInTheDocument();
    });
  });
});
