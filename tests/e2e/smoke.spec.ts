import { expect, test } from '@playwright/test';

test('homepage loads the core label-generator flow', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1, name: 'Turn a CSV into printable barcode labels.' })).toBeVisible();
  await expect(page.getByLabel('Product CSV')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Paste sample CSV' })).toBeVisible();
});

test('sample CSV populates parsed rows, preview labels, and export gate', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Paste sample CSV' }).click();

  await expect(page.getByRole('heading', { name: '2. Check parsed rows' })).toBeVisible();
  await expect(page.getByText('3 label rows detected.')).toBeVisible();
  await expect(page.getByRole('heading', { name: '3. Preview Avery 5160 sheet' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Export clean PDF' })).toBeVisible();
});

test('first-column fallback works for non-standard code headers', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('Product CSV').fill('item,title\nABC-1,Canvas Tote');

  await expect(page.getByText('1 label rows detected.')).toBeVisible();
  await expect(page.getByRole('cell', { name: 'ABC-1' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Canvas Tote' })).toBeVisible();
});

test('invalid CSV input surfaces the no-barcode validation state', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('Product CSV').fill('sku,name\n,');

  await expect(page.getByText('0 label rows detected.')).toBeVisible();
  await expect(page.getByText('No barcode values found. Add a sku, code, barcode, or id column.')).toBeVisible();
});

test('unlock query parameters reveal the clean export state', async ({ page }) => {
  await page.goto('/?unlock=export-pass');
  await page.getByRole('button', { name: 'Paste sample CSV' }).click();
  await expect(page.getByRole('heading', { name: 'Export unlocked' })).toBeVisible();

  await page.goto('/?unlock=pro');
  await page.getByRole('button', { name: 'Paste sample CSV' }).click();
  await expect(page.getByRole('heading', { name: 'Export unlocked' })).toBeVisible();
});

test('marketing seo route renders successfully', async ({ page }) => {
  await page.goto('/bulk-barcode-generator');

  await expect(page.getByRole('heading', { level: 1, name: 'Bulk barcode generator from CSV' })).toBeVisible();
  await expect(page.getByLabel('Product CSV')).toBeVisible();
});

test('mobile viewport still exposes the primary flow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1, name: 'Turn a CSV into printable barcode labels.' })).toBeVisible();
  await page.getByRole('button', { name: 'Paste sample CSV' }).click();
  await expect(page.getByRole('heading', { name: '3. Preview Avery 5160 sheet' })).toBeVisible();
});
