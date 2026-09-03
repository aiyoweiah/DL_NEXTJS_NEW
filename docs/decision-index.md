# Decision index — D1 … D89

**Created:** 2026-08-30 · **Covers:** every numbered decision in both logs · **last updated 2026-09-01 (D89)**
**Source of truth for STATUS.** The two logs remain the source of truth for *content*.

There are 89 decisions across two append-only logs that share one number sequence:

| Log | Holds |
|---|---|
| [`docs/content-style-decisions.md`](content-style-decisions.md) | D1–D50 — voice, vocabulary, positioning, copy |
| [`.interface-design/system.md`](../.interface-design/system.md) | D33–D89 — chrome, type, colour, controls, guards |

Decisions with both a content and a visual consequence appear in both. Neither log
records status: to answer *"is D26 still true?"* you previously had to read every later
entry looking for the sentence that overrode it. Three of those sentences existed and
were never reflected at the decision they overrode. This table is that answer.

**Status vocabulary**

| | |
|---|---|
| **Live** | still in force; write new work to it |
| **Superseded → Dx** | replaced. Read for provenance only; Dx is what applies |
| **Amended → Dx** | still in force *except* the part Dx changed |
| **Fulfilled** | a one-time cascade or ship, completed. Nothing to keep applying |
| **Open** | decided in principle, not yet resolved in practice — needs a call |

**Enforced by** names the guard that would fail the build if the decision were violated.
A decision with no guard is held by attention alone — which is how this codebase
acquired three false completeness claims (see
[`architecture-cohesion-proposal.md`](architecture-cohesion-proposal.md) §4).

---

## Live decisions — the working set

Everything here applies to new work.

### Positioning & voice

| D | Decision | Status | Enforced by |
|---|---|---|---|
| D40 | Target by demographic + desire; international implicit, local explicit | Live | `dodo-content-writer` lint |
| D43 | One-sentence position — LCS/five-strands + online, bilingualism out | Live | — |
| D44 | Three Brand Truths — mastery / human moat / growth on paper | Live · visual brief closed by **D74** | — |
| D47 | §08 voice — "soft in tone, deep in knowledge"; strip-on-sight register tells | Live · amends D4 | `dodo-content-writer` lint |
| D36 | Tagline "Think once, in two languages." | Live · executed by D45 | `dodo-content-writer` lint |
| D6 | Humanistic frame — "enjoy the arts of language" | Live | — |
| D42 | §04a Marketing Direction — the guide carries strategy | Live | — |
| D41 | Objections + AI rebuttal + anti-persona | Live · **cascade owed** | — |

### Curriculum & claims

| D | Decision | Status | Enforced by |
|---|---|---|---|
| D37 | Five Strands nested under LCS · ELA = 7 levels (Poodle retired) | Live · **five-strands surfacing owed** | — |
| D38 | §07a Research Base — proof as citation | Live · **/methodology block owed** | — |
| D1 | "The LCS System" is the parent-facing methodology name (EN) | Live (EN) · ZH → D19 | — |
| D19 | LCS ZH header = 语言循环体系 | Live | — |
| D2 | MCT may be named directly in the Write step | Live | — |
| D8 | Lexile canon — one grade level over two 16-week cycles | Live | — |
| D17 | Referral canon — 75%+ | Live | — |
| D18 | Navigator credential — world top-50 (top-30 rejected) | **Live** | — |
| D11 | Session length — up to 50 min, min. weekly | Live | — |
| D7 | Specific book titles over genre labels | Live | — |
| D9 | ZH 6+1 canon 思考、结构、声音、用词、流畅、规范、呈现 | Live | — |
| D5 | Testimonial style — first name + last initial, primary city pool | Live | — |
| D15 | Observer-POV "real session" pattern | Live | — |
| D12 | Loop/LCS naming may differ per locale in one section | Live | — |
| D21 | Mother-tongue framing over Chinese-specific | Live | — |
| D20 | 领航员 forbidden as Navigator translation | Live | `dodo-content-writer` lint |
| D35 | Founder is **Janet**, first name only, every surface | Live · overrides **D22(a)** | — |
| D39 | ZH guide mirror + §17 Branded Vocabulary | Live | — |

### Funnel & chrome

