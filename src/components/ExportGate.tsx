import Link from 'next/link';
import { getCheckoutUrl } from '../lib/unlock';

type ExportGateProps = {
  rowCount: number;
  unlocked: boolean;
};

export function ExportGate({ rowCount, unlocked }: ExportGateProps) {
  if (unlocked) {
    return (
      <section className="rounded-3xl border border-[var(--panel-border)] bg-[var(--panel)] p-6 shadow-[0_16px_40px_rgba(73,54,25,0.08)]">
        <h2 className="mb-2 text-2xl font-semibold">Export unlocked</h2>
        <p className="text-[var(--muted)]">Your clean PDF export is ready for {rowCount} labels.</p>
        <button
          className="mt-4 inline-flex items-center rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)]"
          type="button"
        >
          Download clean PDF
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
          >
            <span className="text-2xl font-extrabold text-[var(--accent)]">$19.97</span>
            <strong>Export Pass</strong>
            <small>7 days of clean PDF exports</small>
          </Link>
          <Link
            className="grid gap-1 rounded-3xl border border-[rgba(189,75,32,0.4)] bg-[rgba(248,241,228,0.85)] p-5 text-inherit no-underline shadow-[0_12px_30px_rgba(189,75,32,0.12)]"
            href={proCheckoutUrl}
          >
            <span className="text-2xl font-extrabold text-[var(--accent)]">$24.97/mo</span>
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
