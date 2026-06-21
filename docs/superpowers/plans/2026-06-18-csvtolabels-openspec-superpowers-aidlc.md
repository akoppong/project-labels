# csvtolabels.com OpenSpec + Superpowers AIDLC Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development for implementation packages after OpenSpec product governance passes. Do not use OpenSpec `/opsx:apply` as the primary implementation driver for this MVP.

**Goal:** Set up a lightweight operating engine where OpenSpec governs product/spec assumptions, Superpowers governs implementation execution, Codex orchestrates the work, and GitHub records approvals and verification.

**Architecture:** OpenSpec stores the product challenge, assumptions, proposal, design, and spec deltas in the repo. Superpowers stores the execution-grade implementation plans and review workflow. GitHub provides durable issues, PRs, CI, and optional Codex review automation.

**Tech Stack:** OpenSpec, Superpowers, Codex, GitHub Issues/PRs, GitHub Actions, Vite, React, TypeScript, Vitest, Stripe Payment Links, Vercel or Netlify.

---

## Source Documents

- Product plan: `docs/superpowers/plans/2026-06-16-csvtolabels-elegant-500mrr-v2.md`
- Visual review: `docs/superpowers/plans/2026-06-16-csvtolabels-elegant-500mrr-v2-visual.html`
- Lean AIDLC plan: `docs/superpowers/plans/2026-06-16-csvtolabels-aidlc-agentic-plan.md`

## Operating Model

Use the tools this way:

| Layer | Tool | Owns | Does Not Own |
|---|---|---|---|
| Product governance | OpenSpec | Product Challenge Gate, assumptions, proposal, design, scope deltas, archive of decisions | Task-by-task code execution |
| Execution discipline | Superpowers | Implementation plan, TDD, subagent sequencing, spec review, code review, verification-before-completion | Product-market decision authority |
| Work engine | Codex | Orchestration, implementation workers, review workers, browser QA, local edits | Unapproved outbound posting or paid ads |
| Control plane | GitHub | Issues, PRs, CI, review history, release records | Product reasoning hidden in chat only |

Critical rule:

- If OpenSpec and Superpowers disagree, pause. OpenSpec decides whether the product/change should exist. Superpowers decides how approved work is implemented and verified.

## Target Repository Structure

Create or maintain this structure:

```text
AGENTS.md
openspec/
  changes/
    csvtolabels-mvp/
      proposal.md
      assumptions.md
      design.md
      tasks.md
      specs/
        csvtolabels-mvp.md
docs/
  superpowers/
    plans/
      2026-06-16-csvtolabels-elegant-500mrr-v2.md
      2026-06-16-csvtolabels-aidlc-agentic-plan.md
      2026-06-18-csvtolabels-openspec-superpowers-aidlc.md
  launch/
    stripe-setup.md
    outreach-templates.md
    community-replies.md
    ad-test.md
    daily-scorecard.md
.github/
  PULL_REQUEST_TEMPLATE.md
  codex/
    prompts/
      product-challenge.md
      spec-review.md
      code-review.md
      browser-qa.md
  workflows/
    ci.yml
    codex-review.yml
```

## Task 1: Initialize OpenSpec As Product Governance

**Files:**

- Create or update: `openspec/`
- Create: `openspec/changes/csvtolabels-mvp/proposal.md`
- Create: `openspec/changes/csvtolabels-mvp/assumptions.md`
- Create: `openspec/changes/csvtolabels-mvp/design.md`
- Create: `openspec/changes/csvtolabels-mvp/tasks.md`
- Create: `openspec/changes/csvtolabels-mvp/specs/csvtolabels-mvp.md`

- [ ] **Step 1: Install and initialize OpenSpec**

Run:

```bash
npm install -g @fission-ai/openspec@latest
openspec init
```

Expected:

- `openspec/` exists.
- OpenSpec command files and guidance are added to the repo.
- If prompted for a profile, choose the lightweight/default profile unless a Codex-specific profile is offered.

- [ ] **Step 2: Disable telemetry for this validation repo if desired**

Run:

```bash
export OPENSPEC_TELEMETRY=0
```

