/* =====================================================================
   ÉTATS-UNIS · zonespage.js — "Les 3 zones" subpage
   Each zone in depth: the real photo, the REAL rentrée-2026 planning of its
   salle (posters from the club), its verified staff (names read off the
   posters — never invented, never crossed with a wrong photo), and its specs.
   Rendered from ZONES (data.js) so the team ports it 1:1 to Astro/Next.
   ===================================================================== */
import { ZONES } from "./data.js?v=3d8";
import { initSectors } from "./zones.js?v=3d8";

const $ = (s, r = document) => r.querySelector(s);
const ROMAN = ["I", "II", "III"];

/* Per-zone truth read off the rentrée-2026 posters (Downloads/planning-salle-
   etats-unis-*.png). Staff names are exactly the poster legends. */
const ZONE_EXTRA = {
  percussion: {
    planning: "/assets/img/eu/planning-mma-2026.png",
    planningLabel: "Planning salle MMA · rentrée 2026",
    planningAlt: "Planning 2026-2027 de la salle MMA États-Unis : jiu-jitsu brésilien, grappling, asso MMA et MMA enfants 10/16 ans, avec créneaux d'accès libre du lundi au samedi.",
    staff: "Zouir",
    cours: "JJB · Grappling · Asso MMA · MMA enfants 10/16 ans",
  },
  ring: {
    planning: "/assets/img/eu/planning-boxe-2026.png",
    planningLabel: "Planning salle boxe · rentrée 2026",
    planningAlt: "Planning 2026-2027 de la salle boxe États-Unis : boxe anglaise et pieds-poings midi et soir, enfants dès 3 ans le mercredi et le samedi, accès libre en journée.",
    staff: "Renaud · David · Valentin Guth",
    cours: "Anglaise · Pieds-poings · Enfants 3/6 · 7/11 · 12/16 ans",
  },
  prepa: {
    planning: "/assets/img/eu/planning-fitness-2026.png",
    planningLabel: "Planning boxing fitness · rentrée 2026",
    planningAlt: "Planning 2026-2027 boxing fitness États-Unis : Hyrox, boxing HIIT, cross-training et Lady Punch, midi et soir, avec accès libre.",
    staff: "Clément · David · Valentin Guth · Yannis Chouet",
    cours: "Hyrox · Boxing HIIT · Cross-training · Lady Punch",
  },
};

function renderZones() {
  $("#zones-detail").innerHTML = ZONES.map((z, i) => {
    const x = ZONE_EXTRA[z.key] || {};
    return `
    <section class="section zp-zone" data-sector="${z.name}" aria-label="Zone ${ROMAN[i]} — ${z.name}">
      <span class="zp-ghost" aria-hidden="true">${ROMAN[i]}</span>
      <div class="wrap zp-grid">
        <div class="zp-info">
          <span class="eyebrow">Zone ${ROMAN[i]} / ${ROMAN[ZONES.length - 1]} · ${z.surface}</span>
          <h2 class="display zp-title">${z.name}</h2>
          <p class="zone__line">${z.line}</p>
          <p class="muted">${z.desc}</p>
          <div class="zone__specs">${z.specs.map((s) => `<span>${s}</span>`).join("")}</div>
          ${x.cours ? `<p class="zp-staff"><b>Les cours</b> ${x.cours}</p>` : ""}
          ${x.staff ? `<p class="zp-staff"><b>Encadrement</b> ${x.staff}</p>` : ""}
          <a class="btn btn--primary" data-magnetic href="/contact/"><span>Essayer cette zone · 10€</span></a>
        </div>
        <div class="zp-media">
          <div class="media zp-photo" data-img="${z.img}" data-label="${z.name}"></div>
          ${x.planning ? `
          <a class="zp-planning" href="${x.planning}" target="_blank" rel="noopener" aria-label="Ouvrir le ${x.planningLabel} en grand format">
            <img src="${x.planning}" alt="${x.planningAlt}" loading="lazy" decoding="async" />
            <span class="zp-planning__tag">${x.planningLabel}</span>
          </a>` : ""}
        </div>
      </div>
    </section>`;
  }).join("");
}

function boot() {
  renderZones();
  window.BC.media(document);
  window.BC.reveal(document);
  window.BC.magnetic(document);
  initSectors();
  const start = () => { window.BC.refresh(); window.BC.initKinetics(); };
  window.addEventListener("load", start);
  setTimeout(start, 500);
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();
