"""
Deterministic eval of a video-scripter package (productions/<date>-<slug>/). Run it at the QA stage;
every ✗ must be fixed before handing over. Judgement checks (is the hook good? is the archetype right?)
stay in qa.md; this catches what a script can check reliably.

usage: python3 .claude/skills/video-scripter/scripts/lint_package.py productions/<folder> [--format reel|explainer|session]
       … --read-aloud        print the reel's read-aloud text (what the script-comprehension Goldfish is given)
       … --read-aloud-sha1   print its sha1 (comprehension.md records it; a stale report fails the lint)
       … --viewer-text       per beat: the spoken line + the words readable on screen (storyboard overlay + quoted UI text);
                             give this to the Goldfish once a storyboard exists, so it judges the video, not only the audio
"""
import glob, os, re, sys

D = sys.argv[1].rstrip("/")
FMT = sys.argv[sys.argv.index("--format") + 1] if "--format" in sys.argv else None
ARCHETYPES = ["concept", "launch", "tutorial", "comparison", "myth-buster", "myth", "tips", "risk", "story", "trend"]
TAGS = ["TITLE", "NUMBER", "VS", "VERDICT", "LIST", "RECAP", "CODE", "ANIMATE", "SCREEN", "TERMINAL", "CTA"]
AVOID = ["game-changer", "game changer", "revolutionary", "mind-blowing", "delve", "unleash", "fast-paced world",
         "let's dive in", "without further ado", "hey guys", "in this video", "welcome back"]
TRIVIA = [r"\bheadquarter", r"\bfounded in\b", r"\bannounced (at|on)\b", r"\bunveiled at\b", r"\bfunding round\b", r"\bseries [a-d]\b"]
WPS, MAX_BEAT_S = 2.7, 6.0          # long reels (> 60 s, benchmark depth) may run beats to 10 s if the storyboard shows an internal visual change
res = []
def check(name, ok, detail=""): res.append((ok, name, detail))
def read(name):
    f = os.path.join(D, name)
    return open(f, encoding="utf-8").read() if os.path.exists(f) else None

# ---------- files ----------
scripts = sorted(f for f in glob.glob(os.path.join(D, "script-*.md")) if not f.endswith("script-review.md"))   # script-review.md is the review, not a script
fmts = [os.path.basename(f)[7:-3] for f in scripts] if not FMT else [FMT]

def read_aloud(path):
    """The narration exactly as the voice reads it: the script's `## Read-aloud version` section, whitespace normalised."""
    parts = re.split(r"##\s*Read-aloud version[^\n]*\n", open(path, encoding="utf-8").read())
    if len(parts) < 2: return ""
    body = re.split(r"\n## ", parts[1])[0]
    return "\n\n".join(p.strip() for p in re.split(r"\n\s*\n", body) if p.strip() and not p.strip().startswith("_"))
def ra_sha1(path):
    import hashlib
    return hashlib.sha1(re.sub(r"\s+", " ", read_aloud(path)).strip().encode()).hexdigest()[:12]
_main = next((f for f in scripts if f.endswith("script-reel.md")), scripts[0] if scripts else None)
def viewer_text(path):
    """What a viewer gets per beat: the spoken line plus the words they can read on screen (the storyboard's Text overlay
    and every quoted string in its 'What the visual shows' cell: labels, UI text, chips). The Goldfish watches, not only listens."""
    sb = next(iter(sorted(glob.glob(os.path.join(D, "storyboard-*.md")))), None)
    if not sb: return read_aloud(path)
    rows = [l for l in open(sb, encoding="utf-8").read().splitlines() if l.startswith("|")]
    head = next((r for r in rows if re.search(r"Spoken line", r, re.I)), None)
    if not head: return read_aloud(path)
    cols = [c.strip().lower() for c in head.strip("|").split("|")]
    ci = lambda key: next((k for k, c in enumerate(cols) if key in c), None)
    i_say, i_vis, i_ovl = ci("spoken"), ci("what the visual"), ci("overlay")
    out = []
    for r in rows:
        c = [x.strip() for x in r.strip("|").split("|")]
        if not re.match(r"^\d+$", c[0] if c else ""): continue
        say = re.sub(r"\[[^\]]*\]", "", c[i_say]).strip() if i_say is not None and i_say < len(c) else ""
        seen = re.findall(r"[\"“]([^\"”]{2,80})[\"”]", c[i_vis]) if i_vis is not None and i_vis < len(c) else []
        ovl = c[i_ovl] if i_ovl is not None and i_ovl < len(c) and c[i_ovl] not in ("", "—", "-", "none") else ""
        screen = [x for x in ([ovl] if ovl else []) + seen if x]
        out.append(f"VOICE: {say}" + (f"\nON SCREEN: {' · '.join(dict.fromkeys(screen))}" if screen else ""))
    return "\n\n".join(out)
