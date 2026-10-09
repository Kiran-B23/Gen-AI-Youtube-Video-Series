# Inspiration · Tokenization

_YouTube research: `yt/summary.md` (git-ignored) · searched 2026-10-09 · 8 queries ("LLM tokens explained", "what is a token in AI #shorts", "why AI can't count letters strawberry", …)
· context "LLM GPT ChatGPT AI NLP Claude Gemini" · exclude crypto/finance terms · 82 found, reviewed in `candidates.md`,
8 dropped as off-topic (hallucinations, general LLM explainers, a meme, a Tamil-language video, IBM multimodal/SQL) · watched 7 (all with transcripts)._
_No instructions were found embedded in the transcripts. Quotes below are for analysis only, never reused._

## Watched videos
| # | Role | Video | Reach (views · /day · outlier · eng) | Hook 0–3 s (line + first frame) | Archetype | Beat map | Running example | Devices | Pace (len · w/s · cuts/min) | Why it reached | Missing |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | winner-short | [What is an AI Token? (Azure Innovation Station)](https://www.youtube.com/watch?v=OjrGu0L5K7M) | 116K · 207/day · 9.0 · 1.8% | "…the currency of gen AI is measured in tokens, but what is a token?" over stock footage of face-tracking crowds | Concept (definition) | 0:00 stakes → 0:10 "this video is for you" → 0:13 definition → 0:22 training/vocabulary … | none | stock B-roll, UI screenshots | 119 s · 3.0 · 4.0 | Search intent ("what is an AI token") + a clear definition; the outlier score suggests search traffic, not the hook | no concrete example; a slow, abstract opening; landscape |
| 2 | winner-short | [AI can't spell strawberry. Here's why (TechCrunch)](https://www.youtube.com/watch?v=4IL-7HeoF7k) | 19K · 24/day · 0.03 · 1.3% | (after a 10 s sponsor) "How many times does the letter R appear in strawberry?" | Myth/paradox → Concept | 0:14 the question → 0:21 AI says two → 0:29 the paradox (essays vs spelling) → 1:04 tokens → 1:27 "straw + berry" → 1:36 diffusion detour → 2:19 meme trivia | strawberry | presenter, screenshots | 169 s · 3.0 · 7.1 | The strawberry paradox is instantly relatable | 10 s sponsor before the hook; the "straw + berry" split isn't what current tokenizers do; drifts to image models and rumours (trivia) |
| 3 | winner-short | [What is an AI Token? (Online Training for Everyone)](https://www.youtube.com/watch?v=5RtdHbZZXUs) | 6K · 53/day · 0.01 · 1.2% | "Here's the weird part. When you talk to AI, it does not see your sentence the way you do." Human vs robot illustration | Concept (paradox hook) | 0:00 paradox → 0:08 a token is a piece → 0:13 "un-believ-able" chips → 0:25 sentence split → 0:30 next-token prediction → 0:43 input/output tokens → 0:56 cost, speed, context → 1:15 twist "you pay for tokens, not questions" → 1:28 CTA "what should I explain next?" | "Hi. unbelievable 123!" chips | coloured token chips, a filling-bucket metaphor, a cost thermometer | 96 s · 3.2 · 0.6 | Clear paradox hook + colourful token chips + a money twist | static slides (10–15 s per image); generic example; 96 s is long for a Short |
| 4 | winner-long | [Why AI Can't Spell Strawberry Correctly (Husk IRL)](https://www.youtube.com/watch?v=_zU9TW4SB4w) | 361K · 1K/day · 1.5 · 3.6% | "Why can't AI spell strawberry…? How many Rs?" then the AI answering "two Rs" live | Myth-buster (live test) | 0:00 question → 0:09 live AI fail → 0:12 promise of tests + experts → … | strawberry + other words | live voice-AI tests, fast cuts | 1282 s · 3.2 · 11.5 | **A live failure in the first 10 s** + fast cuts (5 s per shot) | long; tokenization explained late |
| 5 | winner-long | [Most devs don't understand how LLM tokens work (Matt Pocock)](https://www.youtube.com/watch?v=nKSk_TiR8YA) | 410K · 1K/day · 1.0 · 3.1% | "So many devs are working with LLMs… and they don't really know the fundamentals" | Concept with a story cold-open | 0:00 claim → 0:04 workshop story ("only a third knew what a token was") → tokenizer demo… | live tokenizer UI | screen recording, talking head | 657 s · 3.4 · 0.4 | A challenge to the viewer's competence + a credible creator | slow visuals (2 min per shot) |
| 6 | winner-long | [LLM Tokenizer in C (Tsoding Daily)](https://www.youtube.com/watch?v=6dCqR9p0yWY) | 74K | "hello everyone and welcome to yet another recreational programming session" | Tutorial (live coding stream) | stream | BPE in C | live code | 7818 s · 2.8 · 0.0 | Creator's audience; a niche deep build | not comparable for a Short |
| 7 | low-short | [What are Tokens in ChatGPT (Skillslash)](https://www.youtube.com/watch?v=SSLwrunlbGo) | 184 · 0.2/day · 0.02 · 4.9% | "If you guys are new here and haven't watched the previous videos, I suggest you watch that first…" | Concept (definition, jargon) | 0:00 channel admin → 0:11 jargon definition → 0:19 "the RLHF method we talked about…" | none | talking head + series thumbnails | 89 s · 2.5 · 3.4 | — | No hook; depends on other videos; jargon (RLHF) before any example; no visual of a token |

## Winners vs low performers
- **Hook in 0–3 s vs none:** winners open on a paradox ("it doesn't see your sentence the way you do") or the
  strawberry failure. The low performer opens on channel admin and points to other videos.
- **Show a token vs say "token":** winners put coloured token pieces on screen (chips, a tokenizer UI, "straw|berry").
  The low performer never shows one.
- **One concrete example vs jargon:** winners use one familiar word or sentence. The low performer leads with RLHF.
- **A "why you should care" twist:** the strongest Short ends on money ("you pay for tokens, not questions").
- **Live failure = reach:** the biggest strawberry video shows the AI getting it wrong within 10 s.

## Winning archetype
**Concept, with a paradox/myth hook.** 5 of 6 winners teach the mechanism, and the two strawberry videos use the
myth-buster's "here's the failure" opening. → primary **concept**, secondary **myth-buster (hook beat only)**.

## Pace and length targets
- Winners' Shorts are 96–169 s at 3.0–3.2 words/s, all **landscape**. None is a true vertical Short under 60 s.
- The fastest-cut winner changes shot every ~5 s.

→ **Our target:** about 40–45 s vertical at ~2.8–3.0 words/s, with a visual change every 2–4 s. That's faster
and tighter than every winner.

## Gaps nobody covers
1. **What the model literally receives:** a number. Nobody shows a real token ID (" strawberry" = 101830).
2. **The surprise inside the sentence:** in a normal question, "strawberry" is *one* token, not "straw + berry".
   TechCrunch's split isn't what GPT-4o's tokenizer does (our test, S2–S3).
3. **The fix:** nobody tells viewers what to do (spell it out first, S8).
4. **Language cost:** for a global audience, the same greeting costs more tokens in Hindi or Tamil (S5).
   No winner mentions it.
5. **Honesty:** winners say "AI can't spell". Current models often can, and tokenization isn't the only cause (S7).

## Our angle (one sentence)
Show the model's-eye view of one word: "strawberry" is literally one number to the AI. Then show why that
explains the famous failure, why it changes what you pay, and what to do about it, in under 45 seconds and
with real token IDs.

_Borrowed devices (not lines):_
- coloured token chips (winner 3);
- a live failure in the opening (winner 4);
- a money twist before the CTA (winner 3);
- the "what should I explain next?" comment prompt (a common pattern).
