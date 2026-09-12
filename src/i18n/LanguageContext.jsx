import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'portfolio-lang';
const LanguageContext = createContext(null);

function readStoredLanguage() {
  try {
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    return stored === 'es' || stored === 'en' ? stored : 'es';
  } catch {
    return 'es';
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readStoredLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore storage errors (e.g. Safari private browsing)
    }
  }, [lang]);

  const toggleLanguage = useCallback(() => {
    setLang((current) => (current === 'es' ? 'en' : 'es'));
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
