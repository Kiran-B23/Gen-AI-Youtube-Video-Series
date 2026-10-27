// Long-form cast: SVG characters (mentor + learner) with poses, blinks, breathing and lip-sync keyed to the voice.
// Loaded by the assembler after kit.js when scenes.json has "stage": {"cast": true}. Needs tl, S, D, TOTAL, TMW, SPEAKER, rnd.
//
//   castMount('castM', 'mentor', 'geo')          build a character into <div id="castM" class="cast">  (looks: geo | ink)
//   castMount('castL', 'learner', 'geo')         the learner faces left: give its div the class "flip"
//   castIdle('mentor'); castLipsync('mentor', 'M')   blink + breathe for the whole video; mouth follows scenes with speaker "M"
//   pose('mentor', 'point', t)                   arms: rest | point | present | phone | count | warn | shrug | cheer
//   tilt('learner', 6, t)                        head tilt in degrees (0 = straight)
//   enter('castL', t, 600)                       slide in from x + 600 px (negative = from the left)
//
// One skeleton for every look (same part ids and joints), so a look is only colours and outlines: poses, blinks and
// lip-sync work unchanged. The character is drawn facing right in a 400 x 700 box; ".flip" mirrors it with CSS.

const CAST_LOOKS = {
  geo: { stroke: 'none', sw: 0,
    mentor:  { skin: '#C68B59', hair: '#0B1020', shirt: '#FF8A3D', glasses: true },
    learner: { skin: '#8D5A3B', hair: '#0B1020', shirt: '#2EC4B6', glasses: false } },
  ink: { stroke: '#0B1020', sw: 7,
    mentor:  { skin: '#F2C9A0', hair: '#9AA3B5', shirt: '#2B3BE0', glasses: true },
    learner: { skin: '#B97A50', hair: '#0B1020', shirt: '#FFFFFF', glasses: false } },
};
const SHOULDER = { F: [262, 400], B: [138, 400] };   // joints in the 400 x 700 box (F = front arm, toward the stage)
const POSES = {   // [front arm, back arm] rotation in degrees; 0 = hanging down, front arm negative = raised toward the stage
  rest: [-6, 6], point: [-100, 6], present: [-62, 6], phone: [-78, 6], count: [-158, 6],
  warn: [-128, 6], shrug: [-38, 38], cheer: [-150, 150],
};

function castMount(divId, who, look = 'geo') {
  const L = CAST_LOOKS[look], c = L[who], st = L.sw ? `stroke="${L.stroke}" stroke-width="${L.sw}" stroke-linejoin="round" stroke-linecap="round"` : '';
  const id = p => `${who}-${p}`;
  const arm = (side) => { const [x, y] = SHOULDER[side];
    return `<g id="${id('arm' + side)}"><rect x="${x - 21}" y="${y - 12}" width="42" height="190" rx="21" fill="${c.shirt}" ${st}/>` +
      `<circle cx="${x}" cy="${y + 190}" r="25" fill="${c.skin}" ${st}/>` +
      (who === 'learner' && side === 'F' ? `<g id="${id('phone')}"><rect x="${x - 34}" y="${y + 150}" width="68" height="112" rx="12" fill="#0B1020"/>` +
        `<rect x="${x - 27}" y="${y + 158}" width="54" height="90" rx="6" fill="#EEF1F6"/></g>` : '') + `</g>`; };
  const hair = who === 'mentor'
    ? `<path d="M110 220 Q112 128 200 126 Q288 128 290 214 Q262 168 196 170 Q140 172 110 220Z" fill="${c.hair}" ${st}/>`
    : `<path d="M112 214 Q112 120 204 120 Q290 124 290 206 L272 170 L250 190 L228 160 L204 186 L180 158 L156 186 L134 166Z" fill="${c.hair}" ${st}/>`;
  const glasses = c.glasses ? `<g fill="none" stroke="#0B1020" stroke-width="6"><circle cx="186" cy="232" r="22"/><circle cx="244" cy="232" r="22"/>` +
    `<line x1="208" y1="232" x2="222" y2="232"/><line x1="164" y1="230" x2="122" y2="222"/></g>` : '';
  const svg = `<svg viewBox="0 0 400 700" xmlns="http://www.w3.org/2000/svg">
    <g id="${id('body')}">
      ${arm('B')}
      <path d="M96 760 L106 450 Q110 380 200 372 Q290 380 294 450 L304 760Z" fill="${c.shirt}" ${st}/>
      <rect x="176" y="318" width="48" height="62" fill="${c.skin}" ${st}/>
      <g id="${id('head')}">
        <circle cx="200" cy="236" r="94" fill="${c.skin}" ${st}/>
        ${hair}
        <g id="${id('eyes')}"><circle cx="186" cy="234" r="8" fill="#0B1020"/><circle cx="244" cy="234" r="8" fill="#0B1020"/></g>
        ${glasses}
        <g id="${id('mouth')}" fill="#0B1020">
          <path id="${id('mC')}" d="M196 284 Q216 296 236 284" fill="none" stroke="#0B1020" stroke-width="7" stroke-linecap="round"/>
          <ellipse id="${id('mO')}" cx="216" cy="288" rx="15" ry="13" opacity="0"/>
          <ellipse id="${id('mM')}" cx="216" cy="288" rx="10" ry="6" opacity="0"/>
        </g>
      </g>
      ${arm('F')}
    </g></svg>`;
  $(divId).innerHTML = svg;
  if (who !== 'learner') return;
  tl.set('#' + id('phone'), { opacity: 0 }, 0);
}

