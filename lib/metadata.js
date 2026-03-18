// lib/metadata.js
//
// Single source of truth for every page's <head> metadata.
// Every page in app/ calls buildMetadata() and exports the result.
//
// Usage — static page:
//   export const metadata = buildMetadata({
//     title: 'Results — DODO Learning',
//     description: 'Lexile growth data...',
//     path: '/results',
//   })
//
// Usage — dynamic page (async data required):
//   export async function generateMetadata({ params }) {
//     const city = await getCityData(params.city)
//     return buildMetadata({
//       title: `${city.name} — DODO Learning`,
//       description: city.metaDescription,
//       path: `/cities/${params.city}`,
//     })
//   }
//
// What buildMetadata() produces:
//   - title (with site suffix)
//   - description
//   - canonical URL
//   - robots (index/follow by default; noindex for utility pages)
//   - openGraph — type, title, description, url, images, siteName, locale
//   - twitter — card, title, description, images
//   - metadataBase — required by Next.js for absolute URL resolution
//
// What it intentionally does NOT produce yet:
//   - alternates.languages (hreflang) — deferred until bilingual activates
//   - Per-page JSON-LD — injected inside each page file, not here
//
// Bilingual activation:
//   When content/zh/ is ready, restore the alternates block below
//   and pass a `locale` parameter to buildMetadata().

// ── Site constants ────────────────────────────────────────────
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://www.dodolearning.com'

const SITE_NAME    = 'DODO Learning'
const TITLE_SUFFIX = '— DODO Learning'

// Default OG image — placed in public/og-default.png
// Dimensions: 1200 × 630px (Twitter/OG standard)
const OG_IMAGE_DEFAULT = {
  url:    `${SITE_URL}/og-default.png`,
  width:  1200,
  height: 630,
  alt:    'DODO Learning — Think Once. In Both Languages.',
}

// ── buildMetadata ─────────────────────────────────────────────
/**
 * Factory function — call once per page, export the result as `metadata`
 * or return it from `generateMetadata`.
 *
 * @param {object}  options
 * @param {string}  options.title        - Page-specific title (no suffix needed; added automatically)
 * @param {string}  options.description  - Meta description. 120–155 chars ideal.
 * @param {string}  options.path         - Canonical path, e.g. '/results'. No trailing slash.
 * @param {object}  [options.ogImage]    - Override OG image. Shape: { url, width, height, alt }
 * @param {boolean} [options.noIndex]    - true → noindex, nofollow. Use for /thank-you, /preview etc.
 * @param {string}  [options.ogType]     - Open Graph type. Default: 'website'. Use 'article' for blog posts.
 * @param {string}  [options.publishedAt]- ISO date string for blog posts (article:published_time)
 * @param {string}  [options.updatedAt]  - ISO date string for blog posts (article:modified_time)
 * @param {string[]} [options.authors]   - Author names for blog posts
 *
 * @returns {import('next').Metadata}
 */