if "--viewer-text" in sys.argv:
    if not _main: sys.exit("no script-<format>.md in " + D)
    print(viewer_text(_main)); sys.exit(0)
if "--read-aloud" in sys.argv or "--read-aloud-sha1" in sys.argv:
    if not _main: sys.exit("no script-<format>.md in " + D)
    print(ra_sha1(_main) if "--read-aloud-sha1" in sys.argv else read_aloud(_main)); sys.exit(0)
need = ["brief.md", "research.md", "inspiration.md", "hooks.md", "art-direction.md", "publish.md", "qa.md", "package.md"]
need += [f"script-{x}.md" for x in fmts] + [f"storyboard-{x}.md" for x in fmts]
missing = [n for n in need if read(n) is None]
check("files present", not missing and scripts, "missing: " + ", ".join(missing or ["script-*.md"]) if (missing or not scripts) else f"{len(need)} files")

# ---------- brief ----------
brief = read("brief.md") or ""
arch = re.search(r"\*\*Archetype\*\*\s*\|\s*primary:\s*([A-Za-z-]+)", brief, re.I)
check("archetype stated", bool(arch) and arch.group(1).lower() in ARCHETYPES, arch.group(1) if arch else "no 'primary: <archetype>' in brief.md")
q = re.search(r"\*\*Viewer's question\*\*\s*\|\s*([^|\n]+)", brief)
check("viewer's question", bool(q) and len(q.group(1).strip(" _()")) > 8 and "what they want" not in q.group(1), (q.group(1).strip() if q else "missing")[:80])
why = re.search(r"\*\*Why this archetype\*\*\s*\|\s*([^|\n]+)", brief)
check("archetype confirmed with evidence", bool(why) and "confirmed" in why.group(1) and not re.search(r"confirmed after YouTube analysis: _", why.group(1)), (why.group(1).strip() if why else "missing")[:100])

# ---------- inspiration / research ----------
insp = read("inspiration.md") or ""
yt = os.path.exists(os.path.join(D, "yt", "summary.md"))
watched = re.search(r"^#+ .*watched", insp, re.I | re.M) and len(re.findall(r"youtube\.com/(?:watch|shorts)|youtu\.be/", insp)) >= 3
check("YouTube analysis", yt or watched or re.search(r"not watched|couldn't be watched|bot check", insp, re.I),
      "yt/summary.md present" if yt else "watched videos listed in inspiration.md" if watched else "no yt/summary.md, no watched-videos list with links in inspiration.md, and no stated reason")
check("winners vs low performers", bool(re.search(r"## Winners vs low performers\s*\n+-\s*\S", insp)), "section filled" if re.search(r"## Winners vs low performers\s*\n+-\s*\S", insp) else "empty")
research = read("research.md") or ""
sources = set(re.findall(r"\bS(\d+)\b", research))

