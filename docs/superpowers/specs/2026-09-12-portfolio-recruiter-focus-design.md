# Portfolio — enfoque a reclutador: metadatos, casos de proyecto, demos

Fecha: 2026-09-12
Estado: aprobado, pendiente de plan de implementación

## Contexto

José María está usando este portfolio como su carta de presentación principal en la búsqueda de su primer puesto en desarrollo. El objetivo: que un reclutador entienda en menos de 10 segundos quién es, qué sabe hacer y cómo contactarlo, y que cada proyecto se lea como un caso con impacto, no como una lista de tecnologías.

Durante el brainstorming se descubrió que el árbol de trabajo tenía cambios sin commitear de un experimento previo (escena 3D isométrica con React Three Fiber + GSAP) que sustituía `HeroContent` por un canvas a pantalla completa sin texto — contradiciendo directamente el objetivo de "10 segundos" de este mismo trabajo. José decidió eliminar ese experimento por completo (no solo revertir la parte de layout, sino todo el árbol de componentes 3D/GSAP) y volver al último commit limpio anterior al experimento. La tarea 4 del prompt original ("reforzar el diferenciador técnico 3D") queda fuera de alcance — se retomará en una sesión futura si procede.

## Alcance de este spec

1. Limpieza: eliminar por completo el experimento 3D/GSAP, volver al layout committeado
2. Barra de metadatos en el hero (ubicación, modalidad, disponibilidad, situación, idiomas)
3. Reescribir las cards de proyecto como casos (por qué + métrica cuando exista)
4. Jerarquía de enlaces demo vs. repo, y etiqueta de estado para proyectos sin demo

Fuera de alcance: diferenciador técnico / 3D (aparcado), cualquier cambio de paleta o tipografía, testimonios o métricas inventadas.

---

## 1. Limpieza — eliminar el experimento 3D/GSAP

Último commit limpio antes del experimento: `c3182da` ("feat: assemble React app — portfolio visually matches original"). Todo lo posterior relacionado con la escena 3D (`b85b006`..`84c3c62`, más el WIP sin commitear) se descarta.

Pasos:

1. **Grep de seguridad primero**, antes de borrar nada: `grep -rn "IsometricDesk\|HeroScene\|useReducedMotion\|gsap\|@react-three" src/` (y `README.md` si existe en la raíz). Cualquier referencia encontrada fuera de los archivos ya identificados en el paso 2 debe investigarse y resolverse antes de continuar — evita que `npm run build` falle a mitad de tarea por un import huérfano no detectado.
2. Restaurar `src/components/Hero.jsx` a la versión de `c3182da` (renderiza `<HeroContent />`, sin canvas ni GSAP).
3. Descartar el hunk sin commitear de `src/index.css` (`git checkout -- src/index.css`) — la versión committeada ya tiene el layout lado a lado correcto y la regla de ocultar canvas en móvil.
4. Borrar `src/components/HeroScene.jsx`.
5. Borrar el directorio completo `src/components/scene/` (`BookStack.jsx`, `CoffeeMug.jsx`, `DeskLamp.jsx`, `DeskSurface.jsx`, `IsometricDesk.jsx`, `Monitor.jsx`, `Notebook.jsx`, `PhoneStand.jsx`, `scrollState.js`).
6. Borrar `src/hooks/useReducedMotion.js` y `src/hooks/useReducedMotion.test.js` (confirmado: no se usan fuera del árbol 3D).
7. Quitar de `package.json`: `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`, `@gsap/react`. Ejecutar `npm install` para sincronizar `node_modules` y el lockfile.
8. Borrar `DESIGN_NOTES.md` y `docs/superpowers/plans/2026-06-30-portfolio-3d-redesign.md`.
9. Reescribir `CLAUDE.md` (ver sección 3 más abajo).
10. No tocar `foto.jpg` (su borrado en el working tree es preexistente y no está relacionado con este trabajo).

**Métrica gratuita candidata para la card "Portfolio personal":** antes de borrar las dependencias 3D, capturar el tamaño de build actual (`npm run build`, tamaño de `dist/`) y compararlo con el tamaño tras la limpieza. Si la reducción es significativa y medible (ej. "-X% en el bundle" o un tiempo de carga concreto), se usa como métrica real en la card de Portfolio personal en la sección 3. Si el número no es lo bastante claro o no compensa perseguirlo, la card se queda sin badge de métrica — no es bloqueante para el resto del trabajo.

---

