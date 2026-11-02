import { useEffect, useRef } from "react";
import type { Job, LogLine } from "../api";
import { Chip, type Tone } from "./ui";

export const statusTone = (s?: string | null): Tone =>
  s === "ok" ? "ok" : s === "failed" || s === "interrupted" ? "bad" : s === "running" ? "accent" : s === "queued" ? "warn" : "muted";

function lineCls(l: LogLine) {
  if (l.stream === "sys") return "log-sys";
  if (/✗|❌|Traceback|\bError\b|\berror:|\bfailed\b/.test(l.text) && !/\b0 error/.test(l.text)) return "log-bad";
  if (/⚠|warn/i.test(l.text)) return "log-warn";
  if (/✓|passed|^── /.test(l.text)) return "log-ok";
  return l.stream === "err" ? "log-err" : "";
}

export function LogPanel({ lines, job, end, height = "h-72" }: { lines: LogLine[]; job: Job | null; end: { status: string; exitCode: number | null } | null; height?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const stick = useRef(true);
  useEffect(() => { const b = box.current; if (b && stick.current) b.scrollTop = b.scrollHeight; }, [lines.length]);
  const status = end?.status ?? job?.status;
  if (!job && lines.length === 0) return null; // nothing has run here yet: no empty box
  return (
    <div className="plate border-2 border-ink-rule">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink-rule px-3 py-1.5 text-xs text-muted">
        <span className="min-w-0 break-all">{job ? <><span className="font-extrabold text-accent-2">#{job.id}</span>{" "}{job.slug === "_trends" ? `trends.py ${job.step}` : `run.sh ${job.slug} ${job.step}${job.flags ? ` (${job.flags})` : ""}`}</> : "no run yet"}</span>
        <span className="flex items-center gap-2">
          {job?.status === "queued" && job.position != null && <span><span className="font-extrabold text-accent-2">{job.position}</span> ahead in the queue</span>}
          {status && <Chip tone={statusTone(status)}>{status}{end && end.exitCode !== null ? <>, exit <b className="font-extrabold">{end.exitCode}</b></> : ""}</Chip>}
        </span>
      </div>
      <div ref={box} role="log" aria-live="polite" aria-label="step output" tabIndex={0} onScroll={(e) => { const b = e.currentTarget; stick.current = b.scrollHeight - b.scrollTop - b.clientHeight < 24; }}
        className={`scroll-thin overflow-auto px-3 py-2 text-xs leading-[1.55] ${lines.length === 0 && !job ? "" : height}`}>
        {lines.length === 0 && <div className="text-muted">{job ? (job.status === "queued" ? "waiting for the running job to finish…" : "…") : "Press Run to start this step. The output streams here."}</div>}
        {lines.map((l) => <div key={l.seq} className={`whitespace-pre-wrap break-words ${lineCls(l)}`}>{l.text || " "}</div>)}
      </div>
    </div>
  );
}
