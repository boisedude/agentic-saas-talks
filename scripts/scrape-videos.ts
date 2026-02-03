import { chromium, Browser, Page } from 'playwright';

interface VideoInfo {
  url: string;
  title: string;
  duration: string;
  durationSeconds: number;
  publishDate: string;
  description: string;
  timestamps: { time: string; title: string }[];
  guests: string[];
}

const videoUrls = [
  "https://www.youtube.com/watch?v=LFNcqf9oolY",
  "https://www.youtube.com/watch?v=xjeLLZHM3lY",
  "https://www.youtube.com/watch?v=OzWr7wm7v_M",
  "https://www.youtube.com/watch?v=pL9U6m7JuV8",
  "https://www.youtube.com/watch?v=C8kF-5SD_6E",
  "https://www.youtube.com/watch?v=LE6UWptt5bo",
  "https://www.youtube.com/watch?v=HgoMTnS4i2o",
  "https://www.youtube.com/watch?v=mlzpqCwzyRc",
  "https://www.youtube.com/watch?v=so23GV4hl70",
  "https://www.youtube.com/watch?v=uh_T1FnpPhA",
  "https://www.youtube.com/watch?v=X-6sXEDsBW4",
  "https://www.youtube.com/watch?v=-RJmB3O4efQ",
];

async function scrapeVideo(page: Page, url: string): Promise<VideoInfo> {
  console.log(`\nScraping: ${url}`);

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);

  // Click "Show more" to expand description
  try {
    await page.click('tp-yt-paper-button#expand', { timeout: 5000 });
    await page.waitForTimeout(1000);
  } catch {
    // Try alternative selectors
    try {
      await page.click('#expand', { timeout: 3000 });
      await page.waitForTimeout(1000);
    } catch {
      console.log('  Could not expand description');
    }
  }

  // Extract video info
  const info = await page.evaluate(() => {
    // Title
    const titleEl = document.querySelector('h1.ytd-video-primary-info-renderer yt-formatted-string') ||
                    document.querySelector('h1.style-scope.ytd-watch-metadata yt-formatted-string') ||
                    document.querySelector('yt-formatted-string.style-scope.ytd-watch-metadata');
    const title = titleEl?.textContent?.trim() || '';

    // Duration from video player
    const durationEl = document.querySelector('.ytp-time-duration');
    const duration = durationEl?.textContent?.trim() || '';

    // Parse duration to seconds
    let durationSeconds = 0;
    if (duration) {
      const parts = duration.split(':').map(Number);
      if (parts.length === 3) {
        durationSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
      } else if (parts.length === 2) {
        durationSeconds = parts[0] * 60 + parts[1];
      }
    }

    // Publish date
    const dateEl = document.querySelector('#info-strings yt-formatted-string') ||
                   document.querySelector('span.style-scope.ytd-video-primary-info-renderer');
    let publishDate = '';
    const infoContainer = document.querySelector('#info-container');
    if (infoContainer) {
      const dateMatch = infoContainer.textContent?.match(/(?:Premiered|Streamed live|Published) ([A-Z][a-z]+ \d+, \d{4})/i);
      if (dateMatch) publishDate = dateMatch[1];
    }
    // Also check description area
    if (!publishDate) {
      const descArea = document.querySelector('#description-inner');
      if (descArea) {
        const dateMatch = descArea.textContent?.match(/(?:Premiered|Streamed live on|Streamed) ([A-Z][a-z]+ \d+, \d{4})/i);
        if (dateMatch) publishDate = dateMatch[1];
      }
    }

    // Description
    const descEl = document.querySelector('#description-inner ytd-text-inline-expander #content') ||
                   document.querySelector('#description ytd-text-inline-expander') ||
                   document.querySelector('#description-inline-expander #content') ||
                   document.querySelector('ytd-text-inline-expander #content');
    let description = descEl?.textContent?.trim() || '';

    // Extract timestamps from description
    const timestamps: { time: string; title: string }[] = [];
    const timestampRegex = /(\d{1,2}:\d{2}(?::\d{2})?)\s*[-–]?\s*([^\n]+)/g;
    let match;
    while ((match = timestampRegex.exec(description)) !== null) {
      const time = match[1];
      const tsTitle = match[2].trim();
      if (tsTitle && !tsTitle.match(/^[\d:]+$/)) {
        timestamps.push({ time, title: tsTitle });
      }
    }

    // Extract potential guest names (look for common patterns)
    const guests: string[] = [];
    const guestPatterns = [
      /with\s+([A-Z][a-z]+\s+[A-Z][a-z]+)/gi,
      /featuring\s+([A-Z][a-z]+\s+[A-Z][a-z]+)/gi,
      /guest[s]?:\s*([A-Z][a-z]+\s+[A-Z][a-z]+)/gi,
    ];
    for (const pattern of guestPatterns) {
      let gMatch;
      while ((gMatch = pattern.exec(description)) !== null) {
        if (!guests.includes(gMatch[1])) {
          guests.push(gMatch[1]);
        }
      }
    }

    // Truncate description for summary
    const firstParagraphs = description.split('\n').filter(l => l.trim()).slice(0, 5).join(' ');
    const descSummary = firstParagraphs.substring(0, 500);

    return {
      title,
      duration,
      durationSeconds,
      publishDate,
      description: descSummary,
      timestamps,
      guests,
    };
  });

  return {
    url,
    ...info,
  };
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const results: VideoInfo[] = [];

  for (const url of videoUrls) {
    try {
      const info = await scrapeVideo(page, url);
      results.push(info);
      console.log(`  Title: ${info.title}`);
      console.log(`  Duration: ${info.duration} (${info.durationSeconds}s)`);
      console.log(`  Date: ${info.publishDate}`);
    } catch (err) {
      console.error(`  Error scraping ${url}:`, err);
    }
  }

  await browser.close();

  // Output results
  console.log('\n\n========== FULL EPISODES (>10 minutes) ==========\n');

  const fullEpisodes = results.filter(v => v.durationSeconds > 600);
  const shorts = results.filter(v => v.durationSeconds <= 600 && v.durationSeconds > 0);

  for (const video of fullEpisodes) {
    console.log(`\n--- ${video.title} ---`);
    console.log(`URL: ${video.url}`);
    console.log(`Duration: ${video.duration}`);
    console.log(`Date: ${video.publishDate}`);
    console.log(`Description: ${video.description}`);
    if (video.timestamps.length > 0) {
      console.log('Timestamps:');
      video.timestamps.forEach(ts => console.log(`  ${ts.time} - ${ts.title}`));
    }
    if (video.guests.length > 0) {
      console.log(`Guests: ${video.guests.join(', ')}`);
    }
  }

  console.log('\n\n========== SHORTS (<10 minutes) ==========');
  shorts.forEach(v => console.log(`- ${v.title} (${v.duration})`));

  console.log(`\n\nSummary: ${fullEpisodes.length} full episodes, ${shorts.length} shorts`);
}

main().catch(console.error);
