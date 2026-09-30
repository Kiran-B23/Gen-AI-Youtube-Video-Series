# Script: Jev "Can't Hallucinate". So We Tried to Make It Lie.

**Format:** face + screen · **~20 min** · standalone · students and early-career developers
**Story:** an investigation. Two claims ("can't hallucinate", "answers are free"), one open loop ("one of these claims doesn't survive"), and one verdict.
**Teaching flow and facts:** `03-TR-doc.md` · **Notebook:** `notebook/jev_scam_detector.ipynb` · **Graphics and thumbnail:** `02-slide-outline.md`

> **Cues:** **[FACE]** host to camera · **[SCREEN]** full-screen capture · **[SPLIT]** host in a corner bubble over the screen · **[TEXT]** on-screen text overlay · **[B-ROLL]** cutaway · **[SFX]** sound effect · **[SAY]** a guide to what the host says, in their own words · **[DO]** action on screen
> `⟦…⟧` = a number from **your real dry run**. Never use a vendor number in its place.
> **Delivery:** first person ("I tested", "it fooled me"), energetic but not shouty. One idea per sentence. A cut or visual change every 5–10 seconds.

## Chapters (for the description)
```
0:00 "It can't hallucinate." Really?
1:00 Why the internet lost its mind
2:30 It's not a chatbot. At all.
5:00 So… is ChatGPT dead?
6:00 Claim #1: let's try to make it lie
10:00 Claim #2: are the answers really free?
13:00 We caught it lying
15:30 The fix (it's 3 lines)
17:00 Where you'd actually use this
18:00 The free rival nobody's talking about
19:30 The verdict
```

---

## 0:00 — "It can't hallucinate." Really?

**[SCREEN]** First frame matches the thumbnail: a phone with a scam SMS and the card **"✓ VALID · SAFE 97%"**, plus a red "?".
**[SAY]** (voice over the frame) "This is **Jev**, the most talked-about AI launch of the month. Its makers say it **can't hallucinate**. Ever."

**[SCREEN]** Zoom into TypeSafe's pricing line: *output: FREE*. **[TEXT]** "Source: TypeSafe"
**[SAY]** "And its answers are **free**. Not cheap. *Free*."

**[FACE]** Close shot.
**[SAY]** "Every AI you've ever used can hallucinate, and none of them work for free. So these are two huge claims. And I'll tell you now: **one of them doesn't survive this video.**"

**[SPLIT]** A scam SMS flies into the notebook and Jev's output starts appearing. Freeze before the number. **[SFX]** record scratch.
**[SAY]** "We're going to test both, with the trickiest messages we can find: real-looking scam SMS, polite scams, Hinglish. We'll try to make an AI that 'can't lie'… lie."

**[FACE]**
**[SAY]** "I'm ⟦Host⟧. Honestly, I skip most AI launches. There's a new model every week, and most don't matter. This one made the cut for one reason: **it doesn't talk at all. It only decides.** So no boring explainer. We put it to work and find out if the hype is real."
**[TEXT]** "2 claims · 1 investigation · 1 verdict"

> **Hook rules:** the topic (Jev) is in the first sentence, the open loop is set by 0:25, and there's no greeting before 0:30.

---

## 1:00 — Why the internet lost its mind

**[B-ROLL]** A fast montage, 1–2 seconds per shot, with punchy music:
- the Hacker News thread with its points counter rolling up to **~2,000**
- the logos of Vercel, LangChain, OpenRouter, DigitalOcean and Pydantic AI popping in one by one
- **[TEXT]** "Signups opened Sep 20 → paused Sep 22"
- **[TEXT]** "$40M seed"

**[SAY]** (over the montage) "Within a week, every big AI platform added it. Signups opened, and two days later they had to *pause* them. And the founder? One of the researchers behind the work that made **ChatGPT** follow instructions."

