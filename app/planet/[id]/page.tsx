'use client';

import { useRouter } from 'next/navigation';
import { useStore } from '../../../lib/store';
import { useEffect, useState } from 'react';

// Using a basic lookup since we didn't centralize planet data for the UI
const PLANET_DATA: Record<string, { name: string, theme: string, desc: string }> = {
  'keth-7': { name: 'KETH-7', theme: 'Technology', desc: 'Portfolio Overview & Engineering' },
  'anima-9': { name: 'ANIMA-9', theme: 'Storytelling', desc: 'Divine Conquerors Universe' },
  'veltrix-1': { name: 'VELTRIX-1', theme: 'Logic', desc: 'AI Project & Architecture' },
  'etherea-2': { name: 'ETHEREA-2', theme: 'Elegance', desc: 'Luxury Concept Design' },
  'fragment-0': { name: 'FRAGMENT-0', theme: 'Mystery', desc: 'Encrypted Data...' },
};

export default function PlanetPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { addVisitedPlanet } = useStore();
  const [mounted, setMounted] = useState(false);

  const planetId = params.id;
  const planet = PLANET_DATA[planetId as keyof typeof PLANET_DATA] || { name: 'UNKNOWN', theme: 'Unknown', desc: 'Signal Lost' };

  useEffect(() => {
    addVisitedPlanet(planetId);
    setMounted(true);
  }, [planetId, addVisitedPlanet]);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col p-8 font-mono">
      <header className="flex justify-between items-center border-b border-gray-800 pb-4 mb-8">
        <div>
          <h1 className="text-4xl tracking-widest text-blue-400">{planet.name}</h1>
          <p className="text-gray-400 text-sm tracking-widest mt-1">THEME: {planet.theme.toUpperCase()}</p>
        </div>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2 border border-blue-500/50 hover:bg-blue-500/10 transition-colors tracking-widest text-sm"
        >
          RETURN TO ORBIT
        </button>
      </header>

      <section className="flex-1 max-w-4xl">
        <h2 className="text-2xl mb-4 opacity-80">{planet.desc}</h2>
        <div className="prose prose-invert mt-8">
          <p className="text-gray-400">
            [DATA STREAM CONNECTED]
            <br/><br/>
            This is the landing sequence destination for {planet.name}.
            In a full implementation, this page would contain rich interactive
            content, cinematic transitions, and specific portfolio projects
            matching the visual language defined in the PRD.
          </p>
        </div>
      </section>

      <footer className="mt-8 border-t border-gray-800 pt-4 text-xs text-gray-600 flex justify-between">
        <span>SYSTEM X-07 :: DISCOVERY LOG UPDATED</span>
        <span>COORDINATES LOGGED</span>
      </footer>
    </main>
  );
}
