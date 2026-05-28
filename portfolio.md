# Portfolio — Specyfikacja projektu
### E-commerce Developer · Shopify Specialist

---

## 1. Cel i kontekst

Strona portfolio dla e-commerce developera ze specjalizacją w Shopify. Charakter strony: **nowoczesne, edytorialne CV online** — nie zwykła wizytówka, lecz profesjonalne, żywe portfolio które robi wrażenie na potencjalnych klientach (właściciele sklepów, agencje, startupy e-commerce). Priorytet: pierwsze wrażenie w 5 sekund, potem szczegółowość.

---

## 2. Paleta kolorów

Używaj tych kolorów z sensem, dbając o kontrast (WCAG AA minimum). Nie musisz użyć wszystkich — ważna jest spójność.

| Nazwa | Hex | Zastosowanie |
|-------|-----|--------------|
| **Ink Black** | `#040f0f` | Tło dark mode, nagłówki na jasnym tle |
| **Forest Green** | `#248232` | Akcenty, CTA hover, aktywne elementy nav |
| **Medium Jungle** | `#2ba84a` | Akcenty primary, CTA buttons, tagi projektów |
| **Gunmetal** | `#2d3a3a` | Karty, paski boczne, powierzchnie w dark mode |
| **Porcelain** | `#fcfffc` | Tło light mode, tekst na ciemnym tle |

**Logika kontrastu:**
- Dark mode: tło `#040f0f` / `#2d3a3a`, tekst `#fcfffc`, akcent `#2ba84a`
- Light mode: tło `#fcfffc`, tekst `#040f0f`, akcent `#248232`
- Unikaj zestawiania `#2ba84a` na `#248232` — za mały kontrast

---

## 3. Typografia

Styl edytorialny — mix charakternych krojów pisma:

- **Display / Nagłówki sekcji**: `Playfair Display` lub `DM Serif Display` — elegancki, wydawniczy charakter
- **UI / Nawigacja / Tagi**: `Space Mono` lub `JetBrains Mono` — tech feel, kodowy charakter odpowiedni dla developera
- **Body / Opisy**: `DM Sans` lub `Instrument Sans` — czytelny, nowoczesny, nie nudny
- Proporcje: nagłówki sekcji duże (clamp 3rem–6rem), body 16–18px, line-height 1.6–1.75
- Letter-spacing na tagach i mono elementach: 0.05–0.1em

---

## 4. Layout i struktura

### Siatka

Strona jednostronicowa (SPA feel), pełna szerokość. Treść ograniczona do `max-width: 1200px`, wyrównana do środka z paddingiem `0 2rem`.

### Menu nawigacyjne — prawy panel (kluczowy element)

```
┌──────────────────────────────────────┬──────────────┐
│                                      │              │
│           GŁÓWNA TREŚĆ               │  NAV SIDEBAR │
│           (85% szerokości)           │  (15% / 80px)│
│                                      │              │
└──────────────────────────────────────┴──────────────┘
```

**Specyfikacja prawego sidebara:**
- Pozycja: `fixed`, prawa strona, pełna wysokość viewport
- Szerokość: ok. `72px` — wąski, dyskretny pasek
- Tło: `#040f0f` (dark) / `#fcfffc` z borderkiem (light), lekka przezroczystość `backdrop-filter: blur(8px)`
- Zawartość: pionowe etykiety sekcji (tekst rotowany `writing-mode: vertical-rl`), każda jako link
- Aktywna sekcja (Intersection Observer): etykieta zmienia kolor na `#2ba84a`, lewa krawędź sidebara dostaje `border-left: 2px solid #2ba84a` tylko przy aktywnej pozycji — reszta `#2d3a3a`
- Wskaźnik postępu: cienka linia `2px` po lewej krawędzi sidebara, wypełniająca się od góry zgodnie ze scrollem
- Hover na pozycji nav: delikatny `translate(-2px)` + zmiana koloru
- Mobile (`< 768px`): sidebar schowany, zastąpiony hamburger menu lub fixed bottom bar z ikonami sekcji
- Dark/Light toggle: mała ikonka słońca/księżyca na dole sidebara

---

## 5. Sekcje — szczegółowa specyfikacja

### Sekcja 0: Hero / Landing (nienazwana w nav)

Pełnoekranowy (100vh) landing bez nazwy w menu — to "zero" strony.

