# Agentic SaaS Talks Website

A modern, standalone website for the "Agentic SaaS Talks" YouTube webcast series. Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## 🚀 Quick Deploy

Deploy to Hostinger in one command:

```bash
./deploy.sh
```

Your site will be live at **https://agentic-saas-talks.com**

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

---

## 🎯 Features

- **Modern Design**: Sleek grey/blue (slate) color scheme with glassmorphism backgrounds, gradient overlays, and smooth animations
- **Full Episode Archive**: Every Agentic SaaS Talks episode with featured YouTube thumbnails, individually crawlable detail pages, and clickable timestamps
- **Auto-generated taxonomy**: `/topics/<tag>`, `/guests/<name>`, and `/hosts/<name>` pages are derived from the episode/host data — no manual maintenance
- **Search**: Combined episode + article keyword search at `/search`
- **Hosts & Guests**: Host profiles with areas of expertise; guest profiles linking the episodes they appeared in
- **Blog**: Markdown-driven blog with related-posts linking
- **Responsive Design**: Mobile-first approach with hamburger navigation menu
- **SEO + GEO Optimized**: Meta/OG/Twitter tags, rich Schema.org JSON-LD (incl. per-episode FAQ), image sitemap, `llms.txt`, and AI-crawler-friendly `robots.txt` — see [SEO / GEO Architecture in CLAUDE.md](CLAUDE.md#seo--geo-architecture)
- **Accessibility**: ARIA labels, keyboard navigation, and WCAG 2.1 AA compliant
- **Performance**: Static site generation for fast page loads
- **UX Enhanced**: Image loading states, scroll-to-top button, enhanced hover effects, and active navigation states

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router with Static Export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Deployment**: Hostinger SSH/rsync, fronted by Cloudflare

---

## 📁 Project Structure

```
agentic-saas-talks/
├── app/
│   ├── layout.tsx              # Root layout (metadata, CSP, analytics, nav, footer)
│   ├── page.tsx                # Homepage (hero, featured episode, topics, FAQ)
│   ├── episodes/
│   │   ├── page.tsx            # Episodes archive (client search/filter)
│   │   └── [id]/page.tsx       # Episode detail (+ episode-detail-client.tsx)
│   ├── topics/                 # Topic index + /topics/[tag] (auto-generated)
│   ├── guests/                 # Guest index + /guests/[slug] (auto-generated)
│   ├── hosts/                  # Hosts page + /hosts/[slug] profiles
│   ├── blog/                   # Blog listing + /blog/[slug] posts
│   ├── search/                 # Combined episode+article search (noindex)
│   ├── sitemap.ts              # XML sitemap (+ image entries)
│   ├── robots.ts               # robots.txt (allows AI crawlers)
│   ├── llms.txt/route.ts       # llms.txt for AI engines
│   ├── feed.xml/route.ts       # RSS feed
│   └── globals.css             # Global styles (slate/blue scheme)
├── components/
│   ├── ui/                     # shadcn/ui components (button, card, badge, …)
│   ├── navigation.tsx          # Desktop nav  (+ mobile-nav.tsx, nav-link.tsx)
│   ├── footer.tsx              # Site footer
│   ├── episode-grid.tsx        # Shared static episode-card grid
│   ├── breadcrumb.tsx          # Breadcrumb nav
│   └── image-with-loading.tsx  # Images with loading states
├── data/
│   ├── episodes.ts             # Episode data + Episode/Guest/Timestamp types
│   └── hosts.ts                # Host data (+ expertise[])
├── lib/
│   ├── constants.ts            # Site config + EPISODE_COUNT (derived)
│   ├── seo.ts                  # Schema.org JSON-LD generators
│   ├── helpers.ts              # Dates, slugify, taxonomy + related-episode lookups
│   ├── blog.ts                 # Markdown blog loading + related posts
│   └── utils.ts                # cn() and misc utilities
├── content/blog/               # Markdown blog posts
├── tests/                      # Playwright E2E specs
├── test-server.js              # Zero-dep static server for the E2E harness
├── playwright.config.ts        # E2E config (serves out/ on :3000 + :3001)
├── deploy.sh                   # Build + rsync + IndexNow + Cloudflare purge
├── CLAUDE.md                   # Agent guide (start here)
├── DEPLOYMENT.md / TESTING.md / SEO.md   # Detailed guides
└── package.json
```

---

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- SSH access to Hostinger (for deployment)

### Installation

```bash
# Navigate to project directory
cd /home/mcoop/projects/agentic-saas-talks

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create production build (static export)
npm run build

# Test production build locally
npm start
```

---

## 🌐 Deployment

### Quick Deployment (Recommended)

```bash
./deploy.sh
```

This script:
1. Builds your Next.js site
2. Creates static HTML/CSS/JS files in `/out`
3. Uploads to Hostinger via SSH/rsync
4. Makes site live at agentic-saas-talks.com

### Fast Deployment (No Build)

```bash
./deploy.sh --skip-build
```

Use this when you haven't changed any code and just want to re-upload existing build.

### Preview Deployment (Dry Run)

```bash
./deploy.sh --dry
```

Preview what files would be uploaded without making any changes.

### Manual Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for step-by-step manual deployment instructions.

---

## 📝 Content Management

### Episode Data

All episodes are stored in `/data/episodes.ts` with this structure:

```typescript
interface Episode {
  id: number
  title: string
  description: string
  date: string              // ISO format: "YYYY-MM-DD"
  videoUrl: string          // Full YouTube URL
  duration: string          // e.g., "57 min"
  tags: string[]
  timestamps?: Timestamp[]  // Optional timestamps
  guests?: Guest[]          // Optional special guests
}

interface Timestamp {
  time: string              // Format: "mm:ss" or "hh:mm:ss"
  title: string
}

interface Guest {
  name: string
  linkedIn: string
  bio: string
  photo?: string
}
```

### Host Data

All hosts are stored in `/data/hosts.ts` with this structure:

```typescript
interface Host {
  name: string
  linkedIn: string
  bio: string
  photo?: string
  role?: string             // e.g., "Co-Host"
  company?: string
  companyUrl?: string
  expertise?: string[]      // surfaced as schema.org knowsAbout
}
```

### Adding a New Episode

1. Edit `data/episodes.ts`
2. Add new episode at beginning of array
3. Optionally add guests array for special guests
4. Run `./deploy.sh`

> Topic and guest pages, the episode count, sitemap, and `llms.txt` all regenerate
> automatically from the data on build — nothing else to touch. For the full workflow
> (fetching episode details from YouTube, validation, deploy), see **[CLAUDE.md](CLAUDE.md)**.

Example:
```typescript
{
  id: 18,
  title: "Your New Episode",
  description: "Description...",
  date: "2025-02-01",
  videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID",
  duration: "60 min",
  tags: ["Tag1", "Tag2"],
  timestamps: [
    { time: "00:00", title: "Introduction" },
    { time: "05:30", title: "Main Topic" },
  ],
  guests: [
    {
      name: "Guest Name",
      linkedIn: "https://www.linkedin.com/in/username/",
      bio: "Guest bio and expertise"
    }
  ]
}
```

### Adding/Updating Hosts

1. Edit `data/hosts.ts`
2. Update host information or add new host
3. Run `./deploy.sh`

---

## 🎨 UX Features

### Desktop Experience
- ✅ Smooth hover animations on cards and buttons
- ✅ Active navigation state highlighting
- ✅ Image loading states with skeleton loaders
- ✅ Enhanced button interactions (scale effects)
- ✅ Scroll-to-top button on long pages
- ✅ Rich timestamp hover effects

### Mobile Experience
- ✅ Responsive hamburger navigation menu
- ✅ Slide-in mobile menu with backdrop
- ✅ Active page highlighting in mobile menu
- ✅ Touch-friendly button sizes
- ✅ Vertical content stacking
- ✅ Mobile-optimized images

### Accessibility
- ✅ WCAG 2.1 AA compliant
- ✅ Keyboard navigation support
- ✅ ARIA labels throughout
- ✅ Focus indicators for all interactive elements
- ✅ Semantic HTML structure
- ✅ Screen reader friendly

---

## 🧪 Testing

```bash
npm run test:unit        # Vitest unit tests
npm run test:e2e         # Playwright E2E (chromium / mobile / tablet)
```

**Run E2E via `npm run test:e2e`, not bare `npx playwright test`.** The suite runs against the
**static export** (`out/`), served by `test-server.js` on `:3000` (most suites) and `:3001`
(the Apache/.htaccess routing suite). `npm run test:e2e` builds `out/` first. Running against
the dev server produces false failures (dev-only CSP/eval console errors + an HMR socket that
keeps `networkidle` from settling). See [TESTING.md](TESTING.md) and the testing notes in
[CLAUDE.md](CLAUDE.md).

---

## 📊 Performance

### Build Output
```
Route (app)                              Size      First Load JS
┌ ○ /                                    6.91 kB   156 kB
├ ○ /_not-found                          993 B     103 kB
└ ○ /episodes                            6.6 kB    153 kB
+ First Load JS shared by all            102 kB
```

- ✅ Static site generation (SSG)
- ✅ Lazy loading images
- ✅ Optimized YouTube thumbnails
- ✅ Fast page loads

---

## 🔧 Customization

### Update Color Scheme

The site uses a **slate/blue color scheme** (changed from the original purple). Colors are defined in `app/globals.css`:

```css
:root {
  --primary: 240 5.9% 10%;      # Slate primary
  --secondary: 240 4.8% 95.9%;   # Light slate secondary
  /* ... other CSS variables ... */
}
```

Gradient colors throughout the site use:
- `from-blue-500` to `to-slate-500` or `to-slate-600`
- These are applied in component files (page.tsx, hosts/page.tsx, etc.)

To change the color scheme:
1. Update CSS variables in `app/globals.css`
2. Search and replace gradient color classes across components
3. Update badge backgrounds and accent colors

### Modify Components

All UI components in `components/ui/` can be customized using Tailwind classes.

### Change Layout

Edit `app/layout.tsx` to modify site structure or navigation.

### Update Route Structure

Current routes:
- `/` - Homepage
- `/episodes` - Episodes archive; `/episodes/[id]` - episode detail
- `/topics` + `/topics/[tag]` - topic archives (auto-generated from tags)
- `/guests` + `/guests/[slug]` - guest profiles (auto-generated)
- `/hosts` + `/hosts/[slug]` - hosts page + profiles
- `/blog` + `/blog/[slug]` - blog
- `/search` - combined search

To add new routes, create folders under `app/` with a `page.tsx` file.

---

## 📞 Support

- **Domain**: https://agentic-saas-talks.com
- **YouTube Channel**: [@omnistrate](https://www.youtube.com/@omnistrate)
- **Hosting**: Hostinger

---

## 📄 Documentation

- **README.md** - This file - project overview and quick start
- **CLAUDE.md** - Agent guide: adding episodes, file map, SEO/GEO architecture, testing
- **CHANGELOG.md** - Version history and recent changes
- **DEPLOYMENT.md** - Complete deployment guide
- **TESTING.md** - Testing documentation
- **SEO.md** - SEO optimization details and maintenance
- **PROJECT_SUMMARY.md** - Complete project summary
- **UX_IMPROVEMENTS_SUMMARY.md** - UX enhancements details

---

## ✅ Production Ready

**Build Status**: ✅ SUCCESS
**Test Status**: ✅ ALL PASSING (50+ tests)
**Deployment**: ✅ READY

The site is fully built, tested, and ready to deploy to:
- **Domain**: agentic-saas-talks.com
- **Hosting**: Hostinger SSH

---

## 🎯 Quick Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Test production build

# Deployment
./deploy.sh              # Build and deploy to Hostinger
./deploy.sh --skip-build # Quick deploy (no build)
./deploy.sh --dry        # Preview changes (no deploy)

# Testing
npm run test:unit        # Vitest unit tests
npm run test:e2e         # Playwright E2E against the static export

# Code Quality
npm run lint             # Check for errors
```

---

## 🚀 Deploy Now

Ready to deploy? Just run:

```bash
./deploy.sh
```

Your site will be live at **https://agentic-saas-talks.com** in about 2-3 minutes!

---

**Built with ❤️ using Next.js, TypeScript, Tailwind CSS, shadcn/ui, and validated with Playwright**
