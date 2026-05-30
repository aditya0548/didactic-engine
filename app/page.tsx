'use client';

import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useRouter } from 'next/navigation';
import { Universe } from '../systems/universe/Universe';
import { PlanetSystem } from '../systems/universe/PlanetSystem';
import { FlightController } from '../systems/flight/FlightController';
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
      <Suspense fallback={
        <div className="flex w-full h-full items-center justify-center text-white font-mono">
          INITIALIZING SYSTEM X-07...
        </div>
      }>
        <Canvas camera={{ position: [0, 0, 150], fov: 60 }}>
          {/* Engine Systems */}
          <Universe />
          <PlanetSystem />
          <FlightController />
        </Canvas>
      </Suspense>

      {/* 2D Overlay */}
      <HUD />
    </main>
  );
}
