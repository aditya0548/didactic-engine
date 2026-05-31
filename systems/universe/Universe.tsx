import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Stars, Sparkles } from '@react-three/drei';
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
      {/* Layered Background Stars for depth */}
      <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade speed={1} />
      <Stars radius={150} depth={100} count={2000} factor={6} saturation={0.5} fade speed={0.5} />
      <Stars radius={200} depth={150} count={1000} factor={8} saturation={1} fade speed={0.2} />

      {/* Nebula / Cosmic Dust */}
      <Sparkles
        count={800}
        scale={250}
        size={8}
        speed={0.1}
        opacity={0.15}
        color="#4A90E2"
        noise={10}
      />
      <Sparkles
        count={600}
        scale={250}
        size={12}
        speed={0.2}
        opacity={0.1}
        color="#8B5CF6"
        noise={15}
      />

      {/* Ambient Light */}
      <ambientLight intensity={0.05} />

      {/* SOL-ADI (The Sun) */}
      <group>
        {/* Core */}
        <Sphere ref={sunRef} args={[10, 64, 64]}>
          <meshBasicMaterial color="#FFD700" />
        </Sphere>

        {/* Sun Corona / Glow */}
        <Sphere args={[11, 32, 32]}>
          <meshBasicMaterial
            color="#FF8C00"
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </Sphere>
        <Sphere args={[13, 32, 32]}>
          <meshBasicMaterial
            color="#FF4500"
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
          />
        </Sphere>
        <Sphere args={[18, 32, 32]}>
          <meshBasicMaterial
            color="#8B0000"
            transparent
            opacity={0.05}
            blending={THREE.AdditiveBlending}
          />
        </Sphere>

        {/* Cinematic Light */}
        <pointLight position={[0, 0, 0]} intensity={8.0} distance={1500} decay={1.5} color="#FFF5E1" />
      </group>
    </>
  );
}