// arms move on a word; d = how long the move takes
function pose(who, name, t, d = 0.35) {
  const [f, b] = POSES[name];
  tl.to('#' + who + '-armF', { rotation: f, svgOrigin: SHOULDER.F.join(' '), duration: d, ease: 'back.out(1.4)' }, t);
  tl.to('#' + who + '-armB', { rotation: b, svgOrigin: SHOULDER.B.join(' '), duration: d, ease: 'back.out(1.4)' }, t);
}
const tilt = (who, deg, t, d = 0.3) => tl.to('#' + who + '-head', { rotation: deg, svgOrigin: '200 330', duration: d, ease: 'power2.out' }, t);
const enter = (divId, t, dx = 600, d = 0.6) => tl.fromTo('#' + divId, { x: dx }, { x: 0, duration: d, ease: 'power3.out' }, t);
const phone = (show, t) => tl.to('#learner-phone', { opacity: show ? 1 : 0, duration: 0.15 }, t);

function castIdle(who) {
  tl.set('#' + who + '-armF', { rotation: POSES.rest[0], svgOrigin: SHOULDER.F.join(' ') }, 0);
  tl.set('#' + who + '-armB', { rotation: POSES.rest[1], svgOrigin: SHOULDER.B.join(' ') }, 0);
  const period = who === 'mentor' ? 1.6 : 1.35;   // breathing: the two never move in lockstep
  tl.fromTo('#' + who + '-body', { y: 0 }, { y: -6, duration: period, ease: 'sine.inOut', repeat: Math.max(1, Math.floor(TOTAL / period)), yoyo: true }, 0);
  for (let t = 1.2 + rnd() * 1.5; t < TOTAL - 0.3; t += 2.6 + rnd() * 1.8)   // blink every 2.6-4.4 s
    tl.fromTo('#' + who + '-eyes', { scaleY: 1 }, { scaleY: 0.1, svgOrigin: '215 234', duration: 0.07, yoyo: true, repeat: 1, ease: 'power1.in' }, t);
}

// mouth: closed between words; within a word it alternates open / mid every ~0.09 s (round "mid" for o/u words);
// the head nods a little on each word so the speaker reads as the one talking
function castLipsync(who, letter) {
  const set = (shape, t) => ['mC', 'mO', 'mM'].forEach(k => tl.set('#' + who + '-' + k, { opacity: k === shape ? 1 : 0 }, t));
  for (const sid of Object.keys(SPEAKER)) {
    if (SPEAKER[sid] !== letter) continue;
    (TMW[sid] || []).forEach(([w, s, e], k) => {
      const t0 = S[sid] + s, t1 = S[sid] + e, round = /[ouw]/.test(w);
      for (let t = t0, n = 0; t < t1 - 0.04; t += 0.09, n++) set(n % 2 ? 'mM' : (round ? 'mM' : 'mO'), t);
      set('mC', t1);
      if (k % 2 === 0) tl.fromTo('#' + who + '-head', { y: 0 }, { y: 4, svgOrigin: '200 330', duration: Math.max(0.08, (e - s) / 2), yoyo: true, repeat: 1, ease: 'sine.inOut' }, t0);
    });
  }
}
