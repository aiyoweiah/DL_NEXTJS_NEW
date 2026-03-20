// app/[locale]/compare/page.jsx
// Placeholder — UnderConstruction shell until content is ready.
// Wire: generateStaticParams + locale guard only.

import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata }               from '@/lib/metadata'
import UnderConstruction               from '@/components/UnderConstruction'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return buildMetadata({
    locale,
    title:       'DODO vs. The Alternatives',
    description: 'How DODO Learning compares to tutoring, Kumon, and other English programs. Methodology, Lexile measurement, and bilingual thinking.',
    path:        '/compare',
  })
}

export function generateStaticParams() {
  return localeParams()
}

export default async function Page({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  return <UnderConstruction />
}