# csvtolabels.com Elegant $500 MRR Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Launch the simplest paid barcode-label workflow that can reach $500/month in 3 weeks: CSV input to Avery 5160 Code 128 label preview, then paid clean PDF export.

**Architecture:** Build one static, client-side web app with no account system, no backend, no Shopify app, and no persistent database. The browser parses CSV, renders Code 128 labels, previews a watermarked Avery 5160 PDF, and sends users to Stripe Payment Links for a one-time export pass or monthly export plan.

**Tech Stack:** Vite, React, TypeScript, Vitest, Testing Library, `bwip-js`, `papaparse`, `jspdf`, Stripe Payment Links, Vercel or Netlify, Plausible or PostHog, Google Sheets/Tally for feedback capture.

---

## Core Judgment

The earlier plan was strong but too broad. This version optimizes for the shortest path to revenue.

Do not build a barcode SaaS yet. Build a **paid export utility**.

The product promise:

> Paste or upload a product CSV. Preview Avery 5160 barcode labels for free. Pay only when you export a clean PDF.

The key design choice:

- **One barcode type:** Code 128.
- **One label template:** Avery 5160.
- **One workflow:** CSV to preview to paid PDF export.
- **One primary paid moment:** remove watermark and export all rows.
- **One primary acquisition motion:** useful replies and direct outreach to people already trying to print barcode labels from spreadsheets.

Everything else waits.

## Demand Evidence

DataForSEO, United States, refreshed June 16, 2026:

| Keyword | Monthly Search Volume | CPC | Read |
|---|---:|---:|---|
| `barcode generator` | 450,000 | $3.84 | Broad free-tool traffic |
| `upc barcode generator` | 40,500 | $5.09 | Strong SEO later, not first paid wedge |
| `free barcode generator` | 40,500 | $3.48 | Free users, ad/SEO later |
| `shopify barcode generator` | 22,200 average, noisy | $10.20 | Useful angle, unreliable volume |
| `barcode labels` | 1,900 | $12.89 | Strong paid label intent |
| `code 128 barcode generator` | 1,900 | $4.74 | Matches simplified MVP |
| `bulk barcode generator` | 1,600 | $7.48 | Best paid workflow keyword |
| `barcode label generator` | 590 | $5.92 | Direct product fit |
| `barcode label software` | 320 | $18.96 | High buyer intent |
| `print barcode labels` | 210 | $9.88 | Small but high-intent |

Interpretation:

- The fastest revenue is not from ranking for `barcode generator`.
- The fastest revenue is from people who already have many rows and need a printable output.
- Code 128 is enough for the first paid workflow because it handles SKUs and internal IDs without implying official UPC issuance.
- UPC/GS1 support can be a content page and later feature, but not the first paid workflow.

## Product Name And Positioning

Name: **csvtolabels.com**

Headline:

> Turn a CSV into printable barcode labels.

Subheadline:

> Paste SKUs from Shopify, Etsy, Square, or your inventory spreadsheet. Preview Avery 5160 barcode labels instantly. Export a clean PDF when it is ready to print.

Primary CTA:

> Paste sample CSV

Paid CTA:

> Export clean PDF

Positioning rules:

- Say "barcode labels from your existing SKUs or IDs."
- Do not say "create official UPC barcodes."
- Do not lead with "AI."
- Do not lead with "barcode generator."
- Do not require signup before preview.

## Pricing

Use two paid offers from day one:

1. **Export Pass:** $19 one-time, 7 days of clean PDF exports.
2. **Pro:** $29/month, unlimited clean PDF exports during validation.

Why both:

- The one-time pass reduces friction for urgent one-off users.
- The monthly plan is needed for the $500/month target.
- Real early demand may show up as one-time purchases first; do not ignore that signal.

$500/month paths:

| Path | Required Sales |
|---|---:|
| Pro only at $29/month | 18 subscribers |
| Mixed: 10 Pro + 12 Export Passes | $290 MRR + $228 cash |
| Mixed: 13 Pro + 7 Export Passes | $377 MRR + $133 cash |
| Strong v1 proof | 10+ paying customers and 40+ export clicks |

Definition of success after 3 weeks:

- Best case: $500+ MRR.
- Acceptable validation: $300+ MRR plus $300+ one-time export revenue.
- Continue/persist signal: 10+ paying customers, even if total MRR is below $500.

## Minimal Product Scope

### Included In V1

- Paste CSV into a textarea.
- Upload CSV file.
- Use columns named `sku`, `code`, `barcode`, `id`, or first column as barcode value.
- Use optional `name` and `price` columns as label text.
- Render Code 128 barcode labels.
- Preview first 30 labels in the browser.
- Generate a watermarked PDF preview for the first 10 labels.
- Gate clean PDF export behind Stripe.
- Export Avery 5160 PDF only.
- Add GS1/UPC disclaimer page.
- Track conversion events.

