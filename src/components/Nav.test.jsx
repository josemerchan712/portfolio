import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

  it('toggles the mobile menu open and closed', () => {
    render(<LanguageProvider><Nav /></LanguageProvider>);
    const toggle = screen.getByRole('button', { name: 'Abrir menú' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle);
    expect(screen.getByRole('button', { name: 'Cerrar menú' })).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(screen.getByRole('button', { name: 'Cerrar menú' }));
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the mobile menu after clicking a nav link', () => {
    render(<LanguageProvider><Nav /></LanguageProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Abrir menú' }));
    fireEvent.click(screen.getByText('Proyectos'));
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false');
  });
});