# ---------- scripts ----------
for f in scripts:
    name = os.path.basename(f); s = open(f, encoding="utf-8").read(); fmt = name[7:-3]
    rows = [r for r in s.split("\n") if r.startswith("|") and not re.match(r"\|\s*-", r) and not re.match(r"\|\s*#\s*\|", r)]
    rows = [r for r in rows if re.search(r"\|\s*\d+\s*\|", r[:6])]   # numbered beat rows
    if fmt == "reel":
        check(f"{name}: beat rows", len(rows) >= 5, f"{len(rows)} beats")
        no_tag, long_beats, long_sent = [], [], []
        total_words = sum(len(re.sub(r"\[[^\]]*\]", "", ([c.strip() for c in r.strip("|").split("|")] + ["", "", "", ""])[3]).split()) for r in rows)
        max_beat = 10.0 if total_words / WPS > 60 else MAX_BEAT_S
        for r in rows:
            cells = [c.strip() for c in r.strip("|").split("|")]
            line = cells[3] if len(cells) > 3 else ""
            spoken = re.sub(r"\[[^\]]*\]", "", line)
            if not any(f"[{t}]" in r for t in TAGS): no_tag.append(cells[0])
            n = len(spoken.split())
            if n / WPS > max_beat: long_beats.append(f"#{cells[0]} {n}w")
            long_sent += [f"#{cells[0]}" for x in re.split(r"[.!?]", spoken) if len(x.split()) > 16]
        check(f"{name}: visual tag on every beat", not no_tag, "missing on " + ", ".join(no_tag) if no_tag else f"{len(rows)}/{len(rows)}")
        check(f"{name}: beats ≤ {max_beat:.0f} s", not long_beats, ", ".join(long_beats) or "ok")
        check(f"{name}: sentences ≤ 16 words", not long_sent, ", ".join(sorted(set(long_sent))) or "ok")
    ra = re.split(r"##\s*Read-aloud version[^\n]*\n", s)
    if fmt == "reel":
        text = ra[1].strip() if len(ra) > 1 else ""
        words = len(text.split())
        check(f"{name}: read-aloud present", words > 0, f"{words} words ≈ {words / WPS:.0f}s")
        check(f"{name}: runtime 30 s–3 min", 70 <= words <= 486, f"{words} words ≈ {words / WPS:.0f}s" + (" (long Short: needs re-hooks every 30–40 s)" if words > 162 else ""))
        dirty = re.findall(r"\[[^\]]*\]|→|~|https?://|[\U0001F300-\U0001FAFF]|\*\*|\|", text)
        check(f"{name}: read-aloud is clean", not dirty, "found: " + " ".join(sorted(set(dirty)))[:80] if dirty else "no cues/tags/symbols")
        first = re.split(r"(?<=[.!?])\s", text)[0].lower() if text else ""
        check(f"{name}: hook-first opening", not re.search(r"^(hi|hey|hello|welcome|in this video|today we)", first), first[:70])
    low = s.lower()
    bad = [w for w in AVOID if w in low]
    check(f"{name}: avoid-list words", not bad, ", ".join(bad) or "none")
    triv = [p for p in TRIVIA if re.search(p, low)]
    check(f"{name}: trivia patterns", not triv, ", ".join(triv) or "none")
    cited = set(re.findall(r"\[S(\d+)\]", s))
    check(f"{name}: sources resolve", cited <= sources, "unknown: " + ", ".join(f"S{x}" for x in sorted(cited - sources)) if cited - sources else f"{len(cited)} cited")
    def spoken_parts(doc):   # the spoken text only: table beat cells, or prose lines (not headings, meta, notes)
        for l in doc.split("\n"):
            if re.match(r"\|\s*\d+\s*\|", l):
                c = [x.strip() for x in l.strip("|").split("|")]
                if len(c) > 3: yield c[3], l
            elif l.strip() and not re.match(r"\s*(#|\*\*|_|\||>|[-*]\s|\d+\.\s)", l):   # notes/lists aren't spoken text
                yield l, l
    unsourced = [t[:50] for t, row in spoken_parts(s.split("## Read-aloud")[0]) if re.search(r"\d", re.sub(r"\[[^\]]*\]", "", t))
                 and not re.search(r"\[S\d+\]|\|\s*S\d+(?:\s*,\s*S\d+)*\s*\|\s*$", row) and "our test" not in row.lower()]   # inline [S3] or the Source column
    num_lines = unsourced
    check(f"{name}: numbers carry a source", not num_lines, f"{len(num_lines)} line(s) with an unsourced number" if num_lines else "ok")

