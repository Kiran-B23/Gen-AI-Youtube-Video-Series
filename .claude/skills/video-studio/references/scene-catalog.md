# Scene catalog (what `studio/tools/assemble.py` draws)

Every scene: `id` (s01, s02…), `type`, `say` (spoken line, verbatim) or `seconds` (silent),
optional `kicker` (small label at the top), `source` (recorded for the publish kit; never drawn on screen), `props`, `beats`.
Beats: `{"word": "<word in say>", "target": "<target>", "nth": 0, "offset": 0.0}`. `nth` picks the
nth occurrence of the word; `offset` shifts in seconds. An unmatched target falls back to a fixed time,
so `tools/run.sh <slug> validate` rejects it.

Script visual tags map 1:1: `[TITLE]` title · `[NUMBER]` counter · `[VS]` compare · `[VERDICT]` stamp · `[LIST]` points · `[CODE]` code · `[ANIMATE]`/`[SCREEN]`/`[TERMINAL]` media (Manim / Playwright / VHS) · `[CTA]` cta.

| Type | Use it for | props | Beat targets |
|---|---|---|---|
| `title` | the hook, a section opener | `lines` (1–3 short lines, Anton caps), `highlight` (word coloured accent), `sub`, `chips` (small tags) | `sub`, `chips.0`… |
| `points` | a list the voice names (2–4 items) | `items: [{icon, text, source?}]`, `title` | `items.0`… (slide in + pop) |
| `counter` | one striking number | `value`, `prefix`, `suffix`, `decimals`, `label`, `source` (pill) | `number` (count-up + ding) |
| `compare` | this vs that | `left: {title, items}`, `right: {title, items}`, `verdict` | `left`, `right`, `verdict` (stamp) |
| `stamp` | a verdict, the honest catch | `text` (2–4 words), `sub`, `size` (px, default 220; ~170 for long words) | `stamp`, `sub` |
| `code` | real code, ≤ 10 short lines | `code: [lines]`, `file` | `code` (lines type on) |
| `media` | a built or found clip | `build: {tool, file, scene?, size?, quality?}` or `clip` (path), `label`, `box: [x, y, w, h]` | — |
| `cta` | the ending | `question` (comment prompt), `follow` | `question`, `follow` |
| `duel` | two numbers head to head (giant) | `left: {label, value, unit, sub}`, `right: {…}`, `verdict` | `left`, `right`, `verdict` |
| `recap` | the save-worthy chain before the CTA | `title`, `items` (3–4 short steps) | `items.0`… |

## Spans
`media` with `"build": {..., "span": ["s05", "s06"]}` covers the listed following scenes with one continuous clip;
those scenes are `media` with `"props": {"of": "<first id>"}` and the same `section`.

## Scene-level keys (any type)
`section` (`dark` · `blue` · `light` · `yellow`: full-screen colour; change it at section breaks),
`step` (1-based index into the project's `steps`: shows the progress tracker), `pad` (extra hold in seconds,
e.g. 1.0 to let a reveal land), `kicker`, `source`.

## Project-level keys
`slug`, `format` (`reel`), `size` ([1080, 1920]), `music` (`upbeat-synth` | `soft-pad`),
`names` (proper nouns for Whisper), `keywords` (caption words coloured accent),
`voice: {name, model, style}` (Gemini voice; default Laomedeia on gemini-2.5-flash-preview-tts), `steps` (progress labels),
`padSeconds` (0.3 after each line), `theme: {bg, bg2, accent, accent2, ok, danger, card, line}`.

## Layout (portrait 1080×1920)
- Safe area x 72–892 (right 12 % stays clear for platform buttons).
- **Grid (same on every scene):** tracker y≈70 · kicker y≈150 · **visual zone** x 40–1040, y 220–1260, centred on the frame (media box 1000×1040, transparent clips) · **caption zone** y 1555–1730 (81–90%, sentence captions, no box, low on the screen) · lower-right button column (x > 950, y > 960) clear of visuals.
- Bottom 20 % stays clear except the caption card.

## Audio (automatic)
Voice + music ducked to about −24 LUFS under speech and −16 in gaps, 200 ms ramps; SFX: whoosh on
scene changes, pop on list items and chips, ding on counters, stamp on verdicts. Final mix −14 LUFS.
