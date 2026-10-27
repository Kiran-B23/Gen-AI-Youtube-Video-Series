// Read-only views of productions/<date>-<slug>/ (a video-scripter package): its Markdown files for the artifact tabs,
// the gate state the files record (ticks and VERDICT lines), and a change feed (fs.watch → SSE) for auto-refresh.
import fs from "node:fs";
import path from "node:path";
import { EventEmitter } from "node:events";
import { PRODUCTIONS, productionDir } from "./config.js";
import { verdictsIn } from "./agent.js";

/** the artifact tabs, in pipeline order (script/storyboard match any format: script-reel.md, storyboard-long.md …) */
export const TABS: { id: string; label: string; match: (f: string) => boolean }[] = [
  { id: "content-plan", label: "Content plan", match: (f) => f === "content-plan.md" },
  { id: "script", label: "Script", match: (f) => /^script-(?!review).+\.md$/.test(f) },
  { id: "script-review", label: "Script review", match: (f) => f === "script-review.md" },
  { id: "hooks", label: "Hooks", match: (f) => f === "hooks.md" },
  { id: "art-direction", label: "Art direction", match: (f) => f === "art-direction.md" },
  { id: "animation-plan", label: "Animation plan", match: (f) => f === "animation-plan.md" },
  { id: "storyboard", label: "Storyboard", match: (f) => /^storyboard(-.+)?\.md$/.test(f) },
  { id: "publish", label: "Publish", match: (f) => f === "publish.md" },
  { id: "qa", label: "QA", match: (f) => f === "qa.md" },
];

const mdFiles = (dir: string) => {
  try { return fs.readdirSync(dir).filter((f) => f.endsWith(".md") && !f.startsWith(".") && fs.statSync(path.join(dir, f)).isFile()).sort(); } catch { return []; }
};
const read = (f: string) => { try { return fs.readFileSync(f, "utf8"); } catch { return ""; } };

/** what the package files record: the gate ticks the linter reads + the last VERDICT line in each file */
function gates(dir: string, files: string[]) {
  const has = (f: string) => files.includes(f);
  const text = (f: string) => (has(f) ? read(path.join(dir, f)) : "");
  const tick = (f: string, re: RegExp) => { const t = text(f); return t ? (re.test(t) ? true : false) : null; };
  const lastVerdict = (f: string) => { const v = verdictsIn(text(f)); return v.length ? v[v.length - 1] : null; };
  const script = files.find((f) => /^script-(?!review).+\.md$/.test(f));
  const qa = text("qa.md");
  const qaTicks = qa ? { done: (qa.match(/^\s*- \[x\]/gim) ?? []).length, open: (qa.match(/^\s*- \[ \]/gm) ?? []).length } : null;
  return [
    { id: "research", label: "Research", state: has("research.md") ? "done" : "todo" },
    { id: "inspiration", label: "YouTube analysis", state: has("inspiration.md") ? "done" : "todo" },
    { id: "content-plan", label: "Content plan", state: !has("content-plan.md") ? "todo" : lastVerdict("content-plan.md")?.verdict === "NEEDS RESEARCH" ? "bad" : "done", verdict: lastVerdict("content-plan.md") },
    { id: "script", label: "Script", state: script ? "done" : "todo" },
    { id: "script-review", label: "Script review", state: tick("script-review.md", /- \[x\] Script review passed/i) ? "pass" : has("script-review.md") ? (lastVerdict("script-review.md")?.verdict === "CHANGES" ? "bad" : "open") : "todo", verdict: lastVerdict("script-review.md") },
    { id: "hooks", label: "Hooks", state: has("hooks.md") ? "done" : "todo" },
    { id: "animation-plan", label: "Animation plan", state: has("animation-plan.md") ? "done" : "todo" },
    { id: "visual-plan", label: "Visual plan", state: tick("animation-plan.md", /- \[x\] Visual plan passed/i) ? "pass" : has("animation-plan.md") ? "open" : "todo" },
    { id: "structure", label: "Structure", state: tick("animation-plan.md", /- \[x\] Structure check passed/i) ? "pass" : has("animation-plan.md") ? "open" : "todo" },
    { id: "storyboard", label: "Storyboard", state: files.some((f) => /^storyboard/.test(f)) ? "done" : "todo" },
    { id: "publish", label: "Publish", state: has("publish.md") ? "done" : "todo" },
    { id: "qa", label: "QA", state: !qaTicks ? "todo" : qaTicks.open === 0 ? "pass" : "open", detail: qaTicks ? `${qaTicks.done}/${qaTicks.done + qaTicks.open}` : null },
  ];
}

export function listProductions() {
  let dirs: string[] = [];
  try { dirs = fs.readdirSync(PRODUCTIONS).filter((d) => productionDir(d)); } catch { /* none */ }
  return dirs.map((d) => {
    const dir = path.join(PRODUCTIONS, d);
    const files = mdFiles(dir);
    const mtime = Math.max(0, ...files.map((f) => fs.statSync(path.join(dir, f)).mtimeMs));
    return { folder: d, files: files.length, mtime: new Date(mtime).toISOString(), gates: gates(dir, files) };
  }).sort((a, b) => b.folder.localeCompare(a.folder));
}

export function getProduction(folder: string) {
  const dir = productionDir(folder);
  if (!dir) return null;
  const files = mdFiles(dir).map((f) => { const s = fs.statSync(path.join(dir, f)); return { name: f, size: s.size, mtime: s.mtime.toISOString() }; });
  const names = files.map((f) => f.name);
  return {
    folder, files, gates: gates(dir, names),
    tabs: TABS.map((t) => ({ id: t.id, label: t.label, file: names.find(t.match) ?? null })),
    others: names.filter((n) => !TABS.some((t) => t.match(n))),
  };
}

export function productionFile(folder: string, name: string): string | null {
  const dir = productionDir(folder);
  if (!dir || !/^[a-z0-9][a-z0-9._-]*\.md$/i.test(name)) return null;
  const f = path.join(dir, name);
  return fs.existsSync(f) && fs.statSync(f).isFile() ? read(f) : null;
}

// ---------- change feed: one fs.watch per watched folder, shared by every open page ----------
const feeds = new Map<string, { w: fs.FSWatcher; n: number; e: EventEmitter; timer: NodeJS.Timeout | null; changed: Set<string> }>();
export function watchProduction(folder: string, onChange: (files: string[]) => void): (() => void) | null {
  const dir = productionDir(folder);
  if (!dir) return null;
  let f = feeds.get(folder);
  if (!f) {
    const e = new EventEmitter();
    const feed = { w: null as unknown as fs.FSWatcher, n: 0, e, timer: null as NodeJS.Timeout | null, changed: new Set<string>() };
    feed.w = fs.watch(dir, (_ev, name) => {
      const n = String(name ?? "");
      if (!n.endsWith(".md") || n.startsWith(".")) return;   // yt/ and temp files are not artifacts
      feed.changed.add(n);
      if (feed.timer) return;
      feed.timer = setTimeout(() => { const files = [...feed.changed]; feed.changed.clear(); feed.timer = null; e.emit("change", files); }, 300);
    });
    feeds.set(folder, (f = feed));
  }
  const feed = f;
  feed.n++; feed.e.on("change", onChange);
  return () => {
    feed.e.off("change", onChange);
    if (--feed.n === 0) { feed.w.close(); if (feed.timer) clearTimeout(feed.timer); feeds.delete(folder); }
  };
}
