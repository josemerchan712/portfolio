import { useTranslation } from '../i18n/useTranslation';

const PROJECTS = [
  {
    id: 'portfolio',
    num: '01',
    title: 'Portfolio personal',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/josemerchan712/portfolio',
    demo: null,
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
