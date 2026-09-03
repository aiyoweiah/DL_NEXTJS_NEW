# Completion plan — finishing the design-system work

**Created:** 2026-09-01 · **Covers:** everything open after D78 · **Owner column is real** — half of this cannot be done by an agent.

The architecture is finished: every numbered proposal in
[`architecture-cohesion-proposal.md`](architecture-cohesion-proposal.md) §3 is built and
eleven guards run on a build. What remains is the work the architecture makes safe, plus
a backlog that predates it.

This is a **cascade**, not a list. Waves are ordered by what unblocks what, not by size.
Numbers come from `npm run conformance` and the baselines; re-run before quoting them.

---

## The dependency graph, in one place

```
WAVE 0  four decisions        ✅ CLOSED   (D79)
WAVE 1  inline-style          ✅ COMPLETE 957 → 746  (D86 · D89 · D90)
WAVE 2  small concrete fixes  ✅ COMPLETE (D82 grey · D86 images · D87 panels)

WAVE 5  content cascade ──── D37 landed WITHOUT it ──X WAVE 3  label vocabulary
        independent · highest business value              (now unblocked)

WAVE 4  type floor        independent · large · needs a real measurement first
WAVE 6  admin unblocks    you only · gates every Tier-2 SEO item
WAVE 7  operational loose ends
```

**Waves 0, 1, 2 and 5 are closed.** Wave 5 shipped EN on 2026-09-02; its ZH round is
the one open thread (52 keys in `translation/pending-en.json`).

The next move is **Wave 6 — the admin unblocks**, which gate every Tier-2 SEO item and
are the only work here nobody but you can do. Wave 3 (label vocabulary) dropped in
urgency: D37 landed without needing it, so it is now a tidy-up rather than a blocker.
Wave 4 still needs task 4.0 — measure the type floor properly — before any design work.

---

## Wave 0 · Decisions — ✅ CLOSED 2026-09-01 (D79)

All four were called on 2026-09-01. 0.1 → restyle · 0.2 → exempt the tagline only · 0.3 → fold charter in · 0.4 → delete. Shipped as D79 and the /compare placeholder removal. The gilt allowlist is now empty. Kept below for provenance.

| # | Decision | Options | Owner |
|---|---|---|---|
| 0.1 | **`.skip-link` gilt ruling** | (a) record a stated a11y carve-out in D76, (b) restyle to `--color-lavender-signal` as the D68 chips were. D76 did **not** settle this — D76 governs conversion controls; the skip link is a WCAG 2.4.1 bypass affordance. Currently allowlisted in `check-gilt-escrow`. | you |
| 0.2 | **`.eyebrow` uppercases D36's locked tagline** | It renders "THINK ONCE, IN TWO LANGUAGES." on 116 routes; D36 locked sentence case with a terminal full stop. (a) accept uppercase as a display convention and note it in D36, (b) exempt the tagline from `.eyebrow`, (c) drop `text-transform` from `.eyebrow` sitewide (affects 390 elements — biggest blast radius). | you (tagline owner) |
| 0.3 | **`.btn-do-charter`** | Since D76 it is a synonym for `.btn-do-primary` — same swash, same label colour. (a) fold into `primary`, delete the class and migrate 3 call sites, (b) keep the name reserved for a real enrolment CTA. | you |
| 0.4 | **`/compare` placeholder copy** | `founderNote` ships *"Video embed — replace with production URL"* / *"视频嵌入 — 替换为生产环境URL"* to visitors. (a) delete the field and its JSX, (b) write a real caption, (c) make it `sr-only`. Also worth asking whether the founder video has a real embed URL yet — that may be the actual issue. **Copy → apply gate.** | you |

**Unblocks:** 0.1 and 0.3 close `check-gilt-escrow`'s last open item. 0.4 removes a live
defect on a conversion page. 0.2 is the only one that might touch Wave 3.

---

## Wave 1 · ✅ COMPLETE — 957 → 746

**Why this first among the code work:** every defect in the D63–D72 run lived in an
inline style. This is the only work that reduces the *supply* of future bugs. And it is
now safe: the ratchet fails the build if a migration accidentally adds one.

**The map is `scripts/inline-style-baseline.json`** — count per file. Kept for the
opportunistic passes described below, not for a campaign.


**The loop, per file:**

```bash
# 1. migrate: inline colour/type → tokens or a component
# 2. verify
npm run build
# 3. bank the drop
npm run check:inline -- --update
npm run check:inline -- --build --update
# 4. commit baseline + code together, and say what moved and why
```