**[FACE]**
**[SAY]** "So why is everyone going after it? Think about any app you use. It's full of tiny decisions: *is this spam, which team gets this complaint, is this message safe.* Today, apps ask a chatbot every single one of those. That means waiting seconds and paying for a whole paragraph just to get a yes or no."
**[TEXT]** "≈ $0.04 per 1,000 decisions" (JevBench)
**[SAY]** "Jev answers them in under a second, for about **four cents per thousand decisions**. TypeSafe calls it '**smart if-statements**'."

**[FACE]** Lean in. **[SAY]** "But hold on. What even *is* a model that can't talk?"

---

## 2:30 — It's not a chatbot. At all.

**[SCREEN]** Animated split screen: on the left, a robot scribbling a messy essay, labelled "Chatbot". On the right, a robot filling three OMR bubbles instantly, labelled "Jev".
**[SAY]** "Here's the easiest way to get it. A chatbot writes you an **essay answer**. Jev fills in an **OMR sheet**. The bubbles are fixed, so the answer always fits. It literally *can't* reply 'maybe, it depends, here are five paragraphs'."

**[FACE]**
**[SAY]** "The company calls it a **System One** model. Psychologists say we think in two ways. System Two is slow, careful thinking, like solving a JEE maths problem. System One is your gut glancing at an SMS and going *'scam.'* Chatbots are System Two. Jev is pure System One."

**[SCREEN]** Three cards slide in one at a time.
- **Noul:** yes or no? → 0.97
- **Choice:** which one? → "bill disconnection"
- **Score:** how much? → 2.6 / 3

**[SAY]** "You give it the thing to judge, called the *state*, and ask it questions. There are only three kinds: **yes-or-no**, **pick one**, and **how much**. Every answer comes back as a **number**. And you can ask all three at once."

**[SCREEN]** The comparison table from the TR doc, with the rows highlighting one at a time.
**[SAY]** "Chatbot: writes text, takes seconds, costs more, and can give you the wrong format. Jev: only your options, under a second, a fraction of the price, and it tells you how sure it is."

**[FACE]** **[SAY]** "Okay. So if it's faster *and* cheaper… is ChatGPT finished?"

---

## 5:00 — So… is ChatGPT dead?

**[FACE]** Beat. **[TEXT]** "NO."
**[SAY]** "No. And that's the whole point. Jev can't write a sentence. It can't explain itself. It can't think through a problem step by step. Even TypeSafe says it's *not* a replacement for a chatbot."

**[SCREEN]** The "team" animation: many messages pour through a fast Jev gate into green and red bins, and a few amber ones go on to a slower chatbot.
**[SAY]** "They're a team. Jev makes the thousands of quick calls, and the chatbot handles the rare hard ones. LangChain calls it '*cheap by default, frontier on exception*'."

**[FACE]** **[SAY]** "But fast and cheap means nothing if it's *wrong*. So let's test claim number one."

---

## 6:00 — Claim #1: let's try to make it lie

**[SPLIT]** Colab. The ▶️ setup cell has already run (cut the wait).
**[SAY]** "Everything's in a free Colab notebook. The link's in the description. One account, OpenRouter, gets us both Jev *and* a normal chatbot."

**[SCREEN]** Run **"First, the old way"**. Zoom into `repr(reply)`, then the `json.loads` line.
**[SAY]** "First, the way most people would do it: ask a chatbot, 'is this a scam? reply in JSON.' And look what comes back." ⟦React to the real output: "code fences, so it crashes" / "a whole paragraph" / "it worked this time… let's run it again"⟧ "We asked for a yes or no, and got an essay we have to *hope* is in the right shape."

**[SCREEN]** Run **"The swap: two lines"**. Highlight each line as you speak. **[TEXT]** "THE SWAP"
**[SAY]** "Now the swap. Two lines. Connect to Jev, and ask one yes-or-no question about the same SMS…" **[DO]** Run it. Zoom and circle the output **⟦0.97⟧**. **[SFX]** ding.
**[SAY]** "…a number. Ninety-seven percent sure it's a scam. Nothing to parse, nothing to break. And *this* is what 'can't hallucinate' actually means: the **format** is guaranteed. Whether the *answer* is right is what we're here to find out."

