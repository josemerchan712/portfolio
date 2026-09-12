const PROJECTS = [
  {
    num: '01',
    title: 'Portfolio personal',
    why: 'Mi primera pieza pensada como carta de presentación: quería demostrar los fundamentos (HTML, CSS y JavaScript sin frameworks) antes de dar el salto a stacks más complejos.',
    description: 'Mi web de presentación profesional. Diseño oscuro con animaciones CSS, scroll reveal y navegación fija. Desarrollado completamente en HTML, CSS y JavaScript puro, sin frameworks.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    metric: '1.07 MB → 147 KB de JS en producción (-86%) tras eliminar Three.js y GSAP',
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

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

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
