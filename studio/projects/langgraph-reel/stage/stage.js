// LangGraph reel stage · house style reference-flat (kit.js loaded first) · every cue is a beat in scenes.json
(function () {
  const pulse = (id, t, s = 1.06) => tl.fromTo('#' + id, { scale: 1 }, { scale: s, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, t);
  const P = { read: [166, 322], cls: [504, 322], drf: [842, 322], chk: [842, 642], app: [504, 642], ref: [166, 642] };
  const N = { read: 'nRead', cls: 'nCls', drf: 'nDrf', chk: 'nChk', app: 'nApp', ref: 'nRef' };
  let cur = 'read';
  const hit = (k, t) => { tl.to('#' + N[cur], { backgroundColor: '#FFFFFF', duration: 0.2 }, t); tl.to('#' + N[k], { backgroundColor: '#FFD23F', duration: 0.2 }, t + 0.15); pulse(N[k], t + 0.15, 1.05); cur = k; };
  const mv = (k, t, d = 0.45) => { tl.to('#chip', { x: P[k][0], y: P[k][1], duration: d, ease: 'power2.inOut' }, t); hit(k, t + d - 0.15); };

  // ---------- s01 hook (dark), built on the voice (openings rule, 2026-10-30) ----------
  // 0 s: "YOUR" + the empty AGENT ACTION card (2 things, 3 words). The line grows word by word with the voice (s01 has
  // "captions": false), the refund fills the card on "refunded"; on "Nobody" the line becomes NOBODY APPROVED IT.,
  // the "approved by" slot shows up empty and turns red; the "illustrative" tag after the hook.
  group('g01', 0, S.s02);
  tl.set(['#l-w2', '#l-w3', '#l-w4', '#l-w5', '#l-w6', '#rt0', '#rby0', '#il0'], { opacity: 0 }, 0);
  tl.set('#rc0', { opacity: 1 }, 0);
  tl.fromTo('#rc0', { y: 30 }, { y: 0, duration: 0.6, ease: 'power3.out' }, 0);
  const word = (id, t) => tl.fromTo('#' + id, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out', immediateRender: false }, t);
  word('l-w2', at('s01/w2')); word('l-w3', at('s01/w3')); word('l-w4', at('s01/w4')); word('l-w5', at('s01/refund')); word('l-w6', at('s01/w6'));
  tl.fromTo('#rt0', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.25, ease: 'power3.out', immediateRender: false }, at('s01/refund') + 0.1);
  pulse('rc0', at('s01/refund') + 0.35, 1.03);
  tl.to('#l-say', { opacity: 0, duration: 0.12 }, at('s01/nobody') - 0.05);
  slam('hh', at('s01/nobody'), -2);
  tl.fromTo('#rby0', { opacity: 0 }, { opacity: 1, duration: 0.2, immediateRender: false }, at('s01/nobody') + 0.05);
  tl.to('#slot', { backgroundColor: 'rgba(255,77,94,0.55)', borderColor: '#FF4D5E', duration: 0.2 }, at('s01/approved'));
  tl.fromTo('#hh', { x: 0 }, { x: 12, duration: 0.05, yoyo: true, repeat: 5 }, at('s01/approved'));
  tl.to('#il0', { opacity: 1, duration: 0.3 }, at('s01/nobody') + 0.4);

  // ---------- s02-s04 the email meets a plain loop (blue) ----------
  group('g02', S.s02, S.s05);
  pop('em', S.s02 - 0.1, { y: 60, ease: 'power3.out' });
  typeText('emt', '"I was charged twice."', Math.max(S.s02 + 0.2, at('s02/charged') - 0.5), at('s02/twice') + 0.35);
  tl.to('#em', { scale: 0.86, y: -26, transformOrigin: '50% 0%', duration: 0.4, ease: 'power2.inOut' }, S.s03 - 0.1);
  pop('ring', S.s03 - 0.05, { y: 0, s: 0.7, ease: 'back.out(1.6)' });
  tl.fromTo(['#rn1', '#rn2', '#rn3'], { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.12, ease: 'back.out(2)' }, at('s03/loop'));
  tl.set('#rdot', { rotation: 0, transformOrigin: '50% 50%' }, 0);
  tl.to('#rdot', { rotation: 120, duration: 0.45, ease: 'power2.inOut' }, at('s03/picks'));
  pulse('rn2', at('s03/picks') + 0.4, 1.12);
  tl.to('#rdot', { rotation: 240, duration: 0.45, ease: 'power2.inOut' }, at('s03/reads'));
  pulse('rn3', at('s03/reads') + 0.4, 1.12);
  tl.to('#rdot', { rotation: 720, duration: Math.max(0.6, at('s03/done') - at('s03/again')), ease: 'power1.inOut' }, at('s03/again'));
  pop('rdone', at('s03/done'), { y: 20 });
  tl.to('#rdot', { rotation: 720 + 360 * Math.max(1, Math.round((S.s05 - at('s03/done')) / 2.5)), duration: Math.max(0.5, S.s05 - at('s03/done') - 0.4), ease: 'none' }, at('s03/done') + 0.4);   // the loop keeps spinning
  tl.to('#ring', { scale: 0.82, y: -40, duration: 0.4, ease: 'power2.inOut' }, S.s04 - 0.1);
  pop('mem', S.s04 - 0.05, { y: 40, ease: 'power3.out' });
  tl.to('#memf', { width: '100%', duration: 1.1, ease: 'power1.inOut' }, at('s04/memory'));
  pop('qp', at('s04/pausing'), { x: -60, y: 0 });
  pop('qr', at('s04/restart'), { x: -60, y: 0 });
  slam('yours', at('s04/yourself') - 0.1, 2);

  // ---------- s05-s06 LangGraph enters (dark) ----------
  group('g05', S.s05, S.s07 - 0.2);
  pop('lgt', S.s05 - 0.1, { y: 60, ease: 'power4.out' });
  pulse('lgt', at('s05/lg'), 1.04);
  pop('lgs', at('s05/lg') + 0.45, { y: 20 });
  { const t = at('s05/lg') + 0.8;
    pop('an1', t, { y: 30 }); pop('an2', t + 0.15, { y: 30 }); pop('an3', t + 0.3, { y: 30 });
    tl.to(['#a1', '#a2', '#a3'], { opacity: 1, strokeDashoffset: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out' }, t + 0.3); }
  tl.to('#ag', { filter: 'grayscale(1)', opacity: 0.35, duration: 0.35 }, at('s05/stop'));
  pop('apause', at('s05/stop') + 0.05, { y: 20 });
  fade('apause', at('s05/again') - 0.1, 0.2);
  tl.to('#ag', { filter: 'grayscale(0)', opacity: 1, duration: 0.35 }, at('s05/again'));
  pulse('an1', at('s05/again') + 0.1, 1.08); pulse('an2', at('s05/again') + 0.3, 1.08); pulse('an3', at('s05/again') + 0.5, 1.08);
  [['k1', 'ki1', 'nodes'], ['k2', 'ki2', 'edges'], ['k3', 'ki3', 'checkpoints']].forEach(([k, ki, w]) => {
    slam(k, at('s06/' + w), 0); pop(ki, at('s06/' + w) + 0.05, { x: -40, y: 0 });
  });
  pulse('an1', at('s06/nodes') + 0.1, 1.06);
  tl.fromTo(['#a1', '#a2', '#a3'], { strokeWidth: 8 }, { strokeWidth: 14, duration: 0.2, yoyo: true, repeat: 1 }, at('s06/edges') + 0.1);
  pop('emc', at('s06/email') - 0.1, { x: -300, y: 0, ease: 'power3.out', d: 0.5 });

  // ---------- the switchboard: visible s07-s19, hidden only under the chapter cards ----------
  const t07 = chapter('c1', S.s07, at('s07/one') + 0.7);
  const t11 = chapter('c2', S.s11, at('s11/two') + 0.7);
  const t15 = chapter('c3', S.s15, at('s15/three') + 0.7);
  [[t07 + 0.05, S.s11 - 0.2], [t11 + 0.05, S.s15 - 0.2], [t15 + 0.05, S.s20]].forEach(([a, b]) => group('gsw', a, b));
  progress([['s07', 'light'], ['s11', 'yellow'], ['s15', 'blue']], [['p1', 's07'], ['p2', 's11'], ['p3', 's15']], S.s07, S.s20 - 0.2);
  tl.set('#swg', { color: '#0B1020' }, 0); tl.set('#swg', { color: '#FFFFFF' }, S.s15 - 0.05);
  $('tiles').innerHTML = Array.from({ length: 7 }, (_, i) => `<i class="l-tile${i === 6 ? ' lock' : ''}" id="tl${i}"></i>`).join('');
  $('fv1').textContent = ''; $('fv2').textContent = '';
  $('fv3').innerHTML = '<span id="fv3a"></span><span id="fv3b"></span>';
  $('fv4').innerHTML = '<span id="fv4a"></span><span id="fv4b"></span>';
  tl.set('#chip', { x: P.read[0], y: P.read[1] }, 0);

  // ---------- STEP 1 nodes (s07-s10, light) ----------
  tl.set(['#nAns', '#nRef', '#nApp', '#nChk'], { opacity: 0.2 }, t07);
  pop('nRead', Math.max(t07, at('s07/read') - 0.1), { y: 30 });
  pop('nCls', Math.max(t07 + 0.15, at('s07/classify') - 0.1), { y: 30 });
  pop('nDrf', Math.max(t07 + 0.3, at('s07/draft') - 0.1), { y: 30 });
  pop('st', at('s08/state') - 0.1, { y: 80, ease: 'power3.out' });
  tl.fromTo('#chip', { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, at('s08/card'));
  hit('read', at('s08/card'));
  tl.fromTo('#st', { y: 0 }, { y: -10, duration: 0.2, yoyo: true, repeat: 1 }, at('s08/email'));
  pulse('chip', at('s08/email'), 1.2);
  typeText('fv1', '"I was charged twice."', at('s09/email') - 0.1, at('s09/email') + 0.7);
  mv('cls', at('s09/refund') - 0.45);
  typeText('fv2', 'refund', at('s09/refund'), at('s09/refund') + 0.4);
  mv('drf', at('s09/reply') - 0.45);
  typeText('fv3a', '"Refund on its way."', at('s09/reply'), at('s09/reply') + 0.7);
  tl.set('#scan', { opacity: 1, y: 0 }, at('s10/reads'));
  tl.to('#scan', { y: 340, duration: 0.7, ease: 'none' }, at('s10/reads'));
  tl.set('#scan', { opacity: 0 }, at('s10/reads') + 0.7);
  tl.to(['#f1', '#f2', '#f4'], { opacity: 0.3, duration: 0.25 }, at('s10/only'));
  tl.to('#f3', { backgroundColor: 'rgba(43,59,224,0.16)', duration: 0.25 }, at('s10/only'));
  pulse('f3', at('s10/part'), 1.03);
  tl.to(['#f1', '#f2', '#f4'], { opacity: 1, duration: 0.25 }, S.s11 - 0.3);
  tl.to('#f3', { backgroundColor: 'rgba(43,59,224,0)', duration: 0.25 }, S.s11 - 0.3);

  // ---------- STEP 2 edges (s11-s14, yellow) ----------
  tl.to(['#nAns', '#nRef', '#nApp', '#nChk'], { opacity: 1, duration: 0.3 }, t11);
  tl.to(['#e1', '#e2', '#eA', '#e3', '#e4', '#e5'], { opacity: 1, strokeDashoffset: 0, duration: 0.35, stagger: 0.12, ease: 'power2.out' }, Math.max(t11, at('s11/edges') - 0.1));
  pulse('nCls', at('s11/next'), 1.06);
  tl.to('#chip', { x: P.cls[0], y: P.cls[1], duration: 0.45, ease: 'power2.inOut' }, at('s12/cond') - 0.2);   // rewind to the decision
  hit('cls', at('s12/cond') + 0.1);
  pop('sw', at('s12/cond'), { y: 20 });
  tl.to('#f2', { backgroundColor: 'rgba(43,59,224,0.16)', duration: 0.2, yoyo: true, repeat: 1 }, at('s12/reads'));
  pulse('f2', at('s12/reads'), 1.03);
  tl.to(['#nAns', '#eA'], { opacity: 0.2, duration: 0.3 }, at('s12/refund'));
  tl.to('#e2', { stroke: '#2B3BE0', strokeWidth: 14, duration: 0.25 }, at('s12/refund'));
  tl.to('#sw', { backgroundColor: '#2B3BE0', duration: 0.2 }, at('s12/refund'));
  mv('drf', at('s12/path') - 0.3);
  fade('sw', S.s13 - 0.1, 0.25);
  tl.to('#eL', { opacity: 1, strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, at('s13/loop') - 0.1);
  mv('chk', at('s13/check') - 0.35);
  slam('xamt', at('s13/amount'), -3);
  tl.to('#f3', { backgroundColor: 'rgba(229,54,74,0.22)', duration: 0.2 }, at('s13/amount'));
  fade('xamt', at('s14/back') - 0.1, 0.2);
  tl.to('#eL', { stroke: '#2B3BE0', strokeWidth: 14, duration: 0.2 }, at('s14/back') - 0.1);
  tl.to('#chip', { keyframes: [{ x: 948, y: 540, duration: 0.3 }, { x: P.drf[0], y: P.drf[1], duration: 0.3 }], ease: 'power1.inOut' }, at('s14/back'));
  hit('drf', at('s14/back') + 0.45);
  tl.set('#fv3a', { display: 'none' }, at('s14/fixed') - 0.05);
  typeText('fv3b', '"$49 refund on its way."', at('s14/fixed') - 0.05, at('s14/fixed') + 0.6);
  tl.to('#f3', { backgroundColor: 'rgba(20,184,122,0.22)', duration: 0.2 }, at('s14/fixed') + 0.3);
  mv('chk', at('s14/passes') - 0.4, 0.35);
  pop('okamt', at('s14/passes'), { y: 20 });
  tl.to(['#e2', '#eL'], { stroke: 'currentColor', strokeWidth: 9, duration: 0.2 }, S.s15 - 0.3);
  tl.to('#f3', { backgroundColor: 'rgba(20,184,122,0)', duration: 0.2 }, S.s15 - 0.3);
  fade('okamt', S.s15 - 0.3, 0.2);

  // ---------- STEP 3 checkpoints (s15-s19, blue) ----------
  pop('rail', Math.max(t15, at('s15/checkpointer') - 0.3), { y: 30 });
  { const a = Math.max(t15 + 0.3, at('s15/every') - 0.1), b = Math.max(a + 1.2, at('s15/saves') + 0.4);
    for (let i = 0; i < 6; i++) tl.fromTo('#tl' + i, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.25, ease: 'bounce.out' }, a + i * (b - a) / 6); }
  mv('app', at('s16/approve') - 0.4);
  pulse('nApp', at('s16/approve') + 0.1, 1.1);
  pop('itag', at('s16/interrupt'), { y: 20 });
  tl.set('#wring', { opacity: 1 }, at('s16/interrupt'));
  tl.fromTo('.l-wr', { strokeDashoffset: 0 }, { strokeDashoffset: -500, duration: Math.max(1, at('s18/resumes') - at('s16/interrupt')), ease: 'none' }, at('s16/interrupt'));
  tl.to('#swg', { filter: 'grayscale(1)', opacity: 0.5, duration: 0.35 }, at('s16/stops'));
  tl.to(['#st', '#rail'], { opacity: 0.6, duration: 0.35 }, at('s16/stops'));
  slam('paused', at('s16/stops') + 0.05, -3);
  tl.fromTo('#tl6', { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.3, ease: 'bounce.out' }, at('s17/saved'));
  tl.to('#rail', { opacity: 1, duration: 0.2 }, at('s17/saved'));
  tl.to('#railk', { backgroundColor: '#FFD23F', duration: 0.25 }, at('s17/thread'));
  pulse('railk', at('s17/thread'), 1.08);
  tl.to('#st', { opacity: 1, duration: 0.2 }, at('s17/waits') - 0.2);
  typeText('fv4a', '⏳ waiting…', at('s17/waits'), at('s17/waits') + 0.5);
  pulse('paused', at('s17/answers'), 1.05);
  fade('paused', at('s18/tap') - 0.35, 0.2);
  pop('appb', at('s18/tap') - 0.3, { y: 40 });
  tl.fromTo('#ripple', { opacity: 1, scale: 0.3 }, { opacity: 0, scale: 3, duration: 0.6, ease: 'power2.out' }, at('s18/tap'));
  pulse('appb', at('s18/tap'), 0.94);
  tl.set('#fv4a', { display: 'none' }, at('s18/tap') + 0.2);
  typeText('fv4b', 'you ✓', at('s18/tap') + 0.2, at('s18/tap') + 0.5);
  tl.to('#f4', { backgroundColor: 'rgba(20,184,122,0.22)', duration: 0.2 }, at('s18/tap') + 0.2);
  tl.to('#swg', { filter: 'grayscale(0)', opacity: 1, duration: 0.35 }, at('s18/resumes'));
  tl.to('#wring', { opacity: 0, duration: 0.2 }, at('s18/resumes'));
  tl.to('#railk', { backgroundColor: 'rgba(255,210,63,0)', duration: 0.25 }, at('s18/resumes'));
  pulse('tl6', at('s18/resumes'), 1.3);
  pulse('st', at('s18/same'), 1.02);
  fade('appb', S.s19 - 0.15, 0.2);
  fade('itag', S.s19 - 0.15, 0.2);
  mv('ref', at('s19/refund') - 0.35);
  pop('rc1', at('s19/approved') - 0.15, { y: 40, ease: 'power3.out' });
  pulse('rc1', at('s19/you'), 1.05);

  // ---------- the catch (s20-s22, dark) ----------
  group('g20', S.s20, S.s23 - 0.15);
  pop('code', S.s20 - 0.1, { y: 60, ease: 'power3.out' });
  $('icount').innerHTML = '<b id="ic1" style="position:absolute;right:0;opacity:0">1</b><b id="ic2" style="position:absolute;right:0;opacity:0;color:#FF4D5E">2</b>';
  tl.set('#ptr', { opacity: 1, y: 0 }, S.s20 + 0.1);
  tl.to('#ptr', { y: 90, duration: 0.3, ease: 'power2.inOut' }, S.s20 + 0.5);
  tl.to('#cl2', { color: '#FFD23F', duration: 0.2 }, S.s20 + 0.7);
  pulse('cl2', at('s20/resume'), 1.04);
  tl.to('#ptr', { y: 0, duration: 0.3, ease: 'power3.inOut' }, at('s20/again') - 0.1);
  tl.to('#cl1', { color: '#FF4D5E', duration: 0.2 }, at('s20/again'));
  pulse('cl1', at('s20/again') + 0.1, 1.05);
  slam('again', at('s20/top') - 0.15, -2);
  fade('again', S.s21 - 0.1, 0.2);
  pop('inbox', S.s21 - 0.1, { y: 60, ease: 'power3.out' });
  { const t = at('s21/emailed'); tl.set('#env1', { opacity: 1 }, t); tl.to('#env1', { x: -10, y: 720, scale: 0.6, duration: 0.6, ease: 'power2.in' }, t); }
  tl.set('#env1', { opacity: 0 }, at('s21/emailed') + 0.6);
  tl.set('#ic1', { opacity: 1 }, at('s21/emailed') + 0.6);
  pulse('inbox', at('s21/emailed') + 0.6, 1.03);
  { const t = Math.max(at('s21/emailed') + 0.7, at('s21/twice') - 0.65); tl.set('#env2', { opacity: 1 }, t); tl.to('#env2', { x: -10, y: 620, scale: 0.6, duration: 0.6, ease: 'power2.in' }, t); }
  tl.set('#env2', { opacity: 0 }, at('s21/twice') - 0.05);
  tl.set('#ic1', { opacity: 0 }, at('s21/twice') - 0.05);
  tl.set('#ic2', { opacity: 1 }, at('s21/twice') - 0.05);
  tl.to('#inbox', { borderColor: '#FF4D5E', duration: 0.2 }, at('s21/twice'));
  tl.fromTo('#inbox', { x: 0 }, { x: 12, duration: 0.05, yoyo: true, repeat: 5 }, at('s21/twice'));
  tl.to('#cl1', { y: 90, color: '#FFFFFF', duration: 0.4, ease: 'power2.inOut' }, at('s22/after') - 0.1);   // the action moves after the approval
  tl.to('#cl2', { y: -90, color: '#FFFFFF', duration: 0.4, ease: 'power2.inOut' }, at('s22/after') - 0.1);
  tl.to('#ptr', { y: 90, duration: 0.3 }, at('s22/after') + 0.4);
  tl.set(['#ic2'], { opacity: 0 }, at('s22/after') + 0.6); tl.set('#ic1', { opacity: 1 }, at('s22/after') + 0.6);
  tl.to('#inbox', { borderColor: '#14B87A', duration: 0.2 }, at('s22/after') + 0.6);
  pop('fixrow', at('s22/own') - 0.2, { y: 40 });
  pulse('nnot', at('s22/node'), 1.1);

  // ---------- when you need it (s23-s24, light) ----------
  group('g23', S.s23, S.s25);
  pop('bLG', S.s23 - 0.1, { y: 60, ease: 'power3.out' });
  slam('noreq', at('s23/need'), -2);
  tl.fromTo('#bLC', { opacity: 0, y: -160 }, { opacity: 1, y: 0, duration: 0.45, ease: 'bounce.out' }, at('s23/agents') - 0.3);
  pulse('bLG', at('s23/top'), 1.04);
  fade('noreq', S.s24 - 0.15, 0.2);
  pop('dec', S.s24 - 0.1, { y: 60, ease: 'power3.out' });
  tl.to('#d1', { opacity: 1, duration: 0.3 }, at('s24/simple') - 0.2);
  tl.to('#d2', { opacity: 1, duration: 0.3 }, at('s24/branches') - 0.35);
  [['i1', 'branches'], ['i2', 'loops'], ['i3', 'approval']].forEach(([id, w]) => pop(id, at('s24/' + w) - 0.05, { y: 20 }));
  pulse('d2a', at('s24/lg'), 1.08);
  pulse('bLG', at('s24/lg'), 1.04);

  // ---------- recap (s25, yellow) ----------
  group('g25', S.s25, S.s26);
  pop('rk1', S.s25 - 0.1, { x: -60, y: 0, ease: 'power3.out' });
  tl.fromTo('#rmini', { opacity: 0, y: 0 }, { opacity: 1, y: 0, duration: 0.3 }, Math.min(S.s25 + 0.1, at('s25/nodes')));
  pop('rk2', at('s25/edges') - 0.1, { x: -60, y: 0, ease: 'power3.out' }); tl.to('#rmini', { y: 240, duration: 0.35, ease: 'power2.inOut' }, at('s25/edges'));
  pop('rk3', at('s25/checkpoints') - 0.1, { x: -60, y: 0, ease: 'power3.out' }); tl.to('#rmini', { y: 480, duration: 0.35, ease: 'power2.inOut' }, at('s25/checkpoints'));
  tl.fromTo('#rtiles i', { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.25, stagger: 0.12, ease: 'bounce.out' }, at('s25/every') - 0.2);
  pop('rby', at('s25/wait') - 0.1, { y: 40 });
  pulse('rk3', at('s25/wait'), 1.03);

  // ---------- CTA (s26, dark) ----------
  group('g26', S.s26, END('s26'));
  ctaWords('s26', [['cw1', 'what'], ['cw2', 'should'], ['cw3', 'i'], ['cw4', 'explain'], ['cw5', 'next']]);
  pop('ctaf', at('s26/tell'), { y: 30 });
})();
