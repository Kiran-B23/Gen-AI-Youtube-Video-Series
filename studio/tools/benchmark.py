"""
Benchmark comparator: the same metrics on the house benchmark (references/tokenization-reel.mp4), the Instagram
reference reels (references/ig-reels/<id>/<id>.mp4, git-ignored) and any rendered project MP4, so a render can be
put next to what it is supposed to look and sound like. A comparator, not a gate: it always exits 0.

Metrics per file (the exact methods already used by qa_video.py and watch.py, so the numbers agree with qa/watch):
  duration_s, words, pace_wps (words ÷ (last end − first start), 0 when no speech), pauses_over_0_9s
      Whisper small.en int8 on CPU, audio decoded with ffmpeg to 16 kHz mono (watch.py)
  still_pct, longest_still_s   ffmpeg fps=4,scale=108:-2,gray; band 0.10–0.76 of the height (captions excluded);
      moving = mean abs diff ≥ 0.35 per 0.25 s step (qa_video.py motion check)
  cuts_per_min                 full-frame mean abs diff > 25 between 0.25 s steps; spikes within 0.5 s merged into one cut
  loudness_lufs, true_peak_dbtp   ffmpeg ebur128 (qa_video.py)
  caption_words_per_card       project: mean words per card over build/layout.json captions; reference: null
  scene_median_s               project: median scene length from layout.json; reference: median gap between cuts (null if < 2 cuts)

usage:
  python tools/benchmark.py refs                (re)compute the references -> references/benchmark.json
                                                (cached by sha1 + size; FORCE=1 recomputes everything)
  python tools/benchmark.py <slug> [file.mp4]   measure a render (default projects/<slug>/out/<slug>.mp4), print
                                                metric | this render | benchmark | IG median | delta, warn on
                                                still_pct > 35, pace > delivery_max (pace.json), cuts/min > 6;
                                                -> projects/<slug>/out/benchmark.json
"""
import hashlib, json, os, re, statistics, subprocess, sys, time
import numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import PACE, pace_of

STUDIO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPO = os.path.dirname(STUDIO)
REFS = os.path.join(REPO, "references")
BENCH = os.path.join(REFS, "benchmark.json")
IG_IDS = ["DehL0UdMPw4", "Dc9lkKjAaX2", "DeecNSBNplG"]
METHOD = ("still/cuts: ffmpeg fps=4,scale=108:-2,gray, band 0.10-0.76 h, moving = mean|diff| >= 0.35, cut = full-frame mean|diff| > 25 "
          "(spikes within 0.5 s merged); speech: faster-whisper small.en int8 cpu on ffmpeg 16 kHz mono, pace = words / (last end - first start); "
          "loudness: ffmpeg ebur128")
METRICS = ["duration_s", "words", "pace_wps", "pauses_over_0_9s", "still_pct", "longest_still_s", "cuts_per_min",
           "loudness_lufs", "true_peak_dbtp", "caption_words_per_card", "scene_median_s"]
STILL_WARN, CUTS_WARN = 35.0, 6.0
PACE_WARN = PACE["delivery_max"]          # 2.6 in templates/reel/pace.json (house target 2.3)

_whisper = None
def whisper():
    global _whisper
    if _whisper is None:
        from faster_whisper import WhisperModel
        _whisper = WhisperModel("small.en", device="cpu", compute_type="int8")
    return _whisper

