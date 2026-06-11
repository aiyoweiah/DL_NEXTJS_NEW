# Naming alternatives — DODO Coding methodology + fourth verb

> ⚠️ **SUPERSEDED (2026-06-09).** Entire doc retired. User redirected away from the four-phase-Loop architecture. New direction: **DODO Coding is a language art that teaches how AI reads, thinks, and writes, with critical thinking as the human discipline emphasized throughout — no Loop / Arc / Protocol methodology name, no fourth-verb candidate.** The Loop replacement candidates (Protocol / Arc / Pass / Practice / Sequence / RRSD) are all retired. The fourth-verb candidates (Discern / Judge / Direct / Govern / Weigh) are all retired. The §09 brand-guide exception is no longer needed (there is no Loop on DODO Coding surfaces, so there is no conflict to carve around). This doc is kept only as a decision-history record; do not act on its recommendations.

**Date:** 2026-06-09
**Status:** SUPERSEDED. Kept as history only.
**Triggered by:** User request 2026-06-09 to surface alternatives to "The Loop" and "Decide."
**Superseded by:** User redirect 2026-06-09 — language-art framing + Read/Think/Write triplet + critical thinking emphasis.

---

## In one paragraph

The brand-guide conflict over "The Loop" is reframed: instead of carving an ELA-vs-Coding exception in §09, we rename DODO Coding's methodology entirely. While at it, we also rename the fourth verb — both because "Decide" semantically collides with cycle B4 ("How Machines Decide") in the source curriculum doc, and because the elevated register the rest of the system holds in (Navigator, Loop, Lexile, LCS) wants a fourth verb sharper than "Decide." This doc proposes paired options for both renames, flags each option's downstream implications across the source docs and the staged design folder, and recommends one combination to lock.

---

## Implications scan — what a rename touches

### Source docs (DODO_Coding repo)

| File | "The Loop" refs | "Decide" refs | Notes |
|---|---|---|---|
| `dodo-coding-content-guide.md` | 25+ | 11 | Marketing guide v1.0 — entire §3 is "The DODO Coding Loop"; §1.3 tagline candidate "Two Languages. One Mind." references the parallel; §3.1 maps Loop to Pillars; §8.1 hero subhead names the four-verb sequence; §10.3 OG image is the Loop graphic. **Major rewrite required across §1.2, §1.3, §3 entire, §3.1, §3.2, §8.1, §10.3, Appendix A glossary.** |
| `program-streams-v1.md` | 15 ("Loop emphasis" appears once per cycle, ×14 cycles + intro) | 5+ (B4 cycle title "How Machines Decide," plus per-cycle Decide-phase references) | Curriculum doc v1.0 — §1.1 names the methodology; §1.3 lists pedagogical principles; §3.5/4.5/5.5 each cycle has a "Loop emphasis" field; §7 entire section is "Loop instantiation by stream." **Mechanical replace pass — high count, low risk per occurrence.** Plus the B4 title "How Machines Decide" — if Decide becomes the human-verb name, this cycle's title needs to change to disambiguate (e.g., "How Machines Choose" or "How Machines Make Calls"). |

### Live site content (DL_NEXTJS_NEW — NOT affected)

84 occurrences of "The Loop" exist in `content/marketing.{en,zh}.js`, `faq.js`, `cities.js`, and two blog posts. **All of these describe ELA's Loop (Read → Think → Speak → Write)** and are permitted body-copy usage per BCG §09. **None of these change.** The rename touches only DODO Coding's staged surfaces.

### Staged design docs

| File | "The Loop" refs | "Decide" refs | What changes |
|---|---|---|---|
| `01-PROPOSAL.md` | 1 (in-paragraph mention) | 1 | Single-paragraph note + cross-link to this doc |
| `02-THEME.md` | 19 | many | Loop graphic spec — Spec A "Inward Turn" and Spec B "Four Glyphs" both name the new methodology; component name `Loop.jsx` per `03-SCAFFOLD.md` would rename; "fourth verb" treatment throughout |
| `03-SCAFFOLD.md` | 15 | many | Content keys `loopPreview`, `loop.phases`, `Loop.jsx` component, content shape `verbs` — rename to whatever lands |
| `04-COPY-PASS.md` | 43 | many | Entire homepage copy block; Section 4 H2; glossary entries; ZH mirror; the §07/§09/§10/§12 brand-guide additive edits become simpler (no exception needed; new term gets its own row) |

### Brand guide + glossary impact

