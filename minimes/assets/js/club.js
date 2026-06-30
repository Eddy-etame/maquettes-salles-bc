/* =====================================================================
   MINIMES · club.js — "Le club" subpage rendering + choreography
   ===================================================================== */
import { SALLE, TIMELINE, SPECS, NETWORK, FAQ } from "./data.js";

const gsap = window.gsap;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s);

function renderTimeline() {
  $("#timeline").innerHTML = TIMELINE.map(
    (t) => `<li class="tl" data-reveal>
      <span class="tl__y">${t.y}</span>
      <div><h3 class="tl__t">${t.t}</h3><p class="tl__d">${t.d}</p></div>
    </li>`
  ).join("");
}

function renderSpecs() {
  $("#specs").innerHTML = SPECS.map(
    (s) => `<div class="spec"><span class="spec__l">${s.l}</span><span class="spec__v">${s.v}</span></div>`
  ).join("");
}

function renderContact() {
  const a = $("#addr");
  a.textContent = SALLE.address.full;
  a.href = SALLE.mapsLink;
  $("#access").innerHTML = SALLE.access.map((x) => `<li>${x}</li>`).join("");
  $("#hours").innerHTML = SALLE.hoursData.map((h) => `${h.d} · ${h.h}`).join("<br>");
  const p = $("#phone");
  p.textContent = SALLE.phone; p.href = "tel:" + SALLE.phoneHref;
  $("#map").src = SALLE.mapsUrl;
}

function renderFaq() {
  $("#faq").innerHTML = FAQ.map(
    (f) => `<div class="faq__item">
      <button class="faq__q" aria-expanded="false"><span>${f.q}</span><span class="faq__sign" aria-hidden="true"></span></button>
      <div class="faq__a"><p>${f.a}</p></div>
    </div>`
  ).join("");
  $("#faq").querySelectorAll(".faq__item").forEach((item) => {
    const q = item.querySelector(".faq__q");
    const a = item.querySelector(".faq__a");
    q.addEventListener("click", () => {
      const open = item.classList.toggle("is-open");
      q.setAttribute("aria-expanded", String(open));
      a.style.maxHeight = open ? a.scrollHeight + "px" : "0px";
    });
  });
}

function renderNetwork() {
  $("#network").innerHTML = NETWORK.map(
    (n) => `<a class="net" href="${n.url}" target="_blank" rel="noopener">
      <span class="net__tag">${n.tag}</span>
      <div>
        <h3 class="net__name">${n.name}${n.flagship ? '<span class="flag">★ vaisseau amiral</span>' : ""}</h3>
        <p class="net__feat">${n.feat}</p>
      </div>
      <span class="net__go">Découvrir <span aria-hidden="true">↗</span></span>
    </a>`
  ).join("");
}

function headIntro() {
  document.querySelectorAll(".club-head [data-reveal], .club-head .reveal-mask").forEach((el) => (el.dataset.revBound = "1"));
  if (reduce) return;
  const masks = document.querySelectorAll(".club-head .reveal-mask > span");
  const fades = document.querySelectorAll(".club-head [data-reveal]");
  gsap.set(masks, { yPercent: 110, opacity: 0 });
  gsap.set(fades, { opacity: 0, y: 28 });
  gsap.set(".club-head__media", { scale: 1.18, filter: "brightness(.3)" });
  gsap.timeline({ delay: 0.15, defaults: { ease: "power3.out" } })
    .to(".club-head__media", { scale: 1, filter: "brightness(1)", duration: 2, ease: "power2.out" }, 0)
    .to(masks, { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: "power4.out" }, 0.3)
    .to(fades, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.7);
  gsap.to(".club-head__media", { yPercent: 14, ease: "none", scrollTrigger: { trigger: ".club-head", start: "top top", end: "bottom top", scrub: true } });
}

function ambianceParallax() {
  if (reduce) return;
  gsap.to(".ambiance__media", { yPercent: 16, ease: "none", scrollTrigger: { trigger: ".ambiance", start: "top bottom", end: "bottom top", scrub: true } });
}

function boot() {
  renderTimeline(); renderSpecs(); renderContact(); renderFaq(); renderNetwork();
  window.BC.media(document);
  headIntro();
  window.BC.reveal(document);
  window.BC.magnetic(document);
  ambianceParallax();
  const start = () => { window.BC.refresh(); window.BC.initKinetics(); };
  window.addEventListener("load", start);
  setTimeout(start, 500);
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();
