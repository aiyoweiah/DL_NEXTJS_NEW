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
- **Amended by D100** — the hero min-height cap in the batch below carried an
  unlogged collateral edit that collapsed the hero watermark to 0×0. This
  ruling stands; only that omission was corrected.

*(Executed in the same change, no new rulings needed: `/compare` s9 secondary onto
`.btn-do` (D53b conformance, V2) · founder-figure play affordance removed pending
the embed URL (V5) · K2Note trailing-arrow normalisation (V6) · `/compare` s3 row
gap restored (V8) · `/methodology` trait-grid orphan closed (V8) · home hero
min-height capped at 56rem (V8) · `/demos` placeholder players → quiet tinted
stills (V4 interim) · hamburger 40→44px + global `scroll-margin-top` (V11).)*

---

## 2026-09-05 · Admin rulings (via the visual rulings form)

### D62 · Executed as ruled — WenKai GB ships (not a new decision)

Admin ruled **redeploy WenKai**. Regenerated with
`npm run fonts:cjk -- --source=lxgw-wenkai-gb` — the first deliberate SOURCE CHANGE
through D97's banner. 10 chunks (2 static faces × 5 tiers, Medium serving 500–700),
730.7 KB vs Noto's 438.7 KB; charset unchanged (1,581). The `799629f` silent
reversion is closed at both ends: mechanism (D97) and state (this change). Status
row updated in the index; `system.md` §9 rewritten to match.

### D99 · Growth-claim canon re-ruled to per-cycle (content)

- **The decision.** The canonical growth rate is **about one grade level of reading
  growth per 16-week cycle**, and the measured set is restored as canon:
  **187 Lexile points average · 1.2 grade levels · 94% ≥ one full grade level.**
- **Overrides:** D8 / §11's 2026-05-21 two-cycle set ("one grade level over two
  16-week cycles", which itself superseded the 187/1.2 figures). Forward pointer
  added at D8's entry in `content-style-decisions.md`; both guides' §11 (+ §01,
  §02 objection, §06 framework row, §12 llms row, §13 XHS example) amended in the
  same change, EN + ZH.
- **Why.** The site argued with itself: `/methodology` stated the two-cycle canon
  while home, `/program`, `/compare` and the gilt-circled `/results` rail claimed
  per-cycle (frozen register C1–C4, plus five more spots found 2026-09-04). The
  admin ruled the measured single-cycle claim true; the canon-stating lines become
  the outliers.
- **Cascade:** drafted in
  [`../content-review/03-growth-canon-cascade-D99.md`](../content-review/03-growth-canon-cascade-D99.md)
  (14 rows + 4 flags, incl. the death of the 100–150L per-cycle range) — **apply-gated,
  not applied**. C1–C4, blogs, `en:198`/`1182`/`1530`, `zh:180`/`259` conform as-is.
- **Enforced by:** nothing mechanical (rate claims are prose); the guides mark §11
  as the sole source for rate claims `(unverified)`. **Trigger:** frozen register
  C1–C4, admin ruling 2026-09-05.
- **Applied 2026-09-05** (all 14 rows), **plus a 9-spot addendum** the original
  table missed, exposed when a truncated grep was redone honestly: `cities.js`
  proof stats EN+ZH, the ZH mirrors of rows 3/4/6/7 (`zh:460/797/963–971/1671–73`),
  `zh:817`, a third blog post (`mct-language-arts…mdx`), and a stale globals.css
  gilt-mark comment. Post-fix sweep of content/app/components/lib/public/styles:
  zero two-cycle or 100–150L survivors. Lesson banked: never trust a `head_limit`
  sweep as proof of absence.

### D92 · Ruled: FULL migration (content) — 2026-09-05

- **The ruling.** No header-vs-body line: everything migrates. All 19 gloss uses of
  `The Loop（学习循环）` stripped to bare `The Loop` (marketing.zh.js, faq.js,
  cities.js), the 4 non-gloss uses re-rendered (`完整 The Loop` stat unit,
  `个 The Loop 阶段` counter, `Full Loop` band tags matching C8's EN ruling), and
  the two superseded LCS renderings corrected to the glossary form 语言循环体系
  (`zh:279` link label, `zh:346` meta). The glossary's "存量正文待裁定" hold is
  resolved — no legacy form survives in live copy.
- **Where the rule lives:** glossary `The Loop` / `LCS` entries (now unconditional);
  BCG §06/§13 EN+ZH. **Enforced by:** nothing mechanical `(unverified)` — the
  glossary bars re-introduction for new translation.

### Flex 3 · Ruled: "Coursework Advancement / 课业进阶自由航行" + CAD (content) — 2026-09-05

- **The ruling** (via the rulings form): Flex 3's descriptor is **课业进阶自由航行 /
  Coursework Advancement**, retiring "GPA 管理 / GPA tutoring / GPA 辅导" (§10
  remedial framing, flagged since the 2026-08-26 critique); and **all prices are
  CAD**, now stated on every price-bearing answer (/faq ×3, llms-full EN+ZH).
- **Applied same day** on the admin's "apply": /faq (5 rows), /program tier list
  EN+ZH, llms-full tier lists EN+ZH, both guides' §06b rows + ⚠️ boxes → ✅,
  §17/vocab rows, glossary, DEEPSEEK_BRIEF. Anti-remedial frame: "runs ahead of
  the classroom, not behind it / 走在课堂前面的学科支持".
- **Deliberately out of scope:** `/partners`' "GPA Navigation" (separate B2B
  product, unruled — flagged) and /ops PDF tools (agreement-adjacent copy).
