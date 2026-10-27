# Art direction · OpenAI Dots (v3: house style, replica running object)

_The look is the house style; the concept decides what moves. Learn from references how they move, never copy their frames.
Rewritten 2026-10-16 for the validation pilot (the v1 "night-shift orb" world is retired: a Launch video's running object is the
real UI, rebuilt)._

## House style
- **Style:** `reference-flat` (`studio/templates/styles/reference-flat/design.md`), palette from its `sections.json` (dark / blue /
  light / yellow), `"flat": true`. Type: Anton for the hook clock, "A DOT" and the verdict; Inter for everything in the replica and
  the chips; JetBrains Mono for the clock digits, the URL bar, the handle and the terminal strip.
- **Accent that leads:** **electric blue** `#2B3BE0` is the dot (its avatar circle, the user's bubbles, the send button, the chosen
  rule), so blue is the section of "What it is" and the verdict; yellow for the rules (the control panel); light for "How it works"
  (the dot's computer reads best on off-white); navy for the hook and the catch (the serious moments, yellow type on navy).
  Green `#14B87A` only for "12 passed"; red `#E5364A` only for the flagged diff line in the verdict and the OFF toggle.
- **Dials:** **realistic** (a Launch replica, not a metaphor) · **image-led** (the CC0 bed stays, ducked under the voice and dipped
  for the catch; every visible action still has its own cue).

## Reference board (style lock)
_Files in git-ignored `productions/2026-10-11-dots/yt/refs/` (the repo is public). All five official screenshots were read before
writing this; they are references for the rebuild, never shown in the video._
| Ref | File | What to take |
|---|---|---|
| 1 | `references/tokenization-reel.mp4` (first-party benchmark) | one running object carried through every section and changed by each; flat colour blocks changed at section breaks; giant Anton type for the hook and verdict only; mono chips with a 4 px ink border on light, translucent on navy/blue; a dense frame (the window fills the zone), captions bottom-left. **Not** its "STEP n OF m" counters (Launch: plain titles) |
| 2 | `yt/refs/openai-introducing-dots-carousel-feedback.png` (official, openai.com: a developer's dot, "The sidebar fix is ready for review · Review the fix") | **the layout to replicate:** a white rounded window; a narrow grey icon rail on the left (home, tasks, activity, @, apps); the chat column with light-grey assistant bubbles and the user's bubbles in the dot's colour; the dot's name chip above its avatar reading "Thinking…"; underlined links inside a bubble ("Review the fix"); the composer "Send a message" with + and a mic and a round send button; the dot's second pane on the right: a browser with its own URL bar and the page it is working on. **Not** the character, the pink tint, the fake app, the person's name |
| 3 | `yt/refs/openai-introducing-dots-carousel-launch.png` (official) | confirms the user bubble takes the dot's colour (blue here) and the second pane is a real browser with a URL bar; chips/links keep the same grey. Our dot is blue, so this is the colour mapping we use. **Not** the beret character or the slide content |
| 4 | `yt/refs/openai-introducing-dots-carousel-content.png` (official, mobile) | the mobile chat: links as underlined text inside grey bubbles, "Read 2:59 PM" receipts, the name chip over the avatar → our "Dot · Working…" chip and the time receipts on the 3 AM / 7 AM bubbles. **Not** the photo, the account or the character |
| 5 | `references/ig-reels.md` → DehL0UdMPw4 (Linux, analysis only) and DeecNSBNplG (Kafka, analysis only) | **motion only:** a real UI rebuilt in vector where every typed action has a visible consequence on the keystroke (the terminal → the file tree); zooms that land on the part being explained, then out when a new actor joins; labels typed next to the object; a number that lands and stays as a chip. **Not** their lines, palettes, characters or layouts |

## Concept → visual world
- **Central metaphor:** **the dot's desk.** The whole video happens inside one window: the dot's chat on top, and, when it works,
  the dot's own computer pane under it (the real UI's second pane, stacked for 9:16). A clock over the window's head tells the
  time; the viewer never types after the goal, the dot does, and everything the voice says is a state change in that window.
- **Running object:** **the dot window**: a vector replica of the dot's ChatGPT chat (left rail · bubbles · composer · the dot's
  name chip) with the dot's computer pane under it, carrying the checkout bug from "Slack · #bugs — Checkout fails on iOS" to "The
  fix is ready for review". It is on screen from frame 0 to beat 19 (the CTA shrinks it away): the hook lands a message in it, the
  goal is typed into it, the computer pane slides up under it, the Scheduled / Custom rules / Plugins sheets open inside it, the
  Reset dialog empties it, and the verdict re-opens it with the rule set to "Ask before taking action".
- **Sections** (Launch: plain titles, no numbers; the structure-check agent confirms): What it is · How it works · You set the
  rules · The catch · My take. Hook before the first; CTA after the last.

