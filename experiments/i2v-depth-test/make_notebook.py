# Builds experiments/i2v-depth-test/i2v-depth-test.ipynb (derived from ../i2v-camera-test/make_notebook.py). Run from the repo root:
#   python3 experiments/i2v-depth-test/make_notebook.py
import json, uuid

REPO = "."

def md(s): return dict(cell_type="markdown", id=uuid.uuid4().hex[:8], metadata={}, source=s)
def code(s): return dict(cell_type="code", id=uuid.uuid4().hex[:8], metadata={}, execution_count=None, outputs=[], source=s)

cells = []
cells.append(md("""# Depth-stills test: FLUX.2 klein stills composed for depth → Wan2.2 TI2V-5B camera moves (Kaggle T4 ×2)

Follow-up to `experiments/i2v-camera-test/` (no-go in general: Wan only moved the camera on stills with strong perspective).
Pass bar in `README.md` (set before the run):
- **Stills:** 4 FLUX.2 klein stills composed for one-point perspective (highway, tunnel, server corridor, tile road).
- **Set A:** each still → a 49-frame (2 s) forward camera move. Does depth composition make Wan move reliably?
- **Set B:** `d1` and `d3` at 81 frames (3.4 s) with out-of-memory fixes (expandable CUDA segments, cache cleared per clip).

**Kaggle:** Accelerator **GPU T4 ×2**, Internet **On**, *Save & Run All*. Both models are Apache-2.0 and ungated.
Every clip is checkpointed to `clips.jsonl`; re-running skips finished clips."""))

cells.append(code("""# 1. Install (newest diffusers from source: Wan 2.2 pipelines need it)
!pip install -q -U git+https://github.com/huggingface/diffusers transformers accelerate sentencepiece ftfy imageio imageio-ffmpeg psutil
# Kaggle ships an old torchao that breaks the newest diffusers' import (FqnToConfig, seen in t2i-test v1). We don't use torchao.
!pip uninstall -y -q torchao
!nvidia-smi --query-gpu=name,memory.total,driver_version --format=csv"""))

cells.append(code("""# Fail fast with the real error if a pipeline class is missing
import diffusers
for n in ["Flux2KleinPipeline", "WanImageToVideoPipeline", "AutoencoderKLWan"]:
    assert hasattr(diffusers, n), f"diffusers {diffusers.__version__} has no {n}"; print("ok:", n)"""))

cells.append(code("""import os, json, time, platform, zipfile, base64, subprocess, sys
import numpy as np, torch, transformers, psutil

ON_KAGGLE = os.path.exists("/kaggle")
OUT = "/kaggle/working/i2v" if ON_KAGGLE else "/content/i2v"
for d in ("clips", "stills", "flux"): os.makedirs(f"{OUT}/{d}", exist_ok=True)

N_GPU = torch.cuda.device_count()
ENV = dict(platform="kaggle" if ON_KAGGLE else "colab", ram_gb=round(psutil.virtual_memory().total / 2**30, 1),
           gpus=[torch.cuda.get_device_name(i) for i in range(N_GPU)],
           vram_gb=[round(torch.cuda.get_device_properties(i).total_memory / 2**30, 1) for i in range(N_GPU)],
           torch=torch.__version__, diffusers=diffusers.__version__, transformers=transformers.__version__, python=platform.python_version())
print(json.dumps(ENV, indent=1))
assert N_GPU >= 2, "Needs GPU T4 x2: set the accelerator and re-run\""""))

cells.append(md("""## Stage 1: depth stills with FLUX.2 klein 4B
Settings from `experiments/t2i-test/` (bf16, split across both T4s, 4 steps, guidance 1.0, 720×1280, ~62 s per image).
It runs in its own process, so the GPU is free again for Wan. Raw PNGs go to `flux/`; 480×832 crops for Wan go to `stills/`."""))

shots = [
    ("d1", "A long straight data highway made of flat blue and yellow tile lanes running to a single vanishing point on the horizon, strong one-point perspective, low camera close to the road."),
    ("d2", "A tunnel of concentric square frames in electric blue and deep navy receding to a small bright yellow square at the vanishing point, perfectly symmetrical one-point perspective."),
    ("d3", "A long server-room corridor, rows of tall navy racks with small yellow and blue lights on both sides, receding to a vanishing point, one-point perspective, eye-level view."),
    ("d4", "A road of flat yellow tiles running straight between tall electric blue block towers into the far distance, deep one-point perspective, view from just behind and above the road."),
]
cells.append(code(f"""FLUX = dict(repo="black-forest-labs/FLUX.2-klein-4B", licence="Apache-2.0", w=720, h=1280, steps=4, guidance=1.0)
FLUX_STYLE = ("Flat vector illustration, solid colour blocks, electric blue #2B3BE0, bright yellow #FFD23F, "
              "off-white #EEF1F6 and deep navy #0B1020 only, clean futuristic tech geometry, crisp edges, "
              "minimal, modern, high contrast, vertical 9:16 composition, no gradients, no grain, no glow, "
              "no text, no letters, no logos, no people, not cartoon, not pastel, not childish. ")
SHOTS = {json.dumps([[sid, p, 1234 + i] for i, (sid, p) in enumerate(shots)], indent=1)}
json.dump(dict(FLUX=FLUX, STYLE=FLUX_STYLE, SHOTS=SHOTS), open(f"{{OUT}}/flux/config.json", "w"))"""))

