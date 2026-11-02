import type { ProjectSummary } from "../api";
import { Gate, Icon, type GateState } from "./ui";

type S = Pick<ProjectSummary, "voice" | "payoffs" | "qa" | "review" | "delivered" | "current">;
type Full = S & Pick<ProjectSummary, "exists">;

/** each gate's state and words, in pipeline order: the same states as the Build stepper */
function gates(s: S): { id: string; state: GateState; label: string; title?: string; figure?: string }[] {
  const payoffs: GateState = !s.payoffs ? "pending" : !s.payoffs.ok ? "fail" : s.payoffs.fresh === false ? "warn" : "pass";
  const qa: GateState = !s.qa ? "pending" : s.qa.passed < s.qa.total ? "fail" : s.qa.fresh === false ? "warn" : "pass";
  const review: GateState = !s.review ? "pending" : s.review.open ? "fail" : "pass";
  const watched: GateState = s.review?.watched ? "pass" : s.review ? "waiting" : "pending";
  const delivered: GateState = s.delivered ? (s.current ? "pass" : "warn") : "pending";
  return [
    { id: "voice", state: s.voice ? "pass" : "pending", label: "voice" },
    { id: "payoffs", state: payoffs, label: "payoffs", title: s.payoffs?.fresh === false ? "stale: hf/ changed since" : undefined, figure: s.payoffs && !s.payoffs.ok ? String(s.payoffs.failed ?? "") : undefined },
    { id: "qa", state: qa, label: "qa", title: s.qa?.fresh === false ? "stale: the MP4 changed since" : undefined, figure: s.qa ? `${s.qa.passed}/${s.qa.total}` : undefined },
    { id: "review", state: review, label: s.review ? "open" : "no review", figure: s.review ? String(s.review.open) : undefined },
    { id: "watched", state: watched, label: "watched" },
    { id: "delivered", state: delivered, label: `delivered${s.delivered && !s.current ? " (older)" : ""}`, title: s.delivered && !s.current ? "shorts/ holds an older MP4" : undefined },
  ];
}

/** the pipeline's gates as a row of chips (the project header) */
export function StatusChips({ s }: { s: S }) {
  return (
    <ol className="flex flex-wrap gap-1" aria-label="pipeline gates, in order">
      {gates(s).map((g) => <li key={g.id}><Gate state={g.state} title={g.title}>
        {g.id === "review" && g.figure ? <><b>{g.figure}</b> {g.label}</> : <>{g.label}{g.figure ? <b>{g.figure}</b> : null}</>}</Gate></li>)}
    </ol>
  );
}

const WORD: Record<GateState, string> = { pending: "not run", running: "running", pass: "passed", done: "written", fail: "failed", warn: "stale", waiting: "waiting for you" };
const MARK: Record<GateState, Parameters<typeof Icon>[0]["name"]> = { pending: "pending", running: "running", pass: "check", done: "check", fail: "cross", warn: "warn", waiting: "waiting" };
/** the same gates as small marks; each names itself in its tooltip and label (the Projects cards) */
export function GateStrip({ s }: { s: S }) {
  return (
    <ol className="flex gap-0.5" aria-label="pipeline gates, in order">
      {gates(s).map((g) => {
        const t = `${g.id}: ${WORD[g.state]}${g.figure ? ` (${g.id === "review" ? `${g.figure} open` : g.figure})` : ""}${g.title ? `, ${g.title}` : ""}`;
        return <li key={g.id} className="gate gate--mark" data-state={g.state} title={t}><Icon name={MARK[g.state]} size={12} label={t} /></li>;
      })}
    </ol>
  );
}

/** the one next thing for the owner, from the same data as the gates */
export function nextStatus(s: Full): { state: GateState; text: string } {
  if (s.delivered && s.current) return { state: "pass", text: "Delivered" };
  if (!s.voice) return { state: "pending", text: "Needs voice" };
  if (!s.exists.hf) return { state: "pending", text: "Not built" };
  if (s.payoffs && !s.payoffs.ok) return { state: "fail", text: s.payoffs.failed ? `${s.payoffs.failed} payoff${s.payoffs.failed > 1 ? "s" : ""} missing` : "Payoffs failed" };
  if (!s.exists.mp4) return { state: "pending", text: "Not rendered" };
  if (s.qa && s.qa.passed < s.qa.total) return { state: "fail", text: `QA failed (${s.qa.passed}/${s.qa.total})` };
  if (s.qa?.fresh === false || s.payoffs?.fresh === false) return { state: "warn", text: "Gates stale: re-run" };
  if (s.review?.open) return { state: "fail", text: `${s.review.open} fix row${s.review.open > 1 ? "s" : ""} open` };
  if (s.delivered && !s.current) return { state: "warn", text: "Deliver again (shorts/ is older)" };
  if (!s.payoffs) return { state: "pending", text: "Payoffs not checked" };
  if (!s.qa) return { state: "pending", text: "Needs QA" };
  if (!s.review) return { state: "pending", text: "Needs review" };
  if (!s.review.watched) return { state: "waiting", text: "Watch it end to end" };
  return { state: "waiting", text: "Ready for your review" };
}
