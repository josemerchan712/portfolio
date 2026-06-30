import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function PhoneStand({ position = [0, 0, 0], staggerIndex = 0 }) {
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
      <mesh>
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
    </group>
  );
}
