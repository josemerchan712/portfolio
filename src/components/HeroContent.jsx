import { useTranslation } from '../i18n/useTranslation';

export function HeroContent() {
  const t = useTranslation();

  return (
    <div className="hero-content">
      <span className="hero-tag">{t.hero.tag}</span>
      <h1>{t.hero.headline.line1}<br /><em>{t.hero.headline.emphasis}</em><br />{t.hero.headline.line2}</h1>
      <div className="hero-meta">
        <span className="meta-chip">{t.hero.meta.location}</span>
        <span className="meta-chip">{t.hero.meta.workMode}</span>
        <span className="meta-chip">{t.hero.meta.availability}</span>
        <span className="meta-chip">{t.hero.meta.jobSearch}</span>
        <span className="meta-chip">{t.hero.meta.english}</span>
      </div>
      <p className="hero-sub">{t.hero.sub}</p>
      <div className="hero-cta">
        <a href="#projects" className="btn-primary">{t.hero.cta.projects}</a>
        <a href="#contact" className="btn-ghost">{t.hero.cta.contact}</a>
      </div>
    </div>
  );
}
