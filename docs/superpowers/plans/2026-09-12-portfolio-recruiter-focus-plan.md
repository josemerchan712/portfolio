# Portfolio Recruiter-Focus Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the abandoned 3D/GSAP hero experiment, restore the committed side-by-side hero layout, then add a hero metadata bar, rewrite project cards as cases (why + real metric), and give demo links visual priority over repo links — all so a recruiter understands José's value proposition within seconds.

**Architecture:** Plain Vite + React SPA, no 3D/animation library. All styling stays in the single global `src/index.css` file using existing CSS custom properties. Project content lives in a plain JS array (`PROJECTS`) in `Projects.jsx`, mapped to JSX. No new component libraries or state management — this is markup, CSS, and array-literal content changes plus their Vitest/Testing Library coverage.

**Tech Stack:** Vite 5, React 18, Vitest + @testing-library/react (already installed, no new deps added). One dependency change: `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`, `@gsap/react` are removed from `package.json`.

## Global Constraints

- No fabricated metrics, testimonials, or data — every number/claim in this plan is either already confirmed by José or explicitly conditional on a real measurement taken during execution (see Task 2, Step 8).
- No changes to the color palette or typography tokens (`--navy`, `--gold`, `--cream`, DM Serif Display / DM Sans). Only add new rules using existing custom properties.
- All CSS lives in `src/index.css` as a single global file — do not create CSS modules or new stylesheets.
- Do not modify `About.jsx`, `Contact.jsx`, `Nav.jsx`, `Footer.jsx`, or `App.jsx` — out of scope for this plan.
- Task 4 from the original recruiter prompt ("reforzar el diferenciador técnico" / 3D) is explicitly out of scope — parked per spec.

---

## Task 1: Remove the 3D/GSAP hero experiment

**Files:**
- Delete: `src/components/HeroScene.jsx`
- Delete: `src/components/scene/BookStack.jsx`
- Delete: `src/components/scene/CoffeeMug.jsx`
- Delete: `src/components/scene/DeskLamp.jsx`
- Delete: `src/components/scene/DeskSurface.jsx`
- Delete: `src/components/scene/IsometricDesk.jsx`
- Delete: `src/components/scene/Monitor.jsx`
- Delete: `src/components/scene/Notebook.jsx`
- Delete: `src/components/scene/PhoneStand.jsx`
- Delete: `src/components/scene/scrollState.js`
- Delete: `src/hooks/useReducedMotion.js`
- Delete: `src/hooks/useReducedMotion.test.js`
- Modify: `src/components/Hero.jsx`
- Modify: `src/index.css`
- Modify: `package.json`

**Interfaces:**
- Consumes: nothing from earlier tasks (first task).
- Produces: `Hero.jsx` renders only `<HeroContent />` inside `<section id="hero">` — this is what Task 3 (hero metadata bar) builds on. `src/index.css` has the committed side-by-side `#hero` layout restored, with the dead `.hero-canvas-wrap` rule removed. `package.json` no longer lists `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`, `@gsap/react`. A bundle-size verdict (Step 8) that Task 4 (project cards) consumes to decide the `metric` value for the "Portfolio personal" project.

- [ ] **Step 1: Safety grep before deleting anything**

Run:
```bash
grep -rn "IsometricDesk\|HeroScene\|useReducedMotion\|gsap\|@react-three" src/
```

Expected: every match is inside one of the files listed above for deletion, or inside `src/components/Hero.jsx` (its `import { HeroScene }` / `import gsap` / `import { ScrollTrigger }` lines, which Step 4 rewrites). There is no `README.md` at the project root, so no separate check is needed there. If any match turns up outside those files, stop and investigate before continuing — it means something else in the codebase depends on the code about to be deleted.

- [ ] **Step 2: Capture the pre-cleanup bundle size baseline**

Run:
```bash
npm run build
du -sh dist
find dist/assets -name "*.js" | xargs du -ch | tail -1
```

