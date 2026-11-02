# Comprehension check · Ollama: run a small AI model on your own laptop

_The `script-comprehension` agent's report, saved verbatim: a stateless first-time viewer (the Goldfish) who heard only
the read-aloud once. It never saw the content plan, research or brief. `script-review` compares it with the content plan
(dimension "understood"). Re-run it whenever the read-aloud changes: the linter checks the sha1 below._

_Run 1 (sha1 4577b34b486b) lost "This one" (no referent), asked about Windows/Linux and whether llama3.2 is local → "On a Mac
or Linux", "Llama three point two has three billion", "local ones, like llama three point two". Run 2 (11dd89707503) lost
"llama" (what is it?) and "parameter" → script-review rewrites (b4 "a small AI model", b9 defines parameters, b10 one
comparison, b11 the sign-in). Run 3 (fc3a51692c82): "seven billion" had no unit → "seven billion parameters". Run 4 (5414cedc8d7e): lost "parameters"/"numbers they learned", the three-number burst, "it" (company or model) and
the unannounced cloud models → script-review pass 2 (b9 "learned in training", b10/b11 split, b12 "also has cloud models", b7
"they"). Run 5 (fecb29124883): the size rule had no rule around it ("is it a maximum? does it scale?") → pass 3: "Seven billion
parameters need at least eight gigabytes of RAM. Thirteen billion need sixteen gigabytes." (S4). Run 6 below is on the
current read-aloud._

read-aloud sha1: 5373e57bd8ac
date: 2026-10-29

```
TAKEAWAY: Ollama is a free app that lets you run an AI model like Llama 3.2 on your own laptop. After a one-time download of about 2 GB, it works with the Wi-Fi off, as long as you pick a local model that fits your RAM.
WHAT IT IS: A free, open-source app that downloads AI models and runs them on your laptop instead of on someone's server.
WHY I'D CARE: I could install it, run a small model offline and privately, and check whether my laptop's RAM can handle a bigger model.
REMEMBERED (in order):
1. Install Ollama by pasting one line (on Mac or Linux).
2. Type "ollama run llama 3.2" to get a small model. The first run downloads about 2 GB.
3. You can ask it things, like explaining recursion in one line.
4. Running locally means Ollama doesn't see your prompts, and it works offline after the download.
5. Size rule: 7B parameters needs 8 GB of RAM, 13B needs 16 GB. Llama 3.2 is 3B, so it fits.
6. Catch: Ollama also has cloud models that need a sign-in and run on its servers. Those aren't private or offline.
LOST ME:
- "On Mac or Linux, paste this line.": I didn't hear which line. I'd need the screen to show it. I also didn't hear what Windows users should do.
- "Ollama says they don't see your prompts when you run locally.": This sits between the steps and the offline line, so it felt slightly out of place. It's also unclear whether "they" means the company.
- "Seven billion parameters need at least eight gigabytes of RAM. Thirteen billion need sixteen gigabytes.": Four numbers in two sentences, heard once. I'd keep "3B fits" but might mix up 7/8 and 13/16.
- "the numbers they learned in training": This explained "parameters" well enough. Just noting that "they" means the models.
QUESTIONS LEFT:
- What does the install line actually say, and how do I install on Windows?
- How do I tell whether a model is local or cloud before I run it?
- Was the recursion answer any good? The video set up step three but never showed or said the result.
ONE-LISTEN RISK: medium. The steps are easy to follow, but the RAM rule packs four numbers into a few seconds, and the install command depends on the screen.
```
