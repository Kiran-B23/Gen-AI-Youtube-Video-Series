"""
Voice for one project: projects/<slug>/scenes.json -> build/voice/sNN.wav + build/timings.json

  1. Source per scene: your recording in projects/<slug>/voice/sNN.(wav|mp3|m4a) if present,
     otherwise ONE continuous Gemini TTS take of the whole script, split at the pauses between scenes
     (one request per video keeps the voice consistent and fits the free tier).
  2. Clean-up: trim silence (keep 0.15 s), high-pass 80 Hz, light denoise, compression, de-ess, loudnorm.
  3. Whisper (faster-whisper small.en) word timestamps, aligned to the script so names/words are spelled right.

usage: python tools/voice.py <slug> [--retake | --resplit]
"""
import base64, difflib, glob, json, os, re, subprocess, sys, time, urllib.request
import numpy as np, soundfile as sf
from scipy.signal import resample_poly

STUDIO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPO = os.path.dirname(STUDIO)
slug = sys.argv[1]
retake = "--retake" in sys.argv
resplit = "--resplit" in sys.argv   # re-split the saved take (voice/_take/) without a new Gemini request
P = os.path.join(STUDIO, "projects", slug)
spec = json.load(open(os.path.join(P, "scenes.json")))
scenes = [s for s in spec["scenes"] if s.get("say")]
OUT = os.path.join(P, "build", "voice"); os.makedirs(OUT, exist_ok=True)
RAW = os.path.join(P, "voice"); os.makedirs(RAW, exist_ok=True)
_NUMW = {w: str(i) for i, w in enumerate("zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty".split())}
norm = lambda w: (lambda t: _NUMW.get(t, t))(re.sub(r"[^a-z0-9]", "", w.lower()))   # "ten" == "10" (Whisper writes digits)

def env_key(*names):
    for f in (os.path.join(STUDIO, ".env"), os.path.join(REPO, ".env")):
        if os.path.exists(f):
            for n in names:
                m = re.search(rf'{n}\s*=\s*["\']?([^\s"\']+)', open(f).read())
                if m: return m.group(1)
    return os.environ.get(names[0])

def recording(sid):
    for ext in ("wav", "mp3", "m4a"):
        f = os.path.join(RAW, f"{sid}.{ext}")
        if os.path.exists(f): return f
    return None

