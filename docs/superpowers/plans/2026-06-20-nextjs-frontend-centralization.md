# Next.js Frontend Centralization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the current Vite frontend to a Next.js App Router architecture where layout, metadata, and styling are centralized and no route owns bespoke design code.

**Architecture:** Build the app under `src/app` with Server Components by default, a root layout for shared chrome and global tokens, and one shared page composition layer that renders both the homepage and slug pages from structured content. Keep the CSV parsing and upload workflow in a small Client Component island so route shells, metadata, and marketing content remain server-rendered and maintainable.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS v4 for shared design tokens/utilities, targeted CSS Modules only when utility classes are insufficient, Vitest for migrated unit tests, Playwright for route-level smoke coverage.

---

## Current Findings

1. [`src/App.tsx`](/Users/kofiandrew/Documents/Github%20Projects/500_mrr_build/src/App.tsx:24) is the router, page shell, metadata manager, content selector, and interactive workflow host at the same time. That makes every frontend concern depend on one client component.
2. [`src/App.tsx`](/Users/kofiandrew/Documents/Github%20Projects/500_mrr_build/src/App.tsx:28) derives route state from `window.location.pathname`, and [`src/App.tsx`](/Users/kofiandrew/Documents/Github%20Projects/500_mrr_build/src/App.tsx:38) mutates `document.title` in an effect. This blocks Next.js file-system routing and the Metadata API.
3. [`src/styles.css`](/Users/kofiandrew/Documents/Github%20Projects/500_mrr_build/src/styles.css:1) is one global stylesheet containing tokens, layout rules, component rules, and element selectors like `h1`, `table`, `th`, and `td`. That is the opposite of centralized design with isolated components.
4. [`src/content/pages.ts`](/Users/kofiandrew/Documents/Github%20Projects/500_mrr_build/src/content/pages.ts:9) centralizes copy, but not page metadata behavior or route generation. The same source should drive routes, metadata, and visible content from the server.
5. [`package.json`](/Users/kofiandrew/Documents/Github%20Projects/500_mrr_build/package.json:6) is still a Vite app with no `next`, no `eslint-config-next`, and no App Router structure. Frontend maintainability work should be organized as a framework migration first, then a design-system consolidation pass.

## Alignment With Current Next.js Docs

