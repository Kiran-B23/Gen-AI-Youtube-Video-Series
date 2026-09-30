# This AI "Can't Hallucinate"… So We Fed It Scam SMS - V3.1

**Series:** NxtWave YouTube — AI Build Sessions (standalone session)

**Topic:** Jev by TypeSafe AI, with its two big claims tested on Indian scam SMS

**Format:** face + screen · 15–17 min · **Recorded:** ⟦date⟧ · `jev-1.13` · `typesafe-sdk` 0.7.2 · comparison chatbot `google/gemini-3.8-flash`

---

**Chapters:**

- **0:00 You've probably received this message**
- **0:45 Why the internet lost its mind**
- **2:00 It's not a chatbot. At all.**
- **4:00 So… is ChatGPT dead?**
- **4:45 Claim #1: can we fool it?**
- **8:15 Claim #2: are the answers really free?**
- **10:45 Wrong, and sure of it**
- **12:45 The fix (3 lines)**
- **14:00 Where you'd actually use this**
- **14:45 The free rival**
- **15:30 The verdict**

(The chapter list doubles as the YouTube timestamps. The review asked for "Chapters" in place of "Key Takeaways".)

---

<MultiLineNote>

**What changed from V3.** This version applies the script review's nine fixes:
1. It must be recorded this week, straight after the dry run.
2. The hook is result-first.
3. A confident mistake is flagged early and paid off later.
4. The chatbot demo is fair, with JSON mode acknowledged.
5. The thumbnail uses a real result.
6. "Lying" has become "wrong and sure".
7. The weak comparisons now carry their caveats.
8. Laya is cut to 45 seconds, for 15–17 minutes in total.
9. Messages are collected through a Google Form, not the comments.

It also applies the smaller fixes (chapters as timestamps, exactly 3 highlighted lines in the fix) and the growth ideas (a regional-language message, a same-day Short, a series tease).

**How it's told.** An investigation of Jev's two claims, tested on scam SMS:
- **One open loop:** *"One of them doesn't survive this video."* It's **flagged early**, when a message in "Can we fool it?" gets *"remember this one"*, and **paid off** in "Wrong, and sure of it".
- **A re-hook closes every chapter.**
- **About 15 taught lines of code** at four moments. Everything else is ▶️ *Just run*.

Every `⟦…⟧` comes from **your own dry run**. If the run produces no confident mistake, rename "Wrong, and sure of it" to "Where it slipped" and adjust the verdict. Never stage a failure.

</MultiLineNote>

## You've Probably Received This Message

*(0:00–0:45)*

The hook shows the result in the first 5 seconds and states the open loop by 0:20.

| Time | On screen | What's said |
| --- | --- | --- |
| 0:00–0:05 | A scam SMS on a phone: *"electricity will be disconnected tonight"* | *"You've probably received this message. Is it a scam?"* |
| 0:05–0:12 | Jev's output card appears instantly, with a number | *"This AI answered in under a second. Its makers say it can't hallucinate."* |
| 0:12–0:20 | Split: "Can't hallucinate" / "Answers are free" | *"Two huge claims. We tested both. One of them doesn't survive this video."* |
| 0:20–0:35 | Quick cuts: a Hinglish scam, a fake OTP message, the 100-message race timer | *"Polite scams, Hinglish, fake OTPs, a hundred messages, and a stopwatch."* |
| 0:35–0:45 | Face cam | *"It's called Jev, and it doesn't talk at all. It only decides. Let's see if the hype is real."* |

The V3 line "most AI launches aren't worth our time" has been **removed** from the hook, as the review asked.

**Re-hook →** *But why is everyone suddenly talking about a model that can't even say hello?*

---

## Why the Internet Lost Its Mind

*(0:45–2:00)*

For a certain kind of job, Jev is absurdly fast and absurdly cheap, and it arrived with credentials.

