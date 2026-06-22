# GitHub and Vercel Gate Contract

## Purpose

This project uses one repository-owned verification contract from local development through Vercel production:

1. local push gate
2. GitHub source checks
3. Vercel preview smoke
4. Vercel production smoke

Every gate is designed to answer a specific release question with explicit ownership.

## Canonical Source Contract

The canonical source gate is `npm run verify`.

It runs, in order:

1. `npm run env:check`
2. `npm run lint`
3. `npm run lint:design`
4. `npm test`
5. `npm run build`

Implementation detail:

- `scripts/run-verify.js` is the repo-owned runner for this contract
- when local checkout URLs are not set, it injects deterministic example Stripe URLs for the build step only so local verification can still exercise `next build`

Do not create separate handwritten source-check lists in CI or deployment settings. If the source contract changes, update `npm run verify` and reuse it everywhere.

## Runtime Pin

- `.nvmrc` pins the project runtime to `22.17.1`.
- GitHub Actions must use `actions/setup-node` with `node-version-file: .nvmrc`.
- Vercel project settings should be configured to the same Node version.
- `npm ci` is the only supported install command in automation.

## Local Push Gate

The repository-owned hook lives at `.husky/pre-push`.

- Bootstrap command: `npm install`
- Bootstrap effect: `scripts/setup-git-hooks.mjs` sets `git config core.hooksPath .husky` when the directory is inside a real Git worktree
- Gate command: `npm run verify`

This hook is intentionally `pre-push`, not `pre-commit`, because the contract includes tests and a production build.

## GitHub Gate

Required workflow:

- `Source Checks` in [`.github/workflows/source-checks.yml`](/Users/kofiandrew/Documents/Github Projects/500_mrr_build/.github/workflows/source-checks.yml)

Branch protection for `main` should require `Source Checks` before merge.

This workflow:

- checks out the repo
- reads Node from `.nvmrc`
- runs `npm ci`
- injects strict-mode example Stripe URLs
- runs `npm run verify`

## Vercel Preview Gate

Preview smoke workflow:

- `Preview Smoke` in [`.github/workflows/preview-smoke.yml`](/Users/kofiandrew/Documents/Github Projects/500_mrr_build/.github/workflows/preview-smoke.yml)

Trigger model:

- Vercel GitHub integration creates a GitHub deployment
- when the deployment status becomes `success`
- and the deployment environment is `Preview`
- GitHub runs Playwright against `github.event.deployment_status.environment_url`

Pass condition:

- the deployed preview loads
- the smoke suite passes against the deployed URL

## Vercel Production Gate

Production smoke workflow:

- `Production Smoke` in [`.github/workflows/production-smoke.yml`](/Users/kofiandrew/Documents/Github Projects/500_mrr_build/.github/workflows/production-smoke.yml)

Trigger model:

- Vercel deploys from `main`
- Vercel updates the GitHub deployment status to `success`
- GitHub runs the same Playwright smoke suite against the production deployment URL

Pass condition:

- the live production deployment loads
- the smoke suite passes against the deployed URL

Current limitation:

- this is post-deploy validation, not pre-promotion blocking
- if you want production promotion held until GitHub checks pass, enable Vercel Deployment Checks and select the relevant GitHub Actions as required checks

## Required Environment Variables

Public runtime variables:

- `NEXT_PUBLIC_STRIPE_EXPORT_PASS_LINK`
- `NEXT_PUBLIC_STRIPE_PRO_LINK`

Rules:

- values must be absolute `http` or `https` URLs
- local development may omit them, but checkout actions will stay unavailable until the URLs are configured
- CI and protected deployment environments must provide them

Validation entrypoint:

- `node scripts/validate-env.js`

Strict mode is enabled automatically when `CI=true`, or manually with `VALIDATE_ENV_MODE=strict`.

## Smoke Coverage

The shared Playwright smoke suite lives in [tests/e2e/smoke.spec.ts](/Users/kofiandrew/Documents/Github Projects/500_mrr_build/tests/e2e/smoke.spec.ts).

It verifies:

- homepage boot
- sample CSV happy path
- first-column fallback
- no-barcode validation state
- unlock query parameters
- one marketing SEO route
- mobile viewport access to the core flow

This suite is intentionally narrow. It is a deployment confidence gate, not full end-to-end product coverage.

## Operator Checklist

Before treating the repo as release-ready:

1. Put this directory under the real Git worktree root.
2. Run `npm install` once so the hook bootstrap can set `.husky` as `core.hooksPath`.
3. Configure GitHub branch protection to require `Source Checks`.
4. Connect the repo to Vercel with preview deployments enabled for pull requests.
5. Set `NEXT_PUBLIC_STRIPE_EXPORT_PASS_LINK` and `NEXT_PUBLIC_STRIPE_PRO_LINK` in Vercel preview and production environments.
6. Set Vercel Node runtime to `22.17.1`.
7. Confirm Vercel deployments appear as GitHub deployment statuses so the preview and production smoke workflows trigger.
8. **Set `VERCEL_AUTOMATION_BYPASS_SECRET` as a GitHub Actions secret.** Get the value from Vercel project settings → Deployment Protection → Automation Bypass Protection. Without this, smoke tests skip with a warning rather than running — both preview and production smoke are non-functional until it is set.
9. If production promotion must be blocked until smoke checks pass, enable Vercel Deployment Checks for the selected GitHub Actions.
