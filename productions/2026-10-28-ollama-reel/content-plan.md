# Content plan · Ollama: run a small AI model on your own laptop

_Written by the `content-plan` agent after research, before the script. The script follows this plan; the
`script-review` agent checks it against this file. Written 2026-10-29. Official wording re-checked that day against
raw.githubusercontent.com/ollama/ollama (README @main and @379fd64fa8, docs/faq.mdx, quickstart.mdx, cli.mdx, cloud.mdx,
macos.mdx, windows.mdx). ollama.com itself was unreachable, so the current library size of `llama3.2` is not re-verified
(the 2.0GB figure is the README table @379fd64fa8, 2026-02-12). No "our test": every terminal is an illustrative replica of
documented commands, labelled "illustrative" on screen._

## Viewer's question
"Can I run an AI model on my own laptop, for free and without internet, and how do I start?"

## Core message
Install Ollama, run `ollama run llama3.2` once, and a small model answers on your laptop, even offline.
_(17 words.)_

## Must include
| # | Point (concrete fact / mechanism / example) | Source | Label |
|---|---|---|---|
| 1 | What Ollama does, by what it does: a free, open-source app that downloads an open AI model to your computer and lets you chat with it from the terminal. Local models need no account or API key ("run models locally without one"). | S2, S6 (quickstart), S12 (MIT) | official docs · independent (GitHub licence data) |
| 2 | Step 1, install: one line on macOS/Linux, `curl -fsSL https://ollama.com/install.sh \| sh`; on Windows the installer (OllamaSetup.exe) or `irm https://ollama.com/install.ps1 \| iex`. Show the Mac/Linux line in full; Windows as a one-line chip. | S1 | official docs |
| 3 | Step 2, `ollama run llama3.2`: the first run downloads the model (a 3B model, about 2 GB) and then opens a `>>>` prompt. The model is now a file on your disk (`~/.ollama/models` on a Mac). | S2, S3, S7, S8 | official docs |
| 4 | Step 3, ask it: the question is answered on the laptop. After the download, a local model runs on your machine, so it can answer with the Wi-Fi off; Ollama says it doesn't see your prompts when you run locally. | S5, S7, S8 | company claim (official docs FAQ) |
| 5 | The gotcha (Tutorial must-have), the size rule: "at least 8 GB of RAM" for 7B models, 16 GB for 13B. Start small: `llama3.2` is a 3B model, a 2 GB download. Symptom of ignoring it: picking a big model your RAM can't hold. | S4, S3 | official docs |
| 6 | The catch: the same app also offers cloud models. Those need a sign-in, run on Ollama's servers and send your prompts there, so "private and offline" holds only for local models. Fix: skip the sign-in and choose a local model. | S5, S6 | official docs |

Word budget: ~130 words at 2.3 w/s. Points 1 and 4 share the result-first hook and the "why" line; 5 and 6 are one sentence
each (≤ 14 words). Do not add a seventh idea.

