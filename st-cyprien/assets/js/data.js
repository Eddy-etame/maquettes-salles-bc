/* =====================================================================
   BOXING CENTER — SAINT-CYPRIEN · "LE NEUF"
   Content source of truth (maquette). Plain ES module → Astro/Next.

   Identity anchor: the group's NEWEST salle (ouverte août 2025) — 1 200 m²
   rive gauche, pensée comme un produit neuf : lumière, précision, choix.
   Le site est un SHOWROOM : tu configures ta discipline comme un produit.
   Staff & créneaux = le planning officiel rentrée 2026 (poster du club).
   ===================================================================== */

export const SALLE = {
  id: "st-cyprien",
  name: "Boxing Center Saint-Cyprien",
  short: "Saint-Cyprien",
  baseline: "La salle neuve de la rive gauche.",
  opened: "Août 2025",
  surface: "1 200 m²",
  district: "Saint-Cyprien · Toulouse rive gauche",

  address: {
    street: "11 rue Sainte-Lucie",
    zip: "31300",
    city: "Toulouse",
    full: "11 rue Sainte-Lucie, 31300 Toulouse",
  },
  access: [
    "Métro ligne A — Saint-Cyprien République (4 min à pied)",
    "Rive gauche — à 10 min du centre-ville",
    "Stationnement : parking Saint-Cyprien à proximité",
  ],
  phone: "05 62 24 46 82",
  phoneHref: "+33562244682",
  email: "boxingcenter31@gmail.com",
  hours: "Lun – Sam · 10h00 – 21h15",
  hoursData: [
    { d: "Lundi – Vendredi", h: "10h00 – 21h15" },
    { d: "Samedi", h: "10h00 – 21h15" },
    { d: "Dimanche", h: "Fermé" },
  ],
  federations: ["FFBoxe", "FFKMDA", "FMMAF"],
  mapsUrl: "https://www.google.com/maps?q=11%20rue%20Sainte-Lucie%2031300%20Toulouse&output=embed",
  mapsLink: "https://maps.google.com/?q=11+rue+Sainte-Lucie+31300+Toulouse",
};

export const LINKS = {
  essai: "/contact/",
  boutique: "https://boxingcenter.fr/",
  groupe: "https://boxingcenter.fr/",
  facebook: "https://www.facebook.com/BoxingCenterToulouse/",
  instagram: "https://www.instagram.com/boxingcentertoulouse/",
};

export const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/la-salle/", label: "La salle" },
  { href: "/activites/", label: "Activités" },
  { href: "/coachs/", label: "Coachs" },
  { href: "/galerie/", label: "Galerie" },
  { href: "/plannings/", label: "Planning" },
  { href: "/tarifs/", label: "Tarifs" },
  { href: "/contact/", label: "Contact" },
];

/* Les chiffres du neuf */
export const STATS = [
  { v: 2025, suffix: "", l: "ouverte en août — tout y est neuf", raw: true },
  { v: 1200, suffix: " m²", l: "de surface, rive gauche" },
  { v: 10, suffix: "+", l: "disciplines sous un même toit" },
  { v: 4, suffix: "", l: "coachs spécialisés au planning" },
];

/* ------------------------------------------------------------------ *
 *  LE CONFIGURATEUR — la signature. Tu choisis ta discipline comme on
 *  configure un produit : photo, jours, coach, niveau. Tout est réel
 *  (planning rentrée 2026, poster officiel du club).
 * ------------------------------------------------------------------ */
