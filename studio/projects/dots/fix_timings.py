r"""Project-local workaround (not shared): merge Whisper's split thousands ("4", ",000") into one caption word ("4,000").
Run after every `voice`. Proposed shared fix: in tools/voice.py, also merge tokens matching r"^,\d" into the previous digit word."""
import json, re, os
p = os.path.join(os.path.dirname(os.path.abspath(__file__)), "build", "timings.json"); t = json.load(open(p))
for sid, v in t.items():
    out = []
    for w in v["words"]:
        if out and re.match(r"^,\d", w["w"]) and re.search(r"\d$", out[-1]["w"]):
            out[-1] = {"w": out[-1]["w"] + w["w"], "s": out[-1]["s"], "e": w["e"]}
        else: out.append(w)
    v["words"] = out
json.dump(t, open(p, "w"), indent=1); print("timings: thousands merged")
