# Proposal — DODO Coding launch IA

**Date:** 2026-06-09
**Status:** No live files edited. Apply on user trigger.

> 📌 **DIRECTION LOCKED (2026-06-09):** DODO Coding is positioned as **a language art** that teaches **how AI reads, thinks, and writes**, with **critical thinking** as the human discipline emphasized throughout. **No methodology name** (no Loop / Arc / Protocol). **No fourth verb** (no Decide / Discern). Three machine verbs (Read · Think · Write) appear in body copy as a triplet; critical thinking is the layered human emphasis, not a phase. References to "The Loop" / "the Loop graphic" elsewhere in this doc are stale — interpret them as "the three-verb display" / "the what-we-teach section."
**Source docs:** `F:\PC-Documents\DODO_Coding\marketing\dodo-coding-content-guide.md` (v1.0), `F:\PC-Documents\DODO_Coding\curriculum\program-streams-v1.md` (v1.0)
**Companion docs:** `02-THEME.md` (next), `03-SCAFFOLD.md`, `04-COPY-PASS.md`

---

## In one paragraph

Add **DODO Coding** as a co-equal sister track to DODO Learning ELA, served at `/coding/*` under the existing dodolearning.com Next.js app. Ship **4 pages at launch** — home, methodology, program, consult — and stage **3 more** (navigators, results, demos) for after the first pilot cohort produces real proof. Inherit the chrome — navbar, footer, PreCtaBand, funnel ladder, tokens — and diverge on one accent color so the family parallel reads visually without fracturing the brand. The navbar primary item "Programs" (already proposed in the program-family-parallel workstream) becomes the umbrella for three programs at first user contact: **Little DODO (5–8)**, **ELA Program (Grade 3+)**, **DODO Coding (Grade 3+)**.

---

## Why subdir, not subdomain

Discussed with user 2026-06-09. Recap:

- The marketing guide explicitly recommends `/coding` (§7).
- A subdomain would fragment SEO equity right when the `program-family-parallel` work is consolidating it.
- A subdomain would contradict the "co-equal sister tracks under one parent brand" thesis (marketing guide §1.1).
- A subdomain would force a second Next.js deploy, second Cloudflare Pages project, second analytics boundary.
- A subdir lets DODO Coding inherit the chrome on day one and lets cross-sell to ELA / Little DODO be a same-origin link.

**Decision: ship as `/coding/*` subdir under the existing app.**

---

## Pages — launch vs defer

### Launch (Day 1, pre-cohort)

Per the separation directive (2026-06-09): DODO Coding lives as its own vertical. Each launch page is **built standalone**, with **no cross-references back to or from ELA pages** (chrome and the one-way home cross-sell are the only exceptions — see "What stays shared" below).

| Path | Why ship now |
|---|---|
| `/coding` (home) | Full marketing surface. The spine of the launch. Hero, Who-We-Are, What-We-Teach (the three machine verbs + the human critical-thinking emphasis), How-It-Works, Cross-sell to ELA (one-way), Footer. |
| `/coding/about` | DODO Coding's identity story is not ELA's. Built standalone. |
| `/coding/methodology` | How AI reads, thinks, and writes, taught through the AI4K12 framework and CMU CS Academy; how your child practices critical thinking throughout. |
| `/coding/program` | The 16-week structure, three streams (Beginner B1–B4 / Intermediate I1–I6 / Advanced A1–A4), pillar list, tool stack, assessment cadence. |
| `/coding/faq` | DODO Coding's FAQ, standalone — not a category inside the shared `/faq`. |
| `/coding/consult` | The primary CTA destination. Operationally shares the same consult pipeline as ELA; the page lives separately and does not link to or from `/consult`. |

### Defer until populated

