# NxtWave AI Session Teaching Guidelines

**What this is:** the teaching rules behind NxtWave's AI YouTube sessions, taken from how the published videos were actually taught, together with the house TR-doc format. Use it to plan, write and review any new session: the TR doc, the on-camera script and the notebook.

**Derived from (Sept 29, 2026):**
| Code | Video | Length | Transcript |
|---|---|---|---|
| **RAG** | RAG & Agentic RAG – Simply Explained (Sep 2025) | 33:28 | `../reference/transcripts/01-rag-agentic-rag.txt` |
| **MCP** | MCP: The Missing Link Between AI and Action (Jun 2025) | 24:41 | `../reference/transcripts/02-mcp-missing-link.txt` |
| **N8N** | Build your own AI agents – No Code with n8n & Gemini (Jun 2025) | 58:31 | `../reference/transcripts/03-n8n-gemini-ai-agents.txt` |
| **TR** | House TR docs: `~/TR Docs/created_tr_docs/building-llm-applications--build-your-own-mcp-server.md`, `…--33-building-memory-agents-long-term-memory.md` | — | — |

Timestamps like `RAG 05:39` point into the transcripts. **Applies to:** `TR` = the Trainer Reference doc, `SC` = the on-camera script / delivery, `NB` = the notebook / hands-on.

---

## Part 0: The ground rule — every YouTube session is standalone

> **Each YouTube session is complete on its own.** A viewer who has never seen another NxtWave video must be able to follow it, build the project and reach the outcome using only what is taught *inside* the session.

| ID | Rule | Applies to |
|---|---|---|
| S1 | **No dependencies on other videos.** No "as we saw last time", "remember our n8n episode", "in the previous session", and no "Where This Session Sits" table built on earlier videos | TR, SC, NB |
| S2 | **Teach every prerequisite in the session, briefly, at the moment it is first needed.** For example, a three-row "terms we will use" table (API, JSON, API key), or a one-minute "what is an LLM" before building on it | TR, SC |
| S3 | **Hooks and analogies come from everyday life, not from other videos.** A scam SMS, IPL, JEE or DRS works for every viewer; a callback to an old episode doesn't | TR, SC |
| S4 | **Evidence is produced inside the session.** If the point is "LLMs can be unreliable", show it live in this session's notebook rather than citing another video | TR, SC, NB |
| S5 | **Mentioning other videos is fine only as optional extras** (end card, description, "if you want to go deeper") and never as something needed to follow along | SC |

The three reference videos already work this way. Each one re-teaches its own basics: RAG explains what an LLM does before RAG (03:47); n8n explains LLMs, prompting and APIs from scratch (06:05–19:41). The house TR docs are written for a **course**, so they open from the previous unit. For YouTube, replace that opening with an everyday moment (see Part D).

---

## Part A: The session arc

Every session follows the same eight-beat story. Each beat hands off to the next, and none of them may drift from the **one session outcome** stated in beat 1.

| # | Beat | What happens | Evidence |
|---|---|---|---|
| 1 | **Hook** | A relatable pain in the second person, then a promise of what you'll be able to do | RAG 00:13 · MCP 00:00 · N8N 00:00 |
| 2 | **Host + roadmap** | "Hi, I'm X. Today we…", then the sections listed in order | RAG 01:03–02:13 · MCP 00:43 · N8N 00:55–01:36 |
| 3 | **Why: the problem** | The limitation or pain, shown before the solution is named | MCP 01:06 · N8N 11:43–14:12 · RAG 03:47 |
| 4 | **What: the concept** | Intuition and analogy first, then a numbered breakdown, then the formal definition | RAG 02:26–05:52 · MCP 04:11–05:28 |
| 5 | **How: under the hood** | The components and the step-by-step flow | RAG 06:06–08:17 · N8N 17:19–21:45 |
| 6 | **Hands-on** | Say what we'll build, then build it step by step, each addition fixing a visible failure | RAG 08:26 · MCP 11:46 · N8N 23:34 |
| 7 | **Reality check** | Challenges, comparisons and best practices learned from the build | RAG 21:28 · RAG 25:53 · N8N 51:13–57:20 |
| 8 | **Recap + CTA** | What we covered, encouragement, and "comment what you want next" | RAG 32:41 · MCP 23:02 · N8N 57:22 |

**Time split in the published videos:** theory took 40–70% (the n8n build started at 23:34 of 58:31). That is the biggest retention risk, so see rule **C1**.

