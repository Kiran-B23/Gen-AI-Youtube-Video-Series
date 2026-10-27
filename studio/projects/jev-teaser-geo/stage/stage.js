// Jev teaser · one scam SMS through Jev, acted out by the mentor (left) and the learner (right).
// Every motion is keyed to a spoken word (the at() keys are the beats in scenes.json). Percentages are illustrative.
const LOOK = $('t-wrap').dataset.look;   // geo | ink: the only difference between the two teaser projects
castMount('castM', 'mentor', LOOK); castMount('castL', 'learner', LOOK);
castIdle('mentor'); castIdle('learner');
castLipsync('mentor', 'M'); castLipsync('learner', 'L');
const mo = (name, t, d) => pose('mentor', name, t, d), le = (name, t, d) => pose('learner', name, t, d);

// ---------- s01-s02 · the SMS, then the verdict ----------
group('t-g1', S.s01, END('s02'));
enter('castL', 0, 520, 0.5); le('phone', 0.05, 0.3); phone(true, 0.1);
pop('t-phone', at('s01/phone') - 0.05, { y: 120, d: 0.5, ease: 'power3.out' });
typeText('t-smstxt', 'Your electricity will be cut tonight at 9:30 PM. Update your bill now: bit.ly/pay-bill', at('s01/phone') + 0.3, at('s01/sms') + 0.9);
tilt('mentor', 6, at('s01/sms'));
mo('point', at('s02/stamp') - 0.15); tilt('mentor', 0, at('s02/stamp'));
slam('t-stamp', at('s02/stamp'), -8);
show('t-res', at('s02/stamp') + 0.1);
count('t-pct', 0, 96, at('s02/pct'), 0.6, v => Math.round(v) + '%');
pop('t-timer', at('s02/timer'));
mo('rest', END('s02') - 0.4);

// ---------- s03 · which AI wrote that? (nothing was written) ----------
group('t-g3', S.s03, END('s03'));
phone(false, S.s03); le('shrug', at('s03/cursor') - 0.1); tilt('learner', -8, at('s03/cursor'));
pop('t-chat', at('s03/chat') - 0.05, { y: 60 });
tl.fromTo('#t-cursor', { opacity: 1 }, { opacity: 0, duration: 0.35, repeat: Math.max(1, Math.floor(D.s03 / 0.35)), yoyo: true, ease: 'steps(1)' }, S.s03);
pop('t-q', at('s03/cursor'), { s: 0.5 });
le('rest', END('s03') - 0.2); tilt('learner', 0, END('s03'));

// ---------- s04 · Jev: decides, doesn't write ----------
group('t-g4', S.s04, END('s04'));
pop('t-none', at('s04/none') - 0.05, { y: -30 });
mo('present', at('s04/title') - 0.15); slam('t-title', at('s04/title'), 0);
pop('t-write', at('s04/write') - 0.1);
tl.to('#t-strike', { scaleX: 1, duration: 0.3, ease: 'power3.out' }, at('s04/write') + 0.3);
slam('t-decides', at('s04/decides'), -3);
mo('rest', END('s04') - 0.3);

// ---------- s05-s07 · three questions, answered at once ----------
group('t-g5', S.s05, END('s07'));
pop('t-mini', at('s05/sms') - 0.1, { y: -40 });
[['q1', 't-c1'], ['q2', 't-c2'], ['q3', 't-c3']].forEach(([b, id], k) => {
  pop(id, at('s05/' + b) - 0.05, { x: 80, y: 0 });
  mo('count', at('s05/' + b) - 0.15, 0.25); if (k < 2) mo('present', at('s05/' + b) + 0.25, 0.25);
});
const FILL = at('s05/fill');
mo('point', FILL - 0.15);
tl.to('#t-f1', { scaleX: 0.96, duration: 0.45, ease: 'power3.out' }, FILL);
[0.88, 0.06, 0.03, 0.01, 0.02].forEach((v, k) => tl.to('#t-k' + k, { scaleY: v, duration: 0.45, ease: 'power3.out' }, FILL));
[0, 1, 2, 3, 4].forEach(k => tl.to('#t-d' + k, { backgroundColor: '#FFD23F', duration: 0.12 }, FILL + k * 0.04));
pop('t-p1', at('s05/pct')); pop('t-p3', at('s05/pct') + 0.1);
mo('rest', END('s05') - 0.3);
// s06 · the learner is sceptical
le('count', at('s06/bubble') - 0.15); tilt('learner', 6, at('s06/bubble'));
pop('t-bubL', at('s06/bubble'), { x: 40, y: 20 });
fade('t-bubL', END('s06') - 0.2, 0.2); le('rest', END('s06')); tilt('learner', 0, END('s06'));
// s07 · on yellow: cards turn white; renaming the options moves the bars
const Y0 = S.s07 - 0.08;
tl.set('.t-card', { backgroundColor: '#FFFFFF', borderColor: '#0B1020', color: '#0B1020' }, Y0);
tl.set('.t-ctrack, .t-track', { backgroundColor: 'rgba(11,16,32,0.12)' }, Y0);
tl.set('.t-cfill, .t-fill', { backgroundColor: '#2B3BE0' }, Y0);
tl.set('.t-pp', { color: '#2B3BE0' }, Y0); tl.set('#t-g5 .illus', { color: 'rgba(11,16,32,0.6)' }, Y0);
mo('warn', at('s07/warn') - 0.15); tilt('mentor', -5, at('s07/warn'));
fade('t-c3', at('s07/warn'), 0.25);
const R = at('s07/rename');
[0, 1, 2, 3, 4].forEach(k => { tl.to('#t-n' + k + 'a', { opacity: 0, y: -16, duration: 0.2 }, R + k * 0.05);
  tl.fromTo('#t-n' + k + 'b', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.25 }, R + 0.1 + k * 0.05); });
