# Art direction · LFM3

_The look is the house style; the concept decides what moves. Learn from references how they move, never copy their frames._

## House style
- **Style:** `reference-flat` (`studio/templates/styles/reference-flat/design.md`), palette from its `sections.json` (dark / blue / light / yellow), `"flat": true`.
- **Accent that leads:** light (off-white) for the hook and the demo, so the message card and the form read like paper; blue for "what it is" and "try it"; yellow for the size maths and the verdict; navy (`dark`) for the catch. One swapped accent: green `#22C55E` only on the "actions" bar and the ✓; red `#E5484D` only on the crossed-out essay and the losing bar's label.
- **Dials:** realistic (Launch: the message, the form card and the terminal are replicas of ordinary UIs, labelled "illustrative") · image-led (the CC0 bed stays; sound marks actions).

## Reference board (style lock)
_Files in git-ignored `productions/2026-10-28-lfm3-reel/yt/refs/`. All were read before writing this._
| Ref | File | What to take |
|---|---|---|
| 1 | `references/tokenization-reel.mp4` (first-party benchmark) → `yt/refs/benchmark-sheet.jpg` | one running object carried through every section (their sentence → our message); flat colour blocks changed at each section; giant Anton for the hook and the numbers ("5 TOKENS" → our "~1 GB"); mono chips with 4 px ink borders on light; connectors drawn from chip to slot (their shelf lines → our words flying into form fields); sentence captions bottom-left with one coloured keyword. **Not** its "STEP 0N / 06" counters (Launch: no numbered steps) |
| 2 | `yt/refs/launch-film-sheet.jpg` (Liquid's own launch film, analysis only) | **idea only:** a spoken request on one side becomes a structured call on the other, revealed line by line; one plain verb per section card. Not its white UI, purple accent, phone mock-up, street footage, robot clips or logo |
| 3 | `yt/refs/size-ladder-sheet.jpg` (`rPGJhrunbxo`, analysis only) | **idea only:** size as a physical comparison the viewer can picture (a spec card per device) → our block shrinking into a laptop's memory bar. Not its game-style cards, pixel art, hardware photos or face cam |
| 4 | `yt/refs/low-wifi-sheet.jpg` (`d2cbmj0aXaI`, low performer, analysis only) | **what to avoid:** a Wi-Fi toggle opening over borrowed screen recordings and a caption bar; long holds on one screen. Ours opens on our own object and moves on every word |

## Concept → visual world
- **Central metaphor:** **a form-filler on your desk.** The frame is a desk view: at the top (y 250–620) the **message card** (a chat bubble); in the middle (y 660–1120) the **form card** `add_event( )` with four empty labelled slots `title · day · time · note`; at the bottom of the zone (y 1160–1440) a thin **laptop strip** that carries a memory bar and a "runs locally" badge. "Action, not essay" is drawn literally: an essay-shaped block of grey lines tries to appear and is struck out; the message's words fly into the form's slots instead.
- **Running object:** **the student's message "lab moved to thu 3pm, bring the circuits report"** and the `add_event` form it becomes. It enters as the bubble in the hook (with the finished calendar card below it, frame 0), resets to the bare bubble for the demo, its words **ROUTE** into the four slots (`Lab` · `Thu` · `3:00 PM` · `bring circuits report`), the form **SLIDES** to a separate "your app" box that **STAMPS** a calendar card, the form card **SHRINKS** into a "~1 GB" block for the size beat, sits as the tiny chip next to the "actions" bar in the trade, gets pulled by the terminal line in "try it", and returns whole in the verdict. On screen in 10 of 11 beats.
- **Sections** (Launch: plain titles, no numbers, no progress bar; structure-check confirms): What it is · The demo · Why it fits · The trade · Try it. Hook before the first; verdict + CTA after the last.

## Replica (Launch / Tutorial only)
- **Source screenshots:** none taken. We did not run the model, and the only LFM3 demo footage is Liquid's launch film, which we must not copy. The three UIs are generic replicas drawn in the house style: a chat bubble (no app chrome, no brand), a mono "function call" card, and a plain terminal window (three dots, mono text).
- **Lifted:** fonts: JetBrains Mono for the call card and terminal, Inter for the bubble · colours: house palette only · layout: the terminal's three lines `ollama run` / `hf.co/LiquidAI/` / `LFM3-1.7B-GGUF:Q4_K_M` wrapped at ≤ 21 characters (content plan); the download line shows `~1.1 GB` (S4).
- **Terminal text source:** the command string is copied from the GGUF page's Ollama line (S9); the download size "~1.1 GB" from the Q4_K_M file (S4). The progress line is a plain house-style bar, not Ollama's own pull output.
- **Waits cut:** the download is shown as a bar that fills in ~1.2 s, with a "sped up" chip.
- **Rights:** no screenshots of Liquid's site, Hugging Face, Ollama or any app; every replica carries a small "illustrative" label inside it.

## Locks (must never happen)
- No logos: Liquid AI, Ollama (no llama icon), Hugging Face (no emoji face), Qwen/Alibaba, calendar apps. Plain-text names only.
- Never on screen or spoken: "beats Qwen 9B" without "Liquid's scores"; "offline"; a Wi-Fi toggle or Wi-Fi icon; "free"; "any phone"; "every modality"; "GPT-level"; "insane"; "game-changer"; "I tried it" / "our test".
- The 71 vs 63 bar always sits next to the 63 vs 80 bar's slot (the trade is one screen) and both carry "Liquid's scores".
- The model never "adds" the event itself: the calendar card is stamped by a separate "your app" box.
- No numbers "0" before their word; "~1 GB" appears on the spoken "gigabyte". One written exception: the hook's frame-0 "~1 GB" chip is on screen from frame 0 (it carries the hook's claim on mute) and SLAMS on "gigabyte" (animation-plan.md, First frame).
- No sources on screen; replicas say "illustrative". Nothing below y 1460 (captions), nothing in the right 12 %.
- No line, frame, icon or colour scheme from a watched video.

## Motion language (name the verb; "cinematic" is not a verb)
- **Primary verbs:** TYPES OUT (the message, the terminal line) · STRIKES (the essay block) · ROUTES (each word chip into its form slot) · FILLS (a slot; the memory bar; the download bar) · SLIDES (the form to "your app") · STAMPS (the calendar card; the verdict) · SHRINKS AWAY (the form into the "~1 GB" block) · COUNTS UP (1.7 B; 4; 71 / 63; 63 / 80) · RACES (the two score bars) · PUSH IN (on a slot, on the losing bar) · BUILDS WORD BY WORD (the CTA) · WIPE (section change).
- **Section colour per chapter:** hook `light` → what it is `blue` → the demo `light` → why it fits `yellow` → the trade `dark` → try it `blue` → verdict `yellow` → CTA `dark`.
- **Music:** `fresh-focus` (bright, steady; good under explanations) from `studio/templates/reel/audio/music/cc0/manifest.json`, ducked under the voice, dipped for the catch (beats 7–8); fallback `beat-one`.
- **SFX:** `pop` on reveals; `key` on typed text; `click` as each word lands in its slot; `stamp` on the calendar card and the verdict; `ding` when a number lands; `tick` on the count-ups; `whoosh` on wipes and camera moves; `blip` on the terminal's enter.

## Checks
- [x] House style named; palette from its `sections.json`
- [x] Reference board lists what to take from each, nothing copied
- [x] Running object appears in ≥ 60 % of the video
- [x] Locks written (the visual-plan agent greps them across the whole folder; no self-tick needed)
