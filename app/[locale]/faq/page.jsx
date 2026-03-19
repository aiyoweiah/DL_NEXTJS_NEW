// app/[locale]/faq/page.jsx
// Placeholder — UnderConstruction shell until content is ready.
// Wire: generateStaticParams + locale guard only.

import { notFound }                    from 'next/navigation'
import { isValidLocale, localeParams } from '@/lib/i18n'
import UnderConstruction               from '@/components/UnderConstruction'

export function generateStaticParams() {
  return localeParams()
}

export default async function Page({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  return <UnderConstruction />
}