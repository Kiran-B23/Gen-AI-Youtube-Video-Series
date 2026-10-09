# Research · Tokenization

_Researched 2026-10-09. "Our test" = run on this machine with OpenAI's open-source tokenizer library
`tiktoken` 0.14.0: `o200k_base` is the tokenizer GPT-4o uses, `cl100k_base` is GPT-4's
(`tiktoken.encoding_for_model`)._

| # | Fact | Source | Date | Label | Viewer value | Use in |
|---|---|---|---|---|---|---|
| S1 | In English, 1 token ≈ 4 characters ≈ ¾ of a word; 100 tokens ≈ 75 words. Other languages have different ratios. Exact counts depend on the model's tokenizer | [OpenAI Help: What are tokens and how to count them?](https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them) | accessed 2026-10-09 | company claim | Rule of thumb for estimating cost and limits | reel |
| S2 | "strawberry" (alone) → 3 tokens: `st` `raw` `berry` (GPT-4o tokenizer). GPT-4's: `str` `aw` `berry` | tiktoken o200k_base / cl100k_base | 2026-10-09 | our test | The visual proof: the model never gets letters | reel |
| S3 | In the question "How many r's are in strawberry?", " strawberry" (with its leading space) is **one single token**; the whole question is 8 tokens | tiktoken o200k_base | 2026-10-09 | our test | Shows why letter-counting is hard: the letters are hidden inside one ID | reel |
| S4 | "Tokenization matters" → 3 tokens: `Token` `ization` ` matters` | tiktoken o200k_base (same in cl100k) | 2026-10-09 | our test | Running example: 2 words, 3 tokens | reel |
| S5 | Same greeting: English "Hello, how are you?" = 6 tokens; Hindi = 9; Tamil = 10 (GPT-4o tokenizer). With GPT-4's older tokenizer: Hindi 20, Tamil 42 | tiktoken o200k_base / cl100k_base | 2026-10-09 | our test | The same message costs more, and fills the context window faster, in some languages | reel (catch) |
| S6 | Across 17 tokenizers, the same text translated into different languages differs in token length by up to 15×; this affects cost, latency and how much fits in context | [Petrov et al., "Language Model Tokenizers Introduce Unfairness Between Languages", NeurIPS 2023 (arXiv 2305.15425)](https://arxiv.org/pdf/2305.15425v1) | 2023 | independent (peer-reviewed) | Backs S5 at scale | explainer |
| S7 | Letter-counting failures are linked to tokenization, though research says it's not the only cause (counting itself, repeated letters across tokens) | [arXiv 2412.18626](https://arxiv.org/abs/2412.18626v1) · [PromptLayer summary](https://www.promptlayer.com/research-papers/why-ai-still-struggles-to-count-letters) | 2024 | independent | Keeps the claim honest: say "a big part of why", not "the only reason" | reel (wording) |
| S8 | Models do better on letter questions when they spell the word out first or use code | [arXiv 2412.18626](https://arxiv.org/abs/2412.18626v1) · [deepgains](https://deepgains.substack.com/p/why-do-llms-struggle-with-counting) | 2024 | independent / community | The practical fix | reel |
| S9 | API pricing and context limits are counted in tokens (input and output) | [OpenAI Help: tokens](https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them) | accessed 2026-10-09 | company claim | Why the viewer should care | reel |
| S10 | Computers store text as numbers: every character has a unique number (a Unicode code point). "A" = 65 (U+0041); "r" = 114; "strawberry" = 115 116 114 97 119 98 101 114 114 121 | [MDN: Code point](https://developer.mozilla.org/en-US/docs/Glossary/code_point) · [Esri: A quick tour of Unicode](https://doc.arcgis.com/en/allsource/1.5/data/a-quick-tour-of-unicode.htm) · values via Python `ord()` | accessed 2026-10-09 | independent + our test | The foundation: a computer never "sees" a letter | reel |
| S11 | Character-level input makes sequences very long; word-level needs a huge vocabulary and fails on unseen words; subword tokens are the middle ground | [Hugging Face LLM course: Tokenizers](https://huggingface.co/learn/llm-course/chapter2/4) · [DigitalOcean: LLM tokenizers](https://www.digitalocean.com/community/tutorials/llm-tokenizers-bpe-sentencepiece-custom-vs-pretrained) | accessed 2026-10-09 | independent | Why AI uses tokens instead of letters or whole words | reel |
| S12 | GPT-4o's tokenizer has a fixed vocabulary of 200,019 pieces; "Hello" is one piece, "unbelievable" → `un` `bel` `ievable` | tiktoken o200k_base `n_vocab` | 2026-10-09 | our test | The "fixed list of pieces" (the shelf) with a real size | reel |

## What it is (one sentence)
Before a model reads anything, a tokenizer chops text into small chunks called tokens: whole words,
pieces of words or punctuation. Each token becomes a number, and the model only ever sees those numbers.

## Mechanism + analogy
A fixed vocabulary of common chunks (learned from text by byte-pair encoding). Frequent words get one
token; rare words are split into pieces. Analogy candidate: LEGO bricks, where common words are
pre-built bricks and rare words are assembled from smaller bricks.

## Foundation (added after the user's review)
Computers already turn every letter into a number (S10). AI models could read those letter-numbers one by
one, but that makes text very long, and whole words would need a vocabulary too big to handle (S11). So they
read tokens, chunks in between, and tokenization is the chopping (S2–S3).

## Running example
"strawberry": one token inside a sentence, three pieces on its own, and never ten letters.

## Honest catches
- Rules of thumb (S1) are for English only; other languages use more tokens for the same meaning (S5, S6).
- The letter-counting failure has more than one cause (S7). Don't say tokenization is the *only* reason.
- Newer models often get "strawberry" right, so don't claim "AI can't count letters" as a universal fact.
  Frame it as "this is why models have struggled with it".

## Cut (viewer-value filter)
Who invented BPE and when, tokenizer names and versions on screen, vocabulary sizes, the history of
the strawberry meme.
