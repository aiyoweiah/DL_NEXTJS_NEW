# Proposal — easy read

**Date:** 2026-06-03
**Status:** No live files edited. Apply on your trigger.
**Detail version:** `06b-PROPOSAL-DETAIL.md` (line numbers, EN+ZH strings, rename tables)

---

## In one paragraph

Stop using "16-Week Program" as a brand name. Call the older band the **ELA Program** (English Language Arts). 16-week stays as a *format descriptor* — both bands run 16-week cycles. Make every cold/warm page acknowledge that we run **two parallel programs sharing the same Navigators and consult pipeline**: **Little DODO** (ages 5–8) and the **ELA Program** (Grade 3+). The home page gets one new section that surfaces the fork. The navbar label goes plural. Eight other pages each get a small bilingual touch-up. No new URLs, no new components, no new colors.

---

## What a visitor will see change

### Home page
A new section appears between the proof-stat strip and the "Navigator is a map" photo. Two cards side by side:

```
┌──────────────────────────────────────────────────────────┐
│  Built for the stage your child is in                    │
│  Two paths into DODO English literacy.                   │
│                                                          │
│  ┌─────────────────────────┐  ┌─────────────────────────┐│
│  │ AGES 5–8                │  │ GRADE 3+                ││
│  │ Little DODO             │  │ ELA Program             ││
│  │                         │  │                         ││
│  │ High-frequency,         │  │ Live, Navigator-led     ││
│  │ low-pressure reading.   │  │ literacy + writing.     ││
│  │ Where the reader        │  │ Lexile-measured.        ││
│  │ begins.                 │  │                         ││
│  │                         │  │                         ││
│  │ [Explore Little DODO]   │  │ [Explore the ELA Program]││
│  └─────────────────────────┘  └─────────────────────────┘│
└──────────────────────────────────────────────────────────┘
```

### Navbar
- Desktop primary item **"ELA Program"** → **"Programs"** (plural)
- Mobile drawer gains **"Little DODO (5–8)"** in the secondary list

### Footer
- Column header **"Program"** → **"Programs"**
- First link **"The 16-Week Program"** → **"ELA Program (Grade 3+)"**

### `/program` page
- H1 **"What happens in a 16-Week Program?"** → **"What happens in the ELA Program?"**
- Same page, same content; just the older band's brand name swapped

### `/little-dodo` page
- Body reference to "the 16-Week Program" → "the ELA Program"
- No other change

### `/demos`
- The 6-card video gallery becomes two band-labelled rows: **ELA Program (Gr 3+)** above, **Little DODO (5–8)** below. If no K-2 demo videos exist yet, the second row holds "Recording soon" placeholder cards that link to `/little-dodo`.

### `/consult`
- Hero subline gains a one-liner: "We consult for both age bands."
- Navigator quote in the RealCall section stops saying "the 16-Week Program is the right fit" and becomes band-agnostic.

### Five warm pages each get one short callout
**`/methodology`, `/lexile`, `/results`, `/compare`, `/navigators`** — each gains one bilingual sentence acknowledging the other band. No layout changes.

### `/faq`
- A new top-level category **"Little DODO (Ages 5–8)"** with six K-2 questions
- Existing "16-Week Program" mentions in answers → "the ELA Program"

### `/cities/*`
- Every city page gains one line: "Both the ELA Program (Grade 3+) and Little DODO (5–8) serve [City] families online."
- The city badge stops saying "The 16-Week Program."

### `/about`
- "Families We Serve" gains a fourth card: **"The Early-Reader Home"** (K-2)

### Schema + llms.txt
- Course schema name updates from "The DODO 16-Week Program" → "English Language Arts Program — DODO Learning"
- `llms.txt` gains an umbrella paragraph at the top naming both programs explicitly

---

## What does NOT change

- Every URL stays
- Navbar stays 6 items, no dropdown
- Tokens, colors, spacing protocol
- Funnel ladder (Watch = soft / Consult = firm / Assessment never a CTA)
- One conversion pipeline — no separate K-2 consult, no separate K-2 demos page
- PreCtaBand SUPPRESS list
- Any component file shape (we reuse AgeBandChooser as-is with one optional prop added)

---

## Five workstreams

### W1 · Rename pass
Mechanical find-and-decide across `content/marketing.{en,zh}.js`, `content/faq.js`, `content/cities.js`, the 2 blog posts, `lib/schema.js`, `public/llms.txt`. Roughly 60 brand-name uses to rename; ~140 format-descriptor uses untouched. Bilingual.

### W2 · Chrome
3 small edits: navbar primary label, mobile drawer addition, footer column header pluralization. Bilingual.

### W3 · Home page
Reuse `AgeBandChooser` with a new `current={null}` mode. Add `homeHeading` + `homeEyebrow` to the `ageBands` content export. Insert one new section in `app/[locale]/page.tsx`. ~20 lines of code; rest is copy.

### W4 · Warm pages
8 pages, each one small bilingual edit. Listed in detail doc; total ~30–40 short strings.

### W5 · Infra
After W1 runs, validate Rich Results for both Course schemas, bump `/little-dodo` sitemap priority to match `/program`, view `/sitemap.xml`, run `next build`.

---

## Open decisions (7) — your call

I have a default pick for each; override any you want before I apply.

| # | Decision | My pick |
|---|---|---|
| 1 | ZH brand label for older band | `ELA 课程` (terse) |
| 2 | Nav label — `Programs` vs `ELA Programs` | `Programs` |
| 3 | Age tag for older band — keep `GRADE 3+`? (was Grade 4+ until 2026-06-03) | Yes — `GRADE 3+` / `三年级及以上` |
| 4 | `/demos` second row — real videos or "Recording soon" placeholders? | Placeholders now; replace when shot |
| 5 | `/navigators` K-2 surface — real profile or framing sentence? | Framing sentence first, profile later |
| 6 | `/faq` K-2 questions — my 6 starters or new ones from real consult calls? | Use mine as scaffolding, refine via `dodo-content-writer` |
| 7 | `/about` Families — add a 4th card or reframe existing? | Add 4th card "The Early-Reader Home" |

Tell me which to override; the rest I'll take as agreed.

---

## Apply path

Twelve sequenced steps so `next build` stays clean after each. Detail in `06b-PROPOSAL-DETAIL.md` §"Sequenced apply order". The shape:

1. **Rename foundation** — content + schema + llms.txt (bilingual)
2. **Chrome** — nav + footer
3. **AgeBandChooser** — add `homeHeading` / `homeEyebrow` support
4. **Home page** — insert the AgeBand band
5. **/program** — H1 + hero chip
6. **Tier 2 callouts** — methodology, lexile, results, compare, navigators
7. **/demos** — band-labelled rows
8. **/consult** — parallel-band signal
9. **/about** — Families fourth card
10. **/cities** — callout + badge
11. **/faq** — Little DODO category
12. **Infra check** — sitemap + Rich Results

Each step is one commit, independently revertable. Steps 5–11 don't depend on each other — they can ship in any order or be skipped.

---

## To trigger

- `apply` → run all 12 steps in sequence
- `apply 1–4` (or any range) → run a slice
- `apply 1` → just the rename pass; we look at results before deciding the rest
- `rework <N>` → re-draft workstream N before applying

For ZH strings I'll route through `dodo-content-writer` before any string locks unless you say "ship my drafts."

---

## Where the dense reference lives

Every line number, every EN+ZH string, every per-file rename target, the full classification flowchart, and the detail of every callout sentence are in **`06b-PROPOSAL-DETAIL.md`** — same folder. Open it only when you want to verify or override a specific string.
