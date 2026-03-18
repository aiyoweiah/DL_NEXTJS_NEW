// components/ui/LexileBar.jsx
//
// Visualises Lexile growth as a labelled progress bar.
// Always shows specific numbers — never vague (§6, §8 of handoff).
// e.g. Lexile 620 → 820 in 16 weeks. Never "reading improved".
//
// Replaces the inline LexileProgressBar in app/page.jsx — once this
// component exists, import it there and remove the inline version (§1).
//
// Props:
//   start      number  (required) — baseline Lexile, e.g. 620
//   end        number  (required) — exit Lexile,     e.g. 820
//   weeks      number  (required) — program duration, e.g. 16
//   min        number             — scale floor. Default: 100
//   max        number             — scale ceiling. Default: 1300
//   light      boolean            — render on light background. Default: false.
//   className  string             — appended to the wrapper
//
// Accessibility:
//   The bar is a progressbar role with aria-valuenow, aria-valuemin,
//   aria-valuemax, and aria-label. The numbers are also rendered as visible
//   text so the data is never conveyed by colour or position alone.

export default function LexileBar({
    start,
    end,
    weeks,
    min       = 100,
    max       = 1300,
    light     = false,
    className = '',
  }) {
    // Clamp values to scale
    const clamp     = (v) => Math.min(Math.max(v, min), max)
    const range     = max - min
    const startPct  = ((clamp(start) - min) / range) * 100
    const endPct    = ((clamp(end)   - min) / range) * 100
    const growthPct = endPct - startPct
    const growth    = end - start
  
    const labelColor    = light ? '#3D4452'  : '#94A3B8'
    const numberColor   = light ? '#0E0E12'  : '#F0F0F0'
    const trackColor    = light ? 'rgba(14,14,18,0.08)' : 'rgba(183,181,254,0.12)'
  
    return (
      <div className={`flex flex-col gap-3 ${className}`.trim()}>
  
        {/* Number labels */}
        <div className="flex items-baseline justify-between gap-2">
          <div>
            <span
              className="text-2xl font-bold tabular-nums"
              style={{ color: numberColor }}
            >
              {start}
            </span>
            <span
              className="ml-1.5 text-xs font-medium uppercase tracking-widest"
              style={{ color: labelColor }}
            >
              Lexile start
            </span>
          </div>
  
          <div className="text-right">
            <span
              className="text-2xl font-bold tabular-nums"
              style={{ color: '#b7b5fe' }}
            >
              {end}
            </span>
            <span
              className="ml-1.5 text-xs font-medium uppercase tracking-widest"
              style={{ color: labelColor }}
            >
              after {weeks}wks
            </span>
          </div>
        </div>
  
        {/* Track */}
        <div
          className="relative h-2.5 rounded-full overflow-hidden"
          style={{ backgroundColor: trackColor }}
        >
          {/* Baseline fill — muted, shows where student started */}
          <div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{
              width:           `${startPct}%`,
              backgroundColor: light ? 'rgba(14,14,18,0.15)' : 'rgba(183,181,254,0.2)',
            }}
            aria-hidden="true"
          />
  
          {/* Growth fill — lavender, the progress made */}
          <div
            role="progressbar"
            aria-valuenow={end}
            aria-valuemin={start}
            aria-valuemax={max}
            aria-label={`Lexile progress: ${start} to ${end} in ${weeks} weeks`}
            className="absolute top-0 h-full rounded-full"
            style={{
              left:            `${startPct}%`,
              width:           `${growthPct}%`,
              backgroundColor: '#b7b5fe',
            }}
          />
        </div>
  
        {/* Growth summary */}
        <p
          className="text-xs"
          style={{ color: labelColor }}
        >
          <span className="font-semibold" style={{ color: '#b7b5fe' }}>
            +{growth} Lexile points
          </span>
          {' '}— approximately one grade level of reading growth
        </p>
  
      </div>
    )
  }