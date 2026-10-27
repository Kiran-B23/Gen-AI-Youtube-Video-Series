// Laya stage · house style reference-flat (kit.js loaded first) · every cue is a beat in scenes.json
(function () {

  // ---------- s01 hook ----------
  group('g01', 0, S.s02);
  slam('free', 0, -3);   // on screen from frame 1
  tl.to(['#lapscr', '#lapbase'], { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut', stagger: 0.1 }, Math.min(at('s01/free') + 0.3, at('s01/laptop') - 0.9));
  pop('laptxt', at('s01/laptop') - 0.3, { y: 30 });

  // ---------- s02-s03 what it is ----------
  group('g02', S.s02, S.s04 - 0.2);
  pop('layabig', S.s02 - 0.15, { y: 80, s: 1, ease: 'power4.out', d: 0.4 });
  pop('dc1', at('s02/decides'), { y: 20 }); pop('dc2', at('s02/decides') + 0.15, { y: 20 });
  tl.to('#strike', { scaleX: 1, duration: 0.3, ease: 'power2.out' }, at('s02/never'));
  tl.to('#dc2', { opacity: 0.55, duration: 0.3 }, at('s02/never') + 0.3);
  pop('msg', at('s03/msg'), { x: -80, y: 0, ease: 'power3.out' });
  [1, 2, 3].forEach(k => {
    tl.fromTo('#q' + k, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.35, ease: 'power3.out' }, at('s03/qs') + (k - 1) * 0.15);
    tl.to('#qb' + k, { scaleX: 1, duration: 0.6, ease: 'power2.out' }, at('s03/pct') + (k - 1) * 0.12);
    count('qp' + k, 0, [94, 71, 63][k - 1], at('s03/pct') + (k - 1) * 0.12, 0.6, v => Math.round(v) + '%');
  });

  // ---------- 01 install it (s04) ----------
  const t04 = chapter('c1', S.s04, at('s04/pip') - 0.35);
  group('g04', t04 - 0.05, S.s05 - 0.2);
  pop('term', t04 - 0.05, { y: 40, d: 0.35 });
  typeText('t1', 'pip install laya', t04 + 0.1, at('s04/pip') + 0.45);
  tl.to('#t2l', { opacity: 1, duration: 0.15 }, at('s04/ver') - 0.2);
  typeText('t3', 'nvidia-smi', at('s04/ver'), at('s04/gpu') - 0.4);
  tl.to('#t4l', { opacity: 1, duration: 0.15 }, at('s04/gpu') - 0.25);
  slam('nogpu', at('s04/gpu'), -6);

  // ---------- 02 ask it (s05-s07) · the ticket ----------
  const TXT = 'I was charged twice. Refund me, or I cancel.';
  const t05 = chapter('c2', S.s05, at('s05/ticket') + 0.2);
  group('g05', S.s05, S.s08 - 0.05);
  pop('ticket', t05 - 0.1, { y: 60 });
  const i0 = TXT.lastIndexOf('cancel');
  $('tkt').innerHTML = [...TXT].map((ch, i) => (i === i0 ? '<span id="hlw" class="hlw">' : '') + `<span class="ch">${ch}</span>` + (i === i0 + 5 ? '</span>' : '')).join('');
  const t0 = Math.max(t05, at('s05/type')), t1 = at('s05/typed');
  tl.fromTo('#tkt .ch', { opacity: 0 }, { opacity: 1, duration: 0.01, stagger: (t1 - t0) / TXT.length }, t0);
  tl.to('#ticket', { y: -560, scale: 0.94, duration: 0.5, ease: 'power3.inOut' }, S.s06 - 0.1);   // the ticket stays on screen, at the top
  pop('teamq', at('s06/team') + 0.1, { y: 10 });
  ['pb1', 'pb2', 'pb3', 'pb4'].forEach((id, k) => pop(id, at('s06/team') + 0.15 + k * 0.1, { x: -40, y: 0, ease: 'power3.out', d: 0.35 }));
  tl.to('#pf1', { scaleX: 1, duration: 0.7, ease: 'power2.out' }, at('s06/billing'));
  tl.to(['#pf2', '#pf3', '#pf4'], { scaleX: 1, duration: 0.3 }, at('s06/billing') + 0.1);
  count('pv1', 0, 98.4, at('s06/pct'), 0.6, v => v.toFixed(1) + '%');
  slam('nailed', at('s06/nailed'), -5);
  // s07: the same ticket, a second question
  ['teamq', 'pbars', 'nailed'].forEach(id => fade(id, S.s07 - 0.25, 0.25));
  pop('leaveq', at('s07/leave') - 0.1, { y: 10 });
  pop('gauge', S.s07 + 0.05, { y: 30 });
  tl.to('#gfill', { scaleX: 1, duration: 0.8, ease: 'power2.out' }, at('s07/pct') - 0.1);
  count('g48', 0, 48, at('s07/pct'), 0.7, v => Math.round(v) + '%');
  slam('guess', at('s07/guess'), -6);
  // highlight "cancel" inside the ticket as the voice says it (a span, so no layout measuring at render time)
  tl.fromTo('#hlw', { backgroundSize: '0% 100%' }, { backgroundSize: '100% 100%', duration: 0.35, ease: 'power2.out' }, at('s07/cancel'));

  // ---------- s08 speed (yellow) ----------
  group('g08', S.s08, S.s09 - 0.2);
  tl.fromTo('#ring', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.6)' }, S.s08 - 0.1);
  pop('ringlab', S.s08, { y: 10 });
  pop('three', at('s08/three'), { y: 20 }); tl.fromTo('.spdrow .chip.wht', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, at('s08/three') + 0.2);
  tl.to('#rarc', { strokeDashoffset: 1068.1 * (1 - 0.651), duration: 0.8, ease: 'power2.out' }, at('s08/time'));
  count('spd', 0, 0.65, at('s08/time'), 0.8, v => v.toFixed(2) + ' s');
  slam('cpu', at('s08/cpu'), -5);

  // ---------- 03 compare (s09-s10) ----------
  const t09 = chapter('c3', S.s09, at('s09/jev') - 0.05);
  group('g09', t09 - 0.05, S.s11 - 0.2);
  pop('vj', t09 - 0.05, { x: -60, y: 0, ease: 'power3.out' });
  pop('vjp', at('s09/paid'), { y: 10 });
  pop('vl', at('s09/laya'), { x: 60, y: 0, ease: 'power3.out' }); pop('vlp', at('s09/laya') + 0.3, { y: 10 });
  tl.fromTo('#mini', { opacity: 0, x: -260, y: 0 }, { opacity: 1, x: -260, duration: 0.2 }, at('s09/machine') - 0.5);
  tl.to('#mini', { x: 200, y: -300, scale: 0.6, duration: 0.6, ease: 'power2.inOut' }, at('s09/machine') - 0.3);
  tl.to('#mini', { opacity: 0, duration: 0.15 }, at('s09/machine') + 0.3);
  tl.fromTo('#vl', { scale: 1 }, { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1 }, at('s09/machine') + 0.3);
  pop('stay', at('s09/machine') + 0.3, { y: 10 });
  fade('stay', S.s10 - 0.2, 0.2);
  tl.to('#bench', { opacity: 1, duration: 0.3 }, S.s10);
  tl.to('#bf1', { scaleY: 1, duration: 0.7, ease: 'power2.out' }, at('s10/tuned'));
  count('bv1', 0, 77, at('s10/tuned'), 0.7, v => Math.round(v) + '%');
  tl.fromTo('#bench .bk', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4 }, at('s10/bench'));
  tl.fromTo('#bench .bcol:nth-child(3)', { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.45, ease: 'power3.out' }, (W('s10', "jev's") ?? at('s10/jev') - 0.8) - 0.1);
  tl.to('#bf2', { scaleY: 1, duration: 0.7, ease: 'power2.out' }, at('s10/jev'));
  count('bv2', 0, 73, at('s10/jev'), 0.7, v => Math.round(v) + '%');

  // ---------- 04 the catch (s11) ----------
  const t11 = chapter('c4', S.s11, at('s11/catch') + 0.45);
  group('g11', t11, S.s12 - 0.2);
  tl.fromTo('#cb', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, t11);
  tl.fromTo('#cf', { scaleY: 77 / 36 }, { scaleY: 1, duration: 0.9, ease: 'power3.in' }, at('s11/untuned') + 0.2);
  count('cv', 77, 36, at('s11/untuned') + 0.2, 0.9, v => Math.round(v) + '%');
  tl.fromTo('#cv', { scale: 1 }, { scale: 1.15, duration: 0.15, yoyo: true, repeat: 1 }, at('s11/pct'));
  pop('tune', at('s11/tune'), { y: 20 });

  // ---------- s12 verdict (yellow) ----------
  group('g12', S.s12 - 0.15, S.s13);
  pop('vr1', S.s12 - 0.15, { x: -60, y: 0, ease: 'power3.out', d: 0.35 });
  slam('vt1', at('s12/try'), -3);
  pop('vr2', at('s12/acc'), { x: -60, y: 0, ease: 'power3.out' });
  slam('vt2', at('s12/pay'), -3);

  // ---------- s13 CTA ----------
  group('g13', S.s13, END('s13'));
  ctaWords('s13', [['cw1', 'what'], ['cw2', 'should'], ['cw3', 'i'], ['cw4', 'explain'], ['cw5', 'next']]);
  pop('ctaf', at('s13/tell'), { y: 30 });
})();
