// app/[locale]/faq/page.jsx
//
// FAQ page — server shell.
// All interactivity (search, category nav, accordions) is in FAQClient.jsx,
// which imports `faq` from content/faq.js directly. This page only consumes
// the data to emit the JSON-LD FAQPage schema for search/LLM indexing.
//
// Single source of truth: content/faq.js (consolidated 2026-05-17 from former
// content/faq-en.js + content/faq-zh.js + components/faq/FAQClient.jsx
// duplication — see translation/BRAND_CONTENT_GUIDE.md §13 for translation workflow).

import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'
import { faqSchema }                   from '@/lib/schema'
import { faq }                         from '@/content/faq'
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

// Strip markdown-lite syntax → plain text. Used to feed JSON-LD FAQPage schema
// (which requires plain text answers, not JSX or markdown).
function stripMarkdownLite(text) {
  if (typeof text !== 'string') return ''
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // [text](href) → text
    .replace(/\*\*([^*]+)\*\*/g, '$1')        // **text**     → text
}

export default async function FAQPage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  // Schema-feed only. FAQClient picks the same data via its own import.
  const sections = faq.sections[locale] ?? faq.sections.en
  const faqItems = sections.flatMap((section) =>
    section.items.map((item) => ({
      question: item.question,
      answer:   stripMarkdownLite(item.answer),
    }))
  )

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