# ---------- hooks / storyboard / qa ----------
hooks = read("hooks.md") or ""
totals = [int(x) for x in re.findall(r"\|\s*(\d{1,2})\s*\|\s*$", hooks, re.M)]
check("hooks scored (≥5, pick ≥16)", len(totals) >= 5 and max(totals or [0]) >= 16, f"{len(totals)} scored, best {max(totals or [0])}")
for x in fmts:
    sb = read(f"storyboard-{x}.md") or ""
    sb_rows = [r for r in sb.split("\n") if re.match(r"\|\s*\d+\s*\|", r)]
    check(f"storyboard-{x}: rows with tags", sb_rows and all(any(f"[{t}]" in r or t in r for t in TAGS + ["🎥", "🎞️", "A-roll", "B-roll"]) for r in sb_rows),
          f"{len(sb_rows)} rows")
pub = read("publish.md") or ""
check("publish kit lists sources", bool(re.search(r"(?im)^#+\s*Sources|^Sources:", pub)) and bool(re.search(r"https?://", pub)), "a Sources section with links (sources live in the description)")
qa = read("qa.md") or ""
open_boxes = len(re.findall(r"- \[ \]", qa))
# content gates (user, 2026-10-12: "if we do not have the right script … all the videos go to trash"): packages from
# 2026-10-12 on (or any package with a content-plan.md) need a ready content plan, a passed script review, a catch that
# follows the plan, no vague filler lines, and absolutes ("never", "zero"…) only with a source on that beat
VAGUE = ["powerful tool", "game changer", "changes everything", "the possibilities are endless", "endless possibilities",
         "many use cases", "lots of use cases", "and much more", "and so much more", "in today's world", "next level",
         "next-level", "cutting-edge", "cutting edge", "state-of-the-art", "seamless", "seamlessly", "revolutioniz",
         "supercharge", "unlock the power", "take it to the next", "a lot of things", "various things", "all kinds of",
         "it's a must", "you won't believe", "some experts say", "people are saying", "it is said that"]
