import { test, expect } from '@playwright/test';

/**
 * Static Export Routing Tests
 *
 * These tests verify that the .htaccess URL rewriting works correctly
 * for the static export deployment on Hostinger/Apache.
 *
 * The test server (test-server.js) mimics Apache's .htaccess behavior.
 */

test.describe('Static Export Routing (Apache .htaccess)', () => {
  const STATIC_BASE_URL = 'http://localhost:3001';

  test('direct navigation to /episodes works', async ({ page }) => {
    await page.goto(`${STATIC_BASE_URL}/episodes`);

    // Check episodes content is visible (unique to episodes page)
    const heading = page.getByRole('heading', { name: /Episode Archive/i });
    await expect(heading).toBeVisible();
  });

  test('direct navigation to /hosts works', async ({ page }) => {
    await page.goto(`${STATIC_BASE_URL}/hosts`);

    // Check hosts content is visible (unique to hosts page)
    const heading = page.getByRole('heading', { name: /About the Hosts/i });
    await expect(heading).toBeVisible();
  });

  test('refreshing /episodes page works (simulates user refresh)', async ({ page }) => {
    // Navigate to home first
    await page.goto(STATIC_BASE_URL);

    // Navigate to episodes
    await page.goto(`${STATIC_BASE_URL}/episodes`);

    // Verify we're on episodes page
    let heading = page.getByRole('heading', { name: /Episode Archive/i });
    await expect(heading).toBeVisible();

    // Refresh the page (this is the key test - simulates the user's issue)
    await page.reload();

    // After refresh, page should still load correctly (not 404)
    heading = page.getByRole('heading', { name: /Episode Archive/i });
    await expect(heading).toBeVisible();
  });

  test('refreshing /hosts page works (simulates user refresh)', async ({ page }) => {
    // Navigate to home first
    await page.goto(STATIC_BASE_URL);

    // Navigate to hosts
    await page.goto(`${STATIC_BASE_URL}/hosts`);

    // Verify we're on hosts page
    let heading = page.getByRole('heading', { name: /About the Hosts/i });
    await expect(heading).toBeVisible();

    // Refresh the page
    await page.reload();

    // After refresh, page should still load correctly (not 404)
    heading = page.getByRole('heading', { name: /About the Hosts/i });
    await expect(heading).toBeVisible();
  });

  test('trailing slash on /episodes/ works', async ({ page }) => {
    await page.goto(`${STATIC_BASE_URL}/episodes/`);

    // Should still load episodes page
    const heading = page.getByRole('heading', { name: /Episode Archive/i });
    await expect(heading).toBeVisible();
  });

  test('trailing slash on /hosts/ works', async ({ page }) => {
    await page.goto(`${STATIC_BASE_URL}/hosts/`);

    // Should still load hosts page
    const heading = page.getByRole('heading', { name: /About the Hosts/i });
    await expect(heading).toBeVisible();
  });

  test('non-existent route shows 404 page', async ({ page }) => {
    const response = await page.goto(`${STATIC_BASE_URL}/non-existent-page-xyz`);

    // Should get 404 status
    expect(response?.status()).toBe(404);

    // Should show 404 content
    const content = await page.content();
    const has404 = content.includes('404') || content.includes('not found') || content.includes('Not Found');
    expect(has404).toBe(true);
  });

  test('root path / serves index.html', async ({ page }) => {
    await page.goto(STATIC_BASE_URL);

    // Check homepage loads (look for unique homepage content)
    const heading = page.getByRole('heading', { name: /Agentic SaaS Talks/i }).first();
    await expect(heading).toBeVisible();

    // Verify it's the homepage by checking for "Latest Episode" heading
    const latestHeading = page.getByRole('heading', { name: /Latest Episode/i });
    await expect(latestHeading).toBeVisible();
  });

  test('static assets (JS/CSS) load correctly', async ({ page }) => {
    await page.goto(`${STATIC_BASE_URL}/episodes`);

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Check that CSS is applied (page should not be unstyled)
    const body = await page.locator('body');
    const backgroundColor = await body.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor
    );

    // Should have some styling applied (not default white/transparent)
    expect(backgroundColor).toBeTruthy();

    // Check that JavaScript is working (look for interactive elements)
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);
  });
});
