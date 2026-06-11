# Little DODO cohesion pass — findings

**Date:** 2026-06-11
**Owning session:** the parallel Little DODO workstream (handoff: `docs/HANDOFF_LITTLE_DODO_PARALLEL_2026-06-10.md`)
**Status:** ⏸ apply-gated. No live files touched.

---

## Why this pass exists

Little DODO shipped 2026-06-02 (page + chrome integration) and PFP elevated it to true parallel visibility on 2026-06-09. This pass is an independent review of how Little DODO sits alongside the ELA Program at the rhetorical / substance / cohesion level — not the chrome level.

Two inputs shape this pass:

1. **Admin's substance correction (2026-06-11).** Little DODO is NOT staffed by the same Navigators as the ELA Program. It is staffed by dedicated early-childhood educators specializing in phonetics, fluency, and pronunciation. The program builds vocabulary and the love of reading through iteration, book by book. This invalidates the "Navigators: Shared/similar" line in the original brief at `docs/little-dodo-plan.md` §"Shared vs. different."

2. **Family-level homepage reframe (user-decided 2026-06-11).** Homepage hero eyebrow shifts from "For children who will think and lead in English at the highest levels" (ELA-only) to "Live, Navigator-led English literacy — ages 5 through high school" (family-level). The H1 stays rigour-coded as the brand destination.

---

## Decisions locked

