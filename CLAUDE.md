# Agent Guide: Agentic SaaS Talks Website

Comprehensive reference for AI agents working on this Next.js website. All paths are relative to the project root.

---

## Adding a New Episode

### Step 1: Get Episode Info from YouTube

**Preferred (browser-free):**

```bash
npm run episodes:check       # or: npx tsx scripts/find-new-episodes.ts
```

`scripts/find-new-episodes.ts` lists the playlist via its **RSS feed**, diffs it against `data/episodes.ts`, and for every video not yet on the site fetches the watch page and extracts full details (title, duration, publish date, description, parsed timestamps) from the embedded `ytInitialPlayerResponse` JSON. It prints ready-to-paste `Episode` skeletons with the next available IDs and the raw description (use it to write the summary, pick tags, and identify guests). Run with `--all` to dump details for every video in the feed, not just new ones. Uses only Node's global `fetch` — no Chromium needed.

This does **not** capture guest LinkedIn URLs — find/verify those manually (a wrong URL is worse than none; omit a guest rather than guess). Remember the recurring **hosts** (in `data/hosts.ts`: Kamal Gupta, Michael Cooper, Bill Tarr, Markus Kaiser, Ermin Dzinic) are **not** guests — only list external panelists.

**Caveat:** the RSS feed only returns the latest ~15 videos. That's plenty for routine "what's new" checks, but to backfill older videos pass `--all` or fall back to the Playwright scripts below.

**Legacy (Playwright — flaky):** `scripts/scrape-playlist.ts`, `scripts/scrape-videos.ts`, `scripts/scrape-full-episodes.ts`. These depend on a Chromium download (`npx playwright install chromium`) that stalls in some environments; prefer the RSS script above. If you do use them and a new video isn't in the playlist yet, add its URL directly to `scripts/scrape-videos.ts`.

### Step 2: Validate Current Data

```bash
npm run episodes:validate    # or: npx tsx scripts/validate-episodes.ts
```

This shows the current highest ID and next available ID.

### Step 3: Add Episode to Data File

Edit `data/episodes.ts`

Add new episode at the **TOP** of the `episodes` array (newest first):

```typescript
{
  id: 25,  // Use next available ID from validation script
  title: "Episode Title Here",
  description: "2-3 sentence description of what the episode covers.",
  date: "2025-11-22",  // Format: YYYY-MM-DD
  videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID",
  duration: "60 min",  // Format: "X min"
  tags: ["AI Architecture", "SaaS", "Tag3"],
  timestamps: [  // Optional — include if available from YouTube description
    { time: "00:00", title: "Introduction" },
    { time: "05:30", title: "Topic 1" },
    { time: "15:00", title: "Topic 2" },
  ],
  guests: [  // Optional — only if episode has external guests (not hosts)
    {
      name: "Guest Name",
      linkedIn: "https://www.linkedin.com/in/username/",
      bio: "Brief bio (1-2 sentences)"
    }
  ]
}
```

### Step 4: Validate and Build

```bash
npx tsx scripts/validate-episodes.ts && npm run build
```

Verify both pass with no errors.

### Step 5: Test (Optional)

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

### Step 6: Deploy to Hostinger

```bash
./deploy.sh              # Build and deploy via SSH/rsync
./deploy.sh --skip-build # Deploy existing build without rebuilding
./deploy.sh --dry        # Preview what would be uploaded (no changes)
```

Or use npm scripts:
```bash
npm run deploy           # Build and deploy
npm run deploy:skip-build
npm run deploy:dry
```

### Step 7: Verify Deployment

Check https://agentic-saas-talks.com:
- Homepage shows new episode
- /episodes page lists new episode
- Timestamps link to YouTube at correct times

---

## Data Format Reference

### Episode ID
- Always use the next available ID (run `npx tsx scripts/validate-episodes.ts` to check)
- IDs are not sequential by date — they increment globally

### Date Format
- Always use ISO format: `YYYY-MM-DD`

### Duration Format
- Always use: `"X min"` (e.g., `"56 min"`)

