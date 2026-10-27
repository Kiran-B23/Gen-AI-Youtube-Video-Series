// Local app server: starts /video-scripter runs through headless Claude Code, streams their
// progress over SSE, and serves the production packages they write. Binds to localhost only.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const APP = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(APP, '../..'); // moved to app/legacy/ on 2026-10-17
const PRODUCTIONS = path.join(REPO, 'productions');
const RUNS_DIR = path.join(APP, '.runs');
const PORT = Number(process.env.PORT || 4321);
const DEV = process.argv.includes('--dev');
const CLAUDE = process.env.CLAUDE_BIN || 'claude';

fs.mkdirSync(RUNS_DIR, { recursive: true });

// ---------- runs ----------
// A run is one Claude Code session; each user reply resumes it with `--resume`.
// Metadata lives in .runs/<id>.json, events (one JSON per line) in .runs/<id>.jsonl.
const runs = new Map();      // id -> run metadata
const procs = new Map();     // id -> live child process
const listeners = new Map(); // id -> Set of SSE responses

for (const f of fs.readdirSync(RUNS_DIR).filter((f) => f.endsWith('.json'))) {
  const run = JSON.parse(fs.readFileSync(path.join(RUNS_DIR, f), 'utf8'));
  if (run.status === 'running') run.status = 'stopped'; // server restarted mid-turn
  runs.set(run.id, run);
}

const saveRun = (run) => fs.writeFileSync(path.join(RUNS_DIR, `${run.id}.json`), JSON.stringify(run, null, 2));

function emit(run, event) {
  event.t = Date.now();
  fs.appendFileSync(path.join(RUNS_DIR, `${run.id}.jsonl`), JSON.stringify(event) + '\n');
  for (const res of listeners.get(run.id) || []) res.write(`data: ${JSON.stringify(event)}\n\n`);
}

