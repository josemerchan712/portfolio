# Portfolio — CLAUDE.md

## Project summary

Personal portfolio of José María Merchán Martos (Málaga, Spain).
Vite 5 + React 18 SPA deployed to GitHub Pages.

## Stack

- **Build:** Vite 5, React 18
- **3D:** React Three Fiber 8, Drei 9, Three.js 0.165
- **Animation:** GSAP 3.12 + ScrollTrigger, @gsap/react 2
- **Tests:** Vitest + @testing-library/react

## Key rules

- `prefers-reduced-motion` must be checked before any animation. Use `useReducedMotion()` from `src/hooks/useReducedMotion.js`.
- No GLTF or external 3D assets — geometry is primitive Three.js only.
- All CSS lives in `src/index.css` as a single global file. Do not create CSS modules.
- `foto.jpg` is a static asset at `public/foto.jpg`, served at `/foto.jpg`.
- The 3D scene (`src/components/scene/`) is lazy-loaded. Do not import scene components outside of `HeroScene.jsx` eager-loaded paths.

## Scroll architecture

`Hero.jsx` owns all ScrollTrigger instances. Camera progress and canvas fade progress are communicated to the Three.js scene via the mutable `scrollState` object in `src/components/scene/scrollState.js` — not via React state, to avoid re-renders.

## Running the project

```bash
npm run dev      # dev server on localhost:5173
npm test         # Vitest unit tests
npm run build    # production build to dist/
npm run preview  # preview production build
```

## Design references

- `DESIGN_NOTES.md` — full design decisions (palette, typography, scene concept, interaction spec)
- `docs/superpowers/plans/2026-06-30-portfolio-3d-redesign.md` — implementation plan
