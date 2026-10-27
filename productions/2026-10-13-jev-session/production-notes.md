# Production notes · Jev session (v3)

_v2 (2026-10-13) applies an outside review: own cascade table + calibration buckets (two new notebook cells), Step 2 plants the question instead of giving the verdict, a 3-bullet agenda, question types taught when used, one-by-one reveal in Step 4. v1 is frozen in `versions/script-session-v1.md`._

_v3 (2026-10-13) applies `yt-comparison.md` §7: how to read the number (Step 2), why not just ask the chatbot (calibration, S18), the fixed-options trap + an `other_scam` option (Step 3, notebook), a JEE example and "you don't train it" (theory), a glance test (where to use it), the score as a weighted average (Step 3, S19), trims in Steps 5–7, and one growing pipeline diagram. v2 is frozen in `versions/script-session-v2.md`._

Everything that isn't spoken (rule W12). The presenter reads `script-session.md`; the editor and the notebook owner work from this file.

| | |
|---|---|
| Runtime | ~2,900 spoken words ≈ 19.5 min at 150 wpm + cell runs and the guess pause ≈ **19–19.5 min recorded** (re-time at the table read; cut plan below) |
| First demo | Step 1 starts ≈ 3:40 (~20% of the runtime: W2 ✔) |
| Notebook | `sessions/01-jev/option-B-scam-sms-test/notebook/jev_scam_detector.ipynb` (pinned `jev-1.13` vs `google/gemini-3.8-flash`) |
| Host | `XXXX`, one instructor to camera (no second character) |
| Recording date | state it in the description and on a lower third at 0:30 (C8) |

## Pronunciation and captions
- **Jev**: "jev" (rhymes with "rev"). **TypeSafe**: "type-safe". **Noul**: confirm with TypeSafe's docs or a demo video before recording; if unsure, say "a yes-or-no question" and show "Noul" on screen. **OpenRouter**: "open-router". **JSON**: "jay-son". **DRS**: "D-R-S".
- Upload corrected captions (C7): Jev, TypeSafe, Noul, OpenRouter, Gemini Flash, Hinglish, cybercrime.gov.in.