Expected:

- The current shell disables anonymous OpenSpec telemetry.
- For durable opt-out, add the export to the user's shell profile outside this repo.

- [ ] **Step 3: Create the csvtolabels.com change folder**

Run:

```bash
mkdir -p openspec/changes/csvtolabels-mvp/specs
```

Expected:

- `openspec/changes/csvtolabels-mvp/specs/` exists.

- [ ] **Step 4: Create the OpenSpec proposal**

Create `openspec/changes/csvtolabels-mvp/proposal.md`:

```md
# csvtolabels.com MVP Proposal

## Why

Small ecommerce sellers and inventory operators often have product codes in a spreadsheet but struggle to turn those rows into printable barcode labels without mail merge, desktop label software, or manual copy-paste.

## What Changes

Build a lightweight web utility called csvtolabels.com:

- Paste or upload CSV.
- Detect SKU, code, barcode, id, or first-column values.
- Render Code 128 barcode labels.
- Preview Avery 5160 labels in the browser.
- Export a watermarked preview PDF for free.
- Gate clean PDF export behind Stripe Payment Links.
- Provide SEO and GS1/UPC disclaimer pages.

## What Does Not Change

The MVP does not include:

- Official UPC or GS1 issuance.
- UPC-A, EAN, QR codes, or scanners.
- Shopify OAuth.
- User accounts.
- Saved templates.
- Multiple label templates.
- Inventory management.
- Stripe webhooks.
- Backend database.

## Success

The validation succeeds if, within 21 days of launch, csvtolabels.com reaches one of these outcomes:

- 18 Pro subscribers at $29/month.
- Mixed revenue equivalent with at least 10 paying customers.
- Clear evidence that one-time Export Pass demand exists and should become the primary offer.

## Failure Or Pivot Signal

After 1,000 targeted visitors:

- Pivot traffic or positioning if fewer than 100 users paste or upload CSV.
- Improve preview or PDF value if fewer than 30 users click export.
- Adjust offer if export clicks happen but fewer than 5 users pay.
- Stop or rethink the wedge if traffic is mainly broad free-barcode-generator traffic.
```

- [ ] **Step 5: Create the product assumptions file**

Create `openspec/changes/csvtolabels-mvp/assumptions.md`:

```md
# csvtolabels.com Product Assumptions

## Product Challenge Status

PRODUCT_STATUS: PROCEED

## Beachhead Buyer

Primary beachhead: ecommerce sellers and small inventory operators who already have product codes in CSV or spreadsheet form and need printable labels quickly.

Secondary beachheads:

- Shopify sellers exporting product CSVs.
- Etsy sellers managing handmade product SKUs.
- Small warehouse or stockroom operators labeling bins and items.

## Strongest Assumption

The paid pain is not "generate one barcode." The paid pain is "turn many spreadsheet rows into printable labels without fighting label software."

## Weakest Assumption

Subscription demand may be weaker than one-time export demand. The first offer should keep both $19 Export Pass and $29/month Pro visible until payment behavior proves which one is primary.

## Channel Assumption

The first 500-1,000 targeted visitors will come from problem-thread distribution, direct outreach, and exact-match paid search. SEO pages are created now but are not expected to produce the 21-day revenue target.

## Paid Moment Assumption

Free preview creates trust. Clean PDF export is the paid moment because it is the point where the user has confirmed the layout is useful.

## Scope Assumption

Code 128 plus Avery 5160 is enough for the first validation wedge. Requests for other label sizes are logged and not built unless two paying users ask for the same one.

## Operations Assumption

Support can stay low because the product avoids accounts, OAuth, inventory sync, official UPC issuance, and saved templates.
```

- [ ] **Step 6: Create the OpenSpec design**

Create `openspec/changes/csvtolabels-mvp/design.md`:

```md
# csvtolabels.com MVP Design

## Architecture

Build a static client-side app. The browser parses CSV, validates Code 128 values, previews labels, generates PDF output, and sends users to Stripe Payment Links for paid export.

## Main Flow

1. User lands on csvtolabels.com.
2. User pastes or uploads CSV.
3. App detects barcode values from `sku`, `code`, `barcode`, `id`, or first filled column.
4. App shows parsed rows and label preview.
5. User can export a limited watermarked preview PDF.
6. User pays through Export Pass or Pro.
7. Stripe success URL returns with `?unlock=export-pass` or `?unlock=pro`.
8. App unlocks clean PDF export in the browser.

## Technical Constraints

- No backend.
- No database.
- No account system.
- No Shopify OAuth.
- No Stripe webhooks during validation.
- No official UPC or GS1 issuance.

## Libraries

- Vite and React for the frontend.
- TypeScript for strict typing.
- Vitest and Testing Library for verification.
- `papaparse` for CSV parsing.
- `bwip-js` for Code 128 rendering.
- `jspdf` for PDF output.

## Risk Controls

- Add GS1/UPC disclaimer page.
- Keep Stripe unlock soft during validation.
- Replace soft unlock only after first 10 paying customers.
- Browser-test PDF output before public launch.
```

- [ ] **Step 7: Create OpenSpec tasks as governance checklist**

Create `openspec/changes/csvtolabels-mvp/tasks.md`:

```md
# csvtolabels.com OpenSpec Tasks

- [ ] Product Challenge Gate has been run.
- [ ] Assumptions file reflects the current beachhead, pain, channel, paid moment, and operations constraints.
- [ ] Superpowers implementation plan exists.
- [ ] Four-package AIDLC execution plan exists.
- [ ] GitHub PR template requires product, test, and review evidence.
- [ ] CI runs tests and build.
- [ ] Codex review prompt files exist.
- [ ] Launch assets exist.
- [ ] Product metrics are tracked daily after launch.
- [ ] Scope changes are proposed through OpenSpec before implementation.
```

- [ ] **Step 8: Create the MVP spec**

Create `openspec/changes/csvtolabels-mvp/specs/csvtolabels-mvp.md`:

```md
# csvtolabels.com MVP Spec

## Requirement: CSV Input

The app must allow users to paste CSV text and upload a CSV file.

### Scenario: Named Code Column

Given a CSV with `sku,name,price`
When the user pastes it into the app
Then the app uses `sku` as the barcode value
And displays `name` and `price` as optional label text.

### Scenario: First Column Fallback

Given a CSV without `sku`, `code`, `barcode`, or `id`
When the user pastes it into the app
Then the app uses the first filled column as the barcode value.

## Requirement: Code 128 Validation

The app must validate that barcode values are non-empty printable characters.

### Scenario: Invalid Value

Given a barcode value with a newline
When the app validates the row
Then the app shows an error and does not silently render an invalid barcode.

## Requirement: Avery 5160 Preview

The app must preview labels for Avery 5160 sheets.

### Scenario: Preview Before Payment

Given valid CSV rows
When the user previews labels
Then the user can inspect the label sheet before paying.

## Requirement: Paid Export

The app must gate clean PDF export behind Stripe Payment Links.

### Scenario: Export Pass Unlock

Given the user returns with `?unlock=export-pass`
When the app loads
Then clean PDF export is unlocked.

### Scenario: Pro Unlock

Given the user returns with `?unlock=pro`
When the app loads
Then clean PDF export is unlocked.

## Requirement: SEO And Disclaimer

The app must include SEO pages and a GS1/UPC disclaimer page.

### Scenario: Official UPC Guidance

Given a user visits `/official-upc-barcodes`
Then the page explains that csvtolabels.com renders labels from user-provided codes and does not issue official UPC, GTIN, or GS1 identifiers.
```

## Task 2: Add Repo-Level Codex Instructions

**Files:**

- Create: `AGENTS.md`

- [ ] **Step 1: Create AGENTS.md**

Create `AGENTS.md`:

```md
# csvtolabels.com Agent Instructions

## Product Authority

- OpenSpec owns product assumptions, change proposals, product challenge decisions, and scope deltas.
- Superpowers owns implementation plans, TDD, subagent-driven execution, review loops, and verification.
- If OpenSpec and Superpowers conflict, pause and ask the controller to reconcile before coding.

## Product Challenge Gate

Before implementation starts, run the Product Challenge Gate from `docs/superpowers/plans/2026-06-16-csvtolabels-aidlc-agentic-plan.md`.

Implementation may proceed only when:

- Beachhead buyer is explicit.
- Urgent job is spreadsheet-to-printable-labels.
- Acquisition path does not depend mainly on SEO within 21 days.
- Scope remains Code 128, Avery 5160, CSV input, preview, and paid PDF export.

## Scope Rules

Do not build:

- Backend or database.
- User accounts.
- Shopify OAuth.
- Stripe webhooks.
- UPC-A, EAN, QR codes, or official GS1 issuance.
- Multiple label templates.
- Saved templates.
- Inventory management.
- Drag-and-drop label design.
- Team plans.

Log requests for excluded features in OpenSpec. Do not implement them without an approved OpenSpec change.

## Execution Rules

- Use one implementation worker at a time.
- Group implementation into the four packages from `docs/superpowers/plans/2026-06-16-csvtolabels-aidlc-agentic-plan.md`.
- Run spec compliance review before code quality review.
- Do not start the next package with open spec issues or important code-quality issues.
- Run `npm test` and `npm run build` before claiming completion.

## Git Rules

- Work on a `codex/` branch or worktree.
- Do not commit unrelated files.
- Do not remove user changes unless explicitly asked.
- Open a PR before merging into main.

## Launch Rules

- User approval is required before sending outreach, posting community replies, or running paid ads.
- Stripe Payment Links are user-owned credentials and should not be invented.
- The default ad budget cap is $300 unless the user changes it.
```

- [ ] **Step 2: Verify Codex instruction file exists**

Run:

```bash
test -f AGENTS.md
```

Expected: command exits with code 0.

## Task 3: Add GitHub Control Plane

**Files:**

- Create: `.github/PULL_REQUEST_TEMPLATE.md`
- Create: `.github/workflows/ci.yml`
- Create: `.github/workflows/codex-review.yml`
- Create: `.github/codex/prompts/product-challenge.md`
- Create: `.github/codex/prompts/spec-review.md`
- Create: `.github/codex/prompts/code-review.md`
- Create: `.github/codex/prompts/browser-qa.md`

- [ ] **Step 1: Create GitHub directories**

Run:

```bash
mkdir -p .github/workflows .github/codex/prompts
```

Expected:

- `.github/workflows/` exists.
- `.github/codex/prompts/` exists.

- [ ] **Step 2: Create PR template**

Create `.github/PULL_REQUEST_TEMPLATE.md`:

```md
## Summary

Describe what changed and which AIDLC package this PR completes.

## Product Challenge

- [ ] OpenSpec assumptions still support this change.
- [ ] No excluded scope was added.
- [ ] Any product-scope change has an OpenSpec proposal.

## Verification

- [ ] `npm test`
- [ ] `npm run build`
- [ ] Browser QA, if UI or PDF behavior changed.

## Review Gates

- [ ] Spec compliance review passed.
- [ ] Code quality review passed.
- [ ] Important reviewer findings were fixed or explicitly rejected with rationale.

## Screenshots Or Artifacts

Attach screenshots, PDF samples, or notes for UI/PDF changes.

## Launch Impact

State whether this affects checkout, Stripe links, analytics, outreach copy, SEO pages, or daily scorecard metrics.
```

- [ ] **Step 3: Create CI workflow**

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  pull_request:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build
```

- [ ] **Step 4: Create optional Codex review workflow**

Create `.github/workflows/codex-review.yml`:

```yaml
name: Codex Review

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  codex_review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
      issues: write
    steps:
      - uses: actions/checkout@v5
        with:
          ref: refs/pull/${{ github.event.pull_request.number }}/merge
          persist-credentials: false
      - name: Run Codex review
        id: codex
        uses: openai/codex-action@v1
        with:
          openai-api-key: ${{ secrets.OPENAI_API_KEY }}
          prompt-file: .github/codex/prompts/code-review.md
          sandbox: read-only
          output-file: codex-review.md
      - name: Post Codex review
        if: steps.codex.outputs.final-message != ''
        uses: actions/github-script@v7
        with:
          github-token: ${{ github.token }}
          script: |
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.payload.pull_request.number,
              body: process.env.CODEX_FINAL_MESSAGE,
            });
        env:
          CODEX_FINAL_MESSAGE: ${{ steps.codex.outputs.final-message }}
