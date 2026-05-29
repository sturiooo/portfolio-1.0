/* =========================================================
   animations.js — ruch i scroll
   · Lenis smooth scroll (+ wpięcie w GSAP ticker / ScrollTrigger)
   · Smooth anchor scroll ([data-scroll], linki nav)
   · Splash screen
   · Blur reveal nagłówków + generyczny scroll-in (stagger)
   · Timeline reveal (wjazd z lewej)
   · Projects — sticky card stack (GSAP ScrollTrigger)
   · Typewriter, cursor glow
   Wszystko respektuje prefers-reduced-motion.
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var hasGSAP = typeof window.gsap !== "undefined";
  var hasST = typeof window.ScrollTrigger !== "undefined";
  var hasLenis = typeof window.Lenis !== "undefined";

  function each(list, fn) {
    Array.prototype.forEach.call(list, fn);
  }

  /* =======================================================
     1. LENIS — smooth scroll "ciężki", spięty z GSAP
     ======================================================= */
  var lenis = null;

  if (hasLenis && !reduceMotion) {
    lenis = new window.Lenis({
      duration: 1.8,
      easing: function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
      },
      smoothWheel: true,
    });

    if (hasGSAP && hasST) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      lenis.on("scroll", window.ScrollTrigger.update);
      window.gsap.ticker.add(function (time) {
        lenis.raf(time * 1000);
      });
      window.gsap.ticker.lagSmoothing(0);
    } else {
      // Bez GSAP — własna pętla rAF
      var raf = function (time) {
        lenis.raf(time);
        window.requestAnimationFrame(raf);
      };
      window.requestAnimationFrame(raf);
    }
  }

  // Udostępnij instancję (drawer doświadczenia blokuje scroll przez lenis)
  window.__lenis = lenis;

  /* ---------- Smooth anchor scroll ---------- */
  each(document.querySelectorAll('a[href^="#"]'), function (link) {
    link.addEventListener("click", function (e) {
      var hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      var target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: 0 });
      } else {
        target.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
        });
      }
    });
  });

  /* =======================================================
     2. SPLASH — ukryj po załadowaniu strony
     ======================================================= */
  (function splash() {
    var el = document.getElementById("splash");
    if (!el) return;
    function hide() {
      el.classList.add("is-hidden");
    }
    if (reduceMotion) {
      hide();
      return;
    }
    if (document.readyState === "complete") {
      window.setTimeout(hide, 1000);
    } else {
      window.addEventListener("load", function () {
        window.setTimeout(hide, 800);
      });
    }
  })();

  /* =======================================================
     3. REVEAL — blur na nagłówkach + generyczny scroll-in
     ======================================================= */
  (function reveal() {
    // Nagłówki sekcji (.section-heading) — klasy ma już HTML
    // Generyczne elementy do ujawnienia
    var singles = document.querySelectorAll(
      ".hero__eyebrow, .hero__name, .hero__role, .hero__tagline," +
        " .hero__cta, .about__photo, .about__body > p, .contact__intro," +
        " .contact__socials"
    );
    each(singles, function (el) {
      el.classList.add("animate-on-scroll");
    });

    // Grupy ze staggerem (--i)
    function stagger(selector, childSelector) {
      each(document.querySelectorAll(selector), function (group) {
        each(group.querySelectorAll(childSelector), function (child, i) {
          child.classList.add("animate-on-scroll");
          child.style.setProperty("--i", i);
        });
      });
    }
    stagger(".specialties", ".specialty-card");
    stagger(".certs", ".cert-item");
    stagger(".contact-form", ".field");

    // Timeline — wjazd z lewej (osobna klasa stanu in-view, --i)
    each(document.querySelectorAll(".timeline"), function (tl) {
      each(tl.querySelectorAll(".timeline__item"), function (item, i) {
        item.style.setProperty("--i", i);
      });
    });

    var revealEls = document.querySelectorAll(
      ".animate-on-scroll, .section-heading, .timeline__item"
    );

    if (reduceMotion || !("IntersectionObserver" in window)) {
      each(revealEls, function (el) {
        el.classList.add("in-view");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    each(revealEls, function (el) {
      io.observe(el);
    });
  })();

  /* =======================================================
     3b. PROCESS — scroll-driven timeline (pin + scrub)
     Sekcja przypięta, linia wypełnia się od lewej do prawej,
     kolejne kroki podświetlają się jeden po drugim.
     ======================================================= */
  (function processTimeline() {
    var section = document.getElementById("process");
    if (!section) return;

    var fill = section.querySelector(".process-line-fill");
    var steps = section.querySelectorAll(".process-step");
    if (!fill || !steps.length) return;

    var isMobile = window.matchMedia("(max-width: 768px)").matches;

    // Mobile / reduced motion / brak GSAP — wszystkie kroki aktywne, linia pełna
    if (isMobile || reduceMotion || !hasGSAP || !hasST) {
      fill.style.width = "100%";
      each(steps, function (s) {
        s.classList.add("active");
      });
      return;
    }

    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;

    // Pierwszy krok aktywny od startu
    steps[0].classList.add("active");

    // Pin + scrub: sekcja stoi w miejscu, linia wypełnia się 0 → 100%,
    // a w trakcie scrubowania włączamy aktywny krok wg progresu.
    var lastActive = 0;
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=200%",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      onUpdate: function (self) {
        var p = self.progress; // 0..1
        // linia
        fill.style.width = (p * 100).toFixed(2) + "%";
        // aktywny krok: 0 do ~0.33, 1 do ~0.66, 2 do ~0.99, 3 od ~0.99
        var idx = Math.min(steps.length - 1, Math.floor(p * steps.length));
        if (idx !== lastActive) {
          for (var i = 0; i <= idx; i++) steps[i].classList.add("active");
          for (var j = idx + 1; j < steps.length; j++)
            steps[j].classList.remove("active");
          lastActive = idx;
        }
      },
    });
  })();

  /* =======================================================
     4. PROJECTS — sticky card stack (GSAP ScrollTrigger)
     Każda karta skaluje się i blednie, gdy wjeżdża następna.
     ======================================================= */
  (function projectStack() {
    var cards = document.querySelectorAll("[data-projects-stack] .project-card");
    if (cards.length < 2) return;

    // Bez GSAP/ScrollTrigger albo reduced motion — sam CSS sticky wystarcza
    if (!hasGSAP || !hasST || reduceMotion) return;

    var gsap = window.gsap;
    each(cards, function (card, i) {
      if (i === cards.length - 1) return; // ostatnia zostaje
      // Poprzednia karta znika całkowicie, gdy następna dochodzi do top
      gsap.to(card, {
        scale: 0.94,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: cards[i + 1],
          start: "top 80px",
          end: "top 40px",
          scrub: true,
        },
      });
    });
  })();

  /* =======================================================
     5. TYPEWRITER — #typewriter (słowa z data-words "a;b;c")
     ======================================================= */
  (function typewriter() {
    var el = document.getElementById("typewriter");
    if (!el) return;
    var words = (el.getAttribute("data-words") || "")
      .split(";")
      .map(function (w) {
        return w.trim();
      })
      .filter(Boolean);
    if (!words.length) return;

    if (reduceMotion) {
      el.textContent = words[0];
      return;
    }

    var wi = 0;
    var ci = 0;
    var deleting = false;
    var TYPE = 80;
    var ERASE = 40;
    var HOLD = 1600;
    var GAP = 400;

    function tick() {
      var word = words[wi];
      if (!deleting) {
        ci++;
        el.textContent = word.slice(0, ci);
        if (ci === word.length) {
          deleting = true;
          window.setTimeout(tick, HOLD);
          return;
        }
        window.setTimeout(tick, TYPE);
      } else {
        ci--;
        el.textContent = word.slice(0, ci);
        if (ci === 0) {
          deleting = false;
          wi = (wi + 1) % words.length;
          window.setTimeout(tick, GAP);
          return;
        }
        window.setTimeout(tick, ERASE);
      }
    }
    tick();
  })();

  /* =======================================================
     6. CURSOR GLOW — #cursorGlow podąża za myszą (desktop)
     ======================================================= */
  (function cursorGlow() {
    var el = document.getElementById("cursorGlow");
    if (!el || reduceMotion) return;
    var fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    var x = 0;
    var y = 0;
    var raf = null;
    var hideTimer = null;

    function render() {
      el.style.transform =
        "translate(" + x + "px, " + y + "px) translate(-50%, -50%)";
      raf = null;
    }

    window.addEventListener(
      "pointermove",
      function (e) {
        x = e.clientX;
        y = e.clientY;
        el.style.opacity = "1";
        if (!raf) raf = window.requestAnimationFrame(render);
        window.clearTimeout(hideTimer);
        hideTimer = window.setTimeout(function () {
          el.style.opacity = "0";
        }, 600);
      },
      { passive: true }
    );
  })();
})();