| Path | Defer because | Surface a placeholder on `/coding`? |
|---|---|---|
| `/coding/navigators` | Requires ≥3 Navigator bios with credentials (CMU CS Academy facilitator status, AI4K12 competency). Built standalone when unlocked — DODO Coding Navigators are not added to the shared `/navigators`. | Yes — single Navigator card in `/coding` Section 3 ("Who We Are") until then. |
| `/coding/results` | Requires first pilot cohort to exit week 16 with real AI4K12 + CMU CS Academy numbers. Built standalone when unlocked — no link to ELA's `/results`. | Yes — "Results coming after first cohort" tile with the metric definitions and the AI4K12 / CMU CS Academy citations visible. Sets the credibility frame without faking proof. |
| `/coding/demos` | Requires a real recorded demo class. Built standalone when unlocked. | Yes — "Watch demo" CTA surfaces but routes to `/coding/consult` with a note "demo class scheduled live with a Navigator during consult." |

**Result: 6 launch pages, 3 staged additions.**

### Built only when needed (not on the deferred-with-placeholder list)

The following routes are not in the launch scope and not in the cohort-unlock scope. They are built only if and when DODO Coding has a clear need for them; until then, they don't exist and don't have placeholders:

- `/coding/blog` — DODO Coding may want long-form content eventually; not at launch
- `/coding/cities/*` — DODO Coding is online-only and globally-mobile; city pages don't add value
- `/coding/compare` — comparative positioning may want to exist later; not at launch

### Explicitly NOT shipping

- No cross-callouts on ELA pages pointing to DODO Coding. ELA's `/methodology`, `/results`, `/faq`, `/cities/*`, `/about`, and `/navigators` stay ELA-focused.
- No third card in `AgeBandChooser`. The component stays a 2-card pattern, unchanged from what `program-family-parallel` is shipping. **DODO Coding gets its own band on the ELA home page** (see "Home page" below).

---

## What a visitor will see change

### Navbar

The `program-family-parallel` workstream already renames the primary nav item from "ELA Program" → **"Programs"**. We piggy-back on that single change. **No additional nav slot for DODO Coding.** The expansion happens inside `/program` and on the home page via the program chooser (see below), not in the chrome.

If `program-family-parallel` has not landed by the time we ship `/coding`, we ship its navbar rename as part of this workstream. Coordinate with the user on order before any apply.

### Footer

The Programs column gains a third item. Inherits the structure proposed by `program-family-parallel`.

| Slot | Proposed by `program-family-parallel` | Updated for this workstream |
|---|---|---|
| Column header | "Programs" | "Programs" |
| Item 1 | "ELA Program (Grade 3+)" → `/program` | "ELA Program (Grade 3+)" → `/program` |
| Item 2 | "Little DODO (5–8)" → `/little-dodo` | "Little DODO (5–8)" → `/little-dodo` |
| Item 3 | — | **"DODO Coding (Grade 3+)" → `/coding`** |

ZH mirror: **"DODO 编程 (三年级及以上)"** — final ZH string to be locked via `dodo-content-writer` skill before apply.

### Home page (ELA `/`)

**`AgeBandChooser` does NOT get a third card.** It stays a 2-card pattern (Little DODO + ELA Program), unchanged from what `program-family-parallel` is shipping. No component rename, no third card, no blast radius into PFP's component work.

Instead, DODO Coding gets **its own band, further down the page**, structurally separated from the AgeBandChooser. The marketing-design reasoning: a three-card grid would visually equalize three siblings — but DODO Coding isn't a sibling of ELA + Little DODO. It's a separate discipline (machine literacy) parallel to a discipline-with-two-age-bands (English literacy). The two-tier architecture matches the two-tier product structure. Apple homepage uses this lineage — iPhone/iPad/Mac/Apple Watch each get their own band, and Within iPhone there's a sub-chooser by variant. Same pattern here.

#### DODO Coding band on `/` — visual

Placed after the "Navigator is a map" section, before the closing call. Full-bleed light surface so it reads as a self-contained section, not a card in a grid.

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  ALSO FROM DODO LEARNING                          (eyebrow, ink)     │
│                                                                      │
│  DODO Coding                                      (H2, large)        │
│  A language art for the AI age.                   (sub, --ink-deep)  │
│                                                                      │
│  We teach how AI reads, thinks, and writes.                          │
│  We teach your child to think critically about it.                   │
│                                                                      │
│  [ Visit DODO Coding → ]                          (btn-outline)      │
│                                                                      │
│  Read · Think · Write  ·  Critical thinking                          │
│  (small typographic preview, body-text color + ink for the human bit)│
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

