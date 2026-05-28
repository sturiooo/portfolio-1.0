# Poprawki treści — iteracja 3c
### Korekta struktury sekcji "O mnie" + nowa sekcja "Proces"

---

## 1. Hero — zmiana tagline

```
BYŁO:   "Buduję sklepy Shopify, które sprzedają."
JEST:   "Większość sklepów Shopify wygląda poprawnie. Moje działają."

EN:     "Most Shopify stores look fine. Mine work."
```

---

## 2. Sekcja "O mnie" — bio zastąp syntezą (4-5 zdań)

Usuń rozbudowane 5-akapitowe bio z corrections2b.md. Zastąp je zwięzłą syntezą:

```
PL:
"Specjalista e-commerce z 7+ latami doświadczenia na Shopify. Wchodzę do 
projektów nowych i takich, które ktoś już „zrobił" – i zostawiam je w 
znacznie lepszym miejscu niż je zastałem. Widzę sklep oczami kupującego, 
nie właściciela – błędy, które kosztują sprzedaż, są zazwyczaj dokładnie 
tam gdzie nikt nie patrzy. Technicznie nie ma dla mnie rzeczy niemożliwych 
do zbudowania na Shopify. Nie jestem od zrobienia sklepu – jestem od 
zrobienia sklepu, który zarabia."

EN:
"E-commerce specialist with 7+ years of Shopify experience. I step into 
new projects and ones someone already „finished" – and leave them in a 
significantly better place. I see the store through the buyer's eyes, not 
the owner's – the mistakes that cost sales are usually exactly where no one 
is looking. Technically, there's nothing I can't build on Shopify. I'm not 
here to build a store – I'm here to build a store that earns."
```

Ostatnie zdanie wyróżnij: `color: #2ba84a` lub `font-style: italic`.

**4 kafelki specjalizacji zostają bez zmian.**

---

## 3. Blok "Czym się zajmuję" — USUŃ, nie dodawaj

Nie dodawaj listy usług ani bloku Co/Jak/Dlaczego do sekcji "O mnie".
Zostaje: zdjęcie + bio (5 zdań) + 4 istniejące kafelki.

---

## 4. Nowa sekcja "Proces" — odrazu pod "O mnie"

Dodaj jako osobną sekcję w nawigacji między `#about` a `#experience`.

**Nagłówek sekcji:**
```
PL: "Jak wygląda współpraca?"
EN: "How does it work?"
```

**4 kroki — pozioma oś na desktop, pionowa na mobile:**

```
KROK 1:
  PL tytuł: "Poznaję markę"
  PL opis:  "Zanim zacznę projektować, rozumiem klienta, jego cel i grupę docelową."
  EN tytuł: "I learn the brand"
  EN opis:  "Before designing, I understand the client, their goal and target audience."

KROK 2:
  PL tytuł: "Planuję"
  PL opis:  "Szkicuję jak sklep ma wyglądać i jak po nim poruszać się klientowi."
  EN tytuł: "I plan"
  EN opis:  "I sketch how the store should look and how the customer should navigate it."

KROK 3:
  PL tytuł: "Buduję"
  PL opis:  "Krok po kroku, każdy detal ma sens."
  EN tytuł: "I build"
  EN opis:  "Step by step, every detail has a purpose."

KROK 4:
  PL tytuł: "Oddaję"
  PL opis:  "Gotowy sklep który działa od pierwszego dnia."
  EN tytuł: "I deliver"
  EN opis:  "A finished store that works from day one."
```

**Wygląd kroków:**
```
  ○ ————————— ○ ————————— ○ ————————— ○
  01           02           03           04
  Poznaję      Planuję      Buduję       Oddaję
  markę
  opis...      opis...      opis...      opis...
```

- Kółka połączone linią `1px solid rgba(43,168,74,0.25)`
- Numer: Space Mono, 11px, `#2ba84a`
- Tytuł: Playfair Display, ~1.2rem
- Opis: DM Sans, 14px, muted
- Mobile (`< 768px`): układ pionowy, linia po lewej stronie

**Dodaj `#process` do prawego sidebara:**
```
Nowa pozycja między ABOUT a EXPERIENCE:
ABOUT → PROCESS → EXPERIENCE → SKILLS → PROJECTS → EDUCATION → CONTACT
```

---

*Korekta corrections2b — uproszczona struktura*
