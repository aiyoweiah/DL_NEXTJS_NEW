'use client'

// components/layout/PreCtaBand.jsx
//
// The dark pre-footer band, rendered globally by Footer.jsx. Client component
// because visibility is path-dependent.
//
// Funnel logic (v6.1 — "band as fallback", Open Decision #19 = Option A):
//   ONE conversion moment per page. Most pages already end with their own
//   closing CTA section, so the global band would just duplicate it ("two CTAs
//   in a row"). We therefore SUPPRESS the band on every page that owns a close,
//   and show it ONLY as a soft fallback on content/utility pages that have none
//   (home, /faq, /partners, /assessment). Where it shows, it leads SOFT:
//   Watch a Demo Class (primary) + Book Your Consultation (ghost) — matching the
//   funnel ladder (cold surfaces lead soft). Copy: footer.preCta.
//
// To change which pages suppress it: edit SUPPRESS below. Pages added there must
// have their own in-body closing CTA, or they'll lose every conversion nudge
// except the navbar.

import Link             from 'next/link'
import { usePathname }  from 'next/navigation'

// Stripped-path prefixes whose pages own an in-body closing CTA → suppress band.
const SUPPRESS = [
  '/about', '/program', '/little-dodo', '/methodology', '/lexile', '/results',
  '/navigators', '/compare', '/demos', '/consult',
  '/blog', '/cities', '/audiobooks', '/privacy', '/terms',
]

export default function PreCtaBand({ locale, copy }) {
  const pathname = usePathname()
  const stripped = pathname.replace(/^\/(en|zh)/, '') || '/'

  const suppressed = SUPPRESS.some(
    (p) => stripped === p || stripped.startsWith(p + '/')
  )
  if (suppressed) return null

  const c = copy.preCta

  return (
    <div
      className="border-t border-b"
      style={{ borderColor: 'rgba(183,181,254,0.1)', backgroundColor: '#212830' }}
    >
      <div className="container-section py-14 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

          <div className="max-w-xl">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: 'rgba(183,181,254,0.5)' }}
            >
              {c.eyebrow}
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold leading-tight tracking-tight"
              style={{ color: '#b7b5fe' }}
            >
              {c.heading}
            </h2>
            <p
              className="mt-3 text-[0.9375rem] leading-relaxed"
              style={{ color: '#94A3B8' }}
            >
              {c.body}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:shrink-0">
            {/* Soft close leads (Watch); firm close (Consult) is the ghost. */}
            <Link
              href={`/${locale}/demos`}
              className="btn btn-charter text-sm px-6 py-3 justify-center"
              aria-label={c.watchAria}
            >
              {c.watch}
            </Link>
            <Link
              href={`/${locale}/consult`}
              className="btn btn-ghost text-sm px-6 py-3 justify-center"
              aria-label={c.consultAria}
            >
              {c.consult}
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
