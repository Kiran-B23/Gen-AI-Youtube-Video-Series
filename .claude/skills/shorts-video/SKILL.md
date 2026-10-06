---
name: shorts-video
description: Produce vertical YouTube Shorts / Instagram Reels explainer videos (AI news, tech launches, product breakdowns) with Remotion, a human voiceover, synced captions and vibrant motion graphics. Use this skill whenever the user asks to make, script, plan, fix, re-render or review a short, reel, explainer video or "video about X", even if they don't mention Remotion. The core rule of this skill is that videos are built from a reusable scene engine driven by a video.json file, so Claude writes content and data for each new video instead of writing new animation code from scratch.
---

# Shorts Video Producer

This skill turns a topic into a finished 1080x1920 explainer Short. The main
idea: **code is written once, videos are written as data.** A reusable Remotion
"engine" in this project holds every scene type, the caption system, the voice
pipeline and the render scripts. Each new video is only a folder under
`videos/<slug>/` containing `script.md`, `video.json` and voice recordings.

Why this matters: writing fresh React code for every video is slow, produces
new bugs each time (missing caption spaces, blank frames between scenes,
tiny text), and makes every video look different. Reusing tested scene
components means each new video takes minutes, looks consistent with the
channel brand, and inherits every fix ever made.

## Step 0: Check which mode you are in

Look for `engine/` and `videos/` folders and a `package.json` with the scripts
`voice`, `preview` and `render` in the current project.

- **Engine missing** → read `references/engine-architecture.md` and build the
  engine first (Mode A). If older one-off video projects exist (for example
  `jev-short/` or `dots-short/`), harvest their working components into the
  engine instead of starting from zero.
- **Engine present** → Mode B (make a video). Do not write new scene code
  unless the video truly needs a visual that no existing scene type can show.

## Mode B: Making a video (the normal path)

Work through these stages in order and show the user the output of stages 2
and 3 before moving on, because changing words is cheap and changing a render
is expensive.

### 1. Research
- Search the web for the topic. Prefer official announcements, docs and help
  centers, then reputable coverage. Note the date of every fact.
- Collect: what it is, why people care, a real story or example, who it's for,
  limitations/catches, the bigger picture, and anything that answers the
  viewer's obvious worry (safety, price, availability in their country).
- Label every number by source type: company claim vs independent test.

### 2. Script (`videos/<slug>/script.md`)
Choose the format first. "How does X work" topics use **Format B (teaching
explainer)** with the **editorial** theme preset, which is this channel's
preferred look. Launch/news/hype topics use the news format, and may use the
editorial preset or a topic preset. Read `references/script-writing.md`
before writing. Key rules:
- Spoken, conversational lines, one line per scene (`s01`, `s02`...).
- Hook in the first sentence, a sticky one-line comparison, a relatable
  story, "what would YOU do with it", the honest catch, a big-picture payoff,
  and a CTA question that invites comments.
- Word budget: about 2.8 spoken words per second. Hard cap 180 seconds total
  (≈ 480 words). Target 130 to 170 seconds unless the user asks otherwise.

### 3. Storyboard (`videos/<slug>/video.json`)
Read `references/scene-catalog.md` and `references/video-json.md`. For the
editorial preset, read its section in `references/style-guide.md` first. Map every
script line to a scene type with props and word-triggered beats. Pick a theme
preset from `references/style-guide.md` (or add a new preset to the theme
file, never hard-code colors in scenes).

Show the user a compact table: scene id, scene type, what appears on screen.

### 4. Voice
Follow `references/voice-pipeline.md`:
1. Use the user's recordings in `videos/<slug>/voice/` if present.
2. Else, if `ELEVENLABS_API_KEY` is set, generate natural, energetic lines.
3. Else stop and ask the user to record. Never use basic or system TTS; the
   user has explicitly rejected robotic voices.
Then run `npm run voice <slug>` (cleanup, loudness, Whisper word timings).

### 5. Preview, don't render
Tell the user to run `npm run preview` (Remotion Studio) to watch and scrub
live. Render stills for self-checks with `npx remotion still`. Only render
the full MP4 once the user is happy, because full renders are the slowest
part of the loop.

### 6. Verify, then render
Run the checklist in `references/qa-checklist.md`. Fix problems in
`video.json` first; only touch engine code for genuine engine bugs, and when
you do, the fix benefits every future video. Then `npm run render <slug>`.

## Mode A: Building the engine (one time)

Read `references/engine-architecture.md` and build it exactly as described.
Harvest working pieces from previous projects. Finish by recreating one
previous video purely from a `video.json` to prove the engine works.

## Non-negotiables

- **No robotic voice.** Human recordings or a natural premium voice only.
- **IP safety.** No company logos, wordmarks, mascots or official characters,
  no real people's likenesses, no real app logos (use generic icons with text
  labels), no copyrighted music. Product names appear only as styled text.
- **Honesty.** Company claims are labeled as claims; every number carries a
  small source pill. Include the catch or limitations, which also makes the
  creator more trustworthy.
- **Shorts constraints.** 1080x1920, 30fps, ≤ 180s, safe zones (nothing
  important in the bottom 20% or right 12%), minimum 40px text, no blank
  frames between scenes, first frame must already show the hook.

## Reference files

- `references/engine-architecture.md`: folder layout, components, scripts (Mode A)
- `references/scene-catalog.md`: every scene type, its props and when to use it
- `references/video-json.md`: the video.json format with a full example
- `references/style-guide.md`: theme presets, typography, captions, motion rules
- `references/script-writing.md`: how to write scripts that hold attention
- `references/voice-pipeline.md`: recording, cleanup, Whisper sync, ducking
- `references/qa-checklist.md`: checks before any render
- `assets/example-video.json`: a complete working example to copy from
