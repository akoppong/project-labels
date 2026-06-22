import type { LabelRow } from '../lib/csv';
import { BarcodeCanvas } from './BarcodeCanvas';

type LabelPreviewProps = {
  rows: LabelRow[];
};

export function LabelPreview({ rows }: LabelPreviewProps) {
  return (
    <section className="rounded-3xl border border-[var(--panel-border)] bg-[var(--panel)] p-6 shadow-[0_16px_40px_rgba(73,54,25,0.08)]">
      <div className="mb-4">
        <h2 className="mb-2 text-2xl font-semibold">3. Preview Avery 5160 sheet</h2>
        <p className="text-[var(--muted)]">
          First 30 labels shown. The clean PDF export is unlocked after payment.
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
        {rows.slice(0, 30).map((row) => (
          <div
            className="grid min-h-32 gap-2 rounded-2xl border border-dashed border-[rgba(31,27,22,0.2)] bg-[rgba(248,241,228,0.85)] p-4"
            key={row.id}
          >
            <BarcodeCanvas code={row.code} />
            <strong>{row.name || row.code}</strong>
            {row.price && <span>{row.price}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
