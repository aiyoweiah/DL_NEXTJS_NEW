# Scaffold — `/coding/*` route plan + skeleton files

**Date:** 2026-06-09
**Status:** No live files edited. Apply on user trigger.
**Companion docs:** `01-PROPOSAL.md` (IA), `02-THEME.md` (tokens + three-verb display spec)
**Apply order:** This work happens AFTER `02-THEME.md` lands (`--ink` family + Pillars component) and BEFORE `04-COPY-PASS.md` (real copy replaces placeholders).

> 📌 **DIRECTION LOCKED (2026-06-09):** The `Loop.jsx` component is **dropped**. There is no four-phase graphic. The three-verb display (Read · Think · Write) is plain inline typography inside the page files — no dedicated component. The `Pillars.jsx` component stays. Content-key changes:
> - `loopPreview` → **`whatWeTeach`** (now holds the three-verb triplet + the critical-thinking heading)
> - `loop.phases` → **`whatWeTeach.machineVerbs`** (array of three: Read / Think / Write — each with a one-line role description)
> - New key: **`criticalThinking`** (eyebrow + H2 + body + override-condition examples)
> - Fourth-verb label `Decide` → **removed** (critical thinking is not a phase verb)
> Shape and props on `Pillars.jsx` are unaffected.

---

## In one paragraph

Six new page files under `app/[locale]/coding/` (home, about, methodology, program, faq, consult), **one new bilingual content module** (`content/coding.{en,zh}.js`), **one new component** (`Pillars`) scoped to `components/ui/coding/`, plus the CSS token additions from `02-THEME.md`. The three-verb display (Read · Think · Write) is plain inline typography inside the page files — no dedicated component. A separate inline section ("DODO Coding band") is added to the ELA home page (`app/[locale]/page.tsx`). Chrome touch-points are limited to footer column third item + PreCtaBand SUPPRESS list additions — `AgeBandChooser` is not renamed and does not gain a third card.

---

## File tree — what lands at apply

```
DL_NEXTJS_NEW/
├── app/[locale]/coding/
│   ├── page.jsx                          [NEW]  /coding home
│   ├── about/page.jsx                    [NEW]  /coding/about
│   ├── methodology/page.jsx              [NEW]  /coding/methodology
│   ├── program/page.jsx                  [NEW]  /coding/program
│   ├── faq/page.jsx                      [NEW]  /coding/faq
│   └── consult/page.jsx                  [NEW]  /coding/consult
│
├── app/[locale]/page.tsx                 [MODIFIED]  insert DODO Coding band between "Navigator is a map" and the closing call
│
├── content/
│   ├── coding.en.js                      [NEW]  EN copy for all 6 /coding pages + the home-page band
│   └── coding.zh.js                      [NEW]  ZH mirror
│
├── components/ui/coding/                 [NEW DIR]
│   └── Pillars.jsx                       [NEW]  Four-pillar grid (AI4K12, CMU, Huyen, mBot)
│
├── app/globals.css                       [MODIFIED]  add --ink family + .ink utility (per 02-THEME)
│
├── components/ui/AgeBandChooser.jsx      [UNCHANGED]  stays 2-card; PFP-owned, no rename
├── components/layout/Footer.jsx          [MODIFIED]  third item in Programs column (DODO Coding)
├── components/layout/Navbar.jsx          [UNCHANGED]  PFP already plural; we inherit
├── components/ui/PreCtaBand.jsx          [MODIFIED]  SUPPRESS list gains all 5 of the deep /coding routes (about/methodology/program/faq/consult; home keeps the soft band)
│
├── lib/schema.js                         [MODIFIED]  Course + EducationalOccupationalProgram for /coding/program
├── public/llms.txt                       [MODIFIED]  DODO Coding section
└── app/sitemap.js                        [MODIFIED]  6 new URLs
```

### What does NOT land in this scaffold step

