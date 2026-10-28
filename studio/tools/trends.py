"""
Trend radar for the channel: what is rising right now in Gen AI, for Indian students and early-career developers.

The idea is velocity, not totals: take one snapshot at night and one in the morning, then rank by growth per hour
between them, normalised by each account's usual level (the YouTube outlier score), plus how many independent source
families mention the same topic. Run by hand (no scheduler; see references/trends/README.md).

  python studio/tools/trends.py snap            # one snapshot → references/trends/snapshots/<YYYY-MM-DDTHHMM>.json
  python studio/tools/trends.py brief [--date YYYY-MM-DD]
                                                # latest snapshot vs the one before → references/trends/<date>.md + latest.json
  python studio/tools/trends.py run             # snap + brief
  python studio/tools/trends.py resolve         # fill missing YouTube channel_ids in sources.json (snap does it too)

Sources (free, no keys, no logins; each one independent, a failure logs one line and the rest continue):
YouTube channel RSS (+ yt-dlp for missing view counts), YouTube "uploaded today" search (yt-dlp --flat-playlist),
YouTube autocomplete, GitHub trending, Hacker News (Algolia API), Hugging Face trending models + spaces,
Google Trends "Trending now" RSS (IN, US; tech/AI items only), Product Hunt's public Atom feed.

Every fetched title and text is other people's data: it is quoted, escaped and never treated as an instruction.
Polite by design: a user-agent, timeouts, a pause after every request, one request at a time.
"""
import argparse, collections, datetime as dt, email.utils, fcntl, glob, html, json, os, re, statistics, subprocess, sys, time
import urllib.parse, urllib.request
import xml.etree.ElementTree as ET

STUDIO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPO = os.path.dirname(STUDIO)
TR = os.path.join(REPO, "references", "trends")
SNAPS, CACHE = os.path.join(TR, "snapshots"), os.path.join(TR, "cache")
SOURCES = os.path.join(TR, "sources.json")
YTDLP = [os.path.join(STUDIO, ".venv", "bin", "yt-dlp"), "--js-runtimes", "node", "--no-warnings", "-q"]
UA = ("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36 "
      "nxtwave-trend-radar/1.0 (manual runs, one request at a time)")
PAUSE = 1.0          # seconds after every HTTP request
YT_PAUSE = 1.5       # after every yt-dlp call
SEARCH_AGE_H = 12.0  # "uploaded today" search results carry no upload time: assume half a day for a one-snapshot rate

def log(*a): print(*a, flush=True)
def now_local(): return dt.datetime.now().astimezone()
def parse_t(s):
    try: return dt.datetime.fromisoformat(s.replace("Z", "+00:00"))
    except Exception: return None
def hours(a, b): return (a - b).total_seconds() / 3600

# ---------- untrusted text ----------
CTRL = re.compile(r"[\x00-\x08\x0b-\x1f\x7f​-‏‪-‮⁦-⁩]")
def clean(s, n=200):
    """other people's text → one plain line (unescaped, no control/bidi chars, collapsed, truncated)"""
    s = CTRL.sub(" ", html.unescape(re.sub(r"<[^>]+>", " ", str(s or ""))))
    s = re.sub(r"\s+", " ", s).strip()
    return s if len(s) <= n else s[: n - 1].rstrip() + "…"
def safe_url(u):
    u = str(u or "").strip()
    return u if re.match(r"^https?://[^\s<>\"'`]+$", u) else ""
def md(s):
    """quote a title inside Markdown (tables and link text): no pipes, brackets or backticks that change structure"""
    return re.sub(r"[|\[\]`<>*_#]", lambda m: {"|": "/", "[": "(", "]": ")"}.get(m.group(0), " "), clean(s, 120)).strip()

# ---------- polite fetch ----------
def get(url, timeout=20):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "en-US,en;q=0.8"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.read(6_000_000).decode("utf-8", "replace")
    finally:
        time.sleep(PAUSE)

# yt-dlp, the yt_research.py way: on "not a bot" switch to the mobile-web/embedded clients once; if those are blocked
# too, the caller stops asking (BLOCKED) for the rest of the run.
CLIENTS = [None, "mweb,web_embedded"]; CLIENT = [0]; BLOCKED = [False]
def ytdlp(*args, timeout=90):
    while True:
        extra = ["--extractor-args", f"youtube:player_client={CLIENTS[CLIENT[0]]}"] if CLIENTS[CLIENT[0]] else []
        try: r = subprocess.run(YTDLP + extra + list(args), capture_output=True, text=True, timeout=timeout)
        except subprocess.TimeoutExpired: return "", "timeout"
        finally: time.sleep(YT_PAUSE)
        if "not a bot" in r.stderr:
            if CLIENT[0] + 1 < len(CLIENTS):
                CLIENT[0] += 1; log(f"    ⚠ YouTube bot check: switching to the {CLIENTS[CLIENT[0]]} client"); continue
            BLOCKED[0] = True
        return r.stdout, r.stderr

def load_json(p, default):
    try: return json.load(open(p))
    except Exception: return default
def save_json(p, data):
    os.makedirs(os.path.dirname(p), exist_ok=True)
    tmp = p + ".tmp"; json.dump(data, open(tmp, "w"), indent=1, ensure_ascii=False); os.replace(tmp, p)

def num(s):
    s = str(s or "").replace(",", "").replace("+", "").strip().upper()
    m = re.match(r"^([\d.]+)\s*([KM]?)$", s)
    if not m: return 0
    return int(float(m.group(1)) * {"": 1, "K": 1e3, "M": 1e6}[m.group(2)])

# ---------- channel ids ----------
def resolve(cfg_text=None, quiet=False):
    """fill channel_id for channels that only have a handle; writes sources.json in place (layout kept)"""
    text = cfg_text or open(SOURCES).read()
    cfg = json.loads(text)
    todo = [c for c in cfg["youtube"]["channels"] if not c.get("channel_id") and c.get("handle")]
    if not todo:
        if not quiet: log("every channel already has a channel_id")
        return cfg
    log(f"resolving {len(todo)} channel handle(s) once")
    for c in todo:
        h = c["handle"]
        try:
            page = get("https://www.youtube.com/" + urllib.parse.quote(h))
            m = (re.search(r'<link rel="canonical" href="https://www\.youtube\.com/channel/(UC[\w-]{22})"', page)
                 or re.search(r'"externalId":"(UC[\w-]{22})"', page) or re.search(r'"browseId":"(UC[\w-]{22})"', page))
            if not m: log(f"  ✗ {h}: no channel id on the page"); continue
            cid = m.group(1)
            text = re.sub(r'("handle": "' + re.escape(h) + r'")\s*\}', lambda mm: f'{mm.group(1)}, "channel_id": "{cid}"}}', text, count=1)
            log(f"  ✓ {h} → {cid}")
        except Exception as e:
            log(f"  ✗ {h}: {clean(e, 120)}")
    json.loads(text)  # still valid
    open(SOURCES, "w").write(text)
    return json.loads(text)

