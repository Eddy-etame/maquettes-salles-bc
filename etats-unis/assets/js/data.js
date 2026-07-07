/* =====================================================================
   BOXING CENTER — ÉTATS-UNIS · "LE COLOSSE"
   Content source of truth (maquette). Plain ES module so the team maps it
   1:1 onto Astro/Next content collections. The markup renders NOTHING
   repeated by hand — JS builds it from these arrays. Swap values freely.

   Identity anchor: this salle's real architecture IS the concept —
   1 200 m² découpés en 3 zones de 400 m². Le site EST le bâtiment.
   ===================================================================== */

export const SALLE = {
  id: "etats-unis",
  name: "Boxing Center États-Unis",
  short: "États-Unis",
  baseline: "La plus grande salle de France dédiée aux sports de combat.",
  claim: "1 200 m². 3 zones. Aucune excuse.",
  district: "Avenue des États-Unis · Lalande",
  surface: "1 200 m²",

  address: {
    street: "388 avenue des États-Unis",
    zip: "31200",
    city: "Toulouse",
    full: "388 avenue des États-Unis, 31200 Toulouse",
  },
  access: [
    "Rocade — sortie 33b Lalande, à 2 minutes",
    "Grand parking gratuit sur place",
    "Bus 36 / 60 — arrêt Lalande-Église",
  ],
  phone: "05 62 24 46 82",
  phoneHref: "+33562244682",
  email: "boxingcenter31@gmail.com",
  hours: "Lun – Sam · 10h00 – 21h30",
  hoursData: [
    { d: "Lundi – Vendredi", h: "10h00 – 21h30" },
    { d: "Samedi", h: "10h00 – 21h30" },
    { d: "Dimanche", h: "Fermé" },
  ],
  federations: ["FFBoxe", "FFKMDA", "FMMAF"],
  mapsUrl:
    "https://www.google.com/maps?q=388%20avenue%20des%20Etats-Unis%2031200%20Toulouse&output=embed",
  mapsLink:
    "https://maps.google.com/?q=388+avenue+des+Etats-Unis+31200+Toulouse",
};

/* Liens partagés — dispositif Boxing Center. (placeholders : la team branche les vraies URLs.) */
export const LINKS = {
  essai: "/contact/",
  boutique: "https://boxingcenter.fr/",
  offreRentree: "/tarifs/",
  offreEte: "/tarifs/",
  groupe: "https://boxingcenter.fr/",
  facebook: "https://www.facebook.com/BoxingCenterToulouse/",
  instagram: "https://www.instagram.com/boxingcentertoulouse/",
};

/* Médias : vraies photos Boxing Center servies en placeholder. ⚠ à remplacer
   par le reportage photo de la salle États-Unis. */
export const MEDIA = "https://www.boxing-center-portet.fr";

export const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/les-zones/", label: "Les 3 zones" },
  { href: "/activites/", label: "Activités" },
  { href: "/coachs/", label: "Coachs" },
  { href: "/galerie/", label: "Galerie" },
  { href: "/plannings/", label: "Planning" },
  { href: "/tarifs/", label: "Tarifs" },
  { href: "/contact/", label: "Contact" },
];

/* La toise — la démesure en chiffres. Faits réels de la salle États-Unis. */
export const STATS = [
  { v: 1200, suffix: " m²", l: "de surface — l'échelle d'un hangar" },
  { v: 3, suffix: " zones", l: "de 400 m² · percussion · ring · prépa" },
  { v: 2, suffix: " rings", l: "de compétition + une cage MMA officielle" },
  { v: 16, suffix: " sacs", l: "lourds alignés · zéro file d'attente" },
];

/* ------------------------------------------------------------------ *
 *  LES 3 ZONES — la signature. C'est l'architecture réelle du
 *  bâtiment : 3 × 400 m². Le scroll-jacking traverse le colosse zone
 *  par zone. Chaque zone = un plan-séquence.
 * ------------------------------------------------------------------ */
