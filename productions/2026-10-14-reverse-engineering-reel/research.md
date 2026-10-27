# Research · REA ("Reverse Engineer Anything")

_Researched on 2026-10-14. Labels: company claim (here: the REA project's own README, disclaimer and showcases) ·
independent · our test · community. The topic "Reverse Engineering Anything" is the viral open-source project **REA:
Reverse Engineer Anything** (github.com/morluto/rea), GitHub's #1 trending repo in October 2026. **No "our test":** a
local run of REA's static JavaScript analysis on a self-written toy app was blocked by this machine's permission policy,
so nothing in the script may claim we ran it._

## One-line definition (by what it does)
REA (say "R-E-A") is an open-source (MIT) add-on (an MCP server plus a command-line tool) that gives a coding agent
(Claude Code, Codex, Cursor, Gemini CLI…) the tools to look inside software **it has no source code for**: it inspects the
app or binary, traces how one feature works, and hands back the evidence, so the agent can explain it or build its own
version. [S1] [S2]

## Fact sheet
| # | Fact | Source | Date | Label | Viewer value | Use in |
|---|---|---|---|---|---|---|
| S1 | Repo description: "Reverse engineer anything with agents, from app behavior down to native binaries." README: "See a feature in an app that you want in your own product? Ask your agent to investigate it with REA. It can inspect the app without its source code, explain how the feature works, show the evidence, and build a version for your project." MIT licence. Install: `npx rea-agents setup` (registers the MCP server + workflow instructions with the agent). | https://github.com/morluto/rea (README + GitHub API) | read 2026-10-14 | company claim (project README) | the plain definition, by what it does; it's open source (MIT); the README never says "free" | reel |
| S2 | "REA connects your agent to tools for inspecting native binaries, JavaScript and Electron apps, .NET assemblies, and websites." "Analysis runs locally, and results include the evidence and limitations behind each conclusion." How it works: "Your agent calls REA through MCP to inspect the target and trace relevant code. REA returns findings with their evidence. The agent uses them to ask follow-up questions, explain the behavior, or write and test an implementation." Figure alt-text: the agent uses "the returned code, references and unknowns to explain, implement and test." | README (as S1) | read 2026-10-14 | company claim | the mechanism in one loop: agent asks → REA inspects and traces → evidence + unknowns back → agent explains / builds / tests | reel |
| S3 | Supported targets (README table): native binaries (pseudocode, assembly, strings, symbols, calls, references; needs Hopper, Ghidra or IDA), JavaScript/Electron (modules, imports, routes, IPC), websites, saved network captures, .NET, Android APKs (needs JADX + JDK), firmware (Linux), Go/Rust binaries, WASM and more. Supported agents: Claude Code, Codex, Cursor, Gemini CLI, Grok Build and others (any agent with local MCP). | README | read 2026-10-14 | company claim | "anything" in practice = a long list of formats, each with its own requirements | reel (one line: the range) |
| S4 | Deep native analysis needs Hopper, Ghidra or IDA ("Deep native analysis uses one of them"); static JavaScript and .NET inspection need no native engine. "REA grants no tool license… You must legally obtain and be authorized to use commercial tools" (IDA Pro, Hopper, JEB). Node.js 22.19+/24.11+/26+. | README FAQ + License | read 2026-10-14 | company claim | it plugs into the existing RE toolchain; it doesn't replace the decompiler | reel (one line) · explainer |
| S5 | "Does REA upload my app? REA analyzes targets locally. Your agent receives the tool results, and its model provider has its own data policy." | README FAQ | read 2026-10-14 | company claim | privacy: the analysis is local, but the findings go to your AI provider | explainer · catch candidate |
| S6 | **DX-Ball showcase** (an old Windows brick-breaker game): question "how does the game turn a brick's position into left/right sound panning?" The decompiler's first pseudocode was incomplete: it declared the function with no input (`FUN_00406400(void)`); the instruction view "exposes the integer input missing from the decompiler view", and "that discrepancy gave the agent a concrete reason to keep investigating". (Correction by the content-plan agent: the earlier "omitted the crucial integer parameter" quote is not on any primary page; the showcase doesn't name which decompiler produced the draft.) The agent traced the caller and constants and rebuilt the function in C (multiply by 1.5625, subtract 500, scale, convert to integer). Checked two ways (by the reconstruction project: "REA supplies the instructions, callers and data reads; the reconstruction project implements and tests the result"): it "passes 3,205 original-x86 cases" (every screen position 0–640 at five pan scales) and "reproduces all 63 compiled function bytes" with the original compiler. | https://rea.tools/showcase/dx-ball/ · README Showcases · reconstruction repo https://github.com/N0zoM1z0/dx-ball | read 2026-10-14 | company claim (project showcase; the reconstruction repo is public, so the test is checkable) | the best running example: a real question, an incomplete raw output, and a real check | reel (running example) |
| S7 | **Notion showcase:** traced how the Notion desktop app copies to the clipboard, renderer → preload → IPC channel → main process → system clipboard; found the copied HTML carries a hidden copy ID that Notion checks on paste. Stated limit: "tracing only the initial IPC request misses the later conversation." | https://rea.tools/showcase/notion/ | read 2026-10-14 | company claim | a second, app-level example (Electron) | explainer (not reel: one running example) |
| S8 | **DISCLAIMER:** "Decompilation, reconstruction, heuristics, and AI-assisted analysis may be incomplete or incorrect… Review the underlying evidence and verify consequential conclusions before relying on them." | https://github.com/morluto/rea/blob/main/DISCLAIMER.md | read 2026-10-14 | company claim (the project's own warning) | the honest limit, in the maker's own words: check the evidence | reel (catch / verdict) |
| S9 | **DISCLAIMER (legal):** REA is for "lawful analysis: security research, malware and incident analysis… CTFs and education, interoperability, software preservation, and debugging or auditing software you own or are authorized to examine." It won't help with "circumventing DRM, license checks, anti-cheat", "copying proprietary software or reproducing its protected code and assets". "Reverse engineering may be restricted in your jurisdiction or by the license of the software you analyze." "Obtaining source-like output… does not grant rights to the original program." | DISCLAIMER.md | read 2026-10-14 | company claim | the decision line: who may use it on what. The README's own pitch ("a feature… you want in your own product") hides this | reel (catch) |
| S10 | REA "does not recover the original source code but instead reconstructs the logic and behavior of an application." Warns that copying competitors' products or bypassing DRM "can lead to significant legal and ethical violations." | https://www.geeky-gadgets.com/reverse-engineer-anything-github-repo/ | 2026-10-11 | independent (press, no hands-on) | sets the expectation: logic, not the original code | reel (one phrase) |
| S11 | Growth: under 10,000 stars on Oct 6, past 100,000 by Oct 12 (dev.to); GitHub API shows **215,092 stars** on 2026-10-14; README: "200,000 GitHub stars". Repo created April 2026. | https://dev.to/hassann/what-is-rea-reverse-engineer-anything-the-mcp-server-that-hit-115k-github-stars-in-a-week-1coc ; GitHub API | 2026-10-12 / 2026-10-14 | independent (counter) | why everyone is talking about it now | reel (one number, optional; "over 200,000 stars" is safe) |
| S12 | dev.to: seven minor versions in nine days, "a minor version may contain breaking changes"; its local provider bridge "is not a sandbox"; best for "focused questions" rather than "whole-application reconstruction"; "copying a competitor's feature raises the same legal questions it did before REA existed." | dev.to (as S11) | 2026-10-12 | independent | it's young and moving fast; use it on focused questions | explainer · catch support |
| S13 | Coverage linking REA to unrelated incidents/projects (e.g. an AI hacking tool used on banks, a rebuilt creative app) is not supported by primary evidence: "We found no primary evidence establishing that connection." | https://eu.36kr.com/en/p/4020977643671686 | 2026-10 | independent | don't repeat viral claims that REA "cloned" something | cut (lock: no such claims) |

