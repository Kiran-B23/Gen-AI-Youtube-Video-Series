# Session: Jev Scam Message Detector

**Hook:** *"This AI can't write a single word, yet it finished 100 messages before a chatbot finished one… and it has one dangerous flaw."*

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Kiran-B23/jev-scam-detector/blob/main/notebook/jev_scam_detector.ipynb)
**Project:** Build a scam SMS/WhatsApp detector on Jev (TypeSafe AI's "System One" decision model), race it against a regular LLM on 100 labelled messages, find the confidently wrong answers, and ship it as a Gradio web app. Everything runs in Google Colab with one OpenRouter API key.

| File | What it is |
|---|---|
| [01-session-script.md](01-session-script.md) | Full script with timings, hook, analogies, `[SCREEN]` / `[SAY]` / `[DO]` cues and chapter list |
| [02-slide-outline.md](02-slide-outline.md) | 15 slides, B-roll, thumbnail and title options |
| [03-TR-doc.md](03-TR-doc.md) | **Trainer Reference doc** in the house TR format: the teaching flow from hook → problem → concept → 13 continuous build steps → twist → payoff → decision framework, with code matching the notebook step for step |
| [05-presenter-runbook.md](05-presenter-runbook.md) | Presenter/reviewer ops: learning outcomes, section runbook with expected outputs, troubleshooting, API-failure backup plan, fact-checks, reviewer sign-off |
| [06-TR-doc-guideline-check.md](06-TR-doc-guideline-check.md) | Rule-by-rule audit of the TR doc against `reference_projects/session_teaching_guidelines.md`, with the fixes applied |
| [04-recording-checklist.md](04-recording-checklist.md) | Pre-production, privacy and blur list, filming-day checks, editing, description template |
| [notebook/jev_scam_detector.ipynb](notebook/jev_scam_detector.ipynb) | The Colab notebook: Steps 0–8, 🧑‍🏫 Teach cells (the Jev swap, about 35 lines) and ▶️ Just-run cells |
| [jev_helpers.py](jev_helpers.py) | Behind-the-scenes plumbing the notebook downloads: key loading, the fair race, scoring, charts, the Gradio app |
| [data/scam_messages.csv](data/scam_messages.csv) | 100 made-up labelled messages: 60 scams (8 types), 40 genuine, 36 tricky, 13 Hinglish; fake links and numbers only |

**Before recording:** do the full dry run in `04-recording-checklist.md` §1 and replace every ⟦placeholder⟧ in the script and slides with real numbers.

**Testing status (Sept 29, 2026):** every notebook cell was run end to end against **mocked** Jev and LLM servers, which checks the code paths and data handling. It has **not** been run against the live API. The first real dry run is the true test of both the code and the results.

**Versions used when writing:** `typesafe-sdk` 0.7.2, `jev-1.13` via OpenRouter (Jev $0.042/M input tokens, output free), comparison LLM `google/gemini-3.8-flash` (configurable in the notebook).

**Teaching standard:** this session follows the internal NxtWave session teaching guidelines (derived from the published videos and the house TR docs); `06-TR-doc-guideline-check.md` shows the rule-by-rule check.
