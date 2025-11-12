import { test, expect } from '@playwright/test';

test.describe('Responsive Design Tests', () => {
  test('homepage renders correctly on mobile (375x667)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check main content is visible (use first() to avoid strict mode violation)
    const mainHeading = page.getByRole('heading', { name: /Agentic SaaS Talks/i }).first();
    await expect(mainHeading).toBeVisible();

    // Check no horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScroll).toBeFalsy();

    // Take screenshot
    await page.screenshot({ path: 'test-results/screenshots/mobile-375-homepage.png', fullPage: true });
  });

  test('episodes page renders correctly on mobile (375x667)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/episodes');

    // Check heading is visible
    const heading = page.getByRole('heading', { name: /Episodes/i }).first();
    await expect(heading).toBeVisible();

    // Check no horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScroll).toBeFalsy();

    // Take screenshot
    await page.screenshot({ path: 'test-results/screenshots/mobile-375-episodes.png', fullPage: true });
  });

  test('hosts page renders correctly on mobile (375x667)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/hosts');

    // Check heading is visible
    const heading = page.getByRole('heading', { name: /Hosts/i }).first();
    await expect(heading).toBeVisible();

    // Check no horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScroll).toBeFalsy();

    // Take screenshot
    await page.screenshot({ path: 'test-results/screenshots/mobile-375-hosts.png', fullPage: true });
  });

  test('homepage renders correctly on tablet (768x1024)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    // Check main content is visible (use first() to avoid strict mode violation)
    const mainHeading = page.getByRole('heading', { name: /Agentic SaaS Talks/i }).first();
    await expect(mainHeading).toBeVisible();

    // Check no horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScroll).toBeFalsy();

    // Take screenshot
    await page.screenshot({ path: 'test-results/screenshots/tablet-768-homepage.png', fullPage: true });
  });

  test('episodes page renders correctly on tablet (768x1024)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/episodes');

    // Check heading is visible
    const heading = page.getByRole('heading', { name: /Episodes/i }).first();
    await expect(heading).toBeVisible();

    // Check no horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScroll).toBeFalsy();

    // Take screenshot
    await page.screenshot({ path: 'test-results/screenshots/tablet-768-episodes.png', fullPage: true });
  });

  test('hosts page renders correctly on tablet (768x1024)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/hosts');

    // Check heading is visible
    const heading = page.getByRole('heading', { name: /Hosts/i }).first();
    await expect(heading).toBeVisible();

    // Check no horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScroll).toBeFalsy();

    // Take screenshot
    await page.screenshot({ path: 'test-results/screenshots/tablet-768-hosts.png', fullPage: true });
  });

  test('homepage renders correctly on desktop (1280x720)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    // Check main content is visible (use first() to avoid strict mode violation)
    const mainHeading = page.getByRole('heading', { name: /Agentic SaaS Talks/i }).first();
    await expect(mainHeading).toBeVisible();

    // Check no horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScroll).toBeFalsy();

    // Take screenshot
    await page.screenshot({ path: 'test-results/screenshots/desktop-1280-homepage.png', fullPage: true });
  });

  test('episodes page renders correctly on desktop (1280x720)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/episodes');

    // Check heading is visible
    const heading = page.getByRole('heading', { name: /Episodes/i }).first();
    await expect(heading).toBeVisible();

    // Check no horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScroll).toBeFalsy();

    // Take screenshot
    await page.screenshot({ path: 'test-results/screenshots/desktop-1280-episodes.png', fullPage: true });
  });

  test('hosts page renders correctly on desktop (1280x720)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/hosts');

    // Check heading is visible
    const heading = page.getByRole('heading', { name: /Hosts/i }).first();
    await expect(heading).toBeVisible();

    // Check no horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScroll).toBeFalsy();

    // Take screenshot
    await page.screenshot({ path: 'test-results/screenshots/desktop-1280-hosts.png', fullPage: true });
  });

  test('navigation adapts to mobile viewport', async ({ page }) => {
    // Start desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    // Check desktop navigation is visible
    const desktopNav = page.getByRole('navigation');
    await expect(desktopNav).toBeVisible();

    // Switch to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    // Take screenshot of mobile navigation
    await page.screenshot({ path: 'test-results/screenshots/mobile-navigation-closed.png' });

    // Look for hamburger menu
    const menuButton = page.getByRole('button', { name: /menu/i }).or(
      page.locator('button[aria-label*="menu" i]')
    ).or(
      page.locator('button').filter({ has: page.locator('svg') }).first()
    );

    const menuButtonExists = await menuButton.count() > 0;
    if (menuButtonExists) {
      await expect(menuButton).toBeVisible();
    }
  });

  test('images scale properly on different viewports', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1280, height: 720, name: 'desktop' },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/hosts');

      // Check images don't overflow
      const images = await page.locator('img').all();

      for (const img of images.slice(0, 5)) { // Check first 5 images
        const isVisible = await img.isVisible();
        if (isVisible) {
          const box = await img.boundingBox();
          if (box) {
            expect(box.width).toBeLessThanOrEqual(viewport.width);
          }
        }
      }
    }
  });

  test('text remains readable on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 }); // iPhone SE
    await page.goto('/');

    // Check that text is not too small
    const paragraphs = await page.locator('p, span, a, button').all();

    for (const element of paragraphs.slice(0, 10)) {
      const isVisible = await element.isVisible();
      if (isVisible) {
        const fontSize = await element.evaluate(el => {
          return window.getComputedStyle(el).fontSize;
        });

        const fontSizeNum = parseInt(fontSize);
        expect(fontSizeNum).toBeGreaterThanOrEqual(12); // Minimum readable size
      }
    }

    // Take screenshot
    await page.screenshot({ path: 'test-results/screenshots/small-screen-320.png', fullPage: true });
  });

  test('touch targets are large enough on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check interactive elements are large enough (44x44 recommended)
    const buttons = await page.locator('button, a[href]').all();

    for (const button of buttons.slice(0, 10)) {
      const isVisible = await button.isVisible();
      if (isVisible) {
        const box = await button.boundingBox();
        if (box) {
          // At least one dimension should be >= 44px for good touch targets
          const meetsMinimum = box.width >= 44 || box.height >= 44;
          expect(meetsMinimum).toBeTruthy();
        }
      }
    }
  });
});
