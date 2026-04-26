// app/[locale]/partners/page.jsx
//
// Partners portal — invite-only. Not in the navbar. Not in the sitemap.
// noIndex: true — accessed by direct URL only (invitation-based).
//
// Content is EN-only regardless of locale param (partner audience is English-speaking).
// PIN gate handled entirely in PartnersClient (client-side, localStorage-persisted).
//
// URL: /en/partners  (or /zh/partners — same EN content renders)
// PIN: dodopartners

import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'
import PartnersClient                  from '@/components/partners/PartnersClient'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return buildMetadata({
    locale:      'en',
    title:       'Partner Portal — DODO Learning',
    description: 'Invited partners: access DODO Learning\'s partner briefing, referral criteria, and program overview.',
    path:        '/partners',
    noIndex:     true,   // Not discoverable — invitation only
  })
}

export function generateStaticParams() {
  return localeParams()
}

export default async function PartnersPage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  return <PartnersClient locale={locale} />
}