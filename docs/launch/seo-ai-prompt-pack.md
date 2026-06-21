# SEO AI Prompt Pack

Date: 2026-06-20
Use case: generate and review blog drafts for `csvtolabels.com` with minimal editing overhead.

## 1. Operating rules

- Use AI for draft creation, not direct publishing.
- Keep every article tied to one narrow workflow or objection.
- Prefer commercial and workflow intent over broad informational traffic.
- If the draft invents product features or unsupported claims, discard it.
- If the topic drifts into official UPC issuance, mention GS1 clearly.

## 2. Master draft prompt

```text
Write a search-intent-matched blog post for csvtolabels.com.

Business:
- csvtolabels.com turns CSV rows into printable Avery 5160 Code 128 barcode labels
- the tool is built for ecommerce sellers and small inventory operators
- users can preview labels before paying for a clean PDF export
- the tool does not issue official UPC, GTIN, or GS1 identifiers

Target keyword: {keyword}
Search intent: {intent}
Reader problem: {problem}
Primary CTA: Preview barcode labels from CSV
Secondary CTA: Export a clean PDF when the preview looks correct

Requirements:
- solve one narrow workflow problem
- use direct, practical language
- avoid generic filler or barcode history sections
- include one concrete CSV example
- explain the workflow step by step
- mention GS1 only when relevant to official UPC needs
- do not claim Shopify integration, accounts, templates, or features the product does not have
- include an FAQ with 3 questions
- include a meta title under 60 characters
- include a meta description under 155 characters
- suggest 3 internal links
- suggest a slug

Output format:
1. SEO title
2. Meta description
3. Recommended slug
4. Article outline
5. Full article
6. FAQ
7. Internal link suggestions
8. CTA copy
9. Header image brief
```

## 3. Brief-to-draft prompt

Use this after the topic brief is approved.

```text
Turn the following brief into a publishable blog draft for csvtolabels.com.

Brief:
{paste brief}

Rules:
- keep paragraphs short
- keep headings literal and useful
- anchor every section in the user's workflow
- include a short example CSV snippet when helpful
- make the CTA feel like a natural next step, not a hard sell
- avoid exaggerated SEO language like ultimate, revolutionary, or game-changing
- if the article discusses UPCs, distinguish internal labels from official GS1-issued codes
```

## 4. Rewrite prompt for weak drafts

Use this only once. If the rewrite still misses, discard the draft.

```text
Rewrite this draft to make it more useful and more specific.

Fix:
- remove filler
- remove unsupported claims
- tighten the introduction
- add one practical example
- improve heading clarity
- make the CTA specific to previewing labels from CSV

Do not add new product features.
Do not broaden the topic.
```

## 5. Metadata prompt

Use this if the article body is acceptable but SEO metadata is weak.

```text
Based on this article, generate:
- 3 SEO title options under 60 characters
- 3 meta description options under 155 characters
- 3 slug options

Bias toward clarity and search intent match, not clickbait.
```

## 6. Internal links prompt

```text
Suggest 5 internal link opportunities for this article.

Available page types:
- product homepage
- workflow articles about CSV-to-label tasks
- platform-specific import articles
- GS1 or UPC disclaimer article

For each suggestion, include:
- anchor text
- destination type
- where it should appear in the article
```

## 7. Human review prompt

Use this to perform a fast editorial QA pass.

```text
Review this draft as an editor for a narrow workflow SaaS.

Check for:
- factual correctness
- clarity of the workflow
- unsupported claims
- invented product features
- weak filler
- confusing headings
- poor CTA placement
- mismatch between keyword and article content

Return:
1. Pass or fail
2. Top 5 issues only
3. Exact lines or sections to change
4. A one-paragraph improved intro if needed
```

## 8. Product feature guardrail prompt

Run this before publishing when the article makes concrete tool claims.

```text
Check this article for statements that imply product features.

Known product behavior:
- paste or upload CSV data
- preview Avery 5160 barcode labels
- export a clean PDF after payment or unlock
- use Code 128 labels from codes the user already has
- no official UPC or GS1 issuance

List any lines that overclaim or imply missing features.
```

## 9. Header image brief prompt

```text
Create a simple blog header image brief for this article.

Requirements:
- no text inside the image
- lightweight and practical visual
- show spreadsheet-to-label workflow, retail inventory context, or printed label sheets
- avoid generic AI art tropes
- no unrealistic futuristic interfaces
```

## 10. Publish checklist

Before publishing, confirm:

- the target query is obvious in the title and intro
- the article helps a real workflow
- the CTA links to the product
- claims match the actual product
- metadata is present
- internal links are added
- GS1 disclaimer appears if needed
