# Architecture cohesion — findings and proposal

**Written:** 2026-08-30 · **Status:** proposal, nothing here is built
**Covers:** D63–D72 (guide v6.17 → v6.26)
**Audience:** whoever picks this up next

This is the retrospective for a run that started as "make the CJK fonts smaller"
and turned into nine decisions, four build guards, and a lot of bugs that had been
shipping quietly. It is not a summary of what was done — the guide's decision table
has that. It is an account of **why the bugs were there**, and what would stop the
next batch.

Read this before starting another sweep of anything.

---

## 1. The pattern that produced almost every bug

Nine of the defects found in this run are the same shape:

| # | The bug | What it wore | What the sweep looked for |
|---|---|---|---|
| D65 | Six gilt-filled consult CTAs | inline `style={{ backgroundColor: '#F5C842' }}` | retired class names (`btn-solid`, `btn-charter`) |
| D69 | Four hero eyebrows with a pre-D54 dot | a `<div>` pill + dot + `<span>` | plain eyebrow definitions |
| D70 | Six more label pills | `.badge` → `border-radius: var(--radius-pill)` | `rounded-full` |
| D71 | Six pills nesting their text | text one level below the rounded element | text as a *direct child* |

**The rule:** every escapee was hand-rolled, and every sweep matched **one spelling of
one shape**. The detector's blind spot is where the bug lives. This is not a series of
unlucky misses; it is the predictable outcome of scanning source text for a pattern
when the thing you actually care about is *what renders*.

Three times the guide recorded a completeness claim that was false at the moment of
writing — "the last non-`btn-do` CTA is gone" (twice), gilt "is currently used nowhere",
and, in this run, my own "46 pills → 0". All three were sincere and all three were wrong,
because **prose recorded an intent that nothing checked**.

---

## 2. Root causes

### A. Inline styles are invisible to the design system

The system is expressed as CSS classes and components. A large amount of the site is
not. Current inventory:

- **~35 hand-rolled uppercase labels** (stat values, form fields, nav items, step
  weeks, column headers) — triaged in D71 and correctly left alone, but each is a
  private re-implementation of type that the system defines.
- **24 hand-rolled panels** (`scripts/surface-baseline.json`) — down from 33, still
  migrating opportunistically.
- **Hundreds of inline colour literals** — `#b7b5fe`, `#5856cc`, `#0E0E12` written as
  hex in JSX rather than as tokens.

Anything inline is unreachable by a class-based sweep, unreadable by a guard, and
invisible to a token rename. Every bug in §1 lived in inline styles.

### B. Source scans cannot see what the page renders

Two things never appear in source in a form a scanner recognises:

- **Client-rendered content.** The `/ops` tools hold 146 CJK characters that appear in
  no prerendered HTML. `PartnersClient` is gated, so its pills never reached `out/`.
- **Dependency content.** `html2canvas` and `jsPDF` ship Chinese numerals (壹 貳 參 萬)
  and katakana. No scan of our own source can find those.

The guards that have actually caught things — `check-cjk-coverage --build` and
`check-font-preload` — both read the **built output**. The ones that read source have
been the ones with blind spots.

### C. Nothing validated that a token resolves

`app/[locale]/credentials/page.jsx` was authored against six custom properties this
system never defined (`--ink`, `--ink-deep`, `--ink-soft`, `--accent-lavender`,
`--accent-lavender-deep`, `--divider`). Every colour on that page inherited instead of
resolving, and **it shipped that way**. CSS fails silently by design; without a check,
a typo'd or invented token is indistinguishable from a working one.

### D. Config decays because nothing ratchets it

- `subsets: ['latin','latin-ext']` forced **116.6 KB per route** for **zero** used
  characters (D64).
- A hand-written `<link rel="preload" href="…/noto-sans-sc.woff2">` **404'd on every
  Chinese page** for as long as it shipped. Its own comment asked the next person to
  hand-sync the hash. Nobody did, and a dead preload fails silently.
- `.eyebrow-pill` was created in D69 and superseded in D70 — one version later.

---

## 3. Proposal

Ordered by leverage. 1–3 are the ones that matter.

### 1 · Move every guard to the built output

`check-surfaces.mjs` and `check-gilt-escrow.mjs` still scan source. Convert both to
parse `out/` on `postbuild`, as `check-cjk-coverage --build` does. Parse the HTML —
**do not regex it**; D71's miss was a regex that assumed text was a direct child.

This one change closes root cause B and would have caught D70 and D71 outright.

### 2 · Add `check-tokens.mjs`

