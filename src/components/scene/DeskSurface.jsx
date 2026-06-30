import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function DeskSurface({ position = [0, 0, 0], staggerIndex = 0 }) {
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
        <boxGeometry args={[4.5, 0.1, 3]} />
        <meshStandardMaterial color="#1a2332" emissive="#c9a84c" emissiveIntensity={0} />
      </mesh>
      {[[-2, -0.55, -1.3], [2, -0.55, -1.3], [-2, -0.55, 1.3], [2, -0.55, 1.3]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.08, 1, 0.08]} />
          <meshStandardMaterial color="#0d1520" />
        </mesh>
      ))}
    </group>
  );
}
