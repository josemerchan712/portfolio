import { useLayoutEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const TOOLTIP_STYLE = {
  fontFamily: "'DM Serif Display', serif",
  fontStyle: 'italic',
  color: '#c9a84c',
  fontSize: '0.82rem',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  userSelect: 'none',
};

export function CoffeeMug({ position = [0, 0, 0], staggerIndex = 0 }) {
  const groupRef = useRef();
  const bodyRef = useRef();
  const vaporRef = useRef();
  const tRef = useRef(0);
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

  useFrame((_, delta) => {
    if (!vaporRef.current || prefersReducedMotion) return;
    tRef.current += delta * (hovered ? 2.5 : 1);
    const t = tRef.current;
    vaporRef.current.position.y = 0.28 + Math.sin(t * 2) * 0.03;
    vaporRef.current.material.opacity = 0.25 + Math.sin(t * 1.5) * 0.12;
  });

  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer';
    setHovered(true);
    if (bodyRef.current) gsap.to(bodyRef.current.material, { emissiveIntensity: 0.5, duration: 0.15 });
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'default';
    setHovered(false);
    if (bodyRef.current) gsap.to(bodyRef.current.material, { emissiveIntensity: 0, duration: 0.15 });
  };

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={bodyRef} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
        <cylinderGeometry args={[0.12, 0.1, 0.22, 16]} />
        <meshStandardMaterial color="#e8e0d0" emissive="#c9a84c" emissiveIntensity={0} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.01, 16]} />
        <meshStandardMaterial color="#3a1a0a" />
      </mesh>
      <mesh position={[0.14, 0, 0]}>
        <torusGeometry args={[0.04, 0.015, 8, 12, Math.PI]} />
        <meshStandardMaterial color="#d0c8b8" />
      </mesh>
      <mesh ref={vaporRef} position={[0, 0.28, 0]}>
        <planeGeometry args={[0.08, 0.1]} />
        <meshStandardMaterial color="#8a95a3" transparent opacity={0.25} depthWrite={false} />
      </mesh>
      {hovered && (
        <Html position={[0, 0.38, 0]} center>
          <div style={TOOLTIP_STYLE}>Café · Málaga</div>
        </Html>
      )}
    </group>
  );
}
