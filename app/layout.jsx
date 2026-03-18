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

import { fontLatin, fontCJK } from '@/lib/fonts'
import { buildMetadata }      from '@/lib/metadata'
import { educationOrgSchema } from '@/lib/schema'

// ── Site-wide fallback metadata ───────────────────────────────
// Individual pages override this by calling buildMetadata() themselves.
// Locale-specific pages pass `locale` — this root call uses the default (en).
export const metadata = buildMetadata({
  title:
    'DODO Learning — Think Once. In Both Languages.',
  description:
    'A live, Navigator-led bilingual thinking program for globally mobile ' +
    'Chinese-speaking families. The 16-Week Program develops students who ' +
    'read, think, speak, and write in two languages — measured by Lexile ' +
    'levels and the 6+1 Trait writing framework.',
  path: '/',
})

// ── Root layout ───────────────────────────────────────────────
export default function RootLayout({ children }) {
  return (
    <html
      className={`${fontLatin.variable} ${fontCJK.variable}`}
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
      </head>

      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}