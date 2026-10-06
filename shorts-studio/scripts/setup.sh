#!/usr/bin/env bash
# One-time setup: Node deps + a local Python venv for the voice pipeline (Whisper, cleanup, loudness).
set -e
cd "$(dirname "$0")/.."
npm install --loglevel=error
python3 -m venv .venv
.venv/bin/pip install -q faster-whisper soundfile scipy numpy pyloudnorm imageio-ffmpeg edge-tts pillow
echo "setup done"
