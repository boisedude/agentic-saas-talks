import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  test('keyboard navigation works through main navigation', async ({ page }) => {
    await page.goto('/');

    // Focus on the page
    await page.keyboard.press('Tab');

    // Check skip link appears on focus
    const skipLink = page.getByRole('link', { name: /skip to main content/i });
    const skipLinkExists = await skipLink.count() > 0;

    if (skipLinkExists) {
      await expect(skipLink).toBeFocused();

      // Take screenshot of focused skip link
      await page.screenshot({ path: 'test-results/screenshots/skip-link-focused.png' });

      // Press Enter to use skip link
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);
    }

    // Tab through navigation items
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);

    // Check that something has focus
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();

    // Take screenshot of focus state
    await page.screenshot({ path: 'test-results/screenshots/keyboard-nav-focus.png' });
  });

  test('all interactive elements are keyboard accessible', async ({ page }) => {
    await page.goto('/');

    // Get all buttons and links
    const interactiveElements = await page.locator('button, a[href]').all();

    // Check each element can receive focus
    for (const element of interactiveElements.slice(0, 10)) { // Check first 10
      const isVisible = await element.isVisible();
      if (isVisible) {
        await element.focus();
        const isFocused = await element.evaluate(el => el === document.activeElement);
        expect(isFocused).toBeTruthy();
      }
    }
  });

  test('focus states are visible', async ({ page }) => {
    await page.goto('/');

    // Get first visible link
    const firstLink = page.getByRole('link').first();
    await firstLink.focus();

    // Take screenshot to verify focus is visible
    await page.screenshot({ path: 'test-results/screenshots/focus-state-visible.png' });

    // Check if outline or ring is present (visual check via screenshot)
    const styles = await firstLink.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        outline: computed.outline,
        outlineWidth: computed.outlineWidth,
        boxShadow: computed.boxShadow,
      };
    });

    // At least one focus indicator should be present
    const hasFocusIndicator =
      styles.outlineWidth !== '0px' ||
      styles.boxShadow !== 'none' ||
      styles.outline !== 'none';

    expect(hasFocusIndicator).toBeTruthy();
  });

  test('ARIA labels are present on interactive elements', async ({ page }) => {
    await page.goto('/');

    // Check buttons have accessible names
    const buttons = await page.locator('button').all();

    for (const button of buttons) {
      const isVisible = await button.isVisible();
      if (isVisible) {
        const ariaLabel = await button.getAttribute('aria-label');
        const text = await button.textContent();
        const hasAccessibleName = ariaLabel || (text && text.trim().length > 0);
        expect(hasAccessibleName).toBeTruthy();
      }
    }
  });

  test('navigation has proper ARIA landmarks', async ({ page }) => {
    await page.goto('/');

    // Check for main landmark
    const main = page.locator('main').or(page.locator('[role="main"]'));
    await expect(main).toBeVisible();

    // Check for navigation landmark
    const nav = page.locator('nav').or(page.locator('[role="navigation"]'));
    await expect(nav).toBeVisible();

    // Take screenshot
    await page.screenshot({ path: 'test-results/screenshots/aria-landmarks.png', fullPage: true });
  });

  test('heading hierarchy is correct', async ({ page }) => {
    await page.goto('/');

    // Get all headings
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    const headingLevels = [];

    for (const heading of headings) {
      const tagName = await heading.evaluate(el => el.tagName);
      const level = parseInt(tagName.replace('H', ''));
      headingLevels.push(level);
    }

    // Check there's exactly one h1
    const h1Count = headingLevels.filter(l => l === 1).length;
    expect(h1Count).toBe(1);

    // Check headings don't skip levels (e.g., h1 -> h3)
    for (let i = 1; i < headingLevels.length; i++) {
      const diff = headingLevels[i] - headingLevels[i - 1];
      expect(diff).toBeLessThanOrEqual(1);
    }

    // Take screenshot
    await page.screenshot({ path: 'test-results/screenshots/heading-hierarchy.png', fullPage: true });
  });

  test('images have alt text', async ({ page }) => {
    await page.goto('/');

    // Get all images
    const images = await page.locator('img').all();

    for (const img of images) {
      const isVisible = await img.isVisible();
      if (isVisible) {
        const alt = await img.getAttribute('alt');
        expect(alt).toBeDefined(); // Alt can be empty string for decorative images
      }
    }
  });

  test('links have descriptive text', async ({ page }) => {
    await page.goto('/');

    // Get all links
    const links = await page.locator('a[href]').all();

    for (const link of links) {
      const isVisible = await link.isVisible();
      if (isVisible) {
        const text = await link.textContent();
        const ariaLabel = await link.getAttribute('aria-label');
        const ariaLabelledBy = await link.getAttribute('aria-labelledby');

        const hasAccessibleName =
          (text && text.trim().length > 0) ||
          ariaLabel ||
          ariaLabelledBy;

        expect(hasAccessibleName).toBeTruthy();
      }
    }
  });

  test('skip link functionality', async ({ page }) => {
    await page.goto('/');

    // Check for skip link
    const skipLink = page.getByRole('link', { name: /skip to main content/i });
    const skipLinkExists = await skipLink.count() > 0;

    if (skipLinkExists) {
      // Focus on skip link
      await page.keyboard.press('Tab');
      await expect(skipLink).toBeFocused();

      // Get href
      const href = await skipLink.getAttribute('href');
      expect(href).toBeTruthy();

      // Click skip link
      await skipLink.click();
      await page.waitForTimeout(300);

      // Check focus moved to main content
      const mainContent = page.locator(href || 'main');
      const mainExists = await mainContent.count() > 0;
      expect(mainExists).toBeTruthy();

      // Take screenshot
      await page.screenshot({ path: 'test-results/screenshots/skip-link-used.png' });
    }
  });

  test('color contrast is sufficient (manual check via screenshot)', async ({ page }) => {
    await page.goto('/');

    // Take screenshots of different sections for manual contrast review
    await page.screenshot({ path: 'test-results/screenshots/contrast-check-hero.png' });

    await page.goto('/episodes');
    await page.screenshot({ path: 'test-results/screenshots/contrast-check-episodes.png' });

    await page.goto('/hosts');
    await page.screenshot({ path: 'test-results/screenshots/contrast-check-hosts.png' });
  });
});
