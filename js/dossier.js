/* ============================================================
   CLUBIM — Dossier locataire en ligne
   Les pièces sont assemblées en UN PDF, entièrement dans le
   navigateur du candidat (aucun document n'est envoyé à un
   serveur). Le candidat télécharge le dossier et l'envoie par
   e-mail ; l'agence reçoit en parallèle une notification.
   Chaque pièce accepte un nombre illimité de fichiers, ajoutés
   en plusieurs fois et retirables un à un.
   ============================================================ */
(function () {
  "use strict";

  const form = document.getElementById("dossier-form");
  if (!form) return;

  /* ---------- Bien concerné ---------- */

  const params = new URLSearchParams(window.location.search);
  const bien = typeof LISTINGS !== "undefined" ? LISTINGS.find((l) => l.id === params.get("id")) : null;
  const refBien = bien ? "CLB-" + bien.id.slice(0, 6).toUpperCase() : null;

  const banner = document.getElementById("dossier-bien");
  if (banner) {
    banner.innerHTML = bien
      ? `<p class="kicker">Votre candidature concerne</p>
         <h3>${bien.titre}</h3>
         <p>${bien.ville} · ${formatPrix(bien)} · ${bien.surface} m², réf. ${refBien} · <a href="bien.html?id=${bien.id}">revoir l'annonce</a></p>`
      : `<p class="kicker">Candidature spontanée</p>
         <h3>Dossier locataire</h3>
         <p>Aucun bien précisé, votre dossier sera étudié pour l'ensemble de nos locations. <a href="annonces.html?transaction=location">Voir les biens disponibles</a></p>`;
  }

  /* ---------- Pièces demandées ---------- */

  const DOCS_CANDIDAT = [
    { id: "identite", label: "Pièce d'identité", aide: "Carte d'identité recto-verso, passeport ou titre de séjour", required: true },
    { id: "revenus", label: "Justificatifs de revenus", aide: "Bulletins de salaire, bilans, pensions… ajoutez autant de pièces que nécessaire", required: true },
    { id: "contrat", label: "Contrat de travail ou attestation employeur", aide: "Ou certificat de scolarité, ou justificatif de pension", required: true },
    { id: "imposition", label: "Dernier avis d'imposition", aide: "Toutes les pages", required: true },
    { id: "quittances", label: "Quittances de loyer", aide: "Les trois dernières, ou attestation d'hébergement, ou taxe foncière si propriétaire", required: false }
  ];
  const DOCS_GARANT = [
    { id: "g-identite", label: "Pièce d'identité du garant", aide: "Carte d'identité recto-verso, passeport ou titre de séjour", required: false, garant: true },
    { id: "g-revenus", label: "Justificatifs de revenus du garant", aide: "Bulletins de salaire, bilans, pensions… autant de pièces que nécessaire", required: false, garant: true },
    { id: "g-contrat", label: "Contrat de travail ou attestation employeur du garant", aide: "Ou justificatif de pension pour un garant retraité", required: false, garant: true },
    { id: "g-imposition", label: "Dernier avis d'imposition du garant", aide: "Toutes les pages", required: false, garant: true },
    { id: "g-garantie", label: "Attestation Visale ou autre garantie", aide: "Si garantie Visale ou organisme : cette attestation remplace les pièces ci-dessus", required: false, garant: true }
  ];
  const ALL_DOCS = DOCS_CANDIDAT.concat(DOCS_GARANT);

  /* Fichiers accumulés par pièce (ajouts successifs, retraits individuels) */
  const filesByDoc = {};
  ALL_DOCS.forEach((d) => { filesByDoc[d.id] = []; });

  const rowHTML = (d) => `
    <div class="doc-row" id="row-${d.id}">
      <div>
        <h4>${d.label}${d.required ? " *" : ""}</h4>
        <p>${d.aide}</p>
      </div>
      <div class="doc-actions">
        <span class="doc-status" id="status-${d.id}">, </span>
        <label class="btn btn-ghost doc-add">Ajouter
          <input type="file" id="file-${d.id}" accept=".pdf,.jpg,.jpeg,.png" multiple hidden>
        </label>
      </div>
      <div class="doc-files" id="chips-${d.id}"></div>
    </div>`;

  const list = document.getElementById("docs-list");
  list.innerHTML =
    '<h4 class="docs-group">Pièces du candidat</h4>' +
    DOCS_CANDIDAT.map(rowHTML).join("") +
    '<div id="garant-docs">' +
    '<h4 class="docs-group">Pièces du garant</h4>' +
    '<p class="form-note" style="margin:4px 0 6px">Mêmes justificatifs que pour le candidat. Un dossier de garant complet accélère nettement l\'étude de votre candidature.</p>' +
    DOCS_GARANT.map(rowHTML).join("") +
    "</div>";

  function renderDoc(id) {
    const files = filesByDoc[id];
    const st = document.getElementById("status-" + id);
    st.textContent = files.length ? `✓ ${files.length} fichier${files.length > 1 ? "s" : ""}` : ", ";
    st.classList.toggle("ok", files.length > 0);
    document.getElementById("row-" + id).classList.toggle("filled", files.length > 0);
    document.getElementById("chips-" + id).innerHTML = files
      .map((f, i) => `<span class="doc-chip" title="${f.name}">${f.name.length > 34 ? f.name.slice(0, 31) + "…" : f.name}
        <button type="button" data-doc="${id}" data-i="${i}" aria-label="Retirer ${f.name}">×</button></span>`)
      .join("");
  }

  ALL_DOCS.forEach((d) => {
    document.getElementById("file-" + d.id).addEventListener("change", (e) => {
      [...e.target.files].forEach((f) => {
        const doublon = filesByDoc[d.id].some((x) => x.name === f.name && x.size === f.size);
        if (!doublon) filesByDoc[d.id].push(f);
      });
      e.target.value = ""; // permet de ré-ajouter d'autres fichiers ensuite
      renderDoc(d.id);
    });
  });

  list.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-doc]");
    if (!btn) return;
    filesByDoc[btn.dataset.doc].splice(+btn.dataset.i, 1);
    renderDoc(btn.dataset.doc);
  });

  /* Section garant : masquée sans garant ; réduite à la seule attestation si Visale */
  const garantSel = document.getElementById("d-garant");
  const ROWS_GARANT_CLASSIQUE = ["g-identite", "g-revenus", "g-contrat", "g-imposition"];
  function modeVisale() { return garantSel.value === "Garantie Visale"; }
  function syncGarant() {
    const bloc = document.getElementById("garant-docs");
    bloc.style.display = garantSel.value === "Sans garant" ? "none" : "";
    const visale = modeVisale();
    ROWS_GARANT_CLASSIQUE.forEach((id) => {
      document.getElementById("row-" + id).style.display = visale ? "none" : "";
    });
    bloc.querySelector(".form-note").textContent = visale
      ? "Avec la garantie Visale, une seule pièce suffit : votre attestation (téléchargeable sur visale.fr). Aucun autre justificatif de garant n'est demandé."
      : garantSel.value === "Garant physique + garantie Visale"
      ? "Joignez les justificatifs de votre garant physique ET votre attestation Visale (dernière ligne) : les deux garanties figureront au dossier."
      : "Mêmes justificatifs que pour le candidat. Un dossier de garant complet accélère nettement l'étude de votre candidature.";
  }
  garantSel.addEventListener("change", syncGarant);
  syncGarant();

  /* ---------- Génération du PDF ---------- */

  const A4 = [595.28, 841.89];
  const NAVY = PDFLib.rgb(13 / 255, 21 / 255, 46 / 255);
  const GOLD = PDFLib.rgb(185 / 255, 151 / 255, 78 / 255);
  const MUTED = PDFLib.rgb(0.42, 0.45, 0.52);

  async function buildPdf(infos, piecesParDoc) {
    const pdf = await PDFLib.PDFDocument.create();
    const serif = await pdf.embedFont(PDFLib.StandardFonts.TimesRoman);
    const serifI = await pdf.embedFont(PDFLib.StandardFonts.TimesRomanItalic);
    const sans = await pdf.embedFont(PDFLib.StandardFonts.Helvetica);
    const sansB = await pdf.embedFont(PDFLib.StandardFonts.HelveticaBold);

    /* Page de garde */
    const cover = pdf.addPage(A4);
    const W = A4[0];
    let y = 770;
    cover.drawRectangle({ x: 0, y: 790, width: W, height: 52, color: NAVY });
    cover.drawText("CLUBIM", { x: 50, y: 808, size: 20, font: sansB, color: PDFLib.rgb(0.99, 0.99, 0.97) });
    cover.drawText("AGENCE IMMOBILIERE, LILLE", { x: 145, y: 811, size: 8, font: sans, color: GOLD });
    y = 730;
    cover.drawText("Dossier de candidature locative", { x: 50, y, size: 26, font: serif, color: NAVY });
    y -= 14;
    cover.drawLine({ start: { x: 50, y }, end: { x: 320, y }, thickness: 1, color: GOLD });
    y -= 36;

    if (bien) {
      cover.drawText("Bien concerné", { x: 50, y, size: 9, font: sansB, color: GOLD });
      y -= 16;
      cover.drawText(`${bien.titre}`, { x: 50, y, size: 13, font: serifI, color: NAVY });
      y -= 16;
      cover.drawText(`${bien.ville}, ${formatPrix(bien)}, réf. ${refBien}`, { x: 50, y, size: 10, font: sans, color: MUTED });
      y -= 34;
    }

    cover.drawText("Candidat", { x: 50, y, size: 9, font: sansB, color: GOLD });
    y -= 16;
    const lignes = [
      ["Nom", infos.nom],
      ["Téléphone", infos.tel],
      ["E-mail", infos.email],
      ["Situation professionnelle", infos.situation],
      ["Revenus mensuels nets du foyer", infos.revenus + " €"],
      ["Garant", infos.garant]
    ];
    lignes.forEach(([k, v]) => {
      cover.drawText(k + " : ", { x: 50, y, size: 10, font: sansB, color: NAVY });
      cover.drawText(String(v), { x: 50 + sansB.widthOfTextAtSize(k + " : ", 10), y, size: 10, font: sans, color: NAVY });
      y -= 16;
    });
    y -= 18;

    cover.drawText("Pièces jointes au dossier", { x: 50, y, size: 9, font: sansB, color: GOLD });
    y -= 16;
    piecesParDoc.forEach((p) => {
      if (y < 90) return; // la page de garde reste lisible même avec beaucoup de pièces
      cover.drawText(`•  ${p.label}, ${p.files.length} fichier${p.files.length > 1 ? "s" : ""}`, { x: 50, y, size: 10, font: sans, color: NAVY });
      y -= 15;
    });

    cover.drawText(`Dossier généré le ${new Date().toLocaleDateString("fr-FR")} via clubim.fr`, { x: 50, y: 52, size: 8, font: sans, color: MUTED });
    cover.drawLine({ start: { x: 50, y: 66 }, end: { x: 545, y: 66 }, thickness: 0.5, color: GOLD });

    /* Pièces : un intercalaire par catégorie, puis les documents */
    for (const p of piecesParDoc) {
      const sep = pdf.addPage(A4);
      sep.drawRectangle({ x: 0, y: 0, width: W, height: A4[1], color: NAVY });
      const titre = p.label.toUpperCase();
      sep.drawText(titre.length > 40 ? titre.slice(0, 40) : titre, { x: 50, y: 430, size: 16, font: sansB, color: PDFLib.rgb(0.99, 0.99, 0.97) });
      sep.drawLine({ start: { x: 50, y: 413 }, end: { x: 300, y: 413 }, thickness: 1, color: GOLD });
      sep.drawText(`${p.files.length} fichier${p.files.length > 1 ? "s" : ""}`, { x: 50, y: 392, size: 10, font: sans, color: GOLD });

      for (const f of p.files) {
        const bytes = await f.arrayBuffer();
        try {
          if (f.type === "application/pdf" || /\.pdf$/i.test(f.name)) {
            const src = await PDFLib.PDFDocument.load(bytes, { ignoreEncryption: true });
            const pages = await pdf.copyPages(src, src.getPageIndices());
            pages.forEach((pg) => pdf.addPage(pg));
          } else {
            const img = /\.png$/i.test(f.name) || f.type === "image/png"
              ? await pdf.embedPng(bytes)
              : await pdf.embedJpg(bytes);
            const page = pdf.addPage(A4);
            const maxW = W - 80;
            const maxH = A4[1] - 80;
            const scale = Math.min(maxW / img.width, maxH / img.height, 1);
            const w = img.width * scale;
            const h = img.height * scale;
            page.drawImage(img, { x: (W - w) / 2, y: (A4[1] - h) / 2, width: w, height: h });
            page.drawText(f.name, { x: 40, y: 24, size: 7, font: sans, color: MUTED });
          }
        } catch (err) {
          const page = pdf.addPage(A4);
          page.drawText("Fichier illisible : " + f.name, { x: 50, y: 420, size: 12, font: sansB, color: NAVY });
          page.drawText("Merci de transmettre cette pièce séparément.", { x: 50, y: 400, size: 10, font: sans, color: MUTED });
        }
      }
    }

    return pdf.save();
  }

  /* ---------- Soumission ---------- */

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const infos = {
      nom: document.getElementById("d-nom").value.trim(),
      tel: document.getElementById("d-tel").value.trim(),
      email: document.getElementById("d-email").value.trim(),
      situation: document.getElementById("d-situation").value,
      revenus: document.getElementById("d-revenus").value,
      garant: document.getElementById("d-garant").value
    };

    const avecGarant = infos.garant !== "Sans garant";
    const piecesParDoc = ALL_DOCS
      .filter((d) => !d.garant || avecGarant)
      // avec Visale, seule l'attestation est intégrée au dossier (les autres
      // pièces de garant éventuellement ajoutées avant le changement sont ignorées)
      .filter((d) => !(modeVisale() && d.garant && d.id !== "g-garantie"))
      .map((d) => ({ label: d.label, files: filesByDoc[d.id] }))
      .filter((p) => p.files.length);

    const manquantes = DOCS_CANDIDAT.filter((d) => d.required && !filesByDoc[d.id].length);
    if (manquantes.length) {
      let note = form.querySelector(".form-error");
      if (!note) {
        note = document.createElement("p");
        note.className = "form-error";
          note.setAttribute("role", "alert");
        form.querySelector("#docs-list").after(note);
      }
      note.textContent = "Pièces obligatoires manquantes : " + manquantes.map((d) => d.label).join(", ") + ".";
      note.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const oldNote = form.querySelector(".form-error");
    if (oldNote) oldNote.remove();

    const btn = form.querySelector('button[type="submit"]');
    const oldLabel = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = "Assemblage du dossier…";

    try {
      const bytes = await buildPdf(infos, piecesParDoc);
      const nomFichier = `dossier-locataire-${infos.nom.replace(/\s+/g, "-").toLowerCase()}${refBien ? "-" + refBien : ""}.pdf`;
      const blob = new Blob([bytes], { type: "application/pdf" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = nomFichier;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 30000);

      /* Notification à l'agence (coordonnées seulement, jamais les pièces) */
      if (typeof WEB3FORMS_KEY !== "undefined" && WEB3FORMS_KEY) {
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            from_name: "Site CLUBIM",
            subject: "Dossier locataire, " + (refBien || "spontané") + ", " + infos.nom,
            Bien: bien ? `${bien.titre} (${refBien})` : "Candidature spontanée",
            Candidat: infos.nom,
            "Téléphone": infos.tel,
            "E-mail": infos.email,
            Situation: infos.situation,
            "Revenus nets mensuels": infos.revenus + " €",
            Garant: infos.garant,
            "Pièces du dossier": piecesParDoc.map((p) => p.label + " (" + p.files.length + ")").join(" · "),
            Note: "Le candidat a généré son dossier PDF et doit l'envoyer par e-mail."
          })
        }).catch(() => {});
      }

      /* Écran de fin + mailto pré-rempli */
      document.getElementById("done-filename").textContent = nomFichier;
      const sujet = encodeURIComponent("Dossier locataire, " + (refBien || "candidature") + ", " + infos.nom);
      const corps = encodeURIComponent(
        "Bonjour,\n\nVeuillez trouver ci-joint mon dossier de candidature" +
        (bien ? " pour le bien « " + bien.titre + " » (réf. " + refBien + ")" : "") +
        ".\n\n" + infos.nom + "\n" + infos.tel + "\n\n(Pensez à joindre le fichier " + nomFichier + " téléchargé à l'instant.)"
      );
      document.getElementById("done-mailto").href = "mailto:maxime.allouchery59@gmail.com?subject=" + sujet + "&body=" + corps;
      const done = document.getElementById("dossier-done");
      done.hidden = false;
      btn.disabled = false;
      btn.innerHTML = oldLabel;
      done.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (err) {
      btn.disabled = false;
      btn.innerHTML = oldLabel;
      let note = form.querySelector(".form-error");
      if (!note) {
        note = document.createElement("p");
        note.className = "form-error";
          note.setAttribute("role", "alert");
        form.appendChild(note);
      }
      note.textContent = "L'assemblage du PDF a échoué (" + err.message + "). Vérifiez vos fichiers ou envoyez vos pièces directement à maxime.allouchery59@gmail.com.";
    }
  });
})();