# ---------- sources ----------
NS = {"a": "http://www.w3.org/2005/Atom", "yt": "http://www.youtube.com/xml/schemas/2015", "media": "http://search.yahoo.com/mrss/"}

def watch_meta(vid):
    """exact upload time + view count from the public watch page (one GET, no JS)"""
    h = get(f"https://www.youtube.com/watch?v={vid}", timeout=25)
    up = re.search(r'"uploadDate":"([^"]+)"', h) or re.search(r'itemprop="uploadDate" content="([^"]+)"', h)
    vc = re.search(r'"viewCount":"(\d+)"', h)
    return (parse_t(up.group(1)) if up else None), (int(vc.group(1)) if vc else None)

def rss_rows(cid):
    root = ET.fromstring(get(f"https://www.youtube.com/feeds/videos.xml?channel_id={cid}"))
    rows = []
    for e in root.findall("a:entry", NS):
        vid = e.findtext("yt:videoId", "", NS); pub = parse_t(e.findtext("a:published", "", NS))
        st = e.find("media:group/media:community/media:statistics", NS)
        views = int(st.get("views")) if st is not None and (st.get("views") or "").isdigit() else None
        if vid and pub: rows.append((vid, clean(e.findtext("a:title", "", NS)), pub, views))
    return rows

def tab_rows(cid, vcache, budget, now, window):
    """RSS down: the channel's Videos tab (newest first, yt-dlp flat: rounded views, no dates) + the watch page for
    each upload that may be fresh (exact views; its upload time is cached so it is looked up once)"""
    out, err = ytdlp("--flat-playlist", "--dump-json", "--playlist-end", "6", f"https://www.youtube.com/channel/{cid}/videos")
    if not out.strip(): raise RuntimeError(clean((err.strip().splitlines() or ["no data"])[-1], 80))
    rows = []
    for line in out.splitlines():
        try: d = json.loads(line)
        except ValueError: continue
        vid = d.get("id"); views = int(d.get("view_count") or 0) or None
        if not vid: continue
        pub = parse_t(vcache.get(vid, ""))
        if (pub is None or hours(now, pub) <= window) and budget[0] > 0:
            budget[0] -= 1
            p2, exact = watch_meta(vid)
            pub = pub or p2; views = exact or views
            if pub: vcache[vid] = pub.isoformat()
        if pub is None: continue
        rows.append((vid, clean(d.get("title")), pub, views))
        if hours(now, pub) > window: break      # newest first: the rest are older
    return rows

def src_yt_rss(cfg, ctx):
    yc = cfg["youtube"]; window = yc.get("window_hours", 48)
    base = load_json(os.path.join(CACHE, "channels.json"), {})
    vcache = load_json(os.path.join(CACHE, "videos.json"), {})
    items, failed, t1 = [], [], ctx["now"]
    rss_ok, rss_404, via_tab = 0, 0, 0
    budget = [int(yc.get("page_fallback_max", 60))]
    chans = [c for c in yc["channels"] if c.get("channel_id")]
    for c in chans:
        cid = c["channel_id"]; rows = None
        if not (rss_ok == 0 and rss_404 >= 3):          # three 404s in a row and no success: RSS is down, stop asking it
            try: rows = rss_rows(cid); rss_ok += 1
            except Exception as e:
                rss_404 += 1
                if "404" not in str(e): failed.append(f"{c['name']} RSS ({clean(e, 50)})")
        if rows is None:
            if BLOCKED[0]: failed.append(f"{c['name']} (bot check)"); continue
            try: rows = tab_rows(cid, vcache, budget, t1, window); via_tab += 1
            except Exception as e: failed.append(f"{c['name']} ({clean(e, 60)})"); continue
        for vid, _, pub, _ in rows: vcache.setdefault(vid, pub.isoformat())
        # baseline: the channel's median views per hour over a video's first week, from its mature uploads (≥ 48 h old)
        mature = [(v, hours(t1, p)) for _, _, p, v in rows if v and hours(t1, p) >= 48]
        if len(mature) >= 3:
            base[cid] = {"name": c["name"], "vph": round(statistics.median(v / min(max(a, 1), 168) for v, a in mature), 2),
                         "median_views": int(statistics.median(v for v, _ in mature)), "n": len(mature), "at": t1.isoformat(timespec="seconds")}
        b = base.get(cid, {})
        for vid, title, pub, views in rows:
            age = hours(t1, pub)
            if age > window: continue
            if views is None and budget[0] > 0 and not BLOCKED[0]:
                budget[0] -= 1; views = watch_meta(vid)[1]
            items.append({"src": "yt_rss", "id": vid, "title": title, "url": f"https://www.youtube.com/watch?v={vid}", "by": c["name"],
                          "channel_id": cid, "t": pub.isoformat(), "m": {"views": views, "age_h": round(age, 2), "baseline_vph": b.get("vph")}})
    save_json(os.path.join(CACHE, "channels.json"), base)
    cut = (t1 - dt.timedelta(days=60)).isoformat()
    save_json(os.path.join(CACHE, "videos.json"), {k: v for k, v in vcache.items() if v >= cut})
    note = [f"{len(chans)} channels ({rss_ok} via RSS" + (f", {via_tab} via the Videos tab because RSS answered 404" if via_tab else "") + f"), {len(items)} uploads in {window} h"]
    if via_tab: note.append("Shorts are not in the Videos tab, so the fallback misses them")
    if failed: note.append(f"{len(failed)} failed: " + ", ".join(failed[:4]))
    return items, "; ".join(note)

