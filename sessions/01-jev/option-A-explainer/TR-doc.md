# Jev Explained: The AI That Only Decides - V4

**Series:** NxtWave YouTube — AI Trend Explainers (standalone session)

**Topic:** Jev by TypeSafe AI — what it is, whether its claims hold up, and whether you should care

**Format:** face cam + screen visuals and B-roll · 10–12 min · no notebook, no build, no code on screen · **Recorded:** ⟦date⟧

---

**Key Takeaways:**

- **The AI That Can't Say Hello**
- **Why the Internet Lost Its Mind**
- **It Decides, It Doesn't Write**
- **Is ChatGPT Dead?**
- **Do the Two Big Claims Hold Up?**
    - **Claim 1: "It Can't Hallucinate"**
    - **Claim 2: "The Answers Are Free"**
    - **The Fix**
- **Where It's Actually Useful**
- **The Rivals Already Coming**
- **The Verdict**

---

<MultiLineNote>

**How this session is told.** It's a trend explainer with **Jev as the subject from the first second**. The promise: *in 11 minutes, know what Jev is, whether its claims hold up, and whether you should care.* Audience: students and early developers who follow AI news but haven't used Jev.

- **One open loop.** The hook promises that *one of Jev's two big claims is only half true*. It's paid off at **5:30, halfway through**, not at the end, so the second half runs on "so where is it actually useful?"
- **A re-hook closes every chapter.** Each is written at the end of its section below.
- **No code.** Every concept gets one visual (the OMR sheet, three question cards, a comparison card, a slider).

All facts carry over from V3's research. Re-verify dates, funding, leaderboard scores and quotes on recording day. This is the V4 script in house TR format. The only changes are formatting, plus the timeline table, which now runs in date order.

</MultiLineNote>

## The AI That Can't Say Hello

*(0:00–0:40)*

**Visual:** a chat box. Someone types *"Hi!"* to Jev. Instead of a reply, a single number comes back.

This is **Jev**. You can't chat with it. It can't write a sentence, explain anything, or even say hello.

Yet it's the most talked-about AI launch of September 2026. Developers are putting it inside their apps, and five major platforms added support in about a week.

Its makers say two things about it:

1. **It can't hallucinate.**
2. **Its answers are free.**

In the next ten minutes, we'll see what Jev actually is, why it matters, and **which of those two claims is only half true**.

**Re-hook →** *First, why did an AI that can't talk get this much attention?*

---

## Why the Internet Lost Its Mind

*(0:40–2:00)*

Jev got attention for three reasons: its founder's credentials, instant platform support, and a price that makes AI cheap enough for every tiny decision.

**Visual:** a timeline graphic built from this table.

| Date | What happened |
| --- | --- |
| Sep 15 | TypeSafe AI launches Jev in early access with a $40M seed round led by DCVC |
| Sep 15–30 | The Hacker News launch thread passes about 2,000 points |
| Sep 16–23 | Vercel, LangChain, OpenRouter, DigitalOcean and Pydantic AI add support |
| Sep 20 | Signups open to everyone |
| Sep 22 | Signups pause, two days after opening, citing demand |

**The founder:** Diogo Almeida co-authored **InstructGPT**, the research that taught language models to follow instructions and became the basis of ChatGPT. So people listened.

**The real reason is simpler.** Every app is full of small decisions:
- *Is this spam?*
- *Which team should get this ticket?*
- *Is this AI agent about to delete something?*

Today, each one means calling a chatbot, waiting seconds, and paying for words that get thrown away. Jev answers them in under a second, for roughly **four cents per thousand decisions**. TypeSafe's own name for it: **"smart if-statements."**

> **Jev makes AI cheap enough to put behind every if-statement.**

**Re-hook →** *So what exactly is it, if it isn't a chatbot?*

---

## It Decides, It Doesn't Write

*(2:00–4:30)*

A chatbot writes an essay answer; Jev fills in an OMR sheet, so its answer always fits the bubbles you gave it.

**Image Block:**
**Title**: Chatbot vs Jev
**Prompt**: "Split screen. Left: a robot writing a messy essay, labelled 'Chatbot: writes'. Right: a robot filling three OMR bubbles instantly, labelled 'Jev: decides'. Flat illustration, dark background, amber and green accents."

