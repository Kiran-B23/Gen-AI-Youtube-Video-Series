#!/usr/bin/env bash
# Studio pipeline: tools/run.sh <slug> <step...>
#   validate  static check of scenes.json (types, props, beat words, clip files, length)
#   voice     Gemini single take (or your recordings) -> clean -> Whisper timings
#   clips     render Manim / Playwright / VHS clips the scenes ask for
#   assemble  scenes.json + timings -> HyperFrames project (hf/) + audio mix
#   check     HyperFrames lint/layout/contrast checks
#   stills    contact sheet of every scene's middle frame -> out/stills.png
#   qa        eval of the rendered MP4 (format, timing, loudness, dropouts, caption data); fails loudly
#   render    MP4 -> out/<slug>.mp4 (+ MP3-audio copy for this PC) and copies to ../shorts/
#   new       new project from the template: tools/run.sh <slug> new
#   all       validate voice clips assemble check render qa
# RETAKE=1 asks Gemini for a new take; RESPLIT=1 re-splits the saved take (no request).
set -euo pipefail
STUDIO="$(cd "$(dirname "$0")/.." && pwd)"; SLUG="$1"; shift
P="$STUDIO/projects/$SLUG"; PY="$STUDIO/.venv/bin/python"; HFV="hyperframes@0.8.143"
steps=("$@"); [ "${steps[0]:-}" = "all" ] && steps=(validate voice clips assemble check render qa)
for step in "${steps[@]}"; do
  echo "── $step"
  case "$step" in
    new)      [ -e "$P" ] && { echo "$P exists"; exit 1; }; cp -r "$STUDIO/templates/project" "$P"; sed -i "s/__SLUG__/$SLUG/" "$P/scenes.json"; echo "created projects/$SLUG" ;;
    validate) "$PY" "$STUDIO/tools/validate.py" "$SLUG" ;;
    voice)    "$PY" "$STUDIO/tools/voice.py" "$SLUG" ${RETAKE:+--retake} ${RESPLIT:+--resplit} ;;
    clips)    "$PY" "$STUDIO/tools/build_clips.py" "$SLUG" ;;
    assemble) "$PY" "$STUDIO/tools/assemble.py" "$SLUG" ;;
    check)    out=$(cd "$P/hf" && npx --yes "$HFV" check 2>&1 | grep -v "npm warn"); echo "$out" | tail -25
              echo "$out" | grep -q "Check passed" || { echo "✗ HyperFrames check failed: fix before rendering"; exit 1; } ;;
    qa)       "$PY" "$STUDIO/tools/qa_video.py" "$SLUG" ;;
    stills)   "$PY" "$STUDIO/tools/stills.py" "$SLUG" ;;
    render)   mkdir -p "$P/out"; (cd "$P/hf" && npx --yes "$HFV" render -o "$P/out/$SLUG.mp4" -q delivery 2>&1 | grep -v "npm warn" | tail -4)
              mkdir -p "$STUDIO/../shorts/play-on-this-pc"; cp "$P/out/$SLUG.mp4" "$STUDIO/../shorts/$SLUG.mp4"
              ffmpeg -v error -y -i "$P/out/$SLUG.mp4" -c:v copy -c:a libmp3lame -b:a 256k "$STUDIO/../shorts/play-on-this-pc/$SLUG-mp3audio.mp4"
              ffprobe -v error -show_entries format=duration -of csv=p=0 "$P/out/$SLUG.mp4" | xargs -I{} echo "rendered {}s -> shorts/$SLUG.mp4" ;;
    *) echo "unknown step $step"; exit 1 ;;
  esac
done
