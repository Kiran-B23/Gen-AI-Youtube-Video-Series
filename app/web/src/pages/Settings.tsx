// Settings: pace.json (each field with its meaning; saving appends a required one-line "why" to its "_" note), the
// style kits' design.md and the four gate agents (read-only), and the linter evals runner.
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type EvalResult } from "../api";
import { Markdown } from "../components/Markdown";
import { Button, Card, Chip, Empty, ErrorLine, Mark, Skeleton } from "../components/ui";

function PaceEditor() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["pace"], queryFn: api.pace });
  const [vals, setVals] = useState<Record<string, string>>({});
  const [why, setWhy] = useState("");
  useEffect(() => { if (q.data) setVals(Object.fromEntries(q.data.fields.map((f) => [f.key, String(f.value)]))); }, [q.data]);
  const save = useMutation({
    mutationFn: () => api.savePace(Object.fromEntries(Object.entries(vals).filter(([k, v]) => q.data?.fields.find((f) => f.key === k)?.value !== Number(v)).map(([k, v]) => [k, Number(v)])), why),
    onSuccess: (d) => { qc.setQueryData(["pace"], d.pace); setWhy(""); },
  });
  if (q.error) return <Card title="Pace"><ErrorLine error={q.error} what="Could not read pace.json." todo="Reload; the server reads studio/templates/reel/pace.json." /></Card>;
  if (!q.data) return <Card title="Pace"><Skeleton rows={6} label="Loading pace.json" /></Card>;
  const dirty = q.data.fields.filter((f) => vals[f.key] !== undefined && Number(vals[f.key]) !== f.value);
  const invalid = q.data.fields.filter((f) => { const n = Number(vals[f.key]); return vals[f.key] === "" || !Number.isFinite(n) || n < f.min || n > f.max || (f.int && !Number.isInteger(n)); });
  return (
    <Card pad={false} title={<span title="studio/templates/reel/pace.json: one pace for every tool and doc">Pace</span>}>
      <details className="disclose pt-1 text-xs"><summary>File note</summary><p className="mt-1 max-w-[75ch] text-sm text-ink-2">{q.data.note}</p></details>
      <div className="scroll-thin overflow-x-auto py-2">
        <table className="data min-w-[520px]">
          <thead><tr><th>field</th><th className="num">value</th><th>meaning</th></tr></thead>
          <tbody>{q.data.fields.map((f) => {
            const bad = invalid.includes(f), changed = dirty.includes(f);
            return (
              <tr key={f.key} data-row={changed ? "on" : undefined}>
                <td className="whitespace-nowrap">{f.key}</td>
                <td className="num whitespace-nowrap"><input value={vals[f.key] ?? ""} onChange={(e) => setVals({ ...vals, [f.key]: e.target.value })} inputMode="decimal" aria-label={f.key}
                  aria-invalid={bad || undefined} className={`field field--sm w-20 text-right ${bad ? "text-bad" : ""}`} /> <span className="text-xs text-muted">{f.unit}</span>
                  {bad && <div className="text-xs text-bad">{f.min} to {f.max}{f.int ? ", whole" : ""}</div>}</td>
                <td className="text-xs text-ink-2" title={`read by ${f.usedBy}`}>{f.meaning}</td>
              </tr>);
          })}</tbody>
        </table>
      </div>
      <form className="flex flex-wrap items-center gap-2 border-t-2 border-ink py-3" onSubmit={(e) => { e.preventDefault(); save.mutate(); }}>
        <input value={why} onChange={(e) => setWhy(e.target.value)} aria-label="why" placeholder="why (required, one line: appended to the file’s note with the date)" className="field field--sm min-w-64 flex-1" />
        <Button small kind="primary" type="submit" disabled={!dirty.length || invalid.length > 0 || why.trim().length < 8 || save.isPending}>Save {dirty.length || ""} change{dirty.length === 1 ? "" : "s"}</Button>
        {dirty.length > 0 && <Button small kind="ghost" onClick={() => setVals(Object.fromEntries(q.data!.fields.map((f) => [f.key, String(f.value)])))}>Reset</Button>}
        {save.isError && <span role="alert" className="text-xs text-bad">{(save.error as Error).message}</span>}
        {save.isSuccess && <span className="text-xs text-ok">saved: {save.data.changes.join(", ")}</span>}
      </form>
    </Card>
  );
}