```

Activation note:

- This workflow requires `OPENAI_API_KEY` as a GitHub secret.
- Keep it optional until the repo is pushed to GitHub and secrets are configured.

- [ ] **Step 5: Create product challenge prompt**

Create `.github/codex/prompts/product-challenge.md`:

```md
# Product Challenge Review

Review the current csvtolabels.com proposal and assumptions before implementation.

Sources:

- `openspec/changes/csvtolabels-mvp/proposal.md`
- `openspec/changes/csvtolabels-mvp/assumptions.md`
- `openspec/changes/csvtolabels-mvp/design.md`
- `docs/superpowers/plans/2026-06-16-csvtolabels-elegant-500mrr-v2.md`
- `docs/superpowers/plans/2026-06-16-csvtolabels-aidlc-agentic-plan.md`

Return:

PRODUCT_STATUS: PROCEED | REVISE | STOP
STRONGEST_ASSUMPTION:
WEAKEST_ASSUMPTION:
BUILD_SCOPE_CHANGE:
GO_TO_MARKET_CHANGE:
USER_DECISION_REQUIRED:

Be adversarial. Do not approve implementation if the buyer, pain, channel, paid moment, or low-ops constraint is vague.
```

- [ ] **Step 6: Create spec review prompt**

Create `.github/codex/prompts/spec-review.md`:

```md
# Spec Compliance Review

Review the PR against the approved OpenSpec change and the relevant Superpowers package.

Check:

- Required behavior is implemented.
- No acceptance criterion is skipped.
- No excluded scope is added.
- No backend, database, auth, Shopify OAuth, Stripe webhook, extra barcode type, or extra template is introduced.

Return:

SPEC_STATUS: PASS | FAIL
MISSING_REQUIREMENTS:
EXTRA_SCOPE:
REQUIRED_FIXES:
```

- [ ] **Step 7: Create code review prompt**

Create `.github/codex/prompts/code-review.md`:

```md
# Code Quality Review

Review this PR as a senior engineer.

Prioritize:

- Correctness bugs.
- Behavioral regressions.
- Missing tests.
- Type-safety problems.
- Brittle PDF layout logic.
- Payment-link mistakes.
- UI issues that block a cold user from previewing labels or reaching checkout.

Deprioritize:

- Style nits that do not affect maintainability.
- Feature requests outside the approved MVP scope.

Return findings first, ordered by severity, with file and line references where possible.
If there are no findings, say that explicitly and list residual risks.
```

- [ ] **Step 8: Create browser QA prompt**

Create `.github/codex/prompts/browser-qa.md`:

```md
# Browser QA

Run the local app and test the buyer flow.

Checklist:

1. Open the app locally.
2. Paste CSV with `sku,name,price`.
3. Confirm parsed table shows code, name, and price.
4. Paste CSV with unknown headers and confirm first-column fallback.
5. Upload a CSV file.
6. Confirm blank CSV error.
7. Confirm invalid Code 128 value shows an error.
8. Preview labels.
9. Export watermarked preview PDF.
10. Visit `/?unlock=export-pass` and confirm clean export is unlocked.
11. Visit `/?unlock=pro` and confirm clean export is unlocked.
12. Visit SEO and disclaimer pages.
13. Check mobile layout.

Return:

BROWSER_QA_STATUS: PASS | FAIL
BLOCKING_ISSUES:
NON_BLOCKING_ISSUES:
ARTIFACTS:
```

## Task 4: Connect OpenSpec To Superpowers Execution

**Files:**

- Create: `docs/superpowers/plans/2026-06-18-csvtolabels-execution-handoff.md`

- [ ] **Step 1: Create execution handoff**

Create `docs/superpowers/plans/2026-06-18-csvtolabels-execution-handoff.md`:

```md
# csvtolabels.com Execution Handoff

