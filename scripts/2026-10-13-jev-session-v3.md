## **Hook:**

You've probably got a message like this.

"Dear consumer, your electricity power will be disconnected tonight at 9:30 PM because previous month bill was not updated. Call officer immediately."

Scam or real?

You'd need a few seconds to decide. A chatbot would write you a whole paragraph about it.

An AI called Jev doesn't write a single word back. Just a number. And independent tests clocked it at about a tenth of a second.

Its makers say two big things about it. It has "zero hallucinations." And its pricing doesn't charge you for the answers.

So today, we test both claims, live, on a hundred messages just like this one.

And one of them only half survives.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## **Intro:**

Hi everyone! I'm XXXX.

Today, we're putting Jev, a new AI model from a company called TypeSafe, to a real test. And by the end, you'll have built this: a scam checker that answers in a blink, and asks a bigger AI for help only when it isn't sure.

Here's how we'll get there.

* First, a quick look at what kind of AI doesn't write text.

* Then we go hands-on. We'll swap a chatbot for Jev, try to fool it, and race it on a hundred messages.

* And then we'll catch it being wrong, fix it with three lines of code, and give our verdict.

You don't need any machine-learning background. If you can run a cell in Google Colab, you can follow along. You need one OpenRouter account with a little credit, and this whole session costs well under a dollar. The setup is in the description.

Let's get into it.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## **An AI That Doesn't Write?**

Think about any app you use. It's full of tiny decisions.

Is this message spam? Which team should handle this complaint? Is this comment abusive?

Say you hand those to a chatbot: a large language model, or LLM, like the one behind ChatGPT or Gemini. An LLM reads text, and writes text back.

So you ask, "Is this SMS a scam?" And it replies with a paragraph. "This message shows several signs of a scam…" Now your code has to dig a yes or a no out of that paragraph.

Jev works differently. It doesn't write text back. It returns numbers.

Here's the easiest way to picture it. Think of an exam. An LLM writes you an essay answer. Jev fills in an OMR sheet. The bubbles are printed in advance, so the answer always fits. It can't come back with "well, it depends."

TypeSafe calls this a System One model: the quick gut call, like glancing at an SMS and thinking "scam." System Two is the slow, careful kind, like solving a JEE maths problem step by step. In their framing, chatbots are for System Two.

And in our notebook, we never train Jev on examples. We just describe the options in plain English. You'll see that in a minute.

Enough theory. Let's see it work.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**\<\<HANDS-ON\>\>**

Here's what we'll do. First, the old way, with a chatbot. Then the swap to Jev. Then we'll try to fool it, race it, catch its mistakes, and fix them.

Everything's in a free Colab notebook. The link is in the description. We're using one OpenRouter account, which gives us both Jev and a regular chatbot, Gemini Flash, to compare against.

**Step 1: The old way**

Let's start the way most people would. We ask the chatbot, "Is this SMS a scam? Reply in JSON." JSON is just a simple format that code can read, like "is_scam: true."

And here's what came back. ⟦If it parsed:⟧ It worked this time. ⟦If it crashed:⟧ It wrapped the answer in extra text, and our code couldn't even read it.

Either way, look how much it wrote, and how long that took. We'll see what that writing costs in the race.

**Step 2: The swap**

Now the swap. Just two lines.

First, we connect to Jev. Then we give it two things. The message we want judged, which Jev calls the state. And one question. This one's a yes-or-no question, which Jev calls a Noul. "Is this a scam?"

Look at the line itself: jev dot system one. That's the System One idea, right there in the code.

And here's the answer: ⟦0.97⟧. Jev puts the chance that this is a scam at ⟦97⟧ percent.

Here's how to read that number. Close to one means Jev is sure the answer is yes. Close to zero means it's sure the answer is no. And right around 0.5 means it can't tell.

No paragraph. Nothing to parse. Nothing to break. That's the part of "zero hallucinations" you can count on: the answer always comes back as a valid number.

But is a valid number the same as a right one? Hold that thought.

**Step 3: Three questions, one call**

Jev has two more kinds of question, and we can ask them in the same call.

