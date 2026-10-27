# Package · Jev by TypeSafe AI (reel)

_Editor copy: brief, hook, script, storyboard, art direction and publish kit in one file. Research: research.md · YouTube analysis: inspiration.md · QA: qa.md._

---

# Brief · Jev by TypeSafe AI

| | |
|---|---|
| Topic | Jev by TypeSafe AI, the AI model that decides instead of writing |
| Format(s) | reel (faceless, 9:16) |
| Viewer | global tech audience · level: practitioner (developers who call LLM APIs) |
| **Viewer's question** | "What is this new Jev model, and should I use it instead of an LLM?" |
| **Archetype** | primary: Launch · secondary (one beat only): none |
| **Why this archetype** | provisional: Launch (a newly released model; "is it worth the hype") → confirmed after YouTube analysis: 3 of 4 winners are Launch-style "what it is + should I care", the top two open on the "doesn't write text" paradox (inspiration.md) |
| **Tone (voice style)** | Genuinely excited but honest, like a developer who just tried it: quick and bright on the demo and the numbers, calm and serious on the catch. Read every word. Never robotic. |
| Must include | what it does, shown on one ticket; speed and price (company claims, labelled by voice); the independent cost test; the accuracy catch; the cascade fix; a person-level verdict |
| Running example | Support ticket #4821: "Charged twice this month, refund me or I cancel." → Billing · Urgent · High churn risk |
| Angle (one sentence) | Jev is a cheap, instant decision layer, not an LLM replacement: let it take the confident calls and hand the unsure ones to an LLM. |
| Chosen hook | see hooks.md |
| Runtime target | 55–70 s (user brief: 60–65 s; Kokoro voice ~2.4 words/s → ~150 words) |
| Open questions / unverified | brief-v3's launch-day-user medians and the "GPT-5.6 Terra" cascade were not verifiable → cut/replaced (research.md) |

## User brief (brief-v3.md) conflicts, resolved per house rules
- Sources on screen → none on screen; all in the description. The voice says "TypeSafe's own numbers" where they are claims.
- s09 CTA "What would you route first?" → channel-generic CTA ("What should I explain next?"), per the learnings log.
- Headers per scene → replaced by section colours + a step-free Launch flow (no numbered steps on a launch topic).
- 1.2x speed-up → never speed up the voice; the script is trimmed to fit instead.
- No views, funding or adoption numbers (brief rule 6) → kept.


---

# Hooks · Jev by TypeSafe AI

| # | Formula | Hook line | First frame | Clarity | Curiosity | Accuracy | Frame | Total |
|---|---|---|---|---|---|---|---|---|
| 1 | #1 paradox | "This AI never writes a single word. It only makes decisions." | Giant "NEVER WRITES" headline over a chat box whose cursor blinks with nothing typed | 5 | 5 | 5 | 4 | 19 |
| 2 | #1 paradox + number | "This AI never writes a word, and it answers in a tenth of a second." | Same headline + a stopwatch at 0.1 s | 4 | 4 | 3 | 4 | 15 |
| 3 | #9 before → after | "One support ticket. An LLM writes a paragraph. This model just decides." | Split screen: a paragraph scrolling vs three chips | 4 | 3 | 5 | 4 | 16 |
| 4 | #7 viewer's question | "Is Jev worth the hype? I checked the independent numbers." | "WORTH THE HYPE?" + a magnifier | 5 | 3 | 5 | 3 | 16 |
| 5 | #5 cost contrast | "Eight thousand labels for twenty-one cents. LLMs charged up to sixty-three dollars." | Two giant price tags | 3 | 4 | 5 | 4 | 16 |
| 6 | the catch first | "It's the cheapest AI you can call, and it's wrong more often than an LLM." | A price tag next to a warning gauge | 4 | 4 | 4 | 3 | 15 |

**Pick:** #1 because it's the user's own hook idea (brief-v3) reframed by what Jev *does* (style rule: "makes decisions", not just "can't write"), it scores highest on clarity, and it's a different line from every winner (IBM: "doesn't actually write any text"; Short: name trivia). #2 lost a point on accuracy: 0.1 s is TypeSafe's typical case, not every call.
**First frame (described):** dark circuit-navy screen; a chat input with a blinking cursor and "Words written: 0" counter; giant two-line headline "NEVER WRITES. / ONLY DECIDES." with "DECIDES" in electric amber.
**How the video pays it off:** beat 2 defines what "decides" means (typed answers + confidence), beats 3–4 show it on one ticket, and the verdict ("Jev decides, the LLM writes") closes the loop.


