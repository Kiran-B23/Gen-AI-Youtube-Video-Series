# Content plan · Jev session (on-camera teaching session + Colab hands-on)

_Written by the `content-plan` agent on 2026-10-13, after research, before the script. The script follows this plan; the
`script-review` agent checks it against this file. Format: one instructor, house script format of `references/archive-2026-10/scripts/`
(Hook → "Hi everyone, I'm XXXX" + agenda → prose sections → `<<HANDS-ON>>` → Outro), 16–20 min recorded, ~2,300 spoken words._

_Sources re-checked online on 2026-10-13: typesafe.ai, promptfoo provider docs, Layer3 Labs limits + pricing guides, innFactory,
flaviocopes (confidence), arXiv 2609.24574 abstract, arXiv 2609.26550, the DEV eight-day test, Creative AI News, Vals AI. Corrections
to `research.md` are listed at the end; none blocks the plan._

## Viewer's question
"Everyone's talking about Jev. What is it, can I trust its answers, and when should I use it instead of ChatGPT?"

## Core message
Jev answers with a fast, cheap probability, not text: act when it's sure, send the rest to an LLM.

## Must include
| # | Point (concrete fact / mechanism / example) | Source | Label |
|---|---|---|---|
| 1 | **What it does, shown on the SMS:** you give Jev the message (the "state") and a typed question; it sends back a number, not a sentence. The code literally calls `system_one`: TypeSafe's name for quick, glance-style decisions (one line, System 1 vs System 2: spotting a scam SMS vs solving a JEE problem). | S1, S12 · notebook cell "The swap" | official docs + company claim |
| 2 | **Three question types, all in one call:** Noul (yes/no → one probability), Choice (pick one of *your* options → a probability per option), Score (a position on your rubric). Adding questions adds a few input tokens but leaves response time "largely unchanged". Shown: scam? / which scam type? / how much pressure? on the same SMS. | S12, S13 · notebook "Ask more" | official docs (reported) |
| 3 | **Claim 1, "zero hallucinations", tested:** what it really guarantees is the *shape* of the answer (always a valid number, nothing to parse), shown against the chatbot's JSON reply. It does not guarantee the answer is right: our race shows ⟦N wrong⟧ of 100, ⟦M⟧ of them with high confidence. | S8 · S16 (our test, slots) | company claim + our test |
| 4 | **Claim 2, "the answers are free", tested:** output tokens aren't billed; you pay only for what you send. Our 100-message race measures time, cost per 1,000 messages (also in rupees at the day's rate) and accuracy against the chatbot (`gemini-3.8-flash`, JSON mode). Independent check at scale: across 7,977 human-labelled items, Jev cost a median 44× less than 19 LLMs but trailed the best LLM on 14 of 15 tasks (median 11.6 macro-F1 points). | S2, S5 · S16 (slots) | official docs + independent + our test |
| 5 | **Why a threshold can work (the Concept chapter):** TypeSafe trains for calibration: across many answers, ones given 0.8 should come true about 80% of the time (weather-forecast analogy). It's about groups, so one answer at 0.99 can still be wrong. Independent: better calibrated than 16 of 19 LLMs tested, but three frontier models did better. | S11, S5 | company claim (reported) + independent |
| 6 | **The fix, measured:** a 3-line threshold (DRS "umpire's call" band): sure → act, unsure → second opinion from an LLM. Our slider shows the trade (stricter = fewer automatic mistakes, more sent to the LLM: ⟦slots⟧). Independent: routing low-confidence items to an LLM matched or beat the LLM alone at a quarter to half of its cost [S5]; at a 0.9 threshold with GPT-6 as fallback, about 99% of GPT-6's judging accuracy at roughly half its fee [S6]. The Gradio app is this cascade in one function (`make_checker`). | S5, S6 · notebook slider + app | independent + our test |