**Układ:**
```
┌─────────────────────────────────────────────────┐
│                                                 │
│   [duże imię i nazwisko — display font]         │
│   E-commerce Developer & Shopify Specialist     │
│                                                 │
│   [krótki tagline, 1 zdanie]                    │
│                                                 │
│   [CTA: "Zobacz projekty" ──>]                  │
│                                                 │
│   Scroll indicator ↓                            │
└─────────────────────────────────────────────────┘
```

**Detale:**
- Imię — ogromne, `clamp(4rem, 10vw, 8rem)`, serif display font
- Pod imieniem: rola pisana mono fontem z efektem typewriter cursor
- Tło: subtelny grid/noise texture na `#040f0f` (dark) — efekt papierowy/typograficzny
- Scroll indicator: animowany `↓` lub linia pulsująca
- Animacja wejścia: staggered reveal — najpierw imię (fade+slide up), potem rola, potem tagline, potem CTA (opóźnienia 0.1s, 0.3s, 0.5s, 0.7s)

---

### Sekcja 1: O mnie (`#about`)

**Układ 2-kolumnowy:**
```
┌──────────────────────┬──────────────────────────┐
│                      │                          │
│   Zdjęcie profilowe  │   Krótki bio (2-3 zd.)   │
│   (kwadrat/kółko,    │                          │
│   ~280px)            │   Specjalizacje jako      │
│                      │   lista z ikonami         │
│                      │                          │
│                      │   [Pobierz CV] button     │
│                      │                          │
└──────────────────────┴──────────────────────────┘
```

**Detale:**
- Nagłówek sekcji styl edytorialny: duże `"01"` lub `"About"` w tle (opacity 0.04, display font) + właściwy nagłówek na wierzchu
- Zdjęcie: zaokrąglone rogi `border-radius: 12px`, obramowanie `2px solid #2ba84a` lub subtelny shadow
- Specjalizacje: lista z bulletami zastąpionymi ikonkami `→` lub `▸` w `#2ba84a`
- Button "Pobierz CV": outline style, hover wypełnia się `#2ba84a`

---

### Sekcja 2: Doświadczenie (`#experience`)

Oś czasu — **lewa linia pionowa, wpisy po prawej**:

```
│
│  ●── [Nazwa firmy / rola]          [daty]
│     [Krótki opis 1-2 zdania]
│
│  ●── [Nazwa firmy / rola]          [daty]
│     [Krótki opis]
│
│  ●── [Nazwa firmy / rola]          [daty]
│     [Krótki opis]
```

**Detale:**
- Linia osi czasu: `2px solid #2d3a3a` (ciemna), z animowanym wypełnieniem przy scrollu (scroll-driven animation lub Intersection Observer + CSS transition)
- Węzły (`●`): `8px` kółko, `border: 2px solid #2ba84a`, wypełnione `#040f0f`, przy scroll-in → fill zielonym
- Każdy wpis: karta z lekim tłem `#2d3a3a` (dark) / `#f0f0f0` (light), `border-radius: 8px`, padding `1.5rem`
- Daty: mono font, mniejszy rozmiar, `color: #2ba84a`
- Hover na karcie: lekkie `translateX(4px)` + jasniejsze obramowanie
- Animacja: wpisy wlatują z lewej po kolei przy scrollu

---

### Sekcja 3: Umiejętności (`#skills`)

**Układ: kategorie z tagami/pillsami**

```
┌─────────────────────────────────────────────────┐
│  Shopify & E-commerce                           │
│  [Shopify] [Shopify Plus] [Liquid] [Headless]   │
│                                                 │
│  Integracje & Narzędzia                         │
│  [Klaviyo] [Candy Rack] [ReCharge] [Judge.me]   │
│                                                 │
│  Frontend                                       │
│  [HTML/CSS] [JavaScript] [React] [Tailwind]     │
│                                                 │
│  Inne                                           │
│  [Git] [Figma] [Shopify CLI] [REST API]         │
└─────────────────────────────────────────────────┘
```

