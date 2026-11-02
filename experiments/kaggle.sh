#!/usr/bin/env bash
# Push, poll and fetch a private Kaggle GPU notebook (T4 x2) through Composio (Kaggle account linked there).
#   kaggle.sh push   <notebook.ipynb> <slug>   new kernel, or a new version if harryjerry/<slug> exists; runs at once
#   kaggle.sh status <slug>                    queued | running | complete | error (+ failure message)
#   kaggle.sh fetch  <slug> <dest>             download the output zip, unzip into <dest> (inner *-results.zip too)
#   kaggle.sh watch  <experiment_dir>          live progress -> <dir>/progress.json until the run ends (push starts it)
# GPU=0 pushes a CPU-only kernel (tests). Live progress: a notebook built with kaggle_progress.py holds __PROGRESS_TOPIC__;
# push swaps in a fresh random ntfy.sh topic, writes progress.json and starts watch in the background.
# Spends Kaggle GPU quota on push: only when the owner asked for the run. KAGGLE_CONFIG_INIT is not used (fails in Composio's sandbox).
set -euo pipefail
KUSER="${KAGGLE_USER:-harryjerry}"
cmd="${1:-}"; shift || true

case "$cmd" in
  push)
    nb="$1"; slug="$2"; dir="$(cd "$(dirname "$nb")" && pwd)"; body="$(mktemp --suffix=.json)"; trap 'rm -f "$body"' EXIT
    topic=""; grep -q '__PROGRESS_TOPIC__' "$nb" && topic="studio-$(head -c 12 /dev/urandom | od -An -tx1 | tr -d ' \n')"
    gpu=true; [ "${GPU:-1}" = 0 ] && gpu=false
    jq -n --rawfile text "$nb" --arg slug "$KUSER/$slug" --arg topic "$topic" --argjson gpu "$gpu" '{
      slug: $slug, newTitle: ($slug | split("/")[1]), text: (if $topic != "" then ($text | gsub("__PROGRESS_TOPIC__"; $topic)) else $text end),
      language: "python", kernelType: "notebook", isPrivate: true, enableGpu: $gpu, enableInternet: true,
      datasetDataSources: [], competitionDataSources: [], kernelDataSources: [], modelDataSources: [], categoryIds: []}
      + (if $gpu then {machineShape: "NvidiaTeslaT4"} else {} end)' > "$body"
    out="$(composio proxy https://www.kaggle.com/api/v1/kernels/push --toolkit kaggle -X POST -H "content-type: application/json" -d @"$body")"
    echo "$out"
    echo "$out" | jq -e '(.data // .) | (.hasError // false) | not' >/dev/null 2>&1 || { echo "push failed"; exit 1; }
    echo; echo "pushed: https://www.kaggle.com/code/$KUSER/$slug"
    if [ -n "$topic" ]; then   # progress.json is git-ignored: it holds the topic
      jq -n --arg slug "$slug" --arg topic "$topic" --arg t "$(date -u +%FT%TZ)" \
        '{slug: $slug, topic: $topic, pushed_at: $t, status: "queued", status_at: $t, checked_at: $t, events: []}' > "$dir/progress.json"
      setsid "$0" watch "$dir" > "$dir/.watch.log" 2>&1 < /dev/null &
      echo "live progress: $dir/progress.json (watcher pid $!)"
    fi ;;
  watch)
    dir="$(cd "$1" && pwd)"; P="$dir/progress.json"; [ -f "$P" ] || { echo "no $P: push first"; exit 1; }
    slug="$(jq -r .slug "$P")"; topic="$(jq -r .topic "$P")"; status="queued"; last=0; end=$(( $(date +%s) + 13 * 3600 ))
    while :; do
      now=$(date +%s)
      if [ $(( now - last )) -ge 60 ]; then s="$("$0" status "$slug" 2>/dev/null || true)"; [ -n "$s" ] && status="$s"; last=$now; fi
      # ntfy.sh keeps a topic's messages ~12 h and a poll can fail: merge into what we have, never replace or shrink it
      raw="$(curl -sf --max-time 20 "https://ntfy.sh/$topic/json?poll=1&since=all" || true)"
      new="$(printf '%s\n' "$raw" | jq -c 'select(.event == "message") | .message | fromjson? // empty' 2>/dev/null | jq -s -c . 2>/dev/null || true)"
      jq -e 'type == "array"' <<< "${new:-x}" > /dev/null 2>&1 || new="[]"
      msg=""; [[ "$status" == *:* ]] && msg="${status#*: }"
      if jq --arg s "${status%%:*}" --arg msg "$msg" --arg t "$(date -u +%FT%TZ)" --argjson new "$new" \
        '.events = ((.events + $new) | unique_by([.t, .stage, .state, .job]) | sort_by(.t)) | .checked_at = $t
         | (if .status != $s then .status_at = $t else . end) | .status = $s | .message = $msg' "$P" > "$P.tmp"; then mv "$P.tmp" "$P"; fi
      case "$status" in complete*|error*|cancel*) exit 0 ;; esac
      [ "$now" -lt "$end" ] || exit 0
      sleep 15
    done ;;
  status)
    composio execute KAGGLE_KERNELS_STATUS -d "{\"userName\":\"$KUSER\",\"kernelSlug\":\"$1\"}" \
      | jq -r '.data | "\(.status)\(if .hasFailureMessage then ": " + .failureMessage else "" end)"' ;;
  fetch)
    slug="$1"; dest="$2"; mkdir -p "$dest"; tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
    url="$(composio execute KAGGLE_KERNEL_OUTPUT -d "{\"user_name\":\"$KUSER\",\"kernel_slug\":\"$slug\"}" | jq -r '.data.content.s3url // empty')"
    [ -n "$url" ] || { echo "no output yet for $slug"; exit 1; }
    # Composio hands back Kaggle's output listing (JSON): {files: [{fileName, url}], logNullable: "<json lines>"}
    curl -sSfL "$url" -o "$tmp/listing.json"
    jq -r '.logNullable // "[]"' "$tmp/listing.json" | jq -r '.[].data' > "$dest/kaggle-log.txt" 2>/dev/null || true
    # the notebook zips its own results: take that zip if there is one, else every listed file
    zurl="$(jq -r '[.files[] | select(.fileName | endswith("-results.zip"))][0].url // empty' "$tmp/listing.json")"
    if [ -n "$zurl" ]; then
      curl -sSfL "$zurl" -o "$tmp/r.zip" && unzip -oq "$tmp/r.zip" -d "$dest"
    else
      jq -r '.files[] | "\(.fileName)\t\(.url)"' "$tmp/listing.json" | while IFS=$'\t' read -r f u; do
        mkdir -p "$dest/$(dirname "$f")"; curl -sSfL "$u" -o "$dest/$f"; done
    fi
    jq -e '.hasNextPageToken' "$tmp/listing.json" >/dev/null && echo "warning: output listing is paged; only page 1 fetched"
    echo "fetched into $dest:"; ls "$dest" ;;
  *) sed -n '2,6p' "$0"; exit 1 ;;
esac
