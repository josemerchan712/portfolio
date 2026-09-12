import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from './LanguageContext';
import { useTranslation } from './useTranslation';

function Probe() {
  const t = useTranslation();
  return <h1>{t.hero.headline.line1}</h1>;
}

describe('useTranslation', () => {
  it('returns Spanish strings by default', () => {
    render(<LanguageProvider><Probe /></LanguageProvider>);
    expect(screen.getByText('Construyo')).toBeInTheDocument();
  });
});