- Real copy. Pages load **placeholder strings keyed by the marketing-guide section reference**, e.g. `t.home.hero.h1 = '[§8.1 Section 1 — H1]'`. The `04-COPY-PASS.md` step replaces these with real Copy blocks via the `dodo-content-writer` skill.
- The deferred routes (`/coding/navigators`, `/coding/results`, `/coding/demos`). Per `01-PROPOSAL.md` — these unlock against named cohort milestones, not a date.
- No SVG illustrations at scaffold step. The three-verb display is HTML + Tailwind utility classes; the pillar icons are simple monoline SVGs that can be authored inline in `Pillars.jsx` at apply time (or as a sibling `pillar-icons.jsx` if cleaner).
- mBot Neo / Makeblock logo. Per `02-THEME.md` open-decision #2, the optional pillar shows only on `/coding/program`.

---

## New file — `content/coding.en.js` (shape)

Mirrors the established `content/marketing.en.js` pattern: one named export per page, slice-imported by `page.jsx`. Lives as a **separate file from `marketing.en.js`** for three reasons:

1. Mirrors how `cities.js` and `faq.js` already live as separate bilingual content modules
2. Reduces git-conflict surface while `program-family-parallel` is mid-flight on `marketing.{en,zh}.js`
3. Makes the sister-track architecture visible in the file tree itself

Shape (keys only — values populated by `04-COPY-PASS.md`):

