# shorts-studio

Data-driven Remotion engine for 1080×1920 explainer Shorts, built for the `shorts-video` skill
(`.claude/skills/shorts-video/`). **Code is written once; each video is data** in `videos/<slug>/`:

```
videos/<slug>/
  script.md     one spoken line per scene (### s01: …)
  video.json    scene types, props, word-triggered beats, parts
  voice/        s01.m4a … your recordings (raw, never modified)
  build/        cleaned clips + Whisper word timings (generated)
```

## Commands (run inside shorts-studio/)
| | |
|---|---|
| `npm run setup` | one time: Node deps + `.venv` (Whisper, ffmpeg, loudness) |
| `npm run new <slug>` | scaffold a new video folder |
| `npm run voice <slug>` | clean voice, Whisper timings, durations (fails over 180s). `-- --web-voice` = temporary Emma voice |
| `npm run still <slug>` | stills: middle + 85% of every scene, every transition → `out/stills/` + contact sheets |
| `npm run preview` | Remotion Studio (includes a `catalog` composition showing every scene type) |
| `npm run render <slug>` | render every part, master to −14 LUFS / −1 dBTP → `../shorts/<slug>.mp4` (+ MP3-audio copy) |
| `npm run audio` | regenerate the synthesized music beds and SFX in `public/` |

## Engine
- `engine/theme/presets.ts`: `editorial` (flat pages: ink / royal / paper / sunflower; Anton + Inter Tight + JetBrains Mono), `neonNight`, `dayToNight`
- `engine/core/`: beat resolver (`useBeats`), captions (left-aligned karaoke), scene shell (voice, step header, chapter intro, beat actions), editorial blocks
- `engine/scenes/`: title-hook, running-example, chapter-card, big-counter, mechanism-step (token-loop / one-pass / gate), token-strip, lookup-table, side-by-side-variants, big-stamp, equation, checklist, code-card, recap-card
- Scene length = voice clip + 0.3 s; transitions overlap by exactly 0.3 s (no blank frames; page changes are colour wipes)

Videos so far: `jev-explained` (6 steps), `laya-explained` (4 steps). Both use a temporary web voice; drop your
recordings into `voice/` and re-run `npm run voice` + `npm run render`.