---

## Part B: Rules derived from the videos

### B1. Hooks and openings
| ID | Rule | Evidence | Applies to |
|---|---|---|---|
| H1 | **Open on a pain the viewer has personally felt**, in the second person ("you"), before any title card or intro music | RAG 00:13 "Got an assignment… drowning in tabs"; MCP 01:12 "Have you ever used ChatGPT and tried to…" | SC, TR |
| H2 | **Contrast today with the imagined better world** ("But imagine this instead…") | RAG 00:33 "But imagine this instead. An AI that understands your goals…" | SC, TR |
| H3 | **Promise a concrete outcome you build, not just learn**: "by the end you'll actually build one yourself" | N8N 00:11; MCP 00:19 "we are going to build stuff"; RAG 02:00 "it's not just theory" | SC, TR |
| H4 | **Name the concept as the answer to the pain** ("That's where X comes in") | RAG 00:41 "That's where agentic RAG comes in"; MCP 04:07 "Now enter MCP, the hero of today's session" | SC, TR |
| H5 | **Give a roadmap straight after the hook** (sections in the order they'll come) | RAG 01:09–02:13; N8N 00:55–01:36 | SC, TR (as Key Takeaways + "How we get there") |
| H7 | **Use the hook formula: paradox → proof → stakes → secret.** Open on a surprising contradiction ("This AI can't write a single word"), prove it with a visual and a real number ("…yet it finished 100 messages before the chatbot"), raise the stakes (scam SMS that empty bank accounts), then promise a reveal the session pays off ("it has one dangerous flaw, and we'll find it"). A relatable pain alone (H1) is not enough. It has to create a **curiosity gap** | Reviewer feedback on the Jev draft (2026-09-29): the "scam SMS + race" hook "is not catchy as expected" | SC, TR |
| H6 | **Lower the fear**: "Don't worry, we'll keep it simple"; jargon is announced and defused | RAG 06:16; MCP 00:11 "it's not that deep… well, actually, it's kind of deep, but we'll make it simple"; MCP 05:28 "don't let these tech terms scare you" | SC, TR |

### B2. Explaining concepts
| ID | Rule | Evidence | Applies to |
|---|---|---|---|
| E1 | **Problem before solution.** Show what breaks first, then introduce the idea that fixes it | MCP 01:06 "before we jump into what MCP is, we got to first understand what problem it solves"; N8N 17:11 "address one major limitation… then we'll arrive at what agents are" | TR, SC |
| E2 | **Teach the prerequisite inside the session before building on it** ("before agentic RAG, let's understand regular RAG"). Never point to another video for it (S1–S2) | RAG 02:15; N8N 06:05 "before we start building agents, let's quickly understand what an LLM is" | TR, SC |
| E3 | **One everyday analogy per abstract idea**, from ordinary life | Librarian (RAG 02:57), notebook (RAG 03:07), pizza slices (RAG 06:46), filing cabinet (RAG 07:17), a book-smart friend (MCP 01:36), Lego and duct tape (MCP 03:08), every tool speaking a different language (MCP 03:49), USB-C (MCP 04:34), app store (MCP 07:08), a human assistant booking a Bali trip (N8N 02:04) | TR, SC |
| E4 | **One Indian running example, carried from theory into the hands-on** | IPL 2025 playoffs runs through RAG (02:28 → 04:36 → 07:30 → 22:41 → hands-on 29:03); JEE Mains (N8N 08:16); "big fat Indian ___" (MCP 02:12) | TR, SC, NB |
| E5 | **Break every mechanism into numbered steps, and say the numbers aloud** | RAG 02:40 "three steps: retrieve, augment, generate… Step one…"; RAG 06:29 load/split/embed/store; MCP 04:56 "four main things"; N8N 21:08 LLM, tools, loop, memory | TR, SC |
| E6 | **Before/after comparisons with concrete outputs**, not adjectives | RAG 04:36 IPL answer without vs with RAG; RAG 25:57 traditional vs agentic RAG; N8N 53:02 workflows vs agents | TR, SC |
| E7 | **Intuition first, formal definition second**, then unpack the definition | RAG 05:41 (definition *after* the IPL example); N8N 01:47 the Google definition, then "let's unpack it a bit" | TR |
| E8 | **Demonstrate the limitation live** in a real tool before fixing it | N8N 07:43 strawberry; 08:16–09:51 JEE question wrong twice; 11:48 "10.11 > 10.9"; 12:52 knowledge cutoff; RAG 27:58 agent says "no real-time data" | SC, NB, TR |
| E9 | **Mini-recap at the end of each major section** ("So let's have a quick recap…") | RAG 05:39; RAG 05:27 "Here's a simple summary"; N8N 14:24 "just to summarize what we have learned till now" | TR, SC |
| E10 | **Bridge every section to the next with a question or a gap** | MCP 02:38 "So what did developers do?"; RAG 21:57 "These challenges show us one thing clearly… That's exactly where agentic RAG comes to the rescue"; N8N 32:41 "What is next? Tools" | TR, SC |
| E11 | **Conversational check-ins and light humour** keep the tone friendly | "See the difference?" (RAG 05:05), "Pretty neat, right?" (RAG 08:17), "Exhausting, right?" (MCP 04:07), "sounds a bit like a Marvel villain" (MCP 00:47) | SC only (the TR doc stays in document voice) |
| E12 | **Define every term that's new to the audience, the first time it appears**, even basics like API and API key | N8N 17:38 "APIs are application programming interfaces…"; N8N 24:53 explains what an API key is and why it exists | TR, SC |

### B3. Hands-on
| ID | Rule | Evidence | Applies to |
|---|---|---|---|
| P1 | **State the build before building**: what we'll make, and the order of the steps | RAG 08:26 "we are going to develop three different RAG applications…"; MCP 11:46; N8N 23:34 "Here's how we are going to go about it…" | TR, SC |
| P11 | **Teach only the code that carries the session's idea; hide the plumbing.** Put setup, timing, scoring, charts and the UI in a helper file (e.g. `jev_helpers.py`) that the notebook downloads. Mark cells 🧑‍🏫 **Teach** (read line by line) vs ▶️ **Just run** (run it, talk only about the result). Aim for ≤ ~40 taught lines. For a "new model" session, the taught code is **the swap**: the old call vs the new call, side by side | Reviewer feedback on the Jev draft (2026-09-29): "the code part is very difficult… we do not need to teach whole code, instead… the part where we can use Jev instead of regular LLM" | NB, TR, SC |
| P2 | **Beginner-accessible tools on free tiers**; nothing a student can't run | Langflow (RAG), Cursor + Composio (MCP), n8n + Gemini's "pretty decent free tier" (N8N 26:03) | NB, TR |
| P3 | **Build incrementally. Get the bare version working, test it, then add one capability at a time**, each one motivated by a failure you just saw | N8N 23:42 "build the agent without connecting any tools… then bring in Google Calendar tools"; RAG 27:13–32:15 agent with no tools → add URL → add search API, each after a failed question | NB, TR |
| P4 | **Map each hands-on piece back to the theory** ("as discussed earlier…") | RAG 09:33 "as discussed earlier, for a RAG assistant you have two different flows"; N8N 32:36 "we connected our LLM, the memory, the agentic loop… what is next? Tools" | TR, SC |
| P5 | **Keep real errors on camera and turn each one into a lesson** | RAG 16:21 missing connection; MCP 21:03 tool error then retry; N8N 37:44 parallel tool calls fail → add an instruction to the system prompt (39:00); N8N 45:03 weaker model asks for event IDs → a lesson about model choice | SC, TR |
| P6 | **Normalise debugging** ("Debug, learn, try again") | MCP 23:36 "that's how real devs roll. Debug, learn, try again" | SC, TR |
| P7 | **Verify the effect in the real world**, not just in the tool's output | N8N 36:39 opens the calendar to check; MCP 21:56 refreshes the inbox; RAG 14:09 checks the DB collection | NB, SC |
| P8 | **Setup details go in a description doc**, not on screen | MCP 12:16 "instructions will be provided in the document in the description" | SC |
| P9 | **After the build, extract production lessons**: reliability, trade-offs, what to watch | N8N 51:13–57:20 reliability, workflows vs agents, observe and iterate, write tool descriptions; RAG 21:28 challenges of RAG | TR, SC |
| P10 | **End the hands-on with extension ideas** ("endless possibilities") | MCP 22:40 LinkedIn jobs, Slack; RAG 32:17 publish as an API or embed on a site | TR, SC |

### B4. Closing
| ID | Rule | Evidence | Applies to |
|---|---|---|---|
| X1 | **Recap the session as a list of what we learned and built** | N8N 57:22; MCP 23:05 "You didn't just sit through a theory class…" | TR, SC |
| X2 | **Affirm the learner**: effort, pride, "the best way to learn is by doing" | MCP 23:58 "take a second to be proud"; N8N 58:05 "get your hands dirty, pick a use case, and start building" | SC, TR (as a challenge) |
| X3 | **CTA: like, subscribe, bell, and "comment what we should explore next — we'll pick your idea"** | RAG 33:03–33:18; MCP 24:19; N8N 58:13 | SC |


### B5. YouTube style (not a lecture)
| ID | Rule | Evidence | Applies to |
|---|---|---|---|
| Y1 | **Frame the session as a story, e.g. an investigation of a claim**, not a list of topics. For a new model or tool, test its makers' headline claims and end on a verdict | Reviewer feedback on the Jev draft (2026-09-30): "more youtube styled rather than regular teaching session"; the top Jev videos end on a verdict | TR, SC |
| Y2 | **Chapter titles are questions or teases**, never topic labels ("So… is ChatGPT dead?", not "Will it replace LLMs") | Kallaway / Aprilynne Alter hook research; top video chapter lists | SC, TR |
| Y3 | **One open loop across the whole video**, set in the first 30 s and paid off late ("one of these claims doesn't survive") | MrBeast production guide: the first minute must prove the thumbnail's promise will be kept | SC, TR |
| Y4 | **A re-hook at the end of every chapter**, so the next one feels necessary | Retention pattern in the high-view explainers | SC, TR |
| Y5 | **Lead the hook with the subject people searched for** (e.g. Jev), not the project. The project is how we test the subject | Reviewer feedback (2026-09-30): "the hook should be target about the Jev and not the project" | SC, TR |
| Y6 | **Face + screen, first person, a visual change every 5–10 s**; show (montage, race timer, slider) rather than lecture over slides | Hook research; creator formats | SC |
| Y7 | **Recommended order for a new-model video:** hook → why the hype → how it's different → will it replace X? → demo (by ~30%) → where it helps → the catch → rival/alternatives → verdict | Structure study of the 13 highest-view Jev videos (Sept 2026) | SC, TR |

---

## Part C: Rules to improve on (lessons from reviewing the three videos)
Things the published videos did that we should **not** repeat.

| ID | Rule | What went wrong | Applies to |
|---|---|---|---|
| C1 | **Show the finished result within the first 20–60 seconds, and keep theory to ≤ 25–35% of the runtime** | The n8n video spent 23 of 58 min before the build; RAG spent about 50% on theory | SC, TR |
| C2 | **Never record setup waiting.** Do signups, installs and DB provisioning beforehand, then cut or speed up the rest | Cursor install (MCP 09:41–10:31), n8n signup and survey (N8N 23:53–24:36), DB still initialising (RAG 11:35–12:00) | SC |
| C3 | **No overclaims.** Don't say "won't hallucinate", "guaranteed" or "100%" | RAG 23:52 "it won't hallucinate" is false | TR, SC |
| C4 | **No PII or keys on screen** | MCP 20:20 reads a personal Gmail address aloud; API-key pages shown | SC |
| C5 | **Measure, don't just demo.** Put at least one number on screen (cost, latency, accuracy) and keep a small labelled test | None of the three measured anything | NB, TR |
| C6 | **Titles and hooks name an outcome or a conflict**, not "Simply Explained" | 1.0k–1.7k views despite a 3–5% like rate, so reach is the problem | SC |
| C7 | **Upload corrected captions** | Auto-captions produced "rack" for RAG, "Nin" for n8n and "Kurser" for Cursor | SC |
| C8 | **Pin versions and state the recording date** | The videos use Gemini 2.5 / 2.0 Flash, the 2025 MCP setup and the old Cursor UI, and now look dated | NB, TR |
| C9 | **Vendor numbers are claims; our numbers come from our own run** | — (a new standard for newsjacking topics) | TR, SC |

---

## Part D: House TR-doc format (from `~/TR Docs/created_tr_docs`)
1. **Header:** `# <Title> - V1`, then `**Course:**` (or `**Series:**`) and `**Topic:**`, then `---`.
2. **`**Key Takeaways:**`** as a bold bulleted list of the section titles (nested for steps), then `---`.
3. **`## Introduction`** opens from a concrete moment, then states the gap as a bold one-line question in a `>` quote. In the **course** TR docs that moment is the previous unit's code. For **YouTube sessions** it must be an everyday moment the viewer has lived (S1, S3), followed by a short "terms we will use" block that teaches any prerequisites (S2).
4. **`## The Problem: …`**: a concrete artifact (code or a dialogue) that fails, plus a **comparison table** that diagnoses why.
5. **`### Where This Session Sits`** (course TR docs) places the unit after the previous ones. **YouTube sessions replace it** with a standalone context table such as "Where X fits" (e.g. chat model vs agent vs decision model), which needs no other video (S1).
6. **Concept sections** (`##` / `###`): short paragraphs, tables over prose, a **bold key line in a `>` quote** per section, `<MultiLineNote>` for side details and `<MultiLineWarning text="…">` for risks.
7. **`## What We Are Building`** followed by **`### How We Get There`**: a *question → answered by step* table. This is the teaching spine.
8. **Continuous numbered steps** (`### Step N: …`), each with a code block labelled by where it goes (`**server.py — add below X**` / `**Notebook — Step N**`), bullets explaining the non-obvious lines, expected output, and **a closing bridge sentence** into the next step.
9. **Callouts at the moment of need:** why a flag is there, common failures ("If it fails, run… first").
10. **`## What Changed`** returns to the opening artifact and shows before/after, with a table and a final bold key line.
11. **Final code** in `<details><summary>…</summary> … </details>`.
12. **`## Going Further`**: optional depth for later.
13. **`## When Should We …?`**: a decision framework (table plus a numbered rule list) and one closing line.
14. **Diagrams:** PNGs in `assets/` referenced from markdown (no inline SVG; the CMS strips it), or `**Image Block:**` with a `**Title**` and a `**Prompt**` for Napkin-style generation.
15. **Voice:** short sentences, second person plural ("we"), document tone. Chatty check-ins belong in the script, not the TR doc.

---

## Part E: Quick checklist for any new session
**Standalone**
- [ ] No reference to any other video is needed to follow along (S1, S5)
- [ ] Every prerequisite term is taught inside the session at first use (S2)
- [ ] Hooks, analogies and evidence all come from inside the session or from everyday life (S3, S4)

**Story**
- [ ] One session outcome, stated in the hook and delivered by the final step (H3, X1)
- [ ] The hook follows paradox → proof → stakes → secret and opens a curiosity gap that the session pays off (H7)
- [ ] The hook is a personal pain, then "imagine", then "that's where X comes in" (H1, H2, H4)
- [ ] The finished result is previewed early (C1)
- [ ] One Indian running example, used from the hook through to the app (E4)

**Teaching**
- [ ] Problem shown (live, if possible) before the concept is named (E1, E8)
- [ ] Prerequisite recapped before building on it (E2)
- [ ] An everyday analogy for each new idea (E3)
- [ ] Numbered steps for each mechanism (E5); a before/after with concrete outputs (E6)
- [ ] Intuition → definition order (E7); every new term defined at first use (E12)
- [ ] A mini-recap at the end of each major section (E9); a bridge into the next (E10)
- [ ] A reassurance line where the difficulty jumps (H6)

**Hands-on**
- [ ] Only the idea-carrying code is taught (≤ ~40 lines); plumbing lives in a helper file; cells are marked 🧑‍🏫 / ▶️ (P11)
- [ ] The build plan is stated first (P1); free, beginner-friendly tools (P2)
- [ ] Bare version first, then one capability at a time, each fixing a visible failure (P3)
- [ ] Each step mapped back to the theory (P4); real errors kept and explained (P5, P6)
- [ ] Real-world effect verified (P7); at least one measured number (C5)
- [ ] Production lessons (P9) and extension ideas (P10)

**YouTube style**
- [ ] Story frame (e.g. an investigation) with a verdict (Y1); chapter titles as questions or teases (Y2)
- [ ] One open loop set before 0:30 and paid off late (Y3); a re-hook at every chapter end (Y4)
- [ ] The hook leads with the subject people searched for, not the project (Y5)

**Close and quality**
- [ ] A recap list (X1), affirmation / a challenge (X2), and the CTA with "comment what's next" (X3)
- [ ] No overclaims (C3); vendor numbers labelled as claims (C9); versions pinned and date shown (C8)
- [ ] No setup waiting on camera (C2); no PII or keys (C4); captions corrected (C7)
