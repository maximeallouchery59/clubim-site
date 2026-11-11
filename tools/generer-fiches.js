#!/usr/bin/env node
/* ============================================================
   CLUBIM : génère une page statique par bien (bien-<id>.html)
   à partir de js/data.js et du gabarit bien.html, puis met à
   jour sitemap.xml.

   Usage, depuis la racine du dépôt :  node tools/generer-fiches.js
   À relancer après chaque ajout, modification ou retrait de bien.
   ============================================================ */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const SITE = "https://clubim.fr/";
const today = new Date().toISOString().slice(0, 10);

// Charge LISTINGS depuis js/data.js
const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, "js/data.js"), "utf8") + "\nthis.LISTINGS = LISTINGS;", ctx);
const LISTINGS = ctx.LISTINGS;

const tpl = fs.readFileSync(path.join(ROOT, "bien.html"), "utf8");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const prixTxt = (b) => {
  const n = b.prix.toLocaleString("fr-FR", { maximumFractionDigits: 2 }).replace(/ | /g, " ");
  return b.transaction === "location" ? `${n} € par mois charges comprises` : `${n} € honoraires inclus`;
};
const villeCourte = (v) => v.split(",")[0].trim();
const cut = (s, n) => {
  s = s.replace(/\s+/g, " ").trim();
  if (s.length <= n) return s;
  const t = s.slice(0, n - 1);
  return t.slice(0, t.lastIndexOf(" ")).replace(/[,;:.]$/, "") + "…";
};

// Supprime les anciennes fiches générées (biens retirés)
for (const f of fs.readdirSync(ROOT)) {
  if (/^bien-.+\.html$/.test(f)) fs.unlinkSync(path.join(ROOT, f));
}

const pages = [];
for (const b of LISTINGS) {
  if (b.statut === "vendu") continue;
  const file = `bien-${b.id}.html`;
  const url = SITE + file;
  const action = b.transaction === "location" ? "à louer" : "à vendre";
  const ville = villeCourte(b.ville);

  const court = b.titre.split(",")[0].trim();
  let title = `${court} ${action} à ${ville} | CLUBIM`;
  if (title.length > 66) title = `${b.type} ${action} à ${ville}${b.surface ? `, ${b.surface.toLocaleString("fr-FR")} m²` : ""} | CLUBIM`;
  const firstPara = b.description.split(/\n\s*\n/)[0];
  const surf = b.surface && !/m²/.test(court) ? `, ${b.surface.toLocaleString("fr-FR")} m²` : "";
  const desc = cut(`${court} ${action} à ${b.ville}${surf}, ${prixTxt(b)}. ${firstPara}`, 158);
  const img = b.photos && b.photos.length ? SITE + b.photos[0] : SITE + "assets/og-clubim.jpg";

  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      name: b.titre,
      description: cut(b.description, 500),
      url,
      image: (b.photos && b.photos.length ? b.photos : ["assets/og-clubim.jpg"]).slice(0, 5).map((p) => SITE + p),
      datePosted: today,
      offers: {
        "@type": "Offer",
        price: b.prix,
        priceCurrency: "EUR",
        businessFunction: b.transaction === "location" ? "http://purl.org/goodrelations/v1#LeaseOut" : "http://purl.org/goodrelations/v1#Sell",
        availability: "https://schema.org/InStock",
        seller: { "@type": "RealEstateAgent", name: "CLUBIM", url: SITE, telephone: "+33606549798" }
      },
      contentLocation: {
        "@type": "Place",
        address: { "@type": "PostalAddress", addressLocality: ville, addressRegion: "Hauts-de-France", addressCountry: "FR" }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE },
        { "@type": "ListItem", position: 2, name: "Nos annonces", item: SITE + "annonces.html" },
        { "@type": "ListItem", position: 3, name: b.titre, item: url }
      ]
    }
  ];
  if (b.surface) ld[0].contentLocation.floorSize = { "@type": "QuantitativeValue", value: b.surface, unitCode: "MTK" };

  // Contenu lisible sans JavaScript (remplacé par js/bien.js au chargement)
  const pre = `
      <div class="bien-static">
        <p class="kicker">${b.transaction === "location" ? "À louer" : "À vendre"} · ${esc(b.ville)}</p>
        <h1 class="bien-title">${esc(b.titre)}</h1>
        <p><strong>${esc(prixTxt(b))}</strong>${b.surface ? ` · ${b.surface} m²` : ""}${b.dpe ? ` · DPE ${b.dpe}` : ""}</p>
        ${b.photos && b.photos.length ? `<img src="${b.photos[0]}" alt="${esc(b.titre)}, ${esc(b.ville)}" width="1600" height="900">` : ""}
        ${b.description.split(/\n\s*\n/).map((p) => `<p>${esc(p)}</p>`).join("\n        ")}
        ${b.atouts && b.atouts.length ? `<ul>${b.atouts.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>` : ""}
        ${b.mentions && b.mentions.length ? `<ul class="bien-mentions">${b.mentions.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>` : ""}
        <p><a href="tel:+33606549798">Appeler CLUBIM au 06 06 54 97 98</a> · <a href="contact.html">Nous écrire</a></p>
      </div>`;

  let html = tpl
    .replace(/<title>.*?<\/title>/s, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${esc(desc)}">\n  <link rel="canonical" href="${url}">`)
    .replace(/<meta property="og:type" content=".*?">/, `<meta property="og:type" content="article">\n  <meta property="og:url" content="${url}">`)
    .replace(/<meta property="og:title" content=".*?">/, `<meta property="og:title" content="${esc(title)}">`)
    .replace(/<meta property="og:description" content=".*?">/, `<meta property="og:description" content="${esc(desc)}">`)
    .replace(/<meta property="og:image" content=".*?">/, `<meta property="og:image" content="${img}">`)
    .replace(/<meta property="og:image:alt" content=".*?">/, `<meta property="og:image:alt" content="${esc(b.titre)}, ${esc(b.ville)}">`)
    .replace(/\s*<meta property="og:image:width" content=".*?">\s*<meta property="og:image:height" content=".*?">/, "")
    .replace("</head>", `  <script type="application/ld+json">${JSON.stringify(ld)}</script>\n  <script>window.BIEN_ID = ${JSON.stringify(b.id)};</script>\n</head>`)
    .replace(/<span id="bien-crumb">.*?<\/span>/, `<span id="bien-crumb">${esc(b.titre)}</span>`)
    .replace('<div class="container" id="bien-root"></div>', `<div class="container" id="bien-root">${pre}\n    </div>`)
    .replace(/<meta name="robots"[^>]*>\s*/, "");
  fs.writeFileSync(path.join(ROOT, file), html);
  pages.push(file);
}

// sitemap.xml : retire les anciennes fiches, ajoute les nouvelles
const smPath = path.join(ROOT, "sitemap.xml");
let sm = fs.readFileSync(smPath, "utf8").replace(/\s*<url><loc>https:\/\/clubim\.fr\/bien-[^<]+<\/loc>.*?<\/url>/g, "");
const lines = pages.map((f) => `  <url><loc>${SITE}${f}</loc><lastmod>${today}</lastmod><priority>0.8</priority></url>`).join("\n");
sm = sm.replace("</urlset>", `${lines}\n</urlset>`);
fs.writeFileSync(smPath, sm);

console.log(`${pages.length} fiches générées :\n` + pages.join("\n"));
