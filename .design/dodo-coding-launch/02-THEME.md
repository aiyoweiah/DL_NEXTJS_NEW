# Theme — DODO Coding token addendum

**Date:** 2026-06-09
**Status:** No live files edited. Apply on user trigger.
**Authored via:** `interface-design` skill
**Canonical system:** `../../.interface-design/system.md` (do not duplicate — this doc only *adds*)
**Source constraints:** Marketing guide §11 (visual & UX direction), §2.2 (anti-patterns), §11.3 (what does not change)

> 📌 **DIRECTION LOCKED (2026-06-09):** No four-phase Loop graphic. No fourth-verb wordmark. DODO Coding is positioned as **a language art** that teaches **how AI reads, thinks, and writes**, with **critical thinking** as the human discipline emphasized throughout. The `--ink` accent decision in this doc is preserved but **repurposed**: it is now the color of the human discipline (critical thinking) — applied as a thin emphasis treatment in a small set of named places, not as a Decide/Discern wordmark. The Loop graphic spec section below is retired; in its place is a simpler "Critical-thinking emphasis treatment" section.

---

## In one paragraph

DODO Coding inherits **every** decision from the canonical system: tokens, surface-color-shift depth strategy, low-opacity lavender borders, button accessibility rules, section spacing protocol, type ramp, container width, button shapes. **One addition: a single new accent — `--ink` — used in a small, named set of places to mark where the *human's critical thinking* is the subject of the section.** The three machine verbs (Read · Think · Write) render in body-text color when displayed as a triplet — they are *what is taught*, not a branded sequence. Nothing else changes. The premium register is held by restraint, not novelty.

---

## What is NOT changing

Locking these explicitly so the apply doesn't drift:

- Tokens `#0E0E12`, `#212830`, `#F5F5FF`, `#b7b5fe`, `#7c79e8`, `#5856cc`, `#F5C842`, `#3D4452`, `#7B8494`, `#94A3B8` — all preserved, all used identically
- The button system (`btn-charter` / `btn-primary` / `btn-ghost` / `btn-outline` / `btn-gilt`) — no new variants, no DODO-Coding-only CTA color
- Surface-color-shift + low-opacity lavender border depth strategy — no shadows introduced
- Type ramp + display face — no monospace headlines, no new display weight
- `container-section`, `var(--section-md)`, breakpoints, radius scale, padding symmetry — all inherited
- Funnel ladder (Watch soft / Consult firm / Assessment never a CTA) — inherited verbatim
- `PreCtaBand` SUPPRESS list — `/coding/consult` joins the list (mirrors `/consult`)
- Bilingual parity rule + content apply-gate

If a future contributor reaches for a "DODO Coding only" surface color, button color, or shadow treatment, it is wrong by construction.

---

## What IS new — the `--ink` family

A scholarly desaturated blue, parallel in structure to the existing lavender family. Three tiers, named like the lavender family is named (`#b7b5fe` light / `#7c79e8` AA-on-light / `#5856cc` deep).

### Tokens

| Role | Token | Hex | Where used | Parallel in lavender family |
|---|---|---|---|---|
| Ink — accent on dark | `--ink-bright` | **`#7AA8E0`** | Decide phase glyph on dark hero; AI4K12 Big Idea 5 mark on dark | `#b7b5fe` |
| Ink — AA-safe text on light | `--ink` | **`#1F4E8C`** | Decide phase glyph on light; pillar-icon tick; override-condition callouts on `/coding/program` | `#7c79e8` |
| Ink — deep emphasis | `--ink-deep` | **`#143D6E`** | The single heaviest typographic instance per page — the Loop's "Decide" wordmark | `#5856cc` |

### Naming rationale

The CSS variable name is design. The skill calls this out: `--ink` evokes a world; `--blue-2` evokes a template. **Ink** names the writing/scholarship/Toulmin-map/handwritten-margin-note world DODO Coding lives in. It also resonates with the Loop's teaching: Decide is what humans do, and humans decide by writing — by ink. It parallels how `lavender` reads as a meaningful name in ELA's world rather than a hex slot.

If a future contributor proposes renaming to `--blue` or `--accent-2`, push back. The semantic name is load-bearing.

### Accessibility checks (WCAG AA: text ≥ 4.5:1, boundary ≥ 3:1)

| Combination | Contrast | Verdict |
|---|---|---|
| `#1F4E8C` on `#F5F5FF` | **~7.8:1** | Passes AAA. Use freely as text. |
| `#143D6E` on `#F5F5FF` | **~10.2:1** | Passes AAA. Reserve for the single heaviest typographic instance per page — the "critical thinking" callout heading. |
| `#7AA8E0` on `#0E0E12` | **~8.2:1** | Passes AAA. Use as accent text on dark sections only. |
| `#1F4E8C` on `#0E0E12` | ~3.1:1 | **Fails AA for text.** Never use as text on dark. Same rule the system enforces for `#b7b5fe` on light. |
| `#7AA8E0` on `#F5F5FF` | ~2.6:1 | **Fails.** Never as text on light. |

