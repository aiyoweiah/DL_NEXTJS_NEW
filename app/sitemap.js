// app/sitemap.js
//
// Next.js App Router sitemap generator.
// Returns an array of URL entries; Next.js serialises them to /sitemap.xml.
//
// Route groups:
//   1. Static core pages   — priority 1.0 → 0.6, weekly/monthly changefreq
//   2. City pages          — six priority diaspora markets, priority 0.8
//   3. Blog posts          — read from content/en/blog/*.mdx at build time
//
// Bilingual activation:
//   When content/zh/ goes live, uncomment the locale URL block below.
//   Each URL entry gets two additional alternates: /en/... and /zh/...
//   and the x-default points to the /en/ variant.
//   The middleware.js redirect handles the bare / → /en or /zh routing.
//
// Note on changefreq + priority:
//   Google has publicly stated it ignores changefreq and priority in sitemaps.
//   They are included here for completeness and for non-Google crawlers
//   (Bing, Yandex, and LLM crawlers that read sitemaps for discovery).

export const dynamic = 'force-static'

export default function sitemap() {
  // ... rest of your existing code unchanged
}

import { readdir } from 'fs/promises'
import { join }    from 'path'

// ── Site constant — mirrors lib/metadata.js ───────────────────
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://www.dodolearning.com'

// ── Priority diaspora cities — mirrors lib/schema.js ─────────
const CITY_SLUGS = [
  'vancouver',
  'richmond-bc',
  'markham',
  'toronto',
  'san-francisco-bay-area',
  'los-angeles',
]

// ── Static pages with explicit SEO priority ───────────────────
// Ordered by SEO priority from the brief's page index.
// lastModified is set to build time for static pages — appropriate
// since the content only changes when the page is redeployed.
const BUILD_DATE = new Date()

const STATIC_PAGES = [
  // Highest priority
  { path: '/',             priority: 1.0,  changeFrequency: 'weekly'  },
  { path: '/program',      priority: 0.9,  changeFrequency: 'monthly' },
  { path: '/results',      priority: 0.9,  changeFrequency: 'monthly' },
  { path: '/enroll',       priority: 0.9,  changeFrequency: 'weekly'  },
  { path: '/consult',      priority: 0.9,  changeFrequency: 'weekly'  },
  { path: '/methodology',  priority: 0.9,  changeFrequency: 'monthly' },
  { path: '/faq',          priority: 0.85, changeFrequency: 'monthly' },
  // Medium priority
  { path: '/navigators',   priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/the-hangar',   priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/lexile',       priority: 0.8,  changeFrequency: 'monthly' },
  { path: '/about',        priority: 0.6,  changeFrequency: 'yearly'  },
  { path: '/compare',      priority: 0.75, changeFrequency: 'monthly' },
  // Blog index
  { path: '/blog',         priority: 0.7,  changeFrequency: 'weekly'  },
]

// ── Blog slug reader ──────────────────────────────────────────
// Reads content/en/blog/ at build time and returns slug → lastModified map.
// Falls back to an empty array if the directory doesn't exist yet —
// safe to deploy before any blog content is written.
async function getBlogSlugs() {
  try {
    const blogDir = join(process.cwd(), 'content', 'en', 'blog')
    const files   = await readdir(blogDir)

    return files
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => ({
        slug:         f.replace(/\.mdx$/, ''),
        // Use file mtime for lastModified when available — more accurate
        // than build time for frequently updated articles.
        // Stat calls are deferred to avoid slowing the build for large blogs.
        lastModified: BUILD_DATE,
      }))
  } catch {
    // Directory doesn't exist yet — no blog posts
    return []
  }
}

// ── Main export ───────────────────────────────────────────────
export default async function sitemap() {
  const blogPosts = await getBlogSlugs()

  // ── 1. Static core pages ──────────────────────────────────
  const staticEntries = STATIC_PAGES.map(({ path, priority, changeFrequency }) => ({
    url:             `${SITE_URL}${path}`,
    lastModified:    BUILD_DATE,
    changeFrequency,
    priority,

    // ── Bilingual alternates (deferred) ──────────────────────
    // Uncomment when app/[locale]/ structure is activated:
    // alternates: {
    //   languages: {
    //     'en':       `${SITE_URL}/en${path}`,
    //     'zh-CN':    `${SITE_URL}/zh${path}`,
    //     'x-default':`${SITE_URL}/en${path}`,
    //   },
    // },
  }))

  // ── 2. City pages ─────────────────────────────────────────
  const cityEntries = CITY_SLUGS.map((slug) => ({
    url:             `${SITE_URL}/cities/${slug}`,
    lastModified:    BUILD_DATE,
    changeFrequency: 'monthly',
    priority:        0.8,

    // alternates: {
    //   languages: {
    //     'en':       `${SITE_URL}/en/cities/${slug}`,
    //     'zh-CN':    `${SITE_URL}/zh/cities/${slug}`,
    //     'x-default':`${SITE_URL}/en/cities/${slug}`,
    //   },
    // },
  }))

  // ── 3. Blog posts ─────────────────────────────────────────
  const blogEntries = blogPosts.map(({ slug, lastModified }) => ({
    url:             `${SITE_URL}/blog/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    // Blog posts rank lower than core program pages individually,
    // but compound over time — 0.65 is intentional.
    priority:        0.65,

    // alternates: {
    //   languages: {
    //     'en':       `${SITE_URL}/en/blog/${slug}`,
    //     'zh-CN':    `${SITE_URL}/zh/blog/${slug}`,
    //     'x-default':`${SITE_URL}/en/blog/${slug}`,
    //   },
    // },
  }))

  return [...staticEntries, ...cityEntries, ...blogEntries]
}