## Running-example candidates
1. **The DX-Ball sound-pan question** ✅ chosen (provisional; content plan confirms). One concrete feature anyone can
   picture (the ball hits a brick on the left → the sound comes from the left), one hidden formula, and the full arc: the
   raw pseudocode is **incomplete** (missing the input) → the agent checks the instructions → rebuilds the function → it is **checked**
   (3,205 cases, 63 identical bytes). It's lawful (a 1990s game, software preservation/education) and the reconstruction
   is public. Visual: a generic brick-breaker drawn in house style (no game art).
2. Notion's clipboard (S7): great Electron trace, but a live commercial product makes the "copy a feature" ethics murkier
   and it ends without a check step.
3. "Reverse-engineer an app's private API" (the dev.to walkthrough): popular, but it's the use most likely to break a
   service's terms; wrong first example for students.

## Analogy candidates
- **A detective with a forensics lab**: the agent asks questions, REA is the lab that runs the tests and hands back
  evidence bags with labels ("seen", "unknown"). Works, but cliché.
- **Recovering a recipe by tasting the dish, then cooking it until it tastes identical** (ours): you never see the
  original recipe; you test until your version matches. Maps exactly to 3,205 cases + 63 identical bytes.

## Limitations, risks, costs (candidates: the content plan decides whether any of them is material enough to say)
- **Raw output can be incomplete or incorrect**: the showcase's own pseudocode missed an input [S6]; "may be incomplete or incorrect" [S8].
- **Legal / permission**: only on software you own or are authorized to examine; licences and local law can forbid it;
  output gives you no rights to the original [S9]. The README's headline pitch is about taking features "you want in your
  own product" [S1].
- **Privacy**: analysis is local, but results go to your AI model provider [S5].
- **Setup**: deep native analysis needs Ghidra (free), Hopper or IDA (commercial) [S4].
- **Young, fast-changing** tool; local bridge "not a sandbox" [S12].

## Alternatives / competitors
- Ghidra MCP servers (e.g. GhidraMCP) and IDA MCP plugins: one engine each; REA wraps several formats in one MCP.
- Doing it by hand in Ghidra / IDA / Hopper (what REA calls underneath).

## Viewer questions to answer
- What does it actually do? (inspect + trace + evidence → agent explains/builds)
- Does it give me the source code? (No: logic and behaviour, reconstructed [S10])
- Can I trust what it says? (Check the evidence; the showcase checks its result with tests [S6] [S8])
- Is it legal? (Only on software you own or are allowed to examine; licences and laws vary [S9])
- What do I need? (An agent with MCP, Node; Ghidra/Hopper/IDA for native binaries [S4])

## Cut by the viewer-value filter (and why)
- Star-count day-by-day table, creator's research interests, version numbers, Node minor versions: trivia.
- Links to unrelated hacking incidents or "AI cloned app X" stories: unsupported by primary sources [S13] and off-message.
- The full list of 20+ target formats: one line of range is enough.