⚠️ **Do not bump a baseline without a reason in the commit.** A ratchet bumped silently
is a formality. The guard's own error message says this; it is the whole contract.

**Guardrails:** colour goes to a token (`globals.css` `:root` defines 69), repeated
patterns go to a component (the D57/D60 argument — a class does not stop a tenth copy, a
component does). If a value has no token and should, add one; `check-tokens` will then
protect it.



### ✅ Wave 1 is DONE — and 746 is the finish line, not a shortfall

Step 1 (D86, 537 literals tokenised) and step 2 (D90, 187 blocks extracted, after
D89 unblocked it). Ratchet at **746 source / 4,518 build**, inline-style payload
**731 KB → 585 KB**.

**The remaining ~746 is deliberate. Do not run a campaign against it.**

D78's premise was that inline styles are invisible to sweeps *and* to token
renames. That is no longer true: after D86 the values are tokens, `check-tokens`
covers them **inside inline styles**, and D89 removed the cascade quirk that made
them load-bearing. What extraction still buys is payload and class-sweep
visibility — real, but much smaller than the original case.

And most of what is left should stay:

| | |
|---|---:|
| shapes used exactly **once** | **700 blocks (55%)** |
| shapes used 2+ | 157 shapes, 572 blocks |

A bespoke class for a one-off shape is relocation with added indirection. It moves
information out of the element that uses it and into a stylesheet nobody else
reads, and it makes the markup harder to follow for no reuse.

**The standing position:** the ratchet's job is to stop growth, not reach zero. It
holds the line at 746. Take the repeated shapes **opportunistically** — when a file
is already open for other work, extract what genuinely repeats in it and bank the
drop. Do not open files just to lower the number.



### ⚠️ Measured 2026-09-01, before starting: this is two jobs, not one

Opening `/about` surfaced that the migration is not the mechanical swap this section
assumed. Across `app/` + `components/`:

| | |
|---|---:|
| inline blocks setting colour/type | 865 |
| …type-only, no colour literal | 96 |
| colour literals **equal to an existing token value** | **574** |
| colour literals with **no token at all** | **397** (348 of them `rgba()`) |

**Two separate goods are tangled here, and only one of them moves the ratchet:**

1. **Tokenise** the literal (`#b7b5fe` → `var(--color-lavender-signal)`). Improves
   rename-safety and brings the value under `check-tokens`. **Does not move the
   ratchet** — the block still sets `color`.
2. **Extract to a class.** Moves the ratchet and makes the value visible to class-based
   sweeps. But doing this *before* step 1 just relocates a literal from `style={{}}` to
   `text-[#hex]` — which games the ratchet without improving anything. That is the
   failure mode the ratchet's own error message warns about, in reverse.

So the order per file is **tokenise, then extract** — and step 1 is blocked for ~40% of
the literals, because they have no token to move to.

### The opacity scale — RULED 2026-09-01 (D82)

Three scales, not one ramp: `--platinum-60/70/80/90` (text, floor at .60), `--lavender-08/15/25/40/60/80` (decoration), `--ink-08/15/30/45` (light-ground tints). 14 tokens. `#94A3B8` folded into `--text-muted-dark`. Scrims came out first as D81, which is why void black needed only four steps.

### ⚠️ The sub-floor text defect — measured properly 2026-09-01 (open, item 3)

Reported first as "19–44 platinum nodes". **That was wrong twice over**, and both
errors are worth recording because they are the shapes this repo keeps repeating.

1. **An unanchored skip pattern.** My ad-hoc measurement scripts used
   `/(node_modules|.next|out|ops)/` without path-segment anchors. `components/layout/`
   contains the substring "out", so **every ad-hoc scan silently excluded Navbar,
   Footer, PreCtaBand, SkipLink and LocaleSwitcher.** The shipped guards were never
   affected — they anchor the pattern — but every number I derived by hand was low.
2. **Assuming a family's job.** Platinum was checked and found to be text. Lavender was
   *assumed* to be decoration and was not checked. **66 of its uses are `color:`, and
   59 fail AA.** Lavender as text only clears AA at α .80 on Void Black.

**Measured on the rendered DOM instead** — every public page, contrast computed against
each element's real resolved background, `aria-hidden` subtrees excluded (113 of them,
correctly exempt), anything over a photograph excluded per §4:

| | |
|---|---:|
| **failing text nodes** | **105** |
| public pages affected | **10 of 12** |
| worst | `/consult` step numerals, **1.11:1** at 32px (needs 3:1) |
| next | `/results` "→" arrows, **1.96:1** at 12px (needs 4.5:1) |

Per page: /program 20 · /demos 16 · /consult 15 · /results 15 · /compare 10 · /about 9 ·
/little-dodo 7 · / 6 · /lexile 6 · /methodology 1.

**Still deliberately separate from the token work.** Raising these changes how the pages
look — captions, metadata and step numerals currently recede and would come forward. It
is a visual decision with an accessibility answer already attached, and it should be seen
rather than absorbed into a refactor. Next step is a before/after review of the worst
offenders, not a bulk edit.

---

## Wave 2 · Small concrete fixes — independent, any time

| Item | Size | Note |
|---|---|---|
| **`#94A3B8` — a fifth grey** | small | ⚠️ **Measured 2026-09-01: 31 uses sitewide, not the 2 this row assumed.** Not a system token — `--text-muted-dark` is `#9AA3B2`. `LexileBar.jsx:41` is `light ? '#3D4452' : '#94A3B8'`, a legitimate surface-aware pair written in raw hex, but the value has spread far beyond it. Settle this one **before** Wave 1's alpha-scale decision: it is the largest single untokenised literal and it is not an alpha variant, so it resolves without needing a scale. |
| **15 images without `width`/`height`** | small | CLS. Needs real intrinsic dimensions; guessing distorts them. |
| **24 hand-rolled panels** | medium | Ratcheted by `check-surfaces`. Migrate opportunistically — several sit in the same files as Wave 1's targets. |

---

## Wave 3 · The label vocabulary — deliberately blocked on Wave 1

**Measured now:** 1,346 hand-rolled uppercase instances · 140 distinct strings · **61
declaration sites across 25 files** · against 390 canonical `.eyebrow`.

**Why blocked, on purpose:** the decision needs a real per-site inventory, and the
current grouping is a regex taxonomy in `conformance.mjs` that has already been wrong
twice (a `state` family that was 98% navbar chrome; a "drift" warning that flagged a
deliberate surface-aware pair). Settling a permanent system vocabulary on top of that is
the exact mistake pattern this codebase keeps repeating. Wave 1 produces the inventory.

**Steps, once unblocked:**

1. `npm run conformance -- --labels` against the reduced tree.
2. **Triage the `section-label` residue** (83 strings, 213 instances). It is a catch-all
   holding at least four jobs: genuine section eyebrows, form field-group labels
   (`ConsultForm`, 6 strings at a consistent `0.12em`), blog taxonomy that arguably
   belongs in `.tag-run` per D70, and route-path hints.
3. **Decide the shape.** Recommendation on current evidence: **one `Label` component
   with a `variant` prop**, the way `Eyebrow` works — not three CSS classes. D57 proved
   the component route here, and its own header explains why: a class does not prevent a
   tenth private copy; a component does.
4. Implement, then log it with the before/after conformance numbers.

**Cross-dependency:** the `framework` family (the Loop's four step names, 160 instances,
**zero drift today**) is brand canon. Its natural moment is when Wave 5's D37
five-strands work lands — whoever writes that will hand-roll a fifth label unless there
is a home for it by then. Sequence 5 → 3 if D37 moves first.

---

## Wave 4 · The type floor — large, independent, needs a real measurement first

`conformance` reports **469** sub-12px nodes (9px×32, 10px×310, 11px×127).

⚠️ **That is a lower bound and is not comparable to the 558 previously quoted.**
Conformance counts inline `font-size` and `text-[Npx]` classes only; it cannot see
class-driven sizes. **Task 4.0 is therefore to measure it properly** — extend the
detector to resolve emitted CSS the way `check-tokens --build` does — before any design
work. Doing the pass against a number that is wrong by an unknown margin repeats §1.

Then: a design pass, not a mechanical fix. It changes page rhythm and risks tight
layouts. `/demos` and `/program` historically carried ~22%.

---

## Wave 5 · Content cascade — ✅ CLOSED 2026-09-02

All six items shipped. `/faq` closed as D91 (EN `873ea93`, ZH `799629f`); the
remaining five closed in `fde04cf` (EN). Kept below for provenance.

**ZH for the remainder is outstanding** — 52 keys in `translation/pending-en.json`,
awaiting the DeepSeek round. `/methodology`s two new sections are gated on the
locale having the copy, so `/zh/methodology` renders without them until it lands.