- **Where the rule lives:** BCG §06b + §17, glossary. **Enforced by:** nothing
  mechanical `(unverified)`; §10 bars 辅导/tutoring on sight. **Trigger:** D13 /
  §06 ⚠️, admin ruling. D13's figure re-verification remains open.

### §5 fill classes · Ruled: migrate — retired at the definition (interface) — 2026-09-05

- Admin ruled "migrate to btn-do". Executed with the D53b scope note honoured:
  the AudiobookPlayer's download CTA (a true text control) → `.btn btn-do`; its
  play/skip trio is **media transport — explicitly outside the control grammar** —
  so it keeps its filled look via locally-scoped `.audio-play`/`.audio-skip`
  (values verbatim from the retired classes), per the ⚠️'s own "scope audiobook
  styles locally" alternative. `.btn-primary`, `.btn-solid`, `.btn-ghost`,
  `.btn-outline`, `.btn-charter`, `.btn-gilt` deleted from globals.css (D75
  precedent), forced-colors + print rules updated, `Button.jsx`'s stale fill-era
  header corrected (it had mapped every variant to `.btn-do` since D79).
  **Enforced by:** `check-utility-emitted` (baseline re-banked minus the retired
  classes). D53b's option B is now complete — no fill class exists to misuse.

### D100 · The hero watermark is sized by its wrapper, not the viewport (interface)

- **The decision.** The homepage hero's O-glyph watermark wrapper is pinned
  `top:0; bottom:0; right:0` so it has a **definite height**; the glyph keeps
  `height:100%` and therefore tracks the hero. Reverting to `100dvh` was
  rejected — it sizes the glyph to the viewport (900px at 1440×900) rather than
  to the capped hero (1035px), which is what the cap was reaching for.
- **Why.** D98's executed batch capped the hero at `min(100dvh - nav, 56rem)`
  and, as an **unlogged collateral edit**, changed the glyph from `height:100dvh`
  to `height:100%`. The intent was right — `100dvh` overflows the shorter hero —
  but the wrapper was positioned by `top`+`right` alone, so its height was
  content-derived. A percentage height against an indefinite parent resolves to
  zero: **wrapper and glyph both collapsed to 0×0 from `9ef48c0` until
  `97e96fc`**, and the hero shipped that whole period with no figural background.
- **Measured** (built output, 1440×900): wrapper 0 → 1034.75px, glyph 0×0 →
  1034.75 × 1061.28. `/zh` at 375×812 confirms no horizontal overflow — the
  section's `overflow:hidden` still bleeds the O off the right edge as designed.
  Confirmed on `www.dodolearning.com` after deploy (wrapper inline style
  `top:0;bottom:0;right:0;z-index:1`, glyph 1034.81 × 1061.34).
- **Amends D98** — the parenthetical batch under its entry recorded the
  min-height cap but not the glyph edit; that omission *is* the defect. D98's
  ruling itself stands unchanged.
- **Enforced by:** — ⚠️ nothing `(unverified)`. None of the 14 guards fails when
  an element silently sizes to zero: every one reads colour, type, tokens or
  class inventory, and none reads geometry. A `check-zero-size` guard is proposed
  against [`architecture-cohesion-proposal.md`](architecture-cohesion-proposal.md)
  §9 (geometry is unguarded); its shape was **ruled 2026-09-05 as D101**, still unbuilt. **Trigger:** owner report, 2026-09-05.

**Lesson.** The edit appears in neither `9ef48c0`'s commit message nor
`DESIGN_REVIEW.md`, which has no watermark item at all. §4 of the cohesion
proposal records three claims that were sincere and false *when written*; this is
the inverse and is harder to catch — nothing was written down, so there was no
claim for a later reader to doubt. The ratchets stayed green throughout, because
an element that renders at 0×0 still counts as one element.

