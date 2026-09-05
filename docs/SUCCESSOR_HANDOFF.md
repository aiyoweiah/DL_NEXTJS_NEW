# DODO Learning — Successor Handoff

**Rewritten:** 2026-09-03 (docs restructure) · one page of live pointers. The old
100 KB newest-first history is preserved verbatim at
[`_archive/successor-handoff-2026-09-02.md`](_archive/successor-handoff-2026-09-02.md) —
go there for the deep operational narratives (consult-form backend + env vars, CJK
pipeline corrections, video pipeline, PFP apply log, Little DODO cohesion pass).

## Where things stand (2026-09-03)

- **Site:** bilingual (EN/ZH), fully shipped, 45 routes, static export on Cloudflare
  Pages. **The v5 content cascade is 18/18** (D91/D92) and the label vocabulary is
  settled (D94–D96). Fourteen guard passes run on every build.
- **Docs restructured 2026-09-03:** interface guide rebuilt as a lean rulebook
  (**v7.0**), brand guide consolidated to **v6.0** (EN + ZH), one decision log going
  forward (`decision-log.md`, D97+), status in `decision-index.md`.
- **Next moves, in order:** **Wave 6 admin unblocks** (owner-only; gates every Tier-2
  SEO item — the critical path) → the machine surfaces (`llms-full.txt` /
  `llms-full.zh.txt`, both predating the v5 cascade) → Wave 4's type-floor design
  pass → Wave 7 loose ends. Detail: `completion-plan.md`.

## Read in this order

1. [`README.md`](README.md) — the map of every doc and the guard commands.
2. [`completion-plan.md`](completion-plan.md) — the one work queue (waves).
3. [`decision-index.md`](decision-index.md) — status of every D1–D96; check it before
   trusting any rule you read anywhere.
4. The guides: [`../.interface-design/system.md`](../.interface-design/system.md)
   (visual, v7.0) · [`../translation/BRAND_CONTENT_GUIDE.md`](../translation/BRAND_CONTENT_GUIDE.md)
   (content, v6.0, + `.zh.md` mirror).
5. [`architecture-cohesion-proposal.md`](architecture-cohesion-proposal.md) — **§4
   before measuring anything**; §1 before sweeping anything.

## Open rulings (owner) — the short list

Tracked in `decision-index.md` § Open and flagged ⚠️ in the guides:

1. **Flex 3's name** — "GPA tutoring" breaks §10 (BCG §06 ⚠️) · pairs with `/faq`
   pricing verification + the missing currency (Wave 6 #17, D13).
2. **XHS assessment CTA vs D29** (BCG §13 ⚠️) — carve-out or rewrite.
3. **LCS header-vs-body ZH ruling** — one call covers `zh:279`, `zh:346`, 23×
   `学习循环` (D92 open).
4. **AudiobookPlayer's 4 legacy fill buttons** — migrate or record a permanent
   carve-out, then retire the fill classes at the definition (system.md §5 ⚠️).
5. ~~Blog corrections~~ — **resolved 2026-09-05**: naming applied ("ELA Program");
   the 187-points claim now *conforms* to the re-ruled §11 canon (D99, per-cycle).
5b. **D99 growth-canon cascade awaiting "apply"** — the two-cycle statements are
   now the outliers; 14 drafted edits + 4 flags in
   [`../content-review/03-growth-canon-cascade-D99.md`](../content-review/03-growth-canon-cascade-D99.md).
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
