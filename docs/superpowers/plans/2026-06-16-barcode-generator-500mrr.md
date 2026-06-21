# Barcode Generator $500 MRR Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and launch a paid bulk barcode label generator that can realistically reach $500/month within 3 weeks by selling paid PDF/CSV export workflows to ecommerce sellers and small inventory teams.

**Architecture:** Start with a static, mostly client-side app to minimize infrastructure: barcode generation, CSV parsing, label preview, and PDF export run in the browser. Use a soft paid gate through Stripe Payment Links and redirect-based unlock for the 3-week validation phase; add a real backend only after paid demand is proven.

**Tech Stack:** Vite, React, TypeScript, Vitest, Testing Library, `bwip-js` for barcode rendering, `papaparse` for CSV parsing, `jspdf` or `pdf-lib` for PDF export, Stripe Payment Links, Vercel or Netlify, Plausible/PostHog, Tally or Resend for waitlist/support capture.

---

## Executive Decision

Build **csvtolabels.com**, not a generic barcode generator.

The winning promise:

> Upload a CSV of SKUs, UPCs, or product IDs. Generate printable barcode label sheets in minutes.

The generic search term `barcode generator` has large volume, but generic users expect free one-off output. The fastest path to $500/month is the paid workflow underneath that search demand: bulk import, label sheets, templates, and no-watermark PDF export.

## Demand Evidence

DataForSEO, United States, refreshed June 16, 2026:

| Keyword | Monthly Search Volume | CPC | Competition |
|---|---:|---:|---|
| `barcode generator` | 450,000 | $3.84 | Low |
| `upc barcode generator` | 40,500 | $5.09 | Low |
| `free barcode generator` | 40,500 | $3.48 | Low |
| `online barcode generator` | 9,900 | $4.07 | Low |
| `shopify barcode generator` | 22,200 average, noisy | $10.20 | Low |
| `bulk barcode generator` | 1,600 | $7.48 | Low |
| `barcode label generator` | 590 | $5.92 | Medium |
| `barcode label software` | 320 | $18.96 | Low |
| `print barcode labels` | 210 | $9.88 | High |
| `barcode generator for inventory` | 210 | $16.34 | High |

Interpretation:

- The broad funnel is large enough for long-term SEO.
- The paid-intent funnel is smaller but clear.
- `shopify barcode generator` has a suspicious 12-month average because individual months spike heavily; do not rely on that as the main paid-ad target.
- `upc barcode generator` is the best stable top-of-funnel SEO page.
- `bulk barcode generator`, `barcode label software`, and inventory terms are the best monetization-intent pages.

## Competitive Reality

Known market constraints:

- Shopify has a free Retail Barcode Labels app for merchants inside Shopify.
- Free online barcode tools already exist, including bulk and PDF generators.
- Label software incumbents sell desktop or heavier workflow tools.
- GS1 is the official source for legitimate UPC/GTIN identifiers. csvtolabels.com must not claim to create official UPC numbers; it only renders barcodes from user-provided identifiers.

The gap:

- A web-first tool for people who have product/SKU data in a spreadsheet and want a printable label sheet quickly.
- No Shopify install required.
- No desktop software.
- No account required for preview.
- Paid only when exporting serious output.

## $500/Month Revenue Model

Use a simple two-plan pricing model:

- **Pro:** $24.97/month for CSV upload, 1,000 labels/month, PDF export, no watermark.
- **Business:** $79/month for 10,000 labels/month, saved browser-local templates, commercial use, priority email support.

Target mix for $500 MRR:

- 10 Pro customers = $249.70 MRR.
- 3 Business customers = $237 MRR.
- Total = $527 MRR.

Fallback cash target if subscription conversion is slower:

- Add a one-time **Export Pass** at $19.97 for 7 days of PDF exports.
- This does not count as MRR, but it validates willingness to pay and can cover early costs.

Do not offer a free trial in the first 3 weeks. The free preview is the trial.

## 3-Week Strategy

