import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from '@jest/globals';
import { PreviewTable } from './PreviewTable';

afterEach(() => {
  cleanup();
});

describe('PreviewTable', () => {
  it('shows parsed rows and errors', () => {
    render(
      <PreviewTable
        rows={[{ id: 'row-1', code: 'SKU-1', name: 'Blue Shirt', price: '24.00' }]}
        errors={['Problem found.']}
      />
    );

    expect(screen.getByText('1 label rows detected.')).toBeInTheDocument();
    expect(screen.getByText('SKU-1')).toBeInTheDocument();
    expect(screen.getByText('Blue Shirt')).toBeInTheDocument();
    expect(screen.getByText('24.00')).toBeInTheDocument();
    expect(screen.getByText('Problem found.')).toBeInTheDocument();
  });
});
