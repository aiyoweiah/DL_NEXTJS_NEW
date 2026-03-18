// lib/i18n.js
//
// Translation loader for the bilingual EN / ZH site.
//
// ── How content is structured ────────────────────────────────
//   content/
//     en.js          ← export const program = { ... }
//                       export const results  = { ... }
//                       export const about    = { ... }
//                       ... one named export per page
//     zh.js          ← mirrors en.js exactly, same export names and key structure
//     en/
//       blog/
//         post-slug.mdx
//     zh/
//       blog/
//         post-slug.mdx
//
// ── Primary export ───────────────────────────────────────────
//   getContent(locale, page)
//     Dynamically imports content/{locale}.js and returns the named export
//     matching `page`. Falls back to 'en' if the zh export is missing.
//     Returns an empty object on failure.
//
// ── Usage in a server component ──────────────────────────────
//   export default async function ProgramPage({ params }) {
//     const { locale } = await params
//     const t = await getContent(locale, 'program')
//     return <h1>{t.hero.heading}</h1>
//   }
//
// ── This file is server-only ─────────────────────────────────
// Never import it inside a 'use client' file — pass translation objects
// down as props from the server component parent instead.
//
// ── Why dynamic import() instead of fs ───────────────────────
// import() works in both Node (build time) and Cloudflare Workers (edge
// runtime). fs/promises does not work in edge runtimes — this approach
// keeps the option open to move to Cloudflare Workers without a rewrite
// (see §18 of handoff). Switching to a CMS later is a one-file change here.
//
// ── Progressive zh rollout ───────────────────────────────────
// You do not need to populate all zh.js exports at once.
// Any missing zh export silently falls back to the en version.
// Ship EN + ZH for each page together when that page is ready.

// ── Locale constants ─────────────────────────────────────────
// Single source of truth — middleware.js imports these too.
// If you add a third locale, add it here and middleware picks it up.
export const LOCALES        = ['en', 'zh']
export const DEFAULT_LOCALE = 'en'

/**
 * Returns true if `locale` is a supported locale string.
 * Use this in generateStaticParams and page components to guard
 * against invalid locale segments (e.g. /fr/program → 404).
 *
 * @param {string} locale
 * @returns {boolean}
 */
export function isValidLocale(locale) {
  return LOCALES.includes(locale)
}

/**
 * Returns the opposite locale — used by LocaleSwitcher.
 *
 * @param {string} locale — 'en' | 'zh'
 * @returns {'en' | 'zh'}
 */
export function toggleLocale(locale) {
  return locale === 'zh' ? 'en' : 'zh'
}

/**
 * Dynamically imports content/{locale}.js and returns the named export
 * matching `page`.
 *
 * Falls back to the EN version if:
 *   - content/zh.js doesn't exist yet.
 *   - content/zh.js exists but is missing the requested page export.
 *
 * Returns an empty object {} if even the EN fallback is missing —
 * the page will render but translation keys will be undefined,
 * making missing content immediately visible in development.
 *
 * @param {'en' | 'zh'} locale
 * @param {string}      page   — named export in the content file, e.g. 'program'
 * @returns {Promise<Record<string, any>>}
 */
export async function getContent(locale, page) {
  const resolvedLocale = LOCALES.includes(locale) ? locale : DEFAULT_LOCALE

  try {
    const mod = await import(`@/content/${resolvedLocale}.js`)

    // Module loaded but the page export is missing — treat same as not found
    if (!mod[page]) {
      throw new Error(`export "${page}" not found in content/${resolvedLocale}.js`)
    }

    return mod[page]

  } catch {
    // ZH content missing — silently fall back to EN
    if (resolvedLocale !== DEFAULT_LOCALE) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          `[i18n] content/${resolvedLocale}.js missing export "${page}" — falling back to EN.`
        )
      }
      return getContent(DEFAULT_LOCALE, page)
    }

    // EN content missing — log clearly so it's caught during development
    if (process.env.NODE_ENV === 'development') {
      console.error(
        `[i18n] content/en.js missing export "${page}". ` +
        `Add "export const ${page} = { ... }" to content/en.js.`
      )
    }

    return {}
  }
}

/**
 * generateStaticParams helper — returns locale params for all supported locales.
 * Use this in any app/[locale]/page.jsx that needs static generation.
 *
 * Usage:
 *   export function generateStaticParams() {
 *     return localeParams()
 *   }
 *
 * @returns {{ locale: string }[]}
 */
export function localeParams() {
  return LOCALES.map((locale) => ({ locale }))
}