"use client";

import React, { useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import './materials'; // Use shared CirclePointMaterial

// -----------------------------------------------------------------------------
// COMPONENTS
// -----------------------------------------------------------------------------

// Helper to place an object on a ring at a specific angle
// Use this INSIDE an Epicycle to orbit with it
const OrbitBody = ({
    radius,
    angle = 0,
    children
}: {
    radius: number;
    angle?: number;
    children?: React.ReactNode
}) => {
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    return (
        <group position={[x, y, 0]}>
            {children}
        </group>
    );
};

const Epicycle = ({
    radius,
    speed,
    offset = 0,
    color = "#ffffff",
    opacity = 0.3, // Increased default opacity (was 0.2)
    lineWidth = 1,
    particleCount = 0,
    particleSize = 4.5, // Default scaled up (was 3.0)
    children
}: {
    radius: number;
    speed: number;
    offset?: number;
    color?: string;
    opacity?: number;
    lineWidth?: number;
    particleCount?: number;
    particleSize?: number;
    children?: React.ReactNode;
}) => {
    const groupRef = useRef<THREE.Group>(null);
    const particlesRef = useRef<THREE.Points>(null);

    // 1. Ring Geometry
    const geometry = useMemo(() => {
        const curve = new THREE.EllipseCurve(
            0, 0,
            radius, radius,
            0, 2 * Math.PI,
            false,
            0
        );
        const points = curve.getPoints(128); // Higher segment count for smoothness
        return new THREE.BufferGeometry().setFromPoints(points);
    }, [radius]);

    // 2. Particles moving along this ring
    const particles = useMemo(() => {
        if (particleCount === 0) return null;
        const positions = new Float32Array(particleCount * 3);
        const offsets = new Float32Array(particleCount);
        // Distribute steadily
        for (let i = 0; i < particleCount; i++) {
            offsets[i] = (i / particleCount) * Math.PI * 2;
        }
        return { positions, offsets };
    }, [particleCount]);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();

        // Rotate the "Carrier" group
        if (groupRef.current) {
            groupRef.current.rotation.z = offset + (t * speed);
        }

        // Animate particles
        if (particles && particlesRef.current) {
            const posAttr = particlesRef.current.geometry.attributes.position;
            const arr = posAttr.array as Float32Array;
            const pSpeed = speed * 1.2; // Distinct particle speed

            for (let i = 0; i < particleCount; i++) {
                const angle = particles.offsets[i] + (t * pSpeed);
                arr[i * 3] = Math.cos(angle) * radius;
                arr[i * 3 + 1] = Math.sin(angle) * radius;
                arr[i * 3 + 2] = 0;
            }
            posAttr.needsUpdate = true;
        }
    });

    return (
        <group>
            <lineLoop geometry={geometry}>
                <lineBasicMaterial
                    color={color}
                    transparent
                    opacity={opacity}
                    depthWrite={false}
                    linewidth={lineWidth}
                />
            </lineLoop>

            {particles && (
                <points ref={particlesRef}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={particleCount}
                            array={particles.positions}
                            itemSize={3}
                            args={[particles.positions, 3]}
                        />
                    </bufferGeometry>

                    {/* @ts-ignore */}
                    <circlePointMaterial
                        uSize={particleSize}
                        uPixelRatio={1}
                        color={new THREE.Color(color)}
                        opacity={0.7}
                        transparent
                        depthWrite={false}
                    />
                </points>
            )}

            {/* Carrier Group - Rotates Children */}
            <group ref={groupRef}>
                {children}
            </group>
        </group>
    );
};

// Simple visual dot
const Joint = ({ size = 0.75, color = "white", opacity = 1.0 }) => { // Default size up from 0.5
    const buffer = useMemo(() => new Float32Array([0, 0, 0]), []);
    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={1}
                    array={buffer}
                    itemSize={3}
                    args={[buffer, 3]}
                />
            </bufferGeometry>

            {/* @ts-ignore */}
            <circlePointMaterial
                uSize={size * 10}
                uPixelRatio={1}
                color={new THREE.Color(color)}
                opacity={opacity}
                transparent
                depthWrite={false}
            />
        </points>
    );
};

