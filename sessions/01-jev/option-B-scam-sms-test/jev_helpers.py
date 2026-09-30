"""Behind-the-scenes helpers for the Jev scam-detector session.

The session only teaches the Jev part: the few lines where Jev replaces a regular
LLM call. Everything here is plumbing (timing a fair race, scoring, charts,
the web app) that viewers just run. You never need to read this file to follow
the session, but it is short and commented if you're curious.
"""
import asyncio
import json
import os
import time

import pandas as pd

__all__ = ["get_api_key", "ask_llm", "load_messages", "race", "scoreboard", "confident_mistakes",
           "threshold_table", "reliability_plot", "launch_app", "load_saved_results",
           "band_report", "make_checker"]

OPENROUTER_BASE = "https://openrouter.ai/api"
JEV_MODEL = "jev-1.13"                  # pinned; "jev-latest" can change without warning
LLM_MODEL = "google/gemini-3.8-flash"   # the "regular LLM" we compare against
SCAM_AT, SAFE_AT = 0.90, 0.10           # default thresholds (the session sets its own)

# Only used if a response has no usage.cost field. USD per 1M tokens; recheck on OpenRouter.
PRICE = {JEV_MODEL: {"in": 0.042, "out": 0.0}, LLM_MODEL: {"in": 0.75, "out": 3.75}}

CSV_URL = "https://raw.githubusercontent.com/Kiran-B23/Gen-AI-Youtube-Video-Series/main/sessions/01-jev/option-B-scam-sms-test/data/scam_messages.csv"


# ---------- setup ----------
def get_api_key() -> str:
    """Read OPENROUTER_API_KEY from Colab Secrets, the environment, or ask for it."""
    global OPENROUTER_API_KEY
    try:
        from google.colab import userdata
        key = userdata.get("OPENROUTER_API_KEY")
    except Exception:
        key = os.environ.get("OPENROUTER_API_KEY")
    if not key:
        import getpass
        key = getpass.getpass("OpenRouter API key: ")
    OPENROUTER_API_KEY = key
    print("✅ Key loaded" if key else "❌ No key found")
    return key


def _llm_sync():
    from openai import OpenAI
    return OpenAI(api_key=OPENROUTER_API_KEY, base_url=OPENROUTER_BASE + "/v1")


def ask_llm(prompt: str, json_mode: bool = False) -> str:
    """Send one prompt to the regular LLM and return its raw text reply."""
    kwargs = {"response_format": {"type": "json_object"}} if json_mode else {}
    resp = _llm_sync().chat.completions.create(
        model=LLM_MODEL, messages=[{"role": "user", "content": prompt}], **kwargs)
    return resp.choices[0].message.content or ""


def load_messages() -> pd.DataFrame:
    """The 100 labelled test messages (60 scams, 40 genuine)."""
    for path in ("data/scam_messages.csv", "../data/scam_messages.csv"):
        if os.path.exists(path):
            return pd.read_csv(path)
    return pd.read_csv(CSV_URL)


# ---------- the race ----------
def _cost(usage: dict, model: str) -> float:
    if usage.get("cost") is not None:
        return float(usage["cost"])
    p = PRICE[model]
    return (usage.get("input_tokens", 0) * p["in"] + usage.get("output_tokens", 0) * p["out"]) / 1e6


LLM_PROMPT = '''You are a scam detector for Indian SMS and WhatsApp messages.
Reply with ONLY a JSON object with exactly these keys:
  "scam_probability": number from 0 to 1,
  "scam_type": one of {types}
Message:
<message>{message}</message>'''


async def _jev_one(client, questions, msg_id, message, sem):
    async with sem:
        t0 = time.perf_counter()
        r = await client.system_one(state=message, questions=questions)
        latency = time.perf_counter() - t0
    usage = r.raw_http_response.json().get("usage", {})   # the SDK drops OpenRouter's `cost`, so read it raw
    return {"id": msg_id, "latency_s": latency, "cost_usd": _cost(usage, JEV_MODEL), "valid": True,
            "p_scam": r.nouls["is_scam"].noul, "scam_type": r.choices["scam_type"].choice}


async def _llm_one(client, scam_types, msg_id, message, sem):
    async with sem:
        t0 = time.perf_counter()
        resp = await client.chat.completions.create(
            model=LLM_MODEL,
            messages=[{"role": "user", "content": LLM_PROMPT.format(types=list(scam_types), message=message)}],
            response_format={"type": "json_object"},
            extra_body={"usage": {"include": True}},
        )
        latency = time.perf_counter() - t0
    u = resp.usage
    usage = {"cost": (u.model_extra or {}).get("cost"), "input_tokens": u.prompt_tokens,
             "output_tokens": u.completion_tokens}
    try:
        obj = json.loads(resp.choices[0].message.content or "")
        valid = (isinstance(obj, dict) and isinstance(obj.get("scam_probability"), (int, float))
                 and 0 <= obj["scam_probability"] <= 1 and obj.get("scam_type") in scam_types)
    except json.JSONDecodeError:
        obj, valid = {}, False
    return {"id": msg_id, "latency_s": latency, "cost_usd": _cost(usage, LLM_MODEL), "valid": valid,
            "p_scam": obj.get("scam_probability") if valid else None,
            "scam_type": obj.get("scam_type") if valid else None}


