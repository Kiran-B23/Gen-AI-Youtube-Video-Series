# Writing scripts that hold attention

Viewers decide in the first second whether to keep watching, and they leave
the moment a video feels like a feature list. Write for a friend who is
smart but busy, not for a spec sheet.

## Structure (adapt, don't force every beat)

1. **Hook (s01)**: a scene, a surprising contrast, or a big number with
   tension. Show the feeling before the definition.
   - "It's 3 AM. You're asleep. But your AI just fixed a bug."
   - "40 million views. $40M funding. And it can't write a single word."
2. **The one-liner**: a sticky comparison viewers can repeat.
   - "ChatGPT waits. A dot doesn't." / "LLMs write. Jev decides."
3. **Analogy**: map the new thing onto something everyday (assistant at the
   next desk, reflex vs deliberate thinking).
4. **Open loop**: promise something later ("stay till the end, there's a
   catch most people will miss") and pay it off.
5. **How it works**: 2 to 3 steps max, concrete, with one running example.
6. **Real story**: a true anecdote from the source material that makes
   people feel the benefit ("forgot to send an invoice...").
7. **"What would YOU do?"**: personas the audience recognizes (developer,
   creator, student, freelancer, small business).
8. **The worry**: answer the obvious concern (safety, privacy, cost, does it
   work in my country) before viewers ask it in comments.
9. **The catch**: honest limitations, labeled. This builds trust.
10. **Big picture**: why this matters beyond the product.
11. **CTA**: a specific question that invites comments, then follow.

## Voice and wording

- Short spoken sentences. Contractions. Rhetorical questions.
- One idea per scene line. If a line needs "and also", split it.
- Write numbers the way they're spoken ("seventy-five times faster").
- Attribute claims in plain speech ("in their own demo", "testers at Every
  found", "its creator says").
- Paraphrase sources; never read out long quotes from articles.
- Avoid hype words with no proof (revolutionary, game-changer).

## Budget

- About 2.8 spoken words per second at creator pace.
- Hard cap 180 seconds (≈ 480 words). Default target 130 to 170 seconds.
- If the topic needs more, propose a two-part series with a cliffhanger
  ending Part 1 and a fresh hook opening Part 2.

## Output format for script.md

```
# <Title>
Target: ~<N> words, ~<M> seconds

**s01:** <spoken line>
**s02:** <spoken line>
...

## Sources
- s02: <publisher, date, URL>
```

Also propose 2 to 3 title options and the frame to use as the cover image.

## Format B: teaching explainer ("how does X work")

Use this instead of the news format when the goal is understanding. This is
the structure of the channel's best reference reel.

1. **Question hook** on the first frame ("How does AI read your text?"),
   then a one-line surprise ("It only reads numbers.").
2. **One running example** chosen early and followed to the end ("Let's
   follow one sentence: 'Tokenization matters.'"). Pick something short,
   concrete and reusable in every step.
3. **Numbered chapters** ("Step one. Cut the sentence."), 4 to 6 steps.
   Each chapter changes one visible thing about the running example.
4. **Progress counters** between chapters so viewers feel momentum
   ("Now we have three pieces" → "five tokens" → "seven tokens").
5. **Local analogies** the audience lives with. For this channel's Indian
   audience: lakh/crore numbering, "like a roll number in class", UPI,
   railway tickets, cricket scorecards. One analogy per tricky idea.
6. **Practical takeaway** viewers can use ("always count tokens with your
   model's own tokenizer").
7. **Recap card** listing all steps (people pause and screenshot this,
   which boosts saves).

Keep the hard cap: 180 seconds. Six chapters usually fit in ~165 seconds if
each chapter averages 3 to 4 short lines.
