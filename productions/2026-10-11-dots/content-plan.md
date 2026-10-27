# Content plan · OpenAI Dots (what a dot is and how it works)

_Written by the `content-plan` agent on 2026-10-16 (the Dots package re-run as the validation pilot for the new gates), after
research, before the script. The script follows this plan; the `script-review` agent checks it against this file. Format:
faceless reel, ~85–110 s at the house pace of 2.3 w/s (≈ 200–250 words), Launch archetype._

**Primary sources re-read on 2026-10-16:** the OpenAI Help Center article "Getting started with your dot" (S14, official docs,
via its Wayback snapshot of 2026-10-15; the live page is 403 to fetchers) and the openai.com announcement "Introducing dots"
(S15, official page). Press rows S1–S13 are only the record of coverage; every product-behaviour line in the script must cite
S14 or S15. **No "our test":** we have no dot. The demo is drawn as an illustration of the job OpenAI itself describes.

**User rules for this video (brief, 2026-10-12):** no plans, prices or regions · no "4,000 apps" · no Teams · the video is
about what a dot *is* and how it *works*.

## Viewer's question
"ChatGPT has this new 'dot' thing. What is it actually, what does it do when I'm not there, and how much can it do on its own?"

## Core message
A dot is a ChatGPT agent with its own computer that keeps working between your chats, under rules you set.
_(20 words)_

## Must include
| # | Point (concrete fact / mechanism / example) | Source | Label |
|---|---|---|---|
| 1 | **What it is, by what it does:** "an always-on agent in ChatGPT". You give it a goal and it can "keep making progress between conversations", then "bring results back for your review". It "turns to you for decisions that need your judgment". | S14 | official docs |
| 2 | **Why it can *do* things, not just chat:** "it has its own cloud computer" and its own cloud browser ("Your dot's cloud browser has its own sign-in sessions"). You can "open your dot's computer … to view and interact with it" / "at any time to inspect its work". | S14 · S15 | official docs · official page |
| 3 | **The running example, end to end:** a bug report in Slack → the dot investigates on its own computer, writes and tests a fix → "working changes to review" come back in the chat. All three parts are OpenAI's own: "A bug appears in Slack, and dots immediately start investigating" (S15), "Improve an app. Scope a change, write code, and test it so you have working changes to review" (S14), "You can connect your dot to Slack" (S14). Shown as an illustration, labelled "illustrative". | S14 · S15 | official docs · official page (illustrative on screen) |
| 4 | **Always-on means it also works without a new message:** scheduled and recurring checks, e.g. "ask it to review your calendar each morning"; the profile shows **In progress · Scheduled · Completed**. (One beat; the proactive-research detail stays out, see Leave out.) | S14 | official docs |
| 5 | **The control you have (the "why it's different" of this launch):** Custom rules with four behaviours, in the Help Center's words: "Take action without asking · Take action if pre-approved · Ask before taking action · Hand off to you"; "'Pre-approved' means you explicitly requested the action in your prompt". And a floor you can't lower: "Some steps, such as changing a password, must be completed by you" / "always stay with you". | S14 · S15 | official docs · official page |
| 6 | **The catch (below):** disconnecting an app keeps what the dot already obtained; deleting is all-or-nothing (Reset deletes the dot with its conversations, saved memories and scheduled tasks). Plus the honest limit that shapes the verdict: "Your dot can make mistakes, including when following your rules. Review its work". | S14 | official docs |

Verdict line it builds to: _start it on "Ask before taking action", check its work, and loosen the rules as it earns your trust_
(the verdict is our recommendation; the four levels and "review its work" are S14).

