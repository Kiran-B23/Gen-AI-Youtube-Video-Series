# Content plan · Why AI can't count letters

## Viewer's question
Why does ChatGPT get "how many r's in strawberry" wrong?

## Core message
AI reads chunks called tokens, not letters, so ask it to spell words out first.

## Must include
| # | Point (concrete fact / mechanism / example) | Source | Label |
|---|---|---|---|
| 1 | Models see tokens of about four characters, not letters | S1 | official docs |
| 2 | Spelling the word out first or using code fixes counting | S1 | official docs |

## Leave out
| Item | Why it's out |
|---|---|
| Tokenizer history and BPE math | not needed for the viewer's question |

## Catch decision
**Catch:** skip
**Why:** a concept myth-buster; the fix is the payoff, there is no material limitation to warn about

## Running example
The word "strawberry": the viewer has seen this fail.

## Claim safety
| Tempting wording | What the source supports | Safe wording | Source |
|---|---|---|---|
| "AI can't read letters" | models see tokens | "It sees chunks called tokens" | S1 |

## Depth (what the viewer must see, not just hear)
- the word split into token chunks

## Status
- [x] Content plan ready (2026-10-12)
