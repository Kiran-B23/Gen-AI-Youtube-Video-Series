# Brief · LFM3 (Liquid AI)

| | |
|---|---|
| Topic | LFM3: Liquid AI's new open-weight small model family; the reel centres on the text model LFM3-1.7B |
| Format(s) | reel (default; owner asked for reel) |
| Viewer | global tech audience · level: curious practitioner (students and early-career developers; default) |
| **Viewer's question** | "A new tiny model is trending: what does it actually do, and can I use it on my own laptop today?" |
| **Archetype** | primary: Launch · secondary: none |
| **Why this archetype** | provisional: Launch. The trend radar marks it "launch" and every signal ("just dropped", "Introducing LFM3") is a new release; the viewer wants "what is it, should I care" → confirmed after YouTube analysis: Launch. Every LFM3 video that reached is a Launch (Liquid's launch film 28K, a founder walkthrough 12K, a hands-on test 63K); the gap is a short "what is it for + how to try it" answer, which is the Launch beat sheet |
| **Tone (voice style)** | Genuinely excited but honest, like a developer who just read the model card: quick and bright on the demo, calm and plain on what it's bad at |
| Must include | what it does in one sentence (a small model built to call tools and fill structured output on your own device); ~1 GB at 4-bit; the one thing to try today (run it locally with one Ollama line and ask it to turn a message into a calendar action); what Liquid says it's *not* for (agentic coding, complex reasoning, knowledge-heavy questions) |
| Running example | one messy group-chat message from a student ("lab moved to thu 3pm, bring the circuits report") that the model turns into a calendar tool call, on a laptop, run locally |
| Angle (one sentence) | Skip the benchmark war: here's what a 1 GB model is actually good at (turning messy text into actions on your own laptop), and the one line that lets you try it tonight |
| Chosen hook | H1: "One messy text. One calendar event. And the AI doing it needs about one gigabyte." (`hooks.md`, 18/20) |
| Runtime target | ~65 s at the house pace 2.3 w/s (pace.json) → ~150 spoken words (the six must-includes and the Goldfish fixes need it; Launch sheet is 35–55 s, reel cap 60 s + a short CTA) |
| Open questions / unverified | **No our test**: the sandbox has no network and no Ollama, so we did not run the model. The demo is a labelled illustration of a task type Liquid itself lists (calendar, tool calling). All benchmark numbers are Liquid's own (self-reported). |

## Defaults used (autopilot, 2026-10-28)
- Format reel, viewer curious practitioner: the owner gave only the topic and format.
- Archetype Launch: the owner's suggestion, kept after the evidence (below).

## Locks (must never appear)
- "beats Qwen 9B" / "smarter than a 9B model" without the qualifier "on Liquid's own average". It loses to Qwen3.5-9B on GPQA, RULER and SWE-bench (S6).
- "runs on any phone" as our claim (Liquid's own words are "fits on any phone or laptop", memory only, not speed).
- "free" without "open weights"; licence trivia ($10M threshold): not material for students.
- "every modality" as if one model does everything: the family has separate text / vision / audio / omni models; we show only the text model.
- Launch trivia: dates, MIT spin-off, funding, HQ, Product Hunt.
- "GPT-level", "game-changer", "insane".
- Logos (Liquid AI, Ollama, Hugging Face): plain-text names only.
- No claim that we ran it ("I tried it", "in my test").

## Archetype confirmed
Launch, no secondary (inspiration.md: all reaching LFM3 videos are Launch; low performers opened on date/company trivia and had no demo).