---

# Reel script · Jev by TypeSafe AI

**Archetype:** Launch · **Viewer's question:** "What is Jev, and should I use it instead of an LLM?" · **Running example:** support ticket #4821, "Charged twice this month. Refund me or I cancel."
**Tone:** genuinely excited but honest; quick on the demo and numbers, calm on the catch · **Words:** 168 · **Est. runtime:** 62 s (÷2.7; ≈ 68 s with the Kokoro voice at ~2.5 w/s) · **Winners' range:** 95 s Short; long-form 7–18 min

_Rows = the Launch reel beat sheet: Hook → What it is → Demo → Why it's different → The catch → Verdict → CTA (Why-it's-different and the catch run two beats each; "the fix" is part of the verdict). One beat = one claim = one visual._

| # | Beat (from archetype) | Time | Spoken line (with [cues]) | Words | Visual tag | On-screen text | Source |
|---|---|---|---|---|---|---|---|
| 1 | Hook | 0–4 s | [mysterious, then punchy] This AI never writes a single word. [beat] It only makes decisions. | 11 | [TITLE] | NEVER WRITES. / ONLY DECIDES. · "Words written: 0" | S1 |
| 2 | What it is | 4–9 s | [bright] Meet Jev. You ask questions; it returns typed answers with a confidence score. | 13 | [TITLE] | JEV · chips: question in → typed answer + confidence | S1 |
| 3 | Demo (input) | 9–14 s | [angry-customer read] Here's a support ticket: charged twice this month, refund me or I cancel. | 13 | [ANIMATE] | ticket #4821 card slides in | — |
| 4 | Demo (output) | 14–18 s | [quick list] One pass, three answers. Billing team. Urgent. High churn risk. | 10 | [ANIMATE] | chips: Team: Billing · Urgent: Yes · Churn risk: High (illustrative) | S1 |
| 5 | Why it's different: speed | 18–23 s | [excited] TypeSafe says most answers take about a tenth of a second. | 11 | [NUMBER] | ~0.1 s per answer · TypeSafe's claim | S3 |
| 6 | Why it's different: price | 23–28 s | [land "free"] Price: 4.2 cents per million input tokens. Output is free. | 12 | [NUMBER] | $0.042 per 1M input tokens · output: free | S2 |
| 7 | Why it's different: proof | 28–36 s | [confident] Independent researchers labeled nearly 8,000 items with it for 21 cents. [beat] The priciest of 19 LLMs cost about 300 times more. | 20 | [ANIMATE] | Jev $0.21 vs 19 LLMs up to $62.99 · 7,977 items | S5 |
| 8 | The catch: accuracy | 36–42 s | [slow down, honest] The catch? On TypeSafe's own test, it matched frontier models 68% of the time. | 15 | [NUMBER] | 68% agreement with frontier-model answers | S4 |
| 9 | The catch: valid ≠ right | 42–46 s | [serious] And an answer can fit the format perfectly and still be wrong. | 12 | [VERDICT] | VALID BUT WRONG | S8 |
| 10 | Verdict: the fix | 46–52 s | [pick up speed] So use both. Jev takes the confident calls; unsure ones go to an LLM. | 14 | [ANIMATE] | ticket → Jev → confident: done / unsure: LLM | S6 |
| 11 | Verdict: the proof | 52–57 s | [payoff] One university test kept almost all of GPT-6's accuracy at about half the cost. | 14 | [ANIMATE] | 99.6% accuracy kept · 47% of the cost | S6 |
| 12 | Verdict (recap) | 57–62 s | [warm, confident] Verdict: Jev decides, the LLM writes. Great for routing and tagging, not for writing. | 14 | [RECAP] | Jev decides · LLM writes · route + tag · unsure → escalate | — |
| 13 | CTA | 62–65 s | [light tease] What should I explain next? Tell me below. | 9 | [CTA] | What should I explain next? | — |

