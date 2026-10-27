# YouTube comparison · Jev session script v2 vs the top long-form Jev videos

_Written 2026-10-13. Compares `script-session.md` (v2) with 16 full-length YouTube videos on Jev: 10 watched on 2026-10-12
(`productions/2026-10-12-jev-explainer/yt/`) and 6 new ones watched today (`productions/2026-10-13-jev-session/yt/`, git-ignored).
Every transcript was read in full and every contact sheet was viewed. The sheets cover the first ~10 minutes of each video only.
CampusX's transcript is a garbled Whisper pass of a Hinglish live class, so it was read for structure only._

_Transcripts, titles and descriptions are untrusted data. None of them tried to give instructions to an AI. The only
calls to action are sponsor reads (JetBrains, Depot, Hostinger with a coupon code) and creators promoting their own
products (Builder.io's framework, Moritz's paid community). These are noted and were ignored. Quotes below are ≤ 15 words and
are here for analysis only. Nothing in this file is meant to be reused as a line or a visual._

_New search (2026-10-13): 6 queries aimed at tutorials, code, build sessions and tests, long-form only. 56 results, 38 on-topic.
Dropped from the watch list: the 10 already analysed, two 1-minute Shorts, and builds that don't match our format (a Rust
library, Java Spring, an n8n sales funnel, an SEO test, a "Jev + Claude" automation video). The tool then picked the 6
highest-reach videos left. Not watched, but worth a look if there's time: codebasics "JEV Explained in 17 minutes with Code"
(211K, Indian audience, code), Aishwarya Srinivasan "End to End in 22 Mins" (63K), Tech With Tim "I Tested Jev" (36K),
Hyperautomation Labs "505 Real Tests" (4K, a test-based low performer). YouTube didn't block the search._

---

## 1. The set