Key properties:
- Single CTA — `Visit DODO Coding →` routes to `/coding`. No choose-this-program rhetoric; this is discovery, not selection.
- `--ink` accent appears here for the first time on the ELA home page — the color itself becomes a brand cue ("this is the other discipline") without needing dedicated component infrastructure.
- The three-verb + critical-thinking preview line is typographic teaser only — full copy lives at `/coding`.
- ZH mirror per `dodo-content-writer` skill before apply.

#### Other home-page touches

- The "Who We Are" section copy stays unchanged — Navigators serve all DODO Learning programs, no need to re-write.
- The stats block stays ELA-weighted (300+ families = ELA proof). DODO Coding stats appear at `/coding` once the first cohort completes; they do not migrate to the ELA home.

### `/program`, `/little-dodo`, `/methodology`, `/results`, `/navigators`, `/faq`, `/cities/*` (ELA-side pages)

**No changes.** Per the separation directive, ELA pages stay ELA-focused. No "sister program" callouts, no DODO Coding mentions, no acknowledgement lines. The only entry point from the ELA side to DODO Coding is:

1. The footer Programs column third item ("DODO Coding (Grade 3+)" → `/coding`)
2. The DODO Coding band on the ELA home page (`/`) — spec'd above
3. (Indirect) Navbar "Programs" item if `program-family-parallel`'s rename ships — but that's a label change, not a DODO Coding mention

The /consult page stays unchanged at launch. The consult pipeline is operationally shared (one Cal.com / one form / one Navigator triage), but the public-facing pages do not link to each other. `/coding/consult` is its own page; `/consult` continues to serve ELA.

### Schema + llms.txt

- `lib/schema.js` gains a new `Course` schema for `/coding/program` ("DODO Coding — Machine Literacy Program") plus `EducationalOccupationalProgram` per marketing guide §10.4. The existing Organization schema gains DODO Coding as a `hasOfferCatalog` entry.
- `public/llms.txt` gains a "DODO Coding" section at the same level as the existing ELA / Little DODO sections. Cites AI4K12, CMU CS Academy, Huyen by name (this is the LLM-crawler equivalent of the "we cite our sources" credibility move).
- `app/sitemap.js` gains 4 new URLs (the launch routes). Priority for `/coding` matches `/program` (1.0). Priority for `/coding/methodology` and `/coding/program` matches `/methodology` and `/program` (0.9). Priority for `/coding/consult` matches `/consult` (0.9).

---

## What does NOT change

- The existing ELA URLs all stay
- Navbar stays 6 items, no dropdown
- `AgeBandChooser` stays 2-card — no rename, no third card
- Tokens, colors, spacing protocol (one new accent — `--ink` — introduced for DODO Coding surfaces per `02-THEME.md`, never overrides the master tokens, only adds)
- Funnel ladder (Watch = soft / Consult = firm / Assessment never a CTA) — DODO Coding inherits the same ladder
- One consult pipeline operationally — but two consult pages (`/consult` and `/coding/consult`), no shared form
- PreCtaBand SUPPRESS list — `/coding/consult` and the other deep `/coding/*` pages are added to the SUPPRESS list

---

## Coordination with the `program-family-parallel` workstream (Proposal A — sequential)

User locked Proposal A on 2026-06-09: `program-family-parallel` applies first; `/coding` applies second, in a separate window. Dependencies are simpler than the original draft suggested because the chooser-rename and the third-card decisions are retired.

| Dependency | Resolution under Proposal A |
|---|---|
| Navbar rename "ELA Program" → "Programs" | Owned by `program-family-parallel`. `/coding` launch inherits the plural label. No coordination logic needed beyond sequencing. |
| `AgeBandChooser` lifted to home page (still 2-card) | Owned by `program-family-parallel`. `/coding` launch does not touch this component. |
| Footer Programs column gains items | PFP adds Little DODO as the second item. `/coding` launch later adds DODO Coding as the third item — sequential edit on a small line range, low conflict. |
| llms.txt restructure | PFP adds the umbrella + Little DODO sections. `/coding` later adds the DODO Coding section. Sequential append, no overlap. |
| lib/schema.js Course schema rename | PFP renames ELA's Course schema. `/coding` later adds the DODO Coding Course schema separately. |

