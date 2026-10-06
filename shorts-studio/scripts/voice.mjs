// npm run voice <slug> [-- --web-voice]
// Validates video.json, cleans the voice clips, gets Whisper word timings, prints durations (fails over 180 s).
import path from "node:path";
import { genRegistry, py, ROOT } from "./lib/common.mjs";
const [slug, ...rest] = process.argv.slice(2);
if (!slug) { console.error("usage: npm run voice <slug> [-- --web-voice]"); process.exit(1); }
try { py([path.join(ROOT, "scripts/lib/voice_pipeline.py"), slug, ...rest]); } finally { genRegistry(); }
