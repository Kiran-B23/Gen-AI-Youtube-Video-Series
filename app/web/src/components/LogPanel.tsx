import { useEffect, useRef } from "react";
import type { Job, LogLine } from "../api";
import { Chip, type Tone } from "./ui";

export const statusTone = (s?: string | null): Tone =>
  s === "ok" ? "ok" : s === "failed" || s === "interrupted" ? "bad" : s === "running" ? "accent" : s === "queued" ? "warn" : "muted";

function lineCls(l: LogLine) {
  if (l.stream === "sys") return "text-term-ink/50";
  if (/✗|❌|Traceback|\bError\b|\berror:|\bfailed\b/.test(l.text) && !/\b0 error/.test(l.text)) return "text-red-400";
  if (/⚠|warn/i.test(l.text)) return "text-amber-300";
  if (/✓|passed|^── /.test(l.text)) return "text-emerald-300";
  return l.stream === "err" ? "text-term-ink/80" : "text-term-ink";
}

export function LogPanel({ lines, job, end, height = "h-72" }: { lines: LogLine[]; job: Job | null; end: { status: string; exitCode: number | null } | null; height?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const stick = useRef(true);
  useEffect(() => { const b = box.current; if (b && stick.current) b.scrollTop = b.scrollHeight; }, [lines.length]);
  const status = end?.status ?? job?.status;
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-term">
      <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-1.5 text-[11px] text-term-ink/70">
        <span className="font-mono">{job ? (job.slug === "_trends" ? `job #${job.id} · trends.py ${job.step}` : `job #${job.id} · run.sh ${job.slug} ${job.step}${job.flags ? ` · ${job.flags}` : ""}`) : "no run yet"}</span>
        <span className="flex items-center gap-2">
          {job?.status === "queued" && job.position != null && <span>{job.position} ahead in the queue</span>}
          {status && <Chip tone={statusTone(status)}>{status}{end && end.exitCode !== null ? ` · exit ${end.exitCode}` : ""}</Chip>}
        </span>
      </div>
      <div ref={box} onScroll={(e) => { const b = e.currentTarget; stick.current = b.scrollHeight - b.scrollTop - b.clientHeight < 24; }}
        className={`scroll-thin overflow-auto px-3 py-2 font-mono text-[11.5px] leading-[1.55] ${height}`}>
        {lines.length === 0 && <div className="text-term-ink/40">{job ? (job.status === "queued" ? "waiting for the running job to finish…" : "…") : "Press Run to start this step. The output streams here."}</div>}
        {lines.map((l) => <div key={l.seq} className={`whitespace-pre-wrap break-words ${lineCls(l)}`}>{l.text || " "}</div>)}
      </div>
    </div>
  );
}
