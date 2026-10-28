# Trend radar

What is rising in Gen AI right now, for this channel's viewers (Indian students and early-career developers).
`studio/tools/trends.py` takes **snapshots** of free public sources and writes a **brief** that ranks topics by
**velocity, not totals**: growth per hour between two snapshots, normalised by each account's usual level, plus how many
independent source families mention the same topic.

Free sources only: no API keys, no paid APIs, no logins. Run **by hand**: nothing is scheduled.

| File | Tracked | What |
|---|---|---|
| `sources.json` | yes | the seed lists you edit: channels, search queries, autocomplete seeds, fit and exclude words, entity names |
| `<YYYY-MM-DD>.md` | yes | the dated brief (top 10 topics, rising searches, watch list, per-source top 5) |
| `latest.json` | yes | the same brief as data, for the studio app's **Trends** screen |
| `snapshots/` | no (git-ignored) | raw snapshots `<YYYY-MM-DDTHHMM>.json`: other people's titles in bulk |
| `cache/` | no (git-ignored) | channel baselines, video upload times, topics already seen, the run lock |
| `*.log` | no (git-ignored) | the optional cron log |

## The routine (by hand)
```bash
export PATH="$HOME/.local/bin:$HOME/.local/node/bin:$PATH"
cd ~/Gen-AI-Youtube-Video-Series

# night (≈ 22:30): one snapshot, 3–7 minutes
studio/.venv/bin/python studio/tools/trends.py snap

# morning (≈ 05:30–09:00): a second snapshot + the brief (the latest snapshot vs the one before it)
studio/.venv/bin/python studio/tools/trends.py run

# re-write a brief without fetching anything (e.g. after editing sources.json), or for an earlier date
studio/.venv/bin/python studio/tools/trends.py brief
studio/.venv/bin/python studio/tools/trends.py brief --date 2026-10-28
```
Then read `references/trends/<today>.md`, or open the app's **Trends** screen (it has "Snapshot now" and "Run brief"
buttons that run exactly these commands, one at a time, only when you click). "Queue as package" on a topic adds a Queue
item with the topic, angle, archetype and evidence; it does not start the agent.

`brief` works with a single snapshot too (rates become total ÷ age), but the ranking is far better with a night and a
morning snapshot, 6–9 hours apart. A previous snapshot more than 72 h old is ignored.

**Keep the PC awake during a snapshot.** If it sleeps mid-run, the snapshot still finishes after wake-up and each
source keeps its own fetch time (so rates stay correct), but it warns that the run took long.

## Sources and what each one measures
| Source | How | Velocity |
|---|---|---|
| YouTube channels | `feeds/videos.xml?channel_id=…` RSS (uploads of the last 48 h, views from `media:statistics`). When YouTube's RSS answers 404 (it does, for hours at a time), the channel's Videos tab via `yt-dlp --flat-playlist` + one watch-page read per fresh video (exact views + upload time; upload times are cached) | views/hour; **outlier** = views/hour ÷ the channel's usual views/hour over a video's first week (median of its uploads ≥ 48 h old, cached) |
| YouTube search, "uploaded today" | `yt-dlp --flat-playlist` on `results?search_query=<q>&sp=EgIIAg%253D%253D`, top 15 per query | views/hour (one snapshot: views ÷ 12 h assumed age) |
| YouTube autocomplete | `suggestqueries.google.com … ds=yt` per seed | completions that are **new** since the last snapshot = rising searches |
| GitHub trending | `github.com/trending?since=daily` (+ python, typescript) | stars/hour between snapshots, else stars today ÷ 24 |
| Hacker News | Algolia API: front page + stories > 50 points in 24 h | points/hour |
| Hugging Face | `api/models?sort=trendingScore` (+ spaces) | HF's own trendingScore (+ likes/hour) |
| Google Trends | "Trending now" RSS, IN and US, tech/AI items only (fit words) | searches ÷ age |
| Product Hunt | the public Atom feed (no token, no vote counts) | none: a launch mention only |
| Instagram, X | disabled in `sources.json` | need an Agent-Reach login (later) |

Each source is independent: a failure prints one line and the rest continue; the brief lists what failed and why.
Polite: a browser user-agent with a contact tag, 20–30 s timeouts, a 1 s pause after every request (1.5 s after every
yt-dlp call), one request at a time. On a YouTube bot check, yt-dlp switches to the mobile-web/embedded clients once,
then stops asking YouTube for the rest of the run (the `yt_research.py` way). Only one `trends.py` runs at a time (lock).