# ---------- 1. source audio ----------
missing = [s["id"] for s in scenes if not recording(s["id"])]
take_dir = os.path.join(RAW, "_take"); os.makedirs(take_dir, exist_ok=True)
saved = sorted(glob.glob(os.path.join(take_dir, "take-*.wav")))
if resplit and not saved: sys.exit("--resplit: no saved take in voice/_take/")
if resplit or (missing and (retake or len(missing) == len(scenes))):
  v = spec.get("voice", {})
  model, voice = v.get("model", "gemini-2.5-flash-preview-tts"), v.get("name", "Laomedeia")
  if resplit:
    x, SR = sf.read(saved[-1], dtype="float32"); x = x.mean(1) if x.ndim > 1 else x
    print(f"re-splitting saved take {os.path.basename(saved[-1])} ({len(x)/SR:.1f}s), no Gemini request")
  else:
    key = env_key("GEMINI_API_KEY", "GOOGLE_API_KEY")
    if not key: sys.exit("No recordings and no GEMINI_API_KEY in .env")
    model, voice = v.get("model", "gemini-2.5-flash-preview-tts"), v.get("name", "Laomedeia")
    style = v.get("style", "Read this script as a calm, clear, confident teacher explaining a technical idea in a short video: deliberate pace "
                 "of about two to two and a half words per second, natural pitch movement, warm and precise, a short pause between "
                 "paragraphs, light emphasis on key words and numbers. Never hyped, never robotic. Read every word, including the questions.")
    text = style + "\n\n" + "\n\n".join(s["say"] for s in scenes)
    body = {"contents": [{"parts": [{"text": text}]}], "generationConfig": {"responseModalities": ["AUDIO"],
            "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": voice}}}}}
    pcm = None
    for attempt in range(8):
        req = urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
                                     data=json.dumps(body).encode(), headers={"x-goog-api-key": key, "Content-Type": "application/json"})
        try:
            r = json.loads(urllib.request.urlopen(req, timeout=600).read())
            pcm = base64.b64decode(r["candidates"][0]["content"]["parts"][0]["inlineData"]["data"]); break
        except urllib.error.HTTPError as e:
            msg = e.read()[:300].decode(errors="ignore")
            if e.code == 429 and re.search(r"per ?day|PerDay|daily", msg, re.I):
                sys.exit("Gemini free-tier daily TTS quota is used up (about 10 requests/day/model). Try tomorrow, or record "
                         f"the lines yourself into projects/{slug}/voice/sNN.wav. Not retrying: no paid fallback is used.")
            if e.code in (429, 500, 503) and attempt < 4: print(f"  Gemini {e.code}, retrying in 30 s…"); time.sleep(30); continue
            sys.exit(f"Gemini error {e.code}: {msg}")
        except (KeyError, IndexError):
            print("  empty response, retrying"); time.sleep(5)
    if not pcm: sys.exit("No audio from Gemini")
    x = np.frombuffer(pcm, dtype=np.int16).astype(np.float32) / 32768; SR = 24000
    sf.write(os.path.join(take_dir, f"take-{voice}.wav"), x, SR)
    print(f"take: {len(x)/SR:.1f}s ({model}, {voice})")
  # split the take at the gaps between scenes using Whisper word times aligned to the script
  from faster_whisper import WhisperModel
  wm = WhisperModel("small.en", device="cpu", compute_type="int8")
  g = np.gcd(16000, SR); segs, _ = wm.transcribe(resample_poly(x, 16000 // g, SR // g).astype(np.float32), word_timestamps=True, language="en", initial_prompt=", ".join(spec.get("names", [])))
  heard = [(norm(w.word), w.start, w.end) for s in segs for w in s.words if norm(w.word)]
  sw, owner = [], []
  for i, s in enumerate(scenes):
      for tok in s["say"].split():
          if norm(tok): sw.append(norm(tok)); owner.append(i)
  sm = difflib.SequenceMatcher(None, sw, [h[0] for h in heard], autojunk=False)
  first, last = {}, {}
  for a, b, n in sm.get_matching_blocks():
      for k in range(n):
          i = owner[a + k]; first.setdefault(i, heard[b + k][1]); last[i] = heard[b + k][2]
  aligned = sum(n for *_, n in sm.get_matching_blocks())
  if aligned < 0.85 * len(sw) or len(first) < len(scenes):
      sys.exit(f"The take doesn't match the script ({aligned}/{len(sw)} words aligned; take kept in voice/_take/). "
               "Listen to it; re-run with --retake if the voice skipped or changed lines.")
  if first[0] > 1.5: print(f"  ⚠ speech before the first script word ({first[0]:.1f}s): the style prompt was probably read aloud; trimmed")
  cuts = [max(0.0, first[0] - 0.2)] + [(last[i - 1] + first[i]) / 2 for i in range(1, len(scenes))] + [min(len(x) / SR, last[len(scenes) - 1] + 0.6)]
  for i, s in enumerate(scenes):
      sf.write(os.path.join(RAW, f"{s['id']}.wav"), x[int(cuts[i] * SR):int(cuts[i + 1] * SR)], SR)
  print(f"split into {len(scenes)} scene clips ({aligned}/{len(sw)} words aligned)")
elif missing:
    sys.exit(f"Missing recordings for {missing}. Record them into projects/{slug}/voice/ or re-run with --retake.")

# ---------- 2. clean-up ----------
TRIM = "silenceremove=start_periods=1:start_duration=0:start_threshold=-45dB:start_silence=0.15"
CHAIN = (f"{TRIM},areverse,{TRIM},areverse,highpass=f=80,afftdn=nr=8:nf=-40,"
         "acompressor=threshold=-20dB:ratio=3:attack=8:release=120:makeup=2,deesser=i=0.4,loudnorm=I=-16:TP=-2:LRA=7")
for s in scenes:
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", recording(s["id"]), "-af", CHAIN, "-ar", "48000", "-ac", "1", os.path.join(OUT, f"{s['id']}.wav")], check=True)

# ---------- 3. word timings aligned to the script ----------
from faster_whisper import WhisperModel
wm = WhisperModel("small.en", device="cpu", compute_type="int8")
digit = lambda w: bool(re.search(r"\d", w))
timings = {}
for s in scenes:
    f = os.path.join(OUT, f"{s['id']}.wav")
    x, sr = sf.read(f, dtype="float32")
    segs, _ = wm.transcribe(resample_poly(x, 1, 3).astype("float32"), word_timestamps=True, language="en", beam_size=5,
                            initial_prompt=", ".join(spec.get("names", [])))
    ws = []
    for sg in segs:
        for w in sg.words:
            t = w.word.strip()
            if ws and re.match(r"^[-.]\S", t) and not ws[-1]["w"].endswith((".", ",", "?", "!")):
                ws[-1] = {"w": ws[-1]["w"] + t, "s": ws[-1]["s"], "e": round(w.end, 3)}
            else:
                ws.append({"w": t, "s": round(w.start, 3), "e": round(w.end, 3)})
    sc = s["say"].split(); res = []
    for k, (tag, i1, i2, j1, j2) in enumerate(difflib.SequenceMatcher(None, [norm(a) for a in sc], [norm(b["w"]) for b in ws], autojunk=False).get_opcodes()):
        if tag == "equal" or (tag == "replace" and i2 - i1 == j2 - j1):
            for a, b in zip(range(i1, i2), range(j1, j2)):
                w = ws[b]; tail = re.search(r"[.,!?:;]+$", sc[a])
                text = (w["w"].rstrip(".,!?:;") + (tail.group(0) if tail else "")) if digit(w["w"]) and not digit(sc[a]) else sc[a]
                res.append({"w": text, "s": w["s"], "e": w["e"]})
        elif tag == "replace":
            if any(digit(w["w"]) for w in ws[j1:j2]):
                for w in ws[j1:j2]: res.append({"w": w["w"].rstrip(".,!?:;"), "s": w["s"], "e": w["e"]})
                tail = re.search(r"[.,!?:;]+$", sc[i2 - 1]); res[-1]["w"] += tail.group(0) if tail else ""
            else:
                t0, t1, n = ws[j1]["s"], ws[j2 - 1]["e"], i2 - i1
                res += [{"w": sc[a], "s": round(t0 + (t1 - t0) * m / n, 3), "e": round(t0 + (t1 - t0) * (m + 1) / n, 3)} for m, a in enumerate(range(i1, i2))]
        elif tag == "delete":
            t0 = res[-1]["e"] if res else 0.0
            t1 = ws[j1]["s"] if j1 < len(ws) else t0 + 0.3 * (i2 - i1); n = i2 - i1
            res += [{"w": sc[a], "s": round(t0 + (t1 - t0) * m / n, 3), "e": round(t0 + (t1 - t0) * (m + 1) / n, 3)} for m, a in enumerate(range(i1, i2))]
    # tighten pace: start each scene ~0.12 s before its first word and end ~0.25 s after its last (silence = drag)
    if res:
        x, sr = sf.read(f, dtype="float32")
        a = max(0.0, res[0]["s"] - 0.12); b = min(len(x) / sr, res[-1]["e"] + 0.25)
        if a > 0.05 or b < len(x) / sr - 0.05:
            sf.write(f, x[int(a * sr):int(b * sr)], sr)
            res = [{"w": r["w"], "s": round(max(0, r["s"] - a), 3), "e": round(max(0, r["e"] - a), 3)} for r in res]
    timings[s["id"]] = {"duration": round(sf.info(f).duration, 3), "words": res}
json.dump(timings, open(os.path.join(P, "build", "timings.json"), "w"), indent=1)

# ---------- report ----------
PAD = spec.get("padSeconds", 0.3)
total = sum(t["duration"] + PAD for t in timings.values())
cap = 180 if spec.get("format", "reel") == "reel" else 99999
print("\nscene  voice")
for k, t in timings.items(): print(f"{k}   {t['duration']:6.2f}s  {' '.join(w['w'] for w in t['words'])[:70]}")
print(f"TOTAL ≈ {total:.1f}s" + ("  ❌ over 180s: shorten lines (never speed up the voice)" if total > cap else ""))
missing_beats = []
for s in spec["scenes"]:
    words = [norm(w["w"]) for w in timings.get(s["id"], {}).get("words", [])]
    for b in s.get("beats", []):
        if not any(w == norm(b["word"]) or w.startswith(norm(b["word"])) for w in words):
            missing_beats.append(f"{s['id']}: '{b['word']}' (close: {difflib.get_close_matches(norm(b['word']), words, n=3)})")
if missing_beats: print("BEAT WORDS NOT SPOKEN:\n  " + "\n  ".join(missing_beats))
