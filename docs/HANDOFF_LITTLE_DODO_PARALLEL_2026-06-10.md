# Handoff — Little DODO parallel workstream

**From:** session continuing DODO Coding launch planning (2026-06-10)
**To:** parallel agent continuing Little DODO implementation + integration into dodolearning.com
**Repo:** `F:\PC-Documents\DODO_web\DL_NEXTJS_NEW`
**Branch:** `main` (per project memory; the SessionStart hook reports sync status — read it once at the top of your session)
**Apply-gate:** active. **Do not edit `content/`, `app/[locale]/**`, `lib/schema.js`, `public/llms.txt`, or any source doc until the user gives an explicit "apply" trigger.** Stage proposals under `.design/` first.

> **2026-06-11 STATE UPDATE — Little DODO cohesion pass applied.** Substantial post-handoff change:
> the original brief's "Navigators: Shared/similar" line is **superseded** — Little DODO is staffed
> by *dedicated early-childhood educators specializing in phonetics, fluency, and pronunciation*,
> NOT the same humans as ELA Navigators. Family-level homepage reframe also applied ("Live,
> Navigator-led English literacy — ages 5 through high school"). Affects 19 string locations across
> `marketing.{en,zh}.js`, `faq.js`, `llms.txt`, `llms-full.txt`, `schema.js`, plus a structural
> `app/[locale]/little-dodo/page.jsx` change (growsIntoChip + HowSection inline `/methodology`
> link). See `.design/little-dodo-cohesion-pass/{01-FINDINGS,02-COPY-PROPOSALS,03-APPLY}.md` for
> full context. Open-task #1 below has had its scope **reduced** as a result — see the inline edit
> in the table.

---

## Why this handoff exists

Two parallel workstreams are now running on the same repo:

1. **DODO Coding launch planning** — owned by the originating session. Full proposal set staged at `.design/dodo-coding-launch/` (9 docs + archive). Architecture pivoted on 2026-06-10 from `/coding/*` subdir to a sibling-site model. **You are NOT this workstream.** Do not edit anything inside `.design/dodo-coding-launch/`.
2. **Little DODO implementation + integration (this is you)** — continuing the K-2 program's content depth and cross-page integration. Little DODO's page + chrome integration shipped 2026-06-02; PFP elevated it to parallel visibility 2026-06-09. What's left is content polish, K-2-specific deferred items (Navigator profile, demo footage, testimonial), cross-page refinements, and any open guardrails not yet closed.

Read this handoff first. Then read `docs/little-dodo-plan.md` (the K-2 brief). Then read `docs/SUCCESSOR_HANDOFF.md` for the broader session history. Avoid the `.design/dodo-coding-launch/` folder unless you need to verify a shared touchpoint boundary (covered below).

---

## What Little DODO currently is — state of play

**Page:** `app/[locale]/little-dodo/page.jsx` (366 lines, bilingual EN/ZH via inline COPY pattern lifted from `content/marketing.{en,zh}.js` exports `littleDodo` + `ageBands`).

**Chrome integration (shipped):**
- Footer Programs column item 2: "Little DODO (5–8)" → `/little-dodo`
- `AgeBandChooser` component on the home page (`app/[locale]/page.tsx`) — 2-card pattern: Little DODO (K–2) + ELA Program (Grade 3+). **This component is locked as 2-card. Do not extend.** See "Shared touchpoints" below.
- `/little-dodo` is on the `PreCtaBand` SUPPRESS list (page owns its in-body close)
- `littleDodoCourseSchema()` in `lib/schema.js`
- Sitemap + llms.txt EN/ZH entries

**Voice/positioning:**
- K-2 warmer register, NOT Lexile-heavy, NOT "highest cognitive level / argue with evidence"
- Operational pillars shared with ELA Program (tuition, environment, frequency, Navigator model)
- Marketing/packaging emphasis distinct: "high-frequency, low-pressure foundational reading + comprehension"
- ZH name: **都学启蒙** (transcreation, not literal translation of "Little DODO")
- See `docs/little-dodo-plan.md` §"Audience & emphasis shift" for the full voice contract

---

## What's open for you to work on

These are the K-2 follow-ups still pending. Tackle in any order; each is independently shippable.

| # | Open item | Where it lands | Notes |
|---|---|---|---|
| 1 | **Tag Little DODO educators on `/navigators` roster** | `/navigators` — add Little DODO educator profile cards alongside existing ELA Navigators, distinguished by a "Little DODO" tag. ✏️ Scope reduced 2026-06-11 (cohesion-pass apply): admin clarified Little DODO is staffed by a dedicated early-childhood educator team — NOT the same humans as ELA Navigators. So this is a roster addition + tagging system, not a competency-tag-on-existing-Navigator change. Source-of-truth for Navigator data: check `content/navigators.*.js` or wherever the existing /navigators cards live. See `.design/little-dodo-cohesion-pass/03-APPLY.md` for context. |
| 2 | **K-2 demo footage** | When a real recorded K-2 sample session exists, add it to `/demos` AND embed/link it from the `/little-dodo` page's "How Little DODO works" section. Currently the Watch Demo Class CTA in the hero routes to `/demos`, which is the general program demo. K-2 demo needs to be distinguishable. | No fabricated content. Block on real recording. |
| 3 | **K-2 testimonial** | Add to `/results` case cards when the first K-2 family has a story worth telling. Mirror the existing case-card template. | Block on real testimonial. |
| 4 | **K-2 FAQ entries — scope reduced** | `content/faq.js` — ✏️ Scope reduced 2026-06-11: the Little DODO FAQ category (id `little-dodo`) already exists with 6 Q+A entries in both locales, and the substance language was corrected in the 2026-06-11 cohesion-pass apply ("dedicated early-childhood educator specializing in phonetics, fluency, and pronunciation"). What's still open is ADDING new questions that aren't yet covered — e.g. "When can my 5-year-old start?", "Is there a screen-time concern?", "What does a Little DODO session look like minute-by-minute?", "How do you assess readiness to move to the ELA Program?" The FAQ category-pill nav already includes Little DODO. | EN+ZH parity required. |
| 5 | **Cross-page polish** | Audit `/program`, `/methodology`, `/about`, `/results`, `/navigators`, `/faq` for places where the K-2 band is mentioned briefly — verify framing consistency, ZH parity, and link integrity | Light-touch only. The big chrome work shipped 2026-06-09 via PFP; this is cleanup. |
| 6 | **`/little-dodo` content depth** | The page is 366 lines; review sections for clarity, K-2 warmth, ZH parity, and image/asset polish. If sections feel underwritten, propose copy expansions via `dodo-content-writer` skill | Stay within `.interface-design/system.md` rules: funnel ladder, PreCtaBand SUPPRESS, no-dropdown nav. |
| 7 | **`/little-dodo` performance + a11y** | Run web-perf skill if available. K-2 audience often = parents on mobile during nap time → mobile perf matters. Image (`little-dodo-background.webp`, 2560×1429) → check actual served sizes and LCP. | If a real bug surfaces, fix; if it's just a polish opportunity, propose first. |
| 8 | **K-2 specific SEO/GEO** | The DODO SEO+GEO plan ([project_dodo_seo_geo](memory)) had 0/32 baseline as of prior session. Verify K-2-specific prompts ("English program for 5 year old", "kindergarten English class", etc.) are in the locked prompt set OR propose adding them | Coordinate via SUCCESSOR_HANDOFF if SEO workstream has its own active session. |

If you discover other Little DODO follow-ups not in this list, surface them to the user — don't silently expand scope.

---

## What's become OBSOLETE — do not act on these instructions

Several prior session artifacts contain instructions that have been overturned by recent decisions. **Treat the following as obsolete; ignore any guidance from them.**

### Obsolete files (do not read as current direction)

| Path | Why obsolete |
|---|---|
| `.design/dodo-coding-launch/_archive-2026-06-09/01-PROPOSAL.md` | Assumed `/coding/*` subdir under dodolearning.com. **Reversed 2026-06-10** — DODO Coding now ships as sibling site (coding.dodolearning.com → dodocoding.com). |
| `.design/dodo-coding-launch/_archive-2026-06-09/02-THEME.md` | Proposed adding `--ink` token family to DL's design system. **Reversed** — DODO Coding has its own design system on its own site; no theme additions land in DL_NEXTJS_NEW except a single `--ink-deep` scoped to the DODO Coding home band (lands when `08-DODOLEARNING-TOUCHPOINTS.md` applies). |
| `.design/dodo-coding-launch/_archive-2026-06-09/03-SCAFFOLD.md` | Proposed `app/[locale]/coding/*` routes inside DL_NEXTJS_NEW. **Never create these.** No `/coding/*` route will ever exist on dodolearning.com. |
| `.design/dodo-coding-launch/_archive-2026-06-09/04-COPY-PASS.md` | Copy was for `dodolearning.com/coding` pages that won't exist | |
| `.design/dodo-coding-launch/_archive-2026-06-09/05-NAMING-ALTERNATIVES.md` | Already marked SUPERSEDED in 2026-06-09; ignore. |
| `.design/dodo-coding-launch/_archive-2026-06-09/06-LOOP-SUBSTANCE-EXTRACTION.md` | The "Loop substance extraction" concept itself is retired. DODO Coding's no-Loop direction is baked in natively across the new docs; no extraction artifact is needed. |
| `.design/dodo-coding-launch/_archive-2026-06-09/07-MARKETING-GUIDE-REVISION.md` | Superseded by `.design/dodo-coding-launch/06-MARKETING-GUIDE-V2.md` (full v2.0 rewrite). |
| `.design/dodo-coding-launch/_archive-2026-06-09/08-CURRICULUM-DOC-REVISION.md` | Superseded by `.design/dodo-coding-launch/07-CURRICULUM-V2.md` (full v2.0 plan). |
| `.design/dodo-coding-launch/_archive-2026-06-09/09-APPLY.md` (empty placeholder) | Apply log will be written anew during the actual apply window. |
| `.design/dodo-coding-launch/_archive-2026-06-09/README.md` | Index for the old set; ignore. |

**You don't need to read any of these.** They are kept on disk for decision history.

### Obsolete instructions (in case you encounter them elsewhere)

- **"Add a third card to `AgeBandChooser` for DODO Coding"** — NEVER. `AgeBandChooser` is locked 2-card. DODO Coding will get its own home band, structurally separate from `AgeBandChooser`, when `08-DODOLEARNING-TOUCHPOINTS.md` applies.
- **"Add `/coding/methodology` callouts to ELA pages"** — NEVER. ELA pages stay 100% ELA-focused. The only DODO Coding mentions on dodolearning.com are the home band, footer column item 3, llms.txt umbrella line, and schema `subOrganization` field.
- **"Add DODO Coding's three-verb loop graphic to ELA design tokens"** — DODO Coding has no methodology graphic; the three verbs render as inline typography on DODO Coding's own site.
- **"Coordinate sequentially with `program-family-parallel`"** — PFP shipped 2026-06-09. No active sequencing constraint with PFP exists anymore. The PFP folder at `.design/program-family-parallel/` is historical.
- **"DODO Coding lives at `dodolearning.com/coding/`"** — REVERSED. DODO Coding is on its own host. Anyone proposing a `/coding/` route on dodolearning.com is operating on obsolete information.
- **The Loop methodology retired only on DODO Coding** — important distinction: **ELA's "The Loop"** (Read → Think → Speak → Write, the ELA per-session rhythm) is STILL ACTIVE on dodolearning.com. It appears in copy, in the marketing modules, in the compare page graphic. Do not remove ELA's Loop references thinking the retirement applied to ELA — it didn't. DODO Coding only never had The Loop as a parent-facing name; ELA always did and continues to.

---

## Shared touchpoints — files we BOTH may need to edit (coordinate)

These are the danger zones where your Little DODO work and the DODO Coding workstream may conflict at apply time. The DODO Coding workstream has a reservation on specific keys/fields/lines; everything else in these files is fair game.

### `content/marketing.en.js` + `content/marketing.zh.js`

| Key | Reserved by | Notes |
|---|---|---|
| `marketing.codingBand` | DODO Coding workstream (apply via `08-DODOLEARNING-TOUCHPOINTS.md`) | **Do not add or modify this key.** It carries the DODO Coding cross-sell band on the ELA homepage. |
| `marketing.footer.columns[programs].items[2]` (the third footer Programs item) | DODO Coding workstream | **Do not add a third footer item.** Slot 2 is your Little DODO; slot 3 is reserved for DODO Coding. |
| `marketing.littleDodo.*` | You | Free to edit |
| `marketing.ageBands.*` | You (and `AgeBandChooser`) | Free to edit — but `AgeBandChooser` stays 2-card |
| `marketing.nav.*`, `marketing.footer.*` (other columns/items) | Shared, low-conflict | Use normal coordination care |
| Everything else | You | Free to edit |

### `lib/schema.js`

| Entity | Reserved by | Notes |
|---|---|---|
| `Organization` schema's `subOrganization` field | DODO Coding workstream | Reserved for the DODO Coding Organization reference. **Do not add `subOrganization` to this schema.** |
| `littleDodoCourseSchema()` | You | Free to edit |
| Everything else | You | Free to edit |

### `public/llms.txt`

| Section | Reserved by | Notes |
|---|---|---|
| `## DODO Coding (sibling site)` block | DODO Coding workstream | This block does not yet exist; it lands when `08-DODOLEARNING-TOUCHPOINTS.md` applies. **Do not preemptively add it.** |
| Everything else | You | Free to edit — including the DODO Learning product-family section, Little DODO entries, etc. |

### `app/globals.css`

| Token | Reserved by | Notes |
|---|---|---|
| `--ink-deep` CSS variable | DODO Coding workstream | Reserved for the DODO Coding home band's H2 sub-headline. **Do not introduce other ink-family variables** to avoid token collision. |
| Existing lavender, gold, dark canvas, body, muted, border tokens | Shared | Free to consume; don't redefine |

### `app/[locale]/page.tsx` (ELA homepage)

| Region | Reserved by | Notes |
|---|---|---|
| New section between "Navigator is a map" and the closing call (PreCtaBand or in-page close) | DODO Coding workstream | This is where the DODO Coding home band will land. **Do not place a new Little DODO section in this slot.** |
| `AgeBandChooser` placement | You (it's PFP's work, already shipped) | Free to refine, but stays 2-card |
| Existing sections (Hero, stats, Who We Are, Navigator is a map, closing) | Shared | Coordinate normally |

---

## Files and folders that are entirely the DODO Coding workstream's — do not touch

| Path | Why |
|---|---|
| `.design/dodo-coding-launch/` (all files at root, plus `_archive-2026-06-09/`) | The full proposal set for the DODO Coding sibling-site launch. Read-only from your perspective. |
| `F:\PC-Documents\DODO_Coding_web\` | Future DODO Coding repo location. Does not exist yet. Will be a separate GitHub repo. |
| `F:\PC-Documents\DODO_Coding\marketing\dodo-coding-content-guide.md` | DODO Coding marketing source doc. v2.0 revisions are staged at `.design/dodo-coding-launch/06-MARKETING-GUIDE-V2.md`. |
| `F:\PC-Documents\DODO_Coding\curriculum\program-streams-v1.md` | DODO Coding curriculum source doc. v2.0 revisions are staged at `.design/dodo-coding-launch/07-CURRICULUM-V2.md`. |

If you discover something in your Little DODO work that crosses into one of the above, surface it — don't act.

---

## Constraints you MUST follow

Pulled from `CLAUDE.md`, `.interface-design/system.md`, and project memory. Non-negotiable.

1. **Content apply-gate.** Never edit `content/marketing.{en,zh}.js`, `content/faq.js`, `lib/schema.js`, `public/llms.txt`, or any `app/[locale]/**` page until the user gives an explicit "apply" trigger. Stage proposals in `.design/` first (a new subfolder under `.design/` for your workstream is the right pattern — propose a name to the user before creating).
2. **Bilingual parity.** Every EN copy proposal carries a ZH mirror in the same doc. Use brand-voice translations (not literal). For ZH brand voice on the K-2 audience, consult `docs/little-dodo-plan.md` and existing `content/marketing.zh.js` `littleDodo` entries for register.
3. **Funnel ladder.** Watch Demo Class = soft / Book Your Consultation = firm. Assessment is NEVER a CTA. This is the spine — see `.interface-design/system.md` §"The funnel ladder."
4. **`PreCtaBand` rules.** Every page that owns an in-body close gets added to the SUPPRESS list. `/little-dodo` is already there. If you add a new page that owns a close, add it to SUPPRESS.
5. **Flat 6-item navbar, no dropdown.** Don't propose a dropdown. Don't propose a 7th primary item. K-2 navigation lives in the `/little-dodo` page + footer Programs column item 2 + home `AgeBandChooser`.
6. **K-2 voice register.** Warmer than ELA Program's, but NOT cutesy. No "fun" / "engaging" / "exciting." No animated mascots. No exclamation marks. No emojis. The K-2 audience is parents of 5–8-year-olds choosing a gentle, consistent start — speak to the parent.
7. **Sync-check cadence.** Run `git fetch && git status -sb` only at session start (or before any push). The SessionStart hook handles the start-of-session check. Do not poll between tasks.
8. **Filesystem rules (Windows).** User's Documents folder is redirected to `F:\PC-Documents\`. Never use `~/Documents`, `$HOME/Documents`, `/c/Users/hsink/Documents/`, or `C:\Users\hsink\Documents\`. A PreToolUse hook blocks writes to the ghost path. See user-level `CLAUDE.md`.
9. **`next build` clean before any apply locks.** Run `npx next build` before locking an apply order. `next lint` is broken in this Next version — use `npx eslint <files>` directly.

---

## How to coordinate with the DODO Coding workstream (the originating session)

The DODO Coding planning session is running in parallel. You will not see its messages; it will not see yours. To avoid collision:

1. **Stay out of `.design/dodo-coding-launch/`.** It's entirely owned by that session.
2. **Honor the reservations.** The shared-touchpoints table above lists every key/field/variable/region that's reserved. If you find yourself wanting to add a `subOrganization` field, a third footer item, an `--ink-*` variable, or a new home-page section between "Navigator is a map" and the close — stop. That's reserved.
3. **If you need to break a reservation,** surface it to the user with the reason and let them decide. Don't silently override.
4. **At apply time:** the user will sequence applies. Typically Little DODO content-level applies can land independently of DODO Coding's chrome touchpoints. If you stage an apply that touches the home page, mention the DODO Coding band reservation in your apply log so it doesn't get accidentally written into the same region.

---

## Where to find authoritative information

| Resource | Path |
|---|---|
| K-2 program brief + decision log | `docs/little-dodo-plan.md` |
| Session history (broader context, prior arcs) | `docs/SUCCESSOR_HANDOFF.md` (634 lines; the most recent top-level block is from 2026-06-10) |
| Chrome / funnel / token / spacing rules | `.interface-design/system.md` |
| Project-level rules (apply-gate, sync cadence, repo location) | `CLAUDE.md` |
| User-level rules (filesystem, paths) | `~/.claude/CLAUDE.md` (i.e., `C:\Users\hsink\.claude\CLAUDE.md`) |
| Current navbar lineup, content keys, ZH usage | `content/marketing.en.js` + `content/marketing.zh.js` |
| Little DODO page implementation | `app/[locale]/little-dodo/page.jsx` |
| AgeBandChooser implementation | `components/ui/AgeBandChooser.jsx` |
| PFP workstream archive (Little DODO chrome elevation, shipped 2026-06-09) | `.design/program-family-parallel/` — historical reference; do not edit |
| DODO Coding workstream archive (DO NOT touch) | `.design/dodo-coding-launch/` |
| Memory (persistent across sessions) | `C:\Users\hsink\.claude\projects\F--PC-Documents-DODO-web\memory\` — see `MEMORY.md` for index |

---

## Quick start checklist

When you (the parallel agent) pick this up:

- [ ] Read this handoff in full
- [ ] Read `docs/little-dodo-plan.md`
- [ ] Skim `docs/SUCCESSOR_HANDOFF.md` (the most recent top-level block — 2026-06-10)
- [ ] Read the SessionStart hook output (already in your context) to confirm sync state of DL_NEXTJS_NEW; if behind, `git pull --ff-only` before any edit
- [ ] Read `.interface-design/system.md` for the chrome/funnel/token rules
- [ ] Confirm with the user which of the open items (#1–#8 above) to start with
- [ ] Propose a `.design/<your-workstream-name>/` subfolder for staging your work (suggested: `.design/little-dodo-content-deepen/`, or whatever scope you confirm with the user)
- [ ] Do NOT touch `.design/dodo-coding-launch/` or any path listed under "Files and folders that are entirely the DODO Coding workstream's"

---

## Open questions to verify with the user before starting

Don't assume on these:

1. Which open follow-up (#1–#8) is the priority? If multiple, what order?
2. For K-2 Navigator profile (#1): is this an existing Navigator with a competency tag added, or a new Navigator profile entirely?
3. For K-2 demo (#2): does a recording exist yet? If not, hold this item.
4. For K-2 testimonial (#3): same — block on real content.
5. Should the staging subfolder under `.design/` be named one umbrella ("little-dodo-content-deepen") or per-task ("little-dodo-navigator-profile", "little-dodo-faq", etc.)? Default to one umbrella unless tasks are very long-lived.

---

*End of handoff. Last edited 2026-06-10 by the session that wrote `.design/dodo-coding-launch/` (DODO Coding sibling-site launch planning). For questions about DODO Coding workstream boundaries, the answer is almost always "stay on your side and surface to the user."*