Think of an exam:
- A chatbot writes the long answer. Maybe it's right, maybe it's five paragraphs of "it depends."
- Jev fills the OMR sheet. The options are fixed in advance, so it can never go off-format.

TypeSafe calls it a **System One** model:
- **System Two** is slow, careful thinking, like solving a JEE maths problem. Chatbots are built for this.
- **System One** is the instant gut call, like glancing at an SMS and thinking "scam." Jev is built for this.

You give Jev the thing to judge and a set of questions. It only understands three kinds.

**Visual:** three cards appear one by one, all using the same example SMS.

| Question type | Asks | Returns | Example |
| --- | --- | --- | --- |
| **Noul** | Yes or no? | Probability of yes | Is this a scam? → 0.97 |
| **Choice** | Which one? | Best option, with a probability for each | What kind? → Bill disconnection |
| **Score** | How much? | A position on your scale | How much pressure? → 2.6 of 3 |

Every answer comes with a number showing how sure it is. **0.97** means "very likely." **0.5** means "I honestly don't know." That second number matters later.

### So Far

- A chatbot **writes**. Jev **decides**, like filling an OMR sheet.
- Three question types: **Noul, Choice, Score**.
- Every answer carries a confidence number.

**Re-hook →** *If it's this fast and this cheap, is ChatGPT finished?*

---

## Is ChatGPT Dead?

*(4:30–5:30)*

**No.** Jev replaces the small, repetitive decisions inside apps, not the chatbot itself.

**Visual:** comparison card. The prices are TypeSafe's own comparison.

| | Chatbot | Jev |
| --- | --- | --- |
| Output | Free text, word by word | Only the options you defined |
| Speed | Seconds | Under a second |
| Input price | $0.20–$10 per million tokens | $0.042 per million tokens |
| Output price | About 5x input | Free |
| Tells you how sure it is | Not reliably | Yes, every answer |
| Good at | Writing, code, explaining, reasoning | Classifying, routing, scoring, checking |

Jev can't write, explain, or reason step by step. TypeSafe's own docs say it's **not a drop-in replacement** for a chatbot.

The two work as a team: Jev makes thousands of quick calls, and the chatbot handles the rare hard ones. LangChain's phrase for it: **"cheap by default, frontier on exception."**

**Image Block:**
**Title**: The team
**Prompt**: "Many message icons pour into a fast 'Jev' gate that sorts them into green and red bins; a few amber ones pass to a slower chatbot box labelled 'the hard ones'. Minimal, dark background."

**Re-hook →** *But fast and cheap means nothing if it's wrong. So, do the two big claims hold up?*

---

## Do the Two Big Claims Hold Up?

*(5:30–8:00)*

"Can't hallucinate" is **half true**: the format is guaranteed, the answer is not. "Free answers" is **true, with fine print**.

### Claim 1: "It Can't Hallucinate"

Jev can't hallucinate a *format*. Ask it yes or no, and you will always get a number between 0 and 1. It will never crash your code with a messy paragraph.

Can the *answer* be wrong? Yes, and TypeSafe says so itself in the fine print.

**Visual:** the claim on the left, the fine print sliding in on the right.

| The hype | TypeSafe's own fine print |
| --- | --- |
| 0% hallucination | *"Our number is not empirical."* Only the format match is guaranteed |
| Can't be wrong | The CEO on Hacker News: *"it's also possible to be confidently wrong"* |
| Works on anything | Docs: English is the primary language; Jev *"is not a calculator"*; adversarial text *"can move the answer"* |

Independent testers found the same:
- **Every** (a tech publication) ran a small test. Jev caught 6 of 7 planted mistakes; a bigger model caught all 7.
- **A fake job-posting dataset:** one tester found Jev caught only about **23%** of frauds. The classic classifier it lost to had been **trained on that exact dataset**.

The honest version: Jev never breaks your code, but it can hand you a perfectly formatted, perfectly confident, **wrong** answer.

> **A format guarantee is not a truth guarantee.**

### Claim 2: "The Answers Are Free"

This one mostly holds:
- Chatbots charge for every word they write, and output usually costs about **five times more** than input.
- Jev writes nothing, so output is free. You only pay for what you send in.

The fine print:
- **Free output isn't a free call.** The input still costs money.
- **The price may not last.** TypeSafe says it can't prove today's price isn't subsidised.

