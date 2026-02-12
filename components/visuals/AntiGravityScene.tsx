"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Physics, RigidBody, CuboidCollider, BallCollider } from '@react-three/rapier';
import * as THREE from 'three';

interface AntiGravityParticleProps {
    position: [number, number, number];
    color?: string;
    size?: number;
    antiGravityStrength?: number;
}

const AntiGravityParticle: React.FC<AntiGravityParticleProps> = ({
    position,
    color = "#00ffff",
    size = 0.5,
    antiGravityStrength = 15
}) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [isHovered, setIsHovered] = useState(false);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // 안티-그래비티 효과: 위로 떠오르는 힘
        meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.01;
        
        // 회전 효과
        meshRef.current.rotation.x += delta * 0.5;
        meshRef.current.rotation.y += delta * 0.7;
    });

    return (
        <RigidBody 
            position={position} 
            type="dynamic"
            gravityScale={-antiGravityStrength} // 음수 값으로 안티-그래비티 구현
            linearDamping={0.5}
            angularDamping={0.3}
        >
            <BallCollider args={[size]} />
            <mesh 
                ref={meshRef}
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
            >
                <sphereGeometry args={[size, 32, 32]} />
                <meshStandardMaterial 
                    color={isHovered ? "#ff00ff" : color}
                    emissive={color}
                    emissiveIntensity={isHovered ? 0.8 : 0.4}
                    transparent
                    opacity={0.8}
                />
            </mesh>
        </RigidBody>
    );
};

const AntiGravityField: React.FC = () => {
    const fieldRef = useRef<THREE.Group>(null);
    const { mouse } = useThree();

    useFrame(() => {
        if (!fieldRef.current) return;
        
        // 마우스 위치에 따른 필드 회전
        fieldRef.current.rotation.y = mouse.x * 0.5;
        fieldRef.current.rotation.x = mouse.y * 0.3;
    });

    return (
        <group ref={fieldRef}>
            {/* 안티-그래비티 필드 시각화 */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[8, 12, 64]} />
                <meshBasicMaterial 
                    color="#00ffff" 
                    transparent 
                    opacity={0.3}
                    side={THREE.DoubleSide}
                />
            </mesh>
            
            {/* 필드 파티클들 */}
            {Array.from({ length: 12 }, (_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const radius = 10;
                const height = Math.sin(i * 0.5) * 3;
                return (
                    <AntiGravityParticle
                        key={i}
                        position={[
                            Math.cos(angle) * radius,
                            height,
                            Math.sin(angle) * radius
                        ]}
                        color={i % 2 === 0 ? "#00ffff" : "#ff00ff"}
                        size={0.3 + Math.random() * 0.4}
                        antiGravityStrength={10 + Math.random() * 10}
                    />
                );
            })}
        </group>
    );
};

const GravityController: React.FC = () => {
    const [gravityMode, setGravityMode] = useState<'normal' | 'zero' | 'reverse'>('zero');
    const [fieldStrength, setFieldStrength] = useState(15);

    return (
        <div className="absolute top-4 left-4 z-50 bg-black/50 backdrop-blur-md p-4 rounded-lg">
            <h3 className="text-white font-bold mb-3">중력 제어 패널</h3>
            
            <div className="space-y-2">
                <label className="text-white text-sm">중력 모드</label>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setGravityMode('normal')}
                        className={`px-3 py-1 rounded text-xs ${gravityMode === 'normal' ? 'bg-blue-500' : 'bg-gray-600'} text-white`}
                    >
                        정상
                    </button>
                    <button 
                        onClick={() => setGravityMode('zero')}
                        className={`px-3 py-1 rounded text-xs ${gravityMode === 'zero' ? 'bg-cyan-500' : 'bg-gray-600'} text-white`}
                    >
                        무중력
                    </button>
                    <button 
                        onClick={() => setGravityMode('reverse')}
                        className={`px-3 py-1 rounded text-xs ${gravityMode === 'reverse' ? 'bg-purple-500' : 'bg-gray-600'} text-white`}
                    >
                        반중력
                    </button>
                </div>
            </div>

            <div className="mt-3">
                <label className="text-white text-sm">장 강도: {fieldStrength}</label>
                <input 
                    type="range" 
                    min="5" 
                    max="30" 
                    value={fieldStrength}
                    onChange={(e) => setFieldStrength(Number(e.target.value))}
                    className="w-full"
                />
            </div>
        </div>
    );
};

interface AntiGravitySceneProps {
    onGravityChange?: (mode: string) => void;
}

const AntiGravityScene: React.FC<AntiGravitySceneProps> = ({ onGravityChange }) => {
    return (
        <>
            <Physics 
                gravity={[0, -9.81, 0]}
                interpolate={false}
            >
                <AntiGravityField />
                
                {/* 바닥 (안티-그래비티 파티클들이 떠오를 기준면) */}
                <RigidBody type="fixed" position={[0, -5, 0]}>
                    <CuboidCollider args={[20, 0.5, 20]} />
                    <mesh>
                        <boxGeometry args={[40, 1, 40]} />
                        <meshStandardMaterial 
                            color="#1a1a2e" 
                            transparent 
                            opacity={0.8}
                            metalness={0.8}
                            roughness={0.2}
                        />
                    </mesh>
                </RigidBody>
            </Physics>
            
            <GravityController />
        </>
    );
};

export default AntiGravityScene;