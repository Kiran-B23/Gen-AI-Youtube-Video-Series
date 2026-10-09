# Gen AI YouTube Video Series

Planning, teaching standards and session packages for **NxtWave's Gen AI YouTube sessions**: standalone, project-based videos on the latest AI tools and trends, aimed at students and early-career developers.

## Sessions

| # | Session | Status | Folder |
|---|---|---|---|
| 01 | **Jev by TypeSafe AI**, the new AI model that only decides | Two options drafted, pick one: **A** explainer (no code) or **B** scam-SMS test (Colab build) | [sessions/01-jev/](sessions/01-jev/) |

Next topics are in [planning/topics/00-INDEX.md](planning/topics/00-INDEX.md).

**Option B notebook:** [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Kiran-B23/Gen-AI-Youtube-Video-Series/blob/main/sessions/01-jev/option-B-scam-sms-test/notebook/jev_scam_detector.ipynb)

## Repository layout

```
├── planning/
│   ├── project-ideas.md          ← the ranked AI-topics playbook (starting point)
│   └── topics/                   ← one file per topic: angle, video ideas, build plan, resources
├── guidelines/
│   ├── session-teaching-guidelines.md   ← the teaching rules every session follows (hooks, YouTube style, standalone, code focus)
│   └── script-vs-video-analysis.md      ← how past scripts were actually delivered, plus script-writing rules W1–W11
├── reference/
│   ├── past-videos.md            ← links to earlier NxtWave videos used as references
│   ├── scripts/                  ← approved scripts of past videos (RAG, A2A)
│   └── transcripts/              ← auto-caption transcripts of past videos (RAG, MCP, n8n, A2A)
└── sessions/
    └── 01-jev/
        ├── README.md             ← side-by-side comparison of the two options
        ├── option-A-explainer/   ← TR doc, script, production notes (no code)
        ├── option-B-scam-sms-test/ ← TR doc, script, production notes + Colab notebook, helpers, dataset
        └── archive/v3/           ← earlier V3 package (runbook with the fact-check sources)
```

## Topic → video package (reels, shorts, long-form)
Give a topic or tool, get a ready-to-produce package: `/video-scripter "<topic>" [reel | explainer | session | all]`.

The skill (`.claude/skills/video-scripter/`) researches the topic with sources, studies similar videos online, scores hook options, then writes the script, storyboard, publish kit and QA into `productions/<date>-<slug>/`. Reference videos you want to learn from go in `references/`.

| Format | Length | Presentation |
|---|---|---|
| Reel / Short | 30–60 s (up to 3 min when needed) | faceless: voiceover, motion graphics, captions |
| Explainer | 8–15 min | on camera + screen + B-roll |
| Session | 30–60 min | on camera + hands-on build |

**Package → finished video:** `/video-studio <production folder>` builds the video with free, code-generated visuals (Manim, Playwright, VHS) on a HyperFrames timeline, with Gemini TTS voice and word-synced captions. Engine and steps: [studio/README.md](studio/README.md); roadmap: [docs/video-generation-plan.md](docs/video-generation-plan.md).

## How a new session is made
1. Pick a topic from `planning/topics/`.
2. Research what's already on YouTube, then discuss the angle before writing anything.
3. Draft the TR doc and script to `guidelines/`: standalone, YouTube-style, subject-first hook, only the idea-carrying code taught, and scripts written to rules W1–W11.
4. Dry run, fill in the real numbers, and fact-check on recording day.

Transcripts are auto-generated captions of NxtWave's own published videos. Personal contact details have been redacted.
