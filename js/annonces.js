/* ============================================================
   CLUBIM — Page annonces : filtres et affichage des biens
   ============================================================ */

(function () {
  const grid = document.getElementById("listings-grid");
  const count = document.getElementById("results-count");
  const form = document.getElementById("filters");
  if (!grid || !form) return;

  const fields = {
    transaction: form.querySelector('[name="transaction"]'),
    type: form.querySelector('[name="type"]'),
    ville: form.querySelector('[name="ville"]'),
    budget: form.querySelector('[name="budget"]'),
    tri: form.querySelector('[name="tri"]')
  };

  // Options de villes générées depuis les données
  const villes = [...new Set(LISTINGS.map((l) => l.ville.split(", ")[0]))].sort();
  fields.ville.innerHTML =
    '<option value="">Toutes les communes</option>' +
    villes.map((v) => `<option value="${v}">${v}</option>`).join("");

  // Pré-remplissage depuis l'URL (recherche de l'accueil, liens du menu)
  const params = new URLSearchParams(window.location.search);
  ["transaction", "type", "ville", "budget"].forEach((k) => {
    if (params.get(k) && fields[k]) fields[k].value = params.get(k);
  });

  // ---------- Contexte Acheter / Louer ----------
  // La page est partagée : adapter le titre, le fil d'ariane, le menu
  // et le placeholder budget selon la transaction demandée.
  const CONTEXTS = {
    achat: {
      crumb: "Acheter",
      h1: 'Nos biens <span class="gold-i">à vendre</span>',
      intro: "Maisons, appartements, lofts et immeubles à acheter, sélectionnés et vérifiés un par un dans toute la métropole lilloise.",
      title: "Acheter à Lille : nos biens à vendre | CLUBIM",
      budget: "ex : 500 000"
    },
    location: {
      crumb: "Louer",
      h1: 'Nos biens <span class="gold-i">à louer</span>',
      intro: "Maisons, appartements et locaux disponibles à la location dans la métropole lilloise, dossiers étudiés sous 24 h ouvrées.",
      title: "Louer à Lille : nos biens à louer | CLUBIM",
      budget: "ex : 900"
    }
  };

  function applyContext() {
    const ctx = CONTEXTS[fields.transaction.value];
    const hero = document.querySelector(".page-hero");
    if (hero) {
      hero.querySelector(".breadcrumb").innerHTML =
        '<a href="index.html">Accueil</a> / ' + (ctx ? ctx.crumb : "Nos annonces");
      hero.querySelector("h1").innerHTML = ctx ? ctx.h1 : 'Nos <span class="gold-i">annonces</span>';
      hero.querySelector("p:not(.breadcrumb)").textContent = ctx
        ? ctx.intro
        : "Maisons, appartements, lofts, immeubles de rapport et locaux professionnels, sélectionnés et vérifiés un par un, dans toute la métropole lilloise.";
    }
    document.title = ctx ? ctx.title : "Nos annonces : achat et location | CLUBIM";
    fields.budget.placeholder = ctx ? ctx.budget : "ex : 500 000";
    // surligner l'entrée de menu correspondante
    document.querySelectorAll('.main-nav > li > a[href^="annonces.html"]').forEach((a) => {
      a.classList.toggle("active", a.href.includes("transaction=" + fields.transaction.value) && !!fields.transaction.value);
    });
  }

  function apply() {
    const t = fields.transaction.value;
    const type = fields.type.value;
    const ville = fields.ville.value;
    const budget = parseInt(fields.budget.value, 10) || Infinity;
    const tri = fields.tri.value;

    let results = LISTINGS.filter(
      (l) =>
        (!t || l.transaction === t) &&
        (!type || l.type === type) &&
        (!ville || l.ville.startsWith(ville)) &&
        l.prix <= budget
    );

    if (tri === "prix-asc") results.sort((a, b) => a.prix - b.prix);
    else if (tri === "prix-desc") results.sort((a, b) => b.prix - a.prix);
    else if (tri === "surface") results.sort((a, b) => (b.surface || 0) - (a.surface || 0));
    else results.sort((a, b) => Number(b.exclusivite) - Number(a.exclusivite));

    count.innerHTML =
      results.length === 0
        ? "Aucun bien ne correspond à votre recherche."
        : `<strong>${results.length}</strong> bien${results.length > 1 ? "s" : ""} correspond${results.length > 1 ? "ent" : ""} à votre recherche`;

    grid.innerHTML =
      results.length === 0
        ? '<div class="no-results" style="grid-column:1/-1">Aucun résultat, élargissez vos critères ou <a href="contact.html" style="color:var(--gold)">confiez-nous votre recherche</a>.</div>'
        : results.map((l, i) => listingCardHTML(l, i)).join("");

    grid.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    apply();
  });
  Object.values(fields).forEach((f) => f && f.addEventListener("change", apply));
  fields.transaction.addEventListener("change", applyContext);

  applyContext();
  apply();
})();
