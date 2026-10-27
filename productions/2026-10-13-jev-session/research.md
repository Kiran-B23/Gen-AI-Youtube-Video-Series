# Research · Jev session

_S1–S10 re-used from `productions/2026-10-10-jev-reel/research.md` (researched 2026-10-11). S11–S16 added 2026-10-13.
Labels: company claim · independent · our test · community._

## One-line definition (by what it does)
Jev is an AI model that doesn't write text: you give it a message (the "state") and typed questions, and it returns a
number for each (a probability, a pick from your options, or a score), so ordinary code can act on it. [S1, S12]

## Fact sheet
| # | Fact | Source | Date | Label | Viewer value | Use in |
|---|---|---|---|---|---|---|
| S1 | Jev takes "structured questions" and returns "typed decisions with probabilities and confidence"; TypeSafe calls it a "System One" model for automation | [typesafe.ai](https://typesafe.ai) | 2026-10-11 | company claim | what it does | session |
| S2 | Price: $0.042 per million input tokens (TypeSafe homepage); output tokens are free (promptfoo provider docs, Layer3 pricing guide) | [typesafe.ai](https://typesafe.ai) · [Layer3 Labs pricing guide](https://www.layer3labs.io/guides/jev-pricing) | 2026-09-23 / 2026-10-11 | company claim | cost | session |
| S3 | Responses in 70–500 ms (company); TypeSafe's homepage demo shows "Completed in 0.114s"; independent runs measured about 0.1 s server-side latency | [InfoWorld](https://infoworld.com/article/4223468/typesafe-ais-new-models-work-with-machines-not-humans.html) · [DEV: eight days of independent tests](https://dev.to/aws-builders/jev-after-eight-days-of-independent-tests-level-with-mid-price-llms-behind-the-frontier-1c60) | 2026-09 / 2026-09-24 | company claim + independent | speed | session |
| S4 | 67.8% vs 74.1% agreement on TypeSafe's benchmark: found in Creative AI News (comparator "Sol"), not on the Vals page; two creators (Rithesh, Theo) read a ~68% chart from TypeSafe's own launch post, so it may be a company chart: re-check the launch post → **not used** either way (it measures agreement, not correctness) | [Creative AI News](https://www.creativeainews.com/articles/typesafe-jev-system-one-accuracy-2026/) | 2026-09 | press (single source) | cut | cut |
| S5 | Independent study (7,977 human-labelled items, 18 tasks, 19 LLM baselines): Jev's measured cost was a median 44× lower; it trailed the best LLM on 14 of 15 tasks by a median 11.6 macro-F1 points; it was better calibrated than 16 of 19 LLMs (3 frontier models did better); routing low-confidence items to an LLM matched or beat the LLM alone at a quarter to half of its cost | [arXiv 2609.24574, Ibrahim & Zaki](https://arxiv.org/abs/2609.24574) (abstract) | 2026-09-23 (v2), re-checked 2026-10-13 | independent | proof + catch + fix | session |
| S6 | Cascade on a judging task (pairwise ranking of generated prose): accept Jev at confidence ≥ 0.9, escalate the rest to GPT-6 → 99.6% of GPT-6's accuracy at 47% of its fee (single-order pooled); 99.4% at 56.8% for the frozen two-order policy (510 pairs). Say "about 99% … at roughly half its fee" | [arXiv 2609.26550, Li et al. (CMU)](https://arxiv.org/html/2609.26550v1) | 2026-09-21, re-checked 2026-10-13 | independent | the fix | session |
| S7 | Swapping which description sat behind "yes" and "no" on a yes/no question changed 32.5% of Jev's answers (1,200 items, AUROC 0.81 → 0.58), in one independent test | [DEV: eight days of independent tests](https://dev.to/aws-builders/jev-after-eight-days-of-independent-tests-level-with-mid-price-llms-behind-the-frontier-1c60) | 2026-09-24 | independent | wording matters | session |
| S8 | TypeSafe advertises "zero hallucinations" (the output always fits the format) | [typesafe.ai](https://typesafe.ai) | 2026-10-11 | company claim | catch: valid ≠ right | session |
| S9 | Direct signups paused on 2026-09-22; OpenRouter and Vercel AI Gateway serve Jev without a waitlist | [flaviocopes.com](https://flaviocopes.com/jev-api-key/) · [Apidog](https://apidog.com/blog/how-to-access-jev/) | 2026-09 | community | how to try it | session (setup) |
| S10 | TypeSafe's "193.6x faster, 444.6x cheaper" headline names no comparator; independent comparisons range 0.5x–12.1x faster and 0.6x–478x cheaper | [DEV: eight days of independent tests](https://dev.to/aws-builders/jev-after-eight-days-of-independent-tests-level-with-mid-price-llms-behind-the-frontier-1c60) | 2026-09-24 | independent | honesty | session |
| S11 | Calibration: TypeSafe trains Jev with "RLCD" (reinforcement learning for calibrated decisions), aiming for answers given 80% to be right about 80% of the time; confidence is how peaked the probability spread is | [flaviocopes: How to use Jev confidence scores](https://flaviocopes.com/jev-confidence/) · [nexos.ai guide](https://nexos.ai/blog/what-is-jev/) | 2026-09 | company claim (reported) | why a threshold can work | session |
| S12 | Three question types: Noul (yes/no → one probability 0–1), Choice (pick one of your options → the pick + a probability per option), Score (a position on your rubric); Choice probabilities are relative to the labels you list | [promptfoo: TypeSafe provider docs](https://www.promptfoo.dev/docs/providers/typesafe/) · [opentweet: choice, score, noul](https://opentweet.io/jev/choice-score-noul) · the notebook's SDK (`typesafe_sdk`) | 2026-09 | company docs | how you talk to it | session |
| S13 | All questions read the same state at once; extra questions add a few input tokens but don't add latency | [Layer3 Labs: Jev limits](https://www.layer3labs.io/guides/jev-limits) | 2026-09-22 | company docs (reported) | ask more in one call | session |
| S14 | Limits: English is the primary language (others "variable accuracy"); 32,000-token ceiling for context + questions; no counting, no date calculations, no generation; "cannot perform … adversarial defense" (sources disagree on the token limit: 32k vs 64k) | [Layer3 Labs: Jev limits](https://www.layer3labs.io/guides/jev-limits) · [innFactory: TypeSafe Jev](https://innfactory.ai/en/ai-models/typesafe-jev/) | 2026-09 | company docs (reported) | what it's not for | session |
| S15 | Laya: free, open-source (Apache 2.0) lookalike that runs locally; on its makers' typed-decisions benchmark the base model scores 0.362 vs Jev 0.727 (third-party figure, "indicative"), and a fine-tuned version 0.766 | [Laya model card](https://huggingface.co/convaiinnovations/laya) · [laya-typed-decisions card](https://huggingface.co/convaiinnovations/laya-typed-decisions) | 2026-09 | company claim (Laya) · third-party (Jev) | the free alternative | session |
| S16 | Our run: the Colab notebook (`jev-1.13` vs `google/gemini-3.8-flash`, 100 made-up SMS: 60 scam / 40 genuine) | `sessions/01-jev/option-B-scam-sms-test/notebook/jev_scam_detector.ipynb` | to record (dry run pending) | our test | the demo | session |
| S17 | India's national cybercrime helpline is 1930; complaints online at cybercrime.gov.in | [National Cyber Crime Reporting Portal](https://cybercrime.gov.in) | checked 2026-10-13 | official | what to do if scammed | session (outro) |
| S18 | Chatbots asked to state their own confidence are overconfident: verbalised confidence mostly falls in the 80–100% range (often in multiples of 5) and is poorly calibrated, improving with model scale but "still far from ideal" | [Xiong et al., "Can LLMs Express Their Uncertainty?" (ICLR 2024), arXiv 2306.13063, §5.1](https://arxiv.org/html/2306.13063v2) | 2023 (ICLR 2024), checked 2026-10-13 | independent | why not just ask the chatbot | session (calibration) |
| S19 | A Score rates the state on 2–10 ordered levels and returns a probability per level, their probability-weighted average (so it can land between levels) and a confidence; promptfoo's caveat: Score values aren't calibrated for interpolating between levels (so say "close to", not an exact position) | [promptfoo: TypeSafe provider docs](https://www.promptfoo.dev/docs/providers/typesafe/) · [Langfuse: Jev as a judge](https://langfuse.com/docs/evaluation/evaluation-methods/jev-as-a-judge) | checked 2026-10-13 | company docs (reported) | reading the pressure score | session (Step 3) |

## Running example
- **The electricity-bill SMS** (the notebook's `sms`, phone number masked). Chosen over the double-charge ticket: IBM (1.1M views),
  Sam and Syntax all use a "charged twice" support email, so ours would look borrowed; the SMS is lived by every Indian viewer,
  the cost of a wrong call is obvious (a missed scam vs a blocked bank alert) and it tests Indian English and Hinglish.

## Analogy candidates (ours, not borrowed)
- **OMR sheet vs essay answer**: the bubbles are fixed in advance, so the answer always fits (from our 2026-09-30 draft).
- **System 1 vs System 2**: glancing at an SMS and thinking "scam" vs solving a JEE maths problem step by step.
- **Weather forecast**: "80% chance of rain" is only useful if it rains on about 8 of every 10 such days (calibration).
- **Cricket's DRS umpire's call**: clear decisions are overturned, close ones stay with the on-field call (the threshold band).

## The catch (limitations, risks, costs)
- Accuracy trails frontier LLMs: behind the best LLM on 14 of 15 tasks [S5]. (S4's 67.8% vs 74.1% is not used.)
- "Zero hallucinations" means the format is guaranteed, not the truth [S8].
- Sensitive to wording: renaming the options changed 32.5% of answers in one test [S7].
- English first, no counting or dates, 32k tokens [S14].
- Headline multipliers have no comparator [S10].

## Cut by the viewer-value filter (and why)
- Founder, $40M seed, launch date, signup pause, the adoption list (Vercel, LangChain…): trivia; they were in the 2026-09-30 drafts.
- "Every" magazine's 6-of-7 test and the fake-job-postings benchmark (2026-09-30 draft): not re-verified on 2026-10-11 → cut.
- JevBench 63.3 vs Laya 30.3 (2026-09-30 draft): not re-verified → replaced by the model-card figures [S15].
- RLCD internals (how the reward works): only the effect matters to the viewer (an 80% that means 80%).
