import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { NextConfig } from 'next';
import { formatValidationSummary, validateEnvironment } from './scripts/validate-env.js';

const rootDirectory = path.dirname(fileURLToPath(import.meta.url));
// Strict only on real Vercel production deployments.
// Preview builds (VERCEL_ENV=preview) and local builds do not require Stripe URLs.
const environmentValidation = validateEnvironment(process.env, {
  strict: process.env.VERCEL_ENV === 'production'
});

if (!environmentValidation.ok) {
  throw new Error(formatValidationSummary(environmentValidation));
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: rootDirectory
  },
  // marked ships as ESM-only. transpilePackages causes nextJest to exclude it
  // from the blanket /node_modules/ transformIgnorePatterns so Jest can compile it.
  transpilePackages: ['marked'],
};

export default nextConfig;
