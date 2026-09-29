# Presenter Runbook: Jev Scam Detector Session

**For:** the presenter (trainer) and whoever reviews the recording before it's published.
**Read with:** `03-TR-doc.md` (the teaching flow), `01-session-script.md` (what to say), `notebook/jev_scam_detector.ipynb` (what to run), `04-recording-checklist.md` (production steps).

---

## 1. Session at a glance
| | |
|---|---|
| **Topic** | Jev (TypeSafe AI's "System One" decision model), launched Sept 15, 2026 |
| **Project** | Scam SMS/WhatsApp detector → race against an LLM on 100 labelled messages → Gradio web app |
| **Audience** | Students and early-career developers; comfortable running Colab cells, no ML background needed |
| **Length** | 22–25 min final edit |
| **Tools** | Google Colab, OpenRouter (one API key for both Jev and the LLM), `typesafe-sdk`, `openai`, `pandas`, `matplotlib`, `gradio` |
| **Cost to run** | Well under $1 for the full notebook (Jev at $0.042/M input tokens, output free; the LLM run is the main cost). Put $2–5 of credit on the key to be safe. |

## 2. Learning outcomes
By the end, a viewer can:
1. Explain the difference between a generative LLM and a decision model like Jev ("essay vs OMR sheet").
2. Write Noul, Choice and Score questions, and ask several in one call.
3. Turn probabilities into actions with confidence thresholds.
4. Benchmark two models fairly on a labelled dataset (latency, cost, accuracy, invalid outputs).
5. Explain why a guaranteed format doesn't guarantee a correct answer, and design a fallback.

## 3. Key concepts: what the trainer must get right
| Concept | Correct explanation | Common mistake to avoid |
|---|---|---|
| Jev vs LLM | Jev returns **typed decisions with probabilities**, never free text or reasoning | Calling Jev "a faster ChatGPT". It can't chat, explain or write. |
| Noul | A yes/no question; returns the **probability of yes** (0–1) | Treating 0.6 as "yes". It's "leaning yes, unsure". |
| Choice | Picks one option; returns the choice, `confidence`, and **probabilities for every option** (up to 255 options) | Ignoring the full distribution |
| Score | Ordered rubric (2–10 levels); returns a probability-weighted position, which **can land between levels** (e.g. 2.4) | Expecting a whole number |
| "0% hallucination" | TypeSafe says this is **not empirical**; only the *schema match* is guaranteed | Repeating "it can't hallucinate". It can be **valid and wrong**. |
| Headline numbers (193.6x faster, 444.6x cheaper) | Come from TypeSafe's **own four in-house evals**, which they say may be biased; pricing may be subsidised | Presenting them as facts or putting them on the thumbnail |
| Thresholds | We choose them; stricter = fewer errors, more "not sure" | Implying the model decides for you |

## 4. Section-by-section runbook
🧑‍🏫 = read line by line on camera · ▶️ = run, then talk only about the result.

| Script section | Notebook step | Expected output | Talking point to land | If it goes wrong |
|---|---|---|---|---|
| 3 Problem | Step 0 ▶️ | `✅ Key loaded` | (cut setup in the edit) | See §5 (no key / 401) |
| 3 Problem | Step 1 🧑‍🏫 | `repr(reply)` shows raw text; `json.loads` either parses or prints `💥 crashed` | "We got text, not a decision" | If it parsed cleanly, run it 2–3 more times; say so honestly if it stays clean |
| 5 The swap | Step 2 🧑‍🏫 | A single float, e.g. 0.9x | "A number, not a paragraph. That's the swap" | 402 → add credit; 404/400 → check the model ID on the OpenRouter Jev page |
| 6 Three questions | Step 3 🧑‍🏫 | Three lines: scam probability, type, pressure (0–3 float) | "Two more lines in a dictionary, not more parsing" | 422 → a malformed question; compare with the notebook |
| 7 Decision | Step 4 🧑‍🏫 | 3 lines, each 🚨 / ⚠️ / ✅ | "Umpire's call" | Any verdict is fine. React honestly |
| 8 Race | Step 5 ▶️ | "🏁 Jev is running… done in X s", then the LLM, then the speed table; `scoreboard` table | Read the numbers **as they are**, including where the LLM wins | 429 → `await race(df, QUESTIONS, SCAM_TYPES, concurrency=5)` |
| 9 Flaw | Step 6 ▶️ | "Jev was wrong on X… SURE of itself on Y" + table; threshold table | "Valid ≠ correct" | If Y = 0, see §6 |
| 10 Fix | Step 7 🧑‍🏫 | "N of 100 messages would get a second opinion" + one result with `explanation` | "Fast for most, careful for the tricky few" | If N = 0, call `check_with_backup` on a custom ambiguous message |
| 11 App | Step 8 ▶️ | Gradio public link; verdict + category bars + details | "Share it with family", **plus the disclaimer** | If `share=True` fails, use the in-notebook preview |

## 5. Troubleshooting
| Symptom | Cause | Fix |
|---|---|---|
| `TypeSafeAuthenticationError` / 401 | Missing or wrong key; the Colab secret isn't enabled for this notebook | Re-add `OPENROUTER_API_KEY` in Secrets and toggle "Notebook access" |
| 402 / insufficient credits | No credit on the OpenRouter account | Add credit; Jev isn't free on OpenRouter |
| 404 / model not found | Model ID changed | Check the Jev page on OpenRouter (`typesafe/jev-1.13`); the notebook uses `jev-1.13`, which OpenRouter maps to `typesafe/jev-1.13` |
| `TypeSafeRateLimitError` / 429 or 529 | Too many parallel calls, or TypeSafe is overloaded | The SDK retries with backoff; rerun with `race(..., concurrency=5)` |
| `SyntaxError: 'await' outside function` | Running the code as a plain `.py` script | Top-level `await` works in Colab/Jupyter. In a script, use `asyncio.run(race(...))` |
| LLM replies all invalid | The comparison model doesn't support JSON mode | `import jev_helpers; jev_helpers.LLM_MODEL = "<another OpenRouter model>"`, then rerun Step 5 (and say which model on camera) |
| Cost looks like $0 | Response didn't include `usage.cost` | `jev_helpers.py` falls back to its `PRICE` table; update the prices from the OpenRouter model pages |
| Gradio link doesn't open | Share tunnel blocked | Use the in-notebook preview |

**Backup plan if the API fails while recording:** every race is saved to `race_results.csv`. Reload it with `results = load_saved_results()` and continue from `scoreboard(results)`. Say on camera that you're loading an earlier run.

## 6. If results don't match the story
The script is built around *real* results. Don't bend the data to fit it.
- **Jev is less accurate than the LLM:** keep it. Frame the trade-off: "⟦N⟧x faster, ⟦M⟧x cheaper, ⟦K⟧ points less accurate. Which matters for your app?"
- **No confident-wrong cases:** use the lowest-scoring category, or the "not sure" messages, as the twist. Never plant fake failures.
- **Speed gap is small:** report it honestly. Latency depends on region and load, and the LLM you picked may be very fast. Consider rerunning with `openai/gpt-6-sol` as the "big LLM", and state which model you used.
- **Jev does great on everything:** add 5–10 new tricky messages (Hinglish, polite scams, genuine alerts) and rerun. A 100-item set is easy to overfit in your head.

## 7. Fact-check list (confirm on filming day)
| Claim in script | Source | Status at research time (Sept 29, 2026) |
|---|---|---|
| Launched Sept 15, 2026 by TypeSafe AI | TypeSafe launch post | Confirmed |
| 70–500 ms; "193.6x faster, 444.6x cheaper" on in-house evals; "some bias could exist"; subsidy caveat; 0% hallucination "not empirical" | TypeSafe launch post / evals page | Confirmed; quote the caveats exactly |
| $0.042 per 1M input tokens, output free | OpenRouter Jev 1.13 model page | Confirmed on OpenRouter Sept 29; recheck |
| Direct signups paused | Firecrawl write-up (paused Sept 22) | Recheck; if reopened, say "you can also use TypeSafe directly" |
| Every's test: Jev 6/7, bigger model 7/7 | Every "Mini-Vibe Check" | Confirmed; small test (12 passages), so call it "a small independent test" |
| Choice ≤ 255 options; Score 2–10 levels | TypeSafe API reference | Confirmed |
| 1930 helpline / cybercrime.gov.in | Government of India | Check before publishing |
| Model ID `jev-1.13`, SDK `typesafe-sdk` 0.7.2 | OpenRouter / PyPI | Pin whatever you actually used and show it on screen |

## 8. Reviewer sign-off checklist
**Accuracy**
- [ ] Every ⟦placeholder⟧ is replaced with a number from the real run, and the hook numbers match the tables.
- [ ] Vendor numbers are clearly labelled as TypeSafe's claims, with the caveats said on camera.
- [ ] No "can't hallucinate" / "100% accurate" / "guaranteed safe" wording anywhere (video, title, thumbnail, description).
- [ ] If the LLM won any metric, that's shown, not hidden.

**Safety and privacy**
- [ ] No API key visible in any frame (Secrets panel, terminal, notebook output, browser tabs).
- [ ] No personal phone number, email address or real message from anyone's phone on screen (the MCP episode showed a personal email; don't repeat that).
- [ ] The dataset's fake numbers/links are shown with the "example, fake" overlay.
- [ ] The "learning project, not a safety guarantee" disclaimer is in the app segment and the description.

**Teaching quality**
- [ ] The finished demo appears in the first 20 seconds; theory stays under ~25% of runtime.
- [ ] Setup waiting (signups, installs, API spinners) is cut or sped up.
- [ ] Noul / Choice / Score are each shown with a scam example.
- [ ] Captions corrected for: Jev, TypeSafe, Noul, OpenRouter, Gradio, Colab, Hinglish.

**Packaging**
- [ ] Chapters match the final edit.
- [ ] The description includes the notebook link, dataset link, versions used, filming date and resource links (see the checklist doc).
- [ ] The thumbnail uses only our own results.
