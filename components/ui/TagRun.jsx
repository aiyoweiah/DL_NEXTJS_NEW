// components/ui/TagRun.jsx
//
// The canonical taxonomy run (D70).
//
// A set of taxonomy VALUES — Navigator credentials, demo-card tags,
// partner categories, Navigator traits — set as one middot-delimited run
// instead of a row of capsules.
//
// WHY THE CAPSULES WENT
//
// The v6.x system is a drawn hand: the cursive D-o bracket (D53), the
// lead-in quote (D54), the highlighter swash (D55), the brush divider and
// the marked score (D58). A bordered capsule is generic UI-kit chrome from
// the language that preceded all of it, which is why these read as dated
// next to everything around them. Removing them finishes the D53–D58
// transition rather than adding a seventh device to it.
//
// WHY A RUN AND NOT BARE TAGS
//
// The capsule was doing one real job: it made a row of values read as a
// SET rather than as loose words. A middot run keeps that grouping with
// typography instead of chrome. D58's budget rule — one drawn device per
// section, two on a hero — rules out giving each tag its own drawn mark;
// six brush strokes in a row would spend the whole section's budget on
// taxonomy.
//
// TYPE FLOOR
//
// These ran 10–13px as capsules, and several sat below the 12px floor that
// is still an open design pass. The run sets 0.75rem (12px) as its own
// floor, so this removes six sub-12px sites rather than preserving them.
//
// D54 deliberately withholds the lead-in quote from taxonomy: the quote
// introduces a CLAIM, and these are values. They get no mark, by design.
//
// Props:
//   items   array of strings, or of { label, symbol } for traits
//   dark    the run sits on a dark ground
//   center  centre the run
//   mb      bottom margin, default 0

const SEP = '·' // middot

export default function TagRun({
  items = [],
  dark = false,
  center = false,
  mb = 0,
  className = '',
  style,
  'aria-label': ariaLabel,
}) {
  const list = items.filter(Boolean)
  if (!list.length) return null

  return (
    <p
      className={`tag-run ${className}`.trim()}
      aria-label={ariaLabel}
      style={{
        color: dark ? 'var(--color-lavender-signal)' : 'var(--text-accent)',
        justifyContent: center ? 'center' : undefined,
        marginBottom: mb,
        ...style,
      }}
    >
      {list.map((item, i) => {
        const label = typeof item === 'string' ? item : item.label
        const symbol = typeof item === 'string' ? null : item.symbol
        return (
          // Fragment key on the value: these are taxonomy values, so they
          // are unique within a run by definition.
          <span key={label} className="tag-run-item">
            {symbol && (
              <span aria-hidden="true" className="tag-run-symbol">
                {symbol}
              </span>
            )}
            {label}
            {/* The separator is decorative — a screen reader should hear
                the values, not a string of middots. */}
            {i < list.length - 1 && (
              <span aria-hidden="true" className="tag-run-sep">
                {SEP}
              </span>
            )}
          </span>
        )
      })}
    </p>
  )
}
