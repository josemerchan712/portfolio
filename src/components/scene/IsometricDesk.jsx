import { useRef, useEffect } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { scrollState } from './scrollState';
import { DeskSurface } from './DeskSurface';
import { Monitor } from './Monitor';
import { PhoneStand } from './PhoneStand';
import { BookStack } from './BookStack';
import { CoffeeMug } from './CoffeeMug';
import { Notebook } from './Notebook';
import { DeskLamp } from './DeskLamp';

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
      <DeskSurface position={[0, 0, 0]}        staggerIndex={0} />
      <Monitor     position={[0.2, 0.85, 0]}   staggerIndex={1} />
      <PhoneStand  position={[1.2, 0.38, 0.5]} staggerIndex={2} />
      <BookStack   position={[-1.2, 0.25, 0]}  staggerIndex={3} />
      <CoffeeMug   position={[0.8, 0.27, -0.6]} staggerIndex={4} />
      <Notebook    position={[-0.5, 0.06, -0.6]} staggerIndex={5} />
      <DeskLamp    position={[-1.5, 0.8, -0.5]} staggerIndex={6} />
    </>
  );
}
