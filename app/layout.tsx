// app/layout.tsx
//
// Root layout — wraps every route in the site.
//
// Bilingual activation checklist (do not build yet):
//   1. Wrap routes inside app/[locale]/layout.jsx
//   2. Replace lang="en" with lang={locale}
//   3. Add middleware.js for locale detection
//   4. Restore alternates.languages in lib/metadata.js

import '@/styles/globals.css'

import { ReactNode } from 'react'

import { fontLatin, fontCJK } from '@/lib/fonts'
import { buildMetadata }      from '@/lib/metadata'
import { educationOrgSchema } from '@/lib/schema'

import SkipLink from '@/components/layout/SkipLink'
import Navbar   from '@/components/layout/Navbar'
import Footer   from '@/components/layout/Footer'

// ── Site-wide fallback metadata ───────────────────────────────
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
export default function RootLayout({ children }: { children: ReactNode }) {
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

      {/*
        EXPLICIT body styles — do not rely solely on globals.css for
        the base background. Setting backgroundColor directly here
        ensures nothing upstream (browser defaults, CSS load order,
        hydration timing) can render the page dark.

        antialiased + overflow-x-hidden match the globals.css body rule.
      */}
      <body
        className="antialiased overflow-x-hidden"
        style={{
          backgroundColor: '#F5F5FF', // Whisper — light default
          color: '#3D4452',           // --text-body
          fontFamily: 'var(--font-latin)',
          minHeight: '100dvh',
        }}
      >
        {/* Must be the absolute first element in <body> */}
        <SkipLink />

        {/* Fixed — sits outside #main-content so skip link bypasses it */}
        <Navbar />

        {/*
          SkipLink target. tabIndex={-1} lets the skip link move focus
          here without making the element keyboard-tabbable.

          padding-top is set by #main-content rule in globals.css
          (= var(--nav-height)) so the fixed navbar doesn't overlap content.
        */}
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}