export const ZONES = [
  {
    n: "01",
    key: "percussion",
    name: "Percussion & Sol",
    surface: "400 m²",
    tag: "La cage",
    line: "La cage MMA officielle, surélevée.",
    desc: "Une cage de compétition posée sur son estrade, ses panneaux de contrôle, et 400 m² de tatami autour. Grappling, MMA, lutte au sol : ici on tombe, on se relève, on recommence — sur la seule cage officielle et surélevée de la ville.",
    specs: ["Cage MMA officielle surélevée", "400 m² de tatami", "Panneaux de contrôle cage"],
    img: "/assets/img/eu/grappling.webp",
  },
  {
    n: "02",
    key: "ring",
    name: "Le Ring",
    surface: "400 m²",
    tag: "Deux rings",
    line: "Deux rings de compétition. Pas un.",
    desc: "Deux rings montés aux normes, côte à côte, plus 400 m² de praticables. Anglaise, thaï, full contact : deux groupes tapent en même temps, personne n'attend son tour. C'est là qu'on apprend à encaisser un regard avant d'encaisser un coup.",
    specs: ["2 rings de compétition", "400 m² de praticables", "Anglaise · Thaï · Full contact"],
    img: "/assets/img/eu/boxe-2.webp",
  },
  {
    n: "03",
    key: "prepa",
    name: "Prépa Physique",
    surface: "400 m²",
    tag: "Le moteur",
    line: "16 sacs, une cage cross, un spécialiste street workout.",
    desc: "Seize sacs lourds alignés, une cage de cross-training, et un coach dédié à la callisthénie et au street workout. Hyrox, prépa combat, force au poids de corps : la zone qui construit le moteur derrière la technique. Le dernier round se gagne ici.",
    specs: ["16 sacs lourds", "Cage cross-training", "Coach street workout dédié"],
    img: "/assets/img/eu/hyrox.webp",
  },
];

/* Le catalogue — la salle couvre TOUT le spectre des sports de combat. */
export const DISCIPLINES = [
  { key: "anglaise", name: "Boxe Anglaise", tag: "Le noble art", desc: "Jab, esquive, jeu de jambes. Deux rings dédiés, du sparring qui pique — le fondamental de la maison.", img: "/assets/img/eu/boxe-1.webp" },
  { key: "thai", name: "Kick & Muay Thaï", tag: "Pieds-poings", desc: "Tibias, genoux, coudes. La boxe la plus complète, encadrée par des pratiquants qui montent sur le ring.", img: "/assets/img/eu/thai.webp" },
  { key: "grappling", name: "Grappling & MMA", tag: "La cage", desc: "Projections, contrôle au sol, soumissions. Sur la seule cage officielle surélevée de Toulouse.", img: "/assets/img/eu/grappling.webp" },
  { key: "full", name: "Full Contact", tag: "Percussion", desc: "La frappe pieds-poings américaine, puissante et engagée. Pour ceux qui veulent tout donner.", img: "/assets/img/eu/boxe-3.webp" },
  { key: "hyrox", name: "Hyrox & Cross", tag: "La caisse", desc: "Cage de cross-training, circuits Hyrox, prépa physique de combat. Le moteur derrière la technique.", img: "/assets/img/eu/hyrox.webp" },
  { key: "street", name: "Street Workout", tag: "Callisthénie", desc: "Force au poids de corps, tractions, dips, figures. Une spécialité rare, un coach dédié rien que pour ça.", img: "/assets/img/eu/cross.webp" },
  { key: "lady", name: "Boxing Lady", tag: "100 % féminin", desc: "Un créneau, zéro complexe, toute l'énergie. La boxe pour la forme comme pour la confiance.", img: "/assets/img/eu/lady.webp" },
  { key: "fitness", name: "Boxing Fitness", tag: "Sans contact", desc: "Tout le geste, toute la sueur, aucun coup encaissé. La porte d'entrée quand on n'a jamais boxé.", img: "/assets/img/eu/boxe-4.webp" },
];

/* Le code du Colosse — la démesure sert quelque chose. */
export const VALUES = [
  { n: "01", t: "L'échelle", d: "La plus grande salle de France dédiée aux sports de combat. Ici, l'espace ne te bride jamais." },
  { n: "02", t: "Le spectre complet", d: "Pieds, poings, sol, cage. Toutes les disciplines sous un seul toit — tu n'as plus à choisir." },
  { n: "03", t: "Zéro file d'attente", d: "Deux rings, une cage, seize sacs. Tu tapes quand tu arrives, pas quand une place se libère." },
  { n: "04", t: "Le sérieux", d: "Normes de compétition, coachs spécialisés, cage officielle. Le loisir a le niveau du haut niveau." },
];

/* Les coachs — encadrement réel Boxing Center (photos placeholder à valider
   avec la salle États-Unis ; palmarès à confirmer). */
