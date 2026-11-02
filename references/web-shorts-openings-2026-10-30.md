# How top shorts open: the first 3 seconds (2026-10-30)

This follows `web-shorts-2026-10-30.md`, which measured fill at 1.5 s. This note looks at what is on screen at
0, 0.5, 1.5 and 3 s, because our reels passed the fill test and still opened cluttered. The media was analysis-only
and was not kept; the repo is public. Learn structure, never copy lines or visuals.

The 12 shorts:
- The 10 most-viewed recent Shorts of ByteByteGo (`jo6U429l3JM`, `551lh10g_go`), Fireship (`aXcuz6fn8_w`,
  `Z8omJ59hNfY`), KodeKloud (`Hp-fPImMNfs`, `7atGIcL-vRY`), codebasics (`P5d3CYr1zAA`), bycloud (`SJtyJRsqfME`,
  `zGDTVZdRHWE`) and IBM Technology (`PfP2vNVmCTE`).
- The faceless AI shorts already in `references/yt-faceless/`.

| Short (views) | 0 s | 0.5–1.5 s | 3 s |
|---|---|---|---|
| KodeKloud · file compression (663K) | a small label, one word of the question, an empty folder | the question types out with the voice; a cursor right-clicks the folder → Compress | full question; the folder becomes a zip; sizes under both |
| KodeKloud · Git and Anthropic (381K) | one logo on black | the same | one icon, then it cracks and an arrow points to the replacement |
| Fireship · web history (5.2M) | a year on black | one word and one box build in | the year rolls on; the next word arrives |
| Fireship · AI lies (3.0M) | two words + his face | the line grows a word at a time with the voice | a punch-in on the eyes |
| LangChain · PII (faceless) | one line: the question | one small subline | unchanged |
| microlearn · robot (faceless) | headline, a mascot, an empty card | the card fills | the card is crossed out; the headline is struck through |
| bycloud · Sora (73K) | one full-bleed clip + a 2-line caption | the same | the same |
| ByteByteGo · Discord (2.4M) | a dense cover frame (thumbnail style) | cut to the presenter + one caption | a full-bleed graphic + caption |
| Ours · Harness v2 | question, card, stamp, fail row, 2 chips, a tag, the caption (5 things, 24 words) | the same | the same |

## What the openings share
- **1–3 things and ≤ ~5 words at 0 s.** The faceless explainers open on one question line, one label or one object.
  Ours opened on 5 things and 24 words.
- **The hook is built with the voice, not presented.** The question types out word by word as it is spoken. The
  object acts on its word: the right-click on "compressed", the crack on "wasn't enough". By 3 s the hook is complete.
- **Empty space is fine.** KodeKloud's opening is mostly black. Its fill at 1.5 s is still 57 %, because the label at
  the top and the object below span the band. Fill measures span, not density, so clutter passes it too.
- **One text layer at a time.** While the question types out, there is no separate caption: the question is the
  caption (KodeKloud, Fireship). When both exist, they say different things.
- **No small labels in the hook.** No disclosure tags, speed chips or status chips in the first 3 s.
- **Exception: ByteByteGo's cover frame.** Frame 0 is a dense thumbnail-style frame, cut away by 0.5 s. That is a
  cover for the Shorts grid, not a hook; Shorts takes a separate thumbnail, so we don't copy it.

## Rules this changed (2026-10-30)
- `payoffs` adds an opening ceiling: at 0 s ≤ 3 things and ≤ 6 words, at 3 s ≤ 5 things and ≤ 12 words. Captions,
  chips and tags all count. The 45 % fill test at 1.5 s stays, so a near-empty opening still fails. `qa` and
  `review` carry the result.
- `visual-plan` rule 5 counts every readable word; rule 6 requires the build and rejects a finished frame 0.
- The animation-plan template adds a "First seconds" line (what arrives on which word). The content-plan template
  says the hook question types out as it is spoken.
- A scene can set `"captions": false` (`assemble.py`), so the typing question is the only caption.
- `reference-flat/design.md`: "fill the frame" applies after the opening, not to it.
