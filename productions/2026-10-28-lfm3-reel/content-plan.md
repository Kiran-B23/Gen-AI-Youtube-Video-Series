# Content plan · LFM3 (Liquid AI), the text model LFM3-1.7B

_Written by the `content-plan` agent after research, before the script. The script follows this plan; the
`script-review` agent checks it against this file._
_Re-checked at the sources on 2026-10-29: the HF model card (S2, S3, S5, S6, S7), the GGUF page (S4, S9), the Liquid blog (S1, S8, S10), the Ollama FAQ (S15, added to research.md). **No our test:** we did not run the model. The demo is a labelled illustration ("illustrative") of a task type Liquid lists (S10). Every benchmark number is Liquid's own (self-reported)._

## Viewer's question
"A new tiny model is trending: what does it actually do, and can I run it on my own laptop today?"

## Core message
LFM3 is a one-gigabyte open model that turns messy text into actions on your own laptop, but it's no know-it-all.
_(20 words. Say "about one gigabyte" in the script; see Claim safety.)_

## Must include
| # | Point (concrete fact / mechanism / example) | Source | Label |
|---|---|---|---|
| 1 | **What it does, in one line:** a small open-weight text model built for tool calling and structured output. You give it a request and it fills in an action for your app, instead of writing an essay. | S5 (model card: "designed for local agents, tool calling, structured outputs…"), S1 (open-weight, available today) | official docs (company claim) |
| 2 | **The demo (running example):** "lab moved to thu 3pm, bring the circuits report" becomes `add_event(title: "Lab", day: "Thu", time: "3:00 PM", note: "bring circuits report")`, and the calendar app adds the event. Labelled illustrative. Calendar is one of Liquid's own listed uses. | S10 (blog: "manage your calendar"), S5 | company claim (illustration, not our test) |
| 3 | **Why it fits a laptop:** 1.7 billion parameters at 4-bit take about 1 GB of memory. The download is about 1.1 GB. | S2, S3, S4 | official docs (company claim) |
| 4 | **What makes it different (one number):** on Liquid's own tool-calling test (BFCL V4) it scores 71 against 63 for Qwen3.5-9B, a model about five times bigger. Said as "Liquid's own numbers". | S6 | company claim (self-reported) |
| 5 | **Try it today:** one line, once Ollama is installed: `ollama run hf.co/LiquidAI/LFM3-1.7B-GGUF:Q4_K_M`. Ollama runs the model locally, so your prompts stay on your machine. | S9, S15 | official docs |
| 6 | **The catch (what not to use it for):** Liquid itself says it's not for agentic coding or complex multi-step reasoning. For fact-heavy questions, pair it with search. | S7, S8 | official docs (company claim) |

## Leave out
| Item | Why it's out |
|---|---|
| Release date, MIT spin-off, funding, HQ, Product Hunt | Trivia. Both low performers opened on who and when (inspiration.md). |
| The six-model family (vision, audio, omni, two "decision" models) | True, but it splits a 45 s reel and invites "one model does everything". At most one passing phrase: "the text one". |
| Tri-hybrid architecture (conv / SWA / global layers), 22T training tokens | Doesn't change what the viewer can do. Needs a longer explanation than it's worth. |
| 256K context, 128K KV-cache memory (S14) | Too technical for 45 s, and long recall is a weak spot (RULER 65.56 vs 87.11): showing context length as a strength would mislead. |
| "Beats Qwen 9B on average" (49.37 vs 47.24) | A self-reported average across a selective table. The tool-calling number (point 4) is the narrower, honest version of the same claim. |
| IFEval 96.66 | A second number for the same "follows instructions" point. One number per beat. |
| 16 languages incl. Hindi | True and appealing, but off the core message, and nothing in the reel would show it working. |
| Licence (LFM Open License, $10M threshold, S13) | Not material for students. Plan/price detail the brief didn't ask for. |
| Web playground (S11) | Goes in the publish kit description, not the reel. One "try it" path only (point 5). |
| LM Studio / llama.cpp alternatives | Same action, three ways. Keep the one line. |
| Phone and edge speed figures (iPhone 17 Pro, Raspberry Pi, B300 throughput, Enron 300K agents) | The reel centres on the laptop, and data-centre scale isn't the student's use. Speed is not claimed anywhere in the reel. |
| HN anecdotes ("Oink", bash chaining, S12) | Single community posts, not reproduced. Context for the catch only, never on screen or spoken. |
| LM Studio MLX day-one loader issues | Transient, community-only. |
| Gemma / Phi / other small models | No source compares them. Rival news. |

## Catch decision
**Catch:** include
**Why:** material and hidden by the hype. Creator titles say LFM3 "beats Qwen 9B" with no qualifier, so a student could try it as a free ChatGPT for homework facts or coding agents, which is exactly what Liquid's own model card warns against. The exact point: **"Liquid says it's not for agentic coding or complex multi-step reasoning, and for fact-heavy questions you should pair it with search"** (S7, S8, official model card + blog). Show it on screen as Liquid's own trade-off (tool calling up, knowledge down: BFCL 71 vs 63, GPQA 63 vs 80, S6), not as our test. Say once, in the same beat or the verdict, that the scores are Liquid's own.

