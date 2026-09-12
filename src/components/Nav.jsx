import { useTranslation } from '../i18n/useTranslation';
import { LanguageToggle } from './LanguageToggle';

export function Nav() {
  const t = useTranslation();

  return (
    <nav>
      <a href="#hero" className="nav-logo">José María Merchán</a>
      <div className="nav-right">
        <ul className="nav-links">
          <li><a href="#about">{t.nav.links.about}</a></li>
          <li><a href="#projects">{t.nav.links.projects}</a></li>
          <li><a href="#contact">{t.nav.links.contact}</a></li>
        </ul>
        <LanguageToggle />
      </div>
    </nav>
  );
}
