# Review · langgraph-reel

_The fix list for this build. `tools/review.py <slug>` adds every ✗ from `out/qa.json`, `out/payoffs.json` and
`out/watch.json`; the reviewer adds what the sheets and the listen show, one finding per row with a timestamp.
`tools/run.sh <slug> deliver` refuses while any row is `open`. Status: open · fixed (<what changed>) · accepted (<why it is fine>)._

## Findings
| id | time | scene | finding | status |
|---|---|---|---|---|
| qa:pace |  |  | pace: delivery 2.64 w/s (max 2.6, house 2.3) · scenes over 2.9: s03 3.08, s08 3.14, s10 3.18, s12 3.14, s13 3.64, s14 3.85, s15 3.17, s17 3.06, s18 3.25, s19 2.91, s20 3.2, s21 4.17, s22 3.33, s23 3.33, s24 3.72, s26 4.0 | open |
| qa:audio = script |  |  | audio = script: 98% match · differs: card→car; edge→ad; checkpointer→check pointer; approve→approved; s→; approval→approved fault; node→note; ok→okay | open |
| qa:payoffs |  |  | payoffs: 77/95 beats on screen on their word · 0 caption overflow · 0 still scene(s) · 0 edge crop(s) · hook frame 60% (need ≥ 45%) | open |
| qa:music bed |  |  | music bed: bed 9.6 dB under the speech in the gaps (10-26) | open |
| beat:s02/email | 5.8s | s02 | "email" → email: no element with data-beat="s02/email" (add it in stage.html, or "check": "none") | open |
| beat:s05/graph | 28.8s | s05 | "graph" → graph: no element with data-beat="s05/graph" (add it in stage.html, or "check": "none") | open |
| beat:s05/stop | 30.8s | s05 | "stop" → stop: not visible at 31.32s: opacity 0.35 | open |
| beat:s06/edges | 35.1s | s06 | "edges" → edges: not visible at 35.64s: zero size | open |
| beat:s06/checkpoints | 35.8s | s06 | "checkpoints" → checkpoints: no element with data-beat="s06/checkpoints" (add it in stage.html, or "check": "none") | open |
| beat:s11/edges | 60.6s | s11 | "Edges" → edges: not visible at 61.11s: zero size | open |
| beat:s12/path | 68.6s | s12 | "path" → path: no element with data-beat="s12/path" (add it in stage.html, or "check": "none") | open |
| beat:s13/loop | 70.5s | s13 | "loop" → loop: not visible at 70.98s: empty | open |
| beat:s13/check | 71.6s | s13 | "check" → check: no element with data-beat="s13/check" (add it in stage.html, or "check": "none") | open |
| beat:s15/every | 81.1s | s15 | "every" → every: no element with data-beat="s15/every" (add it in stage.html, or "check": "none") | open |
| beat:s15/saves | 82.0s | s15 | "saves" → saves: no element with data-beat="s15/saves" (add it in stage.html, or "check": "none") | open |
| beat:s19/refund | 100.0s | s19 | "refund" → refund: no element with data-beat="s19/refund" (add it in stage.html, or "check": "none") | open |
| beat:s20/catch | 104.0s | s20 | "catch" → catch: no element with data-beat="s20/catch" (add it in stage.html, or "check": "none") | open |
| beat:s21/before | 109.5s | s21 | "before" → before: no element with data-beat="s21/before" (add it in stage.html, or "check": "none") | open |
| beat:s24/loops | 124.9s | s24 | "loops" → loops: no element with data-beat="s24/loops" (add it in stage.html, or "check": "none") | open |
| beat:s24/approval | 125.3s | s24 | "approval" → approval: no element with data-beat="s24/approval" (add it in stage.html, or "check": "none") | open |
| beat:s25/every | 131.6s | s25 | "every" → every: no element with data-beat="s25/every" (add it in stage.html, or "check": "none") | open |
| beat:s26/what | 134.3s | s26 | "What" → what: no element with data-beat="s26/what" (add it in stage.html, or "check": "none") | open |
| warn:s04/yourself |  | s04 | s04/yourself: element reaches x 1019 in the lower-right button column | open |
| warn:s07/one |  | s07 | s07/one: element bottom 1920 is below the stage zone (1460) | open |
| warn:s10/reads |  | s10 | s10/reads: element reaches x 1011 in the lower-right button column | open |
| warn:s10/only |  | s10 | s10/only: element reaches x 978 in the lower-right button column | open |
| warn:s10/part |  | s10 | s10/part: element reaches x 977 in the lower-right button column | open |
| warn:s11/two |  | s11 | s11/two: element bottom 1920 is below the stage zone (1460) | open |
| warn:s12/reads |  | s12 | s12/reads: element reaches x 972 in the lower-right button column | open |
| warn:s14/fixed |  | s14 | s14/fixed: element reaches x 977 in the lower-right button column | open |
| warn:s15/three |  | s15 | s15/three: element bottom 1920 is below the stage zone (1460) | open |
| warn:s18/resumes |  | s18 | s18/resumes: element bottom 1933 is below the stage zone (1460) | open |
| warn:s22/own |  | s22 | s22/own: element reaches x 1016 in the lower-right button column | open |
| warn:s24/branches |  | s24 | s24/branches: element reaches x 973 in the lower-right button column | open |
| unclear:s05/langgraph | 25.1s | s05 | unclear word "Langgraph" (p=0.42): listen; respell or add to names if mispronounced | open |
| unclear:s11/two | 60.0s | s11 | unclear word "two," (p=0.48): listen; respell or add to names if mispronounced | open |
| unclear:s12/edge | 64.6s | s12 | unclear word "edge" (p=0.40): listen; respell or add to names if mispronounced | open |
| unclear:s15/check | 80.0s | s15 | unclear word "check" (p=0.40): listen; respell or add to names if mispronounced | open |
| unclear:s16/and | 87.3s | s16 | unclear word "And" (p=0.06): listen; respell or add to names if mispronounced | open |
| unclear:s17/thread | 91.2s | s17 | unclear word "thread" (p=0.44): listen; respell or add to names if mispronounced | open |
| unclear:s22/node | 115.2s | s22 | unclear word "node." (p=0.19): listen; respell or add to names if mispronounced | open |
| unclear:s23/chain | 117.5s | s23 | unclear word "chain" (p=0.28): listen; respell or add to names if mispronounced | open |
| watch:delivery pace |  |  | delivery pace: 2.65 w/s heard (max 2.6): add pauses or cut words, never speed-change the voice | open |
| watch:scene pace |  |  | scene pace: over: s02 3.02, s03 3.39, s05 3.1, s08 3.24, s10 3.62, s12 3.28, s13 3.96, s14 3.99, s15 3.64, s16 2.95, s17 3.57, s18 3.57, s19 3.28, s20 3.54, s21 4.24, s22 3.65, s23 4.04, s24 4.0, s25 3.23, s26 4.71 | open |

## Watched
- [ ] Watched end to end (every `out/watch/sheet-NN.png`, the transcript, the levels) · <date>
- [ ] Listened on a phone with sound · <date> (the user)
