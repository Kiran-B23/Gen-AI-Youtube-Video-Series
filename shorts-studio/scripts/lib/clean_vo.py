import glob, os, subprocess, sys, soundfile as sf, imageio_ffmpeg
FF = imageio_ffmpeg.get_ffmpeg_exe()
SRC, DST = sys.argv[1], sys.argv[2]
TRIM = "silenceremove=start_periods=1:start_duration=0:start_threshold=-45dB:start_silence=0.15"
CHAIN = f"{TRIM},areverse,{TRIM},areverse,highpass=f=80,afftdn=nr=8:nf=-40,acompressor=threshold=-20dB:ratio=3:attack=8:release=120:makeup=2,deesser=i=0.4,loudnorm=I=-16:TP=-2:LRA=7"
os.makedirs(DST, exist_ok=True)
d = {}
for f in sorted(glob.glob(os.path.join(SRC, "s[0-9][0-9].*"))):
    b = os.path.basename(f)[:3]
    out = os.path.join(DST, b + ".wav")
    subprocess.run([FF, "-v", "error", "-y", "-i", f, "-af", CHAIN, "-ar", "48000", "-ac", "1", out], check=True)
    d[b] = sf.info(out).duration
for k, v in d.items(): print(k, "%.2f" % v)
p1 = sum(d["s%02d" % i] + 0.3 for i in range(1, 9)); p2 = sum(d["s%02d" % i] + 0.3 for i in range(9, 17))
print("Part1 %.1fs  Part2 %.1fs  Full %.1fs" % (p1, p2, p1 + p2))