```javascript
// content/coding.en.js
//
// EN source for the four /coding launch pages.
// Sister-track to marketing.en.js. Lives separately so the DODO Coding
// surfaces can evolve without touching the ELA-program content module.
//
// Pages bundled here:
//   - home          /coding
//   - methodology   /coding/methodology
//   - program       /coding/program
//   - consult       /coding/consult
//
// Translation workflow (mirrors marketing.en.js → marketing.zh.js):
//   1. Hand THIS WHOLE FILE to DeepSeek along with the DODO Coding marketing
//      content guide and dodo-glossary.json (extend glossary with CMU CS Academy,
//      AI4K12, Huyen, Anthropic, Google Gemini, Toulmin first).
//   2. DeepSeek returns the same shape with translated string values.
//   3. Save as content/coding.zh.js.
//   4. Run forbidden-word screen (anti-dictionary §2.2) before commit.

export const home = {
  meta:   { title: '[hero tagline + brand promise — see 04-COPY-PASS]',     description: '[meta description per locked voice]' },
  hero:   { eyebrow: '[language-art positioning, e.g. "A language art."]',
            h1:      '[two-sentence H1: "We teach how AI reads, thinks, and writes. We teach your child to think critically about it." — final wording per 04-COPY-PASS]',
            subhead: '[grounding line — CMU CS Academy + AI4K12 + 1-on-1 Navigator + 16 weeks]',
            primaryCta:   { label: 'Book Your Consultation', href: '/coding/consult' },
            secondaryCta: { label: 'Talk to a Navigator',    href: '/coding/consult' /* demo deferred — see 01-PROPOSAL */ } },
  trustStrip: { items: ['AI4K12 Mastery Rubric', 'CMU CS Academy', 'Live Navigator-led sessions', 'Built with Claude and Google\'s working tools'] },
  stats:  null,  // omitted at launch per 01-PROPOSAL.md #3 — replaced by What-We-Teach + Pillars block after first cohort
  whoWeAre: { eyebrow: '...', heading: '...', body: '[§8.1 §3 body adapted to new voice]' },
  whatWeTeach: {
    eyebrow: '[What we teach]',
    heading: '[H2: "We teach how AI reads, thinks, and writes." — anchors the three-verb display]',
    machineVerbs: [
      { verb: 'Read',  role: '[How AI perceives — pixels, text, audio, sensor data become signals it can act on.]' },
      { verb: 'Think', role: '[How AI processes — search, logic, learning. Your child implements these algorithms themselves, not just calls libraries.]' },
      { verb: 'Write', role: '[How AI generates — from rule-based output to foundation-model language. Your child builds with Claude and Gemini and learns to verify every output.]' },
    ],
  },
  criticalThinking: {
    eyebrow: '[AND THE HUMAN DISCIPLINE THAT ANCHORS IT ALL]',
    heading: '[H2 in --ink-deep: "Critical thinking."]',
    body:    '[Throughout every session, your child learns to question what AI says, verify it, and decide when not to trust it. Grounded in AI4K12 Big Idea 5 (Societal Impact).]',
  },
  pillars: { eyebrow: '...', heading: '...', items: [/* 4 pillar objects — no mBot on home */] },
  howItWorks: {
    eyebrow: '...', heading: '[How it works H2 — see 04-COPY-PASS]',
    phases: [
      { label: 'Before We Begin',   body: '[AI4K12 baseline + CMU CS Academy placement]' },
      { label: 'During the Program', body: '[every session anchors the three machine verbs + critical thinking]' },
      { label: 'After 16 Weeks',    body: '[exit AI4K12 mastery rubric + CMU CS Academy progress report]' },
    ],
  },
  crossSell: { heading: '[verbal parallel to ELA — see 04-COPY-PASS]',
               body:    '[language-art framing one-liner]',
               cta:     { label: 'Explore DODO Learning ELA', href: '/program' } },
}

export const methodology = {
  meta: { title: '...', description: '...' },
  hero: { eyebrow: '[A language art for the AI age.]', h1: '...', subhead: '...' },
  whatWeTeach: {  // long-form version of the home triplet — one section per machine verb
    eyebrow: '[What we teach]', lead: '[lead paragraph framing the three verbs]',
    machineVerbs: [
      { num: '01', verb: 'Read',  blurb: '[long-form: how AI perceives + which AI4K12 Big Idea + which tools]' },
      { num: '02', verb: 'Think', blurb: '[long-form: how AI processes + which AI4K12 Big Idea + which tools]' },
      { num: '03', verb: 'Write', blurb: '[long-form: how AI generates + which AI4K12 Big Idea + which tools]' },
    ],
  },
  criticalThinking: {
    eyebrow: '[The human discipline]', heading: '[H2 in --ink-deep]', body: '[long-form: Toulmin, AI4K12 Big Idea 5, override conditions]',
  },
  openSource: { eyebrow: '...', heading: '[§4.6 H2]', body: '[§4.6 body]' },
  pillarsLong: { /* longer pillar cards with link-outs */ },
  closingCta: { /* btn-charter → /coding/consult */ },
}

export const program = {
  meta: { title: '...', description: '...' },
  hero: { eyebrow: '...', h1: '[§8.3 hero — "Sixteen weeks. Measurable. One Navigator. One student."]', subhead: '...' },
  included: { /* 5–6 bullets */ },
  progression: {
    eyebrow: '...', heading: '[16-week sequence]',
    weeks: [
      { range: 'Weeks 1–4',   focus: 'Read',  summary: '[machine perception focus]' },
      { range: 'Weeks 5–8',   focus: 'Think', summary: '[machine reasoning focus]' },
      { range: 'Weeks 9–12',  focus: 'Write', summary: '[machine generation focus]' },
      { range: 'Weeks 13–16', focus: 'Critical thinking + capstone', summary: '[the human-discipline capstone]' },
    ],
  },
  streams: {
    eyebrow: '...', heading: '[§8.3 stage-appropriate tracks]',
    items: [
      { name: 'Beginner',     grades: 'Grades 3–5',  body: '[curriculum §3 summary]' },
      { name: 'Intermediate', grades: 'Grades 6–9',  body: '[curriculum §4 summary]' },
      { name: 'Advanced',     grades: 'Grades 10–12', body: '[curriculum §5 summary]' },
    ],
  },
  tools: { /* CMU CS Academy IDE, Claude, Gemini, mBot optional */ },
  assessment: { /* week 0 / mid / 16 cadence */ },
  closingCta: { /* btn-charter → /coding/consult */ },
}

export const consult = {
  meta: { title: '...', description: '...' },
  hero: { eyebrow: '...', h1: '[§8.7 hero]', subhead: '...' },
  whatHappens: { /* 4 bullets per §8.7 */ },
  whatYouReceive: { /* the one-page AI4K12 summary */ },
  calendar: { /* placeholder for embed */ },
}

export const about = {
  meta: { title: '...', description: '...' },
  hero: { eyebrow: '...', h1: '[DODO Coding identity story — distinct from ELA about page]', subhead: '...' },
  whyWeExist:   { eyebrow: 'Why we exist', heading: '...', body: '[AI-era thesis: machine literacy as a language art]' },
  whatSetsUsApart: { eyebrow: 'What sets us apart', heading: '...', items: [/* Navigator model, open pillars, 1-on-1 promise */] },
  founderNote:  { eyebrow: 'A note from the founder', body: '...', signature: '[founder name + role]' },
  closingCta:   { /* btn-charter → /coding/consult */ },
}

export const faq = {
  meta: { title: '...', description: '...' },
  hero: { eyebrow: 'FAQ', h1: 'Questions families ask about DODO Coding', subhead: '' },
  categories: [
    { name: 'The Method',     items: [/* Q+A pairs */] },
    { name: 'The Curriculum', items: [/* Q+A pairs */] },
    { name: 'Logistics',      items: [/* Q+A pairs */] },
    { name: 'Pricing',        items: [/* Q+A pairs */] },
  ],
  closingCta: { /* btn-charter → /coding/consult, "More questions? Talk to a Navigator." */ },
}

// NEW: home-page band for the ELA home page
// Lives here (in coding.{en,zh}.js) — not in marketing.{en,zh}.js — because
// it's DODO Coding content even though it renders on the ELA home.
export const homeBand = {
  eyebrow: 'ALSO FROM DODO LEARNING',
  h2:      'DODO Coding',
  sub:     'A language art for the AI age.',
  body:    'We teach how AI reads, thinks, and writes. We teach your child to think critically about it.',
  cta:     { label: 'Visit DODO Coding', href: '/coding' },
  preview: { machineVerbs: ['Read', 'Think', 'Write'], humanDiscipline: 'Critical thinking' },
}
```

