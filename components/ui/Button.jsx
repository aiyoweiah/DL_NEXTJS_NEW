// components/ui/Button.jsx
//
// Two variants:
//   primary  — general CTAs on DARK surfaces. Uses .btn-primary (lavender).
//   solid    — general CTAs on LIGHT surfaces. Uses .btn-solid (deep lavender).
//              Filled buttons are surface-specific: lavender/gilt fills are
//              1.75:1 and 1.47:1 against Whisper, so the pill has no edge.
//   charter  — enrollment/conversion only. Uses .btn-charter (Gilt #F5C842).
//              Never label with discount language — see §8 of handoff.
//   ghost    — secondary/outline CTA. Uses .btn-ghost.
//
// Polymorphic: renders as <button> by default. Pass as="a" or as={Link}
// for anchor/Link usage (e.g. when href is needed).
//
// Props:
//   variant   'primary' | 'solid' | 'charter' | 'ghost' | 'outline'  — default: 'primary'
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

    // ⚠️ This comment used to read "RESERVED … Unused today because the site
    // has no enrolment CTA yet". That was false, and it was one of FIVE places
    // asserting it. `/lexile`, `/methodology` and `/results` have passed
    // variant="charter" since 2026-03-19 — six rendered controls, EN + ZH.
    // For five months before D68 the label was #C49400: 2.56:1 on Whisper,
    // failing AA text and the 3:1 non-text floor, live on three conversion
    // pages. It was invisible to every sweep because a variant MAP is not
    // markup, and every sweep read markup.
    //
    // Today `charter` is a synonym for `primary` — same gilt swash, same label
    // colour. It is kept as a distinct name only so the three call sites keep
    // working; if no true enrolment CTA ever needs its own treatment, fold it
    // into `primary` and delete the class.
    charter: 'btn btn-do btn-do-charter',

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