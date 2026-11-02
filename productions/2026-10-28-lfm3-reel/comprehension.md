# Comprehension check · LFM3

_The `script-comprehension` agent's report, saved verbatim: a stateless first-time viewer (the Goldfish) who heard only
the read-aloud once. It never saw the content plan, research or brief. `script-review` compares it with the content plan
(dimension "understood"). Re-run it whenever the read-aloud changes: the linter checks the sha1 below._

read-aloud sha1: 6ae063073314
date: 2026-10-29
mode: listen only (no storyboard yet). Run 7 of the day; earlier runs lost the viewer on "1 GB of what", "calendar call", the unintroduced "Liquid" and "Qwen", the ambiguous "skip it", what Ollama is, "numbers" used twice, the bits sentence, "add search" and "one line"; each was rewritten (with script-review's rewrites).

```
TAKEAWAY: Liquid AI has a new small open AI model called LFM3. It runs on about 1 GB of memory and turns a messy message into a structured action, like a calendar event, but it's weak on knowledge questions.
WHAT IT IS: A small open AI model from Liquid AI that turns requests into actions (fills in a form for your app) and doesn't write text replies.
WHY I'D CARE: I could run it on my own laptop with one Ollama command for small tasks like making calendar events, and my prompts would stay on my machine.
REMEMBERED (in order):
1. LFM3 is a new open model from Liquid AI, built to turn requests into actions.
2. Example: "lab moved to Thursday, 3 PM, bring the circuits report" becomes a filled-in calendar event, not an essay.
3. It needs about one gigabyte of memory (1.7 billion numbers at four bits each).
4. Liquid's own scores say it beats Qwen, a model about 5x bigger, on action tasks.
5. Qwen wins on knowledge questions.
6. It's too small for coding agents or long reasoning. For facts, let it search.
7. Ollama runs it locally with one terminal command, so your prompts stay on your laptop.
LOST ME:
- "one point seven billion learned numbers. Each takes four bits: about one gigabyte": two ideas at once. I didn't do the math (1.7B × 4 bits ≈ 0.85 GB) in real time, so I just accepted "1 GB". "Learned numbers" works as a stand-in for parameters.
- "Qwen": all I learn is that it's a model. No one says who makes it or that it's a well-known baseline, so "five times bigger" has no reference point for me.
- "action tasks": I can guess from the calendar example, but it's never defined as a category.
- "For facts, let it search": unclear how. Search what, and does LFM3 do it by itself or does my app have to?
QUESTIONS LEFT:
- What exactly is the terminal command / model name in Ollama?
- How does "fills in the event, like a form" work: what format does it output, and how does my app use it?
- Is it free to use, given "open model"?
ONE-LISTEN RISK: medium — mostly clear, with a concrete example, but the bits-to-gigabyte sentence and the Qwen comparison go by quickly with numbers I can't place.
```

## Viewer-text run (storyboard exists) · 2026-10-29
mode: watch (voice + the words readable on screen, from `lint_package.py --viewer-text`). Same read-aloud (sha1 6ae063073314).

```
TAKEAWAY: LFM3 is a small, open AI model from Liquid AI that runs on your laptop in about 1 GB. It turns a messy text into an action, like a calendar event, and on action tasks it beats a bigger model, but it's weak on knowledge questions.
WHAT IT IS: A small open AI model from Liquid AI that takes a request and fills in an action (like a form your app can use) instead of writing a text reply.
WHY I'D CARE: I could run it on my own laptop with Ollama and one command to do small tasks like adding calendar events, without my prompts leaving my machine.
REMEMBERED (in order):
1. It needs about 1 GB of memory.
2. LFM3 is an open model from Liquid AI, built to turn requests into actions.
3. Demo: "lab moved to thu 3pm, bring the circuits report" becomes a calendar event with title, day, time and note. It fills these in like a form for your app, instead of writing an essay back.
4. It has 1.7 billion numbers and each one takes 4 bits, which comes to about 1 GB.
5. By Liquid's own scores it beats Qwen, a model about 5 times bigger, on action tasks (71 vs 63). On knowledge questions Qwen wins (80 vs 63).
6. Liquid says it's too small for coding agents or long reasoning. For facts, you should let it search.
7. If you have Ollama (an app for running models locally), one terminal command runs it and your prompts stay on your laptop.
LOST ME:
- "one point seven billion learned numbers. Each takes four bits": two new ideas in one beat. I got "small number × small size = 1 GB" from the screen math, but I'm not sure what "learned numbers" are (I guess the model's weights?). I also don't know why 4 bits matters, or whether that's normal or squeezed down.
- "open model" / "open weights": the screen says "open weights" but nobody explains it. I'd guess it means free to download.
- "beats Qwen ... on action tasks": Qwen is never explained (I'd guess another AI model). The screen helps with "Qwen3.5-9B" and "tool calling", but I only follow the "5× bigger" part because of the screen. "Action tasks" vs "tool calling" isn't defined either; I just connect it to the calendar demo.
- "For facts, let it search": I'm not sure who sets up the search or how. Does the model do it itself, or does my app have to?
- "coding agents": I only roughly know what these are, but it didn't stop me following.
- Beat 9 command "hf.co/LiquidAI/LFM3-1.7B-GGUF:Q4_K_M": it's too long to read in one pass. "GGUF" and "Q4_K_M" mean nothing to me, and the screen shows "~1.1 GB" while the voice said about 1 GB.
QUESTIONS LEFT:
- How does "my app" actually get the event? Do I have to write code that reads the form output and adds it to my calendar?
- What does "let it search" mean in practice? How do I connect search to it?
- Is 71 vs 63 a big gap, and out of what?
ONE-LISTEN RISK: medium — the main story (small, runs on a laptop, good at actions, bad at facts) comes through clearly; beat 5 packs two ideas, Qwen and "action tasks" lean on the screen, four numbers fly past in the trade.
```
_Elephant note: nothing core-critical is "lost even with the screen". The command is not meant to be read in one pass (it's in the description); the ~1.1 GB download vs ~1 GB memory is sourced (S4 vs S3)._
