#!/usr/bin/env bash
# One-time setup of the studio toolchain on Linux without sudo. Everything is free / open source.
# Installs into studio/ (.venv, .manim-env, node_modules) and ~/.local/bin (ffmpeg, micromamba, vhs, ttyd).
set -euo pipefail
cd "$(dirname "$0")/.."; BIN="$HOME/.local/bin"; mkdir -p "$BIN"
need() { command -v "$1" >/dev/null; }

# ffmpeg + ffprobe (static build)
need ffmpeg || { curl -sL https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz | tar xJ -C /tmp
                 cp /tmp/ffmpeg-*-static/{ffmpeg,ffprobe} "$BIN/"; }
# Python env: voice (faster-whisper), audio mix, stills
[ -x .venv/bin/python ] || python3 -m venv .venv
.venv/bin/pip install -q faster-whisper soundfile scipy numpy pyloudnorm pillow "yt-dlp[default]"   # yt-dlp: YouTube research
# Manim Community via conda-forge (pip needs system cairo/pango; conda-forge ships them)
need micromamba || curl -Ls https://micro.mamba.pm/api/micromamba/linux-64/latest | tar xj -C "$HOME/.local" bin/micromamba
[ -x .manim-env/bin/manim ] || micromamba create -y -q -p ./.manim-env -c conda-forge python=3.12 manim
# Playwright (uses system Chrome) + its ffmpeg for video recording
npm install --silent && npx playwright install ffmpeg
# VHS terminal recorder + ttyd
need ttyd || { curl -sL -o "$BIN/ttyd" https://github.com/tsl0922/ttyd/releases/latest/download/ttyd.x86_64 && chmod +x "$BIN/ttyd"; }
need vhs || { curl -sL https://github.com/charmbracelet/vhs/releases/download/v0.12.1/vhs_0.12.1_Linux_x86_64.tar.gz | tar xz -C /tmp
              cp /tmp/vhs_0.12.1_Linux_x86_64/vhs "$BIN/"; }
# music beds + SFX (synthesised, no licences)
[ -f templates/reel/audio/music/upbeat-synth.wav ] || .venv/bin/python tools/make_audio.py templates/reel/audio
.venv/bin/python tools/get_music.py   # CC0 music library (FreePD catalogue)
echo "studio ready: ffmpeg $(ffmpeg -version | head -1 | cut -d' ' -f3) · manim $(PYTHONNOUSERSITE=1 .manim-env/bin/manim --version 2>&1 | head -1) · vhs · playwright"
