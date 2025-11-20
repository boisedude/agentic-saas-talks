import { chromium } from 'playwright';

async function scrapeYouTubeVideo(url: string) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Convert live URL to regular watch URL
  const videoId = url.match(/live\/([^?]+)/)?.[1] || url.match(/watch\?v=([^&]+)/)?.[1];
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  await page.goto(watchUrl, { waitUntil: 'networkidle' });

  // Wait for content to load
  await page.waitForSelector('h1.ytd-video-primary-info-renderer, h1.ytd-watch-metadata', { timeout: 10000 }).catch(() => {});

  // Get title
  const title = await page.evaluate(() => {
    const titleEl = document.querySelector('h1.ytd-video-primary-info-renderer yt-formatted-string, h1.ytd-watch-metadata yt-formatted-string');
    return titleEl?.textContent?.trim() || '';
  });

  // Click to expand description
  await page.click('#expand, #description-inline-expander, [aria-label="Show more"]').catch(() => {});
  await page.waitForTimeout(1000);

  const description = await page.evaluate(() => {
    // Try multiple selectors for description
    const selectors = [
      '#description-inline-expander .ytd-text-inline-expander',
      '#description yt-attributed-string',
      '#description-inner',
      'ytd-text-inline-expander #plain-snippet-text'
    ];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el?.textContent?.trim()) {
        return el.textContent.trim();
      }
    }
    return '';
  });

  // Get duration from video player
  const duration = await page.evaluate(() => {
    const durationEl = document.querySelector('.ytp-time-duration');
    return durationEl?.textContent || '';
  });

  // Get upload date - look for "Streamed live" or date text
  const dateInfo = await page.evaluate(() => {
    const infoContainer = document.querySelector('#info-strings');
    if (infoContainer) {
      return infoContainer.textContent?.trim() || '';
    }
    // Alternative: look in description area
    const dateEl = document.querySelector('#info span, .date');
    return dateEl?.textContent?.trim() || '';
  });

  // Try to get chapters/timestamps from description
  const chapters = await page.evaluate(() => {
    const desc = document.querySelector('#description-inline-expander, #description')?.textContent || '';
    const chapterRegex = /(\d{1,2}:\d{2}(?::\d{2})?)\s*[-–]?\s*(.+)/g;
    const matches = [];
    let match;
    while ((match = chapterRegex.exec(desc)) !== null) {
      matches.push({ time: match[1], title: match[2].trim() });
    }
    return matches;
  });

  await browser.close();

  console.log('=== SCRAPED VIDEO INFO ===');
  console.log('Video ID:', videoId);
  console.log('Title:', title);
  console.log('Duration:', duration);
  console.log('Date Info:', dateInfo);
  console.log('\nDescription:\n', description);
  console.log('\nChapters found:', chapters.length);
  if (chapters.length > 0) {
    console.log('Timestamps:');
    chapters.forEach(ch => console.log(`  ${ch.time} - ${ch.title}`));
  }
  console.log('========================');
}

scrapeYouTubeVideo('https://www.youtube.com/live/zjG96VWKDZQ?si=tIj4UkF-KHnyY2em');
