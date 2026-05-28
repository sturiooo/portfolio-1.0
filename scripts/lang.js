/* =========================================================
   lang.js — przełącznik języka PL / EN
   Każdy tekst ma atrybuty data-pl / data-en.
   Wybór zapisywany w localStorage. Po zmianie emituje
   zdarzenie "languagechange" (nasłuchuje je np. drawer).
   ========================================================= */
(function () {
  "use strict";

  var SUPPORTED = ["pl", "en"];
  var buttons = document.querySelectorAll(".lang-toggle");
  var current = "pl";

  function applyTo(root) {
    var els = (root || document).querySelectorAll("[data-pl][data-en]");
    Array.prototype.forEach.call(els, function (el) {
      var val = el.dataset[current];
      // innerHTML — treść może zawierać encje (&amp;, <br> itp.)
      if (val != null) el.innerHTML = val;
    });
  }

  function setLanguage(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = "pl";
    current = lang;

    // Świeże zapytanie DOM — łapie też elementy dodane dynamicznie
    applyTo(document);

    document.documentElement.setAttribute("lang", lang);
    try {
      localStorage.setItem("lang", lang);
    } catch (e) {}

    Array.prototype.forEach.call(buttons, function (btn) {
      var on = btn.dataset.lang === lang;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", String(on));
    });

    document.dispatchEvent(
      new CustomEvent("languagechange", { detail: { lang: lang } })
    );
  }

  // Udostępnij dla innych skryptów (drawer odczytuje aktualny język)
  window.__getLang = function () {
    return current;
  };

  Array.prototype.forEach.call(buttons, function (btn) {
    btn.addEventListener("click", function () {
      setLanguage(btn.dataset.lang);
    });
  });

  var saved = "pl";
  try {
    saved = localStorage.getItem("lang") || "pl";
  } catch (e) {}
  setLanguage(saved);
})();
