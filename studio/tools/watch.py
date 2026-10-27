"""
Watch a rendered video end to end (the user's rule, 2026-10-11: "make sure to watch end to end").

review.png samples one frame every 1.5 s; this samples every 0.5 s, so a defect has to be shorter than half a
second to slip through (zero-state counters, empty openings, clipping during a zoom, overlapping captions).

  frames   out/watch/sheet-NN.png: 2 fps, 24 frames (12 s) per sheet, each labelled with scene id + time.
           Read EVERY sheet before calling the video reviewed.
  listen   Whisper on the final mix (no name prompt, so it hears what a viewer hears): the transcript, words it
           was unsure of (p < 0.5: possible mispronunciation or mumble), pauses > 0.9 s, pace in words/s
           (house pace ≈ 2.3 w/s), and music level in the gaps vs speech level.
           Whisper often mishears made-up names ("Jev" -> "Jeff"); confirm with the phonemes
           (espeak via phonemizer) before re-voicing.

usage: python tools/watch.py <slug> [file.mp4]
"""
import glob, json, os, re, subprocess, sys, time
import numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import PACE, pace_of, pace_limits
from PIL import Image, ImageDraw, ImageFont

STUDIO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
slug = sys.argv[1]
P = os.path.join(STUDIO, "projects", slug)
spec = json.load(open(os.path.join(P, "scenes.json")))
f = sys.argv[2] if len(sys.argv) > 2 else os.path.join(P, "out", f"{slug}.mp4")
if not os.path.exists(f): sys.exit(f"✗ no video at {f}")
_stem = os.path.splitext(os.path.basename(f))[0]
O = os.path.join(P, "out", "watch" if _stem == slug else f"watch-{_stem.replace(slug + '-', '')}"); os.makedirs(O, exist_ok=True)   # e.g. out/watch-remotion/
for old in glob.glob(os.path.join(O, "*.png")): os.remove(old)
_lp = os.path.join(P, "build", "layout.json")
layout = json.load(open(_lp))["scenes"] if os.path.exists(_lp) else []
scene_at = lambda t: next((s["id"] for s in reversed(layout) if s["start"] <= t), "")

