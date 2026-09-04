// components/ui/Label.jsx
//
// The canonical chrome label (D94).
//
// `Eyebrow` (D57) owns the SECTION label — the thing that introduces a band
// of content and carries the D54 lead-in quote. This owns the smaller
// furniture underneath it: the header on a column of links, the descriptor
// hanging off a nav item, the status chip on a link.
//
// ─────────────────────────────────────────────────────────────────────
// WHY IT EXISTS
//
// Footer.jsx and Navbar.jsx carry 798 hand-rolled uppercase label instances
// between them — 65% of every such instance on the site — and NEITHER FILE
// IMPORTS Eyebrow OR TagRun. Every one of those labels was private, which is
// the exact condition D57 found before it and D70 found after it.
//
// The drift had already started, and `conformance` caught it before this was
// written: "Programs" / "课程" heads a column at 0.75rem in the footer and at
// 0.7rem in the navbar. One job, two sizes, two files. A class would not have
// stopped the second spelling; a component does, because there is now one
// place where the size lives.
//
// ─────────────────────────────────────────────────────────────────────
// SCOPE — WHAT THIS DELIBERATELY DOES NOT TAKE
//
// Three of the nine label-shaped sites in those files stay out:
//
//   Footer brand tagline   D36's locked tagline. D79 already built its home —
//                          `.eyebrow.sentence-case`, created precisely to
//                          exempt it from uppercase. It belongs to Eyebrow.
//   Footer signal label    12px semibold, no transform, no tracking. That is
//                          body emphasis wearing the word "label".
//   Navbar item titles     14px and 16px nav link text. Not labels.
//
// Keeping them out is the point. A component that absorbs everything
// label-shaped becomes the next catch-all — which is how `section-label` ended
// up holding 79 unrelated strings across four different jobs.
//
// ─────────────────────────────────────────────────────────────────────
// THE 11px IN `qualifier` IS A DECISION, NOT RESIDUE
//
// Five of the six sub-floor sites this replaces move to 12px. `qualifier`
// stays at 11px: it hangs off a 14px nav item title and has to read as
// subordinate to it, and at 12px the 14:11 ratio closes to 14:12 and the
// hierarchy flattens. Logged as a stated exception in D94 so that
// `scripts/type-floor.mjs` reports it as a choice rather than as drift.
//
// Props:
//   variant  'column' | 'qualifier' | 'pill'   (required — no default, so a
//            new call site has to say what job the label is doing)
//   dark     the label sits on a dark ground. Explicit rather than relying on
//            `.on-dark`, for the same reason Eyebrow is explicit: several
//            surfaces paint dark grounds without that hook.
//   as       element tag, default 'p'. Footer column headers pass 'h3'.

// ─────────────────────────────────────────────────────────────────────
// WHY THE VARIANT CHECK IS DEV-ONLY, AND WHY A GUARD DOES THE REAL WORK
//
// An unconditional throw in render was the first draft, and it was wrong in
// one specific way. Footer.jsx is a SERVER component, so a bad variant there
// fails the build loudly — proven behaviour, and the right outcome. Navbar.jsx
// is 'use client': its prerendered branches fail the build too, but a variant
// reachable only AFTER hydration (a menu that opens on click) would build
// clean and then blank the site's primary navigation in production.
//
// So the throw is excellent exactly where it fires at build time, and
// dangerous exactly where it does not. It is kept for the fast feedback while
// writing a call site, and compiled out of production.
//
// `scripts/check-label-variant.mjs` is the load-bearing half: it reads every
// `<Label>` in source at prebuild, including the ones no render path reaches.
// That follows the house pattern — check-gilt-escrow and check-tokens already
// scan JSX props — and the repo's own rule that a convention needs a guard
// behind it or it is just a comment.
//
// Note this is deliberately STRICTER than Surface, which does
// `VARIANTS[variant] ?? VARIANTS.card`. A silent default is how a fourth job
// quietly joins a three-variant component.
// ─────────────────────────────────────────────────────────────────────
// ⚠️ THE CLASS NAMES MUST BE WRITTEN OUT IN FULL, NOT BUILT
//
// The first version did `className={`label label-${variant}`}`. It built
// clean and shipped every label UNSTYLED, because Tailwind's content scanner
// only keeps a custom `@layer utilities` rule when it finds the class name as
// a literal string somewhere in source. `label-column` never appeared, so
// `.label-column` was purged — while `.label` and `.label-column.is-dark`
// both survived, the first because "label" is literal here and the second
// because "is-dark" is.
//
// Nothing failed. The build passed, all 15 guards passed, and `type-floor`
// reported a BETTER number — 329 instead of the 443 this change should
// produce — because the 11px rule it was counting no longer existed. The
// measurement improved precisely because the styling broke.
//
// So: full literal strings, and the lookup doubles as the variant map.
const VARIANT_CLASS = {
  column:    'label-column',
  qualifier: 'label-qualifier',
  pill:      'label-pill',
}
const VARIANTS = VARIANT_CLASS

export default function Label({
  children,
  variant,
  dark      = false,
  className = '',
  style     = undefined,
  as: Tag   = 'p',
  // Pass through aria-label and friends. Eyebrow shipped without this and
  // silently DROPPED the home hero's aria-label the moment a raw <span>
  // moved onto it. Same mistake is not worth making twice.
  ...rest
}) {
  if (process.env.NODE_ENV !== 'production' && !VARIANTS[variant]) {
    throw new Error(
      `Label: unknown variant "${variant}". Use column | qualifier | pill — ` +
      'or if none of them is the job, it probably is not a chrome label.'
    )
  }

  return (
    <Tag
      className={`label ${VARIANT_CLASS[variant]}${dark ? ' is-dark' : ''} ${className}`.trim()}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  )
}
