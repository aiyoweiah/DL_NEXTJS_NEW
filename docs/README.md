# docs/

Internal documentation. Not deployed (not in `public/`, not served).

## Contents

- **[SUCCESSOR_HANDOFF.md](SUCCESSOR_HANDOFF.md)** — One-page entry point for anyone picking up the project cold: current state, reading order, operational facts. **Read this first.** (Full session history: `_archive/successor-handoff-2026-09-02.md`.)
- **[decision-index.md](decision-index.md)** — **Status for every numbered decision (D1–D96)**, with the guard that enforces each one. Live / Superseded / Amended / Fulfilled / Open. **Check this before assuming any decision is still current** — the logs record what was *decided*, this records what is still *true*.
- **[decision-log.md](decision-log.md)** — **The single append-only log for new decisions (D97+)**, content and interface alike. The historical logs are closed: `content-style-decisions.md` (D1–D50, D91–D96) and `_archive/interface-system-v6.44.md` (the D33–D90 interface narratives).
- **[completion-plan.md](completion-plan.md)** — **The one work queue**, ordered by what unblocks what. Waves 0–3 and 5 are closed, Wave 4 is measured; **Wave 6 (admin unblocks) is the critical path.** Start here when picking up work.
- **[architecture-cohesion-proposal.md](architecture-cohesion-proposal.md)** — Why this codebase kept shipping false completeness claims, and the guards built to stop it. **Read before starting a sweep of anything.** Also carries the measurement traps (§4) — each one produced a wrong number in practice.
- **[content-style-decisions.md](content-style-decisions.md)** — Append-only log of voice / vocabulary / positioning decisions (D1–D50, D91–D96). **Closed at D96** — new decisions go to `decision-log.md`. Status lives in `decision-index.md`, not here.
- **[customer-site-cascade-plan.md](customer-site-cascade-plan.md)** — Per-page queue that brought every customer-facing surface onto Brand Guide v5. **Complete — 18 of 18 units done 2026-09-02.** Kept as the method reference (one surface at a time; apply-gate).
- **[little-dodo-plan.md](little-dodo-plan.md)** — Positioning and page plan for the K–2 sub-program (shipped 2026-06-02).
- **[workflow.md](workflow.md)** — Source of truth **for the SEO + GEO (Generative Engine Optimization) initiative only** — its tiers, open decisions and session log. Read second for longer-running context.
- **[_archive/](_archive/)** — Superseded working docs, kept for provenance. Nothing here is current.

**The two canonical guides live outside this folder** (historical placement, kept for link stability):

- **[`../.interface-design/system.md`](../.interface-design/system.md)** — the interface rulebook: chrome, tokens, controls, labels, surfaces, type, guards. Normative only; its pre-restructure form (with the D33–D90 narratives inline) is archived at `_archive/interface-system-v6.44.md`.
- **[`../translation/BRAND_CONTENT_GUIDE.md`](../translation/BRAND_CONTENT_GUIDE.md)** (+ `BRAND_CONTENT_GUIDE.zh.md` mirror) — brand, voice and product canon. The locked truth for every content surface.
- **[ops-tools.md](ops-tools.md)** — Internal PDF generators under `/ops/*` (Assessment, Onboarding, Teacher Agreement). The shared html2canvas + jsPDF recipe, the AcroForm pattern, the typing-lag performance pattern, and a checklist for adding a new tool.
- **[navigators-setup.md](navigators-setup.md)** — One-time Cloudflare setup runbook for the sibling navigators repo.
- **[audiobooks-setup.md](audiobooks-setup.md)** / **[audiobooks-add-new.md](audiobooks-add-new.md)** — Audiobook section setup and per-book add procedure.
- **[proxy.example.js](proxy.example.js)** — Dormant Next.js 16 proxy/middleware code. Not active because the site uses `output: 'export'`. Reference blueprint for activating server-runtime locale routing if the deployment model ever changes (see file header for activation steps).
- **[llm-citations/](llm-citations/)** — Monthly LLM citation tracking. Each `YYYY-MM*.md` file is a snapshot of how DODO is (or isn't) cited in answers to parent-shopping queries across ChatGPT / Claude / Perplexity / Gemini.

## The guards

Fourteen guard passes are wired into every build — six on `prebuild` (source) and
eight on `postbuild` (the built output in `out/`), across ten `check-*` scripts.
They exist because five completeness claims in this codebase were false when written;
see the cohesion proposal §1. *(Decision entries have numbered guards as high as #16
under an older counting; the `package.json` wiring is the checkable fact — count it,
don't quote it.)*

```bash
npm run build          # runs all fourteen
npm run conformance    # measured state, never fails — quote these numbers, not prose
npm run conformance -- --labels    # the full label triage
```

`check-surfaces` and `check-inline-style` are **ratchets**: what is in the tree today is
recorded in a baseline and tolerated, counts may fall freely but never rise. After
migrating something, re-run with `--update` and commit the smaller baseline — and say
why in the commit, because a baseline bumped without a reason is how a ratchet becomes a
formality.

⚠️ `conformance` is **not** wired into the build, by design — it reports, it does not
fail. That also means nothing catches it if it breaks. It has already shipped with two
wrong groupings and once syntactically broken. Read its output; don't assume it.

## Conventions

- `workflow.md` is updated after every working session — both status changes and a one-line session log entry. Don't replace; append.
- A claim that something is "gone", "retired" or "used nowhere" **must name the guard that enforces it**, or be written `(unverified)`. Five claims here were sincere, unguarded, and false.
- Citation tracking runs monthly. Same 8 prompts × 4 LLMs each time. Format and template are in `workflow.md`.
- This folder is **not** in the static export (`out/`) — it doesn't ship to Cloudflare Pages. Safe to keep internal notes here.
