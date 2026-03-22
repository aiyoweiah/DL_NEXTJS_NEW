// lib/metadata.js
//
// Single source of truth for every page's <head> metadata.
// Every page in app/ calls buildMetadata() and exports the result.
//
// Usage — static page:
//   export const metadata = buildMetadata({
//     locale: 'en',
//     title: 'Results',
//     description: 'Lexile growth data...',
//     path: '/results',
//   })
//
// Usage — dynamic page (async data required):
//   export async function generateMetadata({ params }) {
//     const { locale } = await params
//     const city = await getCityData(params.city)
//     return buildMetadata({
//       locale,
//       title: `${city.name}`,
//       description: city.metaDescription,
//       path: `/cities/${params.city}`,
//     })
//   }
//
// What buildMetadata() produces:
//   - title (with site suffix)
//   - description
//   - canonical URL
//   - hreflang alternates for EN + ZH (now active)
//   - robots (index/follow by default; noindex for utility pages)
//   - openGraph — type, title, description, url, images, siteName, locale
//   - twitter — card, title, description, images
//   - metadataBase — required by Next.js for absolute URL resolution
//   - icons — favicon.ico (all sizes) + favicon.svg (modern browsers)
//   - manifest — /site.webmanifest
//
// Per-page JSON-LD is injected inside each page file via lib/schema.js, not here.

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
 * @param {object}   options
 * @param {string}   [options.locale]      - 'en' | 'zh'. Defaults to 'en'.
 * @param {string}   options.title         - Page-specific title (no suffix needed; added automatically)
 * @param {string}   options.description   - Meta description. 120–155 chars ideal.
 * @param {string}   options.path          - Canonical path, e.g. '/results'. No trailing slash.
 * @param {object}   [options.ogImage]     - Override OG image. Shape: { url, width, height, alt }
 * @param {boolean}  [options.noIndex]     - true → noindex, nofollow. Use for /thank-you, /preview etc.
 * @param {string}   [options.ogType]      - Open Graph type. Default: 'website'. Use 'article' for blog posts.
 * @param {string}   [options.publishedAt] - ISO date string for blog posts (article:published_time)
 * @param {string}   [options.updatedAt]   - ISO date string for blog posts (article:modified_time)
 * @param {string[]} [options.authors]     - Author names for blog posts
 *
 * @returns {import('next').Metadata}
 */
export function buildMetadata({
  locale    = 'en',
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
  const canonicalUrl = `${SITE_URL}/${locale}${path ?? ''}`

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
        type:          'article',
        publishedTime: publishedAt,
        modifiedTime:  updatedAt,
        authors:       authors ?? [],
        section:       'Education',
        tags:          ['bilingual learning', 'Lexile', 'reading', 'writing', 'DODO Learning'],
      }
    : { type: ogType }

  // OG locale tag: zh_Hans for Simplified Chinese, en_CA for English.
  // Primary market is Canada; en_US is also served.
  const ogLocale = locale === 'zh' ? 'zh_Hans' : 'en_CA'

  // ── Build and return ─────────────────────────────────────────
  return {
    // ── metadataBase ─────────────────────────────────────────
    // Required by Next.js App Router to resolve relative OG image paths.
    // Must be an absolute URL including protocol.
    metadataBase: new URL(SITE_URL),

    // ── Core ─────────────────────────────────────────────────
    title:       fullTitle,
    description: description ?? null,

    // ── Canonical + hreflang alternates ──────────────────────
    // Uses 'zh-Hans' (correct BCP 47 for Simplified Chinese), not 'zh-CN'.
    // x-default points to /en/ — fallback for unrecognised locales.
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en':        `${SITE_URL}/en${path ?? ''}`,
        'zh-Hans':   `${SITE_URL}/zh${path ?? ''}`,
        'x-default': `${SITE_URL}/en${path ?? ''}`,
      },
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
      locale:      ogLocale,
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
    // favicon.ico  — covers all browsers including legacy; also satisfies
    //                the bare /favicon.ico request every browser makes.
    // favicon.svg  — picked up by modern Chrome/Firefox/Edge; renders
    //                crisply at any size and supports dark-mode via CSS.
    // shortcut     — <link rel="shortcut icon"> for older IE/Edge.
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      shortcut: '/favicon.ico',
    },

    // ── Web app manifest ─────────────────────────────────────
    manifest: '/site.webmanifest',
  }
}

// ── City page helper ──────────────────────────────────────────
// Convenience wrapper for /cities/[city] pages.
//
// Usage in app/[locale]/cities/[city]/page.jsx:
//   export async function generateMetadata({ params }) {
//     const { locale } = await params
//     return buildCityMetadata(params.city, locale)
//   }
/**
 * @param {string} citySlug   - e.g. 'vancouver', 'richmond-bc'
 * @param {string} [locale]   - 'en' | 'zh'. Defaults to 'en'.
 * @param {string} [cityName] - Display name override. Auto-derived from slug if omitted.
 */
export function buildCityMetadata(citySlug, locale = 'en', cityName) {
  const name = cityName ?? slugToTitle(citySlug)
  return buildMetadata({
    locale,
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
// Usage in app/[locale]/blog/[slug]/page.jsx:
//   export async function generateMetadata({ params }) {
//     const { locale } = await params
//     const post = await getPost(locale, params.slug)
//     return buildPostMetadata(post, locale)
//   }
/**
 * @param {object}   post
 * @param {string}   post.title
 * @param {string}   post.description
 * @param {string}   post.slug
 * @param {string}   [post.publishedAt]
 * @param {string}   [post.updatedAt]
 * @param {string[]} [post.authors]
 * @param {object}   [post.ogImage]
 * @param {string}   [locale]           - 'en' | 'zh'. Defaults to 'en'.
 */
export function buildPostMetadata(post, locale = 'en') {
  return buildMetadata({
    locale,
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