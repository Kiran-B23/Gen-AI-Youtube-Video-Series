# Publish kit · Laya, the free local Jev rival

## Titles (pick 1)
1. We ran the free Jev rival on a laptop
2. Free Jev alternative: is Laya any good?
3. Laya vs Jev: free and local, with one catch

## Thumbnail concept (≤4 words of text)
"FREE JEV?" in giant mint type over a laptop HUD, a small amber "48%" stamp on a ticket card.

## Caption / description
Laya is an open-source decision model: give it a message and questions, and it answers each with a probability, without writing text. We installed it on a laptop with no GPU and gave it a real support ticket. Billing: 98% sure. Will the customer leave? 48%, a coin flip. Three answers took about 0.65 s on CPU. It's free and your data stays local, but untuned it scores 36% on its own benchmark, so tune it on your own data first. Jev comparisons below are published figures, not a head-to-head test.

## Sources (for the description / pinned comment)
- [S1] Laya model card (what it is, Jev comparison table): https://huggingface.co/convaiinnovations/laya
- [S2][S3] laya on PyPI (Apache 2.0, pip install, CPU/GPU): https://pypi.org/project/laya/
- [S6][S7][S10] laya-typed-decisions card (0.766 tuned, 0.362 base, Jev 0.727 third-party, limitations): https://huggingface.co/convaiinnovations/laya-typed-decisions
- [S8] Banking77: Jev 0.870 (72 labels) vs Laya 0.425 (77 labels), from the Laya model card: https://huggingface.co/convaiinnovations/laya
- [S9] Jev pricing ($0.042 per million input tokens, output free): https://www.eesel.ai/blog/typesafe-jev-pricing
- [S11] Laya: how it works, run it locally, and evaluate it (HF community article): https://huggingface.co/blog/sora-2/laya-ai-model-how-it-works-run-it-locally-and-eval
- [S12] Our test, 2026-10-11: laya 0.4.2 from PyPI, CPU only (Intel Core i7-13620H, no GPU), 20 runs, median 651 ms for 3 questions; billing 0.984, churn risk 0.48, urgency confidence 0.13

## Hashtags
#AI #MachineLearning #OpenSource #LLM #Python #AItools

## Pinned comment (invites replies)
We ran Laya on one support ticket and it nailed billing but called churn a coin flip. One more catch we cut for time: with 70+ labels, Jev wins easily (87% vs 43%, per Laya's own card). What should we test next?

## Repurposing (long-form moments → reels)
- An explainer could fine-tune Laya on 200 labelled tickets and re-run the churn question (does 48% become confident?).
