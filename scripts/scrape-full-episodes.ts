import { chromium, Page } from 'playwright';

interface VideoInfo {
  url: string;
  title: string;
  duration: string;
  durationMinutes: number;
  publishDate: string;
  description: string;
  timestamps: { time: string; title: string }[];
  guestInfo: string;
}

// Only the full episodes (>10 min)
const videoUrls = [
  "https://www.youtube.com/watch?v=LFNcqf9oolY", // 1:44:47
  "https://www.youtube.com/watch?v=xjeLLZHM3lY", // 22:45
  "https://www.youtube.com/watch?v=OzWr7wm7v_M", // 24:49
  "https://www.youtube.com/watch?v=HgoMTnS4i2o", // 13:59
];

async function scrapeVideo(page: Page, url: string): Promise<VideoInfo> {
  console.log(`\nScraping: ${url}`);

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(4000);

  // Click "more" to expand description
  try {
    const moreButton = page.locator('#description-inline-expander tp-yt-paper-button#expand');
    if (await moreButton.isVisible({ timeout: 3000 })) {
      await moreButton.click();
      await page.waitForTimeout(1500);
    }
  } catch {
    console.log('  Could not find expand button');
  }

  // Also try clicking "...more" text
  try {
    const showMore = page.locator('tp-yt-paper-button#expand');
    if (await showMore.isVisible({ timeout: 2000 })) {
      await showMore.click();
      await page.waitForTimeout(1000);
    }
  } catch {
    // ignore
  }

  // Extract video info
  const info = await page.evaluate(() => {
    // Title
    const titleEl = document.querySelector('h1.style-scope.ytd-watch-metadata yt-formatted-string') ||
                    document.querySelector('yt-formatted-string.style-scope.ytd-watch-metadata') ||
                    document.querySelector('#title h1 yt-formatted-string');
    const title = titleEl?.textContent?.trim() || '';

    // Duration from video player
    const durationEl = document.querySelector('.ytp-time-duration');
    const duration = durationEl?.textContent?.trim() || '';

    // Parse duration to minutes
    let durationMinutes = 0;
    if (duration) {
      const parts = duration.split(':').map(Number);
      if (parts.length === 3) {
        durationMinutes = parts[0] * 60 + parts[1] + parts[2] / 60;
      } else if (parts.length === 2) {
        durationMinutes = parts[0] + parts[1] / 60;
      }
    }

    // Get the full description text
    const descContainer = document.querySelector('#description-inline-expander') ||
                          document.querySelector('#description');
    let fullDesc = '';
    if (descContainer) {
      fullDesc = descContainer.textContent || '';
    }

    // Look for date in info area
    let publishDate = '';
    const infoRows = document.querySelectorAll('#info-container yt-formatted-string');
    infoRows.forEach(row => {
      const text = row.textContent || '';
      // Match dates like "Dec 2, 2025" or "Streamed live on Dec 2, 2025"
      const dateMatch = text.match(/([A-Z][a-z]{2,8}\s+\d{1,2},\s+\d{4})/);
      if (dateMatch) publishDate = dateMatch[1];
    });

    // Also check within description for date patterns
    if (!publishDate) {
      const descDateMatch = fullDesc.match(/(?:Streamed live on |Premiered |Published on )([A-Z][a-z]{2,8}\s+\d{1,2},\s+\d{4})/);
      if (descDateMatch) publishDate = descDateMatch[1];
    }

    // Extract timestamps from description
    const timestamps: { time: string; title: string }[] = [];
    const lines = fullDesc.split('\n');
    const timestampRegex = /^(\d{1,2}:\d{2}(?::\d{2})?)\s*[-–]?\s*(.+)$/;

    const seenTimes = new Set<string>();
    for (const line of lines) {
      const match = line.trim().match(timestampRegex);
      if (match) {
        const time = match[1];
        const tsTitle = match[2].trim();
        // Skip duplicates and empty titles
        if (tsTitle && !seenTimes.has(time) && !tsTitle.match(/^\d{1,2}:\d{2}/)) {
          seenTimes.add(time);
          timestamps.push({ time, title: tsTitle });
        }
      }
    }

    // Extract guest info - look for patterns in description
    let guestInfo = '';

    // Look for speaker info patterns
    const speakerPatterns = [
      /Speaker[s]?:?\s*([^\n]+)/gi,
      /Featuring[:\s]+([^\n]+)/gi,
      /with\s+([A-Z][a-zA-Z\s,]+(?:at|from|of|,)\s+[A-Z][a-zA-Z\s]+)/gi,
      /([A-Z][a-z]+\s+[A-Z][a-z]+),?\s+(?:Head of|VP|Director|CEO|CTO|Founder|Co-founder|Engineering|at)\s+([A-Z][a-zA-Z\s]+)/gi,
    ];

    // Get first part of description for summary
    const descLines = fullDesc.split('\n').filter(l => l.trim());
    const descSummary = descLines.slice(0, 10).join('\n');

    // Extract guest mentions from title and description
    const guestMatches: string[] = [];

    // Check title for "with X at Y" pattern
    const titleGuestMatch = title.match(/with\s+(.+?)(?:\s+at\s+|\s+-\s*$|$)/i);
    if (titleGuestMatch) {
      guestMatches.push(titleGuestMatch[1]);
    }

    // Look for name + role patterns in description
    const rolePattern = /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+),?\s*(?:Head of Engineering|VP of Engineering|Director|CTO|CEO|Founder|Co-founder|Engineering Leader)[^,\n]*/g;
    let roleMatch;
    while ((roleMatch = rolePattern.exec(fullDesc)) !== null) {
      if (!guestMatches.includes(roleMatch[0])) {
        guestMatches.push(roleMatch[0]);
      }
    }

    guestInfo = guestMatches.join('; ');

    return {
      title,
      duration,
      durationMinutes: Math.round(durationMinutes),
      publishDate,
      description: descSummary,
      timestamps: timestamps.slice(0, 15), // Limit to first 15 timestamps
      guestInfo,
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

  console.log('========== FULL EPISODES DETAILED INFO ==========\n');

  for (const url of videoUrls) {
    try {
      const info = await scrapeVideo(page, url);

      console.log('\n' + '='.repeat(80));
      console.log(`TITLE: ${info.title}`);
      console.log(`URL: ${info.url}`);
      console.log(`DURATION: ${info.duration} (~${info.durationMinutes} min)`);
      console.log(`PUBLISH DATE: ${info.publishDate || 'Not found'}`);
      console.log(`\nDESCRIPTION SUMMARY:`);
      console.log(info.description);

      if (info.guestInfo) {
        console.log(`\nGUEST INFO: ${info.guestInfo}`);
      }

      if (info.timestamps.length > 0) {
        console.log('\nTIMESTAMPS:');
        info.timestamps.forEach(ts => console.log(`  ${ts.time} - ${ts.title}`));
      }

    } catch (err) {
      console.error(`\nError scraping ${url}:`, err);
    }
  }

  await browser.close();
}

main().catch(console.error);
