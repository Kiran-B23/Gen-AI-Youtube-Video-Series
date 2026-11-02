# Research · LFM3 (Liquid AI)

_Researched on 2026-10-28. Labels: company claim · independent · our test · community._
_No "our test": the model was not run (no network or Ollama in the build sandbox)._

## One-line definition (by what it does)
LFM3-1.7B is a small open-weight text model that runs on your own laptop or phone (about 1 GB at 4-bit) and is built to call tools and return structured output: it turns a request into an action, not an essay.

## Fact sheet
| # | Fact | Source | Date | Label | Viewer value | Use in |
|---|---|---|---|---|---|---|
| S1 | LFM3 is a new family on one shared backbone: six ~2B models (text, vision, audio, omni + two "decision" models); the base and post-trained models are open-weight and available today | https://www.liquid.ai/blog/lfm3 | 2026-10-27 | company claim | It's downloadable now, not a waitlist | reel (open weights only) |
| S2 | LFM3-1.7B: 1.73B parameters, text-only, 256K-token context, 16 languages incl. Hindi | https://huggingface.co/LiquidAI/LFM3-1.7B | 2026-10-27 | company claim | Size explains why it fits a laptop | reel (1.7B) |
| S3 | "at 4-bit precision, it takes about 1 GB of memory, so it fits on any phone or laptop" | https://huggingface.co/LiquidAI/LFM3-1.7B | 2026-10-27 | company claim | The headline: fits a laptop's memory (memory, not speed; "offline" is not stated, see S15) | reel |
| S4 | GGUF Q4_K_M file is 1.1 GB (Q4_0 1.05 GB) | https://huggingface.co/LiquidAI/LFM3-1.7B-GGUF | 2026-10-27 | company claim (file listing) | The real download size | reel (~1 GB) |
| S5 | Intended for local agents, tool calling, structured outputs and fine-tuning | https://huggingface.co/LiquidAI/LFM3-1.7B | 2026-10-27 | company claim | Tells the viewer what to use it for | reel |
| S6 | Self-reported average 49.37 vs Qwen3.5-9B 47.24 and Qwen3.5-4B 39.27; BFCL V4 (tool calling) 71.39 vs 62.83 (9B); IFEval 96.66 vs 92.08; it trails Qwen3.5-9B on GPQA Diamond (63.37 vs 80.40), RULER 128K (65.56 vs 87.11) and SWE-bench Verified (43.40 vs 51.20) | https://huggingface.co/LiquidAI/LFM3-1.7B · https://www.liquid.ai/blog/lfm3 | 2026-10-27 | company claim | Strong on tool calling and following instructions; weaker on knowledge and long recall | reel (tool-calling score vs a model ~5× bigger) |
| S7 | "not recommended for agentic coding or complex multi-step reasoning due to its small size"; for knowledge-heavy tasks use retrieval or search | https://huggingface.co/LiquidAI/LFM3-1.7B | 2026-10-27 | company claim | Stops the viewer using it for the wrong job | reel (verdict) |
| S8 | Blog: larger models "still win on agentic coding and knowledge, where size matters most" | https://www.liquid.ai/blog/lfm3 | 2026-10-27 | company claim | Same limit, in Liquid's own words | reel (verdict) |
| S9 | One-line local run: `ollama run hf.co/LiquidAI/LFM3-1.7B-GGUF:Q4_K_M` (also llama.cpp, LM Studio) | https://huggingface.co/LiquidAI/LFM3-1.7B-GGUF | 2026-10-27 | company claim (official instructions) | The "try it today" action | reel |
| S10 | Demo uses Liquid lists for the text model: triage an inbox, manage a calendar, research the web, morning briefings | https://www.liquid.ai/blog/lfm3 | 2026-10-27 | company claim | Grounds our running example (calendar) in their stated use | reel (running example basis) |
| S11 | Free web playground: playground.liquid.ai | https://www.liquid.ai/blog/lfm3 | 2026-10-27 | company claim | Try without installing anything | publish (description) |
| S12 | HN users: 1.7B handles small jobs like "chaining a couple bash calls together to find a file"; one user got "Oink" for "what does a cow say?" (not reproduced by others) | https://news.ycombinator.com/item?id=50262229 | 2026-10-27/28 | community | Small-model reality: fine for simple actions, shaky on facts | content plan context only |
| S13 | Licence: LFM Open License v1.0; free commercial use under $10M annual revenue | https://www.liquid.ai/lfm-license | current | company (licence text) | Not material for students | cut |
| S15 | "Ollama runs locally. We don't see your prompts or data when you run locally." (The FAQ doesn't say "offline", and pulling a model needs the internet.) | https://docs.ollama.com/faq | checked 2026-10-29 | official docs | Supports "runs on your laptop, prompts stay on your machine"; not "offline" | reel (try-it beat) |
| S14 | 128K context needs 1.6 GB KV cache vs 4.3 GB for Qwen3.5-4B | https://www.liquid.ai/blog/lfm3 | 2026-10-27 | company claim | Too technical for a 45 s reel | cut |

## Running-example candidates
1. **A messy group-chat message → a calendar tool call** ("lab moved to thu 3pm, bring the circuits report" → `add_event(title, day, time, note)`), run locally on a laptop. Matches S5/S10 (calendar, tool calling, structured output), is relatable to students, and shows the "action not essay" idea. **Chosen.** Shown as a labelled illustration (no our test).
2. Inbox triage (3 emails → labels). Also S10, but more abstract.
3. Find a file with bash calls (S12, community): too developer-niche.

## Analogy candidates
- A big model is a library; this is a pocket remote: it doesn't know everything, it presses the right button.
- A form-filler: it reads messy text and fills the right boxes.

## Limitations, risks, costs (candidates: the content plan decides whether any of them is material enough to say)
- Not for agentic coding, complex multi-step reasoning or knowledge-heavy questions (S7, S8). Material: a student might try it as a ChatGPT replacement for homework answers and get wrong facts (S12).
- All benchmarks are self-reported (S6).
- Licence threshold (S13): not material to students.
- Some loader issues in LM Studio MLX on day one (HN): transient, not material.

## Alternatives / competitors
- Qwen3.5-4B / 9B (bigger, better on knowledge, S6). Other small local models (Gemma, Phi): not compared by a source we have; skip.

## Viewer questions to answer
- What is it, in one line? (S5)
- Will it run on my laptop? (S3, S4)
- How do I try it today? (S9)
- Is it better than ChatGPT / Qwen? Honest: better at a narrow job (tool calls) by Liquid's own numbers, worse at knowledge (S6, S7).

## Cut by the viewer-value filter (and why)
- Release date, MIT spin-off, funding, HQ, Product Hunt listing (the PH link is for LFM2): trivia.
- Tri-hybrid architecture (13 conv / 5 SWA / 6 global layers), 22T training tokens: doesn't change what the viewer can do.
- 3.6B tokens/day on a B300, 300,000 agents on the Enron archive: data-centre scale, not the student's use.
- Vision / audio / omni siblings: true, but splits the reel; mentioned only as "a family; we look at the text one" if at all.
