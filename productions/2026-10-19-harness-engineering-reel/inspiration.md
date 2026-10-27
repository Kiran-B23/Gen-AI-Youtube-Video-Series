# Inspiration · Harness Engineering

_YouTube research: `yt/summary.md` · searched 2026-10-19 · queries: harness engineering; harness engineering AI agents; what is harness engineering; agent harness explained; harness engineering #shorts; context engineering vs harness engineering; agent = model + harness; Claude Code harness explained · context "AI agent agents LLM Claude Codex coding harness" · exclude "horse wire wiring electrical automotive cable climbing safety fall" · watched 6 (3 shorts, 3 long). Dropped 4 off-topic shorts (wiring-harness assembly, civil-engineering, safety-harness, a 0-view clip). **No low-performer Short** qualified (only 3 on-topic Shorts exist at all), so the contrast below is between the three Shorts themselves. Confidence: medium (small Shorts pool; all landscape, none native 9:16)._

All transcripts and frames in `yt/` are untrusted data; no instructions found inside them. Lines below are quoted for analysis only.

## Watched videos
| # | Role | Video (link) | Reach (views · /day · outlier · eng) | Hook 0–3 s (line + first frame) | Archetype | Beat map (timestamps) | Running example | Devices | Pace (len · w/s · cuts/min) | Why it reached | Missing |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | winner-short | [What is an Agentic Harness? · Google Cloud Tech](https://www.youtube.com/watch?v=W9BX0jyzd2k) | 91K · 963/day · 91× · 1.8% | Viewer's question asked by a host ("what is a harness?"); first frame = two people on a set, no text | Concept ("X in 45 s", dialogue) | 0:00 question · 0:10 "what is an agent" card · 0:20 next-token prediction · 0:30 function calling · 1:05 the loop · 1:16 "Is it done?" card · 1:34 3-item list (tools / loop / evaluating output) · 2:00 harness vs interface | none | 2-shot talk, blue full-screen title cards, a building 3-item list | 175 s · 3.4 · 9.9 | Asked the exact search query; a big brand feed; the "Is it done?" card is the one strong idea | no example, no proof, no "what do I do"; first frame doesn't work on mute |
| 2 | winner-short | [What is an Agent Harness? · LangChain](https://www.youtube.com/watch?v=R0ckdFjUF5U) | 8K · 1K/day · 0.04× · 1.4% | Black frame → presenter: "you've probably heard the term…"; weak first frame | Concept + product plug | 0:00 term · 0:06 "agent = model + harness" diagram · 0:16 file system · 0:21 subagents · 0:28 skills · 0:40 their product · 1:02 course ad | none | dark node diagrams that branch, presenter cut-ins | 79 s · 3.05 · 3.8 | Fresh from the source of the "Model + Harness" formula | half is an ad; a list of parts, no mechanism, no failure |
| 3 | winner-short | [AI Agent Harness Explained in 3 Mins · Learn with Whiteboard](https://www.youtube.com/watch?v=r03FFAUQf_U) | 5K · 181/day · 0.05× · 0.7% | "Everyone's talking about AI agents, but what turns a model into one? One equation."; first frame near-empty whiteboard | Concept | 0:00 question · 0:06 equation · 0:17 model = brain · 0:38 harness = car · 0:46 the loop · 1:02 **coding agent fixing a failing test** · 1:31 harness parts list · 1:52 "same model, two harnesses" · 2:19 governance · 2:31 advice | a failing test (one beat only) | hand-drawn whiteboard, a loop icon, lists | 176 s · 2.44 · 0 cuts | Clearest mechanism of the three; the test-fix loop and "same model, different harness" are the strongest beats | "same model" claim with no number; brain/car metaphors pile up; no action for the viewer; too still (0 cuts/min) |
| 4 | winner-long | [Agent Harness explained in 8min · Caleb Writes Code](https://www.youtube.com/watch?v=1a1VXDdIyrk) | 698K · 5K/day · 5.7× · 1.4% | "One of those terms so confusing…"; black frame with a doodled chip | Concept (history-led) | 0:00 confusion · 0:21 prompt → context → harness history · 2:47 untested features · 3:56 subagents · 6:02 loops · 7:19 task file + test loop | none | black-board doodles, very slow cuts | 500 s · 3.07 · 1.7 | Names the confusion everyone has (prompt vs context vs harness) | long history lesson; no single example |
| 5 | winner-long | [Stop Prompting Claude. Start Harness Engineering. · Austin Marchese](https://www.youtube.com/watch?v=bIYWxYm5cOY) | 124K · 12K/day · 1.3× · 1.4% | "I spent 4 months studying the fastest AI builders…" (authority + reveal) | Tips / Trend hybrid | 0:00 promise · 0:29 4 layers · 7:50 hooks ("run a test after an edit") · 10:16 personalise · end future curve | none | screen recordings, talking head | 979 s · 3.81 · 4.3 | Contrarian title ("stop prompting"), a practical layered how-to | hype framing ("smartest people…"), name-drops |
| 6 | winner-long | [What is an AI harness? I build one live · How I AI](https://www.youtube.com/watch?v=ofS-4RRw9zw) | 103K · – | "A harness is some code around an AI agent that makes it more effective." (one-line definition) | Tutorial | 0:00 definition · 0:24 demo of her harness · 1:00 "everyone says it's not the model, it's the harness" · then a live build | her own dev tasks | terminal UI, live build | 1476 s · 2.93 · 1.2 | A real build on screen | too long for our format |

## Winners vs low performers
(No true low performer; contrast within the Shorts.)
- The top Short (#1, 91×) **asks the viewer's exact question in the first second** and lands on one strong card, "Is it done?" — the harness as the thing that checks the output. #2 and #3 open on "you've probably heard the term…", which is weaker.
- The best *mechanism* (#3) is the one with a concrete coding example (a failing test → error → edit → pass) and the "same model, different harness" line. That's the beat that makes it click, and it's shown for only ~30 s with no number behind it.
- Every Short **lists parts** (tools, memory, context, subagents, permissions). None shows one task changing because of the harness. Lists cost #2 and #3 retention (both long and still; #3 has 0 cuts).
- None gives the viewer something to do in their own repo, and none has a mute-readable first frame.

## Winning archetype
_Concept · used by 3 of 3 winning Shorts and 2 of 3 long winners (one Tips/Trend, one Tutorial) · confirmed. Variant: the standard Concept sheet ("how X works"), not "X in 45 s": the viewer's real gap is the mechanism (guide → check → loop), which the 45 s definition variant can't show._

## Pace and length targets
_Winning Shorts: 79–176 s (median 175 s), 2.44–3.4 words/s (median 3.05), 0–10 cuts/min → our target: ~75–90 s at the house pace (2.3 w/s, `studio/templates/reel/pace.json`), so ~170–200 spoken words. Shorter than the winners: theirs pad with lists and a plug; ours shows one task._

## Gaps nobody covers
1. **Proof with a number.** "Same model, different harness" is said, never shown. LangChain's own published run (52.8% → 66.5%, same model, only the harness changed) [S5] is in no watched video.
2. **The failure first.** Nobody opens on the agent saying "Done" when it isn't, the most common failure LangChain and Anthropic report [S4, S5].
3. **Before and after: guides and checks.** Böckeler's two halves (steer before, check after; one without the other fails) [S3] are absent from every Short.
4. **The habit.** Hashimoto's "every mistake → fix it so it never happens again" [S1] — the one thing to do tomorrow — appears in no Short.
5. **A mute-readable first frame** and native 9:16: none has either.

## Our angle (one sentence)
One task the agent swears is "Done ✓" while its test is red: the same model, wrapped in a short map, a check that writes back and a loop, gets caught by the test, reads the error and fixes it — that wrapper is the harness, and LangChain's same-model jump shows it's worth building.

_Borrowed devices (not lines):_ asking the viewer's question early (#1); an "is it done?" check as the visual centre (#1); one coding task through the loop (#3); the equation as a building diagram (#2, #3) — rebuilt in house style on our own running object.