A Choice means pick one, from options you write. "What kind of scam is it?" Bill disconnection, fake KYC, a job scam, and so on.

But watch out for one trap. If the right answer isn't on your list, Jev still has to pick one. So we always add a way out: "some other kind of scam."

A Score means how much, on a scale you define. "How much pressure does it put on the reader?" Zero means none, one is a mild deadline, two is strong urgency, and three is outright threats.

One call, three answers. It's ⟦0.9x⟧ sure it's a scam. It picks ⟦bill disconnection⟧ as the type. And it rates the pressure ⟦2.6⟧ out of 3, so ⟦close to outright threats⟧. A score can land between the levels, because it's a weighted average of all of them.

And Jev's docs say extra questions barely change the response time. They just add a few words to what we send.

Now look at this one line in our yes-or-no question: "a genuine message, even if it mentions OTPs, money or deadlines." That matters, because real bank messages mention OTPs too. So we tell Jev up front that a scary word on its own doesn't make a message a scam.

**Step 4: Try to fool it**

Now let's try to fool it. Here are five messages, built to trick a quick glance. Pause the video, and make your own guess for each one. Scam or genuine?

* A polite recruiter, paying a hundred and fifty rupees per task to rate hotels online.

* A bank OTP message that says, "Do not share it with anyone."

* A courier asking for a twenty-five rupee redelivery fee.

* A Hinglish message: "Bhai, galti se aapke account me five thousand transfer ho gaya, please wapas bhej do."

* And a cab OTP that you're actually supposed to share with your driver.

Got your answers? Let's go one by one.

The recruiter? Scam. Jev said ⟦0.xx⟧.

The bank OTP? Genuine. Jev said ⟦0.xx⟧.

The courier fee? Scam. Jev said ⟦0.xx⟧.

The Hinglish one? Scam. And that's a fair test for Jev, because its docs list English as its main language. Jev said ⟦0.xx⟧.

And the cab OTP? Genuine. Jev said ⟦0.xx⟧.

How many did you get? Comment your score out of five.

⟦If Jev got any wrong, use its most confident mistake:⟧ Now look at this one. Jev gave it ⟦0.xx⟧, and it got it wrong. Remember this message. We're coming back to it.

⟦If all five are right:⟧ Now look at this one. Jev gave it ⟦0.xx⟧, its least confident answer of the five. Remember this message. We're coming back to it.

**Step 5: The race**

But five messages is a magic trick, not a test. So let's do a hundred, and put the bill on screen.

Quick word on the price claim first. TypeSafe's homepage says Jev is 444 times cheaper. Cheaper than what? It doesn't say. So let's measure our own.

⟦We wrote / We wrote, with help from an AI,⟧ a hundred messages in the style of real Indian SMS and WhatsApp forwards. Sixty are scams, forty are genuine, and about a third are tricky on purpose. Every number and link in them is fake, so please don't call them!

Both models answer the same two things: is it a scam, and what kind? And both run ten messages at a time. And to be fair, the chatbot gets JSON mode, a setting that asks it to reply only in JSON.

One more thing. These times are end to end, from Colab, through OpenRouter, and back. So they'll be slower than that tenth of a second from the hook, which was measured on Jev's own servers.

Let's race.

Jev finished in ⟦X⟧ seconds. The chatbot took ⟦Y⟧.

And the bill? For a thousand messages, Jev would cost about ⟦$A, around ₹B⟧. The chatbot, about ⟦$C, around ₹D⟧. In our run, that's ⟦M⟧ times cheaper.

So, claim number two. On our bill, the answers really weren't charged. We only paid for what we sent in. That part holds.

But cheap means nothing if it's wrong. And for a scam checker, the two kinds of mistake aren't equal. Missing a scam is worse than wrongly flagging a real message. Keep that in mind.

⟦If any chatbot answers broke:⟧ And even in JSON mode, ⟦k⟧ of the chatbot's answers came back in a shape our code couldn't use. We count those as "not a scam."

Out of the sixty scams, Jev caught ⟦…⟧. The chatbot caught ⟦…⟧. And of the forty genuine messages, Jev wrongly flagged ⟦…⟧. The chatbot flagged ⟦…⟧.

