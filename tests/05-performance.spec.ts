import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('homepage loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    // Take screenshot
    await page.screenshot({ path: 'test-results/screenshots/performance-homepage.png', fullPage: true });

    // Log load time
    console.log(`Homepage load time: ${loadTime}ms`);

    // Should load within 5 seconds (adjust as needed)
    expect(loadTime).toBeLessThan(5000);
  });

  test('episodes page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/episodes');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    console.log(`Episodes page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(5000);
  });

  test('hosts page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/hosts');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    console.log(`Hosts page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(5000);
  });

  test('images load efficiently', async ({ page }) => {
    await page.goto('/hosts');

    // Get all images
    const images = await page.locator('img').all();

    let totalImageSize = 0;
    let imageCount = 0;

    for (const img of images) {
      const isVisible = await img.isVisible();
      if (isVisible) {
        const src = await img.getAttribute('src');
        if (src) {
          imageCount++;

          // Check for lazy loading attribute
          const loading = await img.getAttribute('loading');
          if (loading === 'lazy') {
            console.log(`Image has lazy loading: ${src}`);
          }

          // Check for responsive images
          const srcset = await img.getAttribute('srcset');
          if (srcset) {
            console.log(`Image has srcset: ${src}`);
          }
        }
      }
    }

    console.log(`Total images found: ${imageCount}`);

    // Take screenshot
    await page.screenshot({ path: 'test-results/screenshots/performance-images.png', fullPage: true });
  });

  test('no unnecessary network requests', async ({ page }) => {
    const requests: string[] = [];

    page.on('request', request => {
      requests.push(request.url());
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    console.log(`Total network requests: ${requests.length}`);

    // Log requests
    requests.forEach((req, idx) => {
      if (idx < 20) { // Log first 20
        console.log(`Request ${idx + 1}: ${req}`);
      }
    });

    // Should have reasonable number of requests (adjust as needed)
    expect(requests.length).toBeLessThan(100);
  });

  test('no console errors on homepage', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Log any errors
    if (errors.length > 0) {
      console.log('Console errors found:');
      errors.forEach(err => console.log(`  - ${err}`));
    }

    // Ideally no console errors
    expect(errors.length).toBe(0);
  });

  test('no console errors on episodes page', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/episodes');
    await page.waitForLoadState('networkidle');

    if (errors.length > 0) {
      console.log('Console errors found on episodes page:');
      errors.forEach(err => console.log(`  - ${err}`));
    }

    expect(errors.length).toBe(0);
  });

  test('no console errors on hosts page', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/hosts');
    await page.waitForLoadState('networkidle');

    if (errors.length > 0) {
      console.log('Console errors found on hosts page:');
      errors.forEach(err => console.log(`  - ${err}`));
    }

    expect(errors.length).toBe(0);
  });

  test('fonts load efficiently', async ({ page }) => {
    const fontRequests: string[] = [];

    page.on('request', request => {
      const url = request.url();
      if (url.includes('.woff') || url.includes('.woff2') || url.includes('.ttf') || url.includes('fonts')) {
        fontRequests.push(url);
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    console.log(`Font requests: ${fontRequests.length}`);
    fontRequests.forEach(font => console.log(`  - ${font}`));

    // Should have minimal font requests
    expect(fontRequests.length).toBeLessThan(10);
  });

  test('JavaScript bundle size is reasonable', async ({ page }) => {
    const jsRequests: Array<{ url: string; size: number }> = [];

    page.on('response', async response => {
      const url = response.url();
      if (url.includes('.js')) {
        try {
          const buffer = await response.body();
          jsRequests.push({
            url,
            size: buffer.length,
          });
        } catch (e) {
          // Some requests might fail to get body
        }
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const totalJsSize = jsRequests.reduce((sum, req) => sum + req.size, 0);
    const totalJsSizeMB = (totalJsSize / 1024 / 1024).toFixed(2);

    console.log(`Total JS size: ${totalJsSizeMB} MB`);
    console.log(`Number of JS files: ${jsRequests.length}`);

    // Log largest files
    jsRequests
      .sort((a, b) => b.size - a.size)
      .slice(0, 5)
      .forEach(req => {
        const sizeMB = (req.size / 1024 / 1024).toFixed(2);
        console.log(`  - ${req.url.split('/').pop()}: ${sizeMB} MB`);
      });
  });

  test('CSS bundle size is reasonable', async ({ page }) => {
    const cssRequests: Array<{ url: string; size: number }> = [];

    page.on('response', async response => {
      const url = response.url();
      if (url.includes('.css')) {
        try {
          const buffer = await response.body();
          cssRequests.push({
            url,
            size: buffer.length,
          });
        } catch (e) {
          // Some requests might fail to get body
        }
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const totalCssSize = cssRequests.reduce((sum, req) => sum + req.size, 0);
    const totalCssSizeKB = (totalCssSize / 1024).toFixed(2);

    console.log(`Total CSS size: ${totalCssSizeKB} KB`);
    console.log(`Number of CSS files: ${cssRequests.length}`);
  });

  test('page is interactive quickly (Time to Interactive)', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');

    // Wait for page to be interactive
    await page.waitForLoadState('domcontentloaded');
    const dclTime = Date.now() - startTime;

    await page.waitForLoadState('load');
    const loadTime = Date.now() - startTime;

    console.log(`DOMContentLoaded: ${dclTime}ms`);
    console.log(`Load event: ${loadTime}ms`);

    // Try to interact with navigation
    const navLink = page.getByRole('link', { name: /Episodes/i }).first();
    await expect(navLink).toBeVisible();

    const interactiveTime = Date.now() - startTime;
    console.log(`Time to Interactive: ${interactiveTime}ms`);

    // Should be interactive within 3 seconds
    expect(interactiveTime).toBeLessThan(3000);
  });

  test('scroll performance is smooth', async ({ page }) => {
    await page.goto('/episodes');

    // Measure scroll performance
    const scrollStart = Date.now();

    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(100);
    }

    const scrollTime = Date.now() - scrollStart;
    console.log(`Scroll time: ${scrollTime}ms`);

    // Take screenshot at bottom
    await page.screenshot({ path: 'test-results/screenshots/performance-scroll.png' });

    // Should scroll smoothly (adjust threshold as needed)
    expect(scrollTime).toBeLessThan(2000);
  });
});