- BCG §09 "The Loop" row — **no change.** The existing rule stands (per-session phrase on ELA, body copy only). DODO Coding's new methodology name gets its own §09 row as an owned term.
- BCG §07 frameworks — same additive edits proposed in 04-COPY-PASS.md (AI4K12, CMU CS Academy, Huyen, Claude/Gemini) still apply.
- dodo-glossary.json — `"The Loop (DODO Coding)"` entry is replaced by the new term; `"Read → Reason → Speak → Decide"` ZH entry replaced by the new sequence.

### Code / component impact (deferred — only at scaffold apply)

- `components/ui/coding/Loop.jsx` → renamed to whatever the new methodology requires (e.g., `Protocol.jsx`)
- Content keys `loopPreview`, `loop` in `content/coding.{en,zh}.js` → renamed
- Section H2 strings → rewritten in EN + ZH

---

## Option set A — alternatives to "The Loop"

Each candidate evaluated against five criteria:

1. **Brand-coherent** — does it sound like it belongs in the same family as Navigator, Lexile, LCS, 6+1 Trait?
2. **Named-methodology force** — can it carry the "every session, in this order, without exception" weight?
3. **Subject-matter fit** — does it fit a computer-science / AI-engineering audience?
4. **ZH renderable** — does it translate cleanly to ZH parent register?
5. **Avoids collision** — with "16-week cycle," with software jargon, with ELA's Loop

### A1 — **The Protocol** ★ recommended

> "Every session runs The Protocol — Read · Reason · Speak · [verb]."

| Criterion | Verdict |
|---|---|
| Brand-coherent | **Strong.** Sits next to Navigator and LCS without strain. |
| Named-methodology force | **Strong.** "Run the protocol" carries non-negotiable rhythm. Stronger than "Loop" at communicating "this exact sequence, every time." |
| Subject-matter fit | **Strong.** Engineering-credible. The CS/AI audience reads "protocol" as a rigor signal (TCP/IP, scientific protocol, medical protocol). |
| ZH renderable | **Strong.** 规程 (guī chéng) or 守则 (shǒu zé) — both elevated, both parent-recognizable, neither generic. Recommended: **规程**. |
| Avoids collision | **Yes** — no conflict with cycle, software jargon (HTTP/TCP read in context, not interference), or ELA's Loop. |

**Risk:** Slightly clinical register. Mitigated by the warm framing in body copy ("the protocol your child runs with a Navigator").

### A2 — **The Arc**

> "Every session runs The Arc — Read · Reason · Speak · [verb]."

| Criterion | Verdict |
|---|---|
| Brand-coherent | **Strong.** Already in DODO vocabulary — BCG §01 calls DODO ELA "a Navigator-led structured learning arc." |
| Named-methodology force | **Medium.** "Arc" implies a curve / journey, which works at cycle scale but slightly soft at session scale. |
| Subject-matter fit | **Medium.** Literary register; not specifically CS. |
| ZH renderable | **Medium.** 弧线 (literal) reads physical; 学习弧 / 教学弧 reads coined. Best: 教学弧. |
| Avoids collision | **Yes** — "arc" is used adjectivally in BCG ("learning arc"), not as a named system, so a DODO Coding promotion to capitalized "The Arc" doesn't conflict. |

**Risk:** "Arc" reads metaphor-soft for a CS audience. Better at cycle scope than session scope.

### A3 — **The Pass**

> "Every session runs The Pass — Read · Reason · Speak · [verb]."

| Criterion | Verdict |
|---|---|
| Brand-coherent | **Medium.** Bold, terse — works only if the rest of the brand voice leans engineering. |
| Named-methodology force | **Strong.** "One pass" maps exactly to "one session." Engineering audiences read "compiler pass" / "training pass" / "code review pass." |
| Subject-matter fit | **Very strong.** Genuine CS vocabulary. |
| ZH renderable | **Weak.** 一遍 / 一轮 — both work as descriptions but neither carries the named-system weight in ZH. |
| Avoids collision | **Yes** — but parents may not connect with the jargon-coded register. |

**Risk:** Reads insider-CS — alienates the non-CS-trained parent half of the audience.

### A4 — **The Practice**

> "Every session runs The Practice — Read · Reason · Speak · [verb]."

| Criterion | Verdict |
|---|---|
| Brand-coherent | **Strong.** Warm + disciplined dual register. |
| Named-methodology force | **Medium.** "The Practice" reads more about habit than sequence; the in-this-order character needs heavier body-copy reinforcement. |
| Subject-matter fit | **Medium.** Borrowed from meditation / martial arts / professional practice (medical, legal). |
| ZH renderable | **Strong.** 修习 / 习练 — both carry the disciplined-repetition meaning at an elevated register. |
| Avoids collision | **Yes** — though "practice" is generic enough to need typographic discipline (always Capitalized; never lowercase). |