⟦If the chatbot is clearly ahead:⟧ So the chatbot was more accurate here.

⟦If they're within two or three messages:⟧ That's close. With a hundred messages, a gap of two or three is just noise.

⟦If Jev is clearly ahead:⟧ Jev actually did better on our hundred. But it's one small test, so don't read too much into it.

And at a much bigger scale, an independent study of nearly eight thousand examples found Jev typically cost forty-four times less than nineteen LLMs. But it was behind the best one on fourteen of fifteen tasks.

**Step 6: Catching it wrong**

Now, remember that message from the five tricky ones?

Here it is. ⟦If it was wrong:⟧ Jev got it wrong. It was ⟦80⟧ percent sure it was ⟦genuine / a scam⟧. ⟦If it was right:⟧ Jev got it right, but it was only ⟦70⟧ percent sure.

Now let's look at every message Jev got wrong in the race.

⟦If some mistakes were above 0.9:⟧ Look at these ⟦N⟧. Jev got them wrong, and it was more than ninety percent sure each time. It's not lying on purpose. It's confident, and wrong.

⟦If there were mistakes, but none above 0.9:⟧ In this run, none of Jev's mistakes came with more than ninety percent confidence. But it still got ⟦N⟧ wrong. Here's how sure it was about each one. It's not lying. It's just wrong.

And the wording of your question matters too. In one independent test, just swapping which description sat behind "yes" and "no" changed about a third of Jev's answers.

So, remember the thought I asked you to hold? Is a valid number the same as a right one?

No. In our run, Jev never once gave our code an answer it couldn't read. ⟦If some were above 0.9:⟧ But it handed us perfectly valid, perfectly confident, wrong answers. ⟦If none were:⟧ But it still handed us perfectly valid, wrong answers.

So, claim number one. "Zero hallucinations"? True about the shape. Not true about the answer.

That's the claim that only half survives.

So here's the real question. If Jev's answers can be wrong, what is its confidence actually worth?

**So Can You Trust Its Confidence?**

First, why not just ask the chatbot how sure it is? Because that number is just more text it writes. In one 2023 study of chatbots' self-reported confidence, most of their confidence numbers landed between eighty and a hundred percent, whether the answer was right or wrong.

Jev's number isn't written text. It's the answer itself.

Think about a weather forecast.

When the app says eighty percent chance of rain, it isn't promising rain tomorrow. It means that on all the days it says eighty percent, it rains on about eight out of ten. If that holds, the forecast is useful. You carry an umbrella at eighty, not at ten.

That's called calibration, and it's what TypeSafe says it trains Jev for. Across many answers, the ones Jev gives 0.8 should come true about eighty percent of the time.

So let's check that on our own hundred messages. We'll group Jev's answers by how sure it was.

When Jev was fifty to seventy percent sure, it was right ⟦X⟧ percent of the time. Between seventy and ninety, ⟦Y⟧ percent. And at ninety or more, ⟦Z⟧ percent.

⟦If a group is empty:⟧ And Jev was never ⟦fifty to seventy⟧ percent sure on any of our messages, so that group is empty.

⟦If the groups go up:⟧ So the surer Jev is, the more often it's right. ⟦If they don't:⟧ With only a hundred messages, these groups are small, so it's not a clean line here.

Notice the words "across many answers," though. Calibration is about groups. So even a very confident answer can still be wrong, just like it sometimes stays dry on a ninety percent day. ⟦If some were above 0.9:⟧ That's what we just saw. ⟦If none were:⟧ We didn't hit one in our small run, but with enough messages, that's exactly what calibration predicts.

How good is it at a bigger scale? In that eight-thousand-example study from the race, Jev's confidence was better calibrated than sixteen of the nineteen LLMs.

And because Jev's answer is always a number, we can draw a line with it.

**Step 7: The fix, in three lines**

So is Jev useless for scams? No. It just needs three lines and a backup.

Cricket already solved this problem. In DRS, when ball-tracking is clear, it decides. When it's too close to call, it's umpire's call, and the on-field umpire decides.

