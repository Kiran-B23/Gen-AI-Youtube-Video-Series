#!/usr/bin/env bash
# After `kaggle.sh fetch i2v-depth-test experiments/i2v-depth-test/results`: contact sheets + phone previews, ffmpeg only.
#   results/sheets/stills.png   the 4 FLUX depth stills side by side
#   results/sheets/<clip>.png   6 evenly spaced frames per clip, first frame = the input still's moment
#   out/camera-preview.mp4      Set A, 1080x1920: d1-d4 back to back
#   out/length-preview.mp4      Set B, 1080x1920: 49 -> 81 frames for d1, then d3
set -euo pipefail
D="$(cd "$(dirname "$0")" && pwd)"; R="$D/results"; mkdir -p "$R/sheets" "$D/out"
[ -d "$R/clips" ] || { echo "no $R/clips: fetch first"; exit 1; }

for c in "$R"/clips/*.mp4; do
  id="$(basename "$c" .mp4)"
  n="$(ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of csv=p=0 "$c")"
  step=$(( (n - 1) / 5 ))
  ffmpeg -v error -y -i "$c" -vf "select='not(mod(n\,$step))',scale=240:416,tile=6x1:padding=4:color=white" -frames:v 1 "$R/sheets/$id.png"
  printf '%-12s %4s frames  %s\n' "$id" "$n" "$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate -of csv=p=0 "$c")"
done

concat() {   # concat <out.mp4> <clip ids...>: upscale to 1080x1920 30 fps, join with hard cuts
  local out="$1"; shift; local in=() f="" i=0
  for id in "$@"; do [ -f "$R/clips/$id.mp4" ] || continue
    in+=(-i "$R/clips/$id.mp4"); f+="[$i:v]scale=1080:1920:flags=lanczos,fps=30,setsar=1[v$i];"; i=$((i + 1)); done
  [ "$i" -gt 0 ] || return 0
  for ((k = 0; k < i; k++)); do f+="[v$k]"; done
  ffmpeg -v error -y "${in[@]}" -filter_complex "${f}concat=n=$i:v=1:a=0[o]" -map "[o]" -c:v libx264 -crf 18 -pix_fmt yuv420p "$out"
  echo "wrote $out ($i clips)"
}
ls "$R"/flux/d?.png >/dev/null 2>&1 && ffmpeg -v error -y -pattern_type glob -i "$R/flux/d?.png" \
  -vf "scale=360:640,tile=4x1:padding=4:color=white" -frames:v 1 "$R/sheets/stills.png"
concat "$D/out/camera-preview.mp4" A-d1-1234 A-d2-1234 A-d3-1234 A-d4-1234
concat "$D/out/length-preview.mp4" A-d1-1234 B-d1-f81 A-d3-1234 B-d3-f81
