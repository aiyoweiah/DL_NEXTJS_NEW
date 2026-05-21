# Ops tools — internal PDF generators

`/ops/*` is the internal tools section of the marketing site. Lives at
`dodolearning.com/ops/`, gated by a client-side PIN. Not in sitemap,
`robots: noIndex` on every page. Tools are English-only and operate
entirely in the browser — no server, no API routes, no backend.

Three tools live here today:

| Route | Tool | Version | Purpose |
|---|---|---|---|
| `/ops/assessment` | Student Baseline Assessment Report | v3.4.1 | 5-page report from a baseline evaluation — Lit/Lit, Speaking/Discussion, Craft/Writing pillars with Lexile + module recommendations |
| `/ops/onboarding` | Student Enrollment Welcome Packet | v2.8 | 4-page enrollment packet — welcome letter, student info + QR codes, curriculum overview + Navigator intro, terms |
| `/ops/teacher-agreement` | Teacher Service Agreement | v1.4.1 | 4-page contractor agreement — welcome letter, Schedule A + Schedule B (sections 1–9), execution page with cursive DODO Learning signature and fillable Teacher AcroForm fields |

---

## The recipe (shared by all three tools)

```
form state ──► hidden off-screen <div id="pdf-…"> per page (794×1123 px = A4 @ 96dpi)
                       │
                       ▼
               html2canvas (scale 2)
                       │
                       ▼
              jsPDF .addImage as JPEG q=0.94 on A4 mm canvas
                       │
                       ▼
                   pdf.save(filename)
```

- One hidden div per output page, all kept in the DOM at all times so
  `html2canvas` can capture them on demand.
- Brand chrome (`PDFHeader`, `PDFFooter`) is repeated in each template.
- Brand colors and fonts are duplicated inline at the top of each tool
  (intentional — keeps each tool self-contained).

### Fillable form fields (teacher-agreement only)

After all raster pages are placed, the agreement tool overlays
`AcroFormTextField` widgets on the last page over the Teacher signature
lines. Coordinates come from `getBoundingClientRect` on placeholder
divs with known IDs (`tsa-field-sig`, `tsa-field-name`, etc.) → converted
px → mm. Teacher opens the saved PDF in Adobe Reader / macOS Preview /
browser PDF viewer and fills the fields with Fill & Sign.

```js
import { jsPDF, AcroFormTextField } from 'jspdf'
// (in v4 these are named ESM exports — `new jsPDF.AcroFormTextField()`
// is the v2/v3 idiom and will throw "not a constructor")
```

### Performance pattern (now applied to all three tools)

The typing-lag fix has three parts; together they prevent the form
from re-rendering all hidden PDF templates on every keystroke.

- **Each `PDFPageN` wrapped in `React.memo`** with a per-page
  comparator that checks only the keys *that page* renders. Static
  pages use `() => true` and never re-render after first mount.
- **`Field` component lives at module scope** (not nested in the form
  component) so React keeps stable component identity → `<input>`
  doesn't remount on every keystroke. *Only `AgreementTool` has a
  `Field` wrapper; the others use inline inputs.*
- **`onChange` handlers built once in `useMemo`** so each input
  receives a stable function reference. *Same scope — only relevant
  where `Field` is a wrapper.*

Current coverage:

| Tool | React.memo on all pages | Field at module scope | Stable onChange |
|---|---|---|---|
| `AgreementTool` | ✅ | ✅ | ✅ |
| `OnboardingTool` | ✅ (v2.8) | n/a (inline inputs) | n/a |
| `AssessmentTool` | ✅ (v3.2.0) | n/a (inline inputs) | n/a |

`OnboardingTool` and `AssessmentTool` use inline `<input onChange={…}>`
nodes rather than wrapped `Field` components, so the `Field` /
`useMemo handlers` parts don't apply — React just re-attaches the
listener on every render, which doesn't cause cursor lag the way a
component remount does. The `React.memo` pattern is what matters for
those two.

### Design rule — white surfaces, color as accent only

Established on `AssessmentTool` after a multi-version iteration loop
(v3.2.1 → v3.4.1) chasing readability bugs on tinted-on-tinted
backgrounds. The rule is:

> Surfaces are white. Color carries identity only through:
> - **Header strips** at section boundaries (pillar / curriculum card headers)
> - **Thin colored borders or left-edge accent stripes** on data cards
> - **Colored text** for tier identity on data points (no chip frames around the text)
> - **Small colored swatches** beside section labels

