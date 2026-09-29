# This AI Can't Write a Single Word: Build a Scam Detector With Jev - V2

**Series:** NxtWave YouTube — AI Build Sessions (standalone session)

**Topic:** Decision Models — swapping a chatbot for Jev by TypeSafe AI

**Recorded:** ⟦date⟧ · `jev-1.13` · `typesafe-sdk` 0.7.2 · comparison LLM `google/gemini-3.8-flash`

---

**Key Takeaways:**

- **The Problem: Asking an Essay Writer to Tick a Box**
- **What Is Jev**
    - **Three Question Types**
    - **What Jev Cannot Do**
- **What We Are Building**
- **Building It**
    - **Step 0: Setup**
    - **Step 1: The Old Way — Asking a Chatbot**
    - **Step 2: The Swap — Asking Jev Instead**
    - **Step 3: Three Questions, One Call**
    - **Step 4: Turning a Probability Into a Decision**
    - **Step 5: The Race**
    - **Step 6: Finding the Flaw**
    - **Step 7: The Fix — Jev Decides, the Chatbot Explains**
    - **Step 8: Ship It**
- **What Changed: The Swap**
- **When Should We Use a Decision Model?**
- **Session Recap**
- **Your Turn**

---

<MultiLineNote>

**For the author — before this doc is used.** Every value written as `⟦…⟧` comes from **your own run** of `notebook/jev_scam_detector.ipynb`. Replace them after the dry run, and never substitute TypeSafe's published numbers. Code in this doc is copied from the notebook; step numbers match it one-to-one.

</MultiLineNote>

## Introduction

This AI **cannot write a single word**.

It cannot chat. It cannot explain itself. It cannot even say hello.

And yet, given 100 messages to judge, it finished all of them in **⟦X⟧ seconds** — while a regular AI chatbot, given the same 100, took **⟦Y⟧**. It did it for **⟦M⟧x less money**. And every single answer came back in exactly the shape we asked for.

So why isn't everyone using it?

Because it has **one dangerous flaw** — and by the end of this session we will have found it ourselves, measured it, and built around it.

Here is what we will point it at. It is 7:40 in the evening, and a phone buzzes:

> *"Dear consumer, your electricity power will be disconnected tonight at 9:30 PM because previous month bill was not updated. Call officer 9XXXX X7788 immediately."*

A deadline, a threat and a phone number. Messages like this trick people every day, and the person reading one has seconds to decide. By the end of this session, pasting that SMS into an app **we build** will give back:

```
Verdict:     🚨 Likely scam
Kind:        bill_disconnection  ▇▇▇▇▇▇▇▇▇  ⟦0.9x⟧
Pressure:    ⟦2.x⟧ / 3
```

— and for the messages it is *not* sure about, it will say so honestly and ask for a second opinion.

> **What if a model could only decide — and told us exactly how sure it was?**

### Three Terms We Will Use

This session is self-contained. Three terms appear from the first step, so here they are:

| Term | In one line |
| --- | --- |
| **LLM** (large language model) | The kind of AI behind chatbots like ChatGPT and Gemini — it reads text and *writes* text |
| **JSON** | A text format for structured data, like `{"is_scam": true}`, that code can read with Python's `json.loads` |
| **API key** | A secret string sent with each request, so the AI service knows who is calling and can bill for it |

No machine-learning background is needed. If you can run a cell in Google Colab, you can build everything here.

---

## The Problem: Asking an Essay Writer to Tick a Box

The usual way to build a scam check is to ask a chatbot, ask for JSON, and read the answer:

```python
reply = ask_llm('Is this SMS a scam? Reply in JSON like {"is_scam": true}.' + sms)
result = json.loads(reply)          # hope it is valid JSON
if result["is_scam"] == True:       # hope the key exists, and is a real true/false
    warn_user()
```

Every line after the first is a **hope**. A chatbot does not return a decision. It returns **text**, and our code has to turn that text into a decision. The text can come back in many shapes:

| What the chatbot sends back | What `json.loads` does |
| --- | --- |
| `{"is_scam": true}` | Works |
| ` ```json {"is_scam": true} ``` ` | Crashes — the code fences are not JSON |
| `Yes, this is clearly a scam because…` | Crashes — that is a paragraph |
| `{"is_scam": "probably"}` | Runs, and `== True` is silently `False` |

And every reply costs **words**. LLMs read and write in small pieces called **tokens** — roughly a word each — and are paid for per token. We pay for a whole sentence and keep one true/false.

> **A chatbot is an essay writer. A scam check is a tick box.** Hiring an essay writer to tick a box works — slowly, expensively, and now and then in beautiful handwriting in the wrong box.

In Step 1 we will not just describe this — we will watch it happen.

### Where a Decision Model Fits

| Kind of model | Its job | Example |
| --- | --- | --- |
| **Chat model (LLM)** | *Writes* | Drafting a reply |
| **Agent** | *Acts* — an LLM that uses tools | Booking a calendar slot |
| **Decision model** | *Decides* — returns an answer our code can branch on | **Today: is this SMS a scam?** |

So what would a model built *only* for deciding look like?

---

## What Is Jev

**Jev** is a model from **TypeSafe AI**, released in early access on **September 15, 2026**. It does not generate text at all.

Think of an exam:

> **A chatbot writes an essay answer. Jev fills in an OMR sheet.** The bubbles are fixed in advance, so the answer always fits — it cannot reply "maybe, it depends, here are five paragraphs".

TypeSafe calls it a **System One** model, after a well-known idea in psychology: *System Two* is slow, careful thinking (solving a JEE maths problem); *System One* is the fast gut call (*"that SMS is a scam"*). Chatbots work like System Two. Jev is built for System One.

We give Jev two things, and get one back:

- **`state`** — the thing to judge. Our SMS.
- **`questions`** — typed questions, each with a name we choose.
- **answers** — one per question, as **numbers**, in the shape we asked for.

The formal version:

> **A decision model takes a state and typed questions, and returns one typed answer per question — with probabilities — instead of generated text.**

**Image Block:**
**Title**: Chatbot vs Jev
**Prompt**: "Split illustration. Left: a robot writing a long messy paragraph on paper, labelled 'Chatbot — writes an essay', with a question mark over the text. Right: a robot quickly filling bubbles on an OMR sheet, labelled 'Jev — fills the bubbles', with three filled bubbles 'scam: 0.97', 'type: bill', 'pressure: 2.6'. Clean flat style, dark background, red-amber-green accents."

### Three Question Types

| Type | Asks | Returns | Our example |
| --- | --- | --- | --- |
| **Noul** | yes or no? | the **probability of yes**, 0 to 1 | *Is this a scam?* → `0.97` |
| **Choice** | which one? | the best option **and a probability for every option** | *What kind of scam?* → `bill_disconnection` |
| **Score** | how much? | a position on **our** scale — can land between levels | *How much pressure?* → `2.6` of 3 |

