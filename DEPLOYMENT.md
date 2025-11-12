# Deployment Guide - Agentic SaaS Talks

Complete deployment documentation for the Agentic SaaS Talks website.

**Current Version:** 1.3.0
**Status:** Live in Production
**URL:** https://agentic-saas-talks.com
**Last Updated:** November 10, 2025

---

## Quick Deploy

Deploy to Hostinger in one command:

```bash
cd /mnt/d/Projects/agentic-saas-talks
./deploy.sh
```

Your site will be live at **https://agentic-saas-talks.com** in 2-3 minutes.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Deployment Options](#deployment-options)
3. [Deployment Scripts](#deployment-scripts)
4. [Manual Deployment](#manual-deployment)
5. [Post-Deployment Configuration](#post-deployment-configuration)
6. [Verification Checklist](#verification-checklist)
7. [Troubleshooting](#troubleshooting)
8. [Content Updates](#content-updates)
9. [Deployment History](#deployment-history)

---

## Prerequisites

### Required Software

- Node.js 18+ installed
- npm or yarn package manager
- lftp (for automated FTP deployment)

### Install lftp

```bash
# Ubuntu/Debian/WSL
sudo apt-get update
sudo apt-get install lftp

# macOS
brew install lftp

# Verify installation
lftp --version
```

### FTP Credentials

The deployment uses these pre-configured credentials:
- **Host:** 191.101.13.61
- **Username:** u951885034
- **Password:** ..C00per..
- **Remote Directory:** /domains/agentic-saas-talks.com/public_html

---

## Deployment Options

### Option 1: Full Deployment (Recommended)

Uses `deploy.sh` to build and deploy:

```bash
./deploy.sh
```

**What it does:**
1. Builds Next.js site (static export)
2. Creates `/out` directory with static files
3. Uploads to Hostinger via FTP
4. Removes old files from server
5. Uses parallel uploads for speed

**When to use:**
- After code changes
- When adding new episodes
- For production deployments
- First-time deployment

**Time:** 2-3 minutes

### Option 2: Quick Deploy

Uses `deploy-fast.sh` to skip build step:

```bash
./deploy-fast.sh
```

**What it does:**
1. Skips build step
2. Uploads existing `/out` directory
3. Much faster deployment

**When to use:**
- When `/out` directory is already up-to-date
- For testing deployment process
- When only changed server-side files

**Time:** 30-60 seconds

**Warning:** Only use this if you haven't changed any code since last build.

---

## Deployment Scripts

### deploy.sh - Full Deployment

```bash
#!/bin/bash
# Main deployment script
# Location: /mnt/d/Projects/agentic-saas-talks/deploy.sh

# Features:
# - Builds Next.js site
# - Creates static export
# - Uploads via FTP
# - Removes old files (--delete)
# - Parallel uploads (--parallel=5)
```

**Configuration:**
- Project directory: `/mnt/d/Projects/agentic-saas-talks`
- Build command: `npm run build`
- Source: `/out` directory
- Destination: Hostinger FTP

### deploy-fast.sh - Quick Deployment

```bash
#!/bin/bash
# Quick deployment script
# Location: /mnt/d/Projects/agentic-saas-talks/deploy-fast.sh

# Features:
# - Skips build step
# - Uploads existing build
# - Faster execution
```

---

## Manual Deployment

If automated scripts don't work or you prefer manual control:

### Step 1: Build the Site

```bash
cd /mnt/d/Projects/agentic-saas-talks
npm run build
```

This creates the `/out` directory with static HTML, CSS, and JavaScript files.

### Step 2: Verify Build Output

```bash
ls -la out/
```

You should see:
- `index.html` (homepage)
- `episodes.html` (episodes page)
- `hosts.html` (hosts page)
- `404.html` (error page)
- `_next/` directory (assets)
- `logo.jpg` (channel logo)
- `sitemap.xml` (SEO sitemap)
- `robots.txt` (search engine directives)

### Step 3: Upload via FTP

**Using lftp (command line):**

```bash
lftp -u u951885034,..C00per.. 191.101.13.61 <<EOF
cd /domains/agentic-saas-talks.com/public_html
mirror --reverse --delete --verbose /mnt/d/Projects/agentic-saas-talks/out/ ./
quit
EOF
```

**Using FileZilla (GUI):**

1. Open FileZilla
2. Host: `191.101.13.61`
3. Username: `u951885034`
4. Password: `..C00per..`
5. Port: `21`
6. Navigate to: `/domains/agentic-saas-talks.com/public_html/`
7. Upload all files from `/out` directory

---

## Post-Deployment Configuration

### 1. SSL/HTTPS Setup

1. Log into Hostinger control panel
2. Go to SSL section
3. Enable SSL for `agentic-saas-talks.com`
4. Force HTTPS redirect

### 2. .htaccess Configuration

The `.htaccess` file should already be in place. It includes:

```apache
# .htaccess for Next.js static export
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Serve existing files
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d

  # Route /episodes to /episodes.html
  RewriteRule ^episodes$ /episodes.html [L]

  # Route /hosts to /hosts.html
  RewriteRule ^hosts$ /hosts.html [L]

  # Route / to /index.html
  RewriteRule ^$ /index.html [L]

  # 404 handling
  RewriteRule ^(.*)$ /404.html [L,NC]
</IfModule>

# MIME types
<IfModule mod_mime.c>
  AddType application/javascript .js
  AddType text/css .css
  AddType application/json .json
  AddType image/svg+xml .svg
  AddType font/woff2 .woff2
  AddType font/woff .woff
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### 3. Domain Configuration

Verify domain settings in Hostinger:
- Domain: `agentic-saas-talks.com`
- Document root: `/domains/agentic-saas-talks.com/public_html/`
- SSL certificate: Enabled
- Force HTTPS: Yes

---

## Verification Checklist

After deployment, verify all features are working:

### Homepage Checks
- [ ] Visit https://agentic-saas-talks.com
- [ ] Logo displays in navigation
- [ ] Hero section loads with slate/blue gradient
- [ ] Featured episode shows thumbnail
- [ ] "Watch Latest Episode" button works
- [ ] "View All Episodes" button navigates
- [ ] "Hosts" link visible in navigation

### Episodes Page Checks
- [ ] Visit https://agentic-saas-talks.com/episodes
- [ ] All 17 episodes display
- [ ] YouTube thumbnails load (maxresdefault quality)
- [ ] Episode titles and descriptions show
- [ ] Dates formatted correctly
- [ ] Duration badges show
- [ ] Tags display
- [ ] Scroll-to-top button appears on scroll

### Hosts Page Checks
- [ ] Visit https://agentic-saas-talks.com/hosts
- [ ] All 5 hosts display correctly
- [ ] Host names, roles, and bios visible
- [ ] LinkedIn icons clickable
- [ ] "Connect on LinkedIn" buttons work
- [ ] Hero section uses slate/blue gradient

### Timestamp Functionality
- [ ] Open Episode 17
- [ ] Click timestamp (e.g., 04:15)
- [ ] Verify YouTube opens at correct time (4min 15sec)
- [ ] Test multiple timestamps

### Mobile Functionality
- [ ] Resize browser to mobile width (375px)
- [ ] Hamburger menu icon appears
- [ ] Click hamburger menu
- [ ] Menu slides in from right
- [ ] Navigation links work
- [ ] Active page highlighting works

### Technical Checks
- [ ] No console errors in browser
- [ ] All static assets loading (_next directory)
- [ ] Images loading correctly
- [ ] Color scheme is slate/blue (not purple)
- [ ] No 404 errors for resources

---

## Troubleshooting

### Build Fails

**Problem:** `npm run build` shows errors

**Solutions:**
```bash
# Clear caches
rm -rf .next out

# Reinstall dependencies
rm -rf node_modules
npm install

# Rebuild
npm run build
```

### FTP Upload Fails

**Problem:** `lftp` command fails or hangs

**Solutions:**

1. **Check lftp is installed:**
   ```bash
   lftp --version
   ```

2. **Test FTP connection:**
   ```bash
   lftp -u u951885034,..C00per.. 191.101.13.61
   ls /domains/agentic-saas-talks.com/public_html/
   quit
   ```

3. **Check internet connection:**
   ```bash
   ping 191.101.13.61
   ```

4. **Check firewall** isn't blocking port 21

### Site Not Loading

**Problem:** Deployed but site shows error or doesn't load

**Solutions:**

1. **Check files uploaded:**
   - Connect via FTP
   - Navigate to `/domains/agentic-saas-talks.com/public_html/`
   - Verify `index.html` exists

2. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

3. **Check DNS settings** in Hostinger:
   - Domain should point to Hostinger nameservers
   - May take 24-48 hours to propagate

4. **Check .htaccess** file is present and correct

### Images Not Loading

**Problem:** YouTube thumbnails or logo not displaying

**Solutions:**

1. Check image paths in browser DevTools
2. Verify `logo.jpg` uploaded to root
3. Test image URLs directly in browser
4. Check CORS settings

### Mobile Navigation Not Working

**Problem:** Hamburger menu doesn't open on mobile

**Solutions:**

1. **Check JavaScript loaded:**
   - Open browser DevTools
   - Look for errors in Console
   - Verify `_next/static/chunks/` files loaded

2. **Clear cache and reload**

3. **Test in different browsers**

---

## Content Updates

### Adding a New Episode

1. **Edit episode data:**
   ```bash
   nano data/episodes.ts
   ```

2. **Add new episode at beginning of array:**
   ```typescript
   {
     id: 18,
     title: "Your New Episode Title",
     description: "Episode description...",
     date: "2025-02-01",
     videoUrl: "https://www.youtube.com/watch?v=NEW_VIDEO_ID",
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

3. **Test locally:**
   ```bash
   npm run dev
   ```

4. **Deploy:**
   ```bash
   ./deploy.sh
   ```

### Adding/Updating Hosts

1. **Edit hosts data:**
   ```bash
   nano data/hosts.ts
   ```

2. **Add or update host:**
   ```typescript
   {
     name: "Host Name",
     linkedIn: "https://www.linkedin.com/in/username/",
     bio: "Host bio and expertise...",
     role: "Co-Host"
   }
   ```

3. **Deploy:**
   ```bash
   ./deploy.sh
   ```

### Updating Color Scheme

1. Edit `app/globals.css` for CSS variables
2. Search/replace gradient classes in components
3. Update badge backgrounds
4. Test locally
5. Deploy

---

## Deployment History

### v1.3.0 (November 10, 2025) - Current
- Added /hosts page with 5 hosts
- Guest support for episodes
- Color scheme update: purple to slate/blue
- Episodes archive redesign with featured thumbnails
- Documentation updates

### v1.2.0 (November 7, 2025)
- SEO optimization with 25+ schemas
- Sitemap and robots.txt
- Enhanced metadata

### v1.1.0 (November 7, 2025)
- UX enhancements
- Mobile menu
- Loading states
- Accessibility improvements

### v1.0.0 (November 7, 2025)
- Initial release
- 17 episodes
- Deployment scripts
- Basic functionality

### Deployment Fix (November 7, 2025)
**Issue:** `_next` directory not uploading
**Cause:** `--exclude .next/` pattern in scripts
**Fix:** Removed exclude pattern from both deployment scripts
**Result:** All static assets now upload correctly

---

## Server Configuration

### FTP Details
- **Host:** 191.101.13.61
- **Username:** u951885034
- **Remote Path:** /domains/agentic-saas-talks.com/public_html
- **Protocol:** FTP (port 21)

### Files on Server
```
/domains/agentic-saas-talks.com/public_html/
├── _next/
│   ├── static/
│   │   ├── chunks/        (JavaScript files)
│   │   ├── css/           (Stylesheets)
│   │   └── media/         (Font files)
├── index.html             (Homepage)
├── episodes.html          (Episodes archive)
├── hosts.html             (Hosts page)
├── 404.html              (Error page)
├── logo.jpg              (Channel logo)
├── sitemap.xml           (SEO sitemap)
├── robots.txt            (Search directives)
└── .htaccess             (Server configuration)
```

---

## Performance Monitoring

### Check Site Status

```bash
# Quick check
curl -I https://agentic-saas-talks.com

# Detailed check
curl -v https://agentic-saas-talks.com
```

### Check FTP Access

```bash
lftp -u u951885034,..C00per.. 191.101.13.61 -e "ls /domains/agentic-saas-talks.com/public_html/; quit"
```

---

## Security Notes

The FTP password is hardcoded in deployment scripts for convenience. For production environments with multiple developers:

1. Use environment variables
2. Use .env file (add to .gitignore)
3. Use SSH keys instead of password (if supported)

For this single-developer project, hardcoded credentials are acceptable.

---

## Support Resources

- **Hostinger Support:** https://support.hostinger.com
- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS Docs:** https://tailwindcss.com/docs
- **shadcn/ui Docs:** https://ui.shadcn.com

---

## Quick Reference Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Test production build

# Deployment
./deploy.sh              # Build and deploy to Hostinger
./deploy-fast.sh         # Quick deploy (no build)

# Code Quality
npm run lint             # Check for errors

# Testing
lftp --version           # Check if lftp installed
ping 191.101.13.61       # Test connection to server
```

---

**Deployment Status:** Live in Production
**Current Version:** 1.3.0
**Site URL:** https://agentic-saas-talks.com
**Last Deployment:** November 10, 2025
