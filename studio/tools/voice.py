"""
Voice for one project: projects/<slug>/scenes.json -> build/voice/sNN.wav + build/timings.json

  1. Source per scene: your recording in projects/<slug>/voice/sNN.(wav|mp3|m4a) if present,
     otherwise ONE continuous Gemini TTS take of the whole script, split at the pauses between scenes
     (one request per video keeps the voice consistent and fits the free tier).
     voice.engine "kokoro" in scenes.json (or VOICE_ENGINE=kokoro): Kokoro-82M runs locally via `hyperframes tts`,
     no key and no quota. Each line is cached in voice/_kokoro/ by its text, so a script edit re-voices only changed lines.
     voice.respell {"Laya": "Laaya"} changes what the TTS reads (check with espeak phonemes); captions keep the script's spelling.
     voice.speakers {"M": {"label": "Mentor", "name": "Charon"}, "L": {...}} + scene "speaker": a dialogue in ONE Gemini
     multi-speaker request (two voices, one take); the split by scene works the same.
  2. Clean-up: trim silence (keep 0.15 s), high-pass 80 Hz, light denoise, compression, de-ess, loudnorm.
  3. Whisper (faster-whisper small.en) word timestamps, aligned to the script so names/words are spelled right.

usage: python tools/voice.py <slug> [--retake | --resplit]
"""
import base64, difflib, glob, json, os, re, subprocess, sys, time, urllib.request
import numpy as np, soundfile as sf
from scipy.signal import resample_poly
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import PACE, pace_of, pace_limits   # pace.json: the one words/s rule (target 2.3; scene/delivery gates below)

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

V = spec.get("voice", {})
ENGINE = os.environ.get("VOICE_ENGINE") or V.get("engine", "gemini")
RESPELL = V.get("respell", {})   # {"Laya": "Laaya"}: what the TTS reads (pronunciation); captions keep the real spelling
SLOW = bool(V.get("slow"))        # pace ladder step 3: text-level pause cues for a retake (TTS obeys punctuation better than briefs)
def tts_text(say, beats=()):
    for k, v in RESPELL.items(): say = re.sub(rf"\b{re.escape(k)}\b", v, say)
    if SLOW:
        say = re.sub(r"([.!?])\s+", r"\1\n\n", say)                    # a paragraph break after every sentence
        for w in beats:                                                 # an ellipsis before each beat word: a breath before the reveal
            say = re.sub(rf"(?<![\w…])\s+({re.escape(w)})", r" … \1", say, count=1)
    return say
_LOG = os.path.join(STUDIO, "voice-pace.json")   # every take's measured raw pace, per voice (pick a voice whose raw pace fits)
def last_raw_pace():
    try: return next((r["raw_pace"] for r in reversed(json.load(open(_LOG))) if r["slug"] == slug), None)
    except (OSError, ValueError): return None
def kokoro_path(s):
    import hashlib
    kv, ks = V.get("kokoroVoice", "af_heart"), float(V.get("kokoroSpeed", 0.85))
    h = hashlib.sha1(f"{kv}|{ks}|{tts_text(s['say'])}".encode()).hexdigest()[:10]
    return os.path.join(RAW, "_kokoro", f"{s['id']}-{h}.wav"), kv, ks

def recording(sid):
    for ext in ("wav", "mp3", "m4a"):
        f = os.path.join(RAW, f"{sid}.{ext}")
        if os.path.exists(f): return f
    if ENGINE == "kokoro":
        f = kokoro_path(next(s for s in scenes if s["id"] == sid))[0]
        if os.path.exists(f): return f
    return None

