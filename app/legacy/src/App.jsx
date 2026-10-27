import React, { useEffect, useMemo, useRef, useState } from 'react';
import { marked } from 'marked';

// The package stages, in the order /video-scripter writes them.
const STAGES = [
  ['brief', 'Brief'], ['research', 'Research'], ['inspiration', 'YouTube'], ['hooks', 'Hooks'],
  ['script', 'Script'], ['art-direction', 'Art'], ['animation-plan', 'Animation'],
  ['storyboard', 'Storyboard'], ['publish', 'Publish'], ['qa', 'QA'], ['package', 'Package'],
];

const api = async (url, opts = {}) => {
  const res = await fetch(url, { headers: { 'content-type': 'application/json' }, ...opts });
  const body = await res.json();
  if (!res.ok) throw new Error(body.error || res.statusText);
  return body;
};

export default function App() {
  const [productions, setProductions] = useState([]);
  const [runs, setRuns] = useState([]);
  const [view, setView] = useState({ kind: 'new' }); // {kind:'new'} | {kind:'run', id} | {kind:'production', folder}

  const refresh = () => Promise.all([api('/api/productions'), api('/api/runs')])
    .then(([p, r]) => { setProductions(p); setRuns(r); });
  useEffect(() => { refresh(); const t = setInterval(refresh, 5000); return () => clearInterval(t); }, []);

  const runByFolder = useMemo(() => Object.fromEntries(runs.filter((r) => r.production).map((r) => [r.production, r])), [runs]);
  const pendingRuns = runs.filter((r) => !r.production);

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">Video Studio</div>
        <button className={`new ${view.kind === 'new' ? 'active' : ''}`} onClick={() => setView({ kind: 'new' })}>+ New video</button>
        {pendingRuns.length > 0 && <div className="group">Starting</div>}
        {pendingRuns.map((r) => (
          <Item key={r.id} active={view.id === r.id} onClick={() => setView({ kind: 'run', id: r.id })}
            title={r.topic} sub={r.format} status={r.status} />
        ))}
        <div className="group">Productions</div>
        {productions.map((p) => {
          const run = runByFolder[p.folder];
          const active = run ? view.id === run.id : view.folder === p.folder;
          return (
            <Item key={p.folder} active={active}
              onClick={() => setView(run ? { kind: 'run', id: run.id } : { kind: 'production', folder: p.folder })}
              title={p.folder.slice(11)} sub={`${p.folder.slice(0, 10)} · ${p.files.length} files`} status={run?.status} />
          );
        })}
      </aside>
      <main className="main">
        {view.kind === 'new' && <NewVideo onStarted={(run) => { refresh(); setView({ kind: 'run', id: run.id }); }} />}
        {view.kind === 'run' && <RunView key={view.id} run={runs.find((r) => r.id === view.id)} onChange={refresh} />}
        {view.kind === 'production' && <Package key={view.folder} folder={view.folder} live={false} />}
      </main>
    </div>
  );
}

function Item({ title, sub, status, active, onClick }) {
  return (
    <button className={`item ${active ? 'active' : ''}`} onClick={onClick}>
      <span className="item-title">{title}</span>
      <span className="item-sub">{sub}{status && <span className={`badge ${status}`}>{label(status)}</span>}</span>
    </button>
  );
}

const label = (s) => ({ running: 'working', waiting: 'your turn', error: 'error', stopped: 'stopped', starting: 'starting' }[s] || s);

function NewVideo({ onStarted }) {
  const [form, setForm] = useState({ topic: '', format: 'reel', level: '', angle: '', autoApprove: false });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setError('');
    try { onStarted(await api('/api/runs', { method: 'POST', body: JSON.stringify(form) })); }
    catch (err) { setError(err.message); setBusy(false); }
  };

  return (
    <form className="new-form" onSubmit={submit}>
      <h1>New video</h1>
      <p className="hint">Runs <code>/video-scripter</code> in Claude Code: research, YouTube analysis, hooks, script,
        storyboard, publish kit and QA, written to <code>productions/&lt;date&gt;-&lt;slug&gt;/</code>.</p>
      <label>Topic or tool
        <input autoFocus value={form.topic} onChange={set('topic')} placeholder="e.g. How MCP servers work" />
      </label>
      <div className="row">
        <label>Format
          <select value={form.format} onChange={set('format')}>
            <option value="reel">Reel / Short (30–60 s)</option>
            <option value="explainer">Explainer (8–15 min)</option>
            <option value="session">Session (30–60 min)</option>
            <option value="all">All three</option>
          </select>
        </label>
        <label>Viewer level
          <select value={form.level} onChange={set('level')}>
            <option value="">Default (curious practitioner)</option>
            <option value="beginner">Beginner</option>
            <option value="practitioner">Practitioner</option>
          </select>
        </label>
      </div>
      <label>Must-include angle <span className="opt">optional</span>
        <textarea rows={3} value={form.angle} onChange={set('angle')} placeholder="Anything the video has to cover or avoid" />
      </label>
      <label className="check">
        <input type="checkbox" checked={form.autoApprove} onChange={set('autoApprove')} />
        Approve the animation plan with defaults (don't stop at step 5c)
      </label>
      {error && <div className="error">{error}</div>}
      <button className="primary" disabled={busy || !form.topic.trim()}>{busy ? 'Starting…' : 'Start'}</button>
    </form>
  );
}

