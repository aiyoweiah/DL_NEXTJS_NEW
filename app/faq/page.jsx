// app/faq/page.jsx
// Pure server component — metadata only.
//
// All interactive elements (search, category nav, accordions) are
// delegated to components/faq/FAQClient.jsx ('use client').
//
// Why: FAQAccordion needs per-item open/close state. CategoryNav needs
// active-category + scroll state. Search needs input state. All three
// need 'use client'. Several answers contain inline <a> links — JSX
// cannot cross the server/client boundary as props, so data lives
// entirely inside FAQClient.jsx.
//
// Figma source: FAQ App.tsx — tUKokxMK9eHkSortCPKzTX
// Section rhythm:
//   S1  Hero + Search      — #212830
//   S2  Category Nav       — #0E0E12 (sticky)
//   S3  The Program        — #F5F5FF  (light accordion)
//   S4  The Loop           — #212830  (dark accordion)
//   S5  Navigators         — #F5F5FF
//   S6  Results            — #0E0E12
//   S7  The Hangar         — #F5F5FF
//   S8  Enrollment         — #212830
//   S9  Bilingual Dev      — #F5F5FF
//   S10 Cities             — #0E0E12
//   S11 Still Here         — #F5F5FF
//   S12 Closing CTA        — #212830

import { buildMetadata } from '@/lib/metadata'
import { faqSchema }      from '@/lib/schema'
import FAQClient          from '@/components/faq/FAQClient'

export const metadata = buildMetadata({
  title:       'FAQ — Every Question Parents Ask Before Enrolling',
  description:
    'Complete answers to every question about the DODO 16-week program, ' +
    'Navigators, Lexile measurement, The Hangar, Charter Enrollment pricing, ' +
    'bilingual development, and city scheduling.',
  path: '/faq',
})

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema()) }}
      />
      <FAQClient />
    </>
  )
}