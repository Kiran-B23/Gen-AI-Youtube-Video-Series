# Jev "Can't Hallucinate". So We Tried to Make It Lie. - V3

**Series:** NxtWave YouTube — AI Build Sessions (standalone session)

**Topic:** Jev by TypeSafe AI — is it worth the hype?

**Format:** face + screen · ~20 min · **Recorded:** ⟦date⟧ · `jev-1.13` · `typesafe-sdk` 0.7.2 · comparison chatbot `google/gemini-3.8-flash`

---

**Key Takeaways:**

- **"It Can't Hallucinate." Really?**
- **Why the Internet Lost Its Mind**
- **It's Not a Chatbot. At All.**
- **So… Is ChatGPT Dead?**
- **Claim #1: Let's Try to Make It Lie**
- **Claim #2: Are the Answers Really Free?**
- **We Caught It Lying**
- **The Fix (It's 3 Lines)**
- **Where You'd Actually Use This**
- **The Free Rival Nobody's Talking About**
- **The Verdict**

---

<MultiLineNote>

**How this session is told.** This is an *investigation*, not a lecture. Jev's makers make two claims — **it can't hallucinate**, and **its answers are free** — and the whole session tests them. Three storytelling devices hold it together:

1. **One open loop.** The hook promises *"one of these claims doesn't survive."* It is paid off in **We Caught It Lying**. Never resolve it early.
2. **A re-hook at the end of every chapter** — a question or tease that makes the next chapter necessary. They are written out at the end of each section below.
3. **Show, don't lecture.** Concepts appear as one visual each (the OMR sheet, a race timer, a slider). Code appears only at four moments, about 15 lines in total; everything else is ▶️ *Just run*.

Every `⟦…⟧` value comes from **your own dry run** of `notebook/jev_scam_detector.ipynb`. If the run produces no confident mistake, rename *We Caught It Lying* to *Where It Slipped* and adjust the verdict — never stage a failure.

</MultiLineNote>

## "It Can't Hallucinate." Really?

*(0:00–1:00)*

This is **Jev**, the most talked-about AI launch of September 2026. Its makers, **TypeSafe AI**, say it **can't hallucinate**.

And its answers are **free**. Not cheap — free. You only pay for what you send it.

Every AI we have used can hallucinate, and none of them work for free. So these are two huge claims — and **one of them doesn't survive this video.**

We are going to test both, with the trickiest messages we can find: real-looking scam SMS, polite scams, Hinglish. We will try to make an AI that "can't lie"… lie.

Most AI launches are not worth our time — there is a new model every week. Jev earned a look for one reason: **it doesn't talk at all. It only decides.** So this is not another explainer. We are putting it to work, and checking whether the hype is real.

> **Two claims. One investigation. One verdict.**

**Image Block:**
**Title**: Thumbnail / first frame
**Prompt**: "Phone screen showing a scam SMS 'Your electricity will be disconnected tonight… call 9XXXX X7788'. Over it, a clean output card reading '✓ VALID · SAFE 97%'. A large red question mark to the right. Bold text 'CAN'T HALLUCINATE?'. High contrast, dark background."

**Re-hook →** *But why is everyone suddenly talking about a model that can't even say hello?*

---

## Why the Internet Lost Its Mind

*(1:00–2:30)*

The short version: for a certain kind of job, Jev is absurdly fast and absurdly cheap — and it arrived with credentials.

| What happened | When | Source |
| --- | --- | --- |
| TypeSafe AI launches Jev in early access; $40M seed round led by DCVC | Sep 15 | TypeSafe launch post |
| The founder, Diogo Almeida, co-authored **InstructGPT** — the research that taught language models to follow instructions, which became the basis of ChatGPT | — | TypeSafe launch post; Firecrawl |
| The Hacker News launch thread passes **~2,000 points** | Sep 15–30 | news.ycombinator.com/item?id=49717558 |
| Vercel, LangChain, OpenRouter, DigitalOcean and Pydantic AI all add support | within ~a week (Sep 16–23) | each platform's changelog / docs |
| Signups open to everyone — then **pause two days later**, citing demand | Sep 20 → Sep 22 | Firecrawl; Flavio Copes |

Why would every platform rush to support one model? Because every app is full of **small decisions** — *is this spam, which team should get this ticket, is this agent about to do something dangerous* — and today each of those means calling a chatbot, waiting seconds, and paying for words that get thrown away.

Jev answers those small questions in under a second, for roughly **$0.04 per 1,000 decisions** (JevBench), and always in exactly the shape the code expects. TypeSafe's own name for it: **"smart if-statements."**

> **Jev makes AI cheap enough to put behind every if-statement.**

**Re-hook →** *So what is this thing, if it isn't a chatbot?*

---

## It's Not a Chatbot. At All.

*(2:30–5:00)*

A chatbot — an **LLM** (large language model) like the ones behind ChatGPT or Gemini — reads text and **writes** text. Jev reads text and **decides**.

The easiest way to see the difference is an exam:

> **A chatbot writes an essay answer. Jev fills in an OMR sheet.** The bubbles are fixed in advance, so the answer always fits. It cannot reply "maybe, it depends, here are five paragraphs."

**Image Block:**
**Title**: Essay vs OMR sheet
**Prompt**: "Split screen. Left: a robot writing a long, messy essay, labelled 'Chatbot — writes'. Right: a robot filling three bubbles on an OMR sheet in a split second, labelled 'Jev — decides'. Flat illustration, dark background, amber and green accents."

TypeSafe calls Jev a **System One** model. Psychology describes two ways of thinking: *System Two* is slow and careful, like solving a JEE maths problem; *System One* is the instant gut call, like glancing at an SMS and thinking *"scam."* Chatbots work like System Two. Jev is built for System One.

We give Jev two things:

- a **state** — the thing to judge, such as an SMS
- **questions** — each one typed, with a name we choose

and it returns **numbers**. There are only three question types:

| Type | Asks | Returns | Example |
| --- | --- | --- | --- |
| **Noul** | yes or no? | the probability of *yes* | *Is this a scam?* → 0.97 |
| **Choice** | which one? | the best option + a probability for each | *What kind of scam?* → bill disconnection |
| **Score** | how much? | a position on your scale | *How much pressure?* → 2.6 of 3 |

(Noul is TypeSafe's name; read it as "yes or no". The values here are illustrative.)

| | Chatbot (LLM) | Jev |
| --- | --- | --- |
| Output | Free text, word by word | Only the options you defined |
| Speed | Seconds | Under a second |
| Price | $0.20–$10 per million input tokens, output ~5x more (TypeSafe's comparison) | $0.042 per million input tokens, **output free** |
| Wrong format? | Possible | Impossible |
| Tells you how sure it is? | Not reliably | Yes, on every answer |
| Good at | Writing, code, explaining, reasoning | Classifying, routing, scoring, checking |

**Tokens**, for anyone new to them, are the small pieces — roughly a word each — that AI services count and charge for.

### So Far

- A chatbot **writes**; Jev **decides**, like filling bubbles on an OMR sheet.
- Three question types — **Noul, Choice, Score** — all answered in one call.
- It is fast and cheap because it never writes a word.

**Re-hook →** *If it's that fast and that cheap… is ChatGPT finished?*

---

## So… Is ChatGPT Dead?

*(5:00–6:00)*

**No. And that's the point.**

Jev cannot write a sentence, explain its answer, or reason through a problem step by step. TypeSafe's own docs say it is **not a drop-in replacement** for a chatbot, and LangChain says the same.

What it replaces is the *small, repetitive* decisions inside apps — the ones people were overpaying a chatbot to make. The two work as a team: **Jev makes the thousands of quick calls; the chatbot handles the rare hard, open-ended ones.** LangChain's phrase for it: **"cheap by default, frontier on exception."**

**Image Block:**
**Title**: The team
**Prompt**: "Simple flow: many small message icons pour into a fast 'Jev' gate that sorts them instantly into green and red bins; a few amber ones are passed to a slower 'Chatbot' box labelled 'the hard ones'. Minimal, dark background."

**Re-hook →** *But fast and cheap means nothing if it's wrong. Time to test claim number one.*

---

## Claim #1: Let's Try to Make It Lie

*(6:00–10:00)*

We open a free Google Colab notebook. Setup is one ▶️ cell: install, download our helper file and 100 test messages, and read the **API key** (a secret password that tells the AI service who is calling). We use one account — **OpenRouter** — which reaches both Jev and a regular chatbot; Jev has no free tier there, so a couple of dollars of credit covers the whole notebook.

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

We asked for a yes/no and got **text** — maybe clean JSON, maybe wrapped in code fences, maybe a paragraph. **JSON** is a structured text format code can read; `json.loads` is the line that reads it, and it only works if the chatbot cooperated. If it worked this time, run it again — our app would be betting on it every time.

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

- **Line 1–2** connect to Jev through OpenRouter. `jev-1.13` is **pinned**, so results don't change when a new version ships.
- **Line 3** asks one yes/no question about the SMS.
- **Line 4** reads the answer: a **number between 0 and 1**.

No parsing. No crash. It cannot come back in the wrong shape — and **that is what "can't hallucinate" actually means: the *format* is guaranteed.** Whether the *answer* is right is a different question, and that's the one we're testing.

<MultiLineNote>

**The number is its own confidence.** `0.97` = very likely a scam, `0.03` = very likely genuine, `0.5` = *"I'm not sure."* That last one becomes important in *The Fix*.

</MultiLineNote>

### Ask More, in the Same Call ▶️

One ▶️ cell adds a Choice (*what kind of scam?* from nine plain-English options) and a Score (*how much pressure, 0–3?*) — all three answered in **one** call. We don't read it line by line; the point is visible in the output: three answers, one request. The one line worth pointing at is in the yes/no criteria — *"a genuine message, even if it mentions OTPs, money or deadlines"* — because real bank messages say "OTP" too.

### Try to Make It Lie 🧑‍🏫

Five messages built to fool a quick glance. **The viewer guesses first**, then we run:

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

```
⟦…⟧  Hello, I am Priya from a recruitment agency…
⟦…⟧  123456 is your OTP for login…
⟦…⟧  Your courier is on hold…
⟦…⟧  Bhai galti se aapke account me 5000…
⟦…⟧  Hi! Your cab driver Ramesh is arriving…
```

The true answers: **scam · genuine · scam · scam · genuine.** Each one attacks a different weak spot — a polite scam with no link yet, a genuine message full of scary words, a tiny believable amount, Hinglish, and an OTP you *should* share.

**Re-hook →** *Five messages is a magic trick, not a test. Let's do a hundred — and put the bill on screen.*

---

## Claim #2: Are the Answers Really Free?

*(10:00–13:00)*

Our test set is **100 made-up messages** in the style of real Indian SMS and WhatsApp forwards: 60 scams, 40 genuine, a third deliberately tricky. Every one is **labelled** — we know the right answer — which is what lets us grade. All links and numbers in it are fake.

Both runners get the **same questions and the same rules**: 10 messages at a time each.

**Notebook — "The race" ▶️**

```python
df = load_messages()
results = await race(df, QUESTIONS, SCAM_TYPES)
```

| | Jev | Chatbot | Jev advantage |
| --- | --- | --- | --- |
| time for 100 messages | ⟦…⟧ | ⟦…⟧ | ⟦…⟧x faster |
| typical time per message | ⟦…⟧ | ⟦…⟧ | ⟦…⟧x faster |
| **cost per 1,000 messages** | ⟦…⟧ | ⟦…⟧ | ⟦…⟧x cheaper |
| broken / invalid answers | **0** | ⟦…⟧ | |

**Claim #2, checked:** the answers really are free — Jev only charges for what we send it, which is why its bill is ⟦M⟧x smaller. It is not *zero*: the input still costs money. TypeSafe itself says it "can't prove" the price isn't subsidised, so today's price may not last.

Speed and price were never the real test, though.

**Notebook — "The race", continued ▶️**

```python
scoreboard(results)
```

| | Jev | Chatbot |
| --- | --- | --- |
| scams caught | ⟦…⟧ / 60 | ⟦…⟧ |
| false alarms on genuine messages | ⟦…⟧ / 40 | ⟦…⟧ |
| accuracy | ⟦…⟧ | ⟦…⟧ |

Read it as it is. If the chatbot is more accurate, that is the honest trade-off — *⟦N⟧x faster and ⟦M⟧x cheaper, for ⟦K⟧ points of accuracy*. A small independent test by Every found the same shape: Jev caught 6 of 7 planted mistakes where a bigger model caught all 7.

### So Far

- **Format:** Jev never gave a broken answer; the chatbot gave ⟦…⟧.
- **Price:** ⟦M⟧x cheaper per 1,000 messages — the "free answers" claim holds up, with fine print.
- **Accuracy:** ⟦…⟧ — close, but averages hide the mistakes that matter.

**Re-hook →** *Remember "one of these claims doesn't survive"? Here's where it breaks.*

---

## We Caught It Lying

*(13:00–15:30)*

A mistake at `0.55` is harmless — Jev is admitting it doesn't know. The dangerous mistakes are the ones where it was **wrong and sure**.

**Notebook — "Wrong, and sure of it" ▶️**

```python
confident_mistakes(results)
```

```
Jev was wrong on ⟦…⟧ of 100 messages, and SURE of itself on ⟦…⟧ of those.
```

This is claim #1 cracking. **"Can't hallucinate" was true about the format and false about the answer.** Jev never broke our code — it handed us a perfectly valid, perfectly confident, *wrong* verdict.

And TypeSafe knew. The fine print, in their own words:

| Claim | TypeSafe's fine print |
| --- | --- |
| 0% hallucination | *"Our number is not empirical."* Only the schema match is guaranteed |
| Can't be wrong? | The CEO on Hacker News: *"it's also possible to be confidently wrong"* |
| Works on everything? | Docs: English is the primary language; Jev *"is not a calculator"*; adversarial text *"can move the answer"* |

Scam messages are adversarial by design — they are written to fool a quick judgement. One independent test on fake job postings found Jev caught only **22.6%** of the frauds, while a simple, old-school text classifier trained on the same data scored **more than twice as well** on the fraud cases (F1 70.0% vs 31.2%; geckguy's job-posting benchmark, Jev run via classifier.dev on an old Kaggle dataset).

These are **System One** mistakes: a fast gut call, fooled the same way ours is.

> **A format guarantee is not a truth guarantee.**

**Re-hook →** *So is it useless for this? No — it just needs three lines we should have written from the start.*

---

## The Fix (It's 3 Lines)

*(15:30–17:00)*

Jev tells us how sure it is. So **we** decide when to trust it — like DRS in cricket, where a clear hit overturns the decision but a ball just clipping the stumps stays **"umpire's call."**

**Notebook — "Confidence bands, with a slider" 🧑‍🏫**

```python
threshold = 0.9  #@param {type:"slider", min:0.5, max:0.99, step:0.01}

def verdict(p):
    if p >= threshold:      return "🚨 Scam"
    if p <= 1 - threshold:  return "✅ Looks normal"
    return "⚠️ Not sure: get a second opinion"

band_report(results, verdict)
```

| Jev's band | really scam | really genuine |
| --- | --- | --- |
| 🚨 Scam | ⟦…⟧ | ⟦…⟧ |
| ⚠️ Not sure | ⟦…⟧ | ⟦…⟧ |
| ✅ Looks normal | ⟦…⟧ | ⟦…⟧ |

- **`threshold`** is a slider in Colab — drag it, re-run, and watch messages move between bands.
- **Three lines** decide: very sure → act; very sure the other way → let it through; anything else → ⚠️.
- **Stricter slider** → fewer confident mistakes, more ⚠️ messages.

The ⚠️ messages go to the chatbot for a second opinion in plain words — the one thing Jev can't do. So Jev handles **every** message fast and cheap, and the slow chatbot only sees the ⟦N⟧ tricky ones.

> **Use the fast model for every decision. Use the slow one only where the fast one says it's unsure.**

A bonus ▶️ cell wraps all of this into a small web app with a shareable link.

<MultiLineWarning text="A learning project, not a safety product">

Never present a model's answer as proof a message is safe. If a message worries you, contact the organisation through its **official** app or number — never the one in the message. In India, cyber fraud can be reported on **1930** or at **cybercrime.gov.in**.

</MultiLineWarning>

**Re-hook →** *Scam detection was the hardest test we could find. Here's where Jev is genuinely brilliant.*

---

## Where You'd Actually Use This

*(17:00–18:00)*

Jev shines wherever an app makes the **same small judgement again and again**, and a confidence score can route the unclear cases:

| Idea | The question Jev answers | A real number someone measured |
| --- | --- | --- |
| Placement-email sorter | *Is this an interview invite, a rejection or spam?* | OpenRouter's triage demo: 95 messages × 5 questions in 1.2 s (vendor demo) |
| College group-chat moderator | *Is this message abusive?* | TypeSafe's moderation cookbook: 114 ms per check (vendor) |
| Resume screener | *Does this resume match the role?* | Self-reported only — test before trusting |
| Search ranking for your notes | *Which result answers the question?* | Hindsight: top-result accuracy 0.80 → 0.95 (independent) |
| AI-agent safety check | *Is this command about to delete something?* | Browserbase: agent step time 1.97 s → 0.46 s (via LangChain) |

**Re-hook →** *One problem: Jev is closed and runs on someone else's servers. Unless…*

---

## The Free Rival Nobody's Talking About

*(18:00–19:30)*

Three days after Jev launched, **Laya** appeared: a free, open-source decision model from **Convai Innovations** (Apache-2.0 licence). It asks the same three question types, even speaks Jev's API format, and runs on an ordinary laptop.

| | Jev | Laya |
| --- | --- | --- |
| Open? | Closed, API only | Open weights, free |
| Runs on your laptop? | No | Yes |
| Cost per call | Tiny, but not zero | Zero (your own hardware) |
| Out-of-the-box accuracy (JevBench v1.4.2.2) | #4 — 63.3 | #43 — 30.3 |
| Superpower | Accurate straight away | Private, and you can train it on your own data |

Laya's own model card is candid: its headline wins come from a version **trained on the test itself**; the base model is close to guessing until you fine-tune it. And Laya isn't alone — open 4-billion-parameter models such as Imajev-4B, Plumb-4B and decider-4b now edge past Jev on the same leaderboard.

> **Jev is more accurate out of the box. Laya is free, runs locally, and learns from your data.**

(There is a public dispute about which idea came first. It doesn't change either model; we stay out of it.)

**Re-hook →** *So — was it worth the hype?*

---

## The Verdict

*(19:30–20:30)*

| The claim | Verdict |
| --- | --- |
| **"It can't hallucinate"** | ⚠️ **Half true.** The format is guaranteed. The answer can still be wrong — and confident. |
| **"Its answers are free"** | ✅ **True, with fine print.** Output is free; input costs ⟦$ per 1,000⟧; the price may be subsidised. |
| **Worth the hype?** | ✅ **For the right job** — fast, high-volume yes/no and pick-one decisions, with a threshold and a fallback. ❌ Not as a chatbot replacement, and not something to trust blindly on fraud. |

> **A fast model gives answers. A threshold, a test and a fallback give trust.**

**Close:** *"Drop the trickiest scam message you've ever received in the comments — with personal details removed — and we'll run it through Jev in the next video."*

<details>
<summary><b>Final Code — every 🧑‍🏫 Teach moment</b></summary>

```python
from jev_helpers import *
from typesafe_sdk import TypeSafeClient, Noul, Choice, Score

KEY = get_api_key()

# The old way: ask a chatbot for JSON, and hope
reply = ask_llm('Is this SMS a scam? Reply in JSON like {"is_scam": true}.\n\n' + sms)

# The swap: two lines
jev = TypeSafeClient(api_key=KEY, base_url="https://openrouter.ai/api", model="jev-1.13")
answer = jev.system_one(state=sms, questions={"is_scam": Noul(instructions="Is this SMS a scam?")})
p = answer.nouls["is_scam"].noul

# The fix: confidence bands
threshold = 0.9
def verdict(p):
    if p >= threshold:      return "🚨 Scam"
    if p <= 1 - threshold:  return "✅ Looks normal"
    return "⚠️ Not sure: get a second opinion"
```

The three-question call, the race, the scoring, the bands table and the app are in the notebook and `jev_helpers.py`.

</details>