Record the total `dist/assets/*.js` size shown on the last line (e.g. `612K total`) — this is the "before" number needed in Step 8. Do this before any file is deleted, since `three`/`gsap` are still installed and imported at this point.

- [ ] **Step 3: Delete the scene directory and HeroScene**

```bash
rm -rf src/components/scene
rm src/components/HeroScene.jsx
```

- [ ] **Step 4: Delete the reduced-motion hook and its test**

```bash
rm src/hooks/useReducedMotion.js src/hooks/useReducedMotion.test.js
```

Confirmed in brainstorming: nothing outside the deleted 3D tree imports this hook.

- [ ] **Step 5: Restore `Hero.jsx` to render only `HeroContent`**

Replace the full contents of `src/components/Hero.jsx` with:

```jsx
import { HeroContent } from './HeroContent';

export function Hero() {
  return (
    <section id="hero">
      <HeroContent />
    </section>
  );
}
```

- [ ] **Step 6: Revert the hero CSS to the committed side-by-side layout, remove dead canvas-wrap rule**

Run:
```bash
git checkout -- src/index.css
```

This restores the committed `#hero` (flex, side-by-side) and the mobile block's `#hero, section { padding: 5rem 1.5rem 4rem; }` / `.hero-canvas-wrap { display: none; }` rules. Since `HeroScene`/`hero-canvas-wrap` no longer exist anywhere, remove the now-dead `.hero-canvas-wrap` rule in two places:

In the base rules, delete this block entirely:
```css
.hero-canvas-wrap {
  position: relative;
  z-index: 1;
  width: 45%;
  min-height: 480px;
  flex-shrink: 0;
}
```

In the `@media (max-width: 768px)` block, delete this line:
```css
  .hero-canvas-wrap { display: none; }
```

The mobile block should read:
```css
@media (max-width: 768px) {
  nav { padding: 1rem 1.5rem; }
  .nav-links { display: none; }
  #hero, section { padding: 5rem 1.5rem 4rem; }
  .about-grid { grid-template-columns: 1fr; gap: 2rem; }
  .about-photo { width: 160px; height: 160px; }
  footer { flex-direction: column; gap: 0.5rem; padding: 1.5rem; }
}
```

- [ ] **Step 7: Remove the 3D/animation dependencies from `package.json`**

Edit the `dependencies` block in `package.json` to:

```json
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
```

Run:
```bash
npm install
```

- [ ] **Step 8: Verify the build and tests, capture the "after" bundle size, decide the bundle metric**

Run:
```bash
npm test
```
Expected: Vitest reports no test files found (the only prior test, `useReducedMotion.test.js`, was just deleted; Tasks 3 and 4 add new tests). This is expected, not a failure.

