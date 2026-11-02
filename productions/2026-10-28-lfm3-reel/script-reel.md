# Reel script · LFM3

**Archetype:** Launch · **Viewer's question:** "A new tiny model is trending: what does it actually do, and can I run it on my own laptop today?" · **Running example:** the group-chat message "lab moved to thu 3pm, bring the circuits report" → one `add_event` call → a calendar card
**Tone:** genuinely excited but honest, like a developer who just read the model card: quick and bright on the demo, calm and plain on the catch · **Words:** 150 · **Est. runtime:** 65 s at the house pace 2.3 w/s (56 s ÷2.7) · **Winners' range:** no LFM3 creator Short yet; context Short 142 s at 3.0 w/s; Launch sheet 35–55 s

_Rows = the Launch reel beat sheet (Hook · What it is · Demo · Why it's different · The catch · Verdict · CTA). One beat = one claim = one visual. The demo is an illustration of a task type Liquid lists (S10), labelled "illustrative"; we did not run the model._

| # | Beat (from archetype) | Time | Spoken line (with [cues]) | Words | Visual tag | On-screen text | Source |
|---|---|---|---|---|---|---|---|
| 1 | Hook | 0–7 s | [excited] One messy text. [beat] One calendar event. On an AI that needs about one gigabyte of memory. | 16 | [TITLE] | "~1 GB" | [S3] |
| 2 | What it is | 7–14 s | LFM3 is a new open model from Liquid AI. It's built to turn requests into actions. | 16 | [TITLE] | "LFM3 · open weights" | [S1] [S5] |
| 3 | Demo (input) | 14–19 s | Give it this: lab moved to Thursday, three PM, bring the circuits report. | 12 | [SCREEN] | "illustrative" | [S10] |
| 4 | Demo (output) | 19–26 s | [smile] No essay back. It fills in the event, like a form, for your app to add. | 16 | [ANIMATE] | "add_event" | [S5] |
| 5 | Why it fits | 26–33 s | LFM3 has one point seven billion learned numbers. Each takes four bits: about one gigabyte. | 14 | [ANIMATE] | "1.7B × 4-bit ≈ 1 GB" | [S2] [S3] |
| 6 | Why it's different | 33–39 s | By Liquid's own scores, it beats Qwen, a model about five times bigger, on action tasks. | 16 | [VS] | "actions (tool calling) 71 vs 63" | [S6] |
| 7 | The catch | 39–42 s | [slow down] The catch? On knowledge questions, Qwen wins. | 7 | [VS] | "knowledge 63 vs 80" | [S6] |
| 8 | The catch (what not to use it for) | 42–48 s | Liquid says LFM3's too small for coding agents or long reasoning. For facts, let it search. | 14 | [VERDICT] | "not for coding agents" | [S7] [S8] |
| 9 | Try it today | 48–55 s | [excited] Got Ollama, the local model app? One terminal command, and your prompts stay on your laptop. | 15 | [TERMINAL] | "ollama run …" | [S9] [S15] |
| 10 | Verdict | 55–59 s | Great for small actions on your laptop. Not a know-it-all. | 9 | [VERDICT] | "small actions ✓" | [S5] [S7] |
| 11 | CTA | 59–63 s | Would you run an AI on your own laptop? | 8 | [CTA] | "your laptop?" | — |

**Pronunciation notes:** Qwen = "chwen" (caption spelling: Qwen) · LFM3 = "L-F-M three" · Ollama = "oh-LAH-mah" · Liquid (the company, plain word) · `add_event` is on screen only, never spoken (→ `names` in scenes.json)

## Read-aloud version (clean: exactly what the voice says, one paragraph per beat)

One messy text. One calendar event. On an AI that needs about one gigabyte of memory.

LFM3 is a new open model from Liquid AI. It's built to turn requests into actions.

Give it this: lab moved to Thursday, three PM, bring the circuits report.

No essay back. It fills in the event, like a form, for your app to add.

LFM3 has one point seven billion learned numbers. Each takes four bits: about one gigabyte.

By Liquid's own scores, it beats Qwen, a model about five times bigger, on action tasks.

The catch? On knowledge questions, Qwen wins.

Liquid says LFM3's too small for coding agents or long reasoning. For facts, let it search.

Got Ollama, the local model app? One terminal command, and your prompts stay on your laptop.

Great for small actions on your laptop. Not a know-it-all.

Would you run an AI on your own laptop?
