# Jev Explained: The New AI Model That Only Decides - V4.1

**Series:** NxtWave YouTube — Gen AI Video Series (standalone session)

**Topic:** Jev by TypeSafe AI — what it is, whether its claims hold up, and whether you should care

**Format:** face cam + screen visuals and B-roll · ~11 min · no notebook, no build, no code on screen · **Recorded:** ⟦date⟧

---

**Key Takeaways:**

- **The Model Everyone's Talking About**
- **Why the Hype?**
- **It Decides, It Doesn't Write**
- **Jev vs LLMs: Rivals or Teammates?**
- **Do the Two Big Claims Hold Up?**
    - **Claim 1: "It Can't Hallucinate"**
    - **Claim 2: "The Answers Are Free"**
    - **Using Jev Safely**
- **Where It's Actually Useful**
- **The Open-Source Challengers**
- **The Verdict**

---

<MultiLineNote>

**How this session is told.** It's a trend explainer that introduces Jev the way the leading creators do: accurately, as a new kind of **AI model**, and by what it's *for*. Our own flavour is layered on top:
- Indian student examples: OMR sheets, JEE, cricket's DRS, scam SMS
- honest fine print on every vendor claim
- a clear verdict at the end

**Promise:** in 11 minutes, know what Jev is, whether its claims hold up, and whether you should care.

- **One open loop.** The hook promises that *one of Jev's two big claims is only half true*. It's paid off halfway through, in "Do the Two Big Claims Hold Up?".
- **A bridge closes every chapter**, leading into the next one.
- **Consistent terms.** "LLM" is defined once (the models behind ChatGPT, Gemini, Claude), then used throughout. Jev is always a **model**, never "an AI that can't…".
- **No code.** Every concept gets one visual.

**What changed from V4:**
- The hook now opens by introducing Jev as a new model. The old opening, "the AI that can't say hello", has been dropped.
- "Is ChatGPT Dead?" is now **"Jev vs LLMs: Rivals or Teammates?"**.
- "The Rivals Already Coming" is now **"The Open-Source Challengers"**.
- "LLM" is defined early.

Re-verify dates, funding, leaderboard scores and quotes on recording day.

</MultiLineNote>

## The Model Everyone's Talking About

*(0:00–1:20, hook + intro)*

Everyone in the AI world is talking about **Jev**, a new model from **TypeSafe AI**. It doesn't generate text at all. Instead, it makes **decisions**.

Within a week of launch, five major platforms had added it, and developers are already putting it inside their apps.

Its makers say two big things about it:

1. **It can't hallucinate.**
2. **Its answers are free.**

So what is Jev, why the hype, and which of those claims actually holds up? **One of them is only half true.**

**Image Block:**
**Title**: Opening frame
**Prompt**: "News-style montage frame: the word 'Jev' in bold over a collage of launch headlines and platform logos (Vercel, LangChain, OpenRouter, DigitalOcean, Pydantic AI). Two claim cards below: 'Can't hallucinate' and 'Answers are free', with a small red question mark. Dark background, clean tech style."

**Bridge →** *So why is the whole tech world so excited?*

---

## Why the Hype?

*(1:20–2:50)*

Jev got attention for three reasons: its founder's credentials, instant platform support, and a price that makes AI cheap enough for every tiny decision.

| Date | What happened |
| --- | --- |
| Sep 15 | TypeSafe AI launches Jev in early access with a $40M seed round led by DCVC |
| Sep 15–30 | The Hacker News launch thread passes about 2,000 points |
| Sep 16–23 | Vercel, LangChain, OpenRouter, DigitalOcean and Pydantic AI add support |
| Sep 20 | Signups open to everyone |
| Sep 22 | Signups pause, two days after opening, citing demand |

**The founder:** Diogo Almeida co-authored **InstructGPT**, the research that taught language models to follow instructions and became the basis of ChatGPT.

