# Package · LFM3 reel (for the editor)

_Concatenated from brief.md, hooks.md (chosen hook), script-reel.md, storyboard-reel.md and publish.md on 2026-10-29. The source files are the truth; regenerate after any edit._


---

## Brief · LFM3 (Liquid AI)

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

---

## Hooks · LFM3

| # | Formula | Hook line | First frame | Clarity | Curiosity | Accuracy | Frame | Total |
|---|---|---|---|---|---|---|---|---|
| H1 | #9 before → after | "One messy text. One calendar event. On an AI that needs about one gigabyte of memory." (as spoken in script-reel.md beat 1) | The group-chat bubble at top, an arrow, a calendar card below, a "~1 GB" chip | 5 | 4 | 4 | 5 | 18 |
| H2 | #2 striking number | "One gigabyte. That's the whole AI." | Giant "1 GB" over a laptop outline | 5 | 4 | 4 | 4 | 17 |
| H3 | #1 paradox | "The new trending AI is tiny, and it's better at doing than talking." | A tiny chip next to a big speech bubble crossed out | 3 | 4 | 4 | 3 | 14 |
| H4 | #7 viewer's question | "Can a one-gigabyte AI actually do anything useful?" | "1 GB" with a big "?" | 5 | 3 | 5 | 3 | 16 |
| H5 | #11 local alternative | "You don't need the cloud for this one. It fits on your laptop." | A cloud crossed out, a laptop lit | 4 | 3 | 4 | 3 | 14 |
| H6 | #5 contrast | "Most AI models need a data centre. This one needs one gigabyte." | A server rack vs a laptop | 4 | 3 | 3 | 4 | 14 |

_Checked against the winners and low performers in `inspiration.md`: none opens on the Wi-Fi-off instruction, the release date, or "beats Qwen 9B"._

**Pick:** H1 because it shows the result first (what the winners do), names the one concrete job the video is about (messy text → an action), and puts the size claim on screen, all true and paid off by the demo. "Doing it" is the illustrated running example of a task type Liquid lists for the text model (calendar, tool calling); the demo is labelled "illustrative".
**First frame (described):** Frame 0 on a light (`paper`) background: a large white chat bubble with a 4 px ink border across the top third (x 160–860, y 250–600) reading "lab moved to thu 3pm, bring the circuits report" in Inter 600 54 px ink; below it a downward ink arrow (y 610–650) already drawn into a crisp calendar card (x 160–860, y 660–1120) with a blue header "Thu" and body lines "3:00 PM · Lab" / "bring circuits report"; a giant yellow "~1 GB" chip (Anton 150 px) pinned at the card's top-left corner, rotated −4°. Nothing empty; the claim (a text became an event, on a ~1 GB AI) reads on mute. The bubble nudges on the first word, so the object moves before 0.5 s.
**How the video pays it off:** the demo beat replays the same message going in and the same calendar call coming out, on a laptop with the cloud crossed out ("runs locally"); the "~1 GB" chip returns when the one-line command downloads the ~1 GB file.

---

## Reel script · LFM3

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

---

## Storyboard · LFM3 · reel · archetype: Launch

_One row per script beat, expanded from `animation-plan.md` (same sections, verbs, cue words, cam and layout; re-synced 2026-10-29 after the visual-plan and structure-check passes). Times at the house pace 2.3 w/s (the voice step re-times them). Captions are the engine's (81–90 % height); the stage stays in y 220–1460 and inside x 160–860 (right 12 % clear). No logos, no sources on screen; replicas say "illustrative". Giant Anton only for the "~1 GB" chip and the verdict stamps; every other text ≤ 58 px._

