import { useLanguage } from '../i18n/LanguageContext';

export function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <div className="language-toggle" role="group" aria-label="Selector de idioma / Language selector">
      <button
        type="button"
        className={lang === 'es' ? 'lang-option lang-option-active' : 'lang-option'}
        aria-pressed={lang === 'es'}
        onClick={() => lang !== 'es' && toggleLanguage()}
      >
        ES
      </button>
      <button
        type="button"
        className={lang === 'en' ? 'lang-option lang-option-active' : 'lang-option'}
        aria-pressed={lang === 'en'}
        onClick={() => lang !== 'en' && toggleLanguage()}
      >
        EN
      </button>
    </div>
  );
}
