// npm run new <slug>  -> videos/<slug>/ scaffolded from the skill's example
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "./lib/common.mjs";
const slug = process.argv[2];
if (!slug) { console.error("usage: npm run new <slug>"); process.exit(1); }
const dir = path.join(ROOT, "videos", slug);
if (fs.existsSync(dir)) { console.error(`${dir} exists`); process.exit(1); }
fs.mkdirSync(path.join(dir, "voice"), { recursive: true });
const example = JSON.parse(fs.readFileSync(path.join(ROOT, "videos/jev-explained/video.json"), "utf8"));
example.slug = slug; example.title = "TODO title";
fs.writeFileSync(path.join(dir, "video.json"), JSON.stringify(example, null, 2));
fs.writeFileSync(path.join(dir, "script.md"), "# TODO\n\n### s01: Hook\n\nTODO spoken line.\n");
console.log(`created videos/${slug}/ (edit script.md + video.json, then: npm run voice ${slug})`);
