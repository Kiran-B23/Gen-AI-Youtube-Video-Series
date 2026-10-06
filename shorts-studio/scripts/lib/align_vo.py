import json, re, sys, difflib
src = json.load(open(sys.argv[1]))
norm = lambda w: re.sub(r"[^a-z0-9]", "", w.lower())
has_digit = lambda w: bool(re.search(r"\d", w))
out = {}
for sid, d in src.items():
    # 1) rejoin fragments whisper split ("sign" "-ups", "0" ".85", "0" ".8" "-9")
    ws = []
    for w in d["words"]:
        if ws and re.match(r"^[-.]\S", w["w"]) and not ws[-1]["w"].endswith((".", ",", "?", "!")):
            ws[-1] = {"w": ws[-1]["w"] + w["w"], "s": ws[-1]["s"], "e": w["e"]}
        else:
            ws.append(dict(w))
    # undo any earlier fuzzy "fixes": whisper raw text isn't kept, so realign purely on the script
    sc = d["script"].split()
    sm = difflib.SequenceMatcher(None, [norm(x) for x in sc], [norm(w["w"]) for w in ws], autojunk=False)
    res = []
    ops = sm.get_opcodes()
    for k, (tag, i1, i2, j1, j2) in enumerate(ops):
        if tag == "equal":
            for a, b in zip(range(i1, i2), range(j1, j2)):
                res.append({"w": sc[a], "s": ws[b]["s"], "e": ws[b]["e"]})
        elif tag == "replace":
            wseg = ws[j1:j2]
            if any(has_digit(w["w"]) for w in wseg):
                # numbers: show whisper's numerals, but keep script punctuation of the last token
                for w in wseg: res.append({"w": w["w"].rstrip(".,!?:;"), "s": w["s"], "e": w["e"]})
                tail = re.search(r"[.,!?:;]+$", sc[i2 - 1]); 
                if tail: res[-1]["w"] += tail.group(0)
            else:
                t0, t1 = wseg[0]["s"], wseg[-1]["e"]; n = i2 - i1
                for m, a in enumerate(range(i1, i2)):
                    res.append({"w": sc[a], "s": round(t0 + (t1 - t0) * m / n, 3), "e": round(t0 + (t1 - t0) * (m + 1) / n, 3)})
        elif tag == "delete":
            prev_digit = k > 0 and ops[k - 1][0] == "replace" and any(has_digit(w["w"]) for w in ws[ops[k - 1][3]:ops[k - 1][4]])
            if prev_digit:  # e.g. script "dollars" after whisper "$40 million" -> already said by the "$"
                if res: res[-1]["w"] = res[-1]["w"].rstrip(".,!?:;") + (re.search(r"[.,!?:;]*$", sc[i2 - 1]).group(0))
                continue
            t0 = res[-1]["e"] if res else 0.0
            t1 = ws[j1]["s"] if j1 < len(ws) else t0 + 0.3 * (i2 - i1)
            n = i2 - i1
            for m, a in enumerate(range(i1, i2)):
                res.append({"w": sc[a], "s": round(t0 + (t1 - t0) * m / n, 3), "e": round(t0 + (t1 - t0) * (m + 1) / n, 3)})
        elif tag == "insert":
            for w in ws[j1:j2]:
                if has_digit(w["w"]): res.append(w)
    out[sid] = {"duration": None, "words": res}
    print(sid, " ".join(w["w"] for w in res))
json.dump(out, open(sys.argv[2], "w"), indent=1)
