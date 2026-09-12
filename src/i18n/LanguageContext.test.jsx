import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider, useLanguage } from './LanguageContext';

function Probe() {
  const { lang, toggleLanguage } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <button onClick={toggleLanguage}>toggle</button>
    </div>
  );
}

describe('LanguageContext', () => {
  afterEach(() => localStorage.clear());

  it('defaults to Spanish when nothing is stored', () => {
    render(<LanguageProvider><Probe /></LanguageProvider>);
    expect(screen.getByTestId('lang')).toHaveTextContent('es');
  });

  it('reads a previously stored language preference', () => {
    localStorage.setItem('portfolio-lang', 'en');
    render(<LanguageProvider><Probe /></LanguageProvider>);
    expect(screen.getByTestId('lang')).toHaveTextContent('en');
  });

  it('falls back to Spanish for an invalid stored value', () => {
    localStorage.setItem('portfolio-lang', 'fr');
    render(<LanguageProvider><Probe /></LanguageProvider>);
    expect(screen.getByTestId('lang')).toHaveTextContent('es');
  });

  it('toggles the language and persists the new value', () => {
    render(<LanguageProvider><Probe /></LanguageProvider>);
    fireEvent.click(screen.getByText('toggle'));
    expect(screen.getByTestId('lang')).toHaveTextContent('en');
    expect(localStorage.getItem('portfolio-lang')).toBe('en');

    fireEvent.click(screen.getByText('toggle'));
    expect(screen.getByTestId('lang')).toHaveTextContent('es');
    expect(localStorage.getItem('portfolio-lang')).toBe('es');
  });

  it('throws when useLanguage is used outside a LanguageProvider', () => {
    const renderWithoutProvider = () => render(<Probe />);
    expect(renderWithoutProvider).toThrow('useLanguage must be used within a LanguageProvider');
  });
});
