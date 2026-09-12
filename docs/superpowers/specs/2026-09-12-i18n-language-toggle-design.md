# Portfolio — toggle de idioma ES/EN

Fecha: 2026-09-12
Estado: aprobado, pendiente de plan de implementación

## Contexto

El portfolio es actualmente 100% español. José quiere un toggle ES/EN que traduzca todo el contenido visible sin cambiar de ruta (sigue siendo `/`, solo cambia el idioma del contenido). Stack actual (confirmado en `CLAUDE.md`): Vite + React 18, sin router, CSS global único en `src/index.css`. Sin librerías de i18n ni de routing — Context + JSON propios son suficientes para el tamaño de este proyecto.

## Alcance

1. `src/i18n/es.json` y `src/i18n/en.json` con las mismas claves anidadas
2. `LanguageContext` (estado + persistencia en `localStorage['portfolio-lang']`, default `'es'`)
3. Hook `useTranslation()` que devuelve el objeto de textos del idioma activo
4. Componente `LanguageToggle` accesible, en el nav, con el estilo visual ya definido
5. Todos los componentes con texto visible (`Nav`, `HeroContent`, `About`, `Projects`, `Contact`, `Footer`) migrados a `useTranslation()`

Fuera de alcance: cualquier librería de i18n/routing, más de 2 idiomas, cambio de diseño visual, traducción de nombres propios o términos técnicos.

---

## 1. Qué contenido va a i18n y qué se queda como dato plano

Confirmado con José: solo el texto lingüístico real pasa por i18n. Lo que sigue **hardcodeado en los componentes**, sin pasar por JSON:

- Nombres propios: "José María Merchán(Martos)", títulos de proyecto (`title`), "GitHub", "LinkedIn"
- URLs: `github`, `demo`, `mailto:`
- Términos/stacks técnicos: arrays `tech` de cada proyecto, skill tags de About (HTML5, CSS3, JavaScript, Python, Java, SQL, Git, VS Code, GitHub)
- El copyright del footer ("© 2026 José María Merchán Martos") — es dato (nombre + año), no idioma
- Las etiquetas del propio toggle ("ES" / "EN") — son identificadores de idioma, no traducciones entre sí

Todo lo demás (labels de nav, hero, secciones, párrafos de About, `why`/`description`/`metric` de cada proyecto, texto de Contact, tagline del footer) pasa a `es.json`/`en.json`.

### Mapeo de proyectos

Cada entrada de `PROJECTS` en `src/components/Projects.jsx` gana un campo `id` (string, camelCase) usado como clave de lookup en i18n. El resto de campos (`num`, `title`, `tech`, `github`, `demo`) se quedan en el array tal cual están hoy — solo `why`, `description` y `metric` (cuando no es `null`) se leen de i18n.

| `title` (sin traducir) | `id` nuevo |
|---|---|
| Portfolio personal | `portfolio` |
| OWL SM | `owlSm` |
| Cycleando | `cycleando` |
| TPV Automation | `tpvAutomation` |

---

## 2. Estructura de claves i18n (idéntica en `es.json` y `en.json`)

```
nav.links.about
nav.links.projects
nav.links.contact

hero.tag
hero.headline.line1
hero.headline.emphasis
hero.headline.line2
hero.meta.location
hero.meta.workMode
hero.meta.availability
hero.meta.jobSearch
hero.meta.english
hero.sub
hero.cta.projects
hero.cta.contact

about.title
about.paragraph1.pre
about.paragraph1.post
about.paragraph2.pre
about.paragraph2.strong
about.paragraph2.post
about.paragraph3
about.skills.frontendLabel
about.skills.backendLabel
about.skills.toolsLabel

projects.title
projects.statusComplete
projects.viewDemo
projects.portfolio.why
projects.portfolio.description
projects.owlSm.why
projects.owlSm.description
projects.cycleando.why
projects.cycleando.description
projects.tpvAutomation.why
projects.tpvAutomation.description
projects.tpvAutomation.metric

contact.title
contact.intro

footer.tagline
```

`es.json` se construye moviendo el texto español actual tal cual está en los componentes — sin reescribir nada. `en.json` es una traducción nueva (inglés natural, nivel técnico B1-B2, no literal) que José revisa antes de darse por terminada (ver Verificación).

### Texto con marcado inline (`<strong>`/`<em>`)

Las frases que hoy tienen HTML embebido se parten en `pre`/`emphasis`(o `strong`)/`post` para que la etiqutea se quede en el componente y solo el texto viaje por JSON:

- Hero: `{t.hero.headline.line1}<br /><em>{t.hero.headline.emphasis}</em><br />{t.hero.headline.line2}`
- About párrafo 1: `{t.about.paragraph1.pre}<strong>José María Merchán Martos</strong>{t.about.paragraph1.post}` (el nombre se queda hardcodeado, no es contenido traducible)
- About párrafo 2: `{t.about.paragraph2.pre}<strong>{t.about.paragraph2.strong}</strong>{t.about.paragraph2.post}`

---

## 3. Arquitectura

### `src/i18n/LanguageContext.jsx`