| Item | Note |
|---|---|
| ✅ **`/faq` rewrite** | The only unit of the v5 cascade never done (15 of 18 complete). Needs the D38 evidence-base entry and the D41 AI rebuttal, EN + ZH. |
| ✅ **D38 §07a research block → `/methodology`** | Shipped `fde04cf`. 71-word block + 4 cited findings above `geo`. Goodwin & Ahn (2010) carries author+year only — its journal is *Annals of Dyslexia* and §07a forbids the remediation register. |
| ✅ **D37 five strands → `/methodology` + `/program`** | Shipped `fde04cf`. **The Wave 3 risk did not materialise** — nested strands are a term+definition, so a real `<dl>`; `/program` uses `TagRun` (D70). No private label invented. |
| ✅ **D41 rows → `/compare`** | Shipped `fde04cf`. 3 → 5 rows. AI row is the compressed reference; §01b stays canonical. |
| ✅ **D14 Type A/B caption → `/methodology`** | Shipped `fde04cf`. Was **a live contradiction**, not a rehoming chore: the lost sentence denied a fixed rotation and the heading it moved under asserted one. |
| ✅ **`/compare` deeper voice pass** | Shipped `fde04cf`. The page ran the §10 "not X — but Y" reversal **ten times**; nine became statements. Also fixed a §06 breach: "The Loop" was the named system in a section header, "LCS" appeared 0×. |

**Still open on these surfaces:** the site nav labels `/methodology` "The Loop" /
"The Loop 闭环" — the same §06 breach fixed on `/compare`, but chrome-level across
116 routes. MCT is named 4× on `/methodology` (§07 permits each phrasing, §06 says
name it once — the rules disagree about that page). `compare.s8.voices` carries two
attributed testimonials with specific Lexile deltas and cities, same provenance
shape as the Wave 7 items. All three need a call.

**Method is set** (cascade plan, user-set 2026-08-27): one surface at a time — scan,
rework fully, verify, log — and **propose copy in chat first; live files only on an
explicit "apply"**.

---

## Wave 6 · Admin unblocks — you only, gates every Tier-2 SEO item

| # | Item | What it unblocks |
|---|---|---|
| 7 | Bing Webmaster Tools registration | IndexNow |
| 8 | Google Search Console + GA4 IDs | all measurement |
| 9 | Social profile URLs for `sameAs` | Tier-2 #13, completes the Person schema |
| 12 | YouTube video IDs for `/demos` | `YOUTUBE_IDS` placeholders |
| 4 | Xiaohongshu / WeChat operator + cadence | the ZH off-site channel |
| 6 | Off-site mention channel (EN + ZH split) | Tier 3 |
| 15 | Verify home hero `consultHook` on the live site | reported 2026-05-21, never verified |
| 17 | Verify `/faq` pricing is current | `/faq` is the only public pricing surface |

Until 7/8/9 land, most Tier-2 SEO work cannot be measured even when it ships.

---

## Wave 7 · Operational loose ends

| Item | Note |
|---|---|
| **Ms. Kimberly's bio** | `navigators.s4half.bio` says "7 years teaching" — filled by an automated agent, never verified. Flagged verify-before-push. |
| **WeChat handle** | `__PLACEHOLDER__` in copy, `WECHAT_HANDLE=pending` on CF Pages. Both need the real value. |
| **Cal.com** | Ready to cancel once one real consult submission has been seen end-to-end. |
| **`ConsultCalEmbed.jsx`** | Still imported by `/partners` only. Deletable once that flow is migrated. |

---

## Standing rules that apply to all of it

1. **A claim that something is "gone", "retired" or "used nowhere" must name the guard
   that enforces it** — or be written `(unverified)`. Five sincere, unguarded, false
   claims are why the guards exist.
2. **Re-run `npm run conformance` before quoting a number.** Prose that asserts is how
   every one of those five happened.
3. **A detector's first run is data about the detector.** `conformance` shipped with two
   wrong groupings and once syntactically broken. It is not on the build by design, so
   nothing catches it.
4. **Read [§4 measurement traps](architecture-cohesion-proposal.md) before measuring
   anything** — the immutable preview URL, the cache-hit byte sizes, the contrast probe
   on photographic heroes, the screenshot that desyncs from scroll. Three of the five
   recurred on 2026-09-01 and were correctly identified from that list.
5. **Sync discipline:** one `git fetch` per session (the SessionStart hook does it);
   re-fetch only immediately before a push.
