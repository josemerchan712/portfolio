import { useLayoutEffect, useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const BASE_Y = 0.38;
const TOOLTIP_STYLE = {
  fontFamily: "'DM Serif Display', serif",
  fontStyle: 'italic',
  color: '#c9a84c',
  fontSize: '0.82rem',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  userSelect: 'none',
};

export function PhoneStand({ position = [0, 0, 0], staggerIndex = 0 }) {
  const groupRef = useRef();
  const bodyRef = useRef();
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
    if (!bodyRef.current) return;
    if (!prefersReducedMotion) {
      gsap.to(groupRef.current.position, { y: BASE_Y + 0.15, duration: 0.2 });
    }
    gsap.to(bodyRef.current.material, { emissiveIntensity: 0.7, duration: 0.15 });
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'default';
    setHovered(false);
    if (!bodyRef.current) return;
    if (!prefersReducedMotion) {
      gsap.to(groupRef.current.position, { y: BASE_Y, duration: 0.2 });
    }
    gsap.to(bodyRef.current.material, { emissiveIntensity: 0, duration: 0.15 });
  };

  const handleClick = () => {
    const cards = document.querySelectorAll('.project-card');
    cards[1]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <group ref={groupRef} position={position}>
      <mesh
        ref={bodyRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <boxGeometry args={[0.26, 0.52, 0.04]} />
        <meshStandardMaterial color="#1e2a3a" emissive="#c9a84c" emissiveIntensity={0} />
      </mesh>
      <mesh position={[0, 0, 0.025]}>
        <planeGeometry args={[0.2, 0.42]} />
        <meshStandardMaterial color="#0a1628" emissive="#5a3a6a" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, -0.32, 0.06]}>
        <boxGeometry args={[0.18, 0.04, 0.12]} />
        <meshStandardMaterial color="#0d1520" />
      </mesh>
      {hovered && (
        <Html position={[0, 0.4, 0]} center>
          <div style={TOOLTIP_STYLE}>OWL SM · TFG Android</div>
        </Html>
      )}
    </group>
  );
}
