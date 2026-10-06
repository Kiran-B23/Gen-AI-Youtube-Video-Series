// node scripts/stills.mjs <Comp> <mid|trans|all>   -> out/stills/<Comp>/*.png
import path from "node:path";
import fs from "node:fs";
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
const [comp, kind = "all", outDir] = process.argv.slice(2);
const plan = JSON.parse(fs.readFileSync("scripts/plan.json", "utf8"))[comp];
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const composition = await selectComposition({ serveUrl, id: comp });
const explicit = process.argv.slice(5).map((x) => x.split(":")).map(([n, f]) => [n, Number(f)]);
const items = kind === "list" ? explicit : [...(kind !== "trans" ? plan.mid.map(([n, f]) => ["mid-" + n, f]) : []), ...(kind !== "mid" ? plan.trans.map(([n, f]) => ["tr-" + n.replace(">", "-"), f]) : [])];
const dir = outDir && outDir !== "-" ? outDir : `out/stills/${comp}`;
fs.mkdirSync(dir, { recursive: true });
for (const [name, frame] of items) {
  await renderStill({ composition, serveUrl, output: `${dir}/${String(frame).padStart(5, "0")}-${name}.png`, frame });
}
console.log(`${items.length} stills -> ${dir}`);
