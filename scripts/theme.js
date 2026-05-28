/* =========================================================
   theme.js — przełącznik dark / light z localStorage
   Motyw jest wstępnie ustawiany inline w <head> (anti-flash).
   ========================================================= */
(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  function currentTheme() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
    toggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Włącz tryb jasny" : "Włącz tryb ciemny"
    );
  }

  toggle.addEventListener("click", function () {
    setTheme(currentTheme() === "dark" ? "light" : "dark");
  });
})();
