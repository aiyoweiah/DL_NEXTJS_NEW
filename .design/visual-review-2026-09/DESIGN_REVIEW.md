# Visual review — full site, live origin

**Date:** 2026-09-03 · **Reviewed against:** `.interface-design/system.md` v7.0 + `translation/BRAND_CONTENT_GUIDE.md` v6 (these are the brief; no separate DESIGN_BRIEF exists for the site as a whole) · **Skills applied:** `design-review` + `ui-ux-pro-max` (both sets, per standing rule)
**Instruments:** real Chrome on `www.dodolearning.com` (desktop ~1100–1120px true-colour; ~448px narrow pass), computed-style probes for every surprising colour/typeface, repo greps for every code claim. The in-app browser pane force-darkens pages and was **discarded as a colour instrument** (its geometry was still used). Screenshots were analyzed live, not persisted — every finding below carries a URL/section or `file:line` citation instead, which is more durable.
**Hard constraint honoured: no text copy was touched anywhere.** Copy problems are quarantined in the frozen register at the end.

---

## Summary

The system reads on the live site. The drawn-hand grammar (D-o brackets, lead-in quotes, swashes), the positional-gilt discipline, the Label/TagRun/Eyebrow vocabulary, and the light/dark rhythm are all visibly holding — this does not look like template output, and the **painted literary-world hero series** (steamboat `/program`, harbour `/consult`, ink-wash mountains `/methodology`, forest lake `/compare`, boy-by-lamplight `/results`, desk-and-lamp `/navigators`, blue jay `/about`, dock puppies `/demos`, baby dodo `/little-dodo`) is a genuine, ownable visual signature — it *is* the answer to the long-dangling "visual motif" question.

The defects cluster in four places: **one silent brand regression** (ZH typeface), **a handful of system escapees** on conversion surfaces, **dead-looking placeholder media**, and the already-known small-text/composition debt (Wave 4 territory, now visually confirmed). Separately, the site contradicts its own proof canon on four pages — copy, frozen, register below.

---

## Must fix (visual/code — no copy involved)

