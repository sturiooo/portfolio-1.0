/* =========================================================
   experience.js — drawer ze szczegółami doświadczenia
   Klik w rolę → wysuwany panel z prawej (z dołu na mobile).
   Zamknięcie: X, klik w overlay, Esc. i18n: treść czytana
   wg aktualnego języka, odświeżana przy "languagechange".
   ========================================================= */
(function () {
  "use strict";

  var overlay = document.getElementById("expOverlay");
  var drawer = overlay ? overlay.querySelector(".exp-drawer") : null;
  var closeBtn = document.getElementById("expClose");
  var elRole = document.getElementById("expDrawerRole");
  var elCompany = document.getElementById("expDrawerCompany");
  var elDate = document.getElementById("expDrawerDate");
  var elBullets = document.getElementById("expDrawerBullets");
  if (!overlay || !drawer) return;

  var items = document.querySelectorAll(".timeline__item[data-exp]");
  var lastTrigger = null;
  var activeItem = null;

  function lang() {
    return typeof window.__getLang === "function"
      ? window.__getLang()
      : document.documentElement.getAttribute("lang") || "pl";
  }

  // Odczyt tekstu wg języka (data-pl/data-en) z fallbackiem na textContent
  function txt(el) {
    if (!el) return "";
    var v = el.dataset ? el.dataset[lang()] : null;
    return v != null ? v : el.textContent.trim();
  }

  function render(item) {
    var role = item.querySelector(".timeline__role");
    var company = item.querySelector(".timeline__company");
    var date = item.querySelector(".timeline__date");
    var bullets = item.querySelectorAll(".exp-bullets li");

    elRole.textContent = txt(role);
    elCompany.textContent = txt(company);
    elDate.textContent = txt(date);

    elBullets.innerHTML = "";
    Array.prototype.forEach.call(bullets, function (li) {
      var node = document.createElement("li");
      node.textContent = txt(li);
      elBullets.appendChild(node);
    });
  }

  function open(item, trigger) {
    activeItem = item;
    lastTrigger = trigger || null;
    render(item);
    overlay.hidden = false;
    // wymuś reflow, by transition zadziałał po zdjęciu [hidden]
    void overlay.offsetWidth;
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    if (window.__lenis) window.__lenis.stop();
    drawer.focus();
  }

  function close() {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    if (window.__lenis) window.__lenis.start();
    activeItem = null;
    // ukryj po zakończeniu animacji
    window.setTimeout(function () {
      if (!overlay.classList.contains("is-open")) overlay.hidden = true;
    }, 460);
    if (lastTrigger) lastTrigger.focus();
  }

  Array.prototype.forEach.call(items, function (item) {
    var role = item.querySelector(".timeline__role--btn");
    item.addEventListener("click", function (e) {
      // Klik w role-button odpala open(); klik gdziekolwiek indziej w wpisie też.
      if (e.target.closest("a")) return;
      open(item, role || item);
    });
  });

  closeBtn.addEventListener("click", close);

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) close();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) close();
  });

  // Odśwież treść drawera przy zmianie języka (gdy otwarty)
  document.addEventListener("languagechange", function () {
    if (activeItem && overlay.classList.contains("is-open")) render(activeItem);
  });
})();