## Leave out
| Item | Why it's out |
|---|---|
| Plans (Pro, Business Premium, Enterprise), "no extra cost", allowances, regions (EEA, Switzerland, UK), rollout timing (S7) | user rule: no plans / prices / regions; and they change weekly |
| "Over 4,000 apps" / the plugin count (S3, S15) | user rule; a count says nothing about what the viewer can do |
| Teams as a channel (S6, S15) | user rule; Slack alone carries the running example |
| GPT-6 Astra (the model name), DevDay, launch date, "bubbly avatar" coverage | trivia; the brief's lock |
| Characters, pets, names and handles (@yourname-dot), the avatar picker | not about how it works; and we never draw OpenAI's characters |
| Texting beta, calling, "your dot cannot call you" (S13) | launch limits that don't change the core message |
| Local computer access ("Allow access" on your own computer), Codex cloud environments, Work tasks | a second mechanism; one computer (its own) is the story. Keep for a long-form explainer |
| Proactive research with read-only tools (S12, S15) | true and interesting, but it needs its own caveat ("read-only, can't send or change"); one scheduled-check line covers "works without a new message" |
| Memory inherited from ChatGPT memory; training-data settings | needs a longer caveat than the claim; off the core message |
| Specialist dots, Microsoft Agent 365, enterprise pilots | not the viewer's product |
| "Dots can do nearly anything", "handle everything" (S15 marketing lines) | overclaims; we introduce it by what it does |
| TechCrunch's "already possible through Codex" (S10), Meta Muse rivalry | opinion / rival news; for the long-form |
| The eesel permissions anecdote, "$100/month" | single-source community / price |
| Prompt-injection wording (S9 "reduce the risk but do not eliminate it") | press paraphrase; the official line "can make mistakes, including when following your rules" (S14) is stronger and is what we say |

## Catch decision
**Catch:** include
**Why:** material (privacy / data the viewer can't delete piece by piece), hidden by the hype, and sourced in the official Help
Center. Every launch video shows the dot connecting apps; none says that disconnecting an app does not remove what the dot already
obtained from it, and that the only delete is the whole dot (Reset: conversations, saved memories, scheduled tasks). For a viewer
about to connect Slack, email or a code repo, that changes how they connect, so it is said once, calmly, with the Reset dialog on
screen.
**Exact point (one line):** "Disconnect an app, and what your dot already learned from it stays. To wipe that, you delete the whole
dot: chats, memories, schedules, all of it." [S14: "Disconnecting an app does not delete information your dot has already obtained
from it. To delete that information, you need to delete your dot." · "Reset deletes your dot, including its conversations, saved
memories, and scheduled tasks."]

Not the catch (and why):
- **"It can make mistakes, including when following your rules"** → sourced (S14) and said, but as the honest line that opens the
  verdict ("so check its work"), not as a second "but".
- **Plans / regions / price** → left out by the user's rule.
- **Proactive read-only research, local-computer access** → see Leave out.

Tone for the catch: calm, one breath before it, no alarm graphics, no "scary" framing; the Reset dialog is the picture.

## Running example
**The 3 AM bug report.** A message lands in a Slack channel at 3:00 AM: "Checkout fails on iOS" (illustrative). The dot, which
the viewer has given the goal "keep the checkout bug-free", investigates on its own cloud computer, writes a fix and runs the
tests; at 7:00 AM a chat bubble says "The fix is ready for review", with a Review link; the viewer approves. Why it fits: it is
OpenAI's own example (S15: "A bug appears in Slack, and dots immediately start investigating"; the developer carousel: "builds and
tests them, and brings you complete PRs to review"; S14: "Improve an app … working changes to review"); it shows the three
mechanisms in one story (keeps working between chats, its own computer, results back for review); and it is the viewer's real
use (students and early-career developers ship apps and sleep). It is drawn inside a **replica of the dot's chat window** (Launch
rule: the running object is the real UI, rebuilt in vector from the official screenshots), never from a watched video. Everything
in it is labelled "illustrative"; no real person, repo or company name.

