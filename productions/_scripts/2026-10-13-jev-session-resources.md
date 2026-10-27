# Resources · Jev session (v3)

Everything the presenter, editor and viewers need for `2026-10-13-jev-session-v3.md` (also valid for v2).

> ⚠️ **Push first.** The notebook downloads `jev_helpers.py` and the dataset from the `main` branch on GitHub. v2/v3's two new
> cells (`calibration_buckets`, `cascade_report`) and the fixed `scoreboard` / `confident_mistakes` and v3's `other_scam` option exist only locally until
> they are committed and pushed. Until then, the Colab link below runs the old helpers and the new cells fail.

## 1. Hands-on files (in this repo)
| What | Local path | Public link (after push) |
|---|---|---|
| Colab notebook | `sessions/01-jev/option-B-scam-sms-test/notebook/jev_scam_detector.ipynb` | [Open in Colab](https://colab.research.google.com/github/Kiran-B23/Gen-AI-Youtube-Video-Series/blob/main/sessions/01-jev/option-B-scam-sms-test/notebook/jev_scam_detector.ipynb) · [GitHub](https://github.com/Kiran-B23/Gen-AI-Youtube-Video-Series/blob/main/sessions/01-jev/option-B-scam-sms-test/notebook/jev_scam_detector.ipynb) |
| Helper file (plumbing: race, scoring, charts, app) | `sessions/01-jev/option-B-scam-sms-test/jev_helpers.py` | [raw](https://raw.githubusercontent.com/Kiran-B23/Gen-AI-Youtube-Video-Series/main/sessions/01-jev/option-B-scam-sms-test/jev_helpers.py) |
| Test set: 100 made-up SMS (60 scam, 40 genuine; numbers and links are fake) | `sessions/01-jev/option-B-scam-sms-test/data/scam_messages.csv` | [raw](https://raw.githubusercontent.com/Kiran-B23/Gen-AI-Youtube-Video-Series/main/sessions/01-jev/option-B-scam-sms-test/data/scam_messages.csv) |
| Trainer reference doc (from the 2026-09-30 option B; the notebook walk-through) | `sessions/01-jev/option-B-scam-sms-test/TR-doc.md` | — |

**Pinned models:** Jev `jev-1.13` · chatbot `google/gemini-3.8-flash`, both through one OpenRouter key.

**Notebook map (what each script step runs):**
| Script step | Cell | Mark |
|---|---|---|
| Setup (do before recording) | install + `get_api_key()` | ▶️ |
| 1 The old way | `ask_llm(...)` + `json.loads` | 🧑‍🏫 |
| 2 The swap | `TypeSafeClient(...)` + `jev.system_one(...)` | 🧑‍🏫 |
| 3 Three questions | `QUESTIONS` (Noul + Choice + Score) | ▶️ |
| 4 Try to fool it | `TRICKY` loop | ▶️ |
| 5 The race | `race(...)` + `scoreboard(results)` | ▶️ |
| 6 Catching it wrong | `confident_mistakes(results)` | ▶️ |
| Calibration | `calibration_buckets(results)` *(new in v2)* | ▶️ |
| 7 The fix | `verdict()` + slider + `band_report(...)` | 🧑‍🏫 |
| 7b Did the backup pay off? | `cascade_report(results, threshold)` *(new in v2)* | ▶️ |
| 8 Make it an app | `make_checker(...)` + `launch_app(...)` | ▶️ |

Backup on recording day: if the API is down, `results = load_saved_results()` reloads the last race (`race_results.csv`).

## 2. Setup for the viewer (goes in the description doc)
1. Create an OpenRouter account and a key: https://openrouter.ai/settings/keys. Add a few dollars of credit; one full run costs well under $1.
2. Open the notebook in Colab (link above), open the 🔑 **Secrets** panel, add `OPENROUTER_API_KEY`, and switch on notebook access.
3. Run the setup cell, then the cells in order.
- Never paste an OTP, account number or personal details into any AI tool.
- Jev models on OpenRouter: https://openrouter.ai/models?q=jev

## 3. Sources (description / pinned comment; never on screen)
| Claim in the script | Source |
|---|---|
| "Zero hallucinations"; price; the 444× headline; homepage demo time | https://typesafe.ai |
| Output tokens are free | https://www.promptfoo.dev/docs/providers/typesafe/ · https://www.layer3labs.io/guides/jev-pricing |
| About a tenth of a second (independent) | https://dev.to/aws-builders/jev-after-eight-days-of-independent-tests-level-with-mid-price-llms-behind-the-frontier-1c60 · https://infoworld.com/article/4223468/typesafe-ais-new-models-work-with-machines-not-humans.html |
| The 444× multiplier names no comparator | the DEV eight-day test above |
| Noul / Choice / Score | https://www.promptfoo.dev/docs/providers/typesafe/ · https://opentweet.io/jev/choice-score-noul |
| Extra questions barely change response time; English first; no counting or dates; can't defend against adversarial text | https://www.layer3labs.io/guides/jev-limits · https://innfactory.ai/en/ai-models/typesafe-jev/ |
| Chatbots' self-reported confidence mostly 80–100%, right or wrong | https://arxiv.org/html/2306.13063v2 (§5.1) |
| Score = weighted average, can land between levels | https://www.promptfoo.dev/docs/providers/typesafe/ · https://langfuse.com/docs/evaluation/evaluation-methods/jev-as-a-judge |
| Calibration (80% → right about 80% of the time) | https://flaviocopes.com/jev-confidence/ · https://nexos.ai/blog/what-is-jev/ |
| ~8,000 examples, 44× lower cost, behind on 14 of 15 tasks, calibration vs 19 LLMs, routing at a quarter to half the cost | https://arxiv.org/abs/2609.24574 |
| Swapping the yes/no descriptions changed about a third of answers | the DEV eight-day test above |
| 1930 helpline · report online | https://cybercrime.gov.in |

**Going further (description only, not in the spoken script):**
- Cascade on a judging task (CMU, about 99% of GPT-6's accuracy at roughly half its fee): https://arxiv.org/html/2609.26550v1
- Laya, a free open-source lookalike that runs locally: https://huggingface.co/convaiinnovations/laya

## 4. Production files
| What | Path |
|---|---|
| Script v3 (current) · v2 · v1 (original) | `scripts/2026-10-13-jev-session-v3.md` · `-v2.md` · `-v1.md` |
| Comparison with 16 long Jev videos on YouTube | `productions/2026-10-13-jev-session/yt-comparison.md` |
| Production notes: visuals, beat sheet, slots to fill, reading rules, cut plan, stop rule | `productions/2026-10-13-jev-session/production-notes.md` |
| Publish kit: titles, thumbnail, description, chapters, pinned comment, reels | `productions/2026-10-13-jev-session/publish.md` |
| Research (S1–S17), content plan, script reviews | `productions/2026-10-13-jev-session/` |
| YouTube analysis of the 10 top Jev videos | `productions/2026-10-12-jev-explainer/inspiration.md` |
