// components/ui/Surface.jsx
//
// The canonical panel (D60).
//
// WHY THIS EXISTS — the root cause of the "spotty refresh":
// D58 delivered its improvements on system classes (.card, .accent-top).
// A page only receives such a refresh if it uses the class. But `.card`
// only ever covered the WHITE surface. The two commonest surfaces on the
// site — a lavender-tinted panel (47 uses) and a dark panel (30 uses) —
// had no class at all, so 77 of 103 panels were hand-rolled with inline
// styles, and a class-level refresh could not reach them by construction.
//
// They drifted, exactly as the nine private Eyebrow copies did (D57):
//
//   tinted background   rgba(183,181,254, .05 / .07 / .10 / .15)
//   panel background    #212830 / #2E3848 / #1C2330
//   tinted border       rgba(183,181,254, .10 / .12 / .18 / .20)
//   corner radius       0.75rem / 0.875rem  vs  --radius-xl 1.25rem
//
// Variants:
//   card    white      — the existing `.card`
//   tinted  lavender   — `.surface-tinted`
//   panel   dark       — `.surface-panel`
//
// ⚠️ THE `.on-dark` TRAP IS HANDLED HERE, AND THAT IS HALF THE POINT.
// A surface that paints its own dark ground must carry `.on-dark`, or
// system components inside it render light-surface tokens on near-black.
// That trap has fired five times (navbar, mobile drawer, PreCtaBand, six
// page heroes, PartnersClient). `variant="panel"` now emits the hook
// itself, so it cannot fire again from a panel.
//
// ⛔ Do NOT re-add `backgroundColor` / `border` / `borderRadius` inline on
// a panel. `scripts/check-surfaces.mjs` fails the build on new instances.

const VARIANTS = {
  card:   'card',
  tinted: 'surface-tinted',
  panel:  'surface-panel on-dark',
}

export default function Surface({
  variant   = 'card',
  as: Tag   = 'div',
  className = '',
  children,
  ...rest
}) {
  const base = VARIANTS[variant] ?? VARIANTS.card
  return (
    <Tag className={`${base} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  )
}
