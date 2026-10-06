## **Hook:**

You've probably received a message like this.

"Dear consumer, your electricity power will be disconnected tonight at 9:30 PM because previous month bill was not updated. Call officer immediately."

Is it a scam?

This AI answered in under a second. And its makers say it can't hallucinate.

They also say its answers are free.

Two huge claims. So we tested both. And one of them doesn't survive this video.

Polite scams. Hinglish. Fake OTPs. A hundred messages, and a stopwatch.

It's called Jev: a new AI model that doesn't generate text. It makes decisions.

Let's see if the hype is real.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## **Intro:**

Hi everyone! I'm XXXX.

Today, we're putting Jev, a brand-new AI model from TypeSafe AI, to a real test, using the kind of scam messages that land on our phones every single day.

* First, we'll see why everyone is suddenly talking about this new model.

* Then we'll understand what Jev actually is, and how it's different from a chatbot like ChatGPT.

* We'll see whether Jev is a rival to LLMs like ChatGPT, or a teammate.

* Then comes the fun part. We'll go hands-on and test Jev's two big claims: "it can't hallucinate" and "its answers are free." We'll try to fool it, race it against a regular chatbot on a hundred messages, and find the one claim that doesn't survive.

* After that, we'll fix the problem we find, in just three lines.

* And finally, we'll look at where Jev is genuinely useful, meet a free rival, and give our verdict.

And don't worry, you don't need any machine-learning background. If you can run a cell in Google Colab, you can follow everything here.

Let's get into it.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## **Why Everyone Is Talking About Jev**

So first, why is everyone suddenly talking about a model that doesn't generate text?

Jev launched on September 15th, from a company called TypeSafe AI, with a forty-million-dollar funding round behind it. Its founder, Diogo Almeida, co-authored **InstructGPT**, the research that taught language models to follow instructions, which became the basis of ChatGPT.

Within about a week, big platforms like Vercel, LangChain, OpenRouter, DigitalOcean and Pydantic AI had all added support for it. Signups opened to everyone on September 20th, and two days later they had to pause them because of the demand.

But why the rush?

Think about any app you use. It's full of tiny decisions.

* Is this message spam?
* Which team should get this complaint?
* Is this message safe to open?

Today, each of those decisions means asking a chatbot, waiting a few seconds, and paying for a whole paragraph just to get a yes or a no.

Jev answers them in under a second, for about **four cents per thousand decisions**. TypeSafe calls it "**smart if-statements**."

So what exactly is it, if it isn't a chatbot?

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## **It's Not a Chatbot. At All.**

A chatbot, which is a large language model or LLM, like the one behind ChatGPT or Gemini, reads text and writes text back.

Jev reads text and **decides**.

Here's the easiest way to picture it. Think of an exam.

A chatbot writes you an essay answer. Jev fills in an **OMR sheet**. The bubbles are fixed in advance, so the answer always fits. It literally can't reply with "maybe, it depends, here are five paragraphs."

TypeSafe calls this a **System One** model.

**System Two** is slow, careful thinking, like solving a JEE maths problem step by step.

**System One** is your gut glancing at an SMS and instantly going, "scam."

Chatbots are System Two. Jev is System One.

So how do you talk to it?

You give Jev the thing you want it to judge, which it calls the **state**. In our case, that's the SMS. Then you ask it questions. And there are only three kinds.

**Noul: yes or no?** "Is this a scam?" You get back the probability of yes, like 0.97.

**Choice: pick one.** "What kind of scam is it?" You get the best option, like "electricity bill," plus a probability for every option.

**Score: how much?** "How much pressure is it putting on you?" You get a number on your own scale, like 2.6 out of 3.

Every answer is a number. And you can ask all three at once.

Quick comparison: the chatbot writes text, takes seconds, and costs more. Jev only picks from your options, answers in under a second, costs a fraction of the price, and tells you how sure it is.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## **Jev vs LLMs: Rivals or Teammates?**

