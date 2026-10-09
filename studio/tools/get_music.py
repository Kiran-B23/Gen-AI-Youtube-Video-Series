"""Download the CC0 music library listed in templates/reel/audio/music/cc0/manifest.json and measure loudness
(writes cc0/<name>.mp3 + entries in music/levels.json as 'cc0/<name>'). Use in scenes.json as "music": "cc0/fresh-focus"."""
import json, os, subprocess, urllib.request
import numpy as np, pyloudnorm as pyln, soundfile as sf
STUDIO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MUS = os.path.join(STUDIO, "templates", "reel", "audio", "music"); C = os.path.join(MUS, "cc0")
man = json.load(open(os.path.join(C, "manifest.json")))
lv_path = os.path.join(MUS, "levels.json"); levels = json.load(open(lv_path))
for name, t in man["tracks"].items():
    mp3, wav = os.path.join(C, f"{name}.mp3"), os.path.join(C, f"{name}.wav")
    if not os.path.exists(mp3):
        req = urllib.request.Request(man["base"] + t["path"], headers={"User-Agent": "Mozilla/5.0"})
        open(mp3, "wb").write(urllib.request.urlopen(req, timeout=120).read())
    if not os.path.exists(wav):
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", mp3, "-ac", "1", "-ar", "48000", wav], check=True)
    x, sr = sf.read(wav)
    levels[f"music/cc0/{name}.wav"] = round(pyln.Meter(sr).integrated_loudness(x), 2)
    print(f"{name:18} {len(x)/sr:6.1f}s  {levels[f'music/cc0/{name}.wav']} LUFS  · {t['mood']}")
json.dump(levels, open(lv_path, "w"), indent=1)
