# Apply log — Cross-site loop (ELA side)

**Applied:** 2026-06-11
**Verification:** `npx next build` clean; browser DOM scan on `/en` confirmed nav-chip ("DODO CODING →"), home Coding band ("A language art for the AI age"), and "Visit DODO Coding" CTA all render.

---

## What landed

| # | Touchpoint | Files |
|---|---|---|
| 1 | Footer Programs column item 3 — "DODO Coding (Grade 3+)" | `content/marketing.en.js` `footer.program[]`; `content/marketing.zh.js` parallel. Also fixed stale ZH `footer.sibling.name` ("DODO 编程" → "DODO 机器语言") + blurb tightened. |
| 2 | Home Coding band — full-bleed light section between ParentTrustSection and PreCtaBand | New `marketing.codingBand` content export EN+ZH; new `CodingBand` section function in `app/[locale]/page.tsx`; rendered as last in-page section. |
| 3 | llms.txt umbrella sentence + new `## DODO Coding (sibling site)` block | `public/llms.txt` |
| 4 | Schema `subOrganization` reference | `lib/schema.js` `educationOrgSchema()` — added `subOrganization` array referencing DODO Coding's Organization with reciprocal `parentOrganization` `@id` link |
| 5 | Nav-chip "DODO Coding →" beside wordmark, md+ only | New `nav.codingChip` content key EN+ZH; new chip JSX in `components/layout/Navbar.jsx` between Wordmark and primary nav |

**Total surfaces touched:** 5 content surfaces + 2 component files + 1 schema file + 1 llms.txt = 5 files modified.

---

## Visual / spec adherence

- **Chip color:** Ink-blue (`#7AA8E0` border `rgba(31,78,140,0.30)`) to signal destination = Coding site. Mirrors the gold `kidsChip` / `growsIntoChip` pattern shipped in cohesion pass.
- **Home Coding band:** Per `.design/dodo-coding-launch/08-DODOLEARNING-TOUCHPOINTS.md` §"Touchpoint 1" visual spec. Light surface (#F5F5FF), ink-blue (`#1F4E8C`) H2, deeper ink eyebrow keyline, single "Visit DODO Coding →" CTA, typographic preview "Read · Think · Write · Critical thinking."
- **`--ink-deep` CSS variable** was reserved for this band but never added to globals.css. Inlined the ink-blue values directly in JSX for now. A polish pass can refactor to a token.

---

## What was NOT touched

- Existing footer Brand-column "Also from DODO" sibling line (`footer.sibling`) — kept; carries brand-family voice. User confirmed redundancy with Programs column is OK (different reading paths).
- AgeBandChooser — still 2-card. DODO Coding does NOT enter the chooser.
- Deep-funnel pages (`/methodology`, `/program`, `/results`, `/navigators`, `/lexile`, `/compare`, `/little-dodo`) — no cross-sell injected.
- Cohesion-pass output (commit `a5f1b11`) — preserved.

---

## Pre-existing inconsistency caught + fixed

`content/marketing.zh.js:106` had `footer.sibling.name = 'DODO 编程'` — the old planned ZH brand name. Per the Coding repo's CLAUDE.md, canonical ZH is "DODO 机器语言." Fixed alongside the cross-site loop edits since they sit in adjacent territory.

---

## Coordination with Coding-side companion apply

Companion log at `F:\PC-Documents\DODO_Coding_web\.design\cross-site-loop\03-APPLY.md`. Both Pass-1 sets applied in the same window (loop closes atomically).

---

## Open follow-ups (Pass-2, out of scope here)

- **About page paragraph on ELA side** acknowledging DODO Coding as a sibling project. Deferred to Pass-2 per `01-PROPOSAL.md`.
- **`NEXT_PUBLIC_DODO_CODING_URL` env var** wiring. Currently `href` is hardcoded to `https://coding.dodolearning.com`. Stage 2 cutover (dodocoding.com) will need either the env var or a content edit.
- **`--ink-deep` CSS variable** — could be tokenized in globals.css as a polish pass.

---

## Next steps

Commit + push when user triggers.
Suggested commit message:
> Cross-site loop Pass-1 (ELA side): close the sibling-family loop with DODO Coding — nav-chip, home band, footer Programs item, llms.txt block, schema subOrganization
