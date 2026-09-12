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
