/* =========================================================
   CLUBIM : interactions du journal (compte à rebours, calculatrice IRL, quiz)
   ========================================================= */
(function () {
  // ---------- Compte à rebours ----------
  const pad = (n) => String(n).padStart(2, "0");
  document.querySelectorAll("[data-countdown]").forEach((box) => {
    const end = new Date(box.dataset.countdown).getTime();
    const vote = box.dataset.vote ? new Date(box.dataset.vote).getTime() : null;
    const set = (u, v) => { const el = box.querySelector(`[data-u="${u}"]`); if (el) el.textContent = v; };
    function tick() {
      let diff = Math.max(0, end - Date.now());
      const j = Math.floor(diff / 86400000); diff -= j * 86400000;
      const h = Math.floor(diff / 3600000); diff -= h * 3600000;
      const m = Math.floor(diff / 60000);
      set("j", j); set("h", pad(h)); set("m", pad(m));
      if (vote && Date.now() > vote) {
        const step = box.querySelector('[data-step="vote"]');
        if (step) step.classList.remove("is-next");
      }
    }
    tick();
    setInterval(tick, 30000);
  });

  // ---------- Calculatrice IRL ----------
  const form = document.getElementById("irl-calc");
  if (form) {
    const IRL_NEW = 148.06, IRL_OLD = 145.77;
    const input = document.getElementById("irl-loyer");
    const out = document.getElementById("irl-out");
    const plus = document.getElementById("irl-plus");
    const eur = (n) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
    function compute() {
      const v = parseFloat(String(input.value).replace(/\s/g, "").replace(",", "."));
      if (!isFinite(v) || v <= 0) { out.textContent = "0,00 €"; plus.textContent = "Saisissez un loyer hors charges"; return; }
      const nv = Math.floor((v * IRL_NEW / IRL_OLD) * 100) / 100;
      out.textContent = eur(nv);
      plus.textContent = "soit + " + eur(nv - v) + " par mois";
    }
    input.addEventListener("input", compute);
    form.querySelectorAll("[data-v]").forEach((b) => b.addEventListener("click", () => { input.value = b.dataset.v; compute(); }));
    document.getElementById("irl-go").addEventListener("click", compute);
    compute();
  }

  // ---------- Quiz ----------
  const quiz = document.getElementById("quiz");
  if (quiz) {
    const score = document.getElementById("quiz-score");
    const total = quiz.querySelectorAll(".qz").length;
    let pts = 0, answered = 0;
    quiz.querySelectorAll(".qz").forEach((q) => {
      q.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
        if (q.classList.contains("done")) return;
        q.classList.add("done");
        answered++;
        const ok = b.dataset.ok === "1";
        b.setAttribute("aria-pressed", "true");
        b.classList.add(ok ? "good" : "bad");
        if (!ok) {
          const right = q.querySelector('[data-ok="1"]');
          right.setAttribute("aria-pressed", "true");
          right.classList.add("good");
        } else pts++;
        let msg = "Score : " + pts + " sur " + total;
        if (answered === total) msg += pts === total ? ". Sans faute, chapeau !" : pts >= 3 ? ". Bien suivi !" : ". Les articles vous attendent.";
        score.textContent = msg;
      }));
    });
  }
})();