## Leave out
| Item | Why it's out |
|---|---|
| Star count (185K), release v0.40.12, founders, funding, Ollama's history | trivia (S12); locked out by the brief |
| `ollama launch claude / codex / opencode`, OpenClaw, Claude/ChatGPT desktop "Apps" | real, but a second video; breaks "short and simple" |
| REST API `localhost:11434`, Python/JS libraries, OpenAI/Anthropic compatibility | developer follow-up, not the viewer's first-run question (S9) |
| `ollama ps`, CPU vs GPU, "no graphics card needed" | needs a speed caveat we can't source (S10); off the core message |
| Exact OS requirements (macOS 14+, Apple M or x86 CPU-only, Windows 10 22H2+), 4 GB install space | detail, not decision: goes in the description (S11) |
| Big-model sizes (Llama 3.3 70B = 43 GB, "tens to hundreds of GB") | one size number is enough; a second set of numbers crowds a 55 s reel (S3, S11) |
| `gemma4` (the README's current example) | its download size isn't in any source we can reach; can't be shown honestly |
| Modelfile, custom prompts, `ollama pull/rm/cp`, embeddings | second video |
| Cloud plans, pricing and usage limits | plan/price detail; only the cloud *privacy/offline* condition matters here (catch, S5, S6) |
| Disabling cloud (`OLLAMA_NO_CLOUD=1`, `disable_ollama_cloud`) | the simple fix is "choose a local model"; the env var is a power-user detail for the description |
| Speed, tokens per second, "as good as ChatGPT", any quality comparison | unsourced; locked out by the brief |
| LM Studio, llama.cpp, GPT4All, Jan | rival tools, not researched; out of scope |
| Docker, Open WebUI, proxies, tunnels | a second tool; not a laptop beginner's need |
| README tagline "with complete privacy" | company marketing that covers cloud too; contradicts the catch, never echo it |

## Catch decision
**Catch:** include
**Why:** material and hidden by the hype. The viewer's question is literally "free and offline", and the same Ollama app
now offers cloud models next to local ones (setup prompt: "Sign in to use cloud models, or choose a local model", S6). Cloud
models run on Ollama's servers, so prompts go there ("When using cloud-hosted models, we process your prompts and
responses", S5) and they need internet and an account. Picking one by accident breaks both promises the reel makes. Exact point,
one line: **"Private and offline only applies to local models. Skip the sign-in and pick a local one." [S5, S6]**
_Optional, verified 2026-10-29 but not yet in research.md: docs/cloud.mdx says cloud models in the CLI are named like
`gemma4:cloud` ("In the Ollama app or CLI, use `gemma4:cloud`"). If the script wants the visible tell ("if the name ends in
`:cloud`, it isn't on your laptop"), add cloud.mdx to research.md as S13 first._

The size rule (point 5) is the Tutorial **gotcha**, not the catch: it is the mistake that stops the run, and it is phrased as
symptom + fix.

## Running example
One 8 GB laptop running `ollama run llama3.2` in a terminal (illustrative replica), asked one question: **"Explain recursion
in one line."** The reel follows it: answered with the Wi-Fi off (hook, result first) → install line → the same command
downloading ~2 GB into a file on disk → the `>>>` prompt → the same question answered → the same answer again with the Wi-Fi
icon struck out. Why it fits: 8 GB is a common student laptop; llama3.2 is the documented small model (3B, 2.0GB) that fits
the 8 GB rule; and a one-line coding question is what this audience would actually ask first. The reply text on screen is
written by us and stays generic and correct (e.g. "Recursion is when a function solves a problem by calling itself on a
smaller piece of it."); it is never presented as a captured output.

## Claim safety
| Tempting wording | What the source supports | Safe wording | Source |
|---|---|---|---|
| "free" / "free forever" / "free unlimited AI" | MIT licence; local models need no API key ("run models locally without one"); cloud has usage limits and plans | **Safe:** "Ollama is free and open source", "local models need no account". **Unsafe:** "everything in Ollama is free", "free forever", "unlimited" | S12, S6 (quickstart; cloud.mdx "compare plans") |
| "offline" / "works offline" / "never needs internet" | "Ollama pulls models from the Internet"; "Ollama runs locally"; the model file sits on your disk. No doc says "offline" in so many words: offline answering is a direct inference for local models after the download | **Safe:** "after that one download, it runs on your laptop, even with the Wi-Fi off" (local model; terminal labelled illustrative). **Unsafe:** "never needs internet", "fully offline app", "no internet at all" (install, first download and cloud models all need it) | S5, S7, S8 |
| "private" / "100% private" / "complete privacy" / "your data never leaves" | "We don't see your prompts or data when you run locally"; cloud prompts are processed on their servers | **Safe:** "run locally, and Ollama says it doesn't see your prompts" (attributed, local only). **Unsafe:** "100% private", "complete privacy" (README tagline, covers cloud), "your data never leaves your laptop" as a flat claim | S5 |
| "only" ("only needs internet once", "the only command you need") | first run downloads; install is a separate step | **Safe:** "you need internet once, for the download"; "one command downloads it and starts it". **Unsafe:** "the only command you need" (install is another), "only internet for the download" stated for all models | S1, S2, S7 |
| "never" ("never sends your data", "never trains on it") | local: they don't see prompts; cloud: "do not store or log … never train on it" is about cloud and off-message | **Safe:** don't use "never". Use the attributed local claim above. **Unsafe:** any "never" about data or internet | S5 |
| "2 GB" | README model table @379fd64fa8: Llama 3.2 · 3B · 2.0GB. Current library size not re-verified (ollama.com unreachable) | **Safe:** "about 2 GB", on screen "~2 GB". **Unsafe:** "exactly 2 GB", "under 2 GB" | S3 |
| "any laptop" / "runs on any computer" / "even a potato PC" | "at least 8 GB of RAM available to run the 7B models, 16 GB … 13B"; macOS 14+ and Windows 10 22H2+ required | **Safe:** "with 8 GB of RAM, start with a small model like this one". **Unsafe:** "any laptop", "every laptop", "no matter your specs" | S4, S11 |
| "8 GB is enough" | the rule is for 7B models; 3B is smaller (inference: fits) | **Safe:** "8 GB of RAM runs the 7B models; this one is a 3B" / "start small". **Unsafe:** "8 GB runs any model" | S4, S3 |
| "one command" | install (one line) + `ollama run` (one line) | **Safe:** "one line to install, one command to run". **Unsafe:** "just one command" for the whole setup | S1, S2 |
| "no GPU needed" / "fast" / "as good as ChatGPT" | CPU-only runs are documented, speed and quality are not | **Unsafe:** all three. Leave out | S10 (no speed source) |
| "the first / best / easiest way to run local AI" | no source | **Unsafe:** leave out | none |
| "no account" | local models: no API key; sign-in is for cloud | **Safe:** "skip the sign-in for local models". **Unsafe:** "Ollama has no accounts" | S6 |
| Hook "This AI is answering me, and my Wi-Fi is off." (hooks.md #1) | No "our test"; the terminal is a replica | **Safe only with** the "illustrative" chip visible on the hook frame and a local model named on screen. Safer read: "This AI model answers with the Wi-Fi off." (no first-person claim of a run we didn't do). Script-review decides | S5, S7 |

Grep note (LangGraph learning): "complete privacy", "100%", "any laptop", "never needs internet" appear nowhere in the
package except the brief's lock line and research quotes; recheck after the script is written.

## Depth (what the viewer must see, not just hear)
- **The download is the only online moment:** a progress bar fills to "~2 GB" and lands as one file on the laptop's disk
  (`~/.ollama/models`), then the Wi-Fi icon goes off and the prompt still answers. The viewer sees *why* it works offline:
  the model is a file you have, not a service you call.
- **One command, three states:** `ollama run llama3.2` typed → download bar → `>>>` prompt with the answer streaming. The same
  terminal transforms; the command stays visible on screen.
- **The size rule as a fit test:** an 8 GB RAM bar with model blocks: the 3B block (2 GB) fits with room to spare; a 7B block
  is the documented limit for 8 GB; a 13B block needs the 16 GB bar. The viewer can place their own laptop.
- **Local vs cloud, one switch:** the same prompt routed either into the laptop (local) or out through the Wi-Fi to a server
  (cloud, after sign-in). Only the local path keeps working when the Wi-Fi goes off.

## Status
- [x] Content plan ready (2026-10-29)
