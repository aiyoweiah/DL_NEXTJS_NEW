# Flex 3 rename + CAD currency — DRAFT, apply-gated

**Ruled 2026-09-05:** Flex 3 = **Coursework Advancement / 课业进阶自由航行** ·
prices are **CAD**. Drafted below; admin adjusts wording freely, then says
**"apply"**. Closes the §06 ⚠️ and half of D13 (the pricing-figures re-verification
against current combinations remains admin homework).

## Site copy

| # | File:line | Live | Proposed |
|---|---|---|---|
| 1 | `content/faq.js:95` (EN sessions) | "**Flex 3** is one or more GPA sessions per week and pairs with any of the others." | "**Flex 3** is one or more coursework-advancement sessions per week and pairs with any of the others." |
| 2 | `content/faq.js:160` (EN pricing) | "**Flex 3 (GPA管理自由航行) — from $750**: 1× GPA tutoring session per week — school academic management; pricing varies by subject." | "**Flex 3 (课业进阶自由航行) — from $750**: 1× coursework-advancement session per week — support that runs ahead of the classroom, not behind it; pricing varies by subject." **+ append to the answer:** " All prices are in CAD." |
| 3 | `content/faq.js:165` (EN payment) | "…**Summit from $177/week**. Flex 3 weekly rate varies by subject (typically from $47/week)." | unchanged name · **append:** " All rates are in CAD." |
| 4 | `content/faq.js:222` (ZH sessions) | "**Flex 3（GPA管理自由航行）** 每周一节或以上 GPA 课程，可与其他任何组合搭配。" | "**Flex 3（课业进阶自由航行）** 每周一节或以上课业进阶课程，可与其他任何组合搭配。" |
| 5 | `content/faq.js:287` (ZH pricing) | "**Flex 3（GPA管理自由航行）—— 起价 $750**：每周 1 节 GPA 辅导课——校内学业支持；具体费用因科目而异。" | "**Flex 3（课业进阶自由航行）—— 起价 $750**：每周 1 节课业进阶课程——走在课堂前面的学科支持；具体费用因科目而异。" **+ append:** "所有价格均为加元（CAD）。" |

## Reference surfaces (same apply)

- `translation/BRAND_CONTENT_GUIDE.md` — §06b row `:215` → "**Flex 3** — 课业进阶自由航行 · ≥ 1× coursework-advancement session / week · runs ahead of the classroom; pairs with any of the above"; ⚠️ box `:217–219` → resolved note (ruled 2026-09-05); §17 line `:601` → `Flex 3（课业进阶自由航行）`
- `translation/BRAND_CONTENT_GUIDE.zh.md` — `:201` row, `:203` ⚠️ box → resolved, `:498` vocab row
- `translation/dodo-glossary.json:51` → `"Flex 3": "Flex 3（课业进阶自由航行）"`
- `translation/DEEPSEEK_BRIEF.md:67` → same
- `docs/decision-index.md` D13 row → name ruled + CAD stated; figures re-verification stays open
- `docs/decision-log.md` → ruling entry

## Flags

1. "支持 support" appears in row 5's ZH ("走在课堂前面的学科支持") — deliberate:
   §10 strips 辅导 (tutoring), not 支持; the anti-remedial frame is carried by
   走在课堂前面 ("ahead of the classroom"). Strike it if you want zero support-family
   vocabulary.
2. The EN descriptor "support that runs ahead of the classroom, not behind it" is
   new voice — mirror of the ZH frame. Tighten freely.
3. Currency renders as plain sentences appended to the two price-bearing answers +
   the weekly-rates answer; no per-figure "CAD $" markers (noisier, and the guide
   has no convention for them). Say so if you want `CAD $750` inline instead.