## Replica (Launch)
- **Source screenshots** (official only): the five openai.com "Introducing dots" carousel images in `yt/refs/openai-introducing-dots-carousel-{feedback,launch,analysis,content,proposal}.png` (fetched 2026-10-16 from the Wayback snapshot of 2026-10-16; the live site is 403 to fetchers). The Help Center article (S14, Wayback 2026-10-15) has no images; its text gives every label we draw: **In progress · Scheduled · Completed**, **Customize → Custom rules**, the four behaviours "Take action without asking · Take action if pre-approved · Ask before taking action · Hand off to you", **Customize → Plugins**, **•••** → **Pause** / **Reset**, "Reset deletes your dot, including its conversations, saved memories, and scheduled tasks", **Cancel** / **Reset**.
- **Lifted:** fonts → the screenshots use OpenAI's own sans; we substitute **Inter** 500/600 at the same hierarchy (bubble text 40 px, chips 30 px, section kickers 32 px; all ≤ 3 % of the frame height) and **JetBrains Mono** for the URL bar, the handle `@you-dot`, the receipts and the terminal strip · colours → window `#FFFFFF` with a 20 px radius and a 4 px ink border on light sections (translucent on navy/blue); assistant bubbles `#F3F3F3` with ink text `#0C0E16`; user bubbles and the dot's avatar circle in the dot's colour (house blue `#2B3BE0`, white text); composer border `#E5E5E5`, round blue send button; the dot's computer pane with dark chrome `#11111C`, a light URL pill and a white page · layout → reproduced exactly: the left icon rail (64 px, five line icons), the chat column, the name chip over the avatar, underlined links in bubbles, the composer; **simplified:** the two panes are stacked (chat x 40–1040 y 240–1120; the computer pane slides up to y 820–1420) instead of side by side; the avatar is a plain filled circle (no character, no pet); the three window dots are neutral grey; the sheets (profile tabs, Custom rules, Plugins, Reset) are drawn from the Help Center's text as mobile-style sheets inside the window, since no official screenshot shows them; the browser page is a generic "checkout" form at `localhost:4920/checkout` and the diff/terminal strips are illustrative. An "illustrative" chip sits under the window whenever the 3 AM story or a sheet is on screen.
- **Waits cut:** the dot's investigating and testing (hours in the story) → ~3 s in beats 2 and 6, declared with a **"sped up"** chip beside the clock roll (3:00 → 7:00) and beside the test run; "Thinking…" → 0.4 s (chip only); sheet and dialog transitions at real UI speed (~0.3 s), nothing else accelerated.
- **Rights:** official OpenAI screenshots and Help Center text are references only and are never shown; the rebuilt window is a vector approximation labelled "illustrative"; no OpenAI logo or wordmark, no dot characters or pets, no real person, company, repo or app name; product names ("ChatGPT", "Slack") as plain text only; music CC0 (`fresh-focus`), SFX from the house kit.

## Locks (must never happen)
- No OpenAI logo or wordmark; no dot character, pet or avatar art (a plain filled circle only); no real person's name or face; no real company, repo or app name (the app is "checkout", the channel "#bugs", the dot is "Dot").
- No "4,000" / "4000" app count; no "Teams"; no plan, price or region words (Pro, Business, Premium, EEA, EU, UK, Switzerland, "no extra cost", $); no model name (Astra); no DevDay.
- The 3 AM story is never a promise: the "illustrative" chip is visible whenever it is on screen (s01–s02, s05–s08, s18), and beat 6 says "In OpenAI's own example".
- The four rule labels are the Help Center's exact words, unnumbered; no "STEP n OF m", no progress bar, no numbered list anywhere (Launch).
- The dot window never leaves the screen from frame 0 to the verdict; sections change its state (a sheet opens inside it, the pane slides under it), never swap it for a card.
- No sources on screen (description only). No number shows before its word ("12 passed" lands on "tests"). Nothing draws below y 1460 or in the right 12 % (x > 950); captions are the engine's.
- No other creator's line, frame, icon or palette (the Linux / Kafka reels gave motion ideas only).

## Motion language (name the verb; "cinematic" is not a verb)
- **Primary verbs:** ROUTES (the Slack card into the chat) · TYPES OUT (the goal, the URL, the terminal, the rule) · SLIDES IN (bubbles, the computer pane, sheets, the Reset dialog) · FILLS (the progress bar, the four rule slots, the checkout form) · SCANS (the test run) · COUNTS UP (the clock 3:00 → 7:00; "12 passed") · STAMPS ("illustrative", "sped up", "always you", "ASK FIRST.") · CLICKS (the send button, the Review link, the toggle, the radio) · CUTS (the link line from the disconnected app) · SHRINKS AWAY (the window on Reset and before the CTA) · PUSH IN (the camera on each action) · WIPE (section change).
- **Camera:** 15 planned moves in ~110 s (≈ 8–9/min): a push onto the element the voice names (the link, the pane, the terminal count, the Scheduled tab, the four slots, the toggle, the dialog, the chosen rule), home on every wipe or when the whole desk is the point (s04, s07). Zoom 1.35–1.6; nothing zoomed below y 1460.
- **Section colour per chapter:** hook `dark` → What it is `blue` → How it works `light` → You set the rules `yellow` → The catch `dark` → My take `blue` → CTA `dark`.
- **Music:** `fresh-focus` (bright, steady; good under explanations) from `studio/templates/reel/audio/music/cc0/manifest.json`, ducked under the voice, dipped for the catch (beats 13–14); fallback `motions`.
- **SFX (one per visible action):** blip (a message lands) · tick (the clock, a test step, a bar step) · key (typing) · click (send, the link, a toggle, a radio) · ding ("fix", "results", "12 passed") · pop (a chip, a row, a sheet) · stamp ("illustrative", "always you", "ASK FIRST.") · whoosh (wipes, the pane sliding, the window shrinking away).

## Checks
- [x] House style named; palette from its `sections.json`
- [x] Reference board lists what to take from each, nothing copied (official screenshots are references for the replica only)
- [x] Running object appears in ≥ 60 % of the video (the dot window: frame 0 → beat 16, ≈ 95 % of the runtime)
- [x] Locks written (the visual-plan agent greps them across the whole folder; no self-tick needed)
