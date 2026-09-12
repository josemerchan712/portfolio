import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../i18n/LanguageContext';
import { HeroContent } from './HeroContent';

describe('HeroContent', () => {
  afterEach(() => localStorage.clear());

  it('renders the metadata chip row with all five facts in Spanish by default', () => {
    render(<LanguageProvider><HeroContent /></LanguageProvider>);
    expect(screen.getByText('Málaga, España')).toBeInTheDocument();
    expect(screen.getByText('Remoto / Híbrido / Presencial')).toBeInTheDocument();
    expect(screen.getByText('Disponibilidad inmediata')).toBeInTheDocument();
    expect(screen.getByText('En búsqueda de mi primer puesto en desarrollo')).toBeInTheDocument();
    expect(screen.getByText('Inglés B1 (técnico)')).toBeInTheDocument();
  });

  it('renders the metadata chip row in English when the stored language is en', () => {
    localStorage.setItem('portfolio-lang', 'en');
    render(<LanguageProvider><HeroContent /></LanguageProvider>);
    expect(screen.getByText('Málaga, Spain')).toBeInTheDocument();
    expect(screen.getByText('Remote / Hybrid / On-site')).toBeInTheDocument();
    expect(screen.getByText('Available immediately')).toBeInTheDocument();
    expect(screen.getByText('Looking for my first developer role')).toBeInTheDocument();
    expect(screen.getByText('English B1 (technical)')).toBeInTheDocument();
  });
});
