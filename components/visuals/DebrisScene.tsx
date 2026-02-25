"use client";

import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Float, MeshDistortMaterial } from "@react-three/drei";

// ----------------------------------------------------------------------
// 1. HIGH-END CINEMA 4D STYLE FLUID BLOB
// ----------------------------------------------------------------------

const FluidBlob = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const { viewport, pointer } = useThree();

    // Scale responsiveness
    const isMobile = viewport.width < 10;
    const scale = isMobile ? 1.6 : 3.0; // Increased size slightly to make it more imposing

    useFrame((state) => {
        if (!meshRef.current) return;

        // Gentle organic rotation to showcase all the folds and gradients
        meshRef.current.rotation.x += 0.0015;
        meshRef.current.rotation.y += 0.0025;
        meshRef.current.rotation.z += 0.001;

        // Interaction: shift position and tilt slightly based on mouse
        const targetX = pointer.x * 2.5;
        const targetY = pointer.y * 2.5;

        // Base X position is offset to the right on Desktop so it doesn't block the big TITLE
        const baseX = isMobile ? 0 : 5;

        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, baseX + targetX, 0.03);
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.03);

        // Reactive tilt
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
            meshRef.current.rotation.y,
            meshRef.current.rotation.y + (pointer.x * Math.PI) / 12,
            0.05
        );
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh ref={meshRef} scale={[scale, scale, scale]}>
                {/* 
                    TorusKnot with a super thick tube relative to its radius creates a 
                    tightly folded, organic "brain-like" or "cloth-like" cluster.
                    params: radius, tube, tubularSegments, radialSegments, p, q
                */}
                <torusKnotGeometry args={[1.0, 0.85, 512, 128, 3, 5]} />

                {/* 
                    MeshDistortMaterial gives us the fluid Wobble 
                    while maintaining PBR physical lighting capabilities 
                */}
                <MeshDistortMaterial
                    color="#f8f9fa"       // Bright base material acts as a canvas for the colored lights
                    roughness={0.25}      // Low roughness for a silky smooth textile/latex feel
                    metalness={0.15}      // Slight metalness makes the deep folds catch more saturated colors
                    distort={0.35}        // Suble wobble distortion so the knot looks like a fluid moving blob
                    speed={1.5}           // How fast it wobbles
                    clearcoat={1.0}       // High clearcoat for the "shimmering effect" requested
                    clearcoatRoughness={0.3}
                />
            </mesh>
        </Float>
    );
};

// ----------------------------------------------------------------------
// 2. CINEMATIC STUDIO LIGHTING SCENE
// ----------------------------------------------------------------------

const DebrisScene = () => {
    return (
        <group>
            {/* Soft Ambient to lift pure shadows so they don't go pitch black */}
            <ambientLight intensity={0.6} color="#ffffff" />

            {/* 
                We "paint" the white blob with heavily saturated directional lights 
                to create the stunning gradient effect exactly like a C4D studio render.
                This is physically-based shading instead of a flat vertex color map.
            */}

            {/* Top Light Cluster (Vibrant Orange/Pink transitioning into the object) */}
            <directionalLight position={[0, 10, 5]} color="#ff5000" intensity={15} />
            <directionalLight position={[5, 8, 2]} color="#ff0066" intensity={12} />

            {/* Middle Fill Lights (Purple/Magenta core) */}
            <directionalLight position={[-6, 0, 6]} color="#a000ff" intensity={10} />
            <directionalLight position={[6, 0, 4]} color="#cc00ff" intensity={8} />

            {/* Bottom Light Cluster (Deep Sky Blue / Aqua underbelly) */}
            <directionalLight position={[0, -10, 5]} color="#0066ff" intensity={15} />
            <directionalLight position={[-5, -6, -2]} color="#00e5ff" intensity={12} />

            {/* Subtle Backlight for rim glow (separates object from the dark background) */}
            <directionalLight position={[0, 5, -10]} color="#ffffff" intensity={5} />

            <FluidBlob />
        </group>
    );
};

export default DebrisScene;
