import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../i18n/LanguageContext';
import { Nav } from './Nav';

describe('Nav', () => {
  afterEach(() => localStorage.clear());

  it('renders the Spanish nav links by default', () => {
    render(<LanguageProvider><Nav /></LanguageProvider>);
    expect(screen.getByText('Sobre mí')).toBeInTheDocument();
    expect(screen.getByText('Proyectos')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
  });

  it('renders the English nav links when the stored language is en', () => {
    localStorage.setItem('portfolio-lang', 'en');
    render(<LanguageProvider><Nav /></LanguageProvider>);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders the language toggle inside the nav', () => {
    render(<LanguageProvider><Nav /></LanguageProvider>);
    expect(screen.getByRole('group', { name: /Language selector/ })).toBeInTheDocument();
  });
});
