# Script B: This AI "Can't Hallucinate"… So We Fed It Scam SMS (V3.1)

**Format:** face + screen · **target 16:15** · standalone · about 15 taught lines of code
**Teaching flow and facts:** `TR-doc.md` · **Notebook:** `notebook/jev_scam_detector.ipynb` · **Written to:** `../../../guidelines/script-vs-video-analysis.md` rules W1–W11

> **Cues:** **[FACE]** · **[SCREEN]** · **[SPLIT]** host in a corner bubble over the screen · **[TEXT]** · **[B-ROLL]** · **[SFX]** · **[SAY]** · **[RUN]** run a notebook cell · **[EXPECT]** what should appear · **[IF IT FAILS]** what to say and do · **[OPTIONAL]** cut first
> `⟦…⟧` = a number from **your dry run**. Record this week, straight after it.

## Before recording

**Promise ledger (W6)**

| Promise | Made at | Delivered at |
|---|---|---|
| "Is it a scam?" (the opening SMS) | 0:00 | 4:45 The swap (Jev's number) |
| "We tested both claims" | 0:12 | Claim #1 → 4:45–12:45 · Claim #2 → 8:15 |
| "One of them doesn't survive" | 0:12 | Planted at ~7:30 ("remember this one"), paid off at 10:45 |
| "Polite scams, Hinglish, fake OTPs" | 0:20 | 6:30 Can we fool it? |
| "A hundred messages and a stopwatch" | 0:20 | 8:15 The race |
| "Let's see if the hype is real" | 0:35 | 15:30 The verdict |

**Word budget (W3), at ~150 words per minute.** Demo chapters run well under budget, because the screen does the work.

| Chapter | Time | Budget | Spoken (measured) |
|---|---|---|---|
| Hook | 0:00–0:45 | ≤ 110 | 65 |
| Why the internet lost its mind | 0:45–2:00 | ≤ 190 | 104 |
| It's not a chatbot | 2:00–4:00 | ≤ 300 | 144 |
| Is ChatGPT dead? | 4:00–4:45 | ≤ 110 | 45 |
| Claim #1: can we fool it? | 4:45–8:15 | ≤ 525 | 267 |
| Claim #2: the race | 8:15–10:45 | ≤ 375 | 125 |
| Wrong, and sure of it | 10:45–12:45 | ≤ 300 | 106 |
| The fix | 12:45–14:00 | ≤ 190 | 65 |
| Where you'd use this | 14:00–14:45 | ≤ 110 | 26 |
| The free rival | 14:45–15:30 | ≤ 110 | 40 |
| Verdict and close | 15:30–16:15 | ≤ 110 | 70 |

**Runtime check (measured, W3):** **~1,060 spoken words, about 7 minutes of speech**. The remaining ~9 minutes come from running cells, the race, the "pause and guess" beat and B-roll, which is normal for a demo session. The lightest chapters (Where you'd use this: 26 words; The free rival: 40) rely on the cards and B-roll.

**Checks done:**
- **Hands-on (W1):** every cell has [RUN] / [EXPECT] / [IF IT FAILS].
- **Placement (W2):** the first demo starts at 4:45 (29%), and the race and the fix are interleaved with explanation.
- **Claims (W8):** "can't hallucinate" is always attributed to TypeSafe; "lying" is replaced by "wrong and sure".
- **References (W7):** "remember this one" comes before its payoff.
- **Standalone (W9):** no references to other videos.
- **Table read (W11):** do one with the presenter before recording.

---

## 0:00 You've probably received this message

**[SCREEN]** Phone close-up: *"Dear consumer, your electricity power will be disconnected tonight at 9:30 PM… Call officer 9XXXX X7788 immediately."*
**[SAY]** "You've probably received this message. Is it a scam?"

**[SCREEN]** Jev's output card appears instantly, showing ⟦0.9x⟧. **[SFX]** blip.
**[SAY]** "This AI answered in under a second. Its makers say it **can't hallucinate**."

**[SCREEN]** Split: "Can't hallucinate" | "Answers are free". **[SFX]** record scratch.
**[SAY]** "Two huge claims. We tested both. **One of them doesn't survive this video.**"

**[B-ROLL]** Quick cuts: a Hinglish scam, a fake OTP message, the race timer counting.
**[SAY]** "Polite scams, Hinglish, fake OTPs, a hundred messages, and a stopwatch."

**[FACE]**
**[SAY]** "It's called **Jev**, and it doesn't talk at all. It only decides. Let's see if the hype is real."

**[SAY] Re-hook:** "But first: why is everyone suddenly talking about a model that can't even say hello?"

---

## 0:45 Why the internet lost its mind

**[B-ROLL]** Montage, 1–2 s per shot: the HN counter to ~2,000 · the platform logos · "Sep 20 open → Sep 22 paused" · "$40M seed".
**[SAY]** "It launched on September 15th. Within a week, Vercel, LangChain, OpenRouter, DigitalOcean and Pydantic AI all added it. Signups opened, and two days later they had to *pause* them. And the founder co-authored InstructGPT, the research that taught ChatGPT to follow instructions."

**[FACE]**
**[SAY]** "Here's why. Every app is full of tiny decisions: is this spam, which team gets this complaint, is this message safe. Today, each one means asking a chatbot, waiting seconds, and paying for a paragraph just to get a yes or no."
**[TEXT]** "≈ $0.04 per 1,000 decisions"
**[SAY]** "Jev answers them in under a second, for about **four cents per thousand**. TypeSafe calls it 'smart if-statements'."

**[SAY] Re-hook:** "So what is this thing, if it isn't a chatbot?"

---

## 2:00 It's not a chatbot. At all.

**[SCREEN]** The essay-robot vs OMR-robot animation.
**[SAY]** "A chatbot writes you an **essay answer**. Jev fills in an **OMR sheet**. The bubbles are fixed, so the answer always fits. It can't reply 'maybe, it depends, here are five paragraphs.'"

**[FACE]**
**[SAY]** "The company calls it a **System One** model. System Two is slow, careful thinking, like a JEE maths problem. System One is your gut glancing at an SMS and going 'scam.' Chatbots are System Two. Jev is System One."

**[SCREEN]** Three cards slide in: **Noul:** yes or no? → 0.97 · **Choice:** which one? → bill disconnection · **Score:** how much? → 2.6 / 3
**[SAY]** "You give it the thing to judge, called the *state*, and ask it questions. Only three kinds: yes-or-no, pick one, and how much. Every answer is a **number**, and you can ask all three at once."

**[SCREEN]** The comparison table, rows highlighted one at a time.
**[SAY]** "The chatbot writes text, takes seconds, and costs more. Jev only picks from your options, in under a second, for a fraction of the price, and it tells you how sure it is."

**[SAY] Re-hook:** "So if it's faster *and* cheaper… is ChatGPT finished?"

---

## 4:00 So… is ChatGPT dead?

**[FACE]** **[TEXT]** "NO."
**[SAY]** "No. And that's the point. Jev can't write a sentence, explain itself, or think step by step. Even TypeSafe says it's not a replacement for a chatbot. They're a team: Jev makes the thousands of quick calls, and the chatbot handles the rare hard ones."

**[SAY] Re-hook:** "But fast and cheap means nothing if it's wrong. Can we fool it?"

---

## 4:45 Claim #1: can we fool it?

**[SPLIT]** Colab, with the ▶️ setup cell already run (cut the wait in the edit).
**[SAY]** "Everything's in a free Colab notebook. The link's in the description. One OpenRouter account gets us both Jev and a normal chatbot."

### Beat 1: the old way 🧑‍🏫
**[RUN]** "First, the old way."
**[SAY]** "First, the simplest way to ask a chatbot: 'Is this SMS a scam? Reply in JSON.'"
**[EXPECT]** `repr(reply)` shows the raw text, then either `Parsed: {...}` or `💥 json.loads crashed`.
**[SAY]** (react to the real output) "⟦If it crashed:⟧ It wrapped the answer in extra text, and our code crashed. ⟦If it parsed:⟧ This time it behaved. Our app would be betting on that every single time."
**[SAY]** "To be fair, chatbots have a JSON mode that fixes most of this, and our race will turn it on. So the real question isn't the format. It's speed, cost, and **how sure** it is."
**[IF IT FAILS]** A 401 means the key is wrong: "Quick fix: re-add the key in Secrets." Re-run, and cut the pause.

### Beat 2: the swap 🧑‍🏫
**[SCREEN]** **[TEXT]** "THE SWAP". Highlight the two lines as you read them.
**[SAY]** "Now the swap. Two lines. Connect to Jev, and ask one yes-or-no question about the same SMS."
**[RUN]** "The swap."
**[EXPECT]** A single number, ⟦0.9x⟧. **[SFX]** ding; circle it.
**[SAY]** "A number: **⟦97⟧ percent** sure it's a scam. Nothing to parse, nothing to break. *That's* what 'can't hallucinate' really means: the **format** is guaranteed. Whether the **answer** is right is what we're here to test."
**[IF IT FAILS]** 402 means no credit (add it and re-run); 404 means the model name changed (check OpenRouter's Jev page).

### Beat 3: ask more ▶️
**[RUN]** "Ask more."
**[EXPECT]** One line: `Scam: … | Type: … | Pressure: … / 3`
**[SAY]** "Same call, three answers: scam, what kind, and how much pressure. And look at this line." **[SCREEN]** Highlight *"even if it mentions OTPs, money or deadlines"*. **[SAY]** "Real bank messages say 'OTP' too. This stops scary words from fooling it."
**[IF IT FAILS]** 422 means a typo in the questions; compare with the notebook.

### Beat 4: can we fool it? 🧑‍🏫
**[FACE]** **[TEXT]** "PAUSE & GUESS: SCAM OR GENUINE?"
**[SAY]** "Five messages built to trick a quick glance. Pause and guess each one."
**[SCREEN]** Each message on screen for ~2 s: the polite recruiter · the real bank OTP · the ₹25 parcel fee · the Hinglish wrong transfer · the cab OTP. **[OPTIONAL]** A sixth, in Telugu or Tamil (checked by a native speaker).
**[RUN]** "Try to make it lie". Reveal each number with a **[SFX]** tick.
**[EXPECT]** Five probabilities, ⟦…⟧.
**[SAY]** "The answers: scam, genuine, scam, scam, genuine. Jev said ⟦read them⟧."
**[SAY]** (plant the payoff; pick the right line)
- ⟦If one is wrong and confident:⟧ "Look at this one. Jev was ⟦0.0x / 0.9x⟧ sure, and wrong. **Remember this one.** We'll come back to it."
- ⟦If none fooled it:⟧ "This one landed at ⟦0.5x⟧, so Jev isn't sure. **Remember this one.**"

**[SAY] Re-hook:** "But five messages is a magic trick, not a test. Let's do a hundred, and put the bill on screen."

---

## 8:15 Claim #2: are the answers really free?

**[FACE]**
**[SAY]** "A hundred messages in the style of real Indian SMS and WhatsApp forwards: sixty scams, forty genuine, a third tricky on purpose. Every number and link in them is fake. Both models get the same questions and the same rules, and the chatbot gets JSON mode, its best setting."
**[RUN]** "The race". Split the screen into two lanes, each with a **real-time timer** and a **bill counter** (edit overlay). Speed up the footage, but keep the timer real.
**[EXPECT]** "🏁 Jev is running… done in X s", then the chatbot, then the speed table.
**[SAY]** "Jev: ⟦X⟧ seconds. The chatbot: ⟦Y⟧. And the bill…" **[SFX]** cash register. "…**⟦M⟧ times cheaper**. So claim two holds. You only pay for what you send. It's not zero, and TypeSafe admits the price might be subsidised."
**[IF IT FAILS]** On a 429, re-run with `race(..., concurrency=5)`. If the API dies, run `results = load_saved_results()` and say: "This is from my earlier run."
**[RUN]** `scoreboard(results)`
**[SAY]** "But cheap means nothing if it's wrong. Scams caught: Jev ⟦…⟧ out of 60, the chatbot ⟦…⟧. False alarms: ⟦…⟧." ⟦If the chatbot wins on accuracy:⟧ "The chatbot was more accurate. So the trade-off is ⟦N⟧x faster and ⟦M⟧x cheaper, for ⟦K⟧ points."

**[SAY] Re-hook:** "Remember the message I told you to remember?"

---

## 10:45 Wrong, and sure of it

**[SCREEN]** Colour grade darker, low music. **[RUN]** `confident_mistakes(results)`
**[EXPECT]** "Jev was wrong on ⟦…⟧ of 100 messages, and SURE of itself on ⟦…⟧."
**[SAY]** "Here it is. ⟦The flagged message⟧, plus ⟦N⟧ more like it. Jev was wrong, and **sure**. It's not lying on purpose. It's just confident and wrong."

**[FACE]**
**[SAY]** "So 'can't hallucinate'? True about the **format**. False about the **answer**. It never broke my code. It handed me a perfectly valid, confident, wrong answer."

**[SCREEN]** The fine print: *"Our number is not empirical"* · the CEO: *"it's also possible to be confidently wrong"* · *English-first*.
**[SAY]** "And to be fair, TypeSafe says this in its own fine print."
**[SCREEN]** Two small cards with caveats.
**[SAY]** "Others found the same. In a tiny test by the tech publication Every, Jev caught six of seven planted mistakes. On a fake-job dataset it caught about a quarter of the frauds, though the classifier that beat it was trained on that exact data."
**[TEXT]** "A format guarantee is not a truth guarantee."

**[SAY] Re-hook:** "So is it useless for this? No. It just needs three lines."

---

## 12:45 The fix (3 lines)

**[B-ROLL]** The DRS "UMPIRE'S CALL" graphic.
**[SAY]** "Cricket already solved this. If the ball's clearly hitting the stumps, the decision is overturned. If it's just clipping them: umpire's call."
**[SCREEN]** The slider cell. **Highlight exactly three lines:** the two `if` lines and the last `return`.
**[SAY]** "Very sure it's a scam? Block it. Very sure it's fine? Let it through. Anything else is Jev's umpire's call: get a second opinion."
**[RUN]** The slider cell, then **drag it from 0.90 to 0.99** and run again. **[SFX]** whoosh.
**[EXPECT]** The band table; after the drag, fewer confident mistakes and more ⚠️.
**[SAY]** "Stricter, and the confident mistakes drop. The unsure ones go to the chatbot for a plain-words second opinion."
**[TEXT]** "Fast model for every message · slow model only when unsure" + lower third: "Learning project, not a safety guarantee · 1930 / cybercrime.gov.in"

**[SAY] Re-hook:** "Scams were the hardest test I could find. Here's where Jev shines."

---

## 14:00 Where you'd actually use this

**[SCREEN]** Four cards, ~10 s each, each tagged vendor or independent: placement-email sorter · group-chat moderator · notes search · agent safety check.
**[SAY]** "Anywhere your app makes the same small decision again and again, Jev is fast and cheap, and its confidence tells you which answers to double-check."

**[SAY] Re-hook:** "One problem: Jev is closed. Unless…"

---

## 14:45 The free rival

**[B-ROLL]** Laya's Hugging Face page, then a laptop terminal running it.
**[SAY]** "Three days after Jev launched: **Laya**. Free, open source, same question types, runs on your laptop. But out of the box it's much weaker: **63 versus 30** on the JevBench leaderboard. Its strength is training it on your own data."
**[TEXT]** "Accurate out of the box vs free, local, trainable"

**[SAY] Re-hook:** "So, was it worth the hype?"

---

## 15:30 The verdict

**[SCREEN]** Scoreboard stamps: "Can't hallucinate" → **HALF TRUE** · "Answers are free" → **TRUE** (fine print ⟦$⟧) · "Worth the hype?" → **FOR THE RIGHT JOB**
**[FACE]**
**[SAY]** "Jev is the real deal for fast, high-volume yes-or-no decisions, as long as you add a threshold and a backup. A fast model gives you answers. A threshold, a test and a backup give you **trust**."
**[SAY]** "Got a scam message that fooled you? Send it through the form in the description, with personal details removed, and we'll test the best ones. Subscribe for the next trend breakdown."
**[SCREEN]** End card. **Pinned comment:** Google Form link + "Scammed? Call 1930 or visit cybercrime.gov.in."

---

## Cut plan (if a take runs long)
1. Drop the "ask more" beat's highlighted-line aside.
2. Shorten the use-case chapter to two cards.
3. Shorten the hype montage to the logos only.

Never cut the "remember this one" plant, the confident-mistakes payoff, or the fine print.
