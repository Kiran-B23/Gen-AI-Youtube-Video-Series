"""
Eval for a rendered video: hard checks that must pass before a video is handed over.

  format    size = scenes.json size, 30 fps, H.264 video + AAC audio
  timing    duration = sum of voice-led scene lengths (±0.25 s); reel within 15 s–3 min
  loudness  integrated −14 LUFS ±1, true peak ≤ −1 dBTP
  audio     no silent stretch > 1.2 s inside the video (a dropped voice clip)
  captions  timings.json word coverage ≥ 95% of the script words (sync data is complete)
  audio     Whisper on the final mix matches the script ≥ 95%, nothing skipped
  motion    no scene sits still for more than 2.5 s (main band)
  review    writes out/review.png (a frame every 1.5 s of the real MP4) to look at before handover

usage: python tools/qa_video.py <slug> [file.mp4]     exit 1 on any failure
"""
import json, os, re, subprocess, sys

STUDIO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
slug = sys.argv[1]
P = os.path.join(STUDIO, "projects", slug)
f = sys.argv[2] if len(sys.argv) > 2 else os.path.join(P, "out", f"{slug}.mp4")
spec = json.load(open(os.path.join(P, "scenes.json")))
tm = json.load(open(os.path.join(P, "build", "timings.json")))
res = []
def check(name, ok, detail): res.append((ok, name, detail))

if not os.path.exists(f): sys.exit(f"✗ no video at {f}")
pr = json.loads(subprocess.run(["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", f], capture_output=True, text=True).stdout)
v = next((s for s in pr["streams"] if s["codec_type"] == "video"), {}); a = next((s for s in pr["streams"] if s["codec_type"] == "audio"), {})
W, H = spec.get("size", [1080, 1920])
fps = eval(v.get("r_frame_rate", "0/1")) if v else 0
check("format", v.get("width") == W and v.get("height") == H and v.get("codec_name") == "h264" and a.get("codec_name") == "aac" and abs(fps - 30) < 0.5,
      f"{v.get('width')}x{v.get('height')} {v.get('codec_name')} {fps:.2f}fps + {a.get('codec_name')}")

dur = float(pr["format"]["duration"]); pad = spec.get("padSeconds", 0.3)
expect = sum((s.get("seconds") or (tm[s["id"]]["duration"] + s.get("pad", pad) if s["id"] in tm else 3.0)) for s in spec["scenes"])
check("timing", abs(dur - expect) <= 0.25, f"{dur:.2f}s vs voice-led {expect:.2f}s")
if spec.get("format", "reel") == "reel": check("reel length", 15 <= dur <= 180, f"{dur:.1f}s (15 s–3 min)")

eb = subprocess.run(["ffmpeg", "-nostats", "-i", f, "-af", "ebur128=peak=true:framelog=quiet", "-f", "null", "-"], capture_output=True, text=True).stderr
I = float(re.findall(r"I:\s+(-?[\d.]+) LUFS", eb)[-1]); TP = float(re.findall(r"Peak:\s+(-?[\d.]+) dBFS", eb)[-1])
check("loudness", abs(I + 14) <= 1.0, f"{I:.1f} LUFS (−14 ±1)")
check("true peak", TP <= -1.0, f"{TP:.1f} dBTP (≤ −1)")

sd = subprocess.run(["ffmpeg", "-nostats", "-i", f, "-af", "silencedetect=n=-50dB:d=1.2", "-f", "null", "-"], capture_output=True, text=True).stderr
gaps = [(float(s), float(e)) for s, e in zip(re.findall(r"silence_start: ([\d.]+)", sd), re.findall(r"silence_end: ([\d.]+)", sd)) if float(s) > 0.5 and float(e) < dur - 0.5]
check("no dropouts", not gaps, "none" if not gaps else ", ".join(f"{s:.1f}–{e:.1f}s" for s, e in gaps))

said = sum(len(s.get("say", "").split()) for s in spec["scenes"]); timed = sum(len(t["words"]) for t in tm.values())
check("caption sync data", timed >= 0.95 * said, f"{timed}/{said} words timed")

# what the viewer hears: Whisper on the final mix vs the script (catches slurred or skipped words under music)
import difflib, numpy as np
from faster_whisper import WhisperModel
pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-ac", "1", "-ar", "16000", "-f", "f32le", "-"], capture_output=True).stdout
segs, _ = WhisperModel("small.en", device="cpu", compute_type="int8").transcribe(np.frombuffer(pcm, dtype=np.float32), language="en",
                                                                               initial_prompt=", ".join(spec.get("names", [])))
NUMW = {w: str(i) for i, w in enumerate("zero one two three four five six seven eight nine ten eleven twelve".split())}
toks = lambda t: [NUMW.get(x, x) for x in (re.sub(r"[^a-z0-9]", "", w.lower()) for w in t.split()) if x]
heard, script = toks(" ".join(sg.text for sg in segs)), toks(" ".join(s.get("say", "") for s in spec["scenes"]))
sm = difflib.SequenceMatcher(None, script, heard, autojunk=False)
diffs = [f"{' '.join(script[a:b])}→{' '.join(heard[c:d])}" for t, a, b, c, d in sm.get_opcodes() if t != "equal"]
check("audio = script", sm.ratio() >= 0.95 and not any(t == "delete" for t, *_ in sm.get_opcodes()),
      f"{sm.ratio():.0%} match" + (f" · differs: {'; '.join(diffs)[:120]}" if diffs else ""))

