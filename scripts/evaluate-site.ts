import { chromium, Browser, Page } from 'playwright';

async function evaluatePage(page: Page, url: string, pageName: string) {
  const startTime = Date.now();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  const loadTime = Date.now() - startTime;

  const seoData = await page.evaluate(() => {
    const getMetaContent = (name: string, attr: string = 'name'): string => {
      const el = document.querySelector(`meta[${attr}="${name}"]`);
      return el?.getAttribute('content') || '';
    };

    const ogTags: Record<string, string> = {};
    document.querySelectorAll('meta[property^="og:"]').forEach(el => {
      const prop = el.getAttribute('property') || '';
      ogTags[prop] = el.getAttribute('content') || '';
    });

    const twitterTags: Record<string, string> = {};
    document.querySelectorAll('meta[name^="twitter:"]').forEach(el => {
      const name = el.getAttribute('name') || '';
      twitterTags[name] = el.getAttribute('content') || '';
    });

    const headings: { tag: string; text: string }[] = [];
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(el => {
      headings.push({
        tag: el.tagName.toLowerCase(),
        text: (el.textContent || '').trim().substring(0, 80)
      });
    });

    const images = document.querySelectorAll('img');
    let imagesWithoutAlt = 0;
    images.forEach(img => {
      if (!img.alt || img.alt.trim() === '') imagesWithoutAlt++;
    });

    return {
      title: document.title,
      metaDescription: getMetaContent('description'),
      ogTags,
      twitterTags,
      headings,
      imagesWithoutAlt,
      totalImages: images.length
    };
  });

  return {
    page: pageName,
    seo: seoData,
    performance: { loadTime }
  };
}

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
  const homepage = await evaluatePage(page, 'https://agentic-saas-talks.com', 'Homepage');
  console.log('Load Time: ' + homepage.performance.loadTime + 'ms');
  console.log('Title: ' + homepage.seo.title);
  console.log('Meta Description: ' + (homepage.seo.metaDescription || 'MISSING'));
  console.log('OG Tags: ' + JSON.stringify(homepage.seo.ogTags, null, 2));
  console.log('Twitter Tags: ' + JSON.stringify(homepage.seo.twitterTags, null, 2));
  console.log('Headings: ' + JSON.stringify(homepage.seo.headings, null, 2));
  console.log('Images: ' + homepage.seo.totalImages + ' total, ' + homepage.seo.imagesWithoutAlt + ' without alt');

  // Check hero section
  const heroContent = await page.evaluate(() => {
    const hero = document.querySelector('section') || document.querySelector('[class*="hero"]');
    return hero ? hero.textContent?.substring(0, 500) : 'No hero section found';
  });
  console.log('\nHero Section Content Preview:\n' + (heroContent?.substring(0, 300) || '') + '...');

  // Check CTA buttons
  const ctaButtons = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('a[href*="youtube"], a[href*="episodes"], button'));
    return buttons.map(b => ({ text: (b.textContent || '').trim(), href: (b as HTMLAnchorElement).href })).slice(0, 5);
  });
  console.log('\nCTA Buttons Found: ' + JSON.stringify(ctaButtons, null, 2));

  // Screenshot desktop
  await page.screenshot({ path: '/tmp/homepage-desktop.png', fullPage: true });
  console.log('\nDesktop screenshot saved: /tmp/homepage-desktop.png');

  // Mobile viewport
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/homepage-mobile.png', fullPage: true });
  console.log('Mobile screenshot saved: /tmp/homepage-mobile.png');

  // Check mobile navigation
  const mobileNav = await page.evaluate(() => {
    const hamburger = document.querySelector('[aria-label*="menu"]') ||
                      document.querySelector('button[class*="mobile"]') ||
                      document.querySelector('[class*="hamburger"]');
    return hamburger ? 'Found' : 'Not found';
  });
  console.log('Mobile Navigation Button: ' + mobileNav);

  // Reset viewport
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Evaluate Episodes Page
  console.log('\n--- EPISODES PAGE EVALUATION ---\n');
  const episodesPage = await evaluatePage(page, 'https://agentic-saas-talks.com/episodes', 'Episodes');
  console.log('Load Time: ' + episodesPage.performance.loadTime + 'ms');
  console.log('Title: ' + episodesPage.seo.title);
  console.log('Meta Description: ' + (episodesPage.seo.metaDescription || 'MISSING'));
  console.log('Headings: ' + JSON.stringify(episodesPage.seo.headings, null, 2));
  console.log('Images: ' + episodesPage.seo.totalImages + ' total, ' + episodesPage.seo.imagesWithoutAlt + ' without alt');

  // Check episode cards
  const episodeCards = await page.evaluate(() => {
    const cards = document.querySelectorAll('[class*="episode"], [class*="card"], article');
    return cards.length;
  });
  console.log('Episode Cards Found: ' + episodeCards);

  // Check tag filtering
  const tagButtons = await page.evaluate(() => {
    const tags = document.querySelectorAll('button[class*="tag"], [class*="filter"]');
    return Array.from(tags).map(t => (t.textContent || '').trim()).slice(0, 10);
  });
  console.log('Tag Filters: ' + JSON.stringify(tagButtons));

  await page.screenshot({ path: '/tmp/episodes-desktop.png', fullPage: true });

  // Evaluate Hosts Page
  console.log('\n--- HOSTS PAGE EVALUATION ---\n');
  const hostsPage = await evaluatePage(page, 'https://agentic-saas-talks.com/hosts', 'Hosts');
  console.log('Load Time: ' + hostsPage.performance.loadTime + 'ms');
  console.log('Title: ' + hostsPage.seo.title);
  console.log('Meta Description: ' + (hostsPage.seo.metaDescription || 'MISSING'));
  console.log('Headings: ' + JSON.stringify(hostsPage.seo.headings, null, 2));

  // Check LinkedIn links
  const linkedInLinks = await page.evaluate(() => {
    const links = document.querySelectorAll('a[href*="linkedin"]');
    return Array.from(links).map(l => ({ text: (l.textContent || '').trim(), href: (l as HTMLAnchorElement).href }));
  });
  console.log('LinkedIn Links: ' + JSON.stringify(linkedInLinks, null, 2));

  await page.screenshot({ path: '/tmp/hosts-desktop.png', fullPage: true });

  // Check Technical SEO
  console.log('\n--- TECHNICAL SEO CHECK ---\n');

  // Sitemap
  try {
    const sitemapResponse = await page.goto('https://agentic-saas-talks.com/sitemap.xml');
    console.log('Sitemap Status: ' + (sitemapResponse?.status() || 'N/A'));
    if (sitemapResponse?.ok()) {
      const sitemapContent = await page.content();
      console.log('Sitemap exists: Yes (' + sitemapContent.length + ' bytes)');
    } else {
      console.log('Sitemap: NOT FOUND');
    }
  } catch (e) {
    console.log('Sitemap: ERROR checking');
  }

  // Robots.txt
  try {
    const robotsResponse = await page.goto('https://agentic-saas-talks.com/robots.txt');
    console.log('Robots.txt Status: ' + (robotsResponse?.status() || 'N/A'));
    if (robotsResponse?.ok()) {
      const robotsContent = await page.textContent('body');
      console.log('Robots.txt Content:\n' + robotsContent);
    } else {
      console.log('Robots.txt: NOT FOUND');
    }
  } catch (e) {
    console.log('Robots.txt: ERROR checking');
  }

  // Check internal linking
  console.log('\n--- INTERNAL LINKING CHECK ---\n');
  await page.goto('https://agentic-saas-talks.com');
  const internalLinks = await page.evaluate(() => {
    const links = document.querySelectorAll('a[href^="/"], a[href*="agentic-saas-talks.com"]');
    const linkMap: Record<string, number> = {};
    links.forEach(l => {
      const href = (l as HTMLAnchorElement).pathname || (l as HTMLAnchorElement).href;
      linkMap[href] = (linkMap[href] || 0) + 1;
    });
    return linkMap;
  });
  console.log('Internal Links from Homepage: ' + JSON.stringify(internalLinks, null, 2));

  // Check external links
  const externalLinks = await page.evaluate(() => {
    const links = document.querySelectorAll('a[href^="http"]');
    return Array.from(links)
      .filter(l => !(l as HTMLAnchorElement).href.includes('agentic-saas-talks.com'))
      .map(l => (l as HTMLAnchorElement).href)
      .slice(0, 10);
  });
  console.log('External Links: ' + JSON.stringify(externalLinks, null, 2));

  await browser.close();
  console.log('\n================================================================================');
  console.log('EVALUATION COMPLETE');
  console.log('================================================================================');
}

main().catch(console.error);