ZH mirror in `content/coding.zh.js` — same shape, ZH strings, brand-voice translation per `dodo-content-writer` skill workflow.

### Note on the secondary CTA on `/coding` home

The marketing guide §8.1 Section 1 lists:
- Primary CTA: Book Your Consultation
- Secondary CTA: Watch Demo Class

But per `01-PROPOSAL.md`, the demo class is **deferred** until a real recording exists. The secondary CTA at launch routes to `/coding/consult` with copy clarifying "demo class scheduled live with a Navigator during your consultation." This is the honest version of the soft-close at launch. When `/coding/demos` ships, the secondary CTA switches to `/coding/demos`. One-line content edit at that point.

---

## New components

### The three-verb display — NO dedicated component

Inline typography inside each page file that renders it (`/coding`, `/coding/methodology`). Approximate markup:

```jsx
{/* The "What we teach" block — inline, no dedicated component */}
<div className="space-y-6">
  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#7c79e8' }}>
    {t.whatWeTeach.eyebrow}
  </p>
  <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: '#0E0E12' }}>
    {t.whatWeTeach.heading}
  </h2>

  {/* Three-verb triplet — body-text color, no arrows, no fourth verb */}
  <div className="flex gap-8 md:gap-12">
    {t.whatWeTeach.machineVerbs.map((v) => (
      <div key={v.verb}>
        <p className="text-xl font-semibold border-b border-current pb-1 inline-block"
           style={{ color: '#3D4452' }}>
          {v.verb}
        </p>
        <p className="text-sm mt-3" style={{ color: '#3D4452' }}>{v.role}</p>
      </div>
    ))}
  </div>

  {/* Critical thinking block — eyebrow + ink-deep heading + body + ink underline rule */}
  <div className="mt-12">
    <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--ink)' }}>
      {t.criticalThinking.eyebrow}
    </p>
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
        style={{ color: 'var(--ink-deep)' }}>
      {t.criticalThinking.heading}
    </h2>
    <p className="text-base leading-relaxed" style={{ color: '#3D4452' }}>
      {t.criticalThinking.body}
    </p>
    <div className="h-0.5 w-12 mt-6" style={{ backgroundColor: 'var(--ink)' }} aria-hidden="true" />
  </div>
</div>
```

