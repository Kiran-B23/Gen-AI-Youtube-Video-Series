# Brief · How MCP works

| | |
|---|---|
| Topic | How MCP (Model Context Protocol) works |
| Format(s) | reel (9:16, faceless) · default, the user gave only "How MCP Works reel" |
| Viewer | global tech audience · level: curious practitioner (default; has heard "MCP server", hasn't seen the moving parts) |
| **Viewer's question** | "When an AI app 'uses an MCP server', what actually happens, and who really calls the tool?" |
| **Archetype** | primary: Concept · secondary (one beat only): none |
| **Why this archetype** | provisional: Concept, standard "how X works" sheet (chooser row 1: "how … works" is a neutral question about a mechanism) → confirmed after YouTube analysis: Concept is used by 3 of 4 winners (the 2-min winning Short and "How MCP actually works" are clean Concept; the 1.2M "MCP vs API" is Comparison with a Concept middle). The gap we found (no winner shows one request end to end, one says the model is the client) is a mechanism gap, which the Concept sheet's `[ANIMATE]` steps fill; "vs API" gets one line inside "why a standard", not a beat sheet |
| **Tone (voice style)** | Curious and delighted, like revealing how a magic trick is done: a calm teaching read (~2.3–2.6 words/s), brisk on the three steps, slow on the reveal ("the model never calls anything") and on the catch. |
| Must include | the three moving parts (app/client, model, server); the mechanism shown on one request (list → choose → call → answer); why a standard beats custom glue; the honest catch (poisoned tool descriptions) and the fix (trusted servers, approve calls) |
| Running example | one question typed into an AI app: "Will it rain in Tokyo tomorrow?", answered through a weather server's `get_forecast` tool (illustrative, same message shape as the spec's own weather example [S13]) |
| Angle (one sentence) | Show the one thing every "USB-C for AI" video skips: the model never touches the tool; it reads a menu and writes a note, and the app does the calling. |
| Chosen hook | "An AI model can't check the weather. So how did it just tell you it's going to rain?" (hooks.md #1, 20/20; first frame: the answered chat + giant "IT CAN'T SEE THE WEATHER.") |
| Runtime target | ~124 s (336 words ÷ 2.7); a long Short at benchmark depth with re-hooks at ~15 / 57 / 96 s. The only winning Short runs 148 s at 3.08 w/s; the house benchmark runs 2–3 min at ~2.3 w/s |
| Open questions / unverified | The tool name `get_forecast`, its arguments and the rain answer are illustrative (labelled on screen). The adoption figure ("more than 10,000 public servers") is a company claim from Dec 2025. |

## Locks (must never appear)
- No logos (Anthropic, OpenAI, Google, Microsoft…): product names as plain text only, and only in one beat.
- No outdated protocol details (no `initialize` handshake, no sampling); stick to `tools/list` and `tools/call`, which are current in spec 2026-07-28.
- No working attack payload: the catch explains tool poisoning at a high level only.
- No sources on screen; the JSON "note" is marked "illustrative".
- No line from any watched video; no "USB-C" as the hook (it's every competitor's opener and the docs' own line).
