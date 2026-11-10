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
    art: { style: "parking", palette: "cream" },
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
   Générateur d'illustrations SVG : façades douces et arrondies
   aux couleurs CLUBIM (refonte du 10/11/2026 : fond crème,
   traits gris clair, touches de rouge adouci, plus de fond noir)
   ============================================================ */

const ART_PALETTES = {
  // « navy » est gardé comme nom pour compatibilité : il donne désormais la variante rosée
  navy:  { bg: "#F7EEEF", sun: "#F1D9DC", hill: "#EFE2E3", wall: "#FFFFFF", roof: "#E7B9BF", line: "#D8CBC8", win: "#F4ECEA", lit: "#F6D7DB", accent: "#C9505D", tree: "#E3D6D4" },
  cream: { bg: "#F6F3F1", sun: "#F2DFE1", hill: "#ECE6E2", wall: "#FFFFFF", roof: "#DCCFCB", line: "#D6CCC8", win: "#F3EEEB", lit: "#F6D7DB", accent: "#C9505D", tree: "#E2DAD6" }
};

function _windows(x, y, cols, rows, w, h, gapX, gapY, p, seed) {
  let s = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const lit = ((r * 7 + c * 13 + seed) % 5) === 0;
      s += `<rect x="${x + c * (w + gapX)}" y="${y + r * (h + gapY)}" width="${w}" height="${h}" rx="7" fill="${lit ? p.lit : p.win}" stroke="${p.line}" stroke-width="1.5"/>`;
    }
  }
  return s;
}

function _door(x, y, w, h, p) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w / 2}" ry="${w / 2}" fill="${p.accent}" opacity="0.85"/>` +
    `<rect x="${x}" y="${y + h - w / 2}" width="${w}" height="${w / 2}" fill="${p.accent}" opacity="0.85"/>`;
}

function _tree(x, y, r, p) {
  return `<rect x="${x - 3}" y="${y}" width="6" height="${r * 1.4}" rx="3" fill="${p.line}"/>` +
    `<circle cx="${x}" cy="${y}" r="${r}" fill="${p.tree}"/>`;
}

function buildingArt(style, paletteName, seed = 0) {
  const p = ART_PALETTES[paletteName] || ART_PALETTES.cream;
  const W = 800, H = 600;
  const wall = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${p.wall}" stroke="${p.line}" stroke-width="2"/>`;
  const roof = (pts) => `<polygon points="${pts}" fill="${p.roof}" stroke="${p.line}" stroke-width="2" stroke-linejoin="round"/>`;
  let scene = "";

  // fond, soleil et colline douces
  scene += `<rect width="${W}" height="${H}" fill="${p.bg}"/>`;
  scene += `<circle cx="${610 + (seed % 3) * 20}" cy="150" r="72" fill="${p.sun}"/>`;
  scene += `<ellipse cx="400" cy="560" rx="560" ry="120" fill="${p.hill}"/>`;

  switch (style) {
    case "hotel":
      scene += roof("230,210 400,140 570,210");
      scene += wall(240, 205, 320, 265);
      scene += _windows(270, 235, 4, 3, 48, 52, 22, 22, p, seed);
      scene += _door(374, 400, 52, 70, p);
      scene += wall(180, 330, 60, 140) + wall(560, 330, 60, 140);
      break;
    case "haussmann":
      scene += wall(220, 150, 360, 320);
      scene += `<rect x="220" y="150" width="360" height="34" rx="14" fill="${p.roof}" stroke="${p.line}" stroke-width="2"/>`;
      scene += _windows(248, 204, 5, 4, 42, 48, 25, 18, p, seed);
      break;
    case "villa":
      scene += roof("200,305 360,195 520,305");
      scene += wall(220, 300, 280, 170);
      scene += wall(520, 345, 140, 125);
      scene += _windows(250, 330, 3, 1, 52, 48, 28, 0, p, seed);
      scene += `<rect x="548" y="372" width="84" height="44" rx="7" fill="${p.win}" stroke="${p.line}" stroke-width="1.5"/>`;
      scene += _door(352, 396, 46, 74, p);
      scene += _tree(150, 400, 34, p);
      break;
    case "loft":
      scene += wall(180, 280, 440, 190);
      for (const x of [180, 290, 400, 510]) scene += roof(`${x},282 ${x + 70},228 ${x + 70},282`);
      scene += _windows(210, 310, 6, 2, 52, 52, 14, 18, p, seed);
      break;
    case "bourgeoise":
      scene += `<rect x="382" y="96" width="36" height="60" rx="6" fill="${p.wall}" stroke="${p.line}" stroke-width="2"/>`;
      scene += roof("262,195 400,120 538,195");
      scene += wall(270, 190, 260, 280);
      scene += _windows(296, 220, 3, 3, 52, 52, 26, 22, p, seed);
      scene += _door(374, 398, 52, 72, p);
      scene += _tree(600, 410, 38, p);
      break;
    case "tour":
      scene += wall(330, 110, 150, 360);
      scene += wall(210, 280, 120, 190) + wall(480, 320, 130, 150);
      scene += _windows(348, 140, 3, 6, 32, 34, 17, 16, p, seed);
      scene += _windows(228, 306, 2, 3, 38, 34, 24, 18, p, seed + 1);
      break;
    case "immeuble":
      scene += wall(250, 160, 300, 310);
      scene += _windows(276, 200, 4, 4, 44, 44, 26, 18, p, seed);
      scene += _door(374, 404, 52, 66, p);
      break;
    case "local":
      scene += wall(220, 240, 360, 230);
      scene += `<rect x="220" y="240" width="360" height="44" rx="14" fill="${p.roof}" stroke="${p.line}" stroke-width="2"/>`;
      scene += `<rect x="244" y="312" width="200" height="158" rx="10" fill="${p.win}" stroke="${p.line}" stroke-width="1.5"/>`;
      scene += _door(478, 344, 66, 126, p);
      break;
    case "parking":
      // entrée de parking souterrain : rampe, porte et panneau P
      scene += wall(170, 250, 460, 220);
      scene += `<rect x="250" y="330" width="300" height="140" rx="16" fill="${p.win}" stroke="${p.line}" stroke-width="2"/>`;
      for (let i = 0; i < 5; i++) scene += `<line x1="266" y1="${352 + i * 22}" x2="534" y2="${352 + i * 22}" stroke="${p.line}" stroke-width="2" stroke-linecap="round"/>`;
      scene += `<path d="M230 470 Q400 520 570 470" fill="none" stroke="${p.line}" stroke-width="2"/>`;
      scene += `<rect x="572" y="170" width="8" height="160" rx="4" fill="${p.line}"/>`;
      scene += `<rect x="536" y="120" width="80" height="80" rx="18" fill="${p.accent}" opacity="0.9"/>`;
      scene += `<text x="576" y="178" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="52" font-weight="600" fill="#FFFFFF">P</text>`;
      break;
    case "moderne":
    case "contemporaine":
    default:
      scene += wall(230, 240, 220, 230);
      scene += wall(450, 180, 160, 290);
      scene += _windows(255, 270, 3, 3, 50, 42, 22, 22, p, seed);
      scene += _windows(472, 208, 2, 4, 50, 44, 24, 20, p, seed + 2);
      scene += _door(316, 400, 48, 70, p);
      break;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">${scene}</svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}

function listingArt(listing, seed = 0) {
  return buildingArt(listing.art.style, listing.art.palette, seed);
}

function formatPrix(listing) {
  const n = listing.prix.toLocaleString("fr-FR");
  return listing.transaction === "location" ? `${n} € / mois` : `${n} €`;
}
