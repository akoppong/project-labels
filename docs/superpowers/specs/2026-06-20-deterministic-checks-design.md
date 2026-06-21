# Deterministic Checks Design

## Purpose

Wire up deterministic quality gates for `csvtolabels` from local developer push through GitHub review and Vercel production deployment.

The end state is a single, inspectable verification contract that runs consistently:

1. before code leaves a developer machine,
2. before pull requests can merge,
3. against deployed Vercel preview environments,
4. against the live production deployment.

This is an implementation design for delivery safeguards, not a product feature spec.

## Current Repository Evidence

The current workspace now contains the expected deterministic-check artifacts:

- `npm run lint` runs `eslint .`
- `npm run lint:design` runs `scripts/check-no-page-styles.mjs`
- `npm test` runs `jest --runInBand`
- `npm run build` runs `next build`
- `npm run verify` runs the repo-owned source verification contract via `scripts/run-verify.js`
- `.husky/pre-push` and `scripts/setup-git-hooks.mjs` implement the local push gate
- `.github/workflows/source-checks.yml` implements GitHub source verification
- `.github/workflows/preview-smoke.yml` and `.github/workflows/production-smoke.yml` implement deployment-triggered smoke workflows
- `playwright.config.ts` and `tests/e2e/smoke.spec.ts` implement browser smoke coverage
- `.nvmrc` pins the Node runtime
- `.env.example` uses `NEXT_PUBLIC_*` keys
- `docs/ops/github-vercel-gate-contract.md` documents the GitHub/Vercel operating contract

Current observed behavior in this workspace:

- `npm run verify` passes
- `npm run test:smoke` passes
- `npm test` passes with 42 tests across unit, component, server, and env-validation coverage
- `npm run build` passes and produces static/SSG output

Current enforcement gaps:

- production smoke is post-deploy validation, not a true pre-promotion production gate
- preview and production smoke workflows rely on `deployment_status`, so PR changes to those workflow files are not exercised by the PR's own deployment events
- required Stripe env vars are documented for protected environments, but current fallbacks and smoke assertions do not prove those vars are truly present in deployed environments

## Goal

Create a heavyweight commit-to-production verification path for `GitHub + Vercel` where:

- local developers run the same source checks as CI,
- GitHub is the policy engine for merge safety,
- Vercel is the deployment engine for preview and production,
- deployed environments are validated with real browser smoke tests,
- environment/configuration drift fails fast,
- the release path is deterministic enough that a green merge and green deploy mean the same thing every time.

## Non-Goals

This design does not include:

- full end-to-end coverage of every UI branch,
- visual regression infrastructure,
- automatic rollback orchestration,
- synthetic monitoring after release,
- multi-provider deployment support beyond GitHub and Vercel.

Those may be added later, but they are not required to satisfy this goal.

## Recommended Architecture

Use one repository-owned verification contract as the base layer, then compose it into higher-order gates.

### Layer 1: Source Verification

Create a single `npm run verify` command that becomes the canonical source validation entrypoint.

That command should run, in deterministic order:

1. environment contract validation,
2. `eslint`,
3. design lint (`scripts/check-no-page-styles.mjs`),
4. unit/component/server tests (`jest --runInBand`),
5. production build (`next build`).

The exact same command should run locally and in GitHub Actions. There should not be separate handwritten lists of checks per environment.

Local verification may inject deterministic example checkout URLs for the build step when those public env vars are not configured, but protected environments should continue to require real values.

### Layer 2: Local Push Gate

Add a repository-managed `pre-push` hook bootstrap so developers get feedback before pushing. The hook should call the same verification command used by CI.

Use `pre-push`, not `pre-commit`, because this repo’s deterministic contract includes tests and production build validation. Running those on every commit would slow iteration without improving the guarantee meaningfully.

### Layer 3: Pull Request Gate

Add a required GitHub Actions workflow that:

- runs on pull requests to the protected branch,
- uses pinned Node setup,
- uses `npm ci`,
- runs the canonical verification command,
- uploads any helpful test artifacts only when needed for debugging,
- fails hard on any mismatch.

Branch protection should require this workflow before merge.

### Layer 4: Preview Deployment Gate

Every PR should receive a Vercel preview deployment. A GitHub workflow should then wait for the preview deployment URL and execute a small Playwright smoke suite against that deployed environment.

This gate verifies behavior that source checks alone cannot prove:

- app boot in the deployed runtime,
- public environment variable wiring,
- route generation/rendering under deployment conditions,
- hydration behavior for the core CSV-to-label flow.

### Layer 5: Production Deployment Gate

Merges to the protected production branch should trigger Vercel production deployment. After deployment, a second smoke workflow should run against the production URL and verify the same high-value flows on the live environment.

This gate does not prevent the deploy from existing, but it does make production health explicit and machine-verified immediately after release.

## Determinism Rules

The checks only count as deterministic if the runtime and install surface are fixed tightly enough.

Required rules:

- commit a `.nvmrc` file to pin Node for developers, CI, and Vercel configuration
- use `npm ci` in GitHub automation, never `npm install`
- treat `package-lock.json` as authoritative
- avoid depending on previously built `dist`, `.next`, or `coverage` output as release inputs
- keep generated verification outputs out of the decision path unless they are regenerated by the current run
- fail builds if required public env vars are absent or malformed
- make `verify` the only repo-owned source-check contract so local and CI do not drift

## Environment Contract

The code reads:

- `NEXT_PUBLIC_STRIPE_EXPORT_PASS_LINK`
- `NEXT_PUBLIC_STRIPE_PRO_LINK`

The current `.env.example` now matches those keys. The remaining issue is enforcement: local development may intentionally omit them, but deployed environments should still fail fast when the values are missing or invalid.

The repo-owned env validation script should:

- validates the required public env vars for build/deploy contexts,
- optionally tolerates missing values in purely local development only if the app has documented fallbacks,
- fails CI and deploy checks when required values are absent in protected environments,
- validates URL shape for Stripe links.

This script is part of `npm run verify` and should remain callable independently for debugging.

## E2E Smoke Coverage

Playwright is now present. The scope should remain intentionally narrow and deterministic. The purpose is deployment confidence, not broad UI automation.

The smoke suite should cover the highest-value paths already implied by `docs/launch/launch-checklist.md`:

1. homepage loads successfully
2. CSV paste with `sku,name,price` shows parsed values
3. first-column fallback works with `item,title`
4. empty/invalid CSV input produces the expected error state
5. label preview renders after valid input
6. `/?unlock=export-pass` unlock path behaves correctly
7. `/?unlock=pro` unlock path behaves correctly
8. at least one SEO route loads successfully
9. a mobile-sized viewport still loads the primary flow without layout breakage

The suite should avoid brittle assertions such as pixel-perfect layout checks, timing-sensitive animation expectations, or assumptions about third-party Stripe navigation that do not belong in a deterministic smoke contract.

## GitHub Workflow Design

The repository should contain at least these workflows:

### 1. Source Checks

Purpose:

- validate every pull request before merge

Responsibilities:

- checkout code
- set up pinned Node
- run `npm ci`
- run `npm run verify`

### 2. Preview Smoke

Purpose:

- validate the deployed Vercel preview URL for pull requests

Responsibilities:

- determine or wait for the preview deployment URL
- set up pinned Node
- install Playwright dependencies
- run the smoke suite against the preview URL

### 3. Production Smoke

Purpose:

- validate the live production deployment after merge

Responsibilities:

- trigger on pushes to the protected production branch or successful production deployment notification
- resolve the production URL
- run the same smoke suite against production

The preview and production smoke workflows should share the same test code and differ only in base URL and trigger behavior.

## Vercel Integration Design

Vercel should remain GitHub-connected, but the policy should be explicit:

- preview deployments for pull requests remain enabled
- production deployments occur only from the protected production branch
- Vercel project settings should use the pinned Node version
- required public environment variables must be configured in Vercel for preview and production as appropriate

Current enforcement pattern:

- GitHub branch protection blocks merge until source checks pass
- GitHub deployment smoke validates the preview URL before reviewers treat the PR as deploy-safe
- production deploy occurs from the protected branch
- post-deploy smoke validates live production immediately

Gap to close for full heavyweight enforcement:

- Vercel Deployment Checks should be configured if production promotion must be blocked until GitHub smoke checks pass

If Vercel project settings support a custom install/build path, they should align with the same pinned Node and lockfile expectations as GitHub Actions.

## Repository Changes Landed

The repository now contains these core artifacts:

- `.nvmrc`
- `.github/workflows/source-checks.yml`
- `.github/workflows/preview-smoke.yml`
- `.github/workflows/production-smoke.yml`
- `playwright.config.ts`
- `tests/e2e/smoke.spec.ts`
- `scripts/validate-env.js`
- `.husky/pre-push`
- `scripts/setup-git-hooks.mjs`
- `package.json` script updates including `verify`, `env:check`, and `test:smoke`
- `.env.example` using `NEXT_PUBLIC_*`
- `docs/ops/github-vercel-gate-contract.md`

Remaining hardening work is about enforcement semantics, not missing files.

## Operational Setup Requirements

The implementation must document the manual platform settings that code alone cannot enforce:

- GitHub branch protection requirements
- which workflow names must be required
- Vercel project linkage to the repo
- preview and production environment variables
- production branch name
- any required repository secrets or Vercel tokens if the workflows need API access

Without this doc, the checks may exist in code but still fail to protect production deterministically.

## Failure Semantics

The desired operator behavior is:

- local push blocked if source verification fails
- PR merge blocked if GitHub source checks fail
- PR marked not deploy-safe if preview smoke fails
- production release marked unhealthy immediately if production smoke fails

The system should fail loudly and early rather than falling back silently.

## Testing Strategy

Implementation should prove the design in layers:

1. local source verification passes with `npm run verify`
2. local smoke tests can run against a local or preview base URL
3. workflow files validate structurally
4. existing unit/component tests remain green
5. production build remains green

The first implementation pass does not need to prove actual GitHub/Vercel external execution inside this workspace, but it must leave behind the exact workflow/config artifacts required for those platforms to execute deterministically.

## Risks And Tradeoffs

### Added Tooling Weight

Adding Playwright and deployment workflows increases repo and CI complexity. This is acceptable because the user explicitly chose the heavyweight path.

### Flakiness Risk

Browser smoke tests can become flaky if they assert too much. The mitigation is to keep the suite small, data-driven, and focused on high-value invariants.

### Production Smoke Timing

Production smoke validates the live deployment after it exists. It does not itself roll back a bad deploy. If automatic rollback becomes necessary, that should be a separate design extension.

### Environment Drift

If GitHub, local machines, and Vercel do not share the same Node version and env contract, the pipeline stops being deterministic. Pinning and validation are non-negotiable.

## Success Criteria

This design is satisfied when the repository contains a working, documented system where:

1. developers can run one verification command locally,
2. pushes are blocked by the same repo-owned checks,
3. pull requests are blocked by GitHub on the same checks,
4. Vercel preview deployments are smoke-tested automatically,
5. Vercel production deployments are smoke-tested automatically,
6. runtime and env drift are constrained by pinned configuration,
7. setup instructions make the protection model reproducible by another operator.

## Known Constraint

The current workspace does not appear to contain Git metadata, so this design doc may not be committable from the current directory state. If that remains true during implementation, note it plainly rather than claiming a git commit or branch protection change was applied from this workspace.
