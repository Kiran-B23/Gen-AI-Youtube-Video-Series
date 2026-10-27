// Live composition preview (no render): studio/projects/<slug>/hf/ served read-only under /preview/<slug>/, with a small
// runtime injected before the page's own scripts. The runtime emulates what tools/payoffs.mjs emulates (the HyperFrames
// runtime is not loaded): `.clip` windows from data-start/data-duration, <video> clips seeked to t − start, and the one
// GSAP timeline seeked with window.__timelines.main.seek(t, false). The parent page drives it; the MP4 stays the truth.
import fs from "node:fs";
import path from "node:path";
import type { FastifyInstance } from "fastify";
import { projectDir, safeFile } from "./config.js";

const EXT = new Set([".html", ".js", ".mjs", ".css", ".json", ".ttf", ".otf", ".woff", ".woff2", ".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg",
  ".mp4", ".webm", ".mov", ".wav", ".mp3", ".m4a", ".ogg"]);

// The composition is this repo's own code, but it runs same-origin (the parent calls into it), so keep it from talking
// to the app API: no fetch/XHR/WebSocket at all (connect-src 'none'); scripts, styles, fonts and media from here only.
const CSP = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; " +
  "font-src 'self' data:; media-src 'self' blob:; connect-src 'none'; frame-ancestors 'self'; base-uri 'self'; form-action 'none'";

/** Served at /preview-runtime.js; runs in <head> before the composition's scripts. */
export const RUNTIME_JS = `// studio app preview runtime (an emulation of the HyperFrames runtime, like tools/payoffs.mjs)
(() => {
  window.__timelines = window.__timelines || {};
  const errors = [];
  window.addEventListener("error", (e) => errors.push(String(e.message || e)));
  // the parent page plays assets/mix.wav as the clock: keep every media element in here silent, and stop the
  // composition's own <audio> (the 20+ MB mix) from loading twice
  new MutationObserver((ms) => { for (const m of ms) for (const n of m.addedNodes) {
    if (n.tagName === "AUDIO") { n.preload = "none"; n.muted = true; n.autoplay = false; }
    if (n.tagName === "VIDEO") { n.muted = true; n.autoplay = false; n.preload = "auto"; }
  } }).observe(document.documentElement, { childList: true, subtree: true });
  const FRAME = 1 / 30;
  let videosBlocked = 0;
  window.__preview = {
    ready: () => !!(window.__timelines && window.__timelines.main),
    /** t in seconds; playing: let <video> clips run (corrected when they drift) instead of seeking every frame */
    seek(t, playing) {
      for (const el of document.querySelectorAll(".clip")) {
        const s = parseFloat(el.dataset.start), d = parseFloat(el.dataset.duration);
        if (!isFinite(s)) continue;
        const on = t >= s && t < s + (isFinite(d) ? d : Infinity);
        el.style.display = on ? "" : "none";
        if (el.tagName === "VIDEO") {
          const want = Math.max(0, t - s);
          if (!on) { if (!el.paused) el.pause(); continue; }
          if (playing) {
            if (el.paused) el.play().catch(() => { videosBlocked++; });
            if (Math.abs(el.currentTime - want) > 0.2) el.currentTime = want;
          } else {
            if (!el.paused) el.pause();
            if (Math.abs(el.currentTime - want) > FRAME / 2) el.currentTime = want;
          }
        } else if (el.tagName === "AUDIO" && !el.paused) el.pause();
      }
      const tl = window.__timelines.main;
      if (tl) tl.seek(t, false);
    },
    pause() { for (const v of document.querySelectorAll("video")) if (!v.paused) v.pause(); },
    info() {
      const tl = window.__timelines.main;
      const vids = [...document.querySelectorAll("video")];
      return { duration: tl ? tl.duration() : null, clips: document.querySelectorAll(".clip").length, videos: vids.length,
        videosNotLoaded: vids.filter((v) => v.readyState < 2 && v.style.display !== "none").length, videosBlocked,
        timelines: Object.keys(window.__timelines), fonts: document.fonts ? document.fonts.status : "n/a",
        fontsLoaded: document.fonts ? [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family) : [],
        fontsFailed: document.fonts ? [...document.fonts].filter((f) => f.status === "error").map((f) => f.family) : [],
        errors: errors.slice(-5) };
    },
  };
})();
`;

export function registerPreview(app: FastifyInstance) {
  app.get("/preview-runtime.js", (_req, reply) =>
    reply.header("Content-Type", "text/javascript; charset=utf-8").header("Cache-Control", "no-cache").send(RUNTIME_JS));

  app.get<{ Params: { slug: string; "*": string } }>("/preview/:slug/*", (req, reply) => {
    const p = projectDir(req.params.slug);
    if (!p) return reply.code(404).send({ error: "no such project" });
    const hf = path.join(p, "hf");
    if (!fs.existsSync(hf)) return reply.code(404).send({ error: "no hf/ yet: run assemble" });
    const rel = req.params["*"] || "index.html";
    const real = safeFile(hf, rel, EXT);
    if (!real) return reply.code(404).send({ error: "not found" });
    reply.header("X-Frame-Options", "SAMEORIGIN").header("Content-Security-Policy", CSP).header("Cache-Control", "no-cache");
    if (path.extname(real) === ".html") {
      // inject the runtime as the first thing in <head> (the file on disk is never changed)
      const html = fs.readFileSync(real, "utf8");
      const tag = `<script src="/preview-runtime.js"></script>`;
      const out = /<head[^>]*>/i.test(html) ? html.replace(/<head[^>]*>/i, (m) => `${m}${tag}`) : tag + html;
      return reply.header("Content-Type", "text/html; charset=utf-8").send(out);
    }
    const root = fs.realpathSync(hf);
    return reply.sendFile(path.relative(root, real), root); // Range requests (the mix, the clips)
  });
}
