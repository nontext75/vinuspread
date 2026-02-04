import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

import ParticleGalaxyScene from './ParticleGalaxyScene';
import OrbitScene from './OrbitScene';

interface GeometricBackgroundProps {
    mode: 'galaxy' | 'orbit';
}

const GeometricBackground: React.FC<GeometricBackgroundProps> = ({ mode }) => {
    return (
        <div className="absolute inset-0 w-full h-full -z-10 bg-[#02040a]">
            {/* eventSource allows interaction even if Canvas is covered by other DOM elements */}
            <Canvas
                camera={{ position: [0, 0, 200], fov: 5 }} // Ultra-Telephoto (Mirrors Orthographic flatness)
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
                eventSource={typeof document !== 'undefined' ? document.body : undefined}
                style={{ width: '100%', height: '100%' }}
                resize={{ debounce: 0 }}
            >
                <Suspense fallback={null}>
                    {mode === 'galaxy' ? <ParticleGalaxyScene /> : <OrbitScene />}
                </Suspense>
            </Canvas>
        </div>
    );
};

export default GeometricBackground;
