# AGENTS.md — csvtolabels

**csvtolabels** converts CSV data into print-ready PDF barcode labels (Avery 5160, Code 128). Freemium SaaS — free preview, paid PDF export via Stripe.

**Stack:** Next.js 16 · React 19 · TypeScript strict · Tailwind CSS 4 · bwip-js · jsPDF · PapaParse  
**Tests:** Jest 30 (unit, 80% coverage gate) · Playwright 1.54 (e2e smoke)  
**Deploy:** Vercel · GitHub Actions

---

## Read Before Starting Any Task

| Priority | Document | What it tells you |
|---|---|---|
| 1 | `docs/superpowers/plans/2026-06-18-csvtolabels-openspec-superpowers-aidlc.md` | Authority model — who owns what decisions |
| 2 | `docs/superpowers/plans/2026-06-16-csvtolabels-elegant-500mrr-v2.md` | Product plan — buyer, pain, pricing, 21-day target |
| 3 | `docs/superpowers/plans/2026-06-16-csvtolabels-aidlc-agentic-plan.md` | Execution process — four packages, review gates, browser QA |
| — | `docs/ops/github-vercel-gate-contract.md` | Verification contract — local → CI → preview → production |
| — | `docs/launch/` | Stripe setup, launch checklist, daily scorecard, outreach |
| — | `docs/business/2026-06-18-csvtolabels-business-plan.md` | Business rationale and go/no-go criteria |

**Scope rule:** if a request is not covered by these plans, log it and stop. Do not implement it without a new plan and explicit user approval.

---

## Workflow (follow this order every time)

```
1. EXPLORE      Read the planning docs above. Understand the codebase. Use /feature-dev:code-explorer.
2. ARCHITECTURE Design the approach. Use /feature-dev:code-architect. Align with user before writing code.
3. PLAN         Break work into the four packages from the AIDLC plan. One package at a time.
4. TDD          Write the failing test first. Confirm it fails. Then write minimum code to pass. Refactor.
5. BUILD        Implement the package. One builder. No parallel agents on the same files.
6. REVIEW       Spec review first (did we build what was approved, did we add scope?).
                Code review second (correctness, types, payment safety, test quality). Use /code-review.
7. VERIFY       Run `npm run verify` — must pass clean before any push.
8. BUSINESS CHECK  Does this solve the actual buyer problem? Check against the product plan and assumptions.
                   If not, stop and revisit architecture — do not ship something that passes CI but misses the point.
```

Do not skip steps. Do not start the next package until the current one passes both review gates and verify.

---

## Hard Rules

**Product authority:** OpenSpec decides *what* to build. Superpowers decides *how*. If they conflict, pause and ask.

**TDD is required:** Write the failing test first. No implementation before a red test exists. Coverage must stay above 80%.

**Verify before pushing:**
```bash
npm run verify   # env:check → lint → lint:design → test → build
```
The pre-push hook enforces this, but run it manually first.

**One builder at a time:** Never run parallel agents editing the same files. Sequential packages only.

**Review gates after every package:** spec review first (did we build what was approved?), code review second (correctness, type safety, payment safety). Do not start the next package with open critical issues.

**Keep `public/llms.txt` current:** when a change significantly alters the product — new or removed pages, blog posts, pricing, supported barcode symbology or label formats, or the core value proposition — update `public/llms.txt` to match. Keep its links and descriptions in sync with `sitemap.xml`, the marketing pages in `data/pages.ts`, and the blog MDX frontmatter.

**Human gates — stop and ask before:**
- Proceeding after a `REVISE` or `STOP` product challenge result
- Adding live Stripe Payment Links
- Sending outreach or posting community replies
- Running paid ads
- Expanding scope beyond the approved plan

**Never:** commit to `main` directly · delete files without permission · add `any` types · add page-level inline styles · chain shell commands with `&&` on Windows · use em dashes in user-facing copy · add Claude/AI attribution (`🤖 Generated with Claude Code`, `Co-Authored-By: Claude …`) to commits or PRs

---

## Superpowers Skills

| Situation | Use |
|---|---|
| Starting a feature | `/feature-dev` |
| After writing code | `/simplify` |
| Before a PR | `/code-review` |
| PR ready to merge | `/pr-review-toolkit:review-pr` |
| Addressing review comments | `/fix-pr-comments` |
| Confirming a change works | `/verify` |

---

## Environment

- Windows 11 · Node 22.17.1 (`.nvmrc`)
- Stripe env vars may be at the Windows system level, not in `.env`
- Worktrees can have file-locking issues on Windows — skip locked files gracefully