cells.append(code('''%%writefile /tmp/flux_worker.py
# python flux_worker.py <dtype> <out_dir>: makes every still, prints RESULT <json>
import sys, json, time, numpy as np, torch, diffusers as D
from PIL import Image
dtype_s, out = sys.argv[1:3]
C = json.load(open(f"{out}/flux/config.json")); F = C["FLUX"]
t = time.time()
pipe = D.Flux2KleinPipeline.from_pretrained(F["repo"], torch_dtype=getattr(torch, dtype_s), low_cpu_mem_usage=True, device_map="balanced")
if hasattr(pipe.vae, "enable_tiling"): pipe.vae.enable_tiling()
pipe.set_progress_bar_config(disable=True); load_s = round(time.time() - t, 1)
res = []
for sid, prompt, seed in C["SHOTS"]:
    t = time.time()
    img = pipe(prompt=C["STYLE"] + prompt, width=F["w"], height=F["h"], num_inference_steps=F["steps"], guidance_scale=F["guidance"],
               generator=torch.Generator("cpu").manual_seed(seed)).images[0]
    secs = round(time.time() - t, 1); flat = float(np.asarray(img).astype(np.float32).std()) < 2.0
    img.save(f"{out}/flux/{sid}.png")
    ch = round(F["w"] * 832 / 480); top = (F["h"] - ch) // 2      # centre-crop 9:16 to Wan's 480x832, then resize
    img.crop((0, top, F["w"], top + ch)).resize((480, 832), Image.LANCZOS).save(f"{out}/stills/{sid}.jpg", quality=95)
    res.append(dict(id=sid, prompt=C["STYLE"] + prompt, seed=seed, seconds=secs, black_or_nan=flat, load_s=load_s))
    print("still", sid, secs, "flat" if flat else "", flush=True)
print("RESULT " + json.dumps(res))'''))

cells.append(code('''# Run stage 1: bf16 first (worked in t2i-test), fp16 as the fallback
FLUX_RUNS = []
for dtype in ("bfloat16", "float16"):
    p = subprocess.run([sys.executable, "/tmp/flux_worker.py", dtype, OUT], capture_output=True, text=True, timeout=3600)
    lines = [l for l in p.stdout.splitlines() if l.startswith("RESULT ")]
    stills_res = json.loads(lines[-1][7:]) if p.returncode == 0 and lines else None
    FLUX_RUNS.append(dict(dtype=dtype, ok=bool(stills_res), error=None if stills_res else " | ".join(p.stderr.strip().splitlines()[-6:])[-700:]))
    print(FLUX_RUNS[-1]); print(p.stdout[-800:])
    if stills_res and not any(r["black_or_nan"] for r in stills_res): break
assert stills_res, "FLUX stage failed: see FLUX_RUNS"
STILL_RECORDS = stills_res'''))

cells.append(md("""## Config: model, house style, jobs
Settings are the ones that worked in t2v-test v1 (fp16, split across both T4s, VAE fp32, 30 steps, guidance 5.0).
The style prefix no longer says *camera motion*: each prompt names exactly one camera move and keeps the subject still."""))