def src_yt_search(cfg, ctx):
    yc = cfg["youtube"]; n = yc.get("per_query", 15); seen = {}
    for q in yc["queries"]:
        if BLOCKED[0]: return list(seen.values()), "stopped at a YouTube bot check on every client"
        url = "https://www.youtube.com/results?search_query=" + urllib.parse.quote_plus(q) + "&sp=EgIIAg%253D%253D"
        out, err = ytdlp("--flat-playlist", "--dump-json", "--playlist-end", str(n), url)
        got = 0
        for line in out.splitlines():
            try: d = json.loads(line)
            except ValueError: continue
            vid = d.get("id")
            if not vid or len(vid) != 11: continue
            got += 1
            if vid in seen: seen[vid]["queries"].append(q); continue
            seen[vid] = {"src": "yt_search", "id": vid, "title": clean(d.get("title")), "url": f"https://www.youtube.com/watch?v={vid}",
                         "by": clean(d.get("channel") or d.get("uploader"), 60), "channel_id": d.get("channel_id"), "queries": [q],
                         "m": {"views": int(d.get("view_count") or 0), "duration": int(float(d.get("duration") or 0))}}
        if not got and err.strip(): log(f"    ⚠ search '{q}': {clean(err.strip().splitlines()[-1], 100)}")
    return list(seen.values()), f"{len(yc['queries'])} queries, uploaded today"

def src_suggest(cfg, ctx):
    items = []
    for seed in cfg["suggest"]["seeds"]:
        d = json.loads(get("https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=" + urllib.parse.quote(seed)))
        for i, term in enumerate(d[1][:10] if len(d) > 1 else []):
            term = clean(term, 80).lower()
            if term and term != seed:
                items.append({"src": "yt_suggest", "id": f"{seed}|{term}", "title": term, "seed": seed,
                              "url": "https://www.youtube.com/results?search_query=" + urllib.parse.quote_plus(term), "m": {"rank": i}})
    return items, f"{len(cfg['suggest']['seeds'])} seeds"

def src_github(cfg, ctx):
    seen = {}
    for page in cfg["github"]["pages"]:
        h = get(page, timeout=30)
        for block in h.split('<article class="Box-row')[1:]:
            m = re.search(r'<h2[^>]*>\s*<a[^>]*href="/([\w.-]+/[\w.-]+)"', block)
            if not m or m.group(1) in seen: continue
            repo = m.group(1)
            desc = re.search(r'<p class="col-9[^"]*">(.*?)</p>', block, re.S)
            stars = re.search(r'href="/[^"]+/stargazers"[^>]*>.*?</svg>\s*([\d,]+)', block, re.S)
            today = re.search(r"([\d,]+)\s+stars? today", block)
            lang = re.search(r'itemprop="programmingLanguage">([^<]+)<', block)
            seen[repo] = {"src": "github", "id": repo, "title": repo, "text": clean(desc.group(1) if desc else "", 240),
                          "url": f"https://github.com/{repo}", "by": clean(lang.group(1) if lang else "", 30),
                          "m": {"stars": num(stars.group(1)) if stars else 0, "stars_today": num(today.group(1)) if today else 0}}
    return list(seen.values()), f"{len(cfg['github']['pages'])} trending pages"

def src_hn(cfg, ctx):
    hc = cfg["hn"]; t0 = int(time.time()) - int(hc.get("hours", 24)) * 3600; seen = {}
    urls = ["https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=40",
            "https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=60&numericFilters="
            + urllib.parse.quote(f"points>{hc.get('min_points', 50)},created_at_i>{t0}")]
    for u in urls:
        for h in json.loads(get(u)).get("hits", []):
            oid = str(h.get("objectID") or "")
            if not oid.isdigit() or oid in seen: continue
            created = dt.datetime.fromtimestamp(int(h.get("created_at_i") or 0), dt.timezone.utc)
            seen[oid] = {"src": "hn", "id": oid, "title": clean(h.get("title")), "url": f"https://news.ycombinator.com/item?id={oid}",
                         "ext": safe_url(h.get("url")), "t": created.isoformat(),
                         "m": {"points": int(h.get("points") or 0), "comments": int(h.get("num_comments") or 0),
                               "age_h": round(hours(ctx["now"], created), 2)}}
    return list(seen.values()), "front page + stories > %d points in %d h" % (hc.get("min_points", 50), hc.get("hours", 24))

def src_hf(cfg, ctx):
    hc = cfg["huggingface"]; items = []
    for kind, n in (("models", hc.get("models", 40)), ("spaces", hc.get("spaces", 20))):
        for d in json.loads(get(f"https://huggingface.co/api/{kind}?sort=trendingScore&limit={int(n)}")):
            rid = str(d.get("id") or "")
            if not re.match(r"^[\w.-]+/[\w.-]+$", rid): continue
            items.append({"src": "hf", "id": f"{kind}/{rid}", "title": rid, "kind": kind[:-1], "text": clean(d.get("pipeline_tag") or d.get("sdk") or "", 40),
                          "url": f"https://huggingface.co/{'spaces/' if kind == 'spaces' else ''}{rid}", "t": d.get("createdAt"),
                          "m": {"trending": int(d.get("trendingScore") or 0), "likes": int(d.get("likes") or 0), "downloads": int(d.get("downloads") or 0)}})
    return items, f"{hc.get('models', 40)} models + {hc.get('spaces', 20)} spaces"

def src_gtrends(cfg, ctx):
    items, total = [], 0
    for geo in cfg["google_trends"]["geos"]:
        root = ET.fromstring(get(f"https://trends.google.com/trending/rss?geo={geo}"))
        ht = "{https://trends.google.com/trending/rss}"
        for it in root.iter("item"):
            total += 1
            title = clean(it.findtext("title"), 80)
            news = [clean(n.findtext(ht + "news_item_title"), 140) for n in it.findall(ht + "news_item")][:3]
            nurl = [safe_url(n.findtext(ht + "news_item_url")) for n in it.findall(ht + "news_item")][:1]
            try: pub = email.utils.parsedate_to_datetime(it.findtext("pubDate") or "")
            except Exception: pub = None
            row = {"src": "gtrends", "id": f"{geo}|{title.lower()}", "title": title, "geo": geo, "text": " · ".join(news),
                   "url": "https://trends.google.com/trending?geo=" + geo, "news_url": nurl[0] if nurl else "",
                   "t": pub.isoformat() if pub else None,
                   "m": {"traffic": num(it.findtext(ht + "approx_traffic")), "age_h": round(hours(ctx["now"], pub), 2) if pub else None}}
            if fits(row, ctx): items.append(row)   # keep tech / AI items only
    return items, f"{total} trending searches, {len(items)} tech/AI"

