---
name: video-studio
description: Turn a video-scripter package (productions/<date>-<slug>/ script + storyboard) into a finished MP4 with free, code-generated visuals - plan scenes.json, build Manim / Playwright / VHS clips, Gemini TTS voice with Whisper word timings, HyperFrames assembly with captions, music ducking and SFX, QA stills, render. Use when the user says "make the video", "render the reel", "produce this package", "/video-studio <slug or production folder>", or asks to turn a script or storyboard into a reel or short. Reels (9:16) are ready today; long-form (16:9 chapters, presenter) is planned in docs/video-generation-plan.md.
---

# Video Studio

Make a finished video from a script package with **free tools only** (no paid models).
The engine lives in `studio/`. Everything runs through `studio/tools/run.sh <slug> <steps…>`.

Usage: `/video-studio <production folder or slug>`.

## Before you start
1. Read `studio/README.md` (the steps and folder layout), `references/scene-catalog.md` (the scene
   types the assembler draws) and `references/clip-recipes.md` (how to write Manim / Playwright /
   VHS clips that look right). The style's `design.md` (`studio/templates/styles/<kit>/`) is the style skill:
   rules, motion vocabulary, camera, sound, pace, export.
2. Read the package: `script-reel.md`, `storyboard-reel.md`, `research.md` (for source pills), `art-direction.md`,
   `animation-plan.md`. If there is no package, run `/video-scripter` first. Never invent the script here.
   The package must pass `python3 .claude/skills/video-scripter/scripts/lint_package.py <folder>`
   (0 ✗) before planning. Fix the package, not the video.
3. Toolchain missing? Run `studio/tools/setup.sh` once.

## Pipeline
### 0. Two ways to draw a reel (the stage is the default)
- **Stage (default, the house style):** one bespoke animation on the running object, drawn by the project's
  `stage/stage.html|css|js` on top of the shared kit (`studio/templates/styles/reference-flat/`: `group`, `pop`,
  `slam`, `count`, `typeText`, `chapter`, `progress`, `ctaWords`, `cam`, `camHome`, `.chap`, `.card`, `.chip`, `.big`…).
  Every scene is `"type": "stage"` with beats (keys below); the stage reads them with `at("s04/team")`
  (validate fails on any `at()` key with no beat). Spec: `"flat": true`, `"stage": {"kit": "reference-flat",
  "html": "stage/stage.html", "css": "stage/stage.css", "js": "stage/stage.js"}`, `"sections"` from the kit's
  `sections.json`. Pilot: `studio/projects/jev-reel/stage/`. Build it from the package's approved `animation-plan.md`.
  Other kits: `hyperframes-glass`, `3b1b-manim` (Manim clips), `remotion-spring` (Remotion only).
- **Scene presets** (title / counter / points … in the catalog): only for a quick draft or when the user asks.
- **Remotion (optional, the owner's personal use only):** when the owner asks for Remotion, also write
  `projects/<slug>/remotion/Stage.tsx` (React, same beats; see `studio/remotion/README.md`) and run
  `tools/run.sh <slug> remotion`, then `RM=1 tools/run.sh <slug> qa watch review` and `RM=1 … deliver` (no `payoffs`:
  there is no DOM; the camera comes from `layout.camera`). Never for team/company renders (licence).

**Gates before any build:** the package's `animation-plan.md` must show "- [x] Visual plan passed" and "- [x] Structure
check passed". If not, run the `visual-plan` / `structure-check` agents first and apply their fixes. Then, once
`scenes.json` and `stage/*` exist (step 1 below) and before the build loop starts, run the `visual-plan` agent in
**scenes mode** on `studio/projects/<slug>/scenes.json` + `stage/*`: every scene carries at least (the plan row's cue
count − 1) beats, every beat word is one of the plan's cues, and every beat has a `data-beat="sNN/target"` element in
`stage/stage.html` (or `"check": "none"` on the beat); nothing below y 1460 or in the right 12 %; locks grepped. **The
build must not start until it returns PASS.** Never draw "STEP n OF m", chapter numerals or a step progress bar unless
the structure check said steps are justified (Tutorial, or a real Concept mechanism).

**Stage build loop**
1. One `.g` group per beat or step; each step's markup and timeline is a 4–10 s piece built from its brief in
   `animation-plan.md`. Steps are independent, so they can be written by parallel subagents (one per step, each
   given its brief, the kit API and the beat keys) and merged into one `stage.js`.
2. Rules that keep it clean (each one was a defect on the pilot): the previous group ends at `S[next] - 0.2` when a
   chapter card opens the next step; content of a step starts only after `chapter()` returns; numbers use `count()`
   (hidden until they count); the first element of every scene is on screen within 0.15 s (QA "scene openings");
   never reuse the engine's preset class names (`.w`, `.y` captions; `.chip`, `.bubble`, `.follow`, `.row`, `.card`, `.stamp`, `.verdict`, `.code`, `.cline`, and the glass kit's `.big`: they carry opacity 0 or borders; the kits reset `.chip`. Prefix stage classes per project, e.g. `.d-…`); deterministic randomness only (`rnd()`).
   Geometry: stage zone y 220–1460; media clip box y 220–1260 (x 40–1040); captions from y 1555 (81–90 %), bottom and
   lower-right button column clear. The motion check (`qa`) only sees the band y 10–60 % (≈ 190–1150 px): a beat whose
   only motion sits lower reads as a still frame, so give the speech in-band changes tied to their words (a hold to read is fine; > 5 s frozen fails).
   Tiny moving dots don't register; pulse a card or highlight a word instead. Body text inside stage cards stays
   ≥ 30 px (names ≥ 40 px); non-hero type ≤ 3 % of the frame height; the stage fills the zone (MCP reel, 2026-10-13).
