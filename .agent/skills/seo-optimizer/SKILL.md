---
name: seo-optimizer
description: Search Engine Optimization specialist for Next.js and web projects. Covers keyword research, on-page SEO, technical SEO, schema markup, Core Web Vitals, and content strategy. Use when optimizing pages for search rankings, implementing meta tags, adding structured data, auditing SEO issues, or improving organic visibility.
---

# SEO Optimizer

A comprehensive SEO guide for Next.js and general web projects, covering content optimization, technical SEO, and measurement strategies.

---

## 1. Keyword Research and Strategy

### Search Intent Categories

Every keyword serves one of four intents. Write the content accordingly.

| Intent         | Example                      | Content Type            |
| -------------- | ---------------------------- | ----------------------- |
| Informational  | "what are React hooks"       | Guide, article          |
| Navigational   | "Next.js docs"               | Landing page            |
| Transactional  | "download CV builder"        | Product page            |
| Commercial     | "best ATS analysis tools"    | Comparison, review      |

### Keyword Optimization Formula

The primary keyword should appear in the title tag, H1, first 100 words of the opening paragraph, URL, and meta description. Target a density of 1–2%, with natural usage taking priority.

---

## 2. On-Page SEO

### Title Tag

```html
<!-- ✅ Keyword first, under 60 characters, descriptive -->
<title>Product Usage Guide — Example Product</title>

<!-- ❌ Too long, keyword stuffing, generic -->
<title>Create CV Make CV Prepare CV CV Example CV Template Online CV</title>
```

Next.js App Router'da:

```typescript
// app/cv-guide/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Product Usage Guide — Example Product',
  description:
    'How do you create an ATS-friendly professional CV? A step-by-step guide, templates, and expert tips. Prepare an impressive CV in 10 minutes.',
}
```

### Meta Description

Use 150–160 characters, include a value proposition and CTA, and make it unique on every page.

```typescript
export const metadata: Metadata = {
  description:
    'How do you create an ATS-friendly professional CV? A step-by-step guide, templates, and expert tips. Prepare an impressive CV in 10 minutes.',
  openGraph: {
    title: 'CV Creation Guide',
    description: '...',
    images: [{ url: '/og/cv-guide.jpg', width: 1200, height: 630 }],
  },
}
```

### Heading Hierarchy

```html
<h1>Main Page Title (Primary Keyword)</h1>
<h2>Section Title (Related Keyword)</h2>
<h3>Subsection</h3>
<h3>Subsection</h3>
<h2>Another Section</h2>
```

Use only one H1 per page. H2/H3 headings must be meaningful, not decorative.

### URL Structure

```
✅ /guide/create-ats-friendly-cv
✅ /tool/cv-builder
✅ /blog/job-application-tips

❌ /page.php?id=123&ref=xyz
❌ /kategori-1/alt-kategori-2/item-999
```

### Image Optimization

```tsx
import Image from 'next/image'

// ✅ next/image — automatic optimization + CLS prevention
;<Image
  src='/images/cv-example.webp'
  alt='ATS-friendly CV example with section headings and keywords highlighted'
  width={800}
  height={600}
  priority // For above-the-fold images
/>
```

Alt text: descriptive for informative images; use `alt=""` for decorative images.

---

## 3. Teknik SEO

### Schema Markup

```typescript
// app/blog/[slug]/page.tsx
export default function BlogPage({ post }: { post: BlogPost }) {
  const schema = {
    '@context': 'https://schema.org ',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Example Product',
      logo: { '@type': 'ImageObject', url: 'https://example.com/logo.png ' },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* page content */}
    </>
  )
}
```

### Common Schema Types

`Article` — blog posts, `Product` — tools and features, `FAQ` — question-and-answer sections, `HowTo` — step-by-step guides, `BreadcrumbList` — navigation path, `Organization` — company information.

### Canonical Tag

```typescript
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://example.com/original-page ',
  },
}
```

Especially important for pages with URL parameters, such as filtering and sorting.