- Next.js recommends the App Router for layouts, nested routing, special files, and shared UI conventions: [Project structure](https://nextjs.org/docs/app/getting-started/project-structure), [App Router migration](https://nextjs.org/docs/app/guides/migrating/app-router-migration).
- Next.js recommends global CSS only for truly global styles and using Tailwind or CSS Modules for component styling: [CSS guide](https://nextjs.org/docs/app/getting-started/css).
- Next.js recommends Server Components by default and adding `'use client'` only to specific interactive boundaries to reduce bundle size: [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components).
- Next.js recommends the Metadata API and file conventions for SEO and shareability instead of `document.title` effects: [Metadata and OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images).

## Target File Structure

- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Create: `src/app/page.tsx`
- Create: `src/app/[slug]/page.tsx`
- Create: `src/app/not-found.tsx`
- Create: `src/app/providers.tsx` only if a real client-side provider is needed
- Create: `src/features/label-generator/data/pages.ts`
- Create: `src/features/label-generator/server/get-page-content.ts`
- Create: `src/features/label-generator/server/metadata.ts`
- Create: `src/features/label-generator/components/page-shell.tsx`
- Create: `src/features/label-generator/components/hero.tsx`
- Create: `src/features/label-generator/components/workflow-client.tsx`
- Create: `src/features/label-generator/components/ui/*` for shared primitives only if reuse is proven
- Create: `src/features/label-generator/tests/*`
- Modify: `package.json`
- Modify: `tsconfig.json`
- Modify: `.gitignore`
- Delete after migration: `index.html`, `vite.config.ts`, `src/main.tsx`, `src/App.tsx`, `src/styles.css`

### Task 1: Replace Vite With Next.js App Router Tooling

**Files:**
- Modify: `package.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Modify: `tsconfig.json`
- Modify: `.gitignore`

- [ ] **Step 1: Replace the frontend scripts and dependencies**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "test": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest"
  },
  "dependencies": {
    "bwip-js": "^4.5.1",
    "jspdf": "^3.0.1",
    "next": "^16.0.0",
    "papaparse": "^5.5.3",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.0",
    "@types/papaparse": "^5.3.16",
    "eslint": "^9.0.0",
    "eslint-config-next": "^16.0.0",
    "tailwindcss": "^4.1.0",
    "typescript": "^5.8.3",
    "vitest": "^3.2.4"
  }
}
```

- [ ] **Step 2: Add the minimal Next.js config**

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true
};

export default nextConfig;
```

- [ ] **Step 3: Add the Tailwind PostCSS config**

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {}
  }
};
```

- [ ] **Step 4: Add the current ESLint flat config for Next.js**

```js
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([
  ...nextVitals,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts'])
]);
```

- [ ] **Step 5: Update TypeScript settings for Next.js**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "es2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 5: Install and verify the new toolchain**
- [ ] **Step 6: Install and verify the new toolchain**

Run: `npm install`
Expected: lockfile updates and `next`, `tailwindcss`, and `eslint-config-next` are present.

- [ ] **Step 7: Verify Next.js is wired correctly**

Run: `npm run lint`
Expected: ESLint runs with the Next.js config and no "could not find config" failure.

- [ ] **Step 8: Commit the tooling switch**

```bash
git add package.json package-lock.json next.config.ts postcss.config.mjs eslint.config.mjs tsconfig.json .gitignore
git commit -m "build: migrate frontend tooling to next app router"
```

### Task 2: Establish The Shared App Shell And Central Design Tokens

**Files:**
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Create: `src/features/label-generator/components/page-shell.tsx`

- [ ] **Step 1: Create the root layout with static site metadata**

```tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans'
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono'
});

export const metadata: Metadata = {
  title: {
    default: 'CSV Barcode Label PDF Generator',
    template: '%s | CSV to Labels'
  },
  description: 'Turn CSV product data into printable barcode labels.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Move only true globals into `src/app/globals.css`**

```css
@import 'tailwindcss';

:root {
  --background: #f8f1e4;
  --background-strong: #f4ead6;
  --foreground: #1f1b16;
  --muted: #5d5549;
  --accent: #bd4b20;
  --panel: rgba(255, 255, 255, 0.72);
  --panel-border: rgba(31, 27, 22, 0.08);
}

html {
  color: var(--foreground);
  background: var(--background);
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: var(--font-sans, 'Aptos', 'Segoe UI', sans-serif);
}
```

- [ ] **Step 3: Create one reusable page shell for every public route**

```tsx
type PageShellProps = {
  children: React.ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(233,122,39,0.18),transparent_28%),linear-gradient(180deg,#f8f1e4_0%,#f4ead6_100%)] px-6 py-6 md:px-12 md:py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">{children}</div>
    </main>
  );
}
```

- [ ] **Step 4: Verify no component styling is reintroduced globally**

Run: `rg -n "^h1|^table|^th|^td|^\\.hero|^\\.panel" src/app/globals.css src`
Expected: shared globals remain in `globals.css`, component selectors live with components or in utilities only.

- [ ] **Step 5: Commit the app shell foundation**

```bash
git add src/app/layout.tsx src/app/globals.css src/features/label-generator/components/page-shell.tsx
git commit -m "feat: add centralized next app shell and design tokens"
```

### Task 3: Centralize Route Content, Routing, And Metadata

**Files:**
- Create: `src/features/label-generator/data/pages.ts`
- Create: `src/features/label-generator/server/get-page-content.ts`
- Create: `src/features/label-generator/server/metadata.ts`
- Create: `src/app/page.tsx`
- Create: `src/app/[slug]/page.tsx`
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: Replace the array search with keyed route content**

```ts
export type MarketingPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  body: string;
  eyebrow: string;
};