- `LanguageProvider`: componente que envuelve la app entera (se añade en `App.jsx`). Estado `lang` (`'es' | 'en'`), inicializado leyendo `localStorage.getItem('portfolio-lang')`, con `'es'` como default si no hay nada guardado o el valor no es `'es'`/`'en'`.
- `toggleLanguage()`: invierte `lang` (`es ↔ en`) y persiste el nuevo valor en `localStorage['portfolio-lang']`.
- Hook `useLanguage()`: `useContext` que devuelve `{ lang, toggleLanguage }`. Lanza error si se usa fuera del `LanguageProvider` (mismo patrón defensivo que cualquier context hook estándar de React).

### `src/i18n/useTranslation.js`

Hook que llama a `useLanguage()` internamente y devuelve `es.json` o `en.json` (importados estáticamente) según `lang`. Uso: `const t = useTranslation(); t.hero.headline.line1`.

### `src/components/LanguageToggle.jsx`

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

El guard `lang !== 'x' && toggleLanguage()` es intencional: el contexto solo expone un flip binario (`toggleLanguage()`, no `setLanguage(lang)`), así que el guard es lo que evita que clicar el botón ya activo invierta el idioma. Esto es correcto y suficiente para 2 idiomas; no escala a un tercer idioma, pero eso está fuera de alcance.

### `App.jsx`

Se envuelve el árbol existente en `<LanguageProvider>`:

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
```

---

## 4. Toggle en el Nav — layout y criterio de aceptación verificable

`Nav.jsx` pasa de dos hijos directos (`.nav-logo`, `<ul className="nav-links">`) a agrupar `.nav-links` y `.language-toggle` bajo un nuevo wrapper `.nav-right` (flex, gap), manteniendo `.nav-logo` a la izquierda y el grupo a la derecha — mismo layout visual que hoy, `nav` sigue con `justify-content: space-between` entre `.nav-logo` y `.nav-right`.

**Criterio de aceptación explícito (verificable en code review, no solo intención):** la regla `@media (max-width: 768px) { .nav-links { display: none; } }` debe seguir apuntando específicamente a `.nav-links`. `.nav-right` (el wrapper nuevo) **no debe aparecer nunca** dentro de esa media query ni recibir `display: none` en ningún breakpoint — el toggle de idioma tiene que seguir visible en móvil. Un reviewer debe poder grepear `.nav-right` dentro del bloque `@media (max-width: 768px)` en `src/index.css` y encontrar cero apariciones.

### Estilo visual

Reutiliza el lenguaje visual de `.hero-tag` (borde dorado, versalitas) como control segmentado de dos opciones:

- `.language-toggle`: contenedor con `border: 0.5px solid var(--border)`, `border-radius: 3px`, `display: flex`, overflow hidden para que los dos botones internos compartan el borde.
- `.lang-option`: botón individual, `background: transparent`, `color: var(--cream-muted)`, `padding: 0.35rem 0.7rem`, `font-size: 0.75rem`, `letter-spacing: 0.08em`, `text-transform: uppercase`, sin borde propio, `cursor: pointer`, `transition: background 0.2s, color 0.2s`.
- `.lang-option-active`: `background: var(--gold)`, `color: var(--navy)`.
- `.lang-option:not(.lang-option-active):hover`: `color: var(--gold-light)`.

Sin colores ni fuentes nuevas — todo reutiliza `--gold`, `--navy`, `--cream-muted`, `--gold-light`, `--border` ya existentes.

---

## 5. Accesibilidad del toggle

- Elementos `<button type="button">` reales (no `<span>`/`<a>`) — son controles interactivos.
- `role="group"` + `aria-label="Selector de idioma / Language selector"` (bilingüe, ya que describe el propio selector de idioma) en el contenedor.
- `aria-pressed={lang === 'es' | 'en'}` en cada botón, reflejando el estado activo para lectores de pantalla.
- Nada más — YAGNI; esto es lo que hace falta para un control de 2 opciones, no más.

---

## 6. Verificación

- `npm run build` tras los cambios — debe compilar sin errores.
- **Antes de dar el trabajo por terminado**, mostrar el `en.json` completo a José para que revise el tono de la traducción (inglés natural B1-B2 técnico, no literal) antes de mandarlo a producción. Si pide cambios, se ajustan antes de continuar.
- Comprobación manual (o automatizada si hay herramienta de navegador disponible en el entorno de ejecución; si no, verificación estática + aviso explícito, igual que en la sesión anterior): cambiar el toggle y confirmar que **todo** el texto visible cambia de idioma (nada se queda a medias en el idioma anterior), que `aria-pressed` cambia de botón al hacer click, y que recargar la página mantiene el idioma elegido (persistencia real en `localStorage`, no solo en memoria).
- Verificar que ninguna clave de contenido quedó huérfana: cada texto que antes estaba hardcodeado en los 6 componentes tiene su equivalente en ambos JSON (contraste contra la lista de claves de la sección 2).
- Grep de `.nav-right` dentro del bloque `@media (max-width: 768px)` de `src/index.css` — debe devolver cero resultados (criterio de la sección 4).