**Sequencing locked under Proposal A:** `program-family-parallel` ships first; `/coding` ships second. Two separate apply windows.

---

## Open decisions to lock before apply

These belong here so they get resolved deliberately, not buried in implementation.

| # | Decision | Recommendation | Notes |
|---|---|---|---|
| 1 | Hero stats placeholder on `/coding` — show zeros, show a "Results coming" panel, or omit entirely | Omit entirely at launch. Replace with the "What we teach" block (three machine verbs + critical thinking emphasis) + Pillars block. Re-add stats after first cohort. | Honest > hopeful |
| 2 | Demo class — record a stub before launch, or fully defer | Fully defer. CTA routes to consult with the "demo during call" note. | No video autoplay, no fake highlights |
| 3 | Bundled pricing line on `/coding` consult page | Surface as a question ("Is your child currently enrolled in ELA?") not a price | Pricing logic lives in the consult call, not on the public page |
| 4 | ZH coverage at launch — full parity or EN-only first | Match current ELA coverage. If ELA pages are bilingual, `/coding` ships bilingual. | |
| 5 | DODO Coding band on the ELA home — exact placement | Below "Navigator is a map," above the closing call (PreCtaBand or in-page close) | Lets the band read as discovery, not as a card in a chooser |
| 6 | Cohort-milestone date copy on `/coding/results` and other "coming" surfaces | Use the cohort milestone phrasing, with the date as parenthetical | A specific date is a commitment; the cohort milestone is the actual gate |

---

## Five workstreams

### W1 · IA + theme decision (this proposal + `02-THEME.md`)
This document plus the second-accent decision. Output: a tokens addendum staged for the apply.

### W2 · Route scaffold
Create the six launch routes under `app/[locale]/coding/`: `page.jsx`, `about/page.jsx`, `methodology/page.jsx`, `program/page.jsx`, `faq/page.jsx`, `consult/page.jsx`. Each route is a thin page that imports a content object from `content/coding.en.js` + `content/coding.zh.js` (new files, parallel to `marketing.{en,zh}.js`). Placeholders only; no live copy yet.

### W3 · Chrome touch-points
Footer third-item ("DODO Coding (Grade 3+)"), PreCtaBand SUPPRESS list update (`/coding/about`, `/coding/methodology`, `/coding/program`, `/coding/faq`, `/coding/consult`), DODO Coding band insertion on the ELA home page (`/`). No `AgeBandChooser` rename. No third card.

### W4 · Content
`dodo-content-writer` skill runs on the homepage copy first (per `04-COPY-PASS.md`), produces ZH mirror, lints anti-dictionary. Then about, methodology, program, faq, consult — separate copy-pass docs per page.

### W5 · Schema + llms.txt + sitemap
Course / EducationalOccupationalProgram schema for `/coding/program`. llms.txt new DODO Coding section. sitemap.js six new URLs (the launch routes).

---

## Apply order (when triggered)

1. Verify `program-family-parallel` has applied (Proposal A — sequential).
2. W1 — lock theme (`02-THEME.md`)
3. W2 — scaffold the six launch routes with placeholder content (`03-SCAFFOLD.md`)
4. W4 — content pass on `/coding` homepage (`04-COPY-PASS.md`)
5. W3 — chrome touch-points (footer third item, PreCtaBand SUPPRESS additions, DODO Coding band on `/`)
6. W4 cont. — content passes on `/coding/about`, `/coding/methodology`, `/coding/program`, `/coding/faq`, `/coding/consult` (separate copy-pass docs per page)
7. W5 — schema, llms.txt, sitemap
8. `npx next build` clean
9. ZH/EN parity verification across all 6 new routes
10. Apply log written to `09-APPLY.md` *during* the apply

---

*End of 01-PROPOSAL.md. Next: `02-THEME.md` — token addendum.*
