# Production Notes: Option B, The Scam-SMS Test (V3.1)

Everything the presenter and editor need that isn't spoken. The spoken words are in `script.md` (house script format, with the hands-on narration under `<<HANDS-ON>>`); teaching flow and sources are in `TR-doc.md`; the notebook is `notebook/jev_scam_detector.ipynb`. Written to the rules in `../../../guidelines/script-vs-video-analysis.md`.

**Format:** face + screen · target 15–17 min · ~15 taught lines of code · standalone. **Record this week, straight after the dry run.**

## Runtime (measured at ~150 words per minute)

| Section | Words | ≈ Time |
|---|---|---|
| Hook | 102 | 0:40 |
| Intro | 180 | 1:10 |
| Why everyone is talking about Jev | 184 | 1:15 |
| It's not a chatbot | 271 | 1:50 |
| Jev vs LLMs: rivals or teammates? | 80 | 0:30 |
| **Hands-on** (steps 1–7) | 987 | 6:45 |
| Where you'd actually use this | 89 | 0:35 |
| The free rival | 96 | 0:40 |
| The verdict | 100 | 0:40 |
| Outro | 147 | 1:00 |
| **Total speech** | **2,236** | **≈ 15:00** |

Add about 1–2 minutes for the "pause and guess" beat, cell runs and the race, which gives **~16–17 min**. If it runs long, use the cut plan.

## Promise ledger

| Promise | Made in | Paid off in |
|---|---|---|
| "Is it a scam?" (the opening SMS) | Hook | Hands-on Step 2 (Jev's number) |
| "We tested both claims" | Hook | Claim 1 → Steps 2, 4, 6 · Claim 2 → Step 5 |
| "One of them doesn't survive" | Hook | **Planted** in Step 4 ("remember this one"), **paid off** in Step 6 |
| "Polite scams, Hinglish, fake OTPs" | Hook | Step 4 |
| "A hundred messages, and a stopwatch" | Hook | Step 5 |
| "Fix the problem in three lines" | Intro | Step 7 |
| "Let's see if the hype is real" | Hook | The verdict |

## Hands-on beat sheet

This matches the narration under `<<HANDS-ON>>` in `script.md`.

| Step | Notebook cell | On screen | Expected output | If it fails |
|---|---|---|---|---|
| — | ▶️ Setup | Colab; cut the wait | `✅ Key loaded` | `❌ No key found` → re-add `OPENROUTER_API_KEY` in Secrets and switch on notebook access |
| 1 Old way | 🧑‍🏫 "First, the old way" | Zoom on `repr(reply)`, then the `json.loads` line | Raw reply, then `Parsed:` or `💥 json.loads crashed` | 401 → wrong key |
| 2 The swap | 🧑‍🏫 "The swap: two lines" | Text "THE SWAP"; highlight each line; circle the number (ding SFX) | One float, e.g. 0.9x | 402 → add credit · 404 → check the model name on OpenRouter's Jev page |
| 3 Ask more | ▶️ "Ask more" | Output line; highlight *"even if it mentions OTPs, money or deadlines"* | `Scam: … \| Type: … \| Pressure: … / 3` | 422 → a typo in the questions |
| 4 Fool it | 🧑‍🏫 "Try to make it lie" | "PAUSE & GUESS" card; each message for ~2 s; each number revealed with a tick SFX | Five probabilities | Any result is fine; use the matching "remember this one" line |
| 5 Race | ▶️ `race(...)` + `scoreboard(results)` | Two lanes with a **real-time timer** and a **bill counter**; speed up the footage, not the timer; cash-register SFX on the cost row | Speed/cost table, then the accuracy table | 429 → `race(..., concurrency=5)` · API down → `results = load_saved_results()` and say "from my earlier run" |
| 6 Wrong and sure | ▶️ `confident_mistakes(results)` | Darker grade, low music; show the flagged message first; the fine-print quotes with sources; big text "A format guarantee is not a truth guarantee" | "Wrong on X… SURE on Y" + rows | If Y = 0 → call the chapter "Where it slipped" and use the closest-to-0.5 message |
| 7 The fix | 🧑‍🏫 slider cell + `band_report` | DRS graphic; **highlight exactly 3 lines** (the two `if` lines and the last `return`); drag 0.90 → 0.99 and re-run (whoosh SFX); lower third "Learning project, not a safety guarantee · 1930 / cybercrime.gov.in" | Band table; after the drag, fewer confident mistakes and more ⚠️ | — |

## Other visuals

| Section | On screen |
|---|---|
| Hook | Phone with the electricity SMS → Jev card appears instantly → split "Can't hallucinate" / "Answers are free" (record-scratch SFX) → quick cuts: Hinglish scam, fake OTP, race timer → face cam |
| Why everyone is talking | Montage: HN counter to ~2,000, platform logos, "Sep 20 open → Sep 22 paused", "$40M seed", "≈ $0.04 per 1,000 decisions" |
| Not a chatbot | Essay-robot vs OMR-robot animation; three question cards; the comparison table |
| Jev vs LLMs | Title card "RIVALS OR TEAMMATES?" → answer "TEAMMATES" |
| Useful | Four idea cards, each tagged vendor or independent |
| Rival | Laya's Hugging Face page; "63 vs 30" card |
| Verdict | Stamps: HALF TRUE · TRUE (fine print) · FOR THE RIGHT JOB |
| Outro | End card; pinned comment with the **Google Form** link plus 1930 / cybercrime.gov.in |

## Checks before recording

- **Claims:** "can't hallucinate" is always attributed to TypeSafe; no "lying" (the line is "not lying on purpose, just confident and wrong"); Every's test is called tiny; the job-posting classifier was trained on that dataset.
- **References:** "Remember this one" (Step 4) comes before its payoff (Step 6).
- **Standalone:** no references to other videos.
- **Fairness:** the chatbot race uses JSON mode. Also test the baseline without JSON mode (a notebook tweak; see `TR-doc.md`).
- **Thumbnail:** it uses a real confident mistake in the notebook's own format (scam probability, e.g. "Scam: 0.03"). Never "SAFE 97%".
- **Facts to re-verify on the day:** see `../archive/v3/05-presenter-runbook.md` §7.
- **Table read** with the presenter before recording.

## Pre-publish checklist

- [ ] Dry run done; every ⟦placeholder⟧ filled in both `script.md` and `TR-doc.md`
- [ ] Chatbot baseline tested with and without JSON mode
- [ ] Thumbnail matches a real result
- [ ] Launch facts and leaderboard ranks re-verified
- [ ] OpenRouter access explained (direct signups were paused)
- [ ] Chapters added as YouTube timestamps
- [ ] Google Form link and 1930 / cybercrime.gov.in pinned
- [ ] Same-day Short cut from the "pause and guess" beat

## Cut plan (if a take runs long)

1. Shorten "Where you'd actually use this" to two ideas.
2. Trim the "Why everyone is talking" platform list to three names.
3. Drop the "look at this one line" aside in Step 3.

**Never cut** the Step 4 plant, the Step 6 payoff, or the fine print.

## Titles

Default: *"This AI 'Can't Hallucinate'… So We Fed It Scam SMS"*. The alternatives and the thumbnail rules are in `TR-doc.md`.
