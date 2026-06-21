import Papa from 'papaparse';

export type LabelRow = {
  id: string;
  code: string;
  name: string;
  price: string;
};

export type CsvParseResult = {
  rows: LabelRow[];
  errors: string[];
};

const CODE_COLUMNS = ['sku', 'code', 'barcode', 'id'];
const NAME_COLUMNS = ['name', 'title', 'product', 'product name'];
const PRICE_COLUMNS = ['price', 'retail price', 'sale price'];

function normalizeRecord(record: Record<string, unknown>) {
  return Object.entries(record).map(([key, value]) => ({
    key: key.trim().toLowerCase(),
    value: String(value ?? '').trim()
  }));
}

function findColumn(record: Record<string, unknown>, preferredColumns: string[]) {
  const entries = normalizeRecord(record);

  for (const preferredColumn of preferredColumns) {
    const match = entries.find((entry) => entry.key === preferredColumn);
    if (match) {
      return match.value;
    }
  }

  return '';
}

function firstFilledColumn(record: Record<string, unknown>) {
  return normalizeRecord(record).find((entry) => entry.value.length > 0)?.value ?? '';
}

export function parseCsv(csv: string): CsvParseResult {
  if (csv.trim().length === 0) {
    return {
      rows: [],
      errors: ['Paste at least one row of CSV data.']
    };
  }

  const parsed = Papa.parse<Record<string, unknown>>(csv, {
    header: true,
    skipEmptyLines: true
  });

  const rows = parsed.data
    .map((record, index): LabelRow => {
      const code = findColumn(record, CODE_COLUMNS) || firstFilledColumn(record);

      return {
        id: `row-${index + 1}`,
        code,
        name: findColumn(record, NAME_COLUMNS),
        price: findColumn(record, PRICE_COLUMNS)
      };
    })
    .filter((row) => row.code.length > 0);

  if (rows.length === 0) {
    return {
      rows: [],
      errors: ['No barcode values found. Add a sku, code, barcode, or id column.']
    };
  }

  return {
    rows,
    errors: parsed.errors.map((error) => error.message)
  };
}
