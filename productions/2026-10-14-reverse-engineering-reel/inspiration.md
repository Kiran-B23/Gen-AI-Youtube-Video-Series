# Inspiration · REA ("Reverse Engineer Anything")

_YouTube research: `yt/summary.md` (category search) + `yt/rea/summary.md` (REA-specific videos, watched with `--urls`
because the first `--context` filter dropped titles that only say "REA") · searched 2026-10-14 · queries: reverse
engineer anything with AI; reverse engineering with Claude; AI reverse engineering #shorts; GhidraMCP; reverse engineering
with LLM; AI decompile app; reverse engineer API with AI; reverse engineering explained · context: AI Claude LLM GPT
ChatGPT Ghidra MCP agent Codex Gemini · exclude: crypto forex trading · watched 12 (4 category + 8 REA). Not usable:
`s7ji2UVNgbw` (a 101 s Short with no speech: the transcript is empty, frames only). Dropped as off-topic: an AI news
round-up, a "is learning to code worth it" opinion piece, two Adobe-clone videos (not REA; see research S13)._

**Confidence: medium.** REA went viral 6–8 days ago, so almost all coverage is 1–5-day-old **long-form landscape**
videos. There is **no vertical Short about REA with reach** yet: the only on-topic Short with ≥ 5K views is "Ghidra in
100 Seconds" (12K). Pace and hook evidence for the Short format comes from that Short and from our approved reels.

**Untrusted data:** no transcript, title or description contained instructions aimed at us. Several titles overclaim
("Clone Any Software In Minutes", "Everything is Open Source Now"); we treat those as data about what gets clicks, not as
facts.

