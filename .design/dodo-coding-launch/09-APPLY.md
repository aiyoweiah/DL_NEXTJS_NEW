# Apply log — Source-doc revisions (07 + 08)

**Date:** 2026-06-09
**Status:** Applied. Source files at v1.1.
**Trigger:** User instruction `apply` on 2026-06-09.
**Scope:** Source-doc revisions only — `dodo-coding-content-guide.md` and `program-streams-v1.md`. **Web launch is NOT applied** — it remains gated on Proposal A (`program-family-parallel` ships first; `/coding` second). The user has uncommitted PFP-side changes (`content/cities.js`, `content/faq.js`, `content/marketing.{en,zh}.js`, `lib/schema.js`, `public/llms.txt`) — those need to ship before `/coding` enters apply.

---

## What landed

### 07 — Marketing guide v1.0 → v1.1
**File:** `F:\PC-Documents\DODO_Coding\marketing\dodo-coding-content-guide.md`

| Section | Change | Verified |
|---|---|---|
| Header | Version bump v1.0 → v1.1; added v1.1 changes summary paragraph | ✅ |
| §1.1 Brand architecture | "Co-equal sister track" → "separate language art." Drop the parallel-shape claim; preserve shared infrastructure (Navigator model, 16-week cycle, voice, audience frame). | ✅ |
| §1.2 Brand promise | Drop ELA-parallel + Decide-verb closing. New: *"DODO Coding is a language art for the AI age. We teach a child how AI reads, thinks, and writes — and how to think critically about what AI does."* | ✅ |
| §1.3 Tagline | Drop "Code with Precision. Decide with Reason." Primary now *"A language art for the AI age."* Sub-tagline *"How AI reads, thinks, writes — and how to think critically about it."* New A/B alternates listed. | ✅ |
| §1.4 Audience positioning | New: *"For children who will work with AI every day of their lives — and need to think critically about what it produces."* | ✅ |
| §2.3 Voice sample | Drop the side-by-side ELA parallel. Single DODO Coding voice sample retained. | ✅ |
| §3 entire | Renamed from "The DODO Coding Loop" → "What we teach." New structure: §3.1 the three machine abilities (Read · Think · Write) + §3.2 critical thinking as human discipline + §3.3 why this is a language art + §3.4 pillar mapping. Production-ready copy blocks under each. | ✅ |
| §4.4 Pillar 4 marketing | Drop "the Speak phase of the Loop" reference; updated to "the Write machine ability" | ✅ |
| §4.5 Pillar 5 marketing | Drop "the Decide phase of the Loop" reference; updated to "the critical-thinking discipline" | ✅ |
| §5.2 Stats template | Split Big Ideas 1–4 from Big Idea 5 (tracked separately via critical-thinking rubric) — honest about how the curriculum actually teaches | ✅ |
| §7 IA recommendation | Updated to match `01-PROPOSAL.md`: 6 launch routes (home, about, methodology, program, faq, consult) + 3 deferred + 3 "built only when needed." Dropped the "DODO Learning ↔ DODO Coding" header toggle. Added DODO Coding band on `/` reference. | ✅ |
| §8.1 Hero (Section 1) | Eyebrow → *A language art.* H1 → two parallel `We teach…` sentences. Subhead → grounding + framework names. Secondary CTA at launch routes to consult. | ✅ |
| §8.1 Who-We-Are (Section 3) | Drop final-paragraph "through The Loop. Machine literacy emerges from this rigor." → simpler "and closes it, week by week." CTAs updated to reflect deferred-route plan. | ✅ |
| §8.1 Methodology preview (Section 4) | Section retitled "What we teach." H2 + lead match `04-COPY-PASS.md`. Three-verb triplet + critical-thinking block specified. | ✅ |
| §8.1 During-the-program copy (Section 5) | Replaced Loop-shaped phrasing ("Read. Reason. Speak. Decide.") with three-ability + critical-thinking phrasing. | ✅ |
| §8.1 After-16-weeks copy (Section 5) | Replaced "decide what is worth building" with "learned to think critically about it." Closing affirmation ("They direct it.") preserved. | ✅ |
| §8.1 Demo (Section 7) | Marked deferred. Loop reference dropped from copy. | ✅ |
| §8.1 Cross-sell (Section 8) | Updated copy: language-art parallel made verbal not architectural. Marked one-way pointer. Explicit note that ELA pages do not contain a reciprocal mention. | ✅ |
| §8.2 Methodology page structure | Replaced "The Loop, full-width graphic" + "Four Phases" with the new 7-section structure (Hero → What we teach → Critical thinking → The grounding → Why open-source → The Four Pillars → CTA). | ✅ |
| §8.3 Program page progression | "How the Loop sequences across 16 weeks" → "how the 16 weeks sequence the three machine abilities" + clarification that critical thinking is woven throughout. | ✅ |
| §8.4 Navigators hero | Drop "how to think with the machine, and how to know when only the human can decide" → "how to think with the machine, and how to think critically about what the machine produces." | ✅ |
| §8.6 Demo page | Marked deferred. Drop "a full session of The Loop" → "a full session." Noted demo page does not link to/from ELA's `/demos`. | ✅ |
| §9 Cross-sell | Heavy rewrite — explicit "one-way" framing. Drop "bidirectional cross-sell" claim. Drop the proposed ELA-side cross-callout block. Specify that ELA pages get only the footer column item + the DODO Coding band on `/`. Bundled pricing rec preserved. | ✅ |
| §10.1 Target keywords | `/coding/methodology` row: "Read Reason Speak Decide" → "how AI works for kids, AI4K12 Five Big Ideas, critical thinking about AI" | ✅ |
| §10.2 Meta description | Rewrote around language-art framing + three abilities + critical thinking. Removed Read→Reason→Speak→Decide. | ✅ |
| §10.3 OG | og:title updated to "A language art for the AI age." og:image spec changed from "The Loop graphic" to typographic mark, with cross-reference to `06-LOOP-SUBSTANCE-EXTRACTION.md` Job 4 for the future iconic visual signature. | ✅ |
| §11.2 What changes (visual direction) | Replaced "The Loop graphic — four concentric arcs" with the typography-led treatment from `02-THEME.md` (three-verb triplet + critical-thinking heading in `--ink-deep`). Pillar icons spec updated with `--ink` tick. "No iconic methodology graphic at launch" + open design question for future. "No 'robot' iconography" reaffirmed. | ✅ |
| §12 Open decisions | Pruned 4 resolved items (IA, tagline, Loop verbs, cycle length); preserved 5 still-open items (robotics, pillar logos, headline stats, bundled pricing, Navigator hiring); added 1 new open item (iconic visual signature). Logged resolved decisions for posterity. | ✅ |
| Appendix A Glossary | Drop "The Loop," "Reason," "Speak," "Decide," "Code with Precision. Decide with Reason." tagline. Add "A language art for the AI age," "The three machine abilities," "Read/Think/Write (machine abilities)," "Critical thinking" (DODO Coding sense), "Override conditions." Added explicit retired-terms list with do-not-reintroduce annotations. | ✅ |
| Appendix B Sample alternate hero variations | Section retired entirely (all three variants were Loop-shaped). | ✅ |
| Footer (update history) | Logged v1.0 → v1.1 transition. | ✅ |