**Detale:**
- Nagłówek kategorii: mono font, uppercase, `color: #2ba84a`, `letter-spacing: 0.1em`, + `border-bottom: 1px solid #2d3a3a`
- Tagi: `background: #2d3a3a`, `color: #fcfffc`, `border-radius: 6px`, padding `0.35rem 0.8rem`, font mono 13px
- Hover tagu: `background: #2ba84a`, `color: #040f0f`
- Animacja: tagi pojawiają się staggered przy scroll-in (każdy tag z opóźnieniem 30ms)
- Opcjonalnie: nie używać pasków procentowych — tagi są bardziej honest i czytelne dla e-commerce klienta

---

### Sekcja 4: Projekty (`#projects`)

**Grid kafelków — kluczowa sekcja:**

```
┌─────────────────┬─────────────────┬─────────────────┐
│  [Zdjęcie]      │  [Zdjęcie]      │  [Zdjęcie]      │
│─────────────────│─────────────────│─────────────────│
│  Nazwa sklepu   │  Nazwa sklepu   │  Nazwa sklepu   │
│  Krótki opis    │  Krótki opis    │  Krótki opis    │
│                 │                 │                 │
│  [Klaviyo]      │  [Shopify Plus] │  [Candy Rack]   │
│  [Shopify]      │  [Klaviyo]      │  [ReCharge]     │
│                 │                 │                 │
│  [→ Zobacz]     │  [→ Zobacz]     │  [→ Zobacz]     │
└─────────────────┴─────────────────┴─────────────────┘
```

**Specyfikacja karty projektu:**
- Rozmiar: `grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))`, gap `1.5rem`
- Zdjęcie: `aspect-ratio: 16/9`, `object-fit: cover`, `border-radius: 8px 8px 0 0`
- **Hover efekt na zdjęciu:** overlay `#040f0f` z opacity `0` → `0.7`, pojawia się ikona `↗` lub "Podgląd" w środku — płynna tranzycja `0.3s ease`
- Ciało karty: padding `1.25rem`, `background: #2d3a3a` (dark) / `white` (light), `border-radius: 0 0 12px 12px`
- Nazwa sklepu: `font-weight: 500`, 18px, serif font
- Opis: 2 linijki max, `color: secondary`, 14px
- Tagi narzędzi: małe pille jak w sekcji Skills, max 3-4 widoczne, reszta schowana (opcjonalnie `+N więcej`)
- Link "Zobacz sklep": tekst z `→`, underline-on-hover, `color: #2ba84a`
- Cały card hover: `translateY(-4px)` + `box-shadow: 0 12px 40px rgba(43, 168, 74, 0.15)`

**Filtry projektów (opcjonalnie, jeśli projektów jest ≥6):**
Nad gridem: przyciski filtrowania po kategoriach/narzędziach — `[Wszystkie] [Shopify Plus] [Migracje] [Nowe sklepy]`

---

### Sekcja 5: Edukacja (`#education`)

Taki sam układ jak Doświadczenie — oś czasu, ale wizualnie lżejsza:

```
│
│  ●── [Nazwa uczelni / kierunek]    [daty]
│     [Tytuł / stopień]
│
│  ●── [Kurs / certyfikat]           [rok]
│     [Wydawca: Shopify, Udemy...]
```

**Detale:**
- Węzły osi czasu: outline (nie wypełnione) dla kontrastu z Experience
- Certyfikaty Shopify: badge z ikonką `✓` w `#2ba84a`
- Możliwość dodania osobnej kolumny "Certyfikaty" obok klasycznej edukacji:

```
┌───────────────────────┬───────────────────────┐
│   Edukacja formalna   │   Certyfikaty         │
│   (oś czasu)          │   (lista z badges)    │
└───────────────────────┴───────────────────────┘
```

---

### Sekcja 6: Kontakt (`#contact`)

**Formularz kontaktowy na końcu strony:**

```
┌─────────────────────────────────────────────────┐
│  Zacznijmy współpracę                           │
│  [krótkie zdanie zapraszające]                  │
│                                                 │
│  Imię i nazwisko / Nazwa firmy*                 │
│  [________________________________]             │
│                                                 │
│  Email*                                         │
│  [________________________________]             │
│                                                 │
│  Telefon (opcjonalnie)                          │
│  [________________________________]             │
│                                                 │
│  Typ projektu*                                  │
│  [Nowy sklep] [Modernizacja] [Migracja]         │
│               [drop-down lub pills]             │
│                                                 │
│  Opowiedz mi o projekcie                        │
│  [                                              │
│   textarea...                                   │
│  ]                                              │
│                                                 │
│  [Wyślij wiadomość ──────────────────→]         │
└─────────────────────────────────────────────────┘
```

