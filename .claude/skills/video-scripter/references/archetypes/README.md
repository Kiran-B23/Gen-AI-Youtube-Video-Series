# Archetypes: pick the structure that answers the viewer's real question

One structure can't fit every topic. A mechanism, a launch, a tutorial, a comparison and a myth each
need a different flow, a different hook, a different running example and different visuals. Every
package picks **one primary archetype** in the brief, confirms it after the YouTube analysis, and writes
the script from that archetype's beat sheet.

All archetypes share one backbone:
**hook (opens a loop) → only the context the payoff needs → payoff → end fast** (CTA within ~3 s of the payoff).
What changes is the middle.

## Chooser
Ask: *what question does the viewer have when they tap this video?* Then match:

| The viewer is asking… | Topic signals | Archetype | File |
|---|---|---|---|
| "How does X actually work?" / "What is X?" | a concept, a mechanism, "explained", "what is", "how … works" (a neutral *question* about how something works) | **Concept** | `concept.md` |
| "What is this new thing, and should I care?" | a new model, feature or tool; "just launched", "new", "released" | **Launch** | `launch.md` |
| "How do I do it?" | **imperative** "build", "set up", "make", "automate X", "step by step", "with <tool>" | **Tutorial** | `tutorial.md` |
| "Which one should I use?" | "vs", "best", "compared", "which", 2+ named tools | **Comparison** | `comparison.md` |
| "Is what I believe true?" | **the topic is itself a claim stated as fact** that many people believe ("AI reads your words", "more parameters = smarter"), or "doesn't", "myth", "stop doing" | **Myth-buster** | `myth-buster.md` |
| "What can I do better today?" | "tips", "tricks", "hacks", "mistakes", a number of items | **Tips** | `tips.md` |
| "Am I exposed?" | "risk", "danger", "attack", "leak", "scam", "privacy", "injection" | **Risk** | `risk.md` |
| "What can this do for me?" | **first person, past tense** "I built", "I automated", "we replaced", a case study, a result with numbers | **Story** | `story.md` |
| "Where is this going?" | "future", "replacing", "dead", "bubble", "will", an industry shift | **Trend** | `trend.md` |

### Tie-breakers
- **Same verb, two rows:** imperative ("automate your invoices") → Tutorial; first person past ("I automated
  my invoices") → Story.
- **A statement vs a question:** a topic phrased as a flat claim ("AI reads your words") → Myth-buster
  (the video tests the claim); the same idea phrased as a question ("how does AI read text?") → Concept.
- **Concept vs the 45 s variant:** "what is X" / "X explained in a minute" → the **"X in 45 s"** variant;
  "how X works" → the standard Concept sheet.
- "actually" alone isn't a Myth signal ("3 tricks that actually work" is Tips). The **number of items** wins.
- **No row matches:** infer the viewer's question from the research and the YouTube winners, pick the archetype
  that answers it, and write "inferred" plus the reason in `brief.md`. Ask the user only if two archetypes
  would make clearly different videos and the research doesn't settle it.
- The topic wording and the viewer's question disagree? **Follow the question.** "GPT-x tokenizer" is a
  Launch only if what changed is the story; if people mostly don't understand tokens, it's a Concept.
- The YouTube analysis shows one archetype clearly winning for this topic (most top-reach videos use it)?
  Prefer it, unless the gap you found is better served by another. Write the reason in `brief.md`.
- **Definition topics** ("what is MCP") are Concept, using its **"X in 45 s"** variant.

### Hybrids
Keep **one primary** archetype for the flow. A **secondary** may add **one beat only**, for example:
- a Launch + one comparison round;
- a Concept + one myth beat as the hook;
- a Tutorial + one risk warning at the gotcha.

Never merge two full beat sheets.
The default secondary is **none**. Add one only when the topic itself asks for it ("…and how it compares", "…and is it safe?") or the YouTube gap analysis calls for it.

## Visual tags (every script beat carries one)
The tag tells `/video-studio` which scene to build. Pick the tag that *shows* the line, not one that only decorates it.

| Tag | Shows | Studio scene |
|---|---|---|
| `[TITLE]` | a short headline (the hook, a section) | `title` |
| `[NUMBER]` | one striking number, counting up | `counter` |
| `[VS]` | this vs that: two columns, or two giant numbers | `compare` / `duel` (numbers) |
| `[VERDICT]` | a 2–4 word stamp (a verdict, the catch) | `stamp` |
| `[LIST]` | 2–4 items the voice names | `points` |
| `[RECAP]` | the save-worthy chain of steps before the CTA (explanations) | `recap` |
| `[CODE]` | ≤ 10 lines of real code | `code` |
| `[ANIMATE]` | a mechanism in motion (Manim) | `media` + Manim |
| `[SCREEN]` | a product, site or UI being used | `media` + Playwright |
| `[TERMINAL]` | a command running | `media` + VHS |
| `[CTA]` | the ending question / follow | `cta` |

Long-form adds 🎥 (presenter on camera) and 🎞️ (B-roll). The reel engine doesn't use these yet.

## Length
The beat sheets show the ~45 s core. For a longer Short (up to 3 min, only when the content needs it), expand the
middle (more mechanism steps, rounds, tips, evidence) and keep the hook and CTA tight. Add a re-hook every 30–40 s.

## Each archetype file has
Signals · the viewer's question (and when it counts as answered) · best hooks · running example ·
**reel beat sheet** · explainer outline · session variant (Tutorial and Concept only) · tone (→ voice style) ·
must-haves · don'ts · a worked mini example.

## Sources (structure conventions, not lines)
Practitioner guides; their retention numbers are directional only:
- [faceless.so: short-form storytelling frameworks](https://faceless.so/blog/short-form-video-storytelling-frameworks)
- [faceless.so: script guide for watch time](https://faceless.so/blog/short-form-video-script-guide-for-better-watch-time)
- [hooked.so: how to script a video](https://www.hooked.so/blog/how-to-script-a-video)
- [Subscribr: scripting YouTube Shorts](https://subscribr.ai/p/scripting-youtube-shorts-engagement)
- [OutlierKit: YouTube script template](https://outlierkit.com/resources/youtube-script-template/)
- [Opus: Shorts length and retention](https://opus.pro/blog/ideal-youtube-shorts-length-format-retention)
- [CapCut: the 60-second story arc](https://www.capcut.com/create/short-form-video-storytelling-60-second-arc)

Each topic's real evidence comes from its own YouTube analysis (`inspiration.md`).
