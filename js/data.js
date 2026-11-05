/* ============================================================
   CLUBIM — Données du site (biens & actualités)
   ============================================================ */

const LISTINGS = [
  {
    id: "moulin-bachy",
    titre: "Ancien moulin à farine transformé en habitation",
    type: "Maison",
    transaction: "achat",
    ville: "Bachy",
    prix: 735000,
    surface: 337,
    dpe: "D",
    ges: "C",
    photos: ["1","2","3","4","5","6","7","8","9","10","11","12"].map((n) => `assets/photos/moulin-bachy/${n}.jpg`),
    art: { style: "bourgeoise", palette: "cream" },
    description:
      "À Bachy, dans la campagne de la Pévèle, l'ancien moulin Delehaye, un moulin à farine du début du XXe siècle transformé en vaste habitation de 337 m².\n\nLes volumes sont ceux d'un bâtiment industriel : grandes pièces de vie aux murs sombres et parquets anciens, plafonds à poutres, cuisine ouverte sur un espace de réception, escaliers de caractère et, au cœur de la maison, l'ancienne machinerie du moulin conservée comme une pièce de musée. Les étages offrent des chambres sous combles éclairées par des fenêtres de toit.\n\nÀ l'extérieur, une cour pavée, un garage et un environnement très vert, ouvert sur les champs.\n\nVisites sur rendez-vous.",
    atouts: ["Bâtiment de caractère, début du XXe siècle", "337 m²", "Machinerie d'origine conservée", "Cour, garage, cadre verdoyant", "Campagne de la Pévèle"],
    mentions: [
      "Prix : 735 000 € honoraires inclus, à la charge du vendeur",
      "Diagnostic de performance énergétique : classe D. Classe climat (GES) : C",
      "Les informations sur les risques auxquels ce bien est exposé sont disponibles sur le site Géorisques : georisques.gouv.fr"
    ]
  },
  {
    id: "immeuble-anvers-lille",
    titre: "Immeuble à rénover entièrement, potentiel de trois lots",
    type: "Immeuble",
    transaction: "achat",
    ville: "Lille, Gambetta",
    prix: 209500,
    surface: 80,
    photos: ["1","2","3","4","5","6","7"].map((n) => `assets/photos/immeuble-anvers-lille/${n}.jpg`),
    art: { style: "haussmann", palette: "cream" },
    description:
      "En exclusivité CLUBIM, rue d'Anvers, secteur Gambetta, tout près de la place de la République : un immeuble de ville entièrement à rénover.\n\nIl ne reste que l'essentiel : la structure, les planchers, les murs en briques et la toiture. Tout l'intérieur est à recréer, ce qui laisse les mains libres pour un projet complet. Selon nous, le bâtiment permet de créer trois lots : un rez-de-chaussée commercial et deux appartements, dont un avec mezzanine au dernier étage, ou trois appartements, sous réserve des autorisations d'urbanisme.\n\nUn projet pour investisseur, marchand de biens ou acquéreur prêt à tout reprendre. Visites sur rendez-vous.",
    atouts: ["Exclusivité CLUBIM", "Secteur Gambetta, près de République", "Potentiel de trois lots (sous réserve d'autorisations)", "Structure, planchers et toiture conservés"],
    mentions: [
      "Prix : 209 500 € honoraires inclus, dont 9 500 € d'honoraires à la charge du vendeur (prix hors honoraires : 200 000 €)",
      "Surface : 80 m² selon le diagnostic",
      "Bien non soumis au DPE (absence de système de chauffage)",
      "Les informations sur les risques auxquels ce bien est exposé sont disponibles sur le site Géorisques : georisques.gouv.fr"
    ]
  },
  {
    id: "colocation-lille-saint-maurice",
    titre: "Chambre en colocation étudiante, tout compris",
    type: "Maison",
    transaction: "location",
    ville: "Lille, Saint-Maurice",
    prix: 550,
    surface: 16.64,
    pieces: 1,
    dpe: "C",
    ges: "D",
    photos: ["1","2","3","4","5","6","7","9","10"].map((n) => `assets/photos/colocation-lille-saint-maurice/${n}.jpg`),
    art: { style: "bourgeoise", palette: "cream" },
    description:
      "Une chambre se libère dans une maison de 134 m² partagée entre quatre étudiants, rue Allard Dugauquier, à deux pas des métros Caulier et Lille Saint-Maurice.\n\nLa chambre est meublée et équipée (lit double, rangements). Les espaces communs sont partagés : cuisine équipée, grande pièce de vie, salle de bain, WC séparés et un beau jardin avec table et chaises.\n\nTout est compris dans le loyer : électricité, gaz, chauffage, eau, internet fibre et taxe d'ordures ménagères. Bail individuel à la chambre, éligible aux APL.",
    atouts: ["Tout compris : énergie, eau, internet fibre", "Métros Caulier et Saint-Maurice à pied", "Jardin partagé", "Cuisine équipée, lave-linge, lave-vaisselle", "Bail individuel, éligible aux APL"],
    mentions: [
      "Loyer : 550 € par mois charges comprises, soit 430 € de loyer + 120 € de provision sur charges (électricité, gaz, eau, internet, taxe d'ordures ménagères), régularisation annuelle",
      "Dépôt de garantie : 860 €",
      "Honoraires à la charge du locataire, état des lieux compris : 240 € TTC",
      "Logement situé en zone soumise à l'encadrement des loyers",
      "Les informations sur les risques auxquels ce bien est exposé sont disponibles sur le site Géorisques : georisques.gouv.fr"
    ]
  },
  {
    id: "studio-41-mons-en-baroeul",
    titre: "Studio de 41 m²",
    type: "Appartement",
    transaction: "location",
    ville: "Mons-en-Barœul",
    prix: 622.23,
    surface: 41,
    pieces: 1,
    dpe: "E",
    ges: "B",
    photos: ["1","2","3","4","5","6","7"].map((n) => `assets/photos/studio-41-mons-en-baroeul/${n}.jpg`),
    art: { style: "moderne", palette: "cream" },
    description:
      "Studio de 41 m² dans une résidence de la rue Laurent Lavoisier à Mons-en-Barœul, disponible à partir du 4 décembre 2026.\n\nLa pièce principale, très lumineuse, s'ouvre sur cinq fenêtres en double vitrage avec volets roulants. Coin cuisine équipé (plaques, four, hotte, rangements hauts et bas) et grande salle d'eau carrelée avec douche, vasque sur meuble et WC. Chauffage électrique.\n\nLes visites se font sur rendez-vous.",
    atouts: ["41 m², pièce de vie très lumineuse", "Cuisine équipée : plaques, four, hotte", "Grande salle d'eau avec douche", "Double vitrage et volets roulants", "Terrasse commune aménagée sur le toit", "Disponible le 4 décembre 2026"],
    mentions: [
      "Loyer : 622,23 € par mois charges comprises, soit 562,23 € de loyer + 60 € de provision sur charges, régularisation annuelle",
      "Dépôt de garantie : 562,23 €",
      "Honoraires à la charge du locataire, état des lieux compris : 539,88 € TTC",
      "Les informations sur les risques auxquels ce bien est exposé sont disponibles sur le site Géorisques : georisques.gouv.fr"
    ]
  },
  {
    id: "local-27-roubaix",
    titre: "Local de 27 m² avec vitrine, rénové",
    type: "Local commercial",
    transaction: "location",
    ville: "Roubaix",
    prix: 576,
    surface: 26.5,
    photos: ["1","2","3"].map((n) => `assets/photos/local-27-roubaix/${n}.jpg`),
    art: { style: "moderne", palette: "navy" },
    description:
      "Rue Jean Moulin à Roubaix, près du centre hospitalier, du centre-ville, du tramway et du parc Barbieux, un local de 26,50 m² en rez-de-chaussée, avec une grande vitrine sur rue.\n\nRénové en 2022 : murs isolés, sol clair effet parquet, murs blancs, plafonniers, radiateurs électriques programmables, VMC, menuiseries bois double vitrage. L'espace principal de 22,48 m² accueille un poste de soin, un fauteuil ou un bureau d'accueil ; un rangement et un WC complètent le local.\n\nActivités possibles : esthétique, beauté, soins du corps, cabinet ou activité professionnelle, showroom. Restauration interdite. Bail commercial 3-6-9 ou bail professionnel, au choix du preneur.",
    atouts: ["Vitrine sur rue", "Rénové en 2022", "Tramway et centre hospitalier à proximité", "Bail commercial ou professionnel au choix"],
    mentions: [
      "Loyer : 576 € par mois charges comprises, soit 511 € de loyer (non soumis à TVA) + 65 € de provision sur charges",
      "Dépôt de garantie : 1 533 €",
      "Honoraires à la charge du preneur : 766,50 € TTC",
      "Les informations sur les risques auxquels ce bien est exposé sont disponibles sur le site Géorisques : georisques.gouv.fr"
    ]
  },
  {
    id: "local-42-mons-en-baroeul",
    titre: "Local de 42 m² avec vitrine, de plain-pied",
    type: "Local commercial",
    transaction: "location",
    ville: "Mons-en-Barœul",
    prix: 795,
    surface: 42,
    photos: ["1","2","3","4","5"].map((n) => `assets/photos/local-42-mons-en-baroeul/${n}.jpg`),
    art: { style: "moderne", palette: "navy" },
    description:
      "Rue Laurent Lavoisier à Mons-en-Barœul, un local de 42 m² en rez-de-chaussée, entièrement rénové et disponible tout de suite.\n\nUne grande pièce lumineuse avec vitrine sur rue et un WC avec meuble vasque. Sol stratifié aspect bois, murs blancs, chauffage électrique individuel, double vitrage, VMC, accès de plain-pied.",
    atouts: ["Disponible immédiatement", "Vitrine sur rue", "Entièrement rénové", "Accès de plain-pied"],
    mentions: [
      "Loyer : 795 € par mois charges comprises, soit 700 € de loyer + 95 € de charges (eau, ordures ménagères, quote-part de taxe foncière), provision avec régularisation annuelle",
      "Dépôt de garantie : 2 100 €",
      "Honoraires à la charge du preneur : 1 050 € TTC",
      "Local non soumis au DPE",
      "Les informations sur les risques auxquels ce bien est exposé sont disponibles sur le site Géorisques : georisques.gouv.fr"
    ]
  },
  {
    id: "bureaux-505-lille-centre",
    titre: "Immeuble de bureaux de 505 m², rénové",
    type: "Bureaux",
    transaction: "location",
    ville: "Lille, République",
    prix: 10223,
    surface: 505,
    photos: ["1","2","3","4","5","6","7","8"].map((n) => `assets/photos/bureaux-505-lille-centre/${n}.jpg`),
    art: { style: "haussmann", palette: "navy" },
    description:
      "Rue Gauthier de Châtillon, à deux pas de la place de la République, en plein centre de Lille et tout près des transports, un immeuble de bureaux entièrement rénové de 504,89 m² (surface certifiée par mesurage).\n\nRez-de-chaussée avec accueil, showroom et salle de réunion ; cinq bureaux aux 1er et 2e étages, quatre aux 3e et 4e (de 10 à 25 m²) ; caves sur deux niveaux. Ascenseur à tous les étages, faux plafonds acoustiques avec éclairage LED, radiateurs neufs, câblage réseau en place.\n\nAdapté à un centre de formation, un centre de santé, un cabinet de professions libérales ou une structure associative.",
    atouts: ["Quartier République, centre de Lille", "Ascenseur à tous les étages", "Entièrement rénové", "Bail commercial 3-6-9, usage de bureaux"],
    mentions: [
      "Loyer : 9 833 € HT par mois + 390 € de provision sur charges (régularisation annuelle), TVA non applicable",
      "Dépôt de garantie : 29 500 €",
      "Honoraires à la charge du preneur : 17 700 € TTC",
      "Les informations sur les risques auxquels ce bien est exposé sont disponibles sur le site Géorisques : georisques.gouv.fr"
    ]
  },
  {
    id: "local-66-roubaix",
    titre: "Local de 66 m² avec grande vitrine",
    type: "Local commercial",
    transaction: "location",
    ville: "Roubaix",
    prix: 795,
    surface: 66,
    photos: ["1","2","3","4"].map((n) => `assets/photos/local-66-roubaix/${n}.jpg`),
    art: { style: "moderne", palette: "navy" },
    description:
      "Rue Jean Moulin à Roubaix, près du centre hospitalier, du centre-ville, du tramway et du parc Barbieux, un local d'environ 66 m² au rez-de-chaussée d'une résidence récente, rénové en 2022.\n\nUne grande surface d'accueil baignée de lumière par une large vitrine sur rue, et un espace sanitaire avec lavabo et WC. Chauffage électrique individuel.\n\nActivités possibles : activité professionnelle (bureau, cabinet), esthétique, beauté, soins du corps, showroom, boutique. Restauration et épicerie alimentaire refusées.",
    atouts: ["Grande vitrine sur rue", "Rénové en 2022", "Tramway et centre hospitalier à proximité", "Disponible tout de suite"],
    mentions: [
      "Loyer : 795 € par mois charges comprises, soit 730 € de loyer + 65 € de provision sur charges (eau, taxe foncière), régularisation annuelle",
      "Dépôt de garantie : 1 090 €",
      "Honoraires à la charge du preneur, état des lieux compris : 1 095 € TTC",
      "Les informations sur les risques auxquels ce bien est exposé sont disponibles sur le site Géorisques : georisques.gouv.fr"
    ]
  },
  {
    id: "parking-meurein-vauban",
    titre: "Place de parking souterrain",
    type: "Parking",
    transaction: "location",
    ville: "Lille, Vauban",
    prix: 100,
    art: { style: "moderne", palette: "navy" },
    description:
      "Rue Meurein, à l'angle du boulevard Vauban, une place de parking en sous-sol pour une voiture, avec accès par portail automatique et bip.\n\nGabarit accepté jusqu'au SUV ou au petit utilitaire de type Kangoo. Les grands fourgons ne passent pas. Aucun dossier demandé : seule la taille du véhicule compte. Disponible immédiatement.",
    atouts: ["Parking souterrain sécurisé", "Portail automatique avec bip", "Jusqu'au SUV ou petit utilitaire", "Disponible immédiatement"],
    mentions: [
      "Loyer : 100 € par mois",
      "Dépôt de garantie : 200 €",
      "Honoraires à la charge du locataire : 240 € TTC"
    ]
  }
];

