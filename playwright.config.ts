import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3000';
const hasExternalBaseUrl = Boolean(process.env.PLAYWRIGHT_BASE_URL);
const vercelBypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL,
    trace: 'retain-on-failure',
    ...(vercelBypassSecret
      ? { extraHTTPHeaders: { 'x-vercel-protection-bypass': vercelBypassSecret } }
      : {})
  },
  webServer: hasExternalBaseUrl
    ? undefined
    : {
        command: 'npm run dev -- --hostname 127.0.0.1 --port 3000',
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120000
      },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
});
