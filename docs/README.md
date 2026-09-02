# docs/

Internal documentation. Not deployed (not in `public/`, not served).

## Contents

- **[SUCCESSOR_HANDOFF.md](SUCCESSOR_HANDOFF.md)** — Entry-point doc for anyone picking up the project cold. Architecture, brand voice, DeepSeek workflow, key files, what's pending, smoke tests. **Read this first.**
- **[decision-index.md](decision-index.md)** — **Status for every numbered decision (D1–D78) across both logs**, with the guard that enforces each one. Live / Superseded / Amended / Fulfilled / Open. **Check this before assuming any decision is still current** — the logs record what was *decided*, this records what is still *true*.
- **[completion-plan.md](completion-plan.md)** — **The cascade of everything still open after D78**, ordered by what unblocks what: four decisions, the 957 inline-style migration, the label vocabulary (deliberately blocked behind it), the type floor, the content cascade, and the admin items gating Tier-2 SEO. Start here when picking up work.
- **[architecture-cohesion-proposal.md](architecture-cohesion-proposal.md)** — Why this codebase kept shipping false completeness claims, and the guards built to stop it. **Read before starting a sweep of anything.** Also carries the measurement traps (§4) — each one produced a wrong number in practice.
- **[content-style-decisions.md](content-style-decisions.md)** — Append-only log of voice / vocabulary / positioning decisions (D1–D50). Status lives in `decision-index.md`, not here.
- **[customer-site-cascade-plan.md](customer-site-cascade-plan.md)** — Per-page queue for bringing every customer-facing surface onto Brand Guide v5. 15 of 18 units done; `/faq` is the one never rewritten.
- **[little-dodo-plan.md](little-dodo-plan.md)** — Positioning and page plan for the K–2 sub-program (shipped 2026-06-02).
- **[workflow.md](workflow.md)** — Single source of truth for the ongoing SEO + GEO (Generative Engine Optimization) initiative. Read second for longer-running context.
- **[_archive/](_archive/)** — Superseded working docs, kept for provenance. Nothing here is current.
- **[ops-tools.md](ops-tools.md)** — Internal PDF generators under `/ops/*` (Assessment, Onboarding, Teacher Agreement). The shared html2canvas + jsPDF recipe, the AcroForm pattern, the typing-lag performance pattern, and a checklist for adding a new tool.
- **[navigators-setup.md](navigators-setup.md)** — One-time Cloudflare setup runbook for the sibling navigators repo.
- **[audiobooks-setup.md](audiobooks-setup.md)** / **[audiobooks-add-new.md](audiobooks-add-new.md)** — Audiobook section setup and per-book add procedure.
- **[proxy.example.js](proxy.example.js)** — Dormant Next.js 16 proxy/middleware code. Not active because the site uses `output: 'export'`. Reference blueprint for activating server-runtime locale routing if the deployment model ever changes (see file header for activation steps).
- **[llm-citations/](llm-citations/)** — Monthly LLM citation tracking. Each `YYYY-MM*.md` file is a snapshot of how DODO is (or isn't) cited in answers to parent-shopping queries across ChatGPT / Claude / Perplexity / Gemini.

## The guards

Eleven checks run on every build — five on `prebuild` (source) and six on `postbuild`
(the built output in `out/`). They exist because five completeness claims in this
codebase were false when written; see the cohesion proposal §1.

```bash
npm run build          # runs all eleven
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
