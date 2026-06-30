# Boxing Center — Minimes · « Le Berceau » (maquette)

Maquette **visuelle** (HTML / CSS / JS vanilla) de la salle **Boxing Center Minimes**.
Première des 4 salles à décliner (Minimes → États-Unis → Saint-Cyprien → Ramonville).
Objet : valider le **look & feel** et les **animations** avant portage en **Astro / Next.js**.

> ⚠️ Maquette = visuel uniquement. Pas de back, pas de vrai formulaire, pas d'upload.
> Tous les liens/CTA sont présents (nav, essai 10€, boutique, galerie, planning, tarifs,
> contact, FAQ, réseau, chatbot) mais pointent vers des routes/ancres de démonstration.

---

## Concept & différenciation

Chaque salle du groupe a **sa propre identité** posée sur un **squelette commun** (même
structure de page, même nav, même ADN Boxing Center : navy `#182848` + argent + blanc).
On évite ainsi le *duplicate content* (impératif du cahier des charges, §5.3).

**Minimes = « Le Berceau »** : la salle **historique**, le *berceau des champions*,
ambiance **noir & blanc cinématographique / grain argentique**, typographie d'**affiche de
combat** (Anton), reveals « tirage photo / chambre noire ». Zéro WebGL — tout au **scroll,
au grain et au CSS** — volontairement à l'opposé du site Portet (particules / 3D).

Identités prévues pour les 3 suivantes (à confirmer) :
| Salle | Identité | Direction |
|---|---|---|
| États-Unis | Le Colosse | 3D maximaliste sombre, octogone MMA, échelle (réf. Igloo/Zentry) |
| Saint-Cyprien | Le Neuf | clair, épuré, Apple/Linear, switcher de disciplines |
| Ramonville | L'Octogone | tactile/physique, plein air, octogone (réf. Resn/Active Theory) |

---

## Lancer en local

```bash
# depuis ce dossier (minimes/)
python -m http.server 5577
# → http://localhost:5577/
```
Tout chemin d'asset est **absolu** (`/assets/...`) → servir **ce dossier** comme racine.

## Structure

```
minimes/
├─ index.html              # Accueil ("Le berceau")
├─ le-club/index.html      # Sous-page "Le club" (histoire, accès, FAQ, réseau)
└─ assets/
   ├─ css/  base.css       # design system (tokens, nav, footer, cursor, grain, reveal)
   │        home.css       # sections de l'accueil
   │        club.css       # sections du sous-page
   └─ js/   data.js        # ★ SOURCE DE CONTENU (tout le texte/data ici)
            site.js        # chrome partagé + moteur motion (window.BC)
            home.js        # rendu + choré de l'accueil
            club.js        # rendu + choré du sous-page
```

## Stack

- **GSAP + ScrollTrigger** (reveals, pin horizontal du « Mur des champions », parallax)
- **Lenis** (smooth scroll)
- Custom cursor, boutons magnétiques, marquee, grain animé, compteurs — vanilla.
- Libs en **CDN** (jsdelivr) — à remplacer par des imports npm au portage.

---

## Portage Astro / Next.js — notes

- `data.js` → **content collection** (Astro) / fichier `content.ts` ou CMS. Tout le contenu
  éditorial y est déjà isolé (rien de codé en dur dans le markup répété).
- `site.js` (nav, footer, drawer, cursor, magnetic, reveal) → **composants + un hook/composable**
  d'animation. `window.BC` n'est qu'un pont vanilla — à remplacer par des imports propres.
- Sections (`hero`, `champions`, `timeline`, `faq`, `network`…) → **composants** dédiés ;
  la structure HTML est déjà découpée section par section, prête à extraire.
- Chemins `/assets/...` → dossier `public/`.
- CDN → `npm i gsap @studio-freight/lenis`.
- `data-reveal`, `data-reveal-group`, `.reveal-mask`, `data-magnetic` = conventions réutilisables.

### Détail technique notable
Les titres masqués s'animent en **`yPercent` piloté 100 % par GSAP**, et l'état caché initial
est posé en **opacité** (pas en `transform: translateY(%)`) : un `%` en CSS est mal interprété
par GSAP (parsé en `y` px) et le `yPercent` ne revient alors jamais à l'origine. À conserver.

---

## État du contenu

- **Année d'ouverture : 2016** (vérifiée — Boxing Center créé le 01/09/2016, Minimes = 1re salle).
- **Mur des champions** : boxeurs réels formés aux Minimes — **Johnson** (poids moyen, invaincu,
  10ᵉ FR Boxrec), **Salomon** (super-plume, invaincu), **Elyasse** (welter), + « l'école »
  (~30 amateurs, 5 passés pros en 2024-25). Source : boxingcenter.fr. ⚠ Palmarès exact +
  **photos réelles des boxeurs** à confirmer/fournir par le club.
- **Photos** : vraies images Boxing Center (host Portet `boxing-center-portet.fr`) injectées via
  `data-img` et passées en N&B par CSS, **en attendant les photos propres aux Minimes**.
  Constante `MEDIA` dans `data.js` → changer l'origine en un seul endroit. Hydratation = `window.BC.media()`.
- Conflit « plus grande salle de France » États-Unis / Saint-Cyprien : laissé de côté (sites suivants).
- Vraies URLs encore à brancher : boutique, tunnels essai/rentrée, galerie communautaire, chatbot.

## Liens / fonctionnalités présents (cahier des charges §5.5)

présentation · adresse · accès · ambiance · disciplines · public · photos (placeholder) ·
bouton inscription · lien boutique · lien séance d'essai · offres rentrée · réassurance ·
**FAQ locale** · contact + carte · **SEO local** (title/meta/JSON-LD LocalBusiness + FAQPage).
