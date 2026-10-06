# Engine architecture (Mode A, built once)

Goal: one Remotion project that can render any number of Shorts from data.
After this is built, a new video should never need new React code unless a
genuinely new visual type is required.

## Prerequisite

Recommend the user installs Remotion's official Claude Code plugin, which
bundles Remotion's best-practice Agent Skills (timing, audio, captions,
assets):

```
claude plugin marketplace add remotion-dev/claude-code-plugin
claude plugin install remotion@remotion
```

(Alternative: `npx skills add remotion-dev/skills`.) Use those skills for
Remotion API correctness; use this skill for workflow, style and content.

## Folder layout

```
shorts-studio/
├── package.json            # scripts: voice, preview, render, still, new
├── remotion.config.ts
├── engine/
│   ├── Root.tsx            # registers one <Composition> per videos/<slug>
│   ├── Video.tsx           # reads video.json, builds a TransitionSeries
│   ├── theme/
│   │   ├── presets.ts      # neonNight, dayToNight, ... (colors, gradients)
│   │   └── tokens.ts       # font sizes, spacing, safe zones, radii
│   ├── core/
│   │   ├── AnimatedCaption.tsx   # word-synced captions from vo-timings
│   │   ├── Background.tsx        # animated gradient + orbs/particles
│   │   ├── ProgressBar.tsx
│   │   ├── SourcePill.tsx
│   │   ├── useBeat.ts            # returns frame when a spoken word occurs
│   │   └── SafeArea.tsx
│   ├── scenes/             # one file per scene type in scene-catalog.md
│   └── audio/
│       └── AudioMix.tsx    # voice per scene + ducked music + SFX
├── scripts/
│   ├── new-video.mjs       # scaffolds videos/<slug>/ from the example
│   ├── voice.mjs           # cleanup + loudnorm + Whisper → timings.json
│   ├── durations.mjs       # prints per-scene and total duration
│   └── render.mjs          # renders out/<slug>.mp4 (+ part splits)
├── public/
│   ├── music/              # royalty-free tracks the user adds
│   └── sfx/                # whoosh.mp3, pop.mp3, ding.mp3, stamp.mp3
└── videos/
    └── <slug>/
        ├── script.md
        ├── video.json
        ├── voice/          # s01.m4a ... raw recordings
        └── build/          # cleaned audio, timings.json (generated)
```

## Key behaviors

**Data-driven sequencing.** `Video.tsx` maps each scene in `video.json` to
its component by `type`, wraps it in a `TransitionSeries.Sequence` whose
duration is `voiceDuration + 0.3s`, and inserts overlapping transitions
(~10 frames) so a blank frame is impossible.

**Word beats.** `useBeat(sceneId, "word")` looks up the word's timestamp in
`build/timings.json` (fuzzy match, case-insensitive) and returns the local
frame. Scenes animate elements relative to these frames, so visuals react to
speech without any manual timing.

**Captions.** `AnimatedCaption` groups words into 2 to 4 word cards, renders
spaces as separate non-scaling spans (prevents the "questionsgo" bug), keeps
all words white and highlights only the active word.

**Multiple outputs.** `video.json` may define `parts` (arrays of scene ids)
so the same scenes render as a full video plus separate Part 1 / Part 2.

**Themes.** Scenes read colors only from the active theme preset.

## package.json scripts

```
"new":     "node scripts/new-video.mjs",          // npm run new <slug>
"voice":   "node scripts/voice.mjs",              // npm run voice <slug>
"preview": "remotion studio engine/index.ts",
"still":   "node scripts/stills.mjs",             // mid-frame of every scene
"render":  "node scripts/render.mjs"              // npm run render <slug>
```

## Harvesting old projects

If `jev-short/` or `dots-short/` exist, move their good parts into the engine:
the caption fix, overlapping transitions, race bars, counters, stamp, chips,
code card, carousel, timeline, rules panel, voice/ducking code. Convert each
one-off scene into a generic scene type with props. Then recreate one old
video as `videos/<slug>/video.json` and confirm it renders identically.

## Definition of done

1. `npm run new test-video` scaffolds a folder from `assets/example-video.json`.
2. `npm run preview` shows every scene type in a "catalog" composition with
   placeholder data, so the user can see all available scenes.
3. One previous video re-rendered from data only.
