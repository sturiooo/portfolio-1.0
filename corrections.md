# Poprawki do portfolio — iteracja 2
### Na podstawie przeglądu pierwszego buildu

---

## 0. Biblioteki komponentów — zielone światło

Możesz używać zewnętrznych bibliotek jeśli ułatwiają realizację efektów. Rekomendowane:

- **GSAP** (`gsap` + `ScrollTrigger`) — animacje scroll, staggered reveals, efekty kart
- **Lenis** — smooth scroll (spowolnione, buttery scrolling)
- **Splitting.js** — efekty typograficzne na nagłówkach
- **Alpine.js** — lekka reaktywność (toggle języka, theme) bez overkill frameworka
- Można też użyć **Astro** z **Motion** (framer-motion) jeśli projekt wymaga przebudowy

---

## 1. Globalne poprawki

### Smooth scroll — spowolnienie
Zamiast natywnego `scroll-behavior: smooth` użyj biblioteki **Lenis**:
```js
import Lenis from '@studio-freight/lenis'
const lenis = new Lenis({ duration: 1.8, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
```
Efekt: przewijanie jest powolne, płynne, "ciężkie" — jak na luksusowych stronach.

### Typografia CTA i przycisków
Aktualna czcionka na przyciskach/CTA jest nieodpowiednia. Przyciski, nawigacja, tagi — użyj **Space Mono** (mono font z `portfolio.md`). Nagłówki sekcji — **Playfair Display**. Body — **DM Sans**.

### Nagłówki sekcji — efekt blur reveal
Każdy nagłówek sekcji (H2) musi mieć efekt wejścia przy scrollu:
```css
/* Stan początkowy */
.section-heading {
  opacity: 0;
  filter: blur(12px);
  transform: translateY(16px);
  transition: opacity 0.7s ease, filter 0.7s ease, transform 0.7s ease;
}
/* Po wejściu w viewport */
.section-heading.in-view {
  opacity: 1;
  filter: blur(0px);
  transform: translateY(0);
}
```
Nagłówki mają być duże — `clamp(2.5rem, 5vw, 4.5rem)` — i wyróżniające się, z dużym letter-spacing na etykiecie sekcji (np. `01 — ABOUT`, mono font, uppercase, zielony).

### Hover na przyciskach — efekt fill
Zamiast prostego zmiany koloru — animowane wypełnienie od lewej do prawej (liquid fill):
```css
.btn {
  position: relative;
  overflow: hidden;
  border: 1.5px solid #2ba84a;
  color: #2ba84a;
  background: transparent;
}
.btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: #2ba84a;
  transform: translateX(-101%);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 0;
}
.btn:hover::before { transform: translateX(0); }
.btn:hover { color: #040f0f; }
.btn span { position: relative; z-index: 1; }
```

---

## 2. Nawigacja — prawy sidebar

### Problem
Aktualny sidebar pokazuje ikonki. Potrzebne są **nazwy tekstowe** zamiast ikon.

### Poprawka
```
┌──────────────────┐
│                  │  ← sidebar ~72px szerokości, fixed right
│  A               │
│  B               │  ← każda litera to link do sekcji
│  O               │     (lub pełna nazwa rotowana)
│  U               │
│  T               │
│                  │
│  ────────────    │
│                  │
│  E               │
│  X               │
│  P               │
│  ...             │
└──────────────────┘
```

**Specyfikacja:**
- Każda pozycja: tekst `writing-mode: vertical-rl; transform: rotate(180deg)` — tekst czytelny od dołu do góry
- Font: Space Mono, 11px, `letter-spacing: 0.15em`, uppercase
- Kolor domyślny: `rgba(252,255,252,0.35)` (muted)
- Aktywna sekcja: `color: #2ba84a`, `font-weight: 500`
- Wskaźnik: cienka `2px` linia po lewej krawędzi sidebara, wypełniająca się od góry zgodnie ze scrollem strony
- **Brak ikon** — wyłącznie tekst

**Pozycje w menu (od góry):**
```
ABOUT
EXPERIENCE
SKILLS
PROJECTS
EDUCATION
CONTACT
```

### Górne menu (nowe — prawa strona, poziomo)
Dodaj w prawym górnym rogu małą belkę z:
- `PL | EN` — toggle języka (przełącznik)
- `☀ | ☾` — toggle dark/light mode

```html
<div class="top-controls">
  <button class="lang-toggle" data-lang="pl">PL</button>
  <span class="divider">|</span>
  <button class="lang-toggle" data-lang="en">EN</button>
  <span class="divider">·</span>
  <button class="theme-toggle" aria-label="Toggle theme">
    <span class="icon-sun">☀</span>
    <span class="icon-moon">☾</span>
  </button>
</div>
```
Pozycja: `position: fixed; top: 1.5rem; right: 5rem` (żeby nie nachodził na sidebar). Font: Space Mono, 12px.

