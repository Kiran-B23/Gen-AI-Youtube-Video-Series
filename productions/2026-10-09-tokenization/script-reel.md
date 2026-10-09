# Reel script · Tokenization (v6: benchmark depth)

**Archetype:** concept, foundation-first, opening on the failure · **Viewer's question:** How does an AI actually read what I type, and why should I care?
**Running example:** the question "How many r's are in strawberry?" · **Tone:** calm, clear, confident teaching delivery (~2.3 words/s, the house benchmark)
**Words:** 334 · **Est. runtime:** 2:25 at 2.3 w/s (2:04 at the 2.7 budget) · **Benchmark:** `references/tokenization-reel.mp4` (3:14, six steps)

_v6 after the user set `references/tokenization-reel.mp4` (ours, Opus 5.5) as the house benchmark for depth, detailing, voice and visualisation: every step is shown on one running sentence, with step counters, the honest limits and a recap. The ending no longer implies the channel only "breaks down words"._

**Sections and steps:** void (cold open) → core (step 1 Numbers) → void (step 2 Tokens) → void (step 3 Cut) → core (step 4 IDs: the reveal) → signal (step 5 Cost) → void (recap) → signal (tip) → void (CTA).

| # | Beat | Time | Spoken line (with [cues]) | Words | Visual tag | On-screen text | Source |
|---|---|---|---|---|---|---|---|
| 1 | Cold open (the failure) | 0–5 s | [curious] Ask an AI how many r's are in strawberry, and it might say two. | 13 | [ANIMATE] | "How many r's in strawberry?" → "2" ✗ (illustrative) | S7 |
| 2 | Hook (foundation paradox) | 5–9 s | [calm] Here's why. Your computer has never seen a single letter. | 10 | [ANIMATE] | A → 65 | S10 |
| 3 | Step 1 · Numbers | 9–14 s | Every character you type is stored as a number. Capital A is sixty-five. | 13 | [ANIMATE] | strawberry = 115 116 114 … | S10 |
| 4 | Step 1 cont. | 14–20 s | Strawberry is ten letters, so ten numbers. Simple. [beat] But that's not what the AI gets. | 15 | [ANIMATE] | 10 letters → 10 numbers → ✗ | S10 |
| 5 | Step 2 · Tokens: why | 20–27 s | For AI, letter by letter makes every text far too long. Whole words? Far too many to list. | 17 | [ANIMATE] | too long · too many | S11 |
| 6 | Step 2 · the list | 27–36 s | So AI uses tokens: whole words or pieces of words, from one fixed list. GPT-4o's list has about two hundred thousand pieces. | 21 | [ANIMATE] | 200,019 pieces | S12 |
| 7 | Step 2 · whole vs pieces | 36–42 s | Common words sit on the list whole. Rare words are built from pieces: un, bel, ievable. | 15 | [ANIMATE] | Hello · un · bel · ievable | S12 |
| 8 | Step 3 · Cut | 42–46 s | Tokenization is the cutting. Let's follow our question. | 8 | [ANIMATE] | the question on a glass panel | S3 |
| 9 | Step 3 · how it cuts | 46–52 s | The tokenizer cuts at the spaces and punctuation, then checks each piece against the list. | 14 | [ANIMATE] | scan beam, 7 cuts | S3 |
| 10 | Step 3 · the detail | 52–62 s | In this sentence, strawberry is one piece. On its own, it would be three: st, raw, berry. [beat] The space in front changes the cut. | 24 | [ANIMATE] | " strawberry" = 1 · "strawberry" = st · raw · berry | S2, S3 |
| 11 | Step 3 · result | 62–65 s | Our eight-word question becomes eight tokens. | 6 | [ANIMATE] | 8 tokens | S3 |
| 12 | Step 4 · IDs | 65–71 s | Step four: each token is swapped for its ID, a row number in that list. | 14 | [ANIMATE] | HUD tags: 5299 · 1991 · … · 101830 · 30 | S3 |
| 13 | Step 4 · the row | 71–80 s | Strawberry becomes one single ID: one zero one eight three zero. The number means nothing by itself. It only points to a row. | 22 | [ANIMATE] | row 101830 → " strawberry" | S3 |
| 14 | Payoff (the reveal) | 80–85 s | [slow down] So to an AI, strawberry isn't ten letters. It's one number. | 11 | [ANIMATE] | strawberry → 101830 | S3 |
| 15 | Why it matters (honest) | 85–96 s | That's a big reason models miscount the r's: the letters are hidden inside that one ID. [beat] It's not the only reason, but it's the big one. | 26 | [ANIMATE] | X-ray · "a big reason, not the only one" | S7 |
| 16 | Step 5 · Cost | 96–103 s | And this is where it costs you. Prices and context limits are counted in tokens, not words. | 16 | [ANIMATE] | token meter · "price · context limit" | S9 |
| 17 | Step 5 · language | 103–110 s | The same greeting is six tokens in English, but ten in Tamil. Same meaning, more tokens, more cost. | 17 | [VS] | 6 vs 10 | S5 |
| 18 | Step 5 · tokenizers differ | 110–118 s | Different models cut differently too. GPT-4's older tokenizer needed forty-two tokens for that Tamil greeting. GPT-4o needs ten. | 18 | [VS] | 42 vs 10 | S5 |
| 19 | Step 5 · the rule | 118–122 s | So always count tokens with your own model's tokenizer. | 9 | [TITLE] | Count tokens with your model's tokenizer | S1 |
| 20 | Recap | 122–129 s | Quick recap: letters become numbers, text becomes tokens, tokens become IDs, and you pay per token. | 16 | [RECAP] | 4-row recap card | S10, S3, S9 |
| 21 | Takeaway | 129–134 s | [warm] For letter questions, ask the AI to spell the word out first. | 12 | [TITLE] | SPELL IT OUT FIRST | S8 |
| 22 | CTA | 134–138 s | [smile] What should I explain next? Tell me below. | 8 | [CTA] | What next? 👇 | |

