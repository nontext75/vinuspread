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
varying vec3 vPos;

void main() {
    vec3 pos = position;
    
    // Distance from the exact center (origin)
    float dist = length(pos.xz);
    
    // 1. Primary Ripple 
    float ripple = sin(-dist * 1.5 + uTime * 2.5) * 2.5;
    
    // 2. Secondary slow standing wave
    float wave = sin(pos.x * 0.4 + uTime * 1.5) * 0.8 + cos(pos.z * 0.3 + uTime * 1.0) * 0.8;

    // 3. Mouse Interaction (Direct repel effect based on distance)
    float mouseDist = length(pos.xz - uMouse);
    float repel = smoothstep(12.0, 0.0, mouseDist) * 3.5; // Pushes points UP when mouse is near

    pos.y = ripple + wave + repel;
    
    vPos = pos; 
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    gl_PointSize = (1500.0 / -mvPosition.z); 
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
    // Peaks are brighter white, valleys are darker gray
    float h = (vPos.y + 4.0) / 8.0;
    h = clamp(h, 0.0, 1.0);
    
    // Base color is a dim gray, highlighting up to pure white at the peaks
    vec3 baseColor = vec3(0.3); // Dim gray
    vec3 peakColor = vec3(1.0); // Pure white
    
    vec3 color = mix(baseColor, peakColor, h);
    
    // Add a very tight, bright core to the center of each dot
    float core = 1.0 - smoothstep(0.0, 0.2, r);
    color += core * 0.5;
    
    // Overall transparency multiplier to keep it looking like data/hologram
    gl_FragColor = vec4(color, alpha * 0.8);
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
        const numRings = isMobile ? 30 : 60;
        // Spacing between each ring
        const ringSpacing = 1.2;

        const posArray: number[] = [];

        for (let i = 1; i <= numRings; i++) {
            const radius = i * ringSpacing;

            // Circumference of the current ring
            const circumference = 2 * Math.PI * radius;

            // To maintain consistent spacing between dots visually,
            // the number of dots on a ring should be proportional to its circumference.
            // Adjust the denominator to change dot density along the ring
            const numDotsOnRing = Math.floor(circumference / 0.6);

            for (let j = 0; j < numDotsOnRing; j++) {
                // Angle for this specific dot
                const angle = (j / numDotsOnRing) * Math.PI * 2;

                // Introduce slight spiral/offset so dots don't form perfectly straight lines radiating outwards
                const offsetAngle = angle + (i * 0.05);

                const x = Math.cos(offsetAngle) * radius;
                const z = Math.sin(offsetAngle) * radius;

                // Add tiny amount of randomness to break up perfectly straight digital lines
                // but keep the distinct ring structure intact
                const jitter = (Math.random() - 0.5) * 0.15;

                posArray.push(x + jitter, 0, z + jitter);
            }
        }

        return {
            positions: new Float32Array(posArray)
        };
    }, [isMobile]);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
    }), []);

    useFrame((state) => {
        if (!materialRef.current || !pointsRef.current) return;

        uniforms.uTime.value = state.clock.getElapsedTime();

        // Map pointer to world coordinates (roughly) for the shader
        uniforms.uMouse.value.set(pointer.x * 20, pointer.y * -20);

        // Very slow, majestic overarching rotation
        pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;

        // Subtle tilt based on mouse position to give parallax feel
        // Exaggerated influence
        const targetRotX = Math.PI / 3 - (pointer.y * Math.PI) / 8; // Base tilt is PI/3
        const targetRotZ = (pointer.x * Math.PI) / 8;

        pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetRotX, 0.05);
        pointsRef.current.rotation.z = THREE.MathUtils.lerp(pointsRef.current.rotation.z, targetRotZ, 0.05);
    });

    return (
        // Initial setup: tilted firmly so the rings lay "flat" but viewed from above-angle
        // Position shifted down slightly so it occupies the lower half of the hero well
        <group position={[0, isMobile ? -5 : -12, 0]}>
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
