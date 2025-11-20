import { test, expect } from '@playwright/test';

test.describe('Episodes Validation Tests', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Agentic SaaS Talks/i);
    const mainHeading = page.getByRole('heading', { name: /Agentic SaaS Talks/i }).first();
    await expect(mainHeading).toBeVisible();

    await page.screenshot({ path: 'test-results/screenshots/homepage-validation.png', fullPage: true });
  });

  test('episodes page shows all 18 episodes', async ({ page }) => {
    await page.goto('/episodes');

    // Wait for episodes content to load - look for episode titles
    await page.waitForSelector('h3:has-text("Episode")');

    // Count episodes by looking for "Episode X:" pattern in headings
    const episodeHeadings = page.locator('h3').filter({ hasText: /Episode \d+:/ });
    const episodeCount = await episodeHeadings.count();

    // Should have exactly 18 episodes
    expect(episodeCount).toBe(18);

    await page.screenshot({ path: 'test-results/screenshots/all-episodes.png', fullPage: true });
  });

  test('Episode 18 appears with correct title', async ({ page }) => {
    await page.goto('/episodes');

    // Look for Episode 18's specific title
    const episode18Title = page.getByText('Deploying Agentic Applications: From Multi-Tenant to "SaaS Anywhere"', { exact: false });
    await expect(episode18Title.first()).toBeVisible();

    // Also verify it's labeled as Episode 18
    const episodeNumber = page.getByText(/Episode 18|#18/i);
    await expect(episodeNumber.first()).toBeVisible();

    await page.screenshot({ path: 'test-results/screenshots/episode-18.png' });
  });

  test('timestamps are visible on episodes that have them', async ({ page }) => {
    await page.goto('/episodes');

    // Look for timestamp indicators (time format like 00:00 or links/buttons related to timestamps)
    const timestamps = page.locator('text=/\\d{1,2}:\\d{2}/').or(
      page.getByText(/timestamps/i)
    ).or(
      page.locator('[data-timestamps]')
    );

    const timestampCount = await timestamps.count();

    // Most episodes have timestamps, so we should find some
    expect(timestampCount).toBeGreaterThan(0);

    await page.screenshot({ path: 'test-results/screenshots/timestamps-visible.png', fullPage: true });
  });

  test('guest information displays correctly', async ({ page }) => {
    await page.goto('/episodes');

    // Look for guest names that we know exist in the data
    const knownGuests = [
      'Tudor Golubenco',
      'Eli Aleyner',
      'Joshua McKenty',
      'Shriram Sridharan',
      'Flynn Glover',
      'Ashwin Raman',
      'Adam Nolte',
      'Sridhar Adusumilli'
    ];

    let foundGuests = 0;

    for (const guest of knownGuests) {
      const guestElement = page.getByText(guest, { exact: false });
      if (await guestElement.count() > 0) {
        foundGuests++;
      }
    }

    // Should find at least some guest names
    expect(foundGuests).toBeGreaterThan(0);

    await page.screenshot({ path: 'test-results/screenshots/guest-info.png', fullPage: true });
  });

  test('episode details display correctly (title, description, tags)', async ({ page }) => {
    await page.goto('/episodes');

    // Check for episode titles
    const titles = page.locator('h2, h3').filter({ hasText: /Episode|Deploying|Building|From|The|How|Inside|Pricing|Mastering/i });
    const titleCount = await titles.count();
    expect(titleCount).toBeGreaterThan(0);

    // Check for tags
    const tags = page.locator('[data-tag], .tag, .badge').or(
      page.getByText(/AI|SaaS|Architecture|DBaaS|Pricing|Startup/i)
    );
    const tagCount = await tags.count();
    expect(tagCount).toBeGreaterThan(0);

    // Check for descriptions (longer text content)
    const descriptions = page.locator('p').filter({ hasText: /.{50,}/ }); // At least 50 chars
    const descCount = await descriptions.count();
    expect(descCount).toBeGreaterThan(0);

    await page.screenshot({ path: 'test-results/screenshots/episode-details.png', fullPage: true });
  });

  test('episode cards show duration information', async ({ page }) => {
    await page.goto('/episodes');

    // Look for duration format like "66 min" or "1h 2m"
    const durations = page.locator('text=/\\d+\\s*min|\\d+h\\s*\\d+m/i');
    const durationCount = await durations.count();

    // Should find duration info for episodes
    expect(durationCount).toBeGreaterThan(0);

    await page.screenshot({ path: 'test-results/screenshots/durations.png' });
  });

  test('newest episode (18) appears first in the list', async ({ page }) => {
    await page.goto('/episodes');

    // Wait for episodes to load
    await page.waitForSelector('h3:has-text("Episode")');

    // Get the first episode heading
    const firstEpisodeHeading = page.locator('h3').filter({ hasText: /Episode \d+:/ }).first();

    // Check that it's Episode 18
    await expect(firstEpisodeHeading).toContainText('Episode 18');
  });
});
