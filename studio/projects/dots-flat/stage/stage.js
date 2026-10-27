// Dots v2 stage · house style reference-flat (kit.js loaded first) · every cue is a beat in scenes.json
(function () {
  // the dot avatar breathes the whole time it is on screen (also keeps conversational pauses from going static)
  const pulse = (sel, t0, t1, amt = 0.12, per = 0.7) => { const n = Math.max(1, Math.floor((t1 - t0) / per)); tl.fromTo(sel, { scale: 1 }, { scale: 1 + amt, duration: per, yoyo: true, repeat: n - 1, ease: 'sine.inOut' }, t0); };
  const chapDrift = (id, t0, t1) => tl.fromTo(`#${id} .chapt`, { x: 0 }, { x: 24, duration: Math.max(0.5, t1 - t0), ease: 'sine.inOut' }, t0 + 0.3);   // section title glides while the voice talks


  // ---------- s01 hook · 3 a.m., a bug report, a fix waiting ----------
  group('g01', 0, S.s02);
  slam('clock', 0, -2);
  pop('msg', at('s01/bug'), { y: 50 });
  tl.fromTo('.mch', { scale: 1 }, { scale: 1.25, duration: 0.2, yoyo: true, repeat: 1 }, at('s01/slack'));
  tl.to('#clk3', { opacity: 0, y: -60, duration: 0.3 }, at('s01/wake'));
  tl.fromTo('#clk7', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }, at('s01/wake') + 0.1);
  pop('reply', at('s01/fix'), { x: -60, y: 0, ease: 'power3.out' });
  pulse('#dav1', at('s01/fix'), S.s02);
  pop('revbtn', at('s01/review'), { y: 20, s: 0.7, ease: 'back.out(2.2)' });

  // ---------- s02 what a dot is ----------
  group('g02', S.s02 - 0.15, S.s03 - 0.2);
  pop('adot', S.s02 - 0.15, { y: 80, s: 1, d: 0.4, ease: 'power4.out' });
  pop('dc1', at('s02/always'), { y: 20 }); pop('dc2', at('s02/chatgpt'), { y: 20 });
  pop('chatwin', at('s02/chatgpt') + 0.35, { y: 40 });
  pop('still', at('s02/keeps'), { x: -40, y: 0, ease: 'power3.out' });
  pulse('#dav2', at('s02/keeps'), S.s03 - 0.2);
  tl.fromTo('#sbar', { scaleX: 0.05 }, { scaleX: 0.85, duration: S.s03 - at('s02/keeps'), ease: 'none' }, at('s02/keeps'));
  tl.fromTo('#cwx', { scale: 1 }, { scale: 1.6, duration: 0.15, yoyo: true, repeat: 1 }, at('s02/close') - 0.2);
  tl.to('#chatwin', { scale: 0.2, opacity: 0, duration: 0.35, ease: 'power3.in' }, at('s02/close') + 0.05);

  // ---------- 01 how it works · s03 its own cloud computer ----------
  const t03 = chapter('c1', S.s03, at('s03/computer') - 0.45);
  chapDrift('c1', S.s03, at('s03/computer') - 0.45);
  group('g03', t03 - 0.05, S.s04 - 0.05);
  pop('comp', t03 - 0.05, { y: 50, d: 0.4 });
  tl.fromTo('#brow', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }, at('s03/browser'));
  pop('bl1', at('s03/browser') + 0.4, { x: -30, y: 0, s: 1, d: 0.3 });
  pop('bl2', at('s03/browser') + 0.9, { x: -30, y: 0, s: 1, d: 0.3 });
  pop('talk', at('s03/talk') - 0.55, { y: 30 });
  tl.to('#talkx', { scaleX: 1, duration: 0.25, ease: 'power2.out' }, at('s03/talk'));
  tl.to('#talk', { opacity: 0.45, duration: 0.3 }, at('s03/talk') + 0.3);
  pop('does', at('s03/work') - 0.6, { y: 30 });
  pop('bl3', at('s03/work'), { x: -30, y: 0, s: 1, d: 0.3 });

  // ---------- s04 goal → apps → results ----------
  group('g04', S.s04 - 0.05, S.s05 - 0.05);
  pop('f1', S.s04 - 0.05, { x: -60, y: 0, s: 1, d: 0.35, ease: 'power3.out' });
  pop('a1', at('s04/apps') - 0.15, { y: -20, s: 1, d: 0.25 }); pop('f2', at('s04/apps'), { x: -60, y: 0, s: 1, d: 0.35, ease: 'power3.out' });
  pop('a2', at('s04/results') - 0.15, { y: -20, s: 1, d: 0.25 }); pop('f3', at('s04/results'), { x: -60, y: 0, s: 1, d: 0.35, ease: 'power3.out' });
  tl.fromTo('#rv', { scale: 1 }, { scale: 1.2, duration: 0.25, yoyo: true, repeat: 1 }, at('s04/review'));

  // ---------- s05 scheduled checks ----------
  group('g05', S.s05 - 0.05, S.s06 - 0.2);
  pop('nowait', S.s05 - 0.05, { y: 20, d: 0.3 });
  pop('cal', S.s05 + 0.35, { y: 40 });
  ['d1', 'd2', 'd3', 'd4', 'd5'].forEach((d, k) => pop(d, at('s05/scheduled') + k * 0.18, { y: 30, s: 0.8, d: 0.35 }));
  pop('calb', at('s05/calendar'), { x: -60, y: 0, ease: 'power3.out' });
  pulse('#calb .dotav', at('s05/calendar'), S.s06 - 0.2);

  // ---------- 02 you set the freedom · s06 four levels, s07 password ----------
  const t06 = chapter('c2', S.s06, at('s06/freedom') - 0.1);
  chapDrift('c2', S.s06, at('s06/freedom') - 0.1);
  group('g06', t06 - 0.05, S.s08 - 0.2);
  pop('ladk', t06 - 0.05, { y: 10, d: 0.3 });
  ['r1', 'r2', 'r3', 'r4'].forEach((r, k) => pop(r, t06 + k * 0.12, { x: -50, y: 0, s: 1, d: 0.35, ease: 'power3.out' }));
  const lv = ['l1', 'l2', 'l3', 'l4'];
  lv.forEach((l, k) => {
    const t = at('s06/' + l);
    if (k === 0) tl.fromTo('#knob', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, t);
    else tl.to('#knob', { y: k * 170, duration: 0.35, ease: 'power3.inOut' }, t);
    tl.to('#r' + (k + 1), { backgroundColor: '#2B3BE0', color: '#FFFFFF', duration: 0.2 }, t);
    tl.to('#r' + (k + 1) + ' .rn', { color: '#FFD23F', duration: 0.2 }, t);
    const tn = k < 3 ? at('s06/' + lv[k + 1]) : S.s07 - 0.05;
    tl.to('#r' + (k + 1), { backgroundColor: '#FFFFFF', color: '#0B1020', duration: 0.2 }, tn);
    tl.to('#r' + (k + 1) + ' .rn', { color: '#2B3BE0', duration: 0.2 }, tn);
  });
  tl.to('.ladder', { opacity: 0.4, duration: 0.3 }, S.s07 - 0.05);
  pop('pw', S.s07 - 0.05, { y: 40, d: 0.35 });
  slam('always', at('s07/you'), -5);

  // ---------- 03 the catch · s08 memory stays, s09 only a reset wipes it ----------
  const t08 = chapter('c3', S.s08, at('s08/catch') + 0.45);
  group('g08', t08 - 0.05, S.s10 - 0.05);
  pop('app', t08 - 0.05, { x: -40, y: 0, s: 1, d: 0.3 });
  tl.to('#lnk', { opacity: 1, duration: 0.2 }, t08);
  tl.fromTo('#lnk', { strokeDashoffset: 0 }, { strokeDashoffset: -320, duration: at('s08/disconnect') - t08, ease: 'none' }, t08);   // data flowing in
  pop('dav8', t08, { s: 0.5, y: 0, ease: 'back.out(2)' });
  pulse('#dav8', t08 + 0.4, S.s10 - 0.1, 0.06, 0.8);
  ['m1', 'm2', 'm3'].forEach((m, k) => pop(m, t08 + 0.25 + k * 0.2, { x: 40, y: 0, s: 1, d: 0.35, ease: 'power3.out' }));
  slam('cut', at('s08/disconnect'), 0);
  tl.to('#lnk', { opacity: 0, duration: 0.25 }, at('s08/disconnect') + 0.15);
  tl.to('#app', { x: -40, opacity: 0.35, duration: 0.4 }, at('s08/disconnect') + 0.15);
  tl.to('.mc', { borderColor: '#FFD23F', duration: 0.3, stagger: 0.12 }, at('s08/learned'));
  pop('stays', at('s08/stays'), { y: 10 });
  tl.fromTo('.mc', { scale: 1 }, { scale: 1.06, duration: 0.25, yoyo: true, repeat: 1, stagger: 0.1 }, at('s08/stays'));
  // s09
  tl.to(['#app', '#cut', '#stays'], { opacity: 0, duration: 0.3 }, S.s09 - 0.1);
  tl.fromTo('.mc', { x: 0 }, { x: 14, duration: 0.06, yoyo: true, repeat: 7 }, at('s09/wipe'));   // a single memory won't come off
  slam('resetb', at('s09/reset'), -3);
  tl.to(['.mc', '#dav8'], { scale: 0, opacity: 0, duration: 0.45, ease: 'power3.in', stagger: 0.06 }, at('s09/deletes'));
  pop('delk', at('s09/deletes') + 0.6, { y: 30 });

  // ---------- s10 mistakes ----------
  group('g10', S.s10 - 0.1, S.s11 - 0.2);
  pop('fixc', S.s10 - 0.1, { x: -50, y: 0, d: 0.35, ease: 'power3.out' });
  pulse('#fixc .dotav', S.s10, S.s11 - 0.2);
  slam('mist', at('s10/mistakes'), -5);
  pop('rul', at('s10/rules'), { y: 20 });
  pop('chk', at('s10/check'), { y: 40, s: 0.8, ease: 'back.out(2)' });

  // ---------- s11 my take ----------
  group('g11', S.s11 - 0.15, S.s12 - 0.2);
  pop('v1', S.s11 - 0.15, { y: 60, s: 1, d: 0.4, ease: 'power4.out' });
  tl.fromTo('#v1 .yl', { opacity: 0 }, { opacity: 1, duration: 0.3 }, (W('s11', 'review') ?? at('s11/ongoing') + 1) - 0.1);
  tl.set('#v1 .yl', { opacity: 0 }, 0);
  tl.to('.dtrack', { opacity: 1, duration: 0.3 }, at('s11/ongoing'));
  tl.fromTo('.dlabs', { opacity: 0 }, { opacity: 1, duration: 0.3 }, at('s11/ongoing'));
  tl.fromTo('#dknob', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, at('s11/start'));
  tl.to('#dknob', { x: 0.7 * 900, duration: at('s11/trust') - at('s11/start') - 0.4, ease: 'power2.inOut' }, at('s11/start') + 0.6);
  tl.to('#dfill', { scaleX: 0.7, duration: at('s11/trust') - at('s11/start') - 0.4, ease: 'power2.inOut' }, at('s11/start') + 0.6);
  pop('earn', at('s11/start') + 1.0, { y: 20 });

  // ---------- s12 CTA ----------
  group('g12', S.s12, END('s12'));
  ctaWords('s12', [['cw1', 'what'], ['cw2', 'should'], ['cw3', 'i'], ['cw4', 'explain'], ['cw5', 'next']]);
  pop('ctaf', at('s12/tell'), { y: 30 });
})();
