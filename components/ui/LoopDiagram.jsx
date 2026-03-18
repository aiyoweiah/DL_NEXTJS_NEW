// components/ui/LoopDiagram.jsx
//
// Renders The Loop: Read → Think → Speak → Write.
// Step order is fixed and non-configurable — always Read → Think → Speak → Write.
// ARIA label: "The Loop" (§6 of handoff).
//
// Layout:
//   - Desktop (md+): horizontal row of steps connected by arrows
//   - Mobile:        vertical stack with arrows pointing down
//
// Props:
//   light      boolean — render on light background. Adjusts text colours.
//                        Default: false (dark background).
//   className  string  — appended to the wrapper

// Steps are fixed — do not make this data-driven or allow reordering.
const STEPS = [
    {
      id:          'read',
      number:      '01',
      label:       'Read',
      description: 'Engage with texts above current Lexile level. Build vocabulary depth, not just recognition.',
    },
    {
      id:          'think',
      number:      '02',
      label:       'Think',
      description: 'Process meaning in both languages simultaneously. Form a position before speaking.',
    },
    {
      id:          'speak',
      number:      '03',
      label:       'Speak',
      description: 'Articulate ideas aloud in structured discussion. Navigator-guided Socratic method.',
    },
    {
      id:          'write',
      number:      '04',
      label:       'Write',
      description: 'Commit thinking to the page. Assessed with the 6+1 Trait framework.',
    },
  ]
  
  // ── Arrow ─────────────────────────────────────────────────────
  
  function HorizontalArrow() {
    return (
      <div
        className="loop-arrow hidden md:flex items-center justify-center shrink-0"
        aria-hidden="true"
      >
        <svg
          width="28"
          height="12"
          viewBox="0 0 28 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 6H24M24 6L19 1M24 6L19 11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    )
  }
  
  function VerticalArrow() {
    return (
      <div
        className="loop-arrow flex md:hidden items-center justify-center py-1"
        aria-hidden="true"
      >
        <svg
          width="12"
          height="24"
          viewBox="0 0 12 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 0V20M6 20L1 15M6 20L11 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    )
  }
  
  // ── Step ──────────────────────────────────────────────────────
  
  function Step({ number, label, description, light }) {
    return (
      <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 min-w-0">
        <span
          className="loop-step-number mb-3"
          aria-hidden="true"
        >
          {number}
        </span>
        <p
          className="text-lg font-bold mb-2 tracking-tight"
          style={{ color: light ? '#0E0E12' : '#b7b5fe' }}
        >
          {label}
        </p>
        <p
          className="text-sm leading-relaxed"
          style={{ color: light ? '#3D4452' : '#94A3B8' }}
        >
          {description}
        </p>
      </div>
    )
  }
  
  // ── Main export ───────────────────────────────────────────────
  
  export default function LoopDiagram({ light = false, className = '' }) {
    return (
      <div
        role="img"
        aria-label="The Loop — DODO Learning's four-phase methodology: Read, Think, Speak, Write"
        className={`flex flex-col md:flex-row md:items-start md:gap-4 gap-0 ${className}`.trim()}
      >
        {STEPS.map((step, index) => (
          <div
            key={step.id}
            className="flex flex-col md:flex-row md:items-start md:gap-4 flex-1 min-w-0"
          >
            <Step {...step} light={light} />
            {index < STEPS.length - 1 && (
              <>
                <HorizontalArrow />
                <VerticalArrow />
              </>
            )}
          </div>
        ))}
      </div>
    )
  }