"use client";

import React, { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

// ----------------------------------------------------------------------
// CONCENTRIC DATA RIPPLE (AUDIO/RADAR AESTHETIC)
// ----------------------------------------------------------------------

const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseVelocity;
varying vec3 vPos;

void main() {
    vec3 pos = position;
    
    // Distance from the exact center (origin)
    float centerDist = length(pos.xz);
    
    // 1. Ambient Calm Ripple (Water Drop / Pond Ripple effect)
    // A smooth rolling wave that decays smoothly towards the outer edges
    // Massively reduced mouse influence to keep it elegant and calm
    float dynamicAmplitude = 0.5 + (uMouseVelocity * 0.4); // Gentle baseline
    
    // Create an angle-based phase shift so the wave doesn't pulse in a perfect, rigid circle
    float angle = atan(pos.z, pos.x);
    float phaseOffset = sin(angle * 3.0) * 0.5; // Breaks the perfect symmetry
    
    // Primary ripple (radiating outward)
    float ripple1 = sin((-centerDist * 2.5) + (uTime * 1.2) + phaseOffset) * dynamicAmplitude;
    
    // Secondary, slightly faster/tighter ripple to create natural "interference" (like real water)
    float ripple2 = sin((-centerDist * 3.8) + (uTime * 1.8) - phaseOffset) * (dynamicAmplitude * 0.5);
    
    // The wave height diminishes exponentially the further out it goes
    float distanceDecay = exp(-centerDist * 0.12); 
    
    // Combine the waves for a more chaotic, organic liquid surface
    float combinedRipple = (ripple1 + ripple2) * distanceDecay;
    
    // 2. Slow underlying swell (gives the entire body of water a slow breath)
    float swell = cos(pos.x * 0.4 + uTime * 0.3) * 0.2 + sin(pos.z * 0.4 + uTime * 0.2) * 0.2;

    pos.y = combinedRipple + swell;
    
    vPos = pos; 
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    gl_PointSize = (1000.0 / -mvPosition.z); 
    gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = `
varying vec3 vPos;

void main() {
    // 1. Circular Soft Glow points
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = dot(cxy, cxy);
    if (r > 1.0) discard; 
    
    // Smooth anti-aliased edge
    float alpha = 1.0 - smoothstep(0.5, 1.0, r); 
    
    // 2. Gentle glow based on wave height (Liquid feel)
    // Smooth brightness transition instead of harsh contrast
    float h = (vPos.y + 1.0) / 2.0; // Normalizing the gentler wave height
    float contrastH = smoothstep(0.3, 0.7, h); 
    
    // Base color is soft dark gray, peaks are soft white
    vec3 color = mix(vec3(0.1), vec3(0.95), contrastH);
    
    // Add an extremely bright, sharp core to the highest points
    float core = 1.0 - smoothstep(0.0, 0.2, r);
    color += core * (contrastH * 1.5); // Core is brightest only on the peaks
    
    // 3. Radial fade out towards the edges (keeps it focused in the center)
    // Adjust the raw radius distance to control where the fade starts and ends
    float distFromCenter = length(vPos.xz) / 15.0; // 15.0 is roughly the targeted max radius
    float edgeFade = 1.0 - smoothstep(0.4, 0.9, distFromCenter);
    
    // Combine base dot alpha with the overall edge fade
    float finalAlpha = alpha * edgeFade;

    // Overall transparency multiplier to keep it looking like data/hologram
    gl_FragColor = vec4(color, finalAlpha * 0.85);
}
`;

const DataRipple = ({
    numRingsMultiplier = 1.0,
    baseSpacingMultiplier = 1.0
}: {
    numRingsMultiplier?: number;
    baseSpacingMultiplier?: number;
}) => {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { viewport, pointer } = useThree();

    // Adjust density based on screen size to maintain performance
    const isMobile = viewport.width < 10;

    const { positions } = useMemo(() => {
        // Number of concentric rings
        // Reduced to focus more tightly on the center, modulated by user slider
        const baseRings = isMobile ? 60 : 100;
        const numRings = Math.floor(baseRings * numRingsMultiplier);

        // Base spacing multiplier - keeps the center dense but shrinks overall size
        // Modulated by user slider
        const baseSpacing = 0.06 * baseSpacingMultiplier;

        const posArray: number[] = [];

        for (let i = 1; i <= numRings; i++) {
            // Exponential curve: rings are very close at low 'i', and spread out at high 'i'
            // lowered the power slightly so they don't spread too thin at the edges
            let radius = Math.pow(i, 1.25) * baseSpacing;

            // Organic Clustering (The user's request)
            // Use a sine wave over the index to push some rings closer together and others further apart
            // This breaks the artificial "speaker cone" look and creates natural bands of density
            const clusterFactor = Math.sin(i * 0.4) * (baseSpacing * 2.0);
            radius += clusterFactor;

            // Prevent negative radii near the center due to the cluster factor
            radius = Math.max(radius, baseSpacing * i * 0.5);

            // Circumference of the current ring
            const circumference = 2 * Math.PI * radius;

            // To maintain consistent spacing between dots visually,
            // the number of dots on a ring should be proportional to its circumference.
            // Adjust the denominator to change dot density along the ring
            // 0.3 means dots are packed twice as tight as before
            const numDotsOnRing = Math.floor(circumference / 0.3);

            for (let j = 0; j < numDotsOnRing; j++) {
                // Angle for this specific dot
                const angle = (j / numDotsOnRing) * Math.PI * 2;

                // Introduce slight spiral/offset so dots don't form perfectly straight lines radiating outwards
                const offsetAngle = angle + (i * 0.05);

                const x = Math.cos(offsetAngle) * radius;
                const z = Math.sin(offsetAngle) * radius;

                // The reference video features absolutely perfect, non-jittered rings
                posArray.push(x, 0, z);
            }
        }

        return {
            positions: new Float32Array(posArray)
        };
    }, [isMobile, numRingsMultiplier, baseSpacingMultiplier]);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseVelocity: { value: 0.0 }
    }), []);

    // Track previous mouse position to calculate velocity
    const prevMouse = useRef(new THREE.Vector2(0, 0));
    const targetVelocity = useRef(0);

    useFrame((state) => {
        if (!materialRef.current || !pointsRef.current) return;

        uniforms.uTime.value = state.clock.getElapsedTime();

        // Calculate Mouse Velocity (Agitation)
        const currentMouse = new THREE.Vector2(pointer.x, pointer.y);
        const distanceMoved = currentMouse.distanceTo(prevMouse.current);

        // Spike the target velocity when moved, cap it at a max value (e.g., 1.0)
        if (distanceMoved > 0.001) {
            targetVelocity.current = Math.min(targetVelocity.current + distanceMoved * 10, 1.0);
        }

        // Gradually decay the velocity back to 0 (calm water)
        targetVelocity.current = THREE.MathUtils.lerp(targetVelocity.current, 0, 0.05);

        // Smoothly apply velocity to the shader uniform
        uniforms.uMouseVelocity.value = THREE.MathUtils.lerp(uniforms.uMouseVelocity.value, targetVelocity.current, 0.1);

        // Save current mouse for next frame
        prevMouse.current.copy(currentMouse);

        // Map pointer to world coordinates (roughly)
        uniforms.uMouse.value.set(pointer.x * 20, pointer.y * -20);

        // Fixed static tilt as requested by user - no overall movement or parallax
        pointsRef.current.rotation.x = Math.PI / 2.5;
        pointsRef.current.rotation.y = 0;
        pointsRef.current.rotation.z = 0;
    });

    return (
        // Position centered perfectly in the screen per user request
        <group position={[0, isMobile ? -2 : 0, 0]}>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />
                </bufferGeometry>
                <shaderMaterial
                    ref={materialRef}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={uniforms}
                    transparent={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    );
};

