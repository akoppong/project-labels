'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { LabelRow } from '../lib/csv';
import { trackEvent } from '../lib/analytics';
import { generateLabelPdf } from '../lib/generate-pdf';
import { getCheckoutUrl } from '../lib/unlock';

type ExportGateProps = {
  rowCount: number;
  unlocked: boolean;
  rows?: LabelRow[];
};

export function ExportGate({ rowCount, unlocked, rows = [] }: ExportGateProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleDownload() {
    setIsGenerating(true);
    trackEvent('pdf_download_clicked', { rowCount });
    try {
      await generateLabelPdf(rows);
      trackEvent('pdf_downloaded', { rowCount });
    } finally {
      setIsGenerating(false);
    }
  }

  if (unlocked) {
    return (
      <section className="rounded-3xl border border-[var(--panel-border)] bg-[var(--panel)] p-6 shadow-[0_16px_40px_rgba(73,54,25,0.08)]">
        <h2 className="mb-2 text-2xl font-semibold">Export unlocked</h2>
        <p className="text-[var(--muted)]">Your clean PDF export is ready for {rowCount} labels.</p>
        <button
          className="mt-4 inline-flex items-center rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)] disabled:opacity-60"
          disabled={isGenerating}
          onClick={handleDownload}
          type="button"
        >
          {isGenerating ? 'Generating…' : 'Download clean PDF'}
        </button>
      </section>
    );
  }

  const exportPassCheckoutUrl = getCheckoutUrl('export-pass');
  const proCheckoutUrl = getCheckoutUrl('pro');

  return (
    <section className="rounded-3xl border border-[var(--panel-border)] bg-[var(--panel)] p-6 shadow-[0_16px_40px_rgba(73,54,25,0.08)]">
      <h2 className="mb-2 text-2xl font-semibold">Export clean PDF</h2>
      <p className="text-[var(--muted)]">
        Preview is free. Remove the watermark and export every row when the sheet is ready.
      </p>
      {exportPassCheckoutUrl && proCheckoutUrl ? (
        <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
          <Link
            className="grid gap-1 rounded-3xl border border-[rgba(31,27,22,0.1)] bg-[rgba(248,241,228,0.85)] p-5 text-inherit no-underline"
            href={exportPassCheckoutUrl}
            onClick={() => trackEvent('checkout_clicked', { plan: 'export-pass' })}
          >
            <span className="text-2xl font-extrabold text-[var(--accent)]">$19</span>
            <strong>Export Pass</strong>
            <small>7 days of clean PDF exports</small>
          </Link>
          <Link
            className="grid gap-1 rounded-3xl border border-[rgba(189,75,32,0.4)] bg-[rgba(248,241,228,0.85)] p-5 text-inherit no-underline shadow-[0_12px_30px_rgba(189,75,32,0.12)]"
            href={proCheckoutUrl}
            onClick={() => trackEvent('checkout_clicked', { plan: 'pro' })}
          >
            <span className="text-2xl font-extrabold text-[var(--accent)]">$29/mo</span>
            <strong>Pro</strong>
            <small>Unlimited validation-phase exports</small>
          </Link>
        </div>
      ) : (
        <p className="mt-4 rounded-2xl border border-[rgba(189,75,32,0.25)] bg-[rgba(189,75,32,0.08)] px-4 py-3 text-sm text-[var(--foreground)]">
          Payments are temporarily unavailable while checkout links are being configured.
        </p>
      )}
    </section>
  );
}
