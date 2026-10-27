# Style · hyperframes-glass

What HyperFrames (HTML + CSS + GSAP in a real browser) does best. Pilot: `studio/projects/_archive/jev-glass/stage/`.

## In one line
Deep moving colour, frosted glass, focus pulls: the same running-object story as reference-flat, shot "through glass".

## Rules
- **Background:** deep tones per chapter (navy / indigo / teal / violet, `sections.json`) under a slowly drifting
  **aurora** (three blurred radial blobs, `aurora()`), a faint scan-line HUD, plus the engine's vignette/grain (`"flat": false`).
- **Glass cards** (`.glass`): backdrop-filter blur 26px + saturate, 1.5px light border, inner top highlight, deep shadow
  (recipe from the `ios26-liquid-glass` registry block). **Glass chips** (`.gchip`, tinted `.cy/.mi/.am/.pk`).
- **Type:** Inter 900, tight tracking (-0.045em), sentence case; gradient-clipped numerals and verdict lines; a soft
  glow (`.glow`) on hero numbers only. Never a heavy `currentColor` glow: it blurs big digits.
- **Motion:** blur-in (focus pull + rise) is the default entrance (`pop`); stamps drop from a 3D tilt (`slam`);
  `sweep()` runs a light sweep across a card on its payoff; groups drift with a slow 3D tilt; steps exit by **zooming
  through** (`zoomOut`, scale up + blur), chapters by the same. Each chapter opens with a section header (numbered,
  with the progress ring, only when the structure-check agent allows: Tutorial / Concept mechanism).
- **Transforms only:** the capture engine snaps layout properties (left, letter-spacing): animate x / xPercent / scale.
- Same story rules as reference-flat: numbers hidden until they count, content on screen within 0.15 s,
  deterministic randomness, no `.w`/`.y` classes.
- **Geometry** as reference-flat: stage zone y 220–1460; media clip box y 220–1260 (x 40–1040); captions from y 1555
  (81–90 %), bottom and lower-right button column clear.

## Camera
As reference-flat (zoom 1.3–2.6× to the action, then `camHome`; ≤ 1 move per 2.5 s, 6–10/min on stage scenes; nothing
zoomed below the zone; beat `"cam": [x, y, zoom]` or `cam()` in `stage.js`). The `#cam` transform multiplies the glass
blur cost: prefer fewer, longer moves (d 0.8–1.0) and let `zoomOut` carry step exits instead of a camera pull.

## Sound
As reference-flat: one cue per visible action on its frame (pop / ding / stamp / whoosh / tick, click / key / blip for
UI replicas; reveals default to `pop`, `"sfx": "none"` silences; ≥ 0.35 s apart, ≤ 4 per 2 s). Glass reads as
image-led by default: keep the CC0 bed at −36/−30 LUFS; go sound-led (`"music": "none"`, `"sfxLevel": 1.0`) only when
the art direction's dial says the sound is the content.

## Pace
As reference-flat: `templates/reel/pace.json` (2.3 w/s; scene ≤ 2.9, delivery ≤ 2.6 or `voice` fails and prints the
ladder; never speed the voice). A visible change every ≤ 2.5 s: a `sweep()` counts, a drifting aurora alone does not.

## Export
As reference-flat: 1080×1920, 30 fps, H.264 yuv420p + AAC, −14 LUFS, true peak ≤ −1 dBTP;
`run.sh <slug> payoffs render qa watch review` → `deliver`. Budget the render time below.

## Cost
Backdrop blur is expensive to render: ~3.5–4.5 min for 75 s on this laptop (reference-flat: ~45 s).

## Files
`kit.css`, `kit.js` (same API names as reference-flat: `group`, `pop`, `slam`, `count`, `typeText`, `chapter`,
`progress`, `ctaWords`, plus `words`, `sweep`, `zoomOut`, `aurora`), `sections.json`.
