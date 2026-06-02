# Little DODO — program plan (page not yet built)

**Status:** Briefed 2026-06-02 (decision D32). Positioning recorded here; the marketing page
is a future build (Task 3, "eventually"). **Ground rule:** strictly follow
`.interface-design/system.md` (chrome, funnel ladder, CTA rules, color tokens) while showing
thoughtfulness to the K–2 audience. This doc is the brief; nothing is shipped.

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
6. **Close** — the page's single in-body CTA, then the global PreCtaBand (subject to Open Decision #19).

## Open IA / naming decisions (workflow.md #20)

- **Route:** `/little-dodo` vs `/program/little-dodo`. (Leaning `/little-dodo` as a peer marketing page.)
- **Nav relationship to "ELA Program":** current rule is **no dropdown** (flat 6). Options: keep flat
  and surface Little DODO from within the ELA Program page + footer; or branch the program page into
  two age bands. Do NOT add a navbar dropdown without revisiting the simplicity decision.
- **ZH program name:** TBD (brand-voice — e.g. 小小都学 / 都学启蒙, confirm before locking).
- **Age label:** "K–2" vs "ages 5–8" vs "pre-elementary" — pick one canonical phrasing.
- **Schema / sitemap / hreflang:** add EN+ZH routes, `Course`/program schema, sitemap + llms.txt entry.

## Definition of done (future)

EN + ZH copy in `content/marketing.{en,zh}.js` (new `littleDodo` export, matching the per-page
pattern); page under `app/[locale]/...`; chrome/funnel per `.interface-design/system.md`; nav/footer
+ sitemap + llms.txt updated; `next build` clean; decision promoted from D32 to shipped.