def src_ph(cfg, ctx):
    root = ET.fromstring(get(cfg["product_hunt"]["feed"]))
    items = []
    for e in root.findall("a:entry", NS):
        pub = parse_t(e.findtext("a:published", "", NS) or "")
        if not pub or hours(ctx["now"], pub) > 48: continue
        link = e.find("a:link", NS)
        url = safe_url(link.get("href") if link is not None else "")
        tag = clean((e.findtext("a:content", "", NS) or "").split("Discussion")[0], 140)
        items.append({"src": "ph", "id": url or clean(e.findtext("a:title", "", NS)), "title": clean(e.findtext("a:title", "", NS), 80), "text": tag,
                      "url": url, "t": pub.isoformat(), "m": {"age_h": round(hours(ctx["now"], pub), 2)}})
    return items, "public Atom feed (no votes: a launch mention, no velocity)"

SOURCE_FUNCS = [("yt_rss", src_yt_rss), ("yt_search", src_yt_search), ("yt_suggest", src_suggest), ("github", src_github),
                ("hn", src_hn), ("hf", src_hf), ("gtrends", src_gtrends), ("ph", src_ph)]
LABEL = {"yt_rss": "YouTube channels", "yt_search": "YouTube search (today)", "yt_suggest": "YouTube autocomplete", "github": "GitHub trending",
         "hn": "Hacker News", "hf": "Hugging Face", "gtrends": "Google Trends", "ph": "Product Hunt"}
FAMILY = {"yt_rss": "youtube", "yt_search": "youtube", "yt_suggest": "search", "gtrends": "search", "github": "github", "hn": "hn",
          "hf": "hf", "ph": "ph"}

# ---------- fit / excludes ----------
def _words_re(words):
    words = [w for w in words if w]
    return re.compile(r"(?<![\w])(" + "|".join(re.escape(w) for w in sorted(words, key=len, reverse=True)) + r")(?![\w])", re.I) if words else None
def ctx_for(cfg):
    return {"fit": _words_re(cfg["fit"]["keywords"]), "exclude": _words_re(cfg["fit"]["exclude"]), "now": now_local()}
def text_of(it): return " ".join([it.get("title") or "", it.get("text") or ""]).replace("-", " ").replace("_", " ") + " " + (it.get("title") or "")
def fits(it, ctx): return bool(ctx["fit"] and ctx["fit"].search(text_of(it)))
def excluded(it, ctx): return bool(ctx["exclude"] and ctx["exclude"].search(text_of(it)))

# ---------- snap ----------
def lock():
    os.makedirs(CACHE, exist_ok=True)
    f = open(os.path.join(CACHE, ".lock"), "w")
    try: fcntl.flock(f, fcntl.LOCK_EX | fcntl.LOCK_NB)
    except OSError: sys.exit("another trends.py run is in progress (references/trends/cache/.lock)")
    return f

def snap():
    cfg = resolve(quiet=True)
    ctx = ctx_for(cfg)
    t = ctx["now"]
    snapshot = {"taken_at": t.isoformat(timespec="seconds"), "version": 1, "status": {}, "items": []}
    log(f"snapshot {t:%Y-%m-%d %H:%M %Z}")
    for name, fn in SOURCE_FUNCS:
        t0 = time.time(); ctx["now"] = now_local()   # each source keeps its own fetch time (a laptop can sleep mid-run)
        at = ctx["now"].isoformat(timespec="seconds")
        try:
            items, note = fn(cfg, ctx)
            snapshot["items"] += items
            snapshot["status"][name] = {"ok": True, "n": len(items), "at": at, "secs": round(time.time() - t0, 1), "note": note}
            log(f"  ✓ {LABEL[name]:<24} {len(items):>4} items  {time.time() - t0:5.1f}s  {note}")
        except Exception as e:
            why = clean(f"{type(e).__name__}: {e}", 160)
            snapshot["status"][name] = {"ok": False, "n": 0, "at": at, "secs": round(time.time() - t0, 1), "error": why}
            log(f"  ✗ {LABEL[name]:<24} failed: {why}")
    for name in ("instagram", "x"):
        if not cfg.get(name, {}).get("enabled"):
            snapshot["status"][name] = {"ok": None, "n": 0, "skipped": "disabled: needs Agent-Reach login"}
            log(f"  – {name:<24} skipped (disabled: needs Agent-Reach login)")
    snapshot["finished_at"] = now_local().isoformat(timespec="seconds")
    took = hours(now_local(), t) * 60
    if took > 30: log(f"  ⚠ this snapshot took {took:.0f} min (did the PC sleep?): each source keeps its own fetch time, so rates stay right")
    os.makedirs(SNAPS, exist_ok=True)
    out = os.path.join(SNAPS, f"{t:%Y-%m-%dT%H%M}.json")
    save_json(out, snapshot)
    log(f"→ {os.path.relpath(out, REPO)}  ({len(snapshot['items'])} items)")
    return out

# ---------- entities → topics ----------
STOP = set("""a an and are as at be been but by can could did do does done for from had has have he her his i if in into is it its
just like make makes making me more most my new no not now of off on one only or our out over own really see she should so some still
such than that the their them then there these they this those through to too two up us use used using very was way we were what when where
which who why will with without would you your yours vs versus best top first last next every all any here how get got gets let lets
inside behind under after before about again ever never always today tomorrow yesterday week weeks month year years day days hour hours
minute minutes second seconds time times part full live real big small fast faster slow easy hard simple better worse good bad great
free paid pro plus max mini ultra lite official update updates release released launch launched launches announced announcing introducing
just dropped drops drop finally insane crazy huge wild shocking massive actually literally honest truth secret secrets ultimate complete
beginner beginners guide tutorial course crash explained explain explainer review reviews reviewed test tested tests testing demo
show hn ask tell people world everyone nobody someone something anything everything thing things stuff lot lots way ways step steps
china chinese india indian america american us usa uk europe european japan billion million trillion percent dollars hindi english
january february march april may june july august september october november december monday tuesday wednesday thursday friday saturday sunday
ceo cto cfo coo vp hr pr faq diy pdf ui ux os pc tv iq eu un hd fps url usb lol omg wtf ipo sdk ide cli gui etc
mr ms dr part episode ep vol chapter series season video videos channel shorts short reel reels podcast interview talk keynote""".split())

def norm(tok):
    t = tok.lower().strip(".-+_")
    t2 = re.sub(r"[\s\-_.]*(v?\d+(?:\.\d+)*[a-z]?|\d+[bkmt])$", "", t)
    t2 = re.sub(r"[\s\-_.]*(v?\d+(?:\.\d+)*[a-z]?)$", "", t2)
    return t2 if len(t2) >= 3 else t