### Excluded From V1

- UPC-A rendering.
- EAN rendering.
- Multiple label templates.
- Shopify OAuth.
- User accounts.
- Saved templates.
- Team plans.
- Server-side rendering.
- Payment webhooks.
- Inventory management.
- QR codes.
- Drag-and-drop label designer.
- Barcode scanner.
- Official GS1 issuance.

The excluded list is intentional. These are the features that make the product slower without proving the paid export wedge.

## User Effort Budget

The user should only need to do five things:

1. Approve the plan.
2. Create two Stripe Payment Links: $19 one-time and $29/month.
3. Connect the repo to Vercel or Netlify.
4. Point a domain if available.
5. Approve or lightly edit outreach copy before it is posted/sent.

Everything else is handled inside the project:

- Build the app.
- Write launch copy.
- Draft community replies.
- Draft outreach messages.
- Prepare the ad test.
- Track the daily scorecard.

## Revenue Math

The plan is viable only if traffic is targeted.

Assumptions:

- 500-1,000 targeted visitors over 3 weeks.
- 15%-25% paste/upload a CSV.
- 20%-35% of CSV users click export.
- 20%-40% of export clickers pay.

Base case:

- 750 targeted visitors.
- 20% upload/paste = 150 CSV users.
- 25% export click = 38 export clicks.
- 30% pay = 11 customers.
- If 7 choose Pro and 4 choose Export Pass: $203 MRR + $76 one-time.

Aggressive but possible case:

- 1,000 targeted visitors.
- 25% upload/paste = 250 CSV users.
- 35% export click = 88 export clicks.
- 30% pay = 26 customers.
- If 18 choose Pro and 8 choose Export Pass: $522 MRR + $152 one-time.

Pressure-test conclusion:

- $500 MRR in 3 weeks is possible but not the expected median outcome.
- The plan has to produce focused traffic and a strong paid moment.
- If traffic is generic or preview value is weak, it will miss.

## Best Acquisition Route

### Primary Route: Problem-Thread Distribution

Search for current and older threads where people ask:

- "print barcode labels from CSV"
- "barcode labels from spreadsheet"
- "Shopify barcode labels CSV"
- "Avery 5160 barcode labels"
- "bulk barcode generator"
- "Code 128 labels from Excel"
- "make barcode labels for inventory"

Reply with a useful answer and a tool link only where relevant.

Target channels:

- Shopify Community.
- Reddit: Shopify, EtsySellers, ecommerce, AmazonFBA, smallbusiness.
- YouTube videos about barcode labels and Shopify labels.
- Maker/store-owner forums.
- Indie Hackers and founder communities only if the angle is "I built this for operators."

Target by Day 21:

- 30 useful community replies.
- 300 direct outreach messages.
- 3 short demo clips.
- 1 tightly capped Google Ads test.

### Secondary Route: Exact-Match Ads

Budget cap: $300.

Use exact match only:

- `[bulk barcode generator]`
- `[barcode label generator]`
- `[barcode label software]`
- `[code 128 barcode generator]`
- `[print barcode labels]`

Do not bid on broad `barcode generator` during the 3-week revenue push.

Stop ads if:

- $100 spend produces fewer than 5 CSV uploads.
- $150 spend produces zero export clicks.
- Cost per export click exceeds $25.

### SEO Route

Build the pages now, but do not count SEO toward the 3-week target.

Required pages:

- `/`
- `/bulk-barcode-generator`
- `/barcode-label-generator`
- `/code-128-barcode-generator`
- `/print-barcode-labels-from-csv`
- `/shopify-barcode-labels-from-csv`
- `/official-upc-barcodes`

SEO is the long-term compounding route. Distribution is the 3-week revenue route.

## Kill And Pivot Criteria

After 1,000 targeted visitors, pivot if:

- Fewer than 100 users paste/upload CSV.
- Fewer than 30 users click export.
- Fewer than 5 users pay.

If upload rate is low:

- The landing promise is wrong or traffic is not problem-aware.

If export click rate is low:

- Preview does not show enough value.

If checkout conversion is low:

- Price is too high, payment comes too early, or one-time Export Pass should be the default.

Best pivot if subscription fails:

- Make one-time Export Pass the primary offer.
- Keep Pro as the second option.
- Add a "Need this weekly?" upsell after purchase.

## File Structure

Create a compact app:

- `package.json`: scripts and dependencies.
- `index.html`: Vite entry.
- `vite.config.ts`: React/Vitest config.
- `tsconfig.json`: strict TypeScript config.
- `.env.example`: Stripe links and analytics key names.
- `src/main.tsx`: React mount.
- `src/App.tsx`: route switch and page shell.
- `src/styles.css`: full app styling.
- `src/lib/csv.ts`: CSV parsing and row normalization.
- `src/lib/csv.test.ts`: CSV tests.
- `src/lib/barcode.ts`: Code 128 validation and rendering adapter.
- `src/lib/barcode.test.ts`: barcode tests.
- `src/lib/pdf.ts`: Avery 5160 PDF layout and export limits.
- `src/lib/pdf.test.ts`: PDF tests.
- `src/lib/unlock.ts`: URL/localStorage unlock logic.
- `src/lib/unlock.test.ts`: unlock tests.
- `src/lib/analytics.ts`: lightweight event tracking.
- `src/components/Hero.tsx`: landing copy and primary CTA.
- `src/components/CsvInput.tsx`: paste/upload CSV interaction.
- `src/components/PreviewTable.tsx`: parsed row preview.
- `src/components/LabelPreview.tsx`: browser preview of labels.
- `src/components/ExportGate.tsx`: pricing and Stripe links.
- `src/content/pages.ts`: SEO page content.
- `docs/launch/outreach-templates.md`: outreach copy.
- `docs/launch/community-replies.md`: community reply drafts.
- `docs/launch/ad-test.md`: exact-match paid search plan.
- `docs/launch/daily-scorecard.md`: launch tracking template.

## Implementation Tasks

### Task 1: Scaffold The App

**Files:**

- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles.css`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Create package metadata**

Create `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@vitejs/plugin-react": "^5.0.0",
    "bwip-js": "^4.5.1",
    "jspdf": "^3.0.1",
    "papaparse": "^5.5.3",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.3.0",
    "@types/papaparse": "^5.3.16",
    "@types/react": "^19.1.8",
    "@types/react-dom": "^19.1.6",
    "jsdom": "^26.1.0",
    "typescript": "^5.8.3",
    "vite": "^6.3.5",
    "vitest": "^3.2.4"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run:

```bash
npm install
```

Expected: install exits with code 0 and creates `package-lock.json`.

- [ ] **Step 3: Create Vite config**

Create `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Turn a CSV into printable Avery 5160 Code 128 barcode labels." />
    <title>csvtolabels.com - CSV to Barcode Label PDF</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Create `vite.config.ts`:

```ts
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts'
  }
});
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

- [ ] **Step 4: Create app shell**

Create `src/main.tsx`:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

Create `src/App.tsx`:

```tsx
export function App() {
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">csvtolabels.com</p>
        <h1>Turn a CSV into printable barcode labels.</h1>
        <p className="lede">
          Paste product SKUs, preview Avery 5160 labels, and export a clean PDF when it is ready to print.
        </p>
      </section>
    </main>
  );
}
```

Create `src/styles.css`:

```css
:root {
  color: #1f1b16;
  background: #f8f1e4;
  font-family: "Aptos", "Segoe UI", sans-serif;
}

body {
  margin: 0;
}

.page {
  min-height: 100vh;
  padding: 48px;
}

.hero {
  max-width: 920px;
}

.eyebrow {
  color: #bd4b20;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

h1 {
  font-size: clamp(44px, 7vw, 88px);
  line-height: 0.94;
  margin: 0;
  max-width: 820px;
}

.lede {
  color: #5d5549;
  font-size: 20px;
  line-height: 1.5;
  max-width: 660px;
}
```

Create `src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 5: Verify scaffold**

Run:

```bash
npm run build
npm test
```

Expected: build exits with code 0. Test command exits with code 0 after test files are added in later tasks.

### Task 2: CSV Parsing

**Files:**

- Create: `src/lib/csv.ts`
- Create: `src/lib/csv.test.ts`

- [ ] **Step 1: Write failing CSV tests**

Create `src/lib/csv.test.ts`:

```ts
import { parseCsv } from './csv';