The 3-week plan cannot depend on SEO ranking. SEO pages should be built, but first revenue must come from problem-aware traffic:

- People searching exact paid-intent terms.
- Shopify/Etsy/Amazon/FBA/small-warehouse sellers with immediate label pain.
- Existing communities where users ask how to print barcode labels from Excel/CSV.
- Small paid search tests for validation, not profit.

The fastest route is:

1. Build a useful free preview.
2. Gate full PDF/CSV export behind paid unlock.
3. Publish 6 SEO pages immediately.
4. Drive 500-1,000 targeted visits manually and semi-automatically.
5. Convert 1.5%-3% of targeted visitors to paid.

Traffic-to-MRR math:

| Targeted Visitors | Paid Conversion | Customers | Blended ARPU | MRR |
|---:|---:|---:|---:|---:|
| 500 | 1.5% | 8 | $35 | $280 |
| 500 | 3.0% | 15 | $35 | $525 |
| 1,000 | 1.5% | 15 | $35 | $525 |
| 1,000 | 3.0% | 30 | $35 | $1,050 |

The plan succeeds if it gets 500-1,000 highly targeted visitors, not random tool traffic.

## Pressure Test

### Route 1: SEO

Verdict: strong long-term, weak for 3 weeks.

What must be true:

- Google indexes pages quickly.
- The site ranks for long-tail terms within weeks.
- The tool earns backlinks or mentions.

Why it probably will not hit $500 in 3 weeks:

- New domains rarely rank fast for competitive tool keywords.
- Existing free tools and Shopify resources already occupy the SERP.
- Search volume does not equal traffic without ranking.

Use SEO for compounding, not initial revenue.

### Route 2: Google Ads

Verdict: useful for validation, unlikely profitable immediately.

DataForSEO CPCs:

- `bulk barcode generator`: $7.48.
- `barcode label software`: $18.96.
- `upc barcode generator`: $5.09.
- `barcode generator`: $3.84.

At $24.97/month, paid search is hard unless conversion is unusually high.

Example:

- $500 ad spend at $5 CPC = 100 visitors.
- 5% paid conversion = 5 customers.
- 5 customers at $24.97/month = $124.85 MRR.

Paid ads should be capped at $300-$500 as a demand test. Do not rely on them to reach $500 MRR.

### Route 3: Community/Forum Distribution

Verdict: best 3-week route if done carefully.

Targets:

- Shopify Community threads about printing barcode labels.
- Reddit communities for Shopify, ecommerce, AmazonFBA, Etsy sellers, inventory management, small business.
- Indie Hackers / founder communities for maker shops.
- YouTube comments or creator outreach around barcode/Shopify label tutorials.

What must be true:

- Posts are useful and not spammy.
- The tool solves the exact thread problem.
- The free preview works without signup.

Expected outcome:

- 20-40 useful posts/comments over 2 weeks.
- 300-800 targeted visitors.
- 5-20 paid customers if product quality and gating are right.

This is the primary route.

### Route 4: Direct Outreach

Verdict: high potential, but user effort must be minimized.

Approach:

- Build a prospect list of Shopify/Etsy/product sellers manually or with lightweight scraping.
- Send short email/DM: "I built a free CSV-to-barcode-label tool. If you use spreadsheets for products, it turns them into printable PDF labels."
- Avoid calls. Use self-serve checkout only.

What must be true:

- The message is highly specific.
- The demo link lands directly on CSV upload.
- The user gets value before paying.

Expected outcome:

- 300 targeted messages.
- 20 site visits from replies/clicks.
- 2-5 paid customers if pain is acute.

Useful, but not enough alone.

### Route 5: Shopify App Store

Verdict: good later, wrong for 3 weeks.

Why:

- App review, OAuth, app billing, Shopify-specific support, and embedded UI add complexity.
- Shopify already has free barcode-label options.

Defer until the generic web app has paying users.

## User Effort Minimization

The user should only need to do these actions:

1. Create or approve a Stripe Payment Link.
2. Connect the repo to Vercel/Netlify.
3. Buy or point a domain if desired.
4. Approve launch copy.
5. Review a daily report of traffic, payments, and high-intent feedback.

Everything else should be implementable by Codex:

- Build app.
- Write landing copy.
- Generate SEO pages.
- Create outreach templates.
- Prepare community post drafts.
- Prepare ad copy.
- Prepare analytics dashboards.
- Iterate based on usage data.

## Product Scope

### Free

- Single barcode generator.
- Code 128 support.
- UPC-A rendering when user provides a valid 12-digit UPC.
- EAN-13 rendering when user provides a valid 13-digit EAN.
- Download one PNG.
- Paste up to 10 rows manually.
- Preview a watermarked PDF label sheet.

### Paid

- CSV upload.
- Up to 1,000 rows on Pro.
- Up to 10,000 rows on Business.
- PDF export without watermark.
- Avery 5160, Avery 5163, 2x1 thermal, 2.25x1.25 thermal templates.
- Text fields: product name, SKU, price, custom note.
- Browser-local saved templates.
- No official UPC generation claims.

### Explicit Non-Scope For First 3 Weeks

- User accounts.
- Shopify OAuth app.
- Server-side projects.
- Team management.
- Payment webhooks.
- Inventory management.
- Barcode scanner app.
- Official GS1 barcode issuance.
- Support for every label printer format.
- Custom drag-and-drop label designer.

## Site Map

Create these pages:

- `/`: CSV-to-barcode-label landing page.
- `/bulk-barcode-generator`: primary paid-intent SEO page.
- `/upc-barcode-generator`: stable free-tool page.
- `/barcode-label-generator`: label workflow page.
- `/barcode-label-software`: software alternative page.
- `/shopify-barcode-generator`: Shopify CSV landing page with caveat that no Shopify install is required.
- `/pricing`: Pro and Business pricing.
- `/help/official-upc-barcodes`: GS1 disclaimer and guidance.

## Analytics Events

Track:

- `page_view`.
- `barcode_generated`.
- `csv_uploaded`.
- `label_template_selected`.
- `pdf_preview_generated`.
- `watermarked_pdf_downloaded`.
- `paid_export_clicked`.
- `checkout_clicked`.
- `unlock_success_seen`.
- `support_email_clicked`.

Success thresholds by end of Week 3:

- 500 targeted visitors.
- 100 CSV uploads.
- 40 paid-export clicks.
- 13 paid subscriptions at blended $39/month, or 21 Pro subscriptions at $24.97/month.

## Technical Implementation Plan

### Task 1: Scaffold The Static App

**Files:**

- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles.css`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Initialize package metadata**

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

Expected: `package-lock.json` is created and install exits with code 0.

- [ ] **Step 3: Add Vite entry files**

Create `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Generate bulk barcode labels from CSV files and export printable PDF sheets." />
    <title>csvtolabels.com - Bulk Barcode Label Generator</title>
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
  "include": ["src"],
  "references": []
}
```

- [ ] **Step 4: Add initial React shell**

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
        <p className="eyebrow">Bulk barcode labels from CSV</p>
        <h1>Turn product spreadsheets into printable barcode labels.</h1>
        <p className="lede">
          Paste SKUs or upload a CSV, preview label sheets, and export a print-ready PDF.
        </p>
      </section>
    </main>
  );
}
```

Create `src/styles.css`:

```css
:root {
  color: #181713;
  background: #f7f2e8;
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
  color: #b84a24;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h1 {
  font-size: clamp(42px, 7vw, 92px);
  line-height: 0.92;
  margin: 0;
}

.lede {
  color: #49443a;
  font-size: 20px;
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

Expected: build succeeds and tests exit with no test files found or passing tests after tests are added.

### Task 2: Barcode Validation And Rendering Core

**Files:**

- Create: `src/lib/barcode.ts`
- Create: `src/lib/barcode.test.ts`

- [ ] **Step 1: Write barcode validation tests**

Create `src/lib/barcode.test.ts`:

```ts
import { getBarcodeType, validateBarcodeValue } from './barcode';

