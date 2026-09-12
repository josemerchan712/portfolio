import { useTranslation } from '../i18n/useTranslation';

export function Contact() {
  const t = useTranslation();

  return (
    <section id="contact">
      <div className="section-header" style={{ justifyContent: 'center', textAlign: 'center', flexDirection: 'column', gap: '0.5rem' }}>
        <span className="section-num">03</span>
        <h2>{t.contact.title}</h2>
      </div>
      <div className="contact-inner reveal">
        <p className="contact-intro">{t.contact.intro}</p>
        <a href="mailto:josemerchanmartos@gmail.com" className="contact-email">
          josemerchanmartos@gmail.com
        </a>
        <div className="contact-socials">
          <a href="https://github.com/josemerchan712" target="_blank" rel="noreferrer" className="social-link">GitHub</a>
          <a href="https://www.linkedin.com/in/josé-maría-merchán-martos-256980335/" target="_blank" rel="noreferrer" className="social-link">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}