1. **ZH ships Noto Sans SC; every record says LXGW WenKai GB (D62).** Live probe: the five loaded chunks are `noto-sans-sc.*.woff2`, `styles/cjk-fonts.css` says `Source: Noto Sans SC Subset`, and `public/fonts/cjk/` carries only Noto. History: WenKai **was** committed (`fe4d5e4`) and then silently reverted in `799629f` (the D91 ZH `/faq` work) — a routine `npm run fonts:cjk` regeneration ran without `--source=lxgw-wenkai-gb` and the generator's default undid the brand decision while every guard stayed green (coverage is font-agnostic). **The sixth false-completeness claim, and the first created by a *default*.**
   *Fix, two parts:* (a) admin ruling — deploy WenKai for real, or re-rule D62 to Noto (honest option: Noto is measurably more readable at this site's 13–14px sizes — the original recommendation was display-only); (b) regardless of ruling, make the generator's source **sticky** (default to the manifest's current source, never a hard-coded default) and teach `check-cjk-coverage` to assert the expected family key so a font swap can never again be a side effect. *(Records corrected 2026-09-03 to state the divergence — decision-index D62 row, system.md §9.)*
2. **`/compare` s9 secondary is a hand-rolled bordered control on a conversion page.** `app/[locale]/compare/page.jsx:276` — a `<Link>` with inline `border: 1.5px solid rgba(240,240,240,.5)`, transparent fill, `hover:border-white`, no `.btn-do`, no marks. It is the unmigrated remnant of the D65 sweep (its primary sibling was converted; this one wasn't) and visibly breaks the option-B control grammar next to a correct gilt-swash primary. *Fix: class swap to `.btn-do` (label copy untouched).*
3. **No `color-scheme` declaration — algorithmic darkening inverts the palette.** The page's computed `color-scheme` is `normal`; browsers with forced/auto dark (Android Chrome Auto-Dark, several WebViews — i.e. exactly the ZH-market parent devices) repaint the hand-measured palette arbitrarily; observed directly in this session. *Fix: `:root { color-scheme: light }` (or the meta tag) plus a `theme-color` meta — the documented opt-out for algorithmic darkening; verified against Chrome/WebView docs, not testable in the app pane.*
4. **`/demos` row 1 renders three dead black rectangles.** The class-recording cards (pending `YOUTUBE_IDS`, Wave 6 #12) present as broken video players on a funnel page. Real fix is admin (real footage); *interim visual fix needs no new copy:* suppress the player chrome and reuse the existing `COMING SOON` Label treatment the footer already has, so the row reads as intentional.
5. **`/compare` founder video figure looks broken.** `compare/page.jsx:200–207` — an empty midnight panel with a play chip that does nothing (`pointerEvents: none`). Already open ruling (needs the embed URL); *interim code-only fix:* don't render a play affordance on a non-playable figure.

## Should fix (design pass — schedule with Wave 4)

6. **K2Note renders a double arrow.** `components/ui/K2Note.jsx:53–59` renders `{copy.linkLabel}` **plus** its own `→`, and the compare/demos linkLabels already end in `→`, producing "Explore Little DODO → →" sitewide. *Fix in the component (strip a trailing arrow before rendering) — zero copy edits.*
7. **Recurring half-empty wide sections at desktop.** The coding band (`/`), "diagnostic call" (`/consult`), trait-bars block (`/results`), "why a loop" (`/methodology`) all set ~50%-width text/graphics inside full-width sections, leaving a vacant right half that reads as unfinished rather than as active negative space. One compositional rule (pair content into the second column, or narrow the section measure) fixes all four.
8. **Grid orphans and rhythm.** `/compare`'s five comparison entries in a 3-col grid leave a vacant cell and the stacked entries in a column nearly touch (row-gap ≈ 8px between a block's last line and the next `vs.` qualifier); `/methodology`'s seven trait cards land 3+3+1 with a lone orphan. Small grid-template and gap adjustments.
9. **Home hero at tall viewports.** `min-height: calc(100dvh − nav)` with content top-clustered leaves a large void between the CTA row and the bottom-pinned trust line at ≥1050px-tall windows. Cap the min-height or redistribute.
10. **Imagery outliers against the painted world.** Worst: the scrabble-tiles/iPhone stock photo on `/navigators` — sitting inside the section whose text argues Navigators are named humans (Truth 2). Also the generic laptop close-up on `/compare`. Replace with painted-series art or real-Navigator photography (asset change, no copy).
11. **Video thumbnails are ZH-fronted on EN pages, and one carries off-canon verbs.** All three `/demos` "About the program" thumbnails + `/methodology`'s founder video show burned-in Chinese titles to EN visitors, and the LCS video thumbnail reads `读·思·讨·写` — "讨" (discuss) is not the Loop's 表达/Speak. Asset re-titling / per-locale thumbnails (media work, not site copy).
12. **The Wave-4 type floor, visually confirmed where predicted.** The dense sub-12px clusters are: stat-rail captions (6-tile rails on `/program`, `/consult`, `/little-dodo`), band meta rows (`GRADES 4–6 · LEXILE 580–720 …`), chart furniture (`/program` trait legend + "Scale 1–6", Lexile axis labels), and 10px hero chips (`pill` prop). Proceed with the planned design pass — raise/restructure, not a mechanical bump.
13. **`/consult` performance.** The renderer froze twice on this page during review (30s screenshot timeouts) and it feels heavy; likely the blurred media layers. Run the `web-perf` skill against it (and `/zh` home, which also froze once) before/after any fix.

## Could improve

14. The four LCS step cards on home read as generic dark rounded cards beside the drawn system — a brush `accent-top` or per-step mark would tie them in (respect the one-device-per-section budget).
15. `/little-dodo` relies entirely on imagery for its K-2 warmth; a slightly warmer tint on one or two of its surfaces would be within-system differentiation (§06b permits, doesn't require).
16. Anchor targets under the sticky navbar (`/faq` category pills) — verify `scroll-margin-top`.
17. The 40×40 hamburger clears WCAG but not the 44px recommendation — the most-tapped control on mobile.

## What works well — keep doing this

- **The painted hero series is the brand's visual signature.** Nine pages, one recognizable world, literary and warm, unmistakably not-generic. Recommendation: formalize it in system.md as the illustration program (subjects, palette, scrim rules) and close the old "visual motif" question with it.
- **The grammar holds in the wild.** Quoted eyebrows, D-o brackets, swash tiers, gilt only on the single lead (fork cards correctly lavender on home and `/program`), `score-marked` only on the earned number, TagRuns for taxonomy, Label chrome in footer/nav — reviewed page by page, no violations found beyond items 1–2 above.
- Bilingual identity texture (ZH sub-lines on EN heroes, bilingual card sub-labels) reads as deliberate and distinctive, not as leakage — worth writing down as a rule so it stays deliberate.
- Dark/light band rhythm and the hairline-and-tint surface system give the site its editorial calm; `/credentials` is a model citation surface.

---

## Frozen register — copy contradictions observed (NOT touched; each needs an admin ruling + apply-gated cascade)

| # | Where | What | Conflicts with |
|---|---|---|---|
| C1 | `content/marketing.en.js:276` (home "How it works" H2) | "About a grade level of reading growth in a sixteen-week cycle." | D8/§11 canon: one grade level over **two** cycles. `/methodology`'s own tiles state the canon correctly (100–150L per cycle; 1 grade / two cycles) — the site currently argues with itself across pages |
| C2 | `marketing.en.js:486` (`/program` growth block) | "Lexile 620 to 820 in 16 weeks" + "Typical 16-week result" | same |
| C3 | `marketing.en.js:794` (`/compare`) | "Lexile 620 to Lexile 790 in 16 weeks is a verifiable fact" | same |
| C4 | `marketing.en.js:1232–1233` (`/results` stat rail — **gilt-circled**) | "187 points" + "1.2 grade levels · average growth in 16 weeks" | **the exact figures §11 superseded on 2026-05-21** |
| C5 | `content/en/blog/*.mdx` (2 posts) | "The 16-Week Program" naming + "187 points ≈ one grade level in four months" | §09 rename + §11 canon (already in the rulings queue) |
| C6 | `/consult` phase labels + ZH lines | `诺断` ×3 (should be 诊断) — live on a conversion page, EN and ZH | known typo, apply-gated since 2026-08-30 |
| C7 | `/navigators` session timeline | "MINUTE 50–60: NEXT STEPS" | D11: sessions run **up to 50 min** |
| C8 | `/demos` band tags | "READ · THINK · WRITE" (no Speak) on the Grades 4–6 band vs "FULL LOOP" on others | §05: the Loop runs whole, every session — is a partial-Loop band canon-legal? Needs a ruling, not a silent fix |
| C9 | `/methodology` stat tile | "1 gradelevel" — check for a missing space in the unit label | cosmetic |

One ruling on C1–C4 (which growth claim is true?) unlocks a single apply-gated cascade; they should not be fixed piecemeal.

**Wave-4 status (2026-09-05 admin ruling, via before/after previews):** items #7 (all four sections — /consult trust was a live bug: inline `gridTemplateColumns` overrode `lg:grid-cols-2`), #12 (full 12px floor incl. three 9px labels the review missed; D94 qualifier exempt), #16/#17 — **shipped**. #14 brush accent — **ruled SKIP**: it would be a second drawn device in a section whose eyebrow already carries the quote; the one-device budget holds. #15 — **ruled APPLY**: `--color-hearth` minted (§06b), /little-dodo how-section. #13 resolved: Lighthouse desktop 98 on /consult (LCP 1.1s · TBT 0 · CLS 0) — the review-time freezes were instrumentation, not the site; one fix taken: mom-daughter hero JPEG → WebP (729→82 KB). Still open: #10/#11 imagery + footage (assets).

**Register status (2026-09-05 admin rulings):** C1–C4 **resolved by D99** — canon re-ruled to per-cycle, so these spots now conform and the two-cycle statements became the outliers (cascade drafted in `content-review/03-growth-canon-cascade-D99.md`, apply-gated). C5 naming + C6 (诊断) + C7 (timeline re-cut 35–45/45–50) + C8 (Full Loop relabel) **applied**. C9 verified non-defect in source (`{number} {unit}` renders with a space). C1–C4's companion finding: the same claim also lived at `en:198`, `en:1182`, `en:1530`, `zh:180`, `zh:259` — all conform under D99.

---

## Proposed execution order (all visual items, no copy)

1. **Quick wins, one small PR each:** color-scheme opt-out (#3) · `/compare` s9 class swap (#2) · K2Note arrow (#6) · founder-figure play chip (#5).
2. **CJK source stickiness + guard assertion (#1b)** — then whichever way the D62 ruling goes, it's one flag away and can never silently revert again.
3. **Composition pass (#7–#9, #14–#16)** together with **Wave 4's type-floor design pass (#12)** — same files, same review loop, per-page before/after previews under the apply-gate style of working.
4. **Asset work (#4 interim, #10, #11)** — imagery and thumbnails; needs admin-supplied or generated art.
5. **`/consult` web-perf audit (#13).**
Every step ships through the 14 guard passes; anything touching a ratchet banks with a reason; decisions log to `decision-log.md` (D97+).