const DebrisScene = () => {
    const [density, setDensity] = React.useState(1.0);     // Controls numRingsMultiplier
    const [spread, setSpread] = React.useState(1.0);       // Controls baseSpacingMultiplier

    return (
        <group>
            <DataRipple numRingsMultiplier={density} baseSpacingMultiplier={spread} />

            {/* HTML Overlay for Sliders */}
            <Html as="div" prepend fullscreen style={{ pointerEvents: 'none' }}>
                <div className="absolute bottom-10 left-10 p-6 bg-black/80 backdrop-blur-md border border-white/20 rounded-2xl flex flex-col gap-6 text-white pointer-events-auto shadow-2xl z-50 min-w-[300px]" style={{ zIndex: 99999 }}>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-xs font-mono text-white/60 tracking-wider">RING COUNT (DENSITY)</label>
                            <span className="text-xs font-mono">{density.toFixed(2)}x</span>
                        </div>
                        <input
                            type="range"
                            min="0.2" max="2.0" step="0.05"
                            value={density}
                            onChange={(e) => setDensity(parseFloat(e.target.value))}
                            className="w-full accent-white"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-xs font-mono text-white/60 tracking-wider">BASE SPACING (SPREAD)</label>
                            <span className="text-xs font-mono">{spread.toFixed(2)}x</span>
                        </div>
                        <input
                            type="range"
                            min="0.5" max="3.0" step="0.05"
                            value={spread}
                            onChange={(e) => setSpread(parseFloat(e.target.value))}
                            className="w-full accent-white"
                        />
                    </div>
                </div>
            </Html>
        </group>
    );
};

export default DebrisScene;
