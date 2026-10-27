// Settings: pace.json (each field with its meaning; saving appends a required one-line "why" to its "_" note), the
// style kits' design.md and the four gate agents (read-only), and the linter evals runner.
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type EvalResult } from "../api";
import { Markdown } from "../components/Markdown";
import { Button, Card, Chip, Empty, Mark } from "../components/ui";

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
  if (!q.data) return <Card title="Pace (studio/templates/reel/pace.json)"><Empty>Loading…</Empty></Card>;
  const dirty = q.data.fields.filter((f) => vals[f.key] !== undefined && Number(vals[f.key]) !== f.value);
  const invalid = q.data.fields.filter((f) => { const n = Number(vals[f.key]); return vals[f.key] === "" || !Number.isFinite(n) || n < f.min || n > f.max || (f.int && !Number.isInteger(n)); });
  return (
    <Card pad={false} title="Pace (studio/templates/reel/pace.json)" right={<span>one pace for every tool and doc</span>}>
      <p className="px-4 pt-3 text-[12.5px] text-muted">{q.data.note}</p>
      <div className="scroll-thin overflow-x-auto px-2 py-2">
        <table className="data min-w-[640px]">
          <thead><tr><th>field</th><th className="num">value</th><th>meaning</th><th>read by</th></tr></thead>
          <tbody>{q.data.fields.map((f) => {
            const bad = invalid.includes(f), changed = dirty.includes(f);
            return (
              <tr key={f.key} className={changed ? "bg-accent/5" : ""}>
                <td className="whitespace-nowrap font-mono">{f.key}</td>
                <td className="num whitespace-nowrap"><input value={vals[f.key] ?? ""} onChange={(e) => setVals({ ...vals, [f.key]: e.target.value })} inputMode="decimal" aria-label={f.key}
                  className={`w-20 rounded-md border bg-panel px-1.5 py-0.5 text-right text-xs ${bad ? "border-bad text-bad" : "border-line"}`} /> <span className="text-[11px] text-muted">{f.unit}</span>
                  {bad && <div className="text-[10.5px] text-bad">{f.min}–{f.max}{f.int ? ", whole" : ""}</div>}</td>
                <td className="text-[12px]">{f.meaning}</td>
                <td className="whitespace-nowrap text-[11px] text-muted">{f.usedBy}</td>
              </tr>);
          })}</tbody>
        </table>
      </div>
      <form className="flex flex-wrap items-center gap-2 border-t border-line px-4 py-3" onSubmit={(e) => { e.preventDefault(); save.mutate(); }}>
        <input value={why} onChange={(e) => setWhy(e.target.value)} placeholder="why (required, one line: appended to the file's note with the date)" className="min-w-64 flex-1 rounded-md border border-line bg-panel px-2 py-1 text-xs" />
        <Button small kind="primary" type="submit" disabled={!dirty.length || invalid.length > 0 || why.trim().length < 8 || save.isPending}>Save {dirty.length || ""} change{dirty.length === 1 ? "" : "s"}</Button>
        {dirty.length > 0 && <Button small kind="ghost" onClick={() => setVals(Object.fromEntries(q.data!.fields.map((f) => [f.key, String(f.value)])))}>Reset</Button>}
        {save.isError && <span className="text-[11px] text-bad">{(save.error as Error).message}</span>}
        {save.isSuccess && <span className="text-[11px] text-ok">saved: {save.data.changes.join(", ")}</span>}
      </form>
    </Card>
  );
}

function Docs({ title, load }: { title: string; load: () => Promise<{ name: string; path: string; text: string }[]> }) {
  const q = useQuery({ queryKey: ["docs", title], queryFn: load });
  const [cur, setCur] = useState<string | null>(null);
  const doc = q.data?.find((d) => d.name === cur) ?? q.data?.[0];
  return (
    <Card pad={false} title={title} right={<span>read-only</span>}>
      <div className="flex flex-wrap gap-1 border-b border-line px-4 py-2">
        {q.data?.map((d) => <button key={d.name} onClick={() => setCur(d.name)} className={`rounded-md border px-2 py-0.5 text-[12px] ${doc?.name === d.name ? "border-accent bg-accent/10" : "border-line text-muted hover:text-ink"}`}>{d.name}</button>)}
      </div>
      <div className="scroll-thin max-h-[560px] overflow-y-auto px-4 py-3">
        {doc ? <><div className="mb-2 font-mono text-[11px] text-muted">{doc.path}</div><Markdown text={doc.text.replace(/^---\n[\s\S]*?\n---\n/, (m) => "```yaml\n" + m.replace(/^---\n|---\n$/g, "") + "```\n")} /></> : <Empty>Loading…</Empty>}
      </div>
    </Card>
  );
}

function Evals() {
  const run = useMutation({ mutationFn: api.runEvals });
  const rs: EvalResult[] = run.data?.results ?? [];
  return (
    <Card pad={false} title="Evals (video-scripter linter fixtures)" right={<>{run.data && <Chip tone={run.data.ok ? "ok" : "bad"}>{rs.filter((r) => r.ok).length}/{rs.length} as expected</Chip>}
      <Button small kind="primary" disabled={run.isPending} onClick={() => run.mutate()}>{run.isPending ? "Running…" : "Run evals"}</Button></>}>
      <p className="px-4 pt-3 text-[12.5px] text-muted">python3 .claude/skills/video-scripter/scripts/lint_package.py on each evals/fixtures/* folder, compared with the ✗ counts evals/README.md expects (the judgement evals need an agent run; not here).</p>
      {run.isError && <div className="px-4 pt-2 text-xs text-bad">{(run.error as Error).message}</div>}
      {rs.length > 0 && (
        <div className="px-2 py-2"><table className="data">
          <thead><tr><th></th><th>fixture</th><th className="num">passed</th><th className="num">✗</th><th className="num">expected ✗</th><th>failures</th></tr></thead>
          <tbody>{rs.map((r) => (
            <tr key={r.fixture}><td><Mark ok={r.ok} /></td><td className="font-mono">{r.fixture}</td><td className="num">{r.passed}/{r.total}</td><td className="num font-semibold">{r.failed}</td>
              <td className="num text-muted">{r.expected?.failed ?? "?"}{r.expected?.checks ? ` (${r.expected.checks} checks)` : ""}</td>
              <td className="text-[11.5px] text-muted"><details><summary className="cursor-pointer">{r.failures.length} lines</summary><ul className="mt-1 space-y-0.5">{r.failures.map((l, i) => <li key={i}>{l}</li>)}</ul></details></td></tr>))}</tbody>
        </table></div>)}
      {!rs.length && <div className="px-4 py-3"><Empty>Not run in this page yet.</Empty></div>}
    </Card>
  );
}

export function Settings() {
  return (
    <div className="scroll-thin flex-1 overflow-y-auto">
      <div className="sticky top-0 z-10 border-b border-line bg-bg/90 px-6 py-4 backdrop-blur">
        <h1 className="text-lg font-semibold">Settings</h1>
        <p className="text-xs text-muted">The studio's shared numbers, the style kits, the gate agents and the evals. Only pace.json is editable here.</p>
      </div>
      <div className="space-y-5 p-6">
        <PaceEditor />
        <Evals />
        <Docs title="Style kits (studio/templates/styles/*/design.md)" load={api.styles} />
        <Docs title="Gate agents (.claude/agents/*.md)" load={api.agents} />
      </div>
    </div>
  );
}
