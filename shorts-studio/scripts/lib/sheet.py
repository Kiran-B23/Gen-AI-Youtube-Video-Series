import glob, sys
from PIL import Image, ImageDraw
files = sorted(glob.glob(sys.argv[1] + "/*.png")); out = sys.argv[2]; per = 8
for g in range(0, len(files), per):
    chunk = files[g:g+per]; sheet = Image.new("RGB", (per*360, 640), "black")
    for i, f in enumerate(chunk):
        im = Image.open(f).convert("RGB").resize((360, 640)); d = ImageDraw.Draw(im)
        d.rectangle([0, 512, 360, 640], outline="red", width=2); d.line([317, 0, 317, 640], fill="red", width=2)
        d.line([0, 160, 360, 160], fill=(255,255,0), width=1); d.line([0, 384, 360, 384], fill=(255,255,0), width=1)
        d.text((4, 626), f.split("/")[-1][:40], fill="yellow"); sheet.paste(im, (i*360, 0))
    sheet.save(f"{out}-{g//per}.png")
print("sheets", (len(files)+per-1)//per)
