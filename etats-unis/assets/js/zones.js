/* =====================================================================
   ÉTATS-UNIS · zones.js — le plan du colosse
   A fixed HUD that reads like a building directory: it tracks which SECTEUR
   of the hangar you're standing in as you scroll, + an opt-in industrial
   CLANG (deep metallic hit — the sound of a hangar door) on section change.
   (Minimes uses a boxing bell; the clang fits the factory.) Injected — no
   markup needed. Live geometry, immune to ScrollTrigger refresh timing.
   ===================================================================== */
const gsap = window.gsap;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initSectors() {
  const sections = document.querySelectorAll("[data-sector]");
  if (!sections.length) return;

  const total = sections.length;
  const hud = document.createElement("aside");
  hud.className = "hud"; hud.id = "hud"; hud.setAttribute("aria-hidden", "true");
  hud.innerHTML =
    `<div class="hud__top"><span class="hud__label">Secteur</span><span class="hud__num">01</span></div>` +
    `<span class="hud__name">—</span>` +
    `<div class="hud__ticks">${Array.from({ length: total }, () => "<i></i>").join("")}</div>` +
    `<button class="hud__sound" type="button" aria-label="Activer le son" title="Son">` +
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/></svg>` +
    `</button>`;
  document.body.appendChild(hud);

  const numEl = hud.querySelector(".hud__num");
  const nameEl = hud.querySelector(".hud__name");
  const ticks = hud.querySelectorAll(".hud__ticks i");
  const soundBtn = hud.querySelector(".hud__sound");

  let current = 0, soundOn = false, actx = null;

  /* deep metallic clang — noise burst through a band-pass, a couple of
     partials on top. The hangar-door hit, not a boxing bell. */
  const clang = () => {
    if (!soundOn || !actx) return;
    try {
      const t = actx.currentTime;
      const dur = 0.9;
      // metallic body: two detuned oscillators, fast decay
      const g = actx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.14, t + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      g.connect(actx.destination);
      [214, 322, 289].forEach((f, i) => {
        const o = actx.createOscillator();
        o.type = i === 2 ? "square" : "triangle";
        o.frequency.setValueAtTime(f, t);
        o.frequency.exponentialRampToValueAtTime(f * 0.6, t + dur);
        const og = actx.createGain(); og.gain.value = i === 2 ? 0.12 : 0.4;
        o.connect(og); og.connect(g); o.start(t); o.stop(t + dur);
      });
      // metallic transient: short filtered noise
      const n = actx.createBufferSource();
      const buf = actx.createBuffer(1, actx.sampleRate * 0.18, actx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
      n.buffer = buf;
      const bp = actx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 2600; bp.Q.value = 0.8;
      const ng = actx.createGain(); ng.gain.value = 0.5;
      n.connect(bp); bp.connect(ng); ng.connect(g); n.start(t);
    } catch (e) {}
  };

  soundBtn.addEventListener("click", (e) => {
    e.preventDefault();
    soundOn = !soundOn;
    hud.classList.toggle("sound-on", soundOn);
    soundBtn.setAttribute("aria-label", soundOn ? "Couper le son" : "Activer le son");
    if (soundOn) { try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); actx.resume(); } catch (e2) {} clang(); }
  });

  const setSector = (n, name) => {
    if (n === current) return;
    const advancing = n > current;
    current = n;
    numEl.textContent = String(n).padStart(2, "0");
    nameEl.textContent = name || "";
    ticks.forEach((t, i) => t.classList.toggle("on", i < n));
    if (!reduce) gsap.fromTo(hud, { scale: 0.94 }, { scale: 1, duration: 0.45, ease: "back.out(2.2)" });
    if (advancing) clang();
  };

  // active sector = last section whose top crossed the 42% line (live geometry)
  const list = [...sections].map((el, i) => ({ el, n: i + 1, name: el.dataset.sector }));
  const heroEl = document.querySelector(".hero");
  let ticking = false;
  const measure = () => {
    ticking = false;
    const line = window.innerHeight * 0.42;
    let active = null;
    for (const s of list) if (s.el.getBoundingClientRect().top <= line) active = s;
    if (active) setSector(active.n, active.name);
    if (heroEl) hud.classList.toggle("is-on", heroEl.getBoundingClientRect().bottom < window.innerHeight * 0.5);
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(measure); } };
  if (window.BC && window.BC.lenis) window.BC.lenis.on("scroll", onScroll);
  else window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  measure();
}
