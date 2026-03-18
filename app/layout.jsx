// app/layout.jsx
//
// Root layout — wraps every route in the site.
//
// Bilingual activation checklist (do not build yet):
//   1. Wrap routes inside app/[locale]/layout.jsx
//   2. Replace lang="en" with lang={locale}
//   3. Add middleware.js for locale detection
//   4. Restore alternates.languages in lib/metadata.js

import '@/styles/globals.css'

import { fontLatin, fontCJK } from '@/lib/fonts'
import { buildMetadata }      from '@/lib/metadata'
import { educationOrgSchema } from '@/lib/schema'

import SkipLink from '@/components/layout/SkipLink'
import Navbar   from '@/components/layout/Navbar'
import Footer   from '@/components/layout/Footer'

// ── Site-wide fallback metadata ───────────────────────────────
// Individual pages override this by calling buildMetadata() themselves.
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
      lang="en"
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

      <body>
        {/* Must be the absolute first element in <body> */}
        <SkipLink />

        {/* Fixed — sits outside #main-content so skip link bypasses it */}
        <Navbar />

        {/*
          SkipLink target. tabIndex={-1} lets the skip link move focus
          here without making the element keyboard-tabbable.
        */}
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}