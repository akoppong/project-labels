'use client';

import { useEffect, useMemo, useState } from 'react';
import { CsvInput } from '@/components/CsvInput';
import { ExportGate } from '@/components/ExportGate';
import { LabelPreview } from '@/components/LabelPreview';
import { PreviewTable } from '@/components/PreviewTable';
import { parseCsv } from '@/lib/csv';
import { isUnlockedFromSearch } from '@/lib/unlock';

const sampleCsv = `sku,name,price
SKU-1001,Blue Shirt,24.00
SKU-1002,Canvas Tote,18.00
SKU-1003,Coffee Beans,14.99`;

const unlockStorageKey = 'csvtolabels-unlocked';

export function WorkflowClient() {
  const [csv, setCsv] = useState('');
  const [unlocked, setUnlocked] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return (
      isUnlockedFromSearch(window.location.search) ||
      window.localStorage.getItem(unlockStorageKey) === 'true'
    );
  });
  const parsed = useMemo(() => parseCsv(csv), [csv]);

  useEffect(() => {
    if (isUnlockedFromSearch(window.location.search)) {
      window.localStorage.setItem(unlockStorageKey, 'true');
    }
  }, []);

  async function handleFileUpload(file: File) {
    if (typeof file.text === 'function') {
      setCsv(await file.text());
      return;
    }

    setCsv(
      await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(String(reader.result ?? ''));
        reader.onerror = () => reject(reader.error ?? new Error('Failed to read CSV file.'));
        reader.readAsText(file);
      })
    );
  }

  return (
    <section className="grid gap-6">
      <div>
        <button
          className="inline-flex items-center rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)]"
          onClick={() => setCsv(sampleCsv)}
          type="button"
        >
          Paste sample CSV
        </button>
      </div>
      <CsvInput value={csv} onChange={setCsv} onFileUpload={handleFileUpload} />
      {csv.trim().length > 0 && (
        <>
          <PreviewTable rows={parsed.rows} errors={parsed.errors} />
          <LabelPreview rows={parsed.rows} />
          <ExportGate rowCount={parsed.rows.length} unlocked={unlocked} />
        </>
      )}
    </section>
  );
}
