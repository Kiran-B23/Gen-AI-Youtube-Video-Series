## **Hook:**

You've probably got a message like this.

"Dear consumer, your electricity power will be disconnected tonight at 9:30 PM because previous month bill was not updated. Call officer immediately."

Scam or real?

You'd need a few seconds to decide. A chatbot would write you a whole paragraph about it.

An AI called Jev needs about a tenth of a second. That's what independent tests clocked on its servers. And it doesn't write a single word back. Just a number.

Its makers say two big things about it. It has "zero hallucinations." And its pricing doesn't charge you for the answers.

So today, we test both claims, live, on a hundred messages just like this one.

And one of them only half survives.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## **Intro:**

Hi everyone! I'm XXXX.

Today, we're putting Jev, a new AI model from a company called TypeSafe, to a real test. And by the end, you'll have built this: a scam checker that answers in a blink, and asks a bigger AI for help only when it isn't sure.

Here's the plan.

* First, we'll see what kind of AI doesn't write text, and why anyone would want one.

* Then we'll go hands-on in Google Colab. We'll swap a chatbot for Jev in two lines, and ask it three questions in one go.

* We'll try to fool it with five tricky messages, including one in Hinglish.

* Then we'll race it against a regular chatbot on a hundred messages, with a stopwatch and a bill.

* We'll catch it being wrong, and work out what its confidence really means.

* Then we'll fix that, in three lines.

* And finally, we'll see where Jev fits, where it doesn't, and give our verdict on both claims.

And don't worry, you don't need any machine-learning background. If you can run a cell in Colab, you can follow along. You need one OpenRouter account with a little credit, and this whole session costs well under a dollar. The setup is in the description.

Let's get into it.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## **An AI That Doesn't Write?**

Think about any app you use. It's full of tiny decisions.

Is this message spam? Which team should handle this complaint? Is this comment abusive?

Say you hand those to a chatbot: a large language model, or LLM, like the one behind ChatGPT or Gemini. An LLM reads text, and writes text back.

So you ask, "Is this SMS a scam?" And it replies with a paragraph. "This message shows several signs of a scam…" Now your code has to dig a yes or a no out of that paragraph. And you waited while it wrote all that.

Jev works differently. It doesn't write text back. It returns numbers.

Here's the easiest way to picture it. Think of an exam. An LLM writes you an essay answer. Jev fills in an OMR sheet. The bubbles are printed in advance, so the answer always fits. It can't come back with "well, it depends."

TypeSafe calls this a System One model.

System Two is slow, careful thinking, like solving a JEE maths problem step by step.

System One is your gut glancing at an SMS and going, "scam."

In TypeSafe's framing, chatbots are for System Two. Jev is built for System One.

So how do you talk to it?

You give Jev the thing you want judged. It calls that the state. For us, that's the SMS. Then you ask it questions. And there are only three kinds.

A Noul is a yes-or-no question. "Is this a scam?" You get back one probability, like 0.97.

A Choice means pick one, from options you write. "What kind of scam is it?" You get the best option, plus a probability for every option.

A Score means how much, on a scale you define. "How much pressure does it put on the reader?" You get a position on your scale.

Every answer is a number your code can use straight away. And you can ask all three in one call.

Enough theory. Let's see it work.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**\<\<HANDS-ON\>\>**

Here's what we'll do. First, the old way, with a chatbot. Then the swap to Jev. Then we'll try to fool it, race it, catch its mistakes, and fix them.

Everything's in a free Colab notebook. The link is in the description. We're using one OpenRouter account, which gives us both Jev and a regular chatbot, Gemini Flash, to compare against.

**Step 1: The old way**

Let's start the way most people would. We ask the chatbot, "Is this SMS a scam? Reply in JSON." JSON is just a simple format that code can read, like "is_scam: true."

And here's what came back.

⟦If it crashed:⟧ It wrapped the answer in extra text, and our code couldn't read it.

⟦If it parsed:⟧ This time, it behaved. But our app would be hoping for that, every single time.

Now, to be fair, chatbots have a JSON mode built for exactly this, and we'll switch it on for the race. So the real question isn't the format. It's speed, cost, and whether the answer is right.

**Step 2: The swap**

Now the swap. Just two lines. We connect to Jev. And we ask it one yes-or-no question about the same SMS.

Look at the line itself: jev dot system one. That's the System One idea, right there in the code.

And here's the answer: ⟦0.97⟧. Jev puts the chance that this is a scam at ⟦97⟧ percent.

Nothing to parse. Nothing to break.

And that's what TypeSafe's "zero hallucinations" really guarantees: the shape. You always get a valid number back. Whether that number is right? That's what the rest of this session tests.

**Step 3: Three questions, one call**

Let's ask more, in the same call. Is it a scam? What kind? And how much pressure is it putting on the reader?

