import { createContext, useContext, useState, useCallback } from 'react';

const STORAGE_KEY = 'portfolio-lang';
const LanguageContext = createContext(null);

function readStoredLanguage() {
  const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
  return stored === 'es' || stored === 'en' ? stored : 'es';
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readStoredLanguage);

  const toggleLanguage = useCallback(() => {
    setLang((current) => {
      const next = current === 'es' ? 'en' : 'es';
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
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
