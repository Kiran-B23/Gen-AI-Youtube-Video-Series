# Script vs Video: How NxtWave Scripts Were Actually Delivered

**What this is:** a comparison of two approved scripts against the videos recorded from them, to learn how presenters use a script and what that means for how future scripts should be written.
**Inputs:** `../reference/scripts/rag-script.md` ↔ `../reference/transcripts/01-rag-agentic-rag.txt` (33:28) · `../reference/scripts/a2a-script.md` ↔ `../reference/transcripts/04-a2a-explained.txt` (11:13). Word counts use the auto-captions, so they're approximate. Analysed Sep 30, 2026.

---

## 1. At a glance

| | RAG | A2A |
|---|---|---|
| Script length | 2,826 words (a `<<HANDS-ON>>` placeholder, not scripted) | 1,986 words (a `<Hands-on>` placeholder with a 116-word lead-in) |
| Video length | 33:28 | 11:13 |
| Spoken words, theory | ~2,410 (two blocks) | ~950 (intro + concepts) |
| Spoken words, hands-on | ~2,570 (two blocks), **unscripted** | ~830, **unscripted** |
| Share of the scripted theory delivered | **~90%**, mostly word for word | **~40%**, the rest cut or condensed |
| Order vs script | Hands-on **split in two and moved earlier** | Hands-on **moved to the front**, with the theory after it |
| Added in the room | A two-part example question; hands-on narration | Task, client/remote agent and agent-card definitions; hands-on narration |

---

## 2. RAG: section by section

| Script section | In the video | What changed |
|---|---|---|
| Hook ("drowning in tabs") | 0:13–0:52, word for word | — |
| Intro and agenda | 1:03–2:15, word for word | The agenda promises "blending information" and "personalizing", which were later cut (see Challenges) |
| What RAG is (retrieve / augment / generate, with the librarian and notebook analogies) | 2:15–3:43, word for word | — |
| With vs without RAG (IPL example) | 3:43–6:03, word for word | — |
| Under the hood (load/split/embed/store; question → retrieve → prompt → LLM) | 6:03–8:20, word for word | Step 5 "Answer output" merged into Step 4 |
| — | **8:20–21:19: hands-on part 1**, unscripted | **Moved here.** The script put all hands-on after all the theory |
| Challenges (4 listed) | 21:28–22:08 | **Only 2 of 4 kept.** Blending and personalisation were dropped, but the intro still promises them |
| What agentic RAG is (IPL, DB1/DB2) | 22:08–24:07 | **Question made two-part** ("…and what are the fixtures?") to fit the "two-part query" logic. **The DB1/DB2 introduction was cut, but they're still referred to later.** The final answer drops the fixtures the question asked for |
| Components and workflow (IPL 2024) | 24:09–25:26, word for word | "Let's talk about last year's IPL" dropped |
| Why agents matter (4 benefits, explained) | 25:26–25:51 | **Compressed** to one sentence listing the four words |
| Traditional vs agentic | 25:51–26:36, word for word | — |
| — | **26:36–32:39: hands-on part 2**, unscripted | Agent with no tools → URL tool → search tool |
| Outro and call to action | 32:39–33:20, word for word | — |

**Carried over from the script unchanged:** *"It won't hallucinate — it'll just say sorry…"*. This overclaim was written into the script; it wasn't an ad-lib.

## 3. A2A: section by section

| Script section (words) | In the video | What changed |
|---|---|---|
| Hook ("you wake up… your apps did it") | 0:00–0:45, word for word | — |
| Intro | 0:56–1:15, **first 3 sentences only** | "a new open standard" became "**a new development from Google**" (attribution added). Then it jumps straight to the script's *hands-on* lead-in line ("Okay, ready? Let's build some magic") |
| — | **1:17–6:31: hands-on**, unscripted | **Moved to the front.** Google's A2A repo → `python-a2a` → an agent-card server → a UI network with a research agent and a question agent for interview prep |
| The basics: what an agent is | 7:00–8:00, condensed | The James Bond joke is kept and the cricket agent dropped. The movie example is kept, minus the "pause online classes" line |
| What A2A is (share / ask / work together) | 8:00–8:27, condensed | The **rulebook** and "10 countries, one language" analogy from "Breaking down" is used instead |
| **[NEW TECHNICAL INFO] #1**: JSON-RPC, Agent Cards, task workflows, modalities, security (292 words) | **Cut entirely** | Replaced (at 9:37–10:26) by three **simple definitions not in the script**: *task*, *client vs remote agent*, *agent card = a digital business card (a JSON document)* |
| Breaking down (capability, request/response, shared context) | **Cut** | — |
| A2A in action (weekend trip) | 8:27–9:00, word for word | — |
| **[NEW TECHNICAL INFO] #2**: opaque execution, business benefits (149 words) | **Cut entirely** | — |
| A2A vs now | 9:00–9:37, condensed | The Notion/Calendar/Spotify list dropped. **The MCP comparison was kept, including "the Model Context Protocol we talked about in our earlier video"** |
| Visualizing (app superheroes) | **Cut** | — |
| **[NEW TECHNICAL INFO] #3**: built on HTTP, JSON, SSE (113 words) | **Cut entirely** | — |
| Hands-on lead-in ("You'll code one agent… make them shake hands") | Only its last line was used, at 1:15 | The promise of *coding* two agents became a UI demo with prompts; no agent code is written |
| Outro | **Split:** its opening lines became the *bridge* into the concepts (6:38), and its closing lines close the video (10:26–10:47) | Reused as transitions |

