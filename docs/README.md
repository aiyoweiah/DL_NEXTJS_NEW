# docs/

Internal documentation. Not deployed (not in `public/`, not served).

## Contents

- **[workflow.md](workflow.md)** — The single source of truth for the ongoing SEO + GEO (Generative Engine Optimization) initiative. Read this first if you're picking up this work.
- **[ops-tools.md](ops-tools.md)** — Internal PDF generators under `/ops/*` (Assessment, Onboarding, Teacher Agreement). The shared html2canvas + jsPDF recipe, the AcroForm pattern, the typing-lag performance pattern, and a checklist for adding a new tool.
- **[navigators-setup.md](navigators-setup.md)** — One-time Cloudflare setup runbook for the sibling navigators repo.
- **[audiobooks-setup.md](audiobooks-setup.md)** / **[audiobooks-add-new.md](audiobooks-add-new.md)** — Audiobook section setup and per-book add procedure.
- **[proxy.example.js](proxy.example.js)** — Dormant Next.js 16 proxy/middleware code. Not active because the site uses `output: 'export'`. Reference blueprint for activating server-runtime locale routing if the deployment model ever changes (see file header for activation steps).
- **[llm-citations/](llm-citations/)** — Monthly LLM citation tracking. Each `YYYY-MM*.md` file is a snapshot of how DODO is (or isn't) cited in answers to parent-shopping queries across ChatGPT / Claude / Perplexity / Gemini.

## Conventions

- `workflow.md` is updated after every working session — both status changes and a one-line session log entry. Don't replace; append.
- Citation tracking runs monthly. Same 8 prompts × 4 LLMs each time. Format and template are in `workflow.md`.
- This folder is **not** in the static export (`out/`) — it doesn't ship to Cloudflare Pages or Vercel. Safe to keep internal notes here.
