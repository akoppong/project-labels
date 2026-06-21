import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { NextConfig } from 'next';
import { formatValidationSummary, validateEnvironment } from './scripts/validate-env.js';

const rootDirectory = path.dirname(fileURLToPath(import.meta.url));
const environmentValidation = validateEnvironment(process.env, {
  strict: process.env.NODE_ENV === 'production'
});

if (!environmentValidation.ok) {
  throw new Error(formatValidationSummary(environmentValidation));
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: rootDirectory
  }
};

export default nextConfig;
