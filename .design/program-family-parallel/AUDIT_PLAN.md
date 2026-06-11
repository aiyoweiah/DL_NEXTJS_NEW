# Audit Plan — Program Family Parallel

**Date:** 2026-06-03
**Scope decision (user, 2026-06-03):** Parallel funnel — one consult/demo pipeline; every warm page acknowledges both age bands. Plus: rename "16-Week Program" → "ELA Program" / "English Language Arts Program".

This work is intentionally bigger than the original "elevate Little DODO on the home page" scope. Splitting into phases so each can be inspected and redirected.

---

## Phase 1 — Naming + URL/Hub model (DONE)

- Output: `00-NAMING_MODEL.md`
- Commits to: keep URLs, retire "16-Week Program" as brand name, "Programs" nav label, AgeBandChooser as hub pattern.

## Phase 2 — Per-page audit (IN PROGRESS)

### 2A — Deep audit, 12 surfaces (Tier 1+2+3 + /faq)

For each page, capture:
- **Hero framing:** who is it speaking to? Age signal? K-2 invisibility check.
- **Section spine:** sections in order; surface alternation.
- **In-body close:** which CTA labels, which routes (Watch / Consult / other). Confirm SUPPRESS-list membership matches.
- **Internal link inventory:** every `<Link href>` out of the page. Where can a visitor go from here? Is `/little-dodo` ever reachable from here directly?
- **"16-Week Program" hits:** count + classify (rename to ELA Program vs keep as format descriptor).
- **"Little DODO" hits:** count (we already know: zero except `/little-dodo` itself).
- **Parallel-funnel gap:** what would need to change to acknowledge both bands? Light callout? Section? Tag? None needed (page is genuinely age-neutral)?

Pages:
- Tier 1: `/`, `/about`, `/program`, `/little-dodo`
- Tier 2: `/methodology`, `/lexile`, `/results`, `/compare`, `/navigators`
- Tier 3: `/demos`, `/consult`, `/assessment`
- Plus: `/faq` (Tier 4 but high traffic + no in-body close → important for K-2 visitor)

### 2B — Light sweep, 4 surface groups (Tier 4+5)

Lighter inspection. The question is **just** "does this page signal K-2 anywhere, and does it use '16-Week Program' as a brand?" — not a full design audit.

- `/blog` index + 2 published posts (`lexile-asymmetry-bilingual-children.mdx`, `what-does-lexile-score-mean.mdx`)
- `/audiobooks` page (gated content — the page itself is public)
- `/partners` page
- `/cities/[city]` template + `content/cities.js` for 3 representative slugs: vancouver, markham, san-francisco-bay-area

### 2C — Infra surfaces

- `lib/schema.js` — Course schema strings
- `public/llms.txt` — LLM crawler manifest
- `app/sitemap.js` — priority/changeFrequency sanity check
- `components/ui/AgeBandChooser.jsx` + `components/layout/Footer.jsx` + `components/layout/Navbar.jsx` + `components/layout/PreCtaBand.jsx` — confirm shared components don't hardcode "16-Week Program"

**Output:** `03-AUDIT.md` (Tier 1+2+3+faq) and `04-TIER45_SWEEP.md` (Tier 4+5+infra).

## Phase 3 — Cross-page flow map

Build a markdown directed graph:
- Nodes = pages.
- Edges = explicit `<Link href>` references found in Phase 2.
- Color coding: K-2-relevant edges in one notation, older-band edges in another, neutral in a third.
- Identify dead-ends (pages with no outbound links to anything K-2).
- Identify "missing edges" — the links that *should* exist for parallel funnel to work.

**Output:** `05-FLOW_MAP.md`.

## Phase 4 — Consolidated proposal

A single proposal doc with per-page edits, ordered by impact × cost:

1. Naming rename (mechanical, high-coverage) — `marketing.en.js`, `marketing.zh.js`, `lib/schema.js`, `public/llms.txt`. Bilingual proposed strings.
2. Nav + footer model changes — `marketing.{en,zh}.js` nav.primary, nav.more, footer.columns, footer.program.
3. Home page AgeBand band insertion — `app/[locale]/page.tsx` + new `homeAgeBand` copy export.
4. `/program` reframe — hero copy, AgeBandChooser position.
5. Tier 2 warm-page K-2 acknowledgement callouts — page by page.
6. Tier 3 conversion-page parallel framing — `/demos` (does each demo serve both bands?), `/consult` (does the form/CTA serve both?).
7. Tier 4+5 sweeps — minor touch-ups where K-2 should be mentioned (blog crosslink, city pages).
8. Infra — schema, llms.txt.

Each proposal item carries: the file, the current copy (where applicable), the proposed copy (EN + ZH), and the rationale.

**Output:** `06-PROPOSAL.md`.

## Phase 5 — Apply (only on explicit user "apply" trigger)

- Sequenced apply order (rename first because it cascades; then nav/footer; then home band; then warm pages; then conversion pages; then infra).
- `next build` checkpoint after each phase to catch parse errors in bilingual files.
- ZH-EN parity log: every English string change confirmed mirrored in `marketing.zh.js`.
- Commit message draft.

**Output:** `07-APPLY.md` (only written when user says "apply").

---

## What is OUT of scope

- New routes (no `/programs` hub, no `/program/ela` split).
- New components (reuse AgeBandChooser, PreCtaBand, existing section patterns).
- New tokens or new visual treatments.
- Dropdown menus.
- A 7th primary nav item.
- Cookbook / methodology rewrites unrelated to age-band parallel.
- DODO Coding sibling-site work (separate workstream).
- DL_NAVIGATORS portal (separate repo).
- Audiobook content writing (separate open task per memory).

## What is IN scope

- Every copy string change that says "16-Week Program" as a brand and should say "ELA Program".
- Every copy string that should acknowledge "Little DODO (5–8)" parallel to the ELA Program and currently doesn't.
- The nav.primary label change ("ELA Program" → "Programs"), nav.more addition (Little DODO), footer column header pluralization.
- Insertion of an AgeBandChooser-pattern section on the home page.
- Schema + llms.txt updates that match the new naming.
- Bilingual parity for all of the above.
