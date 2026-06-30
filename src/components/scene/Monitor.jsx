import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function Monitor({ position = [0, 0, 0], staggerIndex = 0 }) {
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
    </group>
  );
}