// -----------------------------------------------------------------------------
// MAIN SCENE
// -----------------------------------------------------------------------------
const OrbitScene = () => {
    const sceneRef = useRef<THREE.Group>(null);
    const { viewport } = useThree();

    useFrame((state) => {
        if (!sceneRef.current) return;
        const mouseX = state.mouse.x * 0.2;
        const mouseY = state.mouse.y * 0.2;

        sceneRef.current.rotation.x = THREE.MathUtils.lerp(sceneRef.current.rotation.x, -mouseY * 0.3, 0.05);
        sceneRef.current.rotation.y = THREE.MathUtils.lerp(sceneRef.current.rotation.y, mouseX * 0.3, 0.05);
    });

    return (
        <group ref={sceneRef}>
            {/* Core */}
            <Joint size={0.6} opacity={0.3} />

            {/* ------------------------
                SYSTEM E: THE DEEP CHAIN (4-Levels)
                Sun -> Planet -> Moon -> SubMoon -> Station
                ------------------------ */}
            <Epicycle radius={9.0} speed={0.15} opacity={0.3} particleCount={6} particleSize={2.0}>

                {/* Level 1 Body (The Planet System Center) */}
                <OrbitBody radius={9.0} angle={0}>
                    <Joint size={0.8} opacity={1.0} />

                    {/* Level 2: Planet Orbit */}
                    <Epicycle radius={3.5} speed={0.5} opacity={0.4} particleCount={3} lineWidth={1.5}>

                        {/* Level 2 Body (The Moon System Center) */}
                        <OrbitBody radius={3.5} angle={Math.PI / 2}>
                            <Joint size={0.6} opacity={0.9} />

                            {/* Level 3: Moon Orbit */}
                            <Epicycle radius={1.5} speed={-1.2} opacity={0.5} lineWidth={1}>

                                {/* Level 3 Body (The Sub-Moon) */}
                                <OrbitBody radius={1.5} angle={0}>
                                    <Joint size={0.4} color="#aaddff" />

                                    {/* Level 4: Station Orbit */}
                                    <Epicycle radius={0.6} speed={3.0} opacity={0.6} lineWidth={1}>
                                        <OrbitBody radius={0.6} angle={Math.PI}>
                                            <Joint size={0.25} color="#ffddaa" />
                                        </OrbitBody>
                                    </Epicycle>

                                </OrbitBody>
                            </Epicycle>
                        </OrbitBody>
                    </Epicycle>
                </OrbitBody>

                {/* Counter Balance Planet on Main Ring */}
                <OrbitBody radius={9.0} angle={Math.PI}>
                    <Joint size={0.6} opacity={0.5} />
                    <Epicycle radius={1.0} speed={2.0} opacity={0.2}>
                        <OrbitBody radius={1.0} angle={0}><Joint size={0.3} /></OrbitBody>
                    </Epicycle>
                </OrbitBody>
            </Epicycle>


            {/* ------------------------
                SYSTEM A: Inner Fast
                ------------------------ */}
            <Epicycle radius={4.0} speed={-0.2} opacity={0.2} particleCount={4} particleSize={3.0}>
                <OrbitBody radius={4.0} angle={Math.PI / 4}>
                    <Joint size={0.4} />
                </OrbitBody>
            </Epicycle>

            {/* ------------------------
                BACKGROUND DENSITY RINGS (Doubling the count)
                Filling gaps: 2.2, 5.2, 7.5, 10.5, 11.5, 14.5, 19.0, 22.0
                ------------------------ */}
            <Epicycle radius={2.2} speed={0.05} opacity={0.1} />
            <Epicycle radius={5.2} speed={-0.05} opacity={0.1} lineWidth={0.5} />
            <Epicycle radius={7.5} speed={0.02} opacity={0.08} />
            <Epicycle radius={10.5} speed={-0.03} opacity={0.08} particleCount={4} particleSize={1.5} />
            <Epicycle radius={11.5} speed={0.04} opacity={0.08} />
            <Epicycle radius={14.5} speed={-0.02} opacity={0.05} lineWidth={2} />
            <Epicycle radius={19.0} speed={0.01} opacity={0.05} />
            <Epicycle radius={22.0} speed={-0.01} opacity={0.03} />

            {/* ------------------------
                SYSTEM D: Large Outer Ring - Background
                ------------------------ */}
            <Epicycle radius={13.0} speed={0.05} opacity={0.2} particleCount={20} particleSize={2.0} />
            <Epicycle radius={18.0} speed={-0.02} opacity={0.1} />

        </group>
    );
};

export default OrbitScene;
