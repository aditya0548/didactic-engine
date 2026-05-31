import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';
import { Planet } from '../../types/planet';
import { useStore } from '../../lib/store';

const PLANETS: Planet[] = [
  {
    id: 'keth-7',
    name: 'KETH-7',
    description: 'Portfolio Overview',
    theme: 'Technology',
    position: [0, 0, 0], // Replaced by orbit
    orbitRadius: 30,
    color: '#3B82F6', // Blue
    status: 'UNKNOWN',
    destination: '/planet/keth-7',
    unlocked: true,
  },
  {
    id: 'anima-9',
    name: 'ANIMA-9',
    description: 'Divine Conquerors',
    theme: 'Storytelling',
    position: [0, 0, 0],
    orbitRadius: 50,
    color: '#EF4444', // Crimson
    status: 'UNKNOWN',
    destination: '/planet/anima-9',
    unlocked: true,
  },
  {
    id: 'veltrix-1',
    name: 'VELTRIX-1',
    description: 'AI Project',
    theme: 'Logic',
    position: [0, 0, 0],
    orbitRadius: 70,
    color: '#06B6D4', // Cyan
    status: 'UNKNOWN',
    destination: '/planet/veltrix-1',
    unlocked: true,
  },
  {
    id: 'etherea-2',
    name: 'ETHEREA-2',
    description: 'Luxury Concept',
    theme: 'Elegance',
    position: [0, 0, 0],
    orbitRadius: 90,
    color: '#D8B4E2', // Purple/Rose Gold
    status: 'UNKNOWN',
    destination: '/planet/etherea-2',
    unlocked: true,
  },
  {
    id: 'fragment-0',
    name: 'FRAGMENT-0',
    description: 'Unknown Object',
    theme: 'Mystery',
    position: [0, 0, 0],
    orbitRadius: 120,
    color: '#111827', // Dark/Black
    status: 'UNKNOWN',
    destination: '/planet/fragment-0',
    unlocked: false,
  },
];

function SinglePlanet({ planet, index }: { planet: Planet; index: number }) {
  const planetRef = useRef<THREE.Group>(null);
  const { setCurrentPlanet } = useStore();

  // Different orbit speeds
  const orbitSpeed = useMemo(() => 0.1 / (index + 1), [index]);
  const initialAngle = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state, delta) => {
    if (planetRef.current) {
      const time = state.clock.getElapsedTime();
      const angle = initialAngle + time * orbitSpeed;

      const x = Math.cos(angle) * planet.orbitRadius;
      const z = Math.sin(angle) * planet.orbitRadius;

      planetRef.current.position.set(x, 0, z);

      // Rotate the planet itself
      planetRef.current.rotation.y += delta * 0.5;
    }
  });

  // Calculate orbit path points for drawing the line
  const orbitPoints = useMemo(() => {
    const points = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.cos(theta) * planet.orbitRadius,
          0,
          Math.sin(theta) * planet.orbitRadius
        )
      );
    }
    return points;
  }, [planet.orbitRadius]);

  return (
    <group>
      {/* Orbit Ring */}
      <Line
        points={orbitPoints}
        color={planet.color}
        opacity={0.15}
        transparent
        lineWidth={0.5}
      />

      {/* The Planet */}
      <group ref={planetRef}>
        {/* Core Planet */}
        <Sphere args={[2, 64, 64]} onClick={() => setCurrentPlanet(planet.id)}>
          <meshStandardMaterial
            color={planet.color}
            roughness={0.8}
            metalness={0.1}
            bumpScale={0.05}
          />
        </Sphere>

        {/* Planet Atmosphere Glow */}
        <Sphere args={[2.2, 32, 32]}>
          <meshBasicMaterial
            color={planet.color}
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </Sphere>
        <Sphere args={[2.4, 32, 32]}>
          <meshBasicMaterial
            color={planet.color}
            transparent
            opacity={0.05}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </Sphere>
      </group>
    </group>
  );
}

export function PlanetSystem() {
  return (
    <>
      {PLANETS.map((planet, index) => (
        <SinglePlanet key={planet.id} planet={planet} index={index} />
      ))}
    </>
  );
}
