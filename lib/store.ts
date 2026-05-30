import { create } from 'zustand';

export type CameraMode = 'cockpit' | 'third-person' | 'cinematic';

interface AppState {
  currentPlanet: string | null;
  cameraMode: CameraMode;
  visitedPlanets: string[];
  objective: string;
  inCockpit: boolean;
  setCurrentPlanet: (planetId: string | null) => void;
  setCameraMode: (mode: CameraMode) => void;
  addVisitedPlanet: (planetId: string) => void;
  setObjective: (objective: string) => void;
  setInCockpit: (inCockpit: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  currentPlanet: null,
  cameraMode: 'cockpit',
  visitedPlanets: [],
  objective: 'Discover System X-07',
  inCockpit: true,
  setCurrentPlanet: (planetId) => set({ currentPlanet: planetId }),
  setCameraMode: (mode) => set({ cameraMode: mode }),
  addVisitedPlanet: (planetId) =>
    set((state) => ({
      visitedPlanets: state.visitedPlanets.includes(planetId)
        ? state.visitedPlanets
        : [...state.visitedPlanets, planetId],
    })),
  setObjective: (objective) => set({ objective }),
  setInCockpit: (inCockpit) => set({ inCockpit }),
}));