## Source map (sources are never on screen; they go in the description)
| Script line | Source |
|---|---|
| Hook "about a tenth of a second… independent tests clocked on its servers" | S3 |
| Hook "zero hallucinations", "pricing doesn't charge you for the answers" (their claims) | S8, S2 (check TypeSafe's own pricing page says output is free before recording) |
| "doesn't write text back, it returns numbers"; System One | S1, S14 |
| The three question types | S12 |
| Step 3 "barely changed the response time" | S13 |
| Step 4 "docs list English as its main language" | S14 |
| Step 5 "444 times cheaper… doesn't say than what" | S10 |
| Step 5 "nearly eight thousand… forty-four times less… fourteen of fifteen tasks" | S5 |
| Step 6 "swapping which description sat behind yes and no… about a third" | S7 |
| Calibration "trains Jev for… 0.8 → about 80%" | S11 |
| Calibration "better calibrated than sixteen of nineteen LLMs; three frontier models did better" | S5 |
| Step 7 "quarter to half of its cost" | S5 |
| Step 8 "can't defend against messages written to fool it" | S14 |
| Fits / doesn't fit | S14 |
| Outro 1930 / cybercrime.gov.in | S17 |
| Intro "this whole session costs well under a dollar" | S16 (the notebook run) |
| Every ⟦slot⟧ | S16 (our run) |

## Promise ledger (W6: every promise maps to a delivery)
| Promise (where) | Delivered in |
|---|---|
| "test both claims" (hook) | Claim 2 verdict in Step 5; claim 1 verdict in Step 6; both restated in the Verdict |
| "one of them only half survives" (hook, the open loop) | Step 6 "That's the claim that only half survives" |
| "you'll have built a scam checker that asks a bigger AI when unsure" (intro) | Step 8 app |
| "a quick look at what kind of AI doesn't write text" | "An AI That Doesn't Write?" |
| "swap a chatbot for Jev, try to fool it, and race it on a hundred messages" | Steps 2–5 |
| "catch it being wrong, fix it with three lines of code, and give our verdict" | Step 6, calibration, Step 7, "The Verdict" |
| "Hold that thought" (Step 2 plant) | Step 6 "remember the thought I asked you to hold?" |
| "Remember this message" (Step 4 plant) | Step 6 opening |

**Back-reference check (W7):** "that same independent study" (calibration, Step 7) comes after Step 5 introduces it ✔. "that message from the five tricky ones" comes after Step 4 ✔; "the thought I asked you to hold" comes after Step 2 ✔. "jev dot system one" comes after System One is taught ✔. No references to other videos (W9) ✔.

## Visual cues (face + screen, a change every 5–10 s)
| Section | On screen |
|---|---|
| Hook | The SMS full-screen on a phone (number masked); "9:30 PM" and "disconnected" highlight; a timer chip "~0.1 s" on "tenth of a second"; the two claims as giant quoted cards; a half-cracked stamp on "only half survives" |
| Intro | A 10-s preview of the finished Gradio app deciding the SMS (C1); the full chapter list on screen while the 3-bullet agenda is spoken; lower third with the recording date |
| An AI That Doesn't Write? | Three app-decision chips; chatbot paragraph vs a single float side by side; essay sheet vs OMR sheet; a quick gut-call vs slow-thinking split (the question cards now appear in Steps 2–3) |
| Steps 1–8 | Screen recording of the notebook; zoom on the changed lines; the specific visuals below |
| Calibration | A 10-bar "days it said 80%" chart with 8 filled; then the Step 6 reveal message beside it |
| Step 7 | A number line with three coloured zones (flag ≥ 0.90 · chatbot decides · let through ≤ 0.10); DRS band graphic (flag / chatbot decides / let through) over the slider; the band table updating from 0.90 to 0.99 |
| Where to use it | Two columns, Fits / Doesn't fit, items appearing on the word |
| Verdict | The two claims with stamps: HALF TRUE · TRUE (FOR OUTPUT); then "Jev decides → LLM explains" |
| Outro | Recap list; comment prompt; 1930 + cybercrime.gov.in lower third |

**One growing pipeline diagram (v3):** SMS → questions → numbers → threshold → backup LLM. Build it piece by piece and reuse it in the theory (SMS + numbers), Step 2 (one question), Step 3 (three questions), Step 7 (threshold + backup) and the Verdict (the full picture, "Jev decides → LLM explains").

Generic icons only: no TypeSafe, OpenRouter, Google or OpenAI logos. Mock UIs say "illustrative".

## Hands-on beat sheet (W1)
Mark: 🧑‍🏫 Teach (read the lines) · ▶️ Just run (talk about the result only).

| Step | Cell | On screen | Expected output | If it fails |
|---|---|---|---|---|
| Setup (off camera) | ▶️ install + key | Done before recording (C2); show the finished cell only | "Ready" | Re-run; key in Colab Secrets as `OPENROUTER_API_KEY` |
| 1 Old way | 🧑‍🏫 `ask_llm(...)` + `json.loads` | The raw reply, then parsed or 💥 | Either branch | Both branches are scripted |
| 2 Swap | 🧑‍🏫 2 lines: `TypeSafeClient(...)`, `jev.system_one(...)` | Highlight the 2 lines; the float | ~0.9x | 401 → key; 429 → wait 10 s, re-run |
| 3 Three questions | ▶️ `QUESTIONS` cell | Zoom on the `criteria` line "even if it mentions OTPs…" | Scam p, type, pressure | — |
| 4 Fool it | ▶️ `TRICKY` loop | Guess card with a 5-s countdown; then reveal the answers **one at a time**, each with Jev's number; "Comment your score" card | 5 probabilities | Use the branch that matches |
| 5 Race | ▶️ `race(...)` + `scoreboard(results)` | Two lanes with a real timer and a bill counter; speed up the footage, never the timer | Speed / cost / accuracy tables | 429 → `race(..., concurrency=5)`; API down → `load_saved_results()` and say "from my earlier run" |
| 6 Catching it wrong | ▶️ `confident_mistakes(results)` | The Step 4 message first, then the list | every mistake, sure ones ticked (N_all; N_sure = ✓ rows) | Scripted branches: the Step 4 message (wrong / right) and the race mistakes (some above 0.9 / none); read only what happened |
| Calibration | ▶️ `calibration_buckets(results)` (new cell) | Weather chart, then our three buckets as bars | right % per bucket | Small buckets: read the "they don't" branch |
| 7 Fix | 🧑‍🏫 `verdict()` 3 lines + slider | Drag 0.90 → 0.99 on camera | Band table changes | — |
| 7b Did the backup pay off? | ▶️ `cascade_report(results, threshold)` (new cell) | Three-column table: chatbot alone / Jev alone / Jev + backup; this is the thumbnail moment | accuracy, cost per 1,000, time | No new API calls; move the slider back to 0.90 first |
| 8 App | ▶️ `make_checker` + `launch_app` | The SMS, then one tricky message | Verdict + explanation for unsure | Share link fails → run inline |

**Taught lines:** ~12 (Steps 1, 2, 7). Everything else is ▶️ (P11).

## Slots to fill after the dry run (S16)
Step 5: confirm how the 100 messages were written (by hand, or with AI help) and read the matching words · Calibration bucket % (X/Y/Z) · Step 7 cascade table · Intro total session cost (check "well under a dollar" against the real bill) · Step 2 probability · Step 3 three answers · Step 4 five probabilities + which branch · Step 5 Jev/chatbot time, cost per 1,000 ($ and ₹ at the day's rate), multiplier, scams caught, false alarms, which branch · Step 6 N · Step 7 a/b/c at 0.90 and 0.99 · Step 8 two results · Verdict cost per 1,000.
Step 5 claim-2 line: check the OpenRouter activity page shows no output charge for Jev; if it can't, say "TypeSafe's pricing says the answers aren't billed" and drop "That part holds".
**Stop rule:** if Jev makes zero mistakes in the race, stop. Don't record. Re-plan Steps 6–7 with the content-plan agent (the Step 6 payoff and the Step 7 trade need at least one mistake).
Branch notes: if Step 6 has ⟦N⟧ = 1, read "Look at this one. Jev got it wrong, and it was more than ninety percent sure." "Least confident" = closest to 0.5; when Jev leaned genuine, say it as percent sure it was *genuine* (0.30 → "70 percent sure it was genuine").
Presenter reading rules for Step 6–7 (script review, 4th pass):
- "Above 0.9" = the notebook's "sure of itself" count: p ≥ 0.90 **or** p ≤ 0.10. A scam let through at 0.04 is a confident mistake ("96 percent sure it was genuine"); exactly 0.90 → "ninety percent sure or more".
- Two different counts: **N_sure** (the "some above 0.9" branch) and **N_all** (the "none above 0.9" branch).
- If N_all = 1: claim 1 → "a perfectly valid, wrong answer."
- Step 6 reveal, wrong branch: use percent-genuine when Jev leaned genuine (0.20 → "Jev got it wrong. It was 80 percent sure it was genuine.").
Step 3: read the Score as the decimal it returns (e.g. 2.6) and fill "close to ⟦label⟧" with the nearest level (0 none · 1 mild deadline · 2 strong urgency · 3 threats).
Step 7b: move the slider back to 0.90 before running `cascade_report`.
Step 4 edit: the `TRICKY` cell prints all five numbers at once; keep them off screen during the guess pause and reveal one per answer in the edit.
Step 1: if the chatbot replied with bare JSON only, read "Either way, look how long that took. We'll see what it costs in the race."
Calibration: drop an empty group's clause from the bucket line; if only one group has messages, skip the "go up / don't" sentence.
Step 7 numbers from `band_report`: a = 100 − "sent for a second opinion" · b = "scams waved through" + "genuine flagged" · c = "sent for a second opinion". The merged slider line: k = c(0.99) − c(0.90); m = b(0.90) − b(0.99), read "none" if 0.
Step 6, N_all = 1: "But it still got one wrong. Here's how sure it was." (the table lists every mistake, with a "sure of itself?" tick).
Step 7 cascade branches: check the cost row before saying "a fraction of its cost"; the backup is only cheaper if most messages stay with Jev.
Step 7, if k = 0: "At 0.99, nothing changed: every message Jev decided was already ninety-nine percent sure."
Step 3 dry-run check: confirm `a.scores["pressure"].score` is on the 0–3 level scale (not the normalised 0–1); if it lands on a whole level, read "So it's ⟦strong urgency⟧".
Rules: always "in our run of 100 messages"; a gap of 2–3 messages is noise; never round in Jev's favour.

## Cut plan (if the recording runs long)
1. Step 8 to two sentences (keep the safety line). 2. "So Where…" to the four-condition rule + one "doesn't fit" sentence. 3. The "three frontier models" sentence in the calibration chapter.
**Never cut:** the Step 4 plant, the Step 6 payoff, Step 7, any claim attribution ("TypeSafe says", "independent", "in our run").

## Before recording
- [ ] Dry run on the pinned notebook this week; fill every ⟦slot⟧; delete the branches that didn't happen
- [ ] Confirm the Noul pronunciation
- [ ] Rupee rate of the day for the cost lines
- [ ] Table read with the presenter (W11)
- [ ] Description: sources S2–S17, the notebook link, setup doc, recording date, Laya model card under "Going further"
