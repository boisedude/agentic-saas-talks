import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // One local retry absorbs transient nav flakes under parallel load against
  // the single-threaded static test server; CI keeps its stricter 2.
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['list']
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'tablet',
      use: { ...devices['iPad Pro'] },
    },
  ],
  // Serve the static export (`out/`) the way production does, on two ports:
  //   :3000  baseURL for the functional/responsive/perf/a11y suites
  //   :3001  the "Apache .htaccess" routing suite (tests/06)
  // Run `npm run test:e2e` so `out/` is built first. The dev server is
  // deliberately not used — it emits dev-only console errors and holds an HMR
  // socket open so `networkidle` never settles.
  webServer: [
    {
      command: 'node test-server.js 3000 out',
      url: 'http://localhost:3000',
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
    },
    {
      command: 'node test-server.js 3001 out',
      url: 'http://localhost:3001',
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
    },
  ],
});
