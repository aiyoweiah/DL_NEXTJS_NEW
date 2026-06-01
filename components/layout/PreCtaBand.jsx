'use client'

// components/layout/PreCtaBand.jsx
//
// The dark pre-footer conversion band, rendered globally by Footer.jsx on
// every page. Client component because the variant is path-dependent.
//
// Funnel logic (v6.0 — "funnel swap"):
//   - Default (every page except /consult): the FIRM close. Primary →
//     Book Your Consultation; ghost → Watch a Class (the soft step).
//   - On /consult (the booking page itself): swap to the SOFT offer so the
//     band never links back to the page you're already on. Primary → Watch a
//     Demo Class; ghost → See The 16-Week Program. Mirrors how the navbar
//     already suppresses its consult CTA on /consult.
//
// Copy comes from `copy` (the resolved footer object): copy.preCta +
// copy.preCtaWatch, passed down from app/[locale]/layout.jsx.

import Link             from 'next/link'
import { usePathname }  from 'next/navigation'

export default function PreCtaBand({ locale, copy }) {
  const pathname = usePathname()
  const stripped = pathname.replace(/^\/(en|zh)/, '') || '/'
  const onConsult = stripped === '/consult'

  const v = onConsult
    ? {
        eyebrow: copy.preCtaWatch.eyebrow,
        heading: copy.preCtaWatch.heading,
        body:    copy.preCtaWatch.body,
        primary: { href: '/demos',   label: copy.preCtaWatch.watch,   aria: copy.preCtaWatch.watchAria   },
        ghost:   { href: '/program', label: copy.preCtaWatch.program, aria: copy.preCtaWatch.programAria },
      }
    : {
        eyebrow: copy.preCta.eyebrow,
        heading: copy.preCta.heading,
        body:    copy.preCta.body,
        primary: { href: '/consult', label: copy.preCta.consult, aria: copy.preCta.consultAria },
        ghost:   { href: '/demos',   label: copy.preCta.watch,    aria: copy.preCta.watchAria   },
      }

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
              {v.eyebrow}
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold leading-tight tracking-tight"
              style={{ color: '#b7b5fe' }}
            >
              {v.heading}
            </h2>
            <p
              className="mt-3 text-[0.9375rem] leading-relaxed"
              style={{ color: '#94A3B8' }}
            >
              {v.body}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:shrink-0">
            <Link
              href={`/${locale}${v.primary.href}`}
              className="btn btn-charter text-sm px-6 py-3 justify-center"
              aria-label={v.primary.aria}
            >
              {v.primary.label}
            </Link>
            <Link
              href={`/${locale}${v.ghost.href}`}
              className="btn btn-ghost text-sm px-6 py-3 justify-center"
              aria-label={v.ghost.aria}
            >
              {v.ghost.label}
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
