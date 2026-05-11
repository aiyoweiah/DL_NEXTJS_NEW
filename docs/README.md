# docs/

Internal documentation. Not deployed (not in `public/`, not served).

## Contents

- **[workflow.md](workflow.md)** — The single source of truth for the ongoing SEO + GEO (Generative Engine Optimization) initiative. Read this first if you're picking up this work.
- **[proxy.example.js](proxy.example.js)** — Dormant Next.js 16 proxy/middleware code. Not active because the site uses `output: 'export'`. Reference blueprint for activating server-runtime locale routing if the deployment model ever changes (see file header for activation steps).
- **[llm-citations/](llm-citations/)** — Monthly LLM citation tracking. Each `YYYY-MM*.md` file is a snapshot of how DODO is (or isn't) cited in answers to parent-shopping queries across ChatGPT / Claude / Perplexity / Gemini.

## Conventions

- `workflow.md` is updated after every working session — both status changes and a one-line session log entry. Don't replace; append.
- Citation tracking runs monthly. Same 8 prompts × 4 LLMs each time. Format and template are in `workflow.md`.
- This folder is **not** in the static export (`out/`) — it doesn't ship to Cloudflare Pages or Vercel. Safe to keep internal notes here.
