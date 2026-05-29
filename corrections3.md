# Poprawki — iteracja 4
### Sekcja "Jak wygląda współpraca?" — redesign + scroll-driven timeline

---

## 1. Sekcja Proces — pełny redesign

### Usuń
- Białe numery `1.` `2.` `3.` `4.` przed tytułami kroków — duplikują się z zielonymi `01` `02`
- Wszędzie gdzie są kółka osi czasu (Experience, Education, Process) — usuń białe/szare cyfry jeśli są obok zielonych

### Nowy koncept: sekcja "przypięta" ze scrollem

Sekcja jest `sticky` — podczas scrollowania przez nią strona jakby "stoi w miejscu" a linia osi czasu wypełnia się od lewej do prawej, a kolejne kroki podświetlają się jeden po drugim.

**Implementacja z GSAP ScrollTrigger:**

```js
// Sekcja przypięta na czas scrollu przez 4 kroki
gsap.timeline({
  scrollTrigger: {
    trigger: '#process',
    start: 'top top',
    end: '+=200%',      // strona scrolluje 200vh zanim sekcja "odjedzie"
    scrub: 1,
    pin: true,          // sekcja stoi w miejscu podczas scrollu
  }
})
// Linia wypełnia się od lewej do prawej
.to('.process-line-fill', { width: '100%', ease: 'none' })

// Każdy krok podświetla się przy odpowiednim progu
// Krok 1 aktywny od 0%, krok 2 od 33%, krok 3 od 66%, krok 4 od 99%
cards.forEach((card, i) => {
  ScrollTrigger.create({
    trigger: '#process',
    start: `top+=${i * 50}% top`,  // każdy krok co 50vh
    onEnter: () => card.classList.add('active'),
    onLeaveBack: () => card.classList.remove('active'),
  })
})
```

**HTML struktura:**
```html
<section id="process">
  <div class="process-inner">

    <div class="process-heading">
      <span class="section-label" data-pl="PROCES" data-en="PROCESS">PROCES</span>
      <h2 data-pl="Jak wygląda współpraca?" data-en="How does it work?">
        Jak wygląda współpraca?
      </h2>
    </div>

    <!-- Oś czasu -->
    <div class="process-timeline">
      <div class="process-line-track">
        <div class="process-line-fill"></div>  <!-- wypełnia się przy scrollu -->
      </div>

      <div class="process-steps">

        <div class="process-step" data-index="0">
          <div class="step-dot"></div>
          <span class="step-num">01</span>
          <h3 class="step-title i18n" data-pl="Poznaję markę" data-en="I learn the brand">
            Poznaję markę
          </h3>
          <p class="step-desc i18n"
             data-pl="Zanim zacznę projektować, rozumiem klienta, jego cel i grupę docelową."
             data-en="Before designing, I understand the client, their goal and target audience.">
            Zanim zacznę projektować, rozumiem klienta, jego cel i grupę docelową.
          </p>
        </div>

        <div class="process-step" data-index="1">
          <div class="step-dot"></div>
          <span class="step-num">02</span>
          <h3 class="step-title i18n" data-pl="Planuję" data-en="I plan">Planuję</h3>
          <p class="step-desc i18n"
             data-pl="Szkicuję jak sklep ma wyglądać i jak po nim poruszać się klientowi."
             data-en="I sketch how the store should look and how the customer should navigate it.">
            Szkicuję jak sklep ma wyglądać i jak po nim poruszać się klientowi.
          </p>
        </div>

        <div class="process-step" data-index="2">
          <div class="step-dot"></div>
          <span class="step-num">03</span>
          <h3 class="step-title i18n" data-pl="Buduję" data-en="I build">Buduję</h3>
          <p class="step-desc i18n"
             data-pl="Krok po kroku, każdy detal ma sens."
             data-en="Step by step, every detail has a purpose.">
            Krok po kroku, każdy detal ma sens.
          </p>
        </div>

        <div class="process-step" data-index="3">
          <div class="step-dot"></div>
          <span class="step-num">04</span>
          <h3 class="step-title i18n" data-pl="Oddaję" data-en="I deliver">Oddaję</h3>
          <p class="step-desc i18n"
             data-pl="Gotowy sklep który działa od pierwszego dnia."
             data-en="A finished store that works from day one.">
            Gotowy sklep który działa od pierwszego dnia.
          </p>
        </div>

      </div>
    </div>

  </div>
</section>
```

**CSS:**
```css
#process {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6rem 2rem;
}

/* Oś czasu — linia */
.process-line-track {
  position: relative;
  height: 1px;
  background: rgba(43, 168, 74, 0.15);
  margin: 3rem 0 2.5rem;
  overflow: visible;
}

.process-line-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 1px;
  width: 0%;                          /* startuje od 0, GSAP animuje do 100% */
  background: #2ba84a;
  transition: none;                   /* GSAP zarządza, nie CSS transition */
}

/* Kroki */
.process-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  position: relative;
}

.process-step {
  position: relative;
  padding-top: 1.5rem;
  opacity: 0.35;
  transform: translateY(8px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.process-step.active {
  opacity: 1;
  transform: translateY(0);
}

/* Kółko na osi — bez cyfr, tylko dot */
.step-dot {
  position: absolute;
  top: -3.1rem;                       /* wyrównanie z linią */
  left: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1.5px solid rgba(43, 168, 74, 0.3);
  background: var(--bg-primary);
  transition: border-color 0.3s ease, background 0.3s ease;
}

.process-step.active .step-dot {
  border-color: #2ba84a;
  background: #2ba84a;
  box-shadow: 0 0 12px rgba(43, 168, 74, 0.4);
}

/* Numer kroku — tylko zielony, jeden */
.step-num {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: #2ba84a;
  letter-spacing: 0.1em;
  display: block;
  margin-bottom: 0.6rem;
  opacity: 0.7;
}

.process-step.active .step-num {
  opacity: 1;
}

/* Tytuł */
.step-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.1rem, 1.8vw, 1.4rem);
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 0.6rem;
  line-height: 1.2;
}

/* Opis */
.step-desc {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-secondary);
}

/* Mobile — pionowa oś */
@media (max-width: 768px) {
  .process-steps {
    grid-template-columns: 1fr;
    gap: 0;
    padding-left: 2rem;
    border-left: 1px solid rgba(43, 168, 74, 0.2);
  }

  .process-line-track { display: none; }

  .process-step {
    padding-top: 0;
    padding-bottom: 2.5rem;
    opacity: 1;
    transform: none;
  }

  .step-dot {
    top: 0.2rem;
    left: -2.45rem;
  }
}
```

---

## 2. Globalna zasada — bez duplikujących się numerów

Wszędzie gdzie element ma już zielony numer (`01`, `02`...) lub zieloną cyfrę — usuń wszelkie dodatkowe białe/szare cyfry obok. Dotyczy:

- Sekcja Process: usuń `1.` `2.` `3.` `4.` — zostawiamy tylko zielone `01` `02` `03` `04`
- Sekcja Experience: jeśli przy wpisach są cyfry poza datami — usuń
- Sekcja Education: j.w.
- Sekcja Projects: numer karty (`01`–`04`) tylko jeden, duży, opacity tło

---

*Poprawki — iteracja 4*
