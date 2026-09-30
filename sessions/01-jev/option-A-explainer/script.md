# Script A: Jev Explained, The AI That Only Decides (V4)

**Format:** face cam + screen visuals and B-roll · **target 11:00** · standalone · no code on screen
**Teaching flow and facts:** `TR-doc.md` · **Written to:** `../../../guidelines/script-vs-video-analysis.md` rules W1–W11

> **Cues:** **[FACE]** host to camera · **[SCREEN]** full-screen visual · **[B-ROLL]** cutaway · **[TEXT]** on-screen text · **[SFX]** sound effect · **[SAY]** spoken line (V4 wording) · **[OPTIONAL]** cut first if running long
> **Delivery:** one idea per sentence; pause on every **bold** number.

## Before recording

**Promise ledger (W6).** Every promise made in the hook, and the chapter that pays it off. Re-check this list after any cut.

| Promise | Made at | Delivered at |
|---|---|---|
| "We'll see what Jev actually is" | 0:00 | 2:00 It decides, it doesn't write |
| "…why it matters" | 0:00 | 0:40 Why the internet lost its mind; 8:00 Where it's actually useful |
| "…which claim is only half true" | 0:00 | 5:30 Do the two big claims hold up? |
| "0.5 means I don't know… matters later" | 2:00 | 5:30 The fix (slider) |

**Word budget (W3), at ~150 words per minute.** Pauses and B-roll fill the gap between the spoken total and the runtime.

| Chapter | Time | Budget | Spoken (measured) |
|---|---|---|---|
| The AI that can't say hello | 0:00–0:40 | ≤ 100 | 87 |
| Why the internet lost its mind | 0:40–2:00 | ≤ 200 | 93 |
| It decides, it doesn't write | 2:00–4:30 | ≤ 375 | 139 |
| Is ChatGPT dead? | 4:30–5:30 | ≤ 150 | 56 |
| Do the two big claims hold up? | 5:30–8:00 | ≤ 375 | 222 |
| Where it's actually useful | 8:00–9:15 | ≤ 190 | 39 |
| The rivals already coming | 9:15–10:15 | ≤ 150 | 78 |
| The verdict | 10:15–11:00 | ≤ 110 | 47 |

