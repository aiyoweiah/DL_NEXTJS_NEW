// app/layout.jsx
//
// Root layout — owns <html> and <body>. These tags must not appear in any
// nested layout. This file is intentionally minimal.
//
// Responsibilities:
//   - Import globals.css (once, site-wide)
//   - Attach font CSS variables to <html> so they cascade everywhere
//   - Inject the site-wide educationOrgSchema JSON-LD
//   - Export the site-wide fallback metadata
//
// NOT responsible for:
//   - <html lang>         — set per-locale in app/[locale]/layout.jsx
//   - Navbar / Footer     — need locale prop, live in app/[locale]/layout.jsx
//   - SkipLink            — lives in app/[locale]/layout.jsx (must be first
//                           in the rendered layout tree, after html/body)
//
// suppressHydrationWarning on <html>:
//   The locale layout sets document.documentElement.lang via an inline script.
//   suppressHydrationWarning prevents React from warning about the attribute
//   differing between server render and the first client paint.

import '@/styles/globals.css'
import '@/styles/cjk-fonts.css'   // GENERATED — npm run fonts:cjk

import { fontLatin, fontCJK } from '@/lib/fonts'
import { buildMetadata }      from '@/lib/metadata'
import { educationOrgSchema, websiteSchema } from '@/lib/schema'

// ── Site-wide fallback metadata ───────────────────────────────
// Individual pages override this by calling buildMetadata() themselves.
// Locale-specific pages pass `locale` — this root call uses the default (en).
export const metadata = buildMetadata({
  title:
    'DODO Learning — Think once, in two languages.',
  description:
    'A live, online, one-on-one English language arts program. Each 16-week ' +
    'cycle develops students who read, think, speak, and write at mastery ' +
    'level — measured by Lexile levels and the 6+1 Trait writing framework.',
  path: '/',
})

// ── Viewport ──────────────────────────────────────────────────
// Explicit declaration prevents drift from Next.js defaults. maximumScale: 5
// (not 1) preserves user zoom — WCAG 1.4.4 prohibits disabling pinch-zoom.
export const viewport = {
  width:        'device-width',
  initialScale: 1,
  maximumScale: 5,
  // D98 — single-theme light site, declared so algorithmic-darkening
  // browsers (Android Auto-Dark, WebViews) leave the measured palette
  // alone. Pairs with `color-scheme: light` on :root in globals.css.
  colorScheme:  'light',
  // Browser chrome colour: the navbar's Void Black tops every route.
  themeColor:   '#0E0E12',
}

// ── Root layout ───────────────────────────────────────────────
export default function RootLayout({ children }) {
  return (
    <html
      className={`${fontLatin.variable} ${fontCJK.variable}`}
      /* --font-latin-family feeds the CJK stack in styles/cjk-fonts.css, which
         must list the Latin face FIRST — the CJK subset carries no Latin glyphs,
         so Latin inside Chinese copy would otherwise fall to the platform face
         and diverge from the English site (the D59 split). next/font hashes the
         family name at build time, so it can only be injected from here. */
      style={{ '--font-latin-family': fontLatin.style.fontFamily.split(',')[0].trim() }}
      suppressHydrationWarning
    >
      <head>
        {/* Site-wide JSON-LD — educationOrgSchema on every page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(educationOrgSchema()),
          }}
        />

        {/* Site-wide JSON-LD — WebSite + SearchAction (sitelinks search box) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema()),
          }}
        />
      </head>

      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}