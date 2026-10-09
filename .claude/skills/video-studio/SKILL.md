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
   VHS clips that look right).
2. Read the package: `script-reel.md`, `storyboard-reel.md`, `research.md` (for source pills).
   If there is no package, run `/video-scripter` first. Never invent the script here.
   The package must pass `python3 .claude/skills/video-scripter/scripts/lint_package.py <folder>`
   (0 ✗) before planning. Fix the package, not the video.
3. Toolchain missing? Run `studio/tools/setup.sh` once.

## Pipeline
### 1. Plan → `studio/projects/<slug>/scenes.json`
`tools/run.sh <slug> new` copies the template. Then map the storyboard beat by beat:
- **One scene per storyboard beat** (2–6 s of speech). `say` is the script line **verbatim**
  without delivery cues (`[excited]`, `[S3]`). The voice reads `say`; captions come from it.
- **The scene type comes from the beat's visual tag** in the script (the storyboard says what it shows):
  `[TITLE]`→`title` · `[NUMBER]`→`counter` · `[VS]`→`compare` (or `duel` when both sides are numbers) · `[VERDICT]`→`stamp` · `[LIST]`→`points` ·
  `[RECAP]`→`recap` · `[CODE]`→`code` · `[ANIMATE]`→`media` + Manim · `[SCREEN]`→`media` + Playwright · `[TERMINAL]`→`media` + VHS ·
  `[CTA]`→`cta`. A beat without a tag is a script bug: fix it in the package, don't guess here.
- **Voice style:** set `voice.style` from the brief's **Tone** line (the archetype's tone), plus
  "Read every word. Never robotic."
- **Names:** the script's pronunciation notes go into `names`.
- **Sections:** give each scene a `section` (`dark` / `blue` / `light` / `yellow`) and change it at each section
  break of the script (setup, mechanism, reveal, why it matters, recap). Clips take the section colours automatically.
- **Progress:** multi-step explanations set `steps` (3–5 short labels) and `step` on the scenes inside each step.
- **Pace:** `padSeconds` 0.15–0.2 for reels; the voice tool trims silence before the first word of each scene.
- **Beats:** every element that appears when a word is spoken gets
  `{"word": "<word from say>", "target": "<element>"}`. The word must be in `say`.
- **Sources:** each sourced number gets `source` (scene-level pill) from `research.md`.
- `keywords` (words to colour in captions): the subject, key numbers. Up to about 8.
- `names`: proper nouns, so Whisper spells them right.
- Change the visual every 2–4 s. Never two `points` scenes in a row. Mix in at least one built clip
  (Manim / Playwright / VHS) per reel when the topic allows it.

### 1b. Art direction drives the plan
Read the package's `art-direction.md`. Its palette goes into `scenes.json` → `"sections"` (overrides), and its
continuous spans become `build.span` clips. Its music choice goes into `"music"` (`cc0/<name>`, from
`templates/reel/audio/music/cc0/manifest.json`). Never use a reference video's palette.

### 2. Clips (when the plan has `media` scenes)
Write each clip into `projects/<slug>/clips/` following `references/clip-recipes.md`.
Text inside clips must read at phone size: ≥ 44 px for body text in an 820×780 box.

### 3. Run
```
tools/run.sh <slug> validate        # free, fix every ✗ before spending a voice request
tools/run.sh <slug> voice           # ONE Gemini request (free tier ~10/day) → timings
                                    # RESPLIT=1 re-splits the saved take; RETAKE=1 spends a new request
tools/run.sh <slug> clips assemble check stills
```
- `voice` prints `BEAT WORDS NOT SPOKEN` if a beat word was misheard. Fix the beat word, not the voice.
- Total over the format budget? Shorten lines and `RETAKE=1 tools/run.sh <slug> voice`.
  Never speed up the voice.

