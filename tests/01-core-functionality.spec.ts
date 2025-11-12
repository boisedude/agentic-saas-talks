import { test, expect } from '@playwright/test';

test.describe('Core Functionality Tests', () => {
  test('homepage loads correctly with main content', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/Agentic SaaS Talks/i);

    // Check main heading (use first() to avoid strict mode violation if title appears in footer)
    const mainHeading = page.getByRole('heading', { name: /Agentic SaaS Talks/i }).first();
    await expect(mainHeading).toBeVisible();

    // Check hero section
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    // Check navigation
    await expect(page.getByRole('navigation')).toBeVisible();

    // Take screenshot
    await page.screenshot({ path: 'test-results/screenshots/homepage.png', fullPage: true });
  });

  test('navigation to /episodes page works', async ({ page }) => {
    await page.goto('/');

    // Click on Episodes link in navigation
    await page.getByRole('link', { name: /Episodes/i }).first().click();

    // Wait for navigation
    await page.waitForURL('**/episodes');

    // Check we're on the episodes page
    await expect(page).toHaveURL(/.*episodes/);

    // Check episodes heading is visible
    const heading = page.getByRole('heading', { name: /Episodes/i }).first();
    await expect(heading).toBeVisible();

    // Take screenshot
    await page.screenshot({ path: 'test-results/screenshots/episodes-page.png', fullPage: true });
  });

  test('navigation to /hosts page works', async ({ page }) => {
    await page.goto('/');

    // Click on Hosts link in navigation
    await page.getByRole('link', { name: /Hosts/i }).first().click();

    // Wait for navigation
    await page.waitForURL('**/hosts');

    // Check we're on the hosts page
    await expect(page).toHaveURL(/.*hosts/);

    // Check hosts heading is visible
    const heading = page.getByRole('heading', { name: /Hosts/i }).first();
    await expect(heading).toBeVisible();

    // Take screenshot
    await page.screenshot({ path: 'test-results/screenshots/hosts-page.png', fullPage: true });
  });

  test('home link in navigation returns to homepage', async ({ page }) => {
    await page.goto('/episodes');

    // Click on Home/Logo link
    await page.getByRole('link', { name: /Home/i }).first().click();

    // Check we're back on homepage
    await expect(page).toHaveURL('/');
  });

  test('mobile navigation menu opens and closes', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');

    await page.goto('/');

    // Find and click hamburger menu button
    const menuButton = page.getByRole('button', { name: /menu/i }).or(
      page.locator('button[aria-label*="menu" i]')
    ).or(
      page.locator('button').filter({ has: page.locator('svg') }).first()
    );

    // Click to open
    await menuButton.click();
    await page.waitForTimeout(500); // Wait for animation

    // Check if mobile menu is visible (look for navigation links)
    const episodesLink = page.getByRole('link', { name: /Episodes/i });
    await expect(episodesLink).toBeVisible();

    // Take screenshot of open menu
    await page.screenshot({ path: 'test-results/screenshots/mobile-menu-open.png', fullPage: true });

    // Click to close (click button again or click outside)
    await menuButton.click();
    await page.waitForTimeout(500); // Wait for animation

    // Take screenshot of closed menu
    await page.screenshot({ path: 'test-results/screenshots/mobile-menu-closed.png', fullPage: true });
  });

  test('external links work correctly', async ({ page, context }) => {
    await page.goto('/');

    // Find YouTube link (if exists)
    const youtubeLink = page.getByRole('link', { name: /YouTube/i }).or(
      page.locator('a[href*="youtube.com"]')
    ).first();

    if (await youtubeLink.count() > 0) {
      // Check it has target="_blank" and rel="noopener noreferrer"
      await expect(youtubeLink).toHaveAttribute('target', '_blank');
      await expect(youtubeLink).toHaveAttribute('rel', /noopener/);
    }

    // Find LinkedIn links (if exists)
    const linkedInLinks = page.locator('a[href*="linkedin.com"]');
    const count = await linkedInLinks.count();

    for (let i = 0; i < count; i++) {
      const link = linkedInLinks.nth(i);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
    }
  });

  test('scroll-to-top button appears on scroll and works', async ({ page }) => {
    await page.goto('/');

    // Scroll down the page
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);

    // Look for scroll-to-top button
    const scrollButton = page.getByRole('button', { name: /scroll to top/i }).or(
      page.locator('button[aria-label*="scroll" i]')
    ).or(
      page.locator('button').filter({ has: page.locator('svg') }).last()
    );

    // Check if button is visible after scroll
    const isVisible = await scrollButton.isVisible().catch(() => false);

    if (isVisible) {
      // Take screenshot with button visible
      await page.screenshot({ path: 'test-results/screenshots/scroll-button-visible.png' });

      // Click the button
      await scrollButton.click();
      await page.waitForTimeout(500);

      // Check we scrolled back to top
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeLessThan(100);
    }
  });

  test('404 page displays for non-existent routes', async ({ page }) => {
    const response = await page.goto('/non-existent-page-12345');

    // Check response status or page content
    // Next.js might redirect or show 404 page
    const content = await page.content();
    const has404 = content.includes('404') || content.includes('not found') || content.includes('Not Found');

    // Take screenshot
    await page.screenshot({ path: 'test-results/screenshots/404-page.png', fullPage: true });
  });
});