### 08 — Curriculum doc v1.0 → v1.1
**File:** `F:\PC-Documents\DODO_Coding\curriculum\program-streams-v1.md`

| Section | Change | Verified |
|---|---|---|
| Header | Version bump v1.0 → v1.1; added v1.1 changes summary | ✅ |
| §1.1 The Loop → Session structure | Renamed; table updated (Reason→Think, Speak→Write, Decide → "Critical thinking (the human discipline)"); explanatory paragraph rewritten to clarify critical thinking is woven throughout, not isolated | ✅ |
| Per-cycle "Loop emphasis" field | **All 14 instances removed** (B1, B2, B3, B4, I1, I2, I3, I4, I5, I6, A1, A2, A3, A4). Verified with `Loop emphasis` grep → 0 matches. | ✅ |
| §3.6 Beginner sample session (60 min) | REASON → THINK; SPEAK → WRITE; DECIDE → "Critical thinking." Headings updated. | ✅ |
| §4.6 Intermediate sample session (75 min) | REASON → THINK; SPEAK → WRITE; DECIDE → "Critical thinking." Greeting line updated. | ✅ |
| §5.6 Advanced sample session (90 min) | REASON/SPEAK → THINK/WRITE; DECIDE → "Critical thinking." Greeting line updated. | ✅ |
| §6.5 Claude/Google ambient row | "The Decide phase" → "critical thinking" (the discipline). | ✅ |
| §7 Loop instantiation by stream → Ability progression by stream | Renamed; subsection tables renamed (Reason→Think, Speak→Write, Decide→Critical thinking); intro paragraph updated. | ✅ |
| §11.2 Navigator pedagogical competency | Drop "Read → Reason → Speak → Decide Loop" → updated to "session structure (Read · Think · Write with critical thinking woven throughout)" | ✅ |
| §12 Open decisions entry 10 | Logged v1.1 publication date; updated v2.0 timing. | ✅ |
| Appendix A.1 Beginner sample lesson plan | "Loop preview" → "Session preview"; REASON/SPEAK/DECIDE → THINK/WRITE/Critical thinking. | ✅ |
| Appendix A.2 Intermediate sample lesson plan | Title "How Machines Speak" → "How Machines Write"; "Loop preview" → "Session preview"; SPEAK/DECIDE → WRITE/Critical thinking. | ✅ |
| Appendix A.3 Advanced sample lesson plan | "Loop preview" → "Session preview"; REASON/DECIDE → THINK/Critical thinking. | ✅ |
| Appendix C cross-references | Marketing guide path bumped to (v1.1). Sister-program parallel line rewritten as "DODO Learning ELA (separate program)" with separation-principle note. Added web launch staged docs link. | ✅ |
| TOC entries | "Framework — Loop, pillars, pedagogy" → "Framework — session structure, pillars, pedagogy"; "Loop instantiation by stream" → "Ability progression by stream" | ✅ |
| Footer (update history) | Logged v1.0 → v1.1 transition with details. | ✅ |

