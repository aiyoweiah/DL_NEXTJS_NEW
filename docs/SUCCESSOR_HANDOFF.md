# DODO Learning — Successor Handoff

**Rewritten:** 2026-09-03 (docs restructure) · one page of live pointers. The old
100 KB newest-first history is preserved verbatim at
[`_archive/successor-handoff-2026-09-02.md`](_archive/successor-handoff-2026-09-02.md) —
go there for the deep operational narratives (consult-form backend + env vars, CJK
pipeline corrections, video pipeline, PFP apply log, Little DODO cohesion pass).

## Where things stand (2026-09-05, session close)

- **Site:** bilingual (EN/ZH), fully shipped, static export on Cloudflare Pages.
  Fifteen guard passes on every build (the fifteenth, `check-canon`, fails on retired terms — 2026-09-09); `/consult` Lighthouse 98 desktop.
- **The 2026-09-03 visual review is fully executed** (`.design/visual-review-2026-09/`):
  quick wins + D97 (sticky CJK source) + D98 (`color-scheme: light`) shipped 09-04;
  Wave-4 type floor + composition shipped 09-05 by admin ruling from before/after
  previews (V14 skipped — device budget; V15 `--color-hearth` applied).
- **Rulings batch 2026-09-05, all executed and live:** **D62** WenKai GB re-shipped
  (731 KB, sticky source, guard asserts the face) · **D99** growth canon re-ruled
  **per-cycle** (187L avg · 1.2 grade levels · 94% ≥ 1 grade) and cascaded to every
  surface incl. schema + llms EN/ZH · copy batch C5–C9 · **D92** closed by FULL
  migration (学习循环 gloss gone; LCS = 语言循环体系) · legacy fill classes retired
  at the definition (player transport → local `.audio-*`) · **Flex 3 renamed
  课业进阶自由航行 / Coursework Advancement + CAD stated** on every price surface.
- **Docs:** interface rulebook v7.0 · brand guide v6 with all ruled boxes marked ✅ ·
  single decision log (D97+), status in `decision-index.md` (header D1 … D99).
- **Next moves, in order:** the **XHS-vs-D29 ruling** (last open ruling; both
  resolutions drafted) → **assets** (V9 imagery, V4 demo footage, founder embed URL)
  → **Wave 6 admin unblocks** (still the Tier-2 SEO critical path) → D13 homework
  (price-figure re-verification · §10 vs `/partners` "GPA Navigation" · /ops tier
  naming). Detail: `completion-plan.md` + `decision-index.md` § Open.
- **2026-09-09 GEO audit** (`geo-audit-2026-09.md`): machine layer verified healthy at the edge; four must-fix code defects found — every blog canonical points at `/blog/undefined/`, the `/blog` index is a scaffold (5 dead links, invented bylines, pillar post unlinked), `og-default.png` is a blank rectangle also used as the Organization logo, `<html lang>` is JS-only — plus the itemised `llms-full` drift register (F1–F13, apply-gated) and seven admin rulings (R1–R7). Rulings R1/R2/R5/R6 applied the same afternoon as D102–D105 + M1 (14/14 green); R3/R4 deferred, R7 awaiting the card pick. GEO skills installed at user scope (geo-skills, gtm-engineer-skills, best-aeo-skill); GEOFlow evaluated and not installed; evening: D106 canon guard, D107 IndexNow, D108 machine layer, llms register F1–F13 (F12 held) shipped; R3 elaborated (option D), R7 ruling sheet out; `writing-dna-skill` + `lieflat-less-ai-tone` installed at user scope for the future EN→ZH path.

## Read in this order

1. [`README.md`](README.md) — the map of every doc and the guard commands.
2. [`completion-plan.md`](completion-plan.md) — the one work queue (waves).
3. [`decision-index.md`](decision-index.md) — status of every D1–D99; check it before
   trusting any rule you read anywhere.
