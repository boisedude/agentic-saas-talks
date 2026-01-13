# Changelog

All notable changes to the Agentic SaaS Talks website are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.5.0] - 2025-01-12

### Added - New Episodes
- **Episode 20**: The Agentic SaaS Executive Summit - Live Event (Dec 2, 2025)
  - 105 min live summit with two panel discussions
  - Guests: Shriram Sridharan (Rox), Guy Korland (FalkorDB), Mihir Pandya (Scale AI), Peter Farkas & Peter Zaitsev (Percona)
- **Episode 21**: From Open-Source to SaaS with Head of Engineering at Onehouse (Oct 10, 2025)
  - Guest: Varun Madan (Onehouse)
  - Covers Apache Hudi, data lakehouses, and building SaaS from open source
- **Episode 22**: Taming AI Complexity with Head of Engineering at Anyscale (Oct 8, 2025)
  - Guest: Jaikumar Ganesha (Anyscale)
  - Covers Ray framework, AI infrastructure, and ML at scale
- **Episode 23**: Revolutionizing AI SaaS: Control Plane Innovation with Anyscale (Aug 20, 2025)
  - Covers control plane architecture and SaaS evolution

### Fixed - SEO Improvements
- **Unique page titles** for /episodes, /hosts, /blog (previously all shared same title)
- **Unique meta descriptions** per page for better search snippets
- **Canonical URLs** now correctly point to each page (were all pointing to `/`)
- **Episode ordering** now sorted by date descending (was showing inconsistent order)
- **Blog 403 error** fixed by reordering .htaccess rules

### Technical
- Added `layout.tsx` files for episodes, hosts, and blog routes with proper metadata
- Episodes page now sorts by date instead of array order
- Updated .htaccess to handle routes before directory check

### Documentation
- Updated CHANGELOG.md with v1.5.0 changes
- Updated DEPLOYMENT-STATUS.md with latest deployment info

---

## [1.3.1] - 2025-11-12

### Documentation - Major Cleanup and Consolidation
- **Consolidated deployment docs** into single comprehensive DEPLOYMENT.md
  - Merged DEPLOYMENT_GUIDE.md, DEPLOYMENT_READY.md, DEPLOYMENT_STATUS.md, DEPLOYMENT_SUMMARY.txt, and original DEPLOYMENT.md
  - Created single source of truth for all deployment procedures
  - Includes quick start, manual steps, troubleshooting, and deployment history
- **Consolidated test docs** into single comprehensive TESTING.md
  - Merged PLAYWRIGHT_TEST_REPORT.md, PLAYWRIGHT_COMPREHENSIVE_TEST_REPORT.md, TEST_SUMMARY.md, TEST_FIXES_GUIDE.md, TEST_EXECUTION_SUMMARY.md, TEST_REPORTS_INDEX.md, and TEST_RESULTS_VISUAL.txt
  - Comprehensive testing guide with all results, fixes, and procedures
  - Includes test categories, performance metrics, and CI/CD setup
- **Consolidated SEO docs** into single comprehensive SEO.md
  - Merged SEO_OPTIMIZATION_REPORT.md, SEO_CHANGES_SUMMARY.md, and SEO_CHECKLIST.md
  - Complete SEO reference with implementation details and maintenance guide
  - Includes schema documentation, keyword strategy, and monitoring tools
- **Updated README.md** to reference new consolidated documentation
- **Updated CHANGELOG.md** with documentation changes
- **Removed redundant files** (will be deleted after review)
  - 5 duplicate deployment files
  - 7 duplicate test files
  - 3 duplicate SEO files

### Benefits of Consolidation
- Easier navigation - single file per topic instead of 15+ scattered docs
- No duplicate or conflicting information
- Clearer documentation structure
- Faster onboarding for new developers
- Single source of truth for each domain

---

## [1.3.0] - 2025-11-10

### Added - Hosts Page & Guest Support
- **New /hosts page** featuring all 5 hosts with LinkedIn profiles and bios
- **Guest interface** in episodes.ts for featuring special guests on episodes
- **Hosts navigation link** added to desktop and mobile navigation
- **Host data file** (`data/hosts.ts`) with Host interface and all host information
- Support for displaying episode guests with LinkedIn profiles

