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
// Bilingual:
//   app/[locale]/ is now active. Every URL entry carries hreflang alternates
//   for /en/... and /zh/... with x-default pointing to the /en/ variant.
//   Locale redirects are handled by public/_redirects at the Cloudflare edge.
//
// Note on changefreq + priority:
//   Google has publicly stated it ignores changefreq and priority in sitemaps.
//   They are included here for completeness and for non-Google crawlers
//   (Bing, Yandex, and LLM crawlers that read sitemaps for discovery).

import { readdir } from 'fs/promises'
import { join }    from 'path'

export const dynamic = 'force-static'

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
        lastModified: BUILD_DATE,
      }))
  } catch {
    // Directory doesn't exist yet — no blog posts
    return []
  }
}

// ── Alternates helper ─────────────────────────────────────────
// Builds the hreflang languages block for a given path.
// Uses 'zh-Hans' (correct BCP 47 for Simplified Chinese), not 'zh-CN'.
// x-default points to /en/ — the fallback for unrecognised locales.
function buildAlternates(path) {
  return {
    languages: {
      'en':        `${SITE_URL}/en${path}`,
      'zh-Hans':   `${SITE_URL}/zh${path}`,
      'x-default': `${SITE_URL}/en${path}`,
    },
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
    alternates:      buildAlternates(path),
  }))

  // ── 2. City pages ─────────────────────────────────────────
  const cityEntries = CITY_SLUGS.map((slug) => ({
    url:             `${SITE_URL}/cities/${slug}`,
    lastModified:    BUILD_DATE,
    changeFrequency: 'monthly',
    priority:        0.8,
    alternates:      buildAlternates(`/cities/${slug}`),
  }))

  // ── 3. Blog posts ─────────────────────────────────────────
  const blogEntries = blogPosts.map(({ slug, lastModified }) => ({
    url:             `${SITE_URL}/blog/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority:        0.65,
    alternates:      buildAlternates(`/blog/${slug}`),
  }))

  return [...staticEntries, ...cityEntries, ...blogEntries]
}