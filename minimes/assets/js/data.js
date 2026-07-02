/* =====================================================================
   BOXING CENTER — MINIMES · "LE BERCEAU"
   Content source of truth (maquette).
   Kept as a plain ES module so the team can map it 1:1 onto Astro/Next
   content collections or props. NOTHING here is hard-coded in markup that
   repeats — the JS renders these into the page.  Swap values freely.
   ===================================================================== */

export const SALLE = {
  id: "minimes",
  name: "Boxing Center Minimes",
  short: "Minimes",
  baseline: "Le berceau des champions.",
  district: "Barrière de Paris · Les Minimes",
  since: 2016,                       // Boxing Center créé le 01/09/2016 ; Minimes = 1re salle du groupe

  address: {
    street: "12 rue de Fenouillet",
    zip: "31200",
    city: "Toulouse",
    full: "12 rue de Fenouillet, 31200 Toulouse",
  },
  access: [
    "Métro ligne B — station Barrière de Paris (3 min à pied)",
    "Rocade — sortie 31, direction Les Minimes",
    "Bus 70 / 27 — arrêt Minimes-Roquelaine",
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
    "https://www.google.com/maps?q=12%20rue%20de%20Fenouillet%2031200%20Toulouse&output=embed",
  mapsLink:
    "https://maps.google.com/?q=12+rue+de+Fenouillet+31200+Toulouse",
};

/* Liens partagés — repris du dispositif Boxing Center.
   (placeholders : la team branche les vraies URLs / tunnels) */
export const LINKS = {
  essai: "/contact/",
  boutique: "https://boxingcenter.fr/",
  offreRentree: "/tarifs/",
  offreEte: "/tarifs/",
  groupe: "https://boxingcenter.fr/",
  facebook: "https://www.facebook.com/BoxingCenterToulouse/",
  instagram: "https://www.instagram.com/boxingcentertoulouse/",
};

/* Médias : vraies photos Boxing Center (site Portet) servies en placeholder,
   passées en N&B par CSS. ⚠ à remplacer par les vraies photos des Minimes. */
export const MEDIA = "https://www.boxing-center-portet.fr";

export const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/activites/", label: "Activités" },
  { href: "/le-club/", label: "Le club" },
  { href: "/coachs/", label: "Coachs" },
  { href: "/galerie/", label: "Galerie" },
  { href: "/plannings/", label: "Planning" },
  { href: "/tarifs/", label: "Tarifs" },
  { href: "/contact/", label: "Contact" },
];

/* La toise — chiffres qui content le palmarès, pas la surface */
export const STATS = [
  { v: 3, suffix: "", l: "rings de boxe" },
  { v: 4, suffix: "", l: "boxeurs pros formés ici" },
  { v: 30, suffix: "+", l: "amateurs sur le ring" },
  { v: 2016, suffix: "", l: "depuis", raw: true },
];

export const DISCIPLINES = [
  {
    key: "anglaise",
    name: "Boxe Anglaise",
    tag: "La spécialité maison",
    desc: "Le noble art dans son temple. Jab, esquive, jeu de jambes — la discipline qui a forgé la réputation des Minimes.",
    img: "/assets/img/bc/anglaise-1.webp",
  },
  {
    key: "educative",
    name: "Boxe Éducative",
    tag: "Dès 7 ans",
    desc: "On apprend à boxer avant d'apprendre à frapper. Coordination, respect, confiance : la relève commence ici.",
    img: "/assets/img/bc/educative-1.webp",
  },
  {
    key: "lady",
    name: "Lady Punch",
    tag: "100 % féminin",
    desc: "Un créneau, une énergie, zéro complexe. La boxe pour se défouler, se sculpter et se sentir invincible.",
    img: "/assets/img/bc/lady-2.webp",
  },
  {
    key: "paos",
    name: "PAOS & Pattes d'ours",
    tag: "Travail technique",
    desc: "Face au coach, sur les pattes d'ours : précision, vitesse, lecture. Le cœur du travail de boxeur.",
    img: "/assets/img/bc/training-2.webp",
  },
  {
    key: "cross",
    name: "Cross Training",
    tag: "La caisse",
    desc: "Gainage, cardio, explosivité. Le moteur sous le capot du boxeur — à l'étage, en circuit.",
    img: "/assets/img/bc/cross-1.webp",
  },
  {
    key: "cardio",
    name: "Cardio Boxing",
    tag: "Sans contact",
    desc: "Tout le geste, toute la sueur, aucun coup reçu. La porte d'entrée idéale pour débuter.",
    img: "/assets/img/bc/training-1.webp",
  },
];

