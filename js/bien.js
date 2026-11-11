/* ============================================================
   CLUBIM — Page détail d'un bien
   ============================================================ */

(function () {
  const root = document.getElementById("bien-root");
  if (!root) return;

  const qid = new URLSearchParams(window.location.search).get("id");
  // Ancienne adresse bien.html?id=… : renvoi vers la fiche statique bien-<id>.html
  if (!window.BIEN_ID && qid && LISTINGS.some((l) => l.id === qid)) {
    window.location.replace(`bien-${qid}.html`);
    return;
  }
  const id = window.BIEN_ID || qid;
  const bien = LISTINGS.find((l) => l.id === id) || LISTINGS[0];

  if (!window.BIEN_ID) document.title = `${bien.titre} : ${bien.ville} | CLUBIM`;

  const dpeLetters = ["A", "B", "C", "D", "E", "F", "G"];
  const dpeHTML = dpeLetters
    .map((d) => `<span class="dpe-letter dpe-${d.toLowerCase()} ${d === bien.dpe ? "active" : ""}">${d}</span>`)
    .join("");

  // Photos réelles si l'annonce en possède, illustrations SVG sinon
  const views = bien.photos && bien.photos.length
    ? bien.photos
    : [listingArt(bien, 0), listingArt(bien, 3), listingArt(bien, 7)];

  const specs = [
    ["Type de bien", bien.type],
    ["Transaction", bien.transaction === "location" ? "Location" : "Vente"],
    ["Commune", bien.ville],
    bien.surface ? ["Surface", bien.surface.toLocaleString("fr-FR") + " m²"] : null,
    bien.pieces ? ["Pièces", bien.pieces] : null,
    bien.chambres ? ["Chambres", bien.chambres] : null,
    bien.dpe ? ["Classe énergie", bien.dpe] : null
  ].filter(Boolean);

  root.innerHTML = `
    <div class="bien-layout">
      <div>
        <div class="carousel-frame">
          <img id="bien-main-img" src="${views[0]}" alt="${bien.titre}, photo 1" width="1600" height="900" fetchpriority="high">
          ${views.length > 1 ? `
          <button class="carousel-nav prev" type="button" aria-label="Photo précédente">‹</button>
          <button class="carousel-nav next" type="button" aria-label="Photo suivante">›</button>
          <span class="carousel-count"><span id="carousel-i">1</span> / ${views.length}</span>` : ""}
        </div>
        ${views.length > 1 ? `
        <div class="bien-thumbs">
          ${views.map((v, i) => `<button type="button" class="bien-thumb${i === 0 ? " active" : ""}" data-i="${i}" aria-label="Voir la photo ${i + 1}"${i === 0 ? ' aria-current="true"' : ""}><img src="${v}" alt="" width="96" height="64" loading="lazy"></button>`).join("")}
        </div>` : ""}

        ${bien.visite360 && bien.visite360.length ? `
        <div style="margin-top:46px">
          <h3 style="margin-bottom:14px">Visite virtuelle 360°</h3>
          <div id="visite360-frame" class="visite360-frame"></div>
          <div id="visite360-btns" class="scene-btns"></div>
        </div>` : ""}

        <div style="margin-top:46px">
          <p class="kicker">${bien.statut === "vendu" ? (bien.transaction === "location" ? "Loué par CLUBIM" : "Vendu par CLUBIM") : bien.transaction === "location" ? "À louer" : "À vendre"}</p>
          <h1 class="bien-title" style="margin-bottom:18px">${bien.titre}</h1>
          <div class="bien-desc">${bien.description.split(/\n\s*\n/).map((p) => `<p>${p}</p>`).join("")}</div>

          <h3 style="margin:36px 0 16px">Les atouts du bien</h3>
          <ul class="checklist">
            ${bien.atouts.map((a) => `<li>${a}</li>`).join("")}
          </ul>

          ${bien.dpe ? `
          <h3 style="margin:36px 0 10px">Performance énergétique</h3>
          <p style="color:var(--muted);font-size:0.92rem">Diagnostic de performance énergétique (DPE), classe ${bien.dpe}${bien.ges ? ` · Classe climat (GES), ${bien.ges}` : ""}${bien.dpeDate ? ` · réalisé le ${bien.dpeDate}` : ""}</p>
          <div class="dpe-scale">${dpeHTML}</div>
          ${bien.dpeCout ? `<p class="dpe-cout">Montant estimé des dépenses annuelles d'énergie pour un usage standard : <strong>${bien.dpeCout}</strong>.</p>` : ""}
          ${["F", "G"].includes(bien.dpe) ? '<p class="dpe-cout"><strong>Logement à consommation énergétique excessive.</strong></p>' : ""}` : ""}
          ${bien.mentions && bien.mentions.length ? `
          <h3 style="margin:36px 0 12px">Informations légales</h3>
          <ul class="legal-mentions">${bien.mentions.map((m) => `<li>${m}</li>`).join("")}</ul>` : ""}
        </div>
      </div>

      <aside class="bien-aside">
        <p class="listing-city">${bien.ville}</p>
        <p class="price">${formatPrix(bien)}</p>
        <p class="price-note">${bien.transaction === "location" ? "Charges comprises, détail dans les informations légales" : "Honoraires à la charge du vendeur"}</p>
        <hr>
        <dl class="spec-table">
          ${specs.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}
        </dl>
        <hr>
        ${bien.statut === "vendu"
          ? '<p class="form-note" style="text-align:center;margin-bottom:12px">Ce bien a trouvé preneur. Un projet similaire ? Parlons-en.</p><a class="btn btn-gold" style="width:100%;justify-content:center" href="contact.html">Me faire accompagner</a>'
          : '<a class="btn btn-gold" style="width:100%;justify-content:center" href="contact.html">Organiser une visite</a>'}
        ${bien.transaction === "location" && bien.statut !== "vendu"
          ? `<a class="btn btn-navy" style="width:100%;justify-content:center;margin-top:12px" href="dossier-locataire.html?id=${bien.id}">Déposer mon dossier locataire</a>`
          : ""}
        <a class="btn btn-ghost" style="width:100%;justify-content:center;margin-top:12px" href="tel:+33606549798">06 06 54 97 98</a>
        <p class="form-note" style="text-align:center">Votre interlocuteur : Maxime Allouchery. Visites sur rendez-vous.</p>
      </aside>
    </div>

    <section style="margin-top:90px">
      <div class="section-head">
        <p class="kicker">Poursuivre la visite</p>
        <h2>Ces biens pourraient vous <span class="gold-i">séduire</span></h2>
      </div>
      <div class="listings-grid" id="similar-grid"></div>
    </section>
  `;

  // ---------- Carrousel ----------
  const mainImg = document.getElementById("bien-main-img");
  const counter = document.getElementById("carousel-i");
  const thumbs = [...root.querySelectorAll(".bien-thumbs .bien-thumb")];
  let current = 0;

  function show(i) {
    current = (i + views.length) % views.length;
    mainImg.src = views[current];
    mainImg.alt = `${bien.titre}, photo ${current + 1}`;
    if (counter) counter.textContent = current + 1;
    thumbs.forEach((t, j) => { t.classList.toggle("active", j === current); if (j === current) t.setAttribute("aria-current", "true"); else t.removeAttribute("aria-current"); });
    if (thumbs[current]) thumbs[current].scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  }

  thumbs.forEach((thumb) => thumb.addEventListener("click", () => show(+thumb.dataset.i)));
  const prevBtn = root.querySelector(".carousel-nav.prev");
  const nextBtn = root.querySelector(".carousel-nav.next");
  if (prevBtn) prevBtn.addEventListener("click", () => show(current - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => show(current + 1));

  // clavier (hors champs de saisie)
  document.addEventListener("keydown", (e) => {
    if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) return;
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  // balayage tactile
  let touchX = null;
  const frame = root.querySelector(".carousel-frame");
  frame.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  frame.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
    touchX = null;
  }, { passive: true });

  // biens similaires
  const similar = LISTINGS.filter((l) => l.id !== bien.id && l.transaction === bien.transaction && l.statut !== "vendu").slice(0, 3);
  const simGrid = document.getElementById("similar-grid");
  simGrid.innerHTML = similar.map((l, i) => listingCardHTML(l, i + 2)).join("");
  simGrid.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));

  // fil d'ariane
  const crumb = document.getElementById("bien-crumb");
  if (crumb) crumb.textContent = bien.titre;

  // visite virtuelle 360° (si l'annonce en possède une)
  if (bien.visite360 && bien.visite360.length && typeof initVisite360 === "function") {
    initVisite360("visite360-frame", "visite360-btns", bien.visite360);
  }
})();
