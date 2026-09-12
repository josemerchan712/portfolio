import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../i18n/LanguageContext';
import { Contact } from './Contact';

describe('Contact', () => {
  afterEach(() => localStorage.clear());

  it('renders the Spanish intro by default', () => {
    render(<LanguageProvider><Contact /></LanguageProvider>);
    expect(screen.getByText(/Tienes un proyecto en mente/)).toBeInTheDocument();
  });

  it('renders the English intro when the stored language is en', () => {
    localStorage.setItem('portfolio-lang', 'en');
    render(<LanguageProvider><Contact /></LanguageProvider>);
    expect(screen.getByText(/Have a project in mind/)).toBeInTheDocument();
  });

  it('keeps the email address unchanged across languages', () => {
    localStorage.setItem('portfolio-lang', 'en');
    render(<LanguageProvider><Contact /></LanguageProvider>);
    expect(screen.getByText('josemerchanmartos@gmail.com')).toBeInTheDocument();
  });
});
