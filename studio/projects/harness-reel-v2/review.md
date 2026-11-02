# Review · harness-reel-v2

_The fix list for this build. `tools/review.py <slug>` adds every ✗ from `out/qa.json`, `out/payoffs.json` and
`out/watch.json`; the reviewer adds what the sheets and the listen show, one finding per row with a timestamp.
`tools/run.sh <slug> deliver` refuses while any row is `open`. Status: open · fixed (<what changed>) · accepted (<why it is fine>)._

## Findings
| id | time | scene | finding | status |
|---|---|---|---|---|
| unclear:s02/posford | 8.2s | s02 | unclear word "Posford" (p=0.41): listen; respell or add to names if mispronounced | open |
| unclear:s05/test | 29.9s | s05 | unclear word "test" (p=0.05): listen; respell or add to names if mispronounced | open |
| unclear:s05/done | 32.5s | s05 | unclear word "done." (p=0.39): listen; respell or add to names if mispronounced | open |
| my:password | 8.2s | s02 | "password-reset" is heard as "Posford" / "postcard" by both Whisper runs (watch and qa audio = script): the voice may blur "password" | open (your ears: if it is mispronounced, a retake with `voice.respell` "password" → "pass-word") |
| my:done-s01 | 1.5–2.5s | s01 | the watch transcript drops "Done." from "Your coding agent says, Done." (a previous run scored it p=0.00): the hook's key word may be too soft | open (your ears) |
| my:length | 0–83.9s | all | the reel runs 83.9 s; the content plan's band is 45–75 s. The take reads at 1.94 w/s with the house maximum pauses; the voice and watch pace gates need those pauses, so only cutting words (and a retake) brings it under 75 s | open (your call: cut ~20 words and retake, or accept and add a "Long reel" reason to content-plan.md) |
| my:shop-pause | 46.0–47.5s | s07 | a sentence-length pause after "shop" ("Should you shop… for a better one?") was added so s07 passes the watch pace gate (3.19 → under 2.9): it may sound staged | open (your ears) |
| my:s07-empty | 42.8–48.5s | s07 | the lower third of the stage (y ~1150–1460) is empty under the YOUR AGENT TOOL ring for ~6 s | open (render fix rounds used up; fix idea: start the dashed scoreboard tracks in s07 instead of s08) |
| my:handoff-s01 | 6.8s | s01 | the frame-0 card's title is half covered for one 2 fps frame while it slides under the pinned band | accepted (≤ 0.3 s, mid-move; the card is whole again at 7.2 s) |
| my:recap-ghost | 81.2s | s15 | the "CHECKS → "DONE"" line enters at 1.6× and is clipped at the left edge for one frame | accepted (≤ 0.25 s entrance; payoffs reports 0 edge crops at every beat) |
| qa:sound-on-action | 55.6, 68.8, 75.4s | s09, s12, s14 | 3 reveals (s09/base, s12/plus, s14/aip) lost their cue to the density cap | accepted (each lands within 0.35 s of a neighbouring cue; the mix keeps ≤ 4 cues per 2 s) |
| qa:audio = script |  |  | audio = script: 94% match · differs: password→postcard; re reads→rereads; asks→ask; test→task just; in→and; fivefold→five fold; ai→a dot i | open |

## Watched
- [x] Watched end to end (every `out/watch/sheet-NN.png`, the transcript, the levels) · 2026-10-30 · all 7 sheets of the final render (job 220) read; transcript and levels read. Frames and a transcript, not listening
- [ ] Listened on a phone with sound · <date> (the user)
