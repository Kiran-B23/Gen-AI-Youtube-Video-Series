# Builds experiments/i2v-camera-test/i2v-camera-test.ipynb with the six t2i stills embedded. Run from the repo root:
#   python3 experiments/i2v-camera-test/make_notebook.py
import base64, io, json, uuid
from PIL import Image

REPO = "."
IDS = ["s01", "s03", "s04", "s05", "s07", "s08"]
stills = {}
for s in IDS:
    im = Image.open(f"{REPO}/experiments/t2i-test/images/reel/{s}.png").convert("RGB").resize((480, 832), Image.LANCZOS)
    b = io.BytesIO(); im.save(b, "JPEG", quality=92); stills[s] = base64.b64encode(b.getvalue()).decode()

def md(s): return dict(cell_type="markdown", id=uuid.uuid4().hex[:8], metadata={}, source=s)
def code(s): return dict(cell_type="code", id=uuid.uuid4().hex[:8], metadata={}, execution_count=None, outputs=[], source=s)

cells = []
cells.append(md("""# Camera-move B-roll test: Wan2.2 TI2V-5B image→video on Kaggle (T4 ×2)

Follow-up to `experiments/t2v-test/` (conditional go, narrow use: camera moves on a still work, object motion melts).
Two questions, pass bar in `README.md` (set before the run):
- **Set A:** camera-move-only prompts on the 6 usable t2i stills × 2 seeds (49 frames, 2 s). Does the narrow use hold?
- **Set B:** longer clips on `s04`/`s05`: 81 and 121 frames (3.4 s and 5 s). Does quality hold, and does it fit a T4?

**Kaggle:** Accelerator **GPU T4 ×2**, Internet **On**, *Save & Run All*. Model is Apache-2.0 and ungated.
Every clip is checkpointed to `clips.jsonl`; re-running skips finished clips."""))

cells.append(code("""# 1. Install (newest diffusers from source: Wan 2.2 pipelines need it)
!pip install -q -U git+https://github.com/huggingface/diffusers transformers accelerate sentencepiece ftfy imageio imageio-ffmpeg psutil
# Kaggle ships an old torchao that breaks the newest diffusers' import (FqnToConfig, seen in t2i-test v1). We don't use torchao.
!pip uninstall -y -q torchao
!nvidia-smi --query-gpu=name,memory.total,driver_version --format=csv"""))

cells.append(code("""# Fail fast with the real error if a pipeline class is missing
import diffusers
for n in ["WanImageToVideoPipeline", "AutoencoderKLWan"]:
    assert hasattr(diffusers, n), f"diffusers {diffusers.__version__} has no {n}"; print("ok:", n)"""))

cells.append(code("""import os, json, time, platform, zipfile, base64, subprocess, sys
import numpy as np, torch, transformers, psutil

ON_KAGGLE = os.path.exists("/kaggle")
OUT = "/kaggle/working/i2v" if ON_KAGGLE else "/content/i2v"
for d in ("clips", "stills"): os.makedirs(f"{OUT}/{d}", exist_ok=True)

N_GPU = torch.cuda.device_count()
ENV = dict(platform="kaggle" if ON_KAGGLE else "colab", ram_gb=round(psutil.virtual_memory().total / 2**30, 1),
           gpus=[torch.cuda.get_device_name(i) for i in range(N_GPU)],
           vram_gb=[round(torch.cuda.get_device_properties(i).total_memory / 2**30, 1) for i in range(N_GPU)],
           torch=torch.__version__, diffusers=diffusers.__version__, transformers=transformers.__version__, python=platform.python_version())
print(json.dumps(ENV, indent=1))
assert N_GPU >= 2, "Needs GPU T4 x2: set the accelerator and re-run\""""))

cells.append(md("""## Config: model, house style, jobs
Settings are the ones that worked in t2v-test v1 (fp16, split across both T4s, VAE fp32, 30 steps, guidance 5.0).
The style prefix no longer says *camera motion*: each prompt names exactly one camera move and keeps the subject still."""))

