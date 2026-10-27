#!/usr/bin/env bash
# One-time setup of the studio toolchain on Linux without sudo. Everything is free / open source.
# Installs into studio/ (.venv, .manim-env, node_modules) and ~/.local/bin (ffmpeg, micromamba, vhs, ttyd).
set -euo pipefail
cd "$(dirname "$0")/.."; BIN="$HOME/.local/bin"; mkdir -p "$BIN"
need() { command -v "$1" >/dev/null; }
export PATH="$BIN:$HOME/.local/node/bin:$PATH"

# Node.js LTS (HyperFrames render/check and Playwright run on Node; ≥ 22)
NODE_V=v22.20.0
need node || { curl -sL "https://nodejs.org/dist/$NODE_V/node-$NODE_V-linux-x64.tar.xz" | tar xJ -C "$HOME/.local"
               rm -rf "$HOME/.local/node"; mv "$HOME/.local/node-$NODE_V-linux-x64" "$HOME/.local/node"; }

# ffmpeg + ffprobe (static build)
need ffmpeg || { curl -sL https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz | tar xJ -C /tmp
                 cp /tmp/ffmpeg-*-static/{ffmpeg,ffprobe} "$BIN/"; }
# Python env: voice (faster-whisper), audio mix, stills
# micromamba ships as .tar.bz2; Python's tarfile unpacks it even when the bzip2 binary is missing
need micromamba || { curl -Ls -o /tmp/micromamba.tar.bz2 https://micro.mamba.pm/api/micromamba/linux-64/latest
                     python3 -c "import tarfile,sys; tarfile.open('/tmp/micromamba.tar.bz2').extract('bin/micromamba', sys.argv[1])" "$HOME/.local"; }
# python3-venv is often missing on Ubuntu (needs sudo); micromamba gives the same .venv without it
[ -x .venv/bin/python ] || python3 -m venv .venv 2>/dev/null || { rm -rf .venv; micromamba create -y -q -p ./.venv -c conda-forge python=3.12 pip; }
.venv/bin/pip install -q faster-whisper soundfile scipy numpy pyloudnorm pillow kokoro-onnx "yt-dlp[default]" "av<16"   # yt-dlp: YouTube research · av<16: PyAV 16+ breaks faster-whisper decode_audio
# Manim Community via conda-forge (pip needs system cairo/pango; conda-forge ships them)
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
echo "studio ready: node $(node --version) · ffmpeg $(ffmpeg -version | head -1 | cut -d' ' -f3) · manim $(PYTHONNOUSERSITE=1 .manim-env/bin/manim --version 2>&1 | head -1) · vhs · playwright"
grep -q '.local/node/bin' "$HOME/.bashrc" 2>/dev/null || echo 'export PATH="$HOME/.local/bin:$HOME/.local/node/bin:$PATH"' >> "$HOME/.bashrc"
[ -f .env ] || [ -f ../.env ] || echo "⚠ no Gemini key: put GEMINI_API_KEY=... in studio/.env (free key: https://aistudio.google.com/apikey), or record voice/sNN.wav"
