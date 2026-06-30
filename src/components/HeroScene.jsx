import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { IsometricDesk } from './scene/IsometricDesk';

export default function HeroScene() {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <Suspense fallback={null}>
        <IsometricDesk />
      </Suspense>
    </Canvas>
  );
}
