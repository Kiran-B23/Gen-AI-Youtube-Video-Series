"""Our test: Laya on the running-example ticket, on this PC's CPU (no GPU). Writes result.json."""
import json, time, platform, os, statistics
from laya import Router
import laya
TICKET = {"body": "I was charged twice. Refund me, or I cancel."}
Q = {
 "department": {"type": "choice", "criteria": ["billing", "technical", "sales", "other"],
                "instructions": "Which team should handle this ticket?"},
 "urgency": {"type": "score", "criteria": ["not urgent", "soon", "critical deadline"],
             "instructions": "How urgent is this ticket?"},
 "churn_risk": {"type": "noul", "instructions": "Is the customer threatening to leave?"},
}
t0 = time.perf_counter(); r = Router(); load = time.perf_counter() - t0
out = r.predict(TICKET, Q)                          # warm-up
times = []
for _ in range(20):
    t = time.perf_counter(); out = r.predict(TICKET, Q); times.append((time.perf_counter() - t) * 1000)
res = {"date": time.strftime("%Y-%m-%d %H:%M"), "laya_version": getattr(laya, "__version__", "?"),
       "cpu": platform.processor() or platform.machine(), "cores": os.cpu_count(), "gpu": "none",
       "load_s": round(load, 1), "ms_median_3_questions": round(statistics.median(times), 1),
       "ms_min": round(min(times), 1), "runs": len(times), "ticket": TICKET["body"], "output": out}
json.dump(res, open(os.path.join(os.path.dirname(__file__), "result.json"), "w"), indent=1, default=str)
print(json.dumps({k: v for k, v in res.items() if k != "output"}, indent=1))
for k, a in out["answers"].items(): print(k, {x: a.get(x) for x in ("choice", "score", "noul", "confidence", "answer_confidence")})
