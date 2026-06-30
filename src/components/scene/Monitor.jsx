import { useLayoutEffect, useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const BASE_Y = 0.85;
const TOOLTIP_STYLE = {
  fontFamily: "'DM Serif Display', serif",
  fontStyle: 'italic',
  color: '#c9a84c',
  fontSize: '0.82rem',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  userSelect: 'none',
};

export function Monitor({ position = [0, 0, 0], staggerIndex = 0 }) {
  const groupRef = useRef();
  const frameRef = useRef();
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
    if (!frameRef.current) return;
    if (!prefersReducedMotion) {
      gsap.to(groupRef.current.position, { y: BASE_Y + 0.15, duration: 0.2 });
    }
    gsap.to(frameRef.current.material, { emissiveIntensity: 0.7, duration: 0.15 });
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'default';
    setHovered(false);
    if (!frameRef.current) return;
    if (!prefersReducedMotion) {
      gsap.to(groupRef.current.position, { y: BASE_Y, duration: 0.2 });
    }
    gsap.to(frameRef.current.material, { emissiveIntensity: 0, duration: 0.15 });
  };

  const handleClick = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <group ref={groupRef} position={position}>
      <mesh
        ref={frameRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <boxGeometry args={[1.4, 0.9, 0.07]} />
        <meshStandardMaterial color="#1e2a3a" emissive="#c9a84c" emissiveIntensity={0} />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[1.2, 0.72]} />
        <meshStandardMaterial color="#0a1628" emissive="#3a6a9a" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, -0.55, 0]}>
        <boxGeometry args={[0.08, 0.2, 0.08]} />
        <meshStandardMaterial color="#0d1520" />
      </mesh>
      <mesh position={[0, -0.65, 0]}>
        <boxGeometry args={[0.4, 0.04, 0.2]} />
        <meshStandardMaterial color="#0d1520" />
      </mesh>
      {hovered && (
        <Html position={[0, 0.65, 0]} center>
          <div style={TOOLTIP_STYLE}>Full-stack · TPV Automation</div>
        </Html>
      )}
    </group>
  );
}