Fail the build on any `var(--x)` that is neither defined in `globals.css` nor given an
inline fallback. Perhaps thirty lines. It would have caught `/credentials` the day it
was written, and it makes token renames safe for the first time.

*Note the distinction it must make:* `var(--z-nav, 100)` and
`var(--color-border, #2E3848)` carry fallbacks and are **fine**. Only bare references
are bugs.

### 3 · Ratchet inline styles

Extend the `surface-baseline.json` pattern to a second baseline counting inline
`style={{…}}` blocks that set colour or typography. Ratchet downward; fail on increase.

This attacks root cause A directly and is the only proposal here that reduces the
*supply* of future bugs rather than detecting them after the fact. Expect it to start
around 300 and come down slowly.

### 4 · Make completeness claims executable

Convention for `.interface-design/system.md`: **any claim that something is "gone",
"retired" or "used nowhere" must name the guard that enforces it.** A claim with no
guard gets marked `(unverified)`. Three false claims in this codebase were all of that
shape, and the fix is a documentation rule, not code.

### 5 · One conformance report

`npm run conformance` printing current measured state: pills, hand-rolled panels,
hand-rolled labels, inline colour literals, undefined tokens, sub-12px nodes, font
payload per route. The guide then quotes measured numbers instead of assertions, and
drift is visible before it becomes a sweep.

---

## 4. Measurement traps — read before trusting a number

Every one of these produced a wrong number during this run.

- **`encodedBodySize` reports full size for cache hits, `transferSize` reports 0.**
  Re-fetch with `cache: 'no-store'`. (Inherited warning; it was correct.)
- **Your own instrumentation pollutes resource timing.** Running a measurement twice
  against one document counted my `no-store` re-fetches as new resources and inflated
  a reading from 183 KB to 366 KB. Capture the list once, then measure.
- **A contrast probe that walks up to a `backgroundColor` cannot see a hero.** These
  heroes layer a dark `<img>` over a Whisper ground, so the probe returns ~1.75:1 for
  labels that are plainly legible. **Fifteen false failures** came from this. On a
  photographic hero, look at it.
- **Cloudflare Pages preview URLs are immutable.** `d9a5409f.…pages.dev` is frozen at
  the commit that built it and will never update. It caused two false "not updated"
  reports. Use `www.dodolearning.com` or `dl-nextjs-new.pages.dev`.
  ⚠️ **But:** the second of those reports was *also a real bug* that the staleness
  explanation buried. A frozen URL is both a genuine trap and a very convenient way to
  dismiss a real defect. Check the live origin for each thing reported, separately.
- **The browser pane's screenshot desyncs from scroll on long pages** — it returns a
  blank frame while the element reports visible at `opacity: 1`. Verify scrolled content
  by computed style, or scroll via the pane's own control.

---

## 5. Known-open work

| Item | Size | Notes |
|---|---|---|
| **`/credentials` token aliases (D72)** | small | ⚠️ **Best-guess mappings, unreviewed.** Six aliases in `globals.css` keep the page working. Correct them against the live site, then migrate the ~12 call sites onto canonical tokens and delete the alias block. |
| **The type floor** | large | 558 sub-12px nodes. `/demos` and `/program` carry ~22%. This run removed eight of the worst (one was **8px**), and `.tag-run` sets its own 12px floor. Still a design pass. |
| **35 hand-rolled uppercase labels** | medium | Triaged in D71 — not eyebrows, so no quote. But each is private type. Needs a decision on whether the system should define `stat-label`, `field-label`, `column-header`. |
| **24 hand-rolled panels** | medium | Ratcheted by `check-surfaces.mjs`. |
| **15 images without dimensions** | small | CLS. Needs real intrinsic sizes; guessing distorts them. |
| **`.badge` / `.badge-gilt` / `.text-gilt`** | small | Now unused. Delete, or keep `badge-gilt` for the Charter CTA that does not exist yet. |
| **next/font cyrillic-ext italic** | tiny | 10.7 KB, a next/font 16.x bug, tolerated with a reason in `check-font-preload.mjs`. Recheck on the next Next upgrade. |
| **WenKai payload** | medium | D62 costs 726 KB against Noto's 437 KB because WenKai ships static weights, not a variable axis. Revisit if a variable release appears. |

---

## 6. If you only do one thing

**Convert the two source-scanning guards to parse the built output (§3.1), and add the
token guard (§3.2).** Together they are perhaps a day's work and they close the two root
causes that produced every bug in §1.

Then, before writing "X is gone" anywhere in the guide, run the check that proves it.
