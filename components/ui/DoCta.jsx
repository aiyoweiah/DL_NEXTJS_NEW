// components/ui/DoCta.jsx
//
// A DODO control. Renders `Do <action>` — the cursive D and o are supplied by
// CSS (`.btn-do::before/::after`), not by markup, so this component only
// applies the classes and handles polymorphism.
//
// Why CSS and not SVG children: --do-mark (#7c79e8) clears 3:1 on BOTH Whisper
// and Void Black, so a single baked colour serves every surface and the marks
// never need currentColor. That let the sitewide rollout be a class swap
// instead of ~50 JSX conversions. It also means a plain
// `<Link className="btn btn-do">` is equally valid — this component exists for
// convenience, not as the only way in.
//
// Hierarchy (option B — no fills anywhere). Weight and label colour carry it:
//   (default)  secondary — regular weight, accent label
//   primary    bold, ink label
//   (charter   removed by D79 — it painted identically to primary)
//
// Marks are decorative and invisible to assistive tech by construction:
// CSS pseudo-elements are not in the accessibility tree, so the label is
// always the accessible name.
//
// `.btn` is kept in the class list on purpose — `.section-dark a:not(.btn)`
// would otherwise repaint the label (the specificity trap fixed in v6.5).
//
// Props:
//   as       element or component — default 'a' (pass Link for routing)
//   tone     'secondary' | 'primary' — default 'secondary'
//   className, children, ...rest

const TONE = {
  secondary: '',
  primary:   'btn-do-primary',

}

/**
 * @param {{ as?: any, tone?: 'secondary'|'primary', className?: string, children?: any } & Record<string, any>} props
 */
export default function DoCta({
  as: Tag = 'a',
  tone = 'secondary',
  className = '',
  children,
  ...rest
}) {
  const cls = ['btn', 'btn-do', TONE[tone] ?? '', className].filter(Boolean).join(' ')
  return <Tag className={cls} {...rest}>{children}</Tag>
}
