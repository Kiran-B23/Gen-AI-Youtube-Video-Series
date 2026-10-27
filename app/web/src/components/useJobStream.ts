import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { Job, LogLine } from "../api";

/** Follows one job over SSE: the stored lines first, then live ones, then the exit status. */
export function useJobStream(jobId: number | null | undefined, slug?: string) {
  const [lines, setLines] = useState<LogLine[]>([]);
  const [job, setJob] = useState<Job | null>(null);
  const [end, setEnd] = useState<{ status: string; exitCode: number | null } | null>(null);
  const qc = useQueryClient();
  useEffect(() => {
    setLines([]); setJob(null); setEnd(null);
    if (!jobId) return;
    const es = new EventSource(`/api/jobs/${jobId}/stream`);
    es.addEventListener("line", (e) => { const l = JSON.parse((e as MessageEvent).data) as LogLine; setLines((xs) => (xs.length && xs[xs.length - 1].seq >= l.seq ? xs : [...xs, l])); });
    es.addEventListener("status", (e) => setJob(JSON.parse((e as MessageEvent).data)));
    es.addEventListener("end", (e) => {
      setEnd(JSON.parse((e as MessageEvent).data)); es.close();
      qc.invalidateQueries({ queryKey: ["projects"] }); qc.invalidateQueries({ queryKey: ["jobs"] });
      if (slug) qc.invalidateQueries({ queryKey: ["project", slug] });
    });
    return () => es.close();
  }, [jobId, slug, qc]);
  return { lines, job, end };
}
