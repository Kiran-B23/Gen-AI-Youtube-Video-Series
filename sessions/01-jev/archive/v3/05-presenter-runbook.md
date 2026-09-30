# Presenter Runbook: Jev "Can't Hallucinate". So We Tried to Make It Lie.

**For:** the presenter (trainer) and whoever reviews the recording before it's published.
**Read with:** `03-TR-doc.md` (the teaching flow), `01-session-script.md` (what to say), `notebook/jev_scam_detector.ipynb` (what to run), `04-recording-checklist.md` (production steps).

---

## 1. Session at a glance
| | |
|---|---|
| **Topic** | Jev (TypeSafe AI's "System One" decision model), launched Sept 15, 2026 |
| **Story** | An investigation of Jev's two claims ("can't hallucinate", "answers are free"), tested on scam SMS: old way vs the 2-line swap → "try to make it lie" → race on 100 messages → confident mistakes → slider fix → Laya → verdict |
| **Format** | Face + screen, 11 chapters |
| **Audience** | Students and early-career developers; comfortable running Colab cells, no ML background needed |
| **Length** | ~20 min final edit |
| **Tools** | Google Colab, OpenRouter (one API key for both Jev and the LLM), `typesafe-sdk`, `openai`, `pandas`, `matplotlib`, `gradio` |
| **Cost to run** | Well under $1 for the full notebook (Jev at $0.042/M input tokens, output free; the LLM run is the main cost). Put $2–5 of credit on the key to be safe. |

## 2. Learning outcomes
By the end, a viewer can:
1. Explain the difference between a generative LLM and a decision model like Jev ("essay vs OMR sheet").
2. Say whether Jev will replace LLMs (no) and where it fits (fast, high-volume small decisions).
3. Swap a chatbot call for a Jev call, and read a Noul answer as a probability.
4. Explain why a guaranteed format doesn't guarantee a correct answer.
5. Use confidence bands (a threshold) with a fallback to make it trustworthy.
6. Name an open alternative (Laya) and its trade-off.

## 3. Key concepts: what the trainer must get right
| Concept | Correct explanation | Common mistake to avoid |
|---|---|---|
| Jev vs LLM | Jev returns **typed decisions with probabilities**, never free text or reasoning | Calling Jev "a faster ChatGPT". It can't chat, explain or write. |
| Noul | A yes/no question; returns the **probability of yes** (0–1) | Treating 0.6 as "yes". It's "leaning yes, unsure". |
| Choice | Picks one option; returns the choice, `confidence`, and **probabilities for every option** (up to 255 options) | Ignoring the full distribution |
| Score | Ordered rubric (2–10 levels); returns a probability-weighted position, which **can land between levels** (e.g. 2.4) | Expecting a whole number |
| "Can't hallucinate" (the hook claim) | Quote it **as TypeSafe's claim**, with the source on screen. The video's job is to test it: the *format* is guaranteed, the *answer* is not ("not empirical") | Stating it as our own fact, or mocking TypeSafe; their fine print admits it, so we say so |
| Laya | Open-source (Apache-2.0), same question types; less accurate out of the box, strong once fine-tuned | Saying "Laya beats Jev" (its 0.766 is from a test-tuned checkpoint), or taking a side in the dispute over who came first |
| Headline numbers (193.6x faster, 444.6x cheaper) | Come from TypeSafe's **own four in-house evals**, which they say may be biased; pricing may be subsidised | Presenting them as facts or putting them on the thumbnail |
| Thresholds | We choose them; stricter = fewer errors, more "not sure" | Implying the model decides for you |

## 4. Chapter-by-chapter runbook
🧑‍🏫 = read line by line on camera · ▶️ = run, then talk only about the result.

| Chapter | Notebook cell | Expected output | Line to land | If it goes wrong |
|---|---|---|---|---|
| 0:00 Hook | — | — | "One of these claims doesn't survive this video" | The open loop must be set before 0:30 |
| 1:00 Hype | — | — | "Smart if-statements" | Use only dated, sourced screenshots |
| 2:30 Not a chatbot | — | — | "Essay vs OMR sheet" | — |
| 5:00 ChatGPT dead? | — | — | "No. And that's the point" | Keep under 60 s |
| 6:00 Claim #1 | ▶️ Setup | `✅ Key loaded` | (cut the wait) | §5: no key / 401 |
| | 🧑‍🏫 First, the old way | Raw reply via `repr`; `Parsed:` or `💥 json.loads crashed` | "We asked for a yes/no and got an essay" | If it parses cleanly, run 2–3 more times and say so honestly |
| | 🧑‍🏫 The swap | One float, e.g. 0.9x | "The *format* is guaranteed. That's what 'can't hallucinate' means" | 402 → add credit; 404/400 → check the model ID |
| | ▶️ Ask more | One line: scam · type · pressure | "Three answers, one call" | 422 → malformed question |
| | 🧑‍🏫 Try to make it lie | Five probabilities | "Pause and guess" → reveal: scam · genuine · scam · scam · genuine | Any result is fine; react honestly |
| 10:00 Claim #2 | ▶️ The race + `scoreboard` | Speed/cost table, then the accuracy table | "⟦M⟧x cheaper, but is it right?" | 429 → `race(..., concurrency=5)` |
| 13:00 Caught lying | ▶️ `confident_mistakes` | "Wrong on X… SURE on Y" + rows | "True about the format, false about the answer" | Y = 0 → §6 (rename the chapter "Where it slipped") |
| 15:30 The fix | 🧑‍🏫 Slider + `band_report` | Band table + one summary line; drag 0.90 → 0.99 and rerun | "Umpire's call" | — |
| | ▶️ Bonus app | Gradio link | Say the disclaimer | If `share=True` fails, use the in-notebook preview |
| 17:00 Use cases | — | — | "Same small decision, again and again" | Label vendor numbers |
| 18:00 Laya | — (B-roll only) | — | "More accurate out of the box vs free, local, trainable" | Neutral on the dispute |
| 19:30 Verdict | — | — | "A threshold, a test and a backup give trust" | The verdict must match the real results |

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
Researched Sept 29–30, 2026. Recheck anything marked *recheck*.

| Claim in the video | Source | Status |
|---|---|---|
| Launched Sep 15, 2026 (early access); $40M seed led by DCVC | typesafe.ai launch post | Confirmed |
| The founder co-authored InstructGPT (the instruction-following work behind ChatGPT) | TypeSafe launch post; Firecrawl "What is Jev" | Confirmed; don't say "made ChatGPT" |
| "Can't hallucinate" / 0% hallucination "not empirical"; schema guaranteed | TypeSafe launch post | Confirmed; quote it as their claim |
| Output free; $0.042 per 1M input tokens; "can't prove it isn't subsidized" | TypeSafe launch post; OpenRouter model page | Confirmed; *recheck the price* |
| ≈ $0.04 per 1,000 decisions | JevBench README | Confirmed (JevBench's measured ~950 input tokens per decision) |
| HN launch thread ~2,000 points | news.ycombinator.com/item?id=49717558 | 1,989 on Sep 30; say "about 2,000" |
| Vercel (Sep 16), LangChain (Sep 17), DigitalOcean (Sep 23), OpenRouter, Pydantic AI integrations | Each platform's changelog / docs | Confirmed; Cloudflare **not** confirmed, so don't mention it |
| Signups opened Sep 20, paused Sep 22 | Firecrawl; flaviocopes.com/jev | Confirmed by two secondary sources; *recheck the current status* |
| "Smart if-statements" | TypeSafe launch post | Confirmed |
| "Cheap by default, frontier on exception" | LangChain blog (credits Jaya Gupta) | Confirmed |
| Not a drop-in replacement for an LLM | docs.typesafe.ai (coding-agents page); LangChain | Confirmed |
| CEO: "it's also possible to be confidently wrong" | HN launch thread | Confirmed |
| English-first; "not a calculator"; adversarial text "can move the answer" | docs.typesafe.ai/model-jaggedness/jev-1.13 | Confirmed |
| Every: 6/7 vs 7/7 | Every Mini-Vibe Check (via Firecrawl) | Confirmed; a small test |
| Fake-job benchmark: Jev fraud F1 31.2% (recall 22.6%) vs TF-IDF 70.0% | geckguy.github.io/job-posting-triage | Confirmed; Jev ran via classifier.dev on an old Kaggle dataset, so say "one independent test" |
| Use-case numbers (triage 1.2 s, moderation 114 ms, Hindsight 0.80→0.95, Browserbase 1.97→0.46 s) | OpenRouter Jev Lab; TypeSafe cookbook; Hindsight blog; LangChain | Vendor numbers labelled "vendor demo" |
| Laya: Convai Innovations, Apache-2.0, released Sep 18; same question types and API format | huggingface.co/convaiinnovations/laya; GitHub API | Confirmed |
| JevBench v1.4.2.2: Jev #4 (63.29), Laya #43 (30.25); Imajev-4B / Plumb-4B / decider-4b above Jev | JevBench results | Confirmed; *recheck, the board changes*; always name the version |
| Laya base near chance zero-shot (0.362) vs fine-tuned 0.766 | Laya model card | Confirmed |
| 1930 helpline / cybercrime.gov.in | Government of India | Check before publishing |

## 8. Reviewer sign-off checklist
**Accuracy**
- [ ] Every ⟦placeholder⟧ is replaced with a number from the real run, and the hook numbers match the tables.
- [ ] Vendor numbers are clearly labelled as TypeSafe's claims, with the caveats said on camera.
- [ ] "Can't hallucinate" appears only as **TypeSafe's claim being tested** (with a source), never as our own statement; no "100% accurate" or "guaranteed safe" wording anywhere.
- [ ] If the LLM won any metric, that's shown, not hidden.

**Safety and privacy**
- [ ] No API key visible in any frame (Secrets panel, terminal, notebook output, browser tabs).
- [ ] No personal phone number, email address or real message from anyone's phone on screen .
- [ ] The dataset's fake numbers/links are shown with the "example, fake" overlay.
- [ ] The "learning project, not a safety guarantee" disclaimer is in the app segment and the description.

**Teaching quality**
- [ ] The open loop ("one of these claims doesn't survive") is set before 0:30 and paid off in "We caught it lying"; every chapter ends on a re-hook.
- [ ] The first frame matches the thumbnail; a visual change every 5–10 s.
- [ ] Setup waiting (signups, installs, API spinners) is cut or sped up.
- [ ] Noul / Choice / Score are each shown with a scam example.
- [ ] Captions corrected for: Jev, TypeSafe, Noul, OpenRouter, Gradio, Colab, Hinglish.

**Packaging**
- [ ] Chapters match the final edit.
- [ ] The description includes the notebook link, dataset link, versions used, filming date and resource links (see the checklist doc).
- [ ] The thumbnail uses only our own results.
