# Poprawki — iteracja 5
### Sidebar pill, Experience hint, Skills ikona

---

## 1. Prawy sidebar — redesign na "pill" pływający

### Koncepcja
Sidebar przestaje być paskiem na całą wysokość strony. Staje się zwartym, pływającym pill-containerem wycentrowanym pionowo w viewport — dokładnie jak na screenie referencyjnym.

### Jak ma działać
- Pozycja: `position: fixed`, `right: 1.5rem`, `top: 50%`, `transform: translateY(-50%)`
- Kształt: wydłużony pill — `border-radius: 999px`
- Rozmiar: szerokość ~`60px`, wysokość dopasowana do zawartości (automatyczna)
- Tło: `rgba(45, 58, 58, 0.75)` z `backdrop-filter: blur(12px)` — efekt szkła
- Border: `1px solid rgba(43, 168, 74, 0.2)`
- Zawartość: linki do sekcji ułożone pionowo, wycentrowane w pillsie
- Wskaźnik scrollu: cienka linia `2px` po lewej wewnętrznej krawędzi pilla, wypełniająca się od góry

### Nazwy sekcji — poziomo, czytelnie
Tekst poziomy (nie rotowany), każdy link to skrócona etykieta żeby zmieściła się w szerokości pilla:

```
ABOUT
EXP
SKILLS
PROJECTS
EDU
CONTACT
```

Styl:
```css
.nav-item {
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(252, 255, 252, 0.4);
  text-align: center;
  padding: 0.65rem 0.5rem;
  display: block;
  transition: color 0.2s ease;
  text-decoration: none;
  line-height: 1;
}

.nav-item.active {
  color: #2ba84a;
}

.nav-item:hover:not(.active) {
  color: rgba(252, 255, 252, 0.8);
}
```

Separator między pozycjami — cienka linia `1px solid rgba(252,255,252,0.06)`.

### Wskaźnik aktywnej sekcji
Zamiast całej linii po lewej — mała kropka `6px` po lewej stronie aktywnego linku:
```css
.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0.4rem;
  top: 50%;
  transform: translateY(-50%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #2ba84a;
}
.nav-item { position: relative; }
```

### Pasek postępu scrollu
Zostaje jako cienka linia `2px` po lewej wewnętrznej krawędzi całego pilla — wypełnia się od góry zgodnie z procentem przewinięcia strony:
```css
.sidebar-progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 0%;           /* JS ustawia: scrollY / maxScroll * 100 + '%' */
  background: #2ba84a;
  border-radius: 999px;
  transition: height 0.1s linear;
}
```

### Pełna struktura HTML
```html
<nav class="sidebar-nav" role="navigation" aria-label="Page sections">
  <div class="sidebar-progress"></div>

  <a href="#about"    class="nav-item" data-section="about">ABOUT</a>
  <div class="nav-sep"></div>
  <a href="#process"  class="nav-item" data-section="process">PROCESS</a>
  <div class="nav-sep"></div>
  <a href="#experience" class="nav-item" data-section="experience">EXP</a>
  <div class="nav-sep"></div>
  <a href="#skills"   class="nav-item" data-section="skills">SKILLS</a>
  <div class="nav-sep"></div>
  <a href="#projects" class="nav-item" data-section="projects">WORK</a>
  <div class="nav-sep"></div>
  <a href="#education" class="nav-item" data-section="education">EDU</a>
  <div class="nav-sep"></div>
  <a href="#contact"  class="nav-item" data-section="contact">CONTACT</a>
</nav>
```

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

  width: 60px;
  padding: 0.75rem 0;
  border-radius: 999px;
  background: rgba(45, 58, 58, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(43, 168, 74, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  overflow: hidden;     /* żeby progress bar nie wychodził poza pill */
}

.nav-sep {
  width: 28px;
  height: 1px;
  background: rgba(252, 255, 252, 0.06);
  margin: 0 auto;
}
```

### Mobile
Na `< 768px` sidebar ukryty, zastąpiony bottom bar (bez zmian).

---

## 2. Sekcja Doświadczenie — hint "kliknij po więcej"

### Problem
Użytkownik nie wie że można kliknąć w rolę żeby otworzyć drawer ze szczegółami.

### Rozwiązanie — 3 elementy

**A) Ikona strzałki przy każdym wpisie:**
```html
<div class="exp-entry" role="button" tabindex="0" aria-label="Rozwiń szczegóły">
  <div class="exp-main">
    <div class="exp-left">
      <span class="exp-role">E-commerce Developer</span>
      <span class="exp-company">Adtrip</span>
    </div>
    <div class="exp-right">
      <span class="exp-dates">sty 2026 – Obecnie</span>
      <span class="exp-hint">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"/>   <!-- strzałka → -->
        </svg>
        <span class="exp-hint-text" data-pl="szczegóły" data-en="details">szczegóły</span>
      </span>
    </div>
  </div>
</div>
```

```css
.exp-hint {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.08em;
  color: #2ba84a;
  opacity: 0.6;
  transition: opacity 0.2s ease, gap 0.2s ease;
}

.exp-entry:hover .exp-hint {
  opacity: 1;
  gap: 0.5rem;          /* strzałka lekko odsuwa się przy hover */
}

.exp-entry:hover .exp-hint svg {
  transform: translateX(2px);
  transition: transform 0.2s ease;
}
```

**B) Cursor zmiana:**
```css
.exp-entry { cursor: pointer; }
```

**C) Hover na całym wpisie:**
```css
.exp-entry:hover .exp-role {
  color: #2ba84a;
  transition: color 0.2s ease;
}
```

Trzy sygnały razem (kolor roli, hint "szczegóły →", zmiana kursora) jednoznacznie komunikują klikalność.

---

## 3. Sekcja Umiejętności — ikona dla "Shopify Development"

Karta "Shopify Development" nie ma pasującej ikony. Użyj jednej z opcji:

**Opcja A — SVG logo Shopify (inline, uproszczone):**
```html
<svg class="skill-icon" viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
  <!-- Uproszczona torba zakupów z "S" — symbol Shopify -->
  <path d="M15.337 3.5c-.09-.52-.54-.9-1.06-.9h-.48l-.3-1.5C13.377.48 12.777 0 12.077 0s-1.3.48-1.42 1.1l-.3 1.5h-.48c-.52 0-.97.38-1.06.9L7.5 12h9l-1.163-8.5z"/>
  <rect x="7" y="13" width="10" height="8" rx="1"/>
</svg>
```

**Opcja B — ikona z Tabler Icons (jeśli już używasz biblioteki):**
```html
<i class="ti ti-shopping-bag" style="font-size: 32px; color: #2ba84a;"></i>
```
`ti-shopping-bag` lub `ti-brand-shopify` jeśli dostępna w zainstalowanej wersji Tabler.

**Opcja C — CSS shape (fallback bez biblioteki):**
```html
<!-- Litera S stylizowana w kółku -->
<div class="skill-icon-letter">S</div>
```
```css
.skill-icon-letter {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(43, 168, 74, 0.15);
  border: 1.5px solid #2ba84a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  color: #2ba84a;
  font-weight: 700;
}
```

Wybierz opcję B jeśli Tabler jest już załadowany — `ti-shopping-bag` jest czytelna i pasuje do e-commerce kontekstu.

---

*Poprawki — iteracja 5*