### Timestamps Format
- Use `MM:SS` or `H:MM:SS` format
- Example: `"1:05:30"` for 1 hour 5 minutes 30 seconds
- Example: `"05:30"` for 5 minutes 30 seconds

### Tags
Common tags used in this project:
- AI Architecture, SaaS, Cloud Computing, Control Planes, AI Agents
- Pricing, Startups, Database, Developer Experience
- Agentic AI, Open Source, Data Streaming, Year in Review

### Guest LinkedIn URLs
- Format: `https://www.linkedin.com/in/username/`
- Always include trailing slash

---

## File Locations

| File | Purpose |
|------|---------|
| **Data** | |
| `data/episodes.ts` | Episode data — **ADD NEW EPISODES HERE** |
| `data/hosts.ts` | Host information (names, bios, photos, LinkedIn, company) |
| **Pages** | |
| `app/page.tsx` | Homepage (shows latest episode, hero, topics) |
| `app/episodes/page.tsx` | Episodes archive with search/filter |
| `app/hosts/page.tsx` | Hosts page with photos and bios |
| `app/blog/page.tsx` | Blog listing page |
| `app/blog/[slug]/page.tsx` | Individual blog post page |
| `app/layout.tsx` | Root layout (metadata, fonts, nav, footer) |
| **Components** | |
| `components/navbar.tsx` | Navigation bar |
| `components/footer.tsx` | Site footer |
| `components/ui/` | Reusable UI components (button, card, badge, etc.) |
| **Config & Utilities** | |
| `lib/constants.ts` | Site URL, external links, nav links, animation config |
| `lib/seo.ts` | Schema.org structured data generators (Video, Podcast, Person, FAQ, etc.) |
| `lib/helpers.ts` | Utility functions (date formatting, YouTube ID extraction) |
| `lib/blog.ts` | Blog post loading from markdown files |
| **Scripts** | |
| `scripts/find-new-episodes.ts` | **Preferred** — RSS-based: diff playlist vs data, dump ready-to-paste details (no browser) |
| `scripts/scrape-playlist.ts` | Legacy (Playwright) — scrape playlist for all video URLs |
| `scripts/scrape-videos.ts` | Legacy (Playwright) — scrape individual videos for details |
| `scripts/scrape-full-episodes.ts` | Legacy (Playwright) — detailed scraping of specific video URLs |
| `scripts/validate-episodes.ts` | Validate episode data integrity |
| `deploy.sh` | SSH/rsync deployment script (--dry, --skip-build flags) |
| **Build Output** | |
| `out/` | Static export files for deployment |
| **Tests** | |
| `tests/` | Playwright E2E tests |

---

## Deployment

- **Method:** SSH/rsync via `deploy.sh`
- **SSH Host:** 191.101.13.61
- **SSH Port:** 65002
- **SSH User:** u951885034
- **SSH Key:** `~/.ssh/id_ed25519`
- **Remote Path:** `/home/u951885034/domains/agentic-saas-talks.com/public_html`

### Cloudflare (added 2026-06-15)