# ---------- 0. Kokoro (local, free): synthesise the lines that have no recording and no cached take ----------
if ENGINE == "kokoro":
    os.makedirs(os.path.join(RAW, "_kokoro"), exist_ok=True)
    env = dict(os.environ, HYPERFRAMES_PYTHON=os.path.join(STUDIO, ".venv", "bin", "python"))
    todo = [s for s in scenes if not recording(s["id"])]
    for s in todo:
        f, kv, ks = kokoro_path(s)
        for old in glob.glob(os.path.join(RAW, "_kokoro", f"{s['id']}-*.wav")): os.remove(old)   # stale takes of an edited line
        r = subprocess.run(["npx", "--yes", "hyperframes@0.8.143", "tts", tts_text(s["say"]), "-v", kv, "-s", str(ks), "-o", f],
                           env=env, capture_output=True, text=True)
        if r.returncode or not os.path.exists(f):
            sys.exit(f"Kokoro failed on {s['id']}: {(r.stderr or r.stdout)[-300:]}\n(needs `pip install kokoro-onnx` in studio/.venv: re-run tools/setup.sh)")
    print(f"kokoro ({V.get('kokoroVoice', 'af_heart')}): {len(todo)} line(s) synthesised, {len(scenes) - len(todo)} reused")

# ---------- 1. source audio ----------
missing = [s["id"] for s in scenes if not recording(s["id"])]
take_dir = os.path.join(RAW, "_take"); os.makedirs(take_dir, exist_ok=True)
saved = sorted(glob.glob(os.path.join(take_dir, "take-*.wav")))
if resplit and not saved: sys.exit("--resplit: no saved take in voice/_take/")
if resplit or retake or (missing and len(missing) == len(scenes)):   # --retake always asks for a new take
  v = spec.get("voice", {})
  model, voice = v.get("model", "gemini-2.5-flash-preview-tts"), v.get("name", "Laomedeia")
  if v.get("speakers"): voice = "+".join(x["name"] for x in v["speakers"].values())   # the take is named after the cast
  if resplit:
    mine = os.path.join(take_dir, f"take-{voice}.wav")   # the take of the voice this project now uses, not the newest name
    pick = mine if os.path.exists(mine) else max(saved, key=os.path.getmtime)
    x, SR = sf.read(pick, dtype="float32"); x = x.mean(1) if x.ndim > 1 else x
    print(f"re-splitting saved take {os.path.basename(pick)} ({len(x)/SR:.1f}s), no Gemini request")
  else:
    key = env_key("GEMINI_API_KEY", "GOOGLE_API_KEY")
    if not key: sys.exit("No recordings and no GEMINI_API_KEY in .env. Add a free key (https://aistudio.google.com/apikey) "
                         f"or use the free local voice: VOICE_ENGINE=kokoro tools/run.sh {slug} voice")
    style = v.get("style", "Read this script as a calm, clear, confident teacher explaining a technical idea in a short video: deliberate pace "
                 f"of about {PACE['target']} words per second, natural pitch movement, warm and precise, a short pause between "
                 "paragraphs, light emphasis on key words and numbers. Never hyped, never robotic. Read every word, including the questions.")
    style += f" Speak slowly: about {PACE['target']} words per second. A full stop is a pause; a paragraph break is a longer pause."
    if (lp := last_raw_pace()): style += f" Your last read of this script was {lp:.1f} words per second; that was too fast."
    SPK = v.get("speakers")   # dialogue: {"M": {"label": "Mentor", "name": "Charon"}, ...} + scene "speaker": "M"
    if SPK:
        labels = " and ".join(x["label"] for x in SPK.values())
        text = (style + f"\n\nTTS the following conversation between {labels}:\n"
                + "\n".join(f"{SPK[s['speaker']]['label']}: {tts_text(s['say'], [b['word'] for b in s.get('beats', [])])}" for s in scenes))
        speech = {"multiSpeakerVoiceConfig": {"speakerVoiceConfigs": [
            {"speaker": x["label"], "voiceConfig": {"prebuiltVoiceConfig": {"voiceName": x["name"]}}} for x in SPK.values()]}}
    else:
        # the brief is framed as instructions so the voice is less likely to read it aloud (detected after the take: first[0] > 1.5 s)
        text = "Instructions (do not read aloud): " + style + "\n\nScript:\n\n" + ("\n\n\n" if SLOW else "\n\n").join(tts_text(s["say"], [b["word"] for b in s.get("beats", [])]) for s in scenes)
        speech = {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": voice}}}
    body = {"contents": [{"parts": [{"text": text}]}], "generationConfig": {"responseModalities": ["AUDIO"], "speechConfig": speech}}
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
                sys.exit("Gemini free-tier daily TTS quota is used up (about 10 requests/day/model). Try tomorrow, record "
                         f"the lines yourself into projects/{slug}/voice/sNN.wav, or use the free local voice: "
                         f"VOICE_ENGINE=kokoro tools/run.sh {slug} voice. Not retrying: no paid fallback is used.")
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
  # raw pace of the take (what the voice actually did, before any pause is inserted) -> the ladder for a take that is too fast
  cnt = {}
  for a, b, n in sm.get_matching_blocks():
      for k in range(n): cnt[owner[a + k]] = cnt.get(owner[a + k], 0) + 1
  raw_sc = {scenes[i]["id"]: cnt[i] / max(0.3, last[i] - first[i]) for i in first}
  RAW_PACE = sum(cnt.values()) / (last[max(last)] - first[0])
  SMAX, _ = pace_limits(spec)
  fast = [f"{k} {p:.1f}" for k, p in raw_sc.items() if p > SMAX]
  hopeless = [k for k, p in raw_sc.items() if p > PACE["raw_take_retake"]]   # pauses are worth ~0.3-0.5 w/s; these lines need fewer words
  print(f"raw take pace: {RAW_PACE:.2f} words/s (house {PACE['target']})" + (f" · scenes over {SMAX}: {', '.join(fast)}" if fast else ""))
  if RAW_PACE > PACE["raw_take_retake"]:
      print(f"  ladder 3: raw > {PACE['raw_take_retake']}: pauses cannot fix this. RETAKE=1 with \"voice\": {{\"slow\": true}} (text-level pauses), or switch voice, or shorten the lines.")
  elif RAW_PACE > SMAX:
      print(f"  ladder 2: pauses + beat \"pauseAfter\": [\"word\", …] on the fast scenes; if a scene still fails, that line is too long: shorten it and retake.")
  elif fast or RAW_PACE > PACE["scene_warn"]:
      print(f"  ladder 1: pauses only: raise voice.minPause (max {PACE['pause_sentence_max']}/{PACE['pause_comma_max']}) and per-scene \"pad\" at section ends; RESPLIT=1 re-splits this take for free.")
  if hopeless: print(f"  scenes read faster than {PACE['raw_take_retake']} w/s ({', '.join(hopeless)}): pauses alone won't bring them under {SMAX}; cut words in those lines (then retake) or add \"pauseAfter\" at their clause breaks.")
  if not resplit:
      try: log = json.load(open(_LOG))
      except (OSError, ValueError): log = []
      log.append({"date": time.strftime("%Y-%m-%d"), "slug": slug, "voice": voice, "model": model, "raw_pace": round(RAW_PACE, 2), "words": sum(cnt.values())})
      json.dump(log, open(_LOG, "w"), indent=1)
  def valley(a, b):
      """Cut between two scenes at the quietest 20 ms of the pause (never within 0.1 s of a word), not at the midpoint: a midpoint cut can clip a word's tail or a breath."""
      lo, hi = int((a + 0.1) * SR), int((b - 0.1) * SR)
      if hi - lo < int(0.05 * SR): return (a + b) / 2
      win = int(0.02 * SR); seg = x[lo:hi]; n = len(seg) // win
      rms = np.sqrt((seg[: n * win].reshape(n, win) ** 2).mean(1)) if n else np.array([0.0])
      return (lo + (int(np.argmin(rms)) + 0.5) * win) / SR
  cuts = [max(0.0, first[0] - 0.2)] + [valley(last[i - 1], first[i]) for i in range(1, len(scenes))] + [min(len(x) / SR, last[len(scenes) - 1] + 0.6)]
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
            if ws and (re.match(r"^[-.]\S", t) and not ws[-1]["w"].endswith((".", ",", "?", "!"))
                       or re.match(r"^,\d{3}", t) and re.search(r"\d$", ws[-1]["w"])):   # Whisper splits "8,000" into "8" + ",000"
                ws[-1] = {"w": ws[-1]["w"] + t, "s": ws[-1]["s"], "e": round(w.end, 3)}
            else:
                ws.append({"w": t, "s": round(w.start, 3), "e": round(w.end, 3)})
    sc = s["say"].split(); res = []
    for k, (tag, i1, i2, j1, j2) in enumerate(difflib.SequenceMatcher(None, [norm(a) for a in sc], [norm(b["w"]) for b in ws], autojunk=False).get_opcodes()):
        if tag == "equal" or (tag == "replace" and i2 - i1 == j2 - j1):
            for a, b in zip(range(i1, i2), range(j1, j2)):
                w = ws[b]; tail = re.search(r"[.,!?:;]+$", sc[a])
                text = (w["w"].rstrip(".,!?:;") + (tail.group(0) if tail else "")) if digit(w["w"]) and not digit(sc[a]) else sc[a]
                res.append({"w": text, "s": w["s"], "e": w["e"], "src": "heard"})
        elif tag == "replace":
            if any(digit(w["w"]) for w in ws[j1:j2]):
                for w in ws[j1:j2]: res.append({"w": w["w"].rstrip(".,!?:;"), "s": w["s"], "e": w["e"], "src": "heard"})
                tail = re.search(r"[.,!?:;]+$", sc[i2 - 1]); res[-1]["w"] += tail.group(0) if tail else ""
            else:   # "src": "spread": Whisper heard something else here; the script words share that span evenly
                t0, t1, n = ws[j1]["s"], ws[j2 - 1]["e"], i2 - i1
                res += [{"w": sc[a], "s": round(t0 + (t1 - t0) * m / n, 3), "e": round(t0 + (t1 - t0) * (m + 1) / n, 3), "src": "spread"} for m, a in enumerate(range(i1, i2))]
        elif tag == "delete":   # "src": "guessed": Whisper heard nothing for these words; times are interpolated
            t0 = res[-1]["e"] if res else 0.0
            t1 = ws[j1]["s"] if j1 < len(ws) else t0 + 0.3 * (i2 - i1); n = i2 - i1
            res += [{"w": sc[a], "s": round(t0 + (t1 - t0) * m / n, 3), "e": round(t0 + (t1 - t0) * (m + 1) / n, 3), "src": "guessed"} for m, a in enumerate(range(i1, i2))]
    # tighten pace: start each scene ~0.12 s before its first word and end ~0.25 s after its last (silence = drag)
    if res:
        x, sr = sf.read(f, dtype="float32")
        a = max(0.0, res[0]["s"] - 0.12); b = min(len(x) / sr, res[-1]["e"] + 0.25)
        if a > 0.05 or b < len(x) / sr - 0.05:
            sf.write(f, x[int(a * sr):int(b * sr)], sr)
            res = [{**r, "s": round(max(0, r["s"] - a), 3), "e": round(max(0, r["e"] - a), 3)} for r in res]
    # breathing room (user, 2026-10-12: rushed reads): TTS often ignores pace briefs, so lengthen the pauses the voice
    # already makes after sentences/questions and commas (silence inserted between words; the speech is never sped up).
    # voice.minPause {"sentence": 0.5, "comma": 0.22} (defaults from pace.json; capped at pause_*_max so a read never turns choppy; 0 turns it off)
    # beat "pauseAfter": ["word", …] (pace ladder 2): a sentence-length pause after those words even without punctuation.
    MP = {"sentence": PACE["pause_sentence"], "comma": PACE["pause_comma"]}; MP.update(V.get("minPause", {}))
    MP = {"sentence": min(MP["sentence"], PACE["pause_sentence_max"]), "comma": min(MP["comma"], PACE["pause_comma_max"])}
    PA = {norm(w) for b in s.get("beats", []) for w in (b.get("pauseAfter") or [])} | {norm(w) for w in (s.get("pauseAfter") or [])}
    if res and (MP["sentence"] or MP["comma"]):
        x, sr = sf.read(f, dtype="float32"); parts, last, shift, out = [], 0, 0.0, []
        for k, r in enumerate(res):
            out.append({**r, "s": round(r["s"] + shift, 3), "e": round(r["e"] + shift, 3)})
            if k + 1 == len(res): continue
            gap = res[k + 1]["s"] - r["e"]
            want = MP["sentence"] if re.search(r"[.?!:]$", r["w"]) or norm(r["w"]) in PA else MP["comma"] if re.search(r"[,;]$", r["w"]) else 0
            if want > gap > -0.05:
                cut = int(((r["e"] + res[k + 1]["s"]) / 2) * sr); add = want - max(gap, 0)
                parts += [x[last:cut], np.zeros(int(add * sr), dtype=x.dtype)]; last = cut; shift += add
        if shift > 0:
            sf.write(f, np.concatenate(parts + [x[last:]]), sr); res = out
    timings[s["id"]] = {"duration": round(sf.info(f).duration, 3), "words": res}
json.dump(timings, open(os.path.join(P, "build", "timings.json"), "w"), indent=1)

# ---------- report: per-scene pace (after pauses), timing confidence, delivery pace; gates ----------
PAD = spec.get("padSeconds", 0.3)
total = sum(t["duration"] + PAD for t in timings.values())
cap = 180 if spec.get("format", "reel") == "reel" else 99999
SMAX, DMAX = pace_limits(spec); fails = []
print("\nscene  voice    w/s   guessed")
for k, t in timings.items():
    ws = t["words"]; p = pace_of(ws); ng = sum(1 for w in ws if w.get("src", "heard") != "heard"); gp = ng / max(1, len(ws))
    gate = len(ws) >= PACE["min_words_gate"]   # a 5-word line measures noisily; it warns, it doesn't fail
    flag = " ✗ pace" if p > SMAX and gate else " ⚠ pace" if p > PACE["scene_warn"] else ""
    flag += " ✗ timings" if gp > 0.25 else " ⚠ timings" if gp > 0.10 else ""
    if p > SMAX and gate: fails.append(f"{k} {p:.2f} w/s > {SMAX}")
    if gp > 0.25: fails.append(f"{k}: {ng}/{len(ws)} word times guessed (Whisper missed them): check names/respell, listen to build/voice/{k}.wav")
    print(f"{k}   {t['duration']:6.2f}s  {p:4.2f}  {gp:5.0%}{flag}  {' '.join(w['w'] for w in ws)[:56]}")
allw = [w for t in timings.values() for w in t["words"]]
delivery = len(allw) / max(0.3, sum(t["duration"] for t in timings.values()) + PAD * (len(timings) - 1))
print(f"TOTAL ≈ {total:.1f}s · delivery ≈ {delivery:.2f} words/s (max {DMAX}, house {PACE['target']})" + ("  ❌ over 180s: shorten lines (never speed up the voice)" if total > cap else ""))
if delivery > DMAX: fails.append(f"delivery {delivery:.2f} w/s > {DMAX}: add pauses (minPause / pauseAfter / pad) or cut words; never speed-change the voice")
if (spec.get("pace") or {}).get("accept"): print(f"  pace accepted at {spec['pace']['accept']} w/s: {spec['pace'].get('why', '(no reason given: add \"why\")')}")
missing_beats, unsure_beats = [], []
for s in spec["scenes"]:
    words = timings.get(s["id"], {}).get("words", [])
    for b in s.get("beats", []):
        hit = next((w for w in words if norm(w["w"]) == norm(b["word"])), None) or next((w for w in words if norm(w["w"]).startswith(norm(b["word"]))), None)
        if not hit: missing_beats.append(f"{s['id']}: '{b['word']}' (close: {difflib.get_close_matches(norm(b['word']), [norm(w['w']) for w in words], n=3)})")
        elif hit.get("src", "heard") != "heard": unsure_beats.append(f"{s['id']}: '{b['word']}' ({hit['src']})")
if missing_beats: fails.append("BEAT WORDS NOT SPOKEN (fix the word in scenes.json or re-voice):\n  " + "\n  ".join(missing_beats))
if unsure_beats: fails.append("BEAT WORDS WITH GUESSED TIMES (the reveal may miss its word; listen, add the name to \"names\"/respell):\n  " + "\n  ".join(unsure_beats))
if fails:
    print("\n✗ voice gate:\n  " + "\n  ".join(fails))
    print(f"  (timings.json is written; RESPLIT=1 re-splits the saved take after you change minPause/pauseAfter/pad, no Gemini request)")
    sys.exit(1)