The decision not to extract this into a component is deliberate: one consumer per page, content shape is page-specific, and a component would invite an unnecessary props API. At apply time, the home and methodology pages each get their own variant of this block tuned to that page's voice.

### `components/ui/coding/Pillars.jsx`

Server component. Four-up grid with the monoline icon set + ink tick.

```jsx
// components/ui/coding/Pillars.jsx
//
// The four open-source pillars grid. Each pillar = monoline glyph
// + name + one-line role + a 2px --ink tick that marks "we cite this source."
//
// Per .design/dodo-coding-launch/02-THEME.md:
//   - Icon body uses body-text color (no special accent)
//   - Tick uses --ink (light) / --ink-bright (dark)
//   - mBot pillar shows ONLY on /coding/program (optional)
//
// Props:
//   surface: 'light' | 'dark' | 'tinted'
//   items:   [{ glyph, name, role, citationUrl }, ...]
//   showOptional: boolean — gates the mBot pillar
//
// Logos: text + monoline glyph only until logo licensing cleared
// (marketing guide §11.2, §12 item 6).

export default function Pillars({ surface = 'light', items, showOptional = false }) {
  // Implementation per 02-THEME.md pillar-icons spec.
}
```

Both components live under `components/ui/coding/` (new subdirectory). This isolates them so the rest of the site cannot accidentally import them — they belong to the sister track and stay there until a deliberate "promote to shared" decision.

---

## Per-route skeleton

Each page follows the established pattern visible in `app/[locale]/methodology/page.jsx`:

- Server component, zero `'use client'`
- Imports its slice from `content/coding.{en,zh}.js`
- `generateStaticParams()` and `generateMetadata()` use the canonical helpers (`localeParams`, `buildMetadata`, `isValidLocale`)
- JSON-LD `<script>` blocks inject schema where appropriate (`/coding`, `/coding/program`)
- Sections use `SectionWrapper` — never raw `<section className="py-*">` (v6.2 rule)
- Buttons use the canonical button classes (`btn-charter` / `btn-primary` / `btn-ghost` / `btn-outline`) — surface-specific per system.md

### `app/[locale]/coding/page.jsx` — `/coding` home

```jsx
// app/[locale]/coding/page.jsx
//
// DODO Coding home page. Positioned as a language art for the AI age.
// Hero leads with H1 + subhead + twin CTAs. Stats omitted at launch
// (01-PROPOSAL.md open-decision #3 — replaced by What-We-Teach + Pillars block).
//
// Sections (per 02-THEME.md surface sequence):
//   1. Hero                 — dark canvas (#0E0E12), H1 + subhead + twin CTAs
//   2. Who We Are           — light (#F5F5FF)
//   3. What We Teach        — tinted (#EAEAF8), three-verb display + critical-thinking block
//   4. The Four Pillars     — light, Pillars component (no mBot — that's /program)
//   5. How It Works         — tinted, 3-phase before/during/after
//   6. Cross-sell to ELA    — light, secondary outline CTA to /program
//   [PreCtaBand visible — page does NOT own a close, leads soft per system.md]

import Link         from 'next/link'
import { notFound } from 'next/navigation'
import { home as copyEn } from '@/content/coding.en'
import { home as copyZh } from '@/content/coding.zh'
import { isValidLocale, localeParams } from '@/lib/i18n'
import { buildMetadata } from '@/lib/metadata'

import SectionWrapper from '@/components/ui/SectionWrapper'
import Button         from '@/components/ui/Button'
import Pillars        from '@/components/ui/coding/Pillars'

export function generateStaticParams() { return localeParams() }

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = locale === 'zh' ? copyZh : copyEn
  return buildMetadata({ locale, path: '/coding', title: t.meta.title, description: t.meta.description })
}

export default async function CodingHomePage({ params }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const t = locale === 'zh' ? copyZh : copyEn

  return (
    <>
      {/* TODO: schema.js codingHomeSchema() — landed in W5 */}

      {/* 1. Hero (dark) — H1 + subhead + twin CTAs + trust strip */}
      <SectionWrapper dark aria-labelledby="coding-hero-h1">
        {/* hero column with eyebrow, H1, subhead, twin CTAs */}
        {/* trust strip internal mt-12 */}
      </SectionWrapper>

      {/* 2. Who We Are (light) */}
      <SectionWrapper white> {/* body copy + meet-the-navigators inline CTA → /navigators */} </SectionWrapper>

      {/* 3. What We Teach (tinted) — three-verb display + critical-thinking block (inline, see "New components" §) */}
      <SectionWrapper tinted>
        {/* eyebrow + H2 + three machine verbs (Read · Think · Write) + critical-thinking block in --ink */}
        {/* CTA: Read the full curriculum → /coding/methodology */}
      </SectionWrapper>

      {/* 4. The Four Pillars (light) */}
      <SectionWrapper white> <Pillars surface="light" items={t.pillars.items} /> </SectionWrapper>

      {/* 5. How It Works (tinted) — 3 phases */}
      <SectionWrapper tinted> {/* before / during / after */} </SectionWrapper>

      {/* 6. Cross-sell to ELA (light) */}
      <SectionWrapper white> {/* verbal parallel; secondary outline CTA → /program */} </SectionWrapper>

      {/* PreCtaBand will auto-render via layout; NOT in SUPPRESS list */}
    </>
  )
}
```

