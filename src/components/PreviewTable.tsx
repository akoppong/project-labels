import type { LabelRow } from '../lib/csv';

type PreviewTableProps = {
  rows: LabelRow[];
  errors: string[];
};

export function PreviewTable({ rows, errors }: PreviewTableProps) {
  return (
    <section className="rounded-3xl border border-[var(--panel-border)] bg-[var(--panel)] p-6 shadow-[0_16px_40px_rgba(73,54,25,0.08)]">
      <div className="mb-4">
        <h2 className="mb-2 text-2xl font-semibold">2. Check parsed rows</h2>
        <p className="text-[var(--muted)]">{rows.length} label rows detected.</p>
      </div>
      {errors.length > 0 && <p className="mb-4 font-semibold text-[#9e2f12]">{errors.join(' ')}</p>}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b border-[rgba(31,27,22,0.08)] px-2 py-3 text-left">Code</th>
              <th className="border-b border-[rgba(31,27,22,0.08)] px-2 py-3 text-left">Name</th>
              <th className="border-b border-[rgba(31,27,22,0.08)] px-2 py-3 text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 10).map((row) => (
              <tr key={row.id}>
                <td className="border-b border-[rgba(31,27,22,0.08)] px-2 py-3">{row.code}</td>
                <td className="border-b border-[rgba(31,27,22,0.08)] px-2 py-3">{row.name}</td>
                <td className="border-b border-[rgba(31,27,22,0.08)] px-2 py-3">{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
