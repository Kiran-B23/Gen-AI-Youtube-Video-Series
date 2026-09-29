# Recording Checklist: Jev Scam Detector Session

## 1. One to two days before
- [ ] Create an OpenRouter account and API key and add $2–5 credit. Name the key `nxtwave-jev-session` so it can be revoked afterwards.
- [ ] Upload `notebook/jev_scam_detector.ipynb` to Google Drive / Colab, and put `data/scam_messages.csv` in a shareable location (Drive or a GitHub repo).
- [ ] **Full dry run** of the notebook top to bottom. Note every number the script marks ⟦…⟧:
  - [ ] Jev: total time, p50, p95, $ per 1,000, first-call probability
  - [ ] LLM: total time, p50, p95, $ per 1,000, invalid replies
  - [ ] Accuracy table (both models), confident-wrong count and examples
  - [ ] Threshold table at 0.90, number of messages sent to the fallback
- [ ] Fill the numbers into the script, slides 2/6/13 and the thumbnail.
- [ ] Decide the hook twist from the real results (see `05-presenter-runbook.md` §6).
- [ ] Rehearse the cold open and Section 4 (the concept) until they feel natural.

## 2. Filming-day fact checks (≈10 min)
- [ ] OpenRouter Jev page: model ID still `typesafe/jev-1.13`? Price still $0.042/M input, output free?
- [ ] Price of `LLM_MODEL` on its OpenRouter page. Update the `PRICE` dict if it changed.
- [ ] TypeSafe direct signups: still paused? Adjust the line in script §5a.
- [ ] `pip show typesafe-sdk` version, to show on screen.
- [ ] Put the filming date in the notebook's first cell and on screen.

## 3. Screen and privacy setup
- [ ] Browser: a clean profile with no bookmarks, no other tabs, notifications off.
- [ ] Colab: font size ≥ 16, a light or dark theme that matches the slides; clear all outputs before recording.
- [ ] The API key is **only** in Colab Secrets and never pasted into a cell.
- [ ] Phone (for the cold-open shot): a test phone or a mock-up, with **no real contacts or messages visible**.
- [ ] Don't read out or type any personal email or phone number (the MCP episode did this at ~20:20).
- [ ] Close the OpenRouter dashboard before recording, or blur the key and billing sections in the edit.

## 4. Recording order (easiest to edit)
1. Cold-open B-roll: phone notification, app demo, race animation (after the dry run, so the numbers are real).
2. Talking-head / slides segments: sections 2, 3, 4, 9.
3. Hands-on screen recording: sections 5–8 in one take per section. Pause the recording while waiting on long cells.
4. Pick-ups: any lines with numbers that changed between the dry run and the final run.

## 5. Post-production
- [ ] Cut to the demo within 20 s; the "confidently wrong" twist lands before 1:00.
- [ ] Speed up waiting (4–8x) but keep a **real-time timer overlay** in the race.
- [ ] Zoom in on outputs: `p_scam`, `type_probs`, the race table, the confident-wrong table.
- [ ] Lower-thirds the first time each term appears: Jev, TypeSafe AI, System One, Noul, Choice, Score, OpenRouter.
- [ ] "Example message · fake number/link" overlay whenever dataset messages are on screen.
- [ ] Blur check: go frame by frame through setup, Secrets and any browser tab.
- [ ] **Captions:** upload corrected captions. The auto-captions on past episodes turned "RAG" into "rack" and "n8n" into "Nin", so fix Jev / Noul / TypeSafe / OpenRouter / Gradio.
- [ ] Chapters in the description (template in the script; adjust the times).
- [ ] End card: notebook link and the next episode.

## 6. Description doc (paste and edit)
```
🚨 We built an AI scam-message detector with Jev, TypeSafe AI's new "System One" decision model, and raced it against a regular LLM on 100 messages.

▶ Colab notebook: ⟦link⟧
▶ Test dataset (100 labelled, made-up messages): ⟦link⟧

Our results (⟦filming date⟧, jev-1.13 vs ⟦LLM_MODEL⟧, one run):
• ⟦N⟧x faster · ⟦M⟧x cheaper · ⟦accuracy numbers⟧
Vendor claims (193.6x faster / 444.6x cheaper) come from TypeSafe's own in-house evals.

What you need: a Google account (Colab) and an OpenRouter API key with a little credit (the full notebook costs well under $1).

📚 Resources
• TypeSafe launch post: https://typesafe.ai/blog/introducing-system-one-models-and-jev
• TypeSafe docs (quickstart, primitives): https://docs.typesafe.ai/
• Jev on OpenRouter: https://openrouter.ai/docs/guides/community/jev
• Python SDK: https://pypi.org/project/typesafe-sdk/
• Every's independent test: https://every.to/vibe-check/mini-vibe-check-typesafe-s-jev-judged-everything-i-ve-written-in-0-7-seconds

⚠️ This is a learning project, not a safety product. If a message worries you, contact the organisation through its official app or number. In India, report cyber fraud at 1930 or cybercrime.gov.in.

⟦Chapters⟧
```
Check every link opens before publishing.

## 7. After publishing
- [ ] Revoke or rotate the OpenRouter key used on camera.
- [ ] Pin a comment inviting viewers to share tricky messages (with personal details removed) for a follow-up video.
- [ ] After 48 hours, compare retention at 0:20 / 1:00 / the start of the hands-on with the past three episodes to see whether the new hook-first format helped.
