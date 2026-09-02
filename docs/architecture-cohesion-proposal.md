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

### 3 · Ratchet inline styles — BUILT (D78)

Extend the `surface-baseline.json` pattern to a second baseline counting inline
`style={{…}}` blocks that set colour or typography. Ratchet downward; fail on increase.

This attacks root cause A directly and is the only proposal here that reduces the
*supply* of future bugs rather than detecting them after the fact. Expect it to start
around 300 and come down slowly.

> **Built 2026-09-01** as `scripts/check-inline-style.mjs`, two passes on the
> established contract: source on `prebuild` (per file, the number a migration moves),
> build on `postbuild` (per route, what actually rendered). Baselines in
> `scripts/inline-style-baseline.json` and `…-build-baseline.json`.
>
> **The estimate above was 3× low. Source is 957, not ~300**; the build pass is 8,753.
> Worth knowing before anyone plans a migration against the old figure — and worth
> noting that the guess was in prose and the number was not measured until now, which
> is the same shape as everything else in §1.
>
> Scope is colour and typography only. Layout written inline is deliberately not
> counted: the system does not define layout centrally, so an inline value there
> bypasses nothing. It overlaps `check-surfaces` on purpose — that guard asks "is this
> a hand-rolled panel", this one asks "is a colour or a typeface set by hand".
>
> `style={{…}}` blocks are **brace-matched, not regexed**. D71's miss was a regex that
> assumed structure it had not checked.
>
> Regression-tested in both directions on both passes: adding one inline colour fails
> and names the file (source) or route (build); removing one passes and says how much
> is bankable. All four exits verified.

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

**Numbers here are measured by `npm run conformance`, not estimated.** Re-run it before
quoting any of them; that is the whole point of it existing. Last measured 2026-09-01.

### Open — work

| Item | Size | Notes |
|---|---|---|
| **Bring 957 down** | large, incremental | The §3.3 baseline is the map: `scripts/inline-style-baseline.json` gives the count per file. `/about` **58**, `/blog` **36**, `/program` and `/compare` next. Migrate a file, re-run with `--update`, commit the smaller baseline. This is now the main line of work. |
| **The type floor** | large | **469** sub-12px nodes — 9px×32, 10px×310, 11px×127. ⚠️ Not comparable to the 558 this table used to quote: that was a different method. Conformance counts inline `font-size` and `text-[Npx]` classes, so it is a **lower bound** and misses class-driven sizes. Still a design pass, not a mechanical fix. |
| **Hand-rolled uppercase labels** | medium | Was "35". Measured: **1,346 rendered instances, 140 distinct strings, 61 declaration sites across 25 files.** They do at least seven jobs — see the `conformance` families. The `section-label` residue (83 strings) is itself a mixed bucket and needs triage before any class decision. **Blocked behind the 957 migration by choice**, so the decision is made against a real per-site inventory rather than a regex taxonomy. |
| **24 hand-rolled panels** | medium | Ratcheted by `check-surfaces.mjs`. |
| **15 images without dimensions** | small | CLS. Needs real intrinsic sizes; guessing distorts them. |

### Open — decisions someone has to make

| Item | Notes |
|---|---|
| **`.skip-link` gilt ruling** | Found by the D73 build pass, allowlisted pending a call, and **D76 did not settle it** — D76 is about which conversion control leads; the skip link is a WCAG 2.4.1 bypass affordance. Either record a stated a11y carve-out in D76, or restyle to `--color-lavender-signal` as the D68 chips were. |
| **`.eyebrow` uppercases the locked tagline** | `.eyebrow` sets `text-transform: uppercase`, so D36's *"Think once, in two languages."* renders as **"THINK ONCE, IN TWO LANGUAGES."** on 116 routes. D36 locked sentence case with a terminal full stop. A D36-vs-D57 conflict in the canonical component, not a hand-rolled defect. Belongs to whoever owns the tagline. |
| **`.btn-do-charter` is now a synonym for `.btn-do-primary`** | Since D76 it carries the same swash and the same label colour. Fold it into `primary` and delete the class, or keep the name reserved for a real enrolment CTA that may want its own treatment. |
| **`LexileBar`'s dark label is `#94A3B8`** | Not a system token — `--text-muted-dark` is `#9AA3B2`. A fifth grey, near but not equal to the one the system names. Small and concrete; independent of everything else here. |

### Closed since this document was written

| Item | Closed by |
|---|---|
| `/credentials` token aliases (D72) | **D72 closed 2026-09-01.** Verified on the live render — all six aliases resolved to exactly their canonical counterparts — then 19 call sites migrated and the alias block deleted. |
| `.badge` / `.badge-gilt` / `.text-gilt` | **D75.** Component, 5 dead imports and 8 CSS rule blocks deleted. Its own tail — a `.section-dark .text-gilt` override — survived and was removed by D76. |
| next/font cyrillic-ext italic | Still tolerated (10.7 KB, next/font 16.x bug, reason in `check-font-preload.mjs`). Recheck on the next Next upgrade. |
| WenKai payload | Still 726 KB against Noto's 437 KB — static weights, no variable axis. Revisit if a variable release appears. Not a defect; a stated price. |