So if it's faster and cheaper, is it here to replace LLMs like ChatGPT?

No. They're teammates, not rivals.

Jev can't write a sentence. It can't explain itself. It can't think through a problem step by step. Even TypeSafe says it's not a replacement for an LLM.

Jev makes thousands of quick calls, and the LLM handles the rare hard ones.

But fast and cheap means nothing if the answers are wrong.

So can we fool it? Let's find out.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**\<\<HANDS-ON\>\>**

Everything we're doing today is in a free Google Colab notebook. The link is in the description. We're using one account, called OpenRouter, which gives us both Jev and a regular chatbot to compare against.

**Step 1: The old way**

First, let's do it the way most people would. We ask a regular chatbot, "Is this SMS a scam? Reply in JSON." JSON is just a simple format that code can read, like "is_scam: true."

And look at what comes back.

⟦If it crashed:⟧ It wrapped the answer in extra text, and our code couldn't read it. ⟦If it worked:⟧ This time it behaved. But our app would be betting on that every single time.

Now, to be fair, chatbots do have a JSON mode that fixes most of this formatting problem, and we'll switch it on in our race later. So the real question isn't the format. It's speed, cost, and how sure the model is.

**Step 2: The swap**

Now the swap. Just two lines. We connect to Jev, and we ask it one yes-or-no question about the same SMS.

And there it is: a number. ⟦0.97⟧. That means Jev is ⟦97⟧ percent sure it's a scam.

Nothing to parse. Nothing to break.

And that's what "can't hallucinate" really means. The format is guaranteed. Whether the answer is right is what we're here to test.

**Step 3: Ask more**

Let's ask more, in the same call. What kind of scam is it, and how much pressure is it putting on the reader?

One call, three answers: it's a scam, it's a ⟦bill disconnection⟧ scam, and the pressure is ⟦2.x⟧ out of 3.

And look at this one line in our question: "a genuine message, even if it mentions OTPs, money or deadlines." That's important, because real bank messages mention OTPs too. This line stops Jev from panicking just because it sees a scary word.

**Step 4: Can we fool it?**

Now let's try to fool it. Here are five messages built to trick a quick glance. Pause the video, and guess each one: scam or genuine?

* A polite recruiter offering money to rate hotels online.
* A real bank OTP message that says "do not share."
* A courier asking for a 25-rupee redelivery fee.
* A Hinglish message: "Bhai, I transferred 5,000 to you by mistake, please send it back."
* And a cab OTP that you're actually supposed to share with the driver.

Got your answers?

The truth is: scam, genuine, scam, scam, genuine.

And Jev said… ⟦read the five numbers⟧.

⟦If one is wrong and confident:⟧ Look at this one. Jev was ⟦very⟧ sure, and it was wrong. Remember this one. We'll come back to it.

⟦If none fooled it:⟧ Look at this one. It landed around ⟦0.5⟧, so Jev isn't sure. Remember this one. We'll come back to it.

**Step 5: The race**

But five messages is a magic trick, not a test. So let's do a hundred, and put the bill on screen.

We wrote a hundred messages in the style of real Indian SMS and WhatsApp forwards. Sixty are scams, forty are genuine, and about a third are tricky on purpose. Every number and link in them is fake, so please don't call them!

Both models get the same questions and the same rules. And the chatbot gets JSON mode, its best setting.

Let's race.

Jev finished in ⟦X⟧ seconds. The chatbot took ⟦Y⟧.

And the bill? Jev was ⟦M⟧ times cheaper.

So claim number two holds up. You only pay for what you send in. It's not zero, and TypeSafe admits the price might be subsidised. But that's a real, huge difference.

But cheap means nothing if it's wrong. So let's check the answers.

Scams caught: Jev caught ⟦…⟧ out of 60. The chatbot caught ⟦…⟧. False alarms on genuine messages: ⟦…⟧.

