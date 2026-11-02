# Top explainer shorts vs our reels (2026-10-30)

The 12 references are the most-viewed recent shorts from channels that lead AI and dev explainers. They were picked
from each channel's Shorts tab by views, plus two high-reach shorts from a YouTube search. They were measured
alongside our 7 latest renders with `studio/tools/benchmark.py measure()`, the same method as `qa` and `watch`.
The hook-fill column was measured separately on the frame at 1.5 s:
- the stage band is y 10–76 %, grey;
- the background is the most common grey value;
- a row counts as content when more than 2 % of its pixels differ from the background by more than 14 grey levels;
- hook fill is the span from the first content row to the last, divided by the band's height.

`payoffs` runs the same test on the composition.

The media is analysis-only and was not kept in the repo; the repo is public. Learn structure, never copy lines or
visuals.

| video (views) | s | words/s | pauses > 0.9 s | still % | longest still s | cuts/min | LUFS | hook fill at 1.5 s |
|---|---|---|---|---|---|---|---|---|
| ByteByteGo · How Big Tech Ships Code (1.9M) | 58 | 2.77 | 0 | 3.4 | 1.75 | 2.1 | -14.4 | 100 % |
| ByteByteGo · Why is Redis so fast (1.3M) | 47 | 3.11 | 0 | 3.7 | 1.75 | 1.3 | -21.4 | 83 % |
| Fireship · Why do computers suck at math (8.7M) | 54 | 3.61 | 0 | 48.1 | 2.5 | 17.8 | -17.9 | 91 % |
| Fireship · RGB not RBY (3.6M) | 43 | 3.51 | 0 | 61.0 | 3.5 | 20.9 | -17.5 | 93 % |
| KodeKloud · Interview: file compression (662K) | 165 | 3.53 | 0 | 75.9 | 15.0 | 0.0 | -19.2 | 57 % |
| KodeKloud · Why Git wasn't enough for Anthropic (381K) | 172 | 3.49 | 0 | 62.0 | 6.75 | 0.0 | -19.2 | 48 % |
| codebasics · FDE job title (92K) | 51 | 2.72 | 0 | 2.9 | 0.75 | 17.6 | -17.2 | 100 % |
| bycloud · Why does AI suck at math (35K) | 60 | 3.36 | 0 | 9.6 | 0.75 | 31.0 | -19.7 | 100 % |
| LearnThatStack · Sign in with Google isn't OAuth (9K) | 56 | 2.04 | 2 | 93.7 | 14.75 | 2.2 | -17.3 | 100 % |
| Under the Hood AI · Jev vs Laya (43K, 43× subs) | 161 | 2.55 | 14 | 57.5 | 2.75 | 0.7 | -14.1 | 90 % |
| 9x · MCP explained in 2 minutes (55K) | 148 | 3.31 | 0 | 57.7 | 11.5 | 5.3 | -17.0 | 62 % |
| IBM Technology · Claude Opus 4.6 security risks (20K) | 50 | 3.27 | 0 | 0.0 | 0.0 | 6.0 | -15.8 | 100 % |
| **median of the 12** | **57** | **3.29** | **0** | **52.8** | **2.6** | **3.8** | **-17.4** | **92 %** |
| harness-reel | 114 | 2.14 | 11 | 43.4 | 3.25 | 9.0 | -15.6 | 32 % |
| fde-reel | 92 | 2.18 | 9 | 47.3 | 2.25 | 11.1 | -14.9 | 73 % |
| dots-v3 | 96 | 2.31 | 4 | 0.8 | 0.5 | 8.1 | -14.0 | 100 % |
| rea-reel | 116 | 2.58 | 7 | 27.2 | 2.0 | 5.7 | -14.0 | 77 % |
| mcp-reel | 133 | 2.56 | 10 | 38.9 | 2.25 | 5.9 | -14.7 | 86 % |
| langgraph-reel | 137 | 2.65 | 16 | 42.6 | 2.25 | 4.4 | -14.8 | 63 % |
| laya | 68 | 2.51 | 2 | 40.6 | 1.75 | 7.1 | -14.0 | 72 % |
| **median of ours** | **114** | **2.51** | **9** | **40.6** | **2.25** | **7.1** | **-14.7** | **77 %** |

## What the numbers say
- **Length:** the references run a median 57 s, and 8 of 12 are under 60 s. The long ones (KodeKloud, 9x, Under the
  Hood) are interview-question or comparison formats that keep building one diagram. Ours ran a median 114 s.
- **Pace and dead air:** the references read at 2.7–3.6 words/s (median 3.3) with no pauses over 0.9 s in 10 of 12.
  Ours read at 2.1–2.7 with 2–16 such pauses. The only reference slower than our 2.3 target is LearnThatStack
  (2.04, 9K views).
- **Still share doesn't predict reach:** the references run 0–94 % still. KodeKloud's 381K- and 662K-view shorts
  are 62–76 % still, with holds of 7–15 s while the viewer reads. It is reported, not a target.
- **The frame at 1.5 s:** every reference fills 48–100 % of the band with the question and the object. Harness
  fills 32 % (a small card in the top third, an empty middle).

## What the frames show
- **The opening is the viewer's question in large type over the object already acting.** Examples: "INTERVIEW
  QUESTION: How does a folder get compressed?" over a folder being right-clicked → Compress; "Everyone gets this
  wrong about 'Sign in with Google'" under a crossed-out OAuth = Login; "Why is Redis so fast".
- **One background, one diagram that grows:** KodeKloud, Under the Hood AI and LearnThatStack never change the
  background. The question or title stays pinned at the top, and the diagram gains parts. Ours change the
  background colour every section (white, blue, yellow, navy) and put 5–8 small boxes on screen.
- **Titles are the viewer's question:** 4 of KodeKloud's top 5 shorts start with "Interview:"; the others are "Why
  is X so fast?" and "Everyone gets X wrong". Ours were titled by the term ("Harness Engineering").
- **Where we're strong:** clean design, captions in sync, loudness at −14, every visual on its word, and accuracy.
  The closest reference in look is Under the Hood AI (43× its subscribers).

## Rules this changed (2026-10-30)
- `content-plan` decides Length (45–75 s by default, `Long reel: <reason>` otherwise) and the Hook question. The
  linter fails a read-aloud over 180 words without a Long reel reason, for packages from 2026-10-30 on.
- `visual-plan` rule 6 (the frame at 1.5 s) and rule 12 (one background, a pinned question, a diagram that grows,
  ≤ 5 boxes, text ≥ 34 px). `reference-flat/design.md` says the same; `validate` warns on a per-scene colour change.
- `payoffs` checks the hook frame (≥ 45 % fill at 1.5 s, a failure). Stillness fails only a frozen frame (> 5 s),
  and still share is reported only (`payoffs`, `qa`, `benchmark`).
- Pace (2.3 words/s in `pace.json`) is unchanged; whether to raise it is the owner's decision.
