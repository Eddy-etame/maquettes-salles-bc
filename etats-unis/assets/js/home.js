/* =====================================================================
   ÉTATS-UNIS · "LE COLOSSE" · home.js — kinetic accueil
   Signature = "Les 3 zones" : the building's real 3×400 m² architecture,
   toured by scroll-jacking. Replaces Minimes' champions/pour-qui sections.
   ===================================================================== */
import { STATS, DISCIPLINES, ZONES, VALUES, COACHES, TARIFS, MEDIA } from "./data.js?v=3d8";
import { initHero } from "./hero.js?v=3d8";
import { initSectors, zoneWhoosh } from "./zones.js?v=3d8"; // versioned: python http.server caches hard
import { initColosse3D } from "./colosse3d.js?v=3d8";

const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s);
const nf = new Intl.NumberFormat("fr-FR"); // 1200 → "1 200"

/* --------------------------- RENDER ------------------------------- */
function renderStats() {
  $("#stats").innerHTML = STATS.map(
    (s) => `<div class="stat" data-reveal>
      <div class="stat__v"><span data-count="${s.v}">0</span>${s.suffix ? `<sup>${s.suffix.trim()}</sup>` : ""}</div>
      <div class="stat__l">${s.l}</div>
    </div>`
  ).join("");
}
function renderMarquee() {
  const items = ["1 200 m²", "3 Zones", "Cage MMA", "Deux Rings", "16 Sacs", "Grappling", "Muay Thaï", "Street Workout", "Le Colosse"];
  const row = items.map((i) => `<span>${i}</span>`).join("");
  const t = $("#marquee"); t.innerHTML = row + row; t.dataset.speed = "1.3";
}

/* LES 3 ZONES — the signature. Each zone = a full-bleed plan-séquence that
   wipes in on scroll; the blueprint rail on the left tracks the active one. */
const ROMAN = ["I", "II", "III", "IV", "V"]; // colosseum numerals — the monument detail
function renderZones() {
  const stage = $("#zones-stage"), rail = $("#zones-rail");
  if (!stage) return;
  stage.innerHTML = ZONES.map((z, i) => `
    <article class="zone ${i === 0 ? "is-active" : ""}" data-i="${i}">
      <div class="zone__media media" data-img="${z.img}" aria-hidden="true"></div>
      <span class="zone__ghost" aria-hidden="true">${ROMAN[i]}</span>
      <div class="zone__body">
        <span class="zone__idx">Zone ${ROMAN[i]} <b>/ ${ROMAN[ZONES.length - 1]}</b> · ${z.surface}</span>
        <h3 class="zone__name">${z.name}</h3>
        <p class="zone__line">${z.line}</p>
        <p class="zone__desc">${z.desc}</p>
        <div class="zone__specs">${z.specs.map((s) => `<span>${s}</span>`).join("")}</div>
      </div>
    </article>`).join("");
  if (rail) rail.innerHTML = ZONES.map((z, i) => `
    <li class="zone__tick ${i === 0 ? "is-active" : ""}" data-i="${i}">
      <span class="zt-n">${ROMAN[i]}</span>
      <span class="zt-name">${z.name}</span>
      <span class="zt-sq">${z.surface}</span>
    </li>`).join("");
  // warm the cache so the next zone photo is instant when it wipes in
  ZONES.forEach((z) => { const im = new Image(); im.src = z.img; });
}

function renderDisciplines() {
  $("#disciplines").innerHTML = DISCIPLINES.map(
    (d, i) => `<article class="disc" data-key="${d.key}" tabindex="0">
      <div class="disc__bg media" data-img="${d.img}" aria-hidden="true"></div>
      <span class="disc__idx">${String(i + 1).padStart(2, "0")}</span>
      <span class="disc__tag">${d.tag}</span>
      <h3 class="disc__name">${d.name}</h3>
      <p class="disc__desc">${d.desc}</p>
    </article>`
  ).join("");
}
function renderValues() {
  $("#values").innerHTML = VALUES.map(
    (v) => `<div class="value"><span class="value__n">${v.n}</span><div><h3 class="value__t">${v.t}</h3><p class="value__d">${v.d}</p></div></div>`
  ).join("");
}
function renderCoaches() {
  const el = $("#coaches");
  if (!el) return;
  el.innerHTML = COACHES.map(
    (c) => `<article class="coach">
      <div class="coach__media media" data-img="${c.img}" aria-hidden="true"></div>
      <span class="coach__role">${c.role}</span>
      <h3 class="coach__name">${c.name}</h3>
      <span class="coach__tag">${c.tag}</span>
      <p class="coach__note">${c.note}</p>
    </article>`
  ).join("");
}
function renderTarifs() {
  $("#tarifs").innerHTML = TARIFS.map(
    (t) => `<article class="tarif ${t.highlight ? "tarif--hot" : ""}">
      ${t.highlight ? '<span class="tarif__badge">Le + pris</span>' : ""}
      <h3 class="tarif__name">${t.name}</h3>
      <div class="tarif__price">${t.price}<small> ${t.period}</small></div>
      <p class="tarif__feature">${t.feature}</p>
      <ul class="tarif__items">${t.items.map((i) => `<li>${i}</li>`).join("")}</ul>
      <a class="btn ${t.highlight ? "btn--primary" : ""}" data-magnetic href="${t.href}"><span>${t.cta}</span></a>
    </article>`
  ).join("");
}