ABSOLUTE = r"\b(never|always|zero|only|nobody|no one|nothing|can't|cannot|first ever|the best|every single|100%|free)\b"
_cp, _sr = read("content-plan.md"), read("script-review.md")
_dd = re.match(r"(\d{4}-\d{2}-\d{2})", os.path.basename(D))
if _cp is not None or (_dd and _dd.group(1) >= "2026-10-12"):
    cp = _cp or ""
    core = re.search(r"## Core message\s*\n+([^\n#]+)", cp)
    core_t = core.group(1).strip(" _") if core else ""
    check("content plan: ready", bool(re.search(r"(?m)^- \[x\] Content plan ready", cp)), "run the content-plan agent (content-plan.md, ticked ready)")
    check("content plan: core message ≤ 20 words", 3 <= len(core_t.split()) <= 20 and "One sentence" not in core_t, core_t[:80] or "missing")
    catch = re.search(r"\*\*Catch:\*\*\s*(include|skip)\b", cp, re.I)
    why = re.search(r"\*\*Why:\*\*\s*([^\n_][^\n]{8,})", cp)
    check("content plan: catch decision with reason", bool(catch and why), (catch.group(1).lower() + ": " + why.group(1)[:60]) if catch and why else "write **Catch:** include|skip and **Why:**")
    check("script review: passed", bool(re.search(r"(?m)^- \[x\] Script review passed", _sr or "")), "run the script-review agent until PASS (script-review.md)")
    for f in scripts:
        name = os.path.basename(f); s_ = open(f, encoding="utf-8").read().split("## Read-aloud")[0]
        beats = [l for l in s_.split("\n") if re.match(r"\|\s*\d+\s*\|", l)]
        spoken = [(l, re.sub(r"\[[^\]]*\]", "", ([c.strip() for c in l.strip("|").split("|")] + [""] * 4)[3])) for l in beats]
        low = " ".join(t.lower() for _, t in spoken)
        vague = [v for v in VAGUE if v in low]
        check(f"{name}: no vague filler lines", not vague, ", ".join(vague) or "none")
        has_src = lambda row: bool(re.search(r"\[S\d+\]|\|\s*S\d+(?:\s*[,·]\s*S\d+)*\s*\|\s*$|our test|official", row, re.I))
        abs_bad = [f"#{l.strip('|').split('|')[0].strip()} '{m.group(0)}'" for l, t in spoken for m in [re.search(ABSOLUTE, t, re.I)] if m and not has_src(l)]
        check(f"{name}: absolutes carry a source", not abs_bad, ", ".join(abs_bad[:5]) or "ok")
        ra_ = open(f, encoding="utf-8").read().split("## Read-aloud")
        if len(ra_) > 1 and spoken:   # the voice reads the read-aloud: it must say what the reviewed table says
            w = lambda t: re.findall(r"[a-z0-9']+", re.sub(r"\[[^\]]*\]", "", t.lower()))
            tw, rw = w(" ".join(t for _, t in spoken)), w(ra_[1].split("\n", 1)[1] if "\n" in ra_[1] else "")
            import difflib as _dl
            ratio = _dl.SequenceMatcher(None, tw, rw, autojunk=False).ratio()
            check(f"{name}: table = read-aloud", ratio >= 0.97, f"{ratio:.0%} same words" + ("" if ratio >= 0.97 else " (fix the table or the read-aloud; the voice reads the read-aloud)"))
        if catch:
            said = bool(re.search(r"\bcatch\b|\bdownside\b|\bthe problem is\b|\bbut there's a\b", low))
            if catch.group(1).lower() == "skip":
                check(f"{name}: no catch (plan says skip)", not said, "the script adds a catch the content plan skipped" if said else "ok")
            else:
                cb = [l for l, t in spoken if re.search(r"catch|downside|problem|limit", l, re.I)]
                check(f"{name}: planned catch present and sourced", bool(cb) and all(has_src(l) for l in cb), "ok" if cb else "the plan includes a catch the script doesn't say")