This mirrors the existing surface-specific rule: each tier has one surface where it works as text. Document it the same way the canonical system does.

### Where `--ink` may appear (the exhaustive list — do not extend without a design decision)

1. **The "critical thinking" section eyebrow + heading** on `/coding` and `/coding/methodology`. Eyebrow in `--ink`; H2 in `--ink-deep`. This is the page's "human discipline" anchor and the heaviest typographic instance of `--ink-deep` per page.
2. **The pillar-icon tick.** A single 2px underline in `--ink` (light) / `--ink-bright` (dark) below each pillar icon — the "we cite this source" mark. Body of each icon stays in body-text color.
3. **AI4K12 Big Idea 5 (Societal Impact) — the "human Big Idea."** Where the five Big Ideas are displayed in a row, four render in `#3D4452` and the fifth renders in `--ink`. Quiet visual cue that Big Idea 5 is the human's.
4. **Override-condition callouts on `/coding/program`** (e.g., advanced cycle A3 "when should the human stop the agent?"). A short callout block with `--ink` as the left rule border.
5. **The three-machine-verb display** — body-text color for the verbs themselves; a thin `--ink` underline rule beneath the section's caption ("…and your child learns to think critically about it") to visually anchor where the human's discipline begins.
6. **The DODO Coding band on the ELA home page (`/`).** Eyebrow ("ALSO FROM DODO LEARNING") in `--ink`; sub-heading ("A language art for the AI age.") in `--ink-deep`; the "Critical thinking" half of the preview strip in `--ink`. **This is the only place `--ink` appears on an ELA surface** — the color itself becomes the brand cue that signals "this is the other discipline."

That is the full list. **Six places.** Item #6 is the only ink-on-ELA-surface appearance; items #1–#5 all live on `/coding/*`. If the count grows past six, the signature dilutes and you've defaulted. None of these is a four-phase Loop graphic.

### Where `--ink` may NOT appear

- Body text — uses `#3D4452` (light) / `#F0F0F0` (dark)
- Eyebrows — use `#7c79e8` (light) / `#b7b5fe` (dark), unchanged from canonical
- Buttons — no `btn-ink` variant. CTAs stay in the inherited button system.
- Borders — use the existing low-opacity lavender border family
- Section backgrounds — no `section-ink`. `/coding/*` uses the same `section-light` / `section-tinted` / dark surfaces the rest of the site uses.
- Footer / Navbar / PreCtaBand — chrome stays untouched
- Form controls, inputs, focus rings — all inherited

---

## The three-verb display (replaces the prior Loop graphic spec)

No four-phase Loop graphic. The three machine verbs render as a plain typographic triplet in body copy — they are the *subject matter* of the curriculum (what we teach about), not a branded sequence with its own owned graphic asset.

### Display treatment

```
                       (body H2 — what we teach)
                       We teach how AI reads, thinks, and writes.

                       (three-verb triplet, inline, body-text color)
                       Read    Think    Write
                       ─────   ──────   ──────

                       (eyebrow — handing off to the human discipline)
                       AND THE HUMAN DISCIPLINE THAT ANCHORS IT ALL

                       (H2 in --ink-deep, the page's heaviest ink instance)
                       Critical thinking.

                       (body caption, muted)
                       Throughout every session, your child learns to question
                       what AI says, verify it, and decide when not to trust it.
```

Specifics:

- **Three verbs (Read · Think · Write)** rendered in body-text color (`#3D4452` light / `#F0F0F0` dark), weight 600, the same display face as the H2. Each verb gets a thin underline rule at the same color. Spaced evenly with `gap-x-8` on the inline row.
- **No arrows between verbs.** A sequence-implication is *not* the brand promise here. These are three things AI does, listed as a triplet.
- **No vertical rule** between the three machine verbs and the critical-thinking heading. The two sections are separated structurally (eyebrow + H2 break the row), not by a forced visual divider.
- **Critical thinking heading** in `--ink-deep` (light) / `--ink-bright` (dark), weight 700, slightly larger than the other body H2s on the page. This is the page's heaviest typographic instance of `--ink-deep`.
- **A thin 2px `--ink` rule** sits below the critical-thinking caption — the only place on the page where ink appears as an underline emphasis. Quiet visual anchor that "this is the human's part."

### What this display must NOT be

