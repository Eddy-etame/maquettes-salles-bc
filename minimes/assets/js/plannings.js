/* =====================================================================
   MINIMES · plannings.js — "Le planning" subpage choreography
   The content is the REAL rentrée-2026 poster (assets/img/bc/planning-2026.png,
   source: club). Nothing to render from data — this module only boots the
   shared engine (reveals, media, magnetic, kinetics) for the page.
   ===================================================================== */
function boot() {
  window.BC.media(document);
  window.BC.reveal(document);
  window.BC.magnetic(document);
  const start = () => { window.BC.refresh(); window.BC.initKinetics(); };
  window.addEventListener("load", start);
  setTimeout(start, 500);
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();
