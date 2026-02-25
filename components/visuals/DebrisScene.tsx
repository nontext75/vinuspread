"use client";

import React, { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
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
    
    // 1. Ambient Calm Ripple (Always radiating from center)
    // Low amplitude when still.
    // The frequency and amplitude increase significantly based on mouse velocity.
    float dynamicAmplitude = 0.5 + (uMouseVelocity * 2.5); // Ranges from 0.5 (calm) to ~3.0 (agitated)
    float dynamicFrequency = 2.0; // Keep the rings consistent
    float dynamicSpeed = 1.0 + (uMouseVelocity * 4.0);
    
    float ripple = abs(sin(-centerDist * dynamicFrequency + uTime * dynamicSpeed)) * dynamicAmplitude;
    
    // 2. Secondary slow standing wave (gives the water a natural "breathing" body)
    float wave = cos(pos.x * 0.5 + uTime * 0.5) * 0.3;

    pos.y = ripple + wave;
    
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
    
    // 2. Monochrome brightness based on wave height
    // Peaks are brighter white, valleys drop off sharply to dark gray/black
    float h = (vPos.y + 3.0) / 6.0;
    h = clamp(h, 0.0, 1.0);
    
    // Sharpen the contrast significantly
    float contrastH = smoothstep(0.4, 0.9, h);
    
    vec3 baseColor = vec3(0.05); // Very dark gray for valleys
    vec3 peakColor = vec3(1.0);  // Pure bright white for peaks
    vec3 color = mix(baseColor, peakColor, contrastH);
    
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

const DataRipple = () => {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { viewport, pointer } = useThree();

    // Adjust density based on screen size to maintain performance
    const isMobile = viewport.width < 10;

    const { positions } = useMemo(() => {
        // Number of concentric rings
        // Reduced to focus more tightly on the center
        const numRings = isMobile ? 60 : 100;

        // Base spacing multiplier - keeps the center dense but shrinks overall size
        const baseSpacing = 0.06;

        const posArray: number[] = [];

        for (let i = 1; i <= numRings; i++) {
            // Exponential curve: rings are very close at low 'i', and spread out at high 'i'
            // lowered the power slightly so they don't spread too thin at the edges
            const radius = Math.pow(i, 1.25) * baseSpacing;

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
    }, [isMobile]);

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

        // Very slow, majestic overarching rotation
        pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;

        // Subtle tilt based on mouse position to give parallax feel
        // Restored a deeper 3D tilt so it looks like a plate resting on a table, not a flat wall
        const targetRotX = Math.PI / 3 - (pointer.y * Math.PI) / 8; // Deeper tilt
        const targetRotZ = (pointer.x * Math.PI) / 10;

        pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetRotX, 0.05);
        pointsRef.current.rotation.z = THREE.MathUtils.lerp(pointsRef.current.rotation.z, targetRotZ, 0.05);
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
    return (
        <group>
            <DataRipple />
        </group>
    );
};

export default DebrisScene;
