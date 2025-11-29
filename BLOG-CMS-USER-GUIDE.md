# Blog CMS User Guide for Co-Hosts

Welcome! This guide will help you write and publish blog posts on the Agentic SaaS Talks website using our content management system (CMS).

## Quick Start

1. Visit the admin panel: **[YOUR-SITE-URL]/admin**
2. Login with your email and password
3. Click "New Blog Post" to start writing
4. Write your post using the editor
5. Click "Publish" when ready

That's it! Your post will automatically appear on the blog.

---

## First-Time Setup

### 1. Check Your Email

You should have received an invitation email from Netlify Identity with the subject:
**"You've been invited to join [site name]"**

### 2. Accept the Invitation

1. Click the confirmation link in the email
2. Create a secure password (you'll use this to login)
3. Click "Accept invitation"

### 3. Access the CMS

1. Visit: **[YOUR-SITE-URL]/admin**
2. Click "Login with Netlify Identity"
3. Enter your email and password
4. You'll see the CMS dashboard

---

## Writing a Blog Post

### Step 1: Create a New Post

1. Login to the CMS at `/admin`
2. Click the **"New Blog Post"** button
3. You'll see a form with several fields

### Step 2: Fill Out Post Information

#### Required Fields:

**Title**
- Your blog post headline
- Example: "5 Lessons from Building Our First AI Agent"

**Slug**
- URL-friendly version of your title
- Use lowercase letters and hyphens
- Example: `5-lessons-from-building-our-first-ai-agent`
- This becomes: `agentic-saas-talks.com/blog/5-lessons-from-building-our-first-ai-agent`

**Author**
- Select your name from the dropdown
- This links to your host profile

**Publish Date**
- Click the calendar icon to select a date
- Format: YYYY-MM-DD (e.g., 2025-12-05)

**Read Time**
- Estimate how long the post takes to read
- Examples: "3 min", "5 min", "10 min"

**Tags**
- Click "Add" to add topic tags
- Use 2-4 relevant tags
- Examples: "AI Agents", "SaaS Strategy", "Agentic Architecture"

**Excerpt**
- A brief 1-2 sentence summary
- This appears on the blog index page
- Make it compelling to encourage clicks!

**Body**
- Your full blog post content (see Writing Tips below)

#### Optional Fields:

**Featured Image**
- Upload a hero image for your post
- Recommended size: 1200x630px
- Click "Choose an image" to upload

### Step 3: Write Your Content

The "Body" field supports **Markdown** formatting. Here's what you can do:

#### Headings
```markdown
# Main Heading (H1)
## Section Heading (H2)
### Subsection Heading (H3)
```

#### Text Formatting
```markdown
**Bold text**
*Italic text*
***Bold and italic***
```

#### Lists
```markdown
Bullet list:
- First item
- Second item
- Third item

Numbered list:
1. First step
2. Second step
3. Third step
```

#### Links
```markdown
[Link text](https://example.com)
```

#### Images
```markdown
![Alt text for image](/uploads/image.jpg)
```

#### Quotes
```markdown
> This is a quote or callout
```

#### Code
```markdown
Inline code: `const example = true`

Code block:
\`\`\`javascript
function hello() {
  console.log("Hello, world!")
}
\`\`\`
```

#### Horizontal Line
```markdown
---
```

### Step 4: Preview Your Post

1. Click the **eye icon** at the top to toggle preview mode
2. See how your post will look on the live site
3. Switch back to edit mode to make changes

### Step 5: Save or Publish

**Save Draft**
- Click "Save" at the top to save without publishing
- Your post is saved but not visible on the site yet

**Publish**
- Click "Publish" at the top right
- Click "Publish now" in the dialog
- Your post goes live immediately!

---

## Editing an Existing Post

1. Login to `/admin`
2. Click on the post you want to edit from the list
3. Make your changes
4. Click "Save" or "Publish" to update

---

## Deleting a Post

1. Login to `/admin`
2. Click on the post you want to delete
3. Click "Delete entry" (usually near the top)
4. Confirm the deletion

⚠️ **Warning**: This is permanent!

---

## Writing Tips

### Structure Your Post

Use headings to organize content:

```markdown
# Main Topic

Brief introduction paragraph.

## Key Point #1

Explanation and details...

## Key Point #2

More content...

## Conclusion

Wrap up and call to action.
```

### Make It Scannable

- Use short paragraphs (2-3 sentences)
- Include bullet points for lists
- Add headings every 200-300 words
- Bold key terms

### Include Visuals

- Upload images via the Featured Image field
- Reference episode clips or screenshots
- Add diagrams for technical concepts

### Link to Resources

```markdown
Check out [Episode 17](https://agentic-saas-talks.com/episodes) for more details.

Learn more in the [Omnistrate documentation](https://docs.omnistrate.com).
```

### Example Post Structure

```markdown
# How We Built a Multi-Agent System in 2 Weeks

The shift to agentic architectures isn't just theoretical—we recently built a production multi-agent system in under two weeks. Here's what we learned.

## The Challenge

Our customer needed [describe problem]...

## Our Approach

We decided to use three key patterns:

1. **Agent Orchestration** - Centralized coordination
2. **Event Streaming** - Async communication
3. **State Management** - Shared context

### Agent Orchestration

The orchestrator pattern worked because...

## Results

After two weeks, we had:
- 5 specialized agents
- 40% faster processing
- Better error handling

## Lessons Learned

**Start Simple**: Don't over-engineer...

**Test Early**: We caught issues by...

## What's Next?

We're now exploring [next topic]...

---

*Want to learn more? Watch Episode 19 where we dive deeper into agentic architectures.*
```

---

## Best Practices

### ✅ Do

- Write in a conversational tone
- Share real experiences and lessons
- Link to relevant episodes
- Include practical takeaways
- Proofread before publishing

### ❌ Don't

- Write overly long paragraphs
- Use jargon without explanation
- Publish without proofreading
- Forget to add tags
- Leave the excerpt empty

---

## Common Issues

### "Unable to Save"
- Check your internet connection
- Try refreshing the page and logging in again
- Contact the site admin if it persists

### "Changes Not Appearing"
- It may take 2-3 minutes for the site to rebuild
- Clear your browser cache and refresh
- Check that you clicked "Publish" (not just "Save")

### "Lost My Password"
- Click "Forgot password?" on the login page
- Check your email for a reset link
- Contact the site admin if you need to be re-invited

### "Can't Access /admin"
- Make sure you're using the correct URL
- Verify you accepted the invitation email
- Try a different browser or incognito mode

---

## Getting Help

Need assistance? Contact:
- **Site Admin**: [YOUR EMAIL]
- **GitHub Issues**: [If you set up a repo]
- **Slack/Discord**: [If you have a team channel]

---

## Keyboard Shortcuts

When editing:
- **Ctrl/Cmd + S**: Save
- **Ctrl/Cmd + P**: Publish
- **Ctrl/Cmd + B**: Bold
- **Ctrl/Cmd + I**: Italic

---

## Content Ideas

Not sure what to write about? Try:

### Episode Follow-Ups
- Expand on topics from recent episodes
- Share additional insights from guests
- Dive deeper into technical details

### How-To Guides
- "How to Deploy Your First AI Agent"
- "Setting Up BYOC for Your SaaS"
- "Choosing the Right AI Model for Your Use Case"

### Opinion Pieces
- "Why Agentic SaaS is the Future"
- "The Biggest Mistakes I See in AI Startups"
- "What Most People Get Wrong About AI Agents"

### Case Studies
- Real implementations you've worked on
- Success stories from your experience
- Lessons from failures

### Industry Analysis
- Trends you're seeing in the market
- Predictions for the future
- Reactions to major announcements

---

## Example Blog Post Checklist

Before publishing, ensure:

- [ ] Title is clear and compelling
- [ ] Slug is URL-friendly (lowercase, hyphens)
- [ ] Your name is selected as author
- [ ] Date is correct
- [ ] Read time is estimated
- [ ] 2-4 tags are added
- [ ] Excerpt is written (compelling summary)
- [ ] Content is well-structured with headings
- [ ] Links are working
- [ ] Images are uploaded (if applicable)
- [ ] Post is proofread
- [ ] Preview looks good

---

## Ready to Write?

Head to **[YOUR-SITE-URL]/admin** and start creating!

Your insights and experiences are valuable to the community. Don't overthink it—just share what you know.

Happy writing! ✍️

---

Last Updated: 2025-11-29
