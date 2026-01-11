import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for MyRevisionary conversation integrity tests
 *
 * These tests verify learning-state integrity, not mathematical correctness.
 * Run with: npm run test:e2e
 */
export default defineConfig({
  testDir: './tests/chat',

  // Run tests in parallel per file, but sequential within file
  fullyParallel: false,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Limit workers for chat tests (state-dependent)
  workers: process.env.CI ? 1 : 1,

  // Reporter to use
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],

  // Shared settings for all projects
  use: {
    // Base URL for navigation
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on failure
    video: 'on-first-retry',

    // Timeout for actions (AI responses can be slow)
    actionTimeout: 30000,

    // Navigation timeout
    navigationTimeout: 30000,
  },

  // Test timeout (AI chat can be slow)
  timeout: 120000,

  // Expect timeout for assertions
  expect: {
    timeout: 30000,
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Add more browsers if needed
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  // Run local dev server before starting tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