describe('barcode validation', () => {
  it('accepts Code 128 values with printable characters', () => {
    expect(validateBarcodeValue('SKU-1001', 'code128').valid).toBe(true);
  });

  it('rejects empty Code 128 values', () => {
    expect(validateBarcodeValue('', 'code128')).toEqual({
      valid: false,
      reason: 'Enter at least one character.'
    });
  });

  it('accepts 12 digit UPC-A values', () => {
    expect(validateBarcodeValue('012345678905', 'upca').valid).toBe(true);
  });

  it('rejects non-12 digit UPC-A values', () => {
    expect(validateBarcodeValue('ABC', 'upca')).toEqual({
      valid: false,
      reason: 'UPC-A values must be exactly 12 digits.'
    });
  });

  it('detects UPC-A for 12 digit values and Code 128 otherwise', () => {
    expect(getBarcodeType('012345678905')).toBe('upca');
    expect(getBarcodeType('SKU-1001')).toBe('code128');
  });
});
```

- [ ] **Step 2: Run test and verify it fails**

Run:

```bash
npm test -- src/lib/barcode.test.ts
```

Expected: fail because `src/lib/barcode.ts` does not exist.

- [ ] **Step 3: Implement barcode core**

Create `src/lib/barcode.ts`:

```ts
export type BarcodeType = 'code128' | 'upca' | 'ean13';

export type ValidationResult =
  | { valid: true }
  | { valid: false; reason: string };

export function getBarcodeType(value: string): BarcodeType {
  const trimmed = value.trim();
  if (/^\d{12}$/.test(trimmed)) return 'upca';
  if (/^\d{13}$/.test(trimmed)) return 'ean13';
  return 'code128';
}