async def race(df: pd.DataFrame, questions: dict, scam_types: dict, concurrency: int = 10):
    """Run Jev and the regular LLM on every message, 10 at a time each (same rules for both).

    `questions` must contain a Noul named "is_scam" and a Choice named "scam_type".
    Returns one table with our labels plus both models' answers, and prints the speed/cost scoreboard.
    """
    from openai import AsyncOpenAI
    from typesafe_sdk import AsyncTypeSafeClient

    jev = AsyncTypeSafeClient(api_key=OPENROUTER_API_KEY, base_url=OPENROUTER_BASE, model=JEV_MODEL)
    llm = AsyncOpenAI(api_key=OPENROUTER_API_KEY, base_url=OPENROUTER_BASE + "/v1")

    async def run(one, client, extra):
        sem = asyncio.Semaphore(concurrency)
        t0 = time.perf_counter()
        rows = await asyncio.gather(*(one(client, extra, i, m, sem) for i, m in zip(df.id, df.message)))
        return pd.DataFrame(rows), time.perf_counter() - t0

    print("🏁 Jev is running...")
    jev_df, jev_wall = await run(_jev_one, jev, questions)
    print(f"   done in {jev_wall:.1f}s")
    print("🏁 Regular LLM is running...")
    llm_df, llm_wall = await run(_llm_one, llm, scam_types)
    print(f"   done in {llm_wall:.1f}s\n")

    board = pd.DataFrame({
        "Jev": _speed(jev_df, jev_wall),
        f"Regular LLM ({LLM_MODEL})": _speed(llm_df, llm_wall),
    })
    board["Jev advantage"] = [
        f"{llm_wall / jev_wall:.1f}x faster",
        f"{llm_df.latency_s.median() / jev_df.latency_s.median():.1f}x faster",
        f"{llm_df.cost_usd.sum() / max(jev_df.cost_usd.sum(), 1e-12):.0f}x cheaper",
        "",
    ]
    _show(board)
    results = (df.merge(jev_df.add_suffix("_jev").rename(columns={"id_jev": "id"}), on="id")
                 .merge(llm_df.add_suffix("_llm").rename(columns={"id_llm": "id"}), on="id"))
    results.to_csv("race_results.csv", index=False)   # reload with load_saved_results()
    return results


def load_saved_results() -> pd.DataFrame:
    """Backup for recording day: reload the last race instead of re-running it."""
    return pd.read_csv("race_results.csv")


def _speed(res, wall):
    return {"time for 100 messages": f"{wall:.1f} s",
            "typical time per message": f"{res.latency_s.median():.2f} s",
            "cost per 1,000 messages": f"${res.cost_usd.sum() * 10:.4f}",
            "broken / invalid answers": int((~res.valid).sum())}


# ---------- grading ----------
def scoreboard(results: pd.DataFrame) -> None:
    """Accuracy on our labels. A message counts as 'scam' when p_scam >= 0.5."""
    def grade(suffix, rows):
        if rows.empty:
            return {"accuracy": "—", "scams caught": "—", "false alarms on genuine messages": "—",
                    "scam type correct": "—"}
        pred = rows[f"p_scam_{suffix}"] >= 0.5
        truth = rows.is_scam == 1
        scams = rows[truth]
        return {"accuracy": f"{(pred == truth).mean():.0%}",
                "scams caught": f"{(pred & truth).sum()} / {truth.sum()}",
                "false alarms on genuine messages": f"{(pred & ~truth).sum()} / {(~truth).sum()}",
                "scam type correct": f"{(scams[f'scam_type_{suffix}'] == scams.scam_type).mean():.0%}"}
    valid = results[results.valid_llm]
    board = pd.DataFrame({"Jev": grade("jev", results),
                          f"Regular LLM (valid answers only, {len(valid)}/100)": grade("llm", valid)})
    return _show(board)


def confident_mistakes(results: pd.DataFrame, scam_at: float = SCAM_AT, safe_at: float = SAFE_AT) -> None:
    """Messages Jev got wrong while being past our thresholds, i.e. sure of itself."""
    p = results.p_scam_jev
    wrong = results[(p >= 0.5) != (results.is_scam == 1)]
    sure = wrong[(wrong.p_scam_jev >= scam_at) | (wrong.p_scam_jev <= safe_at)]
    print(f"Jev was wrong on {len(wrong)} of 100 messages, and SURE of itself on {len(sure)} of those.")
    out = sure.assign(truth=sure.is_scam.map({1: "scam", 0: "genuine"}))
    return _show(out[["message", "truth", "p_scam_jev", "scam_type_jev", "note"]]
                 .rename(columns={"p_scam_jev": "Jev's scam probability", "scam_type_jev": "Jev's scam type"}))