export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex   = false,
  ogType    = 'website',
  publishedAt,
  updatedAt,
  authors,
} = {}) {

  // ── Derived values ──────────────────────────────────────────
  const canonicalUrl = `${SITE_URL}${path ?? ''}`

  // Title: if the caller already ends with '— DODO Learning', don't double-append.
  const fullTitle =
    title && title.includes(SITE_NAME)
      ? title
      : title
        ? `${title} ${TITLE_SUFFIX}`
        : `${SITE_NAME} — Think Once. In Both Languages.`

  const image = ogImage ?? OG_IMAGE_DEFAULT

  // ── Robots ──────────────────────────────────────────────────
  const robots = noIndex
    ? { index: false, follow: false }
    : { index: true,  follow: true,  googleBot: { index: true, follow: true } }

  // ── Open Graph extras for articles ──────────────────────────
  const articleMeta = ogType === 'article'
    ? {
        type:            'article',
        publishedTime:   publishedAt,
        modifiedTime:    updatedAt,
        authors:         authors ?? [],
        section:         'Education',
        tags:            ['bilingual learning', 'Lexile', 'reading', 'writing', 'DODO Learning'],
      }
    : { type: ogType }

  // ── Build and return ─────────────────────────────────────────
  return {
    // ── metadataBase ─────────────────────────────────────────
    // Required by Next.js App Router to resolve relative OG image paths.
    // Must be an absolute URL including protocol.
    metadataBase: new URL(SITE_URL),

    // ── Core ─────────────────────────────────────────────────
    title:       fullTitle,
    description: description ?? null,

    // ── Canonical ────────────────────────────────────────────
    alternates: {
      canonical: canonicalUrl,
      // hreflang — uncomment and extend when bilingual activates:
      // languages: {
      //   'en':    `${SITE_URL}/en${path ?? ''}`,
      //   'zh-CN': `${SITE_URL}/zh${path ?? ''}`,
      //   'x-default': canonicalUrl,
      // },
    },

    // ── Robots ───────────────────────────────────────────────
    robots,

    // ── Open Graph ───────────────────────────────────────────
    openGraph: {
      ...articleMeta,
      title:       fullTitle,
      description: description ?? null,
      url:         canonicalUrl,
      siteName:    SITE_NAME,
      locale:      'en_CA',    // primary market is Canada; en_US also served
      images:      [image],
    },

    // ── Twitter / X ──────────────────────────────────────────
    twitter: {
      card:        'summary_large_image',
      title:       fullTitle,
      description: description ?? null,
      images:      [image.url],
      // creator: '@dodolearning',  // add when handle is confirmed
    },

    // ── App icons (resolve from public/) ─────────────────────
    // Uncomment and add assets when brand assets are finalized:
    // icons: {
    //   icon:        '/favicon.ico',
    //   shortcut:    '/favicon-16x16.png',
    //   apple:       '/apple-touch-icon.png',
    //   other:       [{ rel: 'icon', type: 'image/png', url: '/favicon-32x32.png' }],
    // },

    // ── Web app manifest ─────────────────────────────────────
    // manifest: '/site.webmanifest',
  }
}

// ── City page helper ──────────────────────────────────────────
// Convenience wrapper for /cities/[city] pages.
// Generates consistent title + description from city data.
//
// Usage in app/cities/[city]/page.jsx:
//   export async function generateMetadata({ params }) {
//     return buildCityMetadata(params.city)
//   }
/**
 * @param {string} citySlug  - e.g. 'vancouver', 'richmond-bc'
 * @param {string} [cityName] - Display name override. Auto-derived from slug if omitted.
 */
export function buildCityMetadata(citySlug, cityName) {
  const name = cityName ?? slugToTitle(citySlug)
  return buildMetadata({
    title:       `DODO Learning in ${name}`,
    description: `DODO Learning serves Chinese-speaking families in ${name}. ` +
                 `Live, Navigator-led bilingual thinking program. Lexile-measured progress. ` +
                 `The 16-Week Program — read, think, speak, write.`,
    path: `/cities/${citySlug}`,
  })
}

// ── Blog post helper ──────────────────────────────────────────
// Convenience wrapper for /blog/[slug] pages.
//
// Usage in app/blog/[slug]/page.jsx:
//   export async function generateMetadata({ params }) {
//     const post = await getPost(params.slug)
//     return buildPostMetadata(post)
//   }
/**
 * @param {object} post
 * @param {string} post.title
 * @param {string} post.description
 * @param {string} post.slug
 * @param {string} [post.publishedAt]
 * @param {string} [post.updatedAt]
 * @param {string[]} [post.authors]
 * @param {object} [post.ogImage]
 */
export function buildPostMetadata(post) {
  return buildMetadata({
    title:       post.title,
    description: post.description,
    path:        `/blog/${post.slug}`,
    ogType:      'article',
    publishedAt: post.publishedAt,
    updatedAt:   post.updatedAt   ?? post.publishedAt,
    authors:     post.authors     ?? ['DODO Learning'],
    ogImage:     post.ogImage,
  })
}

// ── Internal helpers ──────────────────────────────────────────
/**
 * Convert a kebab-case slug to a display title.
 * 'richmond-bc' → 'Richmond Bc'  (city data overrides this via cityName param)
 */
function slugToTitle(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}