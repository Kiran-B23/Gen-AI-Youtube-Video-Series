# Gen AI YouTube Video Series

NxtWave's Gen AI YouTube content: sourced scripts and free, code-generated videos for students and early-career developers.

## Which skill for video work
Use the two in-house skills. They hold this channel's rules, gates and feedback log.
| Request | Skill |
|---|---|
| A topic or tool → script, hooks, storyboard ("make a reel on X", "script a video") | `/video-scripter` → `productions/<date>-<slug>/` |
| A package → finished MP4 ("make the video", "render the reel") | `/video-studio` → `studio/projects/<slug>/` → `shorts/` |

- **Don't** route video requests to the Pexo skills (`make-a-video`, `youtube-short-maker`, `text-to-video`, `ai-video-generation`, …) or other paid generators: this repo is **no paid models or APIs**.
- **Engine:** HyperFrames (Apache-2.0) is the default for channel videos. Remotion needs a paid company licence for a team of NxtWave's size, so it is **optional and for the repo owner's personal use only**: `studio/tools/run.sh <slug> remotion` renders the same project with a React stage (`studio/remotion/README.md`). Use it only when the owner asks. The old `shorts-studio` engine and `shorts-video` skill were deleted on 2026-10-12 (recoverable from git history).
- **Higgsfield** (`higgsfield` CLI + `higgsfield-*` skills) is a paid generator installed for the repo owner's **personal use only**. Never use it for channel videos, thumbnails or anything in `productions/` or `studio/`, and never route a channel video request to it. Use it only when the owner explicitly asks for Higgsfield. Its skills are installed locally and git-ignored.
- **OpenArt** (`openart` MCP server, user scope, `https://mcp.openart.ai/mcp`) is a paid generator (40 one-time trial credits, then $14+/month) connected for the repo owner's **personal use only**, on the same terms as Higgsfield: never for channel videos or anything in `productions/` or `studio/`, and only on an explicit ask.
- HyperFrames, Manim, motion and audio skills (`hyperframes-*`, `media-use`) are reference material *inside* `/video-studio`, not separate entry points.

## Setup and gates
- Toolchain: `studio/tools/setup.sh` (no sudo; installs Node, ffmpeg, Python env, Manim, VHS, CC0 music). Gemini key in `studio/.env` (`GEMINI_API_KEY`), never committed.
- Gates that must be green, in order: the four scripter agents (`content-plan`, `script-review`, `visual-plan`, `structure-check`) + `lint_package.py` (package) · `run.sh <slug> validate` (before spending a voice request) · `voice` (pace table: house 2.3 w/s from `studio/templates/reel/pace.json`; fails over 2.9 per scene / 2.6 delivery, never `atempo`) · `check` · `payoffs` (every beat's element on screen on its word, before any render) · `render` → `qa` → `watch` → `review` (the fix list `projects/<slug>/review.md`) → `deliver` (the only step that copies to `shorts/`).
- A video is "ready for your review", never "ready", and only after `deliver`: the user still watches and listens on a phone.
- **Studio app** (`app/`, plan `docs/studio-app-plan.md`): a LAN web UI over the same `run.sh` steps and `review.md`. It only spawns allow-listed `run.sh` steps and `review.py`, so the terminal stays the source of truth (`app/README.md`).
- The engine branch `video-quality-gates` (2026-10-16) holds these gates; the Dots reel is its validation pilot.

## Rules that live elsewhere (read them, don't duplicate them here)
- The user's accumulated feedback: `.claude/skills/video-scripter/references/learnings.md` (overrides generic instincts).
- Teaching sessions: `guidelines/session-teaching-guidelines.md`, script rules W1–W11 in `guidelines/script-vs-video-analysis.md`.
- The repo is public: other creators' transcripts and frames stay in git-ignored `productions/*/yt/`; secrets stay in `.env`.
