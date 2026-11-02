# Review · mcp-reel

_The fix list for this build. `tools/review.py <slug>` adds every ✗ from `out/qa.json`, `out/payoffs.json` and
`out/watch.json`; the reviewer adds what the sheets and the listen show, one finding per row with a timestamp.
`tools/run.sh <slug> deliver` refuses while any row is `open`. Status: open · fixed (<what changed>) · accepted (<why it is fine>)._

## Findings
| id | time | scene | finding | status |
|---|---|---|---|---|
| qa:pace |  |  | pace: delivery 2.61 w/s (max 2.6, house 2.3) · scenes over 2.9: s01 3.47, s03 2.93, s08 3.12, s09 4.01, s12 3.38, s13 3.26, s14 3.5, s16 2.94, s19 3.3, s20 4.07, s21 3.13, s24 4.02 | open |
| qa:payoffs |  |  | payoffs: 62/78 beats on screen on their word · 0 caption overflow · 0 still scene(s) · 0 edge crop(s) · hook frame 54% (need ≥ 45%) | open |
| qa:music bed |  |  | music bed: bed 9.2 dB under the speech in the gaps (10-26) | open |
| beat:s02/tokyo | 8.6s | s02 | "Tokyo" → tokyo: no element with data-beat="s02/tokyo" (add it in stage.html, or "check": "none") | open |
| beat:s03/own | 10.5s | s03 | "own" → own: no element with data-beat="s03/own" (add it in stage.html, or "check": "none") | open |
| beat:s06/model | 30.9s | s06 | "model" → model: no element with data-beat="s06/model" (add it in stage.html, or "check": "none") | open |
| beat:s07/menu | 38.1s | s07 | "menu" → menu: not visible at 38.63s: opacity 0.78 | open |
| beat:s07/do | 41.3s | s07 | "do" → do: not visible at 41.77s: opacity 0.00 | open |
| beat:s10/note | 56.7s | s10 | "note" → note: not visible at 57.23s: opacity 0.78 | open |
| beat:s11/tokyo | 65.4s | s11 | "Tokyo" → tokyo: no element with data-beat="s11/tokyo" (add it in stage.html, or "check": "none") | open |
| beat:s12/call | 68.5s | s12 | "call" → call: not visible at 69.02s: opacity 0.78 | open |
| beat:s14/answers | 79.0s | s14 | "answers" → answers: not visible at 79.47s: opacity 0.00 | open |
| beat:s14/umbrella | 81.0s | s14 | "umbrella" → umbrella: no element with data-beat="s14/umbrella" (add it in stage.html, or "check": "none") | open |
| beat:s15/std | 83.0s | s15 | "standard" → std: no element with data-beat="s15/std" (add it in stage.html, or "check": "none") | open |
| beat:s18/catch | 105.1s | s18 | "catch" → catch: no element with data-beat="s18/catch" (add it in stage.html, or "check": "none") | open |
| beat:s19/bad | 108.3s | s19 | "bad" → bad: no element with data-beat="s19/bad" (add it in stage.html, or "check": "none") | open |
| beat:s19/hide | 109.2s | s19 | "hide" → hide: not visible at 109.68s: empty | open |
| beat:s22/never | 122.4s | s22 | "never" → never: no element with data-beat="s22/never" (add it in stage.html, or "check": "none") | open |
| beat:s24/q | 130.2s | s24 | "What" → q: no element with data-beat="s24/q" (add it in stage.html, or "check": "none") | open |
| warn:s07/asks |  | s07 | s07/asks: element reaches x 952 in the lower-right button column | open |
| warn:s08/tools |  | s08 | s08/tools: element reaches x 952 in the lower-right button column | open |
| warn:s08/desc |  | s08 | s08/desc: element reaches x 980 in the lower-right button column | open |
| warn:s12/server |  | s12 | s12/server: element reaches x 1008 in the lower-right button column | open |
| warn:s24/tell |  | s24 | s24/tell: element reaches x 977 in the lower-right button column | open |
| unclear:s01/so | 2.4s | s01 | unclear word "so" (p=0.06): listen; respell or add to names if mispronounced | open |
| unclear:s06/the | 28.8s | s06 | unclear word "the" (p=0.14): listen; respell or add to names if mispronounced | open |
| unclear:s07/what | 40.8s | s07 | unclear word "what" (p=0.09): listen; respell or add to names if mispronounced | open |
| unclear:s09/step | 55.4s | s09 | unclear word "Step" (p=0.50): listen; respell or add to names if mispronounced | open |
| unclear:s11/get | 64.5s | s11 | unclear word "Get" (p=0.39): listen; respell or add to names if mispronounced | open |
| unclear:s17/anthropic | 95.1s | s17 | unclear word "Anthropic" (p=0.43): listen; respell or add to names if mispronounced | open |
| unclear:s22/approve | 123.2s | s22 | unclear word "approve" (p=0.48): listen; respell or add to names if mispronounced | open |
| unclear:s23/note | 126.0s | s23 | unclear word "note," (p=0.40): listen; respell or add to names if mispronounced | open |
| watch:scene pace |  |  | scene pace: over: s01 3.44, s03 3.12, s07 3.07, s08 3.12, s09 3.23, s12 3.57, s13 3.33, s14 2.97, s16 3.07, s19 3.36, s20 4.24, s21 3.16, s24 4.26 | open |

## Watched
- [ ] Watched end to end (every `out/watch/sheet-NN.png`, the transcript, the levels) · <date>
- [ ] Listened on a phone with sound · <date> (the user)
