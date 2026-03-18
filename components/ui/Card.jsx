// components/ui/Card.jsx
//
// Two modes — controlled by the `variant` prop:
//
//   navigator  — Navigator profile card.
//                Props: name, background, photo (src string), photoAlt
//                photo is optional — renders a placeholder if omitted.
//
//   result     — Anonymised student result card.
//                Props: lexileStart, lexileEnd, weeks, quote (optional)
//                Student identity is never shown — anonymised by design (§6).
//                Always shows specific Lexile numbers — never vague (§8).
//
// Both variants use .card on dark surfaces, .card-light on light surfaces.
// The `light` boolean flips the surface class.
//
// Props shared:
//   variant    'navigator' | 'result'
//   light      boolean — use .card-light (light surface). Default: false (.card).
//   className  string  — appended classes
//
// Navigator-specific props:
//   name       string (required)
//   background string — e.g. "Literature, University of British Columbia"
//   photo      string — image src. Renders initials placeholder if omitted.
//   photoAlt   string — alt text for photo. Defaults to `${name}, Navigator`
//
// Result-specific props:
//   lexileStart  number (required) — e.g. 620
//   lexileEnd    number (required) — e.g. 820
//   weeks        number (required) — e.g. 16
//   quote        string (optional) — anonymised student or parent quote

import Image from 'next/image'

// ── Navigator Card ────────────────────────────────────────────

function NavigatorCard({ name, background, photo, photoAlt, light, className }) {
  const cardClass = light ? 'card card-light' : 'card'
  const initials  = name
    ? name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
    : '?'

  return (
    <div className={`${cardClass} accent-top p-6 flex flex-col gap-4 ${className}`.trim()}>

      {/* Photo or initials placeholder */}
      <div className="flex items-center gap-4">
        <div
          className="shrink-0 w-14 h-14 rounded-full overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: 'rgba(183,181,254,0.12)' }}
        >
          {photo ? (
            <Image
              src={photo}
              alt={photoAlt ?? `${name}, Navigator`}
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          ) : (
            <span
              className="text-sm font-semibold"
              style={{ color: '#b7b5fe' }}
              aria-hidden="true"
            >
              {initials}
            </span>
          )}
        </div>

        <div>
          <p
            className="font-semibold text-[0.9375rem] leading-snug"
            style={{ color: light ? '#0E0E12' : '#F0F0F0' }}
          >
            {name}
          </p>
          <p
            className="text-xs mt-0.5 uppercase tracking-widest font-medium"
            style={{ color: '#b7b5fe' }}
          >
            Navigator
          </p>
        </div>
      </div>

      {/* Background */}
      {background && (
        <p
          className="text-sm leading-relaxed"
          style={{ color: light ? '#3D4452' : '#94A3B8' }}
        >
          {background}
        </p>
      )}

    </div>
  )
}

// ── Result Card ───────────────────────────────────────────────

function ResultCard({ lexileStart, lexileEnd, weeks, quote, light, className }) {
  const cardClass = light ? 'card card-light' : 'card'
  const growth    = lexileEnd - lexileStart

  return (
    <div className={`${cardClass} accent-top p-6 flex flex-col gap-5 ${className}`.trim()}>

      {/* Lexile numbers — always specific, never vague (§8) */}
      <div>
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: 'rgba(183,181,254,0.5)' }}
        >
          Lexile Growth
        </p>

        <div className="flex items-baseline gap-2">
          <span
            className="proof-stat-number"
            aria-label={`From Lexile ${lexileStart}`}
          >
            {lexileStart}
          </span>
          <span
            className="text-lg font-light"
            style={{ color: 'rgba(183,181,254,0.4)' }}
            aria-hidden="true"
          >
            →
          </span>
          <span
            className="proof-stat-number"
            aria-label={`to Lexile ${lexileEnd}`}
          >
            {lexileEnd}
          </span>
        </div>

        <p
          className="mt-2 text-sm"
          style={{ color: light ? '#3D4452' : '#94A3B8' }}
        >
          <span style={{ color: '#b7b5fe' }} className="font-semibold">
            +{growth} Lexile points
          </span>
          {' '}in {weeks} weeks
        </p>
      </div>

      {/* Optional quote */}
      {quote && (
        <blockquote
          className="text-sm leading-relaxed italic border-l-2 pl-4"
          style={{
            color:       light ? '#3D4452' : '#94A3B8',
            borderColor: 'rgba(183,181,254,0.3)',
          }}
        >
          &ldquo;{quote}&rdquo;
        </blockquote>
      )}

    </div>
  )
}

// ── Main export ───────────────────────────────────────────────

export default function Card({ variant = 'navigator', ...props }) {
  if (variant === 'result') return <ResultCard {...props} />
  return <NavigatorCard {...props} />
}