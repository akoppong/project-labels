import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { ExportGate } from './ExportGate';

beforeEach(() => {
  delete process.env.NEXT_PUBLIC_STRIPE_EXPORT_PASS_LINK;
  delete process.env.NEXT_PUBLIC_STRIPE_PRO_LINK;
});

afterEach(() => {
  delete process.env.NEXT_PUBLIC_STRIPE_EXPORT_PASS_LINK;
  delete process.env.NEXT_PUBLIC_STRIPE_PRO_LINK;
  cleanup();
});

describe('ExportGate', () => {
  it('shows a payment setup warning when checkout links are unavailable', () => {
    render(<ExportGate rowCount={3} unlocked={false} />);

    expect(screen.getByRole('heading', { name: 'Export clean PDF' })).toBeInTheDocument();
    expect(
      screen.getByText('Payments are temporarily unavailable while checkout links are being configured.')
    ).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Export Pass/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Pro/i })).not.toBeInTheDocument();
  });

  it('shows pricing offers when checkout links are configured', () => {
    process.env.NEXT_PUBLIC_STRIPE_EXPORT_PASS_LINK = 'https://checkout.example/export-pass';
    process.env.NEXT_PUBLIC_STRIPE_PRO_LINK = 'https://checkout.example/pro';

    render(<ExportGate rowCount={3} unlocked={false} />);

    expect(screen.getByRole('link', { name: /Export Pass/i })).toHaveAttribute(
      'href',
      'https://checkout.example/export-pass'
    );
    expect(screen.getByRole('link', { name: /Pro/i })).toHaveAttribute(
      'href',
      'https://checkout.example/pro'
    );
  });

  it('shows the download action when export is unlocked', () => {
    render(<ExportGate rowCount={12} unlocked />);

    expect(screen.getByText('Your clean PDF export is ready for 12 labels.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Download clean PDF' })).toBeInTheDocument();
  });
});
