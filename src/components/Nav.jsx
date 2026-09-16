import { useState } from 'react';
import { useTranslation } from '../i18n/useTranslation';
import { LanguageToggle } from './LanguageToggle';

export function Nav() {
  const t = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <a href="#hero" className="nav-logo">José María Merchán</a>
      <div className="nav-right">
        <ul className={menuOpen ? 'nav-links nav-links-open' : 'nav-links'}>
          <li><a href="#about" onClick={() => setMenuOpen(false)}>{t.nav.links.about}</a></li>
          <li><a href="#projects" onClick={() => setMenuOpen(false)}>{t.nav.links.projects}</a></li>
          <li><a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav.links.contact}</a></li>
        </ul>
        <LanguageToggle />
        <button
          type="button"
          className={menuOpen ? 'nav-toggle nav-toggle-open' : 'nav-toggle'}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
          onClick={() => setMenuOpen(open => !open)}
        >
          <span className="nav-toggle-bar"></span>
          <span className="nav-toggle-bar"></span>
          <span className="nav-toggle-bar"></span>
        </button>
      </div>
    </nav>
  );
}
