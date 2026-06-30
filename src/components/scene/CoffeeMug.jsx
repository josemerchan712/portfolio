import { useLayoutEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function CoffeeMug({ position = [0, 0, 0], staggerIndex = 0 }) {
  const groupRef = useRef();
  const vaporRef = useRef();
  const prefersReducedMotion = useReducedMotion();
  const tRef = useRef(0);

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
    tRef.current += delta;
    const t = tRef.current;
    vaporRef.current.position.y = 0.28 + Math.sin(t * 2) * 0.03;
    vaporRef.current.material.opacity = 0.25 + Math.sin(t * 1.5) * 0.12;
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
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
    </group>
  );
}
