# Deployment Guide - Agentic SaaS Talks

**URL:** https://agentic-saas-talks.com
**Method:** SSH/rsync to Hostinger
**Last Updated:** February 2026

---

## Quick Deploy

```bash
./deploy.sh              # Build and deploy
./deploy.sh --skip-build # Deploy without rebuilding
./deploy.sh --dry        # Preview what would be uploaded (no changes)
```

Or via npm:
```bash
npm run deploy
npm run deploy:skip-build
npm run deploy:dry
```

---

## Prerequisites

- Node.js 18+
- rsync (pre-installed on most Linux/macOS)
- SSH key (`~/.ssh/id_ed25519`) added to Hostinger hPanel

### SSH Setup

1. Enable SSH in Hostinger hPanel (Websites > Dashboard > SSH Access)
2. Add your public key (`~/.ssh/id_ed25519.pub`) to Hostinger
3. Test connection:
   ```bash
   ssh -p 65002 u951885034@191.101.13.61
   ```

### SSH Details

- **Host:** 191.101.13.61
- **Port:** 65002
- **User:** u951885034
- **Key:** `~/.ssh/id_ed25519`
- **Remote Path:** `/home/u951885034/domains/agentic-saas-talks.com/public_html`

---

## How It Works

`deploy.sh` uses rsync over SSH:

1. Builds Next.js static site (`npm run build` -> `./out/`)
2. Rsyncs `./out/` to Hostinger, transferring only changed bytes
3. `--delete` flag removes files on server that no longer exist locally

Rsync is much faster than FTP — incremental transfers mean only diffs are sent.

---

## Manual Deployment

If the script doesn't work:

```bash
# Build
npm run build

# Deploy
rsync -avz --progress --delete \
  -e "ssh -p 65002 -i ~/.ssh/id_ed25519" \
  ./out/ \
  u951885034@191.101.13.61:/home/u951885034/domains/agentic-saas-talks.com/public_html/
```

---

## Post-Deployment

### Verification Checklist

- [ ] https://agentic-saas-talks.com loads
- [ ] Homepage shows latest episode
- [ ] /episodes page lists all episodes
- [ ] /hosts page shows all 5 hosts
- [ ] /blog page loads
- [ ] Episode detail pages load with timestamps
- [ ] /llms.txt returns structured text
- [ ] /robots.txt includes AI crawler rules
- [ ] /feed.xml returns valid RSS

### .htaccess

The `.htaccess` file in `public/` deploys with the build output. It handles:
- URL rewriting for clean routes
- MIME types
- Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection)
- Compression (deflate)
- Browser caching

### Domain Configuration

- Domain: `agentic-saas-talks.com`
- Document root: `/domains/agentic-saas-talks.com/public_html/`
- SSL: Auto-renewed by Hostinger
- Force HTTPS: Yes

---

## Troubleshooting

### Build Fails

```bash
rm -rf .next out
npm run build
```

### Rsync Fails

1. Test SSH: `ssh -p 65002 u951885034@191.101.13.61`
2. Check SSH key exists: `ls -la ~/.ssh/id_ed25519`
3. Check key is added to Hostinger hPanel
4. Test with `--dry` flag: `./deploy.sh --dry`

### Site Not Loading

1. Check files uploaded: `ssh -p 65002 u951885034@191.101.13.61 "ls ~/domains/agentic-saas-talks.com/public_html/"`
2. Clear browser cache: Ctrl+Shift+R
3. Check `.htaccess` is present on server

---

## Quick Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build static export
npm run lint             # Run ESLint

# Deployment
npm run deploy           # Build + deploy
npm run deploy:skip-build # Deploy existing build
npm run deploy:dry       # Preview changes

# Testing
npx playwright test      # Run E2E tests
ssh -p 65002 u951885034@191.101.13.61  # Test SSH connection
```
