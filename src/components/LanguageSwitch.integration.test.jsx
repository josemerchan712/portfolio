import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider } from '../i18n/LanguageContext';
import { Nav } from './Nav';
import { HeroContent } from './HeroContent';

describe('Language switch integration', () => {
  afterEach(() => localStorage.clear());

  it('re-renders both Nav and HeroContent in English after clicking the toggle', () => {
    render(
      <LanguageProvider>
        <Nav />
        <HeroContent />
      </LanguageProvider>
    );

    expect(screen.getByText('Sobre mí')).toBeInTheDocument();
    expect(screen.getByText('Málaga, España')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'EN' }));

    expect(screen.queryByText('Sobre mí')).not.toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Málaga, Spain')).toBeInTheDocument();
  });

  it('syncs document.documentElement.lang with the active language', () => {
    render(
      <LanguageProvider>
        <Nav />
        <HeroContent />
      </LanguageProvider>
    );
    expect(document.documentElement.lang).toBe('es');

    fireEvent.click(screen.getByRole('button', { name: 'EN' }));
    expect(document.documentElement.lang).toBe('en');
  });
});