| # | Decision | Notes |
|---|---|---|
| 1 | **Homepage eyebrow → family-level** | "Live, Navigator-led English literacy — ages 5 through high school." Ripples through meta titles, llms.txt, schema, about page. |
| 2 | **H1 stays rigour-coded** | Family-level eyebrow does the K-2 inclusivity job; the H1 (`English mastery at the cognitive level. Bilingual depth as the natural outcome.`) stays as the destination promise. |
| 3 | **Little DODO substance update** | Dedicated early-childhood educators · phonetics, fluency, pronunciation · vocabulary + love to read + iteration · book-by-book (no specific number — depends on phase + skill, per user). |
| 4 | **Reciprocal growsIntoChip on /little-dodo hero** | Gold "Grade 3+? See the ELA Program →" mirror of the existing `kidsChip` on /program. |
| 5 | **"Read → Think → Speak" inline phrase becomes a link** | Wrap the phrase in `littleDodo.how.steps[2].desc` as a link to `/methodology`. |
| 6 | **EN translation of ZH chip** | "Where language takes root." (option #2 from the proposal set) |
| 7 | **No separate Little DODO Navigator page** | K-2 educators get listed on the existing `/navigators` page alongside ELA Navigators, distinguished by a "Little DODO" tag. Original handoff open-task #1 scope changes accordingly. |
| 8 | **Staging folder** | `.design/little-dodo-cohesion-pass/` (this folder). |

---

## Two priority items called out independently

These are the highest-impact corrections in this pass:

### A. `public/llms.txt:7` — stale pre-Little-DODO scope

Current line: *"The program serves students in grades 3 through 8 (ages 7–15+) worldwide…"*

This line was written before Little DODO existed and Little DODO never got folded in. AI-discovery surfaces (the entire point of llms.txt) currently advertise DODO as Grade 3–8 only. Fix is one paragraph rewrite — see `02-COPY-PROPOSALS.md`.

### B. `content/marketing.en.js:1199` (+ ZH at 1173) — `navigators.k2Note` is now actively misleading

Current EN: *"Navigators teach across both age bands — from the K-2 reader in Little DODO to the Grade 12 SAT/IB candidate in the ELA Program."*

Under admin's correction, this is false. The two age bands are staffed by two specialist teams under one philosophy — not by a shared roster. This single string has the highest correction priority in the cohesion pass because it makes a claim that contradicts how the program is actually staffed.

---

## What's working — keep, don't tamper

1. **K-2 register on `/little-dodo` itself** lands on-brief — warm, low-pressure, no combat metaphors, no exclamation marks. The destination page is rhetorically sound; only the framing-of-substance needs the admin update folded in.
2. **The Lexile boundary is honest.** "Formal Lexile measurement comes later, in the ELA Program (Grade 3+)" — keep this exact spine; it's the model for every other family-boundary statement.
3. **Bidirectional cross-linking is comprehensive.** Nine `k2Note` bands across compare/methodology/lexile/results/navigators/demos/consult plus footer + AgeBandChooser. Don't reduce coverage; only update content.
4. **ZH transcreation 都学启蒙 is correct.** 启蒙 carries the early-learning meaning the brief asked for.
5. **Funnel ladder is consistent across the family.** Hero soft (Watch Demo) → in-body firm close (Book Consultation). The reciprocal CTA section reverses the order at the close. No ladder violations.

---

## Cohesion gaps (with status against decisions)

| # | Gap | Status |
|---|---|---|
| G1 | Homepage hero excludes K-2 audiences | **Addressed** by family-level eyebrow (decision #1) |
| G2 | AgeBandChooser cards visually parallel but rhetorically unequal — ELA dense, Little DODO soft | **Addressed** by admin's substance update (decision #3) — Little DODO blurb claims its own substance |
| G3 | `shared.h2` framing centers the older sibling, not the K-2 child | **Addressed** by rewrite (`02-COPY-PROPOSALS.md`) |
| G4 | No reciprocal "grows into" chip on /little-dodo | **Addressed** by growsIntoChip (decision #4) |
| G5 | Stat rail uses adjectives ("High", "Low") in number positions | **Addressed** by rewrite — but without a specific book count per user's call (decision #3) |
| G6 | EN/ZH hero chip asymmetry | **Addressed** by EN translation of ZH chip (decision #6) |
| G7 | "Read → Think → Speak" terminology leaks unannounced into K-2 prose | **Addressed** by methodology link (decision #5) |
| G8 | Footer Programs ordering centers ELA | Not an edit — confirm-to-document only. Current order (ELA → Little DODO → Loop → Navigators) is consistent with the DODO Coding workstream's reservation of slot 3. Leave as-is. |
| G9 | Demo CTA dead-ends at general /demos (K-2 footage missing) | No action — already handled by demos.k2Note. Awaiting real K-2 recording (open-task #2 in handoff). |
| **G10** (new, from admin update) | "Same Navigators" claim is false across 13+ surfaces | **Addressed** by full ripple sweep (`02-COPY-PROPOSALS.md`) — this is the substance backbone of the pass |
| **G11** (new) | `llms.txt:7` advertises Grade 3–8 only | **Addressed** as Priority A above |

---

## Ripple inventory — live-content surfaces touched

The cohesion pass touches ~16 live-content surfaces. Some are one-line edits, some are paragraphs. Each is enumerated with EN+ZH copy in `02-COPY-PROPOSALS.md`.

| Surface | File | Type |
|---|---|---|
| Home hero eyebrow + consultHook | `content/marketing.en.js` + `marketing.zh.js` | Family-level reframe |
| Home meta title + description | same | Drop "Cognitive Level" from title; broaden description |
| AgeBandChooser Little DODO blurb | same (`ageBands.bands[0].blurb`) | Substance claim |
| `littleDodo.hero.chip` (EN) | same | "Where language takes root." |
| `littleDodo.hero.sub` | same | Phonetics + fluency + vocabulary + iteration |
| `littleDodo.hero.stats` | same | 6 stats, no "16 books" number |
| `littleDodo.shared.h2` + body | same | K-2-first framing + admin's substance |
| `littleDodo.how.steps[2].desc` | same | "Read → Think → Speak" wrapped as link to /methodology |
| `compare.s1.audience.k2Desc` | same | "Same Navigator model" → "same delivery model, different specialist team" |
| `compare.k2Note` | same | Same |
| `methodology.k2Note` | same | "Same Loop" → preserve; "same Navigators" not claimed here |
| `lexile.k2Note` | same | Preserve — already accurate |
| `results.k2Note` | same | Preserve — already accurate |
| `navigators.k2Note` | same | **Priority B rewrite** |
| `demos.k2Note` | same | Preserve — already accurate |
| `consult.hero.sub` | same | Already mentions both bands; add specialist-team language |
| `about.navigators.p3` | same | Acknowledge two specialist teams (NOT a separate Navigator page, per decision #7) |
| `about.hero.sub` | same | Add sentence acknowledging Little DODO is the starting point |
| `about.meta.title` | same | Drop "Cognitive Level" framing |
| `public/llms.txt` lines 1, 7, 13 | `public/llms.txt` | Priority A + scope fixes |
| `public/llms-full.txt` (audit) | `public/llms-full.txt` | Audit for ELA-only matching language |
| `lib/schema.js:324` (`littleDodoCourseSchema` description) | `lib/schema.js` | Drop "Same Navigators" |
| `/little-dodo` page chrome (growsIntoChip) | `app/[locale]/little-dodo/page.jsx` + content | Structural addition |

---

## What does NOT change

- AgeBandChooser stays 2-card. The DODO Coding workstream owns its own home-band placement separately.
- No new pages created.
- No nav changes (still 6 flat items, no dropdown).
- No `/coding/*` routes (those belong to the sibling-site workstream).
- PreCtaBand SUPPRESS list unchanged (`/little-dodo` stays on it).
- Funnel ladder unchanged (Watch Demo = soft, Book Consultation = firm, Assessment never a CTA).
- No metrics fabricated for Little DODO — proof strip on home stays ELA-only; if it needs labelling, that's a separate decision.

---

## Coordination with DODO Coding workstream

None of the changes in this pass touch the reserved surfaces:

- `marketing.codingBand` — NOT created
- `marketing.footer.columns[programs].items[2]` (third footer item) — NOT added
- `Organization.subOrganization` in `lib/schema.js` — NOT added
- `## DODO Coding (sibling site)` block in `public/llms.txt` — NOT added
- `--ink-deep` CSS variable — NOT introduced
- Post-"Navigator is a map" region of home — NOT modified

Verified clear.

---

## Apply sequencing (for when apply-gate lifts)

Suggested order. Each step is independently shippable; bundle as one PR or split as you prefer.

1. **Priority B first** — `navigators.k2Note` EN+ZH (smallest, highest priority — fixes an active falsehood).
2. **Priority A** — `public/llms.txt` lines 1, 7, 13 (AI-discovery surfaces; one paragraph).
3. **Little DODO substance** — `littleDodo.shared.*`, AgeBandChooser blurb, `compare.s1.audience.k2Desc`, `compare.k2Note`, `lib/schema.js:324`. These land together because they all carry the same correction.
4. **Stat rail + chip + methodology link** — `littleDodo.hero.chip`, `littleDodo.hero.stats`, `littleDodo.how.steps[2].desc` link, growsIntoChip in `app/[locale]/little-dodo/page.jsx` (small JSX addition).
5. **Home + about reframe** — `home.meta.*`, `home.hero.eyebrow`, `home.hero.consultHook`, `about.meta.title`, `about.hero.sub`, `about.navigators.p3`.
6. **Verification** — `npx next build` clean before locking apply; spot-check `/`, `/little-dodo`, `/program`, `/navigators`, `/about`, `/compare` in the browser.

Apply log → `03-APPLY.md` (created at apply time).