---


---

## 6. If you only do one thing

~~**Convert the two source-scanning guards to parse the built output (§3.1), and add the
token guard (§3.2).**~~ **Done 2026-08-30 (D73).** They closed the two root causes, and
the build-output pass found a real escapee the same day.

~~**The one thing now is §3.3 — ratchet inline styles.**~~ **Done 2026-09-01 (D78).**
957 in source, 8,753 in the build, both ratcheted on the build. §3.5's conformance
report shipped alongside it (D77's measurement came from it).

**Every numbered proposal in §3 is now built.** What is left is not architecture, it is
the work the architecture now makes safe: bringing 957 down. The baseline is the map —
`scripts/inline-style-baseline.json` names the count per file, so the highest-value
migrations are visible without a survey. `/about` at 58 and `/blog` at 36 lead it.

⚠️ **One thing the run that built §3.3 and §3.5 proved again, about this document
itself.** §3.3 predicted "around 300"; the real number is 957. That guess sat here for
two days reading like a measurement. `npm run conformance` also shipped with two wrong
groupings of its own on day one — a `state` family that was 98% navbar chrome, and a
"drift" warning that flagged a deliberate surface-aware colour pair. Both were found by
reading its output instead of trusting it, and both are fixed. A tool that measures is
better than prose that asserts, but it is not automatically right — the first run of a
new detector is data about the detector.

And, still: before writing "X is gone" anywhere in the guide, run the check that proves
it. Status for every decision now lives in [`decision-index.md`](decision-index.md),
which records the enforcing guard per decision — or leaves the column empty, which is
itself the warning.


---

## 7. Contrast is two problems — and only one of them is guardable (D85)

Added 2026-09-01, after a conversion CTA shipped at **1.29:1** and a hand-built
contrast probe gave three different answers about it.

**Structural failures.** A control on a ground whose `on-dark` hook is missing. Its
label keeps the light-ground colour and lands near-black on near-black. This is
decidable from the DOM alone — a class check plus an ancestor check — and
`check-on-dark.mjs` does it in ~40 lines with the existing parser, no dependency,
zero false positives. **This is the class that ships broken conversion controls:**
D53 warned about it, D65 found six instances of its sibling, and D85 found it live on
`/compare`. It is now guarded.

**Value failures.** A colour simply too faint for its ground. This needs the
*composited* pixel, which needs a real browser in the build — and §3.1 already ruled
that out: *the build must not acquire an install step.* A Playwright-based contrast
guard would break a constraint this document set for good reasons.

**So the pixel auditor is not being built, and that is a decision rather than an
omission.** Value-level contrast is a design review. Saying so is better than
carrying a guard that does not exist in anyone's head.

### The instrument warning — a sixth measurement trap for §4

A probe that walks ancestors for an opaque `backgroundColor` to compute real
contrast **is not reliable on this site**:

- It cannot see a ground painted by an overlay or pseudo-element, so it reported
  false failures on `/program` and `/demos` — elements *with* `.on-dark` ancestry
  resolving against Whisper.
- It gave **opposite verdicts for the same control** depending on whether it ran
  against a detached DOM or the live page, because cascade-dependent rules like
  `.on-dark .btn-do` do not resolve identically in an injected copy.

Numbers produced that way are directionally useful and **not certifiable**. The
"105 sub-AA nodes" figure in `completion-plan.md` carries that caveat for this
reason. If you need a real count, sample painted pixels; if you need a guard, ask a
structural question instead.

---

## 8. A guard may not match on values (D87)

The rule this document was missing, learned when a rename made a ratchet report
progress.

**Match on STRUCTURE — which properties are set, what shape the DOM is. Never on
the VALUES those properties hold.** A value list is a second copy of the design
system maintained by hand, and it goes stale silently.

The proof was already inside `check-surfaces`. Its two passes disagreed under the
D86 tokenisation:

| pass | asks | result when `#2E3848` became `var(--color-midnight)` |
|---|---|---|
| build | *does this element set a background AND a border?* | **737 — unmoved** |
| source | *is the background one of these six hexes?* | **24 → 5** |

Same guard, same codebase, same day. The structural half could not be fooled; the
value-matching half went blind and would have banked the loss as a migration.

Fixing it also showed the list had **never been right**: measured structurally there
are **41** hand-rolled panels, not 24. Seventeen had never matched, so the ratchet
had been guarding a number that was too low since D60.

### And: refuse to bank an implausible drop

Blindness and success look identical from the outside — the count falls either way.
What separates them is that **`--update` is where the lie becomes permanent**, so
that is where the question belongs. Both ratchets now refuse a drop of more than 30%
(and at least 8 items) without `--force`, printing what happened last time.

This is not a limit on real work. It is a prompt to say which kind of drop it was,
at the only moment when anyone still knows.