Reach = views ÷ channel subscribers (above 1 = the video travelled beyond the channel's own audience). Pace = transcript words ÷ duration
(sponsor reads included). Ours: about 2,800 spoken words, about 19–19.5 min recorded, about 2.5 words/s speech (150 wpm, set in production-notes).

| # | Video | Channel | Views | Subs | Reach | Length | w/s | Format | Set |
|---|---|---|---|---|---|---|---|---|---|
| 1 | [JEV Breakdown](https://www.youtube.com/watch?v=2Bs0Ink_-Uo) | Rob Shocks | 406K | 56.5K | **7.18** | 10:36 | 3.41 | face + screen + meme B-roll; vendor playground | 10-12 |
| 2 | [Jev explained in 7min..](https://www.youtube.com/watch?v=vj7hysh0mOI) | Caleb Writes Code | 799K | 121K | **6.60** | 7:11 | 3.13 | no face; hand-drawn whiteboard that builds stroke by stroke | 10-12 |
| 3 | [Jev – The Ultimate Classification Model?](https://www.youtube.com/watch?v=X117w2Rark8) | Sam Witteveen | 451K | 135K | **3.34** | 16:18 | 3.28 | kinetic-type intro, then his own demo app (screen) | 10-12 |
| 4 | [Jev is incredible](https://www.youtube.com/watch?v=F3YXg7AaKWE) | Theo | 494K | 571K | 0.87 | 30:29 | 3.48 | face + screen (launch post, tweets, his own apps) | 10-12 |
| 5 | [What Is Jev?](https://www.youtube.com/watch?v=YGgNBcIgI4s) | IBM Technology | 1.13M | 1.82M | 0.62 | 15:03 | 2.34 | presenter drawing on a lightboard, no demo | 10-12 |
| 6 | [Jev Explained: Demos and Use Cases](https://www.youtube.com/watch?v=QbYBRjOaGOo) | Syntax | 274K | 504K | 0.54 | 17:50 | 3.72 | face + diagrams + code + tweet montage | 10-12 |
| 7 | [Will Jev Replace LLM's?](https://www.youtube.com/watch?v=2vYV4K1RQ1w) | Krish Naik | 550K | 1.52M | 0.36 | 23:27 | 2.63 | face over blog, then a drawing board, no demo | 10-12 |
| 8 | [Jev by TypeSafe AI](https://www.youtube.com/watch?v=0zFfcEr1e9U) | CampusX | 297K | 744K | 0.40 | 89:58 | ~2.4 | live class: slides + face cam + **live coding** (Hinglish) | 10-12 |
| 9 | [Jev Sucks, Actually](https://www.youtube.com/watch?v=0AR1NvFcP_o) (low) | Duncan Rogoff | 65K | 89K | 0.73 | 10:06 | 3.37 | face + designed explainer cards + other people's clips | 10-12 |
| 10 | [Jev AI Is INSANE… 193× Faster?!](https://www.youtube.com/watch?v=JZknBu3u8C0) (low) | AI with Rithesh | 22K | 51K | 0.44 | 8:07 | 3.33 | no face; slides of the launch post | 10-12 |
| 11 | [Build Anything with Jev, Here's How](https://www.youtube.com/watch?v=f6We53TnkbU) | David Ondrej | 244K | 420K | 0.58 | 32:12 | 3.26 | face bubble + whiteboard canvas + **vibe-coded build** with an AI agent | **new** |
| 12 | [What is Jev and How to Use it?](https://www.youtube.com/watch?v=ZgXej_9isxY) | Codevolution | 357K | 759K | 0.47 | 22:12 | 2.57 | no face; minimal sketch slides, then playground + **TypeScript code** | **new** |
| 13 | [JEV: How It Works and What You Can Build](https://www.youtube.com/watch?v=o1CogAtWdBk) | Riley Brown | 197K | 300K | 0.66 | 20:18 | 2.78 | face + **his own email app** run live | **new** |
| 14 | [Fake Jev demos are taking over the internet](https://www.youtube.com/watch?v=Spn-F83ZHH0) | Steve (Builder.io) | 92K | 141K | 0.65 | 9:30 | 3.86 | face + other people's demo clips, critiqued | **new** |
| 15 | [How to Build Things with Jev & OpenJevs](https://www.youtube.com/watch?v=ZR7anrL50xs) | Sam Witteveen | 72K | 135K | 0.53 | 19:18 | 3.40 | animated diagrams + **his own router build** + request inspector | **new** |
| 16 | [Jev: …Breaking The Internet (Full Tutorial)](https://www.youtube.com/watch?v=Nq_lu5QT-fI) | Moritz \| AI Systems | 84K | 28.9K | **2.92** | 22:41 | 3.07 | face + another creator's animation + **vibe-coded builds** in Cursor | **new** |

**What the set says about format.** Only CampusX (#8) and Codevolution (#12) write or read code a learner could type themselves. The
other "build" videos (#11, #13, #16) have an AI agent write the app, and the viewer sees results, not code. Nobody uses a notebook.
Nobody builds a small labelled test set and scores Jev against it. The closest anyone gets is Riley's live "is this a scam?" run on
his inbox (#13, 13:58), which shows confidences but never checks if they're right.

---

## 2. How each one teaches (timed maps)

"First demo" = the first time the creator's own run of Jev is on screen, as a % of runtime. Other people's clips don't count.

| # | Teaching order (timestamps) | Analogy / example | First demo | Catch / accuracy | Ending |
|---|---|---|---|---|---|
| 1 Rob | 0:00 paradox + the model's own voice → 0:30 founder → 0:46 RLCD in one line → 1:05 speed/cost + uses (guardrail, router, triage) → 2:10 a customer swap anecdote → 3:15 three question types on a ticket → 4:20 "hybrid software" → 4:54 Doom → 5:27 System 1/2 → 6:10 playground: wiki race, smart home 185 ms, help-desk triage | help-desk ticket; smart-home lights | 6:10 (58%) | None. Calls it high-confidence. All numbers are vendor numbers | 9:47 "which decisions in your app cost you money?" + subscribe |
| 2 Caleb | 0:00 how models were tuned for chat, then code → 0:33 automation was neglected → 1:40 demos show speed, not depth → 2:15 why token-by-token can't reach 70–500 ms → 2:48 sponsor → 4:14 typed in/out, three types as "logic gates" → 4:57 sorting a plant list → 5:31 cost/accuracy chart → 6:03 open-source lookalike | logic gates; the AI stack drawn as layers | 4:57 (69%), a brief terminal shot | Places it with Flash-tier models on the chart; nothing else | Narrow models are back |
| 3 Sam (#1) | 0:00 labs all chase reasoning → 0:33 System 1/2 → 0:33 most software decisions are classification → 1:41 founder → 2:46 state + 3 types → 3:51 a number written in JSON is still just generated text → 4:22 smart if → 4:53 **his own app**: choice, score, Noul, cost per call → 7:05 reruns differ → 8:44 one changed word moves the confidence; short inputs lower it → 9:18 an ambiguous ticket goes "unclear" → 10:25 injection, sarcasm → 11:30 picks a tool but can't fill its arguments → 12:05 20 chained tasks → 14:09 "can't hallucinate" = can't break the schema | support ticket; "can you help find my cat?" | 4:53 (30%) | **Probes it honestly on camera**: randomness, wording, ambiguity, schema ≠ truth | "End of fine-tuned BERT?" + asks viewers where it failed |
| 4 Theo | 0:00 opener → 1:05 sponsor → 2:43 founder, System 1, Jevons → 4:53 **his checkers game**: instant, and he wins → 5:58 launch post → 7:34 BAML aside → 10:18 shape is deterministic, content isn't → 11:22 LLM confidence is overconfident; smart if → 12:28 not a judge → 13:33 "roughly as intelligent as a switch statement"; 32k → 14:07 vendor race → 15:46 the benchmark grades against an average of two frontier models → 16:52 error-rate chart → 18:00 Doom: no memory between calls → 22:25 bad uses (LLM judge, context compaction) → 26:45 his 32K messages for 37¢ + **threshold slider** → 28:26 the "how many seconds would a person need?" rule | shirt colour; knee reflex | 4:53 (16%) | Strong "what it's NOT for" section; the slider shows coverage falling as the bar rises; never checks accuracy | Use it like an if-statement |
| 5 IBM | 0:00 paradox → 0:34 **System 1/2 with 2×2 vs 17×24** → 1:44 chatbots write token by token; reasoning models ≈ System 2 → 2:20 one support email, three questions → 3:26 LLM JSON gives no reliable sense of how sure it is → 3:58 state + Noul/Choice/Score in one request, all answered at once → 5:38 probabilities out → 6:43 can still be wrong → 6:52 **pre-training → RLHF learns to sound sure → RLVR rewards right answers, not knowing how sure** → 9:26 RLCD + a calibration diagonal → 10:30 thresholds: >0.9 act, middle → a human, <0.1 ignore; the costlier the mistake, the higher the bar → 12:07 guardrails; limits (text only, no maths, hidden instructions) → 13:14 Jev → LLM → Jev workflow → 13:50 Jevons | "charged twice" email | none (whiteboard example at 2:20, 15%) | Explains *why* calibration is needed, then thresholds. No numbers | "Where would it fit in your software?" in the comments |
| 6 Syntax | 0:00 greeting + agenda → 0:33 headline multipliers → 1:06 System 1 → 1:38 state/questions/3 types → 2:43 SDK code → 3:15 vs one giant prompt; structured output needs try/catch → 4:52 Jev as first line of duty → 5:24 community montage → 10:14 his own uses → 12:00 **a chatbot with no LLM** + a smart bulb in 300 ms | "charged twice" email | code at 2:43 (15%); own demo at 12:00 (67%) | None | Docs, waitlist, gateway, comments |
| 7 Krish | 0:00 greeting → 1:01 launch post; vendor race screenshot → 2:41 hides face, draws an LLM ReAct loop → 4:54 probabilistic decisions (hungry? cat or dog?) → 6:06 "replace LLMs? clear-cut no" → 7:32 his course chatbot routed to support/finance/sales → 13:02 an agent picking 1 of 5 tools → 17:30 multi-agent → 19:41 guardrails → 20:49 Jev → LLM → Jev architecture | his company's chatbot; SQL tool choice | none | Claims hallucination is "less" (overclaim); no catch | Promises a future tutorial |
| 8 CampusX | 0:00 why teach it now → 3:28 definition; a generalised classifier vs logistic regression (**no training data**) → 7:43 **live GPT-5 vs Jev race, costs in rupees** → 9:21 per-day/per-year cost maths → 11:32 five questions, one call → 13:09 confidence + RLCD; says you can "rely on it" → 14:47 thresholds 90 / 60 → 16:56 can't hallucinate → 18:34 five-benefit recap → 19:37 founder, System 1/2 → 25:50 impact: AI as plumbing; use cases → 35:38 community demos → 43:20 Laya → ~44:30 **a Flipkart-style review-rating app coded live** → 55:00 architecture guesses → 81:46 downsides | refund email; Flipkart phone reviews | 7:43 (9%) | Downsides list only at 82 min (of 90); overclaims the confidence | Predictions; "signal, not noise" |
| 9 Duncan | 0:00 "insane or hype?" → 0:34 vendor multipliers → 1:06 an LLM is a word guesser → 1:39 Jev is a classifier → 2:44 can/can't list → 4:26 **the fixed-options trap** (the right colour isn't in the list) → 5:30 community demos, each judged "so what?" → 7:09 a model router is the best use | phone colour | none | Fixed options; verdict on vibes, no test | "Overrated for most people" |
| 10 Rithesh | 0:00 paradox + price → 0:33 System 1, function call → 1:06 the vendor's comparison table → 1:40 vendor race, query admitted simplified → 2:12 pricing → 2:45 **the 68% = agreement with a frontier-model average** → 3:52 **the "0 errors" bar wasn't measured** → 4:25 Doom/wiki caveats → 5:31 early testers → 6:36 who it's for; limits | security alert | none | Most honest reading of the fine print | Its real rival is your if-statement; test on your own workload |
| 11 David | 0:00 Google Trends + credentials → 1:05 multipliers and "zero hallucinations" stated as fact → 2:09 three building blocks on a ticket → 3:13 another creator's explainer animation → 5:22 parallel vs token by token; RLCD → 7:02 price maths → 7:36 community demos → 10:47 vendor error charts as fact → 15:09 sponsor + business pitch → 17:20 an agent vibe-codes a lead-qualifying form → 22:14 Jev's verdict updates live | ticket; invoice | 22:14 (69%) | None | Discord + sponsor |
| 12 Codevolution | 0:00 seven questions as the agenda → 0:35 **smart if: "3+ items → free delivery" (plain code) vs "customer sounds frustrated" (a judgement)** → 1:39 System 1, Jevons → 2:47 fast / structured / for software → 3:21 why not GPT + structured output? → 4:31 vendor demo → 5:05 price turned into messages per dollar → 6:12 state → 6:46 **Noul: near 0 = sure "no"; 0.5 = not leaning** → 7:52 Choice **with a "something else" option** → 8:24 Score with described levels; **the result is a weighted average, so it falls between levels** → 9:29 questions are independent → 10:04 **an answer isn't proof; confidence ≠ accuracy; choose your threshold by testing** → 11:46 playground → 12:53 TypeScript: one Noul, a second message, three questions, a 0.8 threshold → 19:39 fits / doesn't (if code can compute it, use code) → 21:16 recap | "I've contacted you three times" | 11:46 (53%) | Calm and correct: not proof, test your threshold | Start with one small decision |
| 13 Riley | 0:33 **cold open on his app sorting 500 emails** → 1:41 launch tweet → 2:17 a model router → 3:57 what classification means → 4:31 not an LLM → 5:41 three types built live on his inbox (Noul brand deal, Choice category, Score importance) → 11:14 vs structured output → 12:18 vendor speed/cost → 13:58 a live **"is this a scam?" Noul**: 55 of 500 flagged, some at 54% and 71% → 15:40 context window → 16:12 community demos → 18:58 access + build with an AI agent | his own inbox | 0:33 (3%) | Shows mid-range confidences but never checks accuracy | "Am I overhyping this?" |
| 14 Steve | 0:00 **cold open on a viral demo → "this is fake"** → 0:33 what Jev does → 1:05 the trick: options hard-coded in advance → 2:43 it can't see pixels (games feed it state) → 3:15 demos rated real/unreal → 4:20 compaction nonsense → 4:52 email tagging → 5:24 browser use (HTML ids; it can't type) → 7:31 his own framework uses it for tool selection | other people's demos | 7:31 (79%, self-promotion) | The whole video is the catch: it only picks from your list | "Which real uses have you seen?" |
| 15 Sam (#2) | 0:00 plan: a local model router → 1:37 recap → 3:47 **each question type gets a job: Choice = lane, Score = difficulty tier, Noul = privacy gate** → 5:26 low confidence → a safe default; asking a cloud model "is this private?" already sends it → 5:58 demo → 8:40 request inspector shows the questions and criteria → 10:50 PII stays local → 11:24 architecture + thresholds → 15:17 swaps in a local open lookalike → 16:55 stats | chat prompts | 5:58 (31%) | Low-confidence fallback; privacy irony | Asks for use cases |
| 16 Moritz | 0:00 multipliers as fact → 0:33 another creator's animation (invoice, 8.5 s vs 0.1 s) → 2:13 software = if-statements → 3:21 can/can't → 3:53 key/waitlist → 5:33 an AI agent builds a voice-controlled browser → 6:43 demo → 9:31 the agent explains its own thresholds (0.5 / 0.6) → 11:42 a memory system ("98% fewer tokens") → 17:09 a YouTube title scorer | invoice | 6:43 (30%) | None; self-reported savings | Paid community |

**Ours, for reference:** hook (scam SMS → paradox → two attributed claims → open loop) → intro + 3-bullet agenda + app preview → theory
(problem → numbers not text → OMR → System 1/2) → **first demo, Step 1 at about 3:20–3:40 (≈ 18–20%)** → swap → three questions → pause-and-guess →
100-message race (claim 2 verdict) → confident mistakes (claim 1 verdict, loop paid off) → calibration on our own buckets → DRS threshold + slider +
own cascade table → app → fits/doesn't → verdict → outro with a "your turn" task and the 1930 helpline.

---

## 3. Section by section: v2 against the strongest handling of the same idea

Verdict key: **Ahead** = no video does this as well · **Par** = matches the best · **Weaker** = a video does it better · **Missing** = they cover it, we don't.

| Our section | How the strongest videos handle it (evidence) | v2 verdict | Why |
|---|---|---|---|
| **Hook** | Most open on the "can't write a sentence" paradox (#1 0:00, #5 0:00, #10 0:00, #13 0:00). The new ones open on a result (#13's app at 0:33) or a takedown (#14 0:00). #11 and #16 open with vendor multipliers stated as fact | **Ahead** | Ours opens on a lived object (the SMS), asks the viewer a question, attributes both claims, and sets an open loop that the session pays off. Nobody sets an open loop. Nobody attributes the claims in the hook |
| **Intro + agenda** | Syntax (#6 0:00) and Codevolution (#12 0:00) list their questions first. Krish (#7) and Syntax greet before any hook. Riley shows the finished app first (#13 0:33) | **Par/Ahead** | Hook first, then the greeting, a 3-bullet agenda, the finished-app preview (C1) and "no ML background needed". This matches Riley's result-first opening without giving up the hook |
| **Theory: problem → numbers, not text** | IBM: an LLM's JSON gives no reliable sense of how sure it is (#5 3:26). Sam: a "0.9" in JSON is just more generated text (#3 3:51). Codevolution: why not GPT with structured output? (#12 3:21) | **Par** | Our "your code has to dig a yes or a no out of that paragraph" is clear. But we don't say *why* a chatbot's self-reported confidence can't be trusted. That's the setup for calibration (see Calibration row) |
| **Theory: OMR analogy** | Nobody has an exam analogy. Closest: "logic gates" (#2 4:14), "switch statement" (#4 13:33), "smart if" (#3, #12, #15) | **Ahead** | OMR is concrete and Indian, and it explains *why* the answer always fits |
| **Theory: System 1/2** | IBM makes both halves concrete: 2×2 vs 17×24 (#5 0:47). Theo: shirt colour (#4 3:47) and a knee reflex (#4 28:59) | **Weaker** | Ours has a concrete System 1 (glancing at an SMS) but an abstract System 2 ("slow, step-by-step thinking"). research.md's JEE-problem contrast was dropped in v2 |
| **Theory: no training needed** | CampusX: a generalised classifier, no labelled data needed, vs logistic regression (#8 4:00). David: you don't train a separate classifier (#11 3:13). Sam: the end of fine-tuned BERT? (#3 15:24) | **Missing** | Our students have met trained classifiers, and "why not train one?" is their natural question. One clause answers it |
| **Hands-on lead-in** | Codevolution states the steps (#12 0:00). Sam #2 draws the plan before building (#15 0:10) | **Par** | P1 done |
| **Step 1 · old way** | Syntax: structured output still needs a try/catch (#6 4:20). Theo: an open model mis-formats JSON half the time (#4 8:39). Nobody runs the chatbot live | **Ahead** | We run it live, with both branches scripted, and give the chatbot JSON mode in the race (fairness). Nobody else is fair to the LLM |
| **Step 2 · the swap** | Codevolution reads one Noul and then a second message to show a low number (#12 15:09–16:17). Sam reads raw output (#3 5:25) | **Weaker on one point** | Ours shows the swap well. But nobody teaches the viewer how to *read* the number in v2: that 0.03 means "sure it's not", and 0.5 means "can't tell". Codevolution does (#12 7:19). We need this reading later (Step 6's "percent sure it was genuine", Step 7's two-sided line) |
| **Step 3 · three questions** | Codevolution: Choice with a "something else" option, and Score as a weighted average between described levels (#12 7:52–9:29). Sam #2 gives each type a job: lane / tier / gate (#15 3:47). Duncan: the fixed-options trap (#9 4:26). Steve: everything must be in your list (#14 1:05) | **Weaker** | Ours teaches the types well, plus the OTP criterion (nobody else teaches writing criteria). But our `SCAM_TYPES` has no "other scam" option. A scam type outside the list forces a wrong pick. Our Score comes back as a decimal (production-notes), and the script doesn't explain why |
| **Step 4 · try to fool it** | Sam probes wording, ambiguity and sarcasm on his own app (#3 8:44–10:25). Nobody asks the viewer to guess | **Ahead** | Pause-and-guess, one-by-one reveal, Hinglish (TypeSafe says English first), and a planted message for Step 6. No other video is interactive |
| **Step 5 · the race** | CampusX: one message, GPT-5 vs Jev, live, in rupees (#8 7:43). The vendor race is shown by #4, #7, #10, #12. Theo: 32K messages for 37¢ (#4 26:45). Nobody measures accuracy | **Ahead** | 100 labelled messages, accuracy as well as speed and cost, JSON-mode fairness, rupees, the comparator honesty line, S5 at scale. It's long, though (~400 words with branches) |
| **Step 6 · catching it wrong** | Theo loses nothing to checkers, he crushes it (#4 5:25). Rithesh: right type, wrong answer is possible (#10 4:25). Sam: schema ≠ truth (#3 14:09). Riley shows 54% / 71% scam calls unchecked (#13 15:06) | **Ahead** | We *show* confident mistakes from our own labelled run and pay off two plants. Others only say it |
| **Calibration** | IBM: pre-training → RLHF teaches models to *sound* sure → RLVR rewards right answers, not knowing how sure → RLCD + a diagonal (#5 6:52–10:30). CampusX draws a reliability curve but says it isn't a real figure (#8 15:54) | **Ahead on evidence, weaker on the "why"** | Our weather analogy and our own buckets beat every video (nobody measures calibration). But IBM gives the *reason* a chatbot's confidence is unreliable. Ours only says a paragraph "doesn't hand you a ready-made number" |
| **Step 7 · threshold** | IBM: three zones, and the costlier the mistake, the higher the bar (#5 10:30–12:07, ~1.5 min). Theo: slider, 80% → 22% of threads, 90% → 6.8% (#4 27:18). CampusX: 90 / 60 tiers, with a follow-up question in the middle (#8 14:47). Codevolution: pick your threshold by testing (#12 19:05). Sam #2: low confidence → a safe default (#15 5:26) | **Ahead** | DRS analogy, two-sided and asymmetric lines, a live slider with mistakes counted, and our own cascade table. Nobody measures a threshold's effect on mistakes or shows a cascade result. But it's our longest step (~430 words with branches) vs IBM's 90 s |
| **Step 8 · app** | CampusX's review app (#8 ~44:30). Riley's inbox app (#13). David's form (#11 22:14) | **Par** | Ours is the cascade in one function, plus the safety line. Theirs are bigger but don't route unsure cases |
| **Where to use it** | Theo: a person could decide in under ~10 s → good fit (#4 28:26); not a judge, no memory between calls (#4 12:28, 18:00). Codevolution: if code can compute it exactly, use code (#12 20:45). Duncan's can/can't cards (#9 2:44) | **Par, one device short** | Our four-condition rule + fits/doesn't list is sound and sourced. It lacks a one-line glance test the viewer can remember. Our hook already set one up ("you'd need a few seconds") |
| **Verdict** | Duncan: "overrated" on vibes (#9 9:20). Rithesh: test on your own workload (#10 7:41). Theo: use it like an if-statement (#4 29:32) | **Ahead** | Claim-by-claim, tied to our own run, a person-level "use it if / skip it if", plus "teammate, not replacement" |
| **Outro** | IBM, Rob and Sam end on a comment question (#5 14:36, #1 9:47, #3 15:58). Codevolution: start with one small decision (#12 21:48) | **Ahead** | A concrete "your turn" task, with a privacy warning and the 1930 helpline |

---

## 4. Teaching devices worth borrowing (devices, not lines)

| # | Device (seen in) | Where in v2 | Expected benefit | Notebook change? |
|---|---|---|---|---|
| D1 | **Say why a chatbot can't tell you how sure it is**: its training rewards sounding confident, and any number it writes is just more text (IBM #5 6:52–9:10; Sam #3 3:51; Theo #4 11:22) | First 2–3 sentences of "So Can You Trust Its Confidence?", or one line after Step 1 | Calibration then answers a problem the viewer has felt, instead of arriving as an assertion. It also justifies "Jev's answer always does" | Optional: ask the Step 1 chatbot for a `"confidence"` field too, so the viewer sees it write a number. One prompt edit, no new cell. **Needs a source first** (see §8) |
| D2 | **Teach how to read a probability before you need it**: near 0 = sure "no", near 1 = sure "yes", 0.5 = can't tell (Codevolution #12 7:19) | Step 2, right after "⟦97⟧ percent" | Step 6 ("80 percent sure it was genuine") and Step 7's two-sided rule stop being new ideas at the moment of use (E12) | No |
| D3 | **The fixed-options trap, and its fix: always give it a way out** (Duncan #9 4:26; Steve #14 1:05; Codevolution's "something else" #12 7:52; Sam's "unclear" #3 9:18) | Step 3, on the Choice question | A real, general lesson for anyone writing Choice questions. It also guards our own run: a scam outside the 8 types can't be forced into a wrong label | **Yes**: add one `other_scam` entry to `SCAM_TYPES` (1 line). The race's type accuracy may shift: re-check in the dry run |
| D4 | **Score is a weighted average of the levels**, so it can land between them (Codevolution #12 8:56) | Step 3, when the pressure score is read | Explains the decimal that production-notes already warns about ("2.6 → about 3") | No |
| D5 | **Make both halves of System 1/2 concrete** (IBM #5 0:47: an instant sum vs one you work out) | Theory, the System One paragraph | A two-sided contrast is what makes the distinction stick. Ours is one-sided. research.md already has our own version (an SMS glance vs a JEE problem) | No |
| D6 | **"You don't train it"**: no labelled data, the options are plain English (CampusX #8 4:00; David #11 3:13) | Theory, after the OMR analogy | Answers a student's natural "why not train a classifier?" and makes the swap feel as cheap as it is | No |
| D7 | **A glance test for "where to use it"** (Theo #4 28:26), plus "if plain code can compute it, use code" (Codevolution #12 20:45) | "So Where Would You Actually Use It?", as the first line | One memorable rule ties back to the hook's "you'd need a few seconds", and the code rule covers maths/dates more simply than a list | No |
| D8 | **One pipeline diagram that grows** across the session (IBM's lightboard #5; Caleb's stroke-by-stroke map #2; Sam's animated router #15 0:10) | Production notes: theory → Step 2 → 3 → 7 → 8 → verdict | Continuity. The viewer always knows where the current step sits (SMS → questions → numbers → threshold → backup LLM) | No (editor/visual only) |
| D9 | **Give each question type a job** (Sam #15 3:47: lane / tier / gate) | Step 3, one framing sentence | Ours already does this implicitly (is it / what kind / how much). Naming the jobs helps "where to use it" later | No |
| D10 | **The privacy irony**: asking a cloud model "is this private?" already sends it (Sam #15 5:26) | Outro, inside the "never paste an OTP" line | Turns a rule into a reason | No |

Already used by v2 and confirmed as winners: a result-first opening (#13), the smart-if framing inside `verdict()` (#3, #12, #15), costs in rupees (#8),
a threshold slider (#4), Jev → LLM teamwork (#5, #7), a "what it's not for" section (#4).

---

## 5. What they do that we should NOT copy

| What | Seen in | Why not (house rule) |
|---|---|---|
| Vendor multipliers as fact ("20–200× faster", "40–400× cheaper", "200×", "444×") | #1 1:05, #6 0:33, #9 0:34, #11 1:05, #13 1:41, #16 0:00; Theo calls 40–200× "real and true" (#4 10:50) | C9 (vendor numbers are claims), S10 in research (no comparator; independent 0.5–12.1× faster). v2 handles it in one attributed line. Keep it that way |
| "Zero hallucinations" / "can't hallucinate" as our own claim, or confidence you can simply "rely on" | #11 1:05 and 10:47; #8 14:12 and 16:56; Krish says hallucination is "less" (#7 22:26) | C3, W8, the content plan's claim-safety table. Our open loop exists to correct this |
| Montages of other people's demos (Doom, wiki race, self-driving, Skittles, flight booking) | #1, #4, #6, #9, #11, #13, #14, #16 (5–10 min each) | Not our evidence (S4: evidence is produced inside the session). Steve (#14) shows many of these are options hard-coded in advance. Already in the content plan's leave-out list |
| Another creator's explainer animation (the invoice / 8.5 s graphic) | #11 3:13, #16 0:33 | Reusing other people's visuals; our visuals are our own (brand rules; inspiration.md locks) |
| The "charged twice" / support-ticket example | #3, #5, #6, #8, #11 | Saturated. Our SMS is unique (research.md, running example) |
| Founder backstory, launch-post view counts, Google Trends, waitlist dates | #1, #3, #8, #10, #11, #12, #13 | No-trivia rule (style-rules.md) |
| Architecture speculation (decoder heads, prefill, parameter counts, MMLU 84.6%) | CampusX ~55:00–80:00; Sam #3 13:09 | Unverified, and fails the viewer-value test. The plan already leaves out RLCD internals |
| Long sponsor reads and self-promotion mid-explanation | #2 2:48–4:14, #4 1:05–2:43, #11 15:09–17:00, #14 7:31 | Not applicable to our channel. A reminder not to break the hands-on flow with asides |
| Vibe-coding the build with an AI agent, so the viewer sees results, not code | #11, #13, #16 | P11 (teach the swap, about 15 taught lines). The viewer can't learn from code they never see |
| Self-reported savings with no baseline check ("98% fewer tokens", "75% local") | #16 13:54, #15 16:55 | C5 (measure on a labelled test). Our race and cascade table are the correct version |
| 90-minute runtime; downsides parked at the very end | CampusX (downsides at 82 of 90 min) | W3 word budget; our catch is the story, not an appendix |
| Opening with "Hi, I'm X, welcome to my channel" | #6 0:00, #7 0:00 | H1/H7: hook first; v2's greeting comes after the hook |

---

## 6. Where v2 is already ahead (nobody else covers these)

1. **A labelled test with accuracy.** 100 messages, 60/40, with misses and false alarms counted. No video scores Jev against ground truth.
   The nearest is Riley's unchecked inbox run (#13 13:58).
2. **Confident mistakes shown, not described** (Step 6), with the hook's open loop paid off. Sam, Theo and Rithesh only *say* "it can be wrong".
3. **Calibration measured on our own run** (three buckets). IBM draws the diagonal; CampusX says its curve is not a real figure (#8 16:25).
4. **A measured cascade** (Jev alone vs chatbot alone vs Jev + backup). Thresholds appear in #4, #5, #8, #12, #15, but none shows the
   accuracy/cost result.
5. **Asymmetric, two-sided thresholds** tied to the cost of each mistake (a missed scam vs a blocked bank alert). IBM states the principle in one line.
6. **Independent evidence** (S5: 7,977 items, 44× cheaper, behind the best LLM on 14 of 15 tasks, calibration 16 of 19; S7 wording flip).
   Nobody cites any independent study.
7. **Fairness to the LLM** (JSON mode in the race) and **attribution of every company claim**.
8. **Interactivity**: pause-and-guess with a comment score. No video asks the viewer to do anything until the end.
9. **The viewer's world**: an Indian scam SMS, Hinglish (tested against TypeSafe's English-first docs), rupees, DRS, OMR, 1930.
10. **Writing criteria as part of the question** (the "even if it mentions OTPs" line). Nobody teaches criteria as a way to prevent false alarms.
11. **Safety framing** ("a learning project, not a safety product", the adversarial-defence limit applied to scams). IBM mentions hidden
    instructions in one line. Sam #3 (10:25) suggests it resists injection, which contradicts S14.

---

## 7. Proposed shortlist for v3 (proposals only; the script was not edited)

Net budget: #1–#6 add about 175 words (~70 s). #7 cuts about 100–120. Net ≈ +60 words (≈ +25 s), within the 19–19.5 min estimate.

| Priority | Section | Proposal | Why (evidence) | Cost | Notebook? |
|---|---|---|---|---|---|
| **1** | Step 2, after the first number | Teach how to read a Noul in two sentences: near 1 = sure yes, near 0 = sure no, 0.5 = can't tell. Land it on our SMS number | Step 6 and Step 7 both depend on reading "low = sure genuine", and v2 never teaches it (E12). Codevolution teaches it first (#12 7:19) | +30 words | No |
| **2** | Opening of "So Can You Trust Its Confidence?" | Add *why* you can't just ask the chatbot how sure it is: it's trained to sound confident, and any number it writes is more text. Then "Jev is trained so its numbers mean something", and on to the weather analogy | IBM's strongest passage (#5 6:52–9:10); Sam #3 3:51. Without it, calibration answers a question nobody has asked yet | +50 words | Optional 1-line prompt edit in Step 1 (ask for a confidence field). **Add a source to research.md first** (§8) |
| **3** | Step 3, the Choice question | Teach the fixed-options trap and add a way out: an "other scam" option, said in one sentence ("if the right answer isn't on your list, it still has to pick one") | Duncan #9 4:26, Steve #14 1:05, Codevolution #12 7:52. Real risk in our own `SCAM_TYPES` | +35 words | **Yes**: one `other_scam` entry in `SCAM_TYPES`; re-run the dry run |
| **4** | Theory, the System One paragraph | Make System 2 concrete with our own JEE-problem contrast (already in research.md), and add "you don't train it: you write the options in plain English" | IBM #5 0:47 (two-sided contrast); CampusX #8 4:00 (no training). Both are cheap clarity wins for students | +25 words | No |
| **5** | "So Where Would You Actually Use It?" | Open with a glance test in our own words (could a person decide it in a few seconds, like the SMS in the hook?) and "if plain code can compute it, use code". Shorten the doesn't-fit list to match | Theo #4 28:26; Codevolution #12 20:45. A rule people remember, tied back to our hook | +20 words net | No |
| **6** | Step 3, the Score answer | One clause: the score is an average of the levels, so it can land between them ("2.6, so close to outright threats") | Codevolution #12 8:56. Removes a presenter workaround from production-notes | +15 words | No |
| **7** | Steps 5–7 + calibration (≈ 1,350 words, ~9 min of numbers) | Tighten to pay for #1–#6: (a) cut the S5 "three frontier models" calibration sentence (already cut-plan item 3); (b) merge Step 7's two slider branches into one read-what-happened line; (c) in Step 5, say the S5 study in one sentence, not two | IBM covers thresholds in ~90 s (#5 10:30–12:07). Our numbers-heavy middle is the main retention risk (C1) | −100 to −120 words | No |
| **8** | Production notes (visual) | One pipeline diagram that grows across the session (SMS → questions → numbers → threshold → backup LLM), reused in theory, Steps 2/3/7/8 and the verdict | IBM's lightboard (#5), Caleb's map (#2, 6.6× reach), Sam's animated router (#15). Continuity at no word cost | 0 words | No |

**Considered and not proposed:** a live rewording probe (Sam #3 8:44). The content plan already rejected a renamed-options cell, and S7
stays as one spoken line. Open-source lookalikes / Laya (Caleb #2 6:03, Sam #15 15:17, CampusX 43:20): still out under the content plan, description only.
"Short inputs lower confidence" (Sam #3 8:44) and run-to-run variation (Sam #3 7:05): one tester's observations. **Check them in the dry
run** (SMS are short; re-run the swap cell twice and see if ⟦0.97⟧ moves), but don't script them.

---

## 8. Numbers creators state that we haven't verified (check against research.md)

| Creator claim | Where | Status vs research.md |
|---|---|---|
| "20–200× faster, 40–400× cheaper" (launch-post range); "40–200× faster"; "20–200× cheaper" | #6 0:33, #9 0:34, #13 1:41, #16 0:00; #2 1:40, #4 10:50, #10 2:45; #1 1:05 | **Not in research.** Creators disagree on the range. We only have the homepage's 193.6× / 444.6× and the independent 0.5–12.1× / 0.6–478× (S10). Keep out |
| ~68% accuracy, competitors ~70× cost; two other frontier models score higher; reference = average of two frontier models | #10 2:45–3:52, #4 15:46 | research.md's S4 says the 67.8% figure appears only in Creative AI News. **Two creators read a ~68% chart from TypeSafe's own launch post**, so S4's sourcing note may be wrong. Re-check the launch post. Stays out either way (it measures agreement, not correctness) |
| Structured-output error rates (a smaller model 45.5%, a frontier model ~16% on tool calls); Jev 0% | #4 17:27, #10 3:52, #11 10:47 | Vendor chart; **not in research**. Rithesh notes Jev's 0% was set by design, not measured. That supports our "shape, not truth" framing. Don't cite the LLM rates |
| Doom at ~10 decisions/s for ~$7/hour | #1 4:54, #3 14:49, #4 18:00, #10 4:25 | Company demo; not in research; borrowed demo. Out |
| Context window 32k vs 64k | #4 13:33 vs #13 15:40 | Matches S14's disagreement. Out of the script (correct) |
| 24× cheaper than Haiku, 238× cheaper than Fable | #9 1:06 | Not in research. Out |
| A customer's swap: 6× faster, "saturated the eval" | #1 2:10 | Unverified customer anecdote. Out |
| 13× faster than GPT-5 on one message; ₹10,000 vs ₹40 per day for 10K emails; 81× cheaper; 5 questions in 130 ms; "no limit" on questions | #8 8:49–12:37 | One live run, not ours. "No limit" contradicts S14's token ceiling. Out |
| MMLU 84.6% | #8 63:39 | From an unverified blog. Out |
| 8.6 s / 1.4¢ vs 114 ms / <0.01¢ (≈ 1/170 the cost) | #12 4:31, #4 14:07, #7 1:36 | TypeSafe's homepage demo. S3 has the 0.114 s; the cost ratio is not in research. Out (we measure our own) |
| "47,000 messages for $1" at 500 input tokens | #12 5:05 | Arithmetic from S2's $0.042/M: consistent. We use our own cost per 1,000 instead |
| Score uses up to 10 levels; Noul returns no separate confidence; Score = weighted average of level probabilities | #15 3:15; #12 9:00–10:37 | **Not in research.** S12 says only "a position on your rubric"; S11 says confidence = how peaked the spread is. Verify in the promptfoo / SDK docs before using D4 (proposal #6) |
| Output tokens: Jev "has no output tokens" vs a usage line showing 23 output tokens | #13 4:31 vs #12 15:44 | S2 says output is *not billed*, which is consistent with both. Keep our wording "the answers aren't billed"; don't say "no output tokens" |
| Chatbots' self-stated confidence is overconfident | #4 11:22 (reading the launch post), #5 3:26 | **Needed for proposal #2 and not in research.** The launch post is a company claim; add an independent source on LLM verbalised-confidence calibration before scripting it |
| It resists prompt injection | #3 10:25 | Contradicts S14 ("cannot perform … adversarial defense") and IBM (#5 12:41). Our v2 wording (S14) stands |