def build_vocab(cfg):
    e = cfg["entities"]
    phrases = sorted({p.lower() for p in e["phrases"]}, key=len, reverse=True)
    names = {norm(n) for n in e["names"]}
    banned = {norm(w) for w in e["not_topics"]} | STOP
    return phrases, names, banned

LOWER_WORDS = set()   # every lower-case word in this brief's titles (filled in brief()): a word written lower-case somewhere is a common word
TOK = re.compile(r"[A-Za-z][A-Za-z0-9]*(?:[.\-+][A-Za-z0-9]+)*\+?")
def _ents(raw, vocab):
    phrases, names, banned = vocab
    raw = re.sub(r"[-_/]", " ", raw)            # gpt-oss → gpt oss, claude-code-skills → claude code skills (same length)
    low = raw.lower(); sure, cand = {}, {}
    for p in phrases:
        pat = re.compile(r"(?<![\w])" + re.escape(p) + r"(?![\w])")
        m = pat.search(low)
        if m:
            key = norm(p) if " " not in p else re.sub(r"(?<=[a-z]{3})s$", "", p)   # "ai agents" → "ai agent"
            sure.setdefault(key, raw[m.start():m.end()] if len(raw) == len(low) else p)
            low = pat.sub(lambda mm: " " * len(mm.group(0)), low)
    raw = "".join(" " if low[i] == " " else raw[i] for i in range(len(raw))) if len(raw) == len(low) else low
    words = re.findall(r"[A-Za-z]{3,}", raw)
    title_case = len(words) >= 3 and sum(w[0].isupper() for w in words) / len(words) > 0.5   # "Why Companies Are Down": caps say nothing
    first = (TOK.findall(raw) or [""])[0]
    for tok in TOK.findall(raw):
        k = norm(tok)
        if len(k) < 2 or k in banned or re.fullmatch(r"v?\d+(\.\d+)*[a-z]?", k): continue   # a bare version is not a name
        if k in names: sure.setdefault(k, tok)
        elif len(k) >= 3 and not tok.isdigit() and (re.search(r"\d", tok) or re.search(r"[a-z][A-Z]", tok) or (tok.isupper() and len(tok) <= 6)
                                                    or (tok[0].isupper() and k not in LOWER_WORDS and not title_case and tok != first)):
            cand.setdefault(k, tok)   # CamelCase, ALLCAPS acronym, a version-ed name, or a capitalised word never seen lower-case
    return sure, cand

def extract(it, vocab):
    """→ (sure: {key: display}, candidates: {key: display}) for one item. Sure = phrases, known names, repo/model names.
    A description that lists three or more names (\"for Claude Code, Cursor and Codex\") adds none of them: only the title counts."""
    banned = vocab[2]
    title = it.get("title") or ""
    if it["src"] == "github": title = title.split("/")[-1]
    sure, cand = _ents(title, vocab)
    if it["src"] in ("github", "ph") and it.get("text"):
        s2, c2 = _ents(it["text"], vocab)
        if len(s2) + len(c2) <= 2:
            for k, v in s2.items(): sure.setdefault(k, v)
            for k, v in c2.items(): cand.setdefault(k, v)
    if it["src"] == "github":
        name = it["id"].split("/")[-1]; k = norm(name)
        if len(k) >= 3 and k not in banned and not sure: sure.setdefault(k, name)
    if it["src"] == "hf":                      # a model id names one thing: its first part (DeepSeek-V4.1-Flash → deepseek)
        base = it["id"].split("/")[-1]; k = norm(re.split(r"[-_.]", base)[0]); cand = {}
        sure = {kk: v for kk, v in sure.items() if kk == k or " " in kk}
        if len(k) >= 3 and k not in banned: sure.setdefault(k, re.split(r"[-_.]", base)[0])
    if it["src"] == "yt_suggest":   # autocomplete terms are lower-case: only known names and phrases, and never the seed's own name
        cand = {}
        seed = (it.get("seed") or "").lower()
        sure = {k: v for k, v in sure.items() if k not in seed and norm(seed) != k}
    return sure, cand

# ---------- rates ----------
def pct_ranks(vals):
    """value → percentile in 0..1 (rank among the values; ties share the higher rank)"""
    xs = sorted(vals)
    if not xs: return lambda v: 0.0
    if len(xs) == 1: return lambda v: 1.0
    return lambda v: sum(1 for x in xs if x <= v) / len(xs)

def fmt_n(x):
    if x is None: return "–"
    x = float(x)
    if abs(x) >= 1e6: return f"{x / 1e6:.1f}M"
    if abs(x) >= 1e4: return f"{x / 1e3:.0f}k"
    if abs(x) >= 1e3: return f"{x / 1e3:.1f}k"
    return f"{x:.0f}" if abs(x) >= 10 or x == int(x) else f"{x:.1f}"