The site is fronted by Cloudflare (zone `ad15899b816fb724b67ab95c75c3891e`), matching the other content zones: cache-everything rule (4h edge TTL), Smart Tiered Cache, and a User-Agent transform toward origin (Hostinger's shared-server WAF 403/429s crawler UAs — the transform bypasses it so GPTBot et al. reach the origin). Because of the 4h edge cache, **every deploy must purge the zone** — `deploy.sh` does this automatically in step [4/4] using `~/.cloudflare-token`. Manual purge:

```bash
CF_TOKEN=$(cat ~/.cloudflare-token)
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/ad15899b816fb724b67ab95c75c3891e/purge_cache" \
  -H "Authorization: Bearer $CF_TOKEN" -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

Cookieless Cloudflare Web Analytics beacon (`site_token: de98f84e9b2c4b4fac16c1ac9e29ee50`) is in `app/layout.tsx` alongside Google Analytics; both `static.cloudflareinsights.com` (script-src) and `cloudflareinsights.com` (connect-src) are allowlisted in the CSP there.

---

## Common Issues

### Build Fails
```bash
rm -rf .next out
npm run build
```

### Timestamps Not Linking
- Check format is `MM:SS` or `H:MM:SS`
- No leading zeros needed for hours

### Guest Info Not Showing
- Verify `guests` array is inside the episode object
- Check LinkedIn URL format has trailing slash

### Thumbnail Wrong
- YouTube needs custom thumbnail uploaded
- Uses `maxresdefault.jpg` from YouTube

---

## Quick Commands

```bash
# Episodes
npm run episodes:check      # Find new videos + dump ready-to-paste details (RSS, no browser)
npm run episodes:check -- --all   # Dump details for every video in the feed
npm run episodes:validate   # Validate episode data integrity

# Development
npm run dev              # Start local server at http://localhost:3000
npm run build            # Build static export for production
npm run lint             # Run ESLint

# Scraping (legacy Playwright fallback — prefer episodes:check)
npx tsx scripts/scrape-playlist.ts       # List all playlist videos
npx tsx scripts/scrape-videos.ts         # Scrape video details

# Testing
npx playwright test      # Run all E2E tests

# Deployment
npm run deploy           # Build + deploy via SSH/rsync
npm run deploy:skip-build # Deploy without rebuilding
npm run deploy:dry       # Preview (no changes)
```

---

## Tech Stack

- **Framework:** Next.js 16 (static export via `output: 'export'`)
- **React:** 19
- **CSS:** Tailwind CSS 4
- **Animation:** Framer Motion
- **UI Components:** Radix UI primitives + shadcn/ui pattern
- **Linting:** ESLint 9 with eslint-config-next
- **Testing:** Playwright
- **Deployment:** Static files via SSH/rsync to Hostinger

---

## Repository

- **GitHub:** https://github.com/boisedude/agentic-saas-talks
- **Live Site:** https://agentic-saas-talks.com
- **YouTube Playlist:** https://youtube.com/playlist?list=PLT2Zisspnj0fsEqkag0AtmPnw3mRfF3j_

<!-- NEXT-AGENTS-MD-START -->[Next.js Docs Index]|root: ./.next-docs|STOP. What you remember about Next.js is WRONG for this project. Always search docs and read before any task.|If docs missing, run this command first: npx @next/codemod agents-md --output CLAUDE.md|01-app:{04-glossary.mdx}|01-app/01-getting-started:{01-installation.mdx,02-project-structure.mdx,03-layouts-and-pages.mdx,04-linking-and-navigating.mdx,05-server-and-client-components.mdx,06-cache-components.mdx,07-fetching-data.mdx,08-updating-data.mdx,09-caching-and-revalidating.mdx,10-error-handling.mdx,11-css.mdx,12-images.mdx,13-fonts.mdx,14-metadata-and-og-images.mdx,15-route-handlers.mdx,16-proxy.mdx,17-deploying.mdx,18-upgrading.mdx}|01-app/02-guides:{analytics.mdx,authentication.mdx,backend-for-frontend.mdx,caching.mdx,ci-build-caching.mdx,content-security-policy.mdx,css-in-js.mdx,custom-server.mdx,data-security.mdx,debugging.mdx,draft-mode.mdx,environment-variables.mdx,forms.mdx,incremental-static-regeneration.mdx,instrumentation.mdx,internationalization.mdx,json-ld.mdx,lazy-loading.mdx,local-development.mdx,mcp.mdx,mdx.mdx,memory-usage.mdx,multi-tenant.mdx,multi-zones.mdx,open-telemetry.mdx,package-bundling.mdx,prefetching.mdx,production-checklist.mdx,progressive-web-apps.mdx,public-static-pages.mdx,redirecting.mdx,sass.mdx,scripts.mdx,self-hosting.mdx,single-page-applications.mdx,static-exports.mdx,tailwind-v3-css.mdx,third-party-libraries.mdx,videos.mdx}|01-app/02-guides/migrating:{app-router-migration.mdx,from-create-react-app.mdx,from-vite.mdx}|01-app/02-guides/testing:{cypress.mdx,jest.mdx,playwright.mdx,vitest.mdx}|01-app/02-guides/upgrading:{codemods.mdx,version-14.mdx,version-15.mdx,version-16.mdx}|01-app/03-api-reference:{07-edge.mdx,08-turbopack.mdx}|01-app/03-api-reference/01-directives:{use-cache-private.mdx,use-cache-remote.mdx,use-cache.mdx,use-client.mdx,use-server.mdx}|01-app/03-api-reference/02-components:{font.mdx,form.mdx,image.mdx,link.mdx,script.mdx}|01-app/03-api-reference/03-file-conventions/01-metadata:{app-icons.mdx,manifest.mdx,opengraph-image.mdx,robots.mdx,sitemap.mdx}|01-app/03-api-reference/03-file-conventions:{default.mdx,dynamic-routes.mdx,error.mdx,forbidden.mdx,instrumentation-client.mdx,instrumentation.mdx,intercepting-routes.mdx,layout.mdx,loading.mdx,mdx-components.mdx,not-found.mdx,page.mdx,parallel-routes.mdx,proxy.mdx,public-folder.mdx,route-groups.mdx,route-segment-config.mdx,route.mdx,src-folder.mdx,template.mdx,unauthorized.mdx}|01-app/03-api-reference/04-functions:{after.mdx,cacheLife.mdx,cacheTag.mdx,connection.mdx,cookies.mdx,draft-mode.mdx,fetch.mdx,forbidden.mdx,generate-image-metadata.mdx,generate-metadata.mdx,generate-sitemaps.mdx,generate-static-params.mdx,generate-viewport.mdx,headers.mdx,image-response.mdx,next-request.mdx,next-response.mdx,not-found.mdx,permanentRedirect.mdx,redirect.mdx,refresh.mdx,revalidatePath.mdx,revalidateTag.mdx,unauthorized.mdx,unstable_cache.mdx,unstable_noStore.mdx,unstable_rethrow.mdx,updateTag.mdx,use-link-status.mdx,use-params.mdx,use-pathname.mdx,use-report-web-vitals.mdx,use-router.mdx,use-search-params.mdx,use-selected-layout-segment.mdx,use-selected-layout-segments.mdx,userAgent.mdx}|01-app/03-api-reference/05-config/01-next-config-js:{adapterPath.mdx,allowedDevOrigins.mdx,appDir.mdx,assetPrefix.mdx,authInterrupts.mdx,basePath.mdx,browserDebugInfoInTerminal.mdx,cacheComponents.mdx,cacheHandlers.mdx,cacheLife.mdx,compress.mdx,crossOrigin.mdx,cssChunking.mdx,devIndicators.mdx,distDir.mdx,env.mdx,expireTime.mdx,exportPathMap.mdx,generateBuildId.mdx,generateEtags.mdx,headers.mdx,htmlLimitedBots.mdx,httpAgentOptions.mdx,images.mdx,incrementalCacheHandlerPath.mdx,inlineCss.mdx,isolatedDevBuild.mdx,logging.mdx,mdxRs.mdx,onDemandEntries.mdx,optimizePackageImports.mdx,output.mdx,pageExtensions.mdx,poweredByHeader.mdx,productionBrowserSourceMaps.mdx,proxyClientMaxBodySize.mdx,reactCompiler.mdx,reactMaxHeadersLength.mdx,reactStrictMode.mdx,redirects.mdx,rewrites.mdx,sassOptions.mdx,serverActions.mdx,serverComponentsHmrCache.mdx,serverExternalPackages.mdx,staleTimes.mdx,staticGeneration.mdx,taint.mdx,trailingSlash.mdx,transpilePackages.mdx,turbopack.mdx,turbopackFileSystemCache.mdx,typedRoutes.mdx,typescript.mdx,urlImports.mdx,useLightningcss.mdx,viewTransition.mdx,webVitalsAttribution.mdx,webpack.mdx}|01-app/03-api-reference/05-config:{02-typescript.mdx,03-eslint.mdx}|01-app/03-api-reference/06-cli:{create-next-app.mdx,next.mdx}|02-pages/01-getting-started:{01-installation.mdx,02-project-structure.mdx,04-images.mdx,05-fonts.mdx,06-css.mdx,11-deploying.mdx}|02-pages/02-guides:{analytics.mdx,authentication.mdx,babel.mdx,ci-build-caching.mdx,content-security-policy.mdx,css-in-js.mdx,custom-server.mdx,debugging.mdx,draft-mode.mdx,environment-variables.mdx,forms.mdx,incremental-static-regeneration.mdx,instrumentation.mdx,internationalization.mdx,lazy-loading.mdx,mdx.mdx,multi-zones.mdx,open-telemetry.mdx,package-bundling.mdx,post-css.mdx,preview-mode.mdx,production-checklist.mdx,redirecting.mdx,sass.mdx,scripts.mdx,self-hosting.mdx,static-exports.mdx,tailwind-v3-css.mdx,third-party-libraries.mdx}|02-pages/02-guides/migrating:{app-router-migration.mdx,from-create-react-app.mdx,from-vite.mdx}|02-pages/02-guides/testing:{cypress.mdx,jest.mdx,playwright.mdx,vitest.mdx}|02-pages/02-guides/upgrading:{codemods.mdx,version-10.mdx,version-11.mdx,version-12.mdx,version-13.mdx,version-14.mdx,version-9.mdx}|02-pages/03-building-your-application/01-routing:{01-pages-and-layouts.mdx,02-dynamic-routes.mdx,03-linking-and-navigating.mdx,05-custom-app.mdx,06-custom-document.mdx,07-api-routes.mdx,08-custom-error.mdx}|02-pages/03-building-your-application/02-rendering:{01-server-side-rendering.mdx,02-static-site-generation.mdx,04-automatic-static-optimization.mdx,05-client-side-rendering.mdx}|02-pages/03-building-your-application/03-data-fetching:{01-get-static-props.mdx,02-get-static-paths.mdx,03-forms-and-mutations.mdx,03-get-server-side-props.mdx,05-client-side.mdx}|02-pages/03-building-your-application/06-configuring:{12-error-handling.mdx}|02-pages/04-api-reference:{06-edge.mdx,08-turbopack.mdx}|02-pages/04-api-reference/01-components:{font.mdx,form.mdx,head.mdx,image-legacy.mdx,image.mdx,link.mdx,script.mdx}|02-pages/04-api-reference/02-file-conventions:{instrumentation.mdx,proxy.mdx,public-folder.mdx,src-folder.mdx}|02-pages/04-api-reference/03-functions:{get-initial-props.mdx,get-server-side-props.mdx,get-static-paths.mdx,get-static-props.mdx,next-request.mdx,next-response.mdx,use-params.mdx,use-report-web-vitals.mdx,use-router.mdx,use-search-params.mdx,userAgent.mdx}|02-pages/04-api-reference/04-config/01-next-config-js:{adapterPath.mdx,allowedDevOrigins.mdx,assetPrefix.mdx,basePath.mdx,bundlePagesRouterDependencies.mdx,compress.mdx,crossOrigin.mdx,devIndicators.mdx,distDir.mdx,env.mdx,exportPathMap.mdx,generateBuildId.mdx,generateEtags.mdx,headers.mdx,httpAgentOptions.mdx,images.mdx,isolatedDevBuild.mdx,onDemandEntries.mdx,optimizePackageImports.mdx,output.mdx,pageExtensions.mdx,poweredByHeader.mdx,productionBrowserSourceMaps.mdx,proxyClientMaxBodySize.mdx,reactStrictMode.mdx,redirects.mdx,rewrites.mdx,serverExternalPackages.mdx,trailingSlash.mdx,transpilePackages.mdx,turbopack.mdx,typescript.mdx,urlImports.mdx,useLightningcss.mdx,webVitalsAttribution.mdx,webpack.mdx}|02-pages/04-api-reference/04-config:{01-typescript.mdx,02-eslint.mdx}|02-pages/04-api-reference/05-cli:{create-next-app.mdx,next.mdx}|03-architecture:{accessibility.mdx,fast-refresh.mdx,nextjs-compiler.mdx,supported-browsers.mdx}|04-community:{01-contribution-guide.mdx,02-rspack.mdx}<!-- NEXT-AGENTS-MD-END -->
