/* =====================================================================
   SAINT-CYPRIEN · "LE NEUF" · home.js
   Signature = LE CONFIGURATEUR : you pick your discipline like configuring
   a product — the sheet (photo, coach, days, level) swaps with a soft
   spring. Everything rendered from data.js (real planning rentrée 2026).
   ===================================================================== */
import { STATS, DISCIPLINES, TARIFS } from "./data.js?v=5";

const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s);
const nf = new Intl.NumberFormat("fr-FR");

/* --------------------------- RENDER ------------------------------- */
function renderStats() {
  $("#stats").innerHTML = STATS.map(
    (s) => `<div class="stat">
      <div class="stat__v"><span data-count="${s.v}" ${s.raw ? "data-raw" : ""}>${s.raw ? s.v : 0}</span>${s.suffix ? `<sup>${s.suffix.trim()}</sup>` : ""}</div>
      <div class="stat__l">${s.l}</div>
    </div>`
  ).join("");
}
function renderTicker() {
  const items = ["Ouvert août 2025", "1 200 m² neufs", "Rive gauche", "Anglaise", "Thaï · K1", "Grappling", "Hyrox", "Lady Punch", "Dès 3 ans", "Métro A · 4 min"];
  const row = items.map((i) => `<span>${i}</span>`).join("");
  const t = $("#marquee"); t.innerHTML = row + row; t.dataset.speed = "0.6";
}

/* LE CONFIGURATEUR — big list + lit sheet + FULL-BLEED backdrop that follows */
function renderConfig() {
  const list = $("#config-list"), mediaBox = $("#config-media"), body = $("#config-body");
  const bg = $("#config-bg");
  if (!list) return;
  if (bg) bg.innerHTML = DISCIPLINES.map((d, i) => `<div class="media ${i === 0 ? "is-active" : ""}" data-img="${d.img}" data-label=""></div>`).join("");
  list.innerHTML = DISCIPLINES.map((d, i) => `
    <button class="cfg ${i === 0 ? "is-active" : ""}" type="button" role="tab" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" aria-controls="config-panel" id="cfg-${d.key}" data-i="${i}">
      <span class="cfg__n">${String(i + 1).padStart(2, "0")}</span>
      <span class="cfg__name">${d.name}</span>
      <span class="cfg__tag">${d.tag}</span>
    </button>`).join("");
  mediaBox.innerHTML = DISCIPLINES.map((d, i) => `<div class="media ${i === 0 ? "is-active" : ""}" data-img="${d.img}" data-label="${d.name}"></div>`).join("");
  const sheet = (d) => `
    <div class="config__facts">
      <span><b>Coach</b> ${d.coach}</span>
      <span><b>Jours</b> ${d.jours}</span>
      <span><b>Niveau</b> ${d.niveau}</span>
    </div>
    <p class="config__desc">${d.desc}</p>
    <div class="config__cta">
      <a class="btn btn--primary" data-magnetic href="/contact/"><span>Essayer · 10€</span></a>
      <a class="btn" data-magnetic href="#plan"><span>Voir le planning</span></a>
    </div>`;
  body.innerHTML = sheet(DISCIPLINES[0]);
  DISCIPLINES.forEach((d) => { const im = new Image(); im.src = d.img; }); // warm cache

  let curr = 0;
  const select = (i) => {
    if (i === curr) return;
    curr = i;
    const d = DISCIPLINES[i];
    [...list.children].forEach((b, k) => { b.classList.toggle("is-active", k === i); b.setAttribute("aria-selected", String(k === i)); b.setAttribute("tabindex", k === i ? "0" : "-1"); });
    const panel = document.getElementById("config-panel");
    if (panel) panel.setAttribute("aria-labelledby", `cfg-${d.key}`);
    [...mediaBox.children].forEach((m, k) => m.classList.toggle("is-active", k === i));
    if (bg) [...bg.children].forEach((m, k) => m.classList.toggle("is-active", k === i));
    body.classList.add("is-swapping");
    setTimeout(() => {
      body.innerHTML = sheet(d);
      window.BC.magnetic(body);
      body.classList.remove("is-swapping");
    }, reduce ? 0 : 180);
  };
  list.addEventListener("click", (e) => {
    const b = e.target.closest(".cfg");
    if (b) select(+b.dataset.i);
  });
  list.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const next = (curr + (e.key === "ArrowDown" ? 1 : DISCIPLINES.length - 1)) % DISCIPLINES.length;
    select(next);
    list.children[next].focus();
  });
}