# house style (2026-10-11): packages from 2026-10-12 on (or any package that has one) need an approved animation plan,
# a named house style, a reference board and locks
_date = re.match(r"(\d{4}-\d{2}-\d{2})", os.path.basename(D))
_ap, _ad = read("animation-plan.md"), read("art-direction.md") or ""
if (_date and _date.group(1) >= "2026-10-12") or (_ap is not None and re.search(r"(?m)^\|\s*s\d{2}", _ap)):   # new packages, or one with a real beat-by-beat plan (old stubs from the structure check are exempt)
    rows_ap = [l for l in (_ap or "").splitlines() if re.match(r"\|\s*s\d{2}", l) and len([c for c in l.split("|") if c.strip()]) >= 4]
    check("animation plan: a row per beat", len(rows_ap) >= 5, f"{len(rows_ap)} beat rows" if _ap else "missing animation-plan.md")
    check("structure check passed", bool(re.search(r"(?m)^- \[x\] Structure check passed", _ap or "")), "run the structure-check agent (numbered steps only for Tutorial / Concept mechanisms)")
    check("animation plan: approved", bool(re.search(r"(?m)^- \[x\] User approved", _ap or "")), "tick the Approval line (with the date)")
    check("art direction: house style + reference board + locks",
          bool(re.search(r"reference-flat|\*\*Style:\*\*\s*`?\w", _ad)) and "## Reference board" in _ad and bool(re.search(r"## Locks[^\n]*\n(?:_.*\n)*-\s*[^_\s]", _ad)),
          "art-direction.md needs the house style, a reference board and at least one lock")
    # visual plan (2026-10-16): packages from 2026-10-16 on, or any animation plan that carries the "Visual plan passed" line,
    # need a concrete picture per beat: a named verb, cue words that are spoken, few "none" rows, the running object on screen,
    # overlays that fit, a described first frame, and the visual-plan agent's PASS
    if (_date and _date.group(1) >= "2026-10-16") or re.search(r"(?m)^- \[[ x]\] Visual plan passed", _ap or ""):
        _vocab = []
        _dm = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", "..", "studio", "templates", "styles", "reference-flat", "design.md")
        if os.path.exists(_dm):
            _mv = re.search(r"## Motion vocabulary[^\n]*\n((?:[^\n#][^\n]*\n?)+)", open(_dm, encoding="utf-8").read())
            _vocab = [re.sub(r"\(.*?\)", "", v).strip().lower() for v in (_mv.group(1) if _mv else "").replace("\n", " ").split("·") if v.strip()]
        _vocab = [v for v in _vocab if v] or ["types out", "scans", "slices", "stamps", "counts up", "fills", "routes", "races", "shrinks away", "builds word by word", "push in", "wipe"]
        _stems = sorted({re.sub(r"(es|s)$", "", v.split()[0]) for v in _vocab})   # TYPES OUT → "type", SLICES → "slice"
        _hdr = next((l for l in (_ap or "").splitlines() if re.match(r"\|\s*Beat\s*\|", l)), "")
        _cols = [c.strip().lower() for c in _hdr.strip("|").split("|")]
        _ci = lambda key, default: next((i for i, c in enumerate(_cols) if key in c), default)
        _iv, _ic = _ci("picture does", 3), _ci("cues", 4)
        _cell = lambda l, i: ([c.strip() for c in l.strip("|").split("|")] + [""] * 9)[i]
        _none = lambda l: bool(re.match(r"(?i)none\b", _cell(l, _iv)))
        _verb = lambda t: any(re.search(r"\b" + st, t.lower()) for st in _stems) or bool(re.search(r"\b[A-Z]{3,}\b", re.sub(r"\b(STEP|CTA|OF|SFX|API|IDS?|URL|AI|UI|PNG|SVG|MP4)\b", "", t)))   # a house verb, or another verb the plan writes in CAPS
        _rid = lambda l: re.match(r"\|\s*(s\d{2})", l).group(1)
        no_verb = [_rid(l) for l in rows_ap if not _none(l) and not _verb(_cell(l, _iv))]
        check("animation plan: a motion verb per row", not no_verb, "no house verb (TYPES OUT, SLICES, STAMPS…) on " + ", ".join(no_verb) if no_verb else f"{len(rows_ap)}/{len(rows_ap)} rows")
        _sf = next((f for f in scripts if f.endswith("script-reel.md")), scripts[0] if scripts else None)
        _beats = {}
        if _sf:
            for l in open(_sf, encoding="utf-8").read().split("## Read-aloud")[0].splitlines():
                m = re.match(r"\|\s*(\d+)\s*\|", l)
                if m: _beats[int(m.group(1))] = set(re.findall(r"[a-z0-9']+", re.sub(r"\[[^\]]*\]", "", _cell(l, 3)).lower()))
        _w = lambda t: re.findall(r"[a-z0-9']+", re.sub(r"\(.*?\)", "", t).lower())
        bad_cue = [f"{_rid(l)} '{c}'" for l in rows_ap for c in re.split(r"\s*[·,]\s*", _cell(l, _ic)) if c.strip() and int(_rid(l)[1:]) in _beats
                   and not set(_w(c)) <= _beats[int(_rid(l)[1:])]]
        check("animation plan: cue words are spoken in the beat", not bad_cue, ", ".join(bad_cue[:5]) or "every cue is in its script line")
        _nn = [_rid(l) for l in rows_ap if _none(l)]
        _consec = [a for a, b in zip(rows_ap, rows_ap[1:]) if _none(a) and _none(b)]
        check("animation plan: none-rows ≤ 20 %, not consecutive", rows_ap and len(_nn) <= 0.2 * len(rows_ap) and not _consec,
              f"{len(_nn)}/{len(rows_ap)} none rows" + (" (two in a row)" if _consec else "") + (": " + ", ".join(_nn) if _nn else ""))
        _ro = re.search(r"\*\*Running object:\*\*\s*([^\n·]+)", _ap or "")
        _stop = {"that", "with", "this", "from", "into", "which", "then", "their", "every", "through", "along", "same", "each", "under", "over", "mono", "white", "border"}
        _toks = [t for t in dict.fromkeys(re.findall(r"[a-z0-9]+", (_ro.group(1) if _ro else "").lower())) if len(t) >= 4 and t not in _stop]
        _hits = [l for l in rows_ap if any(re.search(r"\b" + t, l.lower()) for t in _toks)]   # a row names the object by any of its words (chip / card / email…)
        _tok = " / ".join(sorted(_toks, key=lambda t: -sum(1 for l in rows_ap if re.search(r"\b" + t, l.lower())))[:3])
        check("animation plan: running object in ≥ 60 % of rows", bool(_toks) and rows_ap and len(_hits) >= 0.6 * len(rows_ap),
              f"'{_tok}' in {len(_hits)}/{len(rows_ap)} rows" if _toks else "no **Running object:** line")
        for x in fmts:
            sb_ = read(f"storyboard-{x}.md") or ""
            h_ = next((l for l in sb_.splitlines() if re.match(r"\|\s*#\s*\|", l)), "")
            hc = [c.strip().lower() for c in h_.strip("|").split("|")]
            io = next((i for i, c in enumerate(hc) if "overlay" in c), None)
            if io is not None:
                long_ov = [f"#{_cell(l, 0)} ({len(_cell(l, io).split())}w)" for l in sb_.splitlines() if re.match(r"\|\s*\d+\s*\|", l) and len(_cell(l, io).split()) > 12]
                check(f"storyboard-{x}: text overlays ≤ 12 words", not long_ov, ", ".join(long_ov) or "ok")
        _ff = re.search(r"\*\*First frame \(described\):\*\*[ \t]*(.*?)(?=\n\s*\n|\n\*\*|\Z)", hooks, re.S)
        _ffw = len(re.sub(r"_\(.*?\)_", "", _ff.group(1) if _ff else "", flags=re.S).split())
        check("hooks: first frame described (≥ 15 words)", _ffw >= 15, f"{_ffw} words" + ("" if _ffw >= 15 else ": describe what is where, its size and colour, the hook's claim on mute"))
        check("visual plan passed", bool(re.search(r"(?m)^- \[x\] Visual plan passed", _ap or "")), "run the visual-plan agent until PASS (ticks animation-plan.md)")