def sha1_of(f):
    h = hashlib.sha1()
    with open(f, "rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""): h.update(chunk)
    return h.hexdigest()

def probe(f):
    pr = json.loads(subprocess.run(["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", f], capture_output=True, text=True).stdout)
    v = next((s for s in pr["streams"] if s["codec_type"] == "video"), {})
    return float(pr["format"]["duration"]), int(v.get("width", 1080)), int(v.get("height", 1920))

def motion(f, W, H):
    """(still_pct, longest_still_s, cut_times) with qa_video.py's frame pipeline."""
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-vf", "fps=4,scale=108:-2,format=gray", "-f", "rawvideo", "-"], capture_output=True).stdout
    fh_ = int(108 * H / W)
    if len(raw) % (108 * fh_):                                   # scale=-2 rounded the height to an even number
        fh_ = next((h for h in (fh_ + 1, fh_ - 1, fh_ + 2, fh_ - 2) if h > 0 and len(raw) % (108 * h) == 0), fh_)
    nfr = len(raw) // (108 * fh_)
    full = np.frombuffer(raw[: nfr * 108 * fh_], dtype=np.uint8).reshape(nfr, fh_, 108).astype(np.int16)
    band = full[:, int(fh_ * 0.10):int(fh_ * 0.76)]
    moving = np.abs(np.diff(band, axis=0)).mean(axis=(1, 2)) >= 0.35   # 0.25 s steps
    still_pct = round(float(100 * (1 - moving.mean())), 1) if len(moving) else 0.0
    run = best = 0
    for m in moving: run = 0 if m else run + 1; best = max(best, run)
    fdiff = np.abs(np.diff(full, axis=0)).mean(axis=(1, 2))
    cuts, last = [], -10
    for i in np.where(fdiff > 25)[0]:
        if i - last > 2: cuts.append(round((i + 1) / 4, 2))        # a new cut only when > 0.5 s after the previous spike
        last = i
    return still_pct, round(best / 4, 2), cuts

def speech(f):
    """(words, pace_wps, pauses_over_0_9s) with watch.py's listen step."""
    pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-ac", "1", "-ar", "16000", "-f", "s16le", "-"], capture_output=True, check=True).stdout
    a = np.frombuffer(pcm, np.int16).astype(np.float32) / 32768
    segs, _ = whisper().transcribe(a, word_timestamps=True, language="en")
    words = [w for s in segs for w in s.words]
    if not words: return 0, 0.0, 0
    pauses = sum(1 for i in range(len(words) - 1) if words[i + 1].start - words[i].end > 0.9)
    return len(words), round(pace_of(words), 2), pauses

def loudness(f):
    eb = subprocess.run(["ffmpeg", "-nostats", "-i", f, "-af", "ebur128=peak=true:framelog=quiet", "-f", "null", "-"], capture_output=True, text=True).stderr
    I = re.findall(r"I:\s+(-?[\d.]+) LUFS", eb); TP = re.findall(r"Peak:\s+(-?[\d.]+) dBFS", eb)
    return (round(float(I[-1]), 1) if I else None), (round(float(TP[-1]), 1) if TP else None)

def measure(f, layout=None):
    dur, W, H = probe(f)
    still_pct, longest, cuts = motion(f, W, H)
    words, pace, pauses = speech(f)
    I, TP = loudness(f)
    if layout:
        caps = [len(c.get("words", [])) for c in layout.get("captions", [])]
        cwpc = round(sum(caps) / len(caps), 2) if caps else None
        scenes = [s["duration"] for s in layout.get("scenes", []) if s.get("duration")]
        smed = round(statistics.median(scenes), 2) if scenes else None
    else:
        cwpc = None
        smed = round(statistics.median(np.diff(cuts).tolist()), 2) if len(cuts) >= 2 else None
    return {"duration_s": round(dur, 2), "words": words, "pace_wps": pace, "pauses_over_0_9s": pauses,
            "still_pct": still_pct, "longest_still_s": longest, "cuts_per_min": round(len(cuts) / dur * 60, 1) if dur else 0.0,
            "loudness_lufs": I, "true_peak_dbtp": TP, "caption_words_per_card": cwpc, "scene_median_s": smed}

def fmt(v):
    if v is None: return "–"
    return f"{v:.2f}".rstrip("0").rstrip(".") if isinstance(v, float) else str(v)

# ---------- refs ----------
def refs():
    old = json.load(open(BENCH)) if os.path.exists(BENCH) else {}
    files = {"tokenization-reel": os.path.join(REFS, "tokenization-reel.mp4")}
    files.update({f"ig/{i}": os.path.join(REFS, "ig-reels", i, f"{i}.mp4") for i in IG_IDS})
    out = {}
    for name, f in files.items():
        if not os.path.exists(f):
            print(f"  skip {name}: no file at {os.path.relpath(f, REPO)}")
            if name in old.get("files", {}): out[name] = old["files"][name]          # keep the last numbers for a reel that is not on this machine
            continue
        size, sha = os.path.getsize(f), sha1_of(f)
        prev = old.get("files", {}).get(name)
        if prev and prev.get("sha1") == sha and prev.get("size") == size and not os.environ.get("FORCE"):
            out[name] = prev; print(f"  cached {name}"); continue
        t0 = time.time(); print(f"  measuring {name} ({size / 1e6:.0f} MB)…", flush=True)
        m = measure(f); m.update({"file": os.path.relpath(f, REPO), "sha1": sha, "size": size}); out[name] = m
        print(f"    {time.time() - t0:.0f}s · " + " · ".join(f"{k} {fmt(m[k])}" for k in METRICS))
    json.dump({"generated": time.strftime("%Y-%m-%d"), "method": METHOD, "files": out}, open(BENCH, "w"), indent=1)
    print(f"→ {os.path.relpath(BENCH, REPO)}")
    print_refs(out)

def print_refs(files):
    names = list(files)
    print(f"\n{'metric':24}" + "".join(f"{n[:16]:>18}" for n in names))
    for k in METRICS: print(f"{k:24}" + "".join(f"{fmt(files[n].get(k)):>18}" for n in names))

# ---------- a project render ----------
def project(slug, f=None):
    P = os.path.join(STUDIO, "projects", slug)
    f = f or os.path.join(P, "out", f"{slug}.mp4")
    if not os.path.exists(f): print(f"✗ no video at {f}"); return
    lp = os.path.join(P, "build", "layout.json")
    layout = json.load(open(lp)) if os.path.exists(lp) else None
    bench = json.load(open(BENCH)) if os.path.exists(BENCH) else {"files": {}}
    if not bench["files"]: print("  (no references/benchmark.json yet: run `python tools/benchmark.py refs` for the comparison columns)")
    tok = bench["files"].get("tokenization-reel", {})
    ig = [v for k, v in bench["files"].items() if k.startswith("ig/")]
    m = measure(f, layout)
    igmed = {}
    for k in METRICS:
        vals = [x[k] for x in ig if x.get(k) is not None]
        igmed[k] = round(float(statistics.median(vals)), 2) if vals else None
    print(f"\n{'metric':24}{'this render':>14}{'benchmark':>14}{'IG median':>12}{'delta':>10}")
    for k in METRICS:
        a, b = m[k], tok.get(k)
        d = f"{a - b:+.2f}".rstrip("0").rstrip(".") if isinstance(a, (int, float)) and isinstance(b, (int, float)) else "–"
        print(f"{k:24}{fmt(a):>14}{fmt(b):>14}{fmt(igmed[k]):>12}{d:>10}")
    warns = []
    if m["still_pct"] > STILL_WARN: warns.append(f"still_pct {m['still_pct']} > {STILL_WARN:g} (benchmark {fmt(tok.get('still_pct', 28))}, IG ≤ 10): the stage sits still too long")
    if m["pace_wps"] > PACE_WARN: warns.append(f"pace {m['pace_wps']} w/s > {PACE_WARN} (house {PACE['target']}): add pauses or cut words, never speed the voice")
    if m["cuts_per_min"] > CUTS_WARN: warns.append(f"cuts_per_min {m['cuts_per_min']} > {CUTS_WARN:g}: hard cuts are flashing; the house style moves inside the scene")
    for w in warns: print(f"  ⚠ {w}")
    if not warns: print("  nothing flagged (still_pct ≤ 35, pace ≤ {}, cuts/min ≤ 6)".format(PACE_WARN))
    os.makedirs(os.path.join(P, "out"), exist_ok=True)
    row = {"file": os.path.relpath(f, STUDIO), "sha1": sha1_of(f), "date": time.strftime("%Y-%m-%d %H:%M"), "metrics": m,
           "benchmark": {k: tok.get(k) for k in METRICS}, "ig_median": igmed, "warnings": warns, "method": METHOD}
    json.dump(row, open(os.path.join(P, "out", "benchmark.json"), "w"), indent=1)
    print(f"→ projects/{slug}/out/benchmark.json")

if __name__ == "__main__":
    if len(sys.argv) < 2: sys.exit(__doc__)
    if sys.argv[1] == "refs": refs()
    else: project(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None)
    sys.exit(0)
