# Content Management Guide

This guide explains how to add new episodes and blog posts to the Agentic SaaS Talks website.

## Table of Contents
- [Adding New Episodes](#adding-new-episodes)
- [Adding Blog Posts](#adding-blog-posts)
- [Deployment](#deployment)

## Adding New Episodes

Episodes are stored in `/data/episodes.ts`. To add a new episode:

### 1. Edit the episodes file

```bash
# Open the file
code data/episodes.ts
```

### 2. Add the new episode at the TOP of the array

Episodes should be ordered newest first. Add your episode as the first item in the `episodes` array:

```typescript
{
  id: 20,  // Increment from the previous highest ID
  title: "Your Episode Title",
  description: "A detailed description of the episode content and key topics discussed.",
  date: "2025-12-05",  // Format: YYYY-MM-DD
  videoUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
  duration: "58 min",  // Approximate runtime
  tags: ["Tag 1", "Tag 2", "Tag 3"],  // Relevant topic tags
  timestamps: [  // Optional: Include if available
    { time: "00:00", title: "Introduction" },
    { time: "05:30", title: "Main Topic Discussion" },
    // ... more timestamps
  ],
  guests: [  // Optional: Include if there are guest speakers
    {
      name: "Guest Name",
      linkedIn: "https://www.linkedin.com/in/guest-profile/",
      bio: "Brief bio of the guest and their role.",
    }
  ],
},
```

### 3. Episode Field Reference

- **id**: Unique integer, increment from the last episode
- **title**: Episode title (concise and descriptive)
- **description**: 2-3 sentences describing the episode content
- **date**: Publication date in YYYY-MM-DD format
- **videoUrl**: Full YouTube URL (e.g., `https://www.youtube.com/watch?v=VIDEO_ID`)
- **duration**: Approximate length (e.g., "58 min", "1 hr 5 min")
- **tags**: Array of 2-5 relevant topic tags
- **timestamps** (optional): Array of chapter markers with time and title
- **guests** (optional): Array of guest information

### Example

```typescript
{
  id: 19,
  title: "Leaning into Agentic: How HoneySales Pivoted to an AI-Driven Future",
  description: "Episode 19 examines what it means to pivot a SaaS company into an agentic architecture...",
  date: "2025-11-28",
  videoUrl: "https://www.youtube.com/live/8rcMqtsPDaI",
  duration: "58 min",
  tags: ["Agentic SaaS", "AI Pivot", "Multi-Agent Systems"],
  guests: [
    {
      name: "Denis Zatsepin",
      linkedIn: "https://www.linkedin.com/in/denis-zatsepin/",
      bio: "Founder and CEO of HoneySales...",
    }
  ],
},
```

## Adding Blog Posts

Blog posts are stored in `/data/blog.ts`. The blog system supports Markdown content and multiple authors.

### 1. Edit the blog file

```bash
# Open the file
code data/blog.ts
```

### 2. Add the new blog post at the TOP of the array

Blog posts should be ordered newest first:

```typescript
{
  id: 2,  // Increment from the previous highest ID
  title: "Your Blog Post Title",
  slug: "your-blog-post-title",  // URL-friendly version of title (lowercase, hyphens)
  excerpt: "A brief 1-2 sentence summary that appears in the blog listing.",
  content: `# Your Blog Post Title

Your full blog post content in Markdown format.

## Section Heading

You can use all standard Markdown features:

- Bullet points
- **Bold text**
- *Italic text*
- [Links](https://example.com)

### Subsection

More content here...
`,
  author: "Michael Cooper",  // Must match a name from data/hosts.ts
  date: "2025-12-05",  // Format: YYYY-MM-DD
  readTime: "5 min",  // Estimated reading time
  tags: ["Tag 1", "Tag 2"],  // 2-4 relevant tags
  featuredImage: "/blog-image.jpg",  // Optional: Featured image path
},
```

### 3. Blog Post Field Reference

- **id**: Unique integer, increment from the last post
- **title**: Post title (clear and engaging)
- **slug**: URL-friendly identifier (lowercase, use hyphens, no spaces)
- **excerpt**: 1-2 sentence summary for the blog index
- **content**: Full post content in Markdown format
- **author**: Author name (must match a host name from `data/hosts.ts`)
- **date**: Publication date in YYYY-MM-DD format
- **readTime**: Estimated reading time (e.g., "5 min", "10 min")
- **tags**: Array of 2-4 relevant tags
- **featuredImage** (optional): Path to featured image in `/public` folder

### Markdown Content Tips

The blog supports standard Markdown syntax:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Bullet list item
- Another item

[Link text](https://example.com)

> Blockquote for callouts or quotes

---
Horizontal separator
```

### Example Blog Post

```typescript
{
  id: 1,
  title: "Welcome to Agentic SaaS Talks Blog",
  slug: "welcome-to-agentic-saas-talks-blog",
  excerpt: "We're excited to launch the official Agentic SaaS Talks blog...",
  content: `# Welcome to Agentic SaaS Talks Blog

Full content here in Markdown...
`,
  author: "Michael Cooper",
  date: "2025-11-29",
  readTime: "3 min",
  tags: ["Announcement", "Agentic SaaS", "Community"],
},
```

## Deployment

After adding new episodes or blog posts, you need to build and deploy the site.

### Option 1: Quick Deployment (Recommended)

Use the automated deployment script:

```bash
./deploy-fast.sh
```

This script will:
1. Build the Next.js site
2. Export static files to `/out` directory
3. Deploy to Hostinger via FTP

### Option 2: Manual Deployment

If you prefer to deploy manually:

```bash
# 1. Build the site
npm run build

# 2. Deploy using the full deployment script
./deploy.sh
```

### Verify Deployment

After deployment completes, verify your changes:

1. Visit https://agentic-saas-talks.com
2. Check the Episodes page for new episodes
3. Check the Blog page for new posts
4. Test that all links work correctly

## Troubleshooting

### Build Errors

If you encounter build errors:

```bash
# Check for TypeScript errors
npx tsc --noEmit

# Check for linting issues
npm run lint
```

### Common Issues

1. **Invalid date format**: Dates must be in YYYY-MM-DD format
2. **Missing author**: Blog post authors must exist in `data/hosts.ts`
3. **Slug conflicts**: Each blog post must have a unique slug
4. **Markdown syntax**: Ensure your Markdown is properly formatted

### Getting Help

- Review existing episodes/posts for format examples
- Check the Next.js build output for specific error messages
- Verify all required fields are present

## Quick Reference

### Episode Template

```typescript
{
  id: NUMBER,
  title: "TITLE",
  description: "DESCRIPTION",
  date: "YYYY-MM-DD",
  videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID",
  duration: "XX min",
  tags: ["TAG1", "TAG2"],
  timestamps: [{ time: "00:00", title: "TITLE" }],  // Optional
  guests: [{ name: "NAME", linkedIn: "URL", bio: "BIO" }],  // Optional
},
```

### Blog Post Template

```typescript
{
  id: NUMBER,
  title: "TITLE",
  slug: "url-friendly-slug",
  excerpt: "BRIEF SUMMARY",
  content: `MARKDOWN CONTENT`,
  author: "AUTHOR NAME",
  date: "YYYY-MM-DD",
  readTime: "X min",
  tags: ["TAG1", "TAG2"],
},
```

## File Locations

- Episodes: `/data/episodes.ts`
- Blog Posts: `/data/blog.ts`
- Host Information: `/data/hosts.ts`
- Public Assets: `/public/`
- Build Output: `/out/`

---

Last Updated: 2025-11-29