def rate_items(S1, S0, ctx):
    at = lambda S, src: parse_t((S.get("status", {}).get(src) or {}).get("at") or S["taken_at"])
    t1 = parse_t(S1["taken_at"]); t0 = parse_t(S0["taken_at"]) if S0 else None
    gap = hours(t1, t0) if t0 else None
    prev = {(i["src"], i["id"]): i for i in (S0 or {}).get("items", [])}
    base = load_json(os.path.join(CACHE, "channels.json"), {})
    prev_suggest = {i["id"] for i in (S0 or {}).get("items", []) if i["src"] == "yt_suggest"}
    for it in S1["items"]:
        m, p = it["m"], prev.get((it["src"], it["id"]))
        pm = p["m"] if p else {}
        g = hours(at(S1, it["src"]), at(S0, it["src"])) if S0 else None   # the gap between this source's two fetches
        delta = lambda k: (max(0, (m.get(k) or 0) - (pm.get(k) or 0)) / g) if p and g and g > 0.05 and pm.get(k) is not None and m.get(k) is not None else None
        it["prev"] = bool(p); r = None; it["basis"] = ""
        s = it["src"]
        if s in ("yt_rss", "yt_search"):
            r = delta("views")
            if r is not None: it["basis"] = "Δ"
            elif m.get("views") is not None:
                age = m.get("age_h") if m.get("age_h") is not None else SEARCH_AGE_H
                r = (m.get("views") or 0) / max(age, 1.0); it["basis"] = "avg" if m.get("age_h") is not None else "avg~12h"
            b = m.get("baseline_vph") or (base.get(it.get("channel_id") or "", {}) or {}).get("vph")
            it["outlier"] = round(r / b, 2) if r is not None and b else None
            it["label"] = f"{fmt_n(r)} views/h" + (f" ({it['outlier']:.1f}× {md(it.get('by'))}'s usual)" if it.get("outlier") else "") + f", {fmt_n(m.get('views'))} views"
        elif s == "hn":
            r = delta("points")
            if r is not None: it["basis"] = "Δ"
            else: r = (m.get("points") or 0) / max(m.get("age_h") or 1, 1.0); it["basis"] = "avg"
            it["label"] = f"{m.get('points')} pts ({fmt_n(r)}/h), {m.get('comments')} comments"
        elif s == "github":
            r = delta("stars")
            if r is not None and r > 0: it["basis"] = "Δ"
            else: r = (m.get("stars_today") or 0) / 24; it["basis"] = "today/24"
            it["label"] = f"{fmt_n(m.get('stars_today'))}★ today ({fmt_n(r)}/h), {fmt_n(m.get('stars'))}★"
        elif s == "hf":
            r = float(m.get("trending") or 0); it["basis"] = "trendingScore"
            dl = delta("likes")
            it["label"] = f"trending {m.get('trending')}, {fmt_n(m.get('likes'))} likes" + (f" (+{fmt_n(dl)}/h)" if dl else "")
        elif s == "gtrends":
            r = (m.get("traffic") or 0) / max(m.get("age_h") or 1, 1.0); it["basis"] = "avg"
            it["label"] = f"{fmt_n(m.get('traffic'))}+ searches ({it.get('geo')})"
        elif s == "yt_suggest":
            it["new"] = bool(S0) and it["id"] not in prev_suggest
            it["label"] = f"autocomplete rank {m.get('rank', 0) + 1} for '{md(it.get('seed'))}'" + (" · new" if it.get("new") else "")
        elif s == "ph":
            it["label"] = "launched on Product Hunt"
        it["rate"] = r
    # velocity percentile within each source: YouTube uses the outlier score where the channel baseline is known
    by = collections.defaultdict(list)
    for it in S1["items"]: by[it["src"]].append(it)
    for s, xs in by.items():
        if s in ("yt_rss", "yt_search"):
            po = pct_ranks([i["outlier"] for i in xs if i.get("outlier") is not None]); pr = pct_ranks([i["rate"] for i in xs if i["rate"] is not None])
            for i in xs: i["vel"] = po(i["outlier"]) if i.get("outlier") is not None else (pr(i["rate"]) * 0.9 if i["rate"] is not None else 0)
        elif s == "yt_suggest":
            for i in xs: i["vel"] = round((1 - i["m"].get("rank", 0) / 10) * 0.5 + (0.4 if i.get("new") else 0), 3)
        elif s == "ph":
            for i in xs: i["vel"] = 0.0
        else:
            pr = pct_ranks([i["rate"] for i in xs if i["rate"] is not None])
            for i in xs: i["vel"] = pr(i["rate"]) if i["rate"] is not None else 0
    return gap

# ---------- archetype + angle ----------
ARCH_RULES = [
    ("risk", r"\b(leak|leaked|security|vulnerab\w*|hack(ed|ers?)?|breach|exploit|jailbreak|lawsuit|sued|banned?|danger\w*|risk\w*|scam|malware|outage|deleted)\b"),
    ("comparison", r"\b(vs\.?|versus|compared|comparison|better than|beats?|showdown|which is better|alternative)\b"),
    ("launch", r"\b(launch\w*|releas\w*|announc\w*|introduc\w*|just dropped|drops?|unveil\w*|is here|now available|open[- ]sourced?|new model|preview|beta)\b"),
    ("tutorial", r"\b(how to|tutorial|step by step|build (an?|your)|setup|set up|install\w*|full course|crash course|guide|from scratch|hands[- ]on)\b"),
    ("tips", r"\b(tips?|tricks?|hacks?|\d+ (ways|things|tools|prompts|features|mistakes)|cheat ?sheet|workflow)\b"),
    ("myth-buster", r"\b(myths?|wrong|overhyped|truth|lie|lies|nobody|actually|isn'?t|doesn'?t|misconception|fake)\b"),
    ("story", r"\b(story|history|founder|journey|how (i|we|they) built|inside|behind the|fired|quit|acquir\w*)\b"),
    ("concept", r"\b(what is|what are|explained|how .* works|why|understand\w*|intro to|basics|in \d+ (seconds|minutes))\b"),
]
ANGLE = {
    "launch": "What {t} just shipped, and the one thing a student can try with it today",
    "comparison": "{t} vs the tool you already use: which to pick for a college project",
    "tutorial": "Use {t} in 60 seconds: the three steps, on one real example",
    "tips": "Three {t} tricks most beginners miss",
    "myth-buster": "The {t} claim everyone repeats, and what is actually true",
    "risk": "{t}: what went wrong, and how to stay safe when you use it",
    "story": "The story behind {t}, in 60 seconds",
    "concept": "What {t} actually is, shown on one running example",
    "trend": "Why everyone is talking about {t} this week, and whether it matters for you",
}
def archetype(items):
    votes = collections.Counter()
    for it in items:
        t = (it.get("title") or "") + " " + (it.get("text") or "")
        for name, rx in ARCH_RULES:
            if re.search(rx, t, re.I): votes[name] += 1; break
    if any(i["src"] in ("ph",) for i in items) or any(i["src"] == "hf" and i.get("t") and (parse_t(i["t"]) or now_local()) > now_local() - dt.timedelta(days=7) for i in items):
        votes["launch"] += 1
    if not votes: return "trend"
    order = [n for n, _ in ARCH_RULES]
    return max(votes, key=lambda k: (votes[k], -order.index(k)))

# ---------- brief ----------
def snapshot_files(): return sorted(glob.glob(os.path.join(SNAPS, "????-??-??T????.json")))

