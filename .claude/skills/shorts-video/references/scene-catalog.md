# Scene catalog

Every scene type lives in `engine/scenes/`. Pick the type that best shows the
spoken line. Vary layouts: avoid more than two similar scene types in a row,
because repeated layouts make the middle of a video feel slow.

Each scene accepts `beats` (see video-json.md) so elements appear on spoken
words. All scenes accept optional `source` (string for a source pill) and
`accent` (theme color key).

| type | Best for | Key props |
|---|---|---|
| `hook-split` | Opening contrast: slow old way vs new thing | `left {label, mode:"typing"\|"waiting"}`, `right {label, chip}`, `headline` |
| `hook-scene` | Opening story moment (e.g. 3 AM bedroom, phone lighting up) | `setting` ("bedroom-night", "desk", "office-empty"), `clock`, `notifications[]` |
| `title-burst` | Revealing the product name | `title`, `subtitle`, `chips[]` |
| `stat-cards` | Hype / traction numbers | `cards[] {value, label, emoji}` |
| `split-compare` | Old vs new, A vs B, analogy | `left {title, items[], illustration}`, `right {...}`, `verdictLine` |
| `flow-diagram` | How it works: inputs → engine → outputs | `inputs[]`, `engineLabel`, `outputs[]`, `then` (optional routed result) |
| `step-flow` | 3 to 4 step process | `steps[] {icon, label}` |
| `phone-mockup` | Product UI walkthrough (fields, toggles, lists) | `screens[] {title, elements[]}`, optional `broll` video path |
| `story-card` | A real anecdote told visually | `character` (generic illustrated person), `beats[]` of on-screen states |
| `race-bars` | Speed comparisons | `bars[] {label, value, unit}`, `resultLabel` |
| `counter-compare` | Cost or size comparisons | `items[] {label, value, prefix}`, `multiplierLabel` |
| `big-number` | One huge stat, full screen | `value`, `label`, `emoji` |
| `big-stamp` | A blunt answer: "NO.", "FREE", "NOT YET" | `text`, `subtext`, `color` |
| `tile-grid` | Use cases, features | `tiles[] {emoji, label}` |
| `card-carousel` | Personas ("what would YOUR X do?") | `header`, `cards[] {persona, emoji, miniUi[]}` |
| `rules-panel` | Settings, permissions, safety controls | `title`, `options[] {label, state}` |
| `checklist` | The catch / limitations | `title`, `items[] {text, kind:"warn"\|"ok"\|"no"}` |
| `verdict-columns` | Pros vs cons, worth the hype? | `pros[]`, `cons[]`, `verdict` |
| `timeline` | History or "the bigger picture" | `points[] {year, label}` |
| `versus-card` | Competitor framing | `a`, `b`, `caption` |
| `code-card` | Showing a tiny code example | `language`, `code` (≤10 lines), `outputs[]` |
| `quote-card` | Paraphrased claim with attribution | `text`, `attribution` (never long verbatim quotes) |
| `cta` | Comment question + follow | `question`, `followLabel`, `loopTo` (scene id to visually match) |

## Pairing guide

- Hook → `hook-split` or `hook-scene` (pick the one that shows a feeling, not a definition)
- "What is it" → `split-compare` with the sticky one-liner as `verdictLine`
- "How it works" → `flow-diagram` or `step-flow`
- Numbers → alternate `race-bars`, `counter-compare`, `big-number` (never three stat scenes in a row)
- Relatability → `story-card` then `card-carousel`
- Worry/safety → `rules-panel`
- Catch → `checklist`
- Bigger picture → `timeline` or `versus-card`
- End → `cta`

## Adding a new scene type

Only when no existing type fits. Build it generically (props, theme colors,
beats, safe zones), register it in the scene map, add it to this table and to
the catalog composition so future videos can reuse it.

## Teaching scenes (editorial preset)

| type | Best for | Key props |
|---|---|---|
| `title-hook` | Giant condensed headline question on the first frame | `lines[]`, `highlightWord`, `backdrop` ("number-rain", "none") |
| `running-example` | Introducing the one example followed all video | `eyebrow`, `text`, `segments[]` (numbered boxes) |
| `chapter-card` | Start of each numbered step | `index` ("01"), `total`, `title`, `bg` |
| `mechanism-step` | Showing an operation literally (cursor cuts, pieces split, items join) | `before`, `after`, `operation` ("cut", "split", "merge", "lookup", "wrap"), `tags[]` (YES/NO) |
| `token-strip` | A row of mono boxes that grows/changes across scenes | `tokens[] {text, kind}`, `counterLabel` |
| `lookup-table` | ID tables, dictionaries, "roll number" mappings | `columns[]`, `rows[]`, `highlightRow`, `arrowTo` |
| `grid-matrix` | Batches, masks, vocab walls, attention grids | `rows[][]`, `cellKinds`, `labels` |
| `big-counter` | Progress numbers between chapters ("3 PIECES" → "5 TOKENS") | `value`, `unit` |
| `side-by-side-variants` | Same input, different systems' outputs | `rows[] {label, tokens[], count}` |
| `recap-card` | Final summary of all steps (great for saves) | `title`, `subtitle`, `steps[]`, `question`, `next`, `loopTo` |
| `equation` | A × B = C punchlines (cost math, token math) | `terms[] {text, label, color}`, `ops[]`, `source` |

`mechanism-step` modes in the engine: `token-loop` (LLM writes piece by piece, run counter), `one-pass` (probability bars per option + other answers in the same pass), `gate` (confidence rows, threshold, ✅ auto / 🙋 human). Any scene can open a chapter with `"chapter": {"index", "title"}` and pick a flat page with `"page": "ink|royal|paper|sunflower"`.

Rule: once a running example appears, every later teaching scene shows it
evolving, so the viewer always tracks one concrete thing.
