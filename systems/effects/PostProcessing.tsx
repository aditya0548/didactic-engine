import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        intensity={1.5}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Noise
        premultiply
        blendFunction={BlendFunction.OVERLAY}
        opacity={0.05}
      />
      <Vignette
        eskil={false}
        offset={0.1}
        darkness={1.1}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
