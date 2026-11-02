# Publish kit · LFM3

_Title patterns from the winners (inspiration.md): the size up front, a result, "on your laptop". Never their words; never "beats Qwen 9B", "insane", "free" or "offline"._

## Titles (pick 1)
1. A 1 GB AI That Turns Texts Into Actions (LFM3)
2. LFM3: What a Tiny Open Model Is Actually Good At
3. This AI Fits in 1 GB. Here's What It's For.

## Thumbnail concept (≤4 words of text)
A chat bubble with a calendar card popping out of it, a big yellow "~1 GB" chip on top. Text: **"1 GB. Does stuff."** (4 words incl. the number). No logos.

## Caption / description
LFM3 is a new open-weight model from Liquid AI. The text model is 1.7 billion parameters, needs about 1 GB of memory at 4-bit, and is built for tool calling and structured output: it turns a request into an action your app runs, not an essay.

By Liquid's own scores it beats Qwen3.5-9B on a tool-calling test (71 vs 63) but loses on knowledge questions (63 vs 80). Liquid says it's not for agentic coding or complex reasoning; for facts, pair it with search.

Try it: install Ollama, then
`ollama run hf.co/LiquidAI/LFM3-1.7B-GGUF:Q4_K_M`
Or the web playground: playground.liquid.ai

The calendar demo in this video is an illustration of a use Liquid lists, not our own test. All benchmark numbers are Liquid's (self-reported).

## Chapters (long-form)
n/a (reel)

## Sources (for the description / pinned comment)
- [S1] Liquid AI blog, "LFM3": https://www.liquid.ai/blog/lfm3
- [S2] [S3] [S5] [S6] [S7] LiquidAI/LFM3-1.7B model card: https://huggingface.co/LiquidAI/LFM3-1.7B
- [S4] [S9] LiquidAI/LFM3-1.7B-GGUF (file sizes, the Ollama command): https://huggingface.co/LiquidAI/LFM3-1.7B-GGUF
- [S8] [S10] [S11] Liquid AI blog (limits, demo uses, playground): https://www.liquid.ai/blog/lfm3
- [S15] Ollama FAQ (runs locally, prompts not seen): https://docs.ollama.com/faq

## Hashtags
#LFM3 #LocalAI #Ollama #SmallLanguageModels #GenAI #AIForStudents #Shorts

## Pinned comment (invites replies)
The one command is in the description. What small job would you hand a 1 GB model on your laptop: notes to calendar, email triage, something else? 👇

## Repurposing (long-form moments → reels)
- A longer "small local models" explainer could reuse the size beat (parameters × bits = memory) as its own 30 s Concept reel.
- The trade screen (wins on actions, loses on knowledge) can become a Comparison reel once independent benchmarks exist.
