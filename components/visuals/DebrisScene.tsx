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

varying float vElevation;

void main() {
    vec3 pos = position;
    
    // Distance from the exact center (origin)
    float dist = length(pos.xz);
    
    // 1. Primary Ripple (moves outward from center)
    // The negative dist makes the wave travel outwards from the center.
    // Extremely exaggerated multiplier (5.0) to counteract the flat FOV compression 
    float ripple = sin(-dist * 1.5 + uTime * 2.5) * 5.0;
    
    // 2. Secondary slow standing wave for an organic, slightly chaotic feel
    float wave = sin(pos.x * 0.4 + uTime * 1.5) * 1.2 + cos(pos.z * 0.3 + uTime * 1.0) * 1.2;
    
    // 3. Mouse Interaction (Subtle depression where the mouse hovers over the plane)
    // Convert UV to rough world space for mouse interaction
    float mouseInfluence = 0.0;
    // Since camera is looking from Z=200 down to Z=0, UV/Mouse coordinates can be mapped to XY plane,
    // which corresponds to heavily rotated XZ plane. We will use a simplified uniform for this.

    pos.y = ripple + wave;
    
    vElevation = pos.y; // Pass elevation to fragment for color coding
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // Perspective scale for point size (closer dots are larger)
    // Increased significantly from 30.0 to 3000.0 so they look like distinct glowing spheres
    gl_PointSize = (3000.0 / -mvPosition.z); 
    gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = `
uniform vec3 uColorBase;
uniform vec3 uColorHighlight;
varying float vElevation;

void main() {
    // 1. Make the points perfectly circular with a soft glow edge
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = dot(cxy, cxy);
    if (r > 1.0) discard; // Crop to circle
    
    // Very soft glowing edge
    float alpha = 1.0 - smoothstep(0.3, 1.0, r); 
    
    // 2. Color gradient based on the wave elevation (Y height)
    // Mapping elevation approx -6.0 to 6.0 based on new 5.0x amplitude
    float mixFactor = smoothstep(-4.5, 4.5, vElevation);
    
    vec3 color = mix(uColorBase, uColorHighlight, mixFactor);
    
    // Add bright white core to dots (highest points get slightly brighter cores)
    float core = 1.0 - smoothstep(0.0, 0.2, r);
    color += core * (mixFactor * 0.5 + 0.2); 
    
    // Multiply alpha by baseline transparency to keep it looking like data
    gl_FragColor = vec4(color, alpha * 0.85);
}
`;

const DataRipple = () => {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { viewport, pointer } = useThree();

    // Adjust density based on screen size to maintain performance
    const isMobile = viewport.width < 10;

    const { positions } = useMemo(() => {
        const posArray = [];

        const numRings = isMobile ? 50 : 90; // High number of rings for the dense look
        const radiusStep = 0.35; // Spacing between rings
        const baseParticlesPerRing = isMobile ? 6 : 10;

        for (let i = 1; i <= numRings; i++) {
            const radius = i * radiusStep;
            const pointsOnRing = Math.floor(i * baseParticlesPerRing);

            for (let j = 0; j < pointsOnRing; j++) {
                const angle = (j / pointsOnRing) * Math.PI * 2;

                // Add a TINY bit of jitter so it looks slightly organic
                const jitterR = radius + (Math.random() - 0.5) * 0.05;
                const jitterA = angle + (Math.random() - 0.5) * 0.02;

                const x = Math.cos(jitterA) * jitterR;
                const z = Math.sin(jitterA) * jitterR;
                const y = 0; // Y is handled by the vertex shader

                posArray.push(x, y, z);
            }
        }

        return {
            positions: new Float32Array(posArray)
        };
    }, [isMobile]);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColorBase: { value: new THREE.Color("#16324f") },       // Deep muted navy/cyan
        uColorHighlight: { value: new THREE.Color("#99e6ff") }   // Bright glowing cyan/white, matching the reference
    }), []);

    useFrame((state) => {
        if (!materialRef.current || !pointsRef.current) return;

        uniforms.uTime.value = state.clock.getElapsedTime();

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
