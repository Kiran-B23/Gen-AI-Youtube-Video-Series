import glob, json, os, re, sys, difflib
from faster_whisper import WhisperModel
import soundfile as sf
from scipy.signal import resample_poly
VO, MD, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
script = dict(re.findall(r"### (s\d\d): .+?\n\n(.+?)\n", open(MD).read()))
NAMES = ["Jev", "Kev", "Laya", "TypeSafe", "TypeSafe's", "Convai", "Kahneman's", "Almeida", "Vercel", "Vercel:", "Nimble", "Every's",
         "Fable", "Luna", "Gemini", "Diogo", "LLM", "LLMs", "OpenAI", "Ex-OpenAI"]
model = WhisperModel("small.en", device="cpu", compute_type="int8")
norm = lambda w: re.sub(r"[^a-z0-9]", "", w.lower())
result = {}
for f in sorted(glob.glob(os.path.join(VO, "s[0-9][0-9].wav"))):
    sid = os.path.basename(f)[:3]
    x, sr = sf.read(f, dtype="float32"); x = resample_poly(x, 1, 3).astype("float32")  # 48k -> 16k
    segs, _ = model.transcribe(x, word_timestamps=True, language="en", beam_size=5,
                               initial_prompt="Jev, Kev, Laya, TypeSafe, Convai, Kahneman, Diogo Almeida, Vercel, Nimble, Claude Fable, GPT Luna, LLMs.")
    words = [{"w": w.word.strip(), "s": round(w.start, 3), "e": round(w.end, 3)} for s in segs for w in s.words]
    # correct proper nouns against the script: fuzzy-match each word to the script's name spellings
    for w in words:
        core = re.sub(r"^[^\w$]+|[^\w%]+$", "", w["w"]); tail = w["w"][len(w["w"].rstrip(".,!?:;")):]
        m = difflib.get_close_matches(core.lower(), [n.lower().rstrip(":") for n in NAMES], n=1, cutoff=0.75)
        if m and core.lower() != m[0]:
            fixed = next(n.rstrip(":") for n in NAMES if n.lower().rstrip(":") == m[0])
            print(f"  {sid}: '{w['w']}' -> '{fixed}{tail}'"); w["w"] = fixed + tail
    result[sid] = {"text": " ".join(w["w"] for w in words), "script": script[sid], "words": words}
    sm = difflib.SequenceMatcher(None, [norm(x) for x in script[sid].split()], [norm(w["w"]) for w in words])
    print(sid, len(words), "words, script match %.0f%%" % (100 * sm.ratio()), "|", result[sid]["text"][:110])
json.dump(result, open(OUT, "w"), indent=1)