| D | Decision | Status | Enforced by |
|---|---|---|---|
| D27 | Watch Demo = soft close; Consult = firm close | Live | — |
| D33 | `PreCtaBand` is a soft fallback, suppressed where a page owns its close | Live · supersedes D28 | — |
| D29 | Consult before assess; no assessment entry CTAs | Live | — |
| D30 | One action one label; nav = ELA Program / DODO Method | Live · supersedes D23 | — |
| D34 | Navbar ZH — descriptive over branded | Live | — |
| D31 | Gated nav item — lock glyph, gating word `sr-only` | Live · amends D24 | — |
| D24 | "Reading Companion" for `/audiobooks` (ZH 有声书 per D34) | Live · amended by D31, D34 | — |
| D25 | Chrome i18n — copy passed as a prop from the server layout | Live | — |
| D13 | Pricing hidden on `/program`, surfaced on `/faq` | Live · **FAQ figures unverified** | — |
| D16 | /about beliefs framed as "DODO Learning's Pillars" | Live · content reworked by D49 | — |

### Interface system

| D | Decision | Status | Enforced by |
|---|---|---|---|
| D53b | The D-o bracket is the control chrome — no fills | Live · supersedes D53 | — |
| D52 | Gilt is reserved for Charter Enrolment | **Superseded → D76** — the reservation is retired; gilt is positional now | `check-gilt-escrow` |
| D66 | The gilt rule is enforced, not merely written down | Live · **restated by D76** — the guard survives, the rule it asserts inverted | `check-gilt-escrow` |
| D68 | Gilt has one job: earned proof · `--gilt-mark` | Live · **amended → D76** — the earned-proof mark stands; "never a control" does not | `check-gilt-escrow` |
| D65 | The `btn-do` sweep — six inline gilt CTAs converted | Live · its open chip question answered by D68 | `check-gilt-escrow` |
| D54 | The lead-in quote on claim labels | Live | — |
| D55 | The highlighter swash on the primary control | Live | — |
| D56 | Swash on every control, tiered by ink weight | Live | — |
| D57 | One canonical `Eyebrow` component | Live · completed by D69→D71 | — |
| D58 | The drawn hand past the button | Live | — |
| D60 | `Surface` primitive; hand-rolled panels ratcheted | Live | `check-surfaces` (both passes) |
| D61 | Target size 24×24 (WCAG 2.2 SC 2.5.8) | Live | — |
| D70 | Pills retired sitewide | Live · count corrected by D71 | — |
| D71 | Hand-rolled eyebrows conformed; the last 6 pills | Live · **triage corrected by D77** — 9 more eyebrows lived in `content/` | — |
| D72 | `/credentials` token aliases → migrated, alias block deleted | **Fulfilled** 2026-09-01 — verified on the live render, 19 call sites moved to canonical tokens | `check-tokens` |
| D73 | Guards read the built output; every `var()` must resolve | Live | itself |
| D74 | The gauge ⛔ scopes to the ladder; outcome bars are sanctioned | Live | — |
| D75 | `.badge` retired at the definition — component, 5 imports, 8 rule blocks | Live · tail of D70/D71 | — |
| D76 | Gilt leads the conversion section; the D52 reservation retired; gold is never text | Live · supersedes **D52**, amends **D68** | `check-gilt-escrow` |
| D77 | D57 finished — the eyebrows declared in `content/`, invisible to D71 | Live · corrects **D71** triage | `npm run conformance` |
| D78 | The inline-style ratchet — colour/type set by hand, counted and ratcheted down | Live | `check-inline-style` |
| D79 | Skip link off gilt · tagline exempted from caps · `btn-do-charter` folded into `primary` | Live · closes D76 open items | `check-gilt-escrow` |
| D80 | The mobile drawer was never actually inert — `inert=""` read as false | Live | — ⚠️ no guard reads console warnings |
| D81 | Hero scrims extracted — `.hero-scrim` · `.hero-vignette` · `.band-scrim` | Live · step C of the C→A opacity ruling | `check-inline-style` |
| D82 | Three alpha scales (14 tokens); `#94A3B8` folded into `--text-muted-dark` | Live · step A of the C→A ruling | `check-tokens` |
| D83 | The decorative fifteen — `aria-hidden` + one `sr-only`; 105 → 90 sub-AA nodes | Live · item 3 group 1 | — ⚠️ no guard reads contrast |
| D84 | Supporting text off alpha (102 decls); `/compare` CTA at 1.29:1 found, not fixed | Live · item 3 group 2 | — ⚠️ no guard reads contrast |
| D85 | The `on-dark` trap guarded; pixel contrast auditor deliberately not built | Live · closes the D53/D65 warning | `check-on-dark` |
| D86 | 537 colour literals tokenised; `check-surfaces` + `check-on-dark` taught the token spellings | Live · Wave 1 step 1 | `check-tokens` |
| D87 | Structural matching over value lists; ratchets refuse to bank an implausible drop | Live · permanent fix for D86 | `check-surfaces` · `check-inline-style` |
| D88 | Extraction attempted and reverted — inline styles are load-bearing for specificity | Live · **blocks Wave 1 step 2** | `check-inline-style` |
| D89 | Section colour rules wrapped in `:where()` — defaults, not overrides | Live · **unblocks Wave 1 step 2** | — visual diff, 315 elements |

