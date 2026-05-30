import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';

export function Universe() {
  const sunRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <>
      {/* Background Stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Ambient Light */}
      <ambientLight intensity={0.1} />

      {/* SOL-ADI (The Sun) */}
      <group>
        <Sphere ref={sunRef} args={[10, 64, 64]}>
          <meshBasicMaterial color="#FFB347" /> {/* Soft Orange/Gold */}
        </Sphere>
        <pointLight position={[0, 0, 0]} intensity={2.5} distance={1000} decay={2} color="#FFF5E1" />
      </group>
    </>
  );
}