export const defaultPage: MarketingPage = {
  slug: '',
  eyebrow: 'CSV to Avery 5160 barcode labels',
  title: 'CSV Barcode Label PDF Generator',
  description: 'Turn CSV product data into printable barcode labels.',
  h1: 'Turn a CSV into printable barcode labels.',
  body: 'Paste SKUs from Shopify, Etsy, Square, or your inventory spreadsheet. Preview labels free. Export a clean PDF when it is ready to print.'
};

export const marketingPages: Record<string, MarketingPage> = {
  'bulk-barcode-generator': {
    slug: 'bulk-barcode-generator',
    eyebrow: 'CSV barcode label generator',
    title: 'Bulk Barcode Generator from CSV',
    description: 'Generate printable Code 128 barcode labels from a CSV file.',
    h1: 'Bulk barcode generator from CSV',
    body: 'Paste product SKUs or IDs from a spreadsheet and preview Avery 5160 barcode labels before exporting a clean PDF.'
  }
};
```

- [ ] **Step 2: Add a server helper that is the single source of page truth**

```ts
import { defaultPage, marketingPages, type MarketingPage } from '@/features/label-generator/data/pages';

export function getPageContent(slug?: string): MarketingPage | null {
  if (!slug) {
    return defaultPage;
  }

  return marketingPages[slug] ?? null;
}

export function getAllSlugs(): string[] {
  return Object.keys(marketingPages);
}
```

- [ ] **Step 3: Add shared metadata generation**

```ts
import type { Metadata } from 'next';
import { getPageContent } from './get-page-content';

export function buildPageMetadata(slug?: string): Metadata {
  const page = getPageContent(slug);

  if (!page) {
    return {
      title: 'Not Found'
    };
  }

  return {
    title: page.title,
    description: page.description
  };
}
```

- [ ] **Step 4: Create the homepage route as a thin server wrapper**

```tsx
import { buildPageMetadata } from '@/features/label-generator/server/metadata';
import { LabelGeneratorRoute } from '@/features/label-generator/components/label-generator-route';

export const metadata = buildPageMetadata();

export default function HomePage() {
  return <LabelGeneratorRoute />;
}
```

- [ ] **Step 5: Create the slug route as the same composition with different data**

```tsx
import { notFound } from 'next/navigation';
import { LabelGeneratorRoute } from '@/features/label-generator/components/label-generator-route';
import { getAllSlugs, getPageContent } from '@/features/label-generator/server/get-page-content';
import { buildPageMetadata } from '@/features/label-generator/server/metadata';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return buildPageMetadata(slug);
}

