import { useLanguage } from './LanguageContext';
import es from './es.json';
import en from './en.json';

const TRANSLATIONS = { es, en };

export function useTranslation() {
  const { lang } = useLanguage();
  return TRANSLATIONS[lang];
}
