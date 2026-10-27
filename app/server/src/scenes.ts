// The voice ladder's knobs in scenes.json, written through a small form: voice.minPause {sentence, comma}, per-scene
// "pad" (hold after the line) and "pauseAfter" (words that get a sentence-length pause), and voice.name. Only those keys
// change; the rest of the file is re-serialised with its own indent. validate runs after every save (index.ts queues it).
import fs from "node:fs";
import path from "node:path";
import { readPace } from "./pace.js";

/** Gemini TTS prebuilt voices (voice.py takes voice.name as given; studio/voice-pace.json logs each take's raw pace) */
export const GEMINI_VOICES = ["Achernar", "Achird", "Algenib", "Algieba", "Alnilam", "Aoede", "Autonoe", "Callirrhoe", "Charon", "Despina",
  "Enceladus", "Erinome", "Fenrir", "Gacrux", "Iapetus", "Kore", "Laomedeia", "Leda", "Orus", "Puck", "Pulcherrima", "Rasalgethi",
  "Sadachbia", "Sadaltager", "Schedar", "Sulafat", "Umbriel", "Vindemiatrix", "Zephyr", "Zubenelgenubi"];

export interface VoicePatch {
  minPause?: { sentence?: number | null; comma?: number | null } | null;
  scenes?: Record<string, { pad?: number | null; pauseAfter?: string[] }>;
  voiceName?: string;
}
export class ScenesError extends Error { constructor(public code: number, msg: string) { super(msg); } }

const norm = (w: string) => w.toLowerCase().replace(/[^\p{L}\p{N}']+/gu, "");

export function applyVoicePatch(p: string, patch: VoicePatch) {
  const file = path.join(p, "scenes.json");
  const text = fs.readFileSync(file, "utf8");
  const spec = JSON.parse(text);
  const P = readPace();
  const changes: string[] = [];
  if (patch.minPause !== undefined) {
    spec.voice = spec.voice ?? {};
    const mp: Record<string, number> = { ...(spec.voice.minPause ?? {}) };
    for (const [k, cap] of [["sentence", P.pause_sentence_max], ["comma", P.pause_comma_max]] as const) {
      const v = patch.minPause?.[k];
      if (v === undefined) continue;
      if (v === null) { delete mp[k]; continue; }
      if (typeof v !== "number" || !Number.isFinite(v) || v < 0 || v > cap) throw new ScenesError(400, `minPause.${k} must be 0–${cap} s (pace.json pause_${k}_max)`);
      mp[k] = Math.round(v * 1000) / 1000;
    }
    const before = JSON.stringify(spec.voice.minPause ?? null);
    if (Object.keys(mp).length) spec.voice.minPause = mp; else delete spec.voice.minPause;
    if (before !== JSON.stringify(spec.voice.minPause ?? null)) changes.push(`voice.minPause ${before} → ${JSON.stringify(spec.voice.minPause ?? null)}`);
  }
  if (patch.voiceName !== undefined) {
    if (!GEMINI_VOICES.includes(patch.voiceName)) throw new ScenesError(400, `unknown voice: ${patch.voiceName}`);
    if (spec.voice?.speakers) throw new ScenesError(409, "this project uses voice.speakers (a dialogue): edit the cast in scenes.json");
    spec.voice = spec.voice ?? {};
    if (spec.voice.name !== patch.voiceName) { changes.push(`voice.name ${spec.voice.name ?? "(default)"} → ${patch.voiceName}`); spec.voice.name = patch.voiceName; }
  }
  for (const [id, sp] of Object.entries(patch.scenes ?? {})) {
    const sc = (spec.scenes ?? []).find((s: any) => s.id === id);
    if (!sc) throw new ScenesError(404, `no scene ${id}`);
    if (sp.pad !== undefined) {
      if (sp.pad === null) { if (sc.pad !== undefined) { changes.push(`${id}.pad ${sc.pad} → (default)`); delete sc.pad; } }
      else if (typeof sp.pad !== "number" || !Number.isFinite(sp.pad) || sp.pad < 0 || sp.pad > 3) throw new ScenesError(400, `${id}.pad must be 0–3 s`);
      else if (sc.pad !== sp.pad) { changes.push(`${id}.pad ${sc.pad ?? "(default)"} → ${sp.pad}`); sc.pad = Math.round(sp.pad * 1000) / 1000; }
    }
    if (sp.pauseAfter !== undefined) {
      if (!Array.isArray(sp.pauseAfter) || sp.pauseAfter.some((w) => typeof w !== "string" || !w.trim())) throw new ScenesError(400, `${id}.pauseAfter must be a list of words`);
      const said = new Set(String(sc.say ?? "").split(/\s+/).map(norm));
      const bad = sp.pauseAfter.filter((w) => !said.has(norm(w)));
      if (bad.length) throw new ScenesError(400, `${id}.pauseAfter: not in the say line: ${bad.join(", ")}`);
      const words = sp.pauseAfter.map((w) => w.trim());
      if (JSON.stringify(sc.pauseAfter ?? []) !== JSON.stringify(words)) {
        changes.push(`${id}.pauseAfter ${JSON.stringify(sc.pauseAfter ?? [])} → ${JSON.stringify(words)}`);
        if (words.length) sc.pauseAfter = words; else delete sc.pauseAfter;
      }
    }
  }
  if (!changes.length) return changes;
  // keep the file's own indent (the studio writes indent=1) and its ASCII escaping when it uses one
  const indent = text.match(/^\{\n( +)"/)?.[1].length ?? 1;
  const ascii = /\\u[0-9a-f]{4}/i.test(text) && !/[^\x00-\x7f]/.test(text);
  let out = JSON.stringify(spec, null, indent);
  if (ascii) out = out.replace(/[\u007f-￿]/g, (c) => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0"));
  const tmp = path.join(p, `.scenes.json.app-${process.pid}.tmp`);
  fs.writeFileSync(tmp, out + (text.endsWith("\n") ? "\n" : ""));
  fs.renameSync(tmp, file);
  return changes;
}