One call, three answers. It's ⟦0.9x⟧ sure it's a scam. It picks ⟦bill disconnection⟧ as the type. And it rates the pressure ⟦x⟧ out of 3.

And Jev's docs say extra questions barely change the response time. They just add a few words to what we send.

Now look at this one line in our yes-or-no question: "a genuine message, even if it mentions OTPs, money or deadlines." That matters, because real bank messages mention OTPs too. So we tell Jev up front that a scary word on its own doesn't make a message a scam.

**Step 4: Try to fool it**

Now let's try to fool it. Here are five messages, built to trick a quick glance. Pause the video, and make your own guess for each one. Scam or genuine?

* A polite recruiter, paying a hundred and fifty rupees per task to rate hotels online.

* A bank OTP message that says, "Do not share it with anyone."

* A courier asking for a twenty-five rupee redelivery fee.

* A Hinglish message: "Bhai, galti se aapke account me five thousand transfer ho gaya, please wapas bhej do."

* And a cab OTP that you're actually supposed to share with your driver.

Got your answers?

Here's the truth: scam, genuine, scam, scam, genuine.

That Hinglish one is a fair test, by the way. Jev's docs list English as its main language.

And Jev said… ⟦read the five numbers⟧.

⟦If Jev got any wrong, use its most confident mistake:⟧ Look at this one. Jev gave it ⟦0.xx⟧, and it got it wrong. Remember this message. We're coming back to it.

⟦If all five are right:⟧ Look at this one. Jev gave it ⟦0.xx⟧, its least confident answer of the five. Remember this message. We're coming back to it.

**Step 5: The race**

But five messages is a magic trick, not a test. So let's do a hundred, and put the bill on screen.

Quick word on the price claim first. TypeSafe's homepage says Jev is 444 times cheaper. Cheaper than what? It doesn't say. So let's measure our own.

We wrote a hundred messages in the style of real Indian SMS and WhatsApp forwards. Sixty are scams, forty are genuine, and about a third are tricky on purpose. Every number and link in them is fake, so please don't call them!

Both models get the same questions and the same rules, ten messages at a time. And to be fair, the chatbot gets JSON mode.

Let's race.

Jev finished in ⟦X⟧ seconds. The chatbot took ⟦Y⟧.

And the bill? For a thousand messages, Jev would cost about ⟦$A, around ₹B⟧. The chatbot, about ⟦$C, around ₹D⟧. In our run, that's ⟦M⟧ times cheaper.

So, claim number two. On our bill, the answers really weren't charged. We only paid for what we sent in. That part holds.

But cheap means nothing if it's wrong. So, accuracy.

Out of the sixty scams, Jev caught ⟦…⟧. The chatbot caught ⟦…⟧. And of the forty genuine messages, Jev wrongly flagged ⟦…⟧. The chatbot flagged ⟦…⟧.

⟦If the chatbot is clearly ahead:⟧ So the chatbot was more accurate here.

⟦If they're within two or three messages:⟧ That's close. With a hundred messages, a gap of two or three is just noise.

⟦If Jev is clearly ahead:⟧ Jev actually did better on our hundred. But it's one small test, so don't read too much into it.

And here's what a much bigger independent study found. Across nearly eight thousand human-labelled examples, Jev's cost was, at the median, forty-four times lower than the nineteen LLMs it was compared with. But it was behind the best LLM on fourteen of fifteen tasks.

**Step 6: Catching it wrong**

Now, remember the message I asked you to remember?

Here it is. ⟦If it was wrong:⟧ Jev got it wrong, at ⟦0.xx⟧. ⟦If it was right:⟧ Jev got it right, but it was only ⟦70⟧ percent sure.

Now let's look at every message Jev got wrong in the race.

⟦If some mistakes were above 0.9:⟧ Look at these ⟦N⟧. Jev got them wrong, and it was more than ninety percent sure each time. It's not lying on purpose. It's confident, and wrong.

⟦If there were mistakes, but none above 0.9:⟧ In this run, none of Jev's mistakes came with more than ninety percent confidence. But it still got ⟦N⟧ wrong. Here's how sure it was about each one. It's not lying. It's just wrong.

And the wording of your question matters too. In one independent test, just swapping which description sat behind "yes" and "no" changed about a third of Jev's answers.

So, claim number one. "Zero hallucinations"? True about the shape. Not true about the answer. In our run, Jev never once gave our code an answer it couldn't read. ⟦If some were above 0.9:⟧ But it handed us perfectly valid, perfectly confident, wrong answers. ⟦If none were:⟧ But it still handed us perfectly valid, wrong answers.

That's the claim that only half survives.

So here's the real question. If Jev's answers can be wrong, what is its confidence actually worth?

**So Can You Trust Its Confidence?**

Think about a weather forecast.

