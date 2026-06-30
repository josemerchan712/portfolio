import { useLayoutEffect, useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const BASE_Y = 0.25;
const TOOLTIP_STYLE = {
  fontFamily: "'DM Serif Display', serif",
  fontStyle: 'italic',
  color: '#c9a84c',
  fontSize: '0.82rem',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  userSelect: 'none',
};

const BOOKS = [
  { color: '#2a3a4a', h: 0.28, offset: 0 },
  { color: '#3a2a2a', h: 0.22, offset: 0.25 },
  { color: '#2a3a2a', h: 0.18, offset: 0.44 },
];

export function BookStack({ position = [0, 0, 0], staggerIndex = 0 }) {
  const groupRef = useRef();
  const topBookRef = useRef();
  const prefersReducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  useLayoutEffect(() => {
    if (!groupRef.current || prefersReducedMotion) return;
    const origY = groupRef.current.position.y;
    groupRef.current.position.y = origY - 1.5;
    gsap.to(groupRef.current.position, {
      y: origY, duration: 0.5, delay: staggerIndex * 0.08, ease: 'back.out(1.4)',
    });
  }, [prefersReducedMotion, staggerIndex]);

  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer';
    setHovered(true);
    if (!topBookRef.current) return;
    if (!prefersReducedMotion) {
      gsap.to(topBookRef.current.position, { y: BOOKS[2].offset + 0.1, duration: 0.2 });
    }
    gsap.to(topBookRef.current.material, { emissiveIntensity: 0.7, duration: 0.15 });
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'default';
    setHovered(false);
    if (!topBookRef.current) return;
    if (!prefersReducedMotion) {
      gsap.to(topBookRef.current.position, { y: BOOKS[2].offset, duration: 0.2 });
    }
    gsap.to(topBookRef.current.material, { emissiveIntensity: 0, duration: 0.15 });
  };

  return (
    <group ref={groupRef} position={position}>
      {BOOKS.map((book, i) => (
        <mesh
          key={i}
          ref={i === 2 ? topBookRef : undefined}
          position={[0, book.offset, 0]}
          onPointerOver={i === 2 ? handlePointerOver : undefined}
          onPointerOut={i === 2 ? handlePointerOut : undefined}
        >
          <boxGeometry args={[0.55, book.h, 0.38]} />
          <meshStandardMaterial color={book.color} emissive="#c9a84c" emissiveIntensity={0} />
        </mesh>
      ))}
      {hovered && (
        <Html position={[0, 0.7, 0]} center>
          <div style={TOOLTIP_STYLE}>Python · Java · FastAPI</div>
        </Html>
      )}
    </group>
  );
}
