# Reel script · Laya, the free local Jev rival

**Archetype:** Launch (+ one Comparison round) · **Viewer's question:** "Is there a free Jev I can run myself, and is it any good?" · **Running example:** the ticket "I was charged twice. Refund me, or I cancel."
**Tone:** genuinely excited but honest: quick on the demo, calm on the catch · **Words:** 177 · **Est. runtime:** 66 s (÷2.7) · ~70 s with the Kokoro voice · **Winners' range:** long-form only (431–1049 s); no on-topic Short has reach, so we follow the house benchmark pace

_Rows = the Launch reel beat sheet (Hook · What it is · Demo · Why it's different · [Comparison round] · The catch · Verdict · CTA)._

| # | Beat (from archetype) | Time | Spoken line (with [cues]) | Words | Visual tag | On-screen text | Source |
|---|---|---|---|---|---|---|---|
| 1 | Hook | 0–5 s | [excited] There's a free rival to Jev, and it runs on your own laptop. | 13 | `[TITLE]` | FREE JEV RIVAL · runs on your laptop | [S2] [S3] |
| 2 | What it is | 5–10 s | It's called Laya. [beat] It's a decision model, so it never writes text. | 12 | `[ANIMATE]` | LAYA · decides, never writes | [S1] |
| 3 | What it is | 10–16 s | Give it a message and some questions. It answers each with a probability. | 12 | `[ANIMATE]` | message → questions → % | [S1] |
| 4 | Demo | 16–21 s | We installed it with one pip command, on a laptop with no GPU. | 12 | `[TERMINAL]` | pip install laya | [S3] [S12] |
| 5 | Demo | 21–27 s | Then we gave it a real ticket: [read it like the customer] I was charged twice. Refund me, or I cancel. | 15 | `[ANIMATE]` | the ticket card | [S12] |
| 6 | Demo | 27–31 s | Which team? [bright] Billing, 98% sure. Nailed it. | 9 | `[ANIMATE]` | billing · 98% | [S12] |
| 7 | Demo | 31–37 s | Will they leave? [slow down] 48%. Basically a guess, even though they said they'd cancel. | 14 | `[ANIMATE]` | churn risk · 48% · a guess | [S12] |
| 8 | Demo | 37–42 s | All three answers took about two thirds of a second, CPU only. | 11 | `[NUMBER]` | ~0.65 s · 3 answers · CPU only | [S12] |
| 9 | Why it's different | 42–49 s | Jev is a paid cloud API. Laya is free and open, so tickets stay on your machine. | 16 | `[VS]` | JEV paid · cloud / LAYA free · local | [S9] [S2] |
| 10 | Comparison round (secondary) | 49–55 s | On Laya's own benchmark, the tuned version scores 77%. Jev's published score is 73. | 16 | `[VS]` | 77% vs 73% · Laya's benchmark | [S6] |
| 11 | The catch | 55–61 s | [serious] The catch? Untuned, Laya scores just 36% there. Tune it on your own tickets first. | 16 | `[VERDICT]` | 36% UNTUNED | [S7] [S11] |
| 12 | Verdict | 61–67 s | Private data and time to tune? Try Laya. Accuracy with zero setup? Pay for Jev. | 15 | `[LIST]` | private + time → Laya · zero setup → Jev | [S2] [S9] [S7] |
| 13 | CTA | 67–70 s | [warm] What should I explain next? Tell me below! | 8 | `[CTA]` | What should I explain next? | — |

**Pronunciation notes:** Laya (say LAH-yah), Jev (say JEV, rhymes with "rev"), pip (say "pip") → `names`: Laya, Jev, pip, GPU, CPU, API

**Notes:** s07's coin flip is the re-hook at ~31 s. The ticket number and percentages are rounded from our run (billing 0.984, churn risk 0.4825, three questions median 651 ms over 20 runs; see `our-test/`). s10 says "published" because Laya's card says the Jev figures are third-party, with different samples and prompts.

## Read-aloud version (clean: exactly what the voice says, one paragraph per beat)

There's a free rival to Jev, and it runs on your own laptop.

It's called Laya. It's a decision model, so it never writes text.

Give it a message and some questions. It answers each with a probability.

We installed it with one pip command, on a laptop with no GPU.

Then we gave it a real ticket: I was charged twice. Refund me, or I cancel.

Which team? Billing, 98% sure. Nailed it.

Will they leave? 48%. Basically a guess, even though they said they'd cancel.

All three answers took about two thirds of a second, CPU only.

Jev is a paid cloud API. Laya is free and open, so tickets stay on your machine.

On Laya's own benchmark, the tuned version scores 77%. Jev's published score is 73.

The catch? Untuned, Laya scores just 36% there. Tune it on your own tickets first.

Private data and time to tune? Try Laya. Accuracy with zero setup? Pay for Jev.

What should I explain next? Tell me below!
