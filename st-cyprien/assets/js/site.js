/* =====================================================================
   SAINT-CYPRIEN · site.js — chrome + motion engine (light edition)
   window.BC = { reveal, magnetic, refresh, media, split, scramble, lenis }
   Same proven engine as the other salles, with the Neuf's restraint:
   no custom cursor, no grain — precision instead of texture.
   ===================================================================== */
import { NAV, LINKS, SALLE } from "./data.js";

const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (gsap && ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
if (!gsap) document.documentElement.classList.remove("fx");

let lenis = null;
let velocity = 0;

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
      <a class="nav__brand" href="/" aria-label="Boxing Center Saint-Cyprien — accueil">
        <img class="nav__logo" src="/assets/img/logo-white.png" alt="Boxing Center" width="3542" height="1655" />
        <span class="nav__salle">Saint-Cyprien</span>
      </a>
      <div class="nav__links">${links}</div>
      <div class="nav__right">
        <a class="btn btn--primary nav__cta" data-magnetic href="${LINKS.essai}"><span>Essai · 10€</span></a>
        <button class="burger" id="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </nav>`;

  const menuLinks = NAV.map(
    (n, i) => `<a class="menu__link" href="${n.href}"><span class="n">${String(i + 1).padStart(2, "0")}</span>${n.label}</a>`
  ).join("");
  document.getElementById("drawer").innerHTML = `
    <div class="menu" id="menu" aria-hidden="true">
      <div class="menu__top">
        <a class="nav__brand" href="/" aria-label="Boxing Center Saint-Cyprien — accueil">
          <img class="nav__logo" src="/assets/img/logo-white.png" alt="Boxing Center" width="3542" height="1655" />
          <span class="nav__salle">Saint-Cyprien</span>
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
    if (gsap && !reduce && open) {
      gsap.fromTo(items, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.65, ease: "power4.out", stagger: 0.05, delay: 0.16 });
    }
  };
  burger.addEventListener("click", () => setOpen(!menu.classList.contains("is-open")));
  document.getElementById("menu-close").addEventListener("click", () => setOpen(false));
  menu.querySelectorAll(".menu__link, .menu__foot a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });

  let last = 0;
  ScrollTrigger?.create({
    start: 0, end: "max",
    onUpdate: (self) => {
      const y = self.scroll();
      nav.classList.toggle("is-scrolled", y > 60);
      if (y > last && y > 380 && !menu.classList.contains("is-open")) nav.classList.add("is-hidden");
      else nav.classList.remove("is-hidden");
      last = y;
    },
  });
}

/* --------------------- FOOTER — la fiche technique ----------------- */
function mountFooter() {
  const cols = [
    { h: "La salle", links: NAV.slice(1, 6) },
    { h: "Le réseau", links: [{ href: LINKS.groupe, label: "Boxing Center ↗" }, { href: "https://www.boxing-center-portet.fr/", label: "Portet ↗" }, { href: LINKS.instagram, label: "Instagram ↗" }, { href: LINKS.facebook, label: "Facebook ↗" }] },
  ];
  const fields = [
    { k: "Établissement", v: "Boxing Center — Saint-Cyprien", wide: true },
    { k: "Ouverture", v: "Août 2025 · salle neuve" },
    { k: "Surface", v: "1 200 m²" },
    { k: "Adresse", v: SALLE.address.full, wide: true },
    { k: "Horaires", v: SALLE.hours },
    { k: "Téléphone", v: `<a href="tel:${SALLE.phoneHref}">${SALLE.phone}</a>` },
    { k: "Accès", v: "Métro A · Saint-Cyprien République" },
    { k: "Fédérations", v: SALLE.federations.join(" · ") },
  ];
  document.getElementById("footer").innerHTML = `
    <footer class="footer">
      <div class="wrap">
        <div class="footer__head">
          <div>
            <span class="eyebrow">La salle neuve t'attend</span>
            <h2 class="display footer__cut">Rive gauche.<br><span class="tint">Tout est prêt.</span></h2>
          </div>
          <a class="btn btn--primary" data-magnetic href="${LINKS.essai}"><span>Réserver l'essai · 10€</span></a>
        </div>
        <div class="fiche" aria-label="Fiche technique de la salle">
          ${fields.map((f) => `<div class="fiche__cell${f.wide ? " fiche__cell--wide" : ""}"><span class="fk">${f.k}</span><span class="fv">${f.v}</span></div>`).join("")}
        </div>
        <div class="footer__links">
          ${cols.map((c) => `<div class="footer__col"><h4>${c.h}</h4>${c.links.map((l) => `<a href="${l.href}">${l.label}</a>`).join("")}</div>`).join("")}
          <div class="footer__col">
            <h4>Suivre</h4>
            <a href="${LINKS.instagram}" target="_blank" rel="noopener">Instagram ↗</a>
            <a href="${LINKS.facebook}" target="_blank" rel="noopener">Facebook ↗</a>
            <a href="${LINKS.boutique}" target="_blank" rel="noopener">Boutique ↗</a>
          </div>
        </div>
        <div class="footer__bottom">
          <span>© ${new Date().getFullYear()} Boxing Center — Maquette Saint-Cyprien</span>
          <span class="footer__stamp">Neuf · ouvert août 2025</span>
        </div>
      </div>
    </footer>`;
}

/* ------------------------------ LENIS ----------------------------- */
function initSmooth() {
  if (reduce || !window.Lenis) return;
  lenis = new window.Lenis({ duration: 1.05, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
  lenis.on("scroll", (e) => { velocity = e.velocity; ScrollTrigger?.update(); });
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ----------------------------- MAGNETIC --------------------------- */
function magnetic(scope = document) {
  if (reduce || window.matchMedia("(hover: none)").matches) return;
  scope.querySelectorAll("[data-magnetic]").forEach((el) => {
    if (el.dataset.magBound) return; el.dataset.magBound = "1";
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.5, ease: "power3.out" });
    });
    el.addEventListener("mouseleave", () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" }));
  });
}

/* ----------------------------- SPLIT / SCRAMBLE -------------------- */
function split(el) {
  if (el.dataset.splitDone) return [...el.querySelectorAll(".char")];
  el.dataset.splitDone = "1";
  const text = el.textContent; el.textContent = "";
  const chars = [];
  [...text].forEach((ch) => { const s = document.createElement("span"); s.className = "char"; s.style.display = "inline-block"; s.textContent = ch === " " ? " " : ch; el.appendChild(s); chars.push(s); });
  return chars;
}
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function scramble(el, opts = {}) {
  if (reduce) return;
  const final = el.dataset.text || el.textContent;
  el.dataset.text = final;
  const dur = opts.dur || 650;
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const p = Math.min(1, (ts - start) / dur);
    const rev = Math.floor(p * final.length);
    let out = "";
    for (let i = 0; i < final.length; i++) out += i < rev || final[i] === " " ? final[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
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
    gsap.to(kids, { yPercent: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.08, scrollTrigger: { trigger: m, start: "top 90%" } });
  });
  scope.querySelectorAll("[data-reveal]").forEach((el) => {
    if (el.dataset.revBound) return; el.dataset.revBound = "1";
    gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%" } });
  });
  scope.querySelectorAll("[data-reveal-group]").forEach((g) => {
    const kids = [...g.children];
    if (g.dataset.revBound || !kids.length) return; g.dataset.revBound = "1";
    gsap.set(kids, { opacity: 0, y: 32 });
    gsap.to(kids, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", stagger: 0.07, scrollTrigger: { trigger: g, start: "top 88%" } });
  });

  // Dead-man net (legibility law): if the ticker froze, force everything readable.
  if (!reveal._net && gsap) {
    reveal._net = true;
    const f0 = gsap.ticker.frame;
    setTimeout(() => {
      if (gsap.ticker.frame !== f0) return;
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
    img.src = el.dataset.img;
    img.alt = el.dataset.label || ""; img.loading = el.hasAttribute("data-eager") ? "eager" : "lazy"; img.decoding = "async";
    el.prepend(img);
  });
}

/* --------------------- VELOCITY: ticker drift --------------------- */
let kineticsOn = false;
function initKinetics() {
  if (reduce || kineticsOn) return; kineticsOn = true;
  const tracks = [...document.querySelectorAll(".marquee__track")].map((t) => {
    const half = t.scrollWidth / 2 || 1;
    return { el: t, half, x: 0, base: parseFloat(t.dataset.speed || "0.6") };
  });
  gsap.ticker.add(() => {
    let smooth = velocity * 0.2;
    tracks.forEach((m) => {
      m.x -= m.base + Math.abs(smooth) * 0.3;
      if (m.x <= -m.half) m.x += m.half;
      m.el.style.transform = `translateX(${m.x}px)`;
    });
    velocity *= 0.9;
  });
}

const refresh = () => ScrollTrigger?.refresh();

/* ------------------------------ BOOT ------------------------------ */
window.BC = { reveal, magnetic, refresh, media: hydrateMedia, split, scramble, initKinetics, get lenis() { return lenis; }, get velocity() { return velocity; } };
mountNav();
mountFooter();
initSmooth();
hydrateMedia(document);
magnetic(document);

export const BC = window.BC;