**Problems the reordering caused:**
- **A broken back-reference.** At 3:24, "*we discussed that client agent looks into JSON format*", but client agents and JSON are only explained at 10:00–10:26.
- **The hook's promise is thin.** The hook imagines apps co-ordinating your day; the demo is two prompt-chained agents in a UI.

---

## 4. Patterns across both videos

| # | Pattern | Evidence |
|---|---|---|
| 1 | **The spoken, sayable parts survive word for word:** hooks, analogies, example stories, outros | Both hooks and outros are verbatim; the IPL, librarian, pizza, James Bond, movie-night and weekend-trip passages are all kept |
| 2 | **Dense technical passages are the first cut.** Presenters swap jargon lists for 2–3 plain definitions | All 3 A2A `[NEW TECHNICAL INFO]` blocks (554 words) were cut; RAG's "why agents matter" was compressed to one line |
| 3 | **The hands-on is never scripted,** and it's the longest part of the video | RAG ≈ 50% of spoken words, A2A ≈ 46%; both were `<<HANDS-ON>>` placeholders. This is where the dead air, setup waiting and live errors came from |
| 4 | **Presenters move the hands-on earlier than the script puts it** | RAG split it in two, starting at 25% instead of after all the theory; A2A put it first, at 11% |
| 5 | **Scripts are written longer than the slot** | A2A: ~1,500 words of theory scripted, ~800 spoken. At ~150 words per minute, the script's theory alone needed ~10 of 11 minutes |
| 6 | **Cuts leave loose ends** | RAG: agenda promises for cut challenges; DB1/DB2 used but never introduced; fixtures asked for but not answered. A2A: "we discussed" before it was discussed |
| 7 | **Presenters fix the script's logic on the fly** | RAG: the two-part question; A2A: "from Google" attribution added and simple definitions put in place of jargon |
| 8 | **Scripted claims and cross-references reach the video unchecked** | RAG: "it won't hallucinate"; A2A: "we talked about in our earlier video" |
| 9 | **Transitions get improvised from other parts of the script** | A2A used the outro's opening lines as the bridge from hands-on into theory |

---

## 5. Rules for writing scripts (from this analysis)

| ID | Rule | Fixes pattern |
|---|---|---|
| W1 | **Script the hands-on beat by beat.** For each step: what's on screen, what's said, the expected output, and what to say if it fails. Never use a single placeholder | 3 |
| W2 | **Put the demo where presenters will want it anyway:** a first hands-on moment by ~25% of the runtime, interleaved with the theory | 4 |
| W3 | **Budget words per chapter at ~150 words per minute** and check the total fits the slot before recording | 5 |
| W4 | **Write every line to be spoken:** short sentences, one idea each, an analogy or example for every concept. Mark dense material as `[OPTIONAL]` so it's cut on purpose, not in a panic | 1, 2 |
| W5 | **Define 2–3 core terms plainly** (as the A2A presenter did with task, client/remote agent, agent card) instead of listing specs | 2 |
| W6 | **Keep a promise ledger.** Every item the hook or agenda promises must map to a section that delivers it, and the ledger is re-checked after any cut | 6 |
| W7 | **Run a reference check after reordering.** No "as we discussed" or "remember" before the thing has happened | 6, 9 |
| W8 | **Review claims before recording.** No "won't hallucinate", "guaranteed" or "100%" unless sourced and qualified | 8 |
| W9 | **No references to other videos** (standalone rule S1). Other videos are mentioned only on the end card or in the description | 8 |
| W10 | **Write the transitions explicitly** (re-hooks), so the presenter doesn't borrow from other sections | 9 |
| W11 | **Do a table read with the presenter** before recording, to catch the logic gaps they would otherwise fix live | 7 |
