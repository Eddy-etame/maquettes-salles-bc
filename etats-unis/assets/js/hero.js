/* =====================================================================
   ÉTATS-UNIS · "LE COLOSSE" · hero.js — the monument title card
   No A/B pochoir toggle (that is now Minimes' signature). ONE engraved hero:
   the hangar graded dark behind a blueprint grid, "LE COLOSSE" cast in the
   active metal (bronze/steel), a dimension line stating 1 200 m², and a live
   Toulouse clock. The letters rise like an inscription being carved.
   ===================================================================== */
const gsap = window.gsap;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initHero() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  liveClock();
  intro(hero);
}

function liveClock() {
  const el = document.getElementById("hero-time");
  if (!el) return;
  const fmt = () => { try { el.textContent = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Europe/Paris" }).format(new Date()); } catch (e) {} };
  fmt(); setInterval(fmt, 1000);
}

function intro(hero) {
  const fades = hero.querySelectorAll("[data-reveal]");
  fades.forEach((el) => (el.dataset.revBound = "1"));   // hero owns these, not the global reveal()
  const chars = [];
  hero.querySelectorAll("[data-split]").forEach((w) => window.BC.split(w).forEach((c) => chars.push(c)));
  if (reduce) return;

  gsap.set(chars, { yPercent: 115, opacity: 0 });
  gsap.set(fades, { opacity: 0, y: 26 });
  gsap.set(".hero__src", { scale: 1.16 });
  gsap.set(".hero__dim-bar", { scaleX: 0, transformOrigin: "left center" });

  gsap.timeline({ delay: 0.15, defaults: { ease: "power3.out" } })
    .to(".hero__src", { scale: 1, duration: 2.6, ease: "power2.out" }, 0)
    .to(chars, { yPercent: 0, opacity: 1, duration: 1.1, ease: "power4.out", stagger: 0.045 }, 0.3)
    .to(".hero__dim-bar", { scaleX: 1, duration: 1.0, ease: "power3.inOut", stagger: 0.05 }, 0.9)
    .to(fades, { opacity: 1, y: 0, duration: 0.85, stagger: 0.09 }, 0.95);

  // Legibility safety net: if the rAF ticker ever stalls (throttled tab,
  // degraded webview, GSAP CDN hiccup), the hero must still be readable.
  // setTimeout fires independently of rAF — force the final, visible state.
  setTimeout(() => {
    chars.forEach((c) => { c.style.opacity = "1"; c.style.transform = "none"; });
    fades.forEach((f) => { f.style.opacity = "1"; f.style.transform = "none"; });
    hero.querySelectorAll(".hero__dim-bar").forEach((b) => (b.style.transform = "none"));
  }, 3000);

  // the hangar drifts slightly as you leave — a slow, heavy camera
  gsap.to(".hero__stage", { yPercent: 12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
}