**[SCREEN]** Run the ▶️ "Ask more" cell and show only the output line.
**[SAY]** "Same call, three answers: scam, what kind, and how much pressure."

**[FACE]** Hands up. **[TEXT]** "PAUSE & GUESS: SCAM OR GENUINE?"
**[SAY]** "Now let's try to fool it. Five messages built to trick a quick glance. Pause the video and guess each one."
**[SCREEN]** Show the five messages one at a time for about 2 seconds each. Then run **"Try to make it lie"** and reveal each probability with a **[SFX]** tick.
**[SAY]** "A polite 'recruiter', a real bank OTP, a ₹25 parcel fee, a Hinglish 'wrong transfer', and a cab OTP you're *supposed* to share. The answers: scam, genuine, scam, scam, genuine. Jev said ⟦read results⟧." ⟦React honestly. If one lands mid-range: "See that? It's *not sure*. Remember that."⟧

**[FACE]** **[SAY]** "But five messages is a magic trick, not a test. Let's do a hundred, and put the bill on screen."

---

## 10:00 — Claim #2: are the answers really free?

**[FACE]** **[SAY]** "I wrote a hundred messages in the style of real Indian SMS and WhatsApp forwards. Sixty scams, forty genuine, a third of them tricky on purpose. Every number and link in them is fake, so don't call them! Both models get the same questions and the same rules."

**[SCREEN]** Run the ▶️ race. Split the screen into two lanes with a **real-time timer** and a **bill counter ticking up in ₹/$** for each model (edit overlay). Speed up the footage but keep the timer real.
**[SAY]** "Jev… done in ⟦X⟧ seconds. The chatbot… ⟦Y⟧."

**[SCREEN]** The speed table animates in row by row. The cost row gets a highlight and a **[SFX]** cash register.
**[SAY]** "**⟦M⟧ times cheaper.** So claim number two: the answers really are free. Jev only charges for what you *send* it. It's not zero, and TypeSafe admits it can't prove the price isn't subsidised. But that's a real, huge difference."

**[SCREEN]** Run `scoreboard(results)`.
**[SAY]** "But I don't care how cheap it is if it's wrong. Scams caught: Jev ⟦…⟧ out of 60. The chatbot ⟦…⟧. False alarms ⟦…⟧." ⟦If the chatbot won on accuracy: "The chatbot was more accurate. So the real trade-off is ⟦N⟧x faster and ⟦M⟧x cheaper for ⟦K⟧ points of accuracy."⟧

**[FACE]** Serious. **[SAY]** "Remember I said one of these claims doesn't survive? Here's where it breaks."

---

## 13:00 — We caught it lying

**[SCREEN]** Dim the lights (colour grade), low music. Run the ▶️ `confident_mistakes(results)`.
**[TEXT]** "WRONG. AND SURE OF IT."
**[SAY]** "Out of a hundred, Jev got ⟦…⟧ wrong, and on ⟦…⟧ of those it was *completely sure*. Look at this one." **[DO]** Zoom into one row. ⟦Read the message and Jev's probability⟧.

**[FACE]**
**[SAY]** "So 'can't hallucinate'? True about the **format**, false about the **answer**. It never broke my code. It just handed me a perfectly valid, perfectly confident… *wrong* answer."

**[SCREEN]** A "fine print" reveal: three quotes from TypeSafe slide in, each with its source.
- *"Our number is not empirical."*
- *"It's also possible to be confidently wrong."* (the CEO, on Hacker News)
- *English is the primary language · "not a calculator"*

**[SAY]** "And to be fair, TypeSafe *says* this in the fine print. Even the CEO admits it can be confidently wrong."

**[SCREEN]** A bar chart from the fake-job-posting benchmark: Jev's F1 on fraud 31.2% vs a simple classic classifier 70.0%. **[TEXT]** "Independent test · fake job posts"
**[SAY]** "Scam messages are *designed* to fool quick judgements. In one independent test on fake job postings, a simple old-school classifier scored more than twice as well as Jev at catching the frauds. Fast gut calls get fooled, just like ours do."

