// npm run durations <slug>
import { layout, loadVideo, FPS, MAX } from "./lib/common.mjs";
const slug = process.argv[2];
const { spec, timings } = loadVideo(slug);
if (!timings) { console.error(`No timings yet: run npm run voice ${slug}`); process.exit(1); }
for (const part of Object.keys(spec.parts)) {
  const { ids, frames, total } = layout(spec, timings, part);
  console.log(`\n${slug} · ${part}`);
  ids.forEach((id, i) => console.log(`  ${id}  ${(frames[i] / FPS).toFixed(2)}s`));
  console.log(`  TOTAL ${(total / FPS).toFixed(1)}s ${total / FPS > MAX ? "❌ over 180s" : "✅"}`);
}
