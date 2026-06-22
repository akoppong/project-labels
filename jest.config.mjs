import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './'
});

const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  // Explicitly scope to src/ so the Playwright e2e spec in tests/e2e/ is
  // never picked up by Jest (testPathIgnorePatterns alone is unreliable on
  // Windows due to backslash path normalisation in Jest's regex engine).
  testRegex: ['src/.*\\.test\\.[jt]sx?$', 'scripts/.*\\.test\\.[jt]sx?$'],
  roots: ['<rootDir>/src', '<rootDir>/scripts'],
  testPathIgnorePatterns: ['<rootDir>/tests/e2e/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    // Exclude Next.js framework entry points — they depend on the Next.js runtime
    // and are covered by Playwright e2e tests instead.
    '!src/app/**/page.tsx',
    '!src/app/**/layout.tsx',
    '!src/app/not-found.tsx',
    '!src/test/**',
    '!src/**/*.test.{ts,tsx}'
  ],
  coverageThreshold: {
    global: {
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80
    }
  }
};

export default createJestConfig(customJestConfig);
