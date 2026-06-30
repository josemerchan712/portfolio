import { useRef, useEffect } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { scrollState } from './scrollState';

export function IsometricDesk() {
  const cameraRef = useRef();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!cameraRef.current) return;

    if (prefersReducedMotion) {
      cameraRef.current.position.set(10, 10, 10);
      cameraRef.current.lookAt(0, 0, 0);
      return;
    }

    cameraRef.current.position.set(20, 2, 2);
    cameraRef.current.lookAt(0, 0, 0);

    gsap.to(cameraRef.current.position, {
      x: 10, y: 10, z: 10,
      duration: 1.2,
      ease: 'expo.out',
      onUpdate: () => cameraRef.current?.lookAt(0, 0, 0),
    });
  }, [prefersReducedMotion]);

  useFrame(() => {
    if (!cameraRef.current || prefersReducedMotion) return;
    const targetY = 10 + scrollState.cameraProgress * 2.5;
    cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.1;
    cameraRef.current.lookAt(0, 0, 0);
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault fov={28} />
      <pointLight color="#e8c97a" intensity={1.4} position={[5, 8, 3]} />
      <ambientLight color="#3a5a8a" intensity={0.3} />
    </>
  );
}
