# Poprawki — iteracja 6
### Sidebar pill — ikony zamiast tekstu, więcej przestrzeni

---

## Sidebar — pełny redesign

### Zmiany
- Zastąp teksty etykiet **ikonkami SVG** (Tabler Icons)
- Zwiększ padding wewnętrzny i rozmiar pilla
- Większe ikony, więcej powietrza między nimi
- Tooltip z nazwą sekcji pojawia się przy hover po lewej stronie ikony

### Ikony dla każdej sekcji

```
ABOUT    → ti-user           (sylwetka osoby)
PROCESS  → ti-git-branch     (rozgałęzienie / flow)
EXP      → ti-briefcase      (teczka)
SKILLS   → ti-tool           (klucz / narzędzie)
WORK     → ti-layout-grid    (siatka projektów)
EDU      → ti-school         (edukacja)
CONTACT  → ti-send           (strzałka wysyłania)
```

### HTML
```html
<nav class="sidebar-nav" role="navigation" aria-label="Page sections">
  <div class="sidebar-progress"></div>

  <a href="#about" class="nav-item" data-section="about" aria-label="About">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.38 8.38 0 0 1 13 0"/>
    </svg>
    <span class="nav-tooltip" data-pl="O mnie" data-en="About">O mnie</span>
  </a>

  <div class="nav-sep"></div>

  <a href="#process" class="nav-item" data-section="process" aria-label="Process">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 3v4"/><circle cx="6" cy="10" r="2"/><path d="M6 12v9"/>
      <path d="M12 3v9"/><circle cx="12" cy="15" r="2"/><path d="M12 17v4"/>
      <path d="M18 3v4"/><circle cx="18" cy="10" r="2"/><path d="M18 12v9"/>
    </svg>
    <span class="nav-tooltip" data-pl="Proces" data-en="Process">Proces</span>
  </a>

  <div class="nav-sep"></div>

  <a href="#experience" class="nav-item" data-section="experience" aria-label="Experience">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      <line x1="12" y1="12" x2="12" y2="12.01"/>
    </svg>
    <span class="nav-tooltip" data-pl="Doświadczenie" data-en="Experience">Doświadczenie</span>
  </a>

  <div class="nav-sep"></div>

  <a href="#skills" class="nav-item" data-section="skills" aria-label="Skills">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
    <span class="nav-tooltip" data-pl="Umiejętności" data-en="Skills">Umiejętności</span>
  </a>

  <div class="nav-sep"></div>

  <a href="#projects" class="nav-item" data-section="projects" aria-label="Projects">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
    <span class="nav-tooltip" data-pl="Projekty" data-en="Projects">Projekty</span>
  </a>

  <div class="nav-sep"></div>

  <a href="#education" class="nav-item" data-section="education" aria-label="Education">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
    </svg>
    <span class="nav-tooltip" data-pl="Edukacja" data-en="Education">Edukacja</span>
  </a>

  <div class="nav-sep"></div>

  <a href="#contact" class="nav-item" data-section="contact" aria-label="Contact">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
    <span class="nav-tooltip" data-pl="Kontakt" data-en="Contact">Kontakt</span>
  </a>

</nav>
```

### CSS
```css
.sidebar-nav {
  position: fixed;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 52px;
  padding: 1rem 0;
  border-radius: 999px;
  background: rgba(13, 31, 31, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(43, 168, 74, 0.18);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
  overflow: hidden;
}

/* Progress bar po lewej krawędzi */
.sidebar-progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 0%;
  background: linear-gradient(to bottom, #2ba84a, rgba(43,168,74,0.3));
  border-radius: 999px;
  pointer-events: none;
  transition: height 0.1s linear;
}

/* Separator */
.nav-sep {
  width: 22px;
  height: 1px;
  background: rgba(252, 255, 252, 0.07);
  flex-shrink: 0;
}

/* Link z ikoną */
.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;           /* duże pole kliku, dużo powietrza */
  border-radius: 50%;
  color: rgba(252, 255, 252, 0.35);
  text-decoration: none;
  transition: color 0.2s ease, background 0.2s ease;
  flex-shrink: 0;
}

.nav-item svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.nav-item:hover {
  color: rgba(252, 255, 252, 0.85);
  background: rgba(252, 255, 252, 0.05);
}

.nav-item.active {
  color: #2ba84a;
}

/* Zielona kropka przy aktywnej ikonie */
.nav-item.active::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #2ba84a;
}

/* Tooltip po lewej stronie przy hover */
.nav-tooltip {
  position: absolute;
  right: calc(100% + 12px);
  top: 50%;
  transform: translateY(-50%);
  background: rgba(13, 31, 31, 0.92);
  border: 1px solid rgba(43, 168, 74, 0.2);
  border-radius: 6px;
  padding: 0.3rem 0.7rem;
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.08em;
  color: rgba(252, 255, 252, 0.85);
  white-space: nowrap;
  pointer-events: none;

  /* Domyślnie ukryty */
  opacity: 0;
  transform: translateY(-50%) translateX(6px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.nav-item:hover .nav-tooltip {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

/* Mobile — ukryj sidebar */
@media (max-width: 768px) {
  .sidebar-nav { display: none; }
}
```

### JS — aktualizacja tooltipów przy zmianie języka
Tooltip używa `.nav-tooltip` z atrybutami `data-pl` i `data-en` — upewnij się że funkcja `setLanguage()` aktualizuje też te elementy:
```js
function setLanguage(lang) {
  document.querySelectorAll('[data-pl][data-en]').forEach(el => {
    el.textContent = el.dataset[lang]
  })
  // ... reszta bez zmian
}
```

---

*Poprawki — iteracja 6*
