# Agent Guide: Adding Episodes to Agentic SaaS Talks

Quick reference for AI agents to add new episodes to the website.

---

## Adding a New Episode

### Step 1: Get Episode Info from YouTube

Use Playwright to scrape the YouTube video:

```typescript
// scripts/scrape-episode.ts
import { chromium } from 'playwright';

async function scrapeYouTubeVideo(url: string) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const videoId = url.match(/watch\?v=([^&]+)/)?.[1] || url.match(/live\/([^?]+)/)?.[1];

  await page.goto(`https://www.youtube.com/watch?v=${videoId}`, { waitUntil: 'networkidle' });
  await page.click('#expand').catch(() => {});
  await page.waitForTimeout(1000);

  // Extract title, description, timestamps from page
  // Return structured data
}
```

Run with: `npx tsx scripts/scrape-episode.ts`

### Step 2: Add Episode to Data File

Edit `/home/mcoop/agentic-saas-talks/data/episodes.ts`

Add new episode at the **TOP** of the `episodes` array:

```typescript
{
  id: 19,  // Increment from previous episode
  title: "Episode Title Here",
  description: "2-3 sentence description of what the episode covers.",
  date: "2025-11-22",  // Format: YYYY-MM-DD
  videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID",
  duration: "60 min",
  tags: ["AI Architecture", "SaaS", "Tag3"],
  timestamps: [
    { time: "00:00", title: "Introduction" },
    { time: "05:30", title: "Topic 1" },
    { time: "15:00", title: "Topic 2" },
    // Copy from YouTube description
  ],
  guests: [  // Optional - only if episode has guests
    {
      name: "Guest Name",
      linkedIn: "https://www.linkedin.com/in/username/",
      bio: "Brief bio (1-2 sentences)"
    }
  ]
}
```

### Step 3: Build

```bash
cd /home/mcoop/agentic-saas-talks
npm run build
```

Verify build passes with no errors.

### Step 4: Test (Optional)

```bash
npm run dev
# Visit http://localhost:3000
# Check homepage shows new episode
# Check /episodes page shows new episode
# Verify timestamps link correctly
```

Or run Playwright tests:
```bash
npx playwright test
```

### Step 5: Deploy to Hostinger

```bash
lftp 191.101.13.61 -e "set ssl:verify-certificate no; set ftp:ssl-allow no; user u951885034 'FTP_PASSWORD_HERE'; cd /domains/agentic-saas-talks.com/public_html; mirror --reverse --delete --verbose /home/mcoop/agentic-saas-talks/out/ ./; quit"
```

**Note:** Get FTP password from user - it's not stored in repo.

### Step 6: Verify Deployment

Check https://agentic-saas-talks.com:
- Homepage shows new episode
- /episodes page lists new episode
- Timestamps link to YouTube at correct times

---

## Important Notes

### Episode ID
- Always increment from the highest existing ID
- Check current highest: `grep "id:" data/episodes.ts | head -1`

### Timestamps Format
- Use `HH:MM` or `H:MM:SS` format
- Example: `"1:05:30"` for 1 hour 5 minutes 30 seconds
- Example: `"05:30"` for 5 minutes 30 seconds

### Tags
Common tags used in this project:
- AI Architecture
- SaaS
- Cloud Computing
- Control Planes
- AI Agents
- Pricing
- Startups
- Database
- Developer Experience

### Guest LinkedIn URLs
- Format: `https://www.linkedin.com/in/username/`
- Include trailing slash

### Date Format
- Always use ISO format: `YYYY-MM-DD`
- Example: `"2025-11-22"`

---

## File Locations

| File | Purpose |
|------|---------|
| `data/episodes.ts` | Episode data - ADD NEW EPISODES HERE |
| `data/hosts.ts` | Host information |
| `app/page.tsx` | Homepage (shows latest episode) |
| `app/episodes/page.tsx` | Episodes archive page |
| `out/` | Built files for deployment |

---

## Deployment Credentials

- **FTP Host:** 191.101.13.61
- **FTP Username:** u951885034
- **FTP Password:** Ask user
- **Remote Path:** /domains/agentic-saas-talks.com/public_html

---

## Common Issues

### Build Fails
```bash
rm -rf .next out
npm run build
```

### Timestamps Not Linking
- Check format is `HH:MM` or `H:MM:SS`
- No leading zeros needed for hours

### Guest Info Not Showing
- Verify `guests` array is inside the episode object
- Check LinkedIn URL format

### Thumbnail Wrong
- YouTube needs custom thumbnail uploaded
- Uses `maxresdefault.jpg` from YouTube

---

## Quick Commands

```bash
# Development
npm run dev              # Start local server
npm run build            # Build for production
npm run lint             # Check for errors

# Testing
npx playwright test      # Run all tests

# Deployment
# Use lftp command above with correct password
```

---

## Repository

- **GitHub:** https://github.com/boisedude/agentic-saas-talks
- **Live Site:** https://agentic-saas-talks.com
- **YouTube Playlist:** https://youtube.com/playlist?list=PLT2Zisspnj0fsEqkag0AtmPnw3mRfF3j_