**Why this rule exists.** The original design used
`pillar.lightColor` (a light tint) as the background of any card body
or row containing `pillar.color` text (the same family, e.g. lavender
text on light-lavender body). This blended badly: text contrast was
fine on the Writing pillar (dark midnight on light blue-gray) but
nearly invisible on Literacy and Speaking. Every "this looks wrong"
report on the assessment tool eventually traced back to that one
pattern. Three rounds of patching (v3.2.1 lineHeight, v3.2.2 dot
nudge, v3.2.3 flex centering) failed to fix individual cases because
they didn't touch the root cause. v3.4.0 swept all `pillar.lightColor`
surfaces to white; v3.4.1 dropped the colored chip frame around rating
text since color alone is the identity carrier.

**If you add a new ops tool or extend an existing one,** don't
introduce `pillar.lightColor` / `item.lightColor` as a background
where colored text or chips will sit on top. Keep surfaces white and
let colored borders / strips / text do the identifying.

### Legal-writing pass (teacher-agreement, v1.4)

The teacher-agreement was rewritten in v1.4 to use canonical legal
phrasing while keeping the plain-English voice. Patterns adopted:

- "**represent and warrant**" instead of "confirm" for factual
  attestations (Sections 4, 7) — the legal term of art
- "**indemnify and hold harmless**" for IP claims (Section 4)
- "**perpetual, royalty-free**" license language (Section 4)
- "**material breach**" + "**including but not limited to**" for the
  termination-for-breach clause (Section 5) — gives flexibility
- "**represent and warrant**" + an explicit **ongoing duty to
  disclose** added to the Safety section (7) so mid-term changes in
  status are surfaced
- Standard general-provisions block in Section 9: Severability,
  Entire Agreement, Governing Law (Ontario), Assignment, Survival
- "**had the opportunity to obtain independent legal advice**" in
  Section 10 — standard contract-execution protection

If the contract is rewritten again, retain these canonical phrases.
Don't paraphrase "indemnify and hold harmless" or "represent and
warrant" — they carry specific legal meaning courts recognize.

**Page allocation (v1.4.1, after a legal-pass reflow):**

- Page 1: Welcome letter
- Page 2: Preamble + Schedule A + Sections 1, 2, 3
- Page 3: Sections 4, 5, 6, 7, 8
- Page 4: Section 9 + Section 10 + Notes (if present) + signature block

### Layout gotcha — flex centering needs room to center

Hit on AssessmentTool's Summary cards (v3.2.3 attempt → v3.2.4 actual
fix). Wrapping a flex container in `flex: 1` + `justifyContent: center`
does nothing if the container has no extra space to expand into.

In a CSS Grid where all items have identical content, **the grid does
not stretch them** — they all naturally match the tallest, which equals
their own height. A child set to `flex: 1` then has zero extra vertical
space to grow into, and `justifyContent: center` has nothing to center
within.

**Fix:** force the container taller than its natural content via
`minHeight` (or a fixed height). Then the flex centering has real room
to act.

### Layout gotcha — `lineHeight: 1` on a chip with background

Hit on AssessmentTool's rating pill (v3.2.1 → v3.2.2 revert). Setting
`lineHeight: 1` collapses the text's line-box to the font-size, but
rendered glyphs (descenders on g/p/y, ascenders on capitals) extend
*beyond* that line-box. When the container has a background color, the
background fits the line-box and the text appears to dangle outside
the chip.

**Rule:** never set `lineHeight: 1` on an element whose background
paints around text. To better center a sibling icon/dot with text
glyphs, adjust the *icon* (`marginTop`) instead of the text's line-box.

### Layout gotcha — flex column shrinking text children

The v2.7 fix on `/ops/onboarding` page 1 turned up a subtle trap. The
welcome page body was wrapped in `display: flex; flexDirection: column`,
and **text-only flex children weren't stretching to container width**.
Header (block div) and card-shaped children with their own background
+ padding stretched fine, but bare `<div>...text...</div>` children
collapsed to roughly content-width. Result: text wrapped at ~half the
page width with nothing on the right side.