# motion: no stretch longer than 2.5 s where nothing moves in the main band (captions excluded), per scene
raw = subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-vf", "fps=4,scale=108:-2,format=gray", "-f", "rawvideo", "-"], capture_output=True).stdout
fh_ = int(108 * H / W); nfr = len(raw) // (108 * fh_)
fr = np.frombuffer(raw[: nfr * 108 * fh_], dtype=np.uint8).reshape(nfr, fh_, 108).astype(np.int16)[:, int(fh_ * 0.1):int(fh_ * 0.6)]
moving = np.abs(np.diff(fr, axis=0)).mean(axis=(1, 2)) >= 0.35          # 0.25 s steps
lay = json.load(open(os.path.join(P, "build", "layout.json")))["scenes"]
worst = []
for k, sc in enumerate(lay[:-1]):                                        # the last scene may hold (end card)
    a, b = int(sc["start"] * 4), int((sc["start"] + sc["duration"]) * 4)
    run = best = 0
    for m in moving[a:b]: run = 0 if m else run + 1; best = max(best, run)
    if best / 4 > 2.5: worst.append(f"{sc['id']} {best / 4:.1f}s")
# openings: 0.15 s after each scene starts, the main band must already show content (a blank first frame after a wipe is a defect)
blank = []
for sc in lay:
    k = int((sc["start"] + 0.15) * 4)
    if k < len(fr):
        band = fr[k]
        if band.std() < 6: blank.append(sc["id"])
check("scene openings", not blank, "content visible 0.15 s into every scene" if not blank else "blank opening: " + ", ".join(blank))
check("motion", not worst, "every scene moves at least every 2.5 s" if not worst else "static: " + ", ".join(worst))

# what the viewer sees: a frame every 1.5 s of the real MP4 -> out/review.png (look at it before handing over)
from PIL import Image, ImageDraw, ImageFont
import tempfile, glob
with tempfile.TemporaryDirectory() as td:
    subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-vf", "fps=1/1.5,scale=216:-2", os.path.join(td, "f_%03d.png")], check=True)
    fs = sorted(glob.glob(os.path.join(td, "f_*.png"))); fw, fh = Image.open(fs[0]).size; cols = 10
    sheet = Image.new("RGB", (cols * fw, ((len(fs) + cols - 1) // cols) * fh)); font = ImageFont.truetype(os.path.join(STUDIO, "templates", "reel", "fonts", "Inter.ttf"), 18)
    for k, fp in enumerate(fs):
        im = Image.open(fp).convert("RGB"); dr = ImageDraw.Draw(im); dr.rectangle([0, 0, 70, 24], fill=(0, 0, 0))
        dr.text((4, 2), f"{k * 1.5 + 0.75:.1f}s", fill=(255, 220, 0), font=font); sheet.paste(im, ((k % cols) * fw, (k // cols) * fh))
    sheet.save(os.path.join(P, "out", "review.png"))
print(f"  → look at {os.path.relpath(os.path.join(P, 'out', 'review.png'), STUDIO)}: frames of the real MP4 every 1.5 s")

# transitions: frames every 0.25 s from 0.25 s before to 1.0 s after every scene change (where broken in-between frames hide)
with tempfile.TemporaryDirectory() as td:
    strips = []
    for sc in lay[1:]:
        row = []
        for k, dt in enumerate((-0.25, 0.0, 0.25, 0.5, 0.75, 1.0)):
            out = os.path.join(td, f"{sc['id']}_{k}.png")
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{max(0, sc['start'] + dt):.2f}", "-i", f, "-frames:v", "1", "-vf", "scale=160:-2", out])
            if os.path.exists(out):
                im = Image.open(out).convert("RGB"); dr = ImageDraw.Draw(im); dr.rectangle([0, 0, 92, 20], fill=(0, 0, 0))
                dr.text((3, 2), f"{sc['id']} {dt:+.2f}", fill=(255, 220, 0), font=ImageFont.truetype(os.path.join(STUDIO, "templates", "reel", "fonts", "Inter.ttf"), 14)); row.append(im)
        if row: strips.append(row)
    if strips:
        tw, th = strips[0][0].size; sheet = Image.new("RGB", (tw * 6 * 2, th * ((len(strips) + 1) // 2)), (0, 0, 0))
        for r, row in enumerate(strips):
            for c, im in enumerate(row): sheet.paste(im, ((r % 2) * tw * 6 + c * tw, (r // 2) * th))
        sheet.save(os.path.join(P, "out", "transitions.png"))
        print(f"  → look at {os.path.relpath(os.path.join(P, 'out', 'transitions.png'), STUDIO)}: every scene change, frame by frame (0.25 s)")

for ok, n, d in res: print(f"  {'✓' if ok else '✗'} {n:18} {d}")
bad = [n for ok, n, _ in res if not ok]
print(f"qa_video: {len(res) - len(bad)}/{len(res)} passed" + (f" · FAILED: {', '.join(bad)}" if bad else ""))
sys.exit(1 if bad else 0)
