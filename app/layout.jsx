import { notFound } from 'next/navigation'
import { fontLatin, fontCJK } from '@/lib/fonts'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata } from '@/lib/metadata'
import SkipLink from '@/components/layout/SkipLink'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// ---------------------------------------------------------------------------
// Static params — pre-renders /en/* and /zh/* at build time.
// Without this, neither locale variant is emitted in the static export.
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return localeParams()
}

// ---------------------------------------------------------------------------
// Default metadata for the locale shell.
// Individual pages override this by calling buildMetadata() themselves.
// The hreflang alternates block in lib/metadata.js is now active — this
// layout's existence is what makes locale-aware alternates resolvable.
// ---------------------------------------------------------------------------
export async function generateMetadata({ params }) {
  const { locale } = await params
  return buildMetadata({
    locale,
    path: '/',
  })
}

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------
export default async function LocaleLayout({ children, params }) {
  const { locale } = await params

  // Guard: reject unsupported locale segments (e.g. /fr/program → 404).
  // Prevents a broken EN page from silently rendering at /fr/*.
  if (!isValidLocale(locale)) {
    notFound()
  }

  // BCP 47 lang attribute.
  // Use 'zh-Hans' for Simplified Chinese — correct for screen readers and
  // search engines. Not 'zh' or 'zh-CN'.
  const htmlLang = locale === 'zh' ? 'zh-Hans' : 'en'

  // Font class composition.
  // fontLatin (DM Sans) is always active.
  // fontCJK (Noto Sans SC) is always loaded; its CSS variable is applied
  // globally so Chinese characters render correctly on any page that mixes
  // scripts (nav, footer, mixed-language headings).
  //
  // PRELOAD NOTE: lib/fonts.js initialises fontCJK with preload: false to
  // avoid preloading a large CJK subset on EN pages. For ZH pages the subset
  // should be preloaded. Next.js next/font does not support per-render preload
  // toggling from a single module-level initialisation, so the preload hint is
  // injected manually below via <link rel="preload"> when locale === 'zh'.
  const fontClasses = [fontLatin.variable, fontCJK.variable].join(' ')

  return (
    <html lang={htmlLang} className={fontClasses}>
      <head>
        {/*
          Manual CJK preload for ZH locale only.
          Keeps the EN build from fetching a large Chinese font subset early
          while ensuring ZH users do not see a flash of unstyled CJK text.
          The href here targets the woff2 subset Next.js emits for Noto Sans SC.
          If the hashed filename changes on a font version bump, update this href.
          Long-term: replace with a next/font-native solution if the API adds
          per-render preload support.
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
      </head>
      <body>
        {/* A11y: SkipLink must be the first element in <body>. Do not move. */}
        <SkipLink />
        <Navbar locale={locale} />
        <main id="main-content">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  )
}