### Things deliberately NOT changed in 08 (substance preserved 100%)

- All 14 cycle definitions (themes, topics, AI literacy threads, capstones, AI4K12 mastery targets)
- All five pillars (§1.2)
- All five pedagogical principles (§1.3 — Constructionism, Computational Action, Glass-box AI literacy, Critical AI literacy, Socratic 1-on-1 dialogue)
- The 16-week cycle structure (§1.4)
- The multi-year progression diagram (§1.5)
- Stream profiles, audience profiles, cognitive shapes, entry requirements, exit competencies
- Late-entrant & placement pathways (§8 in full)
- Assessment framework + AI4K12 rubric scoring guide + code quality rubric + portfolio artifacts + parent-facing reporting cadence (§9 in full)
- Tools & operational environment (§10 in full)
- Navigator competency tables (§11.1, §11.3 unchanged; §11.2 had one line updated)
- Appendix B external standards mapping

Every Python loop construct reference (e.g. "Loops as repetition" in B1 topics) is preserved — those are programming concepts, not methodology branding.

---

## Verification

### File checks

```
Marketing guide grep for retired terms:
- "Loop emphasis"           → 0 matches (was 14)
- "Read → Reason → Speak → Decide"  → 1 match in retired-terms list (intentional)
- "Code with Precision. Decide with Reason."  → 1 match in retired-terms list (intentional)
- "co-equal sister track"   → 0 matches (was 1)

Curriculum doc grep for retired terms:
- "Loop emphasis"           → 0 matches (was 14)
- "Loop preview"            → 0 matches (was 6)
- "REASON" / "SPEAK" / "DECIDE" (uppercase as phase labels)  → 0 matches
- "Read → Reason → Speak → Decide Loop"  → 0 matches (was 1)
```

### Consistency between the two docs

- Both call the methodology by the same names (machine abilities Read · Think · Write; human discipline critical thinking)
- Both treat critical thinking as woven throughout, not as a fourth phase
- Both reference the same AI4K12 mapping (Big Idea 1 = Read; Big Ideas 2+3 = Think; Big Idea 4 = Write; Big Idea 5 = critical thinking)
- Cross-reference from curriculum doc Appendix C now points at marketing guide v1.1

### Git status

The source docs at `F:\PC-Documents\DODO_Coding\` are not in git (per turn-12 user note). No commit needed; files are saved in place.

---

## What still requires user action

### Web launch (held under Proposal A)

The web staged docs (`01-PROPOSAL.md` through `06-LOOP-SUBSTANCE-EXTRACTION.md`) are ready. The apply order is documented in `01-PROPOSAL.md` §"Apply order (when triggered)."

**Blocker:** `program-family-parallel` has not yet shipped. The user's session-start git status shows uncommitted modifications to PFP-touched files. PFP needs to ship before `/coding` launch enters apply.

### Marketing guide v1.1 — propagate to other surfaces

The marketing guide is now v1.1, but its directives haven't yet been propagated to:
- ZH translation of any new key phrases (currently marketing guide is EN-only)
- Any social posts, newsletter templates, or partner emails that quoted v1.0 verbatim (none known to exist yet — DODO Coding is pre-launch)

### Curriculum doc v1.1 — propagate to Navigator-facing docs

When the Navigator handbook is authored (currently TBD per Appendix C), it should reference v1.1's session structure, not the retired Loop.

---

## Apply summary

**Files modified:** 2
- `F:\PC-Documents\DODO_Coding\marketing\dodo-coding-content-guide.md` (v1.0 → v1.1)
- `F:\PC-Documents\DODO_Coding\curriculum\program-streams-v1.md` (v1.0 → v1.1)

**Files NOT modified (deliberately):** 0 web files in `F:\PC-Documents\DODO_web\` — the web launch is held under Proposal A.

**Staged docs that still hold their reference value:** 01-PROPOSAL, 02-THEME, 03-SCAFFOLD, 04-COPY-PASS, 06-LOOP-SUBSTANCE-EXTRACTION. 05-NAMING-ALTERNATIVES and 07/08 retain historical value (decision log).

---

*End of 09-APPLY.md.*