### Type & payload

| D | Decision | Status | Enforced by |
|---|---|---|---|
| D59 | Source Sans 3 is the one Latin face | Live (Latin) · CJK half → D62 | `check-font-preload` |
| D62 | ZH is set in LXGW WenKai GB | Live | `check-cjk-coverage` |
| D63 | CJK served from a frequency-tiered local subset | Live | `check-cjk-coverage` (both passes) |
| D64 | Latin preload trimmed to the subset actually used | Live | `check-font-preload` |
| D67 | The Latin face leads the CJK stack | Live | — |

---

## Superseded — provenance only

**Do not write new work to these.** They are kept in place, not moved: D30, D33, D35,
D40 and others cross-reference them by number, and an append-only log that renumbers or
relocates entries stops being able to explain itself. This section is the archive; the
files are the record.

| D | Was | Superseded by | Note |
|---|---|---|---|
| D3 | ZH home H1 = brand sub-tagline | **D48** | Home hero H1 rewritten EN+ZH |
| D10 | "Globally-mobile families" positioning | **D40** | D40 names the supersession; D10 did not |
| D22(a) | "Janet Sui" in formal credits, "Janet" in warm register | **D35** | — |
| D22(b) | ZH closing H2 = 语言的根，长在阅读里 | **D49** | Closing stamp made locale-aware |
| D23 | "The Method" as the nav label | **D30** | → "DODO Method" |
| D26 | "Globally mobile families" on chrome surfaces | **D40** | Purged by D45; 0 occurrences verified 2026-08-29 |
| D28 | Path-aware `PreCtaBand` with a `/consult` swap | **D33** | `footer.preCtaWatch` removed |
| D51 | Literata + Noto Serif SC as a display pair | **D59** | Faces removed, `.font-display` deleted |
| D53 | The D-o bracket on funnel CTAs (with fills) | **D53b** | — |
| D52 | Gilt reserved for Charter Enrolment | **D76** | Reservation retired for a positional rule. Its premise was also false: `.btn-do-charter` had 3 call sites, not 0 |
| D69 | `.eyebrow-pill` for hero eyebrows | **D70** | Superseded one version later |

## Fulfilled — completed cascades

Nothing to keep applying. Listed so a reader does not mistake a finished job for an
open one.

| D | What shipped |
|---|---|
| D32 | Little DODO briefed → page shipped 2026-06-02 |
| D45 | Tagline purged from live code (13 occurrences, 8 files) |
| D46 · D48 | Home reworked, then re-voiced to §08 |
| D49 | About reworked to v5.1 |
| D50 | Methodology · Program · Compare · schema reworked |

## Open — decided in principle, unresolved in practice

| D | What is open | Owner |
|---|---|---|
| D14 | Type A/B caption still owed to `/methodology` | content |
| D13 | `/faq` pricing figures never re-verified against the current combinations | admin |
| D41 | `/compare` AI-tutor + gifted-books rows, `/faq` objection entries | content |
| D38 | §07a research block not on `/methodology` | content |
| D37 | Five strands surfaced on neither `/methodology` nor `/program` | content |

### Resolved conflicts

**D37 vs D44 Truth 3 — closed by D74 (2026-08-30).** D37's brief said progress may never
render as a score, gauge or dial; D44 Truth 3 requires a specific number on every
conversion page. Meanwhile `LexileBar` — `role="progressbar"`, on five routes including
the home page — and the `/results` 6+1 trait bars had been shipping the forbidden device
for a long time. The ⛔ was **narrowed to the curriculum ladder**: the test is whose
number it is. A measured outcome a family owns may render as a bar; a visitor's own
standing may not. No code changed.

---

## Adding a decision

1. Append to the log that owns it — content or interface. Never renumber.
2. If it supersedes or amends an earlier D, **say so at BOTH ends**: the new entry names
   what it replaces, and the old entry gains a forward pointer. Every gap in this index
   came from doing only the first half.
3. Add a row here with a status.
4. **A claim that something is "gone", "retired" or "used nowhere" must name the guard
   that enforces it** — or be written `(unverified)`. Three claims in this codebase were
   sincere, unguarded, and false when written (D65, D70, and the gilt reservation).