function RunView({ run, onChange }) {
  const [events, setEvents] = useState([]);
  const [fileTick, setFileTick] = useState(0); // bumps when the run writes a package file

  useEffect(() => {
    if (!run) return;
    const es = new EventSource(`/api/runs/${run.id}/events`);
    es.onmessage = (m) => {
      const e = JSON.parse(m.data);
      setEvents((prev) => [...prev, e]);
      if (e.kind === 'status' || e.kind === 'production') onChange();
      if (e.kind === 'tool' && (e.name === 'Write' || e.name === 'Edit')) setFileTick((n) => n + 1);
    };
    return () => es.close();
  }, [run?.id]);

  if (!run) return <div className="empty">Loading…</div>;
  return (
    <div className="run">
      <Activity run={run} events={events} onChange={onChange} />
      {run.production
        ? <Package folder={run.production} live={run.status === 'running'} tick={fileTick} />
        : <div className="empty">The package folder appears here once the brief is written.</div>}
    </div>
  );
}

function Activity({ run, events, onChange }) {
  const [reply, setReply] = useState('');
  const [error, setError] = useState('');
  const bottom = useRef(null);
  useEffect(() => { bottom.current?.scrollIntoView({ block: 'end' }); }, [events.length]);

  const send = async (e) => {
    e.preventDefault();
    setError('');
    try { await api(`/api/runs/${run.id}/reply`, { method: 'POST', body: JSON.stringify({ text: reply }) }); setReply(''); onChange(); }
    catch (err) { setError(err.message); }
  };
  const stop = () => api(`/api/runs/${run.id}/stop`, { method: 'POST' }).then(onChange);
  const working = run.status === 'running';

  return (
    <section className="activity">
      <header>
        <div>
          <div className="run-title">{run.topic}</div>
          <div className="run-sub">{run.format} · <span className={`badge ${run.status}`}>{label(run.status)}</span>
            {run.costUsd > 0 && <> · ${run.costUsd.toFixed(2)}</>}</div>
        </div>
        {working && <button onClick={stop}>Stop</button>}
      </header>
      <div className="feed">
        {events.map((e, i) => <Event key={i} e={e} />)}
        {working && <div className="thinking">Working…</div>}
        <div ref={bottom} />
      </div>
      <form className="reply" onSubmit={send}>
        <textarea rows={3} value={reply} onChange={(e) => setReply(e.target.value)} disabled={working}
          placeholder={working ? 'Claude is working. You can reply when it stops.' : 'Reply: approve, pick an option, or ask for changes'}
          onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) send(e); }} />
        {error && <div className="error">{error}</div>}
        <button className="primary" disabled={working || !reply.trim()}>Send</button>
      </form>
      {run.production && run.status === 'waiting' && (
        <p className="next">Package done? Next step in Claude Code: <code>/video-studio productions/{run.production}</code></p>
      )}
    </section>
  );
}

const TOOL_VERB = { Read: 'Read', Write: 'Wrote', Edit: 'Edited', Bash: 'Ran', WebSearch: 'Searched', WebFetch: 'Fetched', Glob: 'Listed', Grep: 'Searched', Skill: 'Loaded skill' };

function Event({ e }) {
  if (e.kind === 'text') return <div className="ev text md" dangerouslySetInnerHTML={{ __html: marked.parse(e.text) }} />;
  if (e.kind === 'user') return <div className="ev user">{e.text}</div>;
  if (e.kind === 'tool') return <div className={`ev tool ${e.name}`}><b>{TOOL_VERB[e.name] || e.name}</b> {e.summary}</div>;
  if (e.kind === 'error') return <div className="ev error"><pre>{e.text}</pre></div>;
  if (e.kind === 'result') return <div className="ev result">Turn finished in {Math.round((e.durationMs || 0) / 1000)} s{e.isError ? ' with an error' : ''}</div>;
  return null;
}

function Package({ folder, live, tick = 0 }) {
  const [files, setFiles] = useState([]);
  const [active, setActive] = useState(null);
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    let off = false;
    const load = () => api(`/api/productions/${folder}`).then(({ files }) => { if (!off) setFiles(files); });
    load();
    const t = live ? setInterval(load, 4000) : null;
    return () => { off = true; clearInterval(t); };
  }, [folder, live, tick]);

  // Follow the newest file while the run is live; otherwise open the package (or the first file).
  useEffect(() => {
    if (!files.length) return;
    if (live) setActive([...files].sort((a, b) => b.mtime - a.mtime)[0].name);
    else if (!active || !files.some((f) => f.name === active)) setActive((files.find((f) => f.name === 'package.md') || files[0]).name);
  }, [files]);

  const activeMtime = files.find((f) => f.name === active)?.mtime;
  useEffect(() => {
    if (active) api(`/api/productions/${folder}/files/${active}`).then(setDoc);
  }, [folder, active, activeMtime]);

  const have = (key) => files.some((f) => f.name.startsWith(key));
  return (
    <section className="package">
      <div className="stages">
        {STAGES.map(([key, name]) => <span key={key} className={`stage ${have(key) ? 'done' : ''}`}>{name}</span>)}
      </div>
      <div className="tabs">
        {files.map((f) => (
          <button key={f.name} className={f.name === active ? 'active' : ''} onClick={() => setActive(f.name)}>{f.name.replace(/\.md$/, '')}</button>
        ))}
      </div>
      <div className="path">productions/{folder}/{active}</div>
      <article className="md doc" dangerouslySetInnerHTML={{ __html: doc ? marked.parse(doc.content) : '' }} />
    </section>
  );
}