**Detale:**
- Typ projektu: 3 klikalne karty/pille — `Nowy sklep Shopify`, `Modernizacja istniejącego`, `Migracja z innej platformy` — kliknięcie zaznacza (selected state: `border: 2px solid #2ba84a`, `background: rgba(43,168,74,0.1)`)
- Pola inputów: underline style (bez bordered box) lub subtelny border `1px solid #2d3a3a`, focus: `border-color: #2ba84a`
- Textarea: min-height `140px`, resize vertical
- CTA button: full-width lub szeroki, `background: #2ba84a`, `color: #040f0f`, `border-radius: 8px`, hover: `background: #248232` + `translateY(-1px)`
- Pod formularzem: linki do LinkedIn, GitHub (ikonki), opcjonalnie email bezpośredni

---

## 6. Animacje i przejścia

### Zasady ogólne
- Używaj `prefers-reduced-motion` media query — wszystkie animacje powinny mieć fallback
- Czas trwania: krótkie interakcje `150–250ms`, wejścia sekcji `400–600ms`, przejścia między sekcjami `600–900ms`
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` — naturalny, sprężysty feel

### Kluczowe animacje

**Scroll-in dla sekcji:**
```css
/* Elementy zaczynają ukryte, wchodzą przy intersection */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.animate-on-scroll.in-view {
  opacity: 1;
  transform: translateY(0);
}
```

**Staggered children:**
Karty projektów, tagi skills, wpisy timeline — każde dziecko z `animation-delay: calc(var(--i) * 60ms)`

**Smooth scroll:**
`scroll-behavior: smooth` na `html` + JavaScript dla płynnych przejść przez sekcje

**Oś czasu fill:**
Linia osi czasu animuje się (height rośnie) przy scrollu przez sekcję

**Cursor glow (opcjonalnie, desktop):**
Subtelny `radial-gradient` podążający za kursorem — zielony blask `#2ba84a` z opacity ~0.05

**Page load:**
Splash screen — `#040f0f` tło z logiem/inicjałami, znika po ~1.2s z fade-out

---

## 7. Dark / Light mode

- Toggle: ikona w dolnej części prawego sidebara — `🌙` / `☀️` lub SVG icon
- Implementacja: `data-theme="dark"/"light"` na `<html>`, CSS variables reagują
- Domyślny: **dark mode**
- Animacja przełączenia: `transition: background-color 0.3s ease, color 0.3s ease` na wszystkich elementach
- Zapisywanie preferencji: `localStorage.setItem('theme', ...)`

**CSS Variables schema:**
```css
:root[data-theme="dark"] {
  --bg-primary: #040f0f;
  --bg-secondary: #2d3a3a;
  --text-primary: #fcfffc;
  --text-secondary: rgba(252,255,252,0.6);
  --accent: #2ba84a;
  --accent-hover: #248232;
  --border: rgba(252,255,252,0.1);
}

:root[data-theme="light"] {
  --bg-primary: #fcfffc;
  --bg-secondary: #f0f4f0;
  --text-primary: #040f0f;
  --text-secondary: rgba(4,15,15,0.6);
  --accent: #248232;
  --accent-hover: #2ba84a;
  --border: rgba(4,15,15,0.12);
}
```

---

## 8. Nawigacja — szczegóły techniczne

### Intersection Observer
Każda sekcja ma `id` odpowiadający pozycji w menu. Obserwator śledzi, która sekcja jest aktualnie w viewport (próg `0.3` lub `0.4`), aktualizując aktywną pozycję w sidebaru.

### Wskaźnik scrollu
```
Cienka linia 2px po lewej krawędzi sidebara:
[|||||||||||...........]  ← wypełniona część = procent przewinięcia strony
```
Implementacja: `window.scrollY / (documentHeight - viewportHeight) * 100` → `height` elementu

### Pozycje w menu (etykiety w sidebarze):
```
About
Experience
Skills
Projects
Education
Contact
```
Tekst rotowany: `writing-mode: vertical-rl; transform: rotate(180deg)` — czytelny od dołu do góry

---

## 9. Stack technologiczny

Brak wymogów frameworka — do wyboru Claude Code:

**Opcja A (prostsza):** Czysty HTML + CSS + Vanilla JS
- Jeden plik `index.html` lub podział na komponenty
- CSS z custom properties, bez preprocessora
- Minimalna zależność od bibliotek

**Opcja B (zaawansowana):** Next.js lub Astro + Tailwind CSS
- Lepsza wydajność, łatwiejsze zarządzanie treścią
- `framer-motion` dla animacji
- Astro polecany dla statycznego portfolio

**Wymagane biblioteki niezależnie od opcji:**
- `Intersection Observer API` — wbudowany w przeglądarkę, nie wymaga biblioteki
- Google Fonts: `Playfair Display`, `DM Sans`, `Space Mono`
- Opcjonalnie: `GSAP` dla zaawansowanych animacji osi czasu

---

## 10. Responsywność

| Breakpoint | Zachowanie |
|-----------|-----------|
| `< 480px` | Sidebar ukryty, bottom navigation (5 ikon), single column |
| `480–768px` | Sidebar ukryty, hamburger menu top-right, single column |
| `768–1024px` | Sidebar widoczny (bez etykiet, same punkty), 2-col projects |
| `> 1024px` | Pełny sidebar z etykietami, 3-col projects |

**Mobile bottom nav:**
Fixed pasek na dole z ikonami sekcji (5 ikony), aktywna ikonka w `#2ba84a`

---

## 11. SEO i meta

```html
<title>[Imię Nazwisko] — Shopify & E-commerce Developer</title>
<meta name="description" content="Portfolio: tworzę i optymalizuję sklepy Shopify. Specjalizacja: Shopify Plus, migracje, integracje (Klaviyo, ReCharge).">
<meta property="og:image" content="/og-image.jpg">
```

---

## 12. Treść — placeholder (do uzupełnienia na podstawie CV)

> **Uwaga:** Wszystkie poniższe treści to placeholdery. Finalną treść uzupełnij na podstawie swojego aktualnego CV.

### Hero
- Imię i nazwisko: `[TWOJE IMIĘ I NAZWISKO]`
- Tagline: `"Buduję sklepy Shopify, które sprzedają."` *(do zmiany)*
- Krótki opis: 1 zdanie o tym co robisz i dla kogo

### Projekty
Każdy projekt to obiekt:
```json
{
  "name": "Nazwa sklepu",
  "url": "https://...",
  "image": "/projects/projekt-1.jpg",
  "description": "Krótki opis, 1-2 zdania co zrobiłem",
  "tags": ["Shopify Plus", "Klaviyo", "Candy Rack"],
  "type": "Nowy sklep | Modernizacja | Migracja"
}
```

### Dane kontaktowe
- Email: `[TWÓJ EMAIL]`
- LinkedIn: `[URL]`
- GitHub: `[URL]` *(opcjonalnie)*

---

## 13. Pliki i struktura katalogów (sugestia)

```
portfolio/
├── index.html          (lub pages/index.astro)
├── styles/
│   ├── global.css
│   ├── variables.css   (design tokens)
│   └── components/
├── scripts/
│   ├── nav.js          (sidebar, intersection observer)
│   ├── theme.js        (dark/light toggle)
│   └── animations.js   (scroll animations)
├── public/
│   ├── fonts/
│   ├── images/
│   └── projects/       (zdjęcia projektów)
└── components/         (jeśli framework)
    ├── Sidebar.jsx
    ├── ProjectCard.jsx
    ├── Timeline.jsx
    └── ContactForm.jsx
```

---

## 14. Kluczowe priorytety implementacji

W kolejności ważności:

1. **Prawy sidebar z Intersection Observer** — to charakterystyczny element, zrób go first
2. **Typografia i paleta kolorów** — zdefiniuj CSS variables na początku
3. **Sekcja Projekty** — najbardziej "sprzedająca" sekcja, kafelki z hover overlay
4. **Animacje scroll-in** — wchodzenie elementów przy scrollu
5. **Dark/Light toggle** — z animacją przejścia
6. **Oś czasu Experience/Education** — z animowaną linią
7. **Formularz kontaktowy** — z interaktywnymi typami projektu
8. **Responsywność mobile** — sidebar → bottom nav
9. **Animacja wejścia Hero** — staggered reveal
10. **Performance** — lazy loading zdjęć, font-display: swap

---

*Wersja specyfikacji: 1.0 — treść do uzupełnienia po dostarczeniu CV*