**Rule of thumb:** if a page template uses nested flex column wrappers,
either (a) make every child a block with its own background/padding, or
(b) add explicit `width: '100%'` to text-only children. The cleanest
fix is dropping the inner flex column entirely and using a plain block
wrapper — the outer page div can stay flex column for header/body/footer
stacking.

---

## File map

```
app/ops/
├── layout.jsx                       ← wraps every /ops route in <OpsGate>
├── page.jsx                         ← tool tile index
├── assessment/page.jsx              ← server stub → AssessmentLoader
├── onboarding/page.jsx              ← server stub → OnboardingLoader
└── teacher-agreement/page.jsx       ← server stub → AgreementLoader

components/ops/
├── OpsGate.jsx                      ← client-side PIN gate (localStorage)
├── opsAssets.js                     ← base64 LOGO_B64, SIGNATURE_B64, CLASSIN_LOGO_B64
├── AssessmentLoader.jsx             ← next/dynamic ssr:false wrappers
├── AssessmentTool.jsx               ← the heavy form + hidden templates + generate
├── OnboardingLoader.jsx
├── OnboardingTool.jsx
├── AgreementLoader.jsx
└── AgreementTool.jsx
```

**Why the loader indirection.** Next 16 forbids `next/dynamic` with
`ssr: false` in Server Components. The server `page.jsx` renders a
client `XxxLoader` which performs the dynamic import. Without this
split, the build errors on `output: 'export'`.

---

## Conventions for a new ops tool

1. Pick a route under `/ops/<slug>` and create a server `page.jsx` that
   sets `metadata.robots: { index: false, follow: false }` and renders
   the loader. **Do not** add the route to the sitemap.
2. Add a `<XxxLoader>` client component that `next/dynamic`-imports the
   real tool with `ssr: false`.
3. Build the tool in `components/ops/XxxTool.jsx`. Match the existing
   shape: form state → hidden 794×1123 divs → `html2canvas` →
   `jsPDF.addImage` loop → `pdf.save()`.
4. Brand fonts: `DM Sans` + `Noto Sans SC` from Google Fonts, loaded
   via a `<link>` injected in a `useEffect`. Gate the Generate button
   on `document.fonts.ready`.
5. Logos and Janet's signature image are in `components/ops/opsAssets.js`
   as base64 strings — import what you need, don't re-encode.
6. Add a tile to `app/ops/page.jsx` (`TOOLS` array) with `version` and
   a one-line desc.
7. If the tool has heavy hidden templates and inputs that feel laggy,
   apply the `React.memo` + module-scope `Field` pattern from
   `AgreementTool.jsx`. Tests for slowness: type rapidly in a form
   field — characters should appear instantly with no cursor stutter.
8. **Visual design rule:** white surfaces only. Color via header
   strips, thin borders, and colored text — never colored
   backgrounds behind colored text (see "Design rule" section
   above for the full reasoning). Module/data cards: white bg with
   pillar-colored left accent stripe (`borderLeft: 3px solid …`).
   Rating chips: plain colored text, no frame around it.
9. **Brand-name copy:** Use "DODO Learning" everywhere in contract /
   document body text — not "DODO" alone, not "the Company". This
   was hashed out across the agreement-tool versions; matters for
   consistency across all three tools.
10. **Section / page break planning:** for multi-section legal-style
    docs, plan section-to-page allocation explicitly. The teacher-
    agreement tool reorganized twice as content grew (v1.0 / v1.4.1).
    Cleanest pattern: each `<Section />` lives inside a specific
    page template; if you have N sections and 4 pages, decide
    which sections go on which page rather than letting them flow.

---

## Operational notes

- **PIN gate is social, not cryptographic.** It prevents accidental
  discovery, not a determined adversary. PIN is in source
  (`OpsGate.jsx` constant `CORRECT_PIN`). Storage key:
  `dodo_ops_unlocked`.
- **No server runtime.** Static export, no API routes. Everything
  happens in the browser — including PDF generation. There is nothing
  to "deploy" beyond the Cloudflare Pages build.
- **PDFs are saved locally.** They never leave the user's machine. If
  we ever need delivery (email, R2 upload), that requires a Worker or
  external service — `output: 'export'` cannot host an API route.
- **Filename convention:** `Dodo<Tool>_<SafeName>_<ISO date>.pdf`
  (spaces collapsed to underscores). Keeps the saved files
  organisable by tool and student/teacher name.