Sources: beat 1 [S7] · beats 2–4 [S10] · beat 5 [S11] · beats 6–7 [S12] · beats 8–14 [S2] [S3] · beat 15 [S7] · beat 16 [S9] · beats 17–18 [S5] · beat 19 [S1] · beat 21 [S8].

**Pronunciation notes:** "tokenizer" (TOH-kuh-nai-zer) · "Tamil" (TAH-mil) · "GPT-4o" (G-P-T four-oh) → `names`: strawberry, tokenization, tokenizer, tokens, Tamil, GPT-4o, GPT-4.

**Accuracy guardrails for the edit:**
- Beat 1 is labelled "illustrative" and says "might say two" (S7).
- IDs, splits, the 200,019 list and the 42-vs-10 comparison are GPT-4o's / GPT-4's tokenizers (our test, tiktoken). Other models differ, which beat 18 says.
- Beat 15 says "a big reason… not the only reason" (S7). Beats 17–18 are our test of one greeting, not a general multiplier.
- The CTA is channel-generic ("What should I explain next?"), never "which word".

## Read-aloud version (clean: exactly what the voice says, one paragraph per beat)
Ask an AI how many r's are in strawberry, and it might say two.

Here's why. Your computer has never seen a single letter.

Every character you type is stored as a number. Capital A is sixty-five.

Strawberry is ten letters, so ten numbers. Simple. But that's not what the AI gets.

For AI, letter by letter makes every text far too long. Whole words? Far too many to list.

So AI uses tokens: whole words or pieces of words, from one fixed list. GPT-4o's list has about two hundred thousand pieces.

Common words sit on the list whole. Rare words are built from pieces: un, bel, ievable.

Tokenization is the cutting. Let's follow our question.

The tokenizer cuts at the spaces and punctuation, then checks each piece against the list.

In this sentence, strawberry is one piece. On its own, it would be three: st, raw, berry. The space in front changes the cut.

Our eight-word question becomes eight tokens.

Step four: each token is swapped for its ID, a row number in that list.

Strawberry becomes one single ID: one zero one eight three zero. The number means nothing by itself. It only points to a row.

So to an AI, strawberry isn't ten letters. It's one number.

That's a big reason models miscount the r's: the letters are hidden inside that one ID. It's not the only reason, but it's the big one.

And this is where it costs you. Prices and context limits are counted in tokens, not words.

The same greeting is six tokens in English, but ten in Tamil. Same meaning, more tokens, more cost.

Different models cut differently too. GPT-4's older tokenizer needed forty-two tokens for that Tamil greeting. GPT-4o needs ten.

So always count tokens with your own model's tokenizer.

Quick recap: letters become numbers, text becomes tokens, tokens become IDs, and you pay per token.

For letter questions, ask the AI to spell the word out first.

What should I explain next? Tell me below.