prompts = {
    "d1": "Smooth forward dolly along the highway toward the vanishing point.",
    "d2": "Steady forward fly-through into the tunnel toward the yellow square.",
    "d3": "The camera glides slowly forward down the corridor between the racks.",
    "d4": "Smooth forward aerial dolly along the road into the distance.",
}
cfg_src = f'''MODEL = dict(repo="Wan-AI/Wan2.2-TI2V-5B-Diffusers", licence="Apache-2.0", w=480, h=832, fps=24, steps=30, guidance=5.0)

STYLE = ("Flat vector motion graphics, solid colour blocks, electric blue #2B3BE0, bright yellow #FFD23F, off-white #EEF1F6 "
         "and deep navy #0B1020 only, clean futuristic tech geometry, crisp edges, minimal, modern, high contrast, "
         "no gradients, no grain, no text, no letters, no logos, no people, not cartoon, not pastel. ")
STILL = " Everything in the scene stays perfectly still and keeps its shape; only the camera moves."
NEG = ("text, letters, watermark, logo, people, faces, hands, blurry, low quality, distorted, flicker, jitter, noisy, gradients, "
       "morphing, melting, warping, objects moving, shapes changing")

PROMPTS = {json.dumps(prompts, indent=1)}
# Set A: every still at 49 frames; Set B: d1/d3 at 81 frames, run last as in i2v-camera-test (Wan needs 4n+1 frames)
JOBS = ([dict(id=f"A-{{s}}-1234", set="A", still=s, seed=1234, frames=49) for s in PROMPTS]
        + [dict(id=f"B-{{s}}-f81", set="B", still=s, seed=1234, frames=81) for s in ("d1", "d3")])
for j in JOBS: j["prompt"] = PROMPTS[j["still"]] + STILL

assert all(os.path.exists(f"{{OUT}}/stills/{{s}}.jpg") for s in PROMPTS), "missing stills from stage 1"
json.dump(dict(MODEL=MODEL, STYLE=STYLE, NEG=NEG, JOBS=JOBS, OUT=OUT), open(f"{{OUT}}/config.json", "w"))
print(len(JOBS), "jobs:", [j["id"] for j in JOBS])'''
cells.append(code(cfg_src))

cells.append(md("""## Worker: one process loads the model once and makes every unfinished clip
A crash or `Killed` loses only the clip in progress: finished clips are in `clips.jsonl` and the driver restarts the worker.
An out-of-memory clip is recorded as an error and skipped. Out-of-memory fixes under test: `PYTORCH_CUDA_ALLOC_CONF=expandable_segments:True`
(set before torch loads) and `gc.collect()` + `torch.cuda.empty_cache()` before every clip.

Auto-flags are advisory (scoring comes from contact sheets): `blank` (NaN or per-frame std < 0.05), `static` (no frame-to-frame change),
`drift` (colour histogram of the last frame far from the input still: a cheap proxy for melting) and `hue_collapse`
(one hue covers > 90 % of the last frame while the still is mixed)."""))

cells.append(code('''%%writefile /tmp/i2v_worker.py
# python i2v_worker.py <dtype> <placement> <out_dir>; exit 3 = first clip NaN/blank (driver tries the next dtype)
import os; os.environ.setdefault("PYTORCH_CUDA_ALLOC_CONF", "expandable_segments:True")   # before torch: less fragmentation
import sys, json, gc, time, numpy as np, torch, diffusers as D
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
    gc.collect(); torch.cuda.empty_cache()
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

cells.append(code('''# 3. Manifest + zip (fetched by experiments/kaggle.sh into experiments/i2v-depth-test/results/)
clips = [json.loads(l) for l in open(f"{OUT}/clips.jsonl")] if os.path.exists(f"{OUT}/clips.jsonl") else []
def avg(xs): return round(sum(xs) / len(xs), 1) if xs else None
summary = {s: dict(made=sum(1 for c in clips if c["set"] == s and "seconds" in c),
                   failed=sum(1 for c in clips if c["set"] == s and "error" in c),
                   avg_seconds=avg([c["seconds"] for c in clips if c["set"] == s and "seconds" in c]),
                   peak_vram_gb=max([c.get("peak_vram_gb", 0) for c in clips if c["set"] == s], default=None)) for s in ("A", "B")}
manifest = dict(env=ENV, flux=FLUX, flux_runs=FLUX_RUNS, stills=STILL_RECORDS, model=MODEL, runs=RUNS, summary=summary, clips=clips)
json.dump(manifest, open(f"{OUT}/manifest.json", "w"), indent=1)
zpath = f"{OUT}/../i2v-depth-test-results.zip"
with zipfile.ZipFile(zpath, "w") as z:
    for root, _, files in os.walk(OUT):
        for f in files: z.write(os.path.join(root, f), os.path.relpath(os.path.join(root, f), OUT))
print("zip:", zpath, round(os.path.getsize(zpath) / 2**20, 1), "MB")
print(json.dumps(summary, indent=1))
for c in clips: print(c["id"], c.get("seconds", c.get("error")), c.get("flags", ""))'''))

nb = dict(nbformat=4, nbformat_minor=5, cells=cells,
          metadata=dict(kernelspec=dict(name="python3", display_name="Python 3", language="python"), language_info=dict(name="python")))
os_path = f"{REPO}/experiments/i2v-depth-test/i2v-depth-test.ipynb"
import os; os.makedirs(os.path.dirname(os_path), exist_ok=True)
json.dump(nb, open(os_path, "w"), indent=1)
print("wrote", os_path, os.path.getsize(os_path) // 1024, "KB")