## Product Governance Source

OpenSpec change:

- `openspec/changes/csvtolabels-mvp/proposal.md`
- `openspec/changes/csvtolabels-mvp/assumptions.md`
- `openspec/changes/csvtolabels-mvp/design.md`
- `openspec/changes/csvtolabels-mvp/specs/csvtolabels-mvp.md`

## Execution Source

Superpowers plans:

- `docs/superpowers/plans/2026-06-16-csvtolabels-elegant-500mrr-v2.md`
- `docs/superpowers/plans/2026-06-16-csvtolabels-aidlc-agentic-plan.md`

## Execution Packages

1. Foundation and core data.
2. Export and monetization path.
3. Single workflow UI and SEO.
4. Launch assets and deployment readiness.

## Required Sequence

1. Run Product Challenge Gate.
2. If `PRODUCT_STATUS` is `PROCEED`, create or switch to `codex/csvtolabels-mvp`.
3. Execute Package 1.
4. Run spec compliance review.
5. Run code quality review.
6. Repeat for Packages 2-4.
7. Run browser QA.
8. Deploy.
9. Start launch sprint.

## Stop Conditions

Stop and ask the user before continuing if:

- Product challenge returns `REVISE` or `STOP`.
- A package requires excluded scope to pass.
- PDF output cannot be made plausible for Avery 5160.
- Stripe/payment behavior cannot be tested safely.
- CI fails repeatedly after focused fixes.
```

- [ ] **Step 2: Verify handoff file**

Run:

```bash
test -f docs/superpowers/plans/2026-06-18-csvtolabels-execution-handoff.md
```

Expected: command exits with code 0.

## Task 5: Create GitHub Issues Or Project Cards

**Files:**

- Create: `docs/superpowers/plans/2026-06-18-csvtolabels-github-issues.md`

- [ ] **Step 1: Create GitHub issue templates for manual creation**

Create `docs/superpowers/plans/2026-06-18-csvtolabels-github-issues.md`:

```md
# csvtolabels.com GitHub Issues

## Issue 1: Product Challenge Gate

Run the product challenge using OpenSpec assumptions and decide `PROCEED`, `REVISE`, or `STOP`.

Acceptance:

- Product challenge output is posted in the issue.
- Any revisions are committed to `openspec/changes/csvtolabels-mvp/assumptions.md`.

## Issue 2: Package 1 - Foundation And Core Data

Implement app scaffold, CSV parser, and Code 128 validation.

Acceptance:

- `npm test -- src/lib/csv.test.ts src/lib/barcode.test.ts` passes.
- `npm run build` passes.
- Spec review passes.
- Code review passes.

## Issue 3: Package 2 - Export And Monetization Path

Implement unlock helpers and Avery 5160 PDF layout helpers.

Acceptance:

- `npm test -- src/lib/unlock.test.ts src/lib/pdf.test.ts` passes.
- `npm run build` passes.
- Spec review passes.
- Code review passes.

## Issue 4: Package 3 - Single Workflow UI And SEO

Implement the landing workflow, preview UI, export gate, SEO pages, robots file, sitemap, and disclaimer route.

Acceptance:

- `npm test` passes.
- `npm run build` passes.
- Browser QA passes.
- Spec review passes.
- Code review passes.

## Issue 5: Package 4 - Launch Assets And Deployment Readiness

Create launch docs, Stripe setup, outreach templates, ad test, scorecard, and launch checklist.

Acceptance:

- Launch docs exist.
- User approves outbound copy.
- `npm test` passes.
- `npm run build` passes.
- Spec review passes.
- Code review passes.

## Issue 6: Deploy And Launch Sprint

Deploy public URL, wire Stripe links, verify analytics, and start daily scorecard.

Acceptance:

