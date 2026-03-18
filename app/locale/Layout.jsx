// app/[locale]/layout.jsx
//
// Locale shell — nested inside app/layout.jsx.
// Must NOT render <html> or <body> — those are owned by the root layout.
//
// Responsibilities:
//   - Validate locale segment (→ 404 for /fr/*, etc.)
//   - Pre-render both /en/* and /zh/* at build time via generateStaticParams
//   - Set <html lang> correctly for each locale via an inline synchronous script
//   - Conditionally preload the CJK font subset on zh pages
//   - Own SkipLink, Navbar, main, Footer (all need the locale prop)
//
// Why an inline script for lang:
//   The root layout owns <html> but doesn't have access to the [locale] param.
//   An inline script (not deferred, not async) runs synchronously during HTML
//   parsing — before the browser lays out any content — so screen readers and
//   the live DOM have the correct lang set from the very first render.
//   suppressHydrationWarning on <html> in the root layout silences React's
//   hydration warning about the attribute changing on the client.

import { notFound } from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'
import SkipLink from '@/components/layout/SkipLink'
import Navbar   from '@/components/layout/Navbar'
import Footer   from '@/components/layout/Footer'

// ── Static params ─────────────────────────────────────────────
// Tells Next.js to pre-render /en/* and /zh/* at build time.
// Without this, neither locale variant is emitted in the static export.
export function generateStaticParams() {
  return localeParams()
}

// ── Metadata ──────────────────────────────────────────────────
// Default metadata for the locale shell.
// Individual pages call buildMetadata() themselves to override this.
export async function generateMetadata({ params }) {
  const { locale } = await params
  return buildMetadata({
    locale,
    path: '/',
  })
}

// ── Layout ────────────────────────────────────────────────────
export default async function LocaleLayout({ children, params }) {
  const { locale } = await params

  // Guard: /fr/program → 404. Prevents unsupported locale segments from
  // silently rendering as a broken EN page.
  if (!isValidLocale(locale)) {
    notFound()
  }

  // BCP 47 lang tag. 'zh-Hans' is correct for Simplified Chinese.
  // Not 'zh' or 'zh-CN' — screen readers and search engines expect zh-Hans.
  const htmlLang = locale === 'zh' ? 'zh-Hans' : 'en'

  return (
    <>
      {/*
        Set <html lang> synchronously before browser render.
        Runs during HTML parsing — not deferred, not after JS hydration.
        This is the correct approach when the root layout can't read the
        [locale] param directly.
      */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="${htmlLang}"`,
        }}
      />

      {/*
        Preload the CJK font subset on zh pages only.
        lib/fonts.js initialises fontCJK with preload: false to avoid
        fetching a large Chinese font subset on EN pages. This <link>
        adds the preload hint for zh pages specifically.
        Next.js App Router hoists <link> elements from layouts into <head>.

        If the woff2 filename changes on a Next.js or font version bump,
        update the href to match the new hash in _next/static/media/.
      */}
      {locale === 'zh' && (
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/_next/static/media/noto-sans-sc.woff2"
          crossOrigin="anonymous"
        />
      )}

      {/* A11y: SkipLink must be the first visible element after html/body. */}
      <SkipLink />

      <Navbar locale={locale} />

      <main id="main-content" tabIndex={-1}>
        {children}
      </main>

      <Footer locale={locale} />
    </>
  )
}