**Risk:** The discipline-through-repetition reading is right; the in-this-order force is softer than Loop/Protocol carried.

### A5 — **The Sequence**

> "Every session runs The Sequence — Read · Reason · Speak · [verb]."

| Criterion | Verdict |
|---|---|
| Brand-coherent | **Medium.** Literal, plain. |
| Named-methodology force | **Strong.** The most directly literal — names the in-this-order rule by name. |
| Subject-matter fit | **Strong.** "Sequence" is universal CS vocabulary (sequence diagrams, RL sequences, generation sequences). |
| ZH renderable | **Medium.** 序列 is correct but feels descriptive rather than named. |
| Avoids collision | **Yes.** |

**Risk:** Too plain. Doesn't have the proprietary-name feel a brand methodology needs.

### A6 — Initialism (e.g. **RRSD**, **RRS·X** where X is the new fourth verb)

> "Every session runs RRSD — Read, Reason, Speak, [verb]."

| Criterion | Verdict |
|---|---|
| Brand-coherent | **Strong.** Direct parallel to LCS. |
| Named-methodology force | **Strong.** Initialisms read as official systems. |
| Subject-matter fit | **Strong.** Engineering culture uses initialisms. |
| ZH renderable | **Medium.** Initialism stays Latin (cf. LCS); the four-character expansion translates well. |
| Avoids collision | **Yes** — pending choice of fourth verb. |

**Risk:** Cold — needs a memorable expansion phrase to humanize.

### A — Rejected

| Option | Why rejected |
|---|---|
| **The Cycle** | Collides with "16-week cycle" — DODO's existing canonical unit. Forbidden. |
| **The Method** | Generic. Already used loosely in BCG voice. No proprietary weight. |
| **The System** | Generic. LCS already uses "System." |
| **The Discipline** | Vague — doesn't surface the four-phase structure. |
| **The Rounds** | Medical-coded; ambiguous register. |

---

## Option set B — alternatives to "Decide"

Each candidate evaluated against six criteria:

1. **Captures the human-only meaning** — judgment of truth, fairness, worth of building
2. **Sharp distinction from Reason** — verb 2 of the four-verb sequence
3. **Parallels ELA's Write** — both ELA's "Write" and Coding's fourth verb are the human's output
4. **One- to two-syllable** — matches the rhythm of Read, Reason, Speak
5. **ZH renderable at elevated register**
6. **Avoids cycle B4 collision** — the B4 cycle is currently titled "How Machines Decide"

### B1 — **Discern** ★ recommended

> "Read → Reason → Speak → Discern"

| Criterion | Verdict |
|---|---|
| Human-only meaning | **Very strong.** "Discern truth · discern fairness · discern worth" reads tighter than "decide" did. Carries the discrimination-of-truth meaning natively. |
| Distinct from Reason | **Strong.** Reasoning is mechanical (algorithms can do it). Discernment is the move humans make on top of reasoning. Cleaner split than Decide gave us. |
| Parallels Write | **Strong.** Both Write and Discern are the human's output of judgment — one in text, one in stance. |
| Syllable count | 2 syllables — matches Reason (2), Decide (2). Rhythm preserved. |
| ZH renderable | **Very strong.** **明辨** (míng biàn) — among the most elevated four-character-rooted verbs available; carries Confucian register (明辨笃行 from *Doctrine of the Mean*); reads premium-scholarly to the parent audience. |
| B4 collision | **Resolved.** Discern is exclusively human; B4 can keep "How Machines Decide" because "decide" reverts to its everyday verb meaning (machines decide outputs ≠ humans discern truth). |

**Risk:** Slightly formal English register. Mitigated by the elevated brand voice the rest of the system holds. Discern is in active register for the target parent audience.

### B2 — **Judge**

> "Read → Reason → Speak → Judge"

| Criterion | Verdict |
|---|---|
| Human-only meaning | **Strong.** "Judge truth · judge fairness · judge worth" is direct. |
| Distinct from Reason | **Strong.** |
| Parallels Write | **Medium.** Both are outputs but Judge reads adversarial where Write reads constructive. |
| Syllable count | 1 syllable — breaks the rhythm slightly (Read·Reason·Speak·Judge has different cadence than Read·Reason·Speak·Decide). |
| ZH renderable | **Strong.** 判断 / 评判 / 裁断 — multiple options; 评判 reads premium-but-not-judgmental. |
| B4 collision | **Resolved.** |

