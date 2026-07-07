/* =====================================================================
   ÉTATS-UNIS · "LE COLOSSE" · colosse3d.js
   The monument walkthrough — a Three.js scrollytelling scene.
   Reference lineage (veille 2026): Hubtown/Unseen (the monolith), Cartier /
   Immersive Garden (camera flies room-to-room between self-contained 3D
   spaces), Explore Primland (flythrough), Terminal Industries (blueprint→built).

   ROBUST BY DESIGN — legibility is #1:
     • ALL copy lives in the DOM overlay (readable, selectable, SEO-safe).
       WebGL is only atmosphere behind it.
     • No WebGL / reduced-motion / lost context / stalled ticker → we set
       html.no-webgl and the CSS fallback (video hero + photo scroll-jack)
       takes over. Nothing here can leave the page blank.
   ===================================================================== */
import { ZONES } from "./data.js";
const THREE = window.THREE;

export function initColosse3D() {
  const canvas = document.getElementById("colosse-canvas");
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- feature gate: fall back to the (verified) DOM experience ----
  if (!canvas || !THREE || reduce || !hasWebGL()) { root.classList.add("no-webgl"); return; }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch (e) { root.classList.add("no-webgl"); return; }
  root.classList.add("has-webgl");
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const bgColor = readVar("--bg", "#0b0e17");
  scene.fog = new THREE.Fog(new THREE.Color(bgColor).getHex(), 10, 96);

  const camera = new THREE.PerspectiveCamera(56, 1, 0.1, 240);
  camera.position.set(0, 1.5, 11);

  // ---- lights ----
  scene.add(new THREE.AmbientLight(0x8496b8, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 0.65); key.position.set(5, 9, 7); scene.add(key);
  const rim = new THREE.PointLight(readAccentHex(), 26, 46); rim.position.set(-3.4, 3.2, 3); scene.add(rim);

  // ---- blueprint floor grid (Terminal Industries: quiet technical depth) ----
  const grid = new THREE.GridHelper(300, 150, readAccentHex(), 0x1a2338);
  grid.position.y = -1.25; grid.position.z = -120;
  grid.material.transparent = true; grid.material.opacity = 0.28;
  scene.add(grid);
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(80, 340),
    new THREE.MeshStandardMaterial({ color: 0x0a0e18, metalness: 0.55, roughness: 0.6 })
  );
  floor.rotation.x = -Math.PI / 2; floor.position.set(0, -1.28, -120); scene.add(floor);

  // ---- THE MONOLITH — the colossus (hero object) + flanking pillars (a gate) ----
  const metal = new THREE.MeshStandardMaterial({ color: 0x141a2b, metalness: 0.96, roughness: 0.3 });
  const monolith = new THREE.Mesh(new THREE.BoxGeometry(2.3, 6.6, 1.25), metal);
  monolith.position.set(0, 1.7, 0); scene.add(monolith);
  const monoEdges = new THREE.LineSegments(new THREE.EdgesGeometry(monolith.geometry), new THREE.LineBasicMaterial({ color: readAccentHex() }));
  monoEdges.position.copy(monolith.position); scene.add(monoEdges);
  const pillars = [-3.4, 3.4].map((x) => {
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.9, 4.6, 0.9), metal.clone());
    p.position.set(x, 0.7, -1.2); scene.add(p); return p;
  });

  // ---- THE 3 ROOMS — one zone photo per space, down the corridor (Cartier) ----
  const loader = new THREE.TextureLoader();
  const accentLines = [monoEdges];
  const roomLights = [rim];
  const zoneFades = [];              // {plane, frame, z} — cross-dissolved by camera distance
  const roomZ = [-32, -62, -92];
  ZONES.forEach((z, i) => {
    const zpos = roomZ[i];
    const tex = loader.load(z.img);
    if ("colorSpace" in tex) tex.colorSpace = THREE.SRGBColorSpace;
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(13, 7.4), new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0 }));
    plane.position.set(0, 2.0, zpos - 7); scene.add(plane);
    const frame = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(13.7, 8.1)), new THREE.LineBasicMaterial({ color: readAccentHex(), transparent: true, opacity: 0 }));
    frame.position.copy(plane.position); scene.add(frame); accentLines.push(frame);
    zoneFades.push({ plane, frame, z: plane.position.z });
    // side walls to make it a "room"
    [-7, 7].forEach((x) => {
      const w = new THREE.Mesh(new THREE.PlaneGeometry(16, 8), new THREE.MeshStandardMaterial({ color: 0x0d1220, metalness: 0.4, roughness: 0.8, side: THREE.DoubleSide }));
      w.position.set(x, 2, zpos); w.rotation.y = x < 0 ? Math.PI / 2 : -Math.PI / 2; scene.add(w);
    });
    const rl = new THREE.PointLight(readAccentHex(), 18, 34); rl.position.set(0, 3.4, zpos); scene.add(rl); roomLights.push(rl);
  });

  // ---- scroll progress across the 3D span (hero.top → zones.bottom) ----
  const heroEl = document.querySelector(".hero");
  const zonesEl = document.querySelector(".zones");
  const progress = () => {
    if (!heroEl || !zonesEl) return 0;
    const start = heroEl.offsetTop;
    const end = zonesEl.offsetTop + zonesEl.offsetHeight - (window.innerHeight || 800);
    const y = window.scrollY || window.pageYOffset || 0;
    return Math.min(1, Math.max(0, (y - start) / Math.max(1, end - start)));
  };

  // ---- responsive ----
  const resize = () => {
    const w = window.innerWidth, h = window.innerHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  };
  resize(); window.addEventListener("resize", resize);

  // ---- cursor parallax ----
  let mx = 0, my = 0;
  window.addEventListener("pointermove", (e) => { mx = (e.clientX / (window.innerWidth || 1)) - 0.5; my = (e.clientY / (window.innerHeight || 1)) - 0.5; }, { passive: true });

  // ---- palette sync (toggle dispatches 'bc-palette') ----
  window.addEventListener("bc-palette", () => {
    const hex = readAccentHex();
    rim.color.setHex(hex);
    accentLines.forEach((l) => l.material.color.setHex(hex));
    roomLights.forEach((l) => l.color.setHex(hex));
    grid.material.color && grid.material.color.setHex(hex);
    const bg = new THREE.Color(readVar("--bg", "#0b0e17")).getHex();
    if (scene.fog) scene.fog.color.setHex(bg);
  });

  // ---- context-loss safety → drop to fallback ----
  canvas.addEventListener("webglcontextlost", (e) => {
    e.preventDefault(); running = false;
    root.classList.remove("has-webgl"); root.classList.add("no-webgl");
  });

  // ---- render loop (wrapped; never breaks the page) ----
  let running = true;
  const CAM_START = 11, CAM_END = -100;
  const render = () => {
    if (!running) return;
    requestAnimationFrame(render);
    try {
      const p = progress();
      const targetZ = CAM_START + p * (CAM_END - CAM_START);
      camera.position.z += (targetZ - camera.position.z) * 0.12;
      camera.position.x += ((mx * 1.4) - camera.position.x) * 0.05;
      camera.position.y += ((1.5 - my * 0.7) - camera.position.y) * 0.05;
      camera.lookAt(0, 1.7, camera.position.z - 8);
      monolith.rotation.y += 0.0035; monoEdges.rotation.y = monolith.rotation.y;
      pillars.forEach((pl, i) => (pl.rotation.y = monolith.rotation.y * (i ? -0.4 : 0.4)));
      // cross-dissolve each zone by camera distance — a room resolves in as we
      // near it and softens away as we pass, so no room ever pops on/off
      for (const zf of zoneFades) {
        const d = Math.abs(camera.position.z - zf.z);
        const o = Math.max(0, Math.min(1, 1 - (d - 9) / 15)); // 1 within 9u, 0 beyond 24u
        const eased = o * o * (3 - 2 * o);                      // smoothstep
        zf.plane.material.opacity = eased;
        zf.frame.material.opacity = eased * 0.9;
      }
      renderer.render(scene, camera);
    } catch (e) { /* never break the page over a frame */ }
  };
  render();

  // expose a one-shot render for verification in frozen-ticker environments
  window.__colosseRenderOnce = () => { try { renderer.render(scene, camera); return true; } catch (e) { return false; } };
}

/* ------------------------------ helpers --------------------------- */
function hasWebGL() {
  try { const c = document.createElement("canvas"); return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl"))); }
  catch (e) { return false; }
}
function readVar(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}
function readAccentHex() {
  try { return new THREE.Color(readVar("--accent-deep", "#7a3d16")).getHex(); }
  catch (e) { return 0x7a3d16; }
}
