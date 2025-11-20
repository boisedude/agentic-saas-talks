import { chromium } from 'playwright';

interface EpisodeData {
  id: number;
  videoId: string;
  title: string;
  description: string;
  timestamps: { time: string; title: string }[];
}

const episodesToScrape = [
  { id: 16, videoId: '5v5BWl9l4OY' },
  { id: 15, videoId: 'reDzpXynnEw' },
  { id: 14, videoId: 'UaPP1X6LpiY' },
  { id: 13, videoId: 'Wp1iEZnhJ-o' },
  { id: 12, videoId: 'VVMJdjrx7Fw' },
  { id: 11, videoId: 'OcLtP30pRhI' },
  { id: 10, videoId: 'XL8kWY_QuQw' },
  { id: 9, videoId: 'oHH2Nmv-h28' },
  { id: 8, videoId: '7s_CmfUqWQY' },
  { id: 7, videoId: 'd5FfOJoYcDc' },
  { id: 6, videoId: 'AuGAgLANqxU' },
  { id: 5, videoId: 'TEFW1zesu2k' },
  { id: 4, videoId: 'eu94ja61HKM' },
  { id: 3, videoId: 'GBnflK7Dnfo' },
  { id: 2, videoId: 'pK9_l1eAvRk' },
  { id: 1, videoId: 'NwyIMZbhJno' },
];

async function scrapeEpisode(page: any, videoId: string, id: number): Promise<EpisodeData> {
  const url = `https://www.youtube.com/watch?v=${videoId}`;

  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

  // Wait for content
  await page.waitForSelector('h1.ytd-video-primary-info-renderer, h1.ytd-watch-metadata', { timeout: 10000 }).catch(() => {});

  // Get title
  const title = await page.evaluate(() => {
    const titleEl = document.querySelector('h1.ytd-video-primary-info-renderer yt-formatted-string, h1.ytd-watch-metadata yt-formatted-string');
    return titleEl?.textContent?.trim() || '';
  });

  // Expand description
  await page.click('#expand, #description-inline-expander, [aria-label="Show more"]').catch(() => {});
  await page.waitForTimeout(800);

  // Get description
  const description = await page.evaluate(() => {
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

  // Parse timestamps from description
  const timestamps = await page.evaluate(() => {
    const desc = document.querySelector('#description-inline-expander, #description')?.textContent || '';
    const chapterRegex = /(\d{1,2}:\d{2}(?::\d{2})?)\s*[-–—:]?\s*(.+?)(?=\n|\d{1,2}:\d{2}|$)/g;
    const matches: { time: string; title: string }[] = [];
    let match;
    while ((match = chapterRegex.exec(desc)) !== null) {
      const title = match[2].trim();
      // Filter out non-chapter lines (URLs, hashtags, etc.)
      if (title && !title.startsWith('http') && !title.startsWith('#') && title.length > 2 && title.length < 150) {
        matches.push({ time: match[1], title });
      }
    }
    return matches;
  });

  return { id, videoId, title, description, timestamps };
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const results: EpisodeData[] = [];

  for (const ep of episodesToScrape) {
    console.log(`Scraping Episode ${ep.id}...`);
    try {
      const data = await scrapeEpisode(page, ep.videoId, ep.id);
      results.push(data);
      console.log(`  Title: ${data.title}`);
      console.log(`  Timestamps: ${data.timestamps.length}`);
      console.log(`  Description length: ${data.description.length} chars`);
    } catch (err) {
      console.error(`  Error scraping episode ${ep.id}:`, err);
    }
  }

  await browser.close();

  // Output JSON for processing
  console.log('\n\n=== JSON OUTPUT ===');
  console.log(JSON.stringify(results, null, 2));
}

main();