---

## 3. Sekcja: O mnie

### Zdjęcie profilowe
- Kształt: **okrąg** (`border-radius: 50%`)
- Efekt: zielona poświata za zdjęciem — `box-shadow: 0 0 60px rgba(43, 168, 74, 0.35), 0 0 120px rgba(43, 168, 74, 0.15)`
- Etykieta badge: naklejka na zdjęciu (bottom-left lub bottom-right), absolutnie pozycjonowana:
```html
<div class="profile-wrapper">
  <img src="..." class="profile-img" alt="...">
  <span class="badge">✦ Shopify Partner</span>
</div>
```
```css
.badge {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  background: #2ba84a;
  color: #040f0f;
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  padding: 0.3rem 0.9rem;
  border-radius: 999px;
  white-space: nowrap;
  font-weight: 500;
}
```

### Specjalizacje — zamiast bullet pointów
Zamiast listy `›` z tekstem — **karty/bloki** przyciągające wzrok:

```
┌─────────────────────────┐  ┌─────────────────────────┐
│  ⬡                      │  │  ⬡                      │
│  Shopify & Shopify Plus │  │  Migracje platform      │
│  Tworzenie sklepów od   │  │  WooCommerce → Shopify  │
│  zera lub redesign      │  │  PrestaShop → Shopify   │
└─────────────────────────┘  └─────────────────────────┘
```

Implementacja jako grid `2×2` lub `3×1` kart:
- Tło karty: `background: rgba(43,168,74,0.07)`, `border: 1px solid rgba(43,168,74,0.2)`, `border-radius: 12px`
- Ikona: duża (32px), `color: #2ba84a` — użyj Tabler Icons lub prostego SVG
- Tytuł: 15px, DM Sans 500
- Opis: 13px, muted color
- Hover: `border-color: #2ba84a`, `background: rgba(43,168,74,0.12)`, `transform: translateY(-2px)`

---

## 4. Sekcja: Doświadczenie — przebudowa

### Wymagany wygląd (na podstawie dostarczonego screenshota)
Oś czasu w stylu resume z referencji — lista wpisów z kółkami i datami po prawej:

```
● EXPERIENCE
──────────────────────────────────────────

○  Frontend Developer                          2020 – Present
   Google Inc.

○  Backend Engineer                            2018 – 2020
   Microsoft Inc.

○  Junior Developer                            2016 – 2018
   Some Agency
```

**Specyfikacja:**
- Brak kart/boxów — otwarta lista, czytelna i powietrzna
- Lewa krawędź: pionowa linia `1px solid rgba(252,255,252,0.15)` — oś czasu
- Węzły (`○`): `14px` kółko, `border: 2px solid #2ba84a`, `background: transparent` → hover/active: fill `#2ba84a`
- Tytuł roli: **bold**, `clamp(1.1rem, 2vw, 1.4rem)`, DM Sans lub Display font
- Firma: muted color, 14px
- Daty: po prawej stronie, `background: #2d3a3a`, `border-radius: 999px`, padding `0.25rem 0.85rem`, font mono 13px — tak jak na screenshocie
- Spacer między wpisami: `2.5rem`
- Hover na wpisie: tytuł dostaje `color: #2ba84a`, linia węzła się wypełnia
- Animacja scroll: każdy wpis wchodzi z lewej (`translateX(-20px)` → `0`) z opóźnieniem `n * 100ms`

---

## 5. Sekcja: Umiejętności — rozbudowa

Zachować podział na kategorie. Rozbudować wizualnie:

### Kategoria header
```css
.skills-category-label {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #2ba84a;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(43,168,74,0.25);
  margin-bottom: 1rem;
}
```

### Tagi umiejętności — bardziej wyraziste
Zamiast zwykłych pilli z tłem gunmetal — tagi z lewą obwódką w kolorze akcentu:
```css
.skill-tag {
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  padding: 0.4rem 1rem;
  background: transparent;
  border: 1px solid rgba(43,168,74,0.3);
  border-left: 3px solid #2ba84a;
  border-radius: 0 6px 6px 0;
  color: var(--text-primary);
  transition: all 0.2s ease;
}
.skill-tag:hover {
  background: rgba(43,168,74,0.1);
  border-color: #2ba84a;
  color: #2ba84a;
  transform: translateX(4px);
}
```

### Układ kategorii
Grid `2-kolumnowy` na desktop, `1-kolumnowy` na mobile. Każda kategoria to blok:
```
SHOPIFY & E-COMMERCE          INTEGRACJE & NARZĘDZIA
▸ Shopify                     ▸ Klaviyo
▸ Shopify Plus                ▸ Candy Rack
▸ Liquid                      ▸ ReCharge
▸ Headless Commerce           ▸ Judge.me
```