4. The guides: [`../.interface-design/system.md`](../.interface-design/system.md)
   (visual, v7.0) · [`../translation/BRAND_CONTENT_GUIDE.md`](../translation/BRAND_CONTENT_GUIDE.md)
   (content, v6.0, + `.zh.md` mirror).
5. [`architecture-cohesion-proposal.md`](architecture-cohesion-proposal.md) — **§4
   before measuring anything**; §1 before sweeping anything.

## Open rulings (owner) — the short list

Tracked in `decision-index.md` § Open and flagged ⚠️ in the guides:

1. ~~Flex 3's name~~ — **ruled and APPLIED 2026-09-05:** "Coursework Advancement /
   课业进阶自由航行" + CAD stated, across /faq, /program, llms-full EN+ZH, guides,
   glossary (`content-review/04-flex3-cad.md`). Still admin's: D13 price-figure
   re-verification · whether §10 reaches /partners' separate "GPA Navigation"
   B2B product · /ops tools' tier naming.
2. **XHS assessment CTA vs D29** (BCG §13 ⚠️) — **still open**, the one unanswered
   ruling: carve-out or consult-shaped rewrite (both drafted 2026-09-05).
3. ~~LCS header-vs-body~~ — **ruled FULL migration 2026-09-05 and executed** (D92
   closed; see decision-log.md).
4. ~~AudiobookPlayer's 4 legacy fill buttons~~ — **ruled migrate 2026-09-05 and
   executed**: download CTA → btn-do, transport → local `.audio-*` (D53b scope
   exclusion), all six legacy fill classes retired at the definition.
5. ~~Blog corrections~~ — **resolved 2026-09-05**: naming applied ("ELA Program");
   the 187-points claim now *conforms* to the re-ruled §11 canon (D99, per-cycle).
5b. ~~D99 growth-canon cascade~~ — **applied in full 2026-09-05** (14 rows: pages,
   tiles, schema, llms EN+ZH; record in
   [`../content-review/03-growth-canon-cascade-D99.md`](../content-review/03-growth-canon-cascade-D99.md)).
   The site now states one growth claim everywhere.
6. `/compare` founder video — real embed URL (dead play affordance removed
   2026-09-04; restoring it needs the URL).
6b. ~~ZH typeface ruling~~ — **ruled & executed 2026-09-05**: WenKai GB re-shipped
   via D97's explicit `--source` flag; D62 → Live. The generator source is sticky
   and the guard asserts the face on every build.
7. Ms. Kimberly's bio — agent-authored, never verified. WeChat handle still
   `__PLACEHOLDER__` / `pending`. Cal.com cancellable after one real consult
   submission is seen end-to-end.

## Operational facts that bite

- **Repo:** `aiyoweiah/DL_NEXTJS_NEW` → Cloudflare Pages `dl-nextjs-new` →
  dodolearning.com, from `main`. `output: 'export'` — **Next API routes are dead**;
  server endpoints live in `functions/` (Pages Functions).
- **`LARK_APP_ID`/`LARK_APP_SECRET` on CF Pages are shared with Claude_Lark's cron —
  rotating in one place silently breaks the other.** Full env-var table: archive
  § 2026-06-28.
- **Apply-gate:** live copy changes are proposed in chat and applied only on an
  explicit "apply". **Bilingual parity** on every copy change.
- **Instruments:** `npm run conformance` (reports, never fails — read its output) ·
  `npm run type-floor` (rem-aware). Re-run before quoting any number; write the
  predicted figure down first. The three standing measurement lessons: a number that
  improves can be a symptom; a guard can be unfireable; "referenced nowhere" is not
  "dead" (loop report 2026-09-02).
- **Sync:** one `git fetch` per session (SessionStart hook); re-fetch only right
  before a push. Cross-machine protocol: `F:\PC-Documents\DLCW\_handoffs\COORDINATION_PROTOCOL.md`.