### Changed - Design Updates
- **Color scheme update** from purple to grey/blue (slate) throughout the site
  - Updated gradients from `purple` to `blue-500/slate-500` combinations
  - Modified hero sections, badges, and accent colors
  - Updated CSS variables in globals.css
- **Episodes Archive redesign** with featured YouTube thumbnails
  - Larger, more prominent video thumbnails using maxresdefault quality
  - Improved card layout with better image-to-content ratio
  - Enhanced hover effects on episode cards

### Documentation
- Created comprehensive CHANGELOG.md (this file)
- Updated README.md with:
  - New hosts page documentation
  - Guest support documentation
  - Updated color scheme information
  - Enhanced route structure documentation
  - Updated project structure with hosts directory
- Updated all documentation to reflect new features

---

## [1.2.0] - 2025-11-07

### Added - SEO Optimization
- **25+ JSON-LD schemas** across the site for rich search results
  - Organization schema
  - WebSite schema with search action
  - VideoSeries schema
  - Individual VideoObject schemas for all episodes
  - BreadcrumbList schemas
  - ItemList schema for episodes
  - WebPage schemas for all pages
- **lib/seo.ts** - SEO utility library with schema generators
- **public/sitemap.xml** - Complete sitemap with video metadata extensions
- **public/robots.txt** - Search engine directives
- Enhanced metadata in app/layout.tsx with Open Graph and Twitter Cards
- Google verification placeholder in meta tags

### Improved
- Episode page with structured data for all 17 episodes
- Homepage with video series and latest episode schemas
- Meta descriptions optimized for search engines
- Added 18 relevant keywords across pages
- Canonical URLs on all pages

### Documentation
- Created SEO_OPTIMIZATION_REPORT.md with comprehensive SEO details
- Created SEO_CHANGES_SUMMARY.md for quick reference
- Created SEO_CHECKLIST.md for validation

---

## [1.1.0] - 2025-11-07

### Added - UX Enhancements
- **Image loading states** with skeleton loaders
  - New ImageWithLoading component
  - Smooth fade-in transitions
  - Eliminates layout shifts
  - Error handling with fallback UI
- **Scroll-to-top button** for long pages
  - Appears after 400px scroll
  - Smooth scroll animation
  - Fixed position bottom-right
- **Mobile navigation menu** with hamburger icon
  - Slide-in panel with backdrop
  - Active page highlighting
  - Keyboard accessible (Escape to close)
- **Enhanced button interactions**
  - Hover: Subtle grow effect (scale 1.02)
  - Active: Press-down effect (scale 0.98)
  - Enhanced focus rings for accessibility
- **Active navigation states**
  - Desktop: Gradient underline on active page
  - Mobile: Gradient background + left border
  - Automatic pathname detection
- **Enhanced timestamp links**
  - Rich hover effects with background highlighting
  - External link icon animations
  - Better touch targets for mobile
- **Card hover effects**
  - Cards lift on hover with translate animations
  - Colored shadow glows
  - Smooth 300ms transitions

### Components Added
- `/components/ui/skeleton.tsx` - Loading skeleton component
- `/components/image-with-loading.tsx` - Image wrapper with loading states
- `/components/scroll-to-top.tsx` - Scroll-to-top FAB
- `/components/mobile-nav.tsx` - Mobile navigation menu
- `/components/nav-link.tsx` - Active state navigation link
- `/components/ui/sheet.tsx` - Slide-out panel (for mobile menu)

### Modified
- `/app/page.tsx` - Integrated ImageWithLoading component
- `/app/episodes/page.tsx` - Added scroll-to-top and enhanced timestamps
- `/components/navigation.tsx` - Split desktop/mobile navigation
- `/components/ui/button.tsx` - Enhanced transitions and effects
- `/app/globals.css` - Global accessibility and scrollbar styles

### Testing
- **50+ automated Playwright tests** - All passing
- Desktop viewport (1280x720) validation
- Mobile viewport (375x667) validation
- Screenshots captured for all features

