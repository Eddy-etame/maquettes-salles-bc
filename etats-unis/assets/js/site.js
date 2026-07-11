/* =====================================================================
   MINIMES · site.js (v2) — chrome + heavy motion engine
   window.BC = { reveal, magnetic, refresh, media, split, scramble,
                 lenis, velocity }
   ===================================================================== */
import { NAV, LINKS, SALLE, MEDIA } from "./data.js";

const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (gsap && ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
if (!gsap) document.documentElement.classList.remove("fx");

let lenis = null;
let velocity = 0;          // smoothed scroll velocity (shared)

/* ----------------------------- NAV / MENU ------------------------- */
function currentPath() {
  let p = location.pathname.replace(/index\.html$/, "");
  if (!p.endsWith("/")) p += "/";
  return p;
}
function mountNav() {
  const path = currentPath();
  const links = NAV.map(
    (n) => `<a href="${n.href}"${n.href === path ? ' aria-current="page"' : ""}>${n.label}</a>`
  ).join("");
  document.getElementById("nav").innerHTML = `
    <nav class="nav" id="site-nav">
      <a class="nav__brand" href="/" aria-label="Boxing Center États-Unis — accueil">
        <img class="nav__logo" src="/assets/img/logo-white.png" alt="Boxing Center" width="3542" height="1655" />
        <span class="nav__salle">États-Unis</span>
      </a>
      <div class="nav__links">${links}</div>
      <div class="nav__right">
        <button class="pal-toggle" id="pal-toggle" type="button" aria-label="Changer la palette (Bronze / Steel)" aria-pressed="false" title="Palette"><span class="pal-toggle__dot" aria-hidden="true"></span><span class="pal-toggle__name" aria-hidden="true"></span><i class="pal-toggle__swap" aria-hidden="true">⇄</i></button>
        <a class="btn btn--primary nav__cta" data-magnetic href="${LINKS.essai}"><span>Essai · 10€</span></a>
        <button class="burger" id="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </nav>`;

  const menuLinks = NAV.map(
    (n, i) => `<a class="menu__link" href="${n.href}"><span class="n">${String(i + 1).padStart(2, "0")}</span>${n.label}</a>`
  ).join("");
  document.getElementById("drawer").innerHTML = `
    <div class="menu" id="menu" aria-hidden="true">
      <div class="menu__bg media" data-img="/assets/img/eu/hangar-2.webp" aria-hidden="true"></div>
      <div class="menu__top">
        <a class="nav__brand" href="/" aria-label="Boxing Center États-Unis — accueil">
          <img class="nav__logo" src="/assets/img/logo-white.png" alt="Boxing Center" width="3542" height="1655" />
          <span class="nav__salle">États-Unis</span>
        </a>
        <button class="menu__close" id="menu-close">Fermer <span aria-hidden="true">✕</span></button>
      </div>
      <nav class="menu__nav">${menuLinks}</nav>
      <div class="menu__foot">
        <a class="btn btn--primary" data-magnetic href="${LINKS.essai}"><span>Réserver l'essai · 10€</span></a>
        <div style="display:flex;gap:1.4rem;flex-wrap:wrap">
          <a href="${LINKS.boutique}" target="_blank" rel="noopener">Boutique ↗</a>
          <a href="${LINKS.instagram}" target="_blank" rel="noopener">Instagram ↗</a>
          <a href="tel:${SALLE.phoneHref}">${SALLE.phone}</a>
        </div>
      </div>
    </div>`;

  const nav = document.getElementById("site-nav");
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  const items = menu.querySelectorAll(".menu__link");
  const setOpen = (open) => {
    document.documentElement.classList.toggle("is-menu-open", open);
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    burger.setAttribute("aria-expanded", String(open));
    document.documentElement.classList.toggle("is-locked", open);
    if (lenis) open ? lenis.stop() : lenis.start();
    if (gsap && !reduce) {
      if (open) gsap.fromTo(items, { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7, ease: "power4.out", stagger: 0.06, delay: 0.18 });
    }
  };
  burger.addEventListener("click", () => setOpen(!menu.classList.contains("is-open")));
  document.getElementById("menu-close").addEventListener("click", () => setOpen(false));
  menu.querySelectorAll(".menu__link, .menu__foot a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });

  // scroll state: hide on down, show on up, solid bg after hero
  let last = 0;
  ScrollTrigger?.create({
    start: 0, end: "max",
    onUpdate: (self) => {
      const y = self.scroll();
      nav.classList.toggle("is-scrolled", y > 80);
      if (y > last && y > 400 && !menu.classList.contains("is-open")) nav.classList.add("is-hidden");
      else nav.classList.remove("is-hidden");
      last = y;
    },
  });
}

function mountFooter() {
  const cols = [
    { h: "Le club", links: NAV.slice(1, 6) },
    { h: "Le réseau", links: [{ href: LINKS.groupe, label: "Boxing Center ↗" }, { href: "https://www.boxing-center-portet.fr/", label: "Portet ↗" }, { href: LINKS.instagram, label: "Instagram ↗" }, { href: LINKS.facebook, label: "Facebook ↗" }] },
  ];
  // architectural title-block (cartouche) — the metadata cells of a drawing
  const fields = [
    { k: "Établissement", v: "Boxing Center — États-Unis", wide: true },
    { k: "Surface", v: "1 200 m² · 3 zones" },
    { k: "Secteur", v: "Lalande · 31200" },
    { k: "Adresse", v: SALLE.address.full, wide: true },
    { k: "Horaires", v: SALLE.hours },
    { k: "Téléphone", v: `<a href="tel:${SALLE.phoneHref}">${SALLE.phone}</a>` },
    { k: "Accès", v: "Rocade sortie 33b · parking gratuit" },
    { k: "Fédérations", v: SALLE.federations.join(" · ") },
  ];
  document.getElementById("footer").innerHTML = `
    <footer class="footer">
      <div class="wrap">
        <div class="footer__head">
          <div>
            <span class="eyebrow">Le colosse t'attend</span>
            <h2 class="display footer__cut">1 200 m².<br><span class="tint">Viens les remplir.</span></h2>
          </div>
          <a class="btn btn--primary" data-magnetic href="${LINKS.essai}"><span>Réserver l'essai · 10€</span></a>
        </div>

        <div class="cartouche" aria-label="Fiche technique de la salle">
          ${fields.map((f) => `<div class="cartouche__cell${f.wide ? " cartouche__cell--wide" : ""}"><span class="ck">${f.k}</span><span class="cv">${f.v}</span></div>`).join("")}
        </div>

        <div class="footer__links">
          ${cols.map((c) => `<div class="footer__col"><h4>${c.h}</h4>${c.links.map((l) => `<a href="${l.href}">${l.label}</a>`).join("")}</div>`).join("")}
          <div class="footer__col footer__col--social">
            <h4>Suivre</h4>
            <a href="${LINKS.instagram}" target="_blank" rel="noopener">Instagram ↗</a>
            <a href="${LINKS.facebook}" target="_blank" rel="noopener">Facebook ↗</a>
            <a href="${LINKS.boutique}" target="_blank" rel="noopener">Boutique ↗</a>
          </div>
        </div>

        <div class="footer__bottom">
          <span>© ${new Date().getFullYear()} Boxing Center — Maquette États-Unis</span>
          <span class="footer__stamp">Plan · Le Colosse · éch. 1:1</span>
        </div>
      </div>
    </footer>`;

  // the architect's stamp HITS the sheet when it scrolls into view
  const stamp = document.querySelector(".footer__stamp");
  if (stamp && "IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { stamp.classList.add("is-stamped"); io.disconnect(); }
    }), { threshold: 0.4 });
    io.observe(stamp);
  } else if (stamp) stamp.classList.add("is-stamped");
}