/* Le Mur des Champions — interaction signature.
   Boxeurs réels formés aux Minimes (source boxingcenter.fr). ⚠ noms = prénoms
   publics ; vérifier palmarès exact + ajouter photos réelles avec le club. */
export const CHAMPIONS = [
  { name: "Johnson Suffo", last: "Suffo", weight: "Poids moyen", record: "Invaincu chez les pros", years: "Pro 2023", note: "10ᵉ Français au classement Boxrec · 28 combats amateurs", img: "/assets/img/bc/cutouts/johnson-suffo.png" },
  { name: "Salomon Kitoko", last: "Kitoko", weight: "Super-plume", record: "Invaincu chez les pros", years: "Pro 2023", note: "Le technicien de la maison — vitesse, lecture, sang-froid", img: "/assets/img/bc/cutouts/salomon-kitoko.png" },
  { name: "Elyasse Azap", last: "Azap", weight: "Poids welter", record: "Passé professionnel", years: "Pro 2024", note: "Pur produit de l'école amateur des Minimes", img: "/assets/img/bc/cutouts/elyasse-azap.png" },
  { name: "L'école", last: "École", weight: "Le vivier", record: "Une trentaine d'amateurs sur le ring", years: "Depuis 2016", note: "5 passés pros sur la seule saison 2024-25 — la relève ne s'arrête jamais", img: "/assets/img/bc/cutouts/coach-dadi.png" },
];

export const VALUES = [
  { n: "01", t: "L'humilité d'abord", d: "Ici, on laisse l'ego au vestiaire. Le ring ne ment jamais." },
  { n: "02", t: "La transmission", d: "Des anciens qui forment les jeunes. Une chaîne ininterrompue depuis l'ouverture." },
  { n: "03", t: "Le travail", d: "Pas de raccourci. Le talent, c'est dix ans de pattes d'ours." },
  { n: "04", t: "La famille", d: "Toutes les couches sociales, le même vestiaire. On repart rarement seul." },
];

export const AUDIENCES = [
  { t: "Les débutants", tag: "Première fois", d: "Jamais mis un gant ? C'est exactement pour toi. Créneaux dédiés, zéro jugement — on t'apprend, à ton rythme.", img: "/assets/img/bc/training-1.webp" },
  { t: "Les femmes", tag: "Lady Punch", d: "Lady Punch et cours mixtes : la boxe sans cliché, pour la forme comme pour la confiance. Un créneau 100 % féminin.", img: "/assets/img/bc/lady-1.webp" },
  { t: "Les enfants", tag: "Dès 7 ans", d: "Boxe éducative : discipline, respect et énergie canalisée. Le ring qui construit des enfants debout.", img: "/assets/img/bc/educative-1.webp" },
  { t: "Les compétiteurs", tag: "Le ring", d: "Trois rings, des sparrings réguliers, des coachs qui ont vécu la compétition. On t'amène au combat, prêt.", img: "/assets/img/bc/anglaise-2.webp" },
];

/* L'offre — reprend le dispositif commercial Boxing Center */
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
    name: "Offre Rentrée 2026",
    price: "dès 39€",
    period: "/ mois",
    feature: "L'abonnement saison 2026 / 2027",
    items: ["Accès illimité 6j/7", "Toutes les disciplines", "Sans frais de dossier en septembre"],
    cta: "Voir l'offre",
    href: "/tarifs/",
    highlight: true,
  },
  {
    name: "Boxe Éducative",
    price: "dès 280€",
    period: "/ an",
    feature: "Enfants & ados, dès 7 ans",
    items: ["2 créneaux par semaine", "Encadrement diplômé", "Matériel fourni"],
    cta: "Inscrire mon enfant",
    href: "/contact/",
    highlight: false,
  },
];

