import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const BOOKS = [
  { color: '#2a3a4a', h: 0.28, offset: 0 },
  { color: '#3a2a2a', h: 0.22, offset: 0.25 },
  { color: '#2a3a2a', h: 0.18, offset: 0.44 },
];

export function BookStack({ position = [0, 0, 0], staggerIndex = 0 }) {
  const groupRef = useRef();
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (!groupRef.current || prefersReducedMotion) return;
    const origY = groupRef.current.position.y;
    groupRef.current.position.y = origY - 1.5;
    gsap.to(groupRef.current.position, {
      y: origY, duration: 0.5, delay: staggerIndex * 0.08, ease: 'back.out(1.4)',
    });
  }, [prefersReducedMotion, staggerIndex]);

  return (
    <group ref={groupRef} position={position}>
      {BOOKS.map((book, i) => (
        <mesh key={i} position={[0, book.offset, 0]}>
          <boxGeometry args={[0.55, book.h, 0.38]} />
          <meshStandardMaterial color={book.color} emissive="#c9a84c" emissiveIntensity={0} />
        </mesh>
      ))}
    </group>
  );
}