prompts = {
    "s01": "Slow, steady camera push-in toward the floating smartphone and its question bubble.",
    "s03": "Slow lateral camera glide from left to right across the grid of tiles.",
    "s04": "Smooth forward dolly along the ribbon of tiles into the distance.",
    "s05": "The camera glides slowly forward down the aisle between the shelves of tiles.",
    "s07": "Slow vertical camera pan downward along the list of rows.",
    "s08": "Slow camera pull-back revealing the whole meter and the tiles around it.",
}
cfg_src = f'''MODEL = dict(repo="Wan-AI/Wan2.2-TI2V-5B-Diffusers", licence="Apache-2.0", w=480, h=832, fps=24, steps=30, guidance=5.0)

STYLE = ("Flat vector motion graphics, solid colour blocks, electric blue #2B3BE0, bright yellow #FFD23F, off-white #EEF1F6 "
         "and deep navy #0B1020 only, clean futuristic tech geometry, crisp edges, minimal, modern, high contrast, "
         "no gradients, no grain, no text, no letters, no logos, no people, not cartoon, not pastel. ")
STILL = " Everything in the scene stays perfectly still and keeps its shape; only the camera moves."
NEG = ("text, letters, watermark, logo, people, faces, hands, blurry, low quality, distorted, flicker, jitter, noisy, gradients, "
       "morphing, melting, warping, objects moving, shapes changing")

PROMPTS = {json.dumps(prompts, indent=1)}
# Set A: every still x 2 seeds at 49 frames; Set B: s04/s05 at 81 and 121 frames (Wan needs 4n+1 frames)
JOBS = ([dict(id=f"A-{{s}}-{{seed}}", set="A", still=s, seed=seed, frames=49) for seed in (1234, 42) for s in PROMPTS]
        + [dict(id=f"B-{{s}}-f{{n}}", set="B", still=s, seed=1234, frames=n) for n in (81, 121) for s in ("s04", "s05")])
for j in JOBS: j["prompt"] = PROMPTS[j["still"]] + STILL

STILLS = {json.dumps(stills)}
for sid, b64 in STILLS.items():
    open(f"{{OUT}}/stills/{{sid}}.jpg", "wb").write(base64.b64decode(b64))
json.dump(dict(MODEL=MODEL, STYLE=STYLE, NEG=NEG, JOBS=JOBS, OUT=OUT), open(f"{{OUT}}/config.json", "w"))
print(len(JOBS), "jobs:", [j["id"] for j in JOBS])'''
cells.append(code(cfg_src))

cells.append(md("""## Worker: one process loads the model once and makes every unfinished clip
A crash or `Killed` loses only the clip in progress: finished clips are in `clips.jsonl` and the driver restarts the worker.
An out-of-memory clip (likely for 121 frames) is recorded as an error and skipped.

Auto-flags are advisory (scoring comes from contact sheets): `blank` (NaN or per-frame std < 0.05), `static` (no frame-to-frame change),
`drift` (colour histogram of the last frame far from the input still: a cheap proxy for melting) and `hue_collapse`
(one hue covers > 90 % of the last frame while the still is mixed)."""))

