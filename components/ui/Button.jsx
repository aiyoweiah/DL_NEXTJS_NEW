// components/ui/Button.jsx
//
// Every variant resolves to the .btn-do family (option B, D53b) — the
// variant names survive as call-site vocabulary only:
//   primary / solid — section CTA (btn-do-primary; surface handled by .on-dark)
//   fork     — two co-equal controls in one section (D76). Adds .btn-do-fork.
//              Never label with discount language — see §8 of handoff.
//   ghost / outline — secondary (plain btn-do)
// The legacy fill classes these names once pointed at were retired at the
// definition 2026-09-05 (system.md §5).
//
// Polymorphic: renders as <button> by default. Pass as="a" or as={Link}
// for anchor/Link usage (e.g. when href is needed).
//
// Props:
//   variant   'primary' | 'solid' | 'fork' | 'ghost' | 'outline'  — default: 'primary'
//             Secondaries are surface-specific: ghost on DARK, outline on LIGHT.
//             btn-ghost is #b7b5fe — 1.75:1 on Whisper, unusable on light.
//   as        element or component              — default: 'button'
//   className string                            — appended to resolved classes
//   children  ReactNode
//   ...rest   forwarded to the rendered element (href, onClick, type, etc.)

const VARIANT_CLASSES = {
    // Option B (D53/v6.9): no fills. Weight + label colour carry hierarchy,
    // and since D76 the gilt swash marks whichever control LEADS its section.
    primary: 'btn btn-do btn-do-primary',
    solid:   'btn btn-do btn-do-primary',

    // ⚠️ `charter` WAS a variant here and is gone (D79). Do not add it back
    // without reading why it went.
    //
    // It was described as reserved-and-unused in FIVE separate places while
    // `/lexile`, `/methodology` and `/results` had been passing it since
    // 2026-03-19 — six rendered controls, EN + ZH. For five months before D68
    // its label was #C49400: 2.56:1 on Whisper, failing AA text AND the 3:1
    // non-text floor, live on three conversion pages. Every sweep missed it
    // because a variant map is not markup, and every sweep read markup.
    //
    // D76 then gave the gilt swash to every section lead, which made `charter`
    // and `primary` paint identically. D79 folded it in: the three call sites
    // now say `primary`, which is what they always meant — all three point at
    // /consult, a consultation, so the class reserved for "Charter Enrolment"
    // was never once used for enrolment.
    //
    // If a real enrolment CTA ever needs its own treatment, give it a name
    // that describes what it does and a guard that proves it is used.

    // A section whose two controls are co-equal is a FORK, not a close, so it
    // has no lead and takes no gold (D76). Pair with `primary`.
    fork:    'btn btn-do btn-do-primary btn-do-fork',

    ghost:   'btn btn-do',
    outline: 'btn btn-do',
  }
  
  export default function Button({
    variant   = 'primary',
    as: Tag   = 'button',
    className = '',
    children,
    ...rest
  }) {
    const variantClass = VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.primary
  
    return (
      <Tag
        className={`${variantClass} ${className}`.trim()}
        // Default type="button" prevents accidental form submission when
        // rendered inside a <form>. Callers can override with type="submit".
        {...(Tag === 'button' && !rest.type ? { type: 'button' } : {})}
        {...rest}
      >
        {children}
      </Tag>
    )
  }