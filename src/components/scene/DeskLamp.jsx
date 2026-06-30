import { useLayoutEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function DeskLamp({ position = [0, 0, 0], staggerIndex = 0 }) {
  const groupRef = useRef();
  const lampLightRef = useRef();
  const tRef = useRef(0);
  const [lampOn, setLampOn] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (!groupRef.current || prefersReducedMotion) return;
    const origY = groupRef.current.position.y;
    groupRef.current.position.y = origY - 1.5;
    gsap.to(groupRef.current.position, {
      y: origY, duration: 0.5, delay: staggerIndex * 0.08, ease: 'back.out(1.4)',
    });
  }, [prefersReducedMotion, staggerIndex]);

  useFrame((_, delta) => {
    if (!groupRef.current || prefersReducedMotion) return;
    tRef.current += delta;
    groupRef.current.position.y += Math.sin(tRef.current * 0.8) * 0.0003;
  });

  const handleClick = () => {
    const nextOn = !lampOn;
    setLampOn(nextOn);
    if (lampLightRef.current) {
      gsap.to(lampLightRef.current, { intensity: nextOn ? 0.8 : 0, duration: 0.3 });
    }
  };

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, -0.78, 0]}>
        <cylinderGeometry args={[0.14, 0.16, 0.04, 16]} />
        <meshStandardMaterial color="#1e2a3a" />
      </mesh>
      <mesh position={[0, -0.38, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.8, 8]} />
        <meshStandardMaterial color="#1e2a3a" />
      </mesh>
      <mesh
        position={[0.12, 0, 0]}
        onClick={handleClick}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'default'; }}
      >
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshStandardMaterial
          color="#2a3a4a"
          emissive="#e8c97a"
          emissiveIntensity={lampOn ? 0.6 : 0.05}
        />
      </mesh>
      <pointLight
        ref={lampLightRef}
        color="#e8c97a"
        intensity={0.8}
        position={[0.12, -0.1, 0]}
        distance={3}
      />
    </group>
  );
}
