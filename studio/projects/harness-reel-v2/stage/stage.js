// Harness reel v2 stage · house style reference-flat (kit.js loaded first) · every cue is a beat in scenes.json, read with at().
// Running object: the task card + its DONE stamp + its test row. The harness ring is built around the MODEL pill (never changes).
// The pinned question, section titles and the replay chip live outside #cam (moved at load) so pushes slide under them.
// Camera moves come from the beats' "cam" (assemble), not from this file.
(function () {
  const A = k => at(k);
  const sel = ids => (Array.isArray(ids) ? ids : [ids]).map(x => '#' + x).join(', ');
  const on = (ids, t, d = 0.25) => tl.to(sel(ids), { opacity: 1, duration: d }, t);
  const off = (ids, t, d = 0.25) => tl.to(sel(ids), { opacity: 0, duration: d }, t);
  const pulse = (id, t, s = 1.08, d = 0.14) => tl.fromTo('#' + id, { scale: 1 }, { scale: s, duration: d, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, t);
  const typeIn = (id, text, t, d) => { tl.set('#' + id, { opacity: 1 }, t); typeText(id, text, t, t + (d ?? Math.min(0.7, 0.1 + text.length * 0.025))); };
  const slideIn = (id, t) => tl.fromTo('#' + id, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out', immediateRender: false }, t);
  const shrinkAway = (ids, t, d = 0.35) => tl.to(sel(ids), { opacity: 0, scale: 0.6, duration: d, ease: 'power2.in' }, t);
  const blink = (id, t0, t1) => { const n = Math.max(1, Math.floor((t1 - t0) / 0.44)) * 2 - 1; tl.to('#' + id, { opacity: 0.35, duration: 0.22, yoyo: true, repeat: n, ease: 'none' }, t0); };
  const E = END('s15');

  // the pinned layer sits outside the camera (visual-plan storyboard mode, 2026-10-30)
  const top = $('k-g-top'), stg = document.getElementById('stage');
  if (top && stg && top.parentElement && top.parentElement.id === 'cam') stg.appendChild(top);

  // ---------- groups ----------
  show('k-g-top', 0, E);
  show('k-g-hook', 0, S.s02 + 0.6);
  show('k-g-wb', S.s02 - 0.3, S.s15 + 0.6);
  show('k-g-st', S.s07 - 0.2, S.s11 + 2.2);
  show('k-g-rc', S.s15 - 0.3, E);
  drift('k-g-wb', S.s02, S.s15); drift('k-g-st', S.s07, S.s11 + 2.2);

  // ---------- frame 0 + s01: built on the voice (openings rule, 2026-10-30) ----------
  // 0 s: the question's first words + the task card (2 things, 6 words). The question grows word by word with the voice
  // (s01 has "captions": false: the question is the caption), DONE stamps on "Done", the red row lands on "test";
  // the "illustrative" tag after the hook, the 2x chip only when the replay starts (s02).
  tl.set(['#k-q2', '#k-q3', '#k-q4', '#k-q5', '#k-stamp0', '#k-row0', '#k-tag0', '#k-chip'], { opacity: 0 }, 0);
  tl.fromTo('#k-card0', { scale: 0.96 }, { scale: 1, duration: 0.5, ease: 'power2.out' }, 0);
  const word = (id, t) => tl.fromTo('#' + id, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out', immediateRender: false }, t);
  word('k-q2', A('s01/q2')); word('k-q3', A('s01/q3')); word('k-q4', A('s01/q4')); word('k-q5', A('s01/q5'));
  tl.fromTo('#k-stamp0', { opacity: 0, scale: 1.9 }, { opacity: 1, scale: 1, duration: 0.22, ease: 'back.out(2)', immediateRender: false }, A('s01/done'));
  tl.to('#k-stamp0', { backgroundColor: '#0E9461', color: '#FFFFFF', duration: 0.15 }, A('s01/done') + 0.3);   // the claim is inked
  tl.fromTo('#k-row0', { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.25, ease: 'power3.out', immediateRender: false }, A('s01/xm'));
  tl.fromTo('#k-xm', { scale: 1 }, { scale: 1.4, duration: 0.2, ease: 'back.out(2)', immediateRender: false }, A('s01/xm') + 0.25);
  on('k-tag0', A('s01/xm') + 0.6, 0.3);
  pulse('k-q', A('s01/q'), 1.03);
  tl.to('#k-q', { color: '#2B3BE0', duration: 0.2 }, A('s01/q'));
  tl.set('#k-chip', { opacity: 1 }, S.s02 - 0.1);

  // ---------- s02 (fast, 2x): the question pins, the card moves to the workbench, the failure plays fast ----------
  const t2 = S.s02;
  tl.to('#k-q', { scale: 0.36, opacity: 0, duration: 0.3, ease: 'power2.in' }, t2 - 0.12);
  tl.fromTo('#k-qh', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, immediateRender: false }, t2 + 0.12);
  tl.to('#k-g-top', { '--band': 1, duration: 0.01 }, t2);
  tl.to('#k-card0', { y: -220, scaleY: 0.632, transformOrigin: '50% 0', duration: 0.3, ease: 'power3.inOut' }, t2 - 0.12);
  tl.to(['#k-stamp0', '#k-row0'], { opacity: 0, y: -60, duration: 0.22, ease: 'power2.in' }, t2 - 0.12);
  tl.set('#k-card', { opacity: 1 }, t2 + 0.18); tl.set('#k-card0', { opacity: 0 }, t2 + 0.2);
  on('k-ctag', t2 + 0.2, 0.2);
  blink('k-chip', t2 + 0.1, END('s02'));
  // watch 2026-10-30: the bare agent (just the MODEL, no harness yet) and the test slot that waits, so the fast pass isn't half empty
  tl.fromTo('#k-pill', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out', immediateRender: false }, t2 + 0.2);
  pulse('k-pill', A('s02/code'), 1.06); pulse('k-pill', A('s02/scan'), 1.06);
  on('k-rghost', t2 + 0.3, 0.25); tl.to('#k-rghost', { opacity: 0, duration: 0.15 }, A('s02/row'));
  typeIn('k-cl1', 'function reset(user) {', A('s02/code'), 0.3);
  typeIn('k-cl2', '  saveToken(user)', A('s02/code') + 0.25, 0.25);
  typeIn('k-cl3', '  return "ok"', A('s02/code') + 0.45, 0.2);
  tl.fromTo('#k-cscan', { opacity: 1, y: 0 }, { y: 136, duration: 0.22, repeat: 1, ease: 'none', immediateRender: false }, A('s02/scan'));
  tl.to('#k-cscan', { opacity: 0, duration: 0.1 }, A('s02/scan') + 0.5);
  tl.fromTo('#k-stamp', { opacity: 0, scale: 1.9 }, { opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(2)', immediateRender: false }, A('s02/stamp2'));
  tl.fromTo('#k-row', { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.25, ease: 'power3.out', immediateRender: false }, A('s02/row'));
  on('k-stnr', A('s02/row') + 0.05, 0.15);
  tl.to('#k-stnr', { scale: 1.14, backgroundColor: '#A9AEBB', duration: 0.12, ease: 'power2.out' }, A('s02/nrchip'));
  tl.fromTo('#k-nr', { opacity: 0, scale: 2 }, { opacity: 1, scale: 1, duration: 0.22, ease: 'back.out(2)', immediateRender: false }, A('s02/nr'));

  // ---------- s03 (1x): the replay; the ring is drawn around the MODEL pill ----------
  const t3 = S.s03;
  tl.set('#k-chip2', { display: 'none' }, t3 - 0.05); tl.set('#k-chip1', { display: 'inline' }, t3 - 0.05);
  tl.to('#k-chip', { x: 670, y: -846, duration: 0.45, ease: 'power3.inOut' }, t3 - 0.05);
  slideIn('k-sec1', t3);
  tl.to('#k-nr', { opacity: 0, scale: 0.3, x: 220, duration: 0.35, ease: 'power2.in' }, t3);
  tl.to('#k-stnr', { scale: 1, backgroundColor: '#C9CDD6', duration: 0.2 }, t3 + 0.2);
  tl.fromTo('#k-ring', { opacity: 0, scale: 0.86 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out', immediateRender: false }, A('s03/ring'));
  ['k-l1', 'k-l2', 'k-l3', 'k-l4', 'k-l5'].forEach((id, i) => tl.fromTo('#' + id, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.2, immediateRender: false }, A('s03/ring') + 0.1 + i * 0.12));
  on('k-itag', A('s03/ring') + 0.7, 0.3);
  // a dot runs once around the ring (the "around")
  const td = A('s03/dash'); tl.set('#k-dash', { opacity: 1, x: 100, y: 700 }, td);
  [[910, 700], [937, 960], [910, 1010], [100, 1010], [60, 740], [100, 700]].forEach(([x, y], i) => tl.to('#k-dash', { x, y, duration: 0.24, ease: 'none' }, td + i * 0.24));
  tl.to('#k-dash', { opacity: 0, duration: 0.15 }, td + 1.5);
  tl.fromTo('#k-pring', { opacity: 1, scale: 0.92 }, { scale: 1.06, duration: 0.5, ease: 'power2.out', immediateRender: false }, A('s03/pring'));
  tl.to('#k-pring', { opacity: 0, duration: 0.3 }, A('s03/pring') + 1.0);
  on('k-slotL', A('s03/reads') - 0.05, 0.2); tl.fromTo('#k-reads', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.3, immediateRender: false }, A('s03/reads'));
  on('k-slotR', A('s03/checks') - 0.05, 0.2); tl.fromTo('#k-checks', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.3, immediateRender: false }, A('s03/checks'));

  // ---------- s04: a rule only asks ----------
  tl.to('#k-reads', { color: '#2B3BE0', duration: 0.2 }, A('s04/rule'));
  pulse('k-reads', A('s04/rule'), 1.15);
  tl.fromTo('#k-rule', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out', immediateRender: false }, A('s04/rule'));
  tl.to('#k-mark', { scaleX: 1, duration: 0.7, ease: 'power1.inOut' }, A('s04/mark'));
  pop('k-asks', A('s04/asks'), { y: 16 });
  tl.fromTo('#k-aconn', { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 0.45, ease: 'power2.out', immediateRender: false }, A('s04/asks') + 0.1);

  // ---------- s05: a hook runs your test whenever the agent says done ----------
  tl.to('#k-checks', { color: '#2B3BE0', duration: 0.2 }, A('s05/hook'));
  tl.fromTo('#k-hook', { opacity: 0, scale: 1.25 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)', immediateRender: false }, A('s05/hook'));
  tl.set('#k-cmd', { opacity: 1 }, A('s05/cmd') - 0.01);
  typeIn('k-cmd1', 'on "done"', A('s05/cmd'), 0.3); typeIn('k-cmd2', '› run tests', A('s05/cmd') + 0.3, 0.3);
  tl.fromTo('#k-conn', { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 0.35, ease: 'power2.out', immediateRender: false }, A('s05/conn'));
  tl.to('#k-stamp', { scale: 1.08, rotation: -3, duration: 0.18, ease: 'back.out(2)' }, A('s05/says'));
  const tf = A('s05/fire');   // the hook fires: a pulse routes stamp → hook → row, the row scans
  tl.set('#k-dot', { opacity: 1, x: 770, y: 590 }, tf);
  tl.to('#k-dot', { x: 790, y: 860, duration: 0.25, ease: 'power1.in' }, tf);
  tl.to('#k-dot', { x: 790, y: 1060, duration: 0.25, ease: 'none' }, tf + 0.25);
  tl.to('#k-dot', { opacity: 0, duration: 0.1 }, tf + 0.5);
  tl.fromTo('#k-rscan', { opacity: 1, x: 0 }, { x: 640, duration: 0.6, ease: 'none', immediateRender: false }, tf + 0.45);
  tl.to('#k-rscan', { opacity: 0, duration: 0.1 }, tf + 1.05);

  // ---------- s06: red → the error goes back → fix → green → Done means something ----------
  tl.set('#k-stx', { opacity: 1 }, A('s06/fail')); tl.set('#k-stnr', { opacity: 0 }, A('s06/fail'));
  tl.to('#k-row', { backgroundColor: '#FDE4E7', borderColor: '#E5364A', duration: 0.15 }, A('s06/fail'));
  tl.to('#k-stamp', { backgroundColor: 'rgba(255,255,255,0)', color: 'rgba(14,148,97,0.35)', borderColor: 'rgba(14,148,97,0.35)', duration: 0.3 }, A('s06/fail'));
  tl.set('#k-err', { opacity: 1 }, A('s06/err')); typeText('k-errt', 'expected 1 email · got 0', A('s06/err'), A('s06/err') + 0.6);
  tl.set('#k-path', { opacity: 1 }, A('s06/path')); tl.to('#k-path', { scaleY: 1, duration: 0.45, ease: 'power2.out' }, A('s06/path'));
  tl.set('#k-edot', { opacity: 1, x: 422, y: 1196 }, A('s06/path')); tl.to('#k-edot', { y: 915, duration: 0.5, ease: 'power1.inOut' }, A('s06/path'));
  tl.to('#k-edot', { opacity: 0, duration: 0.1 }, A('s06/path') + 0.55);
  tl.fromTo('#k-pring', { opacity: 1, scale: 0.92 }, { scale: 1.06, duration: 0.45, ease: 'power2.out', immediateRender: false }, A('s06/path') + 0.45);
  tl.to('#k-pring', { opacity: 0, duration: 0.3 }, A('s06/path') + 1.2);
  tl.to('#k-cl3', { opacity: 0, duration: 0.08 }, A('s06/fix'));
  tl.set('#k-cl3', { backgroundColor: 'rgba(255,210,63,0.85)' }, A('s06/fix') + 0.08);
  typeIn('k-cl3', '  sendResetEmail(user)', A('s06/fix') + 0.1, 0.5);
  tl.to(['#k-err', '#k-path'], { opacity: 0, duration: 0.3 }, A('s06/fix') + 0.2);
  tl.set('#k-stok', { opacity: 1 }, A('s06/pass')); tl.set('#k-stx', { opacity: 0 }, A('s06/pass'));
  tl.to('#k-row', { backgroundColor: '#E3F7EF', borderColor: '#0E9461', duration: 0.15 }, A('s06/pass'));
  tl.fromTo('#k-stampE', { opacity: 0, scale: 1.9 }, { opacity: 1, scale: 1, duration: 0.22, ease: 'back.out(2)', immediateRender: false }, A('s06/earned'));
  tl.set('#k-stamp', { opacity: 0 }, A('s06/earned') + 0.2);
  tl.set('#k-glow', { opacity: 1 }, A('s06/glow')); tl.to('#k-glow', { opacity: 0, duration: 0.5 }, A('s06/glow') + 0.9);

  // ---------- s07 "Pick a harness?": the card pins as a mini card; the ring is your agent tool ----------
  const t7 = S.s07;
  tl.to('#k-sec1', { opacity: 0, x: 40, duration: 0.25 }, t7 - 0.1);
  shrinkAway('k-chip', t7 - 0.1);
  slideIn('k-sec2', t7 + 0.1);
  const bench = ['k-card', 'k-ctag', 'k-stampE', 'k-slotL', 'k-slotR', 'k-rule', 'k-hook', 'k-conn', 'k-aconn', 'k-asks', 'k-row', 'k-itag'];
  tl.to(sel(bench), { opacity: 0, y: -30, duration: 0.3, ease: 'power2.in' }, A('s07/mini') - 0.05);
  tl.fromTo('#k-mini', { opacity: 0, y: 120, scale: 1.5 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out', immediateRender: false }, A('s07/mini'));
  tl.to(sel(['k-l1', 'k-l2', 'k-l3', 'k-l4', 'k-l5']), { opacity: 0, duration: 0.15 }, A('s07/leg2') - 0.05);
  tl.set('#k-leg2', { opacity: 1 }, A('s07/leg2')); typeText('k-leg2', 'YOUR AGENT TOOL', A('s07/leg2'), A('s07/leg2') + 0.4);
  tl.fromTo('#k-ready', { opacity: 0, scale: 1.8 }, { opacity: 1, scale: 1, duration: 0.22, ease: 'back.out(2)', immediateRender: false }, A('s07/ready'));
  tl.fromTo('#k-price', { opacity: 0, rotation: -40 }, { opacity: 1, rotation: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)', immediateRender: false }, A('s07/price'));
  pop('k-qm', A('s07/qm'), { y: 20 });

  // ---------- s08: the same models in three tools (unlabelled) ----------
  const tr = A('s08/rings');
  tl.to(sel(['k-ring', 'k-pill', 'k-leg2', 'k-ready', 'k-price', 'k-qm']), { opacity: 0, scale: 0.6, duration: 0.3, ease: 'power2.in' }, tr - 0.1);
  tl.set('#k-rings', { opacity: 1 }, tr);
  ['k-tr1', 'k-tr2', 'k-tr3'].forEach((id, i) => tl.fromTo('#' + id, { opacity: 0, scale: 0.5, x: (1 - i) * 300 }, { opacity: 1, scale: 1, x: 0, duration: 0.4, ease: 'back.out(1.6)', immediateRender: false }, tr + i * 0.06));
  tl.fromTo('#k-same', { opacity: 0, scale: 1.9 }, { opacity: 1, scale: 1, duration: 0.22, ease: 'back.out(2)', immediateRender: false }, A('s08/same'));
  ['k-tr1', 'k-tr2', 'k-tr3'].forEach((id, i) => tl.to('#' + id, { scale: 1.06, duration: 0.18, ease: 'back.out(2)' }, A('s08/three') + i * 0.12));
  ['k-tr1', 'k-tr2', 'k-tr3'].forEach((id, i) => tl.to('#' + id, { borderStyle: 'solid', scale: 1, duration: 0.1 }, A('s08/tools') + i * 0.1));
  tl.fromTo(['#k-trk1', '#k-trk2'], { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.35, stagger: 0.1, immediateRender: false }, A('s08/tools') + 0.3);   // the empty scoreboard waits

  // ---------- s09: success moved a few points (bars race, then hold still) ----------
  tl.to('#k-same', { opacity: 0, duration: 0.25 }, A('s09/bench') - 0.2);
  tl.to(sel(['k-tr1', 'k-tr2', 'k-tr3']), { y: -10, duration: 0.3 }, A('s09/bench') - 0.2);
  pop('k-bench', A('s09/bench'), { y: 16 });
  on('k-slab', A('s09/sbars') - 0.1, 0.2);
  tl.set('#k-sbars', { opacity: 1 }, A('s09/sbars'));
  ['k-sb1', 'k-sb2', 'k-sb3'].forEach((id, i) => tl.fromTo('#' + id, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power3.out', immediateRender: false }, A('s09/sbars') + i * 0.05));
  tl.set('#k-pts', { opacity: 1 }, A('s09/pts')); count('k-pts', 0, 5, A('s09/pts'), 0.5, v => '±2–' + Math.max(2, Math.round(v)) + ' pts');
  tl.fromTo('#k-base', { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 0.4, ease: 'power2.out', immediateRender: false }, A('s09/base'));

  // ---------- s10: token cost varied up to fivefold (only the cost bar moves) ----------
  typeIn('k-tclab', 'TOKEN COST PER TASK', A('s10/tclab'), 0.5);
  tl.fromTo('#k-cbar', { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 0.2, duration: 0.4, ease: 'power3.out', immediateRender: false }, A('s10/cbar'));
  on('k-ghost', A('s10/cbar') + 0.4, 0.2);
  tl.to('#k-cbar', { scaleX: 0.6, duration: 0.35, ease: 'power2.out' }, A('s10/vary'));
  tl.to('#k-cbar', { scaleX: 0.4, duration: 0.3, ease: 'power2.inOut' }, A('s10/vary') + 0.38);
  tl.to('#k-cbar', { scaleX: 1, duration: 0.5, ease: 'power3.out' }, A('s10/five'));
  count('k-five', 1, 5, A('s10/five'), 0.5, v => 'up to ' + Math.round(v) + '×');

  // ---------- s11 "Your checks": the study shrinks away; the workbench returns ----------
  const t11 = S.s11;
  tl.to('#k-sec2', { opacity: 0, x: 40, duration: 0.25 }, t11 - 0.1);
  slideIn('k-sec3', t11 + 0.1);
  tl.to('#k-tr2', { scale: 0.7, duration: 0.6, ease: 'power2.in' }, A('s11/study'));
  tl.to(sel(['k-trk1', 'k-trk2', 'k-tr1', 'k-tr3', 'k-sbars', 'k-slab', 'k-bench', 'k-pts', 'k-base', 'k-tclab', 'k-ghost', 'k-cbar', 'k-five']), { opacity: 0, scale: 0.7, duration: 0.4, ease: 'power2.in' }, A('s11/study'));
  tl.to('#k-tr2', { opacity: 0, duration: 0.2 }, A('s11/study') + 0.62);
  tl.to('#k-mini', { opacity: 0, y: 40, duration: 0.25 }, A('s11/card') - 0.1);
  const back = ['k-ring', 'k-pill', 'k-slotL', 'k-slotR', 'k-rule', 'k-hook', 'k-conn', 'k-row', 'k-stampE', 'k-ctag', 'k-itag'];
  tl.set(sel(back.concat(['k-leg2'])), { scale: 1, y: 0 }, A('s11/card') - 0.15);
  tl.set('#k-legH', { opacity: 0 }, 0);
  tl.fromTo('#k-card', { opacity: 0, y: -30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out', immediateRender: false }, A('s11/card'));
  tl.to(sel(back), { opacity: 1, duration: 0.35 }, A('s11/card') + 0.05);
  tl.to('#k-legH', { opacity: 1, duration: 0.3 }, A('s11/card') + 0.05);
  tl.fromTo('#k-proj', { opacity: 0, scale: 1.8 }, { opacity: 1, scale: 1, duration: 0.22, ease: 'back.out(2)', immediateRender: false }, A('s11/proj'));
  tl.to('#k-row', { borderColor: '#0E9461', borderWidth: 8, duration: 0.15 }, A('s11/chk'));
  pulse('k-stok', A('s11/chk'), 1.12);
  tl.to('#k-conn', { backgroundColor: '#0E9461', duration: 0.2 }, A('s11/chk'));

  // ---------- s12: every mistake becomes a rule, plus a check ----------
  tl.fromTo('#k-mis', { opacity: 0, y: -120 }, { opacity: 1, y: 0, duration: 0.35, ease: 'bounce.out', immediateRender: false }, A('s12/mis'));
  tl.to('#k-mis', { opacity: 0, scale: 0.4, x: -40, y: 220, duration: 0.35, ease: 'power2.in' }, A('s12/rule2') - 0.1);
  pulse('k-reads', A('s12/rule2'), 1.15);
  tl.fromTo('#k-rule2', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3, immediateRender: false }, A('s12/rule2'));
  tl.fromTo('#k-plus', { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)', immediateRender: false }, A('s12/plus'));
  pulse('k-checks', A('s12/chk2'), 1.15);
  tl.fromTo('#k-chk2', { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.3, immediateRender: false }, A('s12/chk2'));
  tl.to('#k-hook', { height: 222, duration: 0.25 }, A('s12/chk2') - 0.05);

  // ---------- s13: the catch: green only means your checks passed ----------
  tl.to('#k-stok', { scale: 1.12, duration: 0.18, ease: 'back.out(2)' }, A('s13/green'));
  on('k-green', A('s13/green'), 0.2);
  pop('k-neq', A('s13/neq'), { y: 14 });
  tl.fromTo('#k-verdict', { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.8)', immediateRender: false }, A('s13/verdict'));

  // ---------- s14: AI-written tests can pass bad code; review the test ----------
  tl.to('#k-verdict', { opacity: 0, scale: 0.15, x: 160, y: 300, duration: 0.4, ease: 'power2.in' }, A('s14/ait') - 0.2);
  tl.to('#k-green', { opacity: 0, duration: 0.2 }, A('s14/ait') - 0.2);
  tl.set('#k-ai', { opacity: 1 }, A('s14/ait')); typeText('k-ait', 'expect(page).toBeTruthy()', A('s14/ait'), A('s14/ait') + 0.6);
  tl.fromTo('#k-aip', { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(2)', immediateRender: false }, A('s14/aip'));
  tl.fromTo('#k-bug', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.25, ease: 'back.out(2)', immediateRender: false }, A('s14/bug'));
  tl.to('#k-revm', { scaleX: 1, duration: 0.6, ease: 'power1.inOut' }, A('s14/rev'));
  tl.to('#k-revm', { opacity: 0, duration: 0.2 }, A('s14/fixt') - 0.05);
  typeText('k-ait', 'expect(emails).toBe(1)', A('s14/fixt'), A('s14/fixt') + 0.5);
  tl.set('#k-aip', { opacity: 0 }, A('s14/fixt') + 0.4);
  tl.fromTo('#k-aif', { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(2)', immediateRender: false }, A('s14/fixt') + 0.4);
  tl.to('#k-bug', { scale: 1.2, backgroundColor: '#0B1020', duration: 0.2 }, A('s14/fixt') + 0.45);
  tl.to('#k-aitag', { opacity: 0, duration: 0.15 }, A('s14/fixt') + 0.3);   // the reviewed line is yours now; the FAIL chip takes the tag's place

  // ---------- s15 recap ----------
  const t15 = S.s15;
  tl.to('#k-sec3', { opacity: 0, duration: 0.25 }, t15 - 0.2);
  tl.to('#k-g-wb', { opacity: 0, scale: 0.85, duration: 0.35, ease: 'power2.in' }, t15 - 0.15);
  tl.fromTo('#k-rmini', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.35, immediateRender: false }, t15 + 0.05);
  tl.fromTo('#k-r1', { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(1.8)', immediateRender: false }, A('s15/r1'));
  tl.set('#k-dollar', { opacity: 1, rotation: -30 }, A('s15/r1') + 0.1);
  tl.fromTo('#k-dollar', { rotation: -30 }, { rotation: -6, duration: 0.6, ease: 'elastic.out(1, 0.5)', immediateRender: false }, A('s15/dollar'));
  tl.fromTo('#k-r2', { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(1.8)', immediateRender: false }, A('s15/r2'));
  pop('k-okc', A('s15/r2') + 0.15, { y: 14 });
  pulse('k-rdone', A('s15/cta'), 1.2);
  tl.fromTo('#k-cta', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out', immediateRender: false }, A('s15/cta'));
})();
