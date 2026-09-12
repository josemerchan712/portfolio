# ES/EN Language Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a fully accessible ES/EN language toggle to the portfolio — every visible string translated, no route change, no new dependencies.

**Architecture:** A React Context (`LanguageProvider`) holds the active language and persists it to `localStorage`. A `useTranslation()` hook reads two static JSON files (`es.json`/`en.json`) and returns the active language's text tree. Every component with visible text is migrated from hardcoded strings to `useTranslation()` lookups. A new `LanguageToggle` component (rendered inside `Nav`) flips the language. Proper nouns, URLs, and tech-stack terms stay hardcoded in components — only real prose goes through i18n.

**Tech Stack:** Same as the existing project — Vite 5, React 18, Vitest + @testing-library/react. No new dependencies (Vite has built-in JSON import support).

## Global Constraints

- No new dependencies — no i18n library, no router. Context + JSON only.
- No new CSS colors or font-family declarations — every new rule reuses existing custom properties (`--gold`, `--navy`, `--cream-muted`, `--gold-light`, `--border`).
- No visual redesign beyond adding the toggle itself — existing layout, spacing, and copy (beyond translation) stay as-is.
- Proper nouns, technical terms, and structural data are NEVER translated and stay hardcoded in components, not in the i18n JSON: person's name, project titles, "GitHub", "LinkedIn", tech-stack tags (`PROJECTS[].tech`, About's skill tags), `github`/`demo`/`mailto:` URLs, the footer copyright line, and the toggle's own "ES"/"EN" labels.
- **CSS scoping acceptance criterion:** the `@media (max-width: 768px) { .nav-links { display: none; } }` rule in `src/index.css` must keep targeting `.nav-links` specifically. The new `.nav-right` wrapper must never appear inside that media query or receive `display: none` at any breakpoint — the language toggle must stay visible on mobile. Verifiable by grep: `grep -A10 "@media (max-width: 768px)" src/index.css` must show zero occurrences of `.nav-right`.
- `en.json`'s content is a first-pass translation by the plan's author (this document) — natural, professional, B1-B2 technical English, not word-for-word. **Before Task 2 starts, the controller must show the complete `en.json` file to the project owner and get explicit approval or requested edits** — this is not optional and not delegated to a subagent; it's a human content-review gate between Task 1 and Task 2.

---

## Task 1: i18n foundation — JSON content, Context, translation hook

