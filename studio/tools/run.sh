#!/usr/bin/env bash
# Studio pipeline: tools/run.sh <slug> <step...>
#   validate  static check of scenes.json (types, props, beat words, clip files, length)
#   voice     Gemini single take (or your recordings) -> clean -> Whisper timings
#   clips     render Manim / Playwright / VHS clips the scenes ask for
#   assemble  scenes.json + timings -> HyperFrames project (hf/) + audio mix
#   check     HyperFrames lint/layout/contrast checks
#   payoffs   plan vs composition, before any render: every beat's element is on screen on its word, captions ≤ 2 lines,
#             nothing planned sits still > 2.5 s (tools/payoffs.mjs -> out/payoffs.json; qa refuses a stale one)
#   preview   HyperFrames Studio in the browser (scrub the timeline, select an element and tell Claude what to change)
#   stills    contact sheet of every scene's middle frame -> out/stills.png
#   render    MP4 -> out/<slug>.mp4 only (nothing reaches shorts/ until `deliver`)
#   qa        eval of the rendered MP4 (format, timing, loudness, pace, payoffs, captions, music bed…) -> out/qa.json; fails loudly
#   watch     watch the render end to end: 2 fps contact sheets (out/watch/) + transcript, unclear words, pauses, pace -> out/watch.json
#   review    merge every ✗ from qa/payoffs/watch into projects/<slug>/review.md (the fix list; add your own rows)
#   deliver   copy to ../shorts/ (+ MP3-audio copy for this PC) ONLY when qa.json is clean for this MP4, payoffs.json is
#             clean for this composition, watch.json exists, and review.md has no open row and is ticked "Watched end to end"
#   new       new project from the template: tools/run.sh <slug> new
#   remotion  OPTIONAL second engine (personal use; Remotion's free licence covers individuals): render the same project
#             (layout.json + mix.wav from assemble) with React stage projects/<slug>/remotion/Stage.tsx
#             -> out/<slug>-remotion.mp4 only. Then: RM=1 qa watch review, RM=1 deliver.
#   benchmark the render against references/benchmark.json (the reference reel + the Instagram references): pace, still-%, cuts/min
#   remotion-studio  Remotion Studio for the same project (scrub the timeline in the browser)
#   all       validate voice clips assemble check payoffs render qa watch review   (then: fix, re-run, deliver)
# RETAKE=1 asks Gemini for a new take; RESPLIT=1 re-splits the saved take (no request).
set -euo pipefail
export PATH="$HOME/.local/bin:$HOME/.local/node/bin:$PATH"
STUDIO="$(cd "$(dirname "$0")/.." && pwd)"; SLUG="$1"; shift
P="$STUDIO/projects/$SLUG"; PY="$STUDIO/.venv/bin/python"; HFV="hyperframes@0.8.143"
steps=("$@"); [ "${steps[0]:-}" = "all" ] && steps=(validate voice clips assemble check payoffs render qa watch review)
for step in "${steps[@]}"; do
  echo "── $step"
  case "$step" in
    new)      [ -e "$P" ] && { echo "$P exists"; exit 1; }; cp -r "$STUDIO/templates/project" "$P"; sed -i "s/__SLUG__/$SLUG/" "$P/scenes.json"; echo "created projects/$SLUG" ;;
    validate) "$PY" "$STUDIO/tools/validate.py" "$SLUG" ;;
    voice)    "$PY" "$STUDIO/tools/voice.py" "$SLUG" ${RETAKE:+--retake} ${RESPLIT:+--resplit} ;;
    clips)    "$PY" "$STUDIO/tools/build_clips.py" "$SLUG" ;;
    assemble) "$PY" "$STUDIO/tools/assemble.py" "$SLUG" ;;
    check)    grep -q '"engine": *"remotion"' "$P/scenes.json" && { echo "engine remotion: no HyperFrames check (use remotion + RM=1 qa watch)"; continue; }
              out=$(cd "$P/hf" && npx --yes "$HFV" check 2>&1 | grep -v "npm warn") || true; { echo "$out" | grep "✗" || true; } | head -20; echo "$out" | tail -8
              echo "$out" | grep -q "Check passed" || { echo "✗ HyperFrames check failed: fix before rendering"; exit 1; } ;;
    payoffs)  grep -q '"engine": *"remotion"' "$P/scenes.json" && { echo "engine remotion: no DOM to check (image-mode payoffs come with qa RM=1)"; continue; }
              node "$STUDIO/tools/payoffs.mjs" "$SLUG" ;;
    qa)       "$PY" "$STUDIO/tools/qa_video.py" "$SLUG" ${RM:+"$P/out/$SLUG-remotion.mp4"} ;;
    watch)    "$PY" "$STUDIO/tools/watch.py" "$SLUG" ${RM:+"$P/out/$SLUG-remotion.mp4"} 2>&1 | grep -v -i "warn"; [ "${PIPESTATUS[0]}" = 0 ] ;;
    review)   "$PY" "$STUDIO/tools/review.py" "$SLUG" ;;
    benchmark) "$PY" "$STUDIO/tools/benchmark.py" "$SLUG" ${RM:+"$P/out/$SLUG-remotion.mp4"} ;;
    deliver)  F="$P/out/$SLUG${RM:+-remotion}.mp4"; [ -f "$F" ] || { echo "no $F: render first"; exit 1; }
              "$PY" "$STUDIO/tools/deliver_check.py" "$SLUG" "$F" "${RM:-}" || exit 1
              "$PY" "$STUDIO/tools/review.py" "$SLUG" --check || { echo "✗ review.md has open findings or is not ticked 'Watched end to end': fix, re-run, tick, then deliver"; exit 1; }
              mkdir -p "$STUDIO/../shorts/play-on-this-pc"; cp "$F" "$STUDIO/../shorts/$(basename "$F")"
              ffmpeg -v error -y -i "$F" -c:v copy -c:a libmp3lame -b:a 256k "$STUDIO/../shorts/play-on-this-pc/${SLUG}${RM:+-remotion}-mp3audio.mp4"
              echo "delivered -> shorts/$(basename "$F") (ready for your review: watch and listen on a phone)" ;;
    stills)   "$PY" "$STUDIO/tools/stills.py" "$SLUG" ;;
    preview)  (cd "$P/hf" && npx --yes "$HFV" preview --background --port "${PORT:-3002}" 2>&1 | grep -v "npm warn" | tail -4)
              echo "open http://localhost:${PORT:-3002} · selection for Claude: (cd $P/hf && npx $HFV preview --selection --json)" ;;
    render)   mkdir -p "$P/out"; (cd "$P/hf" && npx --yes "$HFV" render -o "$P/out/$SLUG.mp4" -q delivery 2>&1 | grep -v "npm warn" | tail -4)
              ffprobe -v error -show_entries format=duration -of csv=p=0 "$P/out/$SLUG.mp4" | xargs -I{} echo "rendered {}s -> out/$SLUG.mp4 (qa, watch, review, then deliver)" ;;
    remotion|remotion-studio)
              RMD="$STUDIO/remotion"; [ -f "$P/remotion/Stage.tsx" ] || { echo "no $P/remotion/Stage.tsx (write the React stage first; see remotion/README.md)"; exit 1; }
              [ -f "$P/build/layout.json" ] && [ -f "$P/hf/assets/mix.wav" ] || { echo "run assemble first (it writes layout.json + mix.wav)"; exit 1; }
              [ -d "$RMD/node_modules" ] || (cd "$RMD" && npm install --no-audit --no-fund)
              mkdir -p "$RMD/public/fonts"; cp "$STUDIO/templates/reel/fonts/"{Anton,Inter,JetBrainsMono}.ttf "$RMD/public/fonts/"; cp "$P/hf/assets/mix.wav" "$RMD/public/mix.wav"
              printf '// generated by tools/run.sh %s remotion: the project this render uses\nimport layout from "../../projects/%s/build/layout.json";\nimport Stage from "../../projects/%s/remotion/Stage";\nimport type { Layout } from "./engine/types";\nconst L = layout as unknown as Layout;\nexport { L as layout, Stage };\nexport const slug = "%s";\n' "$SLUG" "$SLUG" "$SLUG" "$SLUG" > "$RMD/src/current.generated.ts"
              if [ "$step" = remotion-studio ]; then (cd "$RMD" && npx remotion studio src/index.ts); continue; fi
              mkdir -p "$P/out"; (cd "$RMD" && npx remotion render src/index.ts Reel "$P/out/$SLUG-remotion.mp4" --codec h264 --crf 18 --audio-codec aac --audio-bitrate 256k --log error)
              ffprobe -v error -show_entries format=duration -of csv=p=0 "$P/out/$SLUG-remotion.mp4" | xargs -I{} echo "rendered {}s (Remotion) -> out/$SLUG-remotion.mp4 (RM=1 qa watch review, then RM=1 deliver)" ;;
    *) echo "unknown step $step"; exit 1 ;;
  esac
done
