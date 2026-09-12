import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../i18n/LanguageContext';
import { About } from './About';

describe('About', () => {
  afterEach(() => localStorage.clear());

  it('renders the Spanish paragraphs and skill labels by default', () => {
    render(<LanguageProvider><About /></LanguageProvider>);
    expect(screen.getByText(/desarrollador de software con base en Málaga/)).toBeInTheDocument();
    expect(screen.getByText('automatización de procesos')).toBeInTheDocument();
    expect(screen.getByText('Backend & datos')).toBeInTheDocument();
  });

  it('renders the English paragraphs and skill labels when the stored language is en', () => {
    localStorage.setItem('portfolio-lang', 'en');
    render(<LanguageProvider><About /></LanguageProvider>);
    expect(screen.getByText(/a software developer based in Málaga/)).toBeInTheDocument();
    expect(screen.getByText('process automation')).toBeInTheDocument();
    expect(screen.getByText('Backend & Data')).toBeInTheDocument();
  });

  it('keeps the name hardcoded and unchanged across languages', () => {
    localStorage.setItem('portfolio-lang', 'en');
    render(<LanguageProvider><About /></LanguageProvider>);
    expect(screen.getByText('José María Merchán Martos')).toBeInTheDocument();
  });
});
