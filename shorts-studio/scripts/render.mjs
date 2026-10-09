// npm run render <slug>  -> every part rendered, mastered to -14 LUFS / -1 dBTP, copied to ../shorts/
import fs from "node:fs";
import path from "node:path";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { MAX, FPS, ROOT, compId, genRegistry, layout, loadVideo, py } from "./lib/common.mjs";
import { assertValidVideo } from "./lib/validate.mjs";
const slug = process.argv[2];
genRegistry();
assertValidVideo(slug, { requireVoice: true });
const { spec, timings } = loadVideo(slug);
if (!timings) { console.error(`run npm run voice ${slug} first`); process.exit(1); }
const SHORTS = path.resolve(ROOT, "../shorts");
fs.mkdirSync(path.join(ROOT, "out"), { recursive: true }); fs.mkdirSync(path.join(SHORTS, "play-on-this-pc"), { recursive: true });
const serveUrl = await bundle({ entryPoint: path.join(ROOT, "engine/index.ts") });
for (const part of Object.keys(spec.parts)) {
  const { total } = layout(spec, timings, part);
  if (total / FPS > MAX) { console.error(`${part} is ${(total / FPS).toFixed(1)}s > 180s, shorten lines`); process.exit(1); }
  const id = compId(slug, part);
  const composition = await selectComposition({ serveUrl, id });
  const raw = path.join(ROOT, "out", `${id}-raw.mp4`);
  console.log(`rendering ${id} (${(total / FPS).toFixed(1)}s)…`);
  await renderMedia({ composition, serveUrl, codec: "h264", outputLocation: raw, crf: 17, pixelFormat: "yuv420p", imageFormat: "png", audioCodec: "aac", audioBitrate: "320k",
    onProgress: ({ progress }) => { if (Math.round(progress * 100) % 20 === 0) process.stdout.write(`\r  ${Math.round(progress * 100)}%`); } });
  console.log();
  py([path.join(ROOT, "scripts/lib/master.py"), raw, path.join(SHORTS, `${id}.mp4`), "aac"]);
  py([path.join(ROOT, "scripts/lib/master.py"), raw, path.join(SHORTS, "play-on-this-pc", `${id}-mp3audio.mp4`), "mp3"]);
}
