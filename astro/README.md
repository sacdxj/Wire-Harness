# HARNESS+LAB - Wire Harness Manufacturer Website

A modern, high-performance Astro website for a custom wire harness manufacturing company. Features technical industrial aesthetics, comprehensive SEO optimization, blog system, and Decap CMS for content management.

## 🚀 Tech Stack

- **Framework**: Astro 4
- **UI Framework**: React 18.3.1
- **Styling**: Tailwind CSS
- **Content Management**: Decap CMS 3.x (formerly Netlify CMS)
- **Blog**: Astro Content Collections
- **Deployment**: Netlify/Vercel ready

### Why React 18?

Decap CMS 3.x requires **React 18** for full compatibility. React 19 support is not yet available. The project uses React 18.3.1 (the latest React 18 version) to ensure stability. See [REACT_COMPATIBILITY.md](REACT_COMPATIBILITY.md) for details.

## 📁 Project Structure

```
astro/
├── public/
│   └── admin/
│       └── config.yml          # Decap CMS configuration
├── src/
│   ├── components/
│   │   ├── BaseHead.astro      # SEO metadata
│   │   ├── Breadcrumb.astro    # Breadcrumb navigation with Schema.org
│   │   ├── Footer.astro        # Site footer
│   │   ├── Header.astro        # Site navigation
│   │   └── CMScript.astro      # CMS initialization
│   ├── content/
│   │   ├── blog/               # Blog posts (Markdown)
│   │   │   ├── jst-ph-series-guide.md
│   │   │   ├── wire-harness-design-guide.md
│   │   │   └── quality-testing-guide.md
│   │   └── config.ts           # Content collection schemas
│   ├── layouts/
│   │   └── MainLayout.astro    # Main site layout
│   └── pages/
│       ├── index.astro         # Homepage
│       ├── about.astro         # About page
│       ├── services.astro      # Services/Capabilities
│       ├── contact.astro       # Contact form
│       ├── products/
│       │   └── index.astro     # Products catalog
│       ├── blog/
│       │   ├── index.astro     # Blog listing
│       │   └── [slug].astro    # Blog post (dynamic route)
│       └── admin.astro         # CMS admin entry
├── astro.config.mjs            # Astro configuration with Sitemap
├── package.json
└── tailwind.config.mjs         # Custom design tokens
```

## 🛠️ Installation

```bash
# Navigate to project directory
cd astro

# Install dependencies (includes React 18.3.1)
npm install

# Start development server
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

### React Version Note

This project uses **React 18.3.1** (not React 19) to ensure full compatibility with **Decap CMS 3.x**. Decap CMS is currently built for React 18, and upgrading to React 19 may cause compatibility issues. See [REACT_COMPATIBILITY.md](REACT_COMPATIBILITY.md) for detailed information.

## 📝 Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment Options

1. **Netlify** (Recommended):
   - Connect your Git repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Enable Identity for Decap CMS

2. **Vercel**:
   - Import project from Git
   - Framework preset: Astro
   - Build command: `npm run build`

3. **Static Export**:
   - Run `npm run build`
   - Deploy `dist/` folder to any static host

## 🎨 Design System

The site uses a technical industrial aesthetic with:

- **Colors**:
  - Primary: Dark background (#0a0e17)
  - Accent: Cyan (#00d4ff), Amber (#f59e0b), Green (#10b981)
  - Text: Off-white (#f9fafb), Gray (#9ca3af)

- **Typography**:
  - Display: Space Grotesk (modern, geometric)
  - Monospace: JetBrains Mono (technical, code-like)

- **Visual Elements**:
  - Technical grid background
  - Blueprint corner markers
  - SVG connector diagrams
  - Data-dense specifications

## 📄 Key Features

### SEO Optimization

- Complete Open Graph and Twitter Card meta tags
- Schema.org structured data (Organization, Breadcrumb, BlogPosting)
- XML Sitemap auto-generation
- Semantic HTML with proper heading hierarchy
- SEO-friendly URLs and content structure

### Breadcrumb Navigation

Every page includes breadcrumbs with Schema.org data:
```
Home > Products > JST Compatible > PH Series > Product
```

### Blog System

- Markdown-based content with frontmatter
- Dynamic routing with `getStaticPaths()`
- Category filtering
- Publication and update dates
- Hero images support
- SEO-optimized blog post pages

### Content Management

Decap CMS provides:
- Browser-based content editing
- Blog post management
- Site settings configuration
- Image uploads
- Git-based workflow
- No database required

### Contact Form

Integrated with Formspree (replace with your form ID):
- Quote request form
- File upload support
- Required field validation
- Responsive design

## 🔧 Configuration

### Update Site Details

Edit `astro.config.mjs`:
```javascript
site: 'https://your-domain.com'
```

### Update Contact Form

Edit `src/pages/contact.astro`:
```html
<form action="https://formspree.io/f/YOUR-FORM-ID">
```

### Configure Decap CMS

Edit `public/admin/config.yml`:
```yaml
backend:
  name: git-gateway
  branch: main
display_url: https://your-domain.com
```

### Add Blog Posts

Create new markdown files in `src/content/blog/`:
```yaml
---
title: "Your Post Title"
description: "SEO-friendly description"
pubDate: 2025-01-15
category: "Technical Guides"
heroImage: /images/blog/your-image.jpg
---

Your content here...
```

## 📊 Content Collections

Blog posts use Astro Content Collections with type-safe schemas:

```typescript
// src/content/config.ts
const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    category: z.string().optional(),
  }),
});
```

## 🧪 Testing

```bash
# Run Astro's built-in checks
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

## 🌐 Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📈 Performance

- Static site generation for instant loading
- Minimal JavaScript by default
- Optimized images and assets
- CSS-in-JS with Tailwind (purged in production)
- Sitemap for search engines

## 🔐 Security

- No server-side processing required
- Contact form via Formspree (handles spam protection)
- Decap CMS with Git Gateway (authenticated)
- HTTPS enforced in production

## 📝 License

Copyright © 2025 HARNESS+LAB. All rights reserved.

## 🤝 Support

For technical support or questions:
- Email: engineering@harnesslab.com
- Phone: +1 (555) 234-5678

---

**Built with ❤️ using Astro + Tailwind CSS**
