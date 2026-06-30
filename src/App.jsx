import { useEffect } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    reveals.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const handler = () => {
      let current = '';
      sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.id; });
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + current ? 'var(--gold-light)' : '';
      });
    };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
