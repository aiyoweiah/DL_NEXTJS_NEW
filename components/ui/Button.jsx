// components/ui/Button.jsx
//
// Two variants:
//   primary  — general CTAs. Uses .btn-primary (lavender).
//   charter  — enrollment/conversion only. Uses .btn-charter (Gilt #F5C842).
//              Never label with discount language — see §8 of handoff.
//   ghost    — secondary/outline CTA. Uses .btn-ghost.
//
// Polymorphic: renders as <button> by default. Pass as="a" or as={Link}
// for anchor/Link usage (e.g. when href is needed).
//
// Props:
//   variant   'primary' | 'charter' | 'ghost'  — default: 'primary'
//   as        element or component              — default: 'button'
//   className string                            — appended to resolved classes
//   children  ReactNode
//   ...rest   forwarded to the rendered element (href, onClick, type, etc.)

const VARIANT_CLASSES = {
    primary: 'btn btn-primary',
    charter: 'btn btn-charter',
    ghost:   'btn btn-ghost',
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