3. **data-beat convention:** every stage beat's element carries `data-beat="sNN/target"` in `stage.html` (or the beat
   says `"check": "none"`); `payoffs` derives it from `pop('id', at('sNN/target'))` in `stage.js` when the attribute is
   missing, but the attribute is the rule.
4. `validate assemble check payoffs`, fix every ✗, then `snapshot` a frame per scene, look, fix, then `render qa watch review`.

### 1. Plan → `studio/projects/<slug>/scenes.json`
`tools/run.sh <slug> new` copies the template. Then map the storyboard beat by beat:
- **`"package": "productions/<date>-<slug>"`** links the project to its package: `validate` compares every `say` with
  the script's read-aloud (≥ 97 % match) and the spoken scene count with the storyboard rows (split scenes carry
  `"beat": <row>`). Without it the voice is not checked against the reviewed script.
- **One scene per storyboard beat** (2–6 s of speech). `say` is the script line **verbatim**
  without delivery cues (`[excited]`, `[S3]`). The voice reads `say`; captions come from it.
- **The scene type comes from the beat's visual tag** in the script (the storyboard says what it shows). Stage reels:
  every scene is `"type": "stage"`. Preset drafts:
  `[TITLE]`→`title` · `[NUMBER]`→`counter` · `[VS]`→`compare` (or `duel` when both sides are numbers) · `[VERDICT]`→`stamp` · `[LIST]`→`points` ·
  `[RECAP]`→`recap` · `[CODE]`→`code` · `[ANIMATE]`→`media` + Manim · `[SCREEN]`→`media` + Playwright · `[TERMINAL]`→`media` + VHS ·
  `[CTA]`→`cta`. A beat without a tag is a script bug: fix it in the package, don't guess here.
- **Voice style:** set `voice.style` from the brief's **Tone** line (the archetype's tone), plus
  "Read every word. Never robotic."
- **Voice engine:** Gemini (default, best delivery; one free request per take) or `"engine": "kokoro"` in `voice`
  (local Kokoro-82M via `hyperframes tts`: free, no key, no quota, each line cached by its text so edits re-voice only
  the changed lines; `kokoroVoice` default `af_heart`, `kokoroSpeed` default 0.85). Use Kokoro for drafts and when the
  Gemini quota is used up; a final take stays Gemini or the user's own recording unless the user approves Kokoro.
- **Names:** the script's pronunciation notes go into `names` (proper nouns, so Whisper spells them right).
- **Sections:** one background for the whole reel (2026-10-30): set `"section"` once at the top of `scenes.json`
  (`light` or `dark`) and leave it off the scenes, so the engine draws no colour wipes; a section break is the section
  title sliding in under the pinned hook question (`reference-flat/design.md`). `validate` warns on a per-scene change.