**The real reason:** every app is full of small decisions (*is this spam, which team should get this ticket, is this AI agent about to delete something?*), and today each one means sending the question to a big AI model, waiting seconds, and paying for words that get thrown away. Jev answers them in under a second, for roughly **four cents per thousand decisions**. TypeSafe's own name for it is **"smart if-statements."**

> **Jev makes AI cheap enough to put behind every if-statement.**

**Bridge →** *So what exactly is Jev, and how is it different from the models we already know?*

---

## It Decides, It Doesn't Write

*(2:50–4:50)*

The models behind ChatGPT, Gemini and Claude are **LLMs** (large language models). They take text in and **generate** text out. Jev is a **decision model**: it takes text in and returns a **decision**.

> **An LLM writes an essay answer. Jev fills in an OMR sheet.** The bubbles are fixed in advance, so the answer always fits the format.

**Image Block:**
**Title**: LLM vs Jev
**Prompt**: "Split screen. Left: a robot writing a long, messy essay, labelled 'LLM: generates text'. Right: a robot filling three OMR bubbles instantly, labelled 'Jev: makes decisions'. Flat illustration, dark background, amber and green accents."

TypeSafe calls Jev a **System One** model:
- **System Two** is slow, careful thinking, like a JEE maths problem. LLMs are built for this.
- **System One** is the instant gut call, like glancing at an SMS and thinking "scam." Jev is built for this.

You give Jev the thing to judge and a set of questions. There are three kinds:

| Question type | Asks | Returns | Example |
| --- | --- | --- | --- |
| **Noul** | Yes or no? | Probability of yes | Is this a scam? → 0.97 |
| **Choice** | Which one? | Best option, plus a probability for each | What kind? → Bill disconnection |
| **Score** | How much? | A position on your scale | How much pressure? → 2.6 of 3 |

Every answer comes with a number showing how sure Jev is: **0.97** means "very likely," and **0.5** means "I honestly don't know." That second number matters later.

### So Far

- **LLMs generate text; Jev makes decisions,** like filling an OMR sheet.
- Three question types: **Noul, Choice, Score**.
- Every answer carries a confidence number.

**Bridge →** *If it's this fast and this cheap, is it here to replace LLMs?*

---

## Jev vs LLMs: Rivals or Teammates?

*(4:50–6:00)*

**Teammates.** Jev takes over the small, repetitive decisions inside apps; it doesn't replace the LLM.

| | LLM | Jev |
| --- | --- | --- |
| Output | Generated text, word by word | Only the options you defined |
| Speed | Seconds | Under a second |
| Input price | $0.20–$10 per million tokens | $0.042 per million tokens |
| Output price | About 5x input | Free |
| Tells you how sure it is | Not reliably | Yes, every answer |
| Good at | Writing, code, explaining, reasoning | Classifying, routing, scoring, checking |

