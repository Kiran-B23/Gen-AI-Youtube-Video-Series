"""Our test, part 2: the same ticket on the fine-tuned typed-decisions checkpoint (customer-service workflow)."""
import json, time, statistics, os
from laya import Router
TICKET = {"body": "I was charged twice. Refund me, or I cancel."}
Q = {
 "department": {"type": "choice", "criteria": ["billing", "technical", "sales", "other"], "instructions": "Which team should handle this ticket?"},
 "urgency": {"type": "score", "criteria": ["not urgent", "soon", "critical deadline"], "instructions": "How urgent is this ticket?"},
 "churn_risk": {"type": "noul", "instructions": "Is the customer threatening to leave?"},
}
r = Router()
out = r.predict(TICKET, Q, task="typed_decisions")
ts = []
for _ in range(20):
    t = time.perf_counter(); out = r.predict(TICKET, Q, task="typed_decisions"); ts.append((time.perf_counter() - t) * 1000)
json.dump({"date": time.strftime("%Y-%m-%d %H:%M"), "ms_median": round(statistics.median(ts), 1), "output": out},
          open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "result_tuned.json"), "w"), indent=1, default=str)
print("routing:", out.get("routing", {}).get("repo"), "· median ms:", round(statistics.median(ts), 1))
for k, a in out["answers"].items(): print(k, {x: a.get(x) for x in ("choice", "score", "noul", "confidence", "answer_confidence")})