export default async function SlugPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!getPageContent(slug)) {
    notFound();
  }

  return <LabelGeneratorRoute slug={slug} />;
}
```

- [ ] **Step 6: Add an explicit `not-found` route**

```tsx
export default function NotFound() {
  return <main className="px-6 py-12 text-center">Page not found.</main>;
}
```

- [ ] **Step 7: Verify route and metadata generation**

Run: `npm run build`
Expected: static generation succeeds for `/` and all configured slugs without touching `window` or `document` during render.

- [ ] **Step 8: Commit the route centralization**

```bash
git add src/app/page.tsx src/app/[slug]/page.tsx src/app/not-found.tsx src/features/label-generator/data/pages.ts src/features/label-generator/server/get-page-content.ts src/features/label-generator/server/metadata.ts
git commit -m "feat: centralize marketing routes and metadata in next app router"
```

### Task 4: Split The Interactive Workflow Into A Minimal Client Island

**Files:**
- Create: `src/features/label-generator/components/label-generator-route.tsx`
- Create: `src/features/label-generator/components/hero.tsx`
- Create: `src/features/label-generator/components/workflow-client.tsx`
- Move or modify: existing `src/components/*.tsx` into `src/features/label-generator/components/*`
- Reuse: `src/lib/csv.ts`, `src/lib/unlock.ts`, `src/lib/pdf.ts`, `src/lib/barcode.ts`

- [ ] **Step 1: Create a server route composer that passes only serializable props**

```tsx
import { getPageContent } from '@/features/label-generator/server/get-page-content';
import { PageShell } from './page-shell';
import { Hero } from './hero';
import { WorkflowClient } from './workflow-client';

export function LabelGeneratorRoute({ slug }: { slug?: string }) {
  const page = getPageContent(slug);

  if (!page) {
    return null;
  }

  return (
    <PageShell>
      <Hero eyebrow={page.eyebrow} title={page.h1} body={page.body} />
      <WorkflowClient />
    </PageShell>
  );
}
```

- [ ] **Step 2: Keep the hero purely presentational**

```tsx
type HeroProps = {
  eyebrow: string;
  title: string;
  body: string;
};

export function Hero({ eyebrow, title, body }: HeroProps) {
  return (
    <section className="grid max-w-4xl gap-4">
      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--accent)]">{eyebrow}</p>
      <h1 className="max-w-5xl text-5xl font-semibold leading-[0.94] md:text-7xl">{title}</h1>
      <p className="max-w-3xl text-lg leading-8 text-[var(--muted)] md:text-xl">{body}</p>
    </section>
  );
}
```

- [ ] **Step 3: Move the CSV workflow into one explicit client boundary**

```tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { parseCsv } from '@/lib/csv';
import { isUnlockedFromSearch } from '@/lib/unlock';

const sampleCsv = `sku,name,price
SKU-1001,Blue Shirt,24.00
SKU-1002,Canvas Tote,18.00
SKU-1003,Coffee Beans,14.99`;

export function WorkflowClient() {
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
    <>
      {/* render CsvInput, PreviewTable, LabelPreview, ExportGate here */}
    </>
  );
}
```

- [ ] **Step 4: Remove route logic from interactive components**

Run: `rg -n "window.location.pathname|document.title|seoPages|currentSlug|currentPage" src`
Expected: no matches in UI components after migration.

- [ ] **Step 5: Commit the client/server split**

```bash
git add src/features/label-generator/components src/lib
git commit -m "refactor: isolate label workflow into a next client island"
```

### Task 5: Enforce Centralized Design And Eliminate Page-Specific Styling

**Files:**
- Modify: `src/features/label-generator/components/*`
- Optional create: `src/features/label-generator/components/ui/button.tsx`
- Optional create: `src/features/label-generator/components/ui/panel.tsx`
- Optional create: `src/features/label-generator/components/ui/section-heading.tsx`

- [ ] **Step 1: Extract repeated visual patterns into primitives only when reused**

```tsx
import { type ComponentPropsWithoutRef } from 'react';

type PanelProps = ComponentPropsWithoutRef<'section'>;

export function Panel({ className = '', ...props }: PanelProps) {
  return (
    <section
      className={`rounded-3xl border border-[var(--panel-border)] bg-[var(--panel)] p-6 shadow-[0_16px_40px_rgba(73,54,25,0.08)] ${className}`}
      {...props}
    />
  );
}
```

- [ ] **Step 2: Convert component styling away from one shared global sheet**

```tsx
export function CsvInput(props: CsvInputProps) {
  return (
    <Panel>
      <div className="mb-4">
        <h2 className="mb-2 text-2xl font-semibold">1. Paste your product CSV</h2>
        <p className="text-[var(--muted)]">
          Use a column named sku, code, barcode, or id. Optional name and price columns print below the barcode.
        </p>
      </div>
      {/* remaining input markup */}
    </Panel>
  );
}
```

- [ ] **Step 3: Add a static check that prevents new page-owned CSS files**

```json
{
  "scripts": {
    "lint:design": "node scripts/check-no-page-styles.mjs"
  }
}
```

```js
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const banned = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await walk(fullPath);
      continue;
    }

    if (entry.name === 'page.module.css' || entry.name === 'page.css') {
      banned.push(fullPath);
    }
  }
}

await walk(path.join(process.cwd(), 'src', 'app'));

