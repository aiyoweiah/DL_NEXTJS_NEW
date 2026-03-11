// lib/fonts.js
//
// Loads both brand typefaces via next/font/google.
// Exposes them as CSS variables --font-latin and --font-cjk.
//
// Usage in app/layout.jsx:
//   import { fontLatin, fontCJK } from '@/lib/fonts'
//
//   <html className={`${fontLatin.variable} ${fontCJK.variable}`}>
//
// Both variables are referenced in tailwind.config.js and globals.css.
// Neither font is set as the default className — that's intentional.
// The CSS variable approach lets Tailwind's fontFamily tokens and
// the :lang(zh) rule in globals.css each pull the right face without
// Next.js injecting a global className that would create specificity fights.
//
// Bilingual activation note:
// When content/zh/ goes live, no changes are needed here.
// Noto Sans SC is already loaded and available via --font-cjk.
// The :lang(zh) rule in globals.css and Tailwind's font-cjk token
// will both resolve correctly the moment Chinese content is rendered.

import { DM_Sans, Noto_Sans_SC } from 'next/font/google'

// ── DM Sans — all English content ─────────────────────────────
// Weights: 300 (captions), 400 (body), 500 (medium), 600 (semibold), 700 (display)
// Italic: loaded for body and medium weights only — display italics are rare
// subsets: latin covers the full EN character set including diacritics
//   for student and Navigator names (accented Latin chars common in diaspora families)
export const fontLatin = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-latin',
  display: 'swap',
  // preload: true is the default — Next.js will <link rel="preload"> this font.
  // DM Sans is used above the fold (nav, hero headline) so preload is correct.
  preload: true,
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
  // adjustFontFallback: true injects a @font-face fallback with size-adjust,
  // ascent-override, descent-override tuned to reduce CLS during font swap.
  adjustFontFallback: true,
})

// ── Noto Sans SC (思源黑体) — all Chinese content ──────────────
// Co-developed by Google and Adobe. Renders flawlessly on XHS, WeChat,
// ClassIn, and all mobile platforms. The only CJK face that matches
// DM Sans's visual weight without looking like a different design system.
//
// Weights: 400 (body), 500 (medium — pairs with DM Sans 600 semibold),
//          700 (display — pairs with DM Sans 700 bold)
// 300 is intentionally excluded: Noto SC Light is too thin on mobile
// screens and at the font sizes used in the program UI.
//
// subsets: 'chinese-simplified' covers the GB2312 simplified character set
// (~6,700 glyphs). next/font/google handles subsetting and split chunking
// automatically — users only download the glyphs rendered on the page.
//
// preload: false — Chinese content is not in the current build.
// When bilingual activates, flip this to true for the zh locale layout.
export const fontCJK = Noto_Sans_SC({
  subsets: ['chinese-simplified', 'latin'],
  weight: ['400', '500', '700'],
  style: ['normal'],
  variable: '--font-cjk',
  display: 'swap',
  preload: false,
  fallback: [
    'PingFang SC',
    'Hiragino Sans GB',
    'Microsoft YaHei',
    'WenQuanYi Micro Hei',
    'system-ui',
    'sans-serif',
  ],
  // adjustFontFallback: false for CJK — the fallback metrics differ too
  // much from Noto SC for size-adjust to produce a useful approximation.
  // A layout shift on CJK content is preferable to a mis-sized fallback.
  adjustFontFallback: false,
})
