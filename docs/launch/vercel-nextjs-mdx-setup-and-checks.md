# Vercel Next.js MDX Blog Setup And Checks

Date: 2026-06-20
Recommended publishing model: `Next.js + local MDX on Vercel`
Goal: run a low-cost SEO blog inside the existing product app with the fewest possible services and clear deterministic checks.

## 1. Desired end state

- Product app stays on `csvtolabels.com`
- Blog lives on the same domain under `/blog/*`
- Posts are stored in the repo as local Markdown or MDX files
- Vercel builds and serves the blog with the existing app
- AI creates drafts
- a human reviews and publishes in batches
- the publish path is validated with deterministic checks

## 2. Why this is now the default

This is the best fit when the priority order is:

1. lowest dollar cost
2. strongest SEO cohesion
3. lowest operational overhead

Why it fits:

- no Ghost or CMS subscription
- no extra hosting layer beyond Vercel
- same-domain content and product pages
- static generation works well for blog content
- internal links, metadata, and sitemap logic can live in one app

The tradeoff is editorial convenience. The organization owns the content files in the repo instead of using a separate CMS UI.

## 3. Recommended content architecture

### Routes

- homepage and tool remain at the current product routes
- blog index should live at `/blog`
- articles should live at `/blog/[slug]`

### Source of truth

- one local content directory in the repo
- one frontmatter contract for every post
- one shared article template

### Suggested content structure

```text
content/blog/
  print-barcode-labels-from-csv.mdx
  bulk-barcode-generator-from-spreadsheet.mdx
  shopify-barcode-labels-from-csv.mdx
```

Each article file should include deterministic frontmatter fields.

## 4. Frontmatter contract

Every post should include:

- `title`
- `slug`
- `description`
- `publishedAt`
- `updatedAt`
- `tags`
- `keyword`
- `intent`
- `draft`

Optional:

- `canonicalUrl`
- `heroImage`
- `faq`

Rules:

- `slug` must match the filename
- `description` should stay concise
- `draft` should be boolean
- `publishedAt` should use ISO date format
- `tags` should be a non-empty list

## 5. Publishing workflow

### Default workflow

1. pick 3 to 5 topics from the backlog
2. generate drafts with the prompt pack
3. save each draft as a local `.mdx` file
4. run deterministic checks
5. fix or discard weak drafts
6. commit the approved posts
7. let Vercel deploy the changes

### Why this works

- no extra platform account
- publishing is just a normal repo change
- Vercel deployment path stays unchanged
- content and product deploy together

## 6. Deterministic content checks

The blog workflow should not rely on subjective review alone. Add deterministic gates for article files.

### Required checks per post

1. file path is under `content/blog/`
2. filename slug matches frontmatter `slug`
3. required frontmatter keys exist
4. `title` is non-empty
5. `description` is non-empty
6. `draft` is boolean
7. `publishedAt` parses as a valid date
8. `tags` is a non-empty list
9. article body contains at least one product CTA link
10. article body contains at least two internal links
11. article does not contain forbidden unsupported claims
12. no duplicate slugs across posts

### Forbidden unsupported claims

At minimum, fail drafts that claim:

- official UPC issuance
- GS1 code creation
- direct Shopify sync
- native `.xlsx` import if not supported
- saved templates or accounts if not supported

### Repo-level checks

The blog changes should also pass:

- frontmatter/schema validation script
- internal-link validation for local blog links
- `npm run lint`
- `npm test`
- `npm run build`

If a canonical `npm run verify` command is introduced, blog publishing should use that instead of a separate manual list.

## 7. Deterministic check implementation plan

Add a repo-owned script such as:

- `scripts/validate-blog-content.mjs`

That script should:

- scan all `content/blog/*.mdx` files
- parse frontmatter
- validate required keys and types
- validate slug uniqueness
- search for required CTA and internal-link patterns
- search for forbidden claims
- exit non-zero on any failure

### Recommended publish contract

Run checks in this order:

1. content validation script
2. repo lint
3. repo tests
4. production build

This keeps the content pipeline aligned with the broader deterministic checks design already defined for the app.

## 8. AI drafting rules for MDX

When AI generates a draft:

- it must produce valid frontmatter
- it must follow the article template
- it must include the correct CTA
- it must not invent unsupported product features

The AI output should be treated as candidate content, not as final publishable copy until the deterministic checks pass.

## 9. Internal linking rules

Every post should link to:

- the product homepage
- one related workflow article
- one relevant disclaimer or standards page when applicable

Keep link architecture shallow. The goal is support for ranking and conversion, not a complex content hub.

## 10. Metadata and sitemap rules

The blog should use the same Next.js metadata and sitemap mechanisms as the rest of the app.

Requirements:

- each article exposes route-specific metadata
- blog routes are included in sitemap generation
- draft posts are excluded from production sitemap output
- canonical URLs are set consistently

This improves determinism because one application owns both content routing and SEO metadata.

## 11. What not to build

Do not build:

- a custom editorial dashboard
- a content database
- a second deployment target
- a separate CMS just to avoid MDX files
- auto-publish directly from AI
- custom workflow software before content volume proves the need

These all increase complexity faster than they increase ranking potential.

## 12. Suggested implementation order

1. create the blog route architecture
2. add the local content directory
3. define the frontmatter schema
4. add the blog content validation script
5. wire blog validation into the repo verification contract
6. create the first 3 posts from the existing briefs
7. verify sitemap and metadata behavior
8. publish through the normal Vercel deployment path

## 13. Success condition

The setup is working when:

- posts can be added without extra paid services
- content lives on the main domain
- every publish goes through deterministic validation
- Vercel deploys the blog as part of the existing app
- weekly content operations stay under about 30 minutes
