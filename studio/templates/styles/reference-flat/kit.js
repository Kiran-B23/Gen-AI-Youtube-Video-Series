// reference-flat house style · shared stage helpers (loaded before the project's stage.js)
// Every motion is keyed to a spoken word: at("<scene>/<target>") reads the beats in scenes.json; W(scene, word) reads any word.
const $ = id => document.getElementById(id);
const END = sid => S[sid] + D[sid];
let __seed = 4821; const rnd = () => { __seed = (__seed * 1664525 + 1013904223) % 4294967296; return __seed / 4294967296; };   // deterministic: frames render out of order

const show = (id, t0, t1) => { tl.set('#' + id, { visibility: 'visible', opacity: 1 }, t0); if (t1 != null) tl.set('#' + id, { visibility: 'hidden', opacity: 0 }, t1); };
const pop = (id, t, o = {}) => tl.fromTo('#' + id, { opacity: 0, y: o.y ?? 30, x: o.x ?? 0, scale: o.s ?? 0.9 }, { opacity: 1, y: 0, x: 0, scale: 1, duration: o.d ?? 0.45, ease: o.ease ?? 'back.out(1.7)' }, t);
const fade = (id, t, d = 0.3) => tl.to('#' + id, { opacity: 0, duration: d }, t);
const slam = (id, t, rot = -5) => tl.fromTo('#' + id, { opacity: 0, scale: 2.2, rotation: rot - 10 }, { opacity: 1, scale: 1, rotation: rot, duration: 0.32, ease: 'back.out(2)' }, t);
// numbers: hidden until they start counting (never a "0" on screen), then count up
const count = (id, from, to, t, d, fmt) => { const el = $(id), o = { v: from }; el.textContent = fmt(to); tl.fromTo('#' + id, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.8)' }, t);
  tl.fromTo(o, { v: from }, { v: to, duration: d, ease: 'power2.out', onUpdate: () => { el.textContent = fmt(o.v); } }, t); };
const typeText = (id, text, t0, t1) => { const el = $(id), o = { n: 0 }; el.textContent = ''; tl.fromTo(o, { n: 0 }, { n: text.length, duration: Math.max(0.2, t1 - t0), ease: 'none', onUpdate: () => { el.textContent = text.slice(0, Math.round(o.n)); } }, t0); };
const drift = (id, t0, t1) => tl.fromTo('#' + id, { scale: 1 }, { scale: 1.018, duration: t1 - t0, ease: 'none' }, t0);   // nothing ever sits still
const group = (id, t0, t1) => { show(id, t0, t1); drift(id, t0, t1); };

// chapter card ("STEP 1 OF 4 / 01 / title"): lands 0.2 s early under the section wipe so the scene opens on the numeral.
// Returns the time it has fully left: start that step's content no earlier than this. The previous group must end at S - 0.2.
const chapter = (id, t0, t1) => {
  t0 -= 0.2; show(id, t0, t1 + 0.25);
  tl.fromTo(`#${id} .chapn`, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power4.out' }, t0);
  tl.fromTo(`#${id} .chapk`, { opacity: 0 }, { opacity: 1, duration: 0.3 }, t0 + 0.05);
  tl.fromTo(`#${id} .chapt`, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, t0 + 0.15);
  tl.to('#' + id, { opacity: 0, y: -60, duration: 0.25, ease: 'power2.in' }, t1);
  return t1 + 0.25;
};

// progress bar: progress([[sceneId, section], ...] colour changes, [[segId, sceneId], ...] lights, showFrom, hideAt)
const INK = { light: '#0B1020', yellow: '#0B1020', blue: '#FFFFFF', dark: '#FFFFFF' };
const progress = (colours, lights, t0, t1) => {
  tl.set('#prog', { opacity: 1 }, t0); tl.set('#prog', { opacity: 0 }, t1);
  colours.forEach(([sid, sec]) => tl.set('#prog', { color: INK[sec] }, S[sid] - 0.05));
  lights.forEach(([seg, sid]) => tl.to('#' + seg, { opacity: 1, duration: 0.3 }, S[sid]));
};

// camera (motion-design method): the stage sits inside #cam. cam(t, x, y, zoom) brings stage point (x, y) to the zone centre
// at `zoom` (1.3-2.6; every zoom goes where the action is, then camHome() brings it back). Transform only: capture-safe.
const CAMC = 840;   // centre of the stage zone y 220-1460
const cam = (t, x, y, z, d = 0.6) => tl.to('#cam', { x: 540 - x * z, y: CAMC - y * z, scale: z, transformOrigin: '0 0', duration: d, ease: 'power3.inOut' }, t);
const camHome = (t, d = 0.6) => cam(t, 540, CAMC, 1, d);

// CTA: the question builds word by word as it is spoken
const ctaWords = (sid, pairs) => pairs.forEach(([id, w]) => pop(id, (W(sid, w) ?? S[sid]) - 0.05, { y: 40, ease: 'power4.out', d: 0.3 }));
