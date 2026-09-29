# Slide & Visual Outline: Jev Scam Detector Session

15 slides plus B-roll. Slide numbers match the `[SCREEN] Slide N` cues in `01-session-script.md`.
**Style:** one idea per slide, big text, a dark background with a red/amber/green accent (matching the 🚨 ⚠️ ✅ verdicts). Every number marked ⟦…⟧ comes from the real run.

| # | Section | Title on slide | Content / visual | Notes for the designer |
|---|---|---|---|---|
| 1 | Cold open | **This AI can't write a single word** | Black screen; the line types in word by word, then *can't chat · can't explain · can't even say hello* | Kinetic text synced to the voice; no logo yet |
| 2 | Cold open | **…but it finished 100 before the chatbot** | Split screen: chatbot "typing…" dots vs Jev counter 0 → 100 ✓; freeze on ⟦N⟧x faster · ⟦M⟧x cheaper; then the scam SMS gets 🚨; then a glitch flips one verdict to a wrong ✅ with the text "one dangerous flaw" | Numbers from the real race table only |
| 3 | Intro | **Today's build** | Roadmap: ① Why LLMs are overkill ② What is Jev ③ Build the checker ④ The race ⑤ Where it fails ⑥ Ship the app | Six icons in a row, highlighted one at a time as each chapter starts |
| 4 | Problem | **Most AI in apps = small decisions** | Four cards: Spam? · Which team? · Positive or negative? · Suspicious payment? | Each card shows a yes/no, pick-one or rating icon |
| 5 | Problem | **The old way** | Pipeline: Prompt → LLM writes text → Parse JSON → Validate → ❌ Retry → Decision | Show a broken JSON snippet with a red squiggle at the "Parse" step |
| 6 | Problem | **Words cost time and money** | 3 stats: Slow ⟦LLM p50 s⟧ · Costly ⟦$ per 1,000⟧ · Fragile ⟦invalid / 100⟧ | Fill in after the dry run |
| 7 | Jev | **System Two vs System One** | Left: 🐢 "slow, careful, writes it out" (LLM). Right: ⚡ "fast, instinctive, just decides" (Jev) | Credit the idea to psychology's "thinking fast and slow", in your own words; no book imagery |
| 8 | Jev | **Essay answer vs OMR sheet** | Left: a messy handwritten essay. Right: a clean OMR sheet with filled bubbles | This is the key analogy, so make it visual |
| 9 | Jev | **How Jev works** | `state` (the SMS) + `questions` → **Jev** → typed answers (numbers) | Diagram with the actual electricity SMS as the state |
| 10 | Jev | **Three question types** | Table: Noul (yes/no → 0.97) · Choice (pick one → "bill_disconnection" + probability bars) · Score (rate → 2.4 of 3) | Use the scam examples from the script |
| 11 | Jev | **The claims (and the fine print)** | Big: "70–500 ms · $0.042 / 1M input tokens · output free". Below in amber: "Vendor's own tests · 'some bias could exist' · pricing may be subsidised" | Put the source (TypeSafe launch post, Sept 15, 2026) in small print |
| 12 | Build | **When do we trust it?** | Horizontal probability bar 0 → 1: ✅ ≤ 0.10 · ⚠️ 0.10–0.90 · 🚨 ≥ 0.90 | Colour zones green / amber / red |
| 13 | Race | **The scoreboard** | Rows: total time · p50 / p95 latency · $ per 1,000 · invalid outputs · scams caught /60 · false alarms /40 · type correct %. Columns: Jev · LLM | Copy directly from Steps 7 and 8. Bold the winner in each row, **including rows the LLM wins** |
| 14 | Fix | **Jev decides, the LLM explains** | Flow: every message → Jev → confident? → act · not sure (⟦N⟧/100) → LLM explains → human | Label the fast path "most messages" and the careful path "tricky ones" |
| 15 | Recap | **4 things to remember** | ① LLMs write, Jev decides ② Valid ≠ correct ③ Thresholds + fallback ④ Test the headline numbers yourself | End card follows: notebook link + next episode |

## B-roll and overlays
- **Timer overlay** during the race (real speed, even when the footage is sped up).
- **Zoom-ins** on JSON outputs: `p_scam`, `type_probs`, the confident-wrong table.
- **Lower-third captions** the first time each term appears: *Jev*, *TypeSafe AI*, *System One model*, *Noul*, *OpenRouter*.
- **Fake-number disclaimer** in small text whenever a dataset message is on screen: "Example message · fake number/link".
- **Public-service end slate:** "Scammed? Call 1930 or visit cybercrime.gov.in" (check it's current before publishing).

## Thumbnail options
0. A robot with its mouth taped shut, holding a phone that shows **🚨 SCAM**, with the text **"It can't talk. It's ⟦N⟧x faster."** (recommended: matches the hook)
1. Phone showing the scam SMS stamped with a red **"SCAM · 0.3s"**, plus text **"AI caught it… or did it?"**
2. Split face: 🐢 "ChatGPT ⟦Y⟧s" vs ⚡ "Jev ⟦X⟧s", with the text **"Not an LLM"**
3. OMR sheet vs essay, with the text **"This AI can't write. That's the point."**

Pick the one whose numbers from the real run are most striking. Never put vendor numbers (193x / 444x) on the thumbnail as if they were your results.

## Title options
1. This AI Can't Write a Single Word (And That's Why It's ⟦N⟧x Faster)
0. (alt) I Replaced ChatGPT With an AI That Can't Talk. Here's What Happened.
2. I Raced Jev vs an LLM on 100 Scam Messages. The Results Surprised Me.
3. Jev Isn't an LLM. I Built a Scam Detector to Test It. (Free Colab Project)
