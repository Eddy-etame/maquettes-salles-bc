/* =====================================================================
   MINIMES · home.js (v2) — kinetic accueil
   ===================================================================== */
import { STATS, DISCIPLINES, CHAMPIONS, VALUES, AUDIENCES, TARIFS, MEDIA } from "./data.js";
import { initHero } from "./hero.js";

const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s);

/* --------------------------- RENDER ------------------------------- */
function renderStats() {
  $("#stats").innerHTML = STATS.map(
    (s) => `<div class="stat" data-reveal>
      <div class="stat__v"><span data-count="${s.v}" ${s.raw ? "data-raw" : ""}>${s.raw ? s.v : 0}</span>${s.suffix ? `<sup>${s.suffix}</sup>` : ""}</div>
      <div class="stat__l">${s.l}</div>
    </div>`
  ).join("");
}
function renderMarquee() {
  const items = ["Boxe Anglaise", "Le Noble Art", "Boxe Éducative", "Lady Punch", "Pattes d'ours", "Le Berceau", "3 Rings", "Champions"];
  const row = items.map((i) => `<span>${i}</span>`).join("");
  const t = $("#marquee"); t.innerHTML = row + row; t.dataset.speed = "1.3";
}
function renderChampions() {
  $("#champions-track").innerHTML = CHAMPIONS.map(
    (c, i) => `<article class="champ">
      <div class="champ__media"><div class="media" data-img="${c.img}" data-label=""></div></div>
      <span class="champ__big" aria-hidden="true">${c.initials}</span>
      <span class="champ__num">N°${String(i + 1).padStart(2, "0")}</span>
      <span class="champ__years">${c.years}</span>
      <div class="champ__info">
        <p class="champ__record">${c.record}</p>
        <h3 class="champ__name">${c.name}</h3>
        <p class="champ__note">${c.note}</p>
      </div>
    </article>`
  ).join("");
}
function renderDisciplines() {
  $("#disciplines").innerHTML = DISCIPLINES.map(
    (d, i) => `<div class="disc" data-key="${d.key}" tabindex="0">
      <div class="disc__bg media" data-img="${d.img}" aria-hidden="true"></div>
      <div class="disc__row">
        <span class="disc__idx">${String(i + 1).padStart(2, "0")}</span>
        <span class="disc__name">${d.name}</span>
        <span class="disc__tag">${d.tag}</span>
      </div>
      <p class="disc__desc">${d.desc}</p>
    </div>`
  ).join("");
}
function renderValues() {
  $("#values").innerHTML = VALUES.map(
    (v) => `<div class="value"><span class="value__n">${v.n}</span><div><h3 class="value__t">${v.t}</h3><p class="value__d">${v.d}</p></div></div>`
  ).join("");
}
function renderAudiences() {
  $("#audiences").innerHTML = AUDIENCES.map(
    (a) => `<div class="aud__card"><h3 class="aud__t">${a.t}</h3><p class="aud__d">${a.d}</p></div>`
  ).join("");
}
function renderTarifs() {
  $("#tarifs").innerHTML = TARIFS.map(
    (t) => `<article class="tarif ${t.highlight ? "tarif--hot" : ""}">
      ${t.highlight ? '<span class="tarif__badge">Populaire</span>' : ""}
      <h3 class="tarif__name">${t.name}</h3>
      <div class="tarif__price">${t.price}<small> ${t.period}</small></div>
      <p class="tarif__feature">${t.feature}</p>
      <ul class="tarif__items">${t.items.map((i) => `<li>${i}</li>`).join("")}</ul>
      <a class="btn ${t.highlight ? "btn--primary" : "btn--ghost"}" data-magnetic href="${t.href}"><span>${t.cta}</span></a>
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
        gsap.to(o, { v: end, duration: 1.5, ease: "power2.out", onUpdate: () => (el.textContent = Math.round(o.v)) });
        const lbl = el.closest(".stat")?.querySelector(".stat__l");
        if (lbl) window.BC.scramble(lbl, { dur: 600 });
      },
    });
  });
}

function championsWall() {
  const track = $("#champions-track");
  if (!track) return;
  if (window.matchMedia("(max-width: 760px)").matches || reduce) {
    document.querySelector(".wall").style.cssText = "overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch";
    track.querySelectorAll(".champ").forEach((c) => (c.style.scrollSnapAlign = "start"));
    return;
  }
  const dist = () => track.scrollWidth - window.innerWidth + 80;
  gsap.to(track, {
    x: () => -dist(), ease: "none",
    scrollTrigger: { trigger: ".champions", start: "top top", end: () => "+=" + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 },
  });
}

/* ------------------------------ BOOT ------------------------------ */
function boot() {
  renderStats(); renderMarquee(); renderChampions();
  renderDisciplines(); renderValues(); renderAudiences(); renderTarifs();

  window.BC.media(document);
  initHero();
  window.BC.reveal(document);
  window.BC.magnetic(document);

  countUp();
  championsWall();

  const start = () => { window.BC.refresh(); window.BC.initKinetics(); };
  window.addEventListener("load", start);
  setTimeout(start, 500);
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();