### `app/[locale]/coding/methodology/page.jsx`

Mirrors `app/[locale]/methodology/page.jsx`. Sections per `02-THEME.md`:

```
Hero (dark)                — "A language art for the AI age." H1 + subhead
What we teach (light)      — three machine verbs (long-form, one section per verb,
                              alternating tint between verbs to honor v6.2)
Critical thinking (tinted) — eyebrow + H2 in --ink-deep + Toulmin/Big Idea 5 long-form
The grounding (light)      — AI4K12 + CMU CS Academy long-form, citation language
Open-source matters (tinted) — §4.6 copy block
The Four Pillars (light)   — Pillars component, full set incl. mBot
Closing CTA (tinted)       — btn-charter → /coding/consult
```

Add `/coding/methodology` to `PreCtaBand` SUPPRESS list.

### `app/[locale]/coding/program/page.jsx`

```
Hero (dark)               — §8.3 hero
What's included (light)
The progression (tinted)  — 16-week sequence visualization (week-by-week phase chart,
                            NOT a four-verb graphic — tied to curriculum doc §1.4)
Three streams (light)     — Beginner / Intermediate / Advanced cards
Tools your child uses (tinted) — Pillars component with mBot pillar visible
Assessment & reporting (light) — week 0 / 8 / 16 cadence, parent-report description
Closing CTA (dark band)   — btn-charter → /coding/consult
```

JSON-LD: `Course` + `EducationalOccupationalProgram` schemas (W5).
Add `/coding/program` to `PreCtaBand` SUPPRESS list.

### `app/[locale]/coding/consult/page.jsx`

Mirrors `app/[locale]/consult/page.jsx`. Hero, what-happens, what-you-receive, calendar embed placeholder. First-person CTA exception applies — `Book My Consultation` / 预约我的咨询 per system.md.

Add `/coding/consult` to `PreCtaBand` SUPPRESS list.

---

## CSS additions (`app/globals.css`)

Per `02-THEME.md` Apply order:

```css
:root {
  /* ... existing tokens ... */

  /* DODO Coding — sister-track ink accent (per .design/dodo-coding-launch/02-THEME.md) */
  --ink:        #1F4E8C;  /* AA-safe on light surfaces */
  --ink-bright: #7AA8E0;  /* AA-safe on dark surfaces */
  --ink-deep:   #143D6E;  /* heaviest typographic instance per page — the "critical thinking" H2 */
}

.ink { color: var(--ink); }
/* .ink-bright and .ink-deep usually applied via inline style for surface-aware components */
```

No new button classes, no new section background classes, no new shadow tokens — `02-THEME.md` explicitly forbids extending.

---

## Chrome touch-points (apply AFTER `program-family-parallel` ships under Proposal A)