if (banned.length > 0) {
  console.error('Page-owned style files are not allowed:', banned);
  process.exit(1);
}
```

- [ ] **Step 4: Verify the design-system rule**

Run: `npm run lint:design`
Expected: exits successfully when styles live in shared tokens, primitives, or feature components instead of route files.

- [ ] **Step 5: Commit the design centralization**

```bash
git add src/features/label-generator/components package.json scripts/check-no-page-styles.mjs
git commit -m "refactor: centralize frontend design primitives and styling rules"
```

### Task 6: Migrate Tests And Remove Vite Artifacts

**Files:**
- Modify: `src/App.test.tsx` into `src/features/label-generator/tests/workflow-client.test.tsx`
- Create: `tests/smoke/routes.spec.ts`
- Delete: `src/main.test.tsx`
- Delete: `src/main.tsx`
- Delete: `src/App.tsx`
- Delete: `src/styles.css`
- Delete: `index.html`
- Delete: `vite.config.ts`

- [ ] **Step 1: Move component tests to the new feature structure**

```tsx
import { render, screen } from '@testing-library/react';
import { WorkflowClient } from '@/features/label-generator/components/workflow-client';

it('loads sample csv and shows the preview flow', () => {
  render(<WorkflowClient />);
  expect(screen.getByRole('button', { name: 'Paste sample CSV' })).toBeInTheDocument();
});
```

- [ ] **Step 2: Add route-level smoke coverage with Playwright**

```ts
import { expect, test } from '@playwright/test';

test('marketing slug renders shared shell and route-specific copy', async ({ page }) => {
  await page.goto('/official-upc-barcodes');
  await expect(page.getByRole('heading', { name: 'Official UPC barcodes and GS1' })).toBeVisible();
});
```

- [ ] **Step 3: Remove obsolete Vite entrypoints and assets**

Run: `rm index.html vite.config.ts src/main.tsx src/main.test.tsx src/App.tsx src/styles.css`
Expected: only Next.js entrypoints remain under `src/app`.

- [ ] **Step 4: Run the full verification suite**

Run: `npm run lint`
Expected: PASS

Run: `npm run test`
Expected: PASS

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit the cleanup**

```bash
git add -A
git commit -m "test: migrate coverage and remove obsolete vite frontend"
```

## Notes And Constraints

- "0 custom page" should be implemented as "no route-specific design code," not "no `page.tsx` files." In Next.js, route files are framework conventions; the design should live in shared shells, feature components, and tokens.
- Keep Server Components as the default. Only the CSV workflow, file upload handling, and unlock persistence need `'use client'`.
- Do not reintroduce `window`, `document`, or `localStorage` access into route wrappers, metadata helpers, or layouts.
- Keep route content data serializable and server-owned so metadata, page generation, and visible copy come from one source.

## Self-Review

- Spec coverage: This plan covers frontend maintainability, centralized design, route consolidation, Next.js best-practice migration, metadata centralization, and verification.
- Placeholder scan: No `TODO`, `TBD`, or "implement later" placeholders remain.
- Type consistency: Shared route data uses `MarketingPage`; route wrappers consume `slug?: string`; metadata generation and page lookup both depend on the same server helpers.

## Source References

- Next.js Project Structure: [https://nextjs.org/docs/app/getting-started/project-structure](https://nextjs.org/docs/app/getting-started/project-structure)
- Next.js CSS Guide: [https://nextjs.org/docs/app/getting-started/css](https://nextjs.org/docs/app/getting-started/css)
- Next.js Metadata Guide: [https://nextjs.org/docs/app/getting-started/metadata-and-og-images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- Next.js Server and Client Components: [https://nextjs.org/docs/app/getting-started/server-and-client-components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- Next.js App Router Migration: [https://nextjs.org/docs/app/guides/migrating/app-router-migration](https://nextjs.org/docs/app/guides/migrating/app-router-migration)

**Plan complete and saved to `docs/superpowers/plans/2026-06-20-nextjs-frontend-centralization.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