function renderTarifs() {
  $("#tarifs").innerHTML = TARIFS.map(
    (t) => `<article class="tarif ${t.highlight ? "tarif--hot" : ""}">
      ${t.highlight ? '<span class="tarif__badge">Le + pris</span>' : ""}
      <h3 class="tarif__name">${t.name}</h3>
      <div class="tarif__price">${t.price}<small> ${t.period}</small></div>
      <p class="tarif__feature">${t.feature}</p>
      <ul class="tarif__items">${t.items.map((i) => `<li>${i}</li>`).join("")}</ul>
      <a class="btn ${t.highlight ? "" : "btn--primary"}" data-magnetic href="${t.href}"><span>${t.cta}</span></a>
    </article>`
  ).join("");
}

/* ------------------------- CHOREOGRAPHY --------------------------- */
function countUp() {
  document.querySelectorAll("[data-count]").forEach((el) => {
    if (el.hasAttribute("data-raw")) return;
    const end = +el.dataset.count;
    ScrollTrigger.create({
      trigger: el, start: "top 92%", once: true,
      onEnter: () => {
        const o = { v: 0 };
        gsap.to(o, { v: end, duration: 1.5, ease: "power2.out", onUpdate: () => (el.textContent = nf.format(Math.round(o.v))) });
      },
    });
  });
}

/* THE SPOTLIGHT — a soft light that follows the cursor across the hero.
   Light as the object: it brightens whatever it passes. rAF-throttled. */
function heroSpot() {
  if (reduce || window.matchMedia("(hover: none)").matches) return;
  const hero = document.querySelector(".hero"), spot = $(".hero__spot");
  if (!hero || !spot) return;
  let raf = 0, e = null, first = true;
  const apply = () => {
    raf = 0; if (!e) return;
    const r = hero.getBoundingClientRect();
    spot.style.setProperty("--sx", (((e.clientX - r.left) / r.width) * 100).toFixed(1) + "%");
    spot.style.setProperty("--sy", (((e.clientY - r.top) / r.height) * 100).toFixed(1) + "%");
  };
  hero.addEventListener("pointermove", (ev) => {
    e = ev; hero.classList.add("is-lit");
    // first contact positions the light synchronously — the spot must never
    // glow at a stale default while rAF wakes up (or never fires)
    if (first) { first = false; apply(); return; }
    if (!raf) raf = requestAnimationFrame(apply);
  }, { passive: true });
  hero.addEventListener("pointerleave", () => hero.classList.remove("is-lit"));
}

/* touch devices: cards lift as they cross the viewport (no hover there) */
function touchLife() {
  if (!window.matchMedia("(hover: none)").matches || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (es) => es.forEach((e) => e.target.classList.toggle("is-inview", e.isIntersecting && e.intersectionRatio >= 0.55)),
    { threshold: [0, 0.55, 1] }
  );
  document.querySelectorAll(".tarif, .cfg").forEach((el) => io.observe(el));
}

/* ------------------------------ BOOT ------------------------------ */
function boot() {
  renderStats(); renderTicker(); renderConfig(); renderTarifs();

  window.BC.media(document);
  window.BC.reveal(document);
  window.BC.magnetic(document);
  countUp();
  heroSpot();
  touchLife();

  const start = () => { window.BC.refresh(); window.BC.initKinetics(); };
  window.addEventListener("load", start);
  setTimeout(start, 500);
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();
