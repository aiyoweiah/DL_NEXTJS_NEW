// app/[locale]/partners/page.jsx
//
// Partners portal — invite-only. Not in sitemap. noIndex: true.
// Content: EN + ZH — both locales fully supported via PartnersClient COPY object.
// PIN gate handled client-side (localStorage-persisted).
//
// URL: /en/partners  |  /zh/partners
// PIN: dodopartners

import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'
import PartnersClient                  from '@/components/partners/PartnersClient'

const META = {
  en: {
    title:       'Partner Portal \u2014 DODO Learning',
    description: 'Invited partners: access DODO Learning\u2019s partner briefing, referral criteria, and program overview.',
  },
  zh: {
    title:       'DODO Learning \u5408\u4f5c\u4f19\u4f34\u4e13\u533a',
    description: '\u53d7\u9080\u5408\u4f5c\u4f19\u4f34\uff1a\u67e5\u9605DODO Learning\u7684\u5408\u4f5c\u7b80\u4ecb\u3001\u8f6c\u4ecb\u6807\u51c6\u4e0e\u8bfe\u7a0b\u6982\u89c8\u3002',
  },
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const m = META[locale] ?? META.en
  return buildMetadata({
    locale,
    title:       m.title,
    description: m.description,
    path:        '/partners',
    noIndex:     true,
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