**Risk:** "Judge" in English carries school-discipline + moralistic connotation — "you're judging me." Reads less inclusive than Discern in marketing copy.

### B3 — **Direct**

> "Read → Reason → Speak → Direct"

| Criterion | Verdict |
|---|---|
| Human-only meaning | **Strong.** Aligns with marketing-guide closing line "they direct it, not be directed by it." |
| Distinct from Reason | **Strong.** |
| Parallels Write | **Medium.** Direct reads about command; Write reads about composition. |
| Syllable count | 2 syllables — rhythm preserved. |
| ZH renderable | **Medium.** 指挥 reads command-coded; 主导 reads ownership; neither has Discern's premium register. |
| B4 collision | **Resolved.** |

**Risk:** "Direct" overlaps with Navigator's role ("the Navigator directs the session"). Risk of brand-vocabulary collision.

### B4 — **Govern**

> "Read → Reason → Speak → Govern"

| Criterion | Verdict |
|---|---|
| Human-only meaning | **Very strong.** "Govern what gets built" matches marketing-guide §1.4 exactly. |
| Distinct from Reason | **Strong.** |
| Parallels Write | **Medium.** |
| Syllable count | 2 syllables. |
| ZH renderable | **Medium.** 治理 reads political; 主理 reads chairman-of-the-board; both heavier than Decide. |
| B4 collision | **Resolved.** |

**Risk:** Political coloration in English; ZH equivalents read corporate-bureaucratic. Off-register for a parent-facing brand.

### B5 — **Weigh**

> "Read → Reason → Speak → Weigh"

| Criterion | Verdict |
|---|---|
| Human-only meaning | **Strong.** Carries the scales-of-justice metaphor. |
| Distinct from Reason | **Strong.** |
| Parallels Write | **Medium.** |
| Syllable count | 1 syllable — rhythm shift. |
| ZH renderable | **Medium.** 权衡 — premium but reads as deliberation; 衡量 reads measurement-coded. |
| B4 collision | **Resolved.** |

**Risk:** Literary-fussy register. Better as a body-copy verb than a phase-name verb.

### B — Rejected

| Option | Why rejected |
|---|---|
| **Choose** | Plain — lacks ethical weight; reads consumer-coded. |
| **Authorize** | 3 syllables; bureaucratic register. |
| **Verify** | Verify is downstream of judgment, not the same as it; loses "decide what is worth building." |
| **Lead** | Used elsewhere in BCG ("leadership outcomes"); brand-vocabulary collision. |

---

## Recommended combination — Combo α

> **The Protocol — Read · Reason · Speak · Discern**

### Why this pair

1. **Register lift.** Protocol + Discern read more rigorous than Loop + Decide. The brand voice the rest of the system carries (Navigator, Lexile, 6+1 Trait, LCS) wants the lift.
2. **Rhythm preserved.** Read (1) · Reason (2) · Speak (1) · Discern (2). Same syllable cadence as the original.
3. **ZH parallel works.** 规程 (Protocol) and 明辨 (Discern) both carry elevated four-character register; parents recognize the register as Confucian-scholarly without parsing the specific reference.
4. **No collisions.** Protocol doesn't conflict with cycle or ELA's Loop. Discern resolves the B4 "How Machines Decide" semantic blur because Discern is exclusively human (and the everyday verb "decide" can keep its B4 title meaning).
5. **Brand promise rewrites cleanly.** The marketing guide §1.2 promise becomes:
   > *DODO Learning ELA teaches a child to think precisely in human language.*
   > *DODO Coding teaches a child to think precisely in machine language — and to know when only a human should discern.*
6. **Tagline §1.3 holds.** "Code with Precision. Decide with Reason" → "Code with Precision. Discern with Reason." Still passes the §08 hero-cap and the §02 truth tests. Subhead becomes: *"Machine fluency at the literacy level. Discernment as the natural outcome."*

### Why not Combo β (The Arc — Judge)

Combo β (The Arc + Judge) is the cleanest single-syllable / literary alternative. It loses on two axes: Judge reads adversarial in marketing copy, and Arc is softer at session scope than Protocol. Recommend only if user finds Protocol clinically cold.

### Why not status quo + brand-guide exception

The original 04-COPY-PASS.md Option A path (carve a §09 exception for The Loop on `/coding/*`) is now dispreferred because:
- The B4 "How Machines Decide" semantic blur stays unresolved
- "Decide" remains administrative-coded in EN; "决定" remains administrative-coded in ZH
- The brand register lift Protocol + Discern offers is real value, not just collision-avoidance

