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
