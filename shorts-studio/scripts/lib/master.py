"""Two-pass loudnorm to -14 LUFS / -1 dBTP, video stream copied. Reports measured loudness of the result."""
import json, re, subprocess, sys, imageio_ffmpeg
FF = imageio_ffmpeg.get_ffmpeg_exe()
src, dst, codec = sys.argv[1], sys.argv[2], (sys.argv[3] if len(sys.argv) > 3 else "aac")
def measure(path):
    r = subprocess.run([FF, "-hide_banner", "-i", path, "-vn", "-af", "loudnorm=I=-14:TP=-1:LRA=11:print_format=json", "-f", "null", "-"], capture_output=True, text=True)
    return json.loads(re.findall(r"\{[^{}]+\}", r.stderr)[-1])
m = measure(src)
af = (f"loudnorm=I=-14:TP=-1.2:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}"
      f":measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true,aresample=48000")
acodec = ["-c:a", "aac", "-b:a", "256k"] if codec == "aac" else ["-c:a", "libmp3lame", "-b:a", "256k"]
subprocess.run([FF, "-v", "error", "-y", "-i", src, "-map", "0:v", "-map", "0:a", "-c:v", "copy", "-af", af, *acodec, "-movflags", "+faststart", dst], check=True)
r = subprocess.run([FF, "-hide_banner", "-i", dst, "-vn", "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr
I = re.findall(r"I:\s+(-?[\d.]+) LUFS", r)[-1]; TP = re.findall(r"Peak:\s+(-?[\d.]+) dBFS", r)[-1]
print(f"{dst.split('/')[-1]}: before {m['input_i']} LUFS / {m['input_tp']} dBTP  ->  after {I} LUFS integrated, true peak {TP} dBTP")