**Files:**
- Create: `src/i18n/es.json`
- Create: `src/i18n/en.json`
- Create: `src/i18n/LanguageContext.jsx`
- Create: `src/i18n/useTranslation.js`
- Create: `src/i18n/LanguageContext.test.jsx`
- Create: `src/i18n/useTranslation.test.jsx`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: `LanguageProvider` component and `useLanguage()` hook (returns `{ lang: 'es' | 'en', toggleLanguage: () => void }`) from `src/i18n/LanguageContext.jsx`. `useTranslation()` hook from `src/i18n/useTranslation.js` (returns the active language's full text tree, e.g. `t.hero.headline.line1`). Every later task that touches a component imports `useTranslation` from `'../i18n/useTranslation'` and wraps its test renders in `<LanguageProvider>` imported from `'../i18n/LanguageContext'`. The full key tree used by every later task is fixed by `es.json`/`en.json` below — do not add, rename, or restructure keys in later tasks.

- [ ] **Step 1: Write `src/i18n/es.json`**

```json
{
  "nav": {
    "links": {
      "about": "Sobre mí",
      "projects": "Proyectos",
      "contact": "Contacto"
    }
  },
  "hero": {
    "tag": "Desarrollador de software · Málaga",
    "headline": {
      "line1": "Construyo",
      "emphasis": "soluciones",
      "line2": "que funcionan."
    },
    "meta": {
      "location": "Málaga, España",
      "workMode": "Remoto / Híbrido / Presencial",
      "availability": "Disponibilidad inmediata",
      "jobSearch": "En búsqueda de mi primer puesto en desarrollo",
      "english": "Inglés B1 (técnico)"
    },
    "sub": "Desarrollo aplicaciones web y de escritorio enfocadas en automatizar procesos reales para negocios. Código limpio, resultados concretos.",
    "cta": {
      "projects": "Ver proyectos",
      "contact": "Hablemos"
    }
  },
  "about": {
    "title": "Sobre mí",
    "paragraph1": {
      "pre": "Soy ",
      "post": ", desarrollador de software con base en Málaga. Trabajo en el desarrollo de aplicaciones web, móviles y de escritorio, combinando buenas prácticas de ingeniería con un enfoque centrado en resolver problemas reales."
    },
    "paragraph2": {
      "pre": "Me interesa especialmente la ",
      "strong": "automatización de procesos",
      "post": " y la creación de herramientas que aporten valor desde el primer día. Cuido tanto la arquitectura del código como la experiencia final del usuario."
    },
    "paragraph3": "Actualmente disponible para proyectos freelance y posiciones como desarrollador.",
    "skills": {
      "frontendLabel": "Frontend",
      "backendLabel": "Backend & datos",
      "toolsLabel": "Herramientas"
    }
  },
  "projects": {
    "title": "Proyectos",
    "statusComplete": "Proyecto completo — código en GitHub",
    "viewDemo": "Ver demo",
    "portfolio": {
      "why": "Mi primera pieza pensada como carta de presentación: quería demostrar los fundamentos (HTML, CSS y JavaScript sin frameworks) antes de dar el salto a stacks más complejos.",
      "description": "Mi web de presentación profesional. Diseño oscuro con animaciones CSS, scroll reveal y navegación fija. Desarrollado completamente en HTML, CSS y JavaScript puro, sin frameworks."
    },
    "owlSm": {
      "why": "Quería explorar cómo la IA puede ayudar a estructurar y priorizar tareas complejas dentro de una app real, no solo como ejercicio académico.",
      "description": "App Android contra la procrastinación desarrollada como TFG. Incluye gestión de tareas, bloqueador de aplicaciones, IA que desglosa tareas grandes en subtareas, apartado social y una mascota virtual que crece al subir de nivel."
    },
    "cycleando": {
      "why": "Mi primer encargo freelance real, de principio a fin: de la reunión con el cliente al despliegue en producción.",
      "description": "Propuesta de web para una empresa local de Málaga dedicada a la reparación de bicis y patinetes. Diseño moderno, responsive y orientado a captar clientes online."
    },
    "tpvAutomation": {
      "why": "Quería demostrar disciplina de ingeniería más allá de que \"el código funcione\": lo construí con TDD pensando en la fiabilidad que exige un sistema de punto de venta real.",
      "description": "Sistema de punto de venta full-stack para pequeños comercios, con automatización de inventario y reportes. Backend en FastAPI con autenticación JWT, control de acceso por roles y más de 100 tests automatizados con TDD. Frontend en React + TypeScript con interfaz de venta optimizada para uso real en caja.",
      "metric": "100+ tests automatizados (TDD)"
    }
  },
  "contact": {
    "title": "Contacto",
    "intro": "¿Tienes un proyecto en mente o buscas un desarrollador para tu equipo? Estoy disponible para hablar sobre oportunidades freelance o empleo."
  },
  "footer": {
    "tagline": "Diseñado y desarrollado por mí"
  }
}
```

- [ ] **Step 2: Write `src/i18n/en.json`**

```json
{
  "nav": {
    "links": {
      "about": "About",
      "projects": "Projects",
      "contact": "Contact"
    }
  },
  "hero": {
    "tag": "Software Developer · Málaga",
    "headline": {
      "line1": "I build",
      "emphasis": "solutions",
      "line2": "that work."
    },
    "meta": {
      "location": "Málaga, Spain",
      "workMode": "Remote / Hybrid / On-site",
      "availability": "Available immediately",
      "jobSearch": "Looking for my first developer role",
      "english": "English B1 (technical)"
    },
    "sub": "I build web and desktop applications focused on automating real business processes. Clean code, real results.",
    "cta": {
      "projects": "View projects",
      "contact": "Let's talk"
    }
  },
  "about": {
    "title": "About me",
    "paragraph1": {
      "pre": "I'm ",
      "post": ", a software developer based in Málaga. I work on web, mobile, and desktop applications, combining solid engineering practices with a focus on solving real problems."
    },
    "paragraph2": {
      "pre": "I'm especially interested in ",
      "strong": "process automation",
      "post": " and building tools that deliver value from day one. I care as much about the code's architecture as I do about the end user's experience."
    },
    "paragraph3": "Currently available for freelance projects and developer positions.",
    "skills": {
      "frontendLabel": "Frontend",
      "backendLabel": "Backend & Data",
      "toolsLabel": "Tools"
    }
  },
  "projects": {
    "title": "Projects",
    "statusComplete": "Completed project — code on GitHub",
    "viewDemo": "View demo",
    "portfolio": {
      "why": "My first project built as a personal showcase: I wanted to nail the fundamentals (HTML, CSS, and JavaScript with no frameworks) before moving on to more complex stacks.",
      "description": "My professional presentation site. Dark design with CSS animations, scroll reveal, and a fixed nav bar. Built entirely with plain HTML, CSS, and JavaScript, no frameworks."
    },
    "owlSm": {
      "why": "I wanted to explore how AI can help structure and prioritize complex tasks inside a real app, not just as an academic exercise.",
      "description": "An Android app against procrastination, built as my final degree project. Includes task management, an app blocker, AI that breaks big tasks into subtasks, a social section, and a virtual pet that grows as you level up."
    },
    "cycleando": {
      "why": "My first real freelance job, start to finish: from the client meeting to the production deploy.",
      "description": "A website proposal for a local Málaga business that repairs bikes and scooters. Modern, responsive design built to bring in customers online."
    },
    "tpvAutomation": {
      "why": "I wanted to prove engineering discipline beyond \"the code works\": I built it with TDD, with the reliability a real point-of-sale system demands in mind.",
      "description": "A full-stack point-of-sale system for small businesses, with inventory automation and reporting. FastAPI backend with JWT auth, role-based access control, and 100+ automated tests built with TDD. React + TypeScript frontend with a checkout UI optimized for real-world register use.",
      "metric": "100+ automated tests (TDD)"
    }
  },
  "contact": {
    "title": "Contact",
    "intro": "Have a project in mind, or looking for a developer for your team? I'm available to talk about freelance opportunities or full-time roles."
  },
  "footer": {
    "tagline": "Designed and developed by me"
  }
}
```

- [ ] **Step 3: Write `src/i18n/LanguageContext.jsx`**

```jsx
import { createContext, useContext, useState, useCallback } from 'react';

const STORAGE_KEY = 'portfolio-lang';
const LanguageContext = createContext(null);

function readStoredLanguage() {
  const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
  return stored === 'es' || stored === 'en' ? stored : 'es';
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readStoredLanguage);

  const toggleLanguage = useCallback(() => {
    setLang((current) => {
      const next = current === 'es' ? 'en' : 'es';
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
```

- [ ] **Step 4: Write `src/i18n/useTranslation.js`**

```js
import { useLanguage } from './LanguageContext';
import es from './es.json';
import en from './en.json';

const TRANSLATIONS = { es, en };

export function useTranslation() {
  const { lang } = useLanguage();
  return TRANSLATIONS[lang];
}
```

- [ ] **Step 5: Write the failing tests for `LanguageContext`**

Create `src/i18n/LanguageContext.test.jsx`:

```jsx
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider, useLanguage } from './LanguageContext';

function Probe() {
  const { lang, toggleLanguage } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <button onClick={toggleLanguage}>toggle</button>
    </div>
  );
}

describe('LanguageContext', () => {
  afterEach(() => localStorage.clear());

  it('defaults to Spanish when nothing is stored', () => {
    render(<LanguageProvider><Probe /></LanguageProvider>);
    expect(screen.getByTestId('lang')).toHaveTextContent('es');
  });

  it('reads a previously stored language preference', () => {
    localStorage.setItem('portfolio-lang', 'en');
    render(<LanguageProvider><Probe /></LanguageProvider>);
    expect(screen.getByTestId('lang')).toHaveTextContent('en');
  });

  it('falls back to Spanish for an invalid stored value', () => {
    localStorage.setItem('portfolio-lang', 'fr');
    render(<LanguageProvider><Probe /></LanguageProvider>);
    expect(screen.getByTestId('lang')).toHaveTextContent('es');
  });

  it('toggles the language and persists the new value', () => {
    render(<LanguageProvider><Probe /></LanguageProvider>);
    fireEvent.click(screen.getByText('toggle'));
    expect(screen.getByTestId('lang')).toHaveTextContent('en');
    expect(localStorage.getItem('portfolio-lang')).toBe('en');

    fireEvent.click(screen.getByText('toggle'));
    expect(screen.getByTestId('lang')).toHaveTextContent('es');
    expect(localStorage.getItem('portfolio-lang')).toBe('es');
  });

  it('throws when useLanguage is used outside a LanguageProvider', () => {
    const renderWithoutProvider = () => render(<Probe />);
    expect(renderWithoutProvider).toThrow('useLanguage must be used within a LanguageProvider');
  });
});
```

- [ ] **Step 6: Run the tests to verify they fail**

Run: `npx vitest run src/i18n/LanguageContext.test.jsx`
Expected: FAIL — `./LanguageContext` doesn't exist yet (or the file from Step 3 is missing when this step is run first; if Steps 3-4 already ran, skip straight to Step 7 verification since TDD-before-implementation isn't meaningful once the implementation already exists — but write the test file before considering this task done regardless).

