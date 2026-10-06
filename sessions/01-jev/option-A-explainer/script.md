## **Hook:**

Everyone in the AI world is talking about Jev.

It's a new model from a company called TypeSafe AI, and it doesn't generate text at all. Instead, it makes decisions.

Within a week of its launch, five major platforms had added it. Developers are already putting it inside their apps.

And its makers say two big things about it.

One: it can't hallucinate.

Two: its answers are free.

So what is Jev? Why the hype? And which of those claims actually holds up?

Stick around, because one of them is only half true.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## **Intro:**

Hi everyone! I'm XXXX.

Today, we're breaking down Jev, a brand-new kind of AI model that works very differently from ChatGPT and the other models you already use.

* First, we'll see why the whole tech world is so excited about it.

* Then we'll understand what Jev actually is, and whether it's a rival to models like ChatGPT or a teammate.

* We'll test its two big claims and find out which one is only half true.

* And finally, we'll see where Jev is genuinely useful, meet the open-source challengers, and give our verdict.

Let's break it down.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## **Why the Hype?**

So, why is everyone so excited about a model that doesn't generate text?

Three reasons: the person who built it, how fast the industry jumped on it, and its price.

Jev launched on September 15th, with a forty-million-dollar funding round behind it. Its founder, Diogo Almeida, co-authored **InstructGPT**, the research that taught language models to follow instructions and became the basis of ChatGPT. So people listened.

Within about a week, Vercel, LangChain, OpenRouter, DigitalOcean and Pydantic AI had all added support. Signups opened on September 20th, and just two days later they had to pause them because of the demand.

But honestly, the real reason is simpler.

Every app is full of tiny decisions.

* Is this email spam?
* Which team should get this complaint?
* Is this AI agent about to delete something?

Today, each one means sending the question to a big AI model, waiting a few seconds, and paying for a whole paragraph you throw away. All you wanted was a yes or a no.

Jev answers those in under a second, for roughly **four cents per thousand decisions**. TypeSafe calls it "**smart if-statements**": an if-statement that can read and judge a message, cheap enough to put behind every one of them.

So what exactly is Jev, and how is it different from the models we already know?

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## **It Decides, It Doesn't Write**

First, a quick term. The models behind ChatGPT, Gemini and Claude are called **LLMs**, or large language models. You give them text, and they generate text back: answers, essays, code.

Jev is a **decision model**. You give it text, and it gives you back a decision.

Think of an exam.

An LLM writes the long, descriptive answer. Maybe it's brilliant. Maybe it's five paragraphs of "well, it depends."

Jev fills in an **OMR sheet**. The bubbles are printed in advance, and it can only shade one that's already there. So its answer always fits the format.

TypeSafe calls Jev a **System One** model.

**System Two** is slow, careful thinking, like solving a JEE maths problem step by step.

**System One** is the instant gut call, like glancing at an SMS that says "your electricity will be cut tonight" and immediately thinking, "scam."

LLMs are built for System Two. Jev is built for System One.

To use it, you give Jev the thing to judge, like a message, and a set of questions. And it understands three kinds.

**Noul: yes or no?** "Is this message a scam?" You get back a number, the probability of yes, like 0.97.

**Choice: pick one.** "What kind of scam is it?" You get the best option, like "electricity bill," plus how likely every other option was.

**Score: how much?** "How much pressure is it putting on you?" You get a position on your scale, like 2.6 out of 3.

And you can ask all three at once.

Now here's the part I want you to remember. Every answer comes with a number showing how sure Jev is. 0.97 means "very likely." But 0.5 means "I honestly don't know."

Keep that in mind. It matters later.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## **Jev vs LLMs: Rivals or Teammates?**

So if Jev is this fast and this cheap, is it here to replace LLMs like ChatGPT?

No. They're teammates, not rivals.

An LLM generates free text; Jev only picks from the options you give it. An LLM takes seconds; Jev answers in under one. And by TypeSafe's own comparison, Jev charges about four cents per million tokens you send, which are small chunks of text, roughly a word each, and its answers are free. LLMs charge much more, and more again for every word they write back.

But Jev can't write, explain its answer, or reason step by step. Even TypeSafe's docs say it's **not a drop-in replacement** for an LLM.

So think of them as a team. Jev makes the thousands of quick decisions, and the LLM handles the few hard ones that need real thinking or writing.

