# Scene catalog (what `studio/tools/assemble.py` draws)

Every scene: `id` (s01, s02…), `type`, `say` (spoken line, verbatim) or `seconds` (silent),
optional `kicker` (small label at the top), `source` (recorded for the publish kit; never drawn on screen), `props`, `beats`.
Beats: `{"word": "<word in say>", "target": "<target>", "nth": 0, "offset": 0.0}`. `nth` picks the
nth occurrence of the word; `offset` shifts in seconds. `tools/run.sh <slug> validate` rejects an unmatched target.
Optional keys (stage and preset alike): `"check"` visible | reveal | motion | none (what `payoffs` asserts),
`"settle"` (s after the word, default 0.5), `"sfx"` name | `"none"` (reveals default to `pop`), `"cam"` `[x, y, zoom]`,
`"pauseAfter"` `["word"]`, `"fallback"` s. The full list: `SKILL.md` § 1.

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
`padSeconds` (hold after each line; code default 0.3; per-scene `pad` 0.65 at section ends), `package`
(`productions/<folder>`: validate checks `say` against the script), `pace: {accept, why}`, `musicLevel`, `sfxLevel`
(0.6; 1.0 for sound-led), `sfxDefault`, `theme: {bg, bg2, accent, accent2, ok, danger, card, line}`.

## Layout (portrait 1080×1920)
- Safe area x 72–892 (right 12 % stays clear for platform buttons); tracker y≈70 · kicker y≈150.
- **Geometry (the one sentence, written to `layout.json`):** stage zone y 220–1460; media clip box y 220–1260
  (x 40–1040); captions from y 1555 (81–90 %), bottom and lower-right button column clear.
  Media clips are transparent, 1000×1040 in the clip box; sentence captions, no box, low on the screen; the
  lower-right button column is x > 950, y > 960.

## Audio (automatic)
Voice at −16 LUFS + the CC0 bed ducked to −36 LUFS under speech and −30 in gaps (`musicLevel` overrides;
`"music": "none"` for sound-led reels); one cue per visible action: whoosh on scene changes and camera moves, pop on
reveals, ding on counters, stamp on verdicts, tick / click / key / blip when a beat asks (`"sfx"`); ≥ 0.35 s apart,
≤ 4 per 2 s. Final mix −14 LUFS, true peak ≤ −1 dBTP.
