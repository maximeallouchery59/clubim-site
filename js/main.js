/* ============================================================
   CLUBIM — Script principal (navigation, animations, rendus)
   ============================================================ */

// ---------- Menu mobile ----------
const burger = document.querySelector(".burger");
const mainNav = document.querySelector(".main-nav");
if (burger && mainNav) {
  burger.addEventListener("click", () => mainNav.classList.add("open"));
  const closeBtn = mainNav.querySelector(".nav-close");
  if (closeBtn) closeBtn.addEventListener("click", () => mainNav.classList.remove("open"));
  mainNav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => mainNav.classList.remove("open"))
  );
}

// ---------- Apparition au scroll ----------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ---------- Carte annonce (partagée) ----------
// Photo réelle si l'annonce en possède, illustration SVG sinon
function listingMediaSrc(l, seed = 0) {
  return l.photos && l.photos.length ? l.photos[0] : listingArt(l, seed);
}

function listingCardHTML(l, seed = 0) {
  const tag = l.statut === "vendu"
    ? `<span class="listing-tag tag-sold">${l.transaction === "location" ? "Loué" : "Vendu"}</span>`
    : `<span class="listing-tag">${l.transaction === "location" ? "À louer" : "À vendre"}</span>`;
  const specs = [
    l.surface ? `${l.surface.toLocaleString("fr-FR")} m²` : null,
    l.pieces ? `${l.pieces} pièce${l.pieces > 1 ? "s" : ""}` : null,
    l.chambres ? `${l.chambres} ch.` : null,
    l.dpe ? `DPE ${l.dpe}` : null,
    l.ges ? `GES ${l.ges}` : null
  ].filter(Boolean).map((s) => `<span>${s}</span>`).join("");

  return `
    <a class="listing-card reveal" href="bien-${l.id}.html">
      <div class="listing-media">
        <img src="${listingMediaSrc(l, seed)}" alt="${l.titre}, ${l.ville}" width="800" height="600" loading="lazy">
        ${tag}
      </div>
      <div class="listing-body">
        <p class="listing-city">${l.ville}</p>
        <h3>${l.titre}</h3>
        <div class="listing-specs">${specs}</div>
        <div class="listing-price">
          <strong>${formatPrix(l)}</strong>
          <span>${l.transaction === "location" ? "charges comprises" : "honoraires inclus"}</span>
        </div>
      </div>
    </a>`;
}

function articleCardHTML(a, seed = 0) {
  return `
    <article class="news-card reveal">
      <a class="news-media" href="article.html?id=${a.id}">
        <img src="${buildingArt(a.art.style, a.art.palette, seed + 5)}" alt="" width="800" height="600" loading="lazy">
      </a>
      <div class="news-body">
        <p class="news-date">${a.categorie}, ${a.date}</p>
        <h3><a href="article.html?id=${a.id}">${a.titre}</a></h3>
        <p>${a.extrait}</p>
        <a class="link-more" href="article.html?id=${a.id}">Lire l'article <span class="arrow">→</span></a>
      </div>
    </article>`;
}

function observeNew(container) {
  container.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
}

// ---------- Accueil : biens à la une ----------
const featured = document.getElementById("featured-listings");
if (featured) {
  const dispo = LISTINGS.filter((l) => l.statut !== "vendu" && l.id !== featured.dataset.exclude);
  // Ordre choisi (data-order), puis les autres biens disponibles
  const ordre = (featured.dataset.order || "").split(",").filter(Boolean);
  const selection = ordre.map((id) => dispo.find((l) => l.id === id)).filter(Boolean)
    .concat(dispo.filter((l) => !ordre.includes(l.id))).slice(0, 3);
  featured.innerHTML = selection.map((l, i) => listingCardHTML(l, i)).join("");
  observeNew(featured);
}

// ---------- Accueil : dernières actualités ----------
const homeNews = document.getElementById("home-news");
if (homeNews) {
  homeNews.innerHTML = ARTICLES.slice(0, 3).map((a, i) => articleCardHTML(a, i)).join("");
  observeNew(homeNews);
}

