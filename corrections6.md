# Poprawki — iteracja 7
### Sekcja Projekty — 3 prawdziwe realizacje z grafikami

---

## Dane projektów — podmień wszystkie placeholdery

Zmień nagłówek sekcji z "Moje 4 ostatnie projekty" na "Moje ostatnie projekty" (bo są 3, nie 4).

```js
const projects = [
  {
    number: "01",
    namePL: "Happy Snacky",
    nameEN: "Happy Snacky",
    typePL: "Nowy sklep Shopify",
    typeEN: "New Shopify store",
    industryPL: "Pet food",
    industryEN: "Pet food",
    descPL: "Wielojęzyczny sklep Shopify dla marki premium pet food — z integracją Klaviyo, programem poleceń i bundle produktowymi.",
    descEN: "Multilingual Shopify store for a premium pet food brand — with Klaviyo integration, referral program and product bundles.",
    tags: ["Shopify", "Klaviyo", "Wielojęzyczność", "Bundle", "Comarch"],
    tagsEN: ["Shopify", "Klaviyo", "Multi-language", "Bundles", "Comarch"],
    url: "https://happysnacky.pl",
    image: "happy snack.webp"   // plik jest w root folderu projektu
  },
  {
    number: "02",
    namePL: "Health Guard",
    nameEN: "Health Guard",
    typePL: "Redesign sklepu",
    typeEN: "Store redesign",
    industryPL: "Suplementy diety",
    industryEN: "Dietary supplements",
    descPL: "Kompleksowy redesign oparty o analizę konkurencji i opinii klientów — z Klaviyo automation i optymalizacją UX.",
    descEN: "Full redesign based on competitor analysis and customer feedback — with Klaviyo automation and UX optimization.",
    tags: ["Shopify", "Klaviyo", "CRO", "UX", "Omnibus", "Ebooki"],
    tagsEN: ["Shopify", "Klaviyo", "CRO", "UX", "Omnibus", "E-books"],
    url: "https://healthguard.pl",
    image: "heality guard.webp"  // plik jest w root folderu projektu
  },
  {
    number: "03",
    namePL: "Carein",
    nameEN: "Carein",
    typePL: "Migracja & Wdrożenie",
    typeEN: "Migration & Launch",
    industryPL: "Suplementy diety & Kosmetyki",
    industryEN: "Supplements & Cosmetics",
    descPL: "Projekt graficzny, wdrożenie i migracja z WooCommerce — z integracją Subiekt GT, subskrypcją i funkcją przed/po.",
    descEN: "Graphic design, implementation and migration from WooCommerce — with Subiekt GT integration, subscriptions and before/after slider.",
    tags: ["Shopify", "WooCommerce→Shopify", "BaseLinker", "Subskrypcja", "Upsell"],
    tagsEN: ["Shopify", "WooCommerce→Shopify", "BaseLinker", "Subscriptions", "Upsell"],
    url: "https://carein.pl",
    image: "carein.webp"        // plik jest w root folderu projektu
  }
]
```

---

## Ścieżki do plików graficznych

Grafiki są już w root folderze projektu. Przenieś je do folderu `images/projects/` lub użyj bezpośrednio z root — upewnij się że ścieżki w HTML są poprawne:

```
Opcja A (z root):
  src="happy snack.webp"
  src="heality guard.webp"
  src="carein.webp"

Opcja B (przenieś do folderu — zalecane):
  mkdir images/projects
  mv "happy snack.webp" images/projects/happy-snack.webp
  mv "heality guard.webp" images/projects/health-guard.webp
  mv "carein.webp" images/projects/carein.webp

  Wtedy src="images/projects/happy-snack.webp"
```

**Użyj Opcji B** — foldery są bardziej porządne, a spacje w nazwach plików mogą sprawiać problemy w HTML.

---

## Szczegóły projektów — treść do popup/karty (opcjonalnie)

Jeśli karta projektu ma rozwijany opis lub hover overlay z punktami — użyj tych danych:

```
HAPPY SNACKY — bullet points:
PL:
  • Sklep Shopify z wielojęzyczną obsługą (PL/EN)
  • Integracja z mediami społecznościowymi
  • Integracja Klaviyo (CRM i marketing automation)
  • Program poleceń i bundle produktowe
  • Integracja z Comarch ERP

EN:
  • Multilingual Shopify store (PL/EN)
  • Social media integration
  • Klaviyo integration (CRM & marketing automation)
  • Referral program and product bundles
  • Comarch ERP integration

HEALTH GUARD — bullet points:
PL:
  • Kompleksowy redesign oparty o analizę konkurencji i opinii klientów
  • Personalizacja strony podziękowań i statusu zamówienia
  • Wdrożenie marketing automation na Klaviyo
  • Specjalne rozwiązania dla produktów cyfrowych (ebooki)
  • Dostosowanie procesów zakupowych do wymogów Omnibus
  • Optymalizacja UX na podstawie ankiet klientów

EN:
  • Full redesign based on competitor and customer review analysis
  • Custom thank-you page and order status page
  • Klaviyo marketing automation implementation
  • Special solutions for digital products (e-books)
  • Purchase flow adjustments for Omnibus compliance
  • UX optimization based on customer surveys

CAREIN — bullet points:
PL:
  • Projekt graficzny i wdrożenie od zera
  • Migracja danych z WooCommerce
  • Integracja z Subiekt GT i Baselinkerem
  • Subskrypcja produktów
  • Upsell i Cross Sell
  • Slider "przed i po" na stronach produktowych

EN:
  • Graphic design and full implementation
  • Data migration from WooCommerce
  • Subiekt GT and Baselinkr integration
  • Product subscriptions
  • Upsell and Cross Sell
  • Before & after slider on product pages
```

---

## Nagłówek sekcji — aktualizacja

```
BYŁO:  "Moje 4 ostatnie projekty"  /  "My last 4 projects"
JEST:  "Moje ostatnie projekty"    /  "My recent projects"
```

---

## Link "Odwiedź sklep" — upewnij się że otwiera w nowej karcie

```html
<a href="${project.url}" target="_blank" rel="noopener noreferrer" class="project-link">
  <span data-pl="Odwiedź sklep" data-en="Visit store">Odwiedź sklep</span>
  <svg><!-- strzałka ↗ --></svg>
</a>
```

---

*Poprawki — iteracja 7 — projekty z prawdziwymi danymi*