**Pronunciation notes:** Jev (say "jev", rhymes with "rev"); TypeSafe (one word); GPT-6 ("G-P-T six"); LLM ("L-L-M"). → `names`: Jev, TypeSafe, GPT-6, LLM, LLMs.

## Read-aloud version (clean: exactly what the voice says, one paragraph per beat)
This AI never writes a single word. It only makes decisions.

Meet Jev. You ask questions; it returns typed answers with a confidence score.

Here's a support ticket: charged twice this month, refund me or I cancel.

One pass, three answers. Billing team. Urgent. High churn risk.

TypeSafe says most answers take about a tenth of a second.

Price: 4.2 cents per million input tokens. Output is free.

Independent researchers labeled nearly 8,000 items with it for 21 cents. The priciest of 19 LLMs cost about 300 times more.

The catch? On TypeSafe's own test, it matched frontier models 68% of the time.

And an answer can fit the format perfectly and still be wrong.

So use both. Jev takes the confident calls; unsure ones go to an LLM.

One university test kept almost all of GPT-6's accuracy at about half the cost.

Verdict: Jev decides, the LLM writes. Great for routing and tagging, not for writing.

What should I explain next? Tell me below.


---

# Storyboard · Jev by TypeSafe AI · reel · archetype: Launch

_One row per script beat. Captions in the 81–90% band; bottom 20% / right 12% clear; generic icons, no logos; no sources on screen._

| # | Time | Spoken line | Tag | Section | What the visual shows (motion verb per element) | Transition in | Text overlay | SFX | Source pill |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 0–4 s | This AI never writes a single word. It only makes decisions. | [TITLE] | gate | Headline "NEVER WRITES." SLAMS IN on frame 0; "ONLY DECIDES." STAMPS in amber on "decisions"; a chip "WORDS WRITTEN: 0" POPS on "word" | none (frame 0 already full) | NEVER WRITES. / ONLY DECIDES. | stamp | — |
| 2 | 4–9 s | Meet Jev. You ask questions; it returns typed answers with a confidence score. | [TITLE] | gate | "JEV" headline SLIDES UP on "Jev"; two HUD chips LIGHT UP on "questions" (QUESTIONS IN) and "typed" (TYPED ANSWER + CONFIDENCE) | engine wipe | JEV | pop ×2 | — |
| 3 | 9–14 s | Here's a support ticket: charged twice this month, refund me or I cancel. | [ANIMATE] | gate | span A: glass ticket card #4821 SLIDES IN from the left; its text TYPES on; the decision ring GLOWS ON at right, slowly ROTATING | engine wipe | (in clip) TICKET #4821 | whoosh | — |
| 4 | 14–18 s | One pass, three answers. Billing team. Urgent. High churn risk. | [ANIMATE] | gate | span A cont.: the ticket SLIDES INTO the ring, a SCAN beam crosses it, three chips SPLIT out and LIGHT UP one per word: TEAM: BILLING · URGENT: YES · CHURN RISK: HIGH; tiny "illustrative" tag | continuous (same clip) | (in clip) | tick ×3 | — |
| 5 | 18–23 s | TypeSafe says most answers take about a tenth of a second. | [NUMBER] | proof | readout "0.1 s" COUNTS UP on "tenth"; label "per answer · TypeSafe's claim" FADES UP | section wipe | ~0.1 s | ding | — |
| 6 | 23–28 s | Price: 4.2 cents per million input tokens. Output is free. | [NUMBER] | proof | readout "$0.042" COUNTS UP on "cents"; label "per 1M input tokens · output free" FADES UP | wipe (same section) | $0.042 · FREE | ding, pop | — |
| 7 | 28–36 s | Independent researchers labeled nearly 8,000 items with it for 21 cents. The priciest of 19 LLMs cost about 300 times more. | [ANIMATE] | proof | clip C: HUD tag "7,977 ITEMS · INDEPENDENT TEST" SLIDES IN; two data bars GROW: JEV's bar barely RISES to $0.21 on "twenty-one", the 19-LLM bar SHOOTS UP to $62.99 on "sixty-three" while its readout COUNTS UP | wipe | $0.21 vs $62.99 | ding ×2 | — |
| 8 | 36–42 s | The catch? On TypeSafe's own test, it matched frontier models 68% of the time. | [NUMBER] | caution | hard cut to plum; "68%" COUNTS UP on "sixty-eight"; label "agreement with frontier-model answers · TypeSafe's benchmark" FADES UP | hard cut (accent) | 68% | riser, ding | — |
| 9 | 42–46 s | And an answer can fit the format perfectly and still be wrong. | [VERDICT] | caution | stamp "VALID BUT WRONG" STAMPS on "wrong"; sub "a well-formed answer can still be wrong" SLIDES UP on "format" | wipe (same section) | VALID BUT WRONG | stamp | — |
| 10 | 46–52 s | So use both. Jev takes the confident calls; unsure ones go to an LLM. | [ANIMATE] | route | span B: a stream of ticket cards SLIDES toward the ring; the ring ROUTES them: mint cards (CONFIDENT) FLY right into "DONE", pink cards (UNSURE) DROP down a lane into an "LLM" panel that PULSES | section wipe | (in clip) CONFIDENT → DONE · UNSURE → LLM | whoosh, pop ×2 | — |
| 11 | 52–57 s | One university test kept almost all of GPT-6's accuracy at about half the cost. | [ANIMATE] | route | span B cont.: the lanes dim; two glass readouts SLIDE UP and COUNT UP: "99.6% ACCURACY KEPT" on "accuracy", "47% OF THE COST" on "cost" | wipe | 99.6% · 47% | ding ×2 | — |
| 12 | 57–62 s | Verdict: Jev decides, the LLM writes. Great for routing and tagging, not for writing. | [RECAP] | route | recap card "SAVE THIS": four numbered rows SLIDE IN on "decides", "writes", "routing", "writing": Jev decides · LLM writes · route + tag with Jev · unsure → escalate | wipe | SAVE THIS | pop ×4 | — |
| 13 | 62–65 s | What should I explain next? Tell me below. | [CTA] | route | end card: question POPS on "next"; "Follow for more AI breakdowns" pill SLIDES UP on "below" | wipe | What should I explain next? | pop | — |