function Docs({ title, load }: { title: string; load: () => Promise<{ name: string; path: string; text: string }[]> }) {
  const q = useQuery({ queryKey: ["docs", title], queryFn: load });
  const [cur, setCur] = useState<string | null>(null);
  const doc = q.data?.find((d) => d.name === cur) ?? q.data?.[0];
  return (
    <Card pad={false} title={title}>
      <div className="seg gap-y-1 py-2" role="group" aria-label={title}>
        {q.data?.map((d) => <button key={d.name} onClick={() => setCur(d.name)} aria-pressed={doc?.name === d.name}>{d.name}</button>)}
      </div>
      <div className="scroll-thin max-h-[560px] overflow-y-auto py-3">
        {q.error ? <ErrorLine error={q.error} what="Could not read these files." /> : q.data?.length === 0 ? <Empty>No files here.</Empty> : doc ? <><div className="mb-2 text-xs text-muted">{doc.path}</div><Markdown text={doc.text.replace(/^---\n[\s\S]*?\n---\n/, (m) => "```yaml\n" + m.replace(/^---\n|---\n$/g, "") + "```\n")} /></> : <Skeleton rows={8} label="Loading" />}
      </div>
    </Card>
  );
}

function Evals() {
  const run = useMutation({ mutationFn: api.runEvals });
  const rs: EvalResult[] = run.data?.results ?? [];
  return (
    <Card pad={false} title={<span title="video-scripter linter fixtures">Evals</span>} right={<>{run.data && <Chip tone={run.data.ok ? "ok" : "bad"}>{rs.filter((r) => r.ok).length}/{rs.length} as expected</Chip>}
      <Button small kind="primary" disabled={run.isPending} onClick={() => run.mutate()}>{run.isPending ? "Running…" : "Run evals"}</Button></>}>
      {run.isError && <div role="alert" className="pt-2 text-xs text-bad">{(run.error as Error).message}</div>}
      {rs.length > 0 && (
        <div className="py-2"><table className="data">
          <thead><tr><th></th><th>fixture</th><th className="num">passed</th><th className="num">failed</th><th className="num">expected failed</th><th>failures</th></tr></thead>
          <tbody>{rs.map((r) => (
            <tr key={r.fixture}><td><Mark ok={r.ok} /></td><td className="">{r.fixture}</td><td className="num">{r.passed}/{r.total}</td><td className="num font-extrabold">{r.failed}</td>
              <td className="num text-muted">{r.expected?.failed ?? "?"}{r.expected?.checks ? ` (${r.expected.checks} checks)` : ""}</td>
              <td className="text-xs text-muted"><details><summary className="cursor-pointer">{r.failures.length} lines</summary><ul className="mt-1 space-y-0.5">{r.failures.map((l, i) => <li key={i}>{l}</li>)}</ul></details></td></tr>))}</tbody>
        </table></div>)}
      {!rs.length && !run.isPending && <div className="py-3"><span title="lint_package.py on each evals/fixtures/* folder, compared with the failure counts evals/README.md expects (the judgement evals need an agent run; not here)"><Empty>Not run yet.</Empty></span></div>}
      {run.isPending && <Skeleton rows={4} label="Running the evals" />}
    </Card>
  );
}

export function Settings() {
  return (
    <div className="scroll-thin flex-1 overflow-y-auto">
      <div className="sticky top-0 z-10 border-b-2 border-ink bg-paper px-4 py-4 sm:px-6">
        <h1 className="max-w-none text-xl font-extrabold">Settings</h1>
      </div>
      <div className="space-y-8 px-4 py-6 sm:px-6">
        <PaceEditor />
        <Evals />
        <Docs title="Style kits" load={api.styles} />
        <Docs title="Gate agents" load={api.agents} />
      </div>
    </div>
  );
}
