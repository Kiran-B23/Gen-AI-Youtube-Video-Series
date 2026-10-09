// Static validation of videos/<slug>/video.json, run before voice and render.
// The engine silently ignores any beat it cannot resolve (unknown action, unknown
// target), which ships a visual that never syncs with the voice — so fail here.
import fs from "node:fs";
import path from "node:path";
import { ROOT, videoDir } from "./common.mjs";

/** Beat actions the engine resolves — engine/core/context.tsx useBeats() plus the documented extras. */
export const BEAT_ACTIONS = ["show", "hide", "burst", "stamp", "zoom-punch", "count-up", "highlight"];
/** Beat targets that name an element the scene draws itself rather than a props path. */
const PSEUDO_TARGETS = ["stamp"];

const SCENES_SRC = path.join(ROOT, "engine/scenes/index.ts");

/** Scene types registered in engine/scenes/index.ts — the scene map is the single source of truth. */
export const sceneTypes = () => {
  if (!fs.existsSync(SCENES_SRC)) return [];
  const src = fs.readFileSync(SCENES_SRC, "utf8");
  const map = src.slice(src.indexOf("export const SCENES"));
  return [...map.matchAll(/^\s*"?([a-z0-9-]+)"?:\s*[A-Za-z0-9_.]+,\s*$/gm)].map((m) => m[1]);
};

const readJson = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    return { __error: e.message };
  }
};

/** All problems found in one video.json. `errors` block a run, `warnings` are advisory. */
export const validateVideo = (slug, { requireVoice = false } = {}) => {
  const errors = [];
  const warnings = [];
  const dir = videoDir(slug);
  const file = path.join(dir, "video.json");
  if (!fs.existsSync(file)) return { errors: [`videos/${slug}/video.json not found`], warnings };
  const spec = readJson(file);
  if (spec.__error) return { errors: [`videos/${slug}/video.json is not valid JSON: ${spec.__error}`], warnings };
  const timingsFile = path.join(dir, "build/timings.json");
  const timings = fs.existsSync(timingsFile) ? readJson(timingsFile) : null;

  const types = sceneTypes();
  if (!types.length) warnings.push("could not read scene types from engine/scenes/index.ts — type check skipped");
  const scenes = spec.scenes ?? [];
  const ids = new Set(scenes.map((s) => s.id));

  for (const [part, partIds] of Object.entries(spec.parts ?? {})) {
    for (const id of partIds) if (!ids.has(id)) errors.push(`part "${part}" lists scene "${id}", which is not in scenes[]`);
  }

  for (const s of scenes) {
    if (types.length && !types.includes(s.type)) errors.push(`${s.id}: unknown scene type "${s.type}" — it renders an "Unknown scene type" card`);
    const props = s.props ?? {};
    for (const b of s.beats ?? []) {
      const spoken = `beat "${b.word ?? "?"}"`;
      if (!b.word) errors.push(`${s.id}: a ${spoken} has no "word" to trigger on`);
      if (!b.action) errors.push(`${s.id}: ${spoken} has no "action"`);
      else if (!BEAT_ACTIONS.includes(b.action) && !String(b.action).startsWith("sfx:")) {
        errors.push(`${s.id}: ${spoken} uses action "${b.action}" — the engine ignores it (use ${BEAT_ACTIONS.join(", ")}, or sfx:<name>)`);
      }
      // Only dotted targets are props paths; a plain name may be an element the scene draws itself.
      if (!b.target || !String(b.target).includes(".") || PSEUDO_TARGETS.includes(b.target)) continue;
      const [root, index] = String(b.target).split(".");
      if (!(root in props)) {
        warnings.push(`${s.id}: ${spoken} targets "${b.target}" but props has no "${root}"`);
        continue;
      }
      const list = props[root];
      if (Array.isArray(list) && /^\d+$/.test(index ?? "") && Number(index) >= list.length) {
        warnings.push(`${s.id}: ${spoken} targets "${b.target}" but props.${root} has only ${list.length} entries`);
      }
    }
    if (requireVoice && !s.silentSeconds && timings && !timings[s.id]) {
      errors.push(`${s.id}: no word timings — run npm run voice ${slug}`);
    }
  }
  return { errors, warnings };
};

/** Print the findings and exit non-zero when the video.json cannot render as spoken. */
export const assertValidVideo = (slug, opts = {}) => {
  const { errors, warnings } = validateVideo(slug, opts);
  for (const w of warnings) console.warn(`  warn  ${w}`);
  if (errors.length) {
    console.error(`\nvideo.json (${slug}) failed validation:\n${errors.map((e) => `  - ${e}`).join("\n")}\n`);
    process.exit(1);
  }
};
