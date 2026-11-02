# Reel script · Ollama: run a small AI model on your own laptop

**Archetype:** Tutorial · **Viewer's question:** Can I run an AI model on my own laptop, for free and without internet, and how do I start? · **Running example:** one 8 GB laptop running `ollama run llama3.2` in a terminal (illustrative replica), asked "Explain recursion in one line."
**Tone:** clear, upbeat and confident, like a friend sitting next to you; steady house pace, slight emphasis on each exact command; calm on the catch · **Words:** 158 · **Est. runtime:** 69 s of speech at the house 2.3 w/s (≈ 72 s with the house pauses) · **Winners' range:** 129–162 s at 2.1–3.4 w/s (inspiration.md); kept to ~60 s because the owner asked for short and simple

_Rows = the Tutorial reel beat sheet (result first → promise + needs → step 1 → step 2 → step 3 → gotcha → result again + CTA), with the planned catch as one beat pair before the CTA. One beat = one claim = one visual. Three numbered steps (Tutorial). The terminal is an illustrative replica of the documented commands; no "our test"._

| # | Beat (from archetype) | Time | Spoken line (with [cues]) | Words | Visual tag | On-screen text | Source |
|---|---|---|---|---|---|---|---|
| 1 | Result first | 0–4 s | [warm, a little amazed] This AI model answers with the Wi-Fi off. | 8 | [TERMINAL] | >>> Explain recursion in one line · Wi-Fi off · illustrative | S5, S7 |
| 2 | Promise + needs | 4–10 s | That's Ollama, a free, open-source app that runs AI models on your laptop. | 13 | [TITLE] | OLLAMA · free · open source · runs on your laptop | S2, S12 |
| 3 | Step 1 | 10–15 s | Step one: install Ollama. On Mac or Linux, paste this line. | 10 | [TERMINAL] | curl -fsSL https://ollama.com/install.sh \| sh · Windows: OllamaSetup.exe | S1 |
| 4 | Step 2 | 15–20 s | [slight emphasis] Step two: type ollama run llama three point two, a small AI model. | 13 | [TERMINAL] | ollama run llama3.2 | S2, S3 |
| 5 | Step 2 | 20–25 s | The first run downloads it, about two gigabytes, onto your laptop. | 11 | [TERMINAL] | pulling llama3.2 · ~2 GB · ~/.ollama/models | S3, S7, S8 |
| 6 | Step 3 | 25–29 s | Step three: ask it to explain recursion in one line. | 10 | [TERMINAL] | >>> Explain recursion in one line | S2 |
| 7 | Step 3 | 29–34 s | Ollama says they don't see your prompts when you run locally. | 11 | [TERMINAL] | runs locally · on your laptop | S5 |
| 8 | Result again | 34–38 s | [beat] After that one download, it answers with the Wi-Fi off. | 10 | [TERMINAL] | Wi-Fi off · still answering | S5, S7, S8 |
| 9 | Gotcha | 38–43 s | [slow down] The size rule. Models are sized in parameters, the numbers they learned in training. | 14 | [VS] | size = parameters · learned in training | S3, S4 |
| 10 | Gotcha | 43–49 s | Seven billion parameters need at least eight gigabytes of RAM. Thirteen billion need sixteen gigabytes. | 15 | [VS] | 8 GB → 7B · 16 GB → 13B | S4 |
| 11 | Gotcha | 49–52 s | Llama three point two is three billion. It fits. | 9 | [VS] | llama3.2 = 3B · fits | S3, S4 |
| 12 | Catch | 52–58 s | [calm] One catch: Ollama also has cloud models. They need a sign-in and run on its servers. | 16 | [VS] | cloud = sign-in · Ollama's servers | S5, S6 |
| 13 | Catch | 58–64 s | Private and offline only applies to local ones, like llama three point two. | 13 | [VERDICT] | PICK LOCAL · llama3.2 = local | S5, S6 |
| 14 | CTA | 64–66 s | [smile] What should I explain next? | 5 | [CTA] | What should I explain next? | – |

**Pronunciation notes:** "Ollama" (oh-LAH-mah) · "llama three point two" (the model `llama3.2`; on screen as `llama3.2`) · "Wi-Fi" (WHY-fye) · "RAM" (one word, "ram") · "parameters" (pa-RAM-eh-ters; on screen "7B", "3B") (→ `names` in scenes.json)

**Accuracy notes (for the voice and the stage):**
- Beat 1 and beat 8: an illustration, labelled "illustrative" on screen; no first-person claim of a run we did. It holds for a local model after the one download (S7 "pulls models from the Internet"; S5 "Ollama runs locally"; S8 the model is a file on disk).
- Beat 2: "free, open-source" = the MIT licence (S12); local models need no account or key (S6).
- Beat 3: the Mac/Linux line is shown in full; a small "Windows: OllamaSetup.exe" chip covers Windows (S1); "Mac or Linux" because the same curl line is documented for both.
- Beat 5: "about two gigabytes" is the README's 2.0GB (S3 @379fd64fa8, 2026-02-12); on screen "~2 GB".
- Beat 7: attributed ("Ollama says they", matching S5's "We don't see your prompts"), local only (S5).
- Beats 9–11: "parameters, the numbers they learned" is the plain definition (a model's size in the README table is given in parameters, S3); S4 "at least 8 GB of RAM available to run the 7B models, 16 GB to run the 13B models" (said with "at least" and both thresholds; one bar per sentence on screen); llama3.2 is 3B (S3). One number on screen per moment (the Goldfish mixed the 2 GB download with the 8 GB RAM).
- Beats 12–13: the planned catch (content-plan.md). Cloud models need a sign-in ("Sign in to use cloud models, or choose a local model", S6) and run on Ollama's servers (S5); the sign-in is the tell and beat 13 is the fix.

## Read-aloud version (clean: exactly what the voice says, one paragraph per beat)

This AI model answers with the Wi-Fi off.

That's Ollama, a free, open-source app that runs AI models on your laptop.

Step one: install Ollama. On Mac or Linux, paste this line.

Step two: type ollama run llama three point two, a small AI model.

The first run downloads it, about two gigabytes, onto your laptop.

Step three: ask it to explain recursion in one line.

Ollama says they don't see your prompts when you run locally.

After that one download, it answers with the Wi-Fi off.

The size rule. Models are sized in parameters, the numbers they learned in training.

Seven billion parameters need at least eight gigabytes of RAM. Thirteen billion need sixteen gigabytes.

Llama three point two is three billion. It fits.

One catch: Ollama also has cloud models. They need a sign-in and run on its servers.

Private and offline only applies to local ones, like llama three point two.

What should I explain next?