### D101 · Ruled: `check-zero-size` ships standalone before it ships in the build (interface)

- **The ruling** (three questions put to the admin, all answered 2026-09-05):
  **(1)** the guard ships as `npm run check:geometry`, **outside the 14**, and is
  promoted into `postbuild` only after it has run quiet through several visual
  passes — a sequence, not a compromise. **(2)** Two viewports, 1440×900 and
  375×812. **(3)** Scope is decorative positioned elements only.
- **Why standalone first.** It is the first guard that must *render* rather than
  read, so it needs headless Chrome installed on Windows, the Mac and
  Cloudflare's builder. A guard that fails to install in the deploy path converts
  a healthy site into a failed deploy. Standalone's weakness is that it relies on
  someone remembering to run it — the very thing that failed in D100 — but that
  is survivable for a few weeks in a way a broken deploy is not.
- **Why two viewports and decorative-only.** Two exercise both sides of nearly
  every responsive rule written here; tablet is added only against a real bug.
  Decorative-only keeps the banked baseline small enough that a person reads the
  diff — the property that makes `check-surfaces` and `check-utility-emitted`
  work, and whose absence would make this one theatre.
- **Validation gate — blocking.** The guard is trusted nowhere until it is run
  against `9a205a4` and **observed to fail** on the collapsed glyph (§4's
  instrument warning). Green from an instrument never seen to go red is silence,
  not evidence.
- **Status: BUILT 2026-09-06** — `scripts/check-zero-size.mjs`, run as
  `npm run check:geometry`, standalone exactly as ruled; `prebuild`/`postbuild`
  are untouched and the 14 remain 14. Drives an already-installed Chrome or Edge
  through `puppeteer-core` (no bundled Chromium; `CHROME_PATH` overrides), so
  nothing heavy enters the deploy path.
- **Validation gate PASSED** — recorded in
  [`../scripts/ZERO-SIZE-VALIDATION.md`](../scripts/ZERO-SIZE-VALIDATION.md).
  Against `9a205a4` the probe exits **1** with 8 findings (the watermark wrapper
  and its `<svg>`, x2 viewports, x2 locales) while that same build passes all 14
  existing guards with exit 0. Against `main` it exits 0 across 120 routes. The
  instrument has been seen to go red, and red for the right element — not merely
  seen to stay green.
- **Banked baseline is empty**, which is itself a claim: no decorative element on
  this site is legitimately zero-area, so any future entry is a regression until
  ruled otherwise.
- **Closes the guard gap opened by D100.** Design in
  [`architecture-cohesion-proposal.md`](architecture-cohesion-proposal.md) §9.
  **Promotion into `postbuild` stays deliberately deferred** until it has run
  quiet through several visual passes — that deferral was the ruling's point.

---

## 2026-09-09 · Admin rulings on the GEO audit (R1–R7)

Source: `docs/geo-audit-2026-09.md` § Rulings requested; rulings given in chat 2026-09-09.
Cascade rows staged in `content-review/05-geo-rulings-2026-09-09.md` — **apply-gated,
not applied.**

### D102 · The founding year is 2020 (content)

- **The decision.** DODO Learning was founded in **2020** in Canada (relaunched 2025
  with the full curriculum upgrade). The 2021 figure is retired everywhere it appears:
  the founder bio EN/ZH (`content/marketing.en.js:1825/1841/1854`,
  `marketing.zh.js:1739/1752/1762`), the `Person` schema bio and `foundingDate`
  (`lib/schema.js:456/167`), `llms.txt:65`, `llms-full.txt:206/210`,
  `llms-full.zh.txt:189/193`.
- **Why.** Brand guide §11 has said 2020 since v3.1, and the `/about` numbers section
  renders "Founded in 2020 in Canada. Relaunched 2025" (`en:556`) — while the founder
  bio three sections below on the same page, the Person schema and all three llms
  files said 2021. Two founding years on one entity is exactly the kind of
  contradiction a citation engine trips on.
- **Where the rule lives:** BCG §11 (EN + ZH; D-number noted). **Enforced by:**
  nothing mechanical `(unverified)` — proposal G-1 `check-canon` would carry the
  strings `2021 she founded` / `2021 年，她`. **Trigger:** GEO audit F8 / ruling R1.

### D103 · The credential is "degrees", never "graduate degrees" (content) — restates D18

