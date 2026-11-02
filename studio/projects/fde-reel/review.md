# Review · fde-reel

_The fix list for this build. `tools/review.py <slug>` adds every ✗ from `out/qa.json`, `out/payoffs.json` and
`out/watch.json`; the reviewer adds what the sheets and the listen show, one finding per row with a timestamp.
`tools/run.sh <slug> deliver` refuses while any row is `open`. Status: open · fixed (<what changed>) · accepted (<why it is fine>)._

## Findings
| id | time | scene | finding | status |
|---|---|---|---|---|
| warn:still |  | still | still: 44.4% of the composition sits still in the stage band (target ≤ 10 %; qa measures the same on the MP4) | fixed (not in the 2026-10-30 run) |
| unclear:s05/writing | 27.1s | s05 | unclear word "writing" (p=0.30): listen; respell or add to names if mispronounced | open |
| unclear:s10/job | 53.7s | s10 | unclear word "Job" (p=0.34): listen; respell or add to names if mispronounced | open |
| unclear:s10/arose | 55.5s | s10 | unclear word "arose" (p=0.10): listen; respell or add to names if mispronounced | open |
| unclear:s10/1 | 56.1s | s10 | unclear word "1" (p=0.40): listen; respell or add to names if mispronounced | open |
| watch:scene pace |  |  | scene pace: over: s06 2.93, s15 3.18 | open |
| sheet:s11/caption | 58.2–61.8s | s11 | the caption reads "Up 13% percent." ("thirteen" became "13%" in the word timings, so "percent" shows twice) | fixed (added "thirteen percent" to the Whisper names prompt and re-split the same take, no new voice request; the caption now reads "Up thirteen percent." at 58.2–61.8 s, render job 175) |
| sheet:s10/open | 52.2–54.0s | s10 | the scene opens on an almost empty yellow frame (only the small "Claims assistant ✓" chip) for about 1.8 s before the job-post grid fills | fixed (dashed ghost job-post slots fill the zone on "care", the posts fill them on "posts"; 53.2 s now shows the full slot grid, only the 0.4 s wipe-in frame is sparse) |
| sheet:s12/open | 61.8–63.4s | s12 | about 1.6 s of near-empty light frame (dock chip + "IS IT FOR YOU?" typing) before the PALANTIR chip | fixed ("IS IT FOR YOU?" lands at 2× in the middle of the zone on "you" and parks as the header on "Palantir"; 62.8–63.2 s now show the big question) |
| sheet:s16/open | 85.0–86.6s | s16 | the recap opens on the small claims card at the top with the rest of the zone empty until FIND lands | fixed (the recap card enters at 1.35× centred in the zone on "job" and settles at the top as FIND lands; 85.8–86.2 s now show the large card) |
| sheet:s15/bubble | 83.8–84.2s | s15 | the yellow speech bubble lands touching the fifth tick tile of the TEST row | fixed (the bubble now leaves the app card, travels above the TEST row and drops beside it, landing ~40 px clear of the fifth tick; 83.8–84.2 s show no overlap) |
| sheet:s01/low | 0–3.7s | s01 | the lower third of the stage zone (under the card) is empty until the building outline draws on "Inside" | fixed (the hook card moved down to y 840–1240 and the outline/locks to y 1040–1445, so the card fills the lower third from frame 0; ~200 px under the card stays empty until "Inside" at 3.7 s) |
| owner:opening | 0–6.2s | s01 | owner note: the opening looked cluttered and easy to skip | fixed (frame 0 is now one idea: "Works in the demo." in 140 px over the working demo card with its DEMO ✓ stamp; the crack, the red strip, the locks and the red "Breaks in the company." each arrive on their own word; first-frame text updated in hooks.md / animation-plan.md / storyboard) |
| listen:palantir | 63.4s, 71.8s | s12, s13 | Whisper heard "Palantir" as "Polyntyr" without the names prompt: listen whether the voice says PAL-an-teer | open |

## Watched
- [x] Watched end to end (every `out/watch/sheet-NN.png`, the transcript, the levels) · 2026-10-30 (render job 175, all 8 sheets)
- [ ] Listened on a phone with sound · <date> (the user)