(Prices are TypeSafe's own comparison. **Tokens** are small chunks of text, roughly a word each.)

Jev can't write, explain, or reason step by step. TypeSafe's docs say it's **not a drop-in replacement** for an LLM. The two work as a team: Jev makes thousands of quick calls, and the LLM handles the rare hard ones. LangChain calls this **"cheap by default, frontier on exception."**

**Image Block:**
**Title**: The team
**Prompt**: "Many message icons pour into a fast 'Jev' gate that sorts them into green and red bins; a few amber ones pass to a slower 'LLM' box labelled 'the hard ones'. Minimal, dark background."

**Bridge →** *But fast and cheap means nothing if it's wrong. Do the two big claims hold up?*

---

## Do the Two Big Claims Hold Up?

*(6:00–8:20)*

### Claim 1: "It Can't Hallucinate"

Jev can't hallucinate a *format*. A yes/no question always returns a number between 0 and 1, and it never crashes your code with a messy paragraph. But the *answer* can be wrong, and TypeSafe says so itself:

| The hype | TypeSafe's own fine print |
| --- | --- |
| 0% hallucination | *"Our number is not empirical."* Only the format match is guaranteed |
| Can't be wrong | The CEO on Hacker News: *"it's also possible to be confidently wrong"* |
| Works on anything | Docs: English is the primary language; Jev *"is not a calculator"*; adversarial text *"can move the answer"* |

Independent tests:
- **Every** (a tech publication), in a small test: Jev caught 6 of 7 planted mistakes, and a bigger model caught all 7.
- **A fake job-posting dataset:** Jev caught about **23%** of frauds. The classifier that beat it was **trained on that exact dataset**.

> **A format guarantee is not a truth guarantee.** Verdict: half true.

### Claim 2: "The Answers Are Free"

LLMs charge for every word they write. Jev writes nothing, so its output is free, and you only pay for what you send in. Free output isn't a free call, though: input still costs, and TypeSafe says it **can't prove the price isn't subsidised**. Verdict: true, with fine print.

### Using Jev Safely

The confidence number works like **DRS in cricket**: a clear hit overturns the decision, while a ball just clipping the stumps stays **umpire's call**.

| Confidence | What to do |
| --- | --- |
| **Above 0.9** | Act on it |
| **Below 0.1** | Let it through |
| **In between** | Send it to an LLM or a human for a second opinion |

### So Far

- **Claim 1:** half true. The format is guaranteed; the answer can be confidently wrong.
- **Claim 2:** true, with fine print.
- **The fix:** act only when Jev is sure, and double-check the rest.

**Bridge →** *So where is Jev genuinely brilliant?*

---

## Where It's Actually Useful

*(8:20–9:10)*

Jev fits any app that makes the same small judgement again and again. On screen, label each number as vendor or independent.

| Idea | Question Jev answers | Measured result | Source type |
| --- | --- | --- | --- |
| Placement-email sorter | Interview invite, rejection or spam? | 95 messages × 5 questions in 1.2 s | Vendor demo (OpenRouter) |
| Group-chat moderator | Is this message abusive? | 114 ms per check | Vendor (TypeSafe cookbook) |
| Search ranking | Which result answers the question? | Top-result accuracy 0.80 → 0.95 | Independent (Hindsight) |
| AI-agent safety check | Is this command about to delete something? | Agent step time 1.97 s → 0.46 s | Browserbase, via LangChain |
| Resume screener | Does this resume match the role? | Self-reported only | Test before trusting |

**Bridge →** *One catch: Jev is closed and runs only on TypeSafe's servers.*

---

## The Open-Source Challengers

*(9:10–9:55)*

**Laya** is from Convai Innovations and arrived three days after launch. It's a free, open-source decision model that speaks Jev's format and runs on a laptop. On **JevBench**, Jev scores **63.3** and base Laya **30.3**; Laya's big wins come from a version trained on the test itself. Small open models such as **Imajev-4B** and **Plumb-4B** already edge past Jev on the same leaderboard. Decision models are becoming a **new category of AI**.

> **Jev is accurate out of the box. The open-source challengers are free, private and trainable.**

**Bridge →** *So, is it worth the hype?*

---

## The Verdict

*(9:55–11:20, including the outro)*

| Claim | Verdict |
| --- | --- |
| "It can't hallucinate" | **Half true.** The format is guaranteed; the answer can still be confidently wrong |
| "Its answers are free" | **True, with fine print.** Output is free, input still costs, and the price may be subsidised |
| Worth the hype? | **Yes,** for quick yes/no and pick-one decisions, used with a confidence threshold and a fallback |

> **A fast model gives you answers. A threshold, a test and a backup give you trust.**

The outro teases the next video (a Jev build on a hundred real-looking Indian scam messages) and pins: *"Which trend should we break down next? And if a scam message worries you, contact the organisation through its official app, or report cyber fraud on 1930 or cybercrime.gov.in."*

---

## Production Notes

See `production-notes.md` for the runtime, visuals, checks, cut plan and titles. Facts and their sources are in `../archive/v3/05-presenter-runbook.md` §7.
