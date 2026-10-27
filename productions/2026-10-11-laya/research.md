# Research · Laya, the free local Jev rival

_Researched on 2026-10-11. Labels: company claim · independent · our test · community._

## One-line definition (by what it does)
Laya is an open-source decision model: give it a message and typed questions, and it returns an answer to each with a
probability, in one pass, without writing any text.

## Fact sheet
| # | Fact | Source | Date | Label | Viewer value | Use in |
|---|---|---|---|---|---|---|
| S1 | Non-autoregressive "System 1" decision model: state + typed questions → typed answers with calibrated probabilities in one forward pass; never generates text | [Laya model card](https://huggingface.co/convaiinnovations/laya) · [PyPI laya](https://pypi.org/project/laya/) | 2026-09 (card), PyPI 0.4.2 checked 2026-10-11 | company claim | what it does | reel |
| S2 | Apache 2.0 licence, open weights, free to download and use commercially | [PyPI laya](https://pypi.org/project/laya/) · [model card](https://huggingface.co/convaiinnovations/laya) | checked 2026-10-11 | company claim (licence fact) | "free" is true | reel |
| S3 | Installs with `pip install laya` (Python 3.10+); runs on CPU, GPU optional | [PyPI laya](https://pypi.org/project/laya/) · [innFactory summary](https://innfactory.ai/en/ai-models/laya/) | checked 2026-10-11 | company claim | you can try it today | reel |
| S4 | 421M parameters (ModernBERT-large backbone) | [model card](https://huggingface.co/convaiinnovations/laya) | 2026-09 | company claim | small enough for a laptop | cut (trivia-ish; the CPU run shows it better) |
| S5 | Latency 32.8–39.5 ms per question on a Tesla T4 GPU; Jev 236–276 ms (third-party figure) | [model card](https://huggingface.co/convaiinnovations/laya) | 2026-09 | company claim (Laya) · third-party (Jev) | speed | cut (we show our own CPU number instead) |
| S6 | Typed-decisions benchmark (2,000 decisions): fine-tuned `laya-typed-decisions` 0.766; Jev 0.727 "third-party published, not measured here… sample sizes and prompts differ. Treat the comparison as indicative" | [laya-typed-decisions card](https://huggingface.co/convaiinnovations/laya-typed-decisions) | 2026-09 | company claim (Laya) · third-party (Jev) | does it compete? | reel |
| S7 | The base checkpoint scores 0.362 on the same benchmark (near chance without fine-tuning) | [laya-typed-decisions card](https://huggingface.co/convaiinnovations/laya-typed-decisions) · [model card](https://huggingface.co/convaiinnovations/laya) | 2026-09 | company claim | the catch | reel |
| S8 | Banking77: Jev 0.870 (72 labels) vs Laya 0.425 (77 labels, default budget of 3–4 tokens per label) | [model card](https://huggingface.co/convaiinnovations/laya) | 2026-09 | company claim (Laya) · third-party (Jev) | the catch: many labels | reel |
| S9 | Jev is a paid cloud API: $0.042 per million input tokens, output free | [eesel: TypeSafe Jev pricing](https://www.eesel.ai/blog/typesafe-jev-pricing) (quotes TypeSafe's homepage) | 2026 | company claim (TypeSafe) | paid vs free | reel (as "paid cloud API") |
| S10 | The tuned checkpoint is a specialist (four synthetic workflows), English only, and over-confident (ECE 0.213 vs Jev 0.144) | [laya-typed-decisions card](https://huggingface.co/convaiinnovations/laya-typed-decisions) | 2026-09 | company claim | the catch | explainer (reel: "tune it for your data") |
| S11 | Measure calibration on your own workflow before trusting the probabilities | [HF community article](https://huggingface.co/blog/sora-2/laya-ai-model-how-it-works-run-it-locally-and-eval) | 2026-09-26 | independent | what to do | reel (verdict) |
| S12 | Our run: see "Our test" below | this PC | 2026-10-11 | our test | the demo | reel |

## Our test (S12)
_Filled from `result.json` of the scratch run (laya from PyPI, CPU only, 13th Gen Intel Core i7-13620H, no GPU)._

## Running-example candidates
- **The ticket "I was charged twice. Refund me, or I cancel."** (chosen: the channel's Jev videos use it, so returning viewers get continuity, and it exercises choice + score + yes/no questions)
- an invoice approval; a phishing check

## Analogy candidates
- a sorting gate / triage desk: the message goes in, labelled bins light up with a confidence (used as the visual metaphor, not spoken)

## The catch (limitations, risks, costs)
- 36% out of the box: you must fine-tune it on your own labels (S7)
- weak when there are dozens of options (S8)
- the tuned checkpoint is English-only and over-confident (S10)
- Jev comparisons are indicative only: different samples and prompts (S6)

## Alternatives / competitors
- Jev (TypeSafe, paid cloud API) · a regular LLM prompted for JSON (slow, costs output tokens)

## Viewer questions to answer
- Is it really free? (yes, Apache 2.0) · Does it run without a GPU? (our CPU run) · Is it as good as Jev? (only after tuning; worse with many labels)

## Cut by the viewer-value filter (and why)
- The maker's location, release week, parameter count, ModernBERT backbone, PyPI version: don't change what the viewer can do
- GPU latency claims: replaced by our own CPU measurement, which is what a viewer on a laptop gets
- The old script's "no forty million dollars, no famous founder": funding trivia; also unsourced framing
- Kev / Nimble mentions from the old script: unsourced today and dilute the one-comparison focus
