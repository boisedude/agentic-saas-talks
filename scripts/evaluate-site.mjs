import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  console.log('================================================================================');
  console.log('WEBSITE EVALUATION: agentic-saas-talks.com');
  console.log('================================================================================');

  // Evaluate Homepage
  console.log('\n--- HOMEPAGE EVALUATION ---\n');
  let startTime = Date.now();
  await page.goto('https://agentic-saas-talks.com', { waitUntil: 'networkidle', timeout: 30000 });
  let loadTime = Date.now() - startTime;
  console.log('Load Time: ' + loadTime + 'ms');

  // Title
  const homeTitle = await page.title();
  console.log('Title: ' + homeTitle);

  // Meta description
  const homeMetaDesc = await page.$eval('meta[name="description"]', el => el.content).catch(() => 'MISSING');
  console.log('Meta Description: ' + homeMetaDesc);

  // OG Tags
  const ogTags = await page.$$eval('meta[property^="og:"]', els =>
    els.map(el => ({ prop: el.getAttribute('property'), content: el.content }))
  );
  console.log('OG Tags: ' + JSON.stringify(ogTags, null, 2));

  // Twitter Tags
  const twitterTags = await page.$$eval('meta[name^="twitter:"]', els =>
    els.map(el => ({ name: el.name, content: el.content }))
  );
  console.log('Twitter Tags: ' + JSON.stringify(twitterTags, null, 2));

  // Headings
  const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', els =>
    els.map(el => ({ tag: el.tagName.toLowerCase(), text: el.textContent.trim().substring(0, 80) }))
  );
  console.log('Headings: ' + JSON.stringify(headings, null, 2));

  // Images
  const imageStats = await page.$$eval('img', imgs => {
    let withoutAlt = 0;
    imgs.forEach(img => { if (!img.alt || img.alt.trim() === '') withoutAlt++; });
    return { total: imgs.length, withoutAlt };
  });
  console.log('Images: ' + imageStats.total + ' total, ' + imageStats.withoutAlt + ' without alt');

  // Hero content
  const heroContent = await page.$eval('section', el => el.textContent.substring(0, 300)).catch(() => 'No section found');
  console.log('\nHero Section Preview:\n' + heroContent + '...');

  // CTA Buttons
  const ctaButtons = await page.$$eval('a[href*="youtube"], a[href*="episodes"]', els =>
    els.slice(0, 5).map(el => ({ text: el.textContent.trim(), href: el.href }))
  );
  console.log('\nCTA Buttons: ' + JSON.stringify(ctaButtons, null, 2));

  // Screenshot
  await page.screenshot({ path: '/tmp/homepage-desktop.png', fullPage: true });
  console.log('Desktop screenshot: /tmp/homepage-desktop.png');

  // Mobile test
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/homepage-mobile.png', fullPage: true });
  console.log('Mobile screenshot: /tmp/homepage-mobile.png');

  const mobileMenuButton = await page.$('button[aria-label*="menu"], button[aria-label*="Menu"], [class*="hamburger"]');
  console.log('Mobile Menu Button: ' + (mobileMenuButton ? 'Found' : 'Not found'));

  // Reset viewport
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Evaluate Episodes Page
  console.log('\n--- EPISODES PAGE EVALUATION ---\n');
  startTime = Date.now();
  await page.goto('https://agentic-saas-talks.com/episodes', { waitUntil: 'networkidle', timeout: 30000 });
  loadTime = Date.now() - startTime;
  console.log('Load Time: ' + loadTime + 'ms');

  const episodesTitle = await page.title();
  console.log('Title: ' + episodesTitle);

  const episodesMetaDesc = await page.$eval('meta[name="description"]', el => el.content).catch(() => 'MISSING');
  console.log('Meta Description: ' + episodesMetaDesc);

  const episodesHeadings = await page.$$eval('h1, h2, h3', els =>
    els.map(el => ({ tag: el.tagName.toLowerCase(), text: el.textContent.trim().substring(0, 80) }))
  );
  console.log('Headings: ' + JSON.stringify(episodesHeadings, null, 2));

  const episodeCards = await page.$$('[class*="card"], article, [class*="episode"]');
  console.log('Episode Cards Found: ' + episodeCards.length);

  const tagFilters = await page.$$eval('button', els =>
    els.filter(el => el.textContent.match(/AI|SaaS|Cloud|Control|Pricing|Startup|Database|Developer/i))
      .map(el => el.textContent.trim())
  );
  console.log('Tag Filters: ' + JSON.stringify(tagFilters.slice(0, 15)));

  await page.screenshot({ path: '/tmp/episodes-desktop.png', fullPage: true });

  // Evaluate Hosts Page
  console.log('\n--- HOSTS PAGE EVALUATION ---\n');
  startTime = Date.now();
  await page.goto('https://agentic-saas-talks.com/hosts', { waitUntil: 'networkidle', timeout: 30000 });
  loadTime = Date.now() - startTime;
  console.log('Load Time: ' + loadTime + 'ms');

  const hostsTitle = await page.title();
  console.log('Title: ' + hostsTitle);

  const hostsMetaDesc = await page.$eval('meta[name="description"]', el => el.content).catch(() => 'MISSING');
  console.log('Meta Description: ' + hostsMetaDesc);

  const hostsHeadings = await page.$$eval('h1, h2, h3', els =>
    els.map(el => ({ tag: el.tagName.toLowerCase(), text: el.textContent.trim().substring(0, 80) }))
  );
  console.log('Headings: ' + JSON.stringify(hostsHeadings, null, 2));

  const linkedInLinks = await page.$$eval('a[href*="linkedin"]', els =>
    els.map(el => ({ text: el.textContent.trim().substring(0, 50), href: el.href }))
  );
  console.log('LinkedIn Links: ' + JSON.stringify(linkedInLinks, null, 2));

  await page.screenshot({ path: '/tmp/hosts-desktop.png', fullPage: true });

  // Technical SEO
  console.log('\n--- TECHNICAL SEO CHECK ---\n');

  // Sitemap
  const sitemapResp = await page.goto('https://agentic-saas-talks.com/sitemap.xml');
  console.log('Sitemap Status: ' + sitemapResp.status());
  if (sitemapResp.ok()) {
    const sitemapText = await page.content();
    console.log('Sitemap: EXISTS (' + sitemapText.length + ' bytes)');
    // Extract URLs from sitemap
    const urlMatches = sitemapText.match(/<loc>([^<]+)<\/loc>/g);
    if (urlMatches) {
      console.log('Sitemap URLs: ' + urlMatches.slice(0, 5).join('\n'));
    }
  } else {
    console.log('Sitemap: MISSING');
  }

  // Robots.txt
  const robotsResp = await page.goto('https://agentic-saas-talks.com/robots.txt');
  console.log('\nRobots.txt Status: ' + robotsResp.status());
  if (robotsResp.ok()) {
    const robotsText = await page.textContent('body');
    console.log('Robots.txt Content:\n' + robotsText);
  } else {
    console.log('Robots.txt: MISSING');
  }

  // Internal linking
  console.log('\n--- INTERNAL LINKING CHECK ---\n');
  await page.goto('https://agentic-saas-talks.com');

  const internalLinks = await page.$$eval('a[href^="/"]', els => {
    const linkMap = {};
    els.forEach(el => {
      const path = el.pathname;
      linkMap[path] = (linkMap[path] || 0) + 1;
    });
    return linkMap;
  });
  console.log('Internal Links: ' + JSON.stringify(internalLinks, null, 2));

  const externalLinks = await page.$$eval('a[href^="http"]', els =>
    els.filter(el => !el.href.includes('agentic-saas-talks.com'))
      .map(el => el.href)
      .slice(0, 10)
  );
  console.log('\nExternal Links: ' + JSON.stringify(externalLinks, null, 2));

  // Check footer
  console.log('\n--- FOOTER CHECK ---\n');
  const footerContent = await page.$eval('footer', el => el.textContent.trim()).catch(() => 'No footer found');
  console.log('Footer: ' + footerContent.substring(0, 200));

  // Check scroll-to-top button
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(500);
  const scrollButton = await page.$('[aria-label*="scroll"], [aria-label*="top"], button[class*="scroll"]');
  console.log('Scroll-to-top button: ' + (scrollButton ? 'Found' : 'Not found'));

  await browser.close();
  console.log('\n================================================================================');
  console.log('EVALUATION COMPLETE');
  console.log('================================================================================');
}

main().catch(console.error);
