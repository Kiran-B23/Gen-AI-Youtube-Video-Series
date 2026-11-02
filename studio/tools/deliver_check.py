"""deliver gate: qa.json clean for THIS mp4, payoffs.json clean for THIS composition, watch.json present. usage: deliver_check.py <slug> <mp4> [RM]"""
import hashlib, json, os, sys
STUDIO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
slug, F, RM = sys.argv[1], sys.argv[2], (sys.argv[3] if len(sys.argv) > 3 else "")
P = os.path.join(STUDIO, "projects", slug); O = os.path.join(P, "out"); bad = []
sha = lambda f: hashlib.sha1(open(f, "rb").read()).hexdigest()
qa = os.path.join(O, "qa.json")
def jload(f):
    try: return json.load(open(f))
    except ValueError: return None
if not os.path.exists(qa): bad.append("no out/qa.json: run qa")
elif (q := jload(qa)) is None: bad.append("out/qa.json is unreadable (an interrupted run?): run qa again")
else:
    if q["sha1"] != sha(F): bad.append("qa.json is for an older MP4: run qa again")
    bad += [f"qa ✗ {c['name']}: {c['detail']}" for c in q["checks"] if not c["ok"]]
po, ix = os.path.join(O, "payoffs.json"), os.path.join(P, "hf", "index.html")
if not RM:
    if not os.path.exists(po): bad.append("no out/payoffs.json: run payoffs")
    elif (p := jload(po)) is None: bad.append("out/payoffs.json is unreadable: run payoffs again")
    else:
        if p["index_sha1"] != sha(ix): bad.append("payoffs.json is for an older composition: run payoffs again")
        elif p["summary"]["failed"] or p["summary"]["caption_overflow"] or p["summary"]["still_scenes"] or p["summary"].get("edge_crops") or not p.get("hook", {"ok": True})["ok"]: bad.append("payoffs.json has failed beats / caption overflow / still scenes / a weak hook frame")
if not os.path.exists(os.path.join(O, "watch-remotion.json" if RM else "watch.json")): bad.append("no out/watch.json: run watch")
# the user's listened seal (studio/watched/<slug>.json, outside every folder an agent session can write): written by the
# Review page's "Listened on a phone with sound" tick or `review.py <slug> --listened`, for this exact MP4. A ticked
# review.md alone is not enough.
seal = os.path.join(STUDIO, "watched", f"{slug}.json")
s = jload(seal) if os.path.exists(seal) else None
if not s: bad.append("the user has not listened to this video: tick 'Listened on a phone with sound' on the Review page (or run review.py <slug> --listened) after watching and listening on a phone")
elif s.get("files", {}).get(os.path.basename(F)) != sha(F): bad.append("the user's listened mark is for an older render: watch and listen to this one and tick again")
for b in bad: print("  ✗", b)
sys.exit(1 if bad else 0)