# ---------- frames: 2 fps contact sheets ----------
FPS, PER, COLS, TW = 2, 24, 8, 270
fr = os.path.join(O, "_frames"); os.makedirs(fr, exist_ok=True)
for old in glob.glob(os.path.join(fr, "*.png")): os.remove(old)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f, "-vf", f"fps={FPS},scale={TW}:-2", os.path.join(fr, "f%04d.png")], check=True)
frames = sorted(glob.glob(os.path.join(fr, "*.png")))
try: font = ImageFont.truetype("DejaVuSans-Bold.ttf", 20)
except OSError: font = ImageFont.load_default()
for k in range(0, len(frames), PER):
    chunk = frames[k:k + PER]; w, h = Image.open(chunk[0]).size; rows = (len(chunk) + COLS - 1) // COLS
    sheet = Image.new("RGB", (COLS * (w + 4), rows * (h + 4)), "white")
    for j, p in enumerate(chunk):
        t = (k + j) / FPS + 0.5 / FPS   # ffmpeg's fps filter takes the frame nearest the middle of each interval
        im = Image.open(p).convert("RGB"); d = ImageDraw.Draw(im)
        d.rectangle([0, 0, 120, 26], fill="black"); d.text((4, 2), f"{scene_at(t)} {t:.1f}s", fill="yellow", font=font)
        sheet.paste(im, ((j % COLS) * (w + 4), (j // COLS) * (h + 4)))
    sheet.save(os.path.join(O, f"sheet-{k // PER + 1:02d}.png"))
for p in frames: os.remove(p)
os.rmdir(fr)
print(f"frames: {len(frames)} at {FPS} fps -> {len(range(0, len(frames), PER))} sheets in {os.path.relpath(O, STUDIO)}/ (read every one)")

# ---------- listen: transcript, unclear words, pauses, pace, music vs speech ----------
from faster_whisper import WhisperModel
pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-ac", "1", "-ar", "16000", "-f", "s16le", "-"], capture_output=True, check=True).stdout
a = np.frombuffer(pcm, np.int16).astype(np.float32) / 32768   # decode with ffmpeg: PyAV >= 16 breaks faster-whisper's own decoder
segs, _ = WhisperModel("small.en", device="cpu", compute_type="int8").transcribe(a, word_timestamps=True, language="en")
words = [w for s in segs for w in s.words]
if not words: sys.exit("✗ Whisper heard no speech")
db = lambda x: 20 * np.log10(np.sqrt(np.mean(x ** 2)) + 1e-9)
speech = np.zeros(len(a), bool)
for w in words: speech[int(w.start * 16000):int(w.end * 16000)] = True
gaps = [(words[i].end, words[i + 1].start) for i in range(len(words) - 1) if words[i + 1].start - words[i].end > 0.9]
pace = pace_of(words)
SMAX, DMAX = pace_limits(spec)
by_scene = {}
for w in words: by_scene.setdefault(scene_at(w.start), []).append(w)
scene_pace = {k: round(pace_of(v), 2) for k, v in by_scene.items() if len(v) >= 4}
fast = [f"{k} {p}" for k, p in scene_pace.items() if p > SMAX and len(by_scene[k]) >= PACE["min_words_gate"]]
unclear = [{"scene": scene_at(w.start), "t": round(float(w.start), 2), "word": w.word.strip(), "p": round(float(w.probability), 2)} for w in words if w.probability < 0.5]
print("heard:", " ".join(w.word.strip() for w in words))
print("unclear (p<0.5):", "; ".join(f"{u['scene']} {u['t']:.1f}s '{u['word']}' {u['p']:.2f}" for u in unclear) or "none")
print("pauses > 0.9 s:", ", ".join(f"{x:.1f}-{y:.1f}s" for x, y in gaps) or "none")
print(f"pace: {pace:.2f} words/s heard (house {PACE['target']}, max {DMAX})" + (f" · scenes over {SMAX}: {', '.join(fast)}" if fast else ""))
gates = [{"name": "delivery pace", "ok": bool(pace <= DMAX), "detail": f"{pace:.2f} w/s heard (max {DMAX}): add pauses or cut words, never speed-change the voice"},
         {"name": "scene pace", "ok": not fast, "detail": "all scenes ≤ " + str(SMAX) if not fast else "over: " + ", ".join(fast)}]
levels = None
if (~speech).sum() > 16000:
    gap_db, sp_db = float(db(a[~speech])), float(db(a[speech])); levels = {"speech_db": round(sp_db, 1), "between_words_db": round(gap_db, 1), "under": round(sp_db - gap_db, 1)}
    print(f"levels: speech {sp_db:.1f} dB, music/sfx between words {gap_db:.1f} dB ({sp_db - gap_db:.1f} dB under the voice; includes voice tails and sfx, so qa's 'music bed' is the real number)")
json.dump({"file": os.path.relpath(f, STUDIO), "date": time.strftime("%Y-%m-%d %H:%M"), "sheets": sorted(os.path.relpath(x, STUDIO) for x in glob.glob(os.path.join(O, "sheet-*.png"))),
           "transcript": " ".join(w.word.strip() for w in words), "unclear": unclear, "pauses": [[round(float(x), 2), round(float(y), 2)] for x, y in gaps],
           "pace_delivery": round(float(pace), 2), "pace_by_scene": {k: float(v) for k, v in scene_pace.items()}, "levels": levels, "gates": gates},
          open(os.path.join(O, "..", "watch.json" if _stem == slug else f"watch-{_stem.replace(slug + '-', '')}.json"), "w"), indent=1)
for g in gates:
    if not g["ok"]: print(f"  ✗ {g['name']}: {g['detail']}")
print("\nThis is a transcript, not listening: the user still judges voice, music and feel. → out/watch.json")
if not all(g["ok"] for g in gates): sys.exit(1)