## Watched videos
| # | Role | Video (link) | Reach (views · /day · outlier · eng) | Hook 0–3 s (line + first frame) | Archetype | Beat map (timestamps) | Running example | Devices | Pace (len · w/s · cuts/min) | Why it reached | Missing |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | winner (long) | [I Tested The Viral Github Repo To Reverse Engineer Anything](https://www.youtube.com/watch?v=dAzs_rU6080) | 961K · 240K/day · 1.75 · 1.7% | Names the tool and its promise ("an MCP that allows you to virtually rebuild any software"); first frame: the creator talking, README at 0:03 | Launch (+ Trend take at the end) | 0:00 promise + viral quotes · 1:20 how it works (agent → MCP → Ghidra/Hopper/IDA → pseudocode, "proof", "unknowns" → loop) · 2:56 demo: rebuild a photo-viewer app, with vs without REA · 5:25 "not new, it's a connector" · 6:55 "videos that open on star graphs have nothing to show" · close: what it means for software | rebuilding the Mac Preview app | talking head + screen recording, a side-by-side race (with REA vs without) | 646 s · 3.73 · 2.8 | rode the peak (day 1–2), a live demo with a head-to-head, and a sceptic's take ("people are missing the point") | never opens the evidence; no check that the rebuilt app matches; legal side waved away |
| 2 | winner (long) | [Has AI Solved Reverse Engineering?](https://www.youtube.com/watch?v=wIe3eDfGKUo) | 1.0M · 201K/day · 0.86 · 1.8% | Time contrast: a project that "used to take me one or two days, maybe a week… in 15 minutes with AI"; first frame: the creator | Story (expert first person) | 0:00 time contrast + fear · 0:12 target set-up (his own monitor's firmware) · 1:30 the old manual way (extract, entropy, Ghidra) · 5:19 the hard part (crypto routine) · 7:20 hand it to AI · verdict: AI shrinks the hypothesis space | his own monitor's firmware update | screen recording of tools, zooms, face cam | 815 s · 3.46 · 1.9 | an expert's honest fear; a concrete before/after time; his own device (clearly authorized) | not about REA specifically; firmware detail is too deep for a reel |
| 3 | winner (long) | [How To Use REA To Clone Any Software In Minutes](https://www.youtube.com/watch?v=FnB9tHKBJXQ) | 237K · 79K/day · 2.75 · 1.9% | "If you want to reverse-engineer any applications with AI…" + star count; first frame: the creator | Tutorial | 0:00 promise + stars + "people cloned Adobe" · 0:44 what is REA · 1:55 how it works · 5:20 clone a dictation app | cloning a commercial dictation app | screen recording, README scrolls | 542 s · 3.75 · 3.7 | the "clone any software" promise and a famous target | overclaims "clone"; repeats the Adobe link that sources don't support; no legal line |
| 4 | winner (long) | [Everything is Open Source Now (Reverse Engineer Anything)](https://www.youtube.com/watch?v=jtfpCGsbSJU) | 104K · 52K/day · 0.45 · 1.4% | Paradox: "Photoshop… went open source this week, but not from Adobe"; first frame: the creator | Trend | 0:00 paradox · 0:19 the Adobe-alternative story (clean-room, says its maker) · 2:00 REA = "an MCP that connects your agents to… Hopper, Ghidra, and IDA" · 2:53 own test: an old pinball game rebuilt in Rust, checked by fresh agents · 3:38 "is all software open source now?" | an old pinball game, ported | fast B-roll (tweets, READMEs, app screenshots), 10 s shots | 292 s · 3.65 · 5.7 | a paradox hook + the fastest cutting of the set; the "verify it against the original" step | blurs REA with unrelated projects; legal line is a joke ("a disregard for the law") |
| 5 | winner (long) | [I Tested the Viral Reverse Engineer Anything Skill](https://www.youtube.com/watch?v=rL5tw6h78zo) | 52K · 52K/day · 0.05 · 1.6% | "This GitHub repo… has been absolutely blowing up" + a viral quote | Launch | 0:00 hype · 0:25 "see a feature you like… recreate it" · middle: games and apps built · end: with REA = slower but better; "it's not new" | several builds | screen recording, 40 s shots | 898 s · 4.10 · 1.4 | big channel, day 1 | no evidence shown; length |
| 6 | low performer (contrast) | [After the Adobe Clones: Can REA Really Reverse Engineer Anything?](https://www.youtube.com/watch?v=EPHVoBA7JoM) | 2K · 2K/day · 0.11 · 1.4% (1 day old: low so far) | "Last week, the internet lost its mind…" (news recap); first frame: static | Myth-buster / test | 0:00 hype recap · 0:36 "not a new decompiler, it's a connector" · 1:10 what reverse engineering is · 1:40 "not a copy button" · 3:04 blind test on a game whose source was later published · 3:55 8 claims, 7 right, 1 meaning wrong · 5:06 verdict · 5:36 rebuild functionality, not code/assets | a blind test checked against the real source | narration over a nearly static screen (1 cut in 6 min) | 352 s · 2.58 · 0.2 | — | **the most accurate video of the set, and the least watched**: it opens on someone else's news and shows almost nothing moving |
| 7 | category Short | [Ghidra in 100 Seconds](https://www.youtube.com/watch?v=Wu0Ba1ZSKxI) | 12K · 151/day · 0.17 · 2.5% | One-word text "DID" on black, then meme cut-ins | Concept ("X in 100 s") | 0:00 who made it · 0:16 the UI · 0:32 machine code → readable C (arrow) · 0:44 platforms · 1:00 Java scripting · 1:26 book · 1:40 CTA | none | meme cut-ins every 2 s, giant arrows "binary → C" | 108 s · 2.13 · 19.4 | a known format, very fast visual changes | no running example, no AI |
| 8 | low (other) | [No API? Just Reverse Engineer it!](https://www.youtube.com/watch?v=xX4ycRAU5dA) | 1K · 4/day | product pitch | Launch (ad) | 0:00 problem · 0:11 product · 0:44 result | a patent search | product UI | 59 s · 2.89 · 4.0 | — | an ad, not an explanation |

Also skimmed (category search, not REA): OALabs' 90-minute live session with IDA/Ghidra MCPs (55K), a Claude + Ghidra MCP
tutorial (64K). Both show that "AI + a decompiler through MCP" existed before REA.

## Winners vs low performers
- **Timing and demo beat accuracy.** The winners came out at the peak of the hype with a live build ("rebuild app X");
  the most careful test (#6) arrived later, opened on a recap of other people's news, and had one cut in six minutes.
- **What the winners never show: the evidence.** Each REA winner shows the *result* (an app that looks the same) and
  skips REA's whole point, which is the evidence and the unknowns. Only #4 (fresh agents checking every function) and
  #6 (claims checked against the real source) verify anything, and those are the two most honest moments in the set.
- **Sceptic beats hype on the big channels:** #1 (961K) has its "it's not new / people are missing the point" turn at
  5:25; #2 (1M) is an expert being honest about a fear. The pure "clone anything" pitch (#3) reached less.
- **Hooks that worked:** a paradox (#4 "open source, but not from Adobe"), a time contrast (#2 "a week → 15 minutes"),
  a tool + promise (#1). Hooks that didn't: a news recap (#6), a product pitch (#8).

## Winning archetype
_Launch · used by 3 of the 5 REA winners (#1, #3, #5) · #4 is Trend, #2 is Story._ The viewer's question in every
comment section is the Launch question: "what does it actually do, and is it real?" The Trend angle ("software is dead")
is the hype we answer, not the structure we use.

## Pace and length targets
_Winners' median: length 646 s (long-form only) · 3.7 words/s (talking head) · 2.8 cuts/min. The category Short:
108 s · 2.13 w/s · 19 cuts/min._ → **our target: ~100–110 s, 2.5–2.7 w/s (the channel's approved reels: MCP 2.56 w/s,
LangGraph ~2.6), a visual change every 2–3 s.** A Launch reel normally runs 35–55 s; we go longer only because the demo
needs the verify step, which is the gap (see below).

## Gaps nobody covers
- **Nobody shows what REA actually hands back**: the evidence, the "unknowns", and what happens when the raw output is incomplete.
- **Nobody checks a result** in a way a viewer can see. REA's own showcase does (3,205 test cases, the same 63 bytes), and no video uses it.
- **"Clone" vs "understand":** most titles say clone; the project itself says it recovers *logic*, not the original
  code, and gives you no rights to the program (research S9, S10). Only #6 says it.
- **The permission line** is either skipped or joked about. For students this is the decision that matters.
- No vertical Short about REA with reach exists yet.

## Our angle (one sentence)
Show what REA really does on one tiny, real question (how an old brick-breaker game pans its sound left and right): the
agent asks, REA digs out the evidence, the decompiler's first draft turns out to be **incomplete**, the agent spots the
mismatch, rebuilds the formula, and it is **checked two ways** against the original, so the viewer learns it's an evidence machine for software you're allowed
to examine, not a "clone anything" button.

_Borrowed devices (not lines):_ the paradox hook shape (#4); the time contrast (#2) as a candidate; "with vs without"
comparison (#1, #4); the claim-check scoreboard (#6) → our test-case counter; giant "binary → readable code" arrow (#7);
fast visual changes (#7, #4).