check("qa.md all ticked", qa and open_boxes == 0, f"{open_boxes} unticked")

# Goldfish comprehension (2026-10-27, Elephant-Goldfish Model): packages from 2026-10-27 on, or any that has a
# comprehension.md, need a report from the script-comprehension agent on the CURRENT read-aloud, and a script review
# that scored it ("understood" ≥ 4)
_cm = read("comprehension.md")
if _main and (_cm is not None or (_dd and _dd.group(1) >= "2026-10-27")):
    cm = _cm or ""
    rec = re.search(r"read-aloud sha1:\s*([0-9a-f]{12})", cm)
    check("comprehension: Goldfish report present", bool(re.search(r"(?m)^TAKEAWAY:\s*\S", cm) and re.search(r"(?m)^REMEMBERED", cm)),
          "run the script-comprehension agent on the read-aloud (lint_package.py <folder> --read-aloud) and save its report to comprehension.md")
    check("comprehension: report is for the current read-aloud", bool(rec) and rec.group(1) == ra_sha1(_main),
          "stale: the read-aloud changed since the Goldfish heard it; re-run script-comprehension" if rec else "comprehension.md has no 'read-aloud sha1:' line")
    und = re.findall(r"understood\s+(\d)", _sr or "")
    check("script review: understood ≥ 4", bool(und) and int(und[-1]) >= 4, f"understood {und[-1]}" if und else "script-review.md has no 'understood' score: re-run script-review after the Goldfish")

for ok, n, d in res: print(f"  {'✓' if ok else '✗'} {n:45} {d}")
bad = [n for ok, n, _ in res if not ok]
print(f"lint_package: {len(res) - len(bad)}/{len(res)} passed" + (f" · FAILED: {len(bad)}" if bad else ""))
sys.exit(1 if bad else 0)
