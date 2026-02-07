import { test, expect } from '@playwright/test';

test.describe('Episodes Validation Tests', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Agentic SaaS Talks/i);
    const mainHeading = page.getByRole('heading', { name: /Agentic SaaS Talks/i }).first();
    await expect(mainHeading).toBeVisible();

    await page.screenshot({ path: 'test-results/screenshots/homepage-validation.png', fullPage: true });
  });

  test('episodes page shows all 18 episode cards', async ({ page }) => {
    await page.goto('/episodes');

    // Wait for episode cards to load
    await page.waitForSelector('h3');

    // Count episode cards by looking for "Episode X:" pattern in headings
    const episodeHeadings = page.locator('h3').filter({ hasText: /Episode \d+:/ });
    const episodeCount = await episodeHeadings.count();

    // Should have exactly 18 episodes
    expect(episodeCount).toBe(18);

    await page.screenshot({ path: 'test-results/screenshots/all-episodes.png', fullPage: true });
  });

  test('episode cards link to detail pages', async ({ page }) => {
    await page.goto('/episodes');

    // Wait for cards to load
    await page.waitForSelector('h3');

    // Click the first episode card link
    const firstCard = page.locator('a[href^="/episodes/"]').first();
    await expect(firstCard).toBeVisible();

    const href = await firstCard.getAttribute('href');
    expect(href).toMatch(/^\/episodes\/\d+$/);
  });

  test('episode detail page loads correctly', async ({ page }) => {
    // Navigate to a known episode
    await page.goto('/episodes/18');

    // Check title heading
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('Episode 18');
    await expect(heading).toContainText('Deploying Agentic Applications');

    // Check timestamps section
    const timestampsHeading = page.getByRole('heading', { name: /Timestamps/i });
    await expect(timestampsHeading).toBeVisible();

    // Check watch on YouTube button
    const watchButton = page.getByRole('link', { name: /Watch on YouTube/i });
    await expect(watchButton).toBeVisible();

    await page.screenshot({ path: 'test-results/screenshots/episode-detail.png', fullPage: true });
  });

  test('episode detail page shows guest info', async ({ page }) => {
    // Episode 15 has Tudor Golubenco as a guest
    await page.goto('/episodes/15');

    const guestName = page.getByText('Tudor Golubenco');
    await expect(guestName).toBeVisible();

    const guestsHeading = page.getByRole('heading', { name: /Special Guests/i });
    await expect(guestsHeading).toBeVisible();

    await page.screenshot({ path: 'test-results/screenshots/episode-guest.png', fullPage: true });
  });

  test('episode detail page has breadcrumbs', async ({ page }) => {
    await page.goto('/episodes/1');

    const breadcrumbNav = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(breadcrumbNav).toBeVisible();

    // Should have Home > Episodes > Episode 1 links
    await expect(breadcrumbNav.getByText('Home')).toBeVisible();
    await expect(breadcrumbNav.getByText('Episodes')).toBeVisible();
  });

  test('Episode 18 appears with correct title on listing', async ({ page }) => {
    await page.goto('/episodes');

    const episode18Title = page.getByText('Deploying Agentic Applications', { exact: false });
    await expect(episode18Title.first()).toBeVisible();

    await page.screenshot({ path: 'test-results/screenshots/episode-18.png' });
  });

  test('episode cards show duration information', async ({ page }) => {
    await page.goto('/episodes');

    // Look for duration format like "66 min"
    const durations = page.locator('text=/\\d+\\s*min/i');
    const durationCount = await durations.count();

    expect(durationCount).toBeGreaterThan(0);

    await page.screenshot({ path: 'test-results/screenshots/durations.png' });
  });

  test('newest episode (24) appears first in the list', async ({ page }) => {
    await page.goto('/episodes');

    // Wait for episodes to load
    await page.waitForSelector('h3');

    // Get the first episode heading
    const firstEpisodeHeading = page.locator('h3').filter({ hasText: /Episode \d+:/ }).first();

    // Episode 24 is newest by date
    await expect(firstEpisodeHeading).toContainText('Episode 24');
  });

  test('episode detail page has structured data', async ({ page }) => {
    await page.goto('/episodes/18');

    // Check for JSON-LD scripts
    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    const count = await jsonLdScripts.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });
});