---

# Art direction · Jev by TypeSafe AI

_Decided from the concept ("a model that only decides"), not from any reference video. The 90-second winner is a cream editorial page; Caleb is a black whiteboard; IBM a lightboard. Ours is none of these._

## Concept → visual world
- **Central metaphor:** a **decision gate**: a glowing glass ring in a dark signal room. Text goes in one side; typed answers come out as lit signal chips. No words are ever "written": things are *routed*.
- **Running object:** **ticket #4821** ("Charged twice this month. Refund me or I cancel."). It slides into the gate (s03), splits into three answer chips (s04), and comes back in the cascade (s10), where it takes the confident lane. Its id rides in the kicker of the numbers scenes ("#4821 ANSWERED IN…", "#4821 COST"), so it is on screen or named in ~70% of the video.
- **Mood:** air-traffic control at night · a fibre switch panel · a calm HUD.

## Palette (from the metaphor: signal lights in a dark room)
| Section role | bg | text | accent | accent2 | Why it fits the concept |
|---|---|---|---|---|---|
| main · `gate` (hook, what it is, demo) | #0A1022 signal navy | #E8EEFF | #FFC24A signal amber (a decision lighting up) | #4DF2C2 mint (confident) | the control room; amber = "decided" |
| alt · `proof` (speed, price, independent test) | #0B1C24 deep teal-navy | #E6F6F4 | #4DF2C2 mint | #7C9CFF blue | numbers read as instrument readouts |
| highlight · `caution` (the catch) | #1C0F26 deep plum | #F6EAF4 | #FF5C8A warning pink | #FFC24A amber | the warning light |
| alt · `route` (cascade, proof, recap, CTA) | #121A3A indigo | #E8EEFF | #7C9CFF electric blue | #4DF2C2 mint | two lanes of traffic; calm resolution |

These go into `scenes.json` → `"sections"` and each scene's `"section"`.

