# Loop report — 2026-09-02

Five commits, `df606d0` → `cffd6d2`. All 16 guards green. Everything pushed.

---

## What moved

| | Before | After |
|---|---|---|
| Hand-rolled labels | 1,230 | **420** |
| Type floor (sub-12px nodes) | 1,013 | **659** |
| Build guards | 14 | **16** |
| Superseded LCS spellings (ZH) | 6 | **2** *(both need your ruling)* |

---

## Step 1 · The purge guard — and the version of it that could not fire

Built `check-utility-emitted.mjs`. **The first version was a no-op**, and that
is the most useful thing in this report.

It compared *declared in `@layer utilities`* against *present in emitted CSS*,
failing when a class was referenced in JSX but missing from the stylesheet.
That condition is **unreachable**: Tailwind's content globs are
`./components/**` and `./app/**` — exactly the files such a scan reads. Any
literal the scan can see, Tailwind has already seen and kept. Where no literal
exists, the scan calls the class *dead*, not *broken*.

It could not even be negative-tested honestly. Stripping the literals out of
`Label.jsx` did **not** purge the classes, because the comment explaining the
purge bug contains `.label-column`, and Tailwind's scanner is a plain text
match that cannot tell a comment from code. My own documentation was keeping
the rule alive.

Shipping that would have been worse than shipping nothing — a guard that looks
like a safety net and cannot fire.

**Rebuilt on the observable event instead:** the *set of utility classes that
reach the browser*, as a ratchet. It may grow freely; a class leaving it fails
the build. Baseline 40, including `label-column` / `label-qualifier` /
`label-pill`, so D94's exact bug now trips it. Negative-tested: injecting a
class that no longer ships exits 1 and names it. The 14 declared-but-never-
referenced classes are **reported, not failed** — those are correctly purged,
and failing on them would punish the tool for being right.

## Step 2 · Wave 4 — the economics, confirmed

Type floor 671 → 659. **The small number is the finding.**

D94 removed 684 sites from six declarations because those six are chrome and
render on all 114 routes. The remainder does not concentrate that way:
`/program`'s 49 sub-floor sites are 49 **distinct elements on one page**, not
one element seen 49 times. Each fix buys ~2 instances (EN + ZH), not 114.

So Wave 4's remainder is exactly what the completion plan called it — *"a
design pass, not a mechanical fix"* — and it cannot be shortcut by extraction.
A sitewide scan found 16 declarations that are both sub-floor and label-shaped;
**four** were clean fits for `variant="column"` (`--text-accent` *is*
`--label-color`, so colour is unchanged) and were migrated. The other twelve
carry an opacity, a different colour token, or their own background. Forcing
them would be the catch-all mistake.

## Step 3 · `section-label` triage — the answer is "build nothing"

The completion plan expected "at least four jobs" in the 97-instance residue.
**There are seven**, and most are not labels at all:

| Job | Count | Verdict |
|---|---|---|
| Form field-group labels (`ConsultForm`) | 6 | Already consistent at 0.12em. A 4th variant for a 0.02em delta is not worth it |
| Blog taxonomy | 10 | **The plan's own suggestion does not survive inspection** — these are filter *buttons* and single card labels, not middot runs, so `TagRun` (D70) is the wrong home |
| Route-path hints (`/methodology`, `/compare`) | 4 | Decorative, not labels |
| Age-band cross-links | 3 | **Links**, not labels |
| Timeline markers ("Minute 0–5: Assessment") | 5 | Page-specific structure |
| Testimonial attributions | 3 | Attributions, not labels |
| Genuine one-off eyebrows | ~66 | Correctly hand-rolled |

**Recommendation: no further component work.** The residue is mostly correctly
hand-rolled one-offs, and a component that absorbed them would become the next
`section-label`.

## Step 4 · Copy — canon applied where settled

Four LCS spellings fixed mechanically per §09 (2026-06-01): `zh:220` heading →
`语言循环体系`; `zh:354`, `zh:1636`, `zh:1751` body → `The LCS`.

The **footer §06 breach** is closed. Its program column labelled
`/methodology` "The Loop" / "The Loop 闭环" on all 116 routes. Now "DODO
Method" / "DODO 教学系统", matching the navbar — one destination, one label, no
third name.

---

## Drift sweep — two real, one false alarm

**1 · D93 stated a wrong number, and I wrote it.** It approved MCT being named
*"four times"* on `/methodology` and enumerated four. A full object walk finds
**seven** — `meta.description`, `hero.subheading` and
`sessionTypes.types.0.body` were missed because the original figure came from a
grep over selected keys rather than the whole surface. **The ruling stands** —
it was approved on the principle, and all seven do distinct jobs — but the
entry is amended, because a decision log carrying a wrong number is the exact
thing this repo keeps having to repair.

**2 · I enforced a rule on new work that shipped copy was breaking.** D92's
glossary bars `学习循环` for The Loop, and I held 52 new keys to it — while
`zh:425` shipped `同一个 The Loop（学习循环）` **in an h2**. Gloss removed.

**3 · False alarm.** My §07a probe flagged "ELL" in the research block. It was
matching case-insensitively and catching **sp-ELL-ing**. The register is clean:
no *struggling*, *remedial*, *catch up*, *gap*, or *dyslexia* framing anywhere
in it.

Also verified clean: the retired tagline appears **zero** times anywhere; the
one surviving `not X — but Y` reversal is the deliberate one logged in D92; no
fragment-stacking or superlative certainty in any of today's new copy.

---

## Open — and why each is open

**Needs your ruling** (one decision covers all three, they are the same shape —
*where is the line between a header and body copy?*):

1. `zh:279` — a **link label** reading `认识 The LCS 系统`
2. `zh:346` — a **meta description** using `LCS 教学理念`
3. **23 body-copy uses of `学习循环`** in `marketing.zh.js`

**Needs facts I do not have:** `/faq` pricing verification. The figures are
internally consistent (weekly × 16 ≈ lump sum on all five tiers). Two things
surfaced while listing them: **no currency is named anywhere** despite serving
CAD and USD cities, and **Flex 3 is called "GPA tutoring" / "GPA 辅导课"**,
which works against the price anchor per §10.

**Debts, recorded not hidden:**

- **Deep-lavender scale.** `--lavender-deep-10` names one step of a scale that
  does not exist — the deep lavender runs at eight free-rounded alphas across
  three components. Rounding them onto a real scale moves live pixels in three
  files and needs its own verification pass.
- **14 dead utility classes** (26% of the custom utilities): the eight
  `delay-*`, plus `elevated`, `divider-center`, `accent-top-gilt`,
  `check-list`, `hairline`, `layout-sidebar`. Declared, referenced nowhere,
  correctly purged. Deleting them is safe but is a judgment about whether the
  `delay-*` set is reserved for future animation work.

**Deferred by you and untouched:** `/compare` founder video, `compare.s8`
testimonials, Ms. Kimberly's bio, Wave 6 admin, Wave 7.

---

## The through-line

Three times today a **measurement was wrong in a way that flattered the work**:
`type-floor` reported 329 instead of 671 because the styles it counted had been
purged; the first purge guard passed because its failure condition was
unreachable; and D93 recorded four MCT namings where there are seven.

None was caught by a guard. Each was caught by a number not matching a number
it should have matched. That is the argument for keeping the ratchets honest
and for writing predicted figures down **before** measuring — twice today the
prediction is the only reason the error surfaced.
