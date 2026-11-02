#!/usr/bin/env bash
# After `kaggle.sh fetch i2v-camera-test experiments/i2v-camera-test/results`: contact sheets + phone previews, ffmpeg only.
#   results/sheets/<clip>.png   6 evenly spaced frames per clip, first frame = the input still's moment
#   out/camera-preview.mp4      Set A, 1080x1920: each still's two seeds back to back
#   out/length-preview.mp4      Set B, 1080x1920: 49 -> 81 -> 121 frames for s04, then s05
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
A=(); for s in s01 s03 s04 s05 s07 s08; do A+=("A-$s-1234" "A-$s-42"); done
concat "$D/out/camera-preview.mp4" "${A[@]}"
concat "$D/out/length-preview.mp4" A-s04-1234 B-s04-f81 B-s04-f121 A-s05-1234 B-s05-f81 B-s05-f121