| What happened | When | Source |
| --- | --- | --- |
| TypeSafe AI launches Jev in early access, with a $40M seed round led by DCVC | Sep 15 | TypeSafe launch post |
| The founder, Diogo Almeida, co-authored **InstructGPT**, the instruction-following research behind ChatGPT | — | TypeSafe launch post; Firecrawl |
| The Hacker News launch thread passes **~2,000 points** | Sep 15–30 | news.ycombinator.com/item?id=49717558 |
| Vercel, LangChain, OpenRouter, DigitalOcean and Pydantic AI add support | within about a week (Sep 16–23) | each platform's changelog or docs |
| Signups open to everyone, then **pause two days later**, citing demand | Sep 20 → Sep 22 | Firecrawl; Flavio Copes |

Every app is full of **small decisions**: *is this spam, which team gets this ticket, is this agent about to do something dangerous.* Today each one means calling a chatbot, waiting seconds, and paying for words that get thrown away.

Jev answers them in under a second, for roughly **$0.04 per 1,000 decisions** (JevBench), and always in exactly the shape the code expects. TypeSafe calls it **"smart if-statements."**

**Re-hook →** *So what is this thing, if it isn't a chatbot?*

---

## It's Not a Chatbot. At All.

*(2:00–4:00)*

A chatbot is an **LLM** (large language model), like the ones behind ChatGPT or Gemini. It reads text and **writes** text. Jev reads text and **decides**.

> **A chatbot writes an essay answer. Jev fills in an OMR sheet.** The bubbles are fixed in advance, so the answer always fits.

**Image Block:**
**Title**: Essay vs OMR sheet
**Prompt**: "Split screen. Left: a robot writing a long, messy essay, labelled 'Chatbot — writes'. Right: a robot filling three bubbles on an OMR sheet in a split second, labelled 'Jev — decides'. Flat illustration, dark background, amber and green accents."

TypeSafe calls Jev a **System One** model:
- **System Two** is slow, careful thinking, like a JEE maths problem.
- **System One** is the instant gut call, like glancing at an SMS and thinking "scam."

You give Jev a **state** (the thing to judge) and typed **questions**. It returns **numbers**.

| Type | Asks | Returns | Example |
| --- | --- | --- | --- |
| **Noul** | yes or no? | the probability of *yes* | *Is this a scam?* → 0.97 |
| **Choice** | which one? | the best option, plus a probability for each | *What kind of scam?* → bill disconnection |
| **Score** | how much? | a position on your scale | *How much pressure?* → 2.6 of 3 |

(The values are illustrative.)