Run:
```bash
npm run build
du -sh dist
find dist/assets -name "*.js" | xargs du -ch | tail -1
```
Expected: build succeeds with no errors about missing modules (confirms Step 1's grep caught everything).

Compare the total `dist/assets/*.js` size from this step to the Step 2 baseline:
- If the new total is **20% or more smaller** than the baseline, this is a real, attributable, non-fabricated metric. Write down the exact before/after numbers and the percentage drop (e.g. "612K → 340K, -44%") — Task 4, Step 3 uses this to set the `metric` field for the "Portfolio personal" project, formatted as: `'<before> → <after> de JS en producción (-<pct>%) tras eliminar Three.js y GSAP'` with the real measured numbers substituted in.
- If the drop is smaller than 20%, or the measurement is noisy/unclear, leave the "Portfolio personal" project's `metric` as `null` in Task 4 — do not force a weak number into the card.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
chore: remove abandoned 3D/GSAP hero experiment

Reverts to the committed side-by-side hero layout. The isometric desk
scene replaced the hero's headline/CTA with a full-viewport canvas and
no text, which conflicted with the portfolio's core goal of a recruiter
understanding the value proposition within seconds.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Rewrite CLAUDE.md, remove stale 3D design docs

**Files:**
- Modify: `CLAUDE.md`
- Delete: `DESIGN_NOTES.md`
- Delete: `docs/superpowers/plans/2026-06-30-portfolio-3d-redesign.md`

**Interfaces:**
- Consumes: nothing (documentation-only task, can run any time after Task 1).
- Produces: nothing consumed by later tasks — informational only.

- [ ] **Step 1: Replace `CLAUDE.md` with the accurate, post-cleanup version**

Replace the full contents of `CLAUDE.md` with:

```markdown
# Portfolio — CLAUDE.md

## Project summary

Personal portfolio of José María Merchán Martos (Málaga, Spain).
Vite 5 + React 18 SPA deployed to GitHub Pages.

## Stack

- **Build:** Vite 5, React 18
- **Tests:** Vitest + @testing-library/react

## Key rules

- All CSS lives in `src/index.css` as a single global file. Do not create CSS modules.
- `foto.jpg` is a static asset at `public/foto.jpg`, served at `/foto.jpg`.

## Discarded direction: 3D hero scene

A React Three Fiber + GSAP isometric desk scene was explored as a hero centerpiece (2026-06-30) and fully removed (2026-09-12): the experiment ended up replacing the hero's headline and CTA with a full-viewport canvas and no text, which conflicts with this portfolio's core goal — a recruiter should understand who José is within seconds. If a technical differentiator is revisited, design it to sit alongside the hero text, not replace it.

## Running the project

```bash
npm run dev      # dev server on localhost:5173
npm test         # Vitest unit tests
npm run build    # production build to dist/
npm run preview  # preview production build
```

## Design references

- `docs/superpowers/specs/2026-09-12-portfolio-recruiter-focus-design.md` — hero metadata bar, project case-study cards, demo/repo link hierarchy
```

- [ ] **Step 2: Delete the stale 3D design docs**

```bash
rm DESIGN_NOTES.md docs/superpowers/plans/2026-06-30-portfolio-3d-redesign.md
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
docs: rewrite CLAUDE.md for the post-3D stack, drop stale design docs

CLAUDE.md now documents the actual current architecture and keeps a
short note on why the 3D hero experiment was discarded, so the reasoning
isn't lost if a technical differentiator is revisited later.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Hero metadata bar

**Files:**
- Modify: `src/components/HeroContent.jsx`
- Modify: `src/index.css`
- Create: `src/components/HeroContent.test.jsx`

**Interfaces:**
- Consumes: `Hero.jsx` renders `<HeroContent />` with no wrapping canvas (from Task 1).
- Produces: nothing consumed by later tasks — Projects.jsx (Task 4) is independent of this component.

- [ ] **Step 1: Write the failing test**

Create `src/components/HeroContent.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroContent } from './HeroContent';

