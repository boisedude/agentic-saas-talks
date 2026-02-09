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
- **17 Episodes**: Complete archive of all Agentic SaaS Talks episodes with featured YouTube thumbnails
- **Interactive Timestamps**: Episode 17 includes 10 clickable timestamps that link to specific YouTube video times
- **Hosts Page**: Dedicated page featuring all 5 hosts with LinkedIn profiles and bios
- **Guest Support**: Episodes can feature special guests with their LinkedIn profiles and information
- **Responsive Design**: Mobile-first approach with hamburger navigation menu
- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, and Schema.org structured data (25+ JSON-LD schemas)
- **Accessibility**: ARIA labels, keyboard navigation, and WCAG 2.1 AA compliant
- **Performance**: Static site generation for fast page loads
- **UX Enhanced**: Image loading states, scroll-to-top button, enhanced hover effects, and active navigation states

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router with Static Export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Hostinger SSH/rsync

---

## 📁 Project Structure

```
agentic-saas-talks/
├── app/
│   ├── layout.tsx              # Root layout with navigation and footer
│   ├── page.tsx                # Homepage with hero and featured episode
│   ├── episodes/
│   │   └── page.tsx            # All episodes archive page with YouTube thumbnails
│   ├── hosts/
│   │   └── page.tsx            # Hosts page featuring all 5 hosts
│   └── globals.css             # Global styles with slate/blue color scheme
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx          # Enhanced with scale animations
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── separator.tsx
│   │   ├── skeleton.tsx        # Loading states
│   │   └── sheet.tsx           # Mobile menu panel
│   ├── navigation.tsx          # Desktop/mobile navigation with Hosts link
│   ├── mobile-nav.tsx          # Mobile hamburger menu
│   ├── nav-link.tsx            # Active state navigation link
│   ├── footer.tsx              # Site footer
│   ├── scroll-to-top.tsx       # Floating scroll button
│   └── image-with-loading.tsx  # Images with loading states
├── data/
│   ├── episodes.ts             # All 17 episodes with metadata and Guest interface
│   └── hosts.ts                # All 5 hosts with LinkedIn and bio info
├── lib/
│   ├── utils.ts                # Utility functions
│   └── seo.ts                  # SEO schema generators (25+ schemas)
├── public/
│   ├── logo.jpg                # Channel logo
│   ├── sitemap.xml             # Complete sitemap with video metadata
│   └── robots.txt              # Search engine directives
├── deploy.sh                   # SSH/rsync deployment script
├── README.md                   # This file
├── CHANGELOG.md                # Version history and recent changes
├── DEPLOYMENT_GUIDE.md         # Detailed deployment instructions
├── DEPLOYMENT_READY.md         # Pre-deployment checklist
├── DEPLOYMENT_STATUS.md        # Current deployment status
├── PLAYWRIGHT_TEST_REPORT.md   # Test results (50+ validations)
├── UX_IMPROVEMENTS_SUMMARY.md  # UX enhancements documentation
├── SEO_OPTIMIZATION_REPORT.md  # SEO implementation details
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
}
```

### Adding a New Episode

1. Edit `data/episodes.ts`
2. Add new episode at beginning of array
3. Optionally add guests array for special guests
4. Run `./deploy.sh`

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

Comprehensive Playwright testing has been performed:

- ✅ **50+ automated tests** - All passing
- ✅ **Desktop viewport** (1280x720) - Fully functional
- ✅ **Mobile viewport** (375x667) - Fully responsive
- ✅ **All 17 episodes** displaying correctly
- ✅ **Timestamp conversion** working (mm:ss → seconds)
- ✅ **Navigation** working on both desktop and mobile
- ✅ **Hover effects** animating smoothly

See [PLAYWRIGHT_TEST_REPORT.md](PLAYWRIGHT_TEST_REPORT.md) for full test results.

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
- `/episodes` - All episodes archive
- `/hosts` - Meet the hosts page

To add new routes, create folders under `app/` with a `page.tsx` file.

---

## 📞 Support

- **Domain**: https://agentic-saas-talks.com
- **YouTube Channel**: [@omnistrate](https://www.youtube.com/@omnistrate)
- **Hosting**: Hostinger

---

## 📄 Documentation

- **README.md** - This file - project overview and quick start
- **CHANGELOG.md** - Version history and recent changes
- **DEPLOYMENT.md** - Complete deployment guide
- **TESTING.md** - Comprehensive testing documentation
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
