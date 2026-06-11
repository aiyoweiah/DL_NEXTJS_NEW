// components/ui/AgeBandChooser.jsx
//
// Program-family chooser band, shown directly below the hero on the /program
// hub and on /little-dodo, AND on the home page `/` (current={null} mode).
// Lets a parent pick the band for their child's stage:
//   Little DODO (ages 5–8) · ELA Program (Grade 3+)
//
// Server component. Copy comes from the `ageBands` export of
// content/marketing.{en,zh}.js. The `current` prop (the stripped route of the
// page rendering this) marks that band "You're here" — its CTA becomes a muted
// label so a parent never clicks through to the page they're already on.
//
// When `current` is null (home-page mode), neither band is muted; the eyebrow
// and heading swap to the `homeEyebrow` / `homeHeading` fields when present.
//
// Honours the "no dropdown" nav decision: the program family branches HERE,
// in-body, instead of in the navbar.

import Link from 'next/link'

export default function AgeBandChooser({ locale, copy, current }) {
  const eyebrow = current ? copy.eyebrow : (copy.homeEyebrow || copy.eyebrow)
  const heading = current ? copy.heading : (copy.homeHeading || copy.heading)

  return (
    <section
      aria-labelledby="ageband-heading"
      style={{ backgroundColor: '#F5F5FF', padding: 'var(--section-md) 0' }}
    >
      <div className="container-section">

        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: '#7c79e8' }}
        >
          {eyebrow}
        </p>
        <h2
          id="ageband-heading"
          className="text-2xl md:text-3xl font-bold tracking-tight mb-8"
          style={{ color: '#0E0E12', letterSpacing: '-0.02em' }}
        >
          {heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {copy.bands.map((b) => {
            const isCurrent = b.href === current
            return (
              <div
                key={b.href}
                className="rounded-xl p-6 md:p-7 flex flex-col"
                style={{
                  backgroundColor: '#ffffff',
                  border: isCurrent
                    ? '1.5px solid rgba(124,121,232,0.55)'
                    : '1px solid rgba(14,14,18,0.08)',
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded"
                    style={{ color: '#7c79e8', backgroundColor: 'rgba(124,121,232,0.10)' }}
                  >
                    {b.tag}
                  </span>
                  {isCurrent && (
                    <span
                      className="text-[10px] font-semibold uppercase tracking-wider"
                      style={{ color: '#7B8494' }}
                    >
                      · {copy.here}
                    </span>
                  )}
                </div>

                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: '#0E0E12', letterSpacing: '-0.01em' }}
                >
                  {b.name}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-6 grow"
                  style={{ color: '#3D4452' }}
                >
                  {b.blurb}
                </p>

                {isCurrent ? (
                  <span
                    className="text-sm font-semibold"
                    style={{ color: '#7B8494' }}
                    aria-hidden="true"
                  >
                    {copy.here}
                  </span>
                ) : (
                  <Link
                    href={`/${locale}${b.href}`}
                    className="btn btn-charter text-sm px-5 py-2.5 self-start"
                  >
                    {b.cta}
                  </Link>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