These land in a separate apply window after `program-family-parallel` has shipped. The chooser-rename and third-card edits are retired; the touch list is materially smaller than the original draft.

| File | Change |
|---|---|
| `components/ui/AgeBandChooser.jsx` | **Unchanged.** PFP owns this; `/coding` launch does not touch it. |
| `components/layout/Footer.jsx` | Add 3rd Programs column item: `"DODO Coding (Grade 3+)" → /coding` (+ ZH mirror) |
| `components/layout/Navbar.jsx` | **Unchanged.** PFP already pluralized to "Programs"; we inherit. |
| `components/ui/PreCtaBand.jsx` | Append `/coding/about`, `/coding/methodology`, `/coding/program`, `/coding/faq`, `/coding/consult` to SUPPRESS list (5 routes; `/coding` home does NOT go in SUPPRESS — it leads soft) |
| `app/[locale]/page.tsx` | Insert the DODO Coding band between "Navigator is a map" and the closing call (spec in `02-THEME.md` §"DODO Coding band on ELA `/`") |
| `lib/schema.js` | Add `codingCourseSchema()`, `codingProgramSchema()` for `/coding/program`; extend Organization schema with DODO Coding offer-catalog entry |
| `public/llms.txt` | Append DODO Coding section after PFP's umbrella + ELA + Little DODO sections |
| `app/sitemap.js` | 6 new URLs (the launch routes); priorities match ELA equivalents |

---

## Build verification protocol (before any apply locks)

Per project CLAUDE.md and the canonical system:

1. `npx next build` — must complete clean. Catches missing imports, route conflicts, schema errors.
2. `npx eslint app/[locale]/coding/ components/ui/coding/ content/coding.en.js content/coding.zh.js` — `next lint` is broken in this Next version (per system.md), use eslint directly.
3. Both `content/coding.en.js` and `content/coding.zh.js` must `require()`-parse without error before commit.
4. Manual: render each of the 4 routes in dev, squint-test against the ELA equivalent for chrome consistency.

---

## Apply order (when triggered)

The full apply order for this workstream (combining theme + scaffold + content + chrome):

1. **Theme** — CSS variables land in `globals.css` (from `02-THEME.md`)
2. **Scaffold** — content modules, components, page files land with placeholder copy
3. `npx next build` — verify clean compile against placeholders
4. **Copy pass** — `dodo-content-writer` skill replaces placeholders one page at a time, starting with `/coding` home (from `04-COPY-PASS.md`)
5. `npx next build` — verify after each page's copy lands
6. **Chrome** — coordinated apply with `program-family-parallel` (ProgramChooser rename, Footer item, Navbar plural, PreCtaBand SUPPRESS list)
7. **Schema + llms.txt + sitemap** (from W5)
8. `npx next build` — final
9. Manual QA — render all 4 routes EN + ZH, squint-test against ELA equivalents

---

## Open scaffold decisions

| # | Decision | Recommendation | Notes |
|---|---|---|---|
| 1 | Single `content/coding.{en,zh}.js` vs. one file per page | Single file per locale | Mirrors `marketing.{en,zh}.js`; simpler translation workflow |
| 2 | Component path: `components/ui/coding/*` vs. `components/coding/*` | `components/ui/coding/*` | Mirrors existing `components/ui/*` convention |
| 3 | Secondary CTA on home at launch — route to `/coding/consult` or hide entirely | Route to `/coding/consult` with clarifying copy | Honest soft-close; flip to `/coding/demos` when demo recording exists |
| 4 | mBot pillar visibility — only `/coding/program` or also `/coding/methodology`? | `/coding/program` only | Methodology stays focused on the four core pillars; mBot is the optional extension |
| 5 | Pillar-icons file location — inline in `Pillars.jsx` or sibling `pillar-icons.jsx` | Start inline; refactor only if Pillars.jsx exceeds ~200 lines | Avoid premature splitting |

---

*End of 03-SCAFFOLD.md. Next: `04-COPY-PASS.md` — `dodo-content-writer` skill on the homepage Copy blocks.*
