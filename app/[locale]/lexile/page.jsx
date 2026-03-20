// app/[locale]/lexile/page.jsx
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
    title:       'What Is a Lexile Level?',
    description: 'Lexile levels explained for parents. How Lexile measures reading, what the numbers mean, and how DODO Learning uses Lexile to track growth.',
    path:        '/lexile',
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