| | Chatbot (LLM) | Jev |
| --- | --- | --- |
| Output | Free text, word by word | Only the options you defined |
| Speed | Seconds | Under a second |
| Price | $0.20–$10 per million input tokens; output ~5x more (TypeSafe's comparison) | $0.042 per million input tokens; **output free** |
| Tells you how sure it is? | Not reliably | Yes, on every answer |

**Tokens** are the small pieces of text, roughly a word each, that AI services count and charge for.

**Re-hook →** *If it's that fast and that cheap… is ChatGPT finished?*

---

## So… Is ChatGPT Dead?

*(4:00–4:45)*

**No. And that's the point.** Jev can't write, explain itself, or reason step by step. TypeSafe's docs say it's **not a drop-in replacement** for a chatbot. It replaces the *small, repetitive* decisions inside apps. The two work as a team: **"cheap by default, frontier on exception"** (LangChain).

**Re-hook →** *But fast and cheap means nothing if it's wrong. Can we fool it?*

---

## Claim #1: Can We Fool It?

*(4:45–8:15)*

Setup is one ▶️ cell: install, download the helper file and 100 test messages, and read the **API key**. One **OpenRouter** account reaches both Jev and a regular chatbot. Jev has no free tier there, so a couple of dollars of credit covers the notebook.

### First, the Old Way 🧑‍🏫

**Notebook — "First, the old way"**

```python
sms = ("Dear consumer, your electricity power will be disconnected tonight at 9:30 PM "
       "because previous month bill was not updated. Call officer 9XXXX X7788 immediately.")

reply = ask_llm('Is this SMS a scam? Reply in JSON like {"is_scam": true}.\n\n' + sms)
print(repr(reply))

import json
try:
    print("Parsed:", json.loads(reply))
except json.JSONDecodeError as e:
    print("💥 json.loads crashed:", e)
```

```
⟦the chatbot's raw reply⟧
⟦Parsed: … / 💥 json.loads crashed: …⟧
```

This is the simplest way to ask, and it can come back as clean JSON, JSON wrapped in code fences, or a paragraph.

<MultiLineNote>

**The fair version (review fix 4).** Chatbots *do* have **JSON mode** and **structured outputs**, which mostly fix the format problem, and our race in Claim #2 turns JSON mode on. So the case for Jev is **not** "chatbots can't do JSON". It's **speed, cost and confidence**: even a perfectly formatted chatbot answer takes seconds, charges for every word it writes, and doesn't say how sure it is.

</MultiLineNote>

### The Swap 🧑‍🏫

**Notebook — "The swap: two lines"**

```python
from typesafe_sdk import TypeSafeClient, Noul, Choice, Score
jev = TypeSafeClient(api_key=KEY, base_url="https://openrouter.ai/api", model="jev-1.13")

answer = jev.system_one(state=sms, questions={"is_scam": Noul(instructions="Is this SMS a scam?")})
answer.nouls["is_scam"].noul
```

```
⟦0.97⟧
```

- **Lines 1–2** connect to Jev through OpenRouter. `jev-1.13` is pinned.
- **Line 3** asks one yes/no question.
- **Line 4** reads the answer, a number between 0 and 1: the **probability that it's a scam**.

It cannot come back in the wrong shape. **That is what "can't hallucinate" actually means: the format is guaranteed.** Whether the answer is *right* is what we test.

### Ask More, in the Same Call ▶️

One ▶️ cell adds a Choice (*what kind of scam?*, from nine plain-English options) and a Score (*how much pressure, 0–3?*). All three are answered in **one** call. The one line worth pointing at is *"a genuine message, even if it mentions OTPs, money or deadlines"*, because real bank messages say "OTP" too.

### Can We Fool It? 🧑‍🏫

Five messages are built to fool a quick glance, plus one optional regional-language message. **The viewer guesses first**, then we run.

**Notebook — "Try to make it lie"**

```python
TRICKY = [
    "Hello, I am Priya from a recruitment agency. We saw your profile. Simple task: rate hotels online, Rs 150 per task. Interested?",
    "123456 is your OTP for login. Do not share it with anyone. Bank staff will never ask for your OTP.",
    "Your courier is on hold due to incomplete address. Pay Rs 25 redelivery fee: parcel-redeliver.example",
    "Bhai galti se aapke account me 5000 transfer ho gaya, please wapas bhej do. Screenshot bhej raha hoon.",
    "Hi! Your cab driver Ramesh is arriving in 3 mins. OTP to start the ride: 4821.",
]

for msg in TRICKY:
    p = jev.system_one(state=msg, questions=QUESTIONS).nouls["is_scam"].noul
    print(f"{p:.2f}  {msg[:70]}...")
```

The true answers are **scam · genuine · scam · scam · genuine.**

**Optional growth idea (review):** add one **Telugu or Tamil** scam message. It tests TypeSafe's own note that English is the primary language, and gives regional viewers a reason to share. ⟦The message must be written or checked by a native speaker before recording.⟧

<MultiLineNote>

**Plant the payoff here (review fix 3).** If any of these messages comes back **wrong and confident** (past 0.90 or below 0.10), stop on it: *"Remember this one. We'll come back to it."* That keeps the open loop alive, so its payoff in "Wrong, and sure of it" doesn't arrive after viewers have left. If none of the five fools it, flag the one closest to 0.5 instead.

</MultiLineNote>

**Re-hook →** *Five messages is a magic trick, not a test. Let's do a hundred, and put the bill on screen.*

---

## Claim #2: Are the Answers Really Free?

*(8:15–10:45)*

The test set is **100 made-up messages** in the style of real Indian SMS and WhatsApp forwards:
- 60 scams and 40 genuine
- about a third deliberately tricky
- all **labelled**, so we know the right answers
- all links and numbers fake

Both models get the same questions and the same rules, 10 at a time. The chatbot runs with **JSON mode on**, its best-case setting.

**Notebook — "The race" ▶️**

```python
df = load_messages()
results = await race(df, QUESTIONS, SCAM_TYPES)
```

| | Jev | Chatbot (JSON mode) | Jev advantage |
| --- | --- | --- | --- |
| time for 100 messages | ⟦…⟧ | ⟦…⟧ | ⟦…⟧x faster |
| typical time per message | ⟦…⟧ | ⟦…⟧ | ⟦…⟧x faster |
| **cost per 1,000 messages** | ⟦…⟧ | ⟦…⟧ | ⟦…⟧x cheaper |
| broken / invalid answers | **0** | ⟦…⟧ | |

**Claim #2, checked:** Jev only charges for what we send, so its bill is ⟦M⟧x smaller. It's not *zero*, because input still costs. TypeSafe says it "can't prove" the price isn't subsidised.

**Notebook — "The race", continued ▶️**

```python
scoreboard(results)
```

| | Jev | Chatbot |
| --- | --- | --- |
| scams caught | ⟦…⟧ / 60 | ⟦…⟧ |
| false alarms on genuine messages | ⟦…⟧ / 40 | ⟦…⟧ |
| accuracy | ⟦…⟧ | ⟦…⟧ |

If the chatbot is more accurate, say so. The honest trade-off is *⟦N⟧x faster and ⟦M⟧x cheaper, for ⟦K⟧ points of accuracy*.

**Re-hook →** *Remember the message I told you to remember?*

---

## Wrong, and Sure of It

*(10:45–12:45)*

A mistake at `0.55` is harmless, because Jev is admitting it doesn't know. The dangerous mistakes are **wrong and sure**.

**Notebook — "Wrong, and sure of it" ▶️**

```python
confident_mistakes(results)
```

```
Jev was wrong on ⟦…⟧ of 100 messages, and SURE of itself on ⟦…⟧ of those.
```

Start with the message flagged earlier, then the rest.

**"Can't hallucinate" was true about the format and false about the answer.** To be fair about the wording (review fix 6): *it's not lying on purpose. It's wrong, and sure.*

| Claim | TypeSafe's fine print |
| --- | --- |
| 0% hallucination | *"Our number is not empirical."* Only the schema match is guaranteed |
| Can't be wrong? | The CEO on Hacker News: *"it's also possible to be confidently wrong"* |
| Works on everything? | Docs: English is the primary language; Jev *"is not a calculator"*; adversarial text *"can move the answer"* |

Independent checks, **with their caveats** (review fix 7):
- **Every**, a tech publication, ran a **tiny** test of 7 planted mistakes. Jev caught 6; a bigger model caught all 7.
- **A fake-job-posting benchmark** found Jev caught about **23%** of the frauds (fraud F1 31.2%). A classic text classifier scored 70.0%, but that classifier was **trained on that exact dataset**. It isn't a like-for-like fight, but it does show that a specialised model can beat a general one on a narrow task.

> **A format guarantee is not a truth guarantee.**

**Re-hook →** *So is it useless for this? No. It just needs three lines.*

---

## The Fix (3 Lines)

*(12:45–14:00)*

Like **DRS in cricket**, a clear hit overturns the decision, while a ball just clipping the stumps stays **"umpire's call."**

**Notebook — "Confidence bands, with a slider" 🧑‍🏫**

```python
threshold = 0.9  #@param {type:"slider", min:0.5, max:0.99, step:0.01}

def verdict(p):
    if p >= threshold:      return "🚨 Scam"
    if p <= 1 - threshold:  return "✅ Looks normal"
    return "⚠️ Not sure: get a second opinion"

band_report(results, verdict)
```

**Highlight exactly these three lines** (smaller review fix): the two `if` lines and the final `return`. Drag the slider from 0.90 to 0.99, re-run, and the confident mistakes fall while more messages land in ⚠️. Those go to the chatbot for a plain-words second opinion.

> **Use the fast model for every decision. Use the slow one only where the fast one says it's unsure.**

<MultiLineWarning text="A learning project, not a safety product">

Never present a model's answer as proof a message is safe. Contact the organisation through its **official** app or number. In India, cyber fraud can be reported on **1930** or at **cybercrime.gov.in**.

</MultiLineWarning>

**Re-hook →** *Scams were the hardest test we could find. Here's where Jev shines.*

---

## Where You'd Actually Use This

*(14:00–14:45)*

| Idea | The question Jev answers | Measured result |
| --- | --- | --- |
| Placement-email sorter | *Interview invite, rejection or spam?* | 95 messages × 5 questions in 1.2 s (vendor demo) |
| College group-chat moderator | *Is this message abusive?* | 114 ms per check (vendor) |
| Search for your notes | *Which result answers the question?* | Top result right 0.80 → 0.95 (independent) |
| AI-agent safety check | *Is this command about to delete something?* | Agent step 1.97 s → 0.46 s (via LangChain) |

**Re-hook →** *One problem: Jev is closed. Unless…*

---

## The Free Rival

*(14:45–15:30, 45 seconds, per review fix 8)*

**Laya** is from Convai Innovations and arrived three days after Jev:
- It's free and open source (Apache-2.0).
- It asks the same three question types and speaks Jev's format.
- It runs on a laptop.

Out of the box it's much weaker: Jev scores **63.3** against Laya's **30.3** on JevBench v1.4.2.2. Laya's real strength is that you can train it on your own data.

> **Jev is more accurate out of the box. Laya is free, local and trainable.**

**Re-hook →** *So, was it worth the hype?*

---

## The Verdict

*(15:30–16:15)*

| The claim | Verdict |
| --- | --- |
| **"It can't hallucinate"** | ⚠️ **Half true.** The format is guaranteed, but the answer can be wrong, and sure. |
| **"Its answers are free"** | ✅ **True, with fine print.** Output is free, input costs ⟦$ per 1,000⟧, and the price may be subsidised. |
| **Worth the hype?** | ✅ **For the right job:** fast, high-volume yes/no decisions, with a threshold and a fallback. |

> **A fast model gives answers. A threshold, a test and a backup give trust.**

**Close (review fix 9 and series tease):**
- Collect scam messages through a **Google Form** (link in the description and pinned comment), **not** the comments, where links get spam-filtered and privacy is at risk.
- Pin *"Scammed? Call 1930 or visit cybercrime.gov.in."*
- End by teasing the next trend video.

---

## Titles and Thumbnails (review)

| Title | Thumbnail | Best if |
| --- | --- | --- |
| **This AI "Can't Hallucinate"… So We Fed It Scam SMS** | Scam SMS + Jev card + red question mark | Default choice |
| We Tested the AI That "Can't Lie" (It Did) | Jev card showing a confident wrong verdict | The run finds a real confident mistake |
| Jev: 100x Cheaper Than ChatGPT? We Checked | Two price tags, one crossed out | The cost gap is the most striking result |
| Can Jev Catch Indian Scam Messages? | Hinglish SMS with a green or red stamp | Targeting Indian search traffic |

**Thumbnail number rule (review fix 5):** the notebook reports **scam probability**. A confident mistake on a real scam shows up as a *low* number, e.g. "Scam: 0.03". Show that exact number from your run, and never a made-up "SAFE 97%". Fill in the real numbers before choosing a numeric title.

## Pre-Publish Checklist (review)

- [ ] Dry run done; every placeholder filled with a real result; **recorded this week**
- [ ] Chatbot baseline tested **with and without** JSON mode
- [ ] Thumbnail matches a real result
- [ ] Launch facts and leaderboard ranks re-verified on recording day
- [ ] OpenRouter access explained, since direct signups were paused
- [ ] Chapters added as YouTube timestamps
- [ ] Google Form link and 1930 / cybercrime.gov.in pinned
- [ ] Same-day Short cut from the "guess first" segment, and scheduled

## Notebook Changes This Version Needs (not yet applied)

The notebook and helpers in this folder (`notebook/`, `jev_helpers.py`, `data/`) are still the V3 versions. To match this doc:
1. Rename the markdown heading "We caught it lying" to "Wrong, and sure of it".
2. Add a switch to `race()` so the chatbot can run **without** JSON mode, as a second baseline.
3. Optionally, add the native-speaker-checked regional message to `TRICKY`.
