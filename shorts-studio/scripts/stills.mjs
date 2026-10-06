// npm run still <slug> [part]  -> out/stills/<slug>/  (mid-scene + every transition) + contact sheets
import fs from "node:fs";
import path from "node:path";
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import { ROOT, TRANS, compId, genRegistry, layout, loadVideo, py } from "./lib/common.mjs";
const [slug, part = "full", ...extra] = process.argv.slice(2);
genRegistry();
const { spec, timings } = loadVideo(slug);
const { ids, frames, starts } = layout(spec, timings, part);
const extras = extra.map((x) => x.split(":")).map(([n, f]) => [n, Number(f)]);
const items = process.env.ONLY ? extras : [
  ...ids.map((id, i) => [`mid-${id}`, starts[i] + Math.floor(frames[i] / 2)]),
  ...ids.slice(1).map((id, i) => [`tr-${ids[i]}-${id}`, starts[i + 1] + Math.floor(TRANS / 2)]),
  ...ids.map((id, i) => [`late-${id}`, starts[i] + Math.floor(frames[i] * 0.85)]),
  ["first", 0],
  ...extras,
];
const dir = path.join(ROOT, "out/stills", process.env.ONLY ? `${slug}-extra` : slug);
fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
const serveUrl = await bundle({ entryPoint: path.join(ROOT, "engine/index.ts") });
const composition = await selectComposition({ serveUrl, id: compId(slug, part) });
for (const [name, frame] of items) await renderStill({ composition, serveUrl, frame, output: path.join(dir, `${String(frame).padStart(5, "0")}-${name}.png`) });
py([path.join(ROOT, "scripts/lib/sheet.py"), dir, path.join(ROOT, "out/stills", `${slug}${process.env.ONLY ? "-extra" : ""}-sheet`)]);
console.log(`${items.length} stills -> ${path.relative(ROOT, dir)} (+ contact sheets out/stills/${slug}-sheet-*.png)`);