⟦If the chatbot was more accurate:⟧ The chatbot was more accurate here. So the real trade-off is: Jev is ⟦N⟧ times faster and ⟦M⟧ times cheaper, for ⟦K⟧ points of accuracy.

**Step 6: Wrong, and sure of it**

Now, remember the message I told you to remember?

Here it is, along with ⟦N⟧ more like it. Jev was wrong on these, and it was sure of itself.

It's not lying on purpose. It's just confident and wrong.

So "can't hallucinate"? True about the format. False about the answer. Jev never broke our code. It handed us a perfectly valid, perfectly confident, wrong answer.

And to be fair to TypeSafe, they say this in their own fine print. On the zero-percent-hallucination claim, they write, "Our number is not empirical." And their CEO said on Hacker News, "it's also possible to be confidently wrong."

Others have found the same. In a tiny test by the tech publication Every, Jev caught six of seven planted mistakes. And on a fake job-posting dataset, it caught only about a quarter of the frauds, though the classifier that beat it had been trained on that exact data.

A format guarantee is not a truth guarantee.

**Step 7: The fix**

So is Jev useless for this? No. It just needs three lines.

Cricket already solved this problem. In DRS, if the ball is clearly hitting the stumps, the decision gets overturned. If it's just clipping them, it's umpire's call.

We do the same with Jev. If it's very sure it's a scam, we block it. If it's very sure it's fine, we let it through. And anything in between is Jev's umpire's call: we get a second opinion.

Now watch what happens when I make the rule stricter, moving the slider from 0.90 up to 0.99.

The confident mistakes drop. More messages land in "not sure." And those few go to the chatbot, which explains them in plain words, the one thing Jev can't do.

So we use the fast model for every message, and the slow model only when the fast one isn't sure.

And just a reminder: this is a learning project, not a safety guarantee. If a message worries you, always contact the company through its official app or number, never the number in the message.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## **Where You'd Actually Use This**

Scams were the hardest test we could find. So where does Jev genuinely shine?

Anywhere your app makes the same small decision again and again.

* A placement-email sorter: is this an interview invite, a rejection, or spam?
* A college group-chat moderator: is this message abusive?
* Search for your notes: which result actually answers my question?
* A safety check for AI agents: is this command about to delete something?

In each case, Jev is fast and cheap, and its confidence number tells you which answers to double-check.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## **The Free Rival**

But there's one problem: Jev is closed. It only runs on TypeSafe's servers.

Three days after it launched, a company called Convai Innovations released **Laya**. It's free, it's open-source, it asks the same three types of questions, and it runs on your own laptop.

But out of the box, it's much weaker. On a public leaderboard called JevBench, Jev scores about 63, and Laya scores about 30. Laya's real strength is that you can train it on your own data.

So: Jev is more accurate out of the box. Laya is free, local, and trainable.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## **The Verdict**

So, was it worth the hype?

"It can't hallucinate"? **Half true.** The format is guaranteed, but the answer can be wrong, and sure of itself.

"Its answers are free"? **True, with fine print.** The answers are free, but what you send in costs about ⟦$ per 1,000⟧, and the price may be subsidised.

And is it worth the hype? **Yes, for the right job.** Jev is the real deal for fast, high-volume yes-or-no decisions, as long as you add a threshold and a backup.

A fast model gives you answers. A threshold, a test and a backup give you trust.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## **Outro:**

And that's a wrap on Jev! 🎉

We took an AI that "can't hallucinate," fed it scam messages, raced it against a chatbot, caught it being confidently wrong, and fixed it in three lines. Not bad for one session, right?

Got a scam message that fooled you? Send it to us through the form in the description, with your personal details removed, and we'll test the best ones.

If you found this helpful, hit that like button, drop a comment, smash that subscribe, and don't forget to ring the bell icon so you never miss the next trend breakdown.

And before you go, tell us in the comments which AI tool we should put to the test next. We'll pick your idea for an upcoming video.

And remember: if you ever get scammed, report it on 1930 or at cybercrime.gov.in.

Catch you in the next one!