When the app says eighty percent chance of rain, it isn't promising rain tomorrow. It means that on all the days it says eighty percent, it rains on about eight out of ten. If that holds, the forecast is useful. You carry an umbrella at eighty, not at ten.

That's called calibration. And it's exactly what TypeSafe says it trains Jev for. Across many answers, the ones it gives 0.8 should come true about eighty percent of the time.

Notice the words "across many answers." Calibration is about groups. So even a very confident answer can still be wrong, just like it sometimes stays dry on a ninety percent day. ⟦If some were above 0.9:⟧ That's what we just saw. ⟦If none were:⟧ We didn't hit one in our small run, but with enough messages, that's exactly what calibration predicts.

So how good is it in practice? In that same independent study, Jev's confidence was better calibrated than sixteen of the nineteen LLMs. Three frontier models still did better.

And that's the useful part. A chatbot's paragraph doesn't hand you a ready-made number like this. Jev's answer always does. So we can draw a line with it.

**Step 7: The fix, in three lines**

So is Jev useless for scams? No. It just needs three lines and a backup.

Cricket already solved this problem. In DRS, when ball-tracking is clear, it decides. When it's too close to call, it's umpire's call, and the on-field umpire decides.

We do the same with Jev. If it's very sure it's a scam, we flag it. If it's very sure it's fine, we let it through. And anything in between is umpire's call: the chatbot decides.

Now watch what happens as I make the rule stricter, sliding it from 0.90 up to 0.99.

At 0.90, ⟦a⟧ messages are decided automatically, with ⟦b⟧ mistakes, and ⟦c⟧ go for a second opinion. At 0.99, it's ⟦a2⟧, ⟦b2⟧ and ⟦c2⟧.

⟦If there are fewer mistakes at 0.99:⟧ Fewer automatic mistakes. More messages sent to the chatbot. That's the trade.

⟦If the mistakes stay the same:⟧ Here, the stricter line didn't remove a single mistake. It only sent more messages to the chatbot. So in our run, 0.90 is the better line. Test it on your own messages before you pick yours.

Either way, you pick the line based on what a wrong call costs you.

This works at scale, too. In that same independent study, sending only the low-confidence items to an LLM matched or beat the LLM alone, at a quarter to half of its cost. And researchers at Carnegie Mellon, on a task where an AI judges which of two written answers is better, used exactly this kind of 0.9 rule. They kept about ninety-nine percent of GPT-6's accuracy, at roughly half its fee.

So the fast model sees every message. The slow model sees only the ones the fast one isn't sure about.

**Step 8: Make it an app**

Let's wrap it into an app. One function puts it all together. Jev decides first. Only the unsure messages go to the chatbot, which explains them in plain words, something Jev can't do.

Let's try our electricity message. ⟦result⟧. And one of the tricky ones. ⟦result⟧.

And just a reminder: this is a learning project, not a safety product. Jev's own docs say it can't defend against messages written to fool it. If a message worries you, always contact the company through its official app or number, never the one in the message.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## **So Where Would You Actually Use It?**

Scams were a hard test, on purpose. So where does Jev actually fit?

Here's a simple rule. Jev fits when four things are true. The answer is a pick from options you can write in advance. You have lots of these decisions. Speed or cost matters. And a wrong answer is cheap, or has a backup.

Think tagging support tickets, routing emails to the right team, filtering spam, or sorting a moderation queue.

And it doesn't fit when you need text back. Or counting, maths, or comparing dates. Or when someone is actively trying to fool it and Jev is your only defence. Or when most of your text isn't English. Or when it's one big, high-stakes decision with no backup. For those, use an LLM, or a person.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## **The Verdict**

So, was it worth the hype?

Zero hallucinations? Half true. The shape of the answer is guaranteed. The truth isn't. A valid number can still be a wrong answer.

Free answers? True. You don't pay for what it sends back, only for what you send in. In our run, that came to about ⟦$A, around ₹B⟧ per thousand messages.

And should you use it? If your app makes the same small decision thousands of times, yes, try it. Test it on your own messages, set a threshold, and keep an LLM as the backup. If you need explanations, maths, or one high-stakes call, skip it.

Jev isn't a replacement for an LLM. It's a teammate. Jev decides. The LLM explains.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## **Outro:**

And that's a wrap on Jev!

Today, you took an AI its makers say has zero hallucinations. You swapped it in with two lines, asked it three questions at once, tried to fool it, raced it against a chatbot, caught its mistakes, and fixed them with three lines and a backup. Not bad for one session, right?

Now it's your turn. Take a scam message you've actually received, remove any personal details, and run it through the notebook. Did Jev get it right? Tell us in the comments.

If you found this helpful, hit that like button, share it with a friend, and subscribe so you don't miss the next one.

And before you go, tell us in the comments what we should explore next. We'll pick your idea for an upcoming video.

And remember: if you've been scammed, report it right away on 1930, or at cybercrime.gov.in.

Catch you in the next one!
