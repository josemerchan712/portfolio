import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { LanguageProvider } from '../i18n/LanguageContext';
import { Projects } from './Projects';

function renderProjects() {
  return render(<LanguageProvider><Projects /></LanguageProvider>);
}

describe('Projects', () => {
  afterEach(() => localStorage.clear());

  it('renders the why line for every project in Spanish by default', () => {
    renderProjects();
    expect(screen.getByText(/Mi primera pieza pensada como carta de presentación/)).toBeInTheDocument();
    expect(screen.getByText(/Quería explorar cómo la IA puede ayudar/)).toBeInTheDocument();
    expect(screen.getByText(/Mi primer encargo freelance real/)).toBeInTheDocument();
    expect(screen.getByText(/Quería demostrar disciplina de ingeniería/)).toBeInTheDocument();
  });

  it('renders the metric badge only for TPV Automation', () => {
    renderProjects();
    expect(screen.getByText('100+ tests automatizados (TDD)')).toBeInTheDocument();
    expect(screen.queryByText(/1.07 MB/)).not.toBeInTheDocument();
  });

  it('shows "Ver demo" as the primary link and GitHub as secondary when a demo exists', () => {
    renderProjects();
    const portfolioCard = screen.getByText('Portfolio personal').closest('.project-card');
    const demoLink = within(portfolioCard).getByRole('link', { name: /Ver demo/ });
    expect(demoLink).toHaveClass('project-link-primary');
    expect(demoLink).toHaveAttribute('href', 'https://josemerchan712.github.io/portfolio/');
    const githubLink = within(portfolioCard).getByRole('link', { name: /GitHub/ });
    expect(githubLink).not.toHaveClass('project-link-primary');
  });

  it('shows only the GitHub link plus a status note when there is no demo', () => {
    renderProjects();
    const owlCard = screen.getByText('OWL SM').closest('.project-card');
    expect(owlCard).toHaveTextContent('Proyecto completo — código en GitHub');
    const links = within(owlCard).getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveTextContent('GitHub');
  });

  it('translates why/description/metric/status/CTA text to English while keeping proper nouns fixed', () => {
    localStorage.setItem('portfolio-lang', 'en');
    renderProjects();
    expect(screen.getByText(/My first project built as a personal showcase/)).toBeInTheDocument();
    expect(screen.getByText('100+ automated tests (TDD)')).toBeInTheDocument();
    const owlCard = screen.getByText('OWL SM').closest('.project-card');
    expect(owlCard).toHaveTextContent('Completed project — code on GitHub');
    const portfolioCard = screen.getByText('Portfolio personal').closest('.project-card');
    expect(within(portfolioCard).getByRole('link', { name: /View demo/ })).toBeInTheDocument();
    expect(within(portfolioCard).getByRole('link', { name: /GitHub/ })).toBeInTheDocument();
  });
});