describe('HeroContent', () => {
  it('renders the metadata chip row with all five facts', () => {
    render(<HeroContent />);
    expect(screen.getByText('Málaga, España')).toBeInTheDocument();
    expect(screen.getByText('Remoto / Híbrido / Presencial')).toBeInTheDocument();
    expect(screen.getByText('Disponibilidad inmediata')).toBeInTheDocument();
    expect(screen.getByText('En búsqueda de mi primer puesto en desarrollo')).toBeInTheDocument();
    expect(screen.getByText('Inglés B1 (técnico)')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/HeroContent.test.jsx`
Expected: FAIL — none of the five texts are in the document yet.

- [ ] **Step 3: Add the metadata bar to `HeroContent.jsx`**

Replace the full contents of `src/components/HeroContent.jsx` with:

```jsx
export function HeroContent() {
  return (
    <div className="hero-content">
      <span className="hero-tag">Desarrollador de software · Málaga</span>
      <h1>Construyo<br /><em>soluciones</em><br />que funcionan.</h1>
      <div className="hero-meta">
        <span className="meta-chip">Málaga, España</span>
        <span className="meta-chip">Remoto / Híbrido / Presencial</span>
        <span className="meta-chip">Disponibilidad inmediata</span>
        <span className="meta-chip">En búsqueda de mi primer puesto en desarrollo</span>
        <span className="meta-chip">Inglés B1 (técnico)</span>
      </div>
      <p className="hero-sub">
        Desarrollo aplicaciones web y de escritorio enfocadas en automatizar procesos reales para negocios.
        Código limpio, resultados concretos.
      </p>
      <div className="hero-cta">
        <a href="#projects" className="btn-primary">Ver proyectos</a>
        <a href="#contact" className="btn-ghost">Hablemos</a>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/HeroContent.test.jsx`
Expected: PASS

- [ ] **Step 5: Add the chip row CSS**

In `src/index.css`, insert this block immediately after the `.hero-tag { ... }` rule (before the `h1 { ... }` rule):

```css
.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: -0.75rem 0 1.5rem;
  animation: fadeUp 0.6s 0.05s ease both;
}

.meta-chip {
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--cream-muted);
  border: 0.5px solid var(--border);
  padding: 0.3rem 0.75rem;
  border-radius: 2px;
}
```

- [ ] **Step 6: Run the full test suite**

Run: `npm test -- --run`
Expected: PASS (HeroContent test green, no other tests broken)

- [ ] **Step 7: Commit**

```bash
git add src/components/HeroContent.jsx src/components/HeroContent.test.jsx src/index.css
git commit -m "$(cat <<'EOF'
feat: add hero metadata bar (location, availability, languages)

Gives recruiters the scannable facts — location, work mode, availability,
job-search status, English level — right below the headline.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Project cards as cases — why, metric, demo/repo hierarchy, status label

**Files:**
- Modify: `src/components/Projects.jsx`
- Modify: `src/index.css`
- Create: `src/components/Projects.test.jsx`

**Interfaces:**
- Consumes: the bundle-size verdict from Task 1, Step 8 (either a formatted metric string or `null` for the "Portfolio personal" project's `metric` field).
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Write the failing tests**

Create `src/components/Projects.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { Projects } from './Projects';

describe('Projects', () => {
  it('renders the why line for every project', () => {
    render(<Projects />);
    expect(screen.getByText(/Mi primera pieza pensada como carta de presentación/)).toBeInTheDocument();
    expect(screen.getByText(/Quería explorar cómo la IA puede ayudar/)).toBeInTheDocument();
    expect(screen.getByText(/Mi primer encargo freelance real/)).toBeInTheDocument();
    expect(screen.getByText(/Quería demostrar disciplina de ingeniería/)).toBeInTheDocument();
  });

  it('renders the metric badge only for TPV Automation', () => {
    render(<Projects />);
    expect(screen.getByText('100+ tests automatizados (TDD)')).toBeInTheDocument();
  });

  it('shows "Ver demo" as the primary link and GitHub as secondary when a demo exists', () => {
    render(<Projects />);
    const portfolioCard = screen.getByText('Portfolio personal').closest('.project-card');
    const demoLink = within(portfolioCard).getByRole('link', { name: /Ver demo/ });
    expect(demoLink).toHaveClass('project-link-primary');
    expect(demoLink).toHaveAttribute('href', 'https://josemerchan712.github.io/portfolio/');
    const githubLink = within(portfolioCard).getByRole('link', { name: /GitHub/ });
    expect(githubLink).not.toHaveClass('project-link-primary');
  });

  it('shows only the GitHub link plus a status note when there is no demo', () => {
    render(<Projects />);
    const owlCard = screen.getByText('OWL SM').closest('.project-card');
    expect(owlCard).toHaveTextContent('Proyecto completo — código en GitHub');
    const links = within(owlCard).getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveTextContent('GitHub');
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run src/components/Projects.test.jsx`
Expected: FAIL — `why` text, metric badge, `project-link-primary` class, and status note don't exist yet.

- [ ] **Step 3: Add `why` and `metric` fields to the `PROJECTS` array**

In `src/components/Projects.jsx`, replace the `PROJECTS` array with:

```jsx
const PROJECTS = [
  {
    num: '01',
    title: 'Portfolio personal',
    why: 'Mi primera pieza pensada como carta de presentación: quería demostrar los fundamentos (HTML, CSS y JavaScript sin frameworks) antes de dar el salto a stacks más complejos.',
    description: 'Mi web de presentación profesional. Diseño oscuro con animaciones CSS, scroll reveal y navegación fija. Desarrollado completamente en HTML, CSS y JavaScript puro, sin frameworks.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    metric: null,
    github: 'https://github.com/josemerchan712/portfolio',
    demo: 'https://josemerchan712.github.io/portfolio/',
  },
  {
    num: '02',
    title: 'OWL SM',
    why: 'Quería explorar cómo la IA puede ayudar a estructurar y priorizar tareas complejas dentro de una app real, no solo como ejercicio académico.',
    description: 'App Android contra la procrastinación desarrollada como TFG. Incluye gestión de tareas, bloqueador de aplicaciones, IA que desglosa tareas grandes en subtareas, apartado social y una mascota virtual que crece al subir de nivel.',
    tech: ['Java', 'Android Studio', 'Gemini API'],
    metric: null,
    github: 'https://github.com/josemerchan712/OWL-SM',
    demo: null,
  },
  {
    num: '03',
    title: 'Cycleando',
    why: 'Mi primer encargo freelance real, de principio a fin: de la reunión con el cliente al despliegue en producción.',
    description: 'Propuesta de web para una empresa local de Málaga dedicada a la reparación de bicis y patinetes. Diseño moderno, responsive y orientado a captar clientes online.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    metric: null,
    github: 'https://github.com/josemerchan712/cycleando',
    demo: 'https://cycleando-nueva.netlify.app/',
  },
  {
    num: '04',
    title: 'TPV Automation',
    why: 'Quería demostrar disciplina de ingeniería más allá de que "el código funcione": lo construí con TDD pensando en la fiabilidad que exige un sistema de punto de venta real.',
    description: 'Sistema de punto de venta full-stack para pequeños comercios, con automatización de inventario y reportes. Backend en FastAPI con autenticación JWT, control de acceso por roles y más de 100 tests automatizados con TDD. Frontend en React + TypeScript con interfaz de venta optimizada para uso real en caja.',
    tech: ['FastAPI', 'React + TS', 'SQLAlchemy', 'pytest'],
    metric: '100+ tests automatizados (TDD)',
    github: 'https://github.com/josemerchan712/tpv-automation',
    demo: null,
  },
];
```

If Task 1, Step 8 produced a qualifying bundle-size reduction (≥20%), change the "Portfolio personal" entry's `metric: null` to the formatted string recorded there, e.g. `metric: '612K → 340K de JS en producción (-44%) tras eliminar Three.js y GSAP',`. Otherwise leave it as `null`.

- [ ] **Step 4: Update the render logic for why, metric, status, and link hierarchy**

Replace the `Projects()` function body with:

```jsx
export function Projects() {
  return (
    <section id="projects">
      <div className="section-header">
        <span className="section-num">02</span>
        <h2>Proyectos</h2>
        <div className="section-line"></div>
      </div>
      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <div key={p.num} className="project-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
            <span className="project-num">{p.num}</span>
            <h3>{p.title}</h3>
            <p className="project-why">{p.why}</p>
            {p.metric && <span className="project-metric">{p.metric}</span>}
            <p>{p.description}</p>
            <div className="project-tech">
              {p.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
            </div>
            {!p.demo && <span className="project-status">Proyecto completo — código en GitHub</span>}
            <div className="project-links">
              {p.demo ? (
                <>
                  <a href={p.demo} target="_blank" rel="noreferrer" className="project-link-primary">
                    <ExternalIcon /> Ver demo
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
        ))}
      </div>
    </section>
  );
}
```

`GithubIcon` and `ExternalIcon` stay exactly as already defined earlier in the file — do not change them.

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npx vitest run src/components/Projects.test.jsx`
Expected: PASS

- [ ] **Step 6: Add the new CSS rules**

In `src/index.css`, insert these rules right after `.project-card p { ... }` (before `.project-tech { ... }`):

```css
.project-why {
  font-size: 0.88rem;
  color: var(--gold-light);
  font-style: italic;
  font-weight: 400;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.project-metric {
  display: inline-block;
  font-size: 0.78rem;
  letter-spacing: 0.03em;
  color: var(--gold-light);
  background: rgba(201,168,76,0.12);
  border: 0.5px solid var(--gold);
  padding: 0.3rem 0.7rem;
  border-radius: 2px;
  margin-bottom: 1rem;
  font-weight: 500;
}
```

Insert these rules right after `.project-links { ... }` and its child rules (after the existing `.project-link svg { ... }` block, before `#contact { ... }`):

```css
.project-status {
  display: block;
  font-size: 0.78rem;
  color: var(--text-muted);
  font-style: italic;
  margin-bottom: 0.75rem;
}

.project-link-primary {
  background: var(--gold);
  color: var(--navy);
  padding: 0.45rem 1rem;
  border-radius: 3px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: background 0.2s, transform 0.15s;
}
.project-link-primary:hover { background: var(--gold-light); transform: translateY(-2px); }
.project-link-primary svg {
  width: 14px; height: 14px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
```

- [ ] **Step 7: Run the full test suite**

Run: `npm test -- --run`
Expected: PASS (all Projects and HeroContent tests green)

- [ ] **Step 8: Commit**

```bash
git add src/components/Projects.jsx src/components/Projects.test.jsx src/index.css
git commit -m "$(cat <<'EOF'
feat: rewrite project cards as cases, prioritize demo over repo links

Each card now leads with why the project exists and a real metric when
one exists (TPV Automation's 100+ TDD tests). Cards with a live demo
show "Ver demo" as the primary action; finished projects without a
public demo show a "Proyecto completo" status note instead of a dead
second link.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Final verification

**Files:** none (verification only; fix-and-recommit if issues are found)

**Interfaces:**
- Consumes: the complete state from Tasks 1–4.
- Produces: nothing — end of plan.

- [ ] **Step 1: Run the full automated test suite**

Run: `npm test -- --run`
Expected: All tests pass (HeroContent, Projects — no leftover references to deleted 3D/hook tests).

- [ ] **Step 2: Run a clean production build**

Run: `npm run build`
Expected: Builds successfully with no warnings about missing modules or unused dependencies flagged by Vite.

- [ ] **Step 3: Manual browser check — desktop width**

Run: `npm run dev`, open `http://localhost:5173` in a browser at a desktop width (e.g. 1440px).

Verify:
- Hero shows headline, the five metadata chips in one or two rows directly below it, the sub-paragraph, and both CTA buttons — nothing overlapping.
- Each of the four project cards shows: number, title, the italicized `why` line, a metric badge only on TPV Automation, the existing description, tech badges, and either "Ver demo" (filled gold button) + GitHub (text link) for Portfolio/Cycleando, or GitHub-only + the "Proyecto completo — código en GitHub" note for OWL SM/TPV Automation.
- No console errors in the browser dev tools.

- [ ] **Step 4: Manual browser check — mobile width**

Resize the browser (or use device emulation) to `375px` width.

Verify:
- The metadata chip row wraps cleanly onto multiple lines without overflowing the viewport or overlapping the headline/sub-paragraph.
- Project cards stack in a single column, `why`/`metric`/status text remain readable, and the demo/GitHub link row doesn't overflow.

- [ ] **Step 5: If any issue is found, fix and commit**

If Steps 3–4 surface a layout bug, fix it directly in `src/index.css` (only — do not reintroduce any 3D/GSAP code) and commit:

```bash
git add src/index.css
git commit -m "$(cat <<'EOF'
fix: correct hero/project card layout issue found in manual QA

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

If no issues are found, no commit is needed for this task.
