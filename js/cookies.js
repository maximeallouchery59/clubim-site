/* ============================================================
   CLUBIM — Gestion du consentement cookies (100 % front)
   Bandeau à la première visite, panneau de préférences,
   choix conservé 6 mois dans localStorage.
   ============================================================ */
(function () {
  "use strict";

  const KEY = "clubim-cookie-consent";
  const MAX_AGE = 180 * 24 * 60 * 60 * 1000; // 6 mois

  function readConsent() {
    try {
      const v = JSON.parse(localStorage.getItem(KEY));
      if (!v || typeof v.date !== "number" || Date.now() - v.date > MAX_AGE) return null;
      return v;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(analytics, perso) {
    localStorage.setItem(KEY, JSON.stringify({
      necessary: true,
      analytics: !!analytics,
      perso: !!perso,
      date: Date.now()
    }));
    document.dispatchEvent(new CustomEvent("clubim-consent", { detail: { analytics: !!analytics, perso: !!perso } }));
    /* C'est ici que l'on chargerait les scripts de mesure d'audience
       ou de personnalisation, uniquement si le consentement le permet. */
  }

  /* ---------- Bandeau ---------- */

  const banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-label", "Gestion des cookies");
  banner.innerHTML =
    "<div>" +
    "  <strong>Vos données, votre choix</strong>" +
    "  <p>Des cookies techniques assurent le fonctionnement du site. Avec votre accord, nous mesurons aussi son audience de façon anonyme. Vous pourrez modifier votre choix à tout moment via « Cookies » en pied de page.</p>" +
    "</div>" +
    '<div class="cookie-actions">' +
    '  <button type="button" class="btn btn-ghost-light" data-act="refuse">Tout refuser</button>' +
    '  <button type="button" class="btn btn-ghost-light" data-act="custom">Personnaliser</button>' +
    '  <button type="button" class="btn btn-gold" data-act="accept">Tout accepter</button>' +
    "</div>";

  /* ---------- Panneau de préférences ---------- */

  const modal = document.createElement("div");
  modal.className = "cookie-modal";
  modal.innerHTML =
    '<div class="cookie-panel" role="dialog" aria-label="Préférences de cookies">' +
    '  <div class="cookie-head">' +
    '    <svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12,2 17,9 12,16 7,9" fill="none" stroke="#E9707C" stroke-width="1.2"/><polygon points="12,6.5 14.2,9 12,11.5 9.8,9" fill="#BE3A48"/></svg>' +
    "    <div><strong>Vos préférences</strong><span>Gestion des cookies</span></div>" +
    '    <button type="button" class="cookie-close" aria-label="Fermer">×</button>' +
    "  </div>" +
    '  <div class="cookie-rows">' +
    '    <div class="cookie-row">' +
    "      <div><h4>Cookies nécessaires</h4><p>Indispensables au fonctionnement du site (navigation, sécurité). Toujours actifs.</p></div>" +
    '      <label class="switch on"><input type="checkbox" checked disabled><span></span></label>' +
    "    </div>" +
    '    <div class="cookie-row">' +
    "      <div><h4>Mesure d'audience</h4><p>Statistiques anonymes de fréquentation, pour comprendre ce qui vous est utile et améliorer le site.</p></div>" +
    '      <label class="switch"><input type="checkbox" id="ck-analytics"><span></span></label>' +
    "    </div>" +
    '    <div class="cookie-row">' +
    "      <div><h4>Contenus personnalisés</h4><p>Mémorise vos recherches pour vous présenter des biens plus pertinents, et affiche la carte Google Maps de la page contact.</p></div>" +
    '      <label class="switch"><input type="checkbox" id="ck-perso"><span></span></label>' +
    "    </div>" +
    "  </div>" +
    '  <div class="cookie-foot">' +
    '    <button type="button" class="btn btn-navy" data-act="save">Enregistrer mes choix</button>' +
    '    <button type="button" class="btn btn-gold" data-act="accept">Tout accepter</button>' +
    "  </div>" +
    "</div>";

  document.body.appendChild(banner);
  document.body.appendChild(modal);

  const ckAnalytics = modal.querySelector("#ck-analytics");
  const ckPerso = modal.querySelector("#ck-perso");

  function syncSwitches() {
    modal.querySelectorAll(".switch input:not([disabled])").forEach(function (input) {
      input.closest(".switch").classList.toggle("on", input.checked);
    });
  }

  function showBanner() { banner.classList.add("visible"); }
  function hideBanner() { banner.classList.remove("visible"); }
  function openModal() {
    const c = readConsent();
    ckAnalytics.checked = c ? !!c.analytics : false;
    ckPerso.checked = c ? !!c.perso : false;
    syncSwitches();
    modal.classList.add("visible");
  }
  function closeModal() { modal.classList.remove("visible"); }

  function decide(analytics, perso) {
    saveConsent(analytics, perso);
    hideBanner();
    closeModal();
  }

  /* ---------- Interactions ---------- */

  banner.addEventListener("click", function (e) {
    const act = e.target.getAttribute("data-act");
    if (act === "accept") decide(true, true);
    if (act === "refuse") decide(false, false);
    if (act === "custom") { hideBanner(); openModal(); }
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) { closeModal(); if (!readConsent()) showBanner(); return; }
    const act = e.target.getAttribute("data-act");
    if (act === "accept") decide(true, true);
    if (act === "save") decide(ckAnalytics.checked, ckPerso.checked);
  });
  modal.querySelector(".cookie-close").addEventListener("click", function () {
    closeModal();
    if (!readConsent()) showBanner();
  });
  modal.querySelectorAll(".switch input").forEach(function (input) {
    input.addEventListener("change", syncSwitches);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("visible")) {
      closeModal();
      if (!readConsent()) showBanner();
    }
  });

  /* Réouverture depuis le pied de page ou tout élément [data-cookie-settings] */
  document.querySelectorAll('[data-cookie-settings], .footer-bottom a[href*="#cookies"]').forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  });

  /* ---------- Premier affichage ---------- */

  if (!readConsent()) showBanner();
})();