### The Fix

The confidence number is how you use Jev safely. It works like **DRS in cricket**: a clear hit overturns the decision, while a ball just clipping the stumps stays **umpire's call**.

**Visual:** a slider with three zones.

| Confidence | What to do |
| --- | --- |
| **Above 0.9** | Act on it |
| **Below 0.1** | Let it through |
| **In between** | Send it to a chatbot or a human for a second opinion |

### So Far

- **Claim 1:** half true. The format is guaranteed, but the answer can be confidently wrong.
- **Claim 2:** true, with fine print. Output is free, input costs, and the price may be subsidised.
- **The fix:** act only when Jev is sure, and double-check the rest.

**Re-hook →** *So where is Jev genuinely brilliant?*

---

## Where It's Actually Useful

*(8:00–9:15)*

Jev fits any app that makes the same small judgement again and again. On screen, label each number as vendor or independent.

| Idea | Question Jev answers | Measured result | Source type |
| --- | --- | --- | --- |
| Placement-email sorter | Interview invite, rejection or spam? | 95 messages × 5 questions in 1.2 s | Vendor demo (OpenRouter) |
| Group-chat moderator | Is this message abusive? | 114 ms per check | Vendor (TypeSafe cookbook) |
| Search ranking | Which result answers the question? | Top-result accuracy 0.80 → 0.95 | Independent (Hindsight) |
| AI-agent safety check | Is this command about to delete something? | Agent step time 1.97 s → 0.46 s | Browserbase, via LangChain |
| Resume screener | Does this resume match the role? | Self-reported only | Test before trusting |

Any of these is a weekend college project. Viewers are asked which one they'd like to see built next.

**Re-hook →** *There's a catch, though: Jev only runs on TypeSafe's servers.*

---

## The Rivals Already Coming

*(9:15–10:15)*

Jev is closed and runs only on TypeSafe's servers. Open alternatives appeared within days, but they're weaker out of the box.

**Laya** arrived three days after launch, from Convai Innovations:
- It's free and open source.
- It speaks Jev's format.
- It runs on a laptop.

The catch: on the **JevBench** leaderboard, Jev scores **63.3** and base Laya scores **30.3**. Laya's big wins come from a version trained on the test itself.

Small open models such as **Imajev-4B** and **Plumb-4B** already edge past Jev on the same leaderboard. So this isn't one product. It's the start of a **new category of AI**.

> **Jev is accurate out of the box. Open rivals are free, private and trainable.**

**Re-hook →** *So, is it worth the hype?*

---

## The Verdict

*(10:15–11:00)*

Jev is worth the hype for fast, high-volume decisions. It isn't a chatbot replacement, and it isn't something to trust blindly.

**Visual:** verdict card.

| Claim | Verdict |
| --- | --- |
| "It can't hallucinate" | **Half true.** The format is guaranteed; the answer can still be confidently wrong |
| "Its answers are free" | **True, with fine print.** Output is free, input still costs, and the price may be subsidised |
| Worth the hype? | **Yes,** for quick yes/no and pick-one decisions, used with a confidence threshold and a fallback |

> **A fast model gives you answers. A threshold, a test and a backup give you trust.**

The session closes by teasing the next video: a Jev build that runs a hundred real-looking Indian scam messages to see how many it catches.

**Pinned comment:** *"Which trend should we break down next? And if a scam message worries you, contact the organisation through its official app, or report cyber fraud on 1930 or cybercrime.gov.in."*

---

## Production Notes

- **Titles:** *"Jev Explained: The AI That Can't Talk (But Everyone Wants)"*, or the alternative *"This New AI Can't Say Hello. Here's Why It Matters."*
- **Short:** cut the "Is ChatGPT dead?" chapter into a 60-second Short.
- **Re-verify on recording day:** dates, the $40M round, HN points, JevBench scores and every quote. Sources are listed in `../archive/v3/05-presenter-runbook.md` §7.
- **Reviewer flag (not changed, since this doc is V4 as-is):** the opening lines ("can't write a sentence… even say hello") are close to lines already used by Devsplainers ("can't write a word") and Fireship ("can't talk"). The typed-"Hi!"-gets-a-number visual is original. Decide at review whether to keep the lines.
