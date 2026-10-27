# Publish kit · Jev session

## Titles (pattern evidence: the winners name the model + a conflict or a question; "Simply Explained" titles under-reached, C6)
1. **This AI Has "Zero Hallucinations"… So We Fed It 100 Scam Messages** (default)
2. Jev vs ChatGPT: Can a 0.1-Second AI Catch a Scam?
3. Is Jev Worth the Hype? We Tested Both Claims

## Thumbnail
The electricity SMS on a phone, a red "SCAM?" stamp half-cracked, and the text **"0.1 s… but right?"** (4 words). No logos and no faces besides the host's.

## Description
Jev is a new AI model from TypeSafe that doesn't write text: it answers typed questions with a number. Its makers say it has "zero hallucinations" and that its answers are free. We tested both claims in Google Colab on 100 made-up Indian scam messages: a two-line swap, three questions in one call, five tricky messages (including Hinglish), a race against a regular chatbot, its mistakes, and a three-line fix that sends unsure messages to an LLM.

Recorded on ⟦date⟧ with `jev-1.13` and `google/gemini-3.8-flash` via OpenRouter. Our numbers are from one run of 100 messages.

📓 Notebook: ⟦Colab link⟧ · Setup doc: ⟦link⟧ (one OpenRouter key; the run costs well under $1)
⚠️ A learning project, not a safety product. If you've been scammed, call 1930 or report at https://cybercrime.gov.in

**Chapters**
0:00 Scam or real? Two claims to test
0:45 The plan
1:45 An AI that doesn't write?
3:40 The old way vs the two-line swap
5:30 Can we fool it? (pause and guess)
6:40 The 100-message race
8:30 Catching it wrong
9:20 So can you trust its confidence?
10:40 The fix, in three lines
11:50 Did the backup pay off?
12:20 Make it an app
13:00 Where would you actually use it?
14:00 The verdict
15:00 Your turn
_(Re-time after the edit.)_

**Going further:** Laya, a free open-source lookalike that runs locally (model card: https://huggingface.co/convaiinnovations/laya).

## Sources
- TypeSafe homepage (claims: "zero hallucinations", price, demo time): https://typesafe.ai
- Output tokens free: https://www.promptfoo.dev/docs/providers/typesafe/ · https://www.layer3labs.io/guides/jev-pricing
- Speed, independent: https://dev.to/aws-builders/jev-after-eight-days-of-independent-tests-level-with-mid-price-llms-behind-the-frontier-1c60 · https://infoworld.com/article/4223468/typesafe-ais-new-models-work-with-machines-not-humans.html
- Question types: https://www.promptfoo.dev/docs/providers/typesafe/ · https://opentweet.io/jev/choice-score-noul
- Calibration: https://flaviocopes.com/jev-confidence/ · https://nexos.ai/blog/what-is-jev/
- Limits (English first, no counting/dates, adversarial defence): https://www.layer3labs.io/guides/jev-limits · https://innfactory.ai/en/ai-models/typesafe-jev/
- Independent cost, accuracy, calibration and routing study: https://arxiv.org/abs/2609.24574
- Cascade on a judging task (CMU): https://arxiv.org/html/2609.26550v1
- Wording sensitivity (yes/no swap): the DEV eight-day test above
- Cybercrime helpline: https://cybercrime.gov.in

## Hashtags
#Jev #AI #LLM #GenAI #ScamAlert #Python #GoogleColab

## Pinned comment
"Which scam message has fooled you, or almost did? Paste it below (remove any personal details) and we'll run the best ones through Jev. 👇"

## Repurposing (long-form → reels)
- The hook + the two claims → a 40-s reel ending on "one only half survives" (link to the full video).
- "Try to fool it": the five-message guessing game → a poll reel ("comment your five answers").
- The race (timer + bill) → a 30-s reel with our numbers.
- Calibration (weather forecast) + DRS band → a 60-s concept reel.