| # | Time | Spoken line | Tag | Section | What the visual shows (motion verb per element) | Transition in | Text overlay | SFX | Source pill |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 0–7 s | One messy text. One calendar event. On an AI that needs about one gigabyte of memory. | [TITLE] | light (hook) | frame 0: the bubble "lab moved to thu 3pm, bring the circuits report" (y 250–600), an ink arrow, the calendar card "Thu · 3:00 PM · Lab · bring circuits report" (y 660–1120), the yellow "~1 GB" chip (Anton 150 px) at its corner. *One*: bubble NUDGES · *messy*: bubble JIGGLES, words tilt · *calendar*: arrow REDRAWS · *event*: card PULSES · *AI*: an "AI" chip POPS on the arrow · *needs*: desk strip SLIDES up · *gigabyte*: "~1 GB" SLAMS to 1.3× · *memory*: memory bar FILLS a sliver | none (frame 0 is the hook) | "~1 GB" | AI → pop · needs → whoosh · gigabyte → pop · memory → tick | — (S3 in description) |
| 2 | 7–14 s | LFM3 is a new open model from Liquid AI. It's built to turn requests into actions. | [TITLE] | blue (What it is) | the card and arrow SHRINK AWAY, the bubble SHRINKS to a mini bubble at the top (its text drawn as grey lines); *LFM3*: an ink box STAMPS with "LFM3" (Anton 58 px, yellow on ink) · *open*: chip "open weights" POPS · *Liquid*: chip "from Liquid AI" POPS · *built*: an empty `add_event(` form BUILDS below · *requests*: the mini bubble ROUTES into the box (the box pulses) · *actions*: an arrow DRAWS into the form, its slots FILL with ink lines, a green ✓ STAMPS | WIPE to blue | "LFM3 · open weights · from Liquid AI" | LFM3 → stamp · open → pop · Liquid → pop · built → pop · requests → click · actions → ding | — (S1, S5) |
| 3 | 14–19 s | Give it this: lab moved to Thursday, three PM, bring the circuits report. | [SCREEN] | light (The demo) | chip "The demo" (0.8 s); the mini bubble GROWS back, emptied; *this*: PUSH IN on the bubble · from *lab*: the bubble TYPES OUT "lab moved to thu 3pm, bring the circuits report" with the voice (illustrative) · *Thursday*, *three*, *report*: "thu", "3pm", "bring the circuits report" HIGHLIGHT yellow · *report*: camHome, the empty form `add_event(` with slots "title" "day" "time" "note" BUILDS, the desk strip SLIDES up | WIPE to light | "illustrative" | this → whoosh · lab → key · Thursday → pop · three → pop · report → pop | — (S10) |
| 4 | 19–26 s | No essay back. It fills in the event, like a form, for your app to add. | [ANIMATE] | light (The demo, span 3–4) | *essay*: a grey 8-line essay block BUILDS over the form, a red line STRIKES it, it SHRINKS AWAY · *fills*: PUSH IN on the slots; "Lab" → title, "Thu" → day, "3:00 PM" → time, "bring circuits report" → note ROUTE in, 0.4 s apart · *form*: dashed borders turn solid, camHome · *app*: the filled card SLIDES into the "your app" box, which STAMPS the calendar card back | continuous (span 3–4) | "add_event" | essay → pop · fills → click ×4 · form → tick · app → stamp | — (S5) |
| 5 | 26–33 s | LFM3 has one point seven billion learned numbers. Each takes four bits: about one gigabyte. | [ANIMATE] | yellow (Why it fits) | chip "Why it fits" (0.8 s); *LFM3*: the filled form SLIDES out of "your app" · *point*: it SLICES into a 40 × 24 grid of tiny cells · *billion*: "1.7 B" COUNTS UP (58 px chip) · *numbers*: the cells FILL ink in one sweep · *four*: each cell SLICES into 4 and "× 4 bits" STAMPS · *gigabyte*: the grid COMPRESSES into a giant "~1 GB" chip that ROUTES into the laptop's memory bar, which FILLS; "1.7 B" and "× 4 bits" stay to the section's end; "~1 GB" stays docked on the strip | WIPE to yellow (the calendar card SHRINKS AWAY with it) | "1.7 B" · "× 4 bits" · "~1 GB" | point → pop · billion → tick · numbers → tick · four → stamp · gigabyte → ding | — (S2, S3) |
| 6 | 33–40 s | By Liquid's own scores, it beats Qwen, a model about five times bigger, on action tasks. | [VS] | dark (The trade) | chip "The trade" (0.8 s); a small LFM3 block BUILDS with the mini form glyph; *scores*: header "Liquid's scores" + legend POP · *Qwen*: a "Qwen3.5-9B" block BUILDS to ~5× height · *five*: a "~5×" bracket DRAWS · *bigger*: the Qwen block THUDS · *action*: blocks SHRINK into the legend, bar pair 1 RACES under "actions (tool calling)": LFM3 71 (green) vs Qwen 63, values COUNT UP; the form glyph ROUTES onto LFM3's bar; pair 2's empty lane is outlined | WIPE to navy | "Liquid's scores · actions (tool calling) 71 vs 63" | scores → pop · Qwen → pop · five → pop · action → ding | — (S6) |
| 7 | 40–43 s | The catch? On knowledge questions, Qwen wins. | [VS] | dark (The trade, span 6–8) | music dips; *catch*: pair 1 DIMS, "knowledge" TYPES OUT as pair 2's label · *knowledge*: pair 2 RACES, LFM3 63 vs Qwen 80, COUNTING UP · *wins*: PUSH IN on pair 2, Qwen's 80 turns yellow; both pairs on one screen | continuous (span 6–8) | "knowledge 63 vs 80" | catch → key · knowledge → ding · wins → whoosh | — (S6) |
| 8 | 43–50 s | Liquid says LFM3's too small for coding agents or long reasoning. For facts, let it search. | [VERDICT] | dark (The trade, span 6–8) | *Liquid*: the header PULSES · *small*: camHome, both pairs FOLD into a scoreboard ("71 · 63", "63 · 80") and a quote card "Liquid:" BUILDS · *coding*: "coding agents ✗" STAMPS · *reasoning*: "long reasoning ✗" STAMPS · *facts*: a question-mark glyph ROUTES from the scoreboard into the card · *search*: "+ search" with a generic magnifier SLIDES in | continuous (span 6–8) | "Liquid: coding agents ✗ · long reasoning ✗ · + search" | small → pop · coding → stamp · reasoning → stamp · facts → click · search → pop | — (S7, S8) |
| 9 | 50–57 s | Got Ollama, the local model app? One terminal command, and your prompts stay on your laptop. | [TERMINAL] | blue (Try it) | chip "Try it" (0.8 s); *Ollama*: chip "Ollama · local model app" POPS (no logo) · *local*: the laptop strip SLIDES up with its "~1 GB" bar · *One*: a plain terminal BUILDS (illustrative) · *command*: the Ollama chip SHRINKS AWAY; `ollama run` / `hf.co/LiquidAI/` / `LFM3-1.7B-GGUF:Q4_K_M` TYPES OUT on three lines (40 px, ≤ 21 chars each), enter blips, a download bar FILLS to "~1.1 GB" with a "sped up" chip · *prompts*: PUSH IN; the demo bubble as a mini glyph POPS in as the prompt, a cloud glyph is STRUCK · *laptop*: "runs locally" STAMPS on the laptop strip | WIPE to blue | "ollama run …" | Ollama → pop · local → whoosh · One → pop · command → key, blip, tick · prompts → pop · laptop → stamp | — (S9, S4, S15) |
| 10 | 57–61 s | Great for small actions on your laptop. Not a know-it-all. | [VERDICT] | yellow (verdict) | camHome on the wipe; the filled form and the calendar card return side by side at 0.6 scale (their text drawn as grey lines, the form's four slots kept as bars); *Great*: "SMALL ACTIONS ✓" STAMPS (Anton 110 px, ≤ 750 px wide) · *actions*: the form's four slots TICK green · *laptop*: the laptop strip SLIDES up with "~1 GB" · *know-it-all*: "NOT A KNOW-IT-ALL" STAMPS (Anton 96 px) with a small ✗ | WIPE to yellow | "SMALL ACTIONS ✓ · NOT A KNOW-IT-ALL" | Great → stamp · actions → ding · laptop → whoosh · know-it-all → stamp | — (S5, S7) |
| 11 | 61–65 s | Would you run an AI on your own laptop? | [CTA] | dark (CTA) | the running object returns small (mini bubble → arrow → mini calendar card) on the laptop strip; the question BUILDS WORD BY WORD on two lines (Inter 700 58 px, "laptop" yellow) · *run*: the arrow REDRAWS · *laptop*: the laptop screen LIGHTS yellow, "Follow for more" pill POPS | WIPE to navy | "Would you run an AI on your own laptop?" | run → pop · laptop → pop, pill → pop | — |

_Continuous spans: span 3–4 (the demo: the bubble and the form never leave; only the routing and the camera move) · span 6–8 (the trade: one navy screen under "Liquid's scores"; the bar pairs stack, then fold into a scoreboard that stays to the section's end). The running object is on screen in every beat; the laptop strip in s01, s03–s05, s09–s11._
_Camera (from the plan): s03 [545, 425, 1.3] on *this* → home on *report* · s04 [545, 970, 1.3] on *fills* → home on *form* · s07 [545, 800, 1.3] on *wins* → home s08 *small* · s09 [545, 1000, 1.3] on *prompts* → home on the s10 wipe. No cam (deliberate): s01, s02, s05, s06, s10 (camHome on the wipe only), s11._
_Reels: a visual change every 2–3 s; captions from 81 % height; keep the bottom 20 % / right 12 % clear; generic icons, no logos._

---

## Publish kit · LFM3

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