- ❌ A four-phase graphic with a separate fourth verb (Decide / Discern / Judge / Check) — that architecture is retired
- ❌ A named asset that gets its own owned-vocabulary name ("The Loop" / "The Arc" / "The Protocol") — there is no methodology name on `/coding/*`
- ❌ Arrows between the three verbs — they are a triplet, not a sequence
- ❌ A circular wheel, infinity loop, or pipeline metaphor — none of those apply
- ❌ Animated, gradient-filled, glow-effected — §11 restraint applies
- ❌ A cross-link to ELA's Loop graphic — the two products no longer share a four-verb visual language; the cross-sell is verbal (the "language art" framing), not visual

---

## Pillar icons spec

Four pillars from marketing guide §4 + curriculum §1.2:

1. **AI4K12 Five Big Ideas** — five small squares in a row (the Big Ideas), with the fifth in `--ink`
2. **Carnegie Mellon CS Academy** — bracket-and-step glyph (the academic-credential register)
3. **AI Engineering (Huyen)** — book spine glyph (the textbook signal)
4. **mBot Neo / Makeblock** *(optional pillar, shown only on `/coding/program`)* — a small geometric robot frame (NOT an anthropomorphic robot — §11.2 explicit). The simplest possible 2D outline.

Treatment for all four:

- Monoline, 1.5pt stroke, ~32px container, no fills
- Body of each icon: `#3D4452` (light) / `#F0F0F0` (dark)
- The "we cite this source" tick: a 2px underline in `--ink` (light) / `--ink-bright` (dark), appearing below the icon
- Sit in a 4-up grid, equal-weight, container `rounded-lg`, border `rgba(183,181,254,0.10)`, no background fill — same as how other icon grids on the site read

Logos: marketing guide §11.2 + §12-item-6 — "official marks (CMU, AI4K12, Anthropic, Google, Makeblock, O'Reilly) — usage rights." Use the open-source-friendly text + monoline glyph until logo licensing is cleared. Do not ship official marks without legal sign-off.

---

## Surfaces & section pattern for `/coding/*`

Honoring the v6.2 section-spacing protocol from canonical (`system.md` lines 117–138): two adjacent same-surface sections may not share both `--section-md` padding AND the same background.

Suggested section sequence for the six launch pages + the new DODO Coding band on the ELA home.

### DODO Coding band on ELA `/` (NEW — for the ELA home page)

A self-contained section that introduces DODO Coding without breaking the ELA home page's voice. Placed between "Navigator is a map" and the closing call.

```
Section surface             — light (#F5F5FF), full-bleed within container-section

EYEBROW                     — `--ink` color, eyebrow type scale, uppercase
                              "ALSO FROM DODO LEARNING"

H2                          — body-text color, display face, weight 700
                              "DODO Coding"

SUB                         — `--ink-deep` color, slightly heavier than body
                              "A language art for the AI age."

BODY                        — body-text color
                              "We teach how AI reads, thinks, and writes.
                               We teach your child to think critically about it."

CTA                         — btn-outline (light-surface secondary)
                              "Visit DODO Coding →" → /coding

PREVIEW STRIP               — small typographic strip, body-text color + ink
                              "Read · Think · Write  ·  Critical thinking"
                              (where "Critical thinking" renders in --ink)
```

This is the first appearance of `--ink` on any ELA home page. The color carries the brand cue: "this is the other discipline." No new component — implemented as inline JSX inside the home page file.

Adheres to v6.2 spacing protocol: the preceding section (Navigator-is-a-map) is on `#F5F5FF`; the band is also light surface. To avoid back-to-back same-surface section air, the band uses `paddingTop: 0` on the container or alternates to a tinted background. Designer's call at apply time.

### `/coding` home

```
Hero                       — dark canvas (#0E0E12)         — H1 + subhead + twin CTAs, light text
Who We Are                 — light surface (#F5F5FF)
What We Teach              — tinted (#EAEAF8)              — three-verb display + critical-thinking heading
The Four Pillars           — light surface                 — pillar icon grid (no mBot)
How It Works               — tinted                        — Before / During / After (three phases)
Cross-sell to ELA          — light                         — verbal parallel, secondary outline CTA → /program
[footer PreCtaBand is shown — page does NOT own a closing CTA, leads soft per system.md]
```

### `/coding/methodology`

```
Hero                       — dark canvas                   — "A language art for the AI age."
What we teach              — light                         — three-verb display + caption
Critical thinking          — tinted                        — heading in --ink-deep, explanatory body, override-condition examples
The grounding              — light                         — AI4K12 + CMU CS Academy long-form, citation language
The Four Pillars           — tinted                        — pillar icon spec, full set
Closing CTA                — light                         — btn-charter → /coding/consult
[/coding/methodology added to PreCtaBand SUPPRESS list]
```

### `/coding/program`

