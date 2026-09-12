import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider } from '../i18n/LanguageContext';
import { LanguageToggle } from './LanguageToggle';

describe('LanguageToggle', () => {
  afterEach(() => localStorage.clear());

  it('renders both options with the correct aria-pressed state for the default language', () => {
    render(<LanguageProvider><LanguageToggle /></LanguageProvider>);
    expect(screen.getByRole('button', { name: 'ES' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('has an accessible group label', () => {
    render(<LanguageProvider><LanguageToggle /></LanguageProvider>);
    expect(screen.getByRole('group', { name: /Language selector/ })).toBeInTheDocument();
  });

  it('switches the active state when the inactive button is clicked', () => {
    render(<LanguageProvider><LanguageToggle /></LanguageProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'EN' }));
    expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'ES' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('is a no-op when the already-active button is clicked', () => {
    render(<LanguageProvider><LanguageToggle /></LanguageProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'ES' }));
    expect(screen.getByRole('button', { name: 'ES' })).toHaveAttribute('aria-pressed', 'true');
    expect(localStorage.getItem('portfolio-lang')).toBe('es');
  });
});