- **Progress:** only when the structure check allows numbered steps: set `steps` (3–5 short labels) and `step` on the
  scenes inside each step.
- **Pace:** `padSeconds` is the hold after each line (code default 0.3); per-scene `"pad": 0.65` at section ends
  (`pace.json` `pad_section_end`) lets the payoff land. The voice tool trims silence before the first word of each scene.
- **Beats:** every element that appears when a word is spoken gets a beat. Keys:
  `"word"` (must be in `say`; `"nth"` picks a repeat; `"offset"` shifts in s) · `"target"` (the `at()` key) ·
  `"check"`: `visible` (on screen at the word) | `reveal` (lands on the word, not before; default when the element is
  known) | `motion` (something changes) | `none` (not checked) · `"settle"`: seconds after the word when payoffs
  looks (default 0.5) · `"sfx"`: cue name | `"none"` (reveals default to `pop`) · `"cam"`: `[x, y, zoom]`
  (x 0–1080, y 220–1460, zoom 1–2.6; optional `camDur`, `camOffset`) · `"pauseAfter"`: `["word", …]` (a sentence pause
  after those words, pace ladder 2) · `"fallback"`: s (accept a fixed time when the word was not spoken; otherwise the
  build stops).
- **Sources:** each sourced number gets `source` (scene-level, for the publish kit; never drawn) from `research.md`.
- `keywords` (words to colour in captions): the subject, key numbers. Up to about 8.
- Change the visual every ≤ 2.5 s (`pace.json` `max_change_s`); no beat holds > 6 s. Never two `points` scenes in a
  row. Mix in at least one built clip (Manim / Playwright / VHS) per reel when the topic allows it.

### 1b. Art direction drives the plan
Read the package's `art-direction.md`. Its palette goes into `scenes.json` → `"sections"` (overrides), and its
continuous spans become `build.span` clips. Its two dials set the soundtrack: **image-led** → `"music": "cc0/<name>"`
(from `templates/reel/audio/music/cc0/manifest.json`), ducked to −36 LUFS under speech / −30 in gaps; **sound-led**
→ `"music": "none"` and `"sfxLevel": 1.0` (the action cues are the soundtrack). Realistic → UI replicas with
`click` / `key` / `blip` cues; stylised → `pop` / `ding` / `stamp`. Never use a reference video's palette.

