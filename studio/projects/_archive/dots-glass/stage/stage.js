// Dots v2 · hyperframes-glass stage (kit.js loaded first) · every cue is a spoken word (beats in scenes.json)
(function () {
  aurora();
  const pulse = (sel, t0, t1, s = 1.08, d = 0.9) => { const n = Math.max(1, Math.floor((t1 - t0) / (2 * d))); tl.fromTo(sel, { scale: 1 }, { scale: s, duration: d, yoyo: true, repeat: n * 2 - 1, ease: 'sine.inOut' }, t0); };

  // ---------- s01 hook: 3 a.m., a bug report lands; by morning a fix is waiting ----------
  group('g01', 0, S.s02);
  pop('clk3', 0, { y: 40, b: 10, d: 0.35 });   // on screen from frame 1
  pop('bugc', at('s01/bug') - 0.15, { y: 60 });
  pop('slk', at('s01/slack'), { y: 0, s: 0.6, b: 8, ease: 'back.out(2)' });
  const wake = W('s01', 'wake') ?? at('s01/fix') - 0.9;
  fade('clk3', wake - 0.1, 0.3);
  pop('clk7', wake, { y: -30, b: 20, d: 0.5 });
  pop('fixc', at('s01/fix') - 0.1, { y: 60 });
  pop('frev', at('s01/review'), { y: 0, s: 0.7, b: 8 });
  sweep('fixc', at('s01/review') + 0.15);

  // ---------- s02 that's a dot: always on, keeps working after you close the chat ----------
  group('g02', S.s02 - 0.15, S.s03 - 0.2);
  pop('orbw', S.s02 - 0.15, { y: 0, s: 0.6, b: 30, d: 0.5 });
  pulse('#orbw .r1', S.s02, S.s03 - 0.2, 1.12, 0.8); pulse('#orbw .r2', S.s02 + 0.4, S.s03 - 0.2, 1.08, 1.0);
  pop('dotlab', at('s02/dot'), { y: 40 });
  pop('t1', at('s02/always'), { y: 20, s: 0.8 });
  const gpt = W('s02', 'chatgpt') ?? at('s02/always') + 1.6;
  pop('t2', gpt, { y: 20, s: 0.8 });
  pop('chatw', gpt + 0.5, { y: 50 });
  tl.to('#chatw', { scale: 0.55, y: -40, opacity: 0.18, filter: 'blur(6px)', duration: 0.45, ease: 'power3.in' }, at('s02/close'));
  pop('still', at('s02/close') + 0.15, { y: 30, d: 0.45 });
  tl.to('#sbarf', { scaleX: 0.7, duration: S.s03 - at('s02/close'), ease: 'none' }, at('s02/close') + 0.2);

  // ---------- 01 how it works (s03-s05) ----------
  const t03 = chapter('c1', S.s03, S.s03 + 1.9);
  group('g03', t03 - 0.05, S.s06 - 0.2);
  pop('pc', t03 - 0.05, { y: 60, d: 0.5 });
  sweep('pc', at('s03/computer'));
  pop('brow', t03 + 0.35, { y: 30, d: 0.45 });   // the browser is there as soon as the computer is
  tl.fromTo('#skel i', { opacity: 0.3 }, { opacity: 1, duration: 0.5, yoyo: true, repeat: 5, stagger: 0.15 }, t03 + 0.55);
  tl.fromTo('#brow', { scale: 1 }, { scale: 1.03, duration: 0.25, yoyo: true, repeat: 1 }, at('s03/browser'));
  tl.to('#skel', { opacity: 0, duration: 0.3 }, at('s03/talk') - 0.3); tl.set('#skel', { display: 'none' }, at('s03/talk') - 0.01);
  tl.fromTo('#cursor', { opacity: 0, x: 0, y: 0 }, { opacity: 1, x: -200, y: 40, duration: 0.8, ease: 'power2.inOut' }, at('s03/browser') + 0.4);
  pop('talk', at('s03/talk') - 0.1, { y: 0, s: 0.8, b: 8 });
  tl.to('#tkx', { scaleX: 1, duration: 0.3, ease: 'power2.out' }, at('s03/talk') + 0.45);
  tl.to('#talk', { opacity: 0.45, duration: 0.3 }, at('s03/talk') + 0.75);
  tl.to('#cursor', { x: 120, y: 130, duration: 0.6, ease: 'power2.inOut' }, at('s03/talk') + 0.2);
  pop('does', at('s03/work') - 0.2, { y: 0, s: 0.7, b: 10, ease: 'back.out(2)' });
  ['cd1', 'cd2', 'cd3'].forEach((id, k) => tl.fromTo('#' + id, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.35, ease: 'power3.out' }, at('s03/work') + 0.1 + k * 0.35));
  tl.to('#cursor', { x: -80, y: 250, duration: 0.7, ease: 'power2.inOut' }, at('s03/work') + 0.2);
  // s04: the computer slides up; goal → apps → results
  tl.to('#pc', { scale: 0.82, y: -40, duration: 0.5, ease: 'power3.inOut' }, S.s04 - 0.2);
  pop('f1', at('s04/goal') - 0.25, { y: 40, d: 0.45 });
  tl.fromTo('#fa1', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3 }, at('s04/apps') - 0.3);
  pop('f2', at('s04/apps') - 0.15, { y: 40, d: 0.45 });
  tl.fromTo('#f2 .apps i', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.12 }, at('s04/apps'));
  tl.fromTo('#fa2', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3 }, at('s04/results') - 0.3);
  pop('f3', at('s04/results') - 0.15, { y: 40, d: 0.45 });
  pop('f3r', W('s04', 'review') ?? at('s04/results') + 1, { y: 20, s: 0.8 });
  // s05: doesn't always wait to be asked; scheduled checks every morning
  ['flow', 'f3r'].forEach(id => zoomOut(id, S.s05 - 0.3, 0.3));
  pop('cal', S.s05 - 0.05, { y: 60, d: 0.45 });
  pop('noask', at('s05/wait') - 0.1, { y: 20, s: 0.85 });
  tl.fromTo('#sched', { scale: 1 }, { scale: 1.12, duration: 0.2, yoyo: true, repeat: 1 }, at('s05/scheduled'));
  sweep('cal', at('s05/scheduled') + 0.1);
  // the slower read leaves a pause before "calendar": a clock-hand tick on the schedule chip keeps the frame alive
  tl.fromTo('#sched', { rotation: 0 }, { rotation: 3, duration: 0.5, yoyo: true, repeat: 3, ease: 'sine.inOut' }, at('s05/wait') + 0.6);
  tl.fromTo('#noask', { y: 0 }, { y: -8, duration: 0.6, yoyo: true, repeat: 3, ease: 'sine.inOut' }, at('s05/wait') + 0.8);
  [1, 2, 3, 4, 5].forEach(k => {
    tl.to(`#d${k}`, { backgroundColor: 'rgba(92,255,181,0.22)', borderColor: 'rgba(92,255,181,0.7)', duration: 0.2 }, at('s05/calendar') + (k - 1) * 0.16);
    tl.to(`#d${k} i`, { backgroundColor: '#5CFFB5', borderColor: '#5CFFB5', duration: 0.2 }, at('s05/calendar') + (k - 1) * 0.16);
  });
  tl.fromTo('#cal .calnote', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, (W('s05', 'morning') ?? at('s05/calendar') + 0.6) + 0.1);

  // ---------- 02 you set the freedom (s06-s07) ----------
  const t06 = chapter('c2', S.s06, S.s06 + 1.75);
  group('g06', t06 - 0.05, S.s08 - 0.2);
  pop('fk', t06 - 0.05, { y: 10, d: 0.4 });
  pop('lv', t06, { y: 50, d: 0.5 });
  tl.to('#g06 .lvr', { opacity: 0.32, duration: 0.4, stagger: 0.08 }, t06 + 0.2);
  const KY = [-3, 172, 347, 522];   // knob centre on each row (rail coordinates)
  tl.set('#knob', { y: KY[0] }, 0);
  tl.to('#knob', { opacity: 1, duration: 0.3 }, at('s06/freedom'));
  tl.fromTo('#knob', { scale: 1 }, { scale: 1.25, duration: 0.25, yoyo: true, repeat: 1 }, at('s06/freedom'));
  ['l1', 'l2', 'l3', 'l4'].forEach((b, k) => {
    const t = at('s06/' + b) - 0.35;
    if (k) tl.to('#knob', { y: KY[k], duration: 0.45, ease: 'power3.inOut' }, t);
    tl.to('#lv' + (k + 1), { opacity: 1, duration: 0.3 }, t + 0.1);
    tl.fromTo(`#lv${k + 1} b`, { x: -20 }, { x: 0, duration: 0.4, ease: 'power3.out' }, t + 0.1);
    if (k) tl.to('#lv' + k, { opacity: 0.45, duration: 0.3 }, t + 0.1);
  });
  // s07: some things always stay with you
  tl.to('#lv', { opacity: 0.55, duration: 0.3 }, S.s07 - 0.1);
  pop('pw', at('s07/password') - 0.4, { y: 50, d: 0.45 });
  tl.fromTo('#pwd', { opacity: 0.3 }, { opacity: 1, duration: 0.25, yoyo: true, repeat: 3 }, at('s07/password'));
  slam('always', at('s07/you'), -3);
  sweep('pw', at('s07/you') + 0.2);

  // ---------- 03 the catch (s08-s10) ----------
  const t08 = chapter('c3', S.s08, at('s08/catch') + 0.6);
  group('g08', t08 - 0.05, S.s11 - 0.2);
  ['ap1', 'ap2', 'ap3'].forEach((id, k) => pop(id, t08 - 0.05 + k * 0.1, { y: 30, d: 0.4 }));
  tl.fromTo('#morb', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.8)' }, t08);
  tl.to(['#ln1', '#ln2', '#ln3'], { strokeDashoffset: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, t08 + 0.1);
  ['m1', 'm2', 'm3'].forEach((id, k) => pop(id, t08 + 0.35 + k * 0.15, { y: 20, s: 0.85, d: 0.4 }));
  pulse('#morb', t08 + 0.6, S.s09 + 1.0, 1.08, 0.7);
  tl.to('#ln1', { stroke: '#FF5C8A', strokeDasharray: '14 16', opacity: 0.6, duration: 0.3 }, at('s08/disconnect'));
  tl.to('#ap1', { opacity: 0.35, x: -30, duration: 0.4 }, at('s08/disconnect'));
  pop('disc', at('s08/disconnect') + 0.1, { y: 0, s: 0.7, b: 8 });
  const learned = W('s08', 'learned') ?? at('s08/stays') - 0.8;
  tl.to('#g08 .mc', { backgroundColor: 'rgba(255,200,107,0.92)', color: '#2A1400', duration: 0.3, stagger: 0.1 }, learned);
  pop('stays', at('s08/stays') - 0.1, { y: 20, s: 0.85 });
  // s09: the only way to wipe it is a reset, which deletes the whole dot
  tl.fromTo('#g08 .mc', { x: 0 }, { x: 10, duration: 0.06, yoyo: true, repeat: 7 }, at('s09/wipe'));
  pop('rst', at('s09/reset') - 0.2, { y: 30, d: 0.4 });
  tl.fromTo('#rst', { scale: 1 }, { scale: 0.9, duration: 0.12, yoyo: true, repeat: 1 }, at('s09/reset') + 0.3);
  zoomOut('mem', at('s09/deletes') - 0.05, 0.45);
  ['stays', 'rst'].forEach(id => fade(id, at('s09/deletes'), 0.3));
  pop('gone', at('s09/deletes') + 0.15, { y: 0, s: 1.2, b: 24, d: 0.5 });
  // s10: it can still make mistakes, even following your rules: check its work
  fade('gone', S.s10 - 0.25, 0.25);
  pop('rev', S.s10 - 0.1, { y: 60, d: 0.45 });
  slam('mis', at('s10/mistakes') - 0.05, -2);
  pop('rul', at('s10/rules') - 0.3, { y: 0, s: 0.8, b: 8 });
  pop('chk', at('s10/check') - 0.1, { y: 40, d: 0.5 });
  sweep('rev', at('s10/check') + 0.1);

  // ---------- s11 verdict ----------
  group('g11', S.s11 - 0.15, S.s12);
  pop('vk', S.s11 - 0.15, { y: 10, d: 0.35 });
  words('v1', S.s11 - 0.1, 0.12);
  pop('vlv', (W('s11', 'review') ?? at('s11/start') - 1) - 0.1, { y: 50, d: 0.45 });
  pop('vstart', at('s11/start') + 0.1, { y: 20, s: 0.85 });
  tl.to('#vknob', { y: -165, duration: 0.7, ease: 'power3.inOut' }, at('s11/trust') - 0.5);
  pop('vtrust', at('s11/trust') - 0.3, { y: 20, s: 0.85 });
  pulse('#vknob', at('s11/start'), at('s11/trust') - 0.5, 1.15, 0.5);

  // ---------- s12 CTA ----------
  group('g12', S.s12, END('s12'));
  ctaWords('s12', [['cw1', 'what'], ['cw2', 'should'], ['cw3', 'i'], ['cw4', 'explain'], ['cw5', 'next']]);
  pop('ctaf', at('s12/tell'), { y: 30 });
})();
