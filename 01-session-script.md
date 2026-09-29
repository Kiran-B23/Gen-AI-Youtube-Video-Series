# Session Script: "This AI Can't Write a Single Word, and That's Why It's So Fast"

**Format:** standalone NxtWave project session · **Target length:** 22–25 min · **Audience:** students and early-career developers; no ML background needed
**Project:** A scam-message detector built by **swapping a chatbot for Jev** (TypeSafe AI's decision model), raced on 100 messages, its flaw found and fixed, shipped as a web app.
**Teaching flow:** `03-TR-doc.md` (this script is its on-camera version) · **Notebook:** `notebook/jev_scam_detector.ipynb` · **Slides:** `02-slide-outline.md`

> **How to read this script**
> - **[SCREEN]** what viewers see · **[SAY]** what the host says (a guide, not a teleprompter) · **[DO]** the on-screen action
> - `⟦…⟧` = a number from **your real run**. Fill in after the dry run, and never use a placeholder or a vendor number.
> - 🧑‍🏫 cells get **read line by line**. ▶️ cells get **run, not read**: run them and talk only about the result.

---

## Chapter list
```
0:00 This AI can't write a single word
0:45 What we're building
1:30 The problem: asking a chatbot for a yes/no
4:00 Meet Jev: the model that only decides
7:00 The swap: 2 lines that replace the chatbot
10:30 3 questions, 1 call
12:30 Turning a probability into a decision
14:30 The race: Jev vs chatbot on 100 messages
17:30 The flaw: confident and wrong
20:00 The fix: Jev decides, the chatbot explains
21:30 Ship it as an app
22:30 Recap
```

---

## 1. Cold open (0:00–0:45): the hook

> **Hook formula:** paradox → proof → stakes → a secret we promise to reveal. Every number must come from the real run.

**[SCREEN]** Black screen. White text, one line at a time, synced to the voice.

**[SAY]** "This AI **can't write a single word**."
**[SCREEN]** *can't chat* · *can't explain* · *can't even say hello*
**[SAY]** "It can't chat. It can't explain itself. It can't even say hello."

**[SCREEN]** Hard cut to a split screen. Left: a chatbot with "typing…" dots. Right: **Jev**, with a counter flying **0 → 100 ✓**.
**[SAY]** "But we gave it 100 messages to judge… and it finished **all 100** in ⟦X⟧ seconds. The chatbot, on the same 100? ⟦Y⟧."
**[SCREEN]** The counters freeze. Big text: **⟦N⟧x faster · ⟦M⟧x cheaper**

**[SCREEN]** A phone buzzes: the electricity-disconnection SMS. Jev's verdict slams on top: **🚨 Likely scam**.
**[SAY]** "And these weren't just any messages. They were **scam SMS**, the kind that empty people's bank accounts."

**[SCREEN]** Glitch effect. One verdict flips red: **✅ Looks normal (0.04)** on a message that was really a scam.
**[SAY]** "So why isn't everyone using it? Because it has **one dangerous flaw**. And today we're going to find it ourselves."

**[SCREEN]** Title card: **"This AI Can't Write a Single Word"** + music sting.

> **If the run has no confident-wrong case,** replace the glitch shot with the weakest real result ("…but on tricky messages it dropped to ⟦X⟧%"). Never stage a fake failure.

---

## 2. What we're building (0:45–1:30)

**[SAY]** "Hi everyone, I'm ⟦Host⟧. In the next 20 minutes, in a free Colab notebook, we'll:
1. ask a normal chatbot to catch a scam, and watch it struggle,
2. **swap** it for this new model, called **Jev**. The swap is literally two lines,
3. race them on 100 messages,
4. find Jev's flaw, fix it, and ship it as an app you can send to your family.
And here's the good part: you'll only need to understand about **35 lines of code**. Everything else we've prepared for you. You just press run."

**[SCREEN]** The notebook legend: 🧑‍🏫 **Teach** = we read it · ▶️ **Just run** = we run it and look at the result.

---

## 3. The problem: asking a chatbot for a yes/no (1:30–4:00)

**[SAY]** "Three quick terms so everyone's on the same page. An **LLM** is the AI behind chatbots like ChatGPT: it reads text and writes text. **JSON** is a way to write data so code can read it, like this." **[SCREEN]** `{"is_scam": true}` **[SAY]** "And an **API key** is a password your code sends so the AI service knows who's calling."

**[SCREEN]** The "three hopeful lines":
```python
reply = ask_llm('Is this SMS a scam? Reply in JSON like {"is_scam": true}.' + sms)
result = json.loads(reply)          # hope it is valid JSON
if result["is_scam"] == True:       # hope the key exists, and is a real true/false
    warn_user()
```
**[SAY]** "This is how most people would build a scam check today. Ask a chatbot, ask for JSON, read the answer. But look at the comments: every line is a **hope**. The chatbot doesn't give you a decision. It gives you **text**, and your code has to hope that text is in the right shape."

**[DO]** ▶️ Step 0 is already run (setup cut in the edit). 🧑‍🏫 Run **Step 1**. Zoom in on `repr(reply)`, then on the `json.loads` cell.
**[SAY]** "Let's actually try it. ⟦React to the real output: "Code fences around it, so `json.loads` crashes" / "A whole paragraph" / "It worked this time. Let's run it again… and again"⟧. It's like hiring an essay writer to tick a box. It works, but it's slow, it costs money for every word, and sometimes it ticks the wrong box in beautiful handwriting."

---

## 4. Meet Jev (4:00–7:00)

**[SCREEN]** Slide: *Chatbot = essay answer · Jev = OMR sheet*
**[SAY]** "Now meet **Jev**, from a company called TypeSafe AI, released September 15, 2026. Jev is a **decision model**. If a chatbot writes you an essay answer, Jev fills in an **OMR sheet**. The bubbles are fixed, so the answer always fits. It literally can't reply 'maybe, it depends, here are five paragraphs'."

**[SCREEN]** Slide: the three question types with scam examples.
**[SAY]** "You give Jev the thing to judge, called the **state**, and some questions. There are only three kinds:
- **Noul**: yes or no. *Is this a scam?* You get back the probability of yes, like 0.97.
- **Choice**: pick one. *What kind of scam?* You get the answer plus a probability for every option.
- **Score**: how much. *How much pressure does it put on you?* You get a number on your own scale.
And you can ask all of them in **one** call."

**[SCREEN]** Slide: *the claims and the fine print*
**[SAY]** "TypeSafe says it's about 190 times faster and 440 times cheaper. But they also say, and I respect this, that those tests were made by their own team, so 'some bias could exist'. So we won't trust anyone's numbers. We'll measure our own."

---

## 5. The swap (7:00–10:30): the heart of the session

**[DO]** 🧑‍🏫 Show **Step 2**. Go line by line and highlight each one as you speak.
**[SAY]** "Here it is, the swap.
- Line one connects to Jev. We **pin** the version, `jev-1.13`, so our results don't change when they release a new one.
- Then `system_one`: the **state** is our SMS, and the question is one Noul: 'Is this SMS a scam?'
- And the answer…"
**[DO]** Run it.
**[SCREEN]** Output: `⟦0.97⟧`, zoomed and circled.
**[SAY]** "…is just a **number**. 97% sure it's a scam. No JSON, no parsing, no hoping."

**[SCREEN]** Side-by-side table: Step 1 chatbot vs Step 2 Jev (text vs number · can break vs can't · no confidence vs the number *is* the confidence).
**[SAY]** "Same SMS, same question. On the left, text we have to hope about. On the right, a number our code can use directly. That's the whole idea of today's session."

---

## 6. Three questions, one call (10:30–12:30)

**[DO]** 🧑‍🏫 Scroll through **Step 3** slowly. Don't read every scam type, just point at the list.
**[SAY]** "Now let's ask more. These scam types are just **plain English descriptions**: refund scams, KYC scams, job scams, 'digital arrest' threats. This is where *you* put your knowledge in.
And look at this one line." **[SCREEN]** Highlight *"…even if it mentions OTPs, money or deadlines"*. **[SAY]** "Real bank messages say 'OTP'. Real bills have due dates. This line tells Jev not to panic just because it sees scary words."
**[DO]** Run it.
**[SAY]** "One call, three answers: scam ⟦0.97⟧, type ⟦bill_disconnection⟧, pressure ⟦2.x⟧ out of 3. With a chatbot, adding two questions means a longer prompt and more parsing. With Jev, it's two more lines in a dictionary."

---

## 7. Turning a probability into a decision (12:30–14:30)

**[SCREEN]** DRS replay graphic: the ball clipping the stumps, with the text **UMPIRE'S CALL**.
**[SAY]** "But 0.97 isn't an action. Who decides what 0.97 means? Cricket already solved this. In DRS, if the ball is clearly hitting the stumps, the decision is overturned. If it's just clipping them, it's **umpire's call**: too close to overrule. We do the same thing. Above 0.90, scam. Below 0.10, looks normal. In between is Jev's umpire's call: *not sure, double-check*."
**[DO]** 🧑‍🏫 Walk through the `check` function in **Step 4** (the `if/elif/else` only). Run the three test messages.
**[SAY]** "The electricity scam: ⟦verdict⟧. A **genuine** OTP message: ⟦verdict⟧. And this sneaky one, 'I sent a code to your number by mistake', which is exactly how WhatsApp accounts get stolen: ⟦verdict⟧." ⟦If any lands in ⚠️: "See that? It *knows* it doesn't know. That's a feature."⟧

---

## 8. The race (14:30–17:30)

**[SAY]** "Three messages prove nothing. So we wrote 100 messages in the style of real Indian SMS and WhatsApp forwards. 60 are scams, 40 are genuine, and a third are **tricky on purpose**. The numbers and links are all fake, so don't call them!
Both models get the same questions and the same rules: 10 at a time, like two runners on the same track. We've prepared the race code for you. We just press run."
**[DO]** ▶️ Run **Step 5**. Keep a **real-time timer overlay** even if the footage is sped up.
**[SCREEN]** Scoreboard. Animate each row in.
**[SAY]** "Jev: ⟦X⟧ seconds. The chatbot: ⟦Y⟧. **⟦N⟧x faster, ⟦M⟧x cheaper**. Broken answers: Jev, zero, guaranteed. The chatbot, ⟦…⟧.
But speed isn't the real question. Is it **right**?"
**[DO]** ▶️ Run `scoreboard(results)`.
**[SAY]** "Scams caught: Jev ⟦…⟧ out of 60. False alarms: ⟦…⟧ out of 40. The chatbot: ⟦…⟧." ⟦If the chatbot was more accurate: "The chatbot was more accurate here. So the real trade-off is ⟦N⟧x faster and ⟦M⟧x cheaper, for ⟦K⟧ points of accuracy. Which matters more depends on your app."⟧

---

## 9. The flaw (17:30–20:00)

**[SAY]** "Remember the dangerous flaw from the start? Here it is."
**[DO]** ▶️ Run `confident_mistakes(results)`. Read 2–3 rows aloud.
**[SAY]** "Jev **can't** give a broken answer, but it **can** give a wrong one and be sure about it. Look: ⟦message⟧, and it said ⟦0.0x⟧. ⟦Explain which pattern: a polite scam with no link yet, a genuine message full of scary words, a tiny ₹25 fee, Hinglish⟧. These are exactly the mistakes a *human* makes at a glance. Fast gut calls get fooled the same way."
**[DO]** ▶️ Run `threshold_table(results)`.
**[SAY]** "We can't make it perfect, but we can choose how strict to be. At 0.90, Jev decides ⟦…⟧ messages alone with ⟦…⟧ mistakes. At 0.99, fewer mistakes, but more messages need a second check. For scams, missing one is the expensive mistake, so we lean strict."

---

## 10. The fix (20:00–21:30)

**[DO]** 🧑‍🏫 Show **Step 7**. Highlight the `if … "⚠️"` line.
**[SAY]** "So here's the fix. Jev checks **every** message, fast and cheap. Only when it says *not sure* do we call the slower chatbot, for the one thing Jev can't do: explain in plain words. And see this instruction? 'Never tell the reader to click links or call numbers in it.' A helpful chatbot could easily say 'call the number to confirm'. We don't want that.
Out of 100 messages, only ⟦N⟧ needed the chatbot. Fast for most, careful for the tricky few."

---

## 11. Ship it (21:30–22:30)

**[DO]** ▶️ Run **Step 8**. Open the public link, click the examples, then paste a fresh message live.
**[SAY]** "One line, and it's a web app with a link you can share for 72 hours. Send it to your family group."
**[SCREEN]** Lower third: *Learning project, not a safety guarantee. Scammed? Call 1930 or visit cybercrime.gov.in*
**[SAY]** "Just remember: this is a learning project, not a guarantee. If a message worries you, contact the company through its **official** app or number, never the one in the message."

---

## 12. Recap and CTA (22:30–end)

**[SCREEN]** The swap, before vs after:
```python
# Before: a chatbot
result = json.loads(ask_llm(prompt))          # hope
# After: Jev
p = jev.system_one(state=sms, questions=QUESTIONS).nouls["is_scam"].noul   # a number, always
```
**[SAY]** "So that's the swap. Chatbots **write**, Jev **decides**. Two lines replaced all our parsing and hoping. But the swap alone wasn't what made it trustworthy. That was the **threshold**, the **test set**, and the **backup**, and those work with any model you use next.
And the flaw? Valid isn't the same as correct. Now you know how to catch it.
Your challenge: add five tricky messages from your own phone to the test set (remove personal details first) and see if Jev gets fooled. Tell us in the comments what fooled it.
If this helped, like, subscribe and hit the bell, and tell us what we should build next. See you in the next one!"
