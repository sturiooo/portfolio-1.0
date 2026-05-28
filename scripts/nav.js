/* =========================================================
   nav.js — sidebar / nawigacja
   · Intersection Observer: aktywna sekcja w sidebarze + mobile nav
   · Wskaźnik postępu scrollu (linia na lewej krawędzi sidebara)
   ========================================================= */
(function () {
  "use strict";

  var sections = Array.prototype.slice.call(
    document.querySelectorAll("main section[id]")
  );
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll("[data-section]")
  );
  var progress = document.getElementById("scrollProgress");

  /* ---------- Aktywna sekcja (Intersection Observer) ---------- */
  function setActive(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle("is-active", link.dataset.section === id);
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      {
        // sekcja uznana za aktywną, gdy jej środek jest w okolicy
        // środka viewportu — wąskie pasmo "rootMargin"
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      }
    );
    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ---------- Wskaźnik postępu scrollu ---------- */
  var ticking = false;

  function updateProgress() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progress) progress.style.height = pct + "%";
    ticking = false;
  }

  if (progress) {
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(updateProgress);
          ticking = true;
        }
      },
      { passive: true }
    );
    updateProgress();
  }
})();
