import { Suspense, lazy, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroContent } from './HeroContent';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { scrollState } from './scene/scrollState';

gsap.registerPlugin(ScrollTrigger);

const HeroScene = lazy(() => import('./HeroScene'));

export function Hero() {
  const canvasWrapRef = useRef();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const camTrigger = ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: '60% top',
      scrub: true,
      onUpdate: (self) => { scrollState.cameraProgress = self.progress; },
    });

    const fadeTrigger = ScrollTrigger.create({
      trigger: '#hero',
      start: '60% top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        if (canvasWrapRef.current) {
          canvasWrapRef.current.style.opacity = String(1 - self.progress);
        }
      },
      onLeave: () => {
        if (canvasWrapRef.current) canvasWrapRef.current.style.visibility = 'hidden';
      },
      onEnterBack: () => {
        if (canvasWrapRef.current) canvasWrapRef.current.style.visibility = 'visible';
      },
    });

    return () => { camTrigger.kill(); fadeTrigger.kill(); };
  }, [prefersReducedMotion]);

  return (
    <section id="hero">
      <HeroContent />
      <div ref={canvasWrapRef} className="hero-canvas-wrap">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>
    </section>
  );
}
