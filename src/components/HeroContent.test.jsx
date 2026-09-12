import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroContent } from './HeroContent';

describe('HeroContent', () => {
  it('renders the metadata chip row with all five facts', () => {
    render(<HeroContent />);
    expect(screen.getByText('Málaga, España')).toBeInTheDocument();
    expect(screen.getByText('Remoto / Híbrido / Presencial')).toBeInTheDocument();
    expect(screen.getByText('Disponibilidad inmediata')).toBeInTheDocument();
    expect(screen.getByText('En búsqueda de mi primer puesto en desarrollo')).toBeInTheDocument();
    expect(screen.getByText('Inglés B1 (técnico)')).toBeInTheDocument();
  });
});