## Motion language
- **Primary verb set:** SLIDES IN (ticket) · SCANS (beam through the gate) · SPLITS / LIGHTS UP (answer chips) · COUNTS UP (readouts) · STAMPS (verdict) · ROUTES (cascade lanes).
- **Continuous spans:** span A = s03–s04 (ticket → gate → three chips, one unbroken Manim clip); span B = s10–s11 (cascade: the ticket stream forks into "confident → done" and "unsure → LLM", then the result readouts count up); clip C = s07 (cost bars).
- **Transitions:** primary = section colour wipe (engine default) at each section change; accent = a hard cut into the `caution` plum on "The catch?".
- **Ambient motion:** the gate ring slowly rotates; HUD grid drifts; readouts flicker their last digit once during holds.
- **Music:** `cc0/fresh-focus` (bright, steady; good under explanations), ducked under the voice.

## Checks
- [x] Palette and layout differ from every reference video the user gave (tokenization reel used void/core/signal with mint/pink; ours is amber-led navy + plum warning + indigo routing)
- [x] Every beat in the storyboard has a motion verb for each element
- [x] The running object appears in ≥ 60% of the video (on screen in s03–s04, s10; named in kickers s05–s07, s11)
- [x] At least 2 visual metaphors beyond text chips (the decision gate; the forked routing lanes; the instrument readouts)


---

# Publish kit · Jev by TypeSafe AI

## Titles (pick 1)
1. This AI Never Writes a Word (Here's the Catch)
2. Jev: The AI That Only Decides, Tested by the Numbers
3. Is Jev Worth the Hype? The Independent Numbers

## Thumbnail concept (≤4 words of text)
"NEVER WRITES" in giant amber type over a glowing glass ring with three lit chips coming out; a small pink "68%" warning badge in the corner.

## Caption / description
Jev, from TypeSafe AI, never writes text. You ask it questions and it returns typed answers (a label, yes/no, a score) with a confidence for each, so your code can act on them.
TypeSafe's own numbers: about a tenth of a second per answer, $0.042 per million input tokens, output free.
An independent study labelled 7,977 items for $0.21 with Jev, against $0.34 to $62.99 for 19 LLMs, but Jev trailed the best LLM on 14 of 15 tasks.
The smart setup is a cascade: Jev takes the confident calls and escalates the unsure ones to an LLM. One university test kept 99.6% of GPT-6's accuracy at 47% of the cost.
Speed and price are TypeSafe's claims; the accuracy figure is agreement with frontier-model answers on TypeSafe's own benchmark. The support ticket shown is illustrative.

## Chapters (long-form)
n/a (reel)

## Sources (for the description / pinned comment)
- [S1] TypeSafe AI, Jev product page: https://typesafe.ai
- [S2] Pricing, TypeSafe + Layer3 Labs guide: https://www.layer3labs.io/guides/jev-pricing
- [S3] Latency, InfoWorld: https://infoworld.com/article/4223468/typesafe-ais-new-models-work-with-machines-not-humans.html
- [S3] Independent latency runs, DEV Community: https://dev.to/aws-builders/jev-after-eight-days-of-independent-tests-level-with-mid-price-llms-behind-the-frontier-1c60
- [S4] 67.8% vs 74.1% agreement on TypeSafe's benchmark, Vals AI: https://vals.ai/blogs/independent-evaluation-of-jev
- [S5] Ibrahim & Zaki, "Evaluating Decision Models for Text Annotation in Computational Social Science", arXiv 2609.24574: https://arxiv.org/abs/2609.24574
- [S6] Li et al. (Carnegie Mellon), "JEV-as-a-Judge: Accept When Confident, Escalate When Unsure", arXiv 2609.26550: https://arxiv.org/html/2609.26550v1
- [S8] "Zero hallucinations" claim, TypeSafe: https://typesafe.ai
- [S9] How to get access (OpenRouter / Vercel AI Gateway): https://flaviocopes.com/jev-api-key/

## Hashtags
#AI #LLM #Jev #TypeSafe #AIengineering #MachineLearning #DevTools #Shorts

## Pinned comment (invites replies)
Jev decides, the LLM writes. Which part of your app would you hand to a decision model first: support routing, moderation, or lead scoring? 👇 (All sources are in the description.)

## Repurposing (long-form moments → reels)
- The cascade beat (s10–s11) works as a standalone 20 s "how to use cheap models safely" Short.
- The "valid ≠ right" beat pairs with the Laya reel's catch for a "decision models: what can go wrong" compilation.