---

## 6. Sekcja: Projekty — efekt "stack kart"

### Kluczowy efekt: sticky card stack
Karty projektów nakładają się na siebie podczas scrollowania — każda nowa karta wysuwa się spod poprzedniej.

**Implementacja z GSAP ScrollTrigger:**
```js
// Każda karta ma position: sticky, top zależy od indeksu
// Przy scrollu: poprzednia karta skaluje się i blednie
gsap.to(card, {
  scale: 0.95,
  opacity: 0.6,
  scrollTrigger: {
    trigger: card,
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    pin: true,
  }
})
```

**Alternatywa CSS-only (prostsza):**
```css
.projects-stack { position: relative; }
.project-card {
  position: sticky;
  top: calc(var(--card-index) * 24px + 80px);
  /* każda karta "leży" wyżej niż poprzednia */
}
```

**Wygląd karty projektu:**
```
┌──────────────────────────────────────────────────────┐
│  [Zdjęcie sklepu 16:9, pełna szerokość karty]       │
│  [Hover overlay z "Odwiedź sklep ↗"]                │
├──────────────────────────────────────────────────────┤
│  Numer projektu     Typ (Nowy sklep / Migracja)      │
│  01                 ─────────────────────────────    │
│  Nazwa sklepu                                        │
│  Krótki opis projektu, 1-2 zdania max.              │
│                                                      │
│  [Shopify Plus]  [Klaviyo]  [Candy Rack]            │
└──────────────────────────────────────────────────────┘
```

**Nagłówek sekcji:**
```
Moje 4 ostatnie
projekty          ← wyróżniony display font, 2 linie
```

**Detale karty:**
- Maksymalna szerokość: `800px`, wycentrowana
- `border-radius: 16px`
- Tło: `#2d3a3a` (dark) / `white` (light)
- Numer projektu: `clamp(4rem, 8vw, 7rem)`, opacity `0.08`, Display font, absolutnie pozycjonowany
- Hover na zdjęciu: overlay `rgba(4,15,15,0.75)`, pojawia się tekst "Odwiedź sklep ↗" w `#2ba84a`

---

## 7. Sekcja: Edukacja

Identyczny styl osi czasu co Doświadczenie (ten sam kod, inne dane). Zachować podział 50/50:

```
┌──────────────────────────┬──────────────────────────┐
│  EDUKACJA FORMALNA       │  CERTYFIKATY             │
│  (oś czasu)              │  (lista z badges)        │
│                          │                          │
│  ○ Kierunek              │  ✓ Shopify Partner       │
│    Uczelnia  2020–2024   │    2023                  │
│                          │                          │
│  ○ Kierunek              │  ✓ Shopify Plus Cert.   │
│    Uczelnia  2017–2020   │    2022                  │
│                          │                          │
│                          │  ✓ Kurs / certyfikat    │
│                          │    2021                  │
└──────────────────────────┴──────────────────────────┘
```

**Certyfikaty badge:**
```css
.cert-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(252,255,252,0.08);
}
.cert-check {
  width: 20px; height: 20px;
  border-radius: 50%;
  background: rgba(43,168,74,0.15);
  border: 1.5px solid #2ba84a;
  color: #2ba84a;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px;
  flex-shrink: 0;
}
```

---

## 8. Sekcja: Kontakt — przebudowa

### Problem
Sekcja zlewa się z tłem, brak wyrazistości i kontrastu.

### Rozwiązanie — własny kontener z innym tłem
```css
#contact {
  background: #0d1f1f;           /* ciemniejszy odcień niż główne tło */
  border-top: 1px solid rgba(43,168,74,0.2);
  border-radius: 24px 24px 0 0;  /* zaokrąglone górne rogi */
  margin-top: 4rem;
  padding: 5rem 2rem;
}

/* Light mode */
[data-theme="light"] #contact {
  background: #e8f0e8;
  border-top: 1px solid rgba(36,130,50,0.2);
}
```

**Wewnętrzny układ:**
```
┌─────────────────────────────────────────────────────┐
│  [muted label]  Kontakt                             │
│                                                     │
│  Zacznijmy                                          │  ← duży display font
│  współpracę.                                        │
│                                                     │
│  ─────────────────────────────────────────────────  │
│                                                     │
│  Imię / Nazwa firmy        Email *                  │
│  [_____________________]   [_____________________]  │
│                                                     │
│  Telefon (opcjonalnie)                              │
│  [_____________________]                            │
│                                                     │
│  Typ projektu:                                      │
│  ┌──────────────┐ ┌────────────────┐ ┌──────────┐  │
│  │ Nowy sklep   │ │ Modernizacja   │ │ Migracja │  │
│  │ Shopify      │ │ istniejącego   │ │ platformy│  │
│  └──────────────┘ └────────────────┘ └──────────┘  │
│                                                     │
│  Opowiedz mi o projekcie                            │
│  [                                                  │
│                                          textarea   │
│  ]                                                  │
│                                                     │
│  [  Wyślij wiadomość ──────────────────→  ]         │
│                                                     │
│  ─────────────────────────────────────────────────  │
│  LinkedIn  ·  GitHub  ·  hello@email.com            │
└─────────────────────────────────────────────────────┘
```

