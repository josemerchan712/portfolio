export function About() {
  return (
    <section id="about">
      <div className="section-header">
        <span className="section-num">01</span>
        <h2>Sobre mí</h2>
        <div className="section-line"></div>
      </div>
      <div className="about-grid reveal">
        <div className="about-photo">
          <img src="/foto.jpg" alt="José María Merchán Martos" />
        </div>
        <div className="about-text">
          <p>Soy <strong>José María Merchán Martos</strong>, desarrollador de software con base en Málaga. Trabajo en el desarrollo de aplicaciones web, móviles y de escritorio, combinando buenas prácticas de ingeniería con un enfoque centrado en resolver problemas reales.</p>
          <p>Me interesa especialmente la <strong>automatización de procesos</strong> y la creación de herramientas que aporten valor desde el primer día. Cuido tanto la arquitectura del código como la experiencia final del usuario.</p>
          <p>Actualmente disponible para proyectos freelance y posiciones como desarrollador.</p>
        </div>
        <div className="skills-block">
          <div className="skill-group">
            <label>Frontend</label>
            <div className="skill-tags">
              <span className="skill-tag">HTML5</span>
              <span className="skill-tag">CSS3</span>
              <span className="skill-tag">JavaScript</span>
            </div>
          </div>
          <div className="skill-group">
            <label>Backend & datos</label>
            <div className="skill-tags">
              <span className="skill-tag">Python</span>
              <span className="skill-tag">Java</span>
              <span className="skill-tag">SQL</span>
            </div>
          </div>
          <div className="skill-group">
            <label>Herramientas</label>
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