### 4. QA (look, don't assume)
Read `projects/<slug>/out/stills.png` (2 frames per scene, safe-zone guides) and check:
- Nothing in the right 12 % or the bottom 20 % except captions; the main visual sits in the band.
- Every text is readable at phone size; no wrapped terminal lines; no clipped words.
- Captions match the voice; keywords coloured, not every word.
- Clips fill their box; no letterbox stretch; no blank tail longer than ~1 s; no visible box around a clip; zero `OVERLAP` warnings from the clip build.
- `qa` motion: no scene sits still for more than 2.5 s.
- `check` reports 0 errors and all contrast checks pass. (`nested_structure_needs_subcomposition`
  warnings on caption cards are Studio-display only; ignore them.)
Fix, re-run `assemble check stills`, look again.

### 5. Render and hand over
`tools/run.sh <slug> render qa` → `studio/projects/<slug>/out/<slug>.mp4`, copied to `shorts/` with
an MP3-audio copy in `shorts/play-on-this-pc/`. `qa` is the render eval (format, voice-led timing, −14 LUFS ±1,
true peak ≤ −1 dBTP, no audio dropouts, caption sync data). It must report all ✓ before handover.
**Post-ready gate (all must hold before saying a video is ready):**
1. `qa` all ✓ (format, timing, loudness, peak, dropouts, captions, audio = script, motion).
2. `out/review.png`: every scene reads at phone size; nothing empty at a scene start; nothing off the grid.
3. `out/transitions.png`: no broken in-between frames (scrambled glyphs, half-faded overlaps, clipped text) at any scene change.
4. Design: every visual is built from the design system (solid chips, display headlines, `motion_kit` illustrations),
   not raw text; the art direction's metaphor is actually on screen.
5. No sources on screen; the description lists all of them. No two boxes touch (the clip build prints `OVERLAP` lines; every one must be fixed).
6. The user watches and listens (voice, music, feel). I can't hear audio or feel motion, so I never call a video
   "ready" without their pass; I call it "ready for your review".

**Then review the real MP4, not just the previews:** read `out/review.png` (a frame every 1.5 s of the
render) and check every scene: nothing empty at a scene start (assemble also warns), every reveal lands on its
word and stays up ≥ 1 s, the payoff holds long enough to read. Fix with beat words / `offset` / per-scene
`pad`, then re-render. Never tell the user it's reviewed unless you looked at review.png.
Report the path, duration and anything left unverified.

## Guardrails
- **No paid models or APIs.** The voice is the Gemini free tier only. On a daily-quota error, `voice` stops
  (it never switches to a paid service). Then tell the user, and offer their own recording (`voice/sNN.wav`).
- **Quota discipline:** run `validate` before `voice`; one take per script; `RESPLIT=1` to fix a split
  without a new request.
- **Secrets:** the key is read from `.env` and never printed, logged or written into project files.
- **Visual honesty:** illustrative UIs say "illustrative". No logos, real people's likenesses, or other
  creators' frames inside our videos.
- **Gates:** `validate`, `check` and `qa` exit non-zero on failure. Never render or hand over past a red gate.

## Rules that never bend
- **Everything reusable goes into the shared layer** (`studio/tools/`, `studio/tools/manim_lib/motion_kit.py`,
  `studio/templates/`, this skill's references). A project's `clips/` hold only topic data and span
  choreography. If you write a new motion idea, write it as a `motion_kit` primitive and catalogue it in
  `references/clip-recipes.md`.
- No paid models or paid APIs. Gemini TTS free tier, one request per video.
- The voice leads: scene length = voice + pad. Visual beats fire on spoken words.
- No brand logos or other creators' visuals. Illustrative UIs say "illustrative".
- No trivia in the visuals either (dates, venues, HQs).
- If the user records their own voice, put `voice/sNN.wav` files in the project; `voice` uses them.

## Learning loop
When the user reviews a video, add the lesson to `.claude/skills/video-scripter/references/learnings.md`
(script/visual lessons) and update `references/scene-catalog.md` or `clip-recipes.md` if it changes
how scenes are built.
