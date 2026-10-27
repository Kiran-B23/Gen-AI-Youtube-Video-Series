// Plan-vs-render check, before any render: open hf/index.html in Chrome, seek the one GSAP timeline to every beat and
// assert that the element the beat reveals (data-beat="sNN/target") is really on screen on its word. Also: a planned
// reveal must be hidden just before its word; caption cards never reach a third line; nothing sits still > 2.5 s
// (walks the timeline's tweens, ignoring the drift/mwrap/glow fillers); camera moves counted; elements below the
// stage zone flagged. Writes out/payoffs.json (qa_video.py refuses a stale one) and exits 1 on a failed beat.
//
// usage: node tools/payoffs.mjs <slug>            (Playwright + system Chrome, from studio/node_modules)
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const STUDIO = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const slug = process.argv[2];
if (!slug) { console.error("usage: node tools/payoffs.mjs <slug>"); process.exit(2); }
const P = path.join(STUDIO, "projects", slug);
const index = path.join(P, "hf", "index.html");
const layout = JSON.parse(fs.readFileSync(path.join(P, "build", "layout.json"), "utf8"));
const html = fs.readFileSync(index, "utf8");
const sha1 = crypto.createHash("sha1").update(html).digest("hex");
const [W, H] = layout.size || [1080, 1920];
const ZONE_BOTTOM = (layout.stage_zone || [220, 1460])[1], RIGHT = Math.round(W * 0.88);
const MAX_STILL = 2.5, CAP_MAX_H = Math.round((layout.caption?.px || 60) * 1.2 * 2 + 6);

