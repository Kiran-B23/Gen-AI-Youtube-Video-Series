"""QA stills: snapshot the middle (and 85%) of every scene via HyperFrames, then build out/stills.png with safe-zone guides."""
import glob, json, os, subprocess, sys
from PIL import Image, ImageDraw
STUDIO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
slug = sys.argv[1]; P = os.path.join(STUDIO, "projects", slug)
lay = json.load(open(os.path.join(P, "build", "layout.json")))
ts = sorted({round(sc["start"] + sc["duration"] * f, 2) for sc in lay["scenes"] for f in (0.5, 0.85)} | {0.0})
snap = os.path.join(P, "out", "snapshots"); os.makedirs(snap, exist_ok=True)
for f in glob.glob(os.path.join(snap, "*")): os.remove(f)
subprocess.run(["npx", "--yes", "hyperframes@0.8.143", "snapshot", "--at", ",".join(map(str, ts)), "--no-end", "-o", snap, "--describe", "off"],
               cwd=os.path.join(P, "hf"), check=False, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
shots = sorted(glob.glob(os.path.join(snap, "*.png")))
if not shots: sys.exit("no snapshots produced")
w, h = 360, 640; cols = 8; rows = (len(shots) + cols - 1) // cols
sheet = Image.new("RGB", (w * cols, h * rows), "black")
for i, f in enumerate(shots):
    im = Image.open(f).convert("RGB").resize((w, h)); d = ImageDraw.Draw(im)
    d.rectangle([0, int(h * 0.85), w, h], outline="red", width=2)                                  # bottom 15%: platform title/channel
    d.rectangle([int(w * 0.88), int(h * 0.5), w, int(h * 0.85)], outline="red", width=2)             # lower-right button column
    d.rectangle([int(w * 40 / 1080), int(h * 220 / 1920), int(w * 1040 / 1080), int(h * 1260 / 1920)], outline=(255, 255, 0))  # visual zone
    d.rectangle([int(w * 72 / 1080), int(h * 1555 / 1920), int(w * 952 / 1080), int(h * 1730 / 1920)], outline=(0, 255, 255))  # caption zone
    d.line([w // 2, 0, w // 2, h], fill=(0, 255, 255))                                               # centre line
    d.text((4, h - 14), os.path.basename(f)[:40], fill="yellow"); sheet.paste(im, ((i % cols) * w, (i // cols) * h))
out = os.path.join(P, "out", "stills.png"); sheet.save(out); print(f"{len(shots)} stills -> {os.path.relpath(out, STUDIO)}")
