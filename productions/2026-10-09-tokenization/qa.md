# QA · Tokenization reel (v3 script · v4 visuals)

`lint_package.py`: 21/21 after fixes. One linter false positive (editor-note bullets read as spoken text)
was fixed in the linter itself and re-verified on both fixtures.

## Hook & structure
- [x] The first spoken line *is* the hook (the strawberry failure). The first frame is a big chat bubble already on screen and works on mute. The hook doesn't echo the reference reel (checked)
- [x] The hook is true ("might say two", S7) and paid off: beats 2–7 explain why, ending on strawberry = 101830; beat 8 closes the loop
- [x] Archetype stated in brief.md with the viewer's question and the evidence for it (inspiration.md: 5/6 winners teach the mechanism; the strawberry winners open on the failure)
- [x] The script follows the concept archetype's foundation-first variant (hook → foundation → bridge → tokens → tokenization → reveal → why it matters → takeaway → CTA), as the user asked
- [x] Concept must-haves:
  - the mechanism is shown (`[ANIMATE]` ×4);
  - one analogy at most: none used;
  - every number sourced;
  - the takeaway is an action.
- [x] Concept don'ts avoided:
  - no history or inventor trivia;
  - mechanism steps: tokens → tokenization → IDs (3, ≤ 3);
  - "tokens" and "tokenization" are defined by what they do
- [x] One running example: "strawberry" from beat 2 (as letter-numbers) to beat 7 (as one hidden number)

## Content
- [x] Zero trivia lines (no BPE history, vocabulary sizes, or meme backstory)
- [x] Every fact has a source tag that resolves in research.md, with date + label (S3, S5, S7, S8, S9, S10, S11, S12)
- [x] Our-test numbers are labelled "GPT-4o's tokenizer"; character numbers are labelled "Unicode"; no company claims in v2
- [x] At least one honest catch:
  - beat 8 says "a big reason", not "the reason" (S7);
  - beat 10 covers the language cost;
  - beat 5 shows words splitting into pieces (un · bel · ievable)
- [x] YouTube analysis done: 7 watched (3 winning Shorts, 3 winning long-form, 1 low performer); winners-vs-low findings written
- [x] Differentiated angle stated (real token IDs, the in-sentence surprise, the fix, the language cost) and no copied lines

## Timing & pacing
- [x] Runtime within budget: 138 words ≈ 51 s (30–60 s)
- [x] Every beat has a visual tag; no beat over 6 s; a visual change at least every ~3 s (clips animate throughout; HTML scenes drift; sections change colour); numbers on screen as they're spoken
- [x] Runtime and pace: winners run 96–169 s at 3.0–3.2 w/s. We're deliberately tighter (50 s vertical) because every winner was a long landscape video. Reason written in the brief

## Delivery & ending
- [x] Reads naturally aloud; delivery cues present; no words from the avoid list
- [x] Clean read-aloud text present; captions read standalone (no beat opens on an unclear "it"); pronunciation notes for tokenization and Tamil
- [x] Recap card before the CTA (save-worthy); CTA: a comment question
- [x] Publish kit complete (3 titles, thumbnail ≤ 4 words, caption with sources, hashtags, pinned comment, repurposing notes; chapters not applicable for a reel)

## Notes for the edit
- Label the IDs "GPT-4o's tokenizer". Don't claim every model splits text this way.
- Beat 7 is one measured greeting (our test), not a general multiplier.

## v3 comparison fixes (learnings.md, 2026-10-09)
- [x] Hook no longer echoes the reference reel; opens on the failure (the winners' strongest opening)
- [x] Strong first frame; colour-blocked sections; full-screen borderless visuals
- [x] 4-step progress tracker; recap card; the shelf metaphor; a cost meter; giant 6-vs-10 numbers
- [x] Pace target ~3.0 w/s (voice style + trimmed scene starts); larger source labels

## v4 visual design (art-direction.md)
- [x] Palette derived from the concept (leaf / board / berry, the kitchen world), not the reference reel's
- [x] Continuous spans A–D; the running object (strawberry) transforms through most of the video; motion verbs per element in the storyboard
- [x] Transparent clips (no box), section wipes (1 primary + 1 accent), sound cues on every visible event, CC0 music
- [x] `qa` motion check: no scene still for more than 2.5 s

## v5 theme (user: "modern and futuristic rather than old and kids centric")
- [x] Kitchen/cartoon objects removed; glass panels, glow, HUD tags, scan beam, grid floor, data bars
- [x] Palette void / core / signal (deep saturated bases, electric accents), derived from the machine's-eye-view concept
- [x] No sources on screen; captions low; zero OVERLAP warnings on the v5 build

## v6 (benchmark depth, generic CTA)
- [x] 22 beats, 322 words ≈ 2:20 at 2.3 w/s; five numbered steps (Numbers · Tokens · Cut · IDs · Cost) on the one running question
- [x] Benchmark details present: in-context vs standalone split (" strawberry" = 1 vs st·raw·berry), IDs as row numbers, tokenizers differ (42 vs 10), language cost, honest "not the only reason"
- [x] CTA channel-generic ("What should I explain next?"); publish kit pinned comment updated
- [x] Re-hooks every 30–40 s: "But that's not what the AI gets" (20 s), "Let's follow our question" (42 s), the reveal (80 s), "this is where it costs you" (96 s)
