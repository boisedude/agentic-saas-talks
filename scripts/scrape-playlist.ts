import { chromium } from 'playwright';

async function scrapePlaylist() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log('Navigating to playlist...');
  await page.goto('https://www.youtube.com/playlist?list=PLT2Zisspnj0fsEqkag0AtmPnw3mRfF3j_', {
    waitUntil: 'networkidle',
    timeout: 60000
  });

  // Wait for playlist items to load
  await page.waitForSelector('ytd-playlist-video-renderer', { timeout: 30000 });

  // Scroll to load all videos
  let previousCount = 0;
  let currentCount = 0;
  let scrollAttempts = 0;
  const maxScrollAttempts = 20;

  do {
    previousCount = currentCount;
    await page.evaluate(() => window.scrollBy(0, 2000));
    await page.waitForTimeout(1500);
    currentCount = await page.locator('ytd-playlist-video-renderer').count();
    scrollAttempts++;
    console.log('Scroll ' + scrollAttempts + ': Found ' + currentCount + ' videos');
  } while (currentCount > previousCount && scrollAttempts < maxScrollAttempts);

  console.log('Total videos found: ' + currentCount);

  // Extract video data
  const videos = await page.evaluate(() => {
    const items = document.querySelectorAll('ytd-playlist-video-renderer');
    const results: {position: string, title: string, videoUrl: string, videoId: string, metadata: string}[] = [];

    items.forEach((item, idx) => {
      const titleEl = item.querySelector('#video-title');
      const title = titleEl?.textContent?.trim() || '';
      const href = titleEl?.getAttribute('href') || '';

      // Extract video ID from href
      const videoIdMatch = href.match(/watch\?v=([^&]+)/);
      const videoId = videoIdMatch ? videoIdMatch[1] : '';
      const videoUrl = videoId ? 'https://www.youtube.com/watch?v=' + videoId : '';

      // Try to get index/position
      const indexEl = item.querySelector('#index');
      const position = indexEl?.textContent?.trim() || String(idx + 1);

      // Try to get metadata (sometimes includes date info)
      const metadataEl = item.querySelector('#video-info');
      const metadata = metadataEl?.textContent?.trim() || '';

      if (title && videoUrl) {
        results.push({
          position,
          title,
          videoUrl,
          videoId,
          metadata
        });
      }
    });

    return results;
  });

  await browser.close();

  console.log('\n=== PLAYLIST VIDEOS ===\n');
  videos.forEach((video, index) => {
    console.log((index + 1) + '. ' + video.title);
    console.log('   URL: ' + video.videoUrl);
    if (video.metadata) {
      console.log('   Info: ' + video.metadata);
    }
    console.log('');
  });

  console.log('\nTotal: ' + videos.length + ' videos');

  return videos;
}

scrapePlaylist().catch(console.error);
