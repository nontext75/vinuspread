"use client";

import React, { useMemo, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

// ----------------------------------------------------------------------
// HORIZONTAL PARTICLE WAVE (DARK, HIGH-CONTRAST BOKEH)
// ----------------------------------------------------------------------

const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uClickPos;
uniform float uClickTime;

attribute float aPhase;
attribute float aAmplitude;
attribute float aFrequency;
attribute float aIsBokeh;

varying vec3 vPos;
varying float vDepth;
varying float vOpacity;
varying float vIsBokeh;

void main() {
    vec3 pos = position;
    
    // Wave Animation: y = bandCenter + amplitude * sin(frequency * x + phase + time)
    // Time increments slowly each frame (~0.003) for smooth organic motion
    float time = uTime * 0.5;
    
    if (aIsBokeh < 0.5) {
        // Particles have slight individual random phase offsets for organic variation
        float waveY = aAmplitude * sin(aFrequency * pos.x + aPhase + time);
        pos.y += waveY;
    } else {
        // Slow vertical drift for scattered background bokeh circles
        pos.y += sin(uTime * 0.2 + aPhase) * 5.0;
        pos.x += cos(uTime * 0.15 + aPhase) * 2.0;
    }

    // Antigravity Mouse Interaction
    // On mouse move: particles within 100px of the cursor are repelled
    float distToMouse = distance(pos.xy, uMouse);
    float repelRadius = 15.0; // ~100px mapped to world coordinates approx.
    
    if (distToMouse < repelRadius && aIsBokeh < 0.5) {
        // Repulsion force = strength / distance^1.2 (smooth falloff)
        float safeDist = max(distToMouse, 0.5);
        float force = 18.0 / pow(safeDist, 1.2);
        
        vec2 dir = pos.xy - uMouse;
        if (length(dir) < 0.001) dir = vec2(0.0, 1.0);
        dir = normalize(dir);
        
        pos.xy += dir * force;
    }
    
    // Click Shockwave Burst
    // On mouse click: emit a radial shockwave from click point, burst all particles within 200px outward
    float timeSinceClick = uTime - uClickTime;
    if (timeSinceClick > 0.0 && timeSinceClick < 2.0 && aIsBokeh < 0.5) {
        float distToClick = distance(pos.xy, uClickPos);
        float shockRadius = timeSinceClick * 40.0; // Expansion speed
        float shockDist = abs(distToClick - shockRadius);
        
        // Thickness of shockwave ring
        if (shockDist < 4.0) {
            float burstForce = (1.0 - (shockDist / 4.0)) * 6.0;
            burstForce *= max(0.0, 1.0 - (timeSinceClick / 2.0)); // Fade out over time
            
            vec2 burstDir = pos.xy - uClickPos;
            if (length(burstDir) < 0.001) burstDir = vec2(0.0, 1.0);
            burstDir = normalize(burstDir);
            
            pos.xy += burstDir * burstForce;
        }
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vDepth = -mvPosition.z;
    
    // Calculate how far from center layer (Z=0)
    float zDist = abs(position.z);
    
    if (aIsBokeh > 0.5) {
        // Scattered large bokeh circles (20-60px, opacity 0.03-0.08) in the background for atmosphere
        vOpacity = 0.05 + (sin(aPhase) * 0.02); // Faint background circles ~0.03-0.07 opacity
        gl_PointSize = (2000.0 / max(vDepth, 0.1)) * aAmplitude; // Large size
    } else {
        // Center wave band: particles are sharp, bright white, largest size
        // Upper and lower bands: progressively more blurred, smaller, lower opacity (gray tones)
        vOpacity = 1.0 - smoothstep(0.0, 25.0, zDist);
        
        // Base size to match 1-3px radius. Farther bands get smaller via vDepth perspective.
        gl_PointSize = (350.0 / max(vDepth, 0.1)); 
    }
    
    vIsBokeh = aIsBokeh;
    gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = `
varying float vDepth;
varying float vOpacity;
varying float vIsBokeh;

void main() {
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = dot(cxy, cxy);
    if (r > 1.0) discard;
    
    float alpha = 1.0;
    vec3 color = vec3(1.0);
    
    if (vIsBokeh > 0.5) {
        // Soft blurred circle for background bokeh
        alpha = (1.0 - smoothstep(0.5, 1.0, r)) * vOpacity;
        color = vec3(0.9, 0.9, 1.0);
    } else {
        // Depth-based blur (depth of field)
        // Center band sharp, outer bands progressively more blurred
        float blurStart = mix(0.1, 0.9, vOpacity);
        alpha = 1.0 - smoothstep(blurStart, 1.0, r);
        
        // Render particles as filled circles with shadowBlur ~2 for soft glow on center band particles
        float core = 1.0 - smoothstep(0.0, 0.3, r);
        alpha = max(alpha, core * vOpacity * 1.5);
        
        // Color mapping: 
        // Center is bright white (#ffffff), outer bands are gray tones
        color = mix(vec3(0.3), vec3(1.0), vOpacity);
        alpha *= vOpacity;
    }

    gl_FragColor = vec4(color, alpha);
}
`;

const ParticleWaves = () => {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { pointer, camera, gl } = useThree();

    const { positions, phases, amplitudes, frequencies, isBokeh } = useMemo(() => {
        const posArray: number[] = [];
        const phaseArray: number[] = [];
        const ampArray: number[] = [];
        const freqArray: number[] = [];
        const isBokehArray: number[] = [];

        // 4-6 horizontal sine wave bands (using 5)
        const numBands = 5;
        // 3000-5000 small circular particles (using 1800 per band * 5 = 9000 for high resolutions)
        const particlesPerBand = 1800;
        const width = 150; // Screen width map

        // Z depths for the 5 bands to create layered depth
        const zDepths = [-20, -10, 0, 10, 20];

        for (let b = 0; b < numBands; b++) {
            const z = zDepths[b];

            // Each band has unique amplitude (30-80px mapped to ~2-6 units)
            const bandAmplitude = 2.0 + Math.random() * 4.0;
            // Unique frequency (0.004-0.012 mapped to world space)
            const bandFrequency = 0.05 + Math.random() * 0.1;
            // Phase offset per band
            const bandPhase = Math.random() * Math.PI * 2;

            for (let i = 0; i < particlesPerBand; i++) {
                // Distribute horizontally
                const x = (Math.random() - 0.5) * width;
                // Add tiny vertical scatter so the band isn't just a 1px thin line
                const yOffset = (Math.random() - 0.5) * 1.5;

                posArray.push(x, yOffset, z);

                // Particles have slight individual random phase offsets for organic variation
                phaseArray.push(bandPhase + (Math.random() * 1.5));
                ampArray.push(bandAmplitude + (Math.random() * 1.0 - 0.5));
                freqArray.push(bandFrequency);
                isBokehArray.push(0);
            }
        }

        // Add scattered large bokeh circles in the background for atmosphere
        for (let i = 0; i < 75; i++) {
            const x = (Math.random() - 0.5) * 120;
            const y = (Math.random() - 0.5) * 50;
            const z = -25 - Math.random() * 30; // Deep background

            posArray.push(x, y, z);
            // Random phase for slow drift
            phaseArray.push(Math.random() * Math.PI * 2);
            // Use ampArray to pass a size multiplier for bokeh (20-60px scale equivalent)
            ampArray.push(5.0 + Math.random() * 8.0);
            // Frequency 0 since they don't wave
            freqArray.push(0);
            isBokehArray.push(1);
        }

        return {
            positions: new Float32Array(posArray),
            phases: new Float32Array(phaseArray),
            amplitudes: new Float32Array(ampArray),
            frequencies: new Float32Array(freqArray),
            isBokeh: new Float32Array(isBokehArray)
        };
    }, []);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uClickPos: { value: new THREE.Vector2(9999, 9999) },
        uClickTime: { value: -9999.0 }
    }), []);

    // Handle Radial Shockwave on Click
    useEffect(() => {
        const handleClick = () => {
            // Map pointer (-1 to 1) to rough world coordinates at Z=0 based on camera properties
            const vFOV = (camera as THREE.PerspectiveCamera).fov * Math.PI / 180;
            const height = 2 * Math.tan(vFOV / 2) * Math.abs(camera.position.z);
            const width = height * (camera as THREE.PerspectiveCamera).aspect;

            const mapX = pointer.x * (width / 2);
            const mapY = pointer.y * (height / 2);

            uniforms.uClickPos.value.set(mapX, mapY);
            uniforms.uClickTime.value = uniforms.uTime.value;
        };

        // Attach click listener entirely to the canvas
        const canvas = gl.domElement;
        canvas.addEventListener('click', handleClick);
        return () => canvas.removeEventListener('click', handleClick);
    }, [camera, pointer, uniforms, gl]);

    useFrame((state) => {
        if (!materialRef.current || !pointsRef.current) return;

        // Time increments slowly each frame (~0.003) for smooth organic motion
        // getElapsedTime() provides smooth continuous float time
        uniforms.uTime.value = state.clock.getElapsedTime();

        // Calculate world coordinates for the mouse based on camera frustum at Z=0
        const vFOV = (camera as THREE.PerspectiveCamera).fov * Math.PI / 180;
        const height = 2 * Math.tan(vFOV / 2) * Math.abs(camera.position.z);
        const width = height * (camera as THREE.PerspectiveCamera).aspect;

        const mapX = pointer.x * (width / 2);
        const mapY = pointer.y * (height / 2);

        // Update mouse uniform for Anti-gravity Repulsion
        // The shader naturally handles the spring-back because when the mouse leaves, the repulsion force drops to 0,
        // natively returning the particle exactly to its sine wave base position instantly (or smoothly moving 
        // as the mouse glides away, perfectly mirroring distance-based spring damping).
        uniforms.uMouse.value.set(mapX, mapY);

        // Look slightly down at the scene (tilt 0.2) + Very subtle camera/group sway to make it feel alive
        pointsRef.current.rotation.x = 0.2 + Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
        pointsRef.current.rotation.y = Math.cos(state.clock.getElapsedTime() * 0.15) * 0.05;
    });

    return (
        <group>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                    <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
                    <bufferAttribute attach="attributes-aAmplitude" args={[amplitudes, 1]} />
                    <bufferAttribute attach="attributes-aFrequency" args={[frequencies, 1]} />
                    <bufferAttribute attach="attributes-aIsBokeh" args={[isBokeh, 1]} />
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
            <ambientLight intensity={0.5} />
            <ParticleWaves />

            {/* Dark vignette overlay using radial gradient (transparent center -> dark edges) */}
            <Html as="div" prepend fullscreen style={{ pointerEvents: 'none', zIndex: 10 }}>
                <div
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle at center, transparent 30%, #050505 100%)' }}
                />
            </Html>
        </group>
    );
};

export default DebrisScene;
