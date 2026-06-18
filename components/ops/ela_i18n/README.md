# DODO ELA report — zh translation workflow

Parent-facing strings for the DODO ELA assessment report ([`../ElaReportTool.jsx`](../ElaReportTool.jsx))
are authored **English-first**, then translated to Simplified Chinese via the
**manual DeepSeek chat workflow** — the same one DLCW uses for curriculum parent
guides ("aux guides"). No DeepSeek API key exists; this is a paste-in-chat pass.

## Files

| File | Role |
|---|---|
| `ela_report_translation_source.json` | Flat `{ key: { en, context } }` source — 46 strings (placement / strands / rating-tier notes). `en` values match `ElaReportTool.jsx` verbatim. |
| `ela_report_translation_directive.md` | ELA context block + the full DLCW static-core directive. Self-contained; paste as the first DeepSeek message. |
| `ela_report_translation_output.json` | **(you create this)** DeepSeek's returned `{ key: zh }`, saved here. |

## Steps

1. Open a new DeepSeek chat. Paste **all of** `ela_report_translation_directive.md` as the first message.
2. (Optional, matches DLCW) Paste the relevant `docs/translation_glossary.md` terms so locked MCT renderings are used.
3. Paste **all of** `ela_report_translation_source.json` as the second message.
4. Save DeepSeek's raw JSON reply as `ela_report_translation_output.json` here (raw JSON only — no fences, same 46 keys).
5. Hand it back to Claude (or apply yourself): each key maps to a field in `ElaReportTool.jsx`
   — `placement.*` → `ELA_PLACEMENT[*].zh_head/zh_body`, `strand.<group>.<id>.label` → the
   strand's `zh`, `strand.<group>.<id>.desc` → its `desc` zh, `rating_note.N` → the zh side of
   the level-N note. Flag any `[需管理员核实]` markers before parent distribution.

## Notes

- Internal band names (Island / Lens III) never appear in these strings and must never be
  inserted by the translator — the directive enforces this.
- When richer per-strand × per-level descriptor pools are authored later, regenerate the
  source JSON and run another pass.