- Public URL works.
- Stripe success URLs unlock export.
- Analytics records funnel events.
- Daily scorecard is updated.
```

## Task 6: Verify The Operating Engine

**Files:**

- Read: `AGENTS.md`
- Read: `openspec/changes/csvtolabels-mvp/proposal.md`
- Read: `openspec/changes/csvtolabels-mvp/assumptions.md`
- Read: `.github/PULL_REQUEST_TEMPLATE.md`
- Read: `.github/workflows/ci.yml`
- Read: `.github/codex/prompts/product-challenge.md`
- Read: `docs/superpowers/plans/2026-06-18-csvtolabels-execution-handoff.md`

- [ ] **Step 1: Run file existence checks**

Run:

```bash
test -f AGENTS.md
test -f openspec/changes/csvtolabels-mvp/proposal.md
test -f openspec/changes/csvtolabels-mvp/assumptions.md
test -f openspec/changes/csvtolabels-mvp/design.md
test -f openspec/changes/csvtolabels-mvp/tasks.md
test -f openspec/changes/csvtolabels-mvp/specs/csvtolabels-mvp.md
test -f .github/PULL_REQUEST_TEMPLATE.md
test -f .github/workflows/ci.yml
test -f .github/codex/prompts/product-challenge.md
test -f .github/codex/prompts/spec-review.md
test -f .github/codex/prompts/code-review.md
test -f .github/codex/prompts/browser-qa.md
test -f docs/superpowers/plans/2026-06-18-csvtolabels-execution-handoff.md
```

Expected: every command exits with code 0.

- [ ] **Step 2: Run forbidden marker scan**

Run:

```bash
python3 - <<'PY'
from pathlib import Path

markers = [
    "TB" + "D",
    "TO" + "DO",
    "place" + "holder",
    "implement" + " later",
    "fill" + " in details",
    "Add" + " appropriate",
    "handle" + " edge cases",
    "similar" + " to Task",
]

paths = [
    Path("AGENTS.md"),
    Path("openspec"),
    Path(".github"),
    Path("docs/superpowers/plans"),
]

failures = []
for path in paths:
    files = [path] if path.is_file() else [p for p in path.rglob("*") if p.is_file()]
    for file_path in files:
        text = file_path.read_text(encoding="utf-8", errors="ignore")
        for line_number, line in enumerate(text.splitlines(), 1):
            if any(marker in line for marker in markers):
                failures.append(f"{file_path}:{line_number}:{line}")

if failures:
    print("\n".join(failures))
    raise SystemExit(1)
PY
```

Expected:

- No matches in the newly created operating-engine files.
- Existing docs may contain legitimate occurrences only if they are examples of forbidden markers in planning guidance.

- [ ] **Step 3: Verify product-governance and execution boundaries**

Run:

```bash
rg -n "OpenSpec owns|Superpowers owns|Product Challenge Gate|Do not use OpenSpec `/opsx:apply`" AGENTS.md docs/superpowers/plans/2026-06-18-csvtolabels-openspec-superpowers-aidlc.md
```

Expected:

- Matches show that OpenSpec is product governance and Superpowers is execution governance.

- [ ] **Step 4: Verify GitHub workflow syntax after app scaffold exists**

Run after `package.json` exists:

```bash
npm test
npm run build
```

Expected:

- Tests pass.
- Build passes.

## Definition Of Done

This operating-engine setup is complete when:

- OpenSpec is initialized.
- csvtolabels.com OpenSpec change artifacts exist.
- `AGENTS.md` defines Codex/Superpowers/OpenSpec boundaries.
- GitHub PR template exists.
- CI workflow exists.
- Codex prompt files exist.
- Execution handoff file exists.
- GitHub issue plan exists.
- Forbidden marker scan passes.
- The next step is unambiguous: run Product Challenge Gate, then start Package 1 only if status is `PROCEED`.

## Execution Handoff

After this setup plan is executed, implementation should proceed in this order:

1. Run `.github/codex/prompts/product-challenge.md` against the OpenSpec files.
2. If status is `PROCEED`, create or switch to `codex/csvtolabels-mvp`.
3. Execute Package 1 from the lean AIDLC plan.
4. Run spec compliance review.
5. Run code quality review.
6. Continue package-by-package.
7. Run browser QA before deployment.
8. Deploy only after test, build, review, and browser QA evidence exists.
