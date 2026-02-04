"use client";

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const KineticWord = ({ position, text, color }: { position: [number, number, number], text: string, color: string }) => {
    const meshRef = useRef<any>(null);
    const { mouse, viewport } = useThree();

    useFrame(() => {
        if (!meshRef.current) return;
        // Look at mouse
        const x = (mouse.x * viewport.width) / 2;
        const y = (mouse.y * viewport.height) / 2;
        meshRef.current.lookAt(x, y, 10);
    });

    return (
        <Float floatIntensity={2} speed={3}>
            <Text
                ref={meshRef}
                position={position}
                fontSize={1.5}
                color={color}
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                anchorX="center"
                anchorY="middle"
            >
                {text}
            </Text>
        </Float>
    );
};

const TypeScene = () => {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />

            <KineticWord position={[0, 0.5, 0]} text="VINUSPREAD" color="#ffffff" />
            <KineticWord position={[0, -1.0, 0]} text="DIGITAL" color="#00ffff" />
        </>
    );
};

export default TypeScene;
