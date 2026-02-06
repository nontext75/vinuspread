"use client";

import React, { useRef, useMemo } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Custom Shader for high-performance interactive particles
const ParticleShaderMaterial = shaderMaterial(
    {
        uTime: 0,
        uMouse: new THREE.Vector3(100, 100, 0), // Start outside
        uColor: new THREE.Color('#00ffff'),
        uPixelRatio: 1
    },
    // Vertex Shader
    `
    uniform float uTime;
    uniform vec3 uMouse;
    uniform float uPixelRatio;
    
    attribute float aScale;
    attribute vec3 aRandomity;

    varying vec3 vRandom;

    void main() {
        vRandom = aRandomity;
        vec3 pos = position;
        
        // Idle drift (Organic movement)
        pos.x += sin(uTime * 0.5 + aRandomity.x * 10.0) * 0.2;
        pos.y += cos(uTime * 0.3 + aRandomity.y * 10.0) * 0.2;
        pos.z += sin(uTime * 0.2 + aRandomity.z * 10.0) * 0.5;

        // Mouse Interaction (Repulsion)
        float dist = distance(pos.xy, uMouse.xy);
        float radius = 8.0; 
        
        if(dist < radius) {
            vec3 dir = normalize(pos - uMouse);
            // Strong repulsion
            float force = pow((1.0 - dist / radius), 2.0) * 5.0; 
            pos += dir * force;
        }

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        
        // Pulse Animation (Alive feel)
        float pulse = 1.0 + sin(uTime * 3.0 + aRandomity.x * 100.0) * 0.3;

        // Size attenuation (Much bigger now: 150.0)
        gl_PointSize = (150.0 * aScale * pulse * uPixelRatio) / -mvPosition.z;
    }
    `,
    // Fragment Shader
    `
    uniform vec3 uColor;
    varying vec3 vRandom;
    
    void main() {
        // Circular particle drawing
        float r = distance(gl_PointCoord, vec2(0.5));
        if (r > 0.5) discard;
        
        // Soft Glow
        float glow = 1.0 - (r * 2.0);
        glow = pow(glow, 2.0);

        // Color Variation (Cyan to Purple/Blue mix)
        vec3 secondaryColor = vec3(0.6, 0.2, 1.0); // Purple
        vec3 finalColor = mix(uColor, secondaryColor, vRandom.y);

        gl_FragColor = vec4(finalColor, glow); 
    }
    `
);

extend({ ParticleShaderMaterial });

const ParticleScene = () => {
    const materialRef = useRef<any>(null);
    const { viewport, mouse, gl } = useThree();

    // Generate particles filling the screen
    const { positions, scales, randoms } = useMemo(() => {
        const count = 3000; // Dense field
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        const randoms = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Spread across viewport + margins (to avoid empty edges)
            // Z range: -10 to 5
            positions[i * 3] = (Math.random() - 0.5) * Math.max(viewport.width, 20) * 1.5;
            positions[i * 3 + 1] = (Math.random() - 0.5) * Math.max(viewport.height, 10) * 1.5;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

            scales[i] = Math.random();
            randoms[i * 3] = Math.random();
            randoms[i * 3 + 1] = Math.random();
            randoms[i * 3 + 2] = Math.random();
        }
        return { positions, scales, randoms };
    }, [viewport]);

    useFrame((state, delta) => {
        if (!materialRef.current) return;
        materialRef.current.uTime += delta;

        // Map normalized mouse (-1..1) to World Coordinates
        // Note: This assumes camera is at z=10 looking at 0,0,0
        materialRef.current.uMouse.set(
            (mouse.x * viewport.width) / 2,
            (mouse.y * viewport.height) / 2,
            0
        );
    });

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-aScale"
                    count={scales.length}
                    array={scales}
                    itemSize={1}
                    args={[scales, 1]}
                />
                <bufferAttribute
                    attach="attributes-aRandomity"
                    count={randoms.length}
                    array={randoms}
                    itemSize={3}
                    args={[randoms, 3]}
                />
            </bufferGeometry>
            {/* @ts-ignore */}
            <particleShaderMaterial
                ref={materialRef}
                uColor={new THREE.Color("#00ffff")} // Cyan
                uPixelRatio={gl.getPixelRatio()}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export default ParticleScene;
