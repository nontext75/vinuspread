"use client";

import React, { useRef, useMemo } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Define Custom Shader Material
const WaveShaderMaterial = shaderMaterial(
    // Uniforms
    {
        uTime: 0,
        uColor: new THREE.Color(0.0, 0.5, 1.0),
        uMouse: new THREE.Vector2(0, 0),
        uResolution: new THREE.Vector2(1, 1)
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    varying float vElevation;
    uniform float uTime;
    uniform vec2 uMouse;

    void main() {
        vUv = uv;
        vec3 pos = position;

        // Base Wave
        float elevation = sin(pos.x * 2.0 + uTime) * 0.2;
        elevation += sin(pos.y * 1.5 + uTime * 0.5) * 0.2;

        // Mouse Interaction (Ripple)
        // Map uv to world-like coords centered at 0
        vec2 worldPos = pos.xy; 
        float dist = distance(worldPos, uMouse);
        
        // Create a localized bulge/ripple around mouse
        float interaction = smoothstep(5.0, 0.0, dist); // Radius 5
        elevation += sin(dist * 5.0 - uTime * 5.0) * interaction * 0.5;

        pos.z += elevation;
        vElevation = elevation;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
    `,
    // Fragment Shader
    `
    varying float vElevation;
    uniform vec3 uColor;

    void main() {
        // Color variation based on elevation (Deep Blue to Cyan)
        float mixStrength = (vElevation + 0.5) * 0.8;
        vec3 colorA = vec3(0.0, 0.1, 0.3); // Deep Dark Blue
        vec3 colorB = vec3(0.0, 1.0, 1.0); // Cyan

        vec3 color = mix(colorA, colorB, mixStrength);
        
        gl_FragColor = vec4(color, 1.0);
    }
    `
);

extend({ WaveShaderMaterial });

const FluidScene = () => {
    const materialRef = useRef<any>(null);
    const { viewport, mouse } = useThree();

    useFrame((state, delta) => {
        if (materialRef.current) {
            materialRef.current.uTime += delta;
            // Map normalized mouse (-1..1) to Viewport Coverage
            materialRef.current.uMouse.set(
                (mouse.x * viewport.width) / 2,
                (mouse.y * viewport.height) / 2
            );
        }
    });

    return (
        <>
            {/* Full Screen Plane */}
            <mesh>
                <planeGeometry args={[viewport.width * 1.2, viewport.height * 1.2, 128, 128]} />
                {/* @ts-ignore */}
                <waveShaderMaterial
                    ref={materialRef}
                    uColor={new THREE.Color("#0088ff")}
                    wireframe={false}
                />
            </mesh>
        </>
    );
};

export default FluidScene;
