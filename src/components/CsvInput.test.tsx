import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { CsvInput } from './CsvInput';

afterEach(() => {
  cleanup();
});

describe('CsvInput', () => {
  it('emits textarea changes', () => {
    const onChange = jest.fn();
    const onFileUpload = jest.fn();

    render(<CsvInput value="" onChange={onChange} onFileUpload={onFileUpload} />);

    fireEvent.change(screen.getByLabelText('Product CSV'), {
      target: { value: 'sku\nSKU-1' }
    });

    expect(onChange).toHaveBeenCalledWith('sku\nSKU-1');
  });

  it('reads uploaded csv files', async () => {
    const onChange = jest.fn();
    const onFileUpload = jest.fn().mockResolvedValue(undefined);
    const file = new File(['sku,name\nSKU-1,Blue Shirt'], 'products.csv', { type: 'text/csv' });

    render(<CsvInput value="" onChange={onChange} onFileUpload={onFileUpload} />);

    fireEvent.change(screen.getByLabelText('Upload CSV file'), {
      target: { files: [file] }
    });

    await waitFor(() => {
      expect(onFileUpload).toHaveBeenCalledWith(file);
    });
  });
});
