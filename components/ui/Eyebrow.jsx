// components/ui/Eyebrow.jsx
//
// The canonical section eyebrow (D57).
//
// This replaces NINE hand-rolled local copies — one defined privately
// inside each of compare / consult / demos / little-dodo / navigators /
// program / AssessmentClient / FAQClient / PartnersClient — which had
// quietly drifted apart:
//
//   weight     500 (five of them) vs 600 (three) vs font-semibold (one)
//   tracking   0.10em vs 0.12em vs tracking-widest
//   margin     12px vs 14px vs 16px
//   colour     '#5856cc' / '#b7b5fe' / var(--label-color) /
//              rgba(183,181,254,0.65) — four spellings of two tokens
//
// Routing them through one component is what gives the other 50 section
// labels the D54 lead-in quote. It is also the structural fix for the
// drift: there is now one place to change, so a tenth copy cannot appear
// by accident.
//
// Props:
//   dark    the section paints its own dark ground. Sets the colour
//           explicitly rather than relying on `.on-dark`, because
//           AssessmentClient / FAQClient / PartnersClient still paint dark
//           grounds without that hook — see the `.on-dark` trap in
//           `.interface-design/system.md`.
//   center  centres the label AND its mark. `.eyebrow.label-quote` is a
//           flex row, so this needs justify-content; text-align alone
//           would leave the quote mark stranded at the left edge.
//   mb      bottom margin, default 1rem (the majority value).
//
// ZH tracking is handled in CSS (`.eyebrow:lang(zh)`), not here — a
// `locale` prop passed by an old call site is accepted and ignored.

export default function Eyebrow({
  children,
  dark      = false,
  center    = false,
  mb        = '1rem',
  className = '',
  style,
  as: Tag   = 'p',
}) {
  return (
    <Tag
      className={`eyebrow label-quote ${className}`.trim()}
      style={{
        color:          dark   ? 'var(--color-lavender-signal)' : undefined,
        justifyContent: center ? 'center' : undefined,
        textAlign:      center ? 'center' : undefined,
        marginBottom:   mb,
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}
