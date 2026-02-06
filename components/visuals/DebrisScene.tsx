"use client";

import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Icosahedron } from "@react-three/drei";
import * as THREE from "three";
import './materials';

// Simplified Orb - No complex physics, just subtle float
const FloatingOrb = ({
    position,
    scale = 1.0,
    opacity = 0.2
}: {
    position: [number, number, number];
    scale?: number;
    opacity?: number;
}) => {
    const groupRef = useRef<THREE.Group>(null);

    // Random phase for independent movement
    const offset = useRef(Math.random() * 100);

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime() + offset.current;

        // Tiny vertical float (breathing)
        groupRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.2;
        // Slow rotation
        groupRef.current.rotation.y = t * 0.2;
        groupRef.current.rotation.z = t * 0.1;
    });

    return (
        <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
            {/* Wireframe Sphere - Subtle */}
            <Icosahedron args={[1, 1]}>
                <meshBasicMaterial
                    color="#ffffff"
                    wireframe
                    transparent
                    opacity={opacity * 0.6}
                />
            </Icosahedron>
            {/* Core Glow */}
            <Icosahedron args={[0.8, 0]}>
                <meshBasicMaterial
                    color="#ffffff"
                    transparent
                    opacity={opacity * 0.15}
                    depthWrite={false}
                />
            </Icosahedron>
        </group>
    );
};

const DebrisScene = () => {
    // Fixed positions roughly aligning with where the right-side images are
    // Center is 0,0. Viewport width is ~40-50 units at z=0 depending on aspect.
    // Images are on the right half.
    const orbs = [
        { pos: [8, 6, 0], scale: 0.4 },
        { pos: [12, 2, 0], scale: 0.6 },
        { pos: [5, -4, 0], scale: 0.3 },
        { pos: [15, -8, 0], scale: 0.5 },
        { pos: [8, -12, 0], scale: 0.4 },
        { pos: [10, 10, 0], scale: 0.3 },
        { pos: [16, 0, 0], scale: 0.4 },
        { pos: [6, -15, 0], scale: 0.5 },
    ];

    return (
        <group>
            {orbs.map((orb, i) => (
                <FloatingOrb
                    key={`orb-${i}`}
                    position={orb.pos as [number, number, number]}
                    scale={orb.scale}
                    opacity={0.4}
                />
            ))}
        </group>
    );
};

export default DebrisScene;