export const DISCIPLINES = [
  {
    key: "anglaise",
    name: "Boxe Anglaise",
    tag: "Le fondamental",
    coach: "Dadi",
    jours: "Midi mer. & ven. · soirs lun./mer. 20h · sam. 18h20",
    niveau: "Débutant → confirmé",
    desc: "Jab, esquive, jeu de jambes : le noble art enseigné proprement, du premier gant aux gants qui piquent. Les cours du midi pour la pause active, les soirs pour le vrai travail.",
    img: "/assets/img/sc/anglaise-header.webp",
  },
  {
    key: "thai",
    name: "Boxe Thaï · K1",
    tag: "Pieds-poings",
    coach: "Tawee · Victor G",
    jours: "Midi mar. & jeu. · soirs mar./jeu. 20h · ven. 19h",
    niveau: "Tous niveaux",
    desc: "Tibias, genoux, coudes — la boxe la plus complète, avec un enseignement dans les règles de l'art. Deux coachs, cinq créneaux par semaine.",
    img: "/assets/img/sc/thai-1.webp",
  },
  {
    key: "grappling",
    name: "Grappling",
    tag: "Le sol",
    coach: "Encadré",
    jours: "Mardi & jeudi · 19h – 20h",
    niveau: "Tous niveaux",
    desc: "Projections, contrôle, soumissions. Le complément sol qui transforme un boxeur en combattant complet.",
    img: "/assets/img/sc/grappling.webp",
  },
  {
    key: "hyrox",
    name: "Hyrox & Cross",
    tag: "Le moteur",
    coach: "Hicham",
    jours: "Hyrox mer. 18h20 · cross lun. & mer. 19h",
    niveau: "Ça pique — pour tous",
    desc: "Circuits Hyrox et cross-training : le cardio et la force qui portent tout le reste. La zone muscu toute neuve fait le reste de la semaine.",
    img: "/assets/img/sc/hyrox.webp",
  },
  {
    key: "lady",
    name: "Lady Punch",
    tag: "100 % féminin",
    coach: "Dadi",
    jours: "Mardi & jeudi · 18h20 – 19h",
    niveau: "Zéro prérequis",
    desc: "Un créneau à elles : la boxe pour la forme, la confiance et le cardio, sans cliché et sans jugement.",
    img: "/assets/img/sc/lady-2.webp",
  },
  {
    key: "kids",
    name: "Boxe Éducative",
    tag: "Dès 3 ans",
    coach: "Dadi",
    jours: "Baby 3/6 sam. · 7/11 & 12/16 mer. + sam. · compétiteurs mer./sam.",
    niveau: "Baby → compétition",
    desc: "Du Baby Boxe aux compétiteurs : coordination, respect, cadre. L'école complète, du premier déplacement au premier combat.",
    img: "/assets/img/sc/educative-1.webp",
  },
  {
    key: "camp",
    name: "Boxing Camp",
    tag: "Le condensé",
    coach: "Dadi · Hicham",
    jours: "Lun. 12h40 & 18h20 · ven. 18h20 · sam. 11h",
    niveau: "Tous niveaux",
    desc: "Le format signature Boxing Center : technique + cardio + sacs en une séance dense. Le meilleur point d'entrée si tu hésites.",
    img: "/assets/img/sc/training.webp",
  },
];

/* Le code du Neuf */
export const VALUES = [
  { n: "01", t: "Tout est neuf", d: "Ouverte en août 2025 : rings, tatamis, sacs, vestiaires — zéro usure, zéro compromis." },
  { n: "02", t: "La précision", d: "Un planning au cordeau, un coach par spécialité, un enseignement dans les règles de l'art." },
  { n: "03", t: "La lumière", d: "1 200 m² clairs et respirables, rive gauche. On s'entraîne bien là où on se sent bien." },
  { n: "04", t: "Le choix", d: "Plus de dix disciplines sous un toit : tu configures ta semaine comme TU la veux." },
];

/* L'encadrement — noms = le planning officiel rentrée 2026 (photos : Dadi
   réelle ; les autres arrivent avec le reportage photo de la salle). */
