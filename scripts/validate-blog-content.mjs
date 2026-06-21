/**
 * Validates all MDX files in content/blog/ against the frontmatter contract
 * and content requirements before publishing.
 *
 * Exits with code 1 on any failure so it can be used as a CI gate.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.resolve(__dirname, '../content/blog');

const REQUIRED_KEYS = ['title', 'slug', 'description', 'publishedAt', 'updatedAt', 'tags', 'keyword', 'intent', 'draft'];

const FORBIDDEN_PATTERNS = [
  { pattern: /issue[sd]?\s+official\s+UPC/i, label: 'claims to issue official UPC' },
  { pattern: /creat(e|ing)\s+GS1\s+code/i, label: 'claims to create GS1 codes' },
  { pattern: /direct\s+Shopify\s+sync/i, label: 'claims direct Shopify sync' },
  { pattern: /Shopify\s+OAuth/i, label: 'claims Shopify OAuth integration' },
  { pattern: /native\s+\.xlsx\s+(import|support)/i, label: 'claims native .xlsx support' },
  { pattern: /import\s+\.xlsx\s+files?\s+directly/i, label: 'claims direct .xlsx import' },
  { pattern: /saved?\s+templates?\s+(feature|support)/i, label: 'claims saved templates feature' },
  { pattern: /user\s+accounts?\s+(feature|support)/i, label: 'claims user accounts feature' },
];

// Matches a link href in markdown: [text](href)
const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

// A product CTA must link to one of the known product pages or the homepage
const PRODUCT_PAGES = new Set([
  '/',
  '/bulk-barcode-generator',
  '/barcode-label-generator',
  '/code-128-barcode-generator',
  '/print-barcode-labels-from-csv',
  '/shopify-barcode-labels-from-csv',
  '/official-upc-barcodes',
]);

function parseFrontmatter(raw) {
  const normalized = raw.replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const block = match[1];
  const data = {};

  for (const line of block.split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Remove surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Parse booleans
    if (value === 'true') { data[key] = true; continue; }
    if (value === 'false') { data[key] = false; continue; }

    // Parse YAML arrays on a single line: [a, b, c]
    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
      continue;
    }

    data[key] = value;
  }

  return data;
}

function getBody(raw) {
  const normalized = raw.replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  return match ? match[1] : normalized;
}

function extractLinks(body) {
  const links = [];
  let m;
  const re = new RegExp(LINK_RE.source, 'g');
  while ((m = re.exec(body)) !== null) {
    links.push({ text: m[1], href: m[2] });
  }
  return links;
}

function validatePost(filePath) {
  const errors = [];
  const filename = path.basename(filePath, '.mdx');
  const raw = fs.readFileSync(filePath, 'utf-8');

  const data = parseFrontmatter(raw);
  if (!data) {
    return [`${filename}: missing or malformed frontmatter`];
  }

  // Required keys
  for (const key of REQUIRED_KEYS) {
    if (data[key] === undefined || data[key] === '') {
      errors.push(`${filename}: missing required frontmatter key "${key}"`);
    }
  }

  // slug must match filename
  if (data.slug && data.slug !== filename) {
    errors.push(`${filename}: slug "${data.slug}" does not match filename "${filename}"`);
  }

  // draft must be boolean
  if (typeof data.draft !== 'boolean') {
    errors.push(`${filename}: "draft" must be a boolean (true or false)`);
  }

  // publishedAt must be a valid date string
  if (data.publishedAt && isNaN(Date.parse(data.publishedAt))) {
    errors.push(`${filename}: "publishedAt" is not a valid date: "${data.publishedAt}"`);
  }

  // tags must be a non-empty array
  if (!Array.isArray(data.tags) || data.tags.length === 0) {
    errors.push(`${filename}: "tags" must be a non-empty list`);
  }

  const body = getBody(raw);
  const links = extractLinks(body);

  // At least one product CTA
  const hasProductCta = links.some(l => PRODUCT_PAGES.has(l.href));
  if (!hasProductCta) {
    errors.push(`${filename}: no product CTA link found (must link to one of: ${[...PRODUCT_PAGES].join(', ')})`);
  }

  // At least two internal blog links
  const blogLinks = links.filter(l => l.href.startsWith('/blog/'));
  if (blogLinks.length < 2) {
    errors.push(`${filename}: found ${blogLinks.length} internal blog link(s), need at least 2`);
  }

  // Forbidden claims
  for (const { pattern, label } of FORBIDDEN_PATTERNS) {
    if (pattern.test(body)) {
      errors.push(`${filename}: contains forbidden claim: "${label}"`);
    }
  }

  return errors;
}

function run() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`Blog content directory not found: ${CONTENT_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'));

  if (files.length === 0) {
    console.log('No blog posts found in content/blog/');
    process.exit(0);
  }

  // Check for duplicate slugs
  const slugs = [];
  const slugErrors = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
    const data = parseFrontmatter(raw);
    if (data?.slug) {
      if (slugs.includes(data.slug)) {
        slugErrors.push(`Duplicate slug "${data.slug}" in ${file}`);
      }
      slugs.push(data.slug);
    }
  }

  const allErrors = [...slugErrors];

  for (const file of files) {
    const errors = validatePost(path.join(CONTENT_DIR, file));
    allErrors.push(...errors);
  }

  if (allErrors.length > 0) {
    console.error('\nBlog content validation failed:\n');
    for (const error of allErrors) {
      console.error(`  ✗ ${error}`);
    }
    console.error(`\n${allErrors.length} error(s) found in ${files.length} post(s).\n`);
    process.exit(1);
  }

  console.log(`Blog content validation passed: ${files.length} post(s) checked.\n`);
}

run();
