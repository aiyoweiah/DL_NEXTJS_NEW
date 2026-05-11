// app/[locale]/faq/page.jsx
//
// FAQ page — server shell.
// All interactivity (search, category nav, accordions) is in FAQClient.jsx.
// Locale is passed as a prop so FAQClient can prefix internal links correctly.
//
// Content lives in FAQClient.jsx for now — it uses JSX in answers (inline links)
// which can't be serialised to content/en.js. When FAQ content migrates to a CMS,
// FAQClient receives it as a prop from here.

import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'
import { faqSchema }                   from '@/lib/schema'
import { faqEn }                       from '@/content/faq-en'
import { faqZh }                       from '@/content/faq-zh'
import FAQClient                       from '@/components/faq/FAQClient'

export function generateStaticParams() {
  return localeParams()
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  return buildMetadata({
    locale,
    path:        '/faq',
    title:       'FAQ — DODO Learning',
    description:
      'Every question parents ask before enrolling in the DODO Learning 16-Week Program — answered completely. The Loop, Navigators, Lexile measurement, enrollment, and more.',
  })
}

export default async function FAQPage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  // Pick the locale-appropriate Q&A list for the JSON-LD FAQPage schema.
  // The UI rendering still uses FAQClient's own JSX-rich data; this module
  // feeds the canonical plain-text version to search engines and LLMs.
  const faqItems = locale === 'zh' ? faqZh : faqEn

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqItems)) }}
      />
      <FAQClient locale={locale} />
    </>
  )
}