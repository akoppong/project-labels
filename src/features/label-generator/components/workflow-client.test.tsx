import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { WorkflowClient } from './workflow-client';

const storage = new Map<string, string>();

describe('WorkflowClient', () => {
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
    window.history.pushState({}, '', '/');
  });

  afterEach(() => {
    storage.clear();
    window.history.pushState({}, '', '/');
    jest.restoreAllMocks();
    cleanup();
  });

  it('loads sample csv and shows the preview flow', () => {
    render(<WorkflowClient />);

    fireEvent.click(screen.getByRole('button', { name: 'Paste sample CSV' }));

    expect(screen.getByRole('heading', { name: '2. Check parsed rows' })).toBeInTheDocument();
    expect(screen.getByText('3 label rows detected.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '3. Preview Avery 5160 sheet' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Export clean PDF' })).toBeInTheDocument();
  });

  it('reads uploaded csv files into the workflow', async () => {
    render(<WorkflowClient />);
    const file = new File(['sku,name\nSKU-2001,Red Mug'], 'products.csv', { type: 'text/csv' });

    fireEvent.change(screen.getByLabelText('Upload CSV file'), {
      target: { files: [file] }
    });

    await waitFor(() => {
      expect(screen.getByText('1 label rows detected.')).toBeInTheDocument();
    });

    expect(screen.getAllByText('SKU-2001').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Red Mug').length).toBeGreaterThan(0);
  });

  it('unlocks export from the query string and persists it', () => {
    window.history.pushState({}, '', '/?unlock=pro');

    render(<WorkflowClient />);
    fireEvent.click(screen.getByRole('button', { name: 'Paste sample CSV' }));

    expect(screen.getByRole('heading', { name: 'Export unlocked' })).toBeInTheDocument();
    expect(window.localStorage.getItem('csvtolabels-unlocked')).toBe('true');
  });
});
