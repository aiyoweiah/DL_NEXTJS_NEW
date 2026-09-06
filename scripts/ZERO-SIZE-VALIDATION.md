# `check-zero-size` — validation record

**Run 2026-09-06, before the guard was trusted anywhere.** Required by D101 and by
§4 of [`../docs/architecture-cohesion-proposal.md`](../docs/architecture-cohesion-proposal.md):
*green output from an instrument never seen to go red is silence, not evidence.*

This codebase has a known-bad commit to calibrate against, which is a luxury —
normally the broken case has to be fabricated.

## Negative test — the one that matters

`9a205a4`, the last build carrying D100's collapsed hero.

```
git checkout 9a205a4
npm run build          # exit 0 — all 14 guards green on a broken site
node scripts/check-zero-size.mjs
```

**Result: exit 1**, 8 findings — 2 elements × 2 viewports × 2 locales:

```
/en/ @desktop :: main>section.section-light…>div.pointer-events-none.absolute.select-none:nth-of-type(2)   -> 0 x 0
/en/ @desktop :: …div.pointer-events-none.absolute.select-none:nth-of-type(2)>svg                          -> 0 x 0
/en/ @phone   :: (both, as above)
/zh/ @desktop :: (both, as above)
/zh/ @phone   :: (both, as above)
```

Two things this establishes, and they are separate:

1. **The guard can fail.** It is not structurally incapable of firing — the trap
   `check-utility-emitted`'s first version fell into, recorded in its own header.
2. **It fails for the right reason.** It names the watermark wrapper and its
   `<svg>`, not something incidental that happened to be zero. A guard that goes
   red on the wrong element is not validated, merely noisy.

Worth stating plainly: **the same build passed all 14 existing guards, exit 0.**
That is the gap this guard exists to close, reproduced on demand.

## Positive test

`main` at `29a4e01`, the fix in place.

```
npm run build
npm run check:geometry
```

**Result: exit 0** — `120 routes x 2 viewports, 0 painted-but-zero element(s) found`.

The banked baseline is therefore **empty**, which is itself a claim worth reading:
*no decorative element on this site is legitimately zero-area.* Any future entry
is a regression until someone rules otherwise.

## What this does not prove

The guard sees zero-area elements only. It does not catch an element rendered at
the *wrong* size but non-zero, one correctly sized but positioned offscreen, or
one painted in a colour matching its ground. Narrowness is the point — it is what
makes the check cheap and the baseline empty. Do not read a green run as "the
hero is verified."

Scope is also decorative positioned elements only (D101): `aria-hidden`, `<svg>`,
or a background-image. A collapsed *content* element is out of scope by design.

## Re-run this if you change the detection rule

A guard that quietly stops being able to fail is worse than no guard, because it
manufactures confidence. If you touch the painted-but-zero test, the scope filter,
or the viewport list, repeat the negative test against `9a205a4` and confirm it
still reports 8 findings.