The person-level verdict (who should use it, who shouldn't) is built from points 2–6 and S14; it adds no new facts.

## Leave out
| Item | Why it's out |
|---|---|
| Founder, $40M seed, launch date, signup open/pause dates, adoption list (Vercel, LangChain, OpenRouter…), Hacker News points | Trivia (locks in brief; style rules). All were in the 2026-09-30 drafts, `sessions/01-jev/option-A` and `option-B` `script.md`; don't carry any line over. |
| CEO's Hacker News quote ("possible to be confidently wrong") and "Our number is not empirical" fine print | Single-source forum/press; not re-verified on 2026-10-13. The same point is made from S11 (calibration holds for groups, not one answer) and from our own confident mistakes. |
| *Every* magazine 6-of-7 test, fake-job-postings benchmark, JevBench 63 vs Laya 30 | Unverified numbers from the 2026-09-30 drafts (research.md cut them). |
| 67.8% vs 74.1% on TypeSafe's benchmark [S4] | Single press source (Creative AI News; not on the Vals page it's paired with); it measures agreement with two frontier models, not correctness, and the comparator is "Sol". The caveat is longer than the claim; S5 (independent, human labels) carries the accuracy gap. |
| "$0.21 vs $0.34–$62.99" and "≈300× cheaper" from S5 | Not in the paper's abstract; use the abstract's verified "median 44× lower cost". Restore only if the presenter checks the paper's cost table before recording. |
| "193.6× faster, 444.6× cheaper" as a section | One spoken line at most, as the bridge into the race: their homepage doesn't name the comparator, and independent testers got 0.6× to 478× cheaper depending on the model compared [S10]. Then "so let's measure our own." |
| Per-million token price ($0.042 / $42 per billion) as a spoken figure | Price detail; the viewer gets the cost from our own race (cost per 1,000 messages). Description only. |
| Token limits (32k vs 64k) | Sources disagree (Layer3 "roughly 32,000 per call"; innFactory "64,000 combined, 32,000 for state + longest question") and an SMS is nowhere near either. |
| RLCD internals, the confidence formula ((3 × top − 1)/2) | Only the effect matters (an 80% that means about 80%). |
| Laya | Not about the core message; its only numbers come from its makers' card (base 0.362 vs a third-party "indicative" Jev 0.727), so it needs a longer caveat than the claim; the notebook doesn't use it, so nothing is shown inside the session (S4 rule); and it's half as good out of the box, a poor pointer for beginners. Our own run costs well under $1, so "free alternative" isn't needed for access. Put the model-card link in the description's "Going further". |
| Renamed-options probe (new notebook cell) | Doesn't earn its place: see "Probe decision" below. S7 stays as one spoken line. |
| HaluEval cascade, "0.36% of GPT-6's fee", reliability plot | Too detailed; the reliability plot is noisy with 100 messages (the helper says so). |
| How to get access (signups paused, OpenRouter, Vercel gateway) | Setup goes in the description doc (P8). One spoken line: "we'll use it through OpenRouter; setup is in the description." |
| Other creators' demos (Doom, wiki race, checkers, flight search) and the "charged twice" support-ticket example | Borrowed (locks; inspiration.md). |
| References to other NxtWave videos | Standalone rule S1/W9. |

## Catch decision
**Catch:** include
**Why:** It changes how the viewer uses Jev and the hype hides it. "Zero hallucinations" [S8] guarantees the answer's format, not its truth. Jev trails the best LLM on 14 of 15 independent tasks [S5], a single confident answer can still be wrong [S11], and its own docs say it "cannot" do "adversarial defense" [S14, Layer3 limits]. That last one matters for a scam filter, because scammers write to fool filters. Exact point: **"Its answers always come back in the right shape, but they can be wrong and still sure of themselves. So you set a threshold and send the unsure ones to an LLM."** In this session the catch is the story: it's the hook's open loop ("one claim only half survives"), shown live in the confident-mistakes step and paid off by the threshold fix. It is not a separate "but there's a catch" segment.