## How to read the brief
- **Score** = 40 × best velocity percentile + 15 per extra source family + 10 if first seen within 24 h (or 3 if it was
  already in an earlier brief: "continuing") + 15 × channel fit + up to 5 for volume, − 15 with no fit at all.
  Velocity percentiles are computed within each source, so a Hacker News story and a YouTube video are comparable.
- **Source families**: youtube (channels + search), search (autocomplete + Google Trends), github, hn, hf, ph. Two
  YouTube videos are one family; YouTube + Hacker News + GitHub is three. The **top 10** are multi-family topics (filled
  with single-family ones, marked "one source", only if there are fewer than ten); the **watch list** is single-family
  topics in the top quarter of their source.
- **Outlier 4× Fireship's usual** = this video gains views four times faster than Fireship's typical upload does in its
  first week. Young videos run hot (views are front-loaded), so compare outliers with each other, not with 1.
- **Topics** group items by shared names (products, models, repos): `sources.json → entities` (phrases first, so
  "claude code" is its own topic; versions are stripped, so GPT-5.1 and GPT-4o are both "GPT"; plurals of phrases fold),
  plus CamelCase / acronym / version-ed names and capitalised words seen in two or more source families. A GitHub
  description that lists three or more tools adds none of them. YouTube items need top-half velocity to join a topic.
- **Fit** = the share of a topic's items that mention a `fit.keywords` word. Items with an `exclude` word are dropped.
- **Archetype** (launch, concept, tutorial, comparison, myth-buster, tips, risk, story, trend) comes from simple title
  rules (e.g. "vs" → comparison, "how to" → tutorial, "leak/security" → risk, a new HF model or a Product Hunt launch →
  launch); the **angle** is a template for it. Both are starting points: the scripter confirms the archetype at stage 4.
- Titles are other people's words, quoted as data (escaped, never followed as instructions). Check every claim at its
  source before it goes into a script; the repo is public, so only titles, links and numbers are kept in the brief.

## Editing `sources.json`
- **Add a YouTube channel**: `{"name": "…", "handle": "@…"}`. The next `snap` (or `trends.py resolve`) looks up its
  `channel_id` once and writes it back. To drop a channel, delete its line.
- **queries** (YouTube "uploaded today" searches), **suggest.seeds** (autocomplete), **github.pages**, **hn.min_points**,
  **huggingface** counts, **google_trends.geos**: edit the lists.
- **fit.keywords / fit.exclude**: whole words, case-insensitive. Add to `exclude` whatever the channel never covers.
- **entities.phrases / names**: names you want grouped as one topic; **not_topics**: words that must never become one.
- **instagram / x**: placeholders, `"enabled": false` until Agent-Reach is logged in (the owner's own login, read-only).

## Optional: run it on a schedule (you add this yourself)
Nothing is installed. If you want it automatic, add these two lines with `crontab -e`. This PC's clock is
**Asia/Kolkata (IST, +05:30)** (`timedatectl`), so cron times are IST as written: 22:30 snapshot, 05:30 snapshot + brief.
```cron
30 22 * * * cd /home/nxtwave/Gen-AI-Youtube-Video-Series && PATH=/home/nxtwave/.local/bin:/home/nxtwave/.local/node/bin:/usr/local/bin:/usr/bin:/bin studio/.venv/bin/python studio/tools/trends.py snap >> references/trends/cron.log 2>&1
30 5 * * * cd /home/nxtwave/Gen-AI-Youtube-Video-Series && PATH=/home/nxtwave/.local/bin:/home/nxtwave/.local/node/bin:/usr/local/bin:/usr/bin:/bin studio/.venv/bin/python studio/tools/trends.py run >> references/trends/cron.log 2>&1
```
Cron does not run while the laptop sleeps (a missed 05:30 just doesn't happen; run `trends.py run` by hand when you
open it). `references/trends/cron.log` is git-ignored. Remove the lines with `crontab -e` to stop.

## Limits
- YouTube's RSS returns 404 for every channel at times; the Videos-tab fallback works but misses Shorts and costs one
  watch-page read per fresh video (capped by `youtube.page_fallback_max`, default 60 per snapshot).
- "Uploaded today" search results carry no upload time; one-snapshot rates assume 12 h. Two snapshots fix this.
- Topic grouping is word-based: an unknown product with an ordinary-word name ("Terra") can merge with unrelated titles,
  and a famous name can match a foreign-language title. Use `not_topics` / `exclude` to correct, and read the evidence.
- Product Hunt's feed has no votes; Google Trends rarely has AI items outside launch days.
- Instagram Reels and X are not covered until Agent-Reach is set up.