// ---------- Page actualités : liste complète ----------
const allNews = document.getElementById("all-news");
if (allNews) {
  allNews.innerHTML = ARTICLES.map((a, i) => articleCardHTML(a, i)).join("");
  observeNew(allNews);
}

// ---------- Recherche rapide (accueil) ----------
const quickSearch = document.getElementById("quick-search");
if (quickSearch) {
  // Liste des communes générée depuis les annonces : toujours à jour
  const villeSel = quickSearch.querySelector('[name="ville"]');
  if (villeSel && typeof LISTINGS !== "undefined") {
    const villes = [...new Set(LISTINGS.map((l) => l.ville.split(", ")[0]))].sort();
    villeSel.innerHTML =
      '<option value="">Toutes</option>' +
      villes.map((v) => `<option>${v}</option>`).join("");
  }
  let transaction = "location";
  quickSearch.querySelectorAll(".search-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      quickSearch.querySelectorAll(".search-tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      transaction = tab.dataset.transaction;
    });
  });
  quickSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const params = new URLSearchParams({ transaction });
    const type = quickSearch.querySelector('[name="type"]').value;
    const ville = quickSearch.querySelector('[name="ville"]').value;
    const budget = quickSearch.querySelector('[name="budget"]').value;
    if (type) params.set("type", type);
    if (ville) params.set("ville", ville);
    if (budget) params.set("budget", budget);
    window.location.href = "annonces.html?" + params.toString();
  });
}

// ---------- Formulaires ----------
// Clé d'accès Web3Forms (https://web3forms.com — gratuit) : créer la clé avec
// l'adresse maxime.allouchery59@gmail.com et la coller ci-dessous. Tant qu'elle est vide,
// les formulaires fonctionnent en mode démonstration (aucun envoi).
const WEB3FORMS_KEY = "6d9df284-a10d-45d5-81ca-f62897ae05a3";

document.querySelectorAll("form[data-demo]").forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const success = form.querySelector(".form-success");
    const btn = form.querySelector('button[type="submit"]');

    if (WEB3FORMS_KEY) {
      // Construit le message à partir des champs et de leurs intitulés
      const data = {
        access_key: WEB3FORMS_KEY,
        from_name: "Site CLUBIM",
        subject: "Site CLUBIM, " + (document.title.split("|")[0].trim() || "formulaire")
      };
      form.querySelectorAll("input, select, textarea").forEach((el) => {
        let label = el.id ? form.querySelector(`label[for="${el.id}"]`) : null;
        if (!label) label = el.closest("label");
        const key = (label ? label.textContent : el.name || el.id || "champ").replace(/\s*\*\s*$/, "").trim();
        if (el.type === "checkbox") {
          if (el.checked) data[key] = "oui";
        } else if (el.value.trim()) {
          data[key] = el.value.trim();
        }
      });

      const oldLabel = btn ? btn.innerHTML : "";
      if (btn) { btn.disabled = true; btn.textContent = "Envoi en cours…"; }
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("HTTP " + res.status);
      } catch (err) {
        if (btn) { btn.disabled = false; btn.innerHTML = oldLabel; }
        let note = form.querySelector(".form-error");
        if (!note) {
          note = document.createElement("p");
          note.className = "form-error";
          note.setAttribute("role", "alert");
          form.appendChild(note);
        }
        note.textContent = "L'envoi a échoué, vérifiez votre connexion et réessayez, ou appelez-nous au 06 06 54 97 98.";
        return;
      }
    }

    if (success) {
      success.style.display = "block";
      form.querySelectorAll(".form-grid, .btn, .form-note, .form-error").forEach((el) => (el.style.display = "none"));
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
});

// ---------- Année du footer ----------
document.querySelectorAll(".year").forEach((el) => (el.textContent = new Date().getFullYear()));
