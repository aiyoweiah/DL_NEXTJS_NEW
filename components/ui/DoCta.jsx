// components/ui/DoCta.jsx
//
// The D-o bracket CTA (D53). Renders `Do <action>`: a cursive capital D and a
// lowercase o flanking the label, so every funnel CTA carries half the brand
// name and reads as an instruction.
//
// Hand: school cursive — monoline, ~5° from upright, the letterform a child is
// taught to write. Monoline is deliberate and load-bearing: there are no thin
// passages, so ONE drawing works at every size. The modulated hands considered
// first (chancery, copperplate) needed a separate small-optical cut because
// their hairlines fell to ~0.9px at button size and went muddy.
//
// Colour: marks use --do-mark (#7c79e8), the only lavender clearing 3:1 on
// BOTH Whisper and Void Black, so no light/dark variant is needed. The label
// uses --text-accent and flips to --text-accent-dark on dark surfaces via the
// section hooks in globals.css.
//
// Scope: FUNNEL CTAs only (See → Talk → Enrol). Never media transport, nav
// chrome, or utility controls — the device stops meaning anything if it is
// everywhere. See .interface-design/system.md § "The D-o bracket".
//
// Accessibility: both marks are aria-hidden. The label carries the accessible
// name, so the letterforms are never the only affordance. `.btn` is kept in the
// class list on purpose — `.section-dark a:not(.btn)` would otherwise repaint
// the label (the specificity trap fixed in v6.5).
//
// Props:
//   as         element or component  — default: 'a' (pass Link for routing)
//   size       number                — glyph box in px. Default 22.
//   className  string                — appended
//   children   ReactNode             — the label
//   ...rest    forwarded (href, onClick, aria-label, …)

const D_PATHS = [
  'M13.5 18 C 15.5 13.5, 18.5 11.5, 21 13 C 20.5 30, 20 47, 19.5 64',
  'M21 13 C 42 14, 54 25, 53.5 38.5 C 53 52, 40 63, 19.5 64',
]

// One unbroken stroke, exiting high on the right — which is how a cursive o
// actually joins to the next letter, unlike b, v or w.
const O_PATH =
  'M41 37 C 36 31.5, 24 30.5, 17 36.5 C 10 42.5, 10.5 56, 19 60.5 ' +
  'C 27.5 65, 38.5 61, 41 53.5 C 42.5 49, 41 43.5, 37.5 40.5 C 42 39, 48 38.5, 53 39.5'

function Mark({ side, size }) {
  return (
    <svg
      className={`do-mark do-mark-${side}`}
      width={size}
      height={size}
      viewBox="0 0 80 80"
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {side === 'l'
          ? D_PATHS.map((d) => <path key={d} d={d} />)
          : <path d={O_PATH} />}
      </g>
    </svg>
  )
}

// `as` is typed loosely on purpose: page.tsx is the only TypeScript call site,
// and without this TS infers `as: string` from the default and rejects
// `as={Link}`. Same shape as Button.jsx, which never hit this because it is
// only used from .jsx pages.
/**
 * @param {{ as?: any, size?: number, className?: string, children?: any } & Record<string, any>} props
 */
export default function DoCta({
  as: Tag = 'a',
  size = 22,
  className = '',
  children,
  ...rest
}) {
  return (
    <Tag className={`btn btn-do ${className}`.trim()} {...rest}>
      <Mark side="l" size={size} />
      <span className="do-label">{children}</span>
      <Mark side="r" size={size} />
    </Tag>
  )
}
