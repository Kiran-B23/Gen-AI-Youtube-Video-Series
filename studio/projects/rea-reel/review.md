# Review · rea-reel

_The fix list for this build. `tools/review.py <slug>` adds every ✗ from `out/qa.json`, `out/payoffs.json` and
`out/watch.json`; the reviewer adds what the sheets and the listen show, one finding per row with a timestamp.
`tools/run.sh <slug> deliver` refuses while any row is `open`. Status: open · fixed (<what changed>) · accepted (<why it is fine>)._

## Findings
| id | time | scene | finding | status |
|---|---|---|---|---|
| qa:pace |  |  | pace: delivery 2.61 w/s (max 2.6, house 2.3) · scenes over 2.9: s04 3.35, s06 3.39, s07 3.07, s08 3.1, s09 3.9, s12 3.28, s14 3.59, s15 3.23, s16 4.51, s17 3.15, s18 3.63, s19 2.98, s20 3.96 | open |
| qa:scene openings |  |  | scene openings: blank opening: s03, s17 | open |
| qa:payoffs |  |  | payoffs: 67/77 beats on screen on their word · 0 caption overflow · 0 still scene(s) | open |
| beat:s03/show | 13.7s | s03 | "showcase" → show: no element with data-beat="s03/show" (add it in stage.html, or "check": "none") | open |
| beat:s06/hit | 34.1s | s06 | "Hit" → hit: no element with data-beat="s06/hit" (add it in stage.html, or "check": "none") | open |
| beat:s09/brick | 51.2s | s09 | "brick" → brick: no element with data-beat="s09/brick" (add it in stage.html, or "check": "none") | open |
| beat:s13/every | 74.9s | s13 | "Every" → every: no element with data-beat="s13/every" (add it in stage.html, or "check": "none") | open |
| beat:s13/scales | 77.2s | s13 | "scales" → scales: no element with data-beat="s13/scales" (add it in stage.html, or "check": "none") | open |
| beat:s14/same | 83.2s | s14 | "same" → same: no element with data-beat="s14/same" (add it in stage.html, or "check": "none") | open |
| beat:s18/lic | 100.7s | s18 | "licen" → lic: no element with data-beat="s18/lic" (add it in stage.html, or "check": "none") | open |
| beat:s18/laws | 101.6s | s18 | "laws" → laws: no element with data-beat="s18/laws" (add it in stage.html, or "check": "none") | open |
| beat:s18/rights | 104.8s | s18 | "rights" → rights: no element with data-beat="s18/rights" (add it in stage.html, or "check": "none") | open |
| beat:s20/what | 113.5s | s20 | "What" → what: no element with data-beat="s20/what" (add it in stage.html, or "check": "none") | open |
| warn:s02/funcs |  | s02 | s02/funcs: element reaches x 1013 in the lower-right button column | open |
| warn:s02/tests |  | s02 | s02/tests: element reaches x 1015 in the lower-right button column | open |
| warn:s05/evidence |  | s05 | s05/evidence: element reaches x 1015 in the lower-right button column | open |
| warn:s07/incomplete |  | s07 | s07/incomplete: element reaches x 982 in the lower-right button column | open |
| warn:s11/scale |  | s11 | s11/scale: element reaches x 958 in the lower-right button column | open |
| warn:s14/bytes |  | s14 | s14/bytes: element reaches x 1088 in the lower-right button column | open |
| warn:s14/original |  | s14 | s14/original: element reaches x 1089 in the lower-right button column | open |

## Watched
- [ ] Watched end to end (every `out/watch/sheet-NN.png`, the transcript, the levels) · <date>
- [ ] Listened on a phone with sound · <date> (the user)