- [ ] **Step 7: Write the test for `useTranslation`**

Create `src/i18n/useTranslation.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from './LanguageContext';
import { useTranslation } from './useTranslation';

function Probe() {
  const t = useTranslation();
  return <h1>{t.hero.headline.line1}</h1>;
}

describe('useTranslation', () => {
  it('returns Spanish strings by default', () => {
    render(<LanguageProvider><Probe /></LanguageProvider>);
    expect(screen.getByText('Construyo')).toBeInTheDocument();
  });
});
```

- [ ] **Step 8: Run both test files and confirm they pass**

Run: `npx vitest run src/i18n/LanguageContext.test.jsx src/i18n/useTranslation.test.jsx`
Expected: PASS (6 tests total)

- [ ] **Step 9: Commit**

```bash
git add src/i18n/es.json src/i18n/en.json src/i18n/LanguageContext.jsx src/i18n/useTranslation.js src/i18n/LanguageContext.test.jsx src/i18n/useTranslation.test.jsx
git commit -m "$(cat <<'EOF'
feat: add i18n foundation (Context, translation hook, ES/EN JSON)

LanguageProvider holds the active language and persists it to
localStorage['portfolio-lang'], defaulting to Spanish. useTranslation()
returns the active language's full text tree from es.json/en.json.
No component wiring yet — that's the next tasks.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

> **STOP — controller checkpoint, not a subagent step:** before dispatching Task 2, show the complete `src/i18n/en.json` content to the project owner and get explicit approval (or apply requested wording changes and re-show) before proceeding. This is a hard requirement from the original request, not optional polish.

---

## Task 2: Nav, LanguageToggle, toggle CSS, App wiring

**Files:**
- Create: `src/components/LanguageToggle.jsx`
- Create: `src/components/LanguageToggle.test.jsx`
- Modify: `src/components/Nav.jsx`
- Create: `src/components/Nav.test.jsx`
- Modify: `src/App.jsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `LanguageProvider`/`useLanguage` from `src/i18n/LanguageContext.jsx`, `useTranslation` from `src/i18n/useTranslation.js` (Task 1).
- Produces: the live app is wrapped in `<LanguageProvider>` from this task onward — Tasks 3-6 no longer need to touch `App.jsx`. `LanguageToggle` is a self-contained component other tasks don't need to import directly (it's only used inside `Nav`).

- [ ] **Step 1: Write the failing tests for `LanguageToggle`**

Create `src/components/LanguageToggle.test.jsx`:

```jsx
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider } from '../i18n/LanguageContext';
import { LanguageToggle } from './LanguageToggle';

describe('LanguageToggle', () => {
  afterEach(() => localStorage.clear());

  it('renders both options with the correct aria-pressed state for the default language', () => {
    render(<LanguageProvider><LanguageToggle /></LanguageProvider>);
    expect(screen.getByRole('button', { name: 'ES' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('has an accessible group label', () => {
    render(<LanguageProvider><LanguageToggle /></LanguageProvider>);
    expect(screen.getByRole('group', { name: /Language selector/ })).toBeInTheDocument();
  });

  it('switches the active state when the inactive button is clicked', () => {
    render(<LanguageProvider><LanguageToggle /></LanguageProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'EN' }));
    expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'ES' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('is a no-op when the already-active button is clicked', () => {
    render(<LanguageProvider><LanguageToggle /></LanguageProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'ES' }));
    expect(screen.getByRole('button', { name: 'ES' })).toHaveAttribute('aria-pressed', 'true');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/LanguageToggle.test.jsx`
Expected: FAIL — `./LanguageToggle` doesn't exist yet.

- [ ] **Step 3: Write `src/components/LanguageToggle.jsx`**

```jsx
import { useLanguage } from '../i18n/LanguageContext';

export function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <div className="language-toggle" role="group" aria-label="Selector de idioma / Language selector">
      <button
        type="button"
        className={lang === 'es' ? 'lang-option lang-option-active' : 'lang-option'}
        aria-pressed={lang === 'es'}
        onClick={() => lang !== 'es' && toggleLanguage()}
      >
        ES
      </button>
      <button
        type="button"
        className={lang === 'en' ? 'lang-option lang-option-active' : 'lang-option'}
        aria-pressed={lang === 'en'}
        onClick={() => lang !== 'en' && toggleLanguage()}
      >
        EN
      </button>
    </div>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/LanguageToggle.test.jsx`
Expected: PASS (4 tests)

- [ ] **Step 5: Write the failing tests for `Nav`**

Create `src/components/Nav.test.jsx`:

```jsx
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../i18n/LanguageContext';
import { Nav } from './Nav';

describe('Nav', () => {
  afterEach(() => localStorage.clear());

  it('renders the Spanish nav links by default', () => {
    render(<LanguageProvider><Nav /></LanguageProvider>);
    expect(screen.getByText('Sobre mí')).toBeInTheDocument();
    expect(screen.getByText('Proyectos')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
  });

  it('renders the English nav links when the stored language is en', () => {
    localStorage.setItem('portfolio-lang', 'en');
    render(<LanguageProvider><Nav /></LanguageProvider>);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders the language toggle inside the nav', () => {
    render(<LanguageProvider><Nav /></LanguageProvider>);
    expect(screen.getByRole('group', { name: /Language selector/ })).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Run the test to verify it fails**

Run: `npx vitest run src/components/Nav.test.jsx`
Expected: FAIL — `Nav` still renders hardcoded Spanish text with no `useTranslation` wiring, and throws because `Nav` isn't wrapped in a provider by the test's `<LanguageProvider>` yet being used correctly — the English-link assertions fail since nothing changes with the stored language.

- [ ] **Step 7: Rewrite `src/components/Nav.jsx`**

```jsx
import { useTranslation } from '../i18n/useTranslation';
import { LanguageToggle } from './LanguageToggle';

export function Nav() {
  const t = useTranslation();

  return (
    <nav>
      <a href="#hero" className="nav-logo">José María Merchán</a>
      <div className="nav-right">
        <ul className="nav-links">
          <li><a href="#about">{t.nav.links.about}</a></li>
          <li><a href="#projects">{t.nav.links.projects}</a></li>
          <li><a href="#contact">{t.nav.links.contact}</a></li>
        </ul>
        <LanguageToggle />
      </div>
    </nav>
  );
}
```

- [ ] **Step 8: Run the test to verify it passes**

Run: `npx vitest run src/components/Nav.test.jsx`
Expected: PASS (3 tests)

- [ ] **Step 9: Add the toggle and `.nav-right` CSS**

In `src/index.css`, insert this block immediately after the `.nav-links a:hover { color: var(--gold-light); }` line (before the `#hero { ... }` rule):

```css
.nav-right {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.language-toggle {
  display: flex;
  border: 0.5px solid var(--border);
  border-radius: 3px;
  overflow: hidden;
}

.lang-option {
  background: transparent;
  border: none;
  color: var(--cream-muted);
  padding: 0.35rem 0.7rem;
  font-size: 0.75rem;
  font-family: inherit;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.lang-option:not(.lang-option-active):hover { color: var(--gold-light); }

.lang-option-active {
  background: var(--gold);
  color: var(--navy);
}
```

Do NOT modify the existing `@media (max-width: 768px) { ... .nav-links { display: none; } ... }` block in any way — leave it exactly as it is. This is the CSS-scoping acceptance criterion from Global Constraints.

- [ ] **Step 10: Verify the CSS-scoping acceptance criterion**

Run: `grep -A10 "@media (max-width: 768px)" src/index.css`
Expected: the output lists `.nav-links { display: none; }` and does NOT contain `.nav-right` anywhere.

- [ ] **Step 11: Wrap the app in `LanguageProvider`**

In `src/App.jsx`, add the import and wrap the existing JSX tree. The file currently ends with:

```jsx
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
```

Add `import { LanguageProvider } from './i18n/LanguageContext';` to the top imports, and change the return to:

```jsx
  return (
    <LanguageProvider>
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </LanguageProvider>
  );
}
```

- [ ] **Step 12: Run the full test suite**