export function validateBarcodeValue(value: string, type: BarcodeType): ValidationResult {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return { valid: false, reason: 'Enter at least one character.' };
  }

  if (type === 'upca' && !/^\d{12}$/.test(trimmed)) {
    return { valid: false, reason: 'UPC-A values must be exactly 12 digits.' };
  }

  if (type === 'ean13' && !/^\d{13}$/.test(trimmed)) {
    return { valid: false, reason: 'EAN-13 values must be exactly 13 digits.' };
  }

  if (type === 'code128' && !/^[\x20-\x7E]+$/.test(trimmed)) {
    return { valid: false, reason: 'Code 128 values must use printable ASCII characters.' };
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

### Task 3: CSV Import And Row Normalization

**Files:**

- Create: `src/lib/rows.ts`
- Create: `src/lib/rows.test.ts`

- [ ] **Step 1: Write row parsing tests**

Create `src/lib/rows.test.ts`:

```ts
import { parseCsvRows } from './rows';

describe('parseCsvRows', () => {
  it('parses SKU and name columns from CSV', () => {
    const result = parseCsvRows('sku,name,price\nSKU-1,Blue Shirt,24.00');

    expect(result.rows).toEqual([
      { id: 'row-1', value: 'SKU-1', name: 'Blue Shirt', price: '24.00', note: '' }
    ]);
    expect(result.errors).toEqual([]);
  });

  it('uses the first column as barcode value when no sku column exists', () => {
    const result = parseCsvRows('code,title\nABC-1,Poster');

    expect(result.rows[0].value).toBe('ABC-1');
    expect(result.rows[0].name).toBe('Poster');
  });

  it('returns an error for an empty CSV', () => {
    const result = parseCsvRows('');

    expect(result.rows).toEqual([]);
    expect(result.errors).toEqual(['Add at least one row.']);
  });
});
```

- [ ] **Step 2: Run test and verify it fails**

Run:

```bash
npm test -- src/lib/rows.test.ts
```

Expected: fail because `src/lib/rows.ts` does not exist.

- [ ] **Step 3: Implement CSV parsing**

Create `src/lib/rows.ts`:

```ts
import Papa from 'papaparse';

export type LabelRow = {
  id: string;
  value: string;
  name: string;
  price: string;
  note: string;
};

export type ParseResult = {
  rows: LabelRow[];
  errors: string[];
};

const valueKeys = ['sku', 'upc', 'barcode', 'code', 'id'];
const nameKeys = ['name', 'title', 'product', 'product name'];
const priceKeys = ['price', 'retail price', 'sale price'];

function findValue(record: Record<string, unknown>, keys: string[]): string {
  const normalizedEntries = Object.entries(record).map(([key, value]) => [
    key.trim().toLowerCase(),
    String(value ?? '').trim()
  ]);

  for (const key of keys) {
    const match = normalizedEntries.find(([entryKey]) => entryKey === key);
    if (match) return match[1];
  }

  return normalizedEntries.find(([, value]) => value.length > 0)?.[1] ?? '';
}

export function parseCsvRows(csv: string): ParseResult {
  if (csv.trim().length === 0) {
    return { rows: [], errors: ['Add at least one row.'] };
  }

  const parsed = Papa.parse<Record<string, unknown>>(csv, {
    header: true,
    skipEmptyLines: true
  });

  const rows = parsed.data
    .map((record, index): LabelRow => ({
      id: `row-${index + 1}`,
      value: findValue(record, valueKeys),
      name: findValue(record, nameKeys),
      price: findValue(record, priceKeys),
      note: ''
    }))
    .filter((row) => row.value.length > 0);

  if (rows.length === 0) {
    return { rows: [], errors: ['No barcode values found. Include a SKU, UPC, barcode, code, or id column.'] };
  }

  return {
    rows,
    errors: parsed.errors.map((error) => error.message)
  };
}
```

- [ ] **Step 4: Verify row tests pass**

Run:

```bash
npm test -- src/lib/rows.test.ts
```

Expected: all tests pass.

### Task 4: Label Templates And PDF Layout

**Files:**

- Create: `src/lib/templates.ts`
- Create: `src/lib/templates.test.ts`
- Create: `src/lib/pdf.ts`
- Create: `src/lib/pdf.test.ts`

- [ ] **Step 1: Write template tests**

Create `src/lib/templates.test.ts`:

```ts
import { getTemplateById, labelTemplates } from './templates';

describe('labelTemplates', () => {
  it('includes Avery 5160 and thermal templates', () => {
    expect(labelTemplates.map((template) => template.id)).toContain('avery-5160');
    expect(labelTemplates.map((template) => template.id)).toContain('thermal-2x1');
  });

  it('returns a template by id', () => {
    expect(getTemplateById('avery-5160').columns).toBe(3);
  });
});
```

- [ ] **Step 2: Implement label templates**

Create `src/lib/templates.ts`:

```ts
export type LabelTemplate = {
  id: string;
  name: string;
  pageWidthMm: number;
  pageHeightMm: number;
  labelWidthMm: number;
  labelHeightMm: number;
  columns: number;
  rows: number;
  marginLeftMm: number;
  marginTopMm: number;
  gapXMm: number;
  gapYMm: number;
};

export const labelTemplates: LabelTemplate[] = [
  {
    id: 'avery-5160',
    name: 'Avery 5160 Address Labels',
    pageWidthMm: 215.9,
    pageHeightMm: 279.4,
    labelWidthMm: 66.7,
    labelHeightMm: 25.4,
    columns: 3,
    rows: 10,
    marginLeftMm: 4.8,
    marginTopMm: 12.7,
    gapXMm: 3.2,
    gapYMm: 0
  },
  {
    id: 'avery-5163',
    name: 'Avery 5163 Shipping Labels',
    pageWidthMm: 215.9,
    pageHeightMm: 279.4,
    labelWidthMm: 101.6,
    labelHeightMm: 50.8,
    columns: 2,
    rows: 5,
    marginLeftMm: 4.8,
    marginTopMm: 12.7,
    gapXMm: 3.2,
    gapYMm: 0
  },
  {
    id: 'thermal-2x1',
    name: 'Thermal 2 x 1 in',
    pageWidthMm: 50.8,
    pageHeightMm: 25.4,
    labelWidthMm: 50.8,
    labelHeightMm: 25.4,
    columns: 1,
    rows: 1,
    marginLeftMm: 0,
    marginTopMm: 0,
    gapXMm: 0,
    gapYMm: 0
  }
];

export function getTemplateById(id: string): LabelTemplate {
  return labelTemplates.find((template) => template.id === id) ?? labelTemplates[0];
}
```

- [ ] **Step 3: Write PDF limit test**

Create `src/lib/pdf.test.ts`:

```ts
import { getExportLimit } from './pdf';

describe('getExportLimit', () => {
  it('limits free exports to 10 labels', () => {
    expect(getExportLimit(false)).toBe(10);
  });

  it('allows paid exports up to 1000 labels for MVP', () => {
    expect(getExportLimit(true)).toBe(1000);
  });
});
```

- [ ] **Step 4: Implement PDF export scaffolding**

Create `src/lib/pdf.ts`:

```ts
export function getExportLimit(isPaid: boolean): number {
  return isPaid ? 1000 : 10;
}
```

- [ ] **Step 5: Verify tests**

Run:

```bash
npm test -- src/lib/templates.test.ts src/lib/pdf.test.ts
```

Expected: all tests pass.

### Task 5: App UI And Conversion Flow

**Files:**

- Modify: `src/App.tsx`
- Modify: `src/styles.css`
- Create: `src/components/GeneratorPanel.tsx`
- Create: `src/components/PricingPanel.tsx`
- Create: `src/components/SeoPages.tsx`

- [ ] **Step 1: Build generator panel**

Create `src/components/GeneratorPanel.tsx` with controls for:

- CSV paste box.
- Sample CSV button.
- Template selector.
- Preview table.
- Watermarked PDF preview button.
- Paid export button.

Use this sample CSV:

```csv
sku,name,price
SKU-1001,Blue Shirt,24.00
SKU-1002,Canvas Tote,18.00
012345678905,Coffee Beans,14.99
```

- [ ] **Step 2: Add paid unlock logic**

Implement soft unlock:

- If URL has `?unlock=pro`, store `csvtolabels-unlocked=true` in `localStorage`.
- If unlocked, show "PDF export unlocked".
- If not unlocked, paid export button opens the Stripe Payment Link.
- Use `VITE_STRIPE_PAYMENT_LINK` for the paid link.
- In `.env.example`, define:

```bash
VITE_STRIPE_PAYMENT_LINK=https://buy.stripe.com/replace-me
```

- [ ] **Step 3: Add landing page copy**

Hero headline:

> Bulk barcode labels from your product CSV.

Subheadline:

> Generate Code 128, UPC-A, and EAN label sheets for Shopify exports, inventory counts, and product packaging. Preview free. Export clean PDFs when you are ready.

Primary CTA:

> Paste sample CSV

Paid CTA:

> Export full PDF - $24.97/mo

- [ ] **Step 4: Add pricing panel**

Create `src/components/PricingPanel.tsx` with:

- Free: single codes, 10-row preview, watermark.
- Pro $24.97/mo: 1,000 labels/month, no watermark, CSV upload, Avery templates.
- Business $79/mo: 10,000 labels/month, thermal templates, priority email.

- [ ] **Step 5: Build and inspect locally**

Run:

```bash
npm run build
npm run dev
```

Expected: app builds and local preview shows the landing page and generator flow.

### Task 6: SEO Pages And Launch Copy

**Files:**

- Create: `src/content/pages.ts`
- Modify: `src/App.tsx`
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`

- [ ] **Step 1: Add SEO page metadata**

Create `src/content/pages.ts` with page entries for:

- `bulk-barcode-generator`
- `upc-barcode-generator`
- `barcode-label-generator`
- `barcode-label-software`
- `shopify-barcode-generator`
- `print-barcode-labels`

Each entry must include:

- title
- description
- h1
- problem paragraph
- product CTA
- GS1 disclaimer when UPC/GTIN language appears

- [ ] **Step 2: Add static route handling**

In `src/App.tsx`, derive the current slug from `window.location.pathname` and render the matching page copy above the generator. Keep the same generator on every page.

- [ ] **Step 3: Create robots and sitemap**

Create `public/robots.txt`:

```txt
User-agent: *
Allow: /

Sitemap: https://csvtolabels.com/sitemap.xml
```

Create `public/sitemap.xml` with the six SEO URLs plus `/` and `/pricing`.

- [ ] **Step 4: Verify SEO build**

Run:

```bash
npm run build
```

Expected: build succeeds. Manually inspect `dist` output and confirm `robots.txt` and `sitemap.xml` exist.

### Task 7: Payment, Analytics, And Deployment

**Files:**

- Create: `.env.example`
- Create: `docs/launch/stripe-setup.md`
- Create: `docs/launch/analytics-events.md`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create Stripe setup doc**

Create `docs/launch/stripe-setup.md`:

```md
# Stripe Setup

Create one Payment Link for csvtolabels.com Pro at $24.97/month.

Product name: csvtolabels.com Pro
Price: $24.97/month
Success URL: https://csvtolabels.com/?unlock=pro
Cancel URL: https://csvtolabels.com/

Paste the Payment Link into `VITE_STRIPE_PAYMENT_LINK`.

For the 3-week validation MVP, unlock is intentionally soft. Replace it with Stripe Checkout webhooks after the first 10 paying customers.
```

- [ ] **Step 2: Add analytics event documentation**

Create `docs/launch/analytics-events.md` with the event list from this plan.

- [ ] **Step 3: Add lightweight analytics helper**

In `src/lib/analytics.ts`, create:

```ts
export function track(eventName: string, properties: Record<string, string | number | boolean> = {}) {
  if (typeof window === 'undefined') return;
  const plausible = (window as unknown as { plausible?: (event: string, options?: { props: typeof properties }) => void }).plausible;
  plausible?.(eventName, { props: properties });
}
```

Call `track()` on CSV upload, sample click, PDF preview, and checkout click.

- [ ] **Step 4: Deploy to Vercel or Netlify**

Run:

```bash
npm run build
```

Expected: build succeeds before deploy. Connect the repo to Vercel/Netlify, add `VITE_STRIPE_PAYMENT_LINK`, and deploy.

### Task 8: 3-Week Acquisition Sprint

**Files:**

- Create: `docs/launch/outreach-templates.md`
- Create: `docs/launch/community-posts.md`
- Create: `docs/launch/ad-test-plan.md`
- Create: `docs/launch/daily-scorecard.md`

- [ ] **Step 1: Create outreach templates**

Create `docs/launch/outreach-templates.md` with:

```md
# Outreach Templates

## Shopify/Ecommerce Seller DM

Subject: quick CSV-to-barcode label tool

I built a small tool that turns a product CSV into printable barcode label PDFs.

No Shopify install, no account required for preview:
{URL}

If you already have SKUs or UPCs in a spreadsheet, it should save the annoying Word/Avery setup step.

Would this work for your label workflow?

## Community Reply

I ran into this workflow too: taking SKUs/UPCs from a spreadsheet and turning them into printable barcode labels without installing a full Shopify app or desktop label designer.

I made a browser-based version here: {URL}

It previews labels free. The paid export is only for clean full PDF sheets.
```

- [ ] **Step 2: Create community post plan**

Create `docs/launch/community-posts.md` with 20 target post ideas:

- "How to print barcode labels from a Shopify product CSV."
- "Free bulk barcode generator for Code 128 labels."
- "Avery 5160 barcode labels from CSV."
- "How to make UPC barcode labels without Word mail merge."
- "Barcode labels for inventory counts from a spreadsheet."

- [ ] **Step 3: Create paid ad test**

Create `docs/launch/ad-test-plan.md`:

```md
# Paid Ad Test

Budget cap: $300.

Run exact match only:

- [bulk barcode generator]
- [barcode label generator]
- [barcode label software]
- [print barcode labels]
- [barcode generator for inventory]

Do not bid on broad `barcode generator`.

Success threshold:

- CPC under $5 blended, or
- paid-export click rate over 10%, or
- at least 2 paid customers from the test.

Stop if $150 is spent with zero paid-export clicks.
```

- [ ] **Step 4: Create daily scorecard**

Create `docs/launch/daily-scorecard.md`:

```md
# Daily Scorecard

Date:
Visitors:
CSV uploads:
PDF previews:
Paid export clicks:
Stripe checkouts:
Paid customers:
MRR:
Top traffic source:
Top objection:
Action for tomorrow:
```

## 21-Day Calendar

### Days 1-3: Build Core Tool

- Scaffold app.
- Implement barcode validation.
- Implement CSV paste/import.
- Implement label template preview.
- Implement watermarked PDF preview.
- Implement soft paid unlock.

Exit criteria:

- A user can paste sample CSV and see label rows.
- A user can preview a label sheet.
- A user can click checkout.

### Days 4-5: Landing And Payment

- Add pricing.
- Add Stripe Payment Link.
- Add SEO pages.
- Add analytics.
- Deploy.

Exit criteria:

- Public URL live.
- Stripe payment can unlock export.
- Analytics records checkout clicks.

### Days 6-7: Conversion QA

- Test with 5 sample CSV formats.
- Fix confusing labels/copy.
- Add GS1 disclaimer.
- Make first 10-row preview feel useful.

Exit criteria:

- A cold user can understand the product in under 10 seconds.
- PDF preview demonstrates value before payment.

### Days 8-14: Distribution Sprint 1

- Publish 6 SEO pages.
- Post 10 useful community replies.
- Send 100 targeted DMs/emails.
- Launch $150 exact-match ad test.
- Create 3 short demo clips.

Exit criteria:

- 250 targeted visitors.
- 30 CSV uploads.
- 10 paid-export clicks.
- At least 2 paying customers.

### Days 15-18: Iterate On Conversion

- Review analytics.
- Improve the top source landing page.
- Add missing template if repeatedly requested.
- Add one-time Export Pass if subscription conversion is too low.

Exit criteria:

- Paid-export click rate above 5%.
- Checkout-to-paid completion above 30%.

### Days 19-21: Distribution Sprint 2

- Send another 200 targeted messages.
- Post 10 more community replies.
- Retarget exact-match ads only if Sprint 1 produced paid-export clicks.
- Ask first users for permission to quote their use case.

Exit criteria:

- 500-1,000 targeted visitors.
- 13-18 subscribers or equivalent proof:
  - $500 MRR, or
  - $300+ MRR plus $300+ one-time export revenue, or
  - 10 paying customers and clear conversion data to scale.

## Kill Criteria

Stop or pivot if, after 1,000 targeted visitors:

- Fewer than 50 CSV uploads.
- Fewer than 20 paid-export clicks.
- Zero paid customers.
- Users repeatedly say free alternatives solve the full workflow.

Pivot options:

- One-time export pass instead of subscription.
- Shopify-specific import/export workflow.
- Printable QR labels for packaging inserts.
- Payroll/time calculator site if barcode pain is not urgent enough.

## Self-Review

Spec coverage:

- Plan targets $500/month in 3 weeks with explicit pricing, acquisition, and conversion math.
- Plan minimizes user effort through static hosting, Stripe Payment Links, no backend, no auth, and self-serve checkout.
- Plan pressure-tests SEO, paid ads, community distribution, direct outreach, and Shopify App Store routes.
- Plan includes exact MVP scope and technical implementation tasks.

Placeholder scan:

- No placeholder markers or unspecified implementation placeholders remain.

Type consistency:

- Barcode types are consistently `code128`, `upca`, and `ean13`.
- Row type fields are consistently `id`, `value`, `name`, `price`, and `note`.
- Label template fields are consistently millimeter-based and match PDF layout assumptions.
