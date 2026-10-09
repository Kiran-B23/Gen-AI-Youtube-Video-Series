"""
Deterministic eval of a video-scripter package (productions/<date>-<slug>/). Run it at the QA stage;
every ✗ must be fixed before handing over. Judgement checks (is the hook good? is the archetype right?)
stay in qa.md; this catches what a script can check reliably.

usage: python3 .claude/skills/video-scripter/scripts/lint_package.py productions/<folder> [--format reel|explainer|session]
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
scripts = sorted(glob.glob(os.path.join(D, "script-*.md")))
fmts = [os.path.basename(f)[7:-3] for f in scripts] if not FMT else [FMT]
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
check("YouTube analysis", yt or re.search(r"not watched|couldn't be watched|bot check", insp, re.I), "yt/summary.md present" if yt else "no yt/summary.md and no stated reason")
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
check("qa.md all ticked", qa and open_boxes == 0, f"{open_boxes} unticked")

for ok, n, d in res: print(f"  {'✓' if ok else '✗'} {n:45} {d}")
bad = [n for ok, n, _ in res if not ok]
print(f"lint_package: {len(res) - len(bad)}/{len(res)} passed" + (f" · FAILED: {len(bad)}" if bad else ""))
sys.exit(1 if bad else 0)