Run: `npm test -- --run`
Expected: all tests pass. `HeroContent.jsx`, `About.jsx`, `Projects.jsx`, `Contact.jsx`, and `Footer.jsx` are untouched by this task — they still render their original hardcoded Spanish text, and their existing tests still assert exactly that, so nothing here should break. If anything fails, stop and investigate before committing.

- [ ] **Step 13: Build check**

Run: `npm run build`
Expected: succeeds (build doesn't run tests, so the temporary Task-3/5 test failures don't block it).

- [ ] **Step 14: Commit**

```bash
git add src/components/LanguageToggle.jsx src/components/LanguageToggle.test.jsx src/components/Nav.jsx src/components/Nav.test.jsx src/App.jsx src/index.css
git commit -m "$(cat <<'EOF'
feat: add accessible language toggle to Nav, wire up LanguageProvider

LanguageToggle is a real <button role=group> control with aria-pressed
reflecting the active language. Nav groups .nav-links and the toggle
under a new .nav-right wrapper so the toggle keeps working on the
right side of the header without changing the existing layout. The
mobile .nav-links { display: none } rule is untouched and still scoped
to .nav-links only, so the toggle stays visible under 768px.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Migrate `HeroContent`

**Files:**
- Modify: `src/components/HeroContent.jsx`
- Modify: `src/components/HeroContent.test.jsx`

**Interfaces:**
- Consumes: `useTranslation` (Task 1), the `hero.*` key tree from `es.json`/`en.json` (Task 1).
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Rewrite `src/components/HeroContent.jsx`**

```jsx
import { useTranslation } from '../i18n/useTranslation';

