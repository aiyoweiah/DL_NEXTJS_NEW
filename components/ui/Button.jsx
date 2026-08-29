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
    primary: 'btn btn-primary',
    solid:   'btn btn-solid',
    charter: 'btn btn-charter',
    ghost:   'btn btn-ghost',   // DARK surfaces only (#b7b5fe text)
    outline: 'btn btn-outline', // LIGHT surfaces (#5856cc text)
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