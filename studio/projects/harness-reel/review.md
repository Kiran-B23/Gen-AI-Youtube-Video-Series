# Review · harness-reel

_The fix list for this build. `tools/review.py <slug>` adds every ✗ from `out/qa.json`, `out/payoffs.json` and
`out/watch.json`; the reviewer adds what the sheets and the listen show, one finding per row with a timestamp.
`tools/run.sh <slug> deliver` refuses while any row is `open`. Status: open · fixed (<what changed>) · accepted (<why it is fine>)._

## Findings
| id | time | scene | finding | status |
|---|---|---|---|---|
| qa:audio = script | 33.9s | s07 | audio = script: 94% match · differs: passwordreset→password reset; dot m d→; →and; error→air or; goes→to go; →all; an→and; fiftytwo point 8 percent→528; sixt | fixed (not in the 2026-10-29 run) |
| warn:s09/tc |  | s09 | s09/tc: element bottom 1566 is below the stage zone (1460) | accepted (the CHECKS panel is a full-zone section-colour backdrop; it overhangs only while s10's 1.1 push starts as it fades; its text sits at y 620–900; watch sheet 4 @ 44–45 s shows nothing clipped or under the captions) |
| my:voice-dmd | 36.0–37.2s | s07 | the voice dropped "dot M D" (take 1) | fixed (retake job 59 with `voice.respell` "dot M D" → "dot, em, dee" (TTS only; captions keep the script); Whisper now hears all 14 s07 words (0 % guessed) and transcribes "agents .md"; qa audio = script 96 % ✓. **Listen:** does "agents dot em dee" sound like a file name?) |
| my:retake-bug | — | — | engine: `RETAKE=1` ignored when every scene had a clip | fixed (owner, voice.py; job 59 asked Gemini for a new take) |
| my:numbers | 74–88s | s14–s16 | the 4 % left of audio = script is Whisper spelling (52.8 / 66.5 as digits, "role" for "rule" at 45.7 s, "Which" for "What" at 110.2 s, "Lang chain") | open (your ears: is it "rule" at 45.7 s and "What" at 110.2 s? and LangChain's pronunciation at 74 s) |
| my:hook-frame | 0–8s | s01 | hook card grown (x 90–950, title + code above a smaller DONE stamp, title readable); red row + agent log fill the frame to y ~1165 from frame 0; the log types the DONE claim and the failing test; the test strikes the DONE on "isn't" | fixed (render 2026-10-29, sheet 1) |
| my:wipe-blanks | 8.2, 30.2, 91.2s · 20.8, 39.2, 48.8, 71.8s | s01→s02, s06→s07, s16→s17 · s05, s08, s09, s14 | stage now sits above the engine wipe (the colour sweeps behind the running object); section panels clip in/out instead of fading over the workbench; MODEL pill grows in place (no longer rises through NEVER RAN); manual card replaces the 40-page stack; proof exits before the s17 wipe; the workbench shrinks into the proof copy at s14 | fixed, one remainder accepted: at 30.2 s the GUIDES panel (a full-zone yellow title card) is mid-wipe for one 2 fps frame, it is the section card, not an empty frame |
| my:still | — | — | still share 51.5 % → 43.4 % (qa on the MP4; payoffs 42.4 %). Purposeful motion added on the running object: agent log types every claim/check, strike on DONE, manual card in/✗/out, hook box comes out to be read, two DONE→test scans, error routes back, pass sweep, 89-task grids fill with the counts, 6 attention camera moves | open (owner's call: 20 % would need continuous motion on every held beat; what remains still is reading time on dense frames, e.g. s07 filename, s18 verdict) |
| my:transient-crop | 15.8s | s03 | the DONE stamp is cut at the right edge for ~0.3 s while the camera returns home on "stops" | accepted (mid-move, < 0.5 s; payoffs reports 0 edge crops at every beat) |
| my:check-step | — | — | `run.sh check` silent on the app queue | fixed (owner; check passed on the queue: jobs 64, 67, 73, contrast 48/48) |
| my:passed | — | — | fixed this build: kit `.hl` uppercased the fixed code line (class renamed `h-clhl`); recap opened blank (r1 now on screen at the scene start); static s07/s08/s10 (slots breathe); MODEL ring pre-rendered from frame 0; hook stamp/title; 52.8 % / 66.5 % spacing; recap mini overlap; SVG beats invisible to payoffs (now HTML) | fixed |
| warn:s03 |  | s03 | s03: 2 camera moves closer than 2.5 s ("re-reads" push, then home on "stops") | accepted (the push lands on the code scan and returns as the DONE stamp lands; both moves have a target; ~2 s apart after the retake) |
| unclear:s01/done | 2.2s | s01 | unclear word "done." (p=0.04): listen; respell or add to names if mispronounced | open |
| unclear:s09/role | 45.7s | s09 | unclear word "role." (p=0.49): listen; respell or add to names if mispronounced | open |
| unclear:s14/chain | 74.1s | s14 | unclear word "chain" (p=0.34): listen; respell or add to names if mispronounced | open |
| unclear:s18/checks | 100.4s | s18 | unclear word "checks" (p=0.38): listen; respell or add to names if mispronounced | open |
| unclear:s19/every | 107.0s | s19 | unclear word "Every" (p=0.10): listen; respell or add to names if mispronounced | fixed (heard clearly in the 2026-10-29 run) |
| warn:still |  | still | still: 42.4% of the composition sits still in the stage band (target ≤ 10 %; qa measures the same on the MP4) | accepted (same as my:still; the owner decides) |
| warn:s10/fire |  | s10 | s10/fire: element reaches x 1000 in the lower-right button column | accepted (the zoomed hook box extends to x 1000 for ~0.4 s while it returns to its slot; no text there) |
| warn:s11/err |  | s11 | s11/err: element reaches x 975 in the lower-right button column | accepted (agent log text box right edge at x 975; the text itself ends before x 900) |
| warn:s11/hint |  | s11 | s11/hint: element reaches x 975 in the lower-right button column | accepted (same as s11/err) |
| warn:s12/ok |  | s12 | s12/ok: element reaches x 973 in the lower-right button column | accepted (the ✓ chip right edge at x 973 under the s12 push; nothing clipped (0 edge crops)) |
| qa:loudness |  |  | loudness: -15.6 LUFS (−14 ±1) | open (engine: the agent sandbox can't edit studio/tools or the renderer) |
| owner:opening-clutter | 0–8s | s01 | owner: "The opening scene is looking cluttered and all the text is directly presented in the scene" | fixed (frame 0 is now only the task card title + a big DONE stamp; the code lines and the agent log are gone from the hook; the red "1 test failing" row slides in on "test", the strike on "isn't", the dashed slot on "fix", the MODEL pill + "smarter?" on "smarter"; the stamp inks green on "Done"; the agent log first appears in s02. Seen on render job 124, sheet 1) |
| unclear:s17/becomes | 93.3s | s17 | unclear word "becomes" (p=0.46): listen; respell or add to names if mispronounced | open |
| qa:payoffs |  |  | payoffs: 90/90 beats on screen on their word · 0 caption overflow · 0 still scene(s) · 0 edge crop(s) · hook frame 27% (need ≥ 45%) | open |
| still:hook | 1.5s | s01 | hook frame fills 27% of the stage band (need ≥ 45%): the hook question large at the top, the running object acting under it | open |

## Watched
- [x] Watched end to end (every `out/watch/sheet-NN.png`, the transcript, the levels) · 2026-10-29 · all 10 sheets of the final render (job 124) read; transcript and levels read. Frames and a transcript, not listening
- [ ] Listened on a phone with sound · <date> (the user)