export function HeroContent() {
  const t = useTranslation();

  return (
    <div className="hero-content">
      <span className="hero-tag">{t.hero.tag}</span>
      <h1>{t.hero.headline.line1}<br /><em>{t.hero.headline.emphasis}</em><br />{t.hero.headline.line2}</h1>
      <div className="hero-meta">
        <span className="meta-chip">{t.hero.meta.location}</span>
        <span className="meta-chip">{t.hero.meta.workMode}</span>
        <span className="meta-chip">{t.hero.meta.availability}</span>
        <span className="meta-chip">{t.hero.meta.jobSearch}</span>
        <span className="meta-chip">{t.hero.meta.english}</span>
      </div>
      <p className="hero-sub">{t.hero.sub}</p>
      <div className="hero-cta">
        <a href="#projects" className="btn-primary">{t.hero.cta.projects}</a>
        <a href="#contact" className="btn-ghost">{t.hero.cta.contact}</a>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Rewrite `src/components/HeroContent.test.jsx`**

```jsx
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../i18n/LanguageContext';
import { HeroContent } from './HeroContent';

describe('HeroContent', () => {
  afterEach(() => localStorage.clear());

  it('renders the metadata chip row with all five facts in Spanish by default', () => {
    render(<LanguageProvider><HeroContent /></LanguageProvider>);
    expect(screen.getByText('Málaga, España')).toBeInTheDocument();
    expect(screen.getByText('Remoto / Híbrido / Presencial')).toBeInTheDocument();
    expect(screen.getByText('Disponibilidad inmediata')).toBeInTheDocument();
    expect(screen.getByText('En búsqueda de mi primer puesto en desarrollo')).toBeInTheDocument();
    expect(screen.getByText('Inglés B1 (técnico)')).toBeInTheDocument();
  });

  it('renders the metadata chip row in English when the stored language is en', () => {
    localStorage.setItem('portfolio-lang', 'en');
    render(<LanguageProvider><HeroContent /></LanguageProvider>);
    expect(screen.getByText('Málaga, Spain')).toBeInTheDocument();
    expect(screen.getByText('Remote / Hybrid / On-site')).toBeInTheDocument();
    expect(screen.getByText('Available immediately')).toBeInTheDocument();
    expect(screen.getByText('Looking for my first developer role')).toBeInTheDocument();
    expect(screen.getByText('English B1 (technical)')).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run the test to verify it passes**

Run: `npx vitest run src/components/HeroContent.test.jsx`
Expected: PASS (2 tests)

- [ ] **Step 4: Commit**

```bash
git add src/components/HeroContent.jsx src/components/HeroContent.test.jsx
git commit -m "$(cat <<'EOF'
feat: migrate HeroContent to useTranslation

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Migrate `About`

**Files:**
- Modify: `src/components/About.jsx`
- Create: `src/components/About.test.jsx`

**Interfaces:**
- Consumes: `useTranslation` (Task 1), the `about.*` key tree (Task 1).
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Write the failing tests**

Create `src/components/About.test.jsx`:

```jsx
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../i18n/LanguageContext';
import { About } from './About';

describe('About', () => {
  afterEach(() => localStorage.clear());

  it('renders the Spanish paragraphs and skill labels by default', () => {
    render(<LanguageProvider><About /></LanguageProvider>);
    expect(screen.getByText(/desarrollador de software con base en Málaga/)).toBeInTheDocument();
    expect(screen.getByText('automatización de procesos')).toBeInTheDocument();
    expect(screen.getByText('Backend & datos')).toBeInTheDocument();
  });

  it('renders the English paragraphs and skill labels when the stored language is en', () => {
    localStorage.setItem('portfolio-lang', 'en');
    render(<LanguageProvider><About /></LanguageProvider>);
    expect(screen.getByText(/a software developer based in Málaga/)).toBeInTheDocument();
    expect(screen.getByText('process automation')).toBeInTheDocument();
    expect(screen.getByText('Backend & Data')).toBeInTheDocument();
  });

  it('keeps the name hardcoded and unchanged across languages', () => {
    localStorage.setItem('portfolio-lang', 'en');
    render(<LanguageProvider><About /></LanguageProvider>);
    expect(screen.getByText('José María Merchán Martos')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/About.test.jsx`
Expected: FAIL — `About` still renders hardcoded Spanish text outside any provider concern; the English assertions fail since nothing changes with the stored language.

- [ ] **Step 3: Rewrite `src/components/About.jsx`**

```jsx
import { useTranslation } from '../i18n/useTranslation';

export function About() {
  const t = useTranslation();

  return (
    <section id="about">
      <div className="section-header">
        <span className="section-num">01</span>
        <h2>{t.about.title}</h2>
        <div className="section-line"></div>
      </div>
      <div className="about-grid reveal">
        <div className="about-photo">
          <img src="/foto.jpg" alt="José María Merchán Martos" />
        </div>
        <div className="about-text">
          <p>{t.about.paragraph1.pre}<strong>José María Merchán Martos</strong>{t.about.paragraph1.post}</p>
          <p>{t.about.paragraph2.pre}<strong>{t.about.paragraph2.strong}</strong>{t.about.paragraph2.post}</p>
          <p>{t.about.paragraph3}</p>
        </div>
        <div className="skills-block">
          <div className="skill-group">
            <label>{t.about.skills.frontendLabel}</label>
            <div className="skill-tags">
              <span className="skill-tag">HTML5</span>
              <span className="skill-tag">CSS3</span>
              <span className="skill-tag">JavaScript</span>
            </div>
          </div>
          <div className="skill-group">
            <label>{t.about.skills.backendLabel}</label>
            <div className="skill-tags">
              <span className="skill-tag">Python</span>
              <span className="skill-tag">Java</span>
              <span className="skill-tag">SQL</span>
            </div>
          </div>
          <div className="skill-group">
            <label>{t.about.skills.toolsLabel}</label>
            <div className="skill-tags">
              <span className="skill-tag">Git</span>
              <span className="skill-tag">VS Code</span>
              <span className="skill-tag">GitHub</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/About.test.jsx`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add src/components/About.jsx src/components/About.test.jsx
git commit -m "$(cat <<'EOF'
feat: migrate About to useTranslation

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Migrate `Projects`

**Files:**
- Modify: `src/components/Projects.jsx`
- Modify: `src/components/Projects.test.jsx`

**Interfaces:**
- Consumes: `useTranslation` (Task 1), the `projects.*` key tree including the four per-project `id`-keyed subtrees (Task 1).
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Write the failing test for the new English coverage**

Modify `src/components/Projects.test.jsx` — replace its full contents with:

```jsx
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { LanguageProvider } from '../i18n/LanguageContext';
import { Projects } from './Projects';

function renderProjects() {
  return render(<LanguageProvider><Projects /></LanguageProvider>);
}

describe('Projects', () => {
  afterEach(() => localStorage.clear());

  it('renders the why line for every project in Spanish by default', () => {
    renderProjects();
    expect(screen.getByText(/Mi primera pieza pensada como carta de presentación/)).toBeInTheDocument();
    expect(screen.getByText(/Quería explorar cómo la IA puede ayudar/)).toBeInTheDocument();
    expect(screen.getByText(/Mi primer encargo freelance real/)).toBeInTheDocument();
    expect(screen.getByText(/Quería demostrar disciplina de ingeniería/)).toBeInTheDocument();
  });

  it('renders the metric badge only for TPV Automation', () => {
    renderProjects();
    expect(screen.getByText('100+ tests automatizados (TDD)')).toBeInTheDocument();
    expect(screen.queryByText(/1.07 MB/)).not.toBeInTheDocument();
  });

  it('shows "Ver demo" as the primary link and GitHub as secondary when a demo exists', () => {
    renderProjects();
    const portfolioCard = screen.getByText('Portfolio personal').closest('.project-card');
    const demoLink = within(portfolioCard).getByRole('link', { name: /Ver demo/ });
    expect(demoLink).toHaveClass('project-link-primary');
    expect(demoLink).toHaveAttribute('href', 'https://josemerchan712.github.io/portfolio/');
    const githubLink = within(portfolioCard).getByRole('link', { name: /GitHub/ });
    expect(githubLink).not.toHaveClass('project-link-primary');
  });

  it('shows only the GitHub link plus a status note when there is no demo', () => {
    renderProjects();
    const owlCard = screen.getByText('OWL SM').closest('.project-card');
    expect(owlCard).toHaveTextContent('Proyecto completo — código en GitHub');
    const links = within(owlCard).getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveTextContent('GitHub');
  });

  it('translates why/description/metric/status/CTA text to English while keeping proper nouns fixed', () => {
    localStorage.setItem('portfolio-lang', 'en');
    renderProjects();
    expect(screen.getByText(/My first project built as a personal showcase/)).toBeInTheDocument();
    expect(screen.getByText('100+ automated tests (TDD)')).toBeInTheDocument();
    const owlCard = screen.getByText('OWL SM').closest('.project-card');
    expect(owlCard).toHaveTextContent('Completed project — code on GitHub');
    const portfolioCard = screen.getByText('Portfolio personal').closest('.project-card');
    expect(within(portfolioCard).getByRole('link', { name: /View demo/ })).toBeInTheDocument();
    expect(within(portfolioCard).getByRole('link', { name: /GitHub/ })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify the new English test fails**

Run: `npx vitest run src/components/Projects.test.jsx`
Expected: FAIL on the last test ("translates why/description...") — `Projects` still renders hardcoded Spanish text regardless of stored language. The earlier four tests currently pass against the untouched component but will need the provider wrapper from Step 1's `renderProjects()` helper to keep passing once `Projects.jsx` calls `useTranslation` in Step 3 — that's expected and resolves together in Step 4.

- [ ] **Step 3: Rewrite `src/components/Projects.jsx`**

Replace the `PROJECTS` array (drop `why`/`description`/`metric`, add `id`):

```jsx
const PROJECTS = [
  {
    id: 'portfolio',
    num: '01',
    title: 'Portfolio personal',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/josemerchan712/portfolio',
    demo: 'https://josemerchan712.github.io/portfolio/',
  },
  {
    id: 'owlSm',
    num: '02',
    title: 'OWL SM',
    tech: ['Java', 'Android Studio', 'Gemini API'],
    github: 'https://github.com/josemerchan712/OWL-SM',
    demo: null,
  },
  {
    id: 'cycleando',
    num: '03',
    title: 'Cycleando',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/josemerchan712/cycleando',
    demo: 'https://cycleando-nueva.netlify.app/',
  },
  {
    id: 'tpvAutomation',
    num: '04',
    title: 'TPV Automation',
    tech: ['FastAPI', 'React + TS', 'SQLAlchemy', 'pytest'],
    github: 'https://github.com/josemerchan712/tpv-automation',
    demo: null,
  },
];
```

Add the import and rewrite the `Projects()` function (keep `GithubIcon`/`ExternalIcon` exactly as they are):

```jsx
import { useTranslation } from '../i18n/useTranslation';

export function Projects() {
  const t = useTranslation();

  return (
    <section id="projects">
      <div className="section-header">
        <span className="section-num">02</span>
        <h2>{t.projects.title}</h2>
        <div className="section-line"></div>
      </div>
      <div className="projects-grid">
        {PROJECTS.map((p, i) => {
          const content = t.projects[p.id];
          return (
            <div key={p.num} className="project-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <span className="project-num">{p.num}</span>
              <h3>{p.title}</h3>
              <p className="project-why">{content.why}</p>
              {content.metric && <span className="project-metric">{content.metric}</span>}
              <p>{content.description}</p>
              <div className="project-tech">
                {p.tech.map(tech => <span key={tech} className="tech-badge">{tech}</span>)}
              </div>
              {!p.demo && <span className="project-status">{t.projects.statusComplete}</span>}
              <div className="project-links">
                {p.demo ? (
                  <>
                    <a href={p.demo} target="_blank" rel="noreferrer" className="project-link-primary">
                      <ExternalIcon /> {t.projects.viewDemo}
                    </a>
                    <a href={p.github} target="_blank" rel="noreferrer" className="project-link">
                      <GithubIcon /> GitHub
                    </a>
                  </>
                ) : (
                  <a href={p.github} target="_blank" rel="noreferrer" className="project-link">
                    <GithubIcon /> GitHub
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
```

The `import { useTranslation } from '../i18n/useTranslation';` line goes with the file's other imports, above the `PROJECTS` array. Note the map's inner loop variable is renamed from `t` to `tech` for the tech-badge list (the original code used `p.tech.map(t => ...)`, which would now shadow the outer `t` translations object — this rename is required, not optional).

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/Projects.test.jsx`
Expected: PASS (5 tests)

- [ ] **Step 5: Commit**

```bash
git add src/components/Projects.jsx src/components/Projects.test.jsx
git commit -m "$(cat <<'EOF'
feat: migrate Projects to useTranslation

Each PROJECTS entry gains an id used to look up its why/description/
metric text from the active language. Titles, tech tags, and URLs stay
hardcoded since they're proper nouns/technical terms, not translated
content.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Migrate `Contact` and `Footer`

**Files:**
- Modify: `src/components/Contact.jsx`
- Create: `src/components/Contact.test.jsx`
- Modify: `src/components/Footer.jsx`
- Create: `src/components/Footer.test.jsx`

**Interfaces:**
- Consumes: `useTranslation` (Task 1), the `contact.*` and `footer.*` key trees (Task 1).
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Write the failing tests**

Create `src/components/Contact.test.jsx`:

```jsx
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../i18n/LanguageContext';
import { Contact } from './Contact';

describe('Contact', () => {
  afterEach(() => localStorage.clear());

  it('renders the Spanish intro by default', () => {
    render(<LanguageProvider><Contact /></LanguageProvider>);
    expect(screen.getByText(/Tienes un proyecto en mente/)).toBeInTheDocument();
  });

  it('renders the English intro when the stored language is en', () => {
    localStorage.setItem('portfolio-lang', 'en');
    render(<LanguageProvider><Contact /></LanguageProvider>);
    expect(screen.getByText(/Have a project in mind/)).toBeInTheDocument();
  });

  it('keeps the email address unchanged across languages', () => {
    localStorage.setItem('portfolio-lang', 'en');
    render(<LanguageProvider><Contact /></LanguageProvider>);
    expect(screen.getByText('josemerchanmartos@gmail.com')).toBeInTheDocument();
  });
});
```

Create `src/components/Footer.test.jsx`:

```jsx
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../i18n/LanguageContext';
import { Footer } from './Footer';

describe('Footer', () => {
  afterEach(() => localStorage.clear());

  it('renders the Spanish tagline by default', () => {
    render(<LanguageProvider><Footer /></LanguageProvider>);
    expect(screen.getByText('Diseñado y desarrollado por mí')).toBeInTheDocument();
  });

  it('renders the English tagline when the stored language is en', () => {
    localStorage.setItem('portfolio-lang', 'en');
    render(<LanguageProvider><Footer /></LanguageProvider>);
    expect(screen.getByText('Designed and developed by me')).toBeInTheDocument();
  });

  it('keeps the copyright line unchanged across languages', () => {
    localStorage.setItem('portfolio-lang', 'en');
    render(<LanguageProvider><Footer /></LanguageProvider>);
    expect(screen.getByText('© 2026 José María Merchán Martos')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run both to verify they fail**

Run: `npx vitest run src/components/Contact.test.jsx src/components/Footer.test.jsx`
Expected: FAIL — both components still render hardcoded Spanish text regardless of stored language.

- [ ] **Step 3: Rewrite `src/components/Contact.jsx`**

```jsx
import { useTranslation } from '../i18n/useTranslation';

export function Contact() {
  const t = useTranslation();

  return (
    <section id="contact">
      <div className="section-header" style={{ justifyContent: 'center', textAlign: 'center', flexDirection: 'column', gap: '0.5rem' }}>
        <span className="section-num">03</span>
        <h2>{t.contact.title}</h2>
      </div>
      <div className="contact-inner reveal">
        <p className="contact-intro">{t.contact.intro}</p>
        <a href="mailto:josemerchanmartos@gmail.com" className="contact-email">
          josemerchanmartos@gmail.com
        </a>
        <div className="contact-socials">
          <a href="https://github.com/josemerchan712" target="_blank" rel="noreferrer" className="social-link">GitHub</a>
          <a href="https://www.linkedin.com/in/josé-maría-merchán-martos-256980335/" target="_blank" rel="noreferrer" className="social-link">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Rewrite `src/components/Footer.jsx`**

```jsx
import { useTranslation } from '../i18n/useTranslation';

export function Footer() {
  const t = useTranslation();

  return (
    <footer>
      <span>© 2026 José María Merchán Martos</span>
      <span>{t.footer.tagline}</span>
    </footer>
  );
}
```

- [ ] **Step 5: Run both to verify they pass**

Run: `npx vitest run src/components/Contact.test.jsx src/components/Footer.test.jsx`
Expected: PASS (6 tests total)

- [ ] **Step 6: Commit**

```bash
git add src/components/Contact.jsx src/components/Contact.test.jsx src/components/Footer.jsx src/components/Footer.test.jsx
git commit -m "$(cat <<'EOF'
feat: migrate Contact and Footer to useTranslation

Email address and copyright line stay hardcoded — they're data, not
language content.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Final verification

**Files:** none (verification only; fix-and-recommit if issues are found)

**Interfaces:**
- Consumes: the complete state from Tasks 1–6.
- Produces: nothing — end of plan.

- [ ] **Step 1: Run the full automated test suite**

Run: `npm test -- --run`
Expected: all tests pass across every `src/i18n/*.test.jsx` and `src/components/*.test.jsx` file — no leftover failures from the intermediate state noted at the end of Task 2.

- [ ] **Step 2: Run a clean production build**

Run: `npm run build`
Expected: builds successfully, no warnings about missing modules.

- [ ] **Step 3: Re-verify the CSS-scoping acceptance criterion**

Run: `grep -A10 "@media (max-width: 768px)" src/index.css`
Expected: `.nav-links { display: none; }` present, `.nav-right` absent from the output.

- [ ] **Step 4: Grep for orphaned hardcoded content**

Run: `grep -rn "En búsqueda de mi primer puesto\|Desarrollo aplicaciones web y de escritorio\|Tienes un proyecto en mente" src/components/`
Expected: zero matches — confirms none of the migrated prose is still hardcoded directly in a component (it should only exist inside `src/i18n/es.json` now).

- [ ] **Step 5: Manual browser check — both languages, both viewport widths**

If a browser automation tool is available in this environment: run `npm run dev`, open `http://localhost:5173`, and at both a desktop width (~1440px) and mobile width (375px):
- Confirm every visible section (hero, metadata chips, about, project cards, contact, footer) is in Spanish by default.
- Click the EN toggle button in the nav. Confirm every visible string across every section switches to English — nothing stays in Spanish, proper nouns (name, project titles, GitHub/LinkedIn, tech tags) stay the same.
- Reload the page. Confirm it stays in English (localStorage persistence).
- At 375px, confirm the language toggle is still visible and clickable even though `.nav-links` is hidden.
- Check the browser console for errors.

If no browser automation tool is available: say so plainly in your report, and instead do a careful static check — read the final `Nav.jsx`, confirm `.language-toggle` is not inside the `<ul className="nav-links">` (which hides on mobile) but a sibling of it inside `.nav-right`, and confirm every component file only references `t.*` keys (no leftover literal Spanish/English prose strings). Report status DONE_WITH_CONCERNS noting a human should do the live visual/toggle check, same as the precedent from the previous plan's Task 5.

- [ ] **Step 6: If any issue is found, fix and commit**

Fix directly in the relevant file(s), stage only those files by name (never `git add -A`), and commit:

```bash
git add <specific files>
git commit -m "$(cat <<'EOF'
fix: correct issue found in i18n final verification

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

If no issues are found, no commit is needed for this task.