(Noul is TypeSafe's name; read it as "yes or no". The example values are illustrative.) All the questions we ask are answered **together, in one call**.

<MultiLineNote>

**A Noul answer is its own confidence.** `0.97` means "very likely yes", `0.03` "very likely no", and `0.5` means **"I'm not sure"**. Hold on to that last one — it becomes the most useful number in this session.

</MultiLineNote>

### What Jev Cannot Do

- **It cannot write** — no replies, no summaries.
- **It cannot explain itself** — it returns probabilities, not reasons.
- **It can be wrong.** The *format* is guaranteed. The *answer* is not.

> **A format guarantee is not a truth guarantee.**

TypeSafe's own launch numbers are bold — 70–500 ms per answer, $0.042 per million input tokens with free output, and "about 193x faster, 444x cheaper" on its **own** tests. It also says, to its credit, that *"some bias could exist"* in those tests and that it *"can't prove"* the price is not subsidised. So we will test it ourselves.

### So Far

- A chatbot gives **text**; our code has to hope it is in the right shape.
- Jev is a **decision model**: state + typed questions in, typed answers with probabilities out.
- Three types — **Noul, Choice, Score** — answered in one call.
- The format is guaranteed; **correctness is not**.

---

## What We Are Building

A scam detector that reads a message and returns a **verdict** (🚨 / ⚠️ / ✅), the **kind** of scam and **how much pressure** it applies — then a race against a chatbot on 100 messages, a hunt for Jev's flaw, a fix, and a web app.

### Two Kinds of Cells

We do not need to learn a lot of code for this. The session is about **one idea: the swap** — the few lines where Jev replaces a chatbot. So the notebook has two kinds of cells:

| Mark | Meaning | Cells |
| --- | --- | --- |
| 🧑‍🏫 **Teach** | The code that carries the idea. We read every line | Steps 1, 2, 3, 4, 7 |
| ▶️ **Just run** | Plumbing prepared for us in `jev_helpers.py` — timing, scoring, charts, the app. We run it and read the **results** | Steps 0, 5, 6, 8 |

In total we read about **35 lines** of code.

### How We Get There

| The question | Answered by |
| --- | --- |
| What goes wrong when we ask a chatbot? | Step 1 |
| What does the swap to Jev look like? | Steps 2–3 |
| How does a probability become an action? | Step 4 |
| Is it actually better — and at what? | Step 5 — the race |
| Where is the dangerous flaw? | Step 6 |
| How do we build around it? | Step 7 |
| How does anyone else use it? | Step 8 — the payoff |

---

## Building It

### Step 0: Setup ▶️

We need one account: **OpenRouter**, a service where one API key reaches many AI models — both Jev and a regular chatbot. Jev has no free tier there, so add $2–5 of credit; this notebook uses well under $1 of it. Save the key in Colab's 🔑 **Secrets** panel as `OPENROUTER_API_KEY`, with notebook access switched on.

**Notebook — Step 0**

```python
!pip install -q typesafe-sdk openai gradio pandas matplotlib
!wget -q -nc https://raw.githubusercontent.com/Kiran-B23/jev-scam-detector/main/jev_helpers.py
!mkdir -p data && wget -q -nc -P data https://raw.githubusercontent.com/Kiran-B23/jev-scam-detector/main/data/scam_messages.csv

from jev_helpers import *
KEY = get_api_key()
```

```
✅ Key loaded
```

This installs the libraries, downloads our helper file and the 100 test messages, and reads the key.

**If it fails:** `❌ No key found` means the secret is missing or its notebook-access toggle is off.

---

### Step 1: The Old Way — Asking a Chatbot 🧑‍🏫

Before meeting Jev, we ask a chatbot exactly the way the Problem section described, and look at **precisely** what comes back.

**Notebook — Step 1**

```python
sms = ("Dear consumer, your electricity power will be disconnected tonight at 9:30 PM "
       "because previous month bill was not updated. Call officer 9XXXX X7788 immediately.")

reply = ask_llm('Is this SMS a scam? Reply in JSON like {"is_scam": true}.\n\n' + sms)
print(repr(reply))
```

```
⟦the chatbot's raw reply⟧
```

- **`ask_llm`** — a small helper that sends one prompt to a regular chatbot and returns its text.
- **`repr(reply)`** — prints the reply *exactly*, including code fences and line breaks that `print` would hide.

Now try to use it the way our code would:

**Notebook — Step 1, continued**

```python
import json
try:
    print("Parsed:", json.loads(reply))   # 🤞 hope it's clean JSON, with the right key, and a real true/false
except json.JSONDecodeError as e:
    print("💥 json.loads crashed:", e)
```

```
⟦Parsed: … / 💥 json.loads crashed: …⟧
```

Whatever comes back on the day is the lesson. If it crashed, we have seen why. If it worked, run the cell three more times and watch whether the format stays the same — our app would be betting on it every time.

We got **text**. What we wanted was a **decision**.

---

### Step 2: The Swap — Asking Jev Instead 🧑‍🏫

Same SMS, same question. This time we ask Jev.

**Notebook — Step 2**

```python
from typesafe_sdk import TypeSafeClient, Noul, Choice, Score

jev = TypeSafeClient(api_key=KEY, base_url="https://openrouter.ai/api", model="jev-1.13")

answer = jev.system_one(
    state=sms,
    questions={"is_scam": Noul(instructions="Is this SMS a scam?")},
)
answer.nouls["is_scam"].noul
```

```
⟦0.97⟧
```

Four things to read, one per line:

- **`TypeSafeClient(...)`** — connects to Jev through OpenRouter. `model="jev-1.13"` is **pinned**, so our results do not change when a new version ships.
- **`state=sms`** — the thing to judge.
- **`Noul(instructions="Is this SMS a scam?")`** — a yes/no question, named `"is_scam"` by us.
- **`answer.nouls["is_scam"].noul`** — the answer: a **number between 0 and 1**.

Put the two steps side by side:

| | Step 1 — chatbot | Step 2 — Jev |
| --- | --- | --- |
| What came back | Text we have to parse | A number |
| Can it come back in the wrong shape? | Yes | No |
| Does it say how sure it is? | No | Yes — the number *is* the confidence |

**If it fails:** a 401 error means the key is wrong; 402 means the account needs credit. Errors on a first call are normal — read the error name, fix one thing, run again.

One question works. A worried parent would want to know more than "scam or not" — *what kind* of trick is this, and *why does it feel so urgent?*

---

### Step 3: Three Questions, One Call 🧑‍🏫

We ask one question of each type. The choices and levels are just **plain-English descriptions** — this is where we put our own knowledge in.

**Notebook — Step 3**

```python
SCAM_TYPES = {
    "fake_refund_or_upi": "Fake refund, cashback or 'scan QR / enter PIN to receive money'",
    "kyc_or_account_block": "KYC, PAN, SIM or bank account 'will be blocked'",
    "job_or_task": "Part-time job or task that needs a fee or deposit",
    "prize_or_lottery": "Lottery, lucky draw, prize or reward points",
    "police_or_parcel_threat": "Courier, customs, police or 'digital arrest' threats",
    "bill_disconnection": "Electricity, gas, broadband or mobile 'will be cut' today",
    "fake_family_or_boss": "Pretends to be family, a friend or a boss and asks for money or codes",
    "investment_or_loan": "Guaranteed returns, stock tips, crypto or instant loans",
    "not_scam": "A normal, genuine message",
}

QUESTIONS = {
    "is_scam": Noul(
        instructions="Is this message a scam or fraud attempt?",
        criteria={"true": "Tries to trick the reader into paying, sharing a code, clicking or calling",
                  "false": "A genuine message, even if it mentions OTPs, money or deadlines"},
    ),
    "scam_type": Choice(instructions="What kind of message is this?", criteria=SCAM_TYPES),
    "pressure": Score(instructions="How much pressure does it put on the reader?",
                      criteria=["None", "Mild deadline", "Strong urgency", "Threats"]),
}

answer = jev.system_one(state=sms, questions=QUESTIONS)
print("Scam?    ", answer.nouls["is_scam"].noul)
print("Type:    ", answer.choices["scam_type"].choice)
print("Pressure:", answer.scores["pressure"].score, "out of 3")
```

```
Scam?     ⟦0.97⟧
Type:     ⟦bill_disconnection⟧
Pressure: ⟦2.x⟧ out of 3
```

- **`SCAM_TYPES`** — the bubbles for the Choice question: each option has a short description, and Jev reads the descriptions, not just the names.
- **`criteria` on the Noul** — what *yes* and *no* mean. Look at the `false` line: *"…even if it mentions OTPs, money or deadlines."* A genuine bank OTP message contains the word "OTP"; a real bill has a due date. That one clause stops scam-like **words** from dragging genuine messages towards "yes".
- **The Score levels** — in order, lowest first. The answer can land between them, like `2.4`.
- **One `system_one` call** answers all three.

With a chatbot, adding two more questions means a longer prompt and more parsing. With Jev, it means **two more lines in a dictionary**.

We now have numbers. But `0.97` is not an action — something has to decide what `0.97` *means*.

---

### Step 4: Turning a Probability Into a Decision 🧑‍🏫

Cricket already solved this. In a **DRS** review, when ball-tracking shows the ball clearly hitting the stumps, the decision is overturned; when it is only clipping them by a whisker, the replay says **"umpire's call"** — too close to overrule. We do the same with Jev's probability:

| `p_scam` | Verdict |
| --- | --- |
| **≥ 0.90** | 🚨 Likely scam |
| **≤ 0.10** | ✅ Looks normal |
| **in between** | ⚠️ Not sure — Jev's "umpire's call" |

**Notebook — Step 4**

```python
def check(message):
    a = jev.system_one(state=message, questions=QUESTIONS)
    p = a.nouls["is_scam"].noul
    if p >= 0.90:
        verdict = "🚨 Likely scam"
    elif p <= 0.10:
        verdict = "✅ Looks normal"
    else:
        verdict = "⚠️ Not sure. Double-check"
    return {"verdict": verdict, "p_scam": p, "scam_type": a.choices["scam_type"].choice,
            "type_probs": dict(a.choices["scam_type"].probabilities), "pressure": a.scores["pressure"].score}

for msg in [sms,
            "123456 is your OTP for login. Do not share it with anyone. Bank staff will never ask for your OTP.",
            "Hi dear, I sent a code to your number by mistake, can you please forward it to me? It's urgent."]:
    r = check(msg)
    print(f"{r['verdict']:<28} p={r['p_scam']:.2f}  {r['scam_type']:<24} | {msg[:60]}...")
```

```
⟦🚨 Likely scam⟧   p=⟦0.97⟧  ⟦bill_disconnection⟧ | Dear consumer, your electricity power…
⟦…⟧                p=⟦…⟧     ⟦…⟧                 | 123456 is your OTP for login…
⟦…⟧                p=⟦…⟧     ⟦…⟧                 | Hi dear, I sent a code to your number…
```

- **`check`** is our whole detector: ask Jev → compare the probability with two lines → return a verdict and the details.
- The **two numbers, 0.90 and 0.10, are our decision**, not Jev's. Stricter lines mean fewer mistakes but more "not sure".

The three test messages are chosen on purpose: the obvious scam; a **genuine** OTP message full of "OTP" and "bank"; and *"I sent a code to your number by mistake"* — no link, no threat, polite, and exactly how WhatsApp accounts get stolen. If Jev puts one of them in the middle, that is not a failure — it is the model admitting it does not know, and our code listening.

### So Far

- **The swap** is two lines: a client, and `system_one(state, questions)`.
- **Three question types in one call**; the descriptions are where our knowledge goes.
- **Two thresholds** turn a probability into a decision, with an honest "not sure" zone.

Three messages prove nothing, though. Is this actually better than the chatbot?

---

### Step 5: The Race ▶️

Our test set is 100 **made-up** messages written in the style of real Indian SMS and WhatsApp forwards: 60 scams and 40 genuine, about a third **deliberately tricky** (real OTP alerts, a cab-driver OTP you *should* share, polite scams). Each one is **labelled** — we know the right answer — which is what lets us grade the models. All links and numbers in it are fake.

The race gives both models the **same questions** and the **same rules** — 10 messages at a time — like two runners on the same track. The race code is prepared for us; we just run it.

**Notebook — Step 5**

```python
df = load_messages()
results = await race(df, QUESTIONS, SCAM_TYPES)
```

| | Jev | Regular LLM | Jev advantage |
| --- | --- | --- | --- |
| time for 100 messages | ⟦…⟧ | ⟦…⟧ | ⟦…⟧x faster |
| typical time per message | ⟦…⟧ | ⟦…⟧ | ⟦…⟧x faster |
| cost per 1,000 messages | ⟦…⟧ | ⟦…⟧ | ⟦…⟧x cheaper |
| broken / invalid answers | 0 | ⟦…⟧ | |

Speed was never the real question. **Is it right?**

**Notebook — Step 5, continued**

```python
scoreboard(results)
```

| | Jev | Regular LLM |
| --- | --- | --- |
| accuracy | ⟦…⟧ | ⟦…⟧ |
| scams caught | ⟦…⟧ / 60 | ⟦…⟧ |
| false alarms on genuine messages | ⟦…⟧ / 40 | ⟦…⟧ |
| scam type correct | ⟦…⟧ | ⟦…⟧ |

How to read it:

- **Scams caught** matters most. A missed scam can cost someone money; a false alarm only costs a second look.
- The chatbot is graded only on answers we could parse. The broken ones never reached the scoreboard — in a real app, they would have been crashes.
- **If the chatbot is more accurate, say so.** The honest trade-off is then *⟦N⟧x faster and ⟦M⟧x cheaper, for ⟦K⟧ points of accuracy*. A small independent test by Every found the same shape: Jev caught 6 of 7 planted mistakes where a bigger model caught all 7.

The scoreboard gives averages. Averages hide the mistakes that matter most.

---

### Step 6: Finding the Flaw ▶️

Here is the flaw promised at the start. Jev **cannot** give a broken answer. But it can give a **wrong** one — and be sure about it.

**Notebook — Step 6**

```python
confident_mistakes(results)
```

```
Jev was wrong on ⟦…⟧ of 100 messages, and SURE of itself on ⟦…⟧ of those.
```

A mistake at `0.55` is harmless — our verdict already says "not sure". The dangerous ones are **past our thresholds**: wrong, and confident. When they show up, they tend to follow the same patterns people fall for:

| Pattern | Example from the test set |
| --- | --- |
| A scam with no red-flag words yet | *"Hello, I am Priya from a recruitment agency…"* |
| A genuine message full of scam words | *"123456 is your OTP… Bank staff will never ask…"* |
| A tiny, believable amount | *"Pay Rs 25 redelivery fee"* |
| Hinglish | *"Bhai galti se aapke account me 5000 transfer ho gaya…"* |

These are **System One** mistakes — a fast gut call, fooled the same way ours is.

We cannot make Jev never wrong. We **can** choose how strict our lines are:

**Notebook — Step 6, continued**

```python
threshold_table(results)      # stricter threshold = fewer mistakes, more "second checks"
# reliability_plot(results)   # optional: when Jev says 80%, are ~80% really scams?
```

| threshold | Jev decides alone | mistakes among those | sent for a second check |
| --- | --- | --- | --- |
| 0.70 | ⟦…⟧ | ⟦…⟧ | ⟦…⟧ |
| 0.90 | ⟦…⟧ | ⟦…⟧ | ⟦…⟧ |
| 0.99 | ⟦…⟧ | ⟦…⟧ | ⟦…⟧ |

Stricter lines → Jev decides fewer messages alone, and makes fewer mistakes on the ones it does. For scams, where a miss is the expensive mistake, we lean strict.

The optional reliability plot answers one question — *can we trust the probabilities themselves?* Think of a weather forecast: if it says "70% chance of rain" on 100 days, it should rain on about 70 of them. With only 100 messages the plot is rough, so treat it as a sanity check.

### So Far

- On our 100 messages, Jev was **⟦N⟧x faster** and **⟦M⟧x cheaper**, with **zero** broken answers.
- It **can be confidently wrong** — on the same kinds of messages that fool people.
- **Stricter thresholds** buy fewer mistakes with more "not sure" messages.

So what do we do with the "not sure" ones?

---

### Step 7: The Fix — Jev Decides, the Chatbot Explains 🧑‍🏫

Jev handles **every** message — fast and cheap. Only when it says ⚠️ do we call the slower chatbot, for the one thing Jev cannot do: **explain in plain words**.

**Image Block:**
**Title**: Jev Decides, the Chatbot Explains
**Prompt**: "Flow diagram. 'Every message' enters a box 'Jev (fast, cheap)'. Arrow splits: green path 'sure (≥0.90 or ≤0.10)' goes to 'Show verdict', labelled 'most messages'; amber path 'not sure' goes to 'Chatbot explains in plain words' then 'Verdict + explanation', labelled 'the tricky few'. Flat, minimal."

**Notebook — Step 7**

```python
def check_with_backup(message):
    result = check(message)
    if result["verdict"].startswith("⚠️"):
        result["explanation"] = ask_llm(
            "In 2 short sentences of simple English, say whether this SMS looks like a scam and what to do next. "
            "Never tell the reader to click links or call numbers in it.\n\nSMS: " + message)
    return result

unsure = results[(results.p_scam_jev < 0.90) & (results.p_scam_jev > 0.10)]
print(len(unsure), "of 100 messages would get a second opinion.")
if len(unsure):
    check_with_backup(unsure.message.iloc[0])
```

```
⟦N⟧ of 100 messages would get a second opinion.
```

- **`check(message)`** — our Step 4 detector, unchanged.
- **`if … "⚠️"`** — the chatbot is called **only** in the not-sure zone.
- **"Never tell the reader to click links or call numbers in it"** — a helpful-sounding chatbot is perfectly capable of saying *"call the number to confirm"*. This line stops it repeating the scammer's instruction.

Most messages take Jev's fast, cheap path. Only ⟦N⟧ in 100 pay the chatbot's price — exactly the ones where a careful second look is worth it.

> **Use the fast model for every decision. Use the slow model only where the fast one says it is unsure.**

---

### Step 8: Ship It ▶️

One helper wraps `check_with_backup` in a web page with a shareable link.

**Notebook — Step 8**

```python
launch_app(check_with_backup, examples=[
    [sms],
    ["Hi Mom, this is my new number, my phone fell in water. Can you send Rs 8,000 urgently?"],
    ["Your order has been shipped and will arrive by Thursday. Track it in the app."],
])
```

The app shows the verdict, the top three scam kinds as bars — the Choice probabilities from Step 3 — the pressure score, and the chatbot's explanation when Jev was unsure. The public link works for 72 hours.

Now test it where it matters: paste in a **real** suspicious message from your own phone, with names, numbers and links removed first. The examples prove the code runs; a message it has never seen proves the detector works.

<MultiLineWarning text="This is a learning project, not a safety product">

A model that is confidently wrong on a few messages in a hundred will be confidently wrong for someone, eventually. Never present this app as proof a message is safe. The advice that is always right: **contact the organisation through its official app or number, never the one in the message.** In India, cyber fraud can be reported on **1930** or at **cybercrime.gov.in**.

</MultiLineWarning>

---

## What Changed: The Swap

The whole session comes down to replacing one kind of call with another.

**Before — asking a chatbot**

```python
reply = ask_llm('Is this SMS a scam? Reply in JSON like {"is_scam": true}.' + sms)
result = json.loads(reply)          # hope it is valid JSON
if result["is_scam"] == True:       # hope the key exists, and is a real true/false
    warn_user()
```

**After — asking Jev**

```python
answer = jev.system_one(state=sms, questions=QUESTIONS)
if answer.nouls["is_scam"].noul >= 0.90:     # a number, always — and we chose the line
    warn_user()
```

| | Before | After |
| --- | --- | --- |
| What comes back | Text we parse and hope about | Typed numbers, always in shape |
| How sure it is | Unknown — every reply sounds confident | A probability we act on |
| When it is unsure | We never find out | ⚠️ — and a second opinion |
| More questions | A longer prompt, more parsing | One more line in `QUESTIONS` |
| Speed and cost, per message | ⟦chatbot⟧ | ⟦Jev⟧ |

The swap itself was two lines. What made it **trustworthy** were three things around it: **a threshold, a test set and a backup** — and those work the same way with any model we use next.

> **A fast model gives answers. Thresholds, tests and a backup give trust.**

<details>
<summary><b>Final Code — every 🧑‍🏫 Teach cell</b></summary>

```python
from jev_helpers import *
from typesafe_sdk import TypeSafeClient, Noul, Choice, Score

KEY = get_api_key()
jev = TypeSafeClient(api_key=KEY, base_url="https://openrouter.ai/api", model="jev-1.13")

SCAM_TYPES = {
    "fake_refund_or_upi": "Fake refund, cashback or 'scan QR / enter PIN to receive money'",
    "kyc_or_account_block": "KYC, PAN, SIM or bank account 'will be blocked'",
    "job_or_task": "Part-time job or task that needs a fee or deposit",
    "prize_or_lottery": "Lottery, lucky draw, prize or reward points",
    "police_or_parcel_threat": "Courier, customs, police or 'digital arrest' threats",
    "bill_disconnection": "Electricity, gas, broadband or mobile 'will be cut' today",
    "fake_family_or_boss": "Pretends to be family, a friend or a boss and asks for money or codes",
    "investment_or_loan": "Guaranteed returns, stock tips, crypto or instant loans",
    "not_scam": "A normal, genuine message",
}

QUESTIONS = {
    "is_scam": Noul(
        instructions="Is this message a scam or fraud attempt?",
        criteria={"true": "Tries to trick the reader into paying, sharing a code, clicking or calling",
                  "false": "A genuine message, even if it mentions OTPs, money or deadlines"},
    ),
    "scam_type": Choice(instructions="What kind of message is this?", criteria=SCAM_TYPES),
    "pressure": Score(instructions="How much pressure does it put on the reader?",
                      criteria=["None", "Mild deadline", "Strong urgency", "Threats"]),
}

def check(message):
    a = jev.system_one(state=message, questions=QUESTIONS)
    p = a.nouls["is_scam"].noul
    if p >= 0.90:
        verdict = "🚨 Likely scam"
    elif p <= 0.10:
        verdict = "✅ Looks normal"
    else:
        verdict = "⚠️ Not sure. Double-check"
    return {"verdict": verdict, "p_scam": p, "scam_type": a.choices["scam_type"].choice,
            "type_probs": dict(a.choices["scam_type"].probabilities), "pressure": a.scores["pressure"].score}

def check_with_backup(message):
    result = check(message)
    if result["verdict"].startswith("⚠️"):
        result["explanation"] = ask_llm(
            "In 2 short sentences of simple English, say whether this SMS looks like a scam and what to do next. "
            "Never tell the reader to click links or call numbers in it.\n\nSMS: " + message)
    return result
```

The race, grading and app live in `jev_helpers.py`, which is short and commented for anyone curious.

</details>

---

## When Should We Use a Decision Model?

| Option | Reach for it when | What it costs |
| --- | --- | --- |
| **Plain `if` / rules** | The rule is exact — *"message contains `.apk`"* | Breaks on anything the rule did not foresee |
| **Decision model (Jev)** | A narrow judgement — yes/no, pick one, rate it — on every item, fast | Cannot explain; can be confidently wrong |
| **Chatbot (LLM)** | The output must be words, or the judgement needs step-by-step reasoning | Slower, costlier, output must be parsed |
| **Human** | High stakes and the model is unsure | Time |

1. **Can a plain rule do it exactly?** → Write the rule.
2. **Is it a narrow judgement our code acts on?** → A decision model, with a threshold.
3. **Does the output need to be words?** → A chatbot.
4. **Unsure and high stakes?** → Escalate — to a chatbot, then a person.

> Let the fast model decide. Let the threshold decide when to trust it.

---

## Session Recap

1. **Chatbots write; decision models decide.** Jev returns typed answers our code can act on directly.
2. **The swap is two lines** — a client and `system_one(state, questions)` — and it removes all the parsing.
3. **Noul, Choice, Score** in one call; their descriptions are where our knowledge goes.
4. **Thresholds** turn probabilities into actions, with an honest "not sure" zone.
5. **The race** on 100 labelled messages showed what no launch post can: speed, cost and accuracy on *our* data.
6. **The flaw: valid is not correct.** Jev can be wrong and sure of it.
7. **The fix: Jev decides, the chatbot explains** — fast for most, careful for the tricky few.

## Your Turn

- Add **five tricky messages** of your own to `data/scam_messages.csv` (remove personal details first) and rerun Steps 5–6. Did the confident-mistake count change?
- Change **one description** in `QUESTIONS` and rerun the race. Did accuracy move?
- Swap Jev into something you already built with a chatbot: any place your code asks an LLM a yes/no question and parses the reply.

Share what fooled it.
