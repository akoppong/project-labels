import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from '@jest/globals';
import { LabelPreview } from './LabelPreview';

afterEach(() => {
  cleanup();
});

describe('LabelPreview', () => {
  it('shows label content and falls back to the code when name is missing', () => {
    render(
      <LabelPreview
        rows={[
          { id: 'row-1', code: 'SKU-1', name: '', price: '24.00' },
          { id: 'row-2', code: 'SKU-2', name: 'Canvas Tote', price: '' }
        ]}
      />
    );

    expect(screen.getAllByText('SKU-1')[0]).toBeInTheDocument();
    expect(screen.getByText('Canvas Tote')).toBeInTheDocument();
    expect(screen.getByText('24.00')).toBeInTheDocument();
  });
});
