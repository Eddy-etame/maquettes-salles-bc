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
import { ZONES } from "./data.js?v=3d8";
import { zoneWhoosh } from "./zones.js?v=3d8"; // spatial cue when a room takes focus
const THREE = window.THREE;

export function initColosse3D() {
  // idempotent: the canvas can only ever host ONE renderer/context
  if (window.__colosseInited) return;
  window.__colosseInited = true;
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

  // ---- environment (PMREM) — the single biggest surface upgrade: without an
  //      env-map, "metal" renders as matte plastic. We bake a tiny procedural
  //      hangar (cool skylight strips overhead + dim side bounce) so the
  //      monolith, pillars and floor pick up real reflections. Kept NEUTRAL
  //      (no accent baked in) so the Bronze/Steel toggle only re-tints lights. ----
  try {
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x05070c);
    const strip = (x, y, z, w, h, c) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: c }));
      m.position.set(x, y, z); m.lookAt(0, 0, 0); envScene.add(m);
    };
    strip(0, 14, 0, 34, 7, 0xcdd9ea);    // skylight band overhead
    strip(-6, 13, -14, 16, 4, 0x9fb2cc); // second, offset — breaks up the highlight
    strip(-17, 3, -5, 9, 3, 0x2c3950);   // dim steel side bounce (left)
    strip(17, 3, 6, 9, 3, 0x2c3950);     // dim steel side bounce (right)
    strip(0, -12, 0, 28, 9, 0x0d1422);   // dark ground return
    scene.environment = pmrem.fromScene(envScene).texture; // no sigma: mips already soften by roughness (sigma>0.04 warns)
    pmrem.dispose();
  } catch (e) { /* env is an enhancement — lights still carry the scene */ }
  window.__colosseEnvOk = !!scene.environment; // verification hook

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
    // polished concrete: high metalness + low roughness → the skylights and
    // room lights streak down the corridor floor
    new THREE.MeshStandardMaterial({ color: 0x0a0e18, metalness: 0.78, roughness: 0.3, envMapIntensity: 0.9 })
  );
  floor.rotation.x = -Math.PI / 2; floor.position.set(0, -1.28, -120); scene.add(floor);

  // ---- THE MONOLITH — the colossus (hero object) + flanking pillars (a gate) ----
  const metal = new THREE.MeshStandardMaterial({ color: 0x141a2b, metalness: 0.96, roughness: 0.2, envMapIntensity: 1.25 });
  // THE COLOSSUS — not a box: a stepped monument (plinth → step → tapering
  // shaft → capital), every block seamed with an accent edge. Reads as cast
  // metal architecture from every angle as it turns.
  const accentLines = [];
  const monument = new THREE.Group();
  [
    { w: 3.8, h: 0.7, d: 2.4, y: -0.90 },            // plinth
    { w: 2.9, h: 0.5, d: 1.8, y: -0.30 },            // step
    { w: 2.15, h: 5.2, d: 1.2, y: 2.55, taper: .82 },// shaft (tapers upward)
    { w: 2.6, h: 0.45, d: 1.55, y: 5.42 },           // capital
  ].forEach((b) => {
    const geo = new THREE.BoxGeometry(b.w, b.h, b.d);
    if (b.taper) { // narrow the shaft's top vertices → monumental taper
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) if (pos.getY(i) > 0) { pos.setX(i, pos.getX(i) * b.taper); pos.setZ(i, pos.getZ(i) * b.taper); }
      pos.needsUpdate = true; geo.computeVertexNormals();
    }
    const m = new THREE.Mesh(geo, metal);
    m.position.y = b.y; monument.add(m);
    const e = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: readAccentHex(), transparent: true, opacity: 0.6 }));
    e.position.y = b.y; monument.add(e); accentLines.push(e);
  });
  monument.position.set(0, 0, 0); scene.add(monument);
  const pillars = [-3.4, 3.4].map((x) => {
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.9, 4.6, 0.9), metal.clone());
    p.position.set(x, 0.7, -1.2); scene.add(p); return p;
  });

  // faked volumetric shafts — an additive cone of accent light falling on the
  // monolith and on each room (the museum-spot look, at zero shader cost)
  const accentCones = [];
  const lightShaft = (z, r, hgt, op) => {
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(r, hgt, 36, 1, true),
      new THREE.MeshBasicMaterial({ color: readAccentHex(), transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide })
    );
    cone.position.set(0, hgt / 2 - 1.2, z);
    scene.add(cone); accentCones.push(cone);
    return cone;
  };
  lightShaft(0, 5.2, 14, 0.055);        // over the colossus

  // ---- THE 3 ROOMS — a photo per space, far apart with dark gaps between.
  //      The camera flies to each until the image FILLS the screen, holds, then
  //      the image dissolves IN PLACE (one edge → into the dark) via a shader,
  //      while the camera keeps moving forward into the dark toward the next. ----
  const loader = new THREE.TextureLoader();
  const roomLights = [rim];
  const zoneFades = [];              // {mat, frame, z}
  const roomZ = [-40, -90, -140];    // far apart → real dark corridor between rooms
  const planeVert = "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }";
  const planeFrag =
    "precision highp float; varying vec2 vUv; uniform sampler2D uTex; uniform float uAppear; uniform float uDisappear;\n" +
    "void main(){\n" +
    "  vec4 c = texture2D(uTex, vUv);\n" +
    "  float edge = smoothstep(vUv.y - 0.18, vUv.y + 0.18, uDisappear);  // dissolve sweeps bottom -> top\n" +
    "  vec3 rgb = mix(c.rgb, c.rgb * 0.12, edge);                         // darken as it leaves — into the dark\n" +
    "  float a = c.a * clamp(uAppear, 0.0, 1.0) * (1.0 - edge);\n" +
    "  if (a < 0.008) discard;\n" +
    "  gl_FragColor = vec4(rgb, a);\n" +
    "}";
  ZONES.forEach((z, i) => {
    const zpos = roomZ[i];
    const tex = loader.load(z.img);
    if ("colorSpace" in tex) tex.colorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.ShaderMaterial({
      uniforms: { uTex: { value: tex }, uAppear: { value: 0 }, uDisappear: { value: 0 } },
      vertexShader: planeVert, fragmentShader: planeFrag, transparent: true, depthWrite: false,
    });
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(26, 14.6), mat); // big → fills screen at the framing distance
    plane.position.set(0, 2.2, zpos); scene.add(plane);
    const frame = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(26.8, 15.4)), new THREE.LineBasicMaterial({ color: readAccentHex(), transparent: true, opacity: 0 }));
    frame.position.copy(plane.position); scene.add(frame); accentLines.push(frame);
    zoneFades.push({ mat, frame, z: zpos });
    const rl = new THREE.PointLight(readAccentHex(), 16, 42); rl.position.set(0, 3.6, zpos + 9); scene.add(rl); roomLights.push(rl);
    lightShaft(zpos + 6, 8, 15, 0.04);  // spot falling on this room

    // the alcove shell — flanking walls, a seamed lintel overhead and a
    // polished sill underfoot, so at the framing the camera stands INSIDE a
    // room mouth (Cartier's alcoves) instead of before a floating billboard
    [-8.6, 8.6].forEach((x) => {
      const w = new THREE.Mesh(new THREE.PlaneGeometry(14, 10), new THREE.MeshStandardMaterial({ color: 0x0c111d, metalness: 0.55, roughness: 0.65, side: THREE.DoubleSide }));
      w.position.set(x, 3.7, zpos + 8); w.rotation.y = x < 0 ? Math.PI / 2 : -Math.PI / 2;
      scene.add(w);
    });
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(17.4, 0.6, 1.1), metal);
    lintel.position.set(0, 7.6, zpos + 2); scene.add(lintel);
    const lEdge = new THREE.LineSegments(new THREE.EdgesGeometry(lintel.geometry), new THREE.LineBasicMaterial({ color: readAccentHex(), transparent: true, opacity: 0.5 }));
    lEdge.position.copy(lintel.position); scene.add(lEdge); accentLines.push(lEdge);
    const sill = new THREE.Mesh(new THREE.PlaneGeometry(15, 4), new THREE.MeshStandardMaterial({ color: 0x111a30, metalness: 0.85, roughness: 0.22, envMapIntensity: 1.1 }));
    sill.rotation.x = -Math.PI / 2; sill.position.set(0, -1.26, zpos + 4); scene.add(sill);
  });

  // ---- scroll progress, two segments (fixes "zone I gone before its text
  //      shows"): the APPROACH (hero → zones top) only walks the corridor
  //      [0 … 0.10]; ALL room framings/holds/dissolves live in [0.10 … 1],
  //      i.e. strictly inside the pinned zones section where the text is. ----
  const heroEl = document.querySelector(".hero");
  const zonesEl = document.querySelector(".zones");
  const c01 = (x) => Math.min(1, Math.max(0, x));
  const progress = () => {
    if (!heroEl || !zonesEl) return 0;
    const vh = window.innerHeight || 800;
    const y = window.scrollY || window.pageYOffset || 0;
    const zTop = zonesEl.offsetTop;
    const zLen = Math.max(1, zonesEl.offsetHeight - vh);   // sticky pin length
    if (y < zTop) return 0.10 * c01((y - heroEl.offsetTop) / Math.max(1, zTop - heroEl.offsetTop));
    return 0.10 + 0.90 * c01((y - zTop) / zLen);
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
    accentCones.forEach((c) => c.material.color.setHex(hex));
    grid.material.color && grid.material.color.setHex(hex);
    const bg = new THREE.Color(readVar("--bg", "#0b0e17")).getHex();
    if (scene.fog) scene.fog.color.setHex(bg);
  });

  // ---- context-loss safety → drop to fallback ----
  canvas.addEventListener("webglcontextlost", (e) => {
    e.preventDefault(); running = false;
    root.classList.remove("has-webgl"); root.classList.add("no-webgl");
  });

  // ---- camera path: fly to the framing z (roomZ+13, where the 26×14.6 plane
  //      FILLS a 56° viewport) → HOLD FLAT (reading time, zero drift) → advance
  //      9u so the shader dissolves the image while we move into the dark →
  //      dark travel → next room. Approach = [0…0.10]; rooms live in the pin.
  //      Retimed 2026-07-12: the pure-dark travel is a breath (4%), not a
  //      corridor of nothing — holds gained what the dead scroll lost. ----
  const KP = [0, 0.10, 0.15, 0.31, 0.36, 0.40, 0.46, 0.62, 0.67, 0.71, 0.77, 0.93, 1.0];
  const KZ = [12, -20, -27, -27, -36, -48, -77, -77, -86, -98, -127, -127, -136];
  const camZ = (p) => {
    if (p <= KP[0]) return KZ[0];
    for (let i = 1; i < KP.length; i++) if (p <= KP[i]) { const t = (p - KP[i - 1]) / (KP[i] - KP[i - 1]); return KZ[i - 1] + (KZ[i] - KZ[i - 1]) * t; }
    return KZ[KZ.length - 1];
  };
  const clamp01 = (x) => Math.max(0, Math.min(1, x));

  // ---- DOM sync: the zone text/rail follows the 3D (single source of truth) ----
  const railTicks = [...document.querySelectorAll("#zones-rail .zone__tick")];
  const zonePanels = [...document.querySelectorAll("#zones-stage .zone")];
  let domActive = -2;
  const syncDOM = (idx) => {
    if (idx === domActive) return;
    const prev = domActive; domActive = idx;
    zonePanels.forEach((el, i) => el.classList.toggle("is-active", i === idx));
    railTicks.forEach((el, i) => el.classList.toggle("is-active", i === idx));
    // a room has focus → the section header steps aside (one reading target
    // at a time — the headline never fights the full-bleed photo)
    if (zonesEl) zonesEl.classList.toggle("is-rooms", idx >= 0);
    if (idx >= 0 && prev !== -2) zoneWhoosh(idx); // room takes focus → its voice (opt-in)
  };

  // ---- frame (shared by the rAF loop and the one-shot verifier) ----
  let running = true;
  const frame = (snap) => {
    const p = (window.__colosseTestP != null) ? window.__colosseTestP : progress();
    const tz = camZ(p);
    camera.position.z += (tz - camera.position.z) * (snap ? 1 : 0.1);
    camera.position.x += ((mx * 1.2) - camera.position.x) * 0.05;
    camera.position.y += ((1.6 - my * 0.6) - camera.position.y) * 0.05;
    camera.lookAt(0, 2.0, camera.position.z - 10);
    monument.rotation.y += 0.0035;
    pillars.forEach((pl, i) => (pl.rotation.y = monument.rotation.y * (i ? -0.4 : 0.4)));
    // per zone: fly-in (appear) → hold full → directional dissolve (disappear)
    let best = -1, bestV = 0.4;
    for (let i = 0; i < zoneFades.length; i++) {
      const zf = zoneFades[i];
      const d = camera.position.z - zf.z;      // >0 = camera in front, 0 = at plane
      const appear = clamp01((42 - d) / 24);   // 0 at d≥42 → 1 at d≤18 (fly-in)
      const disappear = clamp01((13 - d) / 9); // 0 at d≥13 (full) → 1 at d≤4 (gone)
      zf.mat.uniforms.uAppear.value = appear;
      zf.mat.uniforms.uDisappear.value = disappear;
      zf.frame.material.opacity = appear * (1 - disappear) * 0.85;
      const vis = appear * (1 - disappear);
      if (vis > bestV) { bestV = vis; best = i; }
    }
    syncDOM(best);
    renderer.render(scene, camera);
  };
  const render = () => { if (!running) return; requestAnimationFrame(render); try { frame(false); } catch (e) { /* never break the page */ } };
  render();

  // one-shot render (snaps to the exact scroll state) for headless verification
  window.__colosseRenderOnce = () => { try { frame(true); return true; } catch (e) { return false; } };
  window.__colosseCamZ = camZ; // expose for probing the path
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
