import { useLayoutEffect, useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const BASE_Y = 0.06;
const TOOLTIP_STYLE = {
  fontFamily: "'DM Serif Display', serif",
  fontStyle: 'italic',
  color: '#c9a84c',
  fontSize: '0.82rem',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  userSelect: 'none',
};

export function Notebook({ position = [0, 0, 0], staggerIndex = 0 }) {
  const groupRef = useRef();
  const coverRef = useRef();
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
    if (!coverRef.current) return;
    if (!prefersReducedMotion) {
      gsap.to(groupRef.current.position, { y: BASE_Y + 0.1, duration: 0.2 });
    }
    gsap.to(coverRef.current.material, { emissiveIntensity: 0.4, duration: 0.15 });
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'default';
    setHovered(false);
    if (!coverRef.current) return;
    if (!prefersReducedMotion) {
      gsap.to(groupRef.current.position, { y: BASE_Y, duration: 0.2 });
    }
    gsap.to(coverRef.current.material, { emissiveIntensity: 0, duration: 0.15 });
  };

  return (
    <group ref={groupRef} position={position}>
      <mesh
        ref={coverRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <boxGeometry args={[0.7, 0.06, 0.5]} />
        <meshStandardMaterial color="#f0edd8" emissive="#c9a84c" emissiveIntensity={0} />
      </mesh>
      {[-0.12, -0.04, 0.04, 0.12].map((z, i) => (
        <mesh key={i} position={[0, 0.035, z]}>
          <boxGeometry args={[0.55, 0.004, 0.008]} />
          <meshStandardMaterial color="#c0bdb0" />
        </mesh>
      ))}
      {hovered && (
        <Html position={[0, 0.2, 0]} center>
          <div style={TOOLTIP_STYLE}>Diseño · Proceso</div>
        </Html>
      )}
    </group>
  );
}