export const COACHES = [
  { name: "Dadi", role: "Anglaise · Lady Punch · École", tag: "Le pilier", note: "Le fil rouge de la semaine : anglaise, Lady Punch, et toute l'école des enfants.", img: "/assets/img/sc/coach-dadi.webp" },
  { name: "Tawee", role: "Boxe Thaï · K1", tag: "L'art thaï", note: "La boxe thaïlandaise transmise dans les règles — technique, respect, précision." },
  { name: "Hicham", role: "Hyrox · Cross · Camp", tag: "Le moteur", note: "Les circuits qui construisent la caisse. Tu repars vidé, tu reviens plus fort." },
  { name: "Victor G", role: "Boxe Thaï · K1", tag: "La relève", note: "Les créneaux thaï/K1 du soir — l'intensité montante de la semaine." },
];

export const TARIFS = [
  {
    name: "Séance d'essai",
    price: "10€",
    period: "la séance",
    feature: "Toutes disciplines, sans engagement",
    items: ["Accueil personnalisé", "Prêt du matériel", "Toutes les disciplines"],
    cta: "Réserver",
    href: "/contact/",
    highlight: false,
  },
  {
    name: "Pass Rive Gauche",
    price: "dès 42€",
    period: "/ mois",
    feature: "Illimité · toutes disciplines · salle neuve",
    items: ["Accès illimité 6j/7", "10+ disciplines", "Sans frais de dossier en septembre"],
    cta: "Voir l'offre",
    href: "/tarifs/",
    highlight: true,
  },
  {
    name: "École & Baby Boxe",
    price: "dès 280€",
    period: "/ an",
    feature: "Enfants & ados, dès 3 ans",
    items: ["Baby 3/6 · 7/11 · ados 12/16", "Encadrement diplômé", "Matériel fourni"],
    cta: "Inscrire mon enfant",
    href: "/contact/",
    highlight: false,
  },
];

export const NETWORK = [
  { id: "portet", name: "Portet-sur-Garonne", tag: "Le vaisseau amiral", feat: "800 m² · ring olympique · cage MMA", url: "https://www.boxing-center-portet.fr/" },
  { id: "minimes", name: "Minimes", tag: "Le berceau", feat: "Salle historique · 3 rings · l'école", url: "https://boxingcenter.fr/" },
  { id: "etats-unis", name: "États-Unis", tag: "Le colosse", feat: "1 200 m² · 3 zones · cage MMA", url: "https://boxingcenter.fr/" },
  { id: "ramonville", name: "Ramonville", tag: "L'octogone", feat: "Octogone 7 m · 300 m² extérieur", url: "https://boxingcenter.fr/" },
];

export const FAQ = [
  { q: "Où se trouve Boxing Center Saint-Cyprien ?", a: "Au 11 rue Sainte-Lucie, 31300 Toulouse, en plein quartier Saint-Cyprien rive gauche — à 4 minutes à pied du métro ligne A (Saint-Cyprien République)." },
  { q: "La salle est-elle vraiment neuve ?", a: "Oui — ouverte en août 2025, c'est la salle la plus récente du groupe Boxing Center : 1 200 m² d'équipements neufs, rings, tatamis, zone cross et vestiaires." },
  { q: "Quelles disciplines peut-on pratiquer ?", a: "Boxe anglaise, boxe thaï / K1, grappling, Hyrox, cross-training, Lady Punch, boxing camp et toute l'école enfants du Baby Boxe (3/6 ans) aux compétiteurs." },
  { q: "Y a-t-il des cours pour les enfants ?", a: "Oui, dès 3 ans : Baby Boxe le samedi, boxe éducative 7/11 ans et ados 12/16 ans le mercredi et le samedi, et un créneau compétiteurs encadré par Dadi." },
  { q: "Faut-il un niveau pour commencer ?", a: "Aucun. La séance d'essai à 10€ donne accès à toutes les disciplines, matériel prêté — la plupart des créneaux sont ouverts à tous les niveaux." },
  { q: "Quels sont les horaires ?", a: "Du lundi au samedi, de 10h00 à 21h15 (dernier cours 20h–21h15 selon les jours). Fermé le dimanche." },
];