/* ------------------------- CHOREOGRAPHY --------------------------- */
function countUp() {
  document.querySelectorAll("[data-count]").forEach((el) => {
    const end = +el.dataset.count;
    ScrollTrigger.create({
      trigger: el, start: "top 92%", once: true,
      onEnter: () => {
        const o = { v: 0 };
        gsap.to(o, { v: end, duration: 1.6, ease: "power2.out", onUpdate: () => (el.textContent = nf.format(Math.round(o.v))) });
        const stat = el.closest(".stat");
        if (stat) stat.classList.add("is-lit");           // the accent rule draws itself
        const lbl = stat?.querySelector(".stat__l");
        if (lbl) window.BC.scramble(lbl, { dur: 600 });
      },
    });
  });
}

/* Scroll-jacked "Les 3 zones": as you scroll the pinned section, the active
   zone wipes in (percussion → ring → prépa). Live geometry, immune to
   ScrollTrigger pin/refresh bugs; vh read from the 100vh sticky element.
   On mobile the CSS keeps it a compact scroll-jack (never static). */
function zonesScroll() {
  const section = document.querySelector(".zones");
  const stage = $("#zones-stage");
  const sticky = document.querySelector(".zones__sticky");
  if (!section || !stage || !sticky) return;
  const zones = [...stage.querySelectorAll(".zone")];
  const ticks = [...document.querySelectorAll("#zones-rail .zone__tick")];
  const n = zones.length;
  let curr = -1;
  // the rail is a table of contents — click (or Enter/Space) a zone to glide
  // to its hold on the walkthrough. Bound in BOTH modes (3D and fallback).
  const HOLD_P = [0.23, 0.54, 0.85]; // mid-hold points on the retimed camera path
  ticks.forEach((t, i) => {
    t.setAttribute("role", "button");
    t.setAttribute("tabindex", "0");
    t.setAttribute("aria-label", "Aller à la zone " + (ZONES[i] ? ZONES[i].name : i + 1));
    const go = () => {
      const vh = window.innerHeight || 800;
      const zTop = section.offsetTop;
      const zLen = Math.max(1, section.offsetHeight - vh);
      const y = zTop + ((HOLD_P[i] - 0.10) / 0.90) * zLen;
      if (window.BC.lenis) window.BC.lenis.scrollTo(y, { duration: 1.6 });
      else window.scrollTo({ top: y, behavior: "smooth" });
    };
    t.addEventListener("click", go);
    t.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  });

  const update = () => {
    // when the WebGL walkthrough is live it owns the zone state (single source
    // of truth); this DOM scroller only drives the no-webgl fallback
    if (document.documentElement.classList.contains("has-webgl")) return;
    if (getComputedStyle(sticky).position !== "sticky") return;
    const vh = sticky.offsetHeight || window.innerHeight || 800;
    const total = section.offsetHeight - vh;
    if (total <= 0) return;
    const p = Math.min(0.9999, Math.max(0, -section.getBoundingClientRect().top / total));
    const idx = Math.min(n - 1, Math.floor(p * n));
    if (idx !== curr) {
      curr = idx;
      zones.forEach((z, i) => z.classList.toggle("is-active", i === idx));
      ticks.forEach((t, i) => t.classList.toggle("is-active", i === idx));
      if (idx >= 0) zoneWhoosh(idx); // spatial cue per room (opt-in sound)
    }
  };
  if (window.BC && window.BC.lenis) window.BC.lenis.on("scroll", update);
  else window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/* The coach's lamp — the disciplines grid reacts to the cursor as a group:
   a glow sweeps across the cards (bright under the cursor, faint spill on
   the neighbours) and the card you're over tilts toward you. Fine-pointer
   devices only; touch gets touchLife() instead. */
function armory() {
  if (reduce) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const grid = $("#disciplines");
  if (!grid) return;
  const cards = [...grid.querySelectorAll(".disc")];
  let raf = 0, ev = null;
  const apply = () => {
    raf = 0;
    const e = ev; if (!e) return;
    for (const card of cards) {
      const r = card.getBoundingClientRect();
      if (!r.width) continue;
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      const glow = Math.max(0, 1 - Math.hypot(dx, dy) / 620);
      card.style.setProperty("--glow", glow.toFixed(3));
      card.style.setProperty("--gx", (((e.clientX - r.left) / r.width) * 100).toFixed(1) + "%");
      card.style.setProperty("--gy", (((e.clientY - r.top) / r.height) * 100).toFixed(1) + "%");
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      card.style.setProperty("--tx", inside ? (-(dy / r.height) * 7).toFixed(2) + "deg" : "0deg");
      card.style.setProperty("--ty", inside ? ((dx / r.width) * 9).toFixed(2) + "deg" : "0deg");
    }
  };
  grid.addEventListener("mousemove", (e) => { ev = e; if (!raf) raf = requestAnimationFrame(apply); }, { passive: true });
  grid.addEventListener("mouseleave", () => {
    ev = null;
    cards.forEach((c) => { c.style.setProperty("--glow", "0"); c.style.setProperty("--tx", "0deg"); c.style.setProperty("--ty", "0deg"); });
  });
}

/* On touch devices there is no hover, so cards would sit dead. As a card
   crosses ~55% visibility it "switches on" (photo brightens, chevron slides,
   description unfolds) and switches off as it leaves — the whole page breathes
   while you scroll. Desktop keeps its hover states untouched. */
function touchLife() {
  if (!window.matchMedia("(hover: none)").matches) return;
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.classList.toggle("is-inview", e.isIntersecting && e.intersectionRatio >= 0.55)),
    { threshold: [0, 0.55, 1] }
  );
  document.querySelectorAll(".disc, .coach, .value, .tarif, .gallery__cell, .cartouche__cell").forEach((el) => io.observe(el));
}