**Runtime risk (measured, W3):** the V4 wording totals **~760 spoken words, about 5 minutes of speech**. To reach the 11-minute target, the visuals and pauses would have to carry ~6 minutes. Delivered as written, expect **~7–8 minutes**. Decide at review: accept a shorter video, or add narration to the lightest chapters (Where it's useful: 39 words; Is ChatGPT dead?: 56; The verdict: 47).

**Checks done (W7–W9):**
- **Claims check.** Every claim is TypeSafe's or a named tester's, with its fine print said aloud.
- **Reference check.** "Remember that" (2:00) points forward to 5:30, which exists.
- **No references to other videos.** The closing tease of a future build appears only in the outro.

**Not applicable:** W1/W2 (hands-on scripting and placement), because this session has no demo.

---

## 0:00 The AI that can't say hello

**[SCREEN]** A chat box. Someone types **"Hi!"** to Jev. Instead of a reply, a single number appears. **[SFX]** a soft blip.
**[SAY]** "This is **Jev**. You can't chat with it. It can't write a sentence, explain anything, or even say hello."

**[FACE]**
**[SAY]** "And yet it's the most talked-about AI launch of September. Developers are putting it inside their apps, and **five major platforms** added support in about a week."

**[TEXT]** ① "It can't hallucinate" ② "Its answers are free"
**[SAY]** "Its makers say two things about it. One: it can't hallucinate. Two: its answers are free."

**[FACE]** Lean in.
**[SAY]** "In the next ten minutes, we'll see what Jev actually is, why it matters, and **which of those two claims is only half true**."

**[SAY] Re-hook:** "First: why did an AI that can't talk get this much attention?"

---

## 0:40 Why the internet lost its mind

**[SCREEN]** A timeline graphic that builds left to right, in date order:
- **Sep 15:** launch, $40M seed (DCVC)
- **Sep 15–30:** HN thread passes ~2,000 points
- **Sep 16–23:** Vercel · LangChain · OpenRouter · DigitalOcean · Pydantic AI
- **Sep 20:** signups open
- **Sep 22:** signups paused

**[SAY]** "The founder, Diogo Almeida, co-authored **InstructGPT**, the research that taught language models to follow instructions and became the basis of ChatGPT. So people listened."

**[FACE]**
**[SAY]** "But the real reason is simpler. Every app is full of small decisions."
**[B-ROLL]** Three quick cards: "Spam?" · "Which team?" · "About to delete something?"
**[SAY]** "Is this spam? Which team should get this ticket? Is this AI agent about to delete something? Today each one means calling a chatbot, waiting seconds, and paying for words you throw away."

**[TEXT]** "≈ 4¢ per 1,000 decisions" · "smart if-statements"
**[SAY]** "Jev answers those in under a second, for roughly **four cents per thousand decisions**. TypeSafe calls it '**smart if-statements**'."

**[SAY] Re-hook:** "So what exactly is it, if it isn't a chatbot?"

---

## 2:00 It decides, it doesn't write

**[SCREEN]** Split animation. Left: a robot writing a messy essay, labelled "Chatbot: writes". Right: a robot filling three bubbles instantly, labelled "Jev: decides".
**[SAY]** "Think of an exam. A chatbot writes the long answer: maybe right, maybe five paragraphs of 'it depends.' Jev fills the **OMR sheet**. The options are fixed in advance, so it can never go off-format."

**[FACE]**
**[SAY]** "TypeSafe calls it a **System One** model. System Two is slow, careful thinking, like solving a JEE maths problem. System One is the instant gut call, like glancing at an SMS and thinking 'scam.' Chatbots are built for System Two. Jev is built for System One."

**[SAY]** "You give Jev the thing to judge and a set of questions. It only understands three kinds."
**[SCREEN]** Three cards, one at a time, each using the same example SMS:
- **Noul:** yes or no? → **0.97**
- **Choice:** which one? → **Bill disconnection**
- **Score:** how much? → **2.6 of 3**

**[SAY]** (over the cards) "Yes or no. Pick one. How much."

**[FACE]**
**[SAY]** "And every answer comes with a number showing how sure it is. **0.97** means 'very likely.' **0.5** means 'I honestly don't know.' Remember that. It matters later."

**[SAY] Re-hook:** "If it's this fast and this cheap, is ChatGPT finished?"

---

## 4:30 Is ChatGPT dead?

**[FACE]** Beat. **[TEXT]** "NO."
**[SCREEN]** The comparison card (TypeSafe's own price comparison), rows highlighted one at a time: output · speed · input price · output price · tells you how sure · good at.
**[SAY]** "Jev can't write, explain, or reason step by step. TypeSafe's own docs say it's **not a drop-in replacement** for a chatbot."

**[B-ROLL]** Messages pour through a fast Jev gate into green and red bins; a few amber ones pass to a slower chatbot box labelled "the hard ones".
**[SAY]** "The two work as a team. Jev makes thousands of quick calls, and the chatbot handles the rare hard ones. LangChain has a phrase for it: '**cheap by default, frontier on exception**.'"

**[SAY] Re-hook:** "But fast and cheap means nothing if it's wrong. So, do the two big claims hold up?"

---

## 5:30 Do the two big claims hold up?

**[TEXT]** "CLAIM 1: It can't hallucinate"
**[FACE]**
**[SAY]** "Here's the trick. Jev can't hallucinate a **format**. Ask it yes or no, and you will always get a number between 0 and 1. It will never crash your code with a messy paragraph. But can the **answer** be wrong? Yes. And TypeSafe says so itself, in the fine print."

**[SCREEN]** The claim on the left; the fine print slides in on the right, each row with its source:
- 0% hallucination → *"Our number is not empirical."*
- Can't be wrong → the CEO on HN: *"it's also possible to be confidently wrong"*
- Works on anything → *English-first · "not a calculator" · adversarial text "can move the answer"*

**[SAY]** "Independent testers found the same thing. In a small test by the tech publication **Every**, Jev caught **6 of 7** planted mistakes; a bigger model caught all 7. On a fake job-posting dataset, one tester found Jev caught only about **23%** of frauds, though the classic classifier it lost to had been trained on that exact dataset."

**[FACE]**
**[SAY]** "So the honest version is: Jev never breaks your code, but it can hand you a perfectly formatted, perfectly confident, **wrong** answer."
**[TEXT]** large: "A format guarantee is not a truth guarantee."

**[TEXT]** "CLAIM 2: The answers are free"
**[SAY]** "This one mostly holds. Chatbots charge for every word they write, and output usually costs about **five times** more than input. Jev writes nothing, so output is free. You only pay for what you send in."
**[SAY]** "But free output isn't a free call. The input still costs money. And TypeSafe itself says it can't prove today's price isn't subsidised, so it may not last."

**[B-ROLL]** A DRS "UMPIRE'S CALL" graphic.
**[SAY]** "Remember the confidence number? That's how you use Jev safely. Like DRS in cricket: a clear hit overturns the decision; a ball clipping the stumps stays umpire's call."
**[SCREEN]** A slider with three zones: **above 0.9:** act on it · **below 0.1:** let it through · **in between:** send it to a chatbot or a human for a second opinion.

**[SAY] Re-hook:** "So where is Jev genuinely brilliant?"

---

## 8:00 Where it's actually useful

**[SCREEN]** Five cards, about 12 s each, each tagged **vendor** or **independent**:
1. Placement-email sorter: 95 messages × 5 questions in 1.2 s (*vendor demo, OpenRouter*)
2. Group-chat moderator: 114 ms per check (*vendor, TypeSafe cookbook*)
3. Search ranking: top-result accuracy 0.80 → 0.95 (*independent, Hindsight*)
4. AI-agent safety check: agent step 1.97 s → 0.46 s (*Browserbase, via LangChain*)
5. Resume screener: self-reported only (*test before trusting*)

**[SAY]** (over the cards) "Jev fits any app that makes the same small judgement again and again."

**[FACE]**
**[SAY]** "If you're building a college project, any of these is a weekend build. Tell us in the comments which one you want us to build next."

**[SAY] Re-hook:** "There's a catch, though: Jev only runs on TypeSafe's servers."

---

## 9:15 The rivals already coming

**[B-ROLL]** Laya's Hugging Face page, then a laptop terminal running it.
**[SAY]** "Three days after launch, Convai Innovations released **Laya**: free, open-source, speaks Jev's format, and runs on a laptop. The catch: on the JevBench leaderboard, Jev scores **63.3** while base Laya scores **30.3**. Laya's big wins come from a version trained on the test itself."

**[FACE]**
**[SAY]** "Small open models like Imajev-4B and Plumb-4B already edge past Jev on the same leaderboard. So this isn't one product. It's the start of a new category of AI."
**[TEXT]** large: "Jev is accurate out of the box. Open rivals are free, private, and trainable."

**[SAY] Re-hook:** "So: is it worth the hype?"

---

## 10:15 The verdict

**[SCREEN]** The verdict card, one row at a time with a stamp:
- "It can't hallucinate" → **HALF TRUE**
- "Its answers are free" → **TRUE, with fine print**
- Worth the hype? → **YES, for quick yes/no and pick-one decisions**

**[FACE]**
**[SAY]** "A fast model gives you answers. A threshold, a test and a backup give you **trust**."

**[SAY]** "In our next video, we actually build with it: we feed Jev a hundred real-looking Indian scam messages and see how many it catches. Subscribe so you don't miss it."
**[SCREEN]** End card.

**Pinned comment:** *"Which trend should we break down next? And if a scam message worries you, contact the organisation through its official app, or report cyber fraud on 1930 or cybercrime.gov.in."*

---

## Cut plan (if a take runs long)
1. Drop use-case card 5 (resume screener).
2. Shorten the Laya line to its first and last sentences.
3. Shorten "The real reason is simpler" to its first question.

Never cut the fine-print table, or the "format guarantee" line that pays off the hook.
