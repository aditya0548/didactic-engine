import { useStore } from '../../lib/store';

export function HUD() {
  const { objective, inCockpit, cameraMode } = useStore();

  if (!inCockpit && cameraMode !== 'third-person') {
    return null; // Don't show HUD in cinematic mode
  }

  return (
    <div className="absolute inset-0 pointer-events-none text-white font-mono z-50">
      {/* Top Left: Navigation */}
      <div className="absolute top-4 left-4 flex flex-col gap-1">
        <div className="text-blue-400 text-sm opacity-80">SECTOR ALPHA-01</div>
        <div className="text-xl tracking-widest">SYSTEM X-07</div>
      </div>

      {/* Top Right: Status */}
      <div className="absolute top-4 right-4 flex flex-col items-end gap-1 text-sm">
        <div className="text-blue-400 opacity-80">VESSEL STATUS</div>
        <div className="text-green-400">INTEGRITY 100%</div>
        <div className="text-green-400">CORE ONLINE</div>
      </div>

      {/* Bottom Center: Objective */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="text-blue-400 text-xs tracking-[0.2em] mb-1">CURRENT OBJECTIVE</div>
        <div className="text-lg tracking-widest text-shadow">{objective}</div>
      </div>

      {/* Bottom Left: Controls Helper */}
      <div className="absolute bottom-4 left-4 text-xs text-gray-400 opacity-50 flex flex-col gap-1">
        <div>[W/A/S/D] Thrust</div>
        <div>[SHIFT] Boost</div>
        <div>[SPACE/C] Vertical</div>
        <div>[V] Third-Person</div>
        <div>[C] Cockpit</div>
        <div>[B] Cinematic</div>
      </div>

      {/* Reticle */}
      {inCockpit && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
          <div className="w-8 h-8 border border-white/50 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
}
