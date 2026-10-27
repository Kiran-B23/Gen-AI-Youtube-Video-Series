"""
The fix list: merge every ✗ from out/qa.json, out/payoffs.json and out/watch.json into projects/<slug>/review.md
(committed; out/ is not). Rows keep their status across runs (matched by id); a finding that no longer appears is
marked "fixed (not in the latest run)". The reviewer adds their own rows from the sheets and the listen.

usage: python tools/review.py <slug> [--check]     --check: exit 1 if any row is open or the watched tick is missing
"""
import json, os, re, sys, time

STUDIO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
slug = sys.argv[1]; checkonly = "--check" in sys.argv
P = os.path.join(STUDIO, "projects", slug); O = os.path.join(P, "out")
R = os.path.join(P, "review.md")
def load(f):
    try: return json.load(open(os.path.join(O, f))) if os.path.exists(os.path.join(O, f)) else None
    except ValueError: print(f"  ⚠ out/{f} is not valid JSON (an interrupted run?): re-run that step"); return None
qa, po, wa = load("qa.json"), load("payoffs.json"), load("watch.json")

found = []   # (id, time, scene, finding)
for c in (qa or {}).get("checks", []):
    if not c["ok"]: found.append((f"qa:{c['name']}", "", "", f"{c['name']}: {c['detail']}"))
for b in (po or {}).get("beats", []):
    if not b.get("ok") and not b.get("skipped"): found.append((f"beat:{b['scene']}/{b['target']}", f"{b['at']:.1f}s", b["scene"], f"\"{b['word']}\" → {b['target']}: {b['reason']}"))
for c in (po or {}).get("captions", []): found.append((f"cap:{c['scene']}@{c['at']}", f"{c['at']}s", c["scene"], f"caption {c['height']}px tall: \"{c['words'][:60]}\""))
for e in (po or {}).get("edges", []): found.append((f"edge:{e['el'][:24]}@{e['from']}", f"{e['from']}s", "", f"text cut at the frame edge {e['from']}–{e['to']}s: \"{e['el']}\" (x {e['left']}..{e['right']})"))
for m in (po or {}).get("motion", []):
    if not m["ok"]: found.append((f"still:{m['scene']}", f"{m['at']}s", m["scene"], f"nothing planned moves for {m['longest_still_s']}s"))
for w in (po or {}).get("warnings", []): found.append((f"warn:{w.split(':')[0].strip()}", "", w.split(":")[0].split("/")[0] if ":" in w else "", w))
for u in (wa or {}).get("unclear", []): found.append((f"unclear:{u['scene']}@{u['t']}", f"{u['t']:.1f}s", u["scene"], f"unclear word \"{u['word']}\" (p={u['p']:.2f}): listen; respell or add to names if mispronounced"))
for g in (wa or {}).get("gates", []):
    if not g["ok"]: found.append((f"watch:{g['name']}", "", "", f"{g['name']}: {g['detail']}"))

if not os.path.exists(R):
    open(R, "w").write(open(os.path.join(STUDIO, "templates", "project", "review.md")).read().replace("__SLUG__", slug))
text = open(R).read()
rows = {}
for m in re.finditer(r"^\| (?P<id>[^|]+?) \| (?P<time>[^|]*?) \| (?P<scene>[^|]*?) \| (?P<finding>.*?) \| (?P<status>[^|]*?) \|$", text, re.M):
    if m["id"].strip() in ("id", "---"): continue
    rows[m["id"].strip()] = dict(time=m["time"].strip(), scene=m["scene"].strip(), finding=m["finding"].strip(), status=m["status"].strip())
if not checkonly:
    seen = set()
    for id_, t, sc, f in found:
        seen.add(id_)
        if id_ in rows and rows[id_]["status"].startswith("accepted"): continue
        keep = rows[id_]["status"] if id_ in rows and rows[id_]["status"].lower().startswith("open") else "open"   # keep a reviewer's note on an open row
        rows[id_] = dict(time=t, scene=sc, finding=f, status=keep)
    for id_, r in rows.items():
        if id_ not in seen and r["status"].lower().startswith("open") and id_.split(":")[0] in ("qa", "beat", "cap", "still", "warn", "unclear", "watch"):
            r["status"] = f"fixed (not in the {time.strftime('%Y-%m-%d')} run)"
    table = "| id | time | scene | finding | status |\n|---|---|---|---|---|\n" + "".join(f"| {k} | {r['time']} | {r['scene']} | {r['finding']} | {r['status']} |\n" for k, r in rows.items())
    text = re.sub(r"\| id \| time \| scene \| finding \| status \|\n\|---\|---\|---\|---\|---\|\n(?:\|.*\|\n)*", table, text)
    open(R, "w").write(text)

open_rows = [k for k, r in rows.items() if r["status"].lower().startswith("open")]   # "open (needs the user's ear)" is still open
watched = bool(re.search(r"- \[x\] Watched end to end", text))
print(f"review.md: {len(rows)} finding(s), {len(open_rows)} open" + ("" if watched else " · not yet ticked 'Watched end to end'"))
for k in open_rows[:30]: print(f"  open  {k}: {rows[k]['finding'][:110]}")
if checkonly and (open_rows or not watched): sys.exit(1)
