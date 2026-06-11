# Cross-site loop — DODO Learning ↔ DODO Coding (ELA-side proposal)

**Date:** 2026-06-11
**Repo:** `DL_NEXTJS_NEW` (this one). Companion doc in DODO Coding repo at `F:\PC-Documents\DODO_Coding_web\.design\cross-site-loop\01-PROPOSAL.md`.
**Status:** ⏸ apply-gated. Stage proposals only.

---

## Why this exists

The 2026-06-10 architecture (`.design/dodo-coding-launch/01-ARCHITECTURE.md` decision #7) locked cross-sell as **asymmetric**: DL promotes DODO Coding actively; Coding only carries a quiet parent credit. That decision made sense at Stage 1 launch.

State as of 2026-06-11:

| Direction | Surfaces shipped | Surfaces planned-not-shipped |
|---|---|---|
| **DL → Coding** | 1 (footer Brand-column "Also from DODO" line) | 3: home Coding band · footer Programs column item 3 · llms.txt umbrella line · schema `subOrganization` |
| **Coding → DL** | 4 (header brand `parentCredit`, footer `parentCredit` block, footer copyright line, llms.txt §"Parent relationship" paragraph) | 0 |

So **Coding works harder to credit the parent than DL works to acknowledge the sibling**. The peer-brand "quiet parent" rule produced an inverted asymmetry — the very thing it was supposed to prevent.

User decision 2026-06-11: **flip to Option B (sibling family, looped)**. Both products are mature enough to refer each other without diluting either; the deep-funnel pages still stay program-pure.

---

## Decisions locked (2026-06-11)

| # | Decision | Notes |
|---|---|---|
| 1 | Strategic posture: **sibling family (Option B)** | Overturns 2026-06-10 decision #7 ("asymmetric") and #4 ("quiet parent"). Both sites carry equivalent cross-links in equivalent slots. |
| 2 | Footer Programs column item 3 = **add it** ("DODO Coding (Grade 3+)") | Was reserved 2026-06-10 but never landed. |
| 3 | Nav-chip on both sites: **add, with reworded label** | EN: `DODO Coding →` on ELA / `DODO Learning →` on Coding. ZH: `DODO 机器语言 →` / `DODO 都学英文 →`. Color-coded to destination (ink-blue chip on ELA, lavender chip on Coding). |
| 4 | Shared consult flow = **NOT YET** | Separate consult pipelines to be built. Don't write copy claiming a shared consult. Each site keeps its own consult page; cross-links don't promise unified booking. |
| 5 | Pass-1 scope = ship 5 ELA-side touchpoints | Footer Programs col 3, home Coding band, llms.txt umbrella, schema subOrganization, nav-chip. Reciprocal mirrors land on Coding side in parallel. |
| 6 | Deep-funnel pages stay program-pure | `/methodology`, `/results`, `/navigators`, `/program`, `/little-dodo` on ELA side. No cross-sell on these. |
| 7 | About page mention deferred to Pass-2 | One paragraph on `/about`. Lower priority than the 5 Pass-1 items. |

---

## ELA-side touchpoint inventory — what lands in this repo

### Touchpoint 1 — Footer Programs column item 3

**Location:** `content/marketing.en.js` + `marketing.zh.js`, `footer.columns.program` items array.

**Current Programs column (post-PFP):**
1. ELA Program (Grade 3+) → `/program`
2. Little DODO (5–8) → `/little-dodo`
3. *(reserved for DODO Coding — never populated)*
4. The Loop → `/methodology`
5. Navigators → `/navigators`

**Proposed:** add item 3 = "DODO Coding (Grade 3+)" → `https://coding.dodolearning.com` (env-var `NEXT_PUBLIC_DODO_CODING_URL`-managed for Stage 2 swap). ZH: "DODO 机器语言（3 年级+）". Exact strings in `02-COPY-PROPOSALS.md`.

**Note:** there is now BOTH a Brand-column "Also from DODO" line AND a Programs-column entry. User confirmed this redundancy is OK (Brand line = brand-family voice; Programs line = enrollment-funnel listing). They serve different reading paths.

### Touchpoint 2 — Home Coding band

**Location:** `app/[locale]/page.tsx`, between "Navigator is a map" and the closing call.

**Already specced** in `.design/dodo-coding-launch/08-DODOLEARNING-TOUCHPOINTS.md` §"Touchpoint 1." That spec is still valid; ship it as-written.

**Mini-revision needed** to honor 2026-06-11 sibling-family direction: the band's eyebrow currently reads *"Also from DODO Learning"* — keep it; works equally for sibling-family voice. No content change to the spec. Apply per the original `08-DODOLEARNING-TOUCHPOINTS.md` design.

### Touchpoint 3 — `public/llms.txt` umbrella line

**Location:** `public/llms.txt`, top description block (after the existing two-program-family paragraph the cohesion pass already wrote).

**Proposed:** add one sentence at the end of the brand description:

> *DODO Learning also operates **DODO Coding** (`coding.dodolearning.com`) — a peer-brand sibling site teaching how AI reads, thinks, and writes for Grades 3+. Shared operational backend; separate public surfaces.*

Plus add a `## DODO Coding (sibling site)` block lower in the file as already-reserved (see proposed contents in `02-COPY-PROPOSALS.md`).

### Touchpoint 4 — `lib/schema.js` Organization.subOrganization

**Location:** `lib/schema.js`, the `Organization` schema (DODO Learning).

**Proposed:** add a `subOrganization` field referencing a DODO Coding `Organization` schema. Exact JSON-LD in `02-COPY-PROPOSALS.md`. SEO benefit: search engines understand the family relationship.

### Touchpoint 5 — Nav-chip "DODO Coding →"

**Location:** `components/layout/Navbar.jsx` (TBD exact placement — beside the wordmark, before the primary nav items).

**Visual spec:**
- Pill chip, same dimensions as the existing `kidsChip` on `/program` hero
- Color: ink-blue accent (mirrors Coding site's primary), `border: 1px solid rgba(31,78,140,0.30)`, `backgroundColor: rgba(31,78,140,0.06)`, `color: #1F4E8C` for the text. Differentiates from lavender (DL primary) and gold (DL CTA).
- Text: `DODO Coding →` (EN) / `DODO 机器语言 →` (ZH)
- Href: `process.env.NEXT_PUBLIC_DODO_CODING_URL || 'https://coding.dodolearning.com'`
- Hidden on viewports under `md:768` (mobile drawer surfaces it instead — TBD whether to place in drawer header or skip on mobile entirely; recommend skip on mobile to keep CTA-rich nav clean)

**Content key:** `nav.codingChip` in `marketing.{en,zh}.js`.

```js
nav.codingChip = {
  label: 'DODO Coding',
  href:  process.env.NEXT_PUBLIC_DODO_CODING_URL || 'https://coding.dodolearning.com',
  ariaLabel: 'Visit DODO Coding — sibling site',
}
```

### Touchpoint 6 — About page paragraph (Pass-2, deferred)

**Location:** `content/marketing.en.js` `about.*` namespace, likely as a small paragraph after `about.beliefs` or `about.navigators`.

**Proposed:** one paragraph acknowledging DODO Coding as a sibling project under the same Navigator philosophy. EN + ZH. Held to Pass-2 because the about page is lower-funnel and the chip + home band + footer carry the main awareness work.

---

## Pass-1 sequencing (this repo)

Each touchpoint is independently shippable. Suggested order: smallest → largest.

1. Footer Programs column item 3 — pure content add
2. llms.txt umbrella line + DODO Coding block — pure content add
3. Schema subOrganization — small JSON-LD addition
4. Nav-chip — JSX + content key add
5. Home Coding band — biggest lift; per existing 08-DODOLEARNING-TOUCHPOINTS.md spec

**Verification per item:** `npx next build` clean + browser spot-check on `/` and any page exercising the nav.

---

## What's NOT changing on ELA side

- Funnel ladder (Watch soft / Consult firm / Assessment never CTA) — unchanged
- AgeBandChooser — still 2-card (Little DODO + ELA Program). DODO Coding does NOT enter AgeBandChooser; it gets its own home band as planned.
- Deep-funnel pages (`/methodology`, `/results`, `/navigators`, `/program`, `/little-dodo`, `/compare`, `/lexile`) — stay 100% ELA-focused
- ZH translation contract — full parity for every change
- DODO Coding workstream's own reservations (codingBand, --ink-deep, post-Navigator home region) — these land per their original plan in Pass-1
- The cohesion-pass apply (commit `a5f1b11`) — already shipped; this proposal is additive

---

## Coordination with the parallel Coding-side session

Companion proposal lives at `F:\PC-Documents\DODO_Coding_web\.design\cross-site-loop\01-PROPOSAL.md` with reciprocal touchpoints. Either side can apply independently; the loop is closed when both Pass-1 sets land. Each side's apply is self-contained — neither blocks the other.

---

## Open questions before apply

1. Confirm chip reword (currently locked: `DODO Coding →` / `DODO Learning →`). Other 3 options still live in chat.
2. Confirm Programs column item 3 ordering — does DODO Coding sit at position 3 (after Little DODO) or elsewhere?
3. `NEXT_PUBLIC_DODO_CODING_URL` env var — confirm name and that Cloudflare Pages env is set in the `dodolearning` Pages project before apply.
4. Pass-1 vs Pass-2 split confirmed? (About paragraph deferred)
5. Mobile nav-chip behavior — skip on mobile, or surface in drawer?
