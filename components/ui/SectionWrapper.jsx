// components/ui/SectionWrapper.jsx
//
// All section padding and max-width lives here. Never apply section-level
// padding or container classes directly in a page file — use this instead.
//
// Props:
//   dark       boolean   — true: .section-dark bg (#212830)
//                          false (default): .section-light bg (#F5F5FF)
//   darker     boolean   — true: .section-darker bg (#0E0E12). Overrides dark.
//   white      boolean   — true: .section-white bg (#FFFFFF). Overrides dark/darker.
//   hero       boolean   — true: .section-hero (full-viewport dark hero). Overrides all.
//   id         string    — forwarded to the section element (skip-link targets etc.)
//   className  string    — additional classes appended to the inner container
//   as         string    — element to render ('section' default, 'div', 'article' etc.)
//   children   ReactNode

export default function SectionWrapper({
    dark     = false,
    darker   = false,
    white    = false,
    hero     = false,
    id,
    className = '',
    as: Tag   = 'section',
    children,
  }) {
    // Resolve background class — hero > white > darker > dark > light
    let bgClass = 'section-light'
    if (dark)   bgClass = 'section-dark'
    if (darker) bgClass = 'section-darker'
    if (white)  bgClass = 'section-white'
    if (hero)   bgClass = 'section-hero'
  
    return (
      <Tag id={id} className={bgClass}>
        <div className={`container-section ${className}`.trim()}>
          {children}
        </div>
      </Tag>
    )
  }