LangChain has a great phrase for this: "**cheap by default, frontier on exception.**"

But fast and cheap means nothing if the answers are wrong. So, do the two big claims actually hold up?

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## **Do the Two Big Claims Hold Up?**

**Claim 1: "It can't hallucinate"**

Here's the trick. Jev can't hallucinate a *format*. Ask it yes or no, and you'll always get a number between 0 and 1. It will never crash your code with a messy paragraph.

But can the *answer* be wrong? Yes. And TypeSafe says so itself, in the fine print.

* On "zero percent hallucination," they write: "Our number is not empirical." Only the format is guaranteed.
* Their CEO wrote on Hacker News: "it's also possible to be confidently wrong."
* And their docs say English is its main language, that Jev "is not a calculator," and that tricky text "can move the answer."

Independent testers found the same. In a small test by the tech publication Every, Jev caught six of seven planted mistakes, while a bigger model caught all seven. And on a fake job-posting dataset, Jev caught only about 23% of the frauds, though the classifier that beat it was trained on that exact dataset.

So here's the honest version. Jev never breaks your code, but it can hand you a perfectly formatted, perfectly confident… wrong answer.

A format guarantee is not a truth guarantee.

Claim one? Half true.

**Claim 2: "The answers are free"**

This one mostly holds. LLMs charge for every word they write. Jev writes nothing, so its answers are free. You only pay for what you send in.

But free answers don't mean a free call. What you send still costs money, and TypeSafe says it can't prove today's price isn't subsidised. So it might not last.

Claim two? True, with fine print.

**So how do you use Jev safely?**

Remember that confidence number? It works like DRS in cricket. When the ball is clearly hitting the stumps, the decision is overturned. When it's just clipping them, it's "umpire's call."

Same with Jev:

* More than 90% sure? Act on it.
* Less than 10%? Let it through.
* Anything in between is Jev's umpire's call. Send it to an LLM or a human for a second opinion.

That one rule turns a fast model into one you can actually trust.

So where is Jev genuinely brilliant?

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## **Where It's Actually Useful**

Anywhere an app makes the same small judgement again and again.

* **A placement-email sorter:** interview invite, rejection, or spam?
* **A college group-chat moderator:** is this message abusive?
* **Search for your notes:** which result actually answers my question? One independent team saw the top result go from right 80% of the time to 95%.
* **A safety check for AI agents:** is this command about to delete something?
* **A resume screener:** does this match the role? Popular, but the numbers so far are self-reported, so test it before you trust it.

Any of these makes a great weekend college project. Tell us in the comments which one you'd like us to build next.

But there's one catch: Jev is closed, and it only runs on TypeSafe's servers.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## **The Open-Source Challengers**

Just three days after Jev launched, Convai Innovations released **Laya**. It's a free, open-source decision model that speaks Jev's format and runs on your own laptop.

A Jev killer? Not quite. On a public leaderboard called JevBench, Jev scores about 63, while the basic version of Laya scores about 30. Laya's biggest wins come from a version trained on the test itself.

And small open models like Imajev and Plumb are already edging past Jev on that same leaderboard. So this isn't just one product. It's the start of a new category of AI models.

Jev is accurate out of the box. The open-source challengers are free, private, and trainable.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## **The Verdict**

So, is Jev worth the hype?

"It can't hallucinate"? **Half true.** The format is guaranteed, but the answer can still be confidently wrong.

"Its answers are free"? **True, with fine print.** What you send still costs money, and the price might not last.

Worth the hype? **Yes**, for quick yes-or-no and pick-one decisions, with a confidence threshold and a backup. Not as a replacement for LLMs, and not something to trust blindly.

A fast model gives you answers. A threshold, a test and a backup give you trust.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## **Outro:**

And that's a wrap on Jev, the model that decides instead of writing, and can make a thousand decisions before an LLM finishes one sentence.

In our next video, we'll actually build with it: we'll feed Jev a hundred real-looking Indian scam messages and see how many it catches.

If you found this helpful, hit that like button, drop a comment, smash that subscribe, and ring the bell icon so you never miss the next one.

And tell us in the comments which AI trend we should break down next. We'll pick your idea for an upcoming video.

And if a scam message ever worries you, contact the organisation through its official app, or report cyber fraud on 1930 or at cybercrime.gov.in.

Catch you in the next one!