- **The decision.** Navigator credentials read **degrees from world top-50
  universities** (Oxford, U of T, Queen's, LSE and others). "Graduate degree(s)",
  "graduate-degree holder" and 研究生学位 are retired on every surface — thirteen
  spots: `/faq` (`content/faq.js:125/252`), `/about` (`marketing.en.js:572`,
  `zh:547`), `/program` (`en:949`, `zh:912`), `/methodology` (`en:1345–1346`,
  `zh:1280`), `/navigators` (`en:1410`, `zh:1344`), `llms-full.txt:9/83`,
  `llms-full.zh.txt:82`. `llms.txt:9` ("graduates of world top-50 universities")
  already conforms and is the reference sentence.
- **Why.** §11 / D18 claims degrees, not graduate degrees, because the named pool
  cannot be verified to the stronger claim. Ten customer-facing spots and three
  machine-surface spots overclaimed; the audit swept only the machine surfaces and
  the apply-time sweep found the other ten.
- **Overrides:** nothing — restates D18's wording; D18 gains a forward pointer in
  `content-style-decisions.md`. **Where the rule lives:** BCG §11 (EN + ZH).
  **Enforced by:** nothing mechanical `(unverified)`; G-1 candidate string
  `graduate degree`. **Trigger:** GEO audit F7 / ruling R2.

### D104 · City pages carry `areaServed` only (machine surface)

- **The decision.** `citySchema()` emits `@type: 'EducationalOrganization'` with
  `areaServed`, `parentOrganization` and `contactPoint`; the `LocalBusiness` type
  and the `PostalAddress` block are retired (`lib/schema.js:639`, `:649–654`).
- **Why.** The program is delivered online and has premises in none of the 20
  cities. Twenty addressless `LocalBusiness` nodes are the pattern structured-data
  validators discount and Google's LocalBusiness guidance excludes; they add no
  entity signal an `areaServed` list does not already carry.
- **Where the rule lives:** the §4 header comment in `lib/schema.js`. **Enforced
  by:** nothing mechanical `(unverified)`. **Trigger:** GEO audit S2(c) / ruling R5.

### D105 · `sameAs` begins — the YouTube channel is DODO's (machine surface + chrome)

- **The decision.** `https://www.youtube.com/@DODO-Learning` ("DODO Learning
  Canada", channel `UCUTdsHg4VHnquYGBDQm7M1A`) is confirmed as DODO's and becomes
  the first `sameAs` entry on the `EducationalOrganization` node
  (`lib/schema.js:183–187`), plus a footer Resources link ("YouTube", EN + ZH,
  `external: true`). Xiaohongshu / WeChat OA URLs remain pending — workflow Open
  Decision #9 is now partially closed.
- **Why.** Entity disambiguation: in Bing-backed results "Dodo Learning" is also an
  unrelated corporate LMS app. A verified profile link is the cheapest signal that
  tells a model which entity this site is.
- **Where the rule lives:** `lib/schema.js` §1; `content/marketing.{en,zh}.js`
  footer. **Enforced by:** nothing mechanical `(unverified)`. **Trigger:** GEO
  audit O2/O3 / ruling R6.

### R3 · R4 · R7 — evaluated, awaiting the owner's pick (not yet decisions)

- **R3 (blog).** The March bylines are placeholders (owner-confirmed), and both
  March posts carry banned register (intervention ×12 EN, 干预 ×12 ZH, "ESL
  support" framing). Options B (prune to the MCT post) and C (retire `/blog`,
  re-home the MCT article as an evergreen page) are drafted with GEO impact per
  surface; **C recommended**.
- **R4 (`/assessment`).** An `UnderConstruction` shell linked only from the footer
  with `soon: true`. Repurposing it as a second contact page is recommended
  against (URL semantics, D27/D29/D30, `/consult` already carries the email/WeChat
  cards); two alternatives drafted.
- **R7 (OG card).** Placeholder confirmed — uniform `#0E0E12`, `83830ea`, no brief
  anywhere. Four candidates rendered from the built site's own assets to
  `.design/og-card-2026-09/`; wiring rows drafted (per-locale OG default, square
  logo for the Organization node).

### D102–D105 · Applied 2026-09-09 (same afternoon)

All four rulings applied on the owner's "apply", plus M1 (blog canonical). Build green, 14/14 guards; `content-audit` parity 0 · anti-dictionary 19 (baseline). **D103 landed on 16 spots, not 13** — the post-apply sweep (the D99 lesson) found the `/compare` "Longitudinal knowledge" row EN+ZH and `llms-full.zh.txt:9`, which the staged table had missed because a truncated grep hid them. Recorded in `content-review/05-geo-rulings-2026-09-09.md` § Status. **Enforced by:** still nothing mechanical — the retired strings (`graduate degree`, `研究生学位`, `2021 she founded`, `LocalBusiness`) are the first seeds for G-1 `check-canon`, now specified as an extension of `scripts/content-audit.mjs` (see `docs/geo-audit-2026-09.md` § Update).
