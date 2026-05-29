# Poprawki — iteracja 8
### Sekcja Kontakt — dane kontaktowe i info dodatkowe

---

## Dane do wyświetlenia w sekcji kontakt

Obok lub nad formularzem dodaj blok z danymi kontaktowymi i informacjami:

```
Email:        shopify.igor10@gmail.com
Telefon:      +48 792 828 884
Lokalizacja:  Poznań, Polska
Praca:        Hybrydowo / Zdalnie
LinkedIn:     https://www.linkedin.com/in/igor-pieczynski/
```

---

## Układ — lewa kolumna z info, prawa z formularzem

```
┌─────────────────────────┬─────────────────────────────────────┐
│  KONTAKT                │                                     │
│                         │  Imię / Nazwa firmy                 │
│  Zacznijmy              │  [____________________________]     │
│  współpracę.            │                                     │
│                         │  Email                              │
│  ──────────────────     │  [____________________________]     │
│                         │                                     │
│  ✉ shopify.igor10       │  Telefon (opcjonalnie)              │
│    @gmail.com           │  [____________________________]     │
│                         │                                     │
│  📞 +48 792 828 884     │  Typ projektu                       │
│                         │  [Nowy sklep][Modernizacja][Migr.]  │
│  📍 Poznań, Polska      │                                     │
│                         │  Opowiedz o projekcie               │
│  💼 Hybrydowo / Zdalnie │  [                           ]     │
│                         │  [_____________________________]    │
│  ──────────────────     │                                     │
│                         │  [ Wyślij wiadomość ──────────→ ]  │
│  [LinkedIn →]           │                                     │
│  wyraźny button         │                                     │
└─────────────────────────┴─────────────────────────────────────┘
```

---

## HTML dla bloku info kontaktowego

```html
<div class="contact-info">

  <div class="contact-heading">
    <span class="section-label i18n" data-pl="KONTAKT" data-en="CONTACT">KONTAKT</span>
    <h2 class="i18n" data-pl="Zacznijmy współpracę." data-en="Let's work together.">
      Zacznijmy współpracę.
    </h2>
  </div>

  <div class="contact-details">

    <a href="mailto:shopify.igor10@gmail.com" class="contact-item">
      <span class="contact-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      </span>
      <span class="contact-value">shopify.igor10@gmail.com</span>
    </a>

    <a href="tel:+48792828884" class="contact-item">
      <span class="contact-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07
                   A19.5 19.5 0 0 1 4.32 12a19.79 19.79 0 0 1-3.07-8.67
                   A2 2 0 0 1 3.22 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81
                   a2 2 0 0 1-.45 2.11L7.91 8.1a16 16 0 0 0 6 6l.62-.62
                   a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7
                   A2 2 0 0 1 22 16.92z"/>
        </svg>
      </span>
      <span class="contact-value">+48 792 828 884</span>
    </a>

    <div class="contact-item">
      <span class="contact-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      </span>
      <span class="contact-value i18n" data-pl="Poznań, Polska" data-en="Poznań, Poland">
        Poznań, Polska
      </span>
    </div>

    <div class="contact-item">
      <span class="contact-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2"/>
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        </svg>
      </span>
      <span class="contact-value i18n"
            data-pl="Hybrydowo / Zdalnie"
            data-en="Hybrid / Remote">
        Hybrydowo / Zdalnie
      </span>
    </div>

  </div>

  <!-- LinkedIn — wyraźny button -->
  <a href="https://www.linkedin.com/in/igor-pieczynski/"
     target="_blank"
     rel="noopener noreferrer"
     class="linkedin-btn">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4
               v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
    <span class="i18n" data-pl="Zobacz profil LinkedIn" data-en="View LinkedIn profile">
      Zobacz profil LinkedIn
    </span>
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2">
      <path d="M7 17L17 7M7 7h10v10"/>
    </svg>
  </a>

</div>
```

---

## CSS

```css
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding-right: 3rem;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  text-decoration: none;
  color: var(--text-secondary);
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  transition: color 0.2s ease;
}

a.contact-item:hover {
  color: #2ba84a;
}

a.contact-item:hover .contact-icon {
  color: #2ba84a;
}

.contact-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(43, 168, 74, 0.08);
  border: 1px solid rgba(43, 168, 74, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2ba84a;
  flex-shrink: 0;
  transition: background 0.2s ease, border-color 0.2s ease;
}

a.contact-item:hover .contact-icon {
  background: rgba(43, 168, 74, 0.15);
  border-color: rgba(43, 168, 74, 0.4);
}

/* LinkedIn button — wyraźny, nie można przeoczyć */
.linkedin-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1.25rem;
  background: rgba(10, 102, 194, 0.1);       /* LinkedIn blue tint */
  border: 1.5px solid rgba(10, 102, 194, 0.35);
  border-radius: 8px;
  color: #4a9fd4;
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.05em;
  text-decoration: none;
  transition: all 0.25s ease;
  align-self: flex-start;
}

.linkedin-btn:hover {
  background: rgba(10, 102, 194, 0.2);
  border-color: rgba(10, 102, 194, 0.6);
  color: #6ab4e8;
  transform: translateY(-1px);
}

/* Layout kontaktowy — 2 kolumny */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 4rem;
  align-items: start;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .contact-info {
    padding-right: 0;
  }
}
```

---

*Poprawki — iteracja 8 — dane kontaktowe*
