# House style · reference-flat

The channel's default look (user, 2026-10-11: "use the reference style"). Source: `references/tokenization-reel.mp4`,
made in Claude chat: the benchmark. Pilot built in this style: `studio/projects/jev-reel/stage/`.

## In one line
One bespoke animation that **performs the explanation on one running object**, in flat colour blocks with giant type.
Not a preset card per sentence.

## Rules
- **One running object** through every step: the sentence, the ticket, the request. It is typed, cut, checked,
  routed, counted. Every step changes *that object*; nothing just labels the voice line.
- **The hook question, pinned**: the first frame shows the content plan's "Hook question" in hook type at the top of
  the zone with the running object already acting under it (by 1.5 s the two fill ≥ 45 % of the zone's height;
  `payoffs` checks it). After the hook the question shrinks to a pinned header (Inter 800, 40–48 px, y 220–360) and
  stays for the whole reel.
- **Sections**: 2–4 sections for a 45–75 s reel. A section change is the section title sliding in under the pinned
  question (numbered only when the structure-check agent allows: Tutorial / Concept mechanism; every other archetype
  uses plain titles such as "The catch"). Hook before the first section, verdict + CTA after the last.
- **One background for the whole reel** (2026-10-30, measured against the top explainer shorts: they keep one
  background and grow one diagram): set `"section"` once at the top of `scenes.json` (off-white `#EEF1F6` or navy
  `#0B1020`; blue `#2B3BE0` and yellow `#FFD23F` are accents for chips, stamps and the verdict, not backgrounds).
  With one section the engine draws no colour wipes. `validate` warns on a per-scene colour change. No vignette,
  glow or grain (`"flat": true`). Palette: `sections.json` here.
- **One diagram that grows**: the running object and its diagram stay on screen and gain parts section by section;
  never clear the stage for a new section. ≤ 5 boxes or cards at once; non-hero text ≥ 34 px so it reads on a phone.
- **Giant type**: hook and verdict in Anton 150–230 px; numbers 200–330 px; chapter numerals Inter 900 at 330 px.
- **Mono chips** (JetBrains Mono 38–50 px) for tokens, labels, answers. White cards with a 4 px ink border on light
  sections; translucent cards on dark/blue.
- **Something changes on almost every spoken word**: typing, a scan line, a highlight, a stamp, a count-up, a connector.
  Beats are keyed to words in `scenes.json` (`at("s04/team")`); nothing fades in on a timer.
- **Fill the frame**: dense where the reference is dense (grids of tokens, cell grids, tables), never three chips in
  an empty screen. **Except the opening**: frame 0 is the question's first words + one big object (≤ 3 things, ≤ 6
  words), and the hook builds on the voice to ≤ 5 things / ≤ 12 words by 3 s; the density comes later, as the diagram grows. Non-hero type stays 34–58 px (≤ 3 % of the frame height) so the diagram can fill the zone and still reads on a phone.
- Numbers are hidden until they count (`count()`); never a "0" on screen.
- **Geometry** (the one sentence every tool reads from `layout.json`): stage zone y 220–1460; media clip box
  y 220–1260 (x 40–1040); captions from y 1555 (81–90 %), bottom and lower-right button column clear. Captions stay
  the engine's; the stage never draws below the zone.

## Motion vocabulary (name it in the animation plan)
TYPES OUT · SCANS · SLICES · STAMPS · COUNTS UP · FILLS (cell grid / waffle) · ROUTES (chip down a lane) ·
RACES (bars) · SHRINKS AWAY (to make room) · BUILDS WORD BY WORD · PUSH IN · SLIDES IN (section title).

## Camera
The stage sits inside `#cam`; the camera is the motion-design method's second actor (`references/ig-reels.md`).
- Zoom steps 1.3–2.6×. Every zoom goes where the action is (the chip being routed, the number landing), then
  `camHome()` brings it back. A move with nothing to land on is a defect.
- ≤ 1 move per 2.5 s (payoffs warns); 6–10 moves/min on stage scenes. Nothing zoomed below the zone: a zoom that
  drags content past y 1460 or under the captions fails payoffs.
- How: a beat `"cam": [x, y, zoom]` in `scenes.json` (x 0–1080, y 220–1460, zoom 1–2.6; optional `camDur`,
  `camOffset`), or `cam(t, x, y, zoom, d)` / `camHome(t)` from `kit.js` in `stage.js`. Both land point (x, y) on the
  zone centre (540, 840) at `zoom`; `assemble` writes every move to `layout.camera` and adds a whoosh.

## Sound
One cue per visible action, landing on its frame (±60 ms, `qa` "sound on action"): `pop` (reveal) · `ding` (a number
lands) · `stamp` (verdict) · `whoosh` (move, wipe) · `tick` (a scan, a count step) · `click` / `key` / `blip` for UI
replicas (a button, a typed key, a packet). Beat `"sfx": "<name>"` picks the cue; reveals default to `pop`;
`"sfx": "none"` silences one beat. Cap: ≥ 0.35 s apart, ≤ 4 in any 2 s (the louder cue wins a clash).
Art direction's dial decides the bed: **image-led** reels keep the CC0 bed, ducked to −36 LUFS under speech / −30 in
gaps; **sound-led** reels set `"music": "none"` and `"sfxLevel": 1.0` so the actions are the soundtrack.

## Pace
`studio/templates/reel/pace.json` is the one rule: 2.3 words/s house pace; `voice` fails a scene > 2.9 w/s or a
delivery > 2.6 w/s and prints the ladder (pauses → `pauseAfter` / fewer words → retake with `"slow": true`). Never
speed the voice up. A visual change every ≤ 2.5 s; no beat holds > 6 s.

## Export
1080×1920, 30 fps, H.264 yuv420p + AAC, −14 LUFS integrated, true peak ≤ −1 dBTP.
`run.sh <slug> payoffs render qa watch review`, then `deliver` (copies to `shorts/` only when qa, payoffs and watch
are clean for this MP4 and `review.md` has no open row and is ticked "Watched end to end").

## Files
- `kit.css`, `kit.js`: shared helpers (`group`, `pop`, `slam`, `count`, `typeText`, `chapter`, `progress`,
  `ctaWords`, `cam`, `camHome`, `.chap`, `.prog`, `.card`, `.chip`, `.big`…). A project sets
  `"stage": {"kit": "reference-flat", …}`.
- `sections.json`: the palette; copy into the project's `"sections"`.

## Free blocks worth adapting (HyperFrames registry, `npx hyperframes@0.8.143 add <name>`, one at a time)
terminal-simulator · code-terminal-run · code-typing · chat-message · chatgpt-exchange · claude-exchange ·
count-up · number-pop-in · animated-bar-chart · bar-chart-race · comparison-split · before-after-wipe ·
marker-highlight · inline-highlight · vox-annotate · hw-arrow · hw-callout-circle · flowchart · success-check ·
ios26-liquid-glass · glass-hero · transitions-push · whip-pan · headline-slam · kinetic-center-build.
Blocks are 1920×1080 sub-compositions: copy the idea and restyle to this palette inside the stage.