**[FACE]** **[SAY]** "So is it useless for this? No. It just needs three lines I should've written from the start."

---

## 15:30 — The fix (it's 3 lines)

**[FACE]** **[SAY]** "Cricket already solved this. In DRS, if the ball's clearly hitting the stumps, the decision gets overturned. If it's *just* clipping them, it's **umpire's call**."
**[B-ROLL]** A DRS-style "UMPIRE'S CALL" graphic.

**[SCREEN]** The 🧑‍🏫 slider cell. Highlight the three `if` lines.
**[SAY]** "Same idea. If Jev's really sure it's a scam, block it. If it's really sure it's safe, let it through. Anything in between is Jev's umpire's call: *get a second opinion.*"
**[DO]** Run it and show the band table. Then **drag the slider** from 0.90 to 0.99, re-run, and let the numbers change. **[SFX]** whoosh.
**[SAY]** "Watch. Make it stricter, and the confident mistakes drop. More messages land in 'not sure'. And those few go to the chatbot to explain in plain words, the one thing Jev *can't* do."
**[TEXT]** "Fast model for every message · slow model only when unsure"

**[SCREEN]** Quickly run the ▶️ bonus cell and show the web app with the three examples (10 seconds).
**[SAY]** "Bonus: the notebook turns it into a little app you can share with your family."
**[TEXT]** "Learning project, not a safety guarantee · Scammed? 1930 / cybercrime.gov.in"

**[FACE]** **[SAY]** "Scams were the *hardest* test I could find. Here's where Jev is genuinely brilliant."

---

## 17:00 — Where you'd actually use this

**[SCREEN]** Rapid fire: five mini-mockup cards, about 10 seconds each, each with one number.
1. **Placement-email sorter:** interview invite, rejection or spam?
2. **College group-chat moderator:** is this abusive?
3. **Resume screener:** does this match the role? (**[TEXT]** "test before trusting")
4. **Search for your notes:** which result answers the question? (Hindsight: top result right 80% → 95%)
5. **AI-agent safety check:** is this command about to delete something?

**[SAY]** "Anywhere your app makes the same small decision again and again, Jev is fast and cheap, and the confidence score tells you which ones to double-check."

**[FACE]** **[SAY]** "One problem, though. Jev is closed. It runs on *their* servers. Unless…"

---

## 18:00 — The free rival nobody's talking about

**[SCREEN]** The Laya Hugging Face page, then a terminal running it locally (B-roll).
**[SAY]** "Three days after Jev launched, this appeared: **Laya**. Free, open source, same three question types, and it runs on your laptop."

**[SCREEN]** A 3-row comparison: open vs closed · runs locally · out-of-the-box accuracy (Jev #4 vs Laya #43 on JevBench).
**[SAY]** "But straight out of the box it's much less accurate. Its big wins come from training it on your own data. So: Jev is more accurate out of the box. Laya is free, private, and learns from you. And there are more coming. Open models are already edging past Jev on the leaderboards."

**[FACE]** **[SAY]** "So… was it worth the hype?"

---

## 19:30 — The verdict

**[SCREEN]** A scoreboard animation, one row at a time, with a stamp per row:
- "Can't hallucinate" → **⚠️ HALF TRUE**: the format is guaranteed, the answer isn't
- "Answers are free" → **✅ TRUE**, with fine print: ⟦$ per 1,000⟧
- Worth the hype? → **✅ FOR THE RIGHT JOB**

**[FACE]**
**[SAY]** "Jev is the real deal for fast, high-volume yes-or-no decisions, as long as you add a threshold and a backup. It won't replace your chatbot, and it isn't something to trust blindly on scams. A fast model gives you answers. A threshold, a test and a backup give you *trust*."

**[SAY]** "Now your turn. Drop the trickiest scam message you've ever received in the comments, with personal details removed, and I'll run it through Jev in the next video. The notebook's in the description. Like, subscribe, and I'll see you in the next one."
**[SCREEN]** End card: notebook link and next video.