def threshold_table(results: pd.DataFrame) -> None:
    """Stricter threshold means fewer automatic mistakes, but more messages need a second check."""
    rows = []
    for t in [0.70, 0.80, 0.90, 0.95, 0.99]:
        p = results.p_scam_jev
        decided = results[(p >= t) | (p <= 1 - t)]
        errors = ((decided.p_scam_jev >= 0.5) != (decided.is_scam == 1)).sum()
        rows.append({"threshold": t, "Jev decides alone": f"{len(decided)} / 100",
                     "mistakes among those": int(errors), "sent for a second check": 100 - len(decided)})
    return _show(pd.DataFrame(rows))


def reliability_plot(results: pd.DataFrame):
    """When Jev says 80%, are about 80% really scams? (Optional; noisy with only 100 messages.)"""
    import matplotlib.pyplot as plt
    import numpy as np
    bins = pd.cut(results.p_scam_jev, np.linspace(0, 1, 6), include_lowest=True)
    cal = results.groupby(bins, observed=True).agg(said=("p_scam_jev", "mean"), really=("is_scam", "mean"),
                                                   n=("id", "count"))
    fig, ax = plt.subplots(figsize=(5, 5))
    ax.plot([0, 1], [0, 1], "--", color="gray", label="perfectly honest")
    ax.scatter(cal.said, cal.really, s=cal.n * 12, label="Jev (dot size = # messages)")
    ax.set_xlabel("What Jev said (scam probability)")
    ax.set_ylabel("What was really true (fraction that were scams)")
    ax.legend()
    plt.show()


# ---------- the fix: confidence bands ----------
def band_report(results: pd.DataFrame, verdict) -> None:
    """Apply your verdict(p) function to all 100 race results and show what lands in each band."""
    bands = results.p_scam_jev.map(verdict).rename("Jev's band")
    truth = results.is_scam.map({1: "scam", 0: "genuine"}).rename("really")
    table = pd.crosstab(bands, truth).reindex(columns=["scam", "genuine"], fill_value=0)
    table["total"] = table.sum(axis=1)
    _show(table)
    wrong_scam = ((bands.str.startswith("✅")) & (truth == "scam")).sum()
    wrong_safe = ((bands.str.startswith("🚨")) & (truth == "genuine")).sum()
    unsure = bands.str.startswith("⚠️").sum()
    print(f"Scams waved through as normal: {wrong_scam}   ·   genuine messages flagged: {wrong_safe}   ·   "
          f"sent for a second opinion: {unsure}")


def make_checker(jev, questions, verdict):
    """Everything together: Jev decides, your verdict() picks the band, the chatbot explains only when unsure."""
    def check(message):
        a = jev.system_one(state=message, questions=questions)
        p = a.nouls["is_scam"].noul
        result = {"verdict": verdict(p), "p_scam": p,
                  "type_probs": dict(a.choices["scam_type"].probabilities)}
        if "pressure" in questions:
            result["pressure"] = a.scores["pressure"].score
        if result["verdict"].startswith("⚠️"):
            result["explanation"] = ask_llm(
                "In 2 short sentences of simple English, say whether this SMS looks like a scam and what to do "
                "next. Never tell the reader to click links or call numbers in it.\n\nSMS: " + message)
        return result
    return check


# ---------- the app ----------
def launch_app(check, examples=None):
    """Wrap a check(message) -> dict function in a shareable web app."""
    import gradio as gr

    def run(message):
        if not message.strip():
            return "Paste a message first.", {}, ""
        res = check(message)
        details = f"**Scam probability:** {res['p_scam']:.2f}"
        if res.get("pressure") is not None:
            details += f"  \n**Pressure (0–3):** {res['pressure']:.1f}"
        if res.get("explanation"):
            details += f"\n\n**Second opinion:** {res['explanation']}"
        return res["verdict"], res.get("type_probs", {}), details

    return gr.Interface(
        fn=run,
        inputs=gr.Textbox(lines=4, label="Paste an SMS / WhatsApp message"),
        outputs=[gr.Textbox(label="Verdict"), gr.Label(num_top_classes=3, label="What kind of message?"),
                 gr.Markdown()],
        title="🚨 Scam Message Detector (Jev)",
        description="Teaching demo, not a guarantee. When in doubt, contact the organisation "
                    "through its official app or number.",
        examples=examples or [],
    ).launch(share=True)


def _show(frame):
    try:
        from IPython.display import display
        display(frame)
    except Exception:
        print(frame.to_string())
    return None