def brief(date=None):
    cfg = json.load(open(SOURCES)); ctx = ctx_for(cfg); vocab = build_vocab(cfg)
    files = snapshot_files()
    if date: files = [f for f in files if os.path.basename(f)[:10] <= date]
    if not files: sys.exit("no snapshot yet: run `trends.py snap` first")
    S1 = load_json(files[-1], None); S0 = load_json(files[-2], None) if len(files) > 1 else None
    if S0 and hours(parse_t(S1["taken_at"]), parse_t(S0["taken_at"])) > 72:
        log("  previous snapshot is more than 72 h older: rates use one-snapshot averages"); S0 = None
    t1 = parse_t(S1["taken_at"]); D = t1.strftime("%Y-%m-%d")
    gap = rate_items(S1, S0, ctx)
    items, dropped = [], 0
    for it in S1["items"]:
        if excluded(it, ctx): dropped += 1; continue
        it["fit"] = fits(it, ctx) or it["src"] in ("yt_suggest",)
        items.append(it)

    # topics: sure entities, plus capitalised names that show up in two or more source families
    LOWER_WORDS.clear()
    for it in items:
        if it["src"] != "yt_suggest": LOWER_WORDS.update(norm(w) for w in re.findall(r"(?<![\w.])[a-z][a-z]+(?![\w])", (it.get("title") or "") + " " + (it.get("text") or "")))
    per_item, cand_fams = [], collections.defaultdict(set)
    for it in items:
        sure, cand = extract(it, vocab); per_item.append((it, sure, cand))
        if not (it["src"] in ("yt_rss", "yt_search") and it.get("vel", 0) < 0.5):
            for k in cand: cand_fams[k].add(FAMILY[it["src"]])
    topics = {}
    for it, sure, cand in per_item:
        # a search result with a handful of views is noise, not a mention: YouTube items need top-half pull to join a topic
        if it["src"] in ("yt_rss", "yt_search") and it.get("vel", 0) < 0.5: continue
        ents = dict(sure); ents.update({k: v for k, v in cand.items() if len(cand_fams[k]) >= 2 and k not in ents})
        for k, disp in ents.items():
            t = topics.setdefault(k, {"key": k, "items": [], "names": collections.Counter()})
            if it not in t["items"]: t["items"].append(it)
            t["names"][disp.strip()] += 1

    seen_p = os.path.join(CACHE, "topics_seen.json"); seen = load_json(seen_p, {})
    first_items = {}
    for f in files[-30:]:   # the first snapshot each item was in → the topic's "first seen"
        ft = dt.datetime.strptime(os.path.basename(f)[:15], "%Y-%m-%dT%H%M").replace(tzinfo=t1.tzinfo)
        for i in load_json(f, {}).get("items", []): first_items.setdefault((i["src"], i["id"]), ft)

    out = []
    for k, t in topics.items():
        xs = t["items"]; fams = sorted({FAMILY[i["src"]] for i in xs})
        best = max(i.get("vel", 0) for i in xs)
        fit = sum(1 for i in xs if i["fit"]) / len(xs)
        rec = seen.get(k, {})
        cands = [first_items.get((i["src"], i["id"]), t1) for i in xs] + ([parse_t(rec["first_seen"])] if rec.get("first_seen") else [])
        fs_dt = min(c for c in cands if c)
        first_seen = fs_dt.isoformat(timespec="seconds")
        fresh = hours(t1, fs_dt) <= 24
        continuing = any(b < D for b in rec.get("briefs", []))
        score = 40 * best + 15 * (len(fams) - 1) + (10 if fresh and not continuing else 3 if continuing else 0) + 15 * fit + min(5, len(xs) - 1)
        if fit == 0: score -= 15
        top = sorted(xs, key=lambda i: -i.get("vel", 0))
        ev, used = [], set()
        for i in top:                                # the best item of each family first, then the next best
            if FAMILY[i["src"]] in used: continue
            used.add(FAMILY[i["src"]]); ev.append(i)
        ev += [i for i in top if i not in ev][: max(0, 2 - len(ev))]
        ev = [i for i in ev if safe_url(i.get("url"))][:4]
        name = max(t["names"], key=lambda n: (not (n.isupper() and len(n) > 4), any(c.isupper() for c in n), t["names"][n]))
        arch = archetype(xs)
        out.append({"key": k, "name": clean(name, 40), "score": round(score, 1), "best_vel": round(best, 3), "families": fams, "n_items": len(xs),
                    "fit": round(fit, 2), "first_seen": first_seen, "fresh": fresh, "continuing": continuing, "archetype": arch,
                    "angle": ANGLE[arch].format(t=clean(name, 40)),
                    "why": "; ".join(f"{LABEL[i['src']].split(' (')[0]}: {i['label']}" for i in ev[:2]),
                    "evidence": [{"title": clean(i["title"], 110), "url": safe_url(i["url"]), "source": LABEL[i["src"]], "metric": i.get("label", ""),
                                  "by": clean(i.get("by"), 50)} for i in ev]})
    out.sort(key=lambda t: -t["score"])
    # one topic per item-set: drop a topic whose items are all inside a higher-ranked topic (e.g. "anthropic" under "claude")
    kept = []
    for t in out:
        ids = {(e["url"]) for e in t["evidence"]}
        if any(ids <= {e["url"] for e in k2["evidence"]} and t["n_items"] <= k2["n_items"] for k2 in kept[:40]): continue
        kept.append(t)
    multi = [t for t in kept if len(t["families"]) >= 2 and t["fit"] > 0]
    single = [t for t in kept if len(t["families"]) == 1 and t["fit"] > 0]
    top10 = multi[:10]
    if len(top10) < 10: top10 += [dict(t, single=True) for t in single[: 10 - len(top10)]]
    in_top = {t["key"] for t in top10}
    watch = [t for t in single if t["key"] not in in_top and t["best_vel"] >= 0.75][:8]
    for r, t in enumerate(top10, 1): t["rank"] = r

    # rising searches: new autocomplete completions vs the previous snapshot, and Google Trends tech items
    sug = [i for i in items if i["src"] == "yt_suggest"]
    rising = [{"term": i["title"], "seed": i.get("seed"), "rank": i["m"]["rank"] + 1, "url": i["url"]} for i in sug if i.get("new")]
    rising.sort(key=lambda r: r["rank"])
    gtr = sorted([i for i in items if i["src"] == "gtrends"], key=lambda i: -(i["m"].get("traffic") or 0))
    rising_gt = [{"term": i["title"], "geo": i.get("geo"), "traffic": i["m"].get("traffic"), "url": safe_url(i.get("news_url")) or i["url"],
                  "news": clean(i.get("text"), 140)} for i in gtr[:8]]

    per_source = {}
    for s, _ in SOURCE_FUNCS:
        xs = [i for i in items if i["src"] == s and (i["fit"] or s in ("yt_rss",))]
        key = (lambda i: -(i.get("outlier") or 0) * 1e9 - (i.get("rate") or 0)) if s in ("yt_rss", "yt_search") else (lambda i: -(i.get("vel") or 0) - (i.get("rate") or 0) * 1e-9)
        per_source[s] = [{"title": clean(i["title"], 100), "url": safe_url(i["url"]), "metric": i.get("label", ""), "by": clean(i.get("by"), 40)} for i in sorted(xs, key=key)[:5]]

    for t in kept:     # remember topics: first seen, and which briefs showed them (top 10 + watch list)
        rec = seen.setdefault(t["key"], {"first_seen": t["first_seen"], "briefs": []})
        if parse_t(t["first_seen"]) < parse_t(rec["first_seen"]): rec["first_seen"] = t["first_seen"]
    for t in top10 + watch:
        b = seen[t["key"]]["briefs"]
        if D not in b: b.append(D)
    save_json(seen_p, seen)

    status = S1.get("status", {})
    meta = {"date": D, "generated_at": now_local().isoformat(timespec="seconds"),
            "snapshots": {"latest": S1["taken_at"], "previous": S0["taken_at"] if S0 else None, "gap_h": round(gap, 2) if gap else None,
                          "files": [os.path.basename(f) for f in ([files[-2]] if S0 else []) + [files[-1]]]},
            "counts": {"items": len(S1["items"]), "excluded": dropped, "topics": len(kept)},
            "top": [{k: v for k, v in t.items()} for t in top10], "watch": watch, "rising": rising[:15], "rising_trends": rising_gt,
            "per_source": per_source, "status": status,
            "briefs": sorted(os.path.basename(f)[:-3] for f in glob.glob(os.path.join(TR, "????-??-??.md")) if True)}
    write_md(meta, D)
    if D not in meta["briefs"]: meta["briefs"] = sorted(meta["briefs"] + [D])
    save_json(os.path.join(TR, "latest.json"), meta)
    log(f"→ references/trends/{D}.md  ·  references/trends/latest.json  ({len(kept)} topics, top {len(top10)}, watch {len(watch)})")
    return meta