/* ------------------------------ LENIS ----------------------------- */
function initSmooth() {
  if (reduce || !window.Lenis) return;
  lenis = new window.Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
  lenis.on("scroll", (e) => { velocity = e.velocity; ScrollTrigger?.update(); });
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (a && a.getAttribute("href").length > 1) {
      const el = document.querySelector(a.getAttribute("href"));
      if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -80 }); }
    }
  });
}

/* ------------------------------ CURSOR ---------------------------- */
function initCursor() {
  if (window.matchMedia("(hover: none)").matches) return;
  const ring = document.querySelector(".cursor");
  const dot = document.querySelector(".cursor__dot");
  const label = ring?.querySelector(".cursor__label");
  if (!ring) return;
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px)`; });
  const loop = () => { rx += (mx - rx) * 0.2; ry += (my - ry) * 0.2; ring.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(loop); };
  loop();
  const sel = "a, button, [data-magnetic], .zone__tick, .disc, .value, .tarif, .coach";
  document.addEventListener("mouseover", (e) => {
    const t = e.target.closest(sel);
    if (t) { ring.classList.add("is-hover"); if (label) label.textContent = t.dataset.cursor || (t.closest(".disc") ? "voir" : t.closest(".coach") ? "coach" : t.closest(".zone__tick") ? "zone" : "→"); }
  });
  document.addEventListener("mouseout", (e) => { if (e.target.closest(sel)) ring.classList.remove("is-hover"); });
}

/* ----------------------------- MAGNETIC --------------------------- */
function magnetic(scope = document) {
  if (reduce || window.matchMedia("(hover: none)").matches) return;
  scope.querySelectorAll("[data-magnetic]").forEach((el) => {
    if (el.dataset.magBound) return; el.dataset.magBound = "1";
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.4, y: (e.clientY - r.top - r.height / 2) * 0.4, duration: 0.5, ease: "power3.out" });
    });
    el.addEventListener("mouseleave", () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" }));
  });
}

/* ----------------------------- SPLIT ------------------------------ */
function split(el) {
  if (el.dataset.splitDone) return [...el.querySelectorAll(".char")];
  el.dataset.splitDone = "1";
  const text = el.textContent;
  el.textContent = "";
  const chars = [];
  [...text].forEach((ch) => {
    const s = document.createElement("span");
    s.className = "char";
    s.textContent = ch === " " ? " " : ch;
    el.appendChild(s); chars.push(s);
  });
  return chars;
}

/* ----------------------------- SCRAMBLE --------------------------- */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\*";
function scramble(el, opts = {}) {
  if (reduce) return;
  const final = el.dataset.text || el.textContent;
  el.dataset.text = final;
  const dur = opts.dur || 700;
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const p = Math.min(1, (ts - start) / dur);
    const reveal = Math.floor(p * final.length);
    let out = "";
    for (let i = 0; i < final.length; i++) {
      out += i < reveal || final[i] === " " ? final[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }
    el.textContent = out;
    if (p < 1) requestAnimationFrame(step); else el.textContent = final;
  };
  requestAnimationFrame(step);
}

/* ----------------------------- REVEAL ----------------------------- */
function reveal(scope = document) {
  if (reduce) { document.documentElement.classList.remove("fx"); return; }
  scope.querySelectorAll(".reveal-mask").forEach((m) => {
    const kids = [...m.children];
    if (m.dataset.revBound || !kids.length) return; m.dataset.revBound = "1";
    gsap.set(kids, { yPercent: 110, opacity: 0 });
    gsap.to(kids, { yPercent: 0, opacity: 1, duration: 1.1, ease: "power4.out", stagger: 0.08, scrollTrigger: { trigger: m, start: "top 90%" } });
  });
  scope.querySelectorAll("[data-reveal]").forEach((el) => {
    if (el.dataset.revBound) return; el.dataset.revBound = "1";
    gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%" } });
  });
  scope.querySelectorAll("[data-reveal-group]").forEach((g) => {
    const kids = [...g.children];
    if (g.dataset.revBound || !kids.length) return; g.dataset.revBound = "1";
    gsap.set(kids, { opacity: 0, y: 40 });
    gsap.to(kids, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, scrollTrigger: { trigger: g, start: "top 88%" } });
  });

  // Dead-man net (legibility law): if the gsap ticker is FROZEN (throttled
  // tab, degraded webview), every bound reveal would hold its content at
  // opacity 0 forever. setTimeout fires independently of rAF — if no frame
  // has advanced by then, force everything readable and drop the fx flag.
  if (!reveal._net && gsap) {
    reveal._net = true;
    const f0 = gsap.ticker.frame;
    setTimeout(() => {
      if (gsap.ticker.frame !== f0) return; // motion is alive — let reveals play
      document.documentElement.classList.remove("fx");
      document.querySelectorAll(".reveal-mask > span, [data-reveal], [data-reveal-group] > *").forEach((el) => {
        el.style.opacity = "1"; el.style.transform = "none";
      });
    }, 3500);
  }
}

/* --------------------------- MEDIA HYDRATE ------------------------ */
function hydrateMedia(scope = document) {
  scope.querySelectorAll(".media[data-img]").forEach((el) => {
    if (el.dataset.mediaBound) return; el.dataset.mediaBound = "1";
    const img = new Image();
    img.src = (/^(https?:|\/assets)/.test(el.dataset.img) ? "" : MEDIA) + el.dataset.img;
    img.alt = el.dataset.label || ""; img.loading = el.hasAttribute("data-eager") ? "eager" : "lazy"; img.decoding = "async";
    el.prepend(img);
  });
  scope.querySelectorAll("video[data-video]").forEach((v) => {
    if (v.dataset.mediaBound) return; v.dataset.mediaBound = "1";
    v.muted = true; v.defaultMuted = true; v.playsInline = true; v.loop = true;
    if (v.dataset.poster) v.poster = (/^(https?:|\/assets)/.test(v.dataset.poster) ? "" : MEDIA) + v.dataset.poster;
    v.src = (/^(https?:|\/assets)/.test(v.dataset.video) ? "" : MEDIA) + v.dataset.video;
    v.load();
    const play = () => { v.muted = true; v.play().catch(() => {}); };
    v.addEventListener("loadeddata", play, { once: true });
    v.addEventListener("canplay", play, { once: true });
    play();
    _pendingVideos.push(v);
  });
}
const _pendingVideos = [];
/* autoplay can be blocked until a gesture — kick all videos on first input */
["pointerdown", "touchstart", "scroll", "keydown"].forEach((ev) =>
  addEventListener(ev, () => _pendingVideos.forEach((v) => { v.muted = true; v.play().catch(() => {}); }), { once: true, passive: true })
);

/* --------------------- VELOCITY: skew + marquees ------------------ */
let kineticsOn = false;
function initKinetics() {
  if (reduce || kineticsOn) return; kineticsOn = true;
  const skews = [...document.querySelectorAll("[data-skew]")];
  const tracks = [...document.querySelectorAll(".marquee__track")].map((t) => {
    const dir = t.dataset.dir === "rtl" ? 1 : -1;
    const half = t.scrollWidth / 2 || 1;
    return { el: t, dir, half, x: 0, base: parseFloat(t.dataset.speed || "1") };
  });
  let smooth = 0;
  gsap.ticker.add(() => {
    smooth += (velocity - smooth) * 0.1;
    const sk = gsap.utils.clamp(-7, 7, smooth * 0.35);
    skews.forEach((el) => (el.style.transform = `skewY(${sk * 0.5}deg)`));
    tracks.forEach((m) => {
      m.x += (m.base + Math.abs(smooth) * 0.25) * m.dir;
      if (m.dir < 0 && m.x <= -m.half) m.x += m.half;
      if (m.dir > 0 && m.x >= 0) m.x -= m.half;
      m.el.style.transform = `translateX(${m.x}px) skewX(${gsap.utils.clamp(-6, 6, -smooth * 0.18)}deg)`;
    });
    velocity *= 0.9;
  });
}

/* -------------------- PALETTE TOGGLE (Bronze/Steel) --------------- *
 * The presentation safety-hatch. The initial value is set by the inline
 * head script (no flash); this wires the live swap + persistence.        */
function initPaletteToggle() {
  const btn = document.getElementById("pal-toggle");
  if (!btn) return;
  const KEY = "bc-eu-palette-v2"; // v2: Steel is the default now
  const apply = (p) => {
    document.documentElement.setAttribute("data-palette", p);
    btn.setAttribute("aria-pressed", String(p === "b"));
    try { localStorage.setItem(KEY, p); } catch (e) {}
    window.dispatchEvent(new CustomEvent("bc-palette", { detail: p })); // re-tint the 3D scene
  };
  let cur = document.documentElement.getAttribute("data-palette") === "b" ? "b" : "a";
  apply(cur); // sync aria-pressed with whatever the head script set
  btn.addEventListener("click", () => { cur = cur === "a" ? "b" : "a"; apply(cur); });
}

const refresh = () => ScrollTrigger?.refresh();

/* ------------------------------ BOOT ------------------------------ */
window.BC = { reveal, magnetic, refresh, media: hydrateMedia, split, scramble, initKinetics, get lenis() { return lenis; }, get velocity() { return velocity; } };
/* preloader — dismiss on load (cap 2.2s); the CSS dead-man's switch at 3s is
   the guarantee, this is just the fast path */
(function () {
  const el = document.getElementById("loader");
  if (!el) return;
  const done = () => { el.classList.add("is-done"); setTimeout(() => { try { el.remove(); } catch (e) {} }, 900); };
  if (document.readyState === "complete") setTimeout(done, 400);
  else window.addEventListener("load", () => setTimeout(done, 400), { once: true });
  setTimeout(done, 2200);
})();

mountNav();
initPaletteToggle();
mountFooter();
initSmooth();
initCursor();
hydrateMedia(document);   // hydrate menu/footer bg video etc.
magnetic(document);

export const BC = window.BC;