```
Hero                       — dark canvas                   — "Sixteen weeks. Measurable. One Navigator."
What's included            — light
The progression            — tinted                        — 16-week sequence visualization (NOT a verb graphic — a week-by-week phase visualization tied to curriculum doc §1.4)
Three streams              — light                         — Beginner / Intermediate / Advanced cards
Tools your child uses      — tinted                        — Pillars component with mBot pillar visible
Assessment & reporting     — light
Closing CTA                — dark band                     — btn-charter → /coding/consult
[/coding/program added to PreCtaBand SUPPRESS list]
```

### `/coding/about`

```
Hero (dark)                — DODO Coding's origin/identity story (NOT ELA's)
Why we exist (light)       — the AI-era thesis: machine literacy as a language art
What sets us apart (tinted) — the Navigator model, the open pillars, the 1-on-1 promise
Founder note (light)       — short paragraph from the founder, signed
Closing CTA (tinted)       — btn-charter → /coding/consult
[/coding/about added to PreCtaBand SUPPRESS list]
```

### `/coding/faq`

Standalone — not a category in the shared `/faq`. Single-column accordion pattern (matches ELA `/faq` shape so the chrome reads consistent), but populated only with DODO Coding questions.

```
Hero (dark)                — "Questions families ask about DODO Coding"
FAQ list (light)           — accordion, organized into 3–4 categories (e.g. The Method · The Curriculum · Logistics · Pricing)
Closing CTA (tinted)       — btn-charter → /coding/consult, "More questions? Talk to a Navigator."
[/coding/faq added to PreCtaBand SUPPRESS list]
```

### `/coding/consult`

Mirrors `/consult` *structurally* but does not link to or from it. Inherits the page-owns-close pattern. Added to SUPPRESS list.

---

## Open theme decisions

| # | Decision | Recommendation | Notes |
|---|---|---|---|
| 1 | Exact ink hex — `#1F4E8C` proposed | Lock pending a side-by-side preview against `#7c79e8` and `#F5C842` on a real page render | Easy to dial 1–2 lightness steps after seeing it in context |
| 2 | mBot pillar — show only on `/coding/program` or also on `/coding/methodology`? | `/coding/program` only — it's the optional-add-on signal | Keeps methodology page focused on the four core pillars |
| 3 | Toulmin map illustration — ship or defer | Defer to copy-pass — only render if `/coding/methodology` copy explicitly references it | Don't introduce an illustration the copy doesn't earn |
| 4 | Dark-mode pages — does any `/coding/*` page need a dark surface beyond hero + closing band? | No. Pattern stays identical to ELA pages. | Consistency over novelty |
| 5 | The three-verb display — full-width hero section on `/coding` or sub-section under "What we teach"? | Sub-section under "What we teach" — the language-art framing is the brand promise, not the triplet itself | The verbs explain the offering; they don't replace the H1 |

---

## Check — running the skill's tests on this proposal

- **Swap test:** If we swapped `--ink` for a generic tech-blue (`#0066CC`) and rendered the "critical thinking" heading in it, the scholar-ink resonance is lost and the heading reads SaaS-corporate. The choice is load-bearing — passes.
- **Squint test:** Blur the home page. Lavender chrome still dominates; gold CTA still anchors the action; ink appears only as the critical-thinking heading + pillar ticks + AI4K12 Big Idea 5 mark. Whisper-quiet, hierarchy preserved — passes.
- **Signature test:** Five named places — critical-thinking heading, pillar tick, AI4K12 Big Idea 5, override-callout, three-verb-display underline. Each pointed-to specifically — passes.
- **Token test:** Read out loud: "lavender, gilt, ink." Belongs to a brand about scholarly literacy that takes machines seriously. Doesn't belong to any project — passes.

---

## Apply order for theme

When this workstream apply lands:

1. Append `--ink` family to `app/globals.css` `:root` block, alongside lavender tier vars
2. Append `--ink-deep` to the dark canvas `:root` block where dark-surface vars live
3. Add an `.ink` utility class (text only) — `color: var(--ink)` — for use in MDX/markdown rendered content
4. Build the Pillar grid component: `components/ui/coding/Pillars.jsx` accepting an array of pillars and a `surface` prop
5. The three-verb display is inline styling inside page files — no dedicated component. (One less component than the prior plan; less code, less surface to maintain.)
6. Place the Pillars component ONLY under `/coding/*` page imports for v1; do not expose to other pages
7. Visual QA pass: render `/coding/methodology` and squint-test against `/methodology` side-by-side. Adjust ink hex by 1–2 lightness steps if the ink reads too cold next to the lavender

---

*End of 02-THEME.md. Next: `03-SCAFFOLD.md` — per-route skeleton plan.*