---

## Apply implications — what changes if Combo α is locked

### Source docs (DODO_Coding repo — author's call whether to rewrite)

| File | Edit | Effort |
|---|---|---|
| `dodo-coding-content-guide.md` v1.0 → v1.1 | Replace "The Loop" → "The Protocol" (25+ instances), "Decide" → "Discern" (11 instances). Rewrite §3 section title + lead. Update §1.2 brand promise + §1.3 tagline. Update §10.3 OG image label. Update Appendix A glossary. | Half-day mechanical pass + a 1-hour voice review |
| `program-streams-v1.md` v1.0 → v1.1 | Mechanical replace pass — "Loop emphasis" field × 15, "Decide" phase references throughout, B4 cycle title "How Machines Decide" stays (per the B4 collision resolution). | 1 hour |

These are the AUTHOR's source documents (you). The rewrite can happen at your pace before the staged design docs land.

### Staged docs (this folder — Claude can update directly)

| File | Edit |
|---|---|
| `01-PROPOSAL.md` | Two-line mention added + cross-link to this doc |
| `02-THEME.md` | Replace "The Loop" → "The Protocol" / "the protocol" (19 refs); component name `Loop.jsx` → `Protocol.jsx`; Loop graphic spec name unchanged structurally (still "the four-phase graphic"); "Decide" wordmark → "Discern" wordmark; the named places list ("AI4K12 Big Idea 5 — the human Big Idea") replaces "Decide phase" with "Discern phase" |
| `03-SCAFFOLD.md` | Content keys `loopPreview` → `protocolPreview`, `loop.phases` → `protocol.phases`, file `Loop.jsx` → `Protocol.jsx`, `verbs` array fourth element label change |
| `04-COPY-PASS.md` | Lint pass + ZH mirror — full rewrite of homepage Section 4 (was "The Loop"), Section 5 "During The Program" sub-lead ("Every session runs The Loop" → "Every session runs The Protocol"), and Phase 4 copy block. Hero subhead changes from "decide what only a human should decide" → "discern what only a human can discern." The Hard Block at the top of 04 is deleted (the conflict no longer exists). The brand-guide §09 exception in 04 is replaced with a new §09 row for The Protocol as DODO Coding's owned-vocab named system. The glossary extension adds `"The Protocol"` and `"Discern"` instead of `"The Loop (DODO Coding)"`. |

### Brand guide + glossary impact (cleaner than Option A)

- BCG §09 — add **a new owned-term row** for The Protocol (rather than carving a Loop exception):
  > **The Protocol** | The named methodology on DODO Coding surfaces. The per-session four-phase sequence Read · Reason · Speak · Discern. Always capitalized. Lives as the named system on `/coding/*` brand surfaces. | Never: "Our framework" loosely; using "Protocol" lowercased as a generic term in body copy.
- BCG §09 — no change to the existing "The Loop" row. ELA's Loop stays exactly as it is.
- dodo-glossary.json — adds `"The Protocol": "规程"`, `"Read → Reason → Speak → Discern": "阅读 → 推理 → 表达 → 明辨"`, `"Discern": "明辨"`. Drops the proposed `"The Loop (DODO Coding)"` entry from 04.

---

## Open questions to lock before applying

| # | Question | Recommendation |
|---|---|---|
| 1 | **Combo α (Protocol + Discern) vs. Combo β (Arc + Judge) vs. another pairing the user prefers** | Combo α — register lift + rhythm preserved + cleanest collision resolution |
| 2 | **Should the EN secondary tagline change too?** Current: *"Code with Precision. Decide with Reason."* | Yes — *"Code with Precision. Discern with Reason."* Holds the syllable rhythm; lifts the register; resolves the §1.2 brand-promise wording change. |
| 3 | **Should we hold the source-doc rewrite (marketing guide v1.1, curriculum v1.1) before staged-doc updates, or run them in parallel?** | Update staged docs first (Claude can do this in one pass). Source-doc rewrite is the author's call and can land later — the staged docs are the source of truth for the apply. |
| 4 | **Cycle B4 title — keep "How Machines Decide" or rename to disambiguate?** | Keep. With Discern as the human-only verb, B4's "Decide" reverts to its everyday meaning ("machines compute outputs"). No collision. |
| 5 | **Component file `Loop.jsx` rename** | Rename to `Protocol.jsx`. Mechanical. |

---

*End of 05-NAMING-ALTERNATIVES.md. On lock-in, all staged docs are updated; source-doc rewrite happens at author's pace.*