### Robots and Sitemap (Next.js)

```typescript
// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin/', '/api/', '/private/'] },
    ],
    sitemap: 'https://example.com/sitemap.xml ',
  }
}

// app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchAllPosts()

  return [
    { url: 'https://example.com ', lastModified: new Date(), priority: 1.0 },
    ...posts.map((post) => ({
      url: `https://example.com/blog/ ${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
```

---

## 4. Core Web Vitals

### Target Values

| Metric                          | Target  | Measurement             |
| ------------------------------- | ------- | ----------------------- |
| LCP (Largest Contentful Paint)  | < 2.5s  | Largest content load    |
| INP (Interaction to Next Paint) | < 200ms | Interaction response time |
| CLS (Cumulative Layout Shift)   | < 0.1   | Layout shift            |

### LCP Improvement

```tsx
// Add priority to the hero image — triggers preload
;<Image src='/hero.webp' alt='...' width={1200} height={600} priority />

// Preload critical resources
// app/layout.tsx
export default function RootLayout() {
  return (
    <html>
      <head>
        <link rel='preload' href='/fonts/main.woff2' as='font' crossOrigin='' />
      </head>
    </html>
  )
}
```

### CLS Prevention

```tsx
// ✅ Always specify width/height — space is reserved
;<Image width={800} height={600} src='...' alt='...' />

// ✅ Reserve layout space with a skeleton
{
  isLoading ? <Skeleton className='h-48 w-full' /> : <Content />
}

// ❌ Do not insert dynamic content above existing content
// (banner, cookie notice, ad — do not add after the page loads)
```

### JavaScript Optimization (INP)

```typescript
// Defer heavy computation
const [isPending, startTransition] = useTransition()

startTransition(() => {
  setFilteredResults(heavyFilter(data))
})

// Lazy-load large modules
const HeavyChart = dynamic(() => import('./HeavyChart'), { ssr: false })
```

---

## 5. Content Strategy

### Content Length Guide

| Page Type            | Minimum      | Optimal     |
| -------------------- | ------------ | ----------- |
| Blog post            | 1,000 words  | 1,500–2,500 |
| Product/feature page | 300 words    | 500–800     |
| Category page        | 500 words    | 800–1,200   |
| Home page            | 400 words    | 600+        |

### Optimization for Featured Snippets

```markdown
## What Is an ATS?

An ATS (Applicant Tracking System) is software employers use to
automatically scan and filter job applications.
Applications are scored based on keywords, experience, and qualifications.

## How Do You Prepare an ATS-Friendly CV?

1. Add keywords from the job posting to the CV
2. Use standard section headings (Experience, Education, Skills)
3. Prefer a simple format — do not use tables or graphics
4. Submit in DOCX format instead of PDF unless otherwise specified
```

### Internal Linking Strategy

Target 3–5 internal links per 1,000 words. Use descriptive anchor text. Choose contextual phrases such as "ATS analysis guide" instead of "click here." Link from new content to older content.

---

## 6. SEO Checklist

Pre-publication checks:

- [ ] Primary keyword is in the title tag (under 60 characters)
- [ ] Meta description is 150–160 characters and includes a CTA
- [ ] H1 contains the primary keyword, with only one H1 on the page
- [ ] URL slug is optimized and readable
- [ ] Images are in WebP format and include descriptive alt text
- [ ] 3–5 internal links are present
- [ ] Schema markup is implemented when needed
- [ ] Canonical tag is correct
- [ ] Mobile-friendly
- [ ] Page load time is under 3 seconds
- [ ] No broken links
- [ ] Open Graph and Twitter Card meta tags are present

---

## 7. Monitoring and Analysis

Core tools: Google Search Console (performance, indexing issues), Google Analytics 4 (traffic, conversion), PageSpeed Insights (Core Web Vitals), and Screaming Frog (technical audit).

Core metrics to monitor: organic traffic trends, keyword rankings, click-through rate (CTR), bounce rate, conversion from organic traffic, and Core Web Vitals scores.