const ARTICLES = []; // actualités retirées tant qu'elles ne sont pas réécrites avec de vrais sujets

/* ============================================================
   Générateur d'illustrations SVG — façades géométriques
   aux couleurs CLUBIM (gris / rouge)
   ============================================================ */

const ART_PALETTES = {
  navy: { bg: "#2B2B2B", bg2: "#262626", line: "#BE3A48", fill: "#353535", accent: "#E9707C", glow: "rgba(233,112,124,0.45)" },
  cream: { bg: "#F4F3F1", bg2: "#ECEAE7", line: "#2B2B2B", fill: "#E6E3DF", accent: "#BE3A48", glow: "rgba(43,43,43,0.25)" }
};

function _windows(x, y, cols, rows, w, h, gapX, gapY, color, litColor, seed) {
  let s = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const lit = ((r * 7 + c * 13 + seed) % 5) === 0;
      s += `<rect x="${x + c * (w + gapX)}" y="${y + r * (h + gapY)}" width="${w}" height="${h}" fill="${lit ? litColor : "none"}" stroke="${color}" stroke-width="1.2"/>`;
    }
  }
  return s;
}

function buildingArt(style, paletteName, seed = 0) {
  const p = ART_PALETTES[paletteName] || ART_PALETTES.navy;
  const W = 800, H = 600;
  let scene = "";

  // fond + horizon
  scene += `<rect width="${W}" height="${H}" fill="${p.bg}"/>`;
  scene += `<rect width="${W}" height="${H}" fill="url(#grad${seed})" opacity="0.5"/>`;
  scene += `<line x1="0" y1="470" x2="${W}" y2="470" stroke="${p.line}" stroke-width="1" opacity="0.6"/>`;
  // astre géométrique
  scene += `<g transform="translate(640,130) rotate(45)"><rect x="-34" y="-34" width="68" height="68" fill="none" stroke="${p.accent}" stroke-width="1.4"/><rect x="-18" y="-18" width="36" height="36" fill="${p.accent}" opacity="0.85"/></g>`;

  const L = p.line, A = p.accent, F = p.fill, G = p.glow;

  switch (style) {
    case "hotel":
      scene += `<rect x="240" y="200" width="320" height="270" fill="${F}" stroke="${L}" stroke-width="2"/>`;
      scene += `<polygon points="240,200 400,130 560,200" fill="${F}" stroke="${L}" stroke-width="2"/>`;
      scene += _windows(270, 230, 4, 3, 48, 56, 22, 24, L, G, seed);
      scene += `<rect x="372" y="392" width="56" height="78" fill="none" stroke="${A}" stroke-width="2"/>`;
      scene += `<path d="M372 392 a28 28 0 0 1 56 0" fill="none" stroke="${A}" stroke-width="2"/>`;
      scene += `<rect x="180" y="330" width="60" height="140" fill="${F}" stroke="${L}" stroke-width="1.5"/><rect x="560" y="330" width="60" height="140" fill="${F}" stroke="${L}" stroke-width="1.5"/>`;
      break;
    case "haussmann":
      scene += `<rect x="220" y="150" width="360" height="320" fill="${F}" stroke="${L}" stroke-width="2"/>`;
      scene += `<rect x="220" y="150" width="360" height="34" fill="none" stroke="${L}" stroke-width="2"/>`;
      scene += `<line x1="220" y1="280" x2="580" y2="280" stroke="${L}" stroke-width="1" opacity="0.7"/>`;
      scene += _windows(248, 204, 5, 4, 42, 50, 25, 18, L, G, seed);
      scene += `<rect x="236" y="262" width="328" height="6" fill="none" stroke="${A}" stroke-width="1"/>`;
      break;
    case "villa":
      scene += `<polygon points="200,300 360,190 520,300" fill="${F}" stroke="${L}" stroke-width="2"/>`;
      scene += `<rect x="220" y="300" width="280" height="170" fill="${F}" stroke="${L}" stroke-width="2"/>`;
      scene += `<rect x="520" y="340" width="140" height="130" fill="${F}" stroke="${L}" stroke-width="1.5"/>`;
      scene += _windows(250, 330, 3, 2, 52, 48, 28, 26, L, G, seed);
      scene += `<rect x="548" y="368" width="84" height="46" fill="none" stroke="${L}" stroke-width="1.2"/>`;
      scene += `<rect x="350" y="392" width="50" height="78" fill="none" stroke="${A}" stroke-width="2"/>`;
      scene += `<circle cx="360" cy="240" r="0"/><polygon points="354,212 360,200 366,212 360,224" fill="${A}"/>`;
      break;
    case "loft":
      scene += `<rect x="180" y="280" width="440" height="190" fill="${F}" stroke="${L}" stroke-width="2"/>`;
      scene += `<polygon points="180,280 250,225 250,280" fill="${F}" stroke="${L}" stroke-width="2"/>`;
      scene += `<polygon points="290,280 360,225 360,280" fill="${F}" stroke="${L}" stroke-width="2"/>`;
      scene += `<polygon points="400,280 470,225 470,280" fill="${F}" stroke="${L}" stroke-width="2"/>`;
      scene += `<polygon points="510,280 580,225 580,280" fill="${F}" stroke="${L}" stroke-width="2"/>`;
      scene += _windows(210, 310, 6, 2, 52, 56, 14, 18, L, G, seed);
      break;
    case "bourgeoise":
      scene += `<rect x="270" y="190" width="260" height="280" fill="${F}" stroke="${L}" stroke-width="2"/>`;
      scene += `<polygon points="270,190 400,120 530,190" fill="${F}" stroke="${L}" stroke-width="2"/>`;
      scene += `<rect x="380" y="92" width="40" height="60" fill="${F}" stroke="${L}" stroke-width="1.5"/>`;
      scene += _windows(296, 220, 3, 3, 52, 56, 26, 22, L, G, seed);
      scene += `<rect x="372" y="396" width="56" height="74" fill="none" stroke="${A}" stroke-width="2"/>`;
      break;
    case "moderne":
      scene += `<rect x="230" y="240" width="220" height="230" fill="${F}" stroke="${L}" stroke-width="2"/>`;
      scene += `<rect x="450" y="180" width="160" height="290" fill="${F}" stroke="${L}" stroke-width="2"/>`;
      scene += `<rect x="410" y="300" width="40" height="170" fill="none" stroke="${L}" stroke-width="1.2"/>`;
      scene += _windows(255, 270, 3, 3, 50, 44, 22, 22, L, G, seed);
      scene += _windows(472, 208, 2, 4, 50, 44, 24, 20, L, G, seed + 2);
      scene += `<line x1="230" y1="240" x2="610" y2="240" stroke="${A}" stroke-width="1" opacity="0.7"/>`;
      break;
    case "tour":
      scene += `<rect x="330" y="110" width="150" height="360" fill="${F}" stroke="${L}" stroke-width="2"/>`;
      scene += `<polygon points="330,110 405,70 480,110" fill="${F}" stroke="${L}" stroke-width="2"/>`;
      scene += `<rect x="210" y="280" width="120" height="190" fill="${F}" stroke="${L}" stroke-width="1.5"/>`;
      scene += `<rect x="480" y="320" width="130" height="150" fill="${F}" stroke="${L}" stroke-width="1.5"/>`;
      scene += _windows(348, 140, 3, 6, 32, 36, 17, 16, L, G, seed);
      scene += _windows(228, 306, 2, 3, 38, 36, 24, 18, L, G, seed + 1);
      break;
    case "immeuble":
      scene += `<rect x="250" y="160" width="300" height="310" fill="${F}" stroke="${L}" stroke-width="2"/>`;
      scene += `<rect x="250" y="160" width="300" height="28" fill="none" stroke="${L}" stroke-width="2"/>`;
      scene += _windows(276, 208, 4, 4, 44, 44, 26, 18, L, G, seed);
      scene += `<rect x="372" y="406" width="56" height="64" fill="none" stroke="${A}" stroke-width="2"/>`;
      break;
    case "local":
      scene += `<rect x="220" y="240" width="360" height="230" fill="${F}" stroke="${L}" stroke-width="2"/>`;
      scene += `<rect x="220" y="240" width="360" height="44" fill="none" stroke="${A}" stroke-width="2"/>`;
      scene += `<rect x="244" y="316" width="200" height="154" fill="${G}" stroke="${L}" stroke-width="1.5" fill-opacity="0.25"/>`;
      scene += `<line x1="294" y1="316" x2="294" y2="470" stroke="${L}" stroke-width="1"/><line x1="344" y1="316" x2="344" y2="470" stroke="${L}" stroke-width="1"/><line x1="394" y1="316" x2="394" y2="470" stroke="${L}" stroke-width="1"/>`;
      scene += `<rect x="476" y="346" width="70" height="124" fill="none" stroke="${A}" stroke-width="2"/>`;
      break;
    case "contemporaine":
    default:
      scene += `<rect x="200" y="300" width="400" height="170" fill="${F}" stroke="${L}" stroke-width="2"/>`;
      scene += `<rect x="320" y="210" width="200" height="90" fill="${F}" stroke="${L}" stroke-width="2"/>`;
      scene += _windows(226, 330, 5, 2, 56, 50, 18, 22, L, G, seed);
      scene += _windows(344, 234, 3, 1, 46, 44, 22, 0, L, G, seed + 3);
      scene += `<line x1="200" y1="300" x2="600" y2="300" stroke="${A}" stroke-width="1.2"/>`;
      break;
  }

  // sol — reflets
  scene += `<line x1="120" y1="500" x2="330" y2="500" stroke="${L}" stroke-width="1" opacity="0.35"/>`;
  scene += `<line x1="420" y1="522" x2="690" y2="522" stroke="${L}" stroke-width="1" opacity="0.25"/>`;

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">` +
    `<defs><linearGradient id="grad${seed}" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0" stop-color="${p.bg2}"/><stop offset="1" stop-color="${p.bg}"/>` +
    `</linearGradient></defs>${scene}</svg>`;

  return "data:image/svg+xml," + encodeURIComponent(svg);
}

function listingArt(listing, seed = 0) {
  return buildingArt(listing.art.style, listing.art.palette, seed);
}

function formatPrix(listing) {
  const n = listing.prix.toLocaleString("fr-FR");
  return listing.transaction === "location" ? `${n} € / mois` : `${n} €`;
}
