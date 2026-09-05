# Decision log — D97 onward

**Created:** 2026-09-03 · **The single append-only log for all new decisions**, content
and interface alike. The historical two-log split (content in
`content-style-decisions.md`, interface inline in the old `system.md`) collapsed in
practice during the 2026-09-02 sessions — D94/D96 landed in the content log, D95 in
neither — so it was retired rather than repaired.

**Lineage — where every existing D lives:**

| Range | Record |
|---|---|
| D1–D50 · D91–D96 | [`content-style-decisions.md`](content-style-decisions.md) (closed; D95 backfilled at its foot) |
| D33–D90 (interface narratives) | [`_archive/interface-system-v6.44.md`](_archive/interface-system-v6.44.md) — the pre-restructure interface guide, verbatim |
| D97+ | **this file** |

**Rules (unchanged from the old logs):**

1. Append only. Never renumber, never relocate an entry.
2. Each entry: the decision · what it overrides (say so at BOTH ends — the old entry
   gets a forward pointer) · where the rule now lives (guide section, component,
   guard) · the trigger.
3. A claim that something is "gone", "retired" or "used nowhere" **names the guard
   that enforces it**, or is written `(unverified)`.
4. Add a status row to [`decision-index.md`](decision-index.md) in the same change.
   **Status lives there, never here.**
5. Guides restate the *rule*, citing the D-number; they never restate the narrative.

---

## 2026-09-04 · Visual-review execution (quick wins + CJK discipline)

### D97 · The CJK source font is sticky, and the guard names it (interface)

- **The decision.** `npm run fonts:cjk` with no `--source` flag now defaults to the
  **committed manifest's existing source**, never to a hard-coded font; changing the
  typeface requires an explicit flag and prints a SOURCE CHANGE banner.
  `check-cjk-coverage` now (a) prints the shipping source on every ✓ line and
  (b) fails on a half-regenerated state where chunk filenames or
  `styles/cjk-fonts.css` disagree with the manifest's declared source.
- **Why.** D62 (ZH = LXGW WenKai GB) was built in `fe4d5e4` and **silently reverted
  to Noto** by a routine regeneration in `799629f` — the old hard-coded default made
  the typeface change a *side effect*, and every guard stayed green because coverage
  is font-agnostic. Found by eye on the live site (visual review 2026-09-03), not by
  any instrument. A regeneration may change the character set; only an explicit flag
  may change the face.
- **What this does NOT decide:** which face ZH *should* ship. That is the open D62
  ruling (redeploy WenKai vs re-rule to Noto) — see `decision-index.md` § Open.
- **Enforced by:** `check-cjk-coverage` (source-consistency pass, both wirings) +
  the generator default. **Trigger:** visual review V1,
  `.design/visual-review-2026-09/DESIGN_REVIEW.md`.

### D98 · The site declares itself light (interface)

- **The decision.** The single-theme light site says so explicitly:
  `color-scheme: light` on `:root` (`styles/globals.css`) and
  `colorScheme: 'light'` + `themeColor: '#0E0E12'` in the root `viewport` export
  (`app/layout.jsx`).
- **Why.** With no declaration, browsers that darken algorithmically (Android
  Chrome Auto-Dark, WebView `setAlgorithmicDarkeningAllowed` — the ZH-market
  parent devices) repaint every measured colour arbitrarily; observed live
  2026-09-03. The declaration is the documented opt-out. Every contrast ratio in
  the system assumes the painted palette; this line is what makes those ratios
  reach such browsers.
- **Enforced by:** — ⚠️ attention only (a guard could grep the built CSS for the
  declaration; add one if this ever regresses). **Trigger:** visual review V3.

*(Executed in the same change, no new rulings needed: `/compare` s9 secondary onto
`.btn-do` (D53b conformance, V2) · founder-figure play affordance removed pending
the embed URL (V5) · K2Note trailing-arrow normalisation (V6) · `/compare` s3 row
gap restored (V8) · `/methodology` trait-grid orphan closed (V8) · home hero
min-height capped at 56rem (V8) · `/demos` placeholder players → quiet tinted
stills (V4 interim) · hamburger 40→44px + global `scroll-margin-top` (V11).)*