tl.fromTo('#t-c2', { x: 0 }, { x: 10, duration: 0.05, repeat: 5, yoyo: true }, R + 0.3);
[0.41, 0.33, 0.04, 0.12, 0.10].forEach((v, k) => tl.to('#t-k' + k, { scaleY: v, duration: 0.5, ease: 'back.out(1.6)' }, R + 0.35));
count('t-thn', 0, 32.5, at('s07/third') - 0.1, 0.6, v => v.toFixed(1) + '%');
pop('t-third', at('s07/third') - 0.1, { y: 30 });
mo('rest', END('s07') - 0.3); tilt('mentor', 0, END('s07'));

// ---------- s08 · trust the sure ones, route the rest to a bigger AI ----------
group('t-g8', S.s08, END('s08'));
const ROWS = [['Electricity cut tonight…', 0.96], ['KYC expiring, click…', 0.93], ['Parcel held, pay ₹25…', 0.71],
              ['You won ₹50,000…', 0.98], ['₹2,000 debited, call…', 0.38], ['Account blocked, verify…', 0.91]];
$('t-rows').innerHTML = ROWS.map(([l, v], k) => `<div id="t-r${k}" class="t-row" style="top:${k * 98}px"><span class="t-rl">${l}</span>` +
  `<span class="t-rt"><span id="t-rf${k}" class="t-rf" style="display:block;width:${v * 100}%"></span></span><span class="t-rv">${v.toFixed(2)}</span></div>`).join('');
const R0 = at('s08/rows');
ROWS.forEach((r, k) => { pop('t-r' + k, R0 + k * 0.12, { x: -40, y: 0, d: 0.35 });
  tl.fromTo('#t-rf' + k, { scaleX: 0, transformOrigin: '0 50%' }, { scaleX: 1, duration: 0.5, ease: 'power3.out' }, R0 + k * 0.12 + 0.1); });
const LN = at('s08/line');
mo('point', LN - 0.15);
tl.fromTo('#t-line', { opacity: 1, scaleY: 0 }, { scaleY: 1, duration: 0.35, ease: 'power3.out' }, LN);
ROWS.forEach((r, k) => { if (r[1] >= 0.9) tl.to('#t-rf' + k, { backgroundColor: '#14B87A', duration: 0.2 }, LN + 0.3 + k * 0.05); });
const RT = at('s08/route');
mo('present', RT - 0.15); pop('t-llm', RT - 0.05, { y: 40 });
ROWS.forEach((r, k) => { if (r[1] < 0.9) tl.to('#t-r' + k, { x: 560, y: 720 - k * 98 + 20, scale: 0.4, opacity: 0, duration: 0.6, ease: 'power2.in' }, RT + 0.2 + k * 0.08); });
tl.fromTo('#t-llm', { scale: 1 }, { scale: 1.06, duration: 0.15, yoyo: true, repeat: 1 }, at('s08/llm'));
mo('rest', END('s08') - 0.3);

// ---------- s09-s10 · end card ----------
group('t-g10', S.s09, TOTAL);
slam('t-e1', S.s09 + 0.05, 0);
le('cheer', at('s09/cheer') - 0.1); mo('cheer', at('s09/cheer') + 0.05);
pop('t-e2', S.s10 + 0.05, { y: 40 }); pop('t-e3', S.s10 + 0.6, { y: 30 });
le('rest', S.s10 + 1.2); mo('rest', S.s10 + 1.3);
