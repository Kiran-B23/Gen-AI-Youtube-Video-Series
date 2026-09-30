# Graphics, B-roll & Packaging Plan: Jev "Can't Hallucinate"

Face + screen video, ~20 min. There are no lecture slides. Every graphic below is a **full-screen insert, an overlay or an animation** cut between the face cam and the screen capture. The chapter times match `01-session-script.md`. Every `⟦…⟧` value comes from the real dry run.

**Style:** dark background · accent colours red (🚨), amber (⚠️) and green (✅) · big, short on-screen text (≤ 6 words) · a visual change every 5–10 s · sources in small text on any claim or number.

## Per-chapter graphics

| Chapter | Graphic / insert | Notes |
|---|---|---|
| **0:00 Hook** | ① Thumbnail-matched first frame: phone with the scam SMS plus the card "✓ VALID · SAFE 97%", with a red "?" ② Zoom on TypeSafe's "can't hallucinate" claim and "output: FREE" (from their site, with the source shown) ③ Freeze-frame on Jev's output with a record-scratch SFX ④ Text: "2 claims · 1 investigation · 1 verdict" | The first shot must look like the thumbnail |
| **1:00 Hype** | Montage (1–2 s each): the HN points counter rolling up to ~2,000 · platform logos popping in (Vercel, LangChain, OpenRouter, DigitalOcean, Pydantic AI) · "Signups opened Sep 20 → paused Sep 22" · "$40M seed" · "≈ $0.04 / 1,000 decisions" | Screenshots only from public pages; date every one |
| **2:30 Not a chatbot** | ① Essay-robot vs OMR-robot split animation ② System 1 / System 2 icons (🐢 vs ⚡) ③ Three question-type cards (Noul · Choice · Score) sliding in ④ The comparison table, highlighted row by row | The OMR visual is the key image of the video |
| **5:00 ChatGPT dead?** | Big "NO." text, then the "team" flow: messages pour through a fast Jev gate into green and red bins, and the amber ones go on to the chatbot | Keep under 60 s |
| **6:00 Claim #1** | ① Zoom on `repr(reply)` and the 💥 crash ② "THE SWAP" title with the 2 code lines highlighted one by one ③ A circle and ding on the output number ④ "PAUSE & GUESS" card, with each tricky message shown for ~2 s ⑤ A reveal tick per probability | Code font ≥ 20 pt, dark editor theme |
| **10:00 Claim #2** | A two-lane race: real-time timer plus a **bill counter** per model ticking up · the speed table animating row by row · a cash-register SFX on the cost row | Speed up the footage, keep the timer real |
| **13:00 Caught lying** | Colour-grade darker, low music · "WRONG. AND SURE OF IT." · zoom on one confident-mistake row · "fine print" reveal of 3 TypeSafe quotes with sources · bar chart of the fake-job benchmark (Jev 31.2% vs classic 70.0% F1, labelled "independent test") | The emotional peak of the video |
| **15:30 The fix** | DRS "UMPIRE'S CALL" style graphic · the 3 `if` lines highlighted · live slider drag (screen) with the band table updating · "Fast model for every message · slow model only when unsure" · the app in a 10 s demo | Disclaimer lower third: "Learning project, not a safety guarantee · Scammed? 1930 / cybercrime.gov.in" |
| **17:00 Use cases** | Five mini-mockup cards (placement-email sorter, group-chat moderator, resume screener, notes search, agent safety check), ~10 s each, one number or caveat per card | Label vendor numbers as "vendor demo" |
| **18:00 Laya** | Laya's Hugging Face page, a terminal running it locally, and a 3-row comparison card (open/closed · runs locally · JevBench rank #4 vs #43) | Neutral wording on the dispute over who came first |
| **19:30 Verdict** | Scoreboard with a stamp per row: "Can't hallucinate" ⚠️ HALF TRUE · "Answers are free" ✅ TRUE* · "Worth the hype?" ✅ FOR THE RIGHT JOB, then the end card | *Fine print: input still costs ⟦$⟧ |

## Titles (pick one)
1. **Jev "Can't Hallucinate". So We Tried to Make It Lie.** ← recommended (it matches the hook)
2. We Tested Jev's Two Biggest Claims. One Didn't Survive.
3. Is Jev Worth the Hype? I Tried to Make It Lie.

## Thumbnails (pick one)
1. **Recommended:** a phone showing a scam SMS, stamped with Jev's card **"✓ VALID · SAFE 97%"**, with the host's face looking sceptical and a big red **"?"**. Text: **"CAN'T LIE?"**
2. Split: TypeSafe's claim **"CAN'T HALLUCINATE"** crossed with a red line, with the host pointing at it. Text: **"WE TESTED IT"**
3. A scoreboard: "Claim #1 ❌ · Claim #2 ✅", with the Jev wordmark and the host's face

**Rules:** never put vendor numbers (193x / 444x) on the thumbnail. The "SAFE 97%" number must be a real result from the dry run, or replaced by one.

## Description template
```
Jev's makers say it can't hallucinate, and its answers are free. We tested both claims on 100 scam and genuine messages. One didn't survive.

▶ Colab notebook: https://colab.research.google.com/github/Kiran-B23/jev-scam-detector/blob/main/notebook/jev_scam_detector.ipynb
▶ Code + dataset: https://github.com/Kiran-B23/jev-scam-detector

Our results (⟦date⟧, jev-1.13 vs ⟦chatbot⟧, one run): ⟦N⟧x faster · ⟦M⟧x cheaper · ⟦accuracy⟧
Vendor claims come from TypeSafe's own evals.

Sources: typesafe.ai launch post · docs.typesafe.ai · JevBench (github.com/fstandhartinger/jevbench) · geckguy.github.io/job-posting-triage · huggingface.co/convaiinnovations/laya

⚠️ A learning project, not a safety product. Scammed? Call 1930 or visit cybercrime.gov.in.

⟦Chapters⟧
```