## Running example
**One student group-chat message:** "lab moved to thu 3pm, bring the circuits report" → an `add_event` call with four filled fields → a calendar card "Thu · 3:00 PM · Lab · bring circuits report", on a laptop. The same message is in the hook, the demo and the verdict, and the "1 GB" chip comes back when the one-line command pulls the file.
**Why it represents the viewer's real use:** students live in messy group chats, calendar is on Liquid's own list for this model (S10), and it's the smallest visible case of "request in, structured action out" (S5), which is the one job this model is built for. Labelled "illustrative" on screen; never "I tried it". **Show the laptop as local (a cloud crossed out or a "runs locally" badge), not a Wi-Fi-off toggle:** no source says "offline" (see Claim safety). This replaces "with Wi-Fi off" in brief.md and research.md.

## Claim safety
| Tempting wording | What the source supports | Safe wording | Source |
|---|---|---|---|
| "beats Qwen 9B" / "smarter than a 9B model" | **Unsafe.** The 49.37 vs 47.24 average and BFCL 71.39 vs 62.83 are self-reported. It trails Qwen3.5-9B on GPQA (63 vs 80), RULER 128K (66 vs 87) and SWE-bench (43 vs 51). | "On Liquid's own tool-calling test, it scores higher than a model about five times its size." On screen: "71 vs 63 · tool calling · Liquid's numbers". | S6 |
| "about five times bigger" | 9B vs 1.73B ≈ 5.2×. | "about five times its size" (not "six", not "ten"). | S2, S6 |
| "runs on any phone" / "runs on any laptop" | **Unsafe as our claim.** The card says "about 1 GB of memory, so it fits on any phone or laptop". That's memory, not speed, and it's Liquid's words. | "It needs about one gigabyte of memory, so it fits on an ordinary laptop." If phones are mentioned: "Liquid says it fits on any phone or laptop." Never "runs fast on any phone". | S3 |
| "1 GB" / "just one gigabyte" | ~1 GB of memory at 4-bit. Files: Q4_0 1.05 GB, Q4_K_M 1.1 GB (the one the command pulls). | Spoken: "about one gigabyte". On screen: "~1 GB". Replace the hook's "just one gigabyte" with "about one gigabyte". | S3, S4 |
| "free" | **Unsafe.** "Open-weight" is supported. The licence has a commercial revenue threshold. | "open weights: you can download it and run it yourself." Never "free" or "free forever". | S1, S13 |
| "offline" / "works with the Wi-Fi off" | **Unsafe.** "Offline" appears in neither Liquid source. The GGUF card says "local inference on CPUs and GPUs". The Ollama FAQ says "Ollama runs locally. We don't see your prompts or data when you run locally". The download itself needs internet. | "After a one-time download, it runs on your own laptop. Your prompts stay on your machine." No "offline", no Wi-Fi-off visual. | S4, S9, S15 |
| "private" / "nothing leaves your laptop" | Ollama: prompts/data not seen when run locally. | "Your prompts stay on your machine" (with Ollama, run locally). Not "100% private". | S15 |
| "one line to run it" | One command, but only once Ollama is installed. | "Got Ollama? It's one line." | S9 |
| "it never writes text" / "it can't chat" | **Unsafe.** It's a text model. Built for tool calls and structured output, it can still chat. | "Built to fill in actions, not write essays." | S5 |
| "it adds the event to your calendar" | The model outputs the tool call. Your app (the harness) runs it. | "It fills in the calendar call; your app adds the event." | S5 |
| "available today" / "just dropped" | "open-weight and available today" (blog). | Fine as "just released, open weights". No date. | S1 |
| "every modality" / "does text, vision and audio" | Separate models in a family. | Don't say. If needed: "the text model from a new family". | S1 |
| "best / first / smallest tiny model" | No source. | Don't say. | — |
| "GPT-level", "game-changer", "insane" | Locked in brief. | Don't say. | — |
| "can't do coding / useless for facts" | **Overstated.** The card says "not recommended for agentic coding or complex multi-step reasoning" and "use retrieval or search for knowledge-heavy tasks". | "Liquid says it's not for coding agents or long reasoning, and for facts, pair it with search." | S7, S8 |

## Depth (what the viewer must see, not just hear)
- **Request → structured action:** the messy message's pieces visibly fly into named fields (`title`, `day`, `time`, `note`) of one `add_event` call. The model outputs that call, *not* a paragraph, and then a separate "your app" step turns it into the calendar card. This shows "action, not essay" and who does what.
- **Why it's ~1 GB:** 1.7 billion parameters × 4 bits each → about 1 GB of memory, drawn as a block shrinking into a laptop's memory bar (S2, S3). The download chip reads ~1.1 GB when the command runs (S4).
- **The trade, as two bars from Liquid's own table:** tool calling higher than the 9B model (71 vs 63), knowledge Q&A lower (63 vs 80). One win and one loss on one screen is what makes the catch believable, and it's the reason for the verdict (S6, S7).
- **Local:** the one-line command pulls the file once, then the same message runs on the laptop with the cloud crossed out ("runs locally"), not a Wi-Fi toggle (S9, S15).

## Downstream notes (for the scripter and visual plan)
- Grep the whole folder for wordings this plan bans. Right now: `brief.md` line 13 and `research.md` line 28 ("Wi-Fi off"), `brief.md` line 15 and `hooks.md` line 5 ("just one gigabyte" → "about one gigabyte").
- The full command is 47 characters. In `[TERMINAL]` it needs wrapping at ≤ 33 chars per line, or show `ollama run` + the model name on two lines.
- Runtime target (updated 2026-10-29 after script-review: the six must-includes plus the Goldfish fixes need it): ~65 s, ~150 words at 2.3 w/s. Originally 40–50 s, ~95–115 words. Six must-includes fit only at one sentence each. If over, merge 3 into the hook's "1 GB" chip and keep 4 as one on-screen number.

## Status
- [x] Content plan ready (2026-10-29)
