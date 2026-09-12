import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../i18n/LanguageContext';
import { Footer } from './Footer';

describe('Footer', () => {
  afterEach(() => localStorage.clear());

  it('renders the Spanish tagline by default', () => {
    render(<LanguageProvider><Footer /></LanguageProvider>);
    expect(screen.getByText('Diseñado y desarrollado por mí')).toBeInTheDocument();
  });

  it('renders the English tagline when the stored language is en', () => {
    localStorage.setItem('portfolio-lang', 'en');
    render(<LanguageProvider><Footer /></LanguageProvider>);
    expect(screen.getByText('Designed and developed by me')).toBeInTheDocument();
  });

  it('keeps the copyright line unchanged across languages', () => {
    localStorage.setItem('portfolio-lang', 'en');
    render(<LanguageProvider><Footer /></LanguageProvider>);
    expect(screen.getByText('© 2026 José María Merchán Martos')).toBeInTheDocument();
  });
});