**Inputy:**
```css
.form-input {
  background: transparent;
  border: none;
  border-bottom: 1.5px solid rgba(252,255,252,0.2);
  border-radius: 0;
  padding: 0.75rem 0;
  color: var(--text-primary);
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  transition: border-color 0.2s ease;
  width: 100%;
}
.form-input:focus {
  outline: none;
  border-bottom-color: #2ba84a;
}
```

**Typ projektu — karty:**
```css
.project-type-card {
  border: 1.5px solid rgba(252,255,252,0.15);
  border-radius: 10px;
  padding: 1rem 1.25rem;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: 'DM Sans', sans-serif;
}
.project-type-card.selected,
.project-type-card:hover {
  border-color: #2ba84a;
  background: rgba(43,168,74,0.08);
  color: #2ba84a;
}
```

---

## 9. Przełącznik języka PL / EN

### Implementacja
Dwie wersje treści dla każdego elementu z tekstem, przełączane przez JS:

```html
<!-- Przykład użycia -->
<h1>
  <span data-pl="[Twoje Imię i Nazwisko]" data-en="[Your Name]">[Twoje Imię i Nazwisko]</span>
</h1>

<p>
  <span class="i18n" data-pl="Buduję sklepy Shopify, które sprzedają."
                     data-en="I build Shopify stores that sell.">
    Buduję sklepy Shopify, które sprzedają.
  </span>
</p>
```

```js
function setLanguage(lang) {
  document.querySelectorAll('[data-pl][data-en]').forEach(el => {
    el.textContent = el.dataset[lang]
  })
  document.documentElement.lang = lang
  localStorage.setItem('lang', lang)
  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang)
  })
}
// Init
const savedLang = localStorage.getItem('lang') || 'pl'
setLanguage(savedLang)
```

**Uwaga:** Wszystkie texty w HTML mają mieć **oba atrybuty** `data-pl` i `data-en`. Treść placeholder (np. `[Twoje Imię]`) może zostać na razie po polsku — uzupełnimy finalnie po dostarczeniu CV.

### Toggle UI (górny prawy róg)
```css
.top-controls {
  position: fixed;
  top: 1.25rem;
  right: 5.5rem;          /* offset żeby nie nachodził na sidebar */
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 100;
  font-family: 'Space Mono', monospace;
  font-size: 11px;
}

.lang-toggle {
  background: none;
  border: none;
  color: rgba(252,255,252,0.4);
  cursor: pointer;
  padding: 0.2rem 0.4rem;
  transition: color 0.2s;
  letter-spacing: 0.05em;
}
.lang-toggle.active { color: #2ba84a; }

.theme-toggle {
  background: none;
  border: 1px solid rgba(252,255,252,0.15);
  border-radius: 999px;
  padding: 0.25rem 0.6rem;
  cursor: pointer;
  color: rgba(252,255,252,0.6);
  transition: all 0.2s;
}
.theme-toggle:hover { border-color: #2ba84a; color: #2ba84a; }
```

---

## 10. Podsumowanie priorytetów implementacji

W kolejności:

1. **Lenis smooth scroll** — instalacja i konfiguracja (globalny efekt)
2. **Prawy sidebar** — przebudowa z ikon na tekst rotowany, wskaźnik scrollu
3. **Górne controls** — `PL|EN` + dark/light toggle, `position: fixed`
4. **Typografia** — przypisanie fontów (Playfair / Space Mono / DM Sans) do ról
5. **Hover fill effect** — globalny mixin/klasa `.btn` dla wszystkich przycisków
6. **Blur reveal** — efekt wejścia nagłówków sekcji (Intersection Observer)
7. **Sekcja About** — okrągłe zdjęcie + glow + badge + karty specjalizacji
8. **Sekcja Experience** — przebudowa na open timeline (styl z referencji)
9. **Sekcja Skills** — tagi z lewym borderem `border-left: 3px solid #2ba84a`
10. **Sekcja Projects** — sticky stack kart z GSAP ScrollTrigger
11. **Sekcja Education** — open timeline + 50/50 z certyfikatami
12. **Sekcja Contact** — własny kontener `#0d1f1f`, underline inputs, karty typu projektu
13. **i18n PL/EN** — data atrybuty na wszystkich tekstach, JS toggle

---

*Wersja poprawek: 1.0 — treść nadal placeholder, uzupełniona po dostarczeniu CV*
