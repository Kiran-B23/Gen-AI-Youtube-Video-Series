import type { ProjectSummary } from "../api";
import { Chip } from "./ui";

type S = Pick<ProjectSummary, "voice" | "payoffs" | "qa" | "review" | "delivered" | "current">;
export function StatusChips({ s }: { s: S }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <Chip tone={s.voice ? "ok" : "muted"}>voice {s.voice ? "✓" : "–"}</Chip>
      <Chip tone={!s.payoffs ? "muted" : !s.payoffs.ok ? "bad" : s.payoffs.fresh === false ? "warn" : "ok"} title={s.payoffs?.fresh === false ? "stale: hf/ changed since" : undefined}>
        payoffs {!s.payoffs ? "–" : s.payoffs.ok ? (s.payoffs.fresh === false ? "✓ stale" : "✓") : `✗ ${s.payoffs.failed}`}</Chip>
      <Chip tone={!s.qa ? "muted" : s.qa.passed < s.qa.total ? "bad" : s.qa.fresh === false ? "warn" : "ok"} title={s.qa?.fresh === false ? "stale: the MP4 changed since" : undefined}>
        qa {s.qa ? `${s.qa.passed}/${s.qa.total}` : "–"}{s.qa?.fresh === false ? " stale" : ""}</Chip>
      <Chip tone={!s.review ? "muted" : s.review.open ? "bad" : "ok"}>{s.review ? `${s.review.open} open` : "no review"}</Chip>
      <Chip tone={s.review?.watched ? "ok" : "muted"}>watched {s.review?.watched ? "✓" : "–"}</Chip>
      <Chip tone={s.delivered ? (s.current ? "ok" : "warn") : "muted"} title={s.delivered && !s.current ? "shorts/ holds an older MP4" : undefined}>
        delivered {s.delivered ? (s.current ? "✓" : "(older)") : "–"}</Chip>
    </div>
  );
}
