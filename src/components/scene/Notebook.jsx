import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function Notebook({ position = [0, 0, 0], staggerIndex = 0 }) {
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
        <boxGeometry args={[0.7, 0.06, 0.5]} />
        <meshStandardMaterial color="#f0edd8" emissive="#c9a84c" emissiveIntensity={0} />
      </mesh>
      {[-0.12, -0.04, 0.04, 0.12].map((z, i) => (
        <mesh key={i} position={[0, 0.035, z]}>
          <boxGeometry args={[0.55, 0.004, 0.008]} />
          <meshStandardMaterial color="#c0bdb0" />
        </mesh>
      ))}
    </group>
  );
}
