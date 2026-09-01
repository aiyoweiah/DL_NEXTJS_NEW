# Architecture cohesion — findings and proposal

**Written:** 2026-08-30 · **Status:** **§3.1 and §3.2 BUILT 2026-08-30 (D73, guide v6.27).**
§3.3-§3.5 remain proposals.
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

### 1 · Move every guard to the built output — BUILT (D73)

`check-surfaces.mjs` and `check-gilt-escrow.mjs` still scan source. Convert both to
parse `out/` on `postbuild`, as `check-cjk-coverage --build` does. Parse the HTML —
**do not regex it**; D71's miss was a regex that assumed text was a direct child.

This one change closes root cause B and would have caught D70 and D71 outright.

> **Built 2026-08-30.** Both guards gained a `--build` pass on `postbuild`; the parser is
> `scripts/html-parse.mjs` (dependency-free, ~200 lines — the build must not acquire an
> install step). The gilt pass now reads the emitted CSS, works out which class selectors
> actually paint gilt, and checks the controls that really rendered — so gilt arriving
> through a class name the source pass never heard of is caught.
>
> **It found one on its first run.** `.skip-link` paints `var(--color-gilt)` on all 114
> routes. The JSX says only `className="skip-link"` and the gilt lives in `globals.css`,
> so no scan for gilt-spelled-near-an-anchor could ever have reached it — the predicted
> shape, one layer further out than D65. Allowlisted with a stated retirement condition
> pending an owner ruling; it is a WCAG bypass link, not a conversion control.
>
> Both ratchets were regression-tested in both directions.

### 2 · Add `check-tokens.mjs` — BUILT (D73)

Fail the build on any `var(--x)` that is neither defined in `globals.css` nor given an
inline fallback. Perhaps thirty lines. It would have caught `/credentials` the day it
was written, and it makes token renames safe for the first time.

*Note the distinction it must make:* `var(--z-nav, 100)` and
`var(--color-border, #2E3848)` carry fallbacks and are **fine**. Only bare references
are bugs.

> **Built 2026-08-30**, two passes. Source (`prebuild`) reports file and line; build
> (`postbuild`) reads emitted CSS, parsed inline styles and the client JS chunks, so it
> covers components that never reach the prerendered HTML. Currently 54 bare references
> in source and 109 in the build, all resolving.
>
> Regression-tested by removing one D72 alias: the guard named `--ink-deep` and all six
> `/credentials` call sites. Two framework namespaces are exempt — `--tw-*` and
> `--next-*` are declared by Tailwind and Next themselves, and we do not author them.

### 3 · Ratchet inline styles — next, and now the highest-leverage item left

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
| **`.badge` / `.badge-gilt` / `.text-gilt`** | small | **Confirmed unused 2026-08-30, with more attached than this row said:** `components/ui/Badge.jsx` has **zero `<Badge` call sites** — D70 removed the render sites and left the component, plus dead imports in `blog/[slug]`, `cities/[city]`, `lexile`, `methodology`, `results`. Delete the component, the 5 imports and ~8 CSS rule blocks, or keep `badge-gilt` for the Charter CTA that does not exist yet. |
| **`.skip-link` gilt ruling** | small | Found by the D73 build pass; allowlisted pending a call. Either record a stated a11y carve-out in D52, or restyle to `--color-lavender-signal` as the D68 chips were. |
| **next/font cyrillic-ext italic** | tiny | 10.7 KB, a next/font 16.x bug, tolerated with a reason in `check-font-preload.mjs`. Recheck on the next Next upgrade. |
| **WenKai payload** | medium | D62 costs 726 KB against Noto's 437 KB because WenKai ships static weights, not a variable axis. Revisit if a variable release appears. |

---

## 6. If you only do one thing

~~**Convert the two source-scanning guards to parse the built output (§3.1), and add the
token guard (§3.2).**~~ **Done 2026-08-30 (D73).** They closed the two root causes, and
the build-output pass found a real escapee the same day.

**The one thing now is §3.3 — ratchet inline styles.** It is the only proposal here that
reduces the *supply* of future bugs rather than detecting them afterwards, and every
defect in §1 lived in an inline style.

And, still: before writing "X is gone" anywhere in the guide, run the check that proves
it. Status for every decision now lives in [`decision-index.md`](decision-index.md),
which records the enforcing guard per decision — or leaves the column empty, which is
itself the warning.
