# Package · Tokenization reel (v6) · 2026-10-09

_For the editor: brief → chosen hook → art direction → script → storyboard → publish kit. Research, YouTube analysis and QA are in the same folder._

# Brief · Tokenization

| | |
|---|---|
| Topic | Tokenization: how AI models read text |
| Format(s) | reel (YouTube Short / Instagram Reel, 9:16, faceless) |
| Viewer | global tech audience · level: curious practitioner (uses ChatGPT, not an ML engineer); default, as only the topic was given |
| **Viewer's question** | How does an AI actually read what I type, and why should I care? |
| **Archetype** | primary: concept · secondary (one beat only): none (v2 uses the concept foundation-first variant) |
| **Why this archetype** | provisional: concept (a bare concept term) → confirmed after YouTube analysis: 5 of 6 winners teach the mechanism; the two strawberry winners open on the failure/paradox, so v1 borrowed the myth-buster opening. **v2 (user review):** foundation-first: computers & text → tokens → tokenization, with the strawberry reveal as the payoff |
| **Look** | modern / futuristic tech (machine's-eye view; glass, glow, HUD tags, scan beam); never cartoon. See art-direction.md v5 |
| **Tone (voice style)** | Curious and delighted, like revealing a magic trick: slow down on the reveal ("one number"), speed up on the steps, warm and practical on the fix |
| Must include | (v3) the failure first; colour-blocked sections; progress steps; a recap card; then: how computers store text (letters = numbers); tokens vs letters vs words; tokenization on one word (real token IDs); why it matters (cost, language); the fix |
| Running example | "strawberry": one token (101830) in a sentence; st · raw · berry on its own (S2–S3) |
| Angle (one sentence) | Build up from how computers read text to what an AI actually receives for one word, then use it to explain the famous miscount, what you pay, and the fix, in about 50 s with real token IDs, opening on the famous failure |
| Chosen hook | v3–v6: "Ask an AI how many r's are in strawberry, and it might say two." (hooks.md #10, 19/20), then the foundation line. The strawberry reveal is the payoff at beat 7 |
| **Depth** | benchmark depth (`references/tokenization-reel.mp4`): five numbered steps on one running sentence, the in-context vs standalone split, IDs as row numbers, tokenizers differ, honest limits, recap |
| Runtime target | v6: ~2:20 at ~2.3 words/s (the benchmark's calm pace) (winners: 96–169 s at 3.0–3.2 w/s; we're tighter and vertical) |
| Open questions / unverified | Token IDs and splits are for GPT-4o's tokenizer; other models split differently (said on screen as "GPT-4o's tokenizer") |

---

**Pick (v3):** #10 (19/20). It opens on the failure the winners use, its first frame works on mute, and it doesn't echo
the reference reel. "Might say two" keeps it accurate (S7). The foundation line ("Your computer has never seen a
single letter") follows as beat 2, keeping the user's computers → tokens → tokenization order.

---

# Art direction · Tokenization (v5–v6: modern / futuristic)

_v4's kitchen world (cream board, cartoon strawberry, wooden shelf) read as a children's explainer; the user asked for
"modern and futuristic rather than old and kids centric". v5 keeps the running object and the structure, and renders
everything as technology._

## Concept → visual world
- **Central metaphor:** **the machine's-eye view.** We're inside the model's input pipeline: text arrives on a dark
  console, a scan beam slices it into tokens, each token gets a HUD data tag, and the pieces stream into the model.
- **Running object:** the word **strawberry**, typed on the console, flipped into code numbers, scanned into tokens,
  tagged with its ID, collapsed into **101830**, X-rayed, and replayed in the recap. No fruit illustration.
- **Mood:** a sci-fi terminal × a clean product keynote × a data dashboard: glass, glow, thin lines, generous dark space.

## Palette (from the metaphor; modern/futuristic)
| Section role | bg | text | accent | accent2 | Why it fits |
|---|---|---|---|---|---|
| `void` (main) | #0A0F1E deep navy | #E8F0FF ice | #4DF2C2 electric mint | #7C9CFF electric blue | the inside of the machine |
| `core` (the reveal) | #141033 deep indigo | #E8F0FF | #FF5C8A hot pink | #4DF2C2 | the moment the model "sees" |
| `signal` (why it matters) | #0E1B2A teal-navy | #E8F0FF | #FFD166 amber | #4DF2C2 | numbers, cost, signal |

Section order: void (cold open) → core (computers → numbers) → void (tokens, scanning) → core (the reveal) →
signal (cost, 6 vs 10) → void (recap) → signal (tip) → void (CTA). Pattern breaks come from the hue shift plus the
wipes; all sections stay dark so glow reads.

## Motion language
- **Verbs:** TYPES · FLIPS · SCANS (beam) · SPLITS · TAGS (HUD) · COLLAPSES · X-RAYS · STREAMS · COUNTS UP · FILLS (bars).
- **Continuous spans (v6):** A (beats 2–4), B (5–7), C (8–11), D (12–15), E (16–18); the camera pushes in on every reveal.
- **Depth:** glass panels, glow halos, a perspective grid floor under the scan scene, vignette + light + grain on every section.
- **Transitions:** wipe up in the next section's colour (primary); wipe from the right every third change (accent).
- **Music:** `cc0/beat-one` (electronic, techy); alternatives `cc0/backbeat`, `cc0/fresh-focus`. The user auditions.

## Checks
- [x] Palette and layout differ from the user's reference reel
- [x] Modern/futuristic: no cartoon or kitchen objects; glass, glow, HUD, scan beam, grid, bars
- [x] Every element has a motion verb; the running object persists; ≥ 2 metaphors beyond chips (scan beam, HUD tags, X-ray, bars)

---

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

---

# Storyboard · Tokenization · reel (9:16) · archetype: concept, foundation-first (v6: benchmark depth, modern / futuristic)

_Look and motion from `art-direction.md` v5 (the machine's-eye view; palette void / core / signal). Transparent, continuous
clips per span; the camera pushes in on every reveal. Tracker pills: 1 Numbers · 2 Tokens · 3 Cut · 4 IDs · 5 Cost.
Spans: A = 2–4, B = 5–7, C = 8–11, D = 12–15, E = 16–18. No sources on screen; captions low, boxless._

| # | Time | Spoken line | Tag | Section | What the visual shows (motion verb per element) | Transition in | Text overlay | SFX |
|---|---|---|---|---|---|---|---|---|
| 1 | 0–5 s | Ask an AI how many r's… might say two. | [ANIMATE] | void | Phone frame on a perspective grid; the question bubble FLOATS from frame 1; typing dots BOUNCE; the reply POPS in and gets a ✗; the camera LEANS IN | (first frame) | illustrative | pop, stamp |
| 2 | 5–9 s | Here's why. Your computer has never seen a single letter. | [ANIMATE] | core | span A: a huge "A" + cursor BLINKS, PULSES on "never", FLIPS into **65** on "letter"; camera PUSHES IN | wipe up | A → 65 | ding |
| 3 | 9–14 s | Every character… Capital A is sixty-five. | [ANIMATE] | core | span A: 65 SHRINKS to "A = 65"; strawberry's letters TYPE in a 2×5 grid; each FLIPS its number in; the three 114s get rings | (continuous) | strawberry = 10 numbers | ticks |
| 4 | 14–20 s | Strawberry is ten letters, so ten numbers… not what the AI gets. | [ANIMATE] | core | span A: the 10 numbers LINE UP and STREAM toward a model glyph; on "not" a ✗ STAMPS and they BOUNCE back | (continuous) | 10 → ✗ | riser, stamp |
| 5 | 20–27 s | For AI, letter by letter… Far too many to list. | [ANIMATE] | void | span B: a letter ribbon SCROLLS ("far too long"); 30 word cards RAIN down ("far too many") | wipe up | far too long · far too many | stamp |
| 6 | 27–36 s | So AI uses tokens… two hundred thousand pieces. | [ANIMATE] | void | span B: the pile SLIDES off; the token list on slate racks SLIDES in; tiles PULSE on "tokens"; the counter COUNTS UP to **200,019 pieces**; camera PUSHES IN | (continuous) | 200,019 pieces | riser |
| 7 | 36–42 s | Common words sit on the list whole. Rare words… un, bel, ievable. | [ANIMATE] | void | span B: "Hello" is PULLED OUT whole; un · bel · ievable SNAP together below | (continuous) | whole word · pieces | pops |
| 8 | 42–46 s | Tokenization is the cutting. Let's follow our question. | [ANIMATE] | void | span C: a glass panel over a grid floor; the question TYPES onto it | wipe from right | the question | tick |
| 9 | 46–52 s | The tokenizer cuts at the spaces… checks each piece against the list. | [ANIMATE] | void | span C: a glowing SCAN BEAM sweeps and SPLITS at 7 points with sparks; each piece gets a ✓ as it is "checked" | (continuous) | 7 cuts · ✓ | tick ×7, ding |
| 10 | 52–62 s | In this sentence, strawberry is one piece. On its own, three… The space in front changes the cut. | [ANIMATE] | void | span C: two rows: " strawberry" (one chip, highlighted) vs "strawberry" → st · raw · berry (three chips); a leading-space marker "␣" LIGHTS UP on "space" | (continuous) | ␣strawberry = 1 · strawberry = 3 | pop ×3 |
| 11 | 62–65 s | Our eight-word question becomes eight tokens. | [ANIMATE] | void | span C: the 8 chips in 3 rows; "8 tokens" POPS; camera PUSHES IN | (continuous) | 8 tokens | ding |
| 12 | 65–71 s | Step four: each token is swapped for its ID, a row number in that list. | [ANIMATE] | core | span D: HUD data tags with the real IDs SWING IN under the chips | wipe up | 5299 · 1991 · 428 · 885 · 553 · 306 · 101830 · 30 | pop ×8 |
| 13 | 71–80 s | Strawberry becomes one single ID… It only points to a row. | [ANIMATE] | core | span D: the others SLIDE away; a glass "list" panel SCROLLS to row **101830** → " strawberry"; "no meaning by itself" fades in | (continuous) | row 101830 | riser |
| 14 | 80–85 s | So to an AI, strawberry isn't ten letters. It's one number. | [ANIMATE] | core | span D: the 10 code numbers COLLAPSE into one giant **101830**; camera PUSHES IN | (continuous) | strawberry → 101830 | ding |
| 15 | 85–96 s | That's a big reason models miscount the r's… not the only reason, but the big one. | [ANIMATE] | core | span D: X-ray SWEEPS the box; ghost letters (r's lit) APPEAR then FADE; "a big reason, not the only one" | (continuous) | letters hidden inside | riser, stamp |
| 16 | 96–103 s | And this is where it costs you. Prices and context limits are counted in tokens… | [ANIMATE] | signal | span E: chips DROP into a glass token meter that COUNTS UP; "price" and "context limit" labels LIGHT UP | wipe up | tokens · price · context | ticks |
| 17 | 103–110 s | The same greeting is six tokens in English, but ten in Tamil… | [VS] | signal | span E: two glowing bars FILL: English 6, Tamil 10 | (continuous) | 6 vs 10 | riser ×2 |
| 18 | 110–118 s | Different models cut differently too. GPT-4… forty-two… GPT-4o needs ten. | [VS] | signal | span E: the bars RE-LABEL to GPT-4 vs GPT-4o for the Tamil greeting and FILL 42 vs 10; camera PUSHES IN | (continuous) | 42 vs 10 | riser, ding |
| 19 | 118–122 s | So always count tokens with your own model's tokenizer. | [TITLE] | signal | Headline "COUNT TOKENS WITH YOUR MODEL'S TOKENIZER" | wipe from right | | whoosh |
| 20 | 122–129 s | Quick recap: letters → numbers, text → tokens, tokens → IDs, you pay per token. | [RECAP] | void | Miniature replay, 4 rows, each SLIDES in on its words | wipe up | Recap | pop ×4 |
| 21 | 129–134 s | For letter questions, ask the AI to spell the word out first. | [TITLE] | signal | Headline "SPELL IT OUT FIRST" + sub line RISES | wipe up | | pop |
| 22 | 134–138 s | What should I explain next? Tell me below. | [CTA] | void | Question bubble RISES; Follow pill POPS | wipe up | What next? 👇 | pop |

---

# Publish kit · Tokenization (reel)

## Title options
_Evidence: the winners' titles pair the strawberry question or "what is a token" with a short promise. Our words, their patterns._
1. To AI, "strawberry" is one number
2. What ChatGPT actually sees when you type
3. Why AI miscounts the r's in strawberry

**Pick:** #1. It matches the hook, and it's curious and true.

## Thumbnail / cover concept
Dark background. "strawberry" crossed into an amber box reading **101830**. Text (≤4 words): **"AI sees THIS"**.

## Caption / description
To an AI, "strawberry" isn't 10 letters. It's one number: 101830 (in GPT-4o's tokenizer). In five steps on one
sentence: letters → numbers → tokens → IDs → cost. Why models miscount letters, why the same greeting costs more in
Tamil than in English, why GPT-4 and GPT-4o cut the same text differently, and the one habit that fixes letter questions. Token IDs and splits are from our own test with OpenAI's open-source tokenizer library.

## Sources (for the description / pinned comment)
- What are tokens and how to count them (OpenAI Help): https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them
- Code points / Unicode (MDN): https://developer.mozilla.org/en-US/docs/Glossary/code_point
- Tokenizers (Hugging Face LLM course): https://huggingface.co/learn/llm-course/chapter2/4
- Language Model Tokenizers Introduce Unfairness Between Languages (Petrov et al., NeurIPS 2023): https://arxiv.org/abs/2305.15425
- Why LLMs struggle to count letters (arXiv 2412.18626): https://arxiv.org/abs/2412.18626
- Our test: token IDs, splits and counts measured with OpenAI's open-source tiktoken (o200k_base, GPT-4o's tokenizer), 2026-10-09

## Hashtags
#AI #ChatGPT #LLM #Tokenization #MachineLearning #TechExplained #Shorts

## Pinned comment
What should I explain next? Drop it below 👇 (And if you want a specific word run through the tokenizer, say which.)

## Repurposing notes
- Long-form explainer: expand beat 7 into a chapter on the "language tax" (Petrov et al.: up to 15×), with a live tokenizer demo.
- Carousel: 5 slides (strawberry → 101830 · the 8 IDs · st/raw/berry · English 6 vs Tamil 10 · two tips).
