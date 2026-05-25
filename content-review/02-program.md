# `/program` review · APPLIED 2026-05-21

**Status:** ✅ Round 1 (F1–F4 applied · F5–F7 retained) + Round 2 (Q1–Q8 granular pass applied 2026-05-21 — see commits `fe4fe84` + `6ced09c`). Page review complete. See `02-program-content-dump.md` for the refreshed post-Q1–Q8 dump (v3).

---

## F-fixes applied (first round, brand-alignment only)

### F1 ✅ — Stale Lexile claim updated
- **File:** `content/marketing.en.js:334` + `content/marketing.zh.js`
- **Before (EN):** "Our students average a 187-point gain — 1.2 grade levels — over 16 weeks."
- **After (EN):** "Students typically advance one grade level in reading across two 16-week cycles, with per-cycle Lexile gains in the 100L–150L range."
- **Before (ZH):** "我们的学生在16周内平均增长187个Lexile点——相当于1.2个年级水平。"
- **After (ZH):** "学生通常在两个16周周期内将阅读水平提升一个年级，每个周期的Lexile增长约在100L–150L范围。"
- *Source: brand guide §11 canonical Lexile claim, set 2026-05-21*

### F2 ✅ — TRAITS ZH cascade in `page.jsx:47-53`
- **File:** `app/[locale]/program/page.jsx`
- Updated three trait ZH labels to the new canon:
  - `想法` → `思考` (Ideas)
  - `词汇选择` → `用词` (Word Choice)
  - `句子流畅` → `流畅` (Sentence Fluency)
  - `写作规范` → `规范` (Conventions)
- (`结构`, `声音`, `呈现` unchanged — already canonical.)
- *Source: glossary `dodo-glossary.json:14` canonical 6+1 mapping*

### F3 ✅ — Cohort vs 1-on-1 reconciliation
- **File:** `content/marketing.en.js` + `marketing.zh.js` — `hero.stats[4]`
- **Before (EN):** `value: '1' · unit: 'Cohort' · desc: 'Small & intentional'`
- **After (EN):** `value: '1-on-1' · unit: 'Always' · desc: 'No group sessions, no rotation'`
- **Before (ZH):** `value: '1' · unit: '个学习小组' · desc: '小而精'`
- **After (ZH):** `value: '1对1' · unit: '始终如一' · desc: '无班级课，无导师轮换'`
- *Reason: brand guide consistently positions DODO as 1-on-1 with continuous Navigator pairing. "Cohort" was misleading.*

### F4 ✅ — Architecture H2 clarification
- **File:** `content/marketing.en.js:281` + `marketing.zh.js`
- **Before (EN):** "How the work compounds: Loop → LCS → Levels."
- **After (EN):** "How the work compounds: The Loop (per-session) → The LCS System (per-cycle) → Levels (across cycles)."
- **Before (ZH):** "成果如何累积：学习循环 → LCS → 级别。"
- **After (ZH):** "成果如何累积：The Loop（每节课） → The LCS（每个周期） → 级别（跨多个周期）。"
- *Reason: parentheticals clarify the compounding direction; LCS now explicitly named as the per-cycle architectural surface per the 2026-05-21 LCS canon.*

---

## F-flags retained (no change, contextually correct)

### F5 — "The Loop" in section eyebrows + combinations H2
**Decision:** keep. The §2 LoopSection IS about The Loop (correctly named at its locus), and §5 combinations H2 ("Same Loop. Different intensity.") describes the per-session experience that's shared across pricing tiers — this is the per-session phrase, contextually correct per the new canon.

### F6 — "Read the full methodology" link label
**Decision:** keep. Generic link labels are fine per brand guide §08. Renaming to "Read the full LCS methodology" was an option but would introduce LCS at a point where parent comprehension may still be loading.

### F7 — Lexile 740 in session sample vs 620 → 820 in growth viz
**Decision:** keep. Internally consistent — 740 represents a hypothetical student mid-program; 620 → 820 is the per-cycle delta visualization. Tells a coherent story.

---

## Verification

- Content audit re-run: **0 parity gaps · 19 anti-dictionary hits** (unchanged baseline — all strategic ESL contrasts)
- `marketing.en :: program (143 strings) — 0 hits`
- `marketing.zh :: program (143 strings) — 0 hits`
- TypeScript syntax check on `program/page.jsx`: **clean**

---

## What's next on `/program`

Round 2 granular review (Q1–Q8) completed 2026-05-21. Outstanding items now tracked in `docs/workflow.md` Open Decisions:
- **#17** — verify FAQ pricing is current (Summit $2,830 · Core $2,250 · Flex 1 $1,185 · Flex 2 $2,110 · Flex 3 from $750). /faq is now the only public pricing surface.
- **#18** — port Type A/B caption to `/methodology` when that page is reviewed.

Next page in §12 priority order: **`/about`** — content dump staged in `03-about-content-dump.md`.
