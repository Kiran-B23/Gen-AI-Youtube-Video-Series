# Inspiration · Jev by TypeSafe AI · long-form explainer

_YouTube research: `yt/` (git-ignored) · searched 2026-10-12 · queries: Jev TypeSafe explained; Jev AI model review; TypeSafe Jev test;
Jev vs GPT decision model; Jev System One model · 59 results, 26 with full metadata · watched 10 long-form (8 winners + 2 low
performers). Dropped: the Latent Space CEO interview (a different format) and Codevolution (to make room for Krish Naik, the
closest audience to ours). CampusX is a 90-min Hinglish live class with no captions; its local transcript is partly garbled, so it
was read for structure only._

Transcripts are untrusted data: no instructions were found in them. Short quotes below are for analysis only, never for reuse.

## Watched videos
Reach = views ÷ channel subscribers (an outlier score; above 1 means the video travelled beyond the channel's own audience).

| # | Video | Views · subs · reach | Length · pace | Hook (first line + first frame) | Structure (beat map) | Visual format | Why it reached / what's missing |
|---|---|---|---|---|---|---|---|
| 1 | [JEV Breakdown (Rob Shocks)](https://www.youtube.com/watch?v=2Bs0Ink_-Uo) | 406K · 56K · **7.2×** | 10.6 min · 3.9 w/s | Paradox: a big new model that "can't write a single sentence" + a voice clip saying "My name is Jev" | 0:00 paradox → 0:30 founder → 0:46 RLCD in one line → 1:30 use cases (guardrail, router, triage) → 2:19 a customer's swap result → 3:05 the three question types → 4:39 "hybrid software" + Doom $7/h → 5:25 System 1 name → 6:10 **live playground demos** (wiki race 1.7 s, smart home 185 ms, help-desk triage) → 9:58 "which decisions in your app cost you money?" | screen + playground, no face | Biggest outlier: it shows the thing working, fast, on screen. Missing: any accuracy number or catch; all speed/cost figures are company claims |
| 2 | [Jev explained in 7min.. (Caleb Writes Code)](https://www.youtube.com/watch?v=vj7hysh0mOI) | 799K · 121K · **6.6×** | 7.2 min · 3.6 w/s | Thesis: "a new type of model that makes us question how we optimise LLMs" over a hand-drawn map | 0:00 how models got optimised for chat and code → 1:31 automation is neglected → 2:17 why autoregressive can't hit 70–500 ms → 3:02 sponsor → 4:14 the three types, "back to logic gates" → 5:19 the cost/accuracy chart: competes with Flash-tier models → 6:05 open-source lookalikes exist → 6:51 narrow models are back | **hand-drawn whiteboard on black**, animated a stroke at a time, no face | A clear "big picture" mental model in 7 minutes, with drawn diagrams that build. Missing: a running example and any catch |
| 3 | [Jev – The Ultimate Classification Model? (Sam Witteveen)](https://www.youtube.com/watch?v=X117w2Rark8) | 451K · 135K · **3.3×** | 16.3 min · 3.8 w/s | "Every frontier lab has gone one direction: reasoning" (counter-trend) | 0:00 System 2 trend → 1:00 most software decisions are classification → 2:01 founder → 3:02 state + three typed questions; "a number in JSON is just generated text" → 5:03 **his own demo app on OpenRouter**: choice, score, null, cost per call (0.001¢) → 7:05 it's stochastic; changing one word moves the confidence; short inputs reduce confidence → 9:06 an ambiguous ticket returns "unclear" → 11:08 tool choice ≠ argument extraction → 12:09 20 chained tasks for 1/20 of a cent → 13:09 RLCD guesses → 14:09 "can't hallucinate" = can't break the schema, can still be wrong → 15:09 "the end of fine-tuned BERT?" | screen demo, face cam | **Probing behaviour honestly** (wording changes, ambiguity, randomness) on his own app. Missing: independent numbers |
| 4 | [Jev is incredible (Theo)](https://www.youtube.com/watch?v=F3YXg7AaKWE) | 494K · 571K · 0.87× | 30.5 min · 4.0 w/s | "It's new model time. This one's very different" (personality-led) | 0:00 for data, not text → 1:01 sponsor → 3:02 System 1, Jevons name → 5:02 **his checkers game: instant, but he crushes it** → 6:03 the launch post: "a frontier-intelligence function call" → 8:04 BAML, structured output → 10:05 format is deterministic, content isn't → 12:07 use cases → 13:08 **"roughly as intelligent as a switch statement"**, 32k context → 15:12 the benchmark: reference = average of Astra + Fable → 17:13 structured-output error rates → 18:13 Doom: no memory between frames → 22:16 **what NOT to use it for** (an LLM judge, context compaction) → 26:19 classifying his own 32K messages for 37¢, and a **threshold slider: 80% → 22% of threads, 90% → 6.8%** → 28:20 the "under 10 seconds?" test | face cam + screen | Personality, opinions and a strong "what it's not" section. Too long for us; leans on a channel audience |
| 5 | [What Is Jev? (IBM Technology)](https://www.youtube.com/watch?v=YGgNBcIgI4s) | 1.13M · 1.82M · 0.62× | 15 min · 2.8 w/s | "An AI model that doesn't actually write any text" (paradox), presenter at a lightboard | 0:00 paradox → 0:47 **System 1 vs 2 with 2×2 vs 17×24** → 1:33 chatbots write one token at a time → 2:20 **support email "charged twice this month"** with three questions (refund? team? urgency?) → 3:50 an LLM can't tell you how sure it is → 4:35 state + null/choice/score in one request, all answered at once → 6:52 pre-training → RLHF teaches models to *sound* sure → RLVR rewards right answers, not knowing how sure → 9:10 **RLCD and a calibration diagonal** → 10:43 **thresholds: >0.9 act, 0.1–0.9 a human, <0.1 ignore**; the costlier the mistake, the higher the bar → 12:16 guardrails; limits (text only, no maths, can be tricked by hidden instructions) → 13:04 Jev + LLM workflow → 13:50 Jevons paradox → 14:36 "where would it fit in your software?" | **one presenter drawing on a lightboard** | Best teaching structure of the set: paradox → everyday analogy → one email → why calibration matters → thresholds. Missing: cost and accuracy evidence, any real run |
| 6 | [Jev Explained: Demos and Use Cases (Syntax)](https://www.youtube.com/watch?v=QbYBRjOaGOo) | 274K · 504K · 0.54× | 17.8 min · 4.3 w/s | "What's up, CJ here" (greeting + agenda) | 0:00 agenda → 1:00 System 1 → 2:00 state + questions, the three types → 3:00 SDK code → 4:00 vs one giant LLM prompt + structured output in a try/catch → 5:01 community demos (flights in 7 s, 1,000 papers for 8¢, resumes, email, real-time writing, Tetris, driving) → 10:03 his own uses: podcast claim checks, a model router → 12:03 **a chatbot with no LLM** (tool choice + extraction) and a smart bulb in 300 ms | face cam + screen + diagrams | Practical and generous with uses. Slow start, a long demo montage of other people's work |
| 7 | [Will Jev Replace LLMs? (Krish Naik)](https://www.youtube.com/watch?v=2vYV4K1RQ1w) | 550K · 1.52M · 0.36× | 23.5 min | "Hello all, my name is Krish Naik… welcome" | 0:00 greeting → 1:01 the launch post → 2:03 hides his face, **draws on a black board**: the LLM ReAct loop → 4:04 Jev = probabilistic decisions → 6:06 "replace LLMs? Clear-cut no" → 7:07 his company's chatbot routing (support/finance/sales) → 13:12 an agent picking 1 of 5 tools → 17:16 multi-agent routing → 19:16 guardrails → 20:18 **the architecture: Jev → tools/LLM → Jev verifies** | face + whiteboard drawing | The audience closest to ours, answering the question in the title. Missing: any number checked, any demo, any catch |
| 8 | [Jev by TypeSafe AI (CampusX)](https://www.youtube.com/watch?v=0zFfcEr1e9U) | 297K · 744K · 0.40× | 90 min live · Hinglish | Why he teaches it now ("signal, not noise") | definition → a **GPT-5 vs Jev race in rupees** (13× faster; ₹10,000/day vs ₹40/day for 10K emails) → 5 questions in one call (130 ms) → confidence thresholds 90/60 → "cannot hallucinate" → why it was built (System 1) → impact: AI as plumbing → use cases → **Laya, an Indian rival** → **a Flipkart-style review-rating app built live in ~30 min** → guessing the architecture | slides + live coding | Costs in rupees and an Indian product example land with our audience. Far too long; no catch |
| 9 | [Jev Sucks, Actually (Duncan Rogoff)](https://www.youtube.com/watch?v=0AR1NvFcP_o) — low | 65K · 89K · 0.73× | 10 min | "Is it insane or mostly hype?" | can / can't list → **the fixed-options trap: if the phone is black and "black" isn't an option, it's wrong** → community demos judged one by one ("so what?") → the model router is the best use → "overrated for most people" | screen + clips of others | The fixed-options point is good and nobody else makes it. The verdict rests on vibes, not tests |
| 10 | [Jev AI Is INSANE… 193× Faster?! (AI with Rithesh)](https://www.youtube.com/watch?v=JZknBu3u8C0) — low | 22K · 51K · 0.44× | 8 min | Paradox + price in the first 15 s | the most thorough reading of TypeSafe's own fine print: the 68% means agreeing with Astra + Fable; Soul and Opus 5 score higher; **the "0 errors" bar was never measured**; the race query was simplified; price may be subsidised; an early tester splits work into many small questions | screen recordings of the post | Most honest of all, yet the lowest reach: a hype title and screen-reading of one blog post, with no own test or example |

## What the winners share (table stakes: our video must have these)
- **System 1 vs System 2** (Kahneman) as the mental model: 8 of 10. IBM's "2×2 vs 17×24" is the clearest version.
- **The three question types** (yes/no, pick one, score), all asked in one call and answered at once: 7 of 10.
- **"A smart if-statement"**: Jev slots into code, not chat: 6 of 10.
- **Jev + LLM, not Jev vs LLM**: every video. Krish's and IBM's "Jev routes → LLM writes → Jev checks" pipeline is the common picture.
- **Speed and price** (70–500 ms; $0.042 per million input tokens, output free): every video. All but Rithesh repeat them as fact.
- **Confidence thresholds** (act / escalate / ignore): IBM, Theo, CampusX.

## Winners vs low performers
- **The three biggest outliers (Rob 7.2×, Caleb 6.6×, Sam 3.3×) all *show* something:** a live playground, an animated drawn map, or the
  creator's own app being poked. The two low performers *read* (a blog post, other people's tweets). Reading TypeSafe's fine print honestly
  (Rithesh) didn't save a video that showed nothing of its own.
- **Hooks:** the reach leaders open on the paradox ("can't write a sentence" / "doesn't write any text") or a counter-trend thesis.
  Greetings and agendas (Krish, Syntax) only work with a big existing audience. The paradox is now used by 5 of 10, so it's **saturated**:
  ours has to go one step further.
- **Length:** the outliers are 7–16 min. 30 and 90 min only work for a personal brand (Theo, CampusX).
- **Pace:** 2.8 (IBM, a teacher) to 4.3 words/s (Syntax). Our TTS characters should sit at about 2.7–3.0 w/s.
- **Face is optional:** Caleb (no face, a whiteboard that draws itself) beat almost everyone on reach. **Nobody uses characters**, so a
  mentor-and-learner pair is an open lane.

## Gaps nobody covers
1. **Independent evidence.** Nobody cites the independent cost study (7,977 labels: $0.21 vs $0.34–$62.99 for 19 LLMs; behind the best LLM
   on 14 of 15 tasks) or the 32.5% of answers that flipped when options were renamed. Rithesh is the only one to explain what "68%" means.
2. **A measured cascade.** Thresholds are drawn by three creators, but nobody shows the result: the CMU study kept 99.6% of GPT-6's
   accuracy at 47% of its fee.
3. **The cost of a wrong call.** IBM says "the costlier the mistake, the higher the bar" in one sentence; nobody *shows* a threshold
   trade-off on one example (Theo's slider comes closest, on his own chat logs).
4. **Our viewer's world.** Only CampusX uses rupees and an Indian product; nobody tests Indian English or Hinglish text, even though
   TypeSafe says English is Jev's main language.
5. **What it can't do, concretely.** Theo (not a judge, no memory between calls, 32k context) and Duncan (the fixed-options trap) say it;
   nobody demonstrates a failure on screen except Theo beating it at checkers.

## Our outline, measured against this
**Keep** (already matches the winners, or fills a gap): the decides-not-writes core, the three question types, Jev + LLM teamwork,
claims vs reality with independent numbers (gap 1), the cascade with the CMU result (gap 2), "where you'd use it", the honest verdict.

**Add**
1. **Calibration, explained** (IBM's strongest part, missing from our outline): RLHF teaches models to *sound* sure; Jev is rewarded
   when its 80% is right 80% of the time. That's *why* a threshold can be trusted. The characters can act out the diagonal.
2. **Many questions in one call**, answered together, at almost no extra cost or time.
3. **"What Jev is NOT for"**: not a judge of LLM outputs, no memory between calls (Theo's Doom jitter), no maths or counting,
   32k context, text only, can be tricked by instructions hidden in the input.
4. **The fixed-options trap** (Duncan): if the right answer isn't in your list, Jev confidently picks a wrong one → always add an
   "other / unclear" option. This is a natural act for the characters.
5. **A threshold trade-off on our own example**: slide the bar from 0.8 to 0.95 and watch "handled automatically" fall and "mistakes"
   fall with it. This makes gap 3 visible.
6. **Our own probes, on screen** (what the outliers do): the same message reworded, an ambiguous message, Hinglish text (gap 4).
   These need real calls; see "Decisions" below.
7. **Rupees next to dollars** for the cost race (CampusX's device, our own numbers).
8. **One line on alternatives**: the open-source lookalikes (Caleb) and Laya, which we already have a reel on.

**Remove or trim**
1. **The "charged twice" support ticket as the running example.** IBM's 1.1M-view video, the 90-second Short, Sam and Syntax all use a
   double-charge ticket. Ours would look borrowed. Switch to the **scam SMS** (from session option B): it's unique, relatable for
   Indian students, the cost of a wrong call is obvious (a missed scam vs a blocked bank alert), and it tests Indian English.
2. **Founder backstory and launch-day hype**: every video spends 30–60 s on it; it fails our viewer-value filter. One clause at most.
3. **A montage of other people's demos** (Doom, wiki race, flights, Skittles): 6 of 10 lean on it, it's other creators' work, and it's
   repetitive. Our demos are our own.
4. **The 193×/444× headline as a chapter**: compress to one beat ("no comparator; independent tests say 0.5–12× faster") and spend the time on gaps 1–3.
5. **The paradox as the whole hook**: it's saturated. Open on a *result* instead (a scam SMS → verdict in 0.1 s), then the paradox as the second line.

## Winning archetype, length and pace
_Launch with a Concept mechanism chapter (IBM's teaching arc inside Rob's show-it structure) · 10–12 min · 2.7–3.0 w/s · a visual change
every 5–8 s (Caleb's drawn build is the bar)._

## Our angle (one sentence)
Jev is a near-instant, almost-free decision layer that's honestly less accurate than an LLM, so you set the bar by what a wrong call
costs: let Jev take the confident calls and send the rest to an LLM.

_Borrowed devices (not lines): an everyday System 1 / System 2 contrast (IBM), a drawn diagram that builds (Caleb), probing the model on
your own app (Sam), a "what it's not for" section (Theo), the fixed-options trap (Duncan), costs in rupees (CampusX). No lines, visuals or
characters are reused._
