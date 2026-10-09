# Style rules (from the user's feedback; these override generic habits)

## Voice
- Spoken, conversational English for a **global** tech audience. Short sentences. Contractions.
- Write for an **enthusiastic human creator**, not a narrator. Add delivery cues in brackets:
  `[excited]`, `[beat]`, `[slow down]`, `[smile]`, `[whisper]`.
- "You" > "we" > "I". Talk to one person.
- One idea per sentence. If a line needs a second sentence to justify it, cut or split it.

## Content
- **Hook first.** No greetings, no channel intro, no "in this video".
- **No trivia:** skip launch dates, venues, HQs, funding minutiae, version numbers, unless they're the story.
- **Viewer value test** on every line: "so what for the viewer?".
- **One running example**, introduced early and carried through to the end.
- **Structure follows the topic's archetype** (`archetypes/`). Numbered steps only in Tutorial (and Concept mechanism steps).
- **Honesty:** label company claims ("they say…", "in their own demo"), source every number,
  always include the catch. Never overstate.
- **Accurate framing:** introduce a tool by what it does, e.g. "an AI model that makes decisions
  instead of writing text", not "the AI that can't…". No clickbait the video doesn't pay off.
- **Interaction:** reels end with a comment question / "save this" / a poll. The question is channel-generic (the channel covers all of Gen AI, not one format or topic). Long-form uses open
  loops and a mid-video question.

## Clear and right (every script line)
- **One beat = one claim = one visual.** Reel sentences are at most about 14 words; beats last 2–6 s.
  If a beat needs two visuals, it is two beats. In benchmark-depth reels (> 60 s) a beat may run to 10 s only when the
  storyboard names an internal visual change inside it (the running object transforms mid-beat).
- **Every beat has a visual tag** (`[TITLE]` `[NUMBER]` `[VS]` `[VERDICT]` `[LIST]` `[CODE]` `[ANIMATE]`
  `[SCREEN]` `[TERMINAL]` `[CTA]`). Pick the tag that *shows* the line. A line nothing can show is
  usually filler; cut it.
- **Captions must read standalone:** don't open a beat with an unclear "it / this / that". Name the thing.
- **Numbers:** say them the way they'll appear on screen ("about four characters" ↔ "~4"), and give
  every number an `[Sx]`.
- **Names and acronyms:** add a pronunciation note the first time ("MCP, say M-C-P"). These feed
  `names` in `scenes.json`, so captions are spelled right.
- **Clean read-aloud text:** the final plain version is exactly what the voice says. No cues, tags,
  emojis, URLs, or symbols the voice would mispronounce ("→", "~", "%" spelled out where needed).
- **The tone** comes from the archetype's tone line. It also becomes the voice style.

## Visual direction (storyboards)
- **Open on the failure or a striking visual** (the AI getting it wrong, a big claim in giant type). The first
  frame must work on mute and is never empty. Check that the hook doesn't echo the user's reference videos' lines.
- **Colour-block sections:** give each section (setup, mechanism, reveal, why-it-matters, recap) its own
  background (`dark` / `blue` / `light` / `yellow`). Change colour at section breaks.
- **Use the full screen:** visuals are big and edge-to-edge; on-screen text is at least caption size.
- **Show progress** in multi-step explanations (a 3–5 step tracker), and **end explanations on a recap card**
  (one screen, save-worthy) before the CTA.
- **Head-to-head numbers are giant numbers**, not list text. At most 2 consecutive beats in the same visual form;
  prefer a visual metaphor (a shelf for vocabulary, a meter for cost) over another row of chips.
- Reels: the first frame tells the story on mute. A visual change every 2–3 s. Numbers appear on
  screen as they're spoken. Captions at 62–72% height. Keep the bottom 20% and right 12% clear.
- Long-form: an A-roll / B-roll / screen-capture rhythm, a graphic or angle change every 60–90 s,
  and chapter cards.
- Generic icons and plain-text product names only: no brand logos, mascots or real people's likenesses.
- **Sources:** every fact is sourced in `research.md` and listed in the publish kit's description. **Nothing on screen**: the viewer gets the
  sources from the description / pinned comment. Mock UIs always say "illustrative" (that's a label, not a source).
- **Benchmark:** `references/tokenization-reel.mp4` is first-party: take its explanation depth, detailing, voice and visualisation approach for every reel (see `brand.md`).
- **Aesthetic:** modern and futuristic tech (see `brand.md`). Metaphors are rendered as sleek technology, never as cartoon or kids-style objects.
- **One grid:** every scene keeps the same positions (visual zone centred, captions in one zone), so nothing jumps between scenes.

## Words to avoid
"game-changer", "revolutionary", "mind-blowing", "insane" (unless really earned), "delve",
"unleash", "in today's fast-paced world", "let's dive in", "without further ado", "Hey guys".