We do the same with Jev, with three zones. If Jev is ninety percent sure or more that it's a scam, we flag it. If it's ninety percent sure or more that it's genuine, we let it through. And anything in between is umpire's call: the chatbot decides.

And you don't have to use the same line on both sides. Since a missed scam costs more, you could let a message through only when Jev is ninety-five percent sure it's genuine.

Now watch what happens as I make the rule stricter, sliding it from 0.90 up to 0.99.

At 0.90, ⟦a⟧ messages are decided automatically, with ⟦b⟧ mistakes, and ⟦c⟧ go to the chatbot. At 0.99, it's ⟦a2⟧, ⟦b2⟧ and ⟦c2⟧.

⟦If there were automatic mistakes at 0.90:⟧ So the stricter line sent ⟦k⟧ more messages to the chatbot, and removed ⟦m / none⟧ of the automatic mistakes. ⟦If there were none:⟧ At 0.90, there were already no automatic mistakes, so the stricter line only sent ⟦k⟧ more messages to the chatbot. A stricter line means more checks, so you pick it based on what a wrong call costs you.

So did the backup actually pay off? Here are three setups, on the same hundred messages, with the line back at ⟦0.90⟧.

The chatbot alone: ⟦accuracy⟧ accurate, for about ⟦$, ₹⟧ per thousand messages.

Jev alone: ⟦accuracy⟧, for about ⟦$, ₹⟧.

And Jev with the chatbot as backup: ⟦accuracy⟧, for about ⟦$, ₹⟧. The chatbot only had to check ⟦n⟧ of the hundred.

⟦If it matches or beats the chatbot:⟧ So the backup matched the chatbot's accuracy, or beat it, at ⟦a fraction⟧ of its cost.

⟦If it's two or three messages behind:⟧ So we got within ⟦k⟧ messages of the chatbot's accuracy, at ⟦a fraction⟧ of its cost. With a hundred messages, that's close.

⟦If it's further behind:⟧ So on our messages, the backup didn't close the gap. Which is exactly why you test this on your own data before you trust it.

And here's what that independent study found, at a much bigger scale. Sending only the low-confidence items to an LLM matched or beat the LLM alone, at a quarter to half of its cost.

**Step 8: Make it an app**

Let's wrap it into an app. You paste a message, and you get a verdict. Jev decides first, and only the unsure messages go to the chatbot, which explains them in plain words.

And remember the electricity message we started with? Let's give it the final test. ⟦result⟧.

And one of the tricky ones. ⟦result⟧.

Now, a reminder: this is a learning project, not a safety product. Jev's own docs say it can't defend against messages written to fool it. If a message worries you, contact the company through its official app or number, never the one in the message. And if you've been scammed, report it right away on 1930, or at cybercrime.gov.in.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## **So Where Would You Actually Use It?**

Scams were a hard test, on purpose. So where does Jev actually fit?

Here's a quick test. Could a person decide it in a few seconds, like that SMS at the start? Then Jev might fit. But if plain code can work it out, like a total or a date, just use code.

Jev fits best when you have lots of these decisions, from options you can write in advance, where speed or cost matters, and a wrong answer is cheap or has a backup.

Think tagging support tickets, routing emails to the right team, filtering spam, or sorting a moderation queue.

And skip it when you need text back, when someone is actively trying to fool it and Jev is your only defence, when most of your text isn't English, or for one big decision with no backup. For those, use an LLM, or a person.

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

Today, you took an AI its makers say has zero hallucinations. You swapped it in with two lines, asked it three questions at once, tried to fool it, raced it against a chatbot, caught its mistakes, and fixed them with three lines and a backup.

Now it's your turn. Take a scam message you've actually received, and run it through the notebook. Remove any personal details first, and never paste an OTP or an account number into any AI tool. Did Jev get it right? Tell us in the comments.

If you found this helpful, hit that like button, share it with a friend, and subscribe so you don't miss the next one. And tell us what we should explore next.

And remember: if you've been scammed, report it right away on 1930, or at cybercrime.gov.in.

Catch you in the next one!
