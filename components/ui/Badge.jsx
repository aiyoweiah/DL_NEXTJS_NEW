// components/ui/Badge.jsx
//
// Small label chip. Used for eyebrow labels, status tags, and category markers.
//
// Variants:
//   default   — .badge (neutral)
//   lavender  — .badge-lavender (lavender on dark surface)
//
// Props:
//   variant   'default' | 'lavender'   — default: 'lavender'
//   className string                   — appended classes
//   children  ReactNode

const VARIANT_CLASSES = {
    default:  'badge',
    lavender: 'badge badge-lavender',
  }
  
  export default function Badge({
    variant   = 'lavender',
    className = '',
    children,
  }) {
    const variantClass = VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.lavender
  
    return (
      <span className={`${variantClass} ${className}`.trim()}>
        {children}
      </span>
    )
  }