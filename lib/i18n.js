// lib/i18n.js
//
// Locale primitives for the bilingual EN / ZH site.
//
// ── How content is structured ────────────────────────────────
// Content lives alongside the page that consumes it (D pattern, adopted
// 2026-05-17). Each marketing page has sibling files:
//
//   app/[locale]/<page>/
//     page.jsx
//     content.en.js    ← export const copy = { ... }
//     content.zh.js    ← mirrors content.en.js exactly, same structure
//
// Item-list shapes live in central files:
//   content/cities.js   — 6 city pages (bilingual nested by city slug)
//   content/faq.js      — 50 Q&As + UI labels + categories (bilingual)
//   content/en/blog/    — MDX blog posts
//   content/en/audiobooks/ — markdown audiobook entries
//
// The legacy central content/en.js + content/zh.js modules were retired
// (along with the getContent() loader that read them) — see workflow.md.
//
// ── This file is server-safe ─────────────────────────────────
// LOCALES, isValidLocale, toggleLocale, and localeParams are all pure
// constants/functions. Safe to import from any component (server or client).

// ── Locale constants ─────────────────────────────────────────
// Single source of truth — docs/proxy.example.js imports these too
// (when copied to root as proxy.js for a server runtime).
// If you add a third locale, add it here and proxy.js picks it up.
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
