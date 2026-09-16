# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: technical recruiters and hiring managers evaluating José María Merchán Martos as a candidate for a first full-stack junior developer role. Situation: skimming a portfolio link, often on mobile, needing to understand who he is, what he can build, and how to contact him within seconds. Secondary: prospective freelance clients evaluating him for direct project work (in the mold of the Cycleando engagement).

## Product Purpose

A personal portfolio that serves as José's primary calling card in his job search. It exists to get a recruiter from "who is this" to "I should talk to this person" in under 10 seconds, and to make each project read as a case with real impact rather than a tech-stack list.

## Positioning

What a typical junior-portfolio template can't truthfully claim: real engineering discipline behind the work, not coursework. Concretely — a production TDD suite (100+ automated tests) on TPV Automation, a freelance project (Cycleando) taken end-to-end from client meeting to production deploy, and an applied-AI feature (OWL SM, Gemini API) built inside a real app rather than as an academic exercise.

## Operating Context

- Bilingual (ES/EN) via an in-app language toggle; visitors may be Spanish or English-speaking recruiters.
- Primarily viewed as a single link shared in applications/LinkedIn/email — first impression matters more than deep navigation.
- Viewed on both desktop and mobile; recruiters frequently skim on mobile first.
- Deployed as a static SPA to GitHub Pages.

## Capabilities and Constraints

- Vite 5 + React 18 SPA. All CSS lives in `src/index.css` as a single global file — no CSS modules.
- Sections: Hero (with metadata bar), About, Projects, Contact, Footer.
- Project cards pull from a fixed `PROJECTS` list (`src/components/Projects.jsx`) with real repo/demo links; two of four projects have no live demo (OWL SM, TPV Automation) and are labeled "Proyecto completo — código en GitHub" instead.
- i18n is hand-rolled (`src/i18n`), not a library — content lives in translation objects consumed via `useTranslation()`.
- Tests: Vitest + @testing-library/react.

## Brand Commitments

- Name: José María Merchán Martos. Location: Málaga, España.
- Hero metadata bar (confirmed, factual, do not invent or alter without checking with José): Málaga, España · Remoto / Híbrido / Presencial · Disponibilidad inmediata · En búsqueda de mi primer puesto en desarrollo · Inglés B1 (técnico).
- No logo; `foto.jpg` (served at `/foto.jpg`) is the only personal-identity asset.

## Evidence on Hand

- Projects (`src/components/Projects.jsx`), each with a confirmed "why" angle and, where real, a metric:
  - Portfolio personal — HTML/CSS/JS fundamentals piece; no metric unless a genuinely measured bundle-size reduction exists.
  - OWL SM — Java/Android Studio/Gemini API; no demo (native app); no metric.
  - Cycleando — first real freelance engagement, client-to-production; has a live demo.
  - TPV Automation — FastAPI/React+TS/SQLAlchemy/pytest; metric: "100+ tests automatizados (TDD)".
- No testimonials, press, or case-study write-ups exist beyond what's in the cards. Do not fabricate testimonials, customer logos, or additional metrics — only use numbers that are real and verifiable.

## Product Principles

1. A recruiter must grasp who José is and what he can do within ~10 seconds of landing — never trade hero clarity for visual spectacle (a prior 3D hero experiment was discarded specifically for violating this).
2. Every project reads as a case (why it exists + real impact) before it reads as a tech list.
3. Never invent metrics, testimonials, or claims — evidence must be real and verifiable; absence of a metric is fine, a fabricated one is not.
4. Demo links, when they exist, are the primary call to action per project; GitHub is always available but secondary.
5. The bilingual experience (ES/EN) is a first-class constraint, not an afterthought — new UI must render correctly in both languages.

## Accessibility & Inclusion

Standard: WCAG 2.1 AA. Includes minimum 4.5:1 text contrast, full keyboard navigation, visible focus states, and respecting `prefers-reduced-motion` for any motion/animation work.