// Stage beats without a data-beat attribute: read the element from stage.js, where `pop('srcc', at('s01/src'))`
// already says which element the beat reveals (any kit verb with the id first and at('<key>') in the same statement).
const derived = {};
try {
  const spec = JSON.parse(fs.readFileSync(path.join(P, "scenes.json"), "utf8"));
  const js = spec.stage?.js ? fs.readFileSync(path.join(P, spec.stage.js), "utf8") : "";
  const ids = new Set([...html.matchAll(/\bid="([\w-]+)"/g)].map(m => m[1]));
  for (const stmt of js.split(/;\s*\n|\n(?=\s*\w+\()/)) {   // one statement at a time: every element id named in a statement that reads at('<key>')
    for (const k of stmt.matchAll(/\bat\(['"]([\w./-]+)['"]\)/g)) {
      const els = [...stmt.matchAll(/['"`]#?([\w-]+)['"`]/g)].map(m => m[1]).filter(id => ids.has(id));
      if (els.length) derived[k[1]] = [...new Set([...(derived[k[1]] || []), ...els])];
    }
  }
} catch {}

const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--allow-file-access-from-files", "--disable-gpu"] });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
page.on("pageerror", e => console.log("  page error:", e.message));
await page.addInitScript(() => { window.__timelines = window.__timelines || {}; });   // the runtime defines this at render time
await page.goto("file://" + index);
await page.evaluate(() => document.fonts.ready.then(() => true));
await page.waitForFunction(() => !!(window.__timelines && window.__timelines.main), null, { polling: 200, timeout: 60000 });

await page.evaluate(({ W, H }) => {
  // the HyperFrames runtime is not loaded in a bare page: emulate its clip windows, then seek the timeline
  window.__seek = t => {
    document.querySelectorAll(".clip").forEach(el => {
      const s = +el.dataset.start, d = +el.dataset.duration, on = t >= s && t < s + d;
      el.style.display = on ? "" : "none";
      if (on && el.tagName === "VIDEO") { try { el.currentTime = Math.max(0, t - s); } catch {} }
    });
    window.__timelines.main.seek(t, false);
  };
  window.__vis = sel => [...document.querySelectorAll(sel)].map(el => {
    let op = 1, e = el, reason = "";
    while (e && e !== document.documentElement) {
      const cs = getComputedStyle(e);
      if (cs.display === "none") { reason = "display:none on " + (e.id || e.className); break; }
      if (cs.visibility === "hidden") { reason = "visibility:hidden on " + (e.id || e.className); break; }
      op *= parseFloat(cs.opacity || "1"); e = e.parentElement;
    }
    const r = el.getBoundingClientRect();
    const inW = Math.max(0, Math.min(r.right, W) - Math.max(r.left, 0)), inH = Math.max(0, Math.min(r.bottom, H) - Math.max(r.top, 0));
    const inside = r.width * r.height ? (inW * inH) / (r.width * r.height) : 0;
    const content = el.textContent.trim().length > 0 || el.children.length > 0 || ["IMG", "VIDEO", "CANVAS", "svg", "I"].includes(el.tagName) || getComputedStyle(el).backgroundColor !== "rgba(0, 0, 0, 0)" || getComputedStyle(el).borderTopWidth !== "0px";
    const ok = !reason && op >= 0.9 && r.width * r.height >= 4 && inside >= 0.5 && content;
    if (!ok && !reason) reason = op < 0.9 ? `opacity ${op.toFixed(2)}` : r.width * r.height < 4 ? "zero size" : inside < 0.5 ? "outside the frame" : "empty";
    return { ok, reason, opacity: +op.toFixed(2), rect: [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)] };
  });
  window.__caps = () => [...document.querySelectorAll(".caption")].filter(c => getComputedStyle(c).display !== "none").map(c => {
    const b = c.querySelector(".capbox"); const r = (b || c).getBoundingClientRect(); return { h: Math.round(r.height), bottom: Math.round(r.bottom) };
  });
  window.__tweens = () => {
    const skip = t => !t || t === window || !(t instanceof Element) || t.matches(".drift, .mwrap, #bgglow, .secbg, .bgfill, .w, .caption, .capbox, .wipefill");
    const filler = tw => { const v = tw.vars || {}; const META = new Set(["duration", "ease", "delay", "onUpdate", "onComplete", "onStart", "onRepeat", "onReverseComplete", "overwrite", "immediateRender", "lazy", "startAt", "repeat", "repeatDelay", "repeatRefresh", "yoyo", "yoyoEase", "parent", "id", "data", "paused", "inherit", "runBackwards", "stagger", "callbackScope", "onUpdateParams", "onCompleteParams", "onStartParams", "reversed", "keyframes", "defaults", "autoRevert"]);
      const ks = Object.keys(v).filter(k => !META.has(k));
      return ks.length > 0 && ks.every(k => k === "scale") && Math.abs(parseFloat(v.scale) - 1) <= 0.03; };   // the kit's drift(): nothing the viewer reads as motion
    return window.__timelines.main.getChildren(true, true, false).map(tw => {
      if (filler(tw)) return null;
      const tg = (tw.targets ? tw.targets() : []).filter(t => !skip(t));
      if (!tg.length) return null;
      const r = tg[0].getBoundingClientRect ? tg[0].getBoundingClientRect() : { top: 0 };
      return { s: tw.startTime(), d: tw.totalDuration(), id: tg[0].id || tg[0].className, top: Math.round(r.top) };
    }).filter(Boolean);
  };
}, { W, H });

const seek = t => page.evaluate(t => window.__seek(t), Math.max(0, Math.min(layout.total - 0.02, t)));
const beats = [], warn = [];
for (const b of layout.beats || []) {
  const mode = b.check || (b.el ? "reveal" : "visible"), settle = b.settle ?? 0.5;
  const key = `${b.scene}/${b.target}`;
  let sel = b.el ? `#${b.el}` : `[data-beat~="${key}"], [data-beat="${key}"], [data-beat*="${key},"], [data-beat*=", ${key}"], [data-beat$=", ${key}"]`;
  const row = { scene: b.scene, target: b.target, word: b.word, at: b.at, el: b.el || null, mode, ok: true, reason: "" };
  if (mode === "none") { row.skipped = true; beats.push(row); continue; }
  await seek(b.at + settle);
  let vis = await page.evaluate(sel => window.__vis(sel), sel);
  if (!vis.length && derived[key]) { sel = derived[key].map(id => `#${id}`).join(", "); row.el = derived[key].join(","); row.derived = true; vis = await page.evaluate(sel => window.__vis(sel), sel); }
  if (!vis.length) { row.ok = false; row.reason = `no element with data-beat="${key}" (add it in stage.html, or "check": "none")`; beats.push(row); continue; }
  const v = vis.find(x => x.ok) || vis[0];
  row.rect = v.rect; row.opacity = v.opacity;
  if (!v.ok) { row.ok = false; row.reason = `not visible at ${(b.at + settle).toFixed(2)}s: ${v.reason}`; }
  if (v.ok && v.rect[1] + v.rect[3] > ZONE_BOTTOM + 8) { row.below_zone = true; warn.push(`${key}: element bottom ${v.rect[1] + v.rect[3]} is below the stage zone (${ZONE_BOTTOM})`); }
  if (v.ok && v.rect[0] + v.rect[2] > RIGHT && v.rect[1] > H * 0.55) { warn.push(`${key}: element reaches x ${v.rect[0] + v.rect[2]} in the lower-right button column`); }
  if (mode === "reveal" && row.ok) {
    await seek(b.at - 0.15);
    const before = await page.evaluate(sel => window.__vis(sel), sel);
    if (before.some(x => x.ok)) { row.ok = false; row.reason = `already visible 0.15 s before its word "${b.word}" (a reveal must land on the word; use "check": "visible" if it is meant to be on screen earlier)`; }
  }
  if (mode === "motion" && row.ok) {
    const clip = { x: Math.max(0, v.rect[0]), y: Math.max(0, v.rect[1]), width: Math.max(2, Math.min(v.rect[2], W - v.rect[0])), height: Math.max(2, Math.min(v.rect[3], H - v.rect[1])) };
    await seek(b.at - 0.1); const a = await page.screenshot({ clip });
    await seek(b.at + settle); const c = await page.screenshot({ clip });
    if (a.equals(c)) { row.ok = false; row.reason = `no visible change between ${(b.at - 0.1).toFixed(2)}s and ${(b.at + settle).toFixed(2)}s`; }
  }
  beats.push(row);
}

// captions: never a third line, never below the frame
const caps = [];
for (const c of layout.captions || []) {
  await seek((c.a + c.b) / 2);
  for (const m of await page.evaluate(() => window.__caps())) {
    if (m.h > CAP_MAX_H || m.bottom > H - 10) caps.push({ scene: c.scene, at: +((c.a + c.b) / 2).toFixed(2), height: m.h, bottom: m.bottom, words: c.words.map(w => w.w).join(" ") });
  }
}

// planned motion: per scene, the longest stretch with no tween on a real element (fillers excluded) must be ≤ 2.5 s
await seek(0);
const tweens = (await page.evaluate(() => window.__tweens())).filter(t => t.top < ZONE_BOTTOM + 200 || t.top === 0);
const motion = [];
for (const sc of (layout.scenes || []).slice(0, -1)) {
  const a = sc.start, b = sc.start + sc.duration;
  const iv = tweens.map(t => [Math.max(a, t.s), Math.min(b, t.s + Math.max(t.d, 0.05))]).filter(([x, y]) => y > x).sort((p, q) => p[0] - q[0]);
  let cur = a, gap = 0, gapAt = a;
  for (const [x, y] of iv) { if (x - cur > gap) { gap = x - cur; gapAt = cur; } cur = Math.max(cur, y); }
  if (b - cur > gap) { gap = b - cur; gapAt = cur; }
  motion.push({ scene: sc.id, longest_still_s: +gap.toFixed(2), at: +gapAt.toFixed(2), ok: gap <= MAX_STILL });
}

// edges: every 0.25 s, any visible text inside the stage (captions excluded) whose glyphs leave the frame x 0..W is a crop
// (a zoom or drift pushing content off-screen; beats alone never catch this). One-sample transients (an entrance) are ignored.
const edgeHits = await page.evaluate(({ W, H, total }) => {
  const vis = el => { let op = 1, e = el; while (e && e !== document.documentElement) { const cs = getComputedStyle(e); if (cs.display === "none" || cs.visibility === "hidden") return 0; op *= +cs.opacity; e = e.parentElement; } return op; };
  const leaves = [...document.querySelectorAll("#stage *")].filter(el => !el.closest(".caption") && [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()));
  const hits = {};
  for (let i = 0; i < Math.floor(total * 4); i++) {
    const t = i / 4; window.__seek(t);
    for (const el of leaves) {
      if (vis(el) < 0.5) continue;
      const tn = [...el.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim()); const rg = document.createRange();
      rg.setStartBefore(tn[0]); rg.setEndAfter(tn[tn.length - 1]); const r = rg.getBoundingClientRect();
      if (r.width * r.height < 4 || r.bottom < 0 || r.top > H) continue;
      if (r.left < -1 || r.right > W + 1) { const k = el.id || (el.textContent.trim().slice(0, 24)); (hits[k] = hits[k] || []).push([t, Math.round(r.left), Math.round(r.right)]); }
    }
  }
  return hits;
}, { W, H, total: layout.total });
const edges = [];
for (const [k, v] of Object.entries(edgeHits)) {
  let run = [v[0]];
  const flush = () => { if (run.length >= 2) edges.push({ el: k, from: run[0][0], to: run[run.length - 1][0], left: Math.min(...run.map(x => x[1])), right: Math.max(...run.map(x => x[2])) }); };
  for (const h of v.slice(1)) { if (h[0] - run[run.length - 1][0] <= 0.26) run.push(h); else { flush(); run = [h]; } }
  flush();
}

// camera: moves per scene, never more than one per 2.5 s
const camera = [];
for (const sc of layout.scenes || []) {
  const mv = (layout.camera || []).filter(c => c.at >= sc.start && c.at < sc.start + sc.duration);
  const dense = mv.some((c, k) => k && c.at - mv[k - 1].at < MAX_STILL);
  if (mv.length) camera.push({ scene: sc.id, moves: mv.length, ok: !dense, zooms: mv.map(c => c.zoom) });
  if (dense) warn.push(`${sc.id}: ${mv.length} camera moves closer than ${MAX_STILL} s (every zoom needs a reason; let one land before the next)`);
}
await browser.close();

const failed = beats.filter(b => !b.ok), checked = beats.filter(b => !b.skipped);
const out = { generated: new Date().toISOString(), slug, index_sha1: sha1, settle_default: 0.5, zone_bottom: ZONE_BOTTOM,
  summary: { checked: checked.length, passed: checked.length - failed.length, failed: failed.length, skipped: beats.length - checked.length,
             below_zone: beats.filter(b => b.below_zone).length, caption_overflow: caps.length, still_scenes: motion.filter(m => !m.ok).length, camera_moves: (layout.camera || []).length, edge_crops: edges.length },
  beats, captions: caps, motion, camera, edges, warnings: warn, tweens: tweens.map(t => ({ s: +t.s.toFixed(2), d: +t.d.toFixed(2), id: t.id })) };
fs.mkdirSync(path.join(P, "out"), { recursive: true });
fs.writeFileSync(path.join(P, "out", "payoffs.json"), JSON.stringify(out, null, 1));
for (const b of failed) console.log(`  ✗ ${b.scene} @ ${b.at.toFixed(2)}s "${b.word}" → ${b.target}: ${b.reason}`);
for (const c of caps) console.log(`  ✗ caption ${c.scene} @ ${c.at}s is ${c.height}px tall (max ${CAP_MAX_H}): "${c.words}"`);
for (const m of motion.filter(m => !m.ok)) console.log(`  ✗ ${m.scene}: nothing planned moves for ${m.longest_still_s}s from ${m.at}s`);
for (const e of edges) console.log(`  ✗ text cut at the frame edge ${e.from}–${e.to}s: "${e.el}" (x ${e.left}..${e.right}): pull the zoom back or move it inward`);
for (const w of warn) console.log(`  ⚠ ${w}`);
console.log(`payoffs: ${out.summary.passed}/${out.summary.checked} beats on screen on their word · ${out.summary.skipped} skipped · ${caps.length} caption overflow · ${out.summary.still_scenes} still scene(s) · ${out.summary.camera_moves} camera moves · ${edges.length} edge crop(s) → out/payoffs.json`);
process.exit(failed.length || caps.length || edges.length || motion.some(m => !m.ok) ? 1 : 0);
