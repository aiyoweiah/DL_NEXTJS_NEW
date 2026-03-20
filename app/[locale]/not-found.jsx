'use client'

// app/[locale]/not-found.jsx
//
// Locale-aware 404 — rendered when notFound() is called from any page
// inside app/[locale]/ (e.g. unknown city slug, unknown blog post).
// Next.js serves the closest not-found.jsx to the failing route — this
// one catches errors inside the [locale] segment before the root file.
//
// Why 'use client':
//   not-found.jsx is a special Next.js file — params are never passed to it.
//   usePathname() is the only way to read the current locale.
//
// Locale detection:
//   Reads the first path segment — '/zh/...' → 'zh'.
//   Falls back to 'en' if the segment is not a known locale.

import Link            from 'next/link'
import { usePathname } from 'next/navigation'

const LOCALES = ['en', 'zh']

const COPY = {
  en: {
    heading: 'Page not found.',
    body:    "The page you are looking for doesn\u2019t exist or has moved.",
    home:    'Back to Home',
    consult: 'Book a Consult',
  },
  zh: {
    heading: '页面未找到。',
    body:    '您访问的页面不存在或已移动。',
    home:    '返回首页',
    consult: '预约咨询',
  },
}

export default function LocaleNotFound() {
  const pathname = usePathname() ?? ''
  const segment  = pathname.split('/')[1] ?? ''
  const locale   = LOCALES.includes(segment) ? segment : 'en'
  const c        = COPY[locale]

  return (
    <div className="section-darker min-h-screen flex items-center justify-center">
      <div className="container-section text-center py-32 max-w-lg mx-auto">

        <p className="eyebrow mb-6" style={{ color: 'rgba(183,181,254,0.5)' }}>
          404
        </p>

        <h1 className="mb-4 text-gradient" style={{ fontWeight: 700 }}>
          {c.heading}
        </h1>

        <p className="text-base leading-relaxed mb-10" style={{ color: '#94A3B8' }}>
          {c.body}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${locale}`} className="btn btn-primary px-8 py-3 justify-center">
            {c.home}
          </Link>
          <Link href={`/${locale}/consult`} className="btn btn-ghost px-8 py-3 justify-center">
            {c.consult}
          </Link>
        </div>

      </div>
    </div>
  )
}