## Claim safety
| Tempting wording | What the source supports | Safe wording | Source |
|---|---|---|---|
| "always-on" | "Your dot is an always-on agent in ChatGPT" | ✅ "an always-on agent inside ChatGPT" | S14 |
| "keeps working after you close the chat" / "works while you sleep" | "keep making progress between conversations" | ✅ "it keeps working between your chats". ⚠️ "while you sleep" only as the illustrative story (3 AM), never as a feature claim | S14 |
| "it has its own computer" | "it has its own cloud computer"; "Your dot's cloud browser" | ✅ "its own cloud computer, with its own browser" | S14 |
| "you can watch it work" | "open your dot's computer … to view and interact with it"; "open your dot's computer at any time to inspect its work" | ✅ "You can open its computer any time and watch it work" | S14 · S15 |
| "it fixes your bugs overnight" / "by morning, a fix is waiting" | OpenAI's own example job (bug in Slack → investigate; scope, write code, test → working changes to review). No timing is promised | ✅ as the hook of an **illustrative** story, labelled on screen and in the description; ❌ as a promise ("it will fix your bugs by morning") | S14 · S15 |
| "it writes the fix and tests it" | "Scope a change, write code, and test it so you have working changes to review" | ✅ "It writes the fix, and tests it." | S14 |
| "results come back for review" | "bring results back for your review" | ✅ | S14 |
| "it runs on a schedule" | "run a recurring check … review your calendar each morning"; profile tabs In progress · Scheduled · Completed | ✅ "It can also run on a schedule, like checking your calendar every morning" | S14 |
| "it works on its own without asking" | Four behaviours; the default is not stated on the page | ❌ "it just does things on its own". ✅ "you decide how much it can do alone: four levels" | S14 |
| the four levels | "Take action without asking · Take action if pre-approved · Ask before taking action · Hand off to you"; "'Pre-approved' means you explicitly requested the action in your prompt" | ✅ spoken one level per short sentence, each with its own verb (2026-10-27, at the user's request after the Goldfish check could not tell the first two apart): on the rule shown on screen ("Merging a fix to main", illustrative): one level per beat (2026-10-27, the user's option b), each with its slot showing the exact label as it is spoken: "At the top, it acts on its own, without asking you." · "One step down, it acts **only** on what your prompt already asked for." · "Next, it asks you first, and waits for your okay." · "At the bottom, it doesn't act. It hands the job back to you." ("only … what your prompt already asked for" is exactly the pre-approved definition; "hand off" is never spoken, heard as "hands-off"; on screen, the exact four labels). ❌ (superseded) "act without asking, act only when you asked": the two sound alike on one listen | S14 |
| "a password **always** stays with you" | "Some steps, such as changing a password, must be completed by you"; "Certain sensitive tasks, such as changing a password, always stay with you" | ✅ "some things, like changing a password, it always leaves to you" | S14 · S15 |
| "disconnect an app and it forgets" | "Disconnecting an app does not delete information your dot has already obtained from it" | ❌ never. ✅ "Disconnect an app like Slack, and what your dot already learned from it stays" (Slack named 2026-10-27 so "an app" has a referent) | S14 |
| "the **only** way to wipe it is deleting the dot" | "To delete that information, you need to delete your dot"; "Reset deletes your dot, including its conversations, saved memories, and scheduled tasks" | ✅ "To wipe that, you delete the whole dot: chats, memories, schedules, all of it" | S14 |
| "it **never** makes mistakes if you set rules" | "Your dot can make mistakes, including when following your rules. Review its work" | ❌. ✅ "it can still make mistakes, even while following your rules. So check its work" | S14 |
| "it can do **anything**" / "handles everything" | marketing lines on S15 | ❌ never | — |
| "**free** / included" | plan text | ❌ left out (user rule) | — |
| "4,000 apps", "Slack **and Teams**", "Pro / EU / UK" | on S15 / S7 | ❌ left out (user rule); grep the whole folder | — |
| "Slack" | "You can connect your dot to Slack" (S14); "A bug appears in Slack" (S15) | ✅ as plain text, no logo | S14 · S15 |

**Grep before script-review and in the visual-plan gate:** "4,000", "4000", "Teams", "Pro", "Business", "Premium", "EEA", "EU",
"UK", "Switzerland", "$", "Astra", "anything", "everything", "forgets", "never makes mistakes" across brief, hooks, script,
storyboard, animation plan and publish kit (research.md is the source record and keeps them in its tables).

## Depth (what the viewer must see, not just hear)
- **Between chats:** the chat window stays open with no new message from the viewer while the clock rolls 3:00 → 7:00 and the
  task card in the dot's profile moves In progress → Completed; the "fix is ready for review" bubble arrives on its own.
- **Its own computer:** the dot's computer pane slides up under the chat (the real UI's second pane): a browser with its own URL
  bar on the checkout page, and a test run that goes from failing to passing while the chat is idle.
- **Goal → work → review:** the goal typed and sent by the viewer; the dot's bubbles report what it did; the Review link lands on
  the word "review" and the viewer taps it.
- **The four rules and the floor:** the Custom rules sheet with the four behaviours appearing one per spoken level, the chosen one
  highlighted; a "changing a password" row that stays locked to "you".
- **The catch, in place:** the Plugins sheet with an app toggle switched off while the dot's memory notes from that app stay lit;
  then the Reset dialog listing conversations, saved memories and scheduled tasks, and the window emptying.

## Status
- [x] Content plan ready (2026-10-16)