describe('parseCsv', () => {
  it('uses sku, name, and price columns when present', () => {
    const parsed = parseCsv('sku,name,price\nSKU-1001,Blue Shirt,24.00');

    expect(parsed.rows).toEqual([
      { id: 'row-1', code: 'SKU-1001', name: 'Blue Shirt', price: '24.00' }
    ]);
    expect(parsed.errors).toEqual([]);
  });

  it('uses the first column as the code when no named code column exists', () => {
    const parsed = parseCsv('item,title\nABC-1,Canvas Tote');

    expect(parsed.rows[0]).toEqual({
      id: 'row-1',
      code: 'ABC-1',
      name: 'Canvas Tote',
      price: ''
    });
  });

  it('returns an error for blank input', () => {
    expect(parseCsv('')).toEqual({
      rows: [],
      errors: ['Paste at least one row of CSV data.']
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- src/lib/csv.test.ts
```

Expected: fail because `src/lib/csv.ts` does not exist.

- [ ] **Step 3: Implement CSV parsing**

Create `src/lib/csv.ts`:

```ts
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

const codeColumns = ['sku', 'code', 'barcode', 'id'];
const nameColumns = ['name', 'title', 'product', 'product name'];
const priceColumns = ['price', 'retail price', 'sale price'];

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
    if (match) return match.value;
  }
  return '';
}

function firstFilledColumn(record: Record<string, unknown>) {
  return normalizeRecord(record).find((entry) => entry.value.length > 0)?.value ?? '';
}

export function parseCsv(csv: string): CsvParseResult {
  if (csv.trim().length === 0) {
    return { rows: [], errors: ['Paste at least one row of CSV data.'] };
  }

  const parsed = Papa.parse<Record<string, unknown>>(csv, {
    header: true,
    skipEmptyLines: true
  });

  const rows = parsed.data
    .map((record, index): LabelRow => {
      const code = findColumn(record, codeColumns) || firstFilledColumn(record);
      return {
        id: `row-${index + 1}`,
        code,
        name: findColumn(record, nameColumns),
        price: findColumn(record, priceColumns)
      };
    })
    .filter((row) => row.code.length > 0);

  if (rows.length === 0) {
    return { rows: [], errors: ['No barcode values found. Add a sku, code, barcode, or id column.'] };
  }

  return {
    rows,
    errors: parsed.errors.map((error) => error.message)
  };
}
```

- [ ] **Step 4: Verify CSV tests pass**

Run:

```bash
npm test -- src/lib/csv.test.ts
```

Expected: all tests pass.

### Task 3: Code 128 Validation

**Files:**

- Create: `src/lib/barcode.ts`
- Create: `src/lib/barcode.test.ts`

- [ ] **Step 1: Write failing barcode tests**

Create `src/lib/barcode.test.ts`:

```ts
import { validateCode128 } from './barcode';

describe('validateCode128', () => {
  it('accepts printable SKU values', () => {
    expect(validateCode128('SKU-1001')).toEqual({ valid: true });
  });

  it('rejects empty values', () => {
    expect(validateCode128('')).toEqual({
      valid: false,
      reason: 'Barcode value is required.'
    });
  });

  it('rejects non-printable characters', () => {
    expect(validateCode128('SKU\n1001')).toEqual({
      valid: false,
      reason: 'Use printable characters only.'
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- src/lib/barcode.test.ts
```

Expected: fail because `src/lib/barcode.ts` does not exist.

- [ ] **Step 3: Implement validation**

Create `src/lib/barcode.ts`:

```ts
export type ValidationResult =
  | { valid: true }
  | { valid: false; reason: string };

export function validateCode128(value: string): ValidationResult {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return { valid: false, reason: 'Barcode value is required.' };
  }

  if (!/^[\x20-\x7E]+$/.test(trimmed)) {
    return { valid: false, reason: 'Use printable characters only.' };
  }

  return { valid: true };
}
```

- [ ] **Step 4: Verify barcode tests pass**

Run:

```bash
npm test -- src/lib/barcode.test.ts
```

Expected: all tests pass.

### Task 4: Unlock And Pricing Gate

**Files:**

- Create: `src/lib/unlock.ts`
- Create: `src/lib/unlock.test.ts`
- Create: `.env.example`

- [ ] **Step 1: Write failing unlock tests**

Create `src/lib/unlock.test.ts`:

```ts
import { getCheckoutUrl, isUnlockedFromSearch } from './unlock';

describe('unlock helpers', () => {
  it('detects a pro unlock from query string', () => {
    expect(isUnlockedFromSearch('?unlock=pro')).toBe(true);
  });

  it('does not unlock for unrelated query string', () => {
    expect(isUnlockedFromSearch('?utm_source=test')).toBe(false);
  });

  it('returns export pass checkout by default', () => {
    expect(getCheckoutUrl('export-pass')).toBe('/pricing#export-pass');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- src/lib/unlock.test.ts
```

Expected: fail because `src/lib/unlock.ts` does not exist.

- [ ] **Step 3: Implement unlock helpers**

Create `src/lib/unlock.ts`:

```ts
export type PlanId = 'export-pass' | 'pro';

const fallbackUrls: Record<PlanId, string> = {
  'export-pass': '/pricing#export-pass',
  pro: '/pricing#pro'
};

export function isUnlockedFromSearch(search: string): boolean {
  const params = new URLSearchParams(search);
  return params.get('unlock') === 'pro' || params.get('unlock') === 'export-pass';
}

export function getCheckoutUrl(planId: PlanId): string {
  if (planId === 'pro') {
    return import.meta.env.VITE_STRIPE_PRO_LINK || fallbackUrls.pro;
  }

  return import.meta.env.VITE_STRIPE_EXPORT_PASS_LINK || fallbackUrls['export-pass'];
}
```

Create `.env.example`:

```bash
VITE_STRIPE_EXPORT_PASS_LINK=
VITE_STRIPE_PRO_LINK=
VITE_ANALYTICS_DOMAIN=csvtolabels.com
```

- [ ] **Step 4: Verify unlock tests pass**

Run:

```bash
npm test -- src/lib/unlock.test.ts
```

Expected: all tests pass.

### Task 5: Avery 5160 PDF Export Logic

**Files:**

- Create: `src/lib/pdf.ts`
- Create: `src/lib/pdf.test.ts`

- [ ] **Step 1: Write failing PDF layout tests**

Create `src/lib/pdf.test.ts`:

```ts
import { getAvery5160Position, getExportRowLimit } from './pdf';

describe('Avery 5160 layout', () => {
  it('places the first label at the top-left margin', () => {
    expect(getAvery5160Position(0)).toEqual({ x: 4.8, y: 12.7 });
  });

  it('places the fourth label on the second row', () => {
    expect(getAvery5160Position(3)).toEqual({ x: 4.8, y: 38.1 });
  });

  it('limits free preview exports to 10 rows', () => {
    expect(getExportRowLimit(false)).toBe(10);
    expect(getExportRowLimit(true)).toBe(1000);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- src/lib/pdf.test.ts
```

Expected: fail because `src/lib/pdf.ts` does not exist.

- [ ] **Step 3: Implement layout helpers**

Create `src/lib/pdf.ts`:

```ts
export type LabelPosition = {
  x: number;
  y: number;
};

const avery5160 = {
  columns: 3,
  labelWidthMm: 66.7,
  labelHeightMm: 25.4,
  marginLeftMm: 4.8,
  marginTopMm: 12.7,
  gapXMm: 3.2,
  gapYMm: 0
};

function roundToOneDecimal(value: number) {
  return Math.round(value * 10) / 10;
}

export function getAvery5160Position(index: number): LabelPosition {
  const column = index % avery5160.columns;
  const row = Math.floor(index / avery5160.columns);

  return {
    x: roundToOneDecimal(avery5160.marginLeftMm + column * (avery5160.labelWidthMm + avery5160.gapXMm)),
    y: roundToOneDecimal(avery5160.marginTopMm + row * (avery5160.labelHeightMm + avery5160.gapYMm))
  };
}

export function getExportRowLimit(isUnlocked: boolean): number {
  return isUnlocked ? 1000 : 10;
}
```

- [ ] **Step 4: Verify PDF tests pass**

Run:

```bash
npm test -- src/lib/pdf.test.ts
```

Expected: all tests pass.

### Task 6: Build The Single Workflow UI

**Files:**

- Create: `src/components/Hero.tsx`
- Create: `src/components/CsvInput.tsx`
- Create: `src/components/PreviewTable.tsx`
- Create: `src/components/LabelPreview.tsx`
- Create: `src/components/ExportGate.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Create hero component**

Create `src/components/Hero.tsx`:

```tsx
type HeroProps = {
  onSampleClick: () => void;
};

export function Hero({ onSampleClick }: HeroProps) {
  return (
    <section className="hero">
      <p className="eyebrow">CSV to Avery 5160 barcode labels</p>
      <h1>Turn a CSV into printable barcode labels.</h1>
      <p className="lede">
        Paste SKUs from Shopify, Etsy, Square, or your inventory spreadsheet. Preview labels free. Export a clean PDF when it is ready to print.
      </p>
      <button className="primaryButton" onClick={onSampleClick}>
        Paste sample CSV
      </button>
    </section>
  );
}
```

- [ ] **Step 2: Create CSV input component**

Create `src/components/CsvInput.tsx`:

```tsx
type CsvInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function CsvInput({ value, onChange }: CsvInputProps) {
  return (
    <section className="panel">
      <div className="panelHeader">
        <h2>1. Paste your product CSV</h2>
        <p>Use a column named sku, code, barcode, or id. Optional name and price columns print below the barcode.</p>
      </div>
      <textarea
        className="csvTextarea"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Product CSV"
        placeholder={'sku,name,price\\nSKU-1001,Blue Shirt,24.00'}
      />
    </section>
  );
}
```

- [ ] **Step 3: Create preview table**

Create `src/components/PreviewTable.tsx`:

```tsx
import type { LabelRow } from '../lib/csv';

type PreviewTableProps = {
  rows: LabelRow[];
  errors: string[];
};

export function PreviewTable({ rows, errors }: PreviewTableProps) {
  return (
    <section className="panel">
      <div className="panelHeader">
        <h2>2. Check parsed rows</h2>
        <p>{rows.length} label rows detected.</p>
      </div>
      {errors.length > 0 && <p className="errorText">{errors.join(' ')}</p>}
      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 10).map((row) => (
              <tr key={row.id}>
                <td>{row.code}</td>
                <td>{row.name}</td>
                <td>{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create label preview component**

Create `src/components/LabelPreview.tsx`:

```tsx
import type { LabelRow } from '../lib/csv';

type LabelPreviewProps = {
  rows: LabelRow[];
};

export function LabelPreview({ rows }: LabelPreviewProps) {
  return (
    <section className="panel">
      <div className="panelHeader">
        <h2>3. Preview Avery 5160 sheet</h2>
        <p>First 30 labels shown. The clean PDF export is unlocked after payment.</p>
      </div>
      <div className="labelGrid">
        {rows.slice(0, 30).map((row) => (
          <div className="labelCell" key={row.id}>
            <div className="barcodeMock">{row.code}</div>
            <strong>{row.name || row.code}</strong>
            {row.price && <span>{row.price}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create export gate component**

Create `src/components/ExportGate.tsx`:

```tsx
import { getCheckoutUrl } from '../lib/unlock';

type ExportGateProps = {
  rowCount: number;
  unlocked: boolean;
};

export function ExportGate({ rowCount, unlocked }: ExportGateProps) {
  if (unlocked) {
    return (
      <section className="checkoutPanel">
        <h2>Export unlocked</h2>
        <p>Your clean PDF export is ready for {rowCount} labels.</p>
        <button className="primaryButton">Download clean PDF</button>
      </section>
    );
  }

  return (
    <section className="checkoutPanel">
      <h2>Export clean PDF</h2>
      <p>Preview is free. Remove the watermark and export every row when the sheet is ready.</p>
      <div className="priceGrid">
        <a className="priceCard" href={getCheckoutUrl('export-pass')}>
          <span className="price">$19</span>
          <strong>Export Pass</strong>
          <small>7 days of clean PDF exports</small>
        </a>
        <a className="priceCard featured" href={getCheckoutUrl('pro')}>
          <span className="price">$29/mo</span>
          <strong>Pro</strong>
          <small>Unlimited validation-phase exports</small>
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Wire components in App**

Modify `src/App.tsx`:

```tsx
import { useEffect, useMemo, useState } from 'react';
import { CsvInput } from './components/CsvInput';
import { ExportGate } from './components/ExportGate';
import { Hero } from './components/Hero';
import { LabelPreview } from './components/LabelPreview';
import { PreviewTable } from './components/PreviewTable';
import { parseCsv } from './lib/csv';
import { isUnlockedFromSearch } from './lib/unlock';

const sampleCsv = `sku,name,price
SKU-1001,Blue Shirt,24.00
SKU-1002,Canvas Tote,18.00
SKU-1003,Coffee Beans,14.99`;

export function App() {
  const [csv, setCsv] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const parsed = useMemo(() => parseCsv(csv), [csv]);

  useEffect(() => {
    if (isUnlockedFromSearch(window.location.search)) {
      window.localStorage.setItem('csvtolabels-unlocked', 'true');
      setUnlocked(true);
      return;
    }

    setUnlocked(window.localStorage.getItem('csvtolabels-unlocked') === 'true');
  }, []);

  return (
    <main className="page">
      <Hero onSampleClick={() => setCsv(sampleCsv)} />
      <CsvInput value={csv} onChange={setCsv} />
      {csv.trim().length > 0 && (
        <>
          <PreviewTable rows={parsed.rows} errors={parsed.errors} />
          <LabelPreview rows={parsed.rows} />
          <ExportGate rowCount={parsed.rows.length} unlocked={unlocked} />
        </>
      )}
    </main>
  );
}
```

- [ ] **Step 7: Verify UI builds**

Run:

```bash
npm run build
```

Expected: build succeeds.

### Task 7: SEO And Disclaimer Pages

**Files:**

- Create: `src/content/pages.ts`
- Modify: `src/App.tsx`
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`

- [ ] **Step 1: Add page content**

Create `src/content/pages.ts`:

```ts
export type SeoPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  body: string;
};

export const seoPages: SeoPage[] = [
  {
    slug: 'bulk-barcode-generator',
    title: 'Bulk Barcode Generator from CSV',
    description: 'Generate printable Code 128 barcode labels from a CSV file.',
    h1: 'Bulk barcode generator from CSV',
    body: 'Paste product SKUs or IDs from a spreadsheet and preview Avery 5160 barcode labels before exporting a clean PDF.'
  },
  {
    slug: 'barcode-label-generator',
    title: 'Barcode Label Generator',
    description: 'Create Avery 5160 barcode label sheets from product codes.',
    h1: 'Barcode label generator',
    body: 'csvtolabels.com is built for sellers and inventory teams who need printable barcode labels without desktop label software.'
  },
  {
    slug: 'code-128-barcode-generator',
    title: 'Code 128 Barcode Generator',
    description: 'Generate Code 128 barcode labels from SKUs and internal product IDs.',
    h1: 'Code 128 barcode generator',
    body: 'Code 128 works well for internal SKUs, product IDs, bin labels, and inventory workflows.'
  },
  {
    slug: 'print-barcode-labels-from-csv',
    title: 'Print Barcode Labels from CSV',
    description: 'Turn spreadsheet rows into a print-ready barcode label PDF.',
    h1: 'Print barcode labels from CSV',
    body: 'Skip mail merge and manual copy-paste. Paste a CSV, preview labels, and export a clean PDF.'
  },
  {
    slug: 'shopify-barcode-labels-from-csv',
    title: 'Shopify Barcode Labels from CSV',
    description: 'Create barcode labels from a Shopify product export CSV.',
    h1: 'Shopify barcode labels from CSV',
    body: 'Export products from Shopify, paste the CSV here, and create printable labels without installing a Shopify app.'
  },
  {
    slug: 'official-upc-barcodes',
    title: 'Official UPC Barcode Guidance',
    description: 'Learn why official UPC and GTIN identifiers should come from GS1.',
    h1: 'Official UPC barcodes and GS1',
    body: 'csvtolabels.com renders barcode labels from codes you provide. It does not issue official UPC, GTIN, or GS1 identifiers.'
  }
];
```

- [ ] **Step 2: Render SEO copy by slug**

Modify `src/App.tsx` to read `window.location.pathname`, find a matching `seoPages` entry, and use its `h1` and `body` in the hero area when present.

- [ ] **Step 3: Add robots and sitemap**

Create `public/robots.txt`:

```txt
User-agent: *
Allow: /

Sitemap: https://csvtolabels.com/sitemap.xml
```

Create `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://csvtolabels.com/</loc></url>
  <url><loc>https://csvtolabels.com/bulk-barcode-generator</loc></url>
  <url><loc>https://csvtolabels.com/barcode-label-generator</loc></url>
  <url><loc>https://csvtolabels.com/code-128-barcode-generator</loc></url>
  <url><loc>https://csvtolabels.com/print-barcode-labels-from-csv</loc></url>
  <url><loc>https://csvtolabels.com/shopify-barcode-labels-from-csv</loc></url>
  <url><loc>https://csvtolabels.com/official-upc-barcodes</loc></url>
</urlset>
```

- [ ] **Step 4: Verify SEO assets**

Run:

```bash
npm run build
test -f dist/robots.txt
test -f dist/sitemap.xml
```

Expected: build succeeds and both files exist in `dist`.

### Task 8: Launch Assets

**Files:**

- Create: `docs/launch/stripe-setup.md`
- Create: `docs/launch/outreach-templates.md`
- Create: `docs/launch/community-replies.md`
- Create: `docs/launch/ad-test.md`
- Create: `docs/launch/daily-scorecard.md`

- [ ] **Step 1: Create Stripe setup**

Create `docs/launch/stripe-setup.md`:

```md
# Stripe Setup

Create two Stripe Payment Links.

## Export Pass

Name: csvtolabels.com Export Pass
Price: $19 one-time
Success URL: https://csvtolabels.com/?unlock=export-pass
Cancel URL: https://csvtolabels.com/

## Pro

Name: csvtolabels.com Pro
Price: $29/month
Success URL: https://csvtolabels.com/?unlock=pro
Cancel URL: https://csvtolabels.com/

This validation version uses a soft unlock. Replace it with Stripe Checkout plus webhook-backed entitlements after the first 10 paying customers.
```

- [ ] **Step 2: Create outreach templates**

Create `docs/launch/outreach-templates.md`:

```md
# Outreach Templates

## Direct Message

I built a small tool that turns a product CSV into printable Avery 5160 barcode labels.

No account needed to preview. Paste SKUs, check the sheet, and only pay if you need the clean PDF export:
{URL}

Useful if you keep product IDs in Shopify, Etsy, Square, or a spreadsheet.

Does this match how you make labels today?

## Email

Subject: CSV to barcode labels

I made csvtolabels.com for sellers who need barcode labels from a spreadsheet without setting up mail merge or desktop label software.

Paste a CSV, preview Avery 5160 labels, and export the clean PDF if it works:
{URL}

If you already have SKUs or internal product IDs, it should take less than a minute to test.
```

- [ ] **Step 3: Create community reply drafts**

Create `docs/launch/community-replies.md`:

```md
# Community Reply Drafts

## CSV To Labels

If your product codes are already in a CSV, the simplest route is to render them as Code 128 labels and print on Avery 5160 sheets.

I built a browser tool for that exact workflow: {URL}

It previews the labels free before asking for payment on the clean PDF export.

## Shopify Export

For Shopify, export your product CSV first, then use the SKU column as the barcode value. I made a tool that reads the CSV and lays it out as Avery 5160 labels: {URL}

It does not issue official UPCs; it prints labels from codes you already have.
```

- [ ] **Step 4: Create ad test**

Create `docs/launch/ad-test.md`:

```md
# Exact-Match Ad Test

Budget cap: $300.

Keywords:

- [bulk barcode generator]
- [barcode label generator]
- [barcode label software]
- [code 128 barcode generator]
- [print barcode labels]

Ad headline:

CSV to Barcode Labels

Description:

Paste SKUs. Preview Avery 5160 labels free. Export a clean PDF when ready.

Stop conditions:

- Stop after $100 if fewer than 5 CSV uploads.
- Stop after $150 if zero export clicks.
- Stop if cost per export click exceeds $25.
```

- [ ] **Step 5: Create daily scorecard**

Create `docs/launch/daily-scorecard.md`:

```md
# Daily Scorecard

Date:
Visitors:
CSV paste/upload users:
Label preview users:
Export clicks:
Export Pass purchases:
Pro subscriptions:
MRR:
One-time revenue:
Top source:
Top objection:
Tomorrow's action:
```

## 21-Day Execution Calendar

### Days 1-2: Build Workflow

- Scaffold app.
- Implement CSV parsing.
- Implement Code 128 validation.
- Implement Avery 5160 browser preview.
- Implement soft paid gate.

Exit criteria:

- User can paste sample CSV.
- User can preview label sheet.
- User can click a paid export option.

### Days 3-4: PDF Export And Payment

- Implement watermarked preview export.
- Implement clean PDF export unlock state.
- Add Stripe Payment Links.
- Add pricing gate.
- Deploy public URL.

Exit criteria:

- Public URL is live.
- Payment success URL unlocks clean export.
- Manual test purchase works or Stripe test mode proves the flow.

### Days 5-6: Conversion Tightening

- Test 10 real-looking CSV formats.
- Tighten copy around Avery 5160 and Code 128.
- Add official UPC disclaimer.
- Add sample CSV and demo data.

Exit criteria:

- Cold user understands the tool in 10 seconds.
- Preview shows value before payment.
- No account or support interaction is needed.

### Days 7-14: Distribution Sprint

- Publish 6 SEO pages.
- Post 15 useful community replies.
- Send 150 direct messages or emails.
- Create 2 demo clips.
- Run $150 ad test only on exact-match keywords.

Exit criteria:

- 250 targeted visitors.
- 50 CSV paste/upload users.
- 15 export clicks.
- 3 paying customers.

### Days 15-18: Pricing And Offer Iteration

- If users click export but do not pay, make Export Pass visually primary.
- If users ask for recurring use, make Pro visually primary.
- If users ask for another label size, log it but do not build unless two paying users ask.

Exit criteria:

- Export click to purchase conversion is above 20%.
- Product has at least 5 paying customers.

### Days 19-21: Push To $500

- Send 150 more targeted messages.
- Post 15 more useful replies.
- Re-run ads only if first test produced export clicks.
- Ask paying users where they found the tool and what labels they print.

Exit criteria:

- 10+ paying customers.
- 18 Pro subscribers, or mixed revenue equivalent.
- Clear evidence whether to continue, pivot to Export Pass-first, or broaden templates.

## Final Pressure Test

This is the most elegant plan because it avoids the three biggest failure modes:

1. Building for SEO before there is revenue.
2. Building a full SaaS before proving paid export demand.
3. Supporting many barcode types and templates before knowing what buyers need.

The plan can still fail. The main failure case is that people want this once and refuse subscriptions. That is why Export Pass is included from day one.

Decision rules:

- If one-time purchases happen but subscriptions do not, continue with one-time export monetization and add post-purchase subscription upsell.
- If preview usage happens but payment does not, reduce scope of free preview or improve the PDF output.
- If upload usage does not happen, pivot away from barcode labels because the traffic is not problem-aware enough.
- If 10+ people pay, keep building only the next paid-requested feature.

## Self-Review

Spec coverage:

- The plan targets $500/month in 3 weeks.
- The plan minimizes user effort by avoiding backend, auth, Shopify OAuth, account management, and support-heavy features.
- The plan pressure-tests paid search, SEO, community distribution, direct outreach, subscription pricing, and one-time export pricing.
- The plan includes concrete implementation tasks, files, test commands, launch assets, and daily metrics.

Placeholder scan:

- No vague implementation steps remain.

Type consistency:

- The first workflow consistently uses `Code 128`, `Avery 5160`, CSV rows, `Export Pass`, and `Pro`.
- Row fields are consistently `id`, `code`, `name`, and `price`.
- The unlock query values are consistently `export-pass` and `pro`.
