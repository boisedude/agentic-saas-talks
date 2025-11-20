# Contributing to Agentic SaaS Talks

Thank you for your interest in contributing to the Agentic SaaS Talks website! This document provides guidelines and instructions for contributing to the project.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Workflow](#development-workflow)
3. [Adding Content](#adding-content)
4. [Code Standards](#code-standards)
5. [Testing](#testing)
6. [Documentation](#documentation)
7. [Deployment](#deployment)
8. [Support](#support)

---

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn
- Basic knowledge of Next.js, TypeScript, and Tailwind CSS
- Git for version control

### Initial Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/boisedude/agentic-saas-talks.git
   cd agentic-saas-talks
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open browser**:
   Navigate to http://localhost:3000

---

## Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Development branch for new features
- `feature/*` - Feature branches
- `fix/*` - Bug fix branches

### Making Changes

1. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**

3. **Test locally**:
   ```bash
   npm run dev     # Test in development
   npm run build   # Test production build
   npm run lint    # Check for errors
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add your descriptive commit message"
   ```

5. **Push to repository**:
   ```bash
   git push origin feature/your-feature-name
   ```

---

## Adding Content

### Adding a New Episode

1. **Open episode data file**:
   ```bash
   nano data/episodes.ts
   ```

2. **Add episode at beginning of array**:
   ```typescript
   {
     id: 18,
     title: "Episode Title",
     description: "Detailed episode description (2-3 sentences)",
     date: "2025-02-01",  // ISO format
     videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID",
     duration: "60 min",
     tags: ["Tag1", "Tag2", "Tag3"],
     timestamps: [
       { time: "00:00", title: "Introduction" },
       { time: "05:30", title: "Main Topic Discussion" },
       // Add more timestamps as needed
     ],
     guests: [  // Optional: only if episode has special guests
       {
         name: "Guest Name",
         linkedIn: "https://www.linkedin.com/in/username/",
         bio: "Brief bio highlighting expertise and background"
       }
     ]
   }
   ```

3. **Test locally**:
   ```bash
   npm run dev
   # Visit http://localhost:3000/episodes
   # Verify episode displays correctly
   ```

4. **Update CHANGELOG.md**:
   Add entry under "Unreleased" section

5. **Deploy**:
   ```bash
   ./deploy.sh
   ```

### Adding a New Host

1. **Open hosts data file**:
   ```bash
   nano data/hosts.ts
   ```

2. **Add or update host**:
   ```typescript
   {
     name: "Host Name",
     linkedIn: "https://www.linkedin.com/in/username/",
     bio: "Detailed bio highlighting background, expertise, and role in the series",
     role: "Co-Host"  // Optional
   }
   ```

3. **Test locally**:
   ```bash
   npm run dev
   # Visit http://localhost:3000/hosts
   # Verify host displays correctly
   ```

4. **Update CHANGELOG.md**

5. **Deploy**:
   ```bash
   ./deploy.sh
   ```

### Updating Content

- **Episode corrections**: Edit the episode object in `data/episodes.ts`
- **Host updates**: Edit the host object in `data/hosts.ts`
- **Site copy**: Edit the relevant page component in `app/`

---

## Code Standards

### TypeScript

- Use TypeScript for all code
- Define interfaces for data structures
- Avoid `any` types
- Use type inference where appropriate

### React/Next.js

- Use functional components
- Leverage Next.js App Router conventions
- Use Server Components by default, Client Components only when needed
- Follow React best practices and hooks rules

### Styling

- Use Tailwind CSS utility classes
- Follow existing component patterns
- Use shadcn/ui components where applicable
- Maintain consistent color scheme (slate/blue)

### File Organization

```
app/
├── layout.tsx          # Root layout (navigation, footer)
├── page.tsx            # Homepage
├── episodes/
│   └── page.tsx        # Episodes archive
└── hosts/
    └── page.tsx        # Hosts page

components/
├── ui/                 # shadcn/ui components
└── *.tsx               # Custom components

data/
├── episodes.ts         # Episode data
└── hosts.ts            # Host data

lib/
├── utils.ts            # Utility functions
└── seo.ts              # SEO helpers
```

### Naming Conventions

- **Files**: kebab-case (`episode-card.tsx`)
- **Components**: PascalCase (`EpisodeCard`)
- **Functions**: camelCase (`getEpisodeById`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_EPISODES`)

---

## Testing

### Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/02-accessibility.spec.ts

# Run in UI mode
npx playwright test --ui

# Run in debug mode
npx playwright test --debug
```

### Writing Tests

When adding new features, add corresponding tests:

1. Create or update test file in `tests/`
2. Follow existing test patterns
3. Test both desktop and mobile viewports
4. Include accessibility checks
5. Capture screenshots for visual verification

### Test Requirements

Before submitting changes:
- [ ] All existing tests pass
- [ ] New features have tests
- [ ] No console errors
- [ ] Accessibility tests pass
- [ ] Mobile responsiveness verified

---

## Documentation

### Updating Documentation

When making significant changes, update relevant documentation:

- **README.md**: Project overview, quick start, features
- **CHANGELOG.md**: Version history, changes
- **DEPLOYMENT.md**: Deployment procedures
- **TESTING.md**: Testing guide
- **SEO.md**: SEO configuration
- **CONTRIBUTING.md**: This file

### Documentation Standards

- Use clear, concise language
- Include code examples where appropriate
- Keep table of contents up to date
- Use proper Markdown formatting
- Update "Last Updated" dates

---

## Deployment

### Pre-Deployment Checklist

Before deploying to production:

- [ ] Code builds successfully (`npm run build`)
- [ ] All tests pass (`npx playwright test`)
- [ ] No console errors in browser
- [ ] Tested on desktop and mobile
- [ ] CHANGELOG.md updated
- [ ] Documentation updated if needed
- [ ] Reviewed changes locally

### Deployment Process

1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Test production build**:
   ```bash
   npm start
   # Visit http://localhost:3000
   ```

3. **Deploy to Hostinger** (using lftp):
   ```bash
   # Install lftp if needed: sudo apt-get install lftp
   lftp 191.101.13.61 -e "set ssl:verify-certificate no; set ftp:ssl-allow no; user u951885034 'YOUR_FTP_PASSWORD'; cd /domains/agentic-saas-talks.com/public_html; mirror --reverse --delete --verbose /path/to/agentic-saas-talks/out/ ./; quit"
   ```

   **Or using FileZilla:**
   - Host: `191.101.13.61`
   - Username: `u951885034`
   - Password: (get from project owner)
   - Remote path: `/domains/agentic-saas-talks.com/public_html/`
   - Upload all files from `/out` directory

4. **Verify deployment**:
   - Visit https://agentic-saas-talks.com
   - Check all pages load correctly
   - Test navigation and timestamp links
   - Verify new content appears
   - Test on mobile

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

---

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Focus on constructive feedback
- Assume good intentions
- Help others learn and grow
- Maintain professional communication

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information
- Other conduct inappropriate in a professional setting

---

## Questions and Support

### Getting Help

- **Documentation**: Check README.md and other docs first
- **Issues**: Search existing issues before creating new ones
- **Discussion**: Use appropriate channels for questions

### Resources

- **Next.js Docs**: https://nextjs.org/docs
- **TypeScript Docs**: https://www.typescriptlang.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com
- **Playwright**: https://playwright.dev

---

## Recognition

Contributors are acknowledged in:
- CHANGELOG.md for significant contributions
- Project documentation where appropriate

Thank you for contributing to Agentic SaaS Talks!

---

**Last Updated:** November 20, 2025
**Maintained By:** Michael Cooper
**Repository:** https://github.com/boisedude/agentic-saas-talks
**Live Site:** https://agentic-saas-talks.com
