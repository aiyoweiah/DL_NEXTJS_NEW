# `Label` — proposed variant set (Wave 3 · copy → apply gate)

Derived from the nine label declaration sites in `Footer.jsx` and `Navbar.jsx`,
not from taste. Nothing applied.

---

## The nine sites, as they actually are

**`Footer.jsx`** — light ground, `--label-color` (#5856cc, 5.36:1)

| Line | What it labels | Size | Wt | Tracking | Case | Repeats |
|---|---|---|---|---|---|---|
| 57 | "Coming soon" chip on the sibling link | **10px** | 600 | 0.05em | upper | ×1 / route |
| 111 | Column headers — Programs · Resources · Serving | 12px | 600 | 0.1em | upper | ×3 / route |
| 166 | Brand tagline | 12px | 600 | 0.025em | — | ×1 / route |
| 178 | "The DODO Family" | **10px** | 600 | **0.12em** | upper | ×1 / route |
| 278 | Signal label | 12px | 600 | — | — | varies |

**`Navbar.jsx`** — dark ground

| Line | What it labels | Size | Wt | Tracking | Case | Repeats |
|---|---|---|---|---|---|---|
| 290 | Submenu item title | 14px | 600 | −0.005em | — | ×3 / route |
| 298 | Submenu descriptor (desktop) | **11px** | 500 | 0.04em | — | ×3 / route |
| 350 | Mobile group header | **11.2px** | 600 | 0.1em | upper | ×1 / route |
| 364 | Submenu descriptor (mobile) — "· Grade 3+" | **11px** | — | 0.04em | upper | — |

**Bold = below the 12px floor.** Those six bold rows are precisely the
per-route signature `type-floor` found on all 114 routes: 1× `text-[0.7rem]`,
3× `0.6875rem`, 2× `text-[10px]` = **684 of the 1,013**.

### The drift this confirms

`conformance` flagged `"Programs"` / `"课程"` as carrying two spellings. Here it
is: **Footer 111 renders a column header at 12px/`text-xs`, Navbar 350 renders
the same conceptual header at 11.2px/`text-[0.7rem]`.** Same job, two sizes,
two files. That is what a component prevents and a class does not.

---

## Proposed: three variants and a `dark` prop

`Eyebrow` is the precedent — same shape, same `dark` prop, same reasoning
(D57: a class does not stop a tenth private copy; a component does).

```jsx
<Label variant="column" dark>Programs</Label>
<Label variant="qualifier" dark>· Grade 3+</Label>
<Label variant="pill">Coming soon</Label>
```

| variant | Job | Replaces | Size | Wt | Tracking | Case | Colour |
|---|---|---|---|---|---|---|---|
| **`column`** | Heads a group of links | Footer 111 · Footer 178 · Navbar 350 | 12px | 600 | 0.1em | upper | `--label-color` / `-dark` |
| **`qualifier`** | Descriptor bound to an item | Navbar 298 · Navbar 364 | 12px | 500 | 0.04em | none | `--platinum-60` |
| **`pill`** | Status chip with its own ground | Footer 57 | 12px | 600 | 0.05em | upper | `--label-color` on `lavender-10` |

Three variants, six sites — and those six are exactly the six that repeat
sitewide. `--label-color` and `--label-color-dark` already exist and are
commented *".eyebrow on light / on dark"*, so the component adopts the colour
vocabulary rather than inventing one.

### Deliberately out of scope

| Site | Why not |
|---|---|
| Footer 166 — brand tagline | This is D36's locked tagline, and **D79 already built its home**: `.eyebrow.sentence-case`, created precisely to exempt it from uppercase. It belongs to `Eyebrow`, not here. |
| Footer 278 — signal label | 12px semibold, no transform, no tracking. That is body emphasis wearing the word "label". Not a label. |
| Navbar 290 / 360 — item titles | 14px and 16px nav link text. Not labels. |

Keeping these out is the point: a component that absorbs everything
label-shaped becomes the next catch-all, which is how `section-label` ended up
holding 79 unrelated strings.

---

## The decision inside this: do we hold the 12px floor?

**The two waves are separable, and it is worth being explicit about that.**

- Building the component **fixes Wave 3** — 798 hand-rolled instances (65% of
  1,230) collapse to three call sites. This is pure win, no visual change.
- **Raising the six sub-floor sites to 12px fixes Wave 4's 684** — and that
  *is* a visual change, the "design pass, not a mechanical fix" the completion
  plan warned about.

You can take the first without the second.

### What actually changes if we hold the floor

| Site | Now | At 12px | Effect |
|---|---|---|---|
| Navbar 298/364 — "· Grade 3+" | 11px under a 14px title | 12px under a 14px title | **The real one.** Ratio 14:11 → 14:12. The descriptor is meant to read as subordinate; it gets closer to its parent. |
| Navbar 350 — mobile group header | 11.2px | 12px | Negligible (+0.8px) |
| Footer 57 — "Coming soon" | 10px | 12px | Chip grows ~20%; it sits inline next to a link, so it will read louder |
| Footer 178 — "The DODO Family" | 10px | 12px | Grows into the column-header size it already behaves like — arguably a fix, not a cost |

Note that **12px is this project's own floor, not a WCAG requirement** — WCAG
sets no minimum font size. Contrast is separately fine at all six sites
(`--platinum-60` is AA everywhere by its own token comment; `--label-color` is
5.36:1).

### Three ways to go

| | What | Type floor | Risk |
|---|---|---|---|
| **A** | Component **+ hold 12px** on all six | 1,013 → **329** | One real change (the nav descriptor ratio) |
| **B** *(rec.)* | Component + hold 12px on five, keep **`qualifier` at 11px** | 1,013 → **~443** | None visually; leaves 342 nav descriptors below floor as a *stated, logged exception* rather than drift |
| **C** | Component only, no size change | 1,013 → 1,013 | None; Wave 4 stays entirely open |

**I recommend B.** It takes the free 342, keeps the one deliberate typographic
relationship intact, and — importantly — converts the remaining sub-floor sites
from *unexamined drift* into *one logged exception with a reason*. That is the
difference the guards exist to enforce. A is defensible if you would rather the
floor be absolute; say so and I will do A.

---

## Then what

Wave 3's other three families are untouched by this and are separate calls
later: `framework` (160 instances, the Loop's four step names — zero drift,
brand canon, arguably should *stay* hand-rolled and be left alone),
`proof-axis` (34, on D74's sanctioned proof device), and `section-label`
(97 across 79 strings — the genuine catch-all, which the completion plan
already says holds at least four different jobs and needs its own triage).

**Say apply, and which of A / B / C.**
