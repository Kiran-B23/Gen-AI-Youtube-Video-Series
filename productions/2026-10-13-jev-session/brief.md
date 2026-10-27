# Brief · Jev session (YouTube-ready, NxtWave house format)

| | |
|---|---|
| Topic | Jev by TypeSafe AI: the AI model that makes decisions instead of writing text |
| Format(s) | session (on camera, one instructor + Colab hands-on), written in the house script format of `references/archive-2026-10/scripts/` (rule W12) |
| Viewer | students and early-career developers, global and Indian · level: beginner-to-practitioner (can run a Colab cell; no ML background) |
| **Viewer's question** | "Everyone's talking about Jev. What is it, can I trust its answers, and when should I use it instead of ChatGPT?" |
| **Archetype** | primary: Launch · secondary (one chapter): Concept (how it decides + calibration) |
| **Why this archetype** | provisional: Launch (a newly released model, "is it worth the hype") → confirmed after YouTube analysis: the three biggest outliers (7.2×, 6.6×, 3.3× reach) are Launch videos that *show* the model working, and the best teaching structure (IBM) adds one Concept chapter on calibration (`inspiration.md`, from `productions/2026-10-12-jev-explainer/inspiration.md`) |
| **Tone (voice style)** | One friendly instructor talking to "you", like a senior who just tested it: curious and bright on the demo, plain and calm on the numbers, honest and unhurried on what goes wrong. |
| Must include | what Jev does, shown on one SMS; the three question types in one call; why its confidence can be trusted (calibration, a company claim); the two headline claims tested live; independent evidence (cost study, accuracy gap, renamed options); the threshold fix with the measured cascade; where to use it; a person-level verdict |
| Running example | The scam SMS: "Dear consumer, your electricity power will be disconnected tonight at 9:30 PM because previous month bill was not updated. Call officer immediately." (the notebook's `sms`) |
| Angle (one sentence) | Jev is a near-instant, almost-free decision model that's less accurate than an LLM, so you test it, trust it only when it's sure, and hand the rest to an LLM. |
| Chosen hook | see hooks.md (H3) |
| Runtime target | 16–20 min recorded (talk track ~2,300 spoken words at ~150 wpm ≈ 15 min, plus demo time) |
| Open questions / unverified | every result in the hands-on (⟦…⟧ slots) needs the dry run on the pinned notebook; the renamed-options probe needs one new notebook cell (production-notes.md) |

## Defaults chosen (the user gave only the topic and the reference scripts)
- **Format:** a session like the references (Hook → Intro with agenda → prose sections → `<<HANDS-ON>>` → Outro), not a reel.
  The previous house-format drafts (`sessions/01-jev/option-A`, `option-B`, 2026-09-30) are the starting point; this version
  rebuilds them on the 2026-10-11 research, the 2026-10-12 YouTube analysis and the 2026-10-12 rules.
- **One instructor**, no second character (learnings 2026-10-12). The host name stays `XXXX`, as in the references.
- **Hands-on:** the existing Colab notebook `sessions/01-jev/option-B-scam-sms-test/notebook/jev_scam_detector.ipynb`
  (Jev `jev-1.13` vs `google/gemini-3.8-flash` through one OpenRouter key; well under $1 per run).

## Locks (must never appear)
- Founder, funding, launch date, signup pause, adoption lists, Hacker News points (viewer-value filter; the 2026-09-30 drafts had them).
- Other creators' demos, lines or visuals (Doom, wiki race, checkers, flight search).
- "It won't hallucinate", "guaranteed", "100%" as our own claims (C3/W8). TypeSafe's claims are said as theirs.
- References to other NxtWave videos (S1/W9).
- Laya in the spoken script (content plan: off the core message, makers'-card numbers only). Description link only.
- Real phone numbers or links from scam messages; personal data or API keys on screen (C4).
- "The 193× / 444×" headline as a chapter: one line at most, with its missing comparator.
</content>
</invoke>
<invoke name="Bash">
<parameter name="command">cd /home/nxtwave/Gen-AI-Youtube-Video-Series && sed -n '/^| S1 /,/^| S10 /p' productions/2026-10-10-jev-reel/research.md > /tmp/claude-1000/-home-nxtwave-Gen-AI-Youtube-Video-Series/617ada02-b296-4ecc-9f70-5cf9fd428ba5/scratchpad/s1-10.md; wc -l /tmp/claude-1000/-home-nxtwave-Gen-AI-Youtube-Video-Series/617ada02-b296-4ecc-9f70-5cf9fd428ba5/scratchpad/s1-10.md