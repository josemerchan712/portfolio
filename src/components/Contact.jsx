export function Contact() {
  return (
    <section id="contact">
      <div className="section-header" style={{ justifyContent: 'center', textAlign: 'center', flexDirection: 'column', gap: '0.5rem' }}>
        <span className="section-num">03</span>
        <h2>Contacto</h2>
      </div>
      <div className="contact-inner reveal">
        <p className="contact-intro">
          ¿Tienes un proyecto en mente o buscas un desarrollador para tu equipo?
          Estoy disponible para hablar sobre oportunidades freelance o empleo.
        </p>
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