/* Photos "develop" in as they enter (fromTo always ends visible). */
function mediaReveal() {
  if (reduce) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const img = e.target.querySelector("img");
      if (img) gsap.fromTo(img, { opacity: 0, scale: 1.14 }, { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out", clearProps: "transform,opacity" });
      io.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".gallery__cell, .coach__media").forEach((t) => io.observe(t));
}

/* Multi-depth parallax — the "moving camera" feel. Live geometry. */
function parallax() {
  if (reduce) return;
  const items = [];
  document.querySelectorAll(".gong__bg").forEach((el) => items.push({ el, amt: 55, scale: 1.14 }));
  document.querySelectorAll(".zone__ghost").forEach((el) => items.push({ el, amt: 26, scale: 1 }));
  if (!items.length) return;
  let ticking = false;
  const apply = () => {
    ticking = false;
    const vh = window.innerHeight;
    for (const it of items) {
      const r = it.el.getBoundingClientRect();
      if (r.bottom < -300 || r.top > vh + 300) continue;
      const prog = (r.top + r.height / 2 - vh / 2) / vh;
      const y = (-prog * it.amt).toFixed(1);
      it.el.style.transform = it.scale !== 1 ? `translate3d(0,${y}px,0) scale(${it.scale})` : `translate3d(0,${y}px,0)`;
    }
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(apply); } };
  if (window.BC && window.BC.lenis) window.BC.lenis.on("scroll", onScroll);
  else window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  apply();
}

/* ------------------------------ BOOT ------------------------------ */
function boot() {
  renderStats(); renderMarquee(); renderZones();
  renderDisciplines(); renderValues(); renderCoaches(); renderTarifs();

  window.BC.media(document);
  initHero();
  window.BC.reveal(document);
  window.BC.magnetic(document);

  countUp();
  initColosse3D();   // the monument walkthrough (WebGL); falls back to DOM if unavailable
  zonesScroll();     // keeps the zone text/rail in sync (and is the no-webgl fallback)
  initSectors();
  mediaReveal();
  parallax();
  touchLife();
  armory();

  const start = () => { window.BC.refresh(); window.BC.initKinetics(); };
  window.addEventListener("load", start);
  setTimeout(start, 500);
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();