### Documentation
- Created UX_IMPROVEMENTS_SUMMARY.md with detailed UX documentation
- Created PLAYWRIGHT_TEST_REPORT.md with test results

---

## [1.0.0] - 2025-11-07

### Initial Release - Deployment Ready

#### Features
- **Next.js 15 App Router** with static export
- **17 Episodes** - Complete archive of Agentic SaaS Talks
- **Interactive timestamps** on Episode 17 (10 clickable timestamps)
- **YouTube integration** with embedded video thumbnails
- **Responsive design** optimized for desktop and mobile
- **Modern UI** with Tailwind CSS and shadcn/ui components
- **Glassmorphism design** with gradient overlays
- **Animations** using Framer Motion

#### Pages
- `/` - Homepage with hero and featured episode
- `/episodes` - Complete episode archive

#### Components
- Navigation with logo and links
- Footer with copyright and links
- Episode cards with metadata
- Button components with variants
- Badge components for tags
- Card components for content
- Separator for visual division

#### Data Structure
- `data/episodes.ts` - Episode data with TypeScript interfaces
- Episode interface with id, title, description, date, videoUrl, duration, tags
- Timestamp interface for video chapters

#### Deployment
- Created deploy.sh for automated deployment to Hostinger
- Created deploy-fast.sh for quick deployments
- FTP deployment to agentic-saas-talks.com
- Static export configuration in next.config.ts

#### Documentation
- README.md - Project overview
- DEPLOYMENT_GUIDE.md - Step-by-step deployment instructions
- DEPLOYMENT_READY.md - Pre-deployment checklist
- DEPLOYMENT_STATUS.md - Live deployment status

#### Technical Stack
- **Framework**: Next.js 15.0.3
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.4.1
- **Components**: shadcn/ui
- **Animations**: Framer Motion 11.11.17
- **Icons**: Lucide React 0.462.0
- **Build**: Static Site Generation (SSG)

---

## Version History Summary

- **v1.5.0** (Jan 12, 2026) - Added 4 missing episodes, SEO fixes (unique titles, canonicals, sorting)
- **v1.3.1** (Nov 12, 2025) - Documentation cleanup and consolidation
- **v1.3.0** (Nov 10, 2025) - Hosts page, guest support, color scheme update, episode archive redesign
- **v1.2.0** (Nov 7, 2025) - SEO optimization with 25+ schemas, sitemap, robots.txt
- **v1.1.0** (Nov 7, 2025) - UX enhancements, mobile menu, loading states, accessibility
- **v1.0.0** (Nov 7, 2025) - Initial release with 17 episodes, deployment ready

---

## Future Roadmap

### Planned Features
- [ ] Individual episode detail pages (e.g., /episodes/17)
- [ ] Search functionality for episodes
- [ ] Filter episodes by tags/categories
- [ ] Episode transcripts
- [ ] Comments section or discussion forum
- [ ] Newsletter subscription
- [ ] RSS feed for episodes
- [ ] Related episodes recommendations
- [ ] Guest profile pages
- [ ] Dark mode toggle

### Under Consideration
- [ ] Video player embedded directly on site
- [ ] Podcast audio versions
- [ ] Episode bookmarking
- [ ] User accounts and profiles
- [ ] Analytics dashboard
- [ ] Social sharing enhancements
- [ ] Multi-language support

---

## Contributing

This is a private project for the Agentic SaaS Talks webcast series. For content updates or suggestions, please contact the Omnistrate team.

---

## Deployment Notes

### How to Deploy After Updates

After making any changes documented in this changelog:

1. Test locally: `npm run dev`
2. Build: `npm run build`
3. Deploy: `./deploy.sh`
4. Verify: Visit https://agentic-saas-talks.com

### Rollback Procedure

If you need to rollback to a previous version:

1. Check out the previous commit: `git checkout <commit-hash>`
2. Rebuild: `npm run build`
3. Deploy: `./deploy.sh`

---

**Last Updated**: January 12, 2026
**Current Version**: 1.5.0
**Status**: Live in Production
