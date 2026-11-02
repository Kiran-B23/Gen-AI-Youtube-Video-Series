"""
The fix list: merge every ✗ from out/qa.json, out/payoffs.json and out/watch.json into projects/<slug>/review.md
(committed; out/ is not). Rows keep their status across runs (matched by id); a finding that no longer appears is
marked "fixed (not in the latest run)". The reviewer adds their own rows from the sheets and the listen.

usage: python tools/review.py <slug> [--check | --listened]
  --check: exit 1 if any row is open, or either tick is missing ("Watched end to end": the reviewer read every sheet;
           "Listened on a phone with sound": the user)
  --listened: the user, after watching and listening to this render on a phone: writes the seal studio/watched/<slug>.json
             (the sha1 of each MP4 in out/) that deliver requires. Agent sessions cannot write studio/watched/ (sandbox).
"""
import hashlib, json, os, re, sys, time

STUDIO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
slug = sys.argv[1]; checkonly = "--check" in sys.argv
P = os.path.join(STUDIO, "projects", slug); O = os.path.join(P, "out")
R = os.path.join(P, "review.md")
if "--listened" in sys.argv:
    files = {f: hashlib.sha1(open(os.path.join(O, f), "rb").read()).hexdigest() for f in (f"{slug}.mp4", f"{slug}-remotion.mp4") if os.path.exists(os.path.join(O, f))}
    if not files: sys.exit("no rendered MP4 in out/: render first")
    os.makedirs(os.path.join(STUDIO, "watched"), exist_ok=True)
    json.dump({"date": time.strftime("%Y-%m-%d"), "by": "terminal", "files": files}, open(os.path.join(STUDIO, "watched", f"{slug}.json"), "w"), indent=1)
    print(f"listened seal -> studio/watched/{slug}.json ({', '.join(files)}); tick 'Listened on a phone with sound' in review.md too"); sys.exit(0)
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
h = (po or {}).get("hook")
if h and not h.get("ok"): found.append(("still:hook", f"{h['at']}s", "s01", f"hook frame fills {round(h['fill'] * 100)}% of the stage band (need ≥ {round(h['need'] * 100)}%): the hook question large at the top, the running object acting under it"))
for o in (po or {}).get("opening", []):
    if not o["ok"]: found.append((f"open:{o['at']}", f"{o['at']}s", "s01", f"opening: {o['units']} things / {o['words']} words on screen (max {o['max_units']} / {o['max_words']}, captions and chips counted): open on the question's first words + one object and build the hook on its words [{' · '.join(o['list'])[:120]}]"))
for w in (po or {}).get("warnings", []): found.append((f"warn:{w.split(':')[0].strip()}", "", w.split(":")[0].split("/")[0] if ":" in w else "", w))
# unclear words: keyed by scene + word (not time), so a retake that shifts the timing keeps the same row; short common
# words are listed only when Whisper was nearly lost (p < 0.15), since a low score on "is" or "the" is mostly noise
COMMON = set("a an and are as at be but by do for from i if in is it its of on or so that the their them then they this to was we what when which who will with you your now every next".split())
for u in (wa or {}).get("unclear", []):
    w = re.sub(r"[^a-z0-9]", "", u["word"].lower())
    if w in COMMON and u["p"] >= 0.15: continue
    found.append((f"unclear:{u['scene']}/{w}", f"{u['t']:.1f}s", u["scene"], f"unclear word \"{u['word']}\" (p={u['p']:.2f}): listen; respell or add to names if mispronounced"))
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
            # an unclear word that drops out was not fixed by anyone: Whisper just heard it clearly this time
            r["status"] = (f"fixed (heard clearly in the {time.strftime('%Y-%m-%d')} run)" if id_.startswith("unclear:")
                           else f"fixed (not in the {time.strftime('%Y-%m-%d')} run)")
    table = "| id | time | scene | finding | status |\n|---|---|---|---|---|\n" + "".join(f"| {k} | {r['time']} | {r['scene']} | {r['finding']} | {r['status']} |\n" for k, r in rows.items())
    text = re.sub(r"\| id \| time \| scene \| finding \| status \|\n\|---\|---\|---\|---\|---\|\n(?:\|.*\|\n)*", table, text)
    open(R, "w").write(text)

open_rows = [k for k, r in rows.items() if r["status"].lower().startswith("open")]   # "open (needs the user's ear)" is still open
watched = bool(re.search(r"- \[x\] Watched end to end", text))
listened = bool(re.search(r"- \[x\] Listened on a phone with sound", text))
print(f"review.md: {len(rows)} finding(s), {len(open_rows)} open" + ("" if watched else " · not yet ticked 'Watched end to end'")
      + ("" if listened else " · the user has not ticked 'Listened on a phone with sound'"))
for k in open_rows[:30]: print(f"  open  {k}: {rows[k]['finding'][:110]}")
if checkonly and (open_rows or not watched or not listened): sys.exit(1)
