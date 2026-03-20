// app/[locale]/demos/page.jsx
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
    title:       'Demo Classes',
    description: 'Watch a DODO Learning demo class. See The Loop — Read, Think, Speak, Write — in a live Navigator-led session.',
    path:        '/demos',
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