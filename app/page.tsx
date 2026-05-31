'use client';

import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useRouter } from 'next/navigation';
import { Universe } from '../systems/universe/Universe';
import { PlanetSystem } from '../systems/universe/PlanetSystem';
import { FlightController } from '../systems/flight/FlightController';
import { PostProcessing } from '../systems/effects/PostProcessing';
import { HUD } from '../components/hud/HUD';
import { useStore } from '../lib/store';

export default function Home() {
  const router = useRouter();
  const { currentPlanet, setCurrentPlanet } = useStore();

  useEffect(() => {
    if (currentPlanet) {
      // Small delay for transition effect
      setTimeout(() => {
        router.push(`/planet/${currentPlanet}`);
        setCurrentPlanet(null); // Reset after navigation
      }, 500);
    }
  }, [currentPlanet, router, setCurrentPlanet]);

  return (
    <main className="relative w-screen h-screen bg-black overflow-hidden">
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 20, 150], fov: 45 }}>
          {/* Engine Systems */}
          <Universe />
          <PlanetSystem />
          <FlightController />
          <PostProcessing />
        </Canvas>
      </Suspense>

      {/* 2D Overlay */}
      <HUD />
    </main>
  );
}