### 2. Clips (when the plan has `media` scenes)
**Registry first:** before hand-building a named effect (a terminal, chat bubble, chart, highlight, map, transition…),
check the free HyperFrames registry (300+ blocks; the house style's `design.md` lists the useful ones). Install **one at
a time** into a scratch project (`npx hyperframes@0.8.143 add <name>`; a bulk `catalog` call times out) and read the
block's `compositions/<name>.html`. Blocks are 1920×1080 sub-compositions: take the technique into the stage and
restyle it to the house palette rather than pasting a landscape block into a portrait reel.
Write each clip into `projects/<slug>/clips/` following `references/clip-recipes.md`.
Text inside clips must read at phone size: ≥ 44 px for body text in an 820×780 box.

### 3. Voice and pace
```
tools/run.sh <slug> validate        # free, fix every ✗ before spending a voice request
tools/run.sh <slug> voice           # ONE Gemini request (free tier ~10/day) → build/timings.json + the pace table
                                    # RESPLIT=1 re-splits the saved take (free); RETAKE=1 spends a new request
```
- No Gemini key or quota left? `VOICE_ENGINE=kokoro tools/run.sh <slug> voice` (free, local) instead of stopping.
- `voice` prints `BEAT WORDS NOT SPOKEN` if a beat word was misheard. Fix the beat word, not the voice. Word times in
  `timings.json` carry `"src"`: `heard` | `spread` | `guessed`; a scene with > 25 % guessed fails (check `names`).
- **Pace gate** (`studio/templates/reel/pace.json`, house 2.3 w/s): `voice` prints a per-scene table and **fails** when
  a scene > 2.9 w/s (`scene_max`) or the delivery > 2.6 w/s (`delivery_max`). The ladder for a too-fast take, by the
  raw pace it prints: (1) raw ≤ 2.9: raise `voice.minPause` (caps 0.75 / 0.3) and per-scene `pad`, then `RESPLIT=1`
  (free); (2) 2.9–3.2: add `"pauseAfter": ["word"]` on the fast scenes' beats, or shorten that line and retake;
  (3) > 3.2: `RETAKE=1` with `"voice": {"slow": true}` (text-level pauses), or switch voice (`studio/voice-pace.json`
  logs every take's raw pace per voice), or cut words. `"pace": {"accept": 2.8, "why": "…"}` in `scenes.json`
  downgrades the gate to a warning, with the reason on record. **Never atempo** or otherwise speed-change the voice.
- Total over the format budget? Shorten lines and `RETAKE=1`.

### 4. Build and check before any render
```
tools/run.sh <slug> clips assemble check payoffs stills
tools/run.sh <slug> preview         # optional: HyperFrames Studio for the user to scrub; they can select an element and
                                    # `npx hyperframes@0.8.143 preview --selection --json` (in hf/) tells you exactly which one
```
- `payoffs` (before render, always): seeks the GSAP timeline in Chrome and asserts each beat's element is visible
  `settle` s after its word (`reveal` must not be visible 0.15 s before), captions ≤ 2 lines, nothing planned frozen
  > 5 s, ≤ 1 camera move per 2.5 s. It also runs qa's pixel test on the composition (a frame every 0.25 s: no scene's
  stage band frozen > 5 s, no blank opening 0.15 s in) and the **hook frame** check: at 1.5 s the hook question and the
  running object fill ≥ 45 % of the stage band's height (all 12 top shorts measured on 2026-10-30 fill 48–100 %;
  `references/web-shorts-2026-10-30.md`), and the **opening ceiling**: at 0 s ≤ 3 things and ≤ 6 words on screen, at
  3 s ≤ 5 things and ≤ 12 words (captions, chips and tags counted; `references/web-shorts-openings-2026-10-30.md`).
  Build the hook on the voice: the question types out as it is spoken (that scene sets `"captions": false`, so the
  question is the caption), the object acts on its word, tags and chips arrive after 3 s. The still share is reported, not a target: it does not predict reach, so
  don't spend fix rounds lowering it. All of this is fixed here, not after a render (~40 s). Fix the beat word / `offset` / `data-beat` / markup, re-run. `qa` refuses a stale
  `payoffs.json`. qa's "audio = script" speaks digits, `%` and file names out before comparing ("52.8%" = "fifty two
  point eight percent", "AGENTS.md" = "agents dot M D"), so what remains in its diff is worth a listen.
- Read `out/stills.png` (2 frames per scene, safe-zone guides): nothing in the right 12 % or below the zone except
  captions; every text readable at phone size; no clipped words; clips fill their box, no letterbox, no visible box,
  no blank tail > 1 s; zero `OVERLAP` lines from the clip build; `check` 0 errors, contrast passes
  (`nested_structure_needs_subcomposition` warnings on caption cards are Studio-display only).
Fix, re-run `assemble check payoffs stills`, look again.

### 5. Render → qa → watch → review → deliver
`tools/run.sh <slug> render qa watch review` → `out/<slug>.mp4` only; **nothing reaches `shorts/` until `deliver`**.
1. `qa` (render eval → `out/qa.json`): format, voice-led timing, −14 LUFS ±1, true peak ≤ −1 dBTP, no dropouts,
   captions, audio = script, motion, pace, payoffs fresh, sound on action, music bed. All ✓ before anything else.
2. `out/review.png` (a frame every 1.5 s) and `out/transitions.png`: every scene reads at phone size; nothing empty at a
   scene start; no broken in-between frames (scrambled glyphs, half-faded overlaps, clipped text) at a scene change.
3. `out/payoffs.png`: one frame `settle` s after every beat word; the element named under each frame is fully on screen.
4. **Watch it end to end** (user rule, 2026-10-11): `watch` writes 2 fps contact sheets to `out/watch/sheet-NN.png`
   (every 0.5 s, labelled scene + time) and `out/watch.json`. Read EVERY sheet, then list defects with timestamps:
   zero-state numbers, empty stretches > 1.5 s, anything clipped by a zoom or move, touching/overlapping boxes,
   overlapping captions, blank frames at scene changes. Its transcript flags unclear words, long pauses and pace. A
   name Whisper mishears is checked against its espeak phonemes before any re-voice. review.png alone is not a review.
