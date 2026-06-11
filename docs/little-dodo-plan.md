# Little DODO — program plan (page not yet built)

**Status:** ✅ **SHIPPED 2026-06-02** (decision D32 → built). Page at `app/[locale]/little-dodo/`,
`littleDodo` + `ageBands` exports (EN+ZH), shared `components/ui/AgeBandChooser.jsx`, footer link,
PreCtaBand SUPPRESS, sitemap + llms.txt + `littleDodoCourseSchema()`. This doc remains the brief +
record of the IA/naming decisions below. **Ground rule (followed):** strictly follow
`.interface-design/system.md` while showing thoughtfulness to the K–2 audience.

> **2026-06-11 ADDENDUM — substance correction from admin (cohesion pass apply).** The
> "Shared vs. different" table below originally said **Navigators: Shared / similar (same Navigator
> model)**. This was wrong. Admin clarified that Little DODO is staffed by a **dedicated
> team of early-childhood educators specializing in phonetics, fluency, and pronunciation** —
> NOT the same humans as ELA Program Navigators. Program substance is also more specific
> than "comprehension first": it is **phonetics-led decoding, vocabulary and fluency built book by
> book, and the love of reading as the gate to comprehension**. Two specialist teams under one
> Navigator philosophy; same live one-on-one delivery model. The corrected staffing claim now
> appears across `marketing.{en,zh}.js` (`littleDodo.shared`, AgeBandChooser blurb, compare K-2
> audience + k2Note, navigators.k2Note), `content/faq.js` Little DODO Q+A, `public/llms.txt`,
> `public/llms-full.txt` §"Who Navigators are" (rewritten into two specialist-team profiles), and
> `lib/schema.js` Course description. Full apply log at
> `.design/little-dodo-cohesion-pass/03-APPLY.md`. The table row below is **superseded** but kept
> as decision history; treat the addendum as canonical.

---

## What it is

**Little DODO** is an extension of the ELA Program: a **K–2 / pre-elementary** ELA program —
**high-frequency, low-pressure reading and comprehension** for pre-elementary starters. It is a
sibling/age-band of the main 16-Week Program, not a separate brand.

## Shared vs. different (the core framing)

| Dimension | Relationship to main ELA Program |
|---|---|
| Tuition | **Shared / similar** |
| Environment | **Shared / similar** |
| Frequency | **Shared / similar** (note: "high-frequency" is also the pedagogical emphasis) |
| Navigators | **Shared / similar** (same Navigator model) |
| Operational pillars | **Shared** — it runs on the same machinery |
| **Marketing & packaging emphasis** | **Different** |
| **Target audience** | **Different** — parents of K–2 children |

So: operationally a sibling, **rhetorically a distinct page**. Reuse the proof/operations facts;
re-pitch the value for a different parent and a much younger child.

## Audience & emphasis shift

- **Main program (older students, ~Gr 4–12):** cognitive rigour — read complexity, argue with
  evidence, write with intention, Lexile growth, 6+1 Trait writing, academic register.
- **Little DODO (K–2):** **foundational literacy** — building the *habit* and *joy* of reading,
  early comprehension, confidence, low pressure. The register is warmer and more reassuring; it
  should NOT inherit the main program's "highest cognitive level / argue with evidence" language.
  Parents of 5–8-year-olds are choosing a gentle, consistent start — not a performance program.

**Voice guardrails (provisional — confirm via `dodo-content-writer` + brand guide before drafting):**
- Lead with *habit, comfort, curiosity, confidence*; de-emphasize testing/scores/rigour.
- "Low-pressure" and "high-frequency" are the signature pairing — frequent, light, sustainable.
- Keep DODO's credibility (live, Navigator-led) but in a lower-stakes key.
- Still passes the anti-dictionary (§10) and ZH voice rules (no combat metaphors, 导师（Navigator）, etc.).

## Page plan (when built — follow `.interface-design/system.md`)

Same chrome, tokens, and funnel ladder as the rest of the site. Funnel applies unchanged:
**Watch a Demo Class = soft close; Book Your Consultation = firm close; one conversion moment per page.**

Provisional section spine (mirrors the established page rhythm, re-pitched for K–2):
1. **Hero** — warm, K–2 register. Soft-close primary CTA: **Watch a Demo Class**; secondary: Book Your Consultation.
2. **The problem / reassurance** — the early-reading worry a K–2 parent actually has.
3. **How Little DODO works** — high-frequency, low-pressure rhythm; the Navigator relationship at this age.
4. **Shared credibility** — reuse the live/Navigator-led proof, age-appropriately (NOT Lexile-heavy).
5. **Fit / who it's for** — K–2 starters; honest fit.
6. **Close** — the page itself owns its in-body close, so `/little-dodo` is added to the
   `PreCtaBand` SUPPRESS list (one conversion moment per page, per D33).

## IA / naming — DECIDED 2026-06-02 (one item still open)

- **Route:** ✅ **`/little-dodo`** (top-level marketing page). Hierarchy is expressed via links
  (the `/program` hub + footer), not URL nesting — better for direct links from ads / Xiaohongshu and SEO.
- **Nav relationship:** ✅ **Option I — flat nav unchanged** (no 7th item, no dropdown; honours the
  simplicity decision). **`/program` becomes the program-family hub:** an age-band chooser near the top
  branches to **Little DODO (K–2)** and **The 16-Week Program (Gr 4+)**; the footer Program column adds a
  Little DODO link. The "ELA Program" nav label therefore must read as the *family* entry — so `/program`
  has to present both bands up top, not just the older-kid program.
- **EN / ZH name:** ✅ EN **Little DODO** / ZH **都学启蒙** (transcreation — ZH conveys the early-learning
  stage 启蒙, not literal "little"). Run final strings through the `dodo-content-writer` lint before locking.
  **Caution:** the ZH name already contains 启蒙 — do NOT pair it with a 启蒙-redundant descriptor; use a
  reading-comprehension / 高频低压 framing for the supporting line instead.
- **Age label:** ✅ **EN "Ages 5–8"** (canonical — no curriculum assumption; clearest for
  globally-mobile / ESL parents). **ZH "5–8 岁"**; 幼小衔接 available as supporting framing where it
  fits naturally. Used in the `/program` age-band chooser, H1, meta, schema.
- **Schema / sitemap / hreflang:** add EN+ZH `/little-dodo` routes, `Course`/program schema, sitemap +
  `llms.txt` entry (at build).

## Definition of done (future)

EN + ZH copy in `content/marketing.{en,zh}.js` (new `littleDodo` export, matching the per-page
pattern); page at `app/[locale]/little-dodo/`; chrome/funnel per `.interface-design/system.md`;
**add `/little-dodo` to the `PreCtaBand` SUPPRESS list**; build the age-band chooser on `/program`
+ add the footer Program-column link; sitemap + llms.txt + `Course` schema (EN+ZH); `next build`
clean; decision promoted from D32 to shipped.
