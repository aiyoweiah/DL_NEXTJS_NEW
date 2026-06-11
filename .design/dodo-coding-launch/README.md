# DODO Coding launch — folder index

**Workstream:** Add DODO Coding as a co-equal sister track to DODO Learning ELA, hosted at `/coding/*` under dodolearning.com. Inherit chrome (navbar / footer / PreCtaBand / funnel ladder / tokens). Diverge intentionally on Loop verbs, pillar list, and a single accent color.

**Status:** Strategy + IA proposal staged. **No live files have been edited.** Per the content apply-gate, every change is staged in this folder. The user must give an explicit "apply" trigger before any of these land.

**Started:** 2026-06-09

## Source docs

- `F:\PC-Documents\DODO_Coding\marketing\dodo-coding-content-guide.md` — marketing guide v1.0 (brand spine, Copy blocks, page-by-page guide)
- `F:\PC-Documents\DODO_Coding\curriculum\program-streams-v1.md` — curriculum streams v1.0 (Beginner B1–B4 / Intermediate I1–I6 / Advanced A1–A4)

## Reading order

1. **`01-PROPOSAL.md`** — Launch IA proposal: route plan, page-by-page launch-vs-defer call, chrome touch-points, what the user will see change. Read this first.
2. **`02-THEME.md`** — Token addendum: second-accent decision for DODO Coding surfaces, Loop graphic spec, pillar icon system. Produced via the `interface-design` skill.
3. **`03-SCAFFOLD.md`** — Per-route skeleton plan for `app/[locale]/coding/*` with placeholder Copy blocks lifted from the marketing guide.
4. **`04-COPY-PASS.md`** — `dodo-content-writer` pass on `/coding` homepage Copy blocks, ZH mirror, anti-dictionary lint.
5. **`05-NAMING-ALTERNATIVES.md`** — **SUPERSEDED (2026-06-09).** User redirected away from the four-phase-Loop architecture entirely. New direction: DODO Coding as **a language art** that teaches **how AI reads, thinks, and writes**, with **critical thinking** as the human discipline emphasized throughout. No methodology name (no Loop / Arc / Protocol). No fourth verb. Kept as decision-history record only.
6. **`06-LOOP-SUBSTANCE-EXTRACTION.md`** — Archive of what The Loop was doing for the brand (five distinct jobs), preserved as source material for whenever the user designs a replacement asset. Not a proposal. Forward-looking reference.
7. **`07-MARKETING-GUIDE-REVISION.md`** — Redline proposal for `dodo-coding-content-guide.md` v1.0 → v1.1: retire The Loop from parent-facing surfaces, rewrite brand-promise / tagline / §3 / hero / OG / visual direction. Pending user "apply" trigger.
8. **`08-CURRICULUM-DOC-REVISION.md`** — Redline proposal for `program-streams-v1.md` v1.0 → v1.1: drop "Loop emphasis" field per cycle, rename §1.1 and §7, swap Reason→Think and Speak→Write throughout. Substance unchanged. Pending user "apply" trigger.

## Pending (on user "apply")

- `09-APPLY.md` — Per-step apply log with `npx next build` checkpoints + ZH/EN parity confirmations. Written *during* the apply, not before. Sequenced under Proposal A: `program-family-parallel` ships first; `/coding` second.

## Guardrails

- **Content apply-gate:** never edit `content/marketing.{en,zh}.js`, `content/faq.js`, `lib/schema.js`, `public/llms.txt`, or any `app/[locale]/**` page until the user says "apply". Same gate covers the two source docs at `F:\PC-Documents\DODO_Coding\marketing\dodo-coding-content-guide.md` and `F:\PC-Documents\DODO_Coding\curriculum\program-streams-v1.md` — the v1.1 redlines staged in 07 / 08 do not get written to source until user trigger.
- **Bilingual parity:** every EN proposal carries a ZH mirror in the same doc.
- **Funnel ladder + PreCtaBand SUPPRESS list + flat-6 navbar + no-dropdown rules** from `.interface-design/system.md` are inviolable.
- **Co-existence with program-family-parallel:** that workstream is mid-flight. Under Proposal A (sequential), PFP applies first; `/coding` applies second in a separate window. The chooser-rename and third-card overlap is resolved by not extending AgeBandChooser at all (DODO Coding gets its own band on the home page instead).
- `next build` must stay clean before any apply locks.