5. `review` merges every ✗ from `qa.json`, `payoffs.json` and `watch.json` into `projects/<slug>/review.md` (the fix
   list, committed): one finding per row with a timestamp and scene; add your own rows from the sheets; status
   `open` → `fixed (<what changed>)` or `accepted (<why it is fine>)`. A finding that disappears from the next run is
   marked fixed automatically (an unclear word Whisper now hears clearly says so; unclear rows are keyed by scene and
   word, not time). Tick "- [x] Watched end to end" only after step 4. "Listened on a phone with sound" is the user's
   tick: never tick it; it writes the user's seal in `studio/watched/<slug>.json` that `deliver` requires.
6. Design: every visual is built from the design system (solid chips, display headlines, `motion_kit` illustrations),
   not raw text; the art direction's metaphor is actually on screen; no sources on screen (the description lists them);
   no two boxes touch.
7. `tools/run.sh <slug> deliver`: copies to `shorts/` (+ MP3-audio copy in `shorts/play-on-this-pc/`) only when
   `qa.json` is clean for this MP4, `payoffs.json` is clean for this composition, `watch.json` exists, `review.md`
   has no open row and both ticks, and the user's seal matches this MP4. Fix → re-render → `qa watch review` → tick → `deliver`. Every revision changes the one
   thing the note names (beat words / `offset` / per-scene `pad` / markup) and keeps everything else the same.
8. Say **"ready for your review"** only after `deliver`, never "ready": the user watches and listens (voice, music,
   feel); I can't hear audio or feel motion. Report the path, duration and anything left unverified.

## Guardrails
- **No paid models or APIs.** The voice is the Gemini free tier, local Kokoro, or the user's recording. On a daily-quota
  error, `voice` stops (it never switches to a paid service). Then tell the user, and offer Kokoro or their own recording.
- **Quota discipline:** run `validate` before `voice`; one take per script; `RESPLIT=1` to fix a split
  without a new request.
- **Secrets:** the key is read from `.env` and never printed, logged or written into project files.
- **Visual honesty:** illustrative UIs say "illustrative". No logos, real people's likenesses, or other
  creators' frames inside our videos.
- **Gates:** `validate`, `voice` (pace), `check`, `payoffs`, `qa` and `deliver` exit non-zero on failure. Never render
  or hand over past a red gate.

## Rules that never bend
- **Everything reusable goes into the shared layer** (`studio/tools/`, `studio/tools/manim_lib/motion_kit.py`,
  `studio/templates/`, this skill's references). A project's `clips/` hold only topic data and span
  choreography. If you write a new motion idea, write it as a `motion_kit` primitive and catalogue it in
  `references/clip-recipes.md`.
- No paid models or paid APIs. Gemini TTS free tier, one request per video.
- The voice leads: scene length = voice + pad. Visual beats fire on spoken words. Pace is fixed with pauses, fewer
  words or a retake, never by speeding the voice.
- No brand logos or other creators' visuals. Illustrative UIs say "illustrative".
- No trivia in the visuals either (dates, venues, HQs).
- If the user records their own voice, put `voice/sNN.wav` files in the project; `voice` uses them.

## Learning loop
When the user reviews a video, add the lesson to `.claude/skills/video-scripter/references/learnings.md`
(script/visual lessons) and update `references/scene-catalog.md`, `clip-recipes.md` or the style's `design.md` if it
changes how scenes are built.
- **Make it checkable.** A lesson isn't done until it is a rule *and*, wherever it can be measured, a check that fails
  loudly (`validate.py`, `assemble.py` warnings, `payoffs.mjs`, `qa_video.py`, `lint_package.py`). A rule only in prose
  gets repeated.
- **Precise notes.** `review.png` and the watch sheets label every frame with its scene id and time. Ask the user to
  name the frame ("s04 @ 12.8s: the chip is clipped") or select the element in `preview`; put it in `review.md`; fix
  exactly that element.
- **One change at a time.** Each revision changes the one thing the note names and keeps everything else the same;
  re-render, re-watch, then the next note. Stacked changes hide which one broke a frame.
- **Patch or rebuild.** A note about one element → patch that scene. A note about pacing, order or several scenes →
  re-plan that section of `scenes.json` from the storyboard instead of stacking patches.
