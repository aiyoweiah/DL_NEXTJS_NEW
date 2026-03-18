// lib/i18n.js
//
// Translation loader for the bilingual EN / ZH site.
//
// ── How content is structured ────────────────────────────────
//   content/
//     en/
//       about.json
//       program.json
//       navigators.json
//       ... (one file per page, same names in both locales)
//       blog/
//         post-slug.mdx
//     zh/
//       about.json        ← mirrors en/ exactly, same keys
//       program.json
//       ...
//       blog/
//         post-slug.mdx
//
// ── Primary export ───────────────────────────────────────────
//   getContent(locale, page)
//     Reads content/{locale}/{page}.json.
//     Falls back to 'en' if the zh file doesn't exist yet.
//     Returns the parsed object, or an empty object on failure.
//
// ── Usage in a server component ──────────────────────────────
//   export default async function ProgramPage({ params }) {
//     const { locale } = await params
//     const t = await getContent(locale, 'program')
//     return <h1>{t.hero.heading}</h1>
//   }
//
// ── This file is server-only ─────────────────────────────────
// It uses Node's fs module. Never import it inside a 'use client' file.
// For client components that need translations, pass the content object
// down as a prop from the server component parent.
//
// ── Progressive zh rollout ───────────────────────────────────
// You do not need to create all zh/*.json files at once.
// Any missing zh file silently falls back to the en version.
// Ship EN + ZH for each page together when that page is ready.

import { readFile } from 'fs/promises'
import { join }     from 'path'

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

// ── Content root ─────────────────────────────────────────────
const CONTENT_ROOT = join(process.cwd(), 'content')

/**
 * Reads and parses content/{locale}/{page}.json.
 *
 * Falls back to the EN version if:
 *   - The requested locale is 'zh' and the zh file doesn't exist yet.
 *   - The file exists but is malformed JSON (logs a warning).
 *
 * Returns an empty object {} if even the EN fallback is missing —
 * the page will render but translation keys will be undefined,
 * making missing content immediately visible in development.
 *
 * @param {'en' | 'zh'} locale
 * @param {string}      page   — filename without extension, e.g. 'program'
 * @returns {Promise<Record<string, any>>}
 */
export async function getContent(locale, page) {
  const resolvedLocale = LOCALES.includes(locale) ? locale : DEFAULT_LOCALE
  const filePath = join(CONTENT_ROOT, resolvedLocale, `${page}.json`)

  try {
    const raw = await readFile(filePath, 'utf8')
    return JSON.parse(raw)
  } catch (err) {
    // If zh file doesn't exist yet, silently fall back to en.
    if (resolvedLocale !== DEFAULT_LOCALE) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          `[i18n] content/${resolvedLocale}/${page}.json not found — falling back to EN.`
        )
      }
      return getContent(DEFAULT_LOCALE, page)
    }

    // EN file is missing — log clearly so it's caught during development.
    if (process.env.NODE_ENV === 'development') {
      console.error(
        `[i18n] content/en/${page}.json not found. ` +
        `Create the file or check the page name passed to getContent().`
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