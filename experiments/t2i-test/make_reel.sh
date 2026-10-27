#!/usr/bin/env bash
# Stitch the 8 AI stills into a 1080x1920 test reel with plain ffmpeg.
# Standalone on purpose: it doesn't use or change the studio pipeline (run.sh / assemble.py).
#
#   experiments/t2i-test/make_reel.sh [images_dir] [music_name]
#   images_dir  defaults to experiments/t2i-test/images/reel  (sNN.png from the notebook zip)
#   music_name  defaults to fresh-focus (read in place from studio/templates/reel/audio/music/cc0/)
set -euo pipefail
export PATH="$HOME/.local/bin:$PATH"

HERE="$(cd "$(dirname "$0")" && pwd)"
REPO="$(cd "$HERE/../.." && pwd)"
IMG_DIR="${1:-$HERE/images/reel}"
MUSIC="$REPO/studio/templates/reel/audio/music/cc0/${2:-fresh-focus}.mp3"
OUT="$HERE/out"; TMP="$OUT/tmp"
SHOT=3.5; XF=0.5; FPS=30          # seconds per shot, crossfade length, frame rate

mapfile -t IMGS < <(ls "$IMG_DIR"/s[0-9][0-9].png 2>/dev/null | sort)
[ "${#IMGS[@]}" -ge 2 ] || { echo "Need at least 2 sNN.png in $IMG_DIR"; exit 1; }
[ -f "$MUSIC" ] || { echo "Music not found: $MUSIC"; exit 1; }
mkdir -p "$TMP" "$OUT/sheets"; rm -f "$TMP"/*.mp4 "$OUT/sheets"/*.png

# 1. One Ken Burns clip per still; moves alternate push in / pull out / pan left / pan right.
#    Upscaled 2x before zoompan so the slow move doesn't jitter.
FR=$(awk "BEGIN{print int($SHOT*$FPS)}")
MOVES=(
  "z='1+0.10*on/$FR':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2'"
  "z='1.10-0.10*on/$FR':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2'"
  "z='1.08':x='(iw-iw/zoom)*on/$FR':y='ih/2-ih/zoom/2'"
  "z='1.08':x='(iw-iw/zoom)*(1-on/$FR)':y='ih/2-ih/zoom/2'"
)
for i in "${!IMGS[@]}"; do
  ffmpeg -v error -y -loop 1 -i "${IMGS[$i]}" -frames:v "$FR" \
    -vf "scale=2160:3840:flags=lanczos,zoompan=${MOVES[$((i % 4))]}:d=$FR:s=1080x1920:fps=$FPS,format=yuv420p" \
    -c:v libx264 -crf 18 -preset medium "$TMP/$(printf 'c%02d' "$i").mp4"
done

# 2. Chain crossfades between the clips.
INPUTS=(); FILTER=""; PREV="0:v"; OFF=0
for i in "${!IMGS[@]}"; do INPUTS+=(-i "$TMP/$(printf 'c%02d' "$i").mp4"); done
for ((i = 1; i < ${#IMGS[@]}; i++)); do
  OFF=$(awk "BEGIN{print $OFF + $SHOT - $XF}")
  FILTER+="[$PREV][$i:v]xfade=transition=fade:duration=$XF:offset=$OFF[v$i];"; PREV="v$i"
done
TOTAL=$(awk "BEGIN{print ${#IMGS[@]}*$SHOT - (${#IMGS[@]}-1)*$XF}")
FADE_AT=$(awk "BEGIN{print $TOTAL - 1.5}")

# 3. Add the CC0 music bed (trimmed, faded in and out) and write the reel.
ffmpeg -v error -y "${INPUTS[@]}" -i "$MUSIC" \
  -filter_complex "${FILTER}[$((${#IMGS[@]})):a]atrim=0:$TOTAL,afade=t=in:d=0.5,afade=t=out:st=$FADE_AT:d=1.5,volume=0.8[a]" \
  -map "[$PREV]" -map "[a]" -c:v libx264 -crf 18 -preset medium -pix_fmt yuv420p -r $FPS \
  -c:a aac -b:a 192k -movflags +faststart -t "$TOTAL" "$OUT/t2i-test.mp4"

# 4. 2 fps contact sheets (12 frames each) to review every moment, like the studio `watch` rule.
ffmpeg -v error -y -i "$OUT/t2i-test.mp4" -vf "fps=2,scale=270:480,tile=6x2:padding=4:color=white" \
  "$OUT/sheets/sheet_%02d.png"

rm -rf "$TMP"
echo "Reel: $OUT/t2i-test.mp4 (${TOTAL}s)"
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate -show_entries format=duration -of compact "$OUT/t2i-test.mp4"
echo "Sheets: $(ls "$OUT/sheets" | wc -l) in $OUT/sheets"