cells.append(code('''%%writefile /tmp/i2v_worker.py
# python i2v_worker.py <dtype> <placement> <out_dir>; exit 3 = first clip NaN/blank (driver tries the next dtype)
import sys, json, os, time, numpy as np, torch, diffusers as D
from diffusers.utils import export_to_video, load_image
dtype_s, placement, out = sys.argv[1:4]
C = json.load(open(f"{out}/config.json")); M = C["MODEL"]; dtype = getattr(torch, dtype_s)
LOG = f"{out}/clips.jsonl"
done = {json.loads(l)["id"] for l in open(LOG)} if os.path.exists(LOG) else set()
todo = [j for j in C["JOBS"] if j["id"] not in done]
if not todo: print("RESULT {}"); sys.exit(0)

vae = D.AutoencoderKLWan.from_pretrained(M["repo"], subfolder="vae", torch_dtype=torch.float32)
kw = dict(torch_dtype=dtype, low_cpu_mem_usage=True, vae=vae)
if placement == "balanced": kw["device_map"] = "balanced"
t = time.time(); pipe = D.WanImageToVideoPipeline.from_pretrained(M["repo"], **kw); load_s = round(time.time() - t, 1)
if placement == "offload": pipe.enable_model_cpu_offload()
if placement == "balanced": pipe.vae.to(next(pipe.transformer.parameters()).device)
for f in ("enable_tiling", "enable_slicing"):
    if hasattr(pipe.vae, f): getattr(pipe.vae, f)()
pipe.set_progress_bar_config(disable=True)
print("loaded in", load_s, "s", flush=True)

def hist(img, bins=8):        # joint RGB histogram of an HxWx3 0..1 array, normalised
    q = np.clip((img * bins).astype(int), 0, bins - 1)
    h = np.bincount(((q[..., 0] * bins + q[..., 1]) * bins + q[..., 2]).ravel(), minlength=bins ** 3).astype(float)
    return h / h.sum()

def hue_share(img):           # share of the most common of 12 hue bins among saturated pixels (1.0 if none saturated)
    mx, mn = img.max(-1), img.min(-1); sat = (mx - mn) > 0.15
    if sat.sum() < 100: return 1.0
    r, g, b = [img[..., i][sat] for i in range(3)]; d = (mx - mn)[sat]; m = mx[sat]
    h = np.where(m == r, (g - b) / d % 6, np.where(m == g, (b - r) / d + 2, (r - g) / d + 4)) / 6
    c = np.bincount((h * 12).astype(int) % 12, minlength=12); return float(c.max() / c.sum())

def flags(v, still):
    m = dict(std=round(float(v.reshape(len(v), -1, 3).std(1).mean()), 4),   # per frame, per channel
             motion=round(float(np.abs(np.diff(v, axis=0)).mean()), 4),
             drift=round(float(np.abs(hist(v[-1]) - hist(still)).sum()), 3),
             hue_last=round(hue_share(v[-1]), 3), hue_still=round(hue_share(still), 3))
    f = []
    if np.isnan(v).any() or m["std"] < 0.05: f.append("blank")
    if m["motion"] < 0.002: f.append("static")
    if m["drift"] > 0.8: f.append("drift")
    if m["hue_last"] > 0.9 and m["hue_still"] < 0.75: f.append("hue_collapse")
    return m, f

def peak():
    return round(max(torch.cuda.max_memory_allocated(i) for i in range(torch.cuda.device_count())) / 2**30, 1)

first = True
for j in todo:
    img = load_image(f"{out}/stills/{j['still']}.jpg")
    still = np.asarray(img.resize((M["w"], M["h"])), dtype=np.float32) / 255
    for i in range(torch.cuda.device_count()): torch.cuda.reset_peak_memory_stats(i)
    rec = dict(j, dtype=dtype_s, placement=placement, load_s=load_s)
    try:
        torch.cuda.synchronize(); t = time.time()
        v = pipe(image=img, prompt=C["STYLE"] + j["prompt"], negative_prompt=C["NEG"], width=M["w"], height=M["h"],
                 num_frames=j["frames"], num_inference_steps=M["steps"], guidance_scale=M["guidance"],
                 generator=torch.Generator("cpu").manual_seed(j["seed"]), output_type="np").frames[0]
        torch.cuda.synchronize(); secs = round(time.time() - t, 1); v = np.asarray(v, dtype=np.float32)
        metrics, fl = flags(v, still)
        if first and "blank" in fl:
            print(f"NAN {j['id']}: blank/NaN on the first clip with {dtype_s}", flush=True); sys.exit(3)
        p = f"clips/{j['id']}.mp4"; export_to_video(list(np.clip(v, 0, 1)), f"{out}/{p}", fps=M["fps"])
        rec.update(seconds=secs, clip_seconds=round(j["frames"] / M["fps"], 2), size=[M["w"], M["h"]], fps=M["fps"],
                   peak_vram_gb=peak(), metrics=metrics, flags=fl, video=p)
    except torch.cuda.OutOfMemoryError as e:
        rec.update(error="out of GPU memory", peak_vram_gb=peak()); torch.cuda.empty_cache()
    except Exception as e:
        rec.update(error=repr(e)[:400]); torch.cuda.empty_cache()
    first = False
    with open(LOG, "a") as f: f.write(json.dumps(rec) + "\\n")
    print(f"done {j['id']}", rec.get("seconds", rec.get("error")), rec.get("flags", ""), flush=True)
print("RESULT {}")
'''))