/* Le Club — histoire (timeline scroll) · ⚠ jalons à affiner avec le club */
export const TIMELINE = [
  { y: "2016", t: "Le point de départ", d: "Boxing Center ouvre sa toute première salle aux Minimes. Le concept des salles américaines, accès quasi 7j/7, trois rings : une vision claire pour tout un quartier." },
  { y: "2018", t: "Les premiers gants", d: "La boxe éducative et le Lady Punch décollent. Une génération de gamins et de femmes du quartier découvre le noble art." },
  { y: "2023", t: "Le passage pro", d: "Johnson et Salomon passent professionnels, invaincus. La preuve que l'école des Minimes mène loin." },
  { y: "2024", t: "Le vivier", d: "Cinq boxeurs maison passent pros sur la saison. Une trentaine d'amateurs montent sur le ring." },
  { y: "2026", t: "Le berceau", d: "Toujours la même salle qui sent le cuir, toujours les trois rings. L'école continue de forger." },
];

export const SPECS = [
  { l: "Rings de boxe", v: "3" },
  { l: "Sacs lourds", v: "12" },
  { l: "Zone pattes d'ours", v: "Oui" },
  { l: "Prépa physique (étage)", v: "Oui" },
  { l: "Vestiaires", v: "H / F" },
  { l: "Affiliations", v: "FFBoxe · FFKMDA" },
];

/* Le réseau Boxing Center (liens sortants depuis Minimes) */
export const NETWORK = [
  { id: "portet", name: "Portet-sur-Garonne", flagship: true, tag: "Le vaisseau amiral", feat: "800 m² · ring olympique · cage MMA", url: "https://www.boxing-center-portet.fr/" },
  { id: "etats-unis", name: "États-Unis", tag: "Le colosse", feat: "Grande salle combat · cage MMA", url: "https://boxingcenter.fr/" },
  { id: "saint-cyprien", name: "Saint-Cyprien", tag: "Le neuf", feat: "1 200 m² · toutes disciplines", url: "https://boxingcenter.fr/" },
  { id: "ramonville", name: "Ramonville", tag: "L'octogone", feat: "Ring + octogone 7 m · extérieur", url: "https://boxingcenter.fr/" },
  { id: "balma", name: "Balma-Gramont", tag: "Pieds-poings", feat: "Kick boxing · cross training", url: "https://boxingcenter.fr/" },
];

export const FAQ = [
  { q: "Où se trouve Boxing Center Minimes ?", a: "Au 12 rue de Fenouillet, 31200 Toulouse, dans le quartier des Minimes — Barrière de Paris, à 3 minutes du métro ligne B." },
  { q: "Faut-il de l'expérience pour commencer ?", a: "Non. Les Minimes accueillent autant le grand débutant que le boxeur confirmé. Des créneaux débutants et du cardio boxing sans contact existent pour démarrer en douceur." },
  { q: "Quelle est la spécialité de la salle des Minimes ?", a: "La boxe anglaise. C'est la salle historique du groupe, le berceau de plusieurs boxeurs professionnels et amateurs — avec trois rings dédiés." },
  { q: "Y a-t-il des cours pour les enfants ?", a: "Oui, la boxe éducative est ouverte dès 7 ans, avec un encadrement adapté et des tarifs enfants à partir de 280 € par an." },
  { q: "Proposez-vous des cours pour les femmes ?", a: "Oui. Le créneau Lady Punch est 100 % féminin, et tous les cours mixtes sont ouverts à toutes." },
  { q: "Quels sont les horaires ?", a: "Du lundi au samedi, de 10h00 à 21h30. Fermé le dimanche." },
];