def tstr(iso):
    t = parse_t(iso) if iso else None
    return t.strftime("%d %b %H:%M") if t else "–"

def write_md(m, D):
    s = m["snapshots"]; L = []
    L.append(f"# Trend radar · {D}\n")
    if s["previous"]:
        L.append(f"Snapshots **{tstr(s['previous'])} → {tstr(s['latest'])}** ({s['gap_h']} h apart): rates are growth per hour between the two.  ")
    else:
        L.append(f"One snapshot (**{tstr(s['latest'])}**): rates are totals ÷ age. Take a second snapshot later for real growth per hour.  ")
    ok = [LABEL[k] for k, v in m["status"].items() if v.get("ok") and k in LABEL]
    bad = [f"{LABEL.get(k, k)} ({v.get('error', '')[:60]})" for k, v in m["status"].items() if v.get("ok") is False]
    L.append(f"{m['counts']['items']} items from {len(ok)} sources, {m['counts']['excluded']} excluded by the exclude words"
             + (f" · **failed:** {', '.join(bad)}" if bad else "") + ".  ")
    L.append("Titles below are other people's words, quoted as data. Check every claim at its source before it goes into a script.\n")
    L.append("## Top 10 topics\n")
    L.append("| # | Topic | Score | Why it's rising | Sources | First seen | Fit | Angle · archetype |")
    L.append("|---|---|---|---|---|---|---|---|")
    for t in m["top"]:
        seen = ("continuing" if t["continuing"] else "new " + tstr(t["first_seen"]) if t["fresh"] else tstr(t["first_seen"]))
        L.append(f"| {t['rank']} | **{md(t['name'])}**{' ·single' if t.get('single') else ''} | {t['score']:.0f} | {md(t['why'])} | {', '.join(t['families'])} | {seen} "
                 f"| {'high' if t['fit'] >= .6 else 'some' if t['fit'] > 0 else 'none'} | {md(t['angle'])} · *{t['archetype']}* |")
    L.append("\n### Evidence\n")
    for t in m["top"]:
        L.append(f"**{t['rank']}. {md(t['name'])}** ({t['archetype']})")
        for e in t["evidence"]:
            L.append(f"- [{md(e['title'])}]({e['url']}) · {e['source']} · {md(e['metric'])}")
        L.append("")
    L.append("## Rising searches\n")
    if m["rising"]:
        L.append("New YouTube autocomplete completions since the previous snapshot:\n")
        for r in m["rising"]: L.append(f"- [{md(r['term'])}]({r['url']}) (seed '{md(r['seed'])}', #{r['rank']})")
    else:
        L.append("- No new autocomplete completions" + ("" if s["previous"] else " (first snapshot: this one is the baseline)") + ".")
    if m["rising_trends"]:
        L.append("\nGoogle Trends, tech/AI only:\n")
        for r in m["rising_trends"]: L.append(f"- [{md(r['term'])}]({r['url']}) · {r['geo']} · {fmt_n(r['traffic'])}+ searches" + (f" · {md(r['news'])}" if r["news"] else ""))
    L.append("\n## Watch list (one source family, rising fast)\n")
    for t in m["watch"] or []:
        e = t["evidence"][0] if t["evidence"] else None
        L.append(f"- **{md(t['name'])}** · {', '.join(t['families'])} · {md(t['why'])}" + (f" · [{md(e['title'])}]({e['url']})" if e else ""))
    if not m["watch"]: L.append("- (none)")
    L.append("\n## Per source, top 5\n")
    for k, xs in m["per_source"].items():
        st = m["status"].get(k, {})
        L.append(f"**{LABEL[k]}**" + ("" if st.get("ok") else f" · failed: {md(st.get('error', 'not run'))}"))
        for x in xs: L.append(f"- [{md(x['title'])}]({x['url']}) · {md(x['metric'])}" + (f" · {md(x['by'])}" if x["by"] and k != "github" else ""))
        L.append("")
    L.append("---\nScore = 40 × best velocity percentile + 15 per extra source family + 10 new (first seen ≤ 24 h) or 3 continuing"
             " + 15 × channel fit + up to 5 for volume, − 15 with no fit. Made by `studio/tools/trends.py brief`; see references/trends/README.md.")
    open(os.path.join(TR, f"{D}.md"), "w").write("\n".join(L) + "\n")

def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("cmd", choices=["snap", "brief", "run", "resolve"])
    ap.add_argument("--date", help="brief: the date (YYYY-MM-DD) whose latest snapshot to compare with the one before it")
    a = ap.parse_args()
    if a.date and not re.match(r"^\d{4}-\d{2}-\d{2}$", a.date): sys.exit("--date YYYY-MM-DD")
    os.makedirs(CACHE, exist_ok=True)
    held = lock()
    if a.cmd == "resolve": resolve()
    if a.cmd in ("snap", "run"): snap()
    if a.cmd in ("brief", "run"): brief(a.date)
    held.close()

if __name__ == "__main__":
    main()
