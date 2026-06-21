# csvtolabels.com Business Plan Design

## Purpose

Create a short operator-facing business plan for csvtolabels.com using only the existing project documents as source material. The document should help decide whether csvtolabels.com is worth building at all, and then which pricing model is most defensible if it is.

This is not an investor memo and not an implementation spec.

## Source Documents

- `docs/superpowers/plans/2026-06-16-csvtolabels-elegant-500mrr-v2.md`
- `docs/superpowers/plans/2026-06-16-csvtolabels-elegant-500mrr-v2-visual.html`
- `docs/superpowers/plans/2026-06-16-csvtolabels-aidlc-agentic-plan.md`
- `docs/superpowers/plans/2026-06-18-csvtolabels-openspec-superpowers-aidlc.md`

## Output File

- `docs/business/2026-06-18-csvtolabels-business-plan.md`

## Document Goal

Write a concise internal business plan that:

- evaluates whether the csvtolabels.com opportunity is worth building as a narrow paid utility,
- pressure-tests the path to early revenue,
- makes a clear build or no-build judgment,
- makes a clear recommendation on the primary pricing model if the build case survives scrutiny,
- states where evidence is weak or missing,
- separates product/business judgment from build details.

## Audience

Primary audience: the operator deciding whether to build, how to price if it is built, and what to test first.

The plan should be readable in a few minutes, not as a long-form memo.

## Core Judgment To Test

The central question is whether csvtolabels.com is worth building as a business at all.

That judgment should be based on:

1. whether the pain is real and urgent enough,
2. whether the acquisition path is credible enough,
3. whether the product can stay low-support and reliable enough,
4. whether the economics look strong enough to justify the effort.

If the plan concludes that csvtolabels.com is worth building, it must then recommend whether the business is more credible as:

1. a one-time paid export utility, or
2. a recurring subscription business.

## Recommended Framing

Use an operator decision-memo format. The likely decision frame from the source documents is:

- there appears to be a real narrow pain around turning spreadsheet rows into printable barcode labels,
- the product wedge is clearer than the long-term business model,
- the evidence may support building a limited utility, but not yet a durable subscription SaaS,
- the strongest early monetization evidence may point to one-time purchases before subscription,
- the `$500/month` target should be treated as a testable outcome, not as a presumed result.

If the source material supports a different conclusion, the business plan should say so.

## Required Sections

The business plan must include:

1. Executive summary
2. Product thesis
3. Beachhead customer
4. Pain point and current alternatives
5. Offer and positioning
6. Pricing model
7. Demand evidence and keyword data
8. Acquisition strategy
9. 21-day launch plan
10. Funnel math to `$500/month`
11. Operating model and low-overhead assumptions
12. Metrics dashboard
13. Risks and mitigations
14. Kill, continue, and pivot criteria
15. Next 7 actions

## Length And Style

Keep the document very short:

- most sections should be 2-5 bullets,
- use tables where they compress information better than prose,
- avoid long narrative paragraphs,
- avoid implementation detail unless it materially affects business viability,
- do not pad the document to look comprehensive.

## Evidence Rules

The business plan must:

- use the listed source documents as the factual basis,
- preserve any numbers already present in those sources,
- avoid inventing new keyword data, conversion data, or market sizing,
- state explicitly when a source document does not provide a needed number,
- tie revenue claims to assumptions already present in the source docs.

## Required Pressure Test

The business plan must explicitly challenge the weakest assumptions, especially:

- subscription willingness,
- traffic quality,
- support burden,
- PDF accuracy and print reliability,
- whether one-time purchases are more realistic than MRR.

It should not read like advocacy copy for the product.

## Recommended Structure

Organize the business plan into four compact blocks:

### 1. Thesis

- Executive summary
- Product thesis
- Beachhead customer
- Pain/current alternatives
- Offer/positioning
- Pricing recommendation

### 2. Evidence

- Demand evidence and keyword data
- Acquisition strategy
- 21-day launch plan
- Funnel math to `$500/month`

### 3. Operating Reality

- Operating model and low-overhead assumptions
- Metrics dashboard
- Risks and mitigations

### 4. Decision Rules

- Kill, continue, and pivot criteria
- Next 7 actions

## Pricing Recommendation Requirement

The pricing section must choose a primary model and explain why, but only after the document has established that the product is worth building in the first place.

Based on the current source materials, the expected recommendation is likely one of:

- one-time-first with subscription as a secondary offer, or
- one-time-led validation before promoting subscription as the main offer.

If the source documents provide stronger recurring-use evidence than expected, the business plan may recommend subscription first, but it must justify that recommendation directly from source material.

## Exclusions

Do not turn the business plan into:

- an implementation roadmap,
- a technical architecture document,
- a fundraising pitch,
- a generic SaaS growth memo,
- a market-size speculation exercise.

## Self-Review Criteria For The Final Business Plan

After drafting the business plan, verify that it:

- does not contradict the source docs,
- separates business strategy from implementation details,
- ties all revenue claims to source assumptions,
- makes the weakest assumptions explicit,
- includes clear pivot and kill criteria,
- remains short and readable.

## Known Constraint

The current workspace does not appear to contain Git metadata, so this design spec may not be committable from the current directory state. If that remains true at execution time, note it plainly instead of claiming a commit.
