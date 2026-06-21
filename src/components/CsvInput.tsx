type CsvInputProps = {
  value: string;
  onChange: (value: string) => void;
  onFileUpload: (file: File) => Promise<void>;
};

export function CsvInput({ value, onChange, onFileUpload }: CsvInputProps) {
  return (
    <section className="rounded-3xl border border-[var(--panel-border)] bg-[var(--panel)] p-6 shadow-[0_16px_40px_rgba(73,54,25,0.08)]">
      <div className="mb-4">
        <h2 className="mb-2 text-2xl font-semibold">1. Paste your product CSV</h2>
        <p className="text-[var(--muted)]">
          Use a column named sku, code, barcode, or id. Optional name and price columns print below
          the barcode.
        </p>
      </div>
      <textarea
        className="mb-4 min-h-44 w-full resize-y rounded-2xl border border-[rgba(31,27,22,0.16)] bg-white/80 p-4"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Product CSV"
        placeholder={'sku,name,price\nSKU-1001,Blue Shirt,24.00'}
      />
      <label className="inline-flex flex-col gap-2 font-semibold">
        <span>Upload CSV file</span>
        <input
          type="file"
          accept=".csv,text/csv"
          aria-label="Upload CSV file"
          className="text-sm"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (!file) {
              return;
            }

            await onFileUpload(file);
            event.target.value = '';
          }}
        />
      </label>
    </section>
  );
}