cells.append(code('''# 2. Driver: fp16 split first (worked in v1), bf16 split if fp16 gives NaN/blank. A crashed worker is restarted (resumes).
def run_worker(dtype, placement, timeout=6 * 3600):
    try:
        p = subprocess.run([sys.executable, "/tmp/i2v_worker.py", dtype, placement, OUT], capture_output=True, text=True, timeout=timeout)
    except subprocess.TimeoutExpired:
        return f"timeout after {timeout}s"
    for l in p.stdout.splitlines():
        if l.startswith(("done ", "loaded", "NAN")): print("   ", l)
    if p.returncode == 0: return None
    if p.returncode == 3: return "nan"
    if p.returncode in (-9, 137): return "Killed (out of system RAM)"
    tail = [l for l in p.stderr.strip().splitlines() if l.strip()][-6:]
    return f"exit {p.returncode}: " + " | ".join(tail)[-700:]

def n_done():
    p = f"{OUT}/clips.jsonl"; return sum(1 for _ in open(p)) if os.path.exists(p) else 0

RUNS = []
for dtype, placement in [("float16", "balanced"), ("bfloat16", "balanced")]:
    for attempt in range(3):
        before = n_done(); t0 = time.time(); err = run_worker(dtype, placement)
        RUNS.append(dict(dtype=dtype, placement=placement, attempt=attempt, wall_s=round(time.time() - t0), clips_made=n_done() - before, error=err))
        print(RUNS[-1])
        if err is None or err == "nan" or n_done() == before: break      # finished, wrong dtype, or no progress: stop retrying
    if err is None: break'''))

cells.append(code('''# 3. Manifest + zip (fetched by experiments/kaggle.sh into experiments/i2v-camera-test/results/)
clips = [json.loads(l) for l in open(f"{OUT}/clips.jsonl")] if os.path.exists(f"{OUT}/clips.jsonl") else []
def avg(xs): return round(sum(xs) / len(xs), 1) if xs else None
summary = {s: dict(made=sum(1 for c in clips if c["set"] == s and "seconds" in c),
                   failed=sum(1 for c in clips if c["set"] == s and "error" in c),
                   avg_seconds=avg([c["seconds"] for c in clips if c["set"] == s and "seconds" in c]),
                   peak_vram_gb=max([c.get("peak_vram_gb", 0) for c in clips if c["set"] == s], default=None)) for s in ("A", "B")}
summary["B_by_frames"] = {n: avg([c["seconds"] for c in clips if c["set"] == "B" and c["frames"] == n and "seconds" in c]) for n in (81, 121)}
manifest = dict(env=ENV, model=MODEL, runs=RUNS, summary=summary, clips=clips)
json.dump(manifest, open(f"{OUT}/manifest.json", "w"), indent=1)
zpath = f"{OUT}/../i2v-camera-test-results.zip"
with zipfile.ZipFile(zpath, "w") as z:
    for root, _, files in os.walk(OUT):
        for f in files: z.write(os.path.join(root, f), os.path.relpath(os.path.join(root, f), OUT))
print("zip:", zpath, round(os.path.getsize(zpath) / 2**20, 1), "MB")
print(json.dumps(summary, indent=1))
for c in clips: print(c["id"], c.get("seconds", c.get("error")), c.get("flags", ""))'''))

nb = dict(nbformat=4, nbformat_minor=5, cells=cells,
          metadata=dict(kernelspec=dict(name="python3", display_name="Python 3", language="python"), language_info=dict(name="python")))
os_path = f"{REPO}/experiments/i2v-camera-test/i2v-camera-test.ipynb"
import os; os.makedirs(os.path.dirname(os_path), exist_ok=True)
json.dump(nb, open(os_path, "w"), indent=1)
print("wrote", os_path, os.path.getsize(os_path) // 1024, "KB")
