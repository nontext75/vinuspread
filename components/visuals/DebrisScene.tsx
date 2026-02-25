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
    
    float alpha = 1.0 - smoothstep(0.3, 1.0, r); 
    
    // 2. Normalize height for coloring (approx -3 to 3 based on new amplitudes)
    float h = (vPos.y + 3.0) / 6.0;
    h = clamp(h, 0.0, 1.0);
    
    // 3. Vibrant Diverse Color Palette
    vec3 c1 = vec3(0.0, 0.7, 1.0); // Neon Cyan (Lowest valleys)
    vec3 c2 = vec3(0.5, 0.0, 1.0); // Deep Purple
    vec3 c3 = vec3(1.0, 0.0, 0.5); // Hot Pink
    vec3 c4 = vec3(1.0, 0.8, 0.0); // Electric Yellow (Highest peaks)
    
    // Multi-stop gradient calculation
    vec3 color = mix(c1, c2, smoothstep(0.0, 0.33, h));
    color = mix(color, c3, smoothstep(0.33, 0.66, h));
    color = mix(color, c4, smoothstep(0.66, 1.0, h));
    
    // Core Brightness
    float core = 1.0 - smoothstep(0.0, 0.2, r);
    color += core * 0.6; 
    
    gl_FragColor = vec4(color, alpha * 0.95);
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
