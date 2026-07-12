# STANDARDS DE BUILD — MAQUETTES BOXING CENTER · 2026-07-12

> Contrat partagé de tous les agents de build. Toute page livrée est jugée contre la barre :
> **« Est-ce que c'est seulement possible ? »** — pas « c'est bien », pas « waouh ».
> Calibrage : ton 100 % = 20 % (15 % avec rigueur). Jamais « terminé » — % honnête + écarts nommés.

## 0 · Décisions client du 2026-07-12 (annulent tout scope antérieur)

1. **Sites MULTI-PAGES** : les 8 liens de nav = 8 vraies pages, zéro 404. Toutes les pages cette nuit.
2. **Le planning ne vit JAMAIS sur la home** — page `/plannings/` dédiée par salle.
3. **Aucun claim périssable** (« neuve », « août 2025 » en identité, promos datées en dur). `foundingDate` en LD-JSON = OK (fait), jamais en headline.
4. St-Cyprien : pivot combiné **« La Nouvelle Génération »** (récit) + **« Rive gauche, garde haute »** (couche SEO/programme) + **« La lumière sur le geste »** (voix + direction artistique). Visuel showroom-nuit conservé. L'image du **« bijou/gem »** peut apparaître si elle sert (« le bijou de la rive gauche »), sans en faire le concept.
5. Ramonville : monde **« L'Octogone à ciel ouvert »** approuvé — nuit, ciel réel, octogone-instrument, registre documentaire. Toggle bi-palette (loi standard).
6. Réseau = **5 salles** (Balma-Gramont VENDUE — ne jamais la citer comme actuelle) : Portet, Minimes, États-Unis, St-Cyprien, Ramonville.
7. **EU garde le claim** « la plus grande salle de France dédiée aux sports de combat ».
8. Minimes : enfants **dès 3 ans** (Baby Boxe 3/6) PARTOUT, y compris FAQ + LD-JSON (l'incohérence « dès 7 ans » est un bug à tuer).
9. Domaines cibles : `<salle>.boxingcenter.fr` (canonicals) ; Portet = boxing-center-portet.fr.
10. Coachs : noms ≡ photos, jamais croisés, photos réelles téléchargées (roster.json fait foi). Pas de photo prouvée → tuile nom/silhouette, jamais de stock.

## 1 · Conversion — tout pointe vers box-plus (VÉRIFIÉ le 2026-07-12)

Base : `https://box-plus.vercel.app`
- **Séance d'essai · 10 €** → `https://box-plus.vercel.app/seance-essai` (CTA principal de CHAQUE page)
- Abonnements → `/abonnements` · ancres réelles : `#enfants`, `#prelevement`, `#comptant` (onglets : Sans engagement / Comptant / Enfants & ados / Promotions)
- Coachings → `/coachings` · Matériel/boutique → `/materiel`
- Offres promo (cartes Duo/Saison) → `/abonnements#promotions` (fallback `/abonnements`)
- `/offre-duo-rentree`, `/offre-saison-259`, `/seance-essai-gratuite` = **404 aujourd'hui, ne PAS les utiliser.**
- **Chatbot** : la pastille pointe vers du réel → `tel:+33562244682` (label « Une question ? Appelle la salle ») — plus de `href="#"`.

## 2 · Les offres (source de vérité : posters officiels + 01_OFFRES/OFFRES_RENTREE_2026.md)

**OFFRE DUO — prioritaire.** « **29 € par personne** · 4 semaines · cours illimités · sans engagement » (au lieu de 44 €).
⚠️ INTERDIT d'écrire « DUO 29 € » sans « par personne », interdit « 29 € pour deux ».
CTA : « Je viens avec mon binôme » → box-plus.

**OFFRE RENTRÉE / SAISON — secondaire.** « **259 €** les 12 mois » (au lieu de 400 €) · payable en **4× sans frais** · boxe anglaise, MMA, boxe pieds-poings, Lady Boxing, Boxing Fitness · **accès libre aux 5 clubs**. CTA : « Je prends ma saison ».

**BONUS** : T-shirt Boxing Center **offert aux 100 premiers inscrits**.
**Essai : 10 €** toutes disciplines, matériel prêté (aligné sur la page box-plus — ne pas écrire « gratuit »).
Les promos vivent dans un bloc daté de `data.js` (`PROMOS`, avec `saison: SEASON`), jamais en dur dans les pages.

## 3 · Arborescence par salle (8 pages, nav identique, squelettes PROPRES à chaque salle)

`/` accueil (positionne + route ; PAS de poster planning, PAS de grille tarifs complète, PAS de pavé SEO)
`/la-salle/` la visite/le lieu (SC : la visite showroom ; EU : renvoie/absorbe les-zones ; Minimes : le-club existant se complète ; Ramonville : le plateau + l'extérieur 300 m²)
`/activites/` catalogue complet, un écran par discipline, ancres `#<discipline>`
`/coachs/` visages réels (roster.json), un pilier mis en avant par salle
`/galerie/` photos réelles par zone/discipline, captions mono, lazy
`/plannings/` LA page planning : poster officiel rentrée-2026 EN COULEUR cliquable + grille HTML utilisable (filtres jour/discipline/coach depuis data.js)
`/tarifs/` essai 10 € en premier · Duo · Saison · école enfants · bloc PROMOS · avis Google réels
`/contact/` adresse + carte + horaires + tél + FAQ réécrite + CTA box-plus (pas de formulaire local)

## 4 · SEO / GEO (jugé plus dur que tout)

Chaque page : title unique orienté requête locale · meta description · canonical `<salle>.boxingcenter.fr/<path>/` · og:title/description/**og:image (photo réelle de la salle)**/og:image:alt · twitter:card summary_large_image · theme-color · geo.region/geo.placename/geo.position/ICBM · lang=fr.
Par salle (racine) : `robots.txt` + `sitemap.xml` (8 URLs) + `404.html` brandé + `favicon` SVG identité + **`llms.txt`** (faits machine-lisibles : adresse, horaires, disciplines, coachs, offres, claim).
LD-JSON : LocalBusiness/SportsActivityLocation enrichi (`@id`, `sameAs` [fiche Google, Instagram, Facebook], `hasOfferCatalog` [essai 10 €, Duo 29 €/pers., Saison 259 €], `amenityFeature` par salle [EU : cage MMA + 2 rings + 3 zones 400 m² ; Ramonville : octogone 7 m + ring olympique + 300 m² extérieur couvert ; Minimes : 3 rings ; SC : 1 200 m² un niveau]) + **FAQPage** sur `/contact/` + BreadcrumbList sur les sous-pages.
Constantes anti-péremption dans chaque `data.js` : `SEASON = "2026-2027"`, `SEASON_LABEL = "Saison 2026 — 2027"` — tout libellé de saison passe par la constante. Aucune promo/date en dur dans les pages.

## 5 · Lois visuelles & motion (chaque loi vient d'une correction déjà payée)

1. **Lisibilité n°1** : corps ~15:1 ; jamais de texte qui joue contre une photo/3D sans scrim/plaque ; les animations RÉVÈLENT, ne bloquent jamais ; dead-man net conservé sur chaque page.
2. **Semblables, jamais identiques** : squelette propre par salle ET par page. Pas de carrés nus — « plus beau, plus élevé ».
3. **Fond sombre partout.** La lumière est un objet, pas un fond.
4. **De la vie sur TOUTE la page** (reveals maskés, touch-life mobile, hovers, compteurs) — pas seulement le héros. Mobile révisé à chaque page (375 px réel).
5. Posters plannings : **EN COULEUR** (`filter:none`), cliquables plein format, `alt` réels, `width/height` posés (CLS 0).
6. Logo blanc transparent, sans plaque. Sons opt-in uniquement.
7. **Discipline `?v=`** : UNE chaîne de version par salle, bumpée partout à chaque édition (imports `data.js?v=X` compris, la même sur tous les fichiers).
8. Perf : three.js et vidéos lazy après first paint ; preload de l'image LCP ; pas d'asset mort.
9. Voix : français, tutoiement, voix de coach directe, ethos/pathos/logos — zéro ligne générique (« accueil personnalisé », « encadrement diplômé » = interdits). Une bonne formule n'apparaît qu'UNE fois par salle.

## 6 · Vérification (avant de rendre la main, par salle)

Serveur local (minimes :5599 · etats-unis :5601 · st-cyprien :5602 · ramonville :5603). Pour CHAQUE page : HTTP 200 sur les 8 routes + 0 lien interne 404 · imgs toutes 200 + alt · LD-JSON parse (python json) · og:image présent · `?v=` cohérent · title/canonical uniques. Rapporter : % honnête + écarts restants, jamais « done ».
