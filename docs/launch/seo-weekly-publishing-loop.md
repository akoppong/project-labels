# SEO Weekly Publishing Loop

Date: 2026-06-20
Goal: keep the content system running with the least practical operational overhead.

## 1. Weekly cadence

Run one session per week.

Target duration:

- 20 to 30 minutes when the system is healthy
- 45 minutes maximum before simplifying the process

## 2. Weekly sequence

1. choose topics
2. generate drafts
3. run deterministic checks
4. review drafts
5. publish approved posts
6. check traffic and conversion signals
7. decide next week's topic list

## 3. Topic selection checklist

Choose 3 to 5 topics only.

Prioritize:

- workflow-intent keywords
- comparison queries with buyer intent
- platform-specific imports tied to real user workflows
- posts that can naturally point back to the product

Avoid:

- broad educational terms
- topics that require deep standards expertise
- anything that sounds like a generic barcode encyclopedia article

## 4. Draft generation checklist

For each selected topic:

1. open the corresponding brief
2. run the master prompt or brief-to-draft prompt
3. save the output as a draft
4. convert it into the repo article template with frontmatter
5. generate metadata if needed
6. add the article to the review queue

If the first draft is weak:

- run one rewrite only
- discard if still weak

## 5. Deterministic checks

Before editorial review, run machine-verifiable checks.

Content checks:

- required frontmatter exists
- slug matches filename
- no duplicate slug
- title and description are present
- body includes at least one product CTA link
- body includes at least two internal links
- body does not include forbidden unsupported claims

Repo checks:

- blog content validation script passes
- `npm run lint` passes
- `npm test` passes
- `npm run build` passes

If any deterministic check fails, fix or discard the draft before human review.

## 6. Editorial review checklist

Check only:

- does the draft solve a real workflow problem
- is the product description accurate
- is the CTA clear
- is the article free of obvious filler
- does the metadata match the target query
- is GS1 or UPC guidance handled correctly if mentioned

Do not spend time polishing voice beyond what is needed for clarity.

## 7. Publish checklist

Before publishing each post:

- title is final
- slug is clean
- meta title is present
- meta description is present
- product CTA is linked
- at least 2 internal links are added
- one visual or header image is present if needed
- article is tagged consistently
- deterministic checks have passed in the current run

## 8. Measurement loop

Check these signals once per week:

- blog impressions
- blog clicks
- blog sessions to the product app
- preview starts from blog traffic
- export clicks from blog traffic
- purchases from blog traffic

Track them in a simple weekly log, not a custom dashboard.

## 9. Decision rules

### Keep publishing similar topics when:

- the article gets impressions within a reasonable time
- the article sends readers to the product
- the review effort stays low

### Update existing posts when:

- impressions exist but clicks are weak
- clicks exist but the article intro is weak
- the title does not match the actual query intent

### Stop publishing a topic pattern when:

- articles bring broad traffic with no product intent
- drafts repeatedly require heavy fixes
- the content attracts the wrong audience

## 10. Weekly scorecard template

Use this format:

```text
Week of:
Posts drafted:
Deterministic check failures:
Posts published:
Blog impressions:
Blog clicks:
Product visits from blog:
Preview starts from blog:
Export clicks from blog:
Purchases from blog:
Best-performing topic:
Weakest topic:
Main objection or mismatch:
Next week's topic focus:
```

## 11. Monthly cleanup rule

Once per month:

- remove weak topic ideas from the backlog
- refresh titles on weak-but-promising posts
- add internal links from newer posts to stronger posts
- review whether blog traffic is helping product usage

If the monthly review becomes complex, reduce the number of posts rather than adding process.

## 12. Low-ops guardrails

To keep the system lightweight:

- use one prompt pack
- use one publishing platform
- use one topic backlog
- use one weekly review block
- use one deterministic verification contract
- avoid custom tooling
- avoid daily content operations

The content engine should behave like a maintenance routine, not a second product.
