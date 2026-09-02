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
WAVE 0  four decisions ───────────────┬──> unblocks 1 (partly), 2, 5
        (you · ~30 min, no code)      │
                                      │
WAVE 1  inline-style migration ───────┴──> unblocks WAVE 3
        957 → target (incremental)
                                           WAVE 3 label vocabulary
WAVE 2  small concrete fixes               (deliberately blocked)
        (independent, any time)                    ▲
                                                   │
WAVE 5  content cascade ──── D37 five strands ─────┘
        (independent of all design work)     feeds the `framework` family

WAVE 4  type floor        (independent · large · needs a real measurement first)
WAVE 6  admin unblocks    (you only · gates every Tier-2 SEO item)
WAVE 7  operational loose ends
```

**If you do one thing:** Wave 0. Four one-line answers that unblock three other waves.
**If you do two:** start Wave 1 at `/about`.
**Highest business value, independent of all of it:** Wave 5.

---

## Wave 0 · Decisions — no code, unblocks the rest

Each is a single call. None needs research; the analysis is already written up.

| # | Decision | Options | Owner |
|---|---|---|---|
| 0.1 | **`.skip-link` gilt ruling** | (a) record a stated a11y carve-out in D76, (b) restyle to `--color-lavender-signal` as the D68 chips were. D76 did **not** settle this — D76 governs conversion controls; the skip link is a WCAG 2.4.1 bypass affordance. Currently allowlisted in `check-gilt-escrow`. | you |
| 0.2 | **`.eyebrow` uppercases D36's locked tagline** | It renders "THINK ONCE, IN TWO LANGUAGES." on 116 routes; D36 locked sentence case with a terminal full stop. (a) accept uppercase as a display convention and note it in D36, (b) exempt the tagline from `.eyebrow`, (c) drop `text-transform` from `.eyebrow` sitewide (affects 390 elements — biggest blast radius). | you (tagline owner) |
| 0.3 | **`.btn-do-charter`** | Since D76 it is a synonym for `.btn-do-primary` — same swash, same label colour. (a) fold into `primary`, delete the class and migrate 3 call sites, (b) keep the name reserved for a real enrolment CTA. | you |
| 0.4 | **`/compare` placeholder copy** | `founderNote` ships *"Video embed — replace with production URL"* / *"视频嵌入 — 替换为生产环境URL"* to visitors. (a) delete the field and its JSX, (b) write a real caption, (c) make it `sr-only`. Also worth asking whether the founder video has a real embed URL yet — that may be the actual issue. **Copy → apply gate.** | you |

**Unblocks:** 0.1 and 0.3 close `check-gilt-escrow`'s last open item. 0.4 removes a live
defect on a conversion page. 0.2 is the only one that might touch Wave 3.

---

## Wave 1 · Bring 957 down — the main line

**Why this first among the code work:** every defect in the D63–D72 run lived in an
inline style. This is the only work that reduces the *supply* of future bugs. And it is
now safe: the ratchet fails the build if a migration accidentally adds one.

**The map is `scripts/inline-style-baseline.json`** — count per file, no survey needed.

| Order | File | Count | Note |
|---|---|---:|---|
| 1 | `app/[locale]/about/page.jsx` | 58 | Largest single file. Also carries 4 of the 24 hand-rolled panels — kill two ratchets at once. |
| 2 | `app/[locale]/blog/page.jsx` | 36 | |
| 3 | next by baseline | — | Re-read the baseline; it changes as you go. |

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

**Definition of "done enough" to unblock Wave 3:** not zero. Far enough that the
remaining per-file counts describe *deliberate* one-offs rather than accumulated drift —
call it under 400, or when `/about`, `/blog`, `/program` and `/compare` are all in single
digits.

---

## Wave 2 · Small concrete fixes — independent, any time

| Item | Size | Note |
|---|---|---|
| **`LexileBar`'s `#94A3B8`** | tiny | Not a system token; `--text-muted-dark` is `#9AA3B2`. A fifth grey. `LexileBar.jsx:41` is `light ? '#3D4452' : '#94A3B8'` — a legitimate surface-aware pair written in raw hex. Point both at tokens. |
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

## Wave 5 · Content cascade — independent, highest business value

Nothing here is blocked by any design work. This is the backlog with the clearest link
to conversion and to the GEO strategy in [`workflow.md`](workflow.md).

| Item | Note |
|---|---|
| **`/faq` rewrite** | The only unit of the v5 cascade never done (15 of 18 complete). Needs the D38 evidence-base entry and the D41 AI rebuttal, EN + ZH. |
| **D38 §07a research block → `/methodology`** | Owed since D50. 40–80-word GEO-ready block + the 5 permitted claims. |
| **D37 five strands → `/methodology` + `/program`** | Surfaced on neither. ⚠️ Feeds Wave 3 — see above. |
| **D41 rows → `/compare`** | AI-tutor + gifted-ELA-books rows; seed the AI rebuttal referencing §01b. |
| **D14 Type A/B caption → `/methodology`** | Cleared from `/program` (`loop.typeAB: ''`), never rehomed. |
| **`/compare` deeper voice pass** | Marked 🔴 in the cascade plan; D50 fixed only D40 and the worst overclaims. |

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