## 2. Barra de metadatos en el hero

Nueva fila de chips en `HeroContent.jsx`, ubicada entre el `<h1>` y el `<p className="hero-sub">`. Reutiliza el lenguaje visual de `.hero-tag` (borde dorado, versalitas, sin iconos ni emoji) pero en un tamaño más discreto, para no competir con el titular.

Contenido (texto confirmado, sin inventar nada):

- Málaga, España
- Remoto / Híbrido / Presencial
- Disponibilidad inmediata
- En búsqueda de mi primer puesto en desarrollo
- Inglés B1 (técnico)

CSS nuevo en `src/index.css`: `.hero-meta` (flex, `flex-wrap: wrap`, gap) contenedor, `.meta-chip` para cada ítem — usa solo tokens ya existentes (`--gold`, `--cream-muted`, `--border`), sin colores ni fuentes nuevas. Debe verse bien en una sola fila en desktop y envolver a varias líneas en móvil (`<768px`) sin romper el layout.

---

## 3. Cards de proyecto como casos

`PROJECTS` en `src/components/Projects.jsx` gana dos campos opcionales: `why` (string, siempre presente) y `metric` (string o `null`).

| Proyecto | `why` | `metric` |
|---|---|---|
| Portfolio personal | "Tu primera pieza pensada como carta de presentación — demostrar los fundamentos (HTML/CSS/JS sin frameworks) antes de dar el salto a stacks más complejos." | `null`, salvo que la limpieza de la sección 1 produzca un número de bundle real y significativo |
| OWL SM | "Explorar cómo la IA puede ayudar a estructurar y priorizar tareas complejas dentro de una app real, no solo como ejercicio académico." | `null` |
| Cycleando | "Tu primer encargo freelance real, de principio a fin — de la reunión con el cliente al despliegue en producción." | `null` |
| TPV Automation | "Demostrar disciplina de ingeniería más allá de 'el código funciona' — construido con TDD pensando en la fiabilidad que exige un sistema de punto de venta real." | "100+ tests automatizados (TDD)" |

Render:
- `why` se muestra como línea propia, justo debajo del `<h3>{title}</h3>` y antes de `description` — estilo diferenciado (ej. `gold-light`, ligeramente enfatizado) para que se lea como el ángulo del caso, no como más texto plano.
- `description` se mantiene tal cual está hoy (el "qué").
- `metric` se muestra como badge pequeño junto al número/título solo cuando no es `null`. Ningún placeholder ni "sin métrica" visible — si no hay dato, simplemente no se renderiza nada ahí.
- Los `tech` badges se mantienen sin cambios.

---

## 4. Enlaces demo/repo y etiqueta de estado

Lógica nueva en el render de `project-links`:

- **Con demo** (Portfolio personal, Cycleando): "Ver demo" pasa a ser el enlace visualmente primario (reutilizando `.btn-primary` / `.btn-ghost`, ya definidos para los CTA del hero, en vez del tratamiento neutro actual de `.project-link` para ambos). GitHub queda como enlace secundario.
- **Sin demo** (OWL SM, TPV Automation — ambos terminados, confirmado por José): GitHub es el único enlace. Se añade una nota de estado corta junto a los tech badges: **"Proyecto completo — código en GitHub"**. No se usa "En desarrollo" porque ninguno de los dos está realmente en desarrollo activo.

---

## 5. Verificación

- `npm test` (Vitest) tras la limpieza — confirma que no queda ningún test referenciando código eliminado.
- `npm run build` tras la limpieza — confirma que no hay imports huérfanos (más allá del grep de seguridad del paso 1).
- Comprobación visual en navegador real (servidor de dev) de: la fila de chips de metadatos (desktop y `<768px`), las cards de proyecto con `why`/`metric`/etiqueta de estado, y la jerarquía visual demo-vs-repo — en desktop y móvil.

---

## Nota para `CLAUDE.md` reescrito

Al reescribir `CLAUDE.md` en el paso 9 de la sección 1, además de quitar las secciones de arquitectura 3D/GSAP que ya no aplican, se añade una nota breve (1-2 líneas) indicando que se exploró una escena 3D isométrica con R3F + GSAP como diferenciador técnico y se descartó porque el experimento derivó en un hero sin texto/CTA, contradiciendo el objetivo de que un reclutador entienda la propuesta de valor en segundos. Esto evita reconstruir esa memoria desde cero si la idea del diferenciador técnico se retoma más adelante.