function readEvents(id) {
  const file = path.join(RUNS_DIR, `${id}.jsonl`);
  if (!fs.existsSync(file)) return [];
  return fs.readFileSync(file, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
}

const HEADLESS_NOTE = (opts) => [
  'You are running headless, started from the local video app. The user cannot answer AskUserQuestion.',
  'When you need a decision from the user (for example the animation-plan approval in step 5c, or an A/B/C choice),',
  'stop and end your turn with the question as plain text: list the options, mark the recommended one.',
  'The user will reply in the next message.',
  opts.level ? `Viewer level: ${opts.level}.` : '',
  opts.angle ? `Must-include angle from the user: ${opts.angle}` : '',
  opts.autoApprove ? 'The user has said "go ahead": at 5c use the defaults, note it in the Approval line, and finish the whole package without stopping.' : '',
].filter(Boolean).join(' ');

// Write/Edit file paths tell us which production folder the run is filling.
function productionOf(filePath) {
  const rel = path.relative(PRODUCTIONS, path.resolve(REPO, filePath || ''));
  if (rel.startsWith('..') || path.isAbsolute(rel)) return null;
  const folder = rel.split(path.sep)[0];
  return /^\d{4}-\d{2}-\d{2}-/.test(folder) ? folder : null;
}

function startTurn(run, prompt, { resume }) {
  const args = [
    '-p', prompt,
    '--output-format', 'stream-json', '--verbose',
    '--permission-mode', 'auto',
    '--disallowedTools', 'AskUserQuestion',
    '--append-system-prompt', HEADLESS_NOTE(run.options),
    resume ? '--resume' : '--session-id', run.sessionId,
  ];
  const child = spawn(CLAUDE, args, { cwd: REPO, env: process.env, stdio: ['ignore', 'pipe', 'pipe'] });
  procs.set(run.id, child);
  run.status = 'running';
  saveRun(run);
  emit(run, { kind: 'status', status: 'running' });

  let buf = '';
  child.stdout.on('data', (chunk) => {
    buf += chunk;
    let nl;
    while ((nl = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, nl).trim();
      buf = buf.slice(nl + 1);
      if (line) handleLine(run, line);
    }
  });
  let stderr = '';
  child.stderr.on('data', (c) => { stderr += c; });
  child.on('error', (err) => emit(run, { kind: 'error', text: `Could not start claude: ${err.message}` }));
  child.on('close', (code) => {
    procs.delete(run.id);
    if (run.status === 'running') run.status = code === 0 ? 'waiting' : 'error';
    if (code !== 0 && stderr.trim()) emit(run, { kind: 'error', text: stderr.trim().slice(-2000) });
    saveRun(run);
    emit(run, { kind: 'status', status: run.status });
  });
}

function handleLine(run, line) {
  let msg;
  try { msg = JSON.parse(line); } catch { return; }
  if (msg.type === 'assistant') {
    for (const block of msg.message?.content || []) {
      if (block.type === 'text' && block.text.trim()) emit(run, { kind: 'text', text: block.text });
      if (block.type === 'tool_use') {
        const input = block.input || {};
        // Only writes link a run to its folder: the scripter reads earlier packages as references first.
        const folder = ['Write', 'Edit', 'NotebookEdit'].includes(block.name) ? productionOf(input.file_path || input.notebook_path) : null;
        if (folder && !run.production) { run.production = folder; saveRun(run); emit(run, { kind: 'production', folder }); }
        emit(run, { kind: 'tool', name: block.name, summary: summarize(block.name, input), file: input.file_path ? path.relative(REPO, path.resolve(REPO, input.file_path)) : undefined });
      }
    }
  } else if (msg.type === 'result') {
    run.costUsd = (run.costUsd || 0) + (msg.total_cost_usd || 0);
    run.status = msg.is_error ? 'error' : 'waiting';
    saveRun(run);
    emit(run, { kind: 'result', isError: !!msg.is_error, durationMs: msg.duration_ms, costUsd: msg.total_cost_usd });
  }
}

function summarize(name, input) {
  const rel = (p) => (p ? path.relative(REPO, path.resolve(REPO, p)) : '');
  switch (name) {
    case 'Read': case 'Write': case 'Edit': return rel(input.file_path);
    case 'Bash': return (input.description || input.command || '').slice(0, 160);
    case 'Glob': case 'Grep': return input.pattern || '';
    case 'WebSearch': return input.query || '';
    case 'WebFetch': return input.url || '';
    case 'Skill': return input.skill || '';
    default: return '';
  }
}

// ---------- productions ----------
// Package files in pipeline order; anything else is listed after them.
const ORDER = ['brief', 'research', 'inspiration', 'hooks', 'script', 'art-direction', 'animation-plan', 'storyboard', 'publish', 'qa', 'package'];
const rank = (name) => { const i = ORDER.findIndex((s) => name.startsWith(s)); return i < 0 ? ORDER.length : i; };

function listProductions() {
  return fs.readdirSync(PRODUCTIONS, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^\d{4}-\d{2}-\d{2}-/.test(d.name))
    .map((d) => ({ folder: d.name, ...productionFiles(d.name) }))
    .sort((a, b) => b.folder.localeCompare(a.folder));
}

function productionFiles(folder) {
  const dir = safeJoin(PRODUCTIONS, folder);
  const files = fs.readdirSync(dir, { withFileTypes: true })
    .filter((f) => f.isFile() && f.name.endsWith('.md'))
    .map((f) => ({ name: f.name, mtime: fs.statSync(path.join(dir, f.name)).mtimeMs }))
    .sort((a, b) => rank(a.name) - rank(b.name) || a.name.localeCompare(b.name));
  return { files, updated: Math.max(0, ...files.map((f) => f.mtime)) };
}

function safeJoin(base, ...parts) {
  const p = path.resolve(base, ...parts);
  if (p !== base && !p.startsWith(base + path.sep)) throw Object.assign(new Error('bad path'), { status: 400 });
  return p;
}

// ---------- http ----------
const json = (res, status, body) => { res.writeHead(status, { 'content-type': 'application/json' }); res.end(JSON.stringify(body)); };
const readBody = (req) => new Promise((resolve, reject) => {
  let s = ''; req.on('data', (c) => { s += c; if (s.length > 1e6) req.destroy(); });
  req.on('end', () => { try { resolve(s ? JSON.parse(s) : {}); } catch (e) { reject(e); } });
});

async function api(req, res, url) {
  const parts = url.pathname.split('/').filter(Boolean).slice(1); // drop "api"
  const [a, b, c, ...rest] = parts;

  if (req.method === 'GET' && a === 'productions' && !b) return json(res, 200, listProductions());
  if (req.method === 'GET' && a === 'productions' && b && !c) return json(res, 200, productionFiles(b));
  if (req.method === 'GET' && a === 'productions' && b && c === 'files') {
    const name = rest.join('/');
    if (!name.endsWith('.md') || name.includes('/')) return json(res, 400, { error: 'only top-level .md files' });
    const file = safeJoin(PRODUCTIONS, b, name);
    return json(res, 200, { name, content: fs.readFileSync(file, 'utf8'), mtime: fs.statSync(file).mtimeMs });
  }

  if (req.method === 'GET' && a === 'runs' && !b) return json(res, 200, [...runs.values()].sort((x, y) => y.created - x.created));
  if (req.method === 'POST' && a === 'runs' && !b) {
    const { topic, format = 'reel', level = '', angle = '', autoApprove = false } = await readBody(req);
    if (!topic || !topic.trim()) return json(res, 400, { error: 'topic is required' });
    if (!['reel', 'explainer', 'session', 'all'].includes(format)) return json(res, 400, { error: 'bad format' });
    const run = { id: crypto.randomUUID().slice(0, 8), sessionId: crypto.randomUUID(), topic: topic.trim(), format,
      options: { level, angle, autoApprove }, created: Date.now(), status: 'starting', production: null, costUsd: 0 };
    runs.set(run.id, run);
    emit(run, { kind: 'user', text: `/video-scripter ${run.topic} ${format}` });
    startTurn(run, `/video-scripter ${run.topic} ${format}`, { resume: false });
    return json(res, 201, run);
  }

  const run = a === 'runs' && runs.get(b);
  if (a === 'runs' && !run) return json(res, 404, { error: 'no such run' });

  if (req.method === 'GET' && c === 'events') {
    res.writeHead(200, { 'content-type': 'text/event-stream', 'cache-control': 'no-cache', connection: 'keep-alive' });
    for (const e of readEvents(run.id)) res.write(`data: ${JSON.stringify(e)}\n\n`);
    if (!listeners.has(run.id)) listeners.set(run.id, new Set());
    listeners.get(run.id).add(res);
    const ping = setInterval(() => res.write(': ping\n\n'), 20000);
    req.on('close', () => { clearInterval(ping); listeners.get(run.id)?.delete(res); });
    return;
  }
  if (req.method === 'POST' && c === 'reply') {
    const { text } = await readBody(req);
    if (!text || !text.trim()) return json(res, 400, { error: 'empty reply' });
    if (procs.has(run.id)) return json(res, 409, { error: 'run is still working' });
    emit(run, { kind: 'user', text: text.trim() });
    startTurn(run, text.trim(), { resume: true });
    return json(res, 200, run);
  }
  if (req.method === 'POST' && c === 'stop') {
    const child = procs.get(run.id);
    if (child) { run.status = 'stopped'; child.kill('SIGINT'); }
    return json(res, 200, run);
  }
  return json(res, 404, { error: 'not found' });
}

let vite;
if (DEV) {
  const { createServer } = await import('vite');
  vite = await createServer({ root: APP, server: { middlewareMode: true }, appType: 'spa' });
}

const DIST = path.join(APP, 'dist');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  try {
    if (url.pathname.startsWith('/api/')) return await api(req, res, url);
    if (vite) return vite.middlewares(req, res);
    let file = safeJoin(DIST, '.' + decodeURIComponent(url.pathname));
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(DIST, 'index.html');
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  } catch (err) {
    json(res, err.status || 500, { error: err.message });
  }
}).listen(PORT, '127.0.0.1', () => console.log(`video app on http://localhost:${PORT}${DEV ? ' (dev)' : ''}`));