## Running example
**The electricity-bill SMS** (the notebook's `sms`, phone number masked as "9XXXX X7788"): "Dear consumer, your electricity power will be disconnected tonight at 9:30 PM because previous month bill was not updated. Call officer immediately." Every Indian viewer has had one. A wrong call has an obvious cost either way (a missed scam vs a blocked genuine alert). It's a pick-from-fixed-options decision, which is exactly Jev's job, and it leads into the Indian English and Hinglish tricky set and the 100-message race. It runs from the hook, through the swap and the three questions, to the app's first example. No other running object. Safety: the notebook's own line "a learning project, not a safety product" is said once, and 1930 / cybercrime.gov.in goes as a lower third + pinned comment.

## Claim safety
| Tempting wording | What the source supports | Safe wording | Source |
|---|---|---|---|
| "It can't hallucinate" / "zero hallucinations" (as ours) | TypeSafe's homepage: "Zero Hallucinations"; typed outputs | **Unsafe as ours.** "TypeSafe advertises 'zero hallucinations'. What that really guarantees is the shape: you always get a valid number back. It doesn't guarantee the number is right." | S8 |
| "It doesn't write" / "never writes a word" | Layer3 limits: it lacks text generation; innFactory: not suited to anything that needs text | **Safe:** "Jev doesn't write text back. It returns numbers." / "it didn't write a single word back" (about our call) | S14, S12 |
| "Answers are free" / "Jev is free" | Promptfoo provider docs: "Output tokens are free"; Layer3: "nothing for output"; input is billed | **"Free" is safe only for output:** "You pay for what you send in; the answers aren't billed." **Unsafe:** "Jev is free", "costs nothing". Hook: "its makers say the answers are free", which is their pricing, not ours. | S2 |
| "Decides in a tenth of a second" | Vendor: 70–500 ms; TypeSafe's own demo: 0.114 s; independent: about 0.1 s server-side (~105 ms one run) | **Safe:** "about a tenth of a second on their servers, in independent tests". From Colab the round trip will be longer, so on screen use **our** measured "typical time per message" ⟦slot⟧. If the hook keeps "a tenth of a second", attribute it. **Unsafe:** "always", "every call". | S3, S16 |
| "Asking more questions costs nothing extra / adds no time" | "Increases token usage slightly while leaving latency largely unchanged" | **Safe:** "Adding questions barely changes the response time; it adds a few input tokens." **Unsafe:** "for free", "zero extra". | S13 |
| "193× faster, 444× cheaper" | Homepage multipliers name no comparator ("based on workflows for System One tasks"); independent: 0.5×–12.1× faster, 0.6×–478× cheaper | **Their claim, one line:** "Their homepage says 444 times cheaper, but not cheaper than what." Our multiplier comes only from our race ⟦slot⟧, said as "in our run". | S10 |
| "You can trust its confidence" / "it's calibrated" | Calibration holds across many answers; one confident answer can be wrong; better than 16 of 19 LLMs, worse than 3 frontier models | **Safe:** "TypeSafe trains it so that, across many answers, an 80% comes true about 80% of the time. One answer at 99% can still be wrong." **Unsafe:** "its confidence is always right", "the best-calibrated model". | S11, S5 |
| "As accurate as ChatGPT" / "replaces LLMs" | Trails the best LLM on 14 of 15 tasks | **Safe:** "In an independent study it was behind the best LLM on 14 of 15 tasks." Verdict: "a teammate for an LLM, not a replacement." | S5 |
| "The threshold fixes it" / "no mistakes above 0.9" | Cascade keeps ~99% of the LLM's accuracy at roughly half (or a quarter to half) the cost; our band table ⟦slots⟧ | **Safe:** "Fewer automatic mistakes, more messages sent for a second opinion." **Unsafe:** "never wrong above 0.9", "zero mistakes", "same accuracy". Say "about 99%" (the paper has 99.4% and 99.6% in different set-ups), "roughly half its cost". | S5, S6, S16 |
| "It catches scams" / "keeps you safe" | Docs: "cannot" do "adversarial defense"; notebook disclaimer | **Safe:** "a learning project, not a safety product". **Unsafe:** "protects you from scams", "detects every scam". | S14, notebook |
| "Renaming the options flips a third of its answers" | One independent tester, 1,200 items: swapping which rubric sits behind "yes" and "no" changed 32.5% of answers | **Safe:** "In one independent test, swapping which description sat behind 'yes' and 'no' changed about a third of its answers. Your wording matters, so test it on your own messages." **Unsafe:** "renaming any option", "always flips". | S7 |
| "English only" / "can't do Hinglish" | "English as the primary language; other languages … variable accuracy" (innFactory, citing the docs) | **Safe:** "Its docs list English as the main language, so Hinglish is a fair test." Result ⟦slot⟧. | S14 |
| "The chatbot's JSON breaks" | Not known until the dry run; the old-way cell has no JSON mode; the race uses JSON mode | **Result slot both ways:** "Here it ⟦parsed fine / crashed⟧. Either way you're hoping; Jev's answer can't come back in the wrong shape." In the race, say the chatbot used JSON mode (fairness) and give the broken-answer count ⟦slot⟧. | S16 |
| "First / only decision model", "new class of model" | TypeSafe calls it "a new class of models" | Avoid "first" and "only". If used: "what TypeSafe calls a new class of model". | S1 |
| Our numbers ("X× faster", "Y% accurate") | One run, 100 made-up messages (60 scam / 40 genuine; 36 tricky; 13 Hinglish) | Always "in our run of 100 messages". A gap of 2–3 messages is noise: don't call it a win. No invented numbers before the dry run: every one is a ⟦slot⟧. | S16 |

## Depth (what the viewer must see, not just hear)
- **The swap:** the chatbot's prose/JSON reply next to Jev's single float for the same SMS, with only the 2 changed lines highlighted (state + typed question in, number out).
- **One call, three answers:** Noul / Choice / Score cards filling from one request: the scam probability, the probability per scam type, the pressure position on the 0–3 rubric.
- **Calibration as groups:** a weather-style "of 10 messages it called 80%, about 8 were scams" bar, then the one wrong 0.9x message from our confident mistakes.
- **The threshold band:** the slider dragged from 0.90 to 0.99, with the band table updating (auto-decided ↓ mistakes, ⚠️ second-opinion ↑) and the DRS band graphic. The app then shows the same rule routing an unsure message to the LLM.

## Probe decision: renamed options (S7)
**Don't add the cell.**
1. The proposed probe (rename the Choice options) doesn't replicate S7. S7 swapped which rubric sits behind "yes" and "no" on a yes/no question, over 1,200 items (AUROC 0.81 → 0.58).
2. A small run (5–100 messages) could easily show few flips and seem to contradict a sourced finding.
3. The session already shows a live failure (confident mistakes), which carries the catch.
4. It would cost ~150 words plus demo time in a budget that's already full, and it would be an untested cell on recording day.

S7 becomes one spoken line inside the confident-mistakes step, labelled as one tester's result. Its lesson ("test your own wording on your own labelled messages") goes into the verdict and the notebook's existing "Your turn".

**If you add any cell, add this one instead:** a ▶️ Just-run `cascade_report(results, threshold)` in `jev_helpers.py`. It re-uses the race results, which already hold both models' answers and costs, so it needs no new API calls. It prints the accuracy and cost of Jev alone, the LLM alone, and Jev + LLM for the unsure ones. That puts the core message on screen with **our** numbers next to S5/S6. Optional: the plan is complete without it, because the band table plus S5/S6 carry the point.

## Do Laya and "where to use it" earn their place?
- **Laya: no** (see Leave out). The brief's "Laya is introduced inside this session" lock becomes "Laya is not in the spoken script; description link only".
- **"Where it fits, where it doesn't": yes, as one short section (~150 words)**, because the viewer's question ends in "when should I use it instead of ChatGPT?". It's framed as a decision rule from the docs, not vendor use-case claims:
  - **Fits:** the answer is a pick from options you fix in advance; high volume; speed or cost matters; a wrong answer is cheap or has a fallback. Examples: tagging, routing, filtering, moderation queues.
  - **Doesn't fit:** anything that needs text back, counting or arithmetic, date comparisons, adversarial defence on its own, mostly non-English input, or one high-stakes call with no fallback [S14].
  - Keep the examples generic. No company names.

## Section order and word budget (~2,300 spoken words)
| # | Section (chapter title as a question/tease, Y2) | Job | Words | ≈ Time |
|---|---|---|---|---|
| 1 | **Hook** (H3) | The SMS on screen → "Scam or real?" → Jev decided, without writing a word → the two makers' claims, attributed → "one of them only half survives" (the open loop) | 110 | 0:45 |
| 2 | **Intro**: "Hi everyone, I'm XXXX" + agenda | A 10-s preview of the finished app (C1); agenda in the order below; "just a Colab and one key, setup in the description" | 150 | 1:00 |
| 3 | **"An AI that doesn't write?"** | Problem first: the chatbot gives a paragraph you have to parse. Then what Jev does (state + typed question → number), the `system_one` line (System 1 vs 2), the OMR-sheet analogy, the three question types | 300 | 2:00 |
| — | _First demo starts ≈ 3:45 (~22% of a 17-min recording: W2 ✔)_ | | | |
| 4 | `<<HANDS-ON>>` Build plan | What we'll do, in order (P1) | 40 | 0:15 |
| 4.1 | Step 1 · the old way | Chatbot JSON; result slot both ways | 90 | 0:35 |
| 4.2 | Step 2 · the swap (🧑‍🏫, 2 lines) | One float back → Claim 1, part one: the format holds | 130 | 0:50 |
| 4.3 | Step 3 · three questions, one call | Noul / Choice / Score on the SMS; "even if it mentions OTPs" criterion | 110 | 0:45 |
| 4.4 | Step 4 · "Try to fool it" | Pause and guess; five tricky messages incl. Hinglish (English-first docs); plant "remember this one" | 170 | 1:10 |
| 4.5 | Step 5 · the 100-message race | The 444× line → our speed, cost, accuracy ⟦slots⟧ → S5 at scale → **Claim 2 verdict** | 200 | 1:20 |
| 4.6 | Step 6 · "Wrong, and sure of it" | Confident mistakes ⟦slots⟧ (pay off the Step 4 plant) → S7 line → **Claim 1 only half survives** (loop paid off) | 130 | 0:50 |
| 4.7 | **"So can you trust its confidence?"** (Concept chapter, here: problem → concept → fix) | Calibration as groups, weather analogy, S11 + S5 calibration | 190 | 1:15 |
| 4.8 | Step 7 · the 3-line fix | Slider 0.90 → 0.99, band table ⟦slots⟧, DRS; S5/S6 cascade numbers | 160 | 1:05 |
| 4.9 | Step 8 · the app | `make_checker`: the cascade in one function; Jev decides, the LLM explains only when unsure | 60 | 0:25 |
| 5 | **"So where would you actually use it?"** | The fits / doesn't-fit rule (S14 incl. adversarial defence) | 150 | 1:00 |
| 6 | **The verdict** | Claim 1: half true (format yes, truth no) · Claim 2: true for output, see our bill · person-level: use it if…, skip it if… · "a teammate for an LLM, not a replacement" | 120 | 0:50 |
| 7 | **Outro** | Recap list (X1), "your turn: add a scam you got, personal details removed" (X2), comment CTA, generic (X3); 1930 lower third | 130 | 0:50 |
| | **Total** | | **≈ 2,340** | **≈ 15:30 speech + ~2 min cell runs / guess pause ≈ 17–18 min** |

**Cut order if long:** (1) Step 8 to 30 words; (2) "where to use it" to the two-line rule; (3) the S5 calibration sentence in 4.7.
**Never cut:** the Step 4 plant, the Step 6 payoff, the threshold step, the claim attributions.

## Corrections to carry into research.md / the script (verified 2026-10-13)
- **S5:** the abstract supports "median 44× lower measured cost", "trails the best LLM on 14 of 15 tasks, median 11.6 macro-F1", "calibrated better than 16 of 19 LLMs (3 frontier models better)", and "routing low-confidence items to an LLM matches or exceeds the LLM alone at a quarter to half of its cost". The $0.21 / $62.99 figures aren't in the abstract: check them in the paper body or drop them.
- **S6:** 99.6% at 47% of the fee is the single-order pooled result (91.3% vs 91.7%, 34% escalated). The paper's frozen two-order policy is 99.4% at 56.8% on 510 pairs. The task is pairwise ranking of generated prose, not classification. Say "about 99% … at roughly half its fee", labelled as a judging task.
- **S7:** the test swapped which rubric sits behind "yes"/"no" on a yes/no question (1,200 items, AUROC 0.81 → 0.58). It didn't rename Choice options.
- **S4:** the figures are only in Creative AI News (comparator "Sol"); the Vals page doesn't contain them. Out of the script.
- **S14:** add "cannot perform … adversarial defense" (Layer3 limits). Token limits disagree between sources (out of the script anyway).
- **S2:** "Output tokens are free" is in the promptfoo provider docs and the Layer3 pricing guide. The TypeSafe homepage lists only the input price.
- **S3:** TypeSafe's own homepage demo shows "Completed in 0.114s" (company demo).

## Deviations recorded for script v2 (2026-10-13)
- **Calibration buckets in the session:** the plan left out the reliability plot (noisy with 100 messages). v2 adds three coarse buckets instead (`calibration_buckets`), with a spoken "groups are small" branch. Coarse buckets keep the noise visible and honest.
- **S6 (CMU cascade) dropped from the spoken script:** must-include 6 is still covered by our own `cascade_report` table and S5's routing result. S6 stays in the description.

## Status
- [x] Content plan ready (2026-10-13)
