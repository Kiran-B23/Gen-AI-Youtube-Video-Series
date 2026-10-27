# Research · Jev by TypeSafe AI

_Researched on 2026-10-11 (re-verified the user's brief-v3 and the 2026-09-30 session runbook). Labels: company claim · independent · our test · community._

## One-line definition (by what it does)
Jev is an AI model that doesn't write text: you give it a message plus the questions you care about, and it returns
typed answers (a label, yes/no, a score) with a confidence for each, so ordinary code can act on them. [S1]

## Fact sheet
| # | Fact | Source | Date | Label | Viewer value | Use in |
|---|---|---|---|---|---|---|
| S1 | Jev takes "structured questions" and returns "typed decisions with probabilities and confidence"; TypeSafe calls it a "System One" model for automation | [typesafe.ai](https://typesafe.ai) | 2026-10-11 | company claim | what it does | reel |
| S2 | Price: $0.042 per million input tokens ($42 per billion); output tokens are free | [typesafe.ai](https://typesafe.ai) · [Layer3 Labs pricing guide](https://www.layer3labs.io/guides/jev-pricing) | 2026-09-23 / 2026-10-11 | company claim | cost | reel |
| S3 | Responses in 70–500 ms, most calls around 100 ms; independent runs measured about 0.1 s server latency | [InfoWorld](https://infoworld.com/article/4223468/typesafe-ais-new-models-work-with-machines-not-humans.html) · [DEV: eight days of independent tests](https://dev.to/aws-builders/jev-after-eight-days-of-independent-tests-level-with-mid-price-llms-behind-the-frontier-1c60) | 2026-09 / 2026-09-24 | company claim + independent | speed | reel |
| S4 | On TypeSafe's own benchmark Jev averages 67.8% agreement vs 74.1% for the best comparison model; the "right answers" are an average of GPT-6 Astra and Claude Fable 5.1 | [Vals AI: independent evaluation of Jev](https://vals.ai/blogs/independent-evaluation-of-jev) · [Creative AI News](https://www.creativeainews.com/articles/typesafe-jev-system-one-accuracy-2026/) | 2026-09 | company benchmark (reported independently) | the catch | reel |
| S5 | Independent study: labelling 7,977 human-labelled items across 18 tasks cost $0.21 with Jev vs $0.34 to $62.99 for 19 LLMs (the priciest ≈ 300× Jev: 62.99 ÷ 0.21 = 299.95); Jev trailed the best LLM on 14 of 15 tasks by a median 11.6 macro-F1 points | [arXiv 2609.24574, Ibrahim & Zaki](https://arxiv.org/abs/2609.24574) | 2026-09-23 (v2) | independent | proof + catch | reel |
| S6 | Cascade: accept Jev when confidence ≥ 0.9, escalate the rest to GPT-6 → 99.6% of GPT-6's judging accuracy at 47% of its fee (990 judgments) | [arXiv 2609.26550, Li et al. (CMU)](https://arxiv.org/html/2609.26550v1) | 2026-09-21 | independent | the fix | reel |
| S7 | Renaming the answer options changed 32.5% of Jev's answers in one independent test | [DEV: eight days of independent tests](https://dev.to/aws-builders/jev-after-eight-days-of-independent-tests-level-with-mid-price-llms-behind-the-frontier-1c60) | 2026-09-24 | independent | the catch (explainer) | explainer |
| S8 | TypeSafe advertises "zero hallucinations" (the output always fits the format) | [typesafe.ai](https://typesafe.ai) | 2026-10-11 | company claim | catch: valid ≠ right | reel |
| S9 | Direct signups paused on 2026-09-22; OpenRouter and Vercel AI Gateway serve Jev without a waitlist | [flaviocopes.com](https://flaviocopes.com/jev-api-key/) · [Apidog](https://apidog.com/blog/how-to-access-jev/) | 2026-09 | community | how to try it | publish kit |
| S10 | TypeSafe's "193.6x faster, 444.6x cheaper" headline names no comparator; independent comparisons range 0.5x–12.1x faster and 0.6x–478x cheaper | [DEV: eight days of independent tests](https://dev.to/aws-builders/jev-after-eight-days-of-independent-tests-level-with-mid-price-llms-behind-the-frontier-1c60) | 2026-09-24 | independent | honesty | explainer |

## Running-example candidates
- **Support ticket #4821: "Charged twice this month, refund me or I cancel."** → Team: Billing · Urgent: Yes · Churn risk: High. (Carried from the earlier Jev work; the learnings log says the user liked it.) ✔ chosen
- A scam SMS (session option B): good for a long session, too much setup for a reel.

## Analogy candidates
- "A smart if-statement" (TypeSafe's own phrase): used as the visual idea (a code `if` whose condition is answered by Jev), not as a spoken analogy.

## The catch (limitations, risks, costs)
- Accuracy trails frontier LLMs: 67.8% vs 74.1% on TypeSafe's own benchmark [S4]; behind the best LLM on 14 of 15 tasks in the independent study [S5].
- A format-valid answer can still be wrong: "zero hallucinations" means the shape is guaranteed, not the truth [S8].
- Sensitive to wording: renamed options flipped about a third of answers in one test [S7].
- Speed/cost headlines vary hugely by comparator [S10].

## Alternatives / competitors
- Laya (free, open-source, runs locally): covered in its own reel.
- Small LLMs with structured output (cheap but slower).

## Viewer questions to answer
1. What does it actually do? (typed answers, not text) 2. How fast and cheap? 3. Is it accurate? 4. When should I use it?

## Cut by the viewer-value filter (and why)
- $40M seed, DCVC, founder's InstructGPT background, Hacker News points, launch date: trivia/hype (and the user's brief bans views/funding/adoption numbers).
- "Launch-day users: ~30x cheaper, ~7x faster (median)" from brief-v3: no source found on 2026-10-11 → cut.
- brief-v3's "matched GPT-5.6 Terra's accuracy at about a quarter of the cost, in half the time": no source found; replaced by the verified CMU cascade [S6] (99.6% of GPT-6's accuracy at 47% of the fee).
- brief-v3's "19 LLMs (VO) vs 18 tasks (label)" question: both are right; the study has 19 LLM baselines and 18 tasks [S5].
