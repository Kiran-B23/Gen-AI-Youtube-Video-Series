// 3D avatar layer (Avaturn / Mixamo-style GLB with ARKit + Oculus viseme blend shapes), rendered frame-exact for HyperFrames.
// The assembler injects window.AVATAR = {model, size, camera, visemes: [[t, "aa"], ...], blinks: [t, ...]} and the stage
// pushes gestures into window.GEST = [[name, t0, t1], ...] (classic script, runs before this module).
// Every frame is a pure function of time t: body = the model's own idle clip at t, + gesture offsets blended in/out,
// face = the clip's idle face + the viseme at t (crossfaded) + blinks. No wall clock, no animation loop.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const A = window.AVATAR, GEST = window.GEST || [];
// gesture offsets (local euler, radians) for an Avaturn/Mixamo rig facing the camera; the stage side is the avatar's LEFT arm
// (screen right). Measured on 2026-10-12 with a pose grid (scratch: poses.html).
const POSES = {
  point:   { LeftArm: [-1.25, 0, -0.35], Head: [0, 0.35, 0], Spine2: [0, 0.12, 0] },
  present: { LeftArm: [-0.5, 0, -0.6], LeftForeArm: [0, 0, -0.9], Head: [0, 0.2, 0] },
  explain: { LeftArm: [-0.9, 0, 0], LeftForeArm: [-1.3, 0, 0], Head: [0, 0.1, 0] },
  raise:   { LeftArm: [-2.2, 0, 0], Head: [0.08, 0.1, 0] },
  look:    { Head: [0, 0.35, 0], Spine2: [0, 0.1, 0] },   // turn toward the stage
  nod:     { Head: [0.18, 0, 0] },
};
const IN = 0.35, OUT = 0.4;
const ease = x => x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x);

const canvas = document.getElementById('avatar3d');
const r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
r.setSize(A.size[0], A.size[1], false); r.setPixelRatio(1);
r.outputColorSpace = THREE.SRGBColorSpace; r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.15;
const scene = new THREE.Scene();
scene.add(new THREE.HemisphereLight(0xffffff, 0x9aa3b5, 0.9));
const key = new THREE.DirectionalLight(0xfff1e0, 2.6); key.position.set(1.6, 2.4, 2.6); scene.add(key);    // warm key from the stage side
const fill = new THREE.DirectionalLight(0xdbe6ff, 0.8); fill.position.set(-2, 1.2, 2); scene.add(fill);     // cool fill
const rim = new THREE.DirectionalLight(0xffffff, 3.2); rim.position.set(-1.4, 2.6, -2.5); scene.add(rim);    // rims: separate a dark outfit
const rim2 = new THREE.DirectionalLight(0xe8eeff, 2.2); rim2.position.set(1.6, 2.2, -2.2); scene.add(rim2);  // from a navy/blue background
const cam = new THREE.PerspectiveCamera(A.camera.fov, A.size[0] / A.size[1], 0.05, 50);
cam.position.set(...A.camera.pos); cam.lookAt(...A.camera.look);

let ready = null;
async function build() {
  const g = await new GLTFLoader().loadAsync(A.model);
  const m = g.scene; scene.add(m);
  const bones = []; m.traverse(o => { if (o.isBone) bones.push([o, o.quaternion.clone()]); });
  const faces = []; m.traverse(o => { if (o.morphTargetDictionary && 'viseme_aa' in o.morphTargetDictionary) faces.push(o); });
  const mixer = new THREE.AnimationMixer(m), clip = g.animations[0];
  const by = n => m.getObjectByName(n);
  const q = new THREE.Quaternion(), qi = new THREE.Quaternion(), e = new THREE.Euler();
  const setFace = (k, v, add) => faces.forEach(o => { const i = o.morphTargetDictionary[k]; if (i != null) o.morphTargetInfluences[i] = add ? Math.max(o.morphTargetInfluences[i], v) : v; });
  const MOUTH = ['jawOpen', 'jawForward', 'jawLeft', 'jawRight', 'mouthOpen', 'mouthFunnel', 'mouthPucker', 'mouthLeft', 'mouthRight',
    'mouthRollLower', 'mouthRollUpper', 'mouthShrugLower', 'mouthShrugUpper', 'mouthLowerDownLeft', 'mouthLowerDownRight',
    'mouthUpperUpLeft', 'mouthUpperUpRight', 'mouthStretchLeft', 'mouthStretchRight', 'mouthPressLeft', 'mouthPressRight', 'tongueOut'];
  const VIS = A.visemes, VNAMES = ['sil', 'PP', 'FF', 'TH', 'DD', 'kk', 'CH', 'SS', 'nn', 'RR', 'aa', 'E', 'I', 'O', 'U'];
  ready = t => {
    // body: bind pose -> idle clip at t (restarted so the mixer always writes) -> gestures on top
    bones.forEach(([o, b]) => o.quaternion.copy(b));
    if (clip) { mixer.stopAllAction(); mixer.clipAction(clip).reset().play(); mixer.update(t % clip.duration); }
    for (const [name, t0, t1] of GEST) {
      const w = Math.min(ease((t - t0) / IN), 1 - ease((t - t1) / OUT));
      if (w <= 0) continue;
      for (const [bn, rot] of Object.entries(POSES[name] || {})) {
        const o = by(bn); if (!o) continue;
        q.setFromEuler(e.set(...rot)); qi.identity().slerp(q, w); o.quaternion.multiply(qi);
      }
    }
    // face: the mouth belongs to the voice only. The idle clip's own mouth motion is zeroed (it parted the lips in pauses,
    // 2026-10-12 close-up review); then visemes crossfade over 70 ms at a little under full strength, which reads more natural.
    MOUTH.forEach(k => setFace(k, 0));
    VNAMES.forEach(v => setFace('viseme_' + v, 0));
    let k = -1; for (let i = 0; i < VIS.length && VIS[i][0] <= t; i++) k = i;
    if (k >= 0) {
      const f = ease((t - VIS[k][0]) / 0.07);
      setFace('viseme_' + VIS[k][1], 0.85 * f);
      if (k > 0 && f < 1) setFace('viseme_' + VIS[k - 1][1], 0.85 * (1 - f));
    }
    setFace('mouthSmileLeft', 0.08, true); setFace('mouthSmileRight', 0.08, true);
    for (const b of A.blinks) { const d = Math.abs(t - b); if (d < 0.09) { const v = 1 - d / 0.09; setFace('eyeBlinkLeft', v, true); setFace('eyeBlinkRight', v, true); } }
    r.render(scene, cam);
  };
  ready(window.__hfThreeTime || 0);
}
window.__hf = window.__hf || {}; window.__hf.buildReady = window.__hf.buildReady || {};
window.__hf.buildReady['avatar3d'] = build();
const renderAt = t => ready && ready(t);
window.addEventListener('hf-seek', ev => renderAt(ev.detail.time));
const tl = window.__timelines && window.__timelines.main;   // also follow the GSAP timeline (Studio preview, snapshots)
if (tl) tl.eventCallback('onUpdate', () => renderAt(tl.time()));
