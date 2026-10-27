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
  payoffs   writes out/payoffs.png: one frame 0.5 s after every beat word, labelled "word → element"
            (the element must be on screen in that frame: the reveal landed on its word)

usage: python tools/qa_video.py <slug> [file.mp4]     exit 1 on any failure
"""
import hashlib, json, os, re, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import PACE, pace_of, pace_limits, norm

STUDIO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
slug = sys.argv[1]
P = os.path.join(STUDIO, "projects", slug)
f = sys.argv[2] if len(sys.argv) > 2 else os.path.join(P, "out", f"{slug}.mp4")
spec = json.load(open(os.path.join(P, "scenes.json")))
tm = json.load(open(os.path.join(P, "build", "timings.json")))
res, warns = [], []
def check(name, ok, detail): res.append((bool(ok), name, str(detail)))
def warn(name, detail): warns.append((name, str(detail)))

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
guessed = {k: sum(1 for w in t["words"] if w.get("src", "heard") != "heard") / max(1, len(t["words"])) for k, t in tm.items()}
badg = [f"{k} {g:.0%}" for k, g in guessed.items() if g > 0.25]
check("caption sync data", timed >= 0.95 * said and not badg, f"{timed}/{said} words timed" + (f" · guessed times: {', '.join(badg)}" if badg else f" · {sum(1 for t in tm.values() for w in t['words'] if w.get('src', 'heard') != 'heard')} guessed"))
for k, g in guessed.items():
    if 0.10 < g <= 0.25: warn("timings", f"{k}: {g:.0%} of word times guessed (Whisper missed them)")

# pace: the one rule in templates/reel/pace.json (house 2.3 w/s); per scene after pauses, and the whole delivery
SMAX, DMAX = pace_limits(spec)
scene_pace = {k: round(pace_of(t["words"]), 2) for k, t in tm.items() if t["words"]}
fast = [f"{k} {p}" for k, p in scene_pace.items() if p > SMAX and len(tm[k]["words"]) >= PACE["min_words_gate"]]
nw = sum(len(t["words"]) for t in tm.values()); delivery = round(nw / max(0.3, sum(t["duration"] for t in tm.values()) + pad * (len(tm) - 1)), 2)
check("pace", not fast and delivery <= DMAX, f"delivery {delivery} w/s (max {DMAX}, house {PACE['target']})" + (f" · scenes over {SMAX}: {', '.join(fast)}" if fast else ""))
for k, p in scene_pace.items():
    if PACE["scene_warn"] < p <= SMAX: warn("pace", f"{k}: {p} w/s (over {PACE['scene_warn']})")
if (spec.get("pace") or {}).get("accept"): warn("pace", f"accepted at {spec['pace']['accept']} w/s: {spec['pace'].get('why', 'no reason given')}")

# what the viewer hears: Whisper on the final mix vs the script (catches slurred or skipped words under music)
import difflib, numpy as np
from faster_whisper import WhisperModel
pcm = np.frombuffer(subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-ac", "1", "-ar", "16000", "-f", "f32le", "-"], capture_output=True).stdout, dtype=np.float32)
# one window per spoken scene (from layout.json): Whisper on 40+ s of speech under music skips whole segments (2026-10-12: a
# full sentence vanished with medium.en; small.en dropped "Careful." on one of two identical tracks); short windows don't.
_wm = WhisperModel("small.en", device="cpu", compute_type="int8")
_lay = json.load(open(os.path.join(P, "build", "layout.json")))
_said = {s["id"] for s in spec["scenes"] if s.get("say")}
_txt = []
for _sc in _lay["scenes"]:
    if _sc["id"] not in _said: continue
    _w = pcm[max(0, int((_sc["start"] - 0.25) * 16000)): int((_sc["start"] + _sc["duration"] + 0.1) * 16000)]   # pad: a window that starts on the first word loses it
    _segs, _ = _wm.transcribe(_w, language="en", initial_prompt=", ".join(spec.get("names", [])), beam_size=5)
    _txt.append(" ".join(sg.text for sg in _segs))
class _S: pass
segs = [_S()]; segs[0].text = " ".join(_txt)
# names: a second pass WITHOUT the names prompt hears what a viewer hears; a name heard differently is listed for the user's ear
_names = [n for n in spec.get("names", []) if n]
if _names:
    _plain = []
    for _sc in _lay["scenes"]:
        if _sc["id"] not in _said: continue
        _w = pcm[max(0, int((_sc["start"] - 0.25) * 16000)): int((_sc["start"] + _sc["duration"] + 0.1) * 16000)]
        _sg, _ = _wm.transcribe(_w, language="en", beam_size=5); _plain.append(" ".join(x.text for x in _sg))
    _heard = " ".join(_plain).lower()
    _miss = [n for n in _names if n.lower() not in _heard]
    if _miss: warn("names", f"heard differently without the names prompt (listen; respell if wrong): {', '.join(_miss)}")
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
fr = np.frombuffer(raw[: nfr * 108 * fh_], dtype=np.uint8).reshape(nfr, fh_, 108).astype(np.int16)[:, int(fh_ * 0.10):int(fh_ * 0.76)]   # the stage zone (y 190-1460), captions excluded
moving = np.abs(np.diff(fr, axis=0)).mean(axis=(1, 2)) >= 0.35          # 0.25 s steps
lay_full = json.load(open(os.path.join(P, "build", "layout.json"))); lay = lay_full["scenes"]
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

# still-%: share of 0.25 s steps where the stage zone did not change (references/benchmark.json: the reference reel 48 %, the
# Instagram references 0-10 %; tools/benchmark.py compares a render with all of them)
still_pct = round(100 * (1 - moving.mean()), 1) if len(moving) else 0.0
try: _bm = json.load(open(os.path.join(os.path.dirname(STUDIO), "references", "benchmark.json")))["files"]["tokenization-reel"]["still_pct"]
except (OSError, KeyError, ValueError): _bm = None
if still_pct > 20: warn("still", f"{still_pct}% of the reel sits still in the stage zone (target ≤ 10 %, the Instagram references 0-10 %" + (f", the reference reel {_bm} %" if _bm else "") + ")")

# plan vs render: out/payoffs.json from tools/payoffs.mjs must exist for THIS composition (sha1 of hf/index.html) and be clean
_pp = os.path.join(P, "out", "payoffs.json"); _ix = os.path.join(P, "hf", "index.html")
if os.path.exists(_pp) and os.path.exists(_ix):
    _po = json.load(open(_pp)); _sm = _po.get("summary", {})
    stale = _po.get("index_sha1") != hashlib.sha1(open(_ix, "rb").read()).hexdigest()
    check("payoffs", not stale and not _sm.get("failed") and not _sm.get("caption_overflow") and not _sm.get("still_scenes") and not _sm.get("edge_crops"),
          "stale: re-run tools/run.sh <slug> payoffs (index.html changed)" if stale else
          f"{_sm.get('passed')}/{_sm.get('checked')} beats on screen on their word · {_sm.get('caption_overflow', 0)} caption overflow · {_sm.get('still_scenes', 0)} still scene(s) · {_sm.get('edge_crops', 0)} edge crop(s)")
elif spec.get("engine") != "remotion": check("payoffs", False, "no out/payoffs.json: run tools/run.sh <slug> payoffs before render")

# captions: no card shown for less than 0.9 s
_cap = lay_full.get("captions", []); _min = lay_full.get("caption", {}).get("min_s", 0.9)
short = [f"{c['scene']} @ {c['a']:.1f}s" for k, c in enumerate(_cap) if k + 1 < len(_cap) and _cap[k + 1]["a"] - c["a"] < _min - 0.02 and _cap[k + 1]["scene"] == c["scene"]]
check("caption cards", not short, f"{len(_cap)} cards, none under {_min} s" if not short else f"under {_min} s: {', '.join(short[:6])}")

# sound on action: every reveal has its cue within 60 ms (the motion-design method); warning, not a gate
_sfx = [x["t"] for x in lay_full.get("sfx", [])]
nocue = [f"{b['scene']}/{b['target']}" for b in lay_full.get("beats", []) if b.get("check") in ("reveal", "visible") and b.get("sfx") and not any(abs(t - b["at"]) <= 0.06 for t in _sfx)]
if nocue: warn("sound on action", f"{len(nocue)} reveal(s) lost their cue to the density cap: {', '.join(nocue[:6])}")

# music bed: in the gaps between words the bed should sit 10-24 dB under the speech (ducked at -36/-30 LUFS vs voice -16)
if spec.get("music", "upbeat-synth") != "none":
    _sr = 16000; _sp = np.zeros(len(pcm), bool); _tail = np.zeros(len(pcm), bool)
    for _sc in lay_full["scenes"]:
        for _w in tm.get(_sc["id"], {}).get("words", []):
            _sp[max(0, int((_sc["start"] + _w["s"] - 0.15) * _sr)): int((_sc["start"] + _w["e"] + 0.15) * _sr)] = True
            _tail[int((_sc["start"] + _w["e"]) * _sr): int((_sc["start"] + _w["e"] + 0.3) * _sr)] = True   # voice tails
    for _t in _sfx: _tail[max(0, int((_t - 0.05) * _sr)): int((_t + 0.5) * _sr)] = True
    _gap = ~_sp & ~_tail; _gap[: int(1.5 * _sr)] = False; _gap[-int(1.5 * _sr):] = False
    _db = lambda x: 20 * np.log10(np.sqrt(np.mean(x ** 2)) + 1e-9)
    if _gap.sum() > 0.4 * _sr:
        under = _db(pcm[_sp]) - _db(pcm[_gap])
        check("music bed", 10 <= under <= 26, f"bed {under:.1f} dB under the speech in the gaps (10-26)")
    else: warn("music bed", "no clean gaps to measure the bed")

# what the viewer sees: a frame every 1.5 s of the real MP4 -> out/review.png (look at it before handing over)
from PIL import Image, ImageDraw, ImageFont
import tempfile, glob
with tempfile.TemporaryDirectory() as td:
    subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-vf", "fps=1/1.5,scale=216:-2", os.path.join(td, "f_%03d.png")], check=True)
    fs = sorted(glob.glob(os.path.join(td, "f_*.png"))); fw, fh = Image.open(fs[0]).size; cols = 10
    sheet = Image.new("RGB", (cols * fw, ((len(fs) + cols - 1) // cols) * fh)); font = ImageFont.truetype(os.path.join(STUDIO, "templates", "reel", "fonts", "Inter.ttf"), 18)
    for k, fp in enumerate(fs):
        tk = k * 1.5 + 0.75; sid = next((sc["id"] for sc in reversed(lay) if sc["start"] <= tk), lay[0]["id"])   # scene id: notes can say "s04 @ 12.8s"
        im = Image.open(fp).convert("RGB"); dr = ImageDraw.Draw(im); dr.rectangle([0, 0, 116, 24], fill=(0, 0, 0))
        dr.text((4, 2), f"{sid} {tk:.1f}s", fill=(255, 220, 0), font=font); sheet.paste(im, ((k % cols) * fw, (k // cols) * fh))
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

# payoffs: the frame 0.5 s after each beat word (the reveal's entrance has landed) — the named element must be visible
beats = json.load(open(os.path.join(P, "build", "layout.json"))).get("beats", [])
if beats:
    with tempfile.TemporaryDirectory() as td:
        ims, lab = [], ImageFont.truetype(os.path.join(STUDIO, "templates", "reel", "fonts", "Inter.ttf"), 15)
        for k, b in enumerate(beats):
            out = os.path.join(td, f"b{k:03d}.png")
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{min(b['at'] + 0.5, dur - 0.05):.2f}", "-i", f, "-frames:v", "1", "-vf", "scale=216:-2", out])
            if os.path.exists(out):
                im = Image.open(out).convert("RGB"); dr = ImageDraw.Draw(im); dr.rectangle([0, 0, im.width, 40], fill=(0, 0, 0))
                dr.text((4, 2), f"{b['scene']} {b['at']:.1f}s", fill=(255, 220, 0), font=lab)
                dr.text((4, 20), f"\"{b['word']}\" → {b['target']}"[:30], fill=(255, 255, 255), font=lab); ims.append(im)
        if ims:
            fw, fh = ims[0].size; cols = 10; sheet = Image.new("RGB", (cols * fw, ((len(ims) + cols - 1) // cols) * fh))
            for k, im in enumerate(ims): sheet.paste(im, ((k % cols) * fw, (k // cols) * fh))
            sheet.save(os.path.join(P, "out", "payoffs.png"))
            print(f"  → look at {os.path.relpath(os.path.join(P, 'out', 'payoffs.png'), STUDIO)}: {len(ims)} beat words, each element must be on screen")

for ok, n, d in res: print(f"  {'✓' if ok else '✗'} {n:18} {d}")
for n, d in warns: print(f"  ⚠ {n:18} {d}")
bad = [n for ok, n, _ in res if not ok]
json.dump({"file": os.path.relpath(f, STUDIO), "sha1": hashlib.sha1(open(f, "rb").read()).hexdigest(), "date": __import__("time").strftime("%Y-%m-%d %H:%M"),
           "checks": [{"name": n, "ok": ok, "detail": d} for ok, n, d in res], "warnings": [{"name": n, "detail": d} for n, d in warns],
           "pace": {"delivery": float(delivery), "scenes": {k: float(v) for k, v in scene_pace.items()}, "limits": [SMAX, DMAX]}, "still_pct": float(still_pct), "duration": round(float(dur), 2),
           "payoffs_ref": _po.get("index_sha1") if os.path.exists(_pp) else None},
          open(os.path.join(P, "out", "qa.json"), "w"), indent=1)
print(f"qa_video: {len(res) - len(bad)}/{len(res)} passed" + (f" · FAILED: {', '.join(bad)}" if bad else "") + f" · {len(warns)} warning(s) → out/qa.json")
sys.exit(1 if bad else 0)
