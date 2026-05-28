/* =========================================================
   skills.js — filtrowanie kart umiejętności kategoriami
   Klik w pigułkę: fade-out → podmiana widocznych → fade-in
   ze staggerem (--i). Domyślnie kategoria "featured".
   ========================================================= */
(function () {
  "use strict";

  var grid = document.getElementById("skillsGrid");
  if (!grid) return;

  var filters = document.querySelectorAll(".skill-filter");
  var cards = grid.querySelectorAll(".skill-card");
  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function show(cat) {
    var i = 0;
    Array.prototype.forEach.call(cards, function (card) {
      var match = card.dataset.cat === cat;
      card.classList.toggle("is-hidden", !match);
      if (match) {
        card.style.setProperty("--i", i);
        i++;
      }
    });
  }

  function setCategory(cat) {
    // Podświetl aktywny filtr
    Array.prototype.forEach.call(filters, function (f) {
      var on = f.dataset.cat === cat;
      f.classList.toggle("is-active", on);
      f.setAttribute("aria-selected", String(on));
    });

    if (reduceMotion) {
      show(cat);
      return;
    }

    // Fade-out → podmiana → fade-in
    grid.classList.add("is-switching");
    window.setTimeout(function () {
      show(cat);
      // Następna klatka — zdejmij klasę, by uruchomić wejście ze staggerem
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          grid.classList.remove("is-switching");
        });
      });
    }, 220);
  }

  Array.prototype.forEach.call(filters, function (f) {
    f.setAttribute("role", "tab");
    f.addEventListener("click", function () {
      if (f.classList.contains("is-active")) return;
      setCategory(f.dataset.cat);
    });
  });

  // Init — kategoria domyślna (aktywny filtr lub "featured")
  var active = document.querySelector(".skill-filter.is-active");
  show(active ? active.dataset.cat : "featured");
})();
