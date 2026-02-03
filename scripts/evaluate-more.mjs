import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  console.log('--- ADDITIONAL EVALUATIONS ---\n');

  // Check Blog page
  console.log('=== BLOG PAGE ===\n');
  const blogResp = await page.goto('https://agentic-saas-talks.com/blog', { waitUntil: 'networkidle', timeout: 30000 });
  console.log('Blog Status: ' + blogResp.status());

  if (blogResp.ok()) {
    const blogTitle = await page.title();
    console.log('Title: ' + blogTitle);

    const blogHeadings = await page.$$eval('h1, h2, h3', els =>
      els.slice(0, 10).map(el => ({ tag: el.tagName.toLowerCase(), text: el.textContent.trim().substring(0, 60) }))
    );
    console.log('Headings: ' + JSON.stringify(blogHeadings, null, 2));

    await page.screenshot({ path: '/tmp/blog-desktop.png', fullPage: true });
  }

  // Episodes page - check tag filtering
  console.log('\n=== EPISODES TAG FILTERING ===\n');
  await page.goto('https://agentic-saas-talks.com/episodes', { waitUntil: 'networkidle' });

  // Find all clickable tag buttons
  const allButtons = await page.$$eval('button', els =>
    els.map(el => ({ text: el.textContent.trim(), classes: el.className }))
  );
  console.log('All buttons on page: ' + JSON.stringify(allButtons.slice(0, 20), null, 2));

  // Check for filter section
  const filterSection = await page.$('[class*="filter"], [class*="tag"], [role="tablist"]');
  console.log('Filter section found: ' + (filterSection ? 'Yes' : 'No'));

  // Check 404 page
  console.log('\n=== 404 PAGE ===\n');
  const notFoundResp = await page.goto('https://agentic-saas-talks.com/nonexistent-page', { waitUntil: 'networkidle' });
  console.log('404 Status: ' + notFoundResp.status());
  const notFoundContent = await page.$eval('body', el => el.textContent.substring(0, 300));
  console.log('404 Content: ' + notFoundContent);

  // Check canonical URLs
  console.log('\n=== CANONICAL URLS ===\n');
  await page.goto('https://agentic-saas-talks.com');
  const homeCanonical = await page.$eval('link[rel="canonical"]', el => el.href).catch(() => 'MISSING');
  console.log('Homepage Canonical: ' + homeCanonical);

  await page.goto('https://agentic-saas-talks.com/episodes');
  const episodesCanonical = await page.$eval('link[rel="canonical"]', el => el.href).catch(() => 'MISSING');
  console.log('Episodes Canonical: ' + episodesCanonical);

  await page.goto('https://agentic-saas-talks.com/hosts');
  const hostsCanonical = await page.$eval('link[rel="canonical"]', el => el.href).catch(() => 'MISSING');
  console.log('Hosts Canonical: ' + hostsCanonical);

  // Check structured data (JSON-LD)
  console.log('\n=== STRUCTURED DATA ===\n');
  await page.goto('https://agentic-saas-talks.com');
  const jsonLd = await page.$$eval('script[type="application/ld+json"]', els =>
    els.map(el => {
      try { return JSON.parse(el.textContent); } catch { return null; }
    })
  );
  console.log('JSON-LD on Homepage: ' + JSON.stringify(jsonLd, null, 2));

  // Check favicon
  console.log('\n=== FAVICON ===\n');
  const favicon = await page.$eval('link[rel*="icon"]', el => el.href).catch(() => 'MISSING');
  console.log('Favicon: ' + favicon);

  // Check lang attribute
  const htmlLang = await page.$eval('html', el => el.lang).catch(() => 'MISSING');
  console.log('HTML lang attribute: ' + htmlLang);

  // Check viewport meta
  const viewportMeta = await page.$eval('meta[name="viewport"]', el => el.content).catch(() => 'MISSING');
  console.log('Viewport meta: ' + viewportMeta);

  // Check for console errors
  console.log('\n=== CONSOLE ERRORS ===\n');
  const consoleMessages = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleMessages.push(msg.text());
  });
  await page.goto('https://agentic-saas-talks.com', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  console.log('Console errors: ' + (consoleMessages.length > 0 ? JSON.stringify(consoleMessages) : 'None'));

  // Performance check - Core Web Vitals simulation
  console.log('\n=== PERFORMANCE METRICS ===\n');
  await page.goto('https://agentic-saas-talks.com', { waitUntil: 'networkidle' });

  const perfMetrics = await page.evaluate(() => {
    const paint = performance.getEntriesByType('paint');
    const navigation = performance.getEntriesByType('navigation')[0];
    return {
      firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 'N/A',
      firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 'N/A',
      domContentLoaded: navigation?.domContentLoadedEventEnd || 'N/A',
      loadComplete: navigation?.loadEventEnd || 'N/A'
    };
  });
  console.log('Performance Metrics: ' + JSON.stringify(perfMetrics, null, 2));

  await browser.close();
  console.log('\n--- ADDITIONAL EVALUATIONS COMPLETE ---');
}

main().catch(console.error);
