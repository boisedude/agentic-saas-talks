# Netlify Setup Guide for Decap CMS

This guide will walk you through setting up Netlify to enable the blog CMS with user authentication.

## Why Netlify?

Decap CMS requires:
1. **Git Gateway** - To save blog posts as commits to your GitHub repository
2. **Netlify Identity** - To provide secure login for co-hosts

While your main site can stay on Hostinger, Netlify will handle:
- User authentication
- Git integration
- Auto-rebuilds when blog posts are published

## Option 1: Dual Hosting (Recommended)

Host on both Netlify AND Hostinger:
- **Netlify** (`agentic-saas-talks.netlify.app`): Handles CMS authentication and auto-deploys
- **Hostinger** (`agentic-saas-talks.com`): Your main production site (manual deploys)

Co-hosts use Netlify URL to access `/admin`, changes auto-deploy to Netlify, then you manually deploy to Hostinger.

## Option 2: Full Netlify Migration

Move entirely to Netlify for automatic deployments.

---

## Setup Steps

### 1. Create GitHub Repository

First, initialize a Git repository and push your code to GitHub:

```bash
cd /mnt/d/Projects/agentic-saas-talks

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Add Decap CMS for blog management"

# Create GitHub repo and push
# Follow GitHub's instructions to create a new repository
# Then:
git remote add origin https://github.com/YOUR_USERNAME/agentic-saas-talks.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Netlify

1. Go to [Netlify](https://netlify.com) and sign up/login
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize Netlify
4. Select your `agentic-saas-talks` repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - **Branch**: `main`
6. Click "Deploy site"

### 3. Enable Netlify Identity

1. In your Netlify dashboard, go to your site
2. Go to **Site settings** → **Identity**
3. Click "Enable Identity"

### 4. Configure Identity Settings

#### Registration Preferences
1. Go to **Identity** → **Settings and usage**
2. Under **Registration**, select **Invite only**
   - This prevents random people from signing up

#### External Providers (Optional)
You can enable GitHub/Google login:
1. Go to **Identity** → **External providers**
2. Enable GitHub or Google OAuth

#### Git Gateway
1. Go to **Identity** → **Services** → **Git Gateway**
2. Click "Enable Git Gateway"
3. This allows the CMS to commit directly to your repo

### 5. Invite Co-Hosts

1. Go to **Identity** tab in Netlify dashboard
2. Click "Invite users"
3. Enter each co-host's email address:
   - Ermin Dzinic
   - Bill Tarr
   - Kamal Gupta
   - Markus Kaiser
   - Michael Cooper

Each will receive an email invitation to set their password.

### 6. Test the CMS

1. Visit `https://YOUR-SITE.netlify.app/admin`
2. Click "Login with Netlify Identity"
3. Use your invited email to set a password
4. You should see the Decap CMS dashboard!

### 7. Configure Auto-Deploy (Optional)

Netlify automatically rebuilds when changes are pushed to GitHub.

When a co-host publishes a blog post:
1. Post is saved as a commit to GitHub
2. Netlify detects the change
3. Site auto-rebuilds with new post

### 8. Update Content Guide

Edit `CONTENT-GUIDE.md` to include the new workflow:

**For co-hosts:**
- Visit `https://YOUR-SITE.netlify.app/admin`
- Login with your email/password
- Click "New Blog Post"
- Write and publish

**For you (if using dual hosting):**
- Changes auto-deploy to Netlify
- Manually run `./deploy.sh` to update Hostinger

---

## Option 1 Setup: Dual Hosting

If you want to keep Hostinger as primary:

### Configure Custom Domain on Netlify (Optional)

1. In Netlify, go to **Domain settings**
2. Add custom domain: `cms.agentic-saas-talks.com`
3. Update DNS records in Hostinger:
   - Add CNAME record: `cms` → `YOUR-SITE.netlify.app`

Now co-hosts visit: `https://cms.agentic-saas-talks.com/admin`

### Manual Sync Workflow

1. Co-hosts publish blog posts via Netlify CMS
2. Changes commit to GitHub and deploy to Netlify
3. You pull changes and deploy to Hostinger:

```bash
# Pull latest from GitHub
git pull origin main

# Deploy to Hostinger
./deploy.sh
```

---

## Option 2 Setup: Full Netlify Migration

To fully migrate to Netlify:

### 1. Configure Custom Domain

1. In Netlify, go to **Domain settings**
2. Click "Add custom domain"
3. Enter: `agentic-saas-talks.com`
4. Follow Netlify's DNS instructions

### 2. Update DNS in Hostinger

Point your domain to Netlify:

1. Login to Hostinger control panel
2. Go to Domains → Manage → DNS
3. Update nameservers to Netlify's (or add A/CNAME records as instructed)

### 3. Enable HTTPS

Netlify automatically provisions SSL certificates via Let's Encrypt.

---

## Troubleshooting

### "Unable to access identity"
- Make sure Netlify Identity is enabled
- Check that Git Gateway is enabled
- Try accessing `/admin` from the Netlify domain first

### "Failed to persist entry"
- Verify Git Gateway is enabled
- Check GitHub permissions
- Make sure you accepted the invitation email

### Posts not appearing
- Check the build log in Netlify
- Verify files are in `content/blog/` directory
- Ensure front matter format is correct

---

## Security Notes

1. **Invite only**: Keep registration set to "Invite only"
2. **Review commits**: All blog posts create Git commits - you can review them
3. **Role-based access**: Netlify Identity supports roles if you want admin vs. author separation

---

## Cost

- **Netlify Free Tier**: Includes
  - 100GB bandwidth/month
  - 300 build minutes/month
  - Netlify Identity (up to 5 users: $0/month, 5-1000 users: $99/month for 1000 users)
  - HTTPS/SSL included

For 5 co-hosts, you stay within the free tier!

---

## Next Steps

1. Follow setup steps above
2. Test CMS access at `/admin`
3. Invite all co-hosts
4. Update `CONTENT-GUIDE.md` with new workflow
5. Train co-hosts on using the CMS

---

## Alternative: Local Testing

To test CMS locally before Netlify setup:

1. Edit `public/admin/config.yml`
2. Change backend to:
```yaml
backend:
  name: test-repo
```
3. Run `npm run dev`
4. Visit `http://localhost:3000/admin`
5. You'll see test data - posts won't actually save

---

Last Updated: 2025-11-29