export const COACHES = [
  { name: "Boumenir", role: "Percussion & Sol", tag: "Grappling · MMA", note: "Le sol, la cage, le contrôle. Il t'apprend à rester lucide quand tout se resserre.", img: "/assets/img/eu/coach-boumenir.webp" },
  { name: "Chavaudra", role: "Le Ring", tag: "Anglaise · Thaï", note: "Deux rings, un œil qui ne rate rien. La technique avant la force, toujours.", img: "/assets/img/eu/coach-chavaudra.webp" },
  { name: "Sonia", role: "Boxing Lady", tag: "Féminin · Fitness", note: "L'énergie du créneau Lady, sans cliché. On repart plus solide qu'en arrivant.", img: "/assets/img/eu/coach-sonia.webp" },
];

/* L'offre — dispositif commercial Boxing Center. */
export const TARIFS = [
  {
    name: "Séance d'essai",
    price: "10€",
    period: "la séance",
    feature: "Les 3 zones, sans engagement",
    items: ["Accès aux 3 zones", "Prêt du matériel", "Toutes les disciplines"],
    cta: "Réserver",
    href: "/contact/",
    highlight: false,
  },
  {
    name: "Pass Colosse",
    price: "dès 45€",
    period: "/ mois",
    feature: "Accès illimité · toutes zones · toutes disciplines",
    items: ["Les 3 zones en illimité 6j/7", "Pieds · poings · sol · cage", "Sans frais de dossier en septembre"],
    cta: "Voir l'offre",
    href: "/tarifs/",
    highlight: true,
  },
  {
    name: "Pass Combat",
    price: "sur devis",
    period: "compétiteurs",
    feature: "Sparring, prépa combat, suivi coach",
    items: ["Créneaux sparring encadrés", "Prépa physique dédiée", "Accompagnement en compétition"],
    cta: "En parler au coach",
    href: "/contact/",
    highlight: false,
  },
];

export const SPECS = [
  { l: "Surface totale", v: "1 200 m²" },
  { l: "Zones de 400 m²", v: "3" },
  { l: "Rings de compétition", v: "2" },
  { l: "Cage MMA officielle", v: "Surélevée" },
  { l: "Sacs lourds", v: "16" },
  { l: "Affiliations", v: "FFBoxe · FFKMDA · FMMAF" },
];

/* Le réseau Boxing Center (liens sortants depuis États-Unis). */
export const NETWORK = [
  { id: "portet", name: "Portet-sur-Garonne", flagship: true, tag: "Le vaisseau amiral", feat: "800 m² · ring olympique · cage MMA", url: "https://www.boxing-center-portet.fr/" },
  { id: "minimes", name: "Minimes", tag: "Le berceau", feat: "Salle historique · 3 rings · l'école", url: "https://boxingcenter.fr/" },
  { id: "saint-cyprien", name: "Saint-Cyprien", tag: "Le neuf", feat: "1 200 m² · ouverte 2025", url: "https://boxingcenter.fr/" },
  { id: "ramonville", name: "Ramonville", tag: "L'octogone", feat: "Octogone 7 m · 300 m² extérieur", url: "https://boxingcenter.fr/" },
  { id: "balma", name: "Balma-Gramont", tag: "Pieds-poings", feat: "Kick boxing · cross training", url: "https://boxingcenter.fr/" },
];

export const FAQ = [
  { q: "Où se trouve Boxing Center États-Unis ?", a: "Au 388 avenue des États-Unis, 31200 Toulouse, quartier Lalande — à deux minutes de la rocade (sortie 33b), avec un grand parking gratuit sur place." },
  { q: "Pourquoi « la plus grande salle de France » ?", a: "1 200 m² découpés en trois zones de 400 m² : percussion & sol, deux rings de compétition, et prépa physique. C'est la plus grande surface de France entièrement dédiée aux sports de combat." },
  { q: "Quelles disciplines pratique-t-on ?", a: "Tout le spectre : boxe anglaise, kick, muay thaï, full contact, grappling, MMA, cross-training, Hyrox, street workout et boxing fitness. Toutes sous un même toit." },
  { q: "Y a-t-il vraiment une cage MMA ?", a: "Oui — une cage de compétition officielle, surélevée sur son estrade avec panneaux de contrôle, entourée de 400 m² de tatami. C'est la zone Percussion & Sol." },
  { q: "Faut-il de l'expérience pour commencer ?", a: "Non. La salle accueille le grand débutant comme le compétiteur. Le boxing fitness et les créneaux découverte permettent de démarrer sans jamais avoir mis un gant." },
  { q: "Quels sont les horaires ?", a: "Du lundi au samedi, de 10h00 à 21h30. Fermé le dimanche." },
];
