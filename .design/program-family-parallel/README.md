# Program Family Parallel — folder index

**Workstream:** Elevate Little DODO to true parallel visibility with the ELA Program across the entire site (not just the home page). Retire "16-Week Program" as a brand name; reframe as a format descriptor that applies to both bands.

**Status:** Audit + proposal in progress. **No live files have been edited.** Per the content apply-gate, every change is staged in this folder. The user must give an explicit "apply" trigger before any of these land.

**Started:** 2026-06-03

## Reading order

1. **`00-NAMING_MODEL.md`** — Canonical rename dictionary + URL/hub architecture + nav/footer model. Read this first; everything else assumes it.
2. **`01-CHROME_REVIEW.md`** — Initial design review of the chrome (Navbar, Footer, AgeBandChooser, PreCtaBand, home/program/little-dodo pages). Findings on tokens, hierarchy, a11y, responsive, etc. The "Must Fix" / "Should Fix" lists are still valid; the proposal section is superseded by `02-FIRST_PROPOSAL_SUPERSEDED.md` + the in-progress `03-AUDIT.md` and later.
3. **`02-FIRST_PROPOSAL_SUPERSEDED.md`** — The original 4-option proposal (A: rename nav label, B: add Little DODO to drawer "more", C: add home AgeBand band, D: footer column plural). Superseded because user scope is now broader than home-only and includes the "16-Week" → "ELA" rename. Kept as reference — many sub-decisions still hold and feed into the final proposal.
4. **`AUDIT_PLAN.md`** (this doc's companion) — 4-phase plan, scope, deliverables.

## Completed (in reading order after the model)

- `03-AUDIT.md` — Per-page audit of Tier 1+2+3 + /faq + Tier 4/5 sweep + infra
- `04-FLOW_MAP.md` — Cross-page UX graph; K-2 edges highlighted/missing
- `06-PROPOSAL.md` — **Easy-read proposal** (start here for the apply decision)
- `06b-PROPOSAL-DETAIL.md` — Dense reference: line numbers, EN+ZH strings, per-file rename tables (open only to verify a specific string)

## Pending (next, on user "apply")

- `07-APPLY.md` — Per-step apply log with `next build` checkpoints + ZH-EN parity confirmations (written *during* the apply, not before)

## Guardrails

- Content apply-gate: never edit `content/marketing.{en,zh}.js` or page files until the user says "apply".
- Bilingual parity: every EN proposal carries a ZH mirror in the same doc.
- Funnel ladder + PreCtaBand SUPPRESS list + flat-6 navbar + no-dropdown rules from `.interface-design/system.md` are inviolable.
- `next build` must stay clean. Run `npx next build` before locking the apply order.
