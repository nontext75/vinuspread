"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";

// ----------------------------------------------------------------------
// 1. HIGH-END CUSTOM DISPLACEMENT SHADER (ICY TRANSLUCENT AESTHETIC)
// ----------------------------------------------------------------------

const vertexShader = `
uniform float uTime;

varying vec3 vWorldPosition;
varying vec3 vLocalPosition;
varying vec3 vNormal;
varying vec2 vUv;

// Ashima 3D Simplex Noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}

void main() {
    vUv = uv;
    vNormal = normal;
    
    // Smooth, flowing organic displacement
    float noise1 = snoise(position * 1.2 + uTime * 0.2) * 0.4;
    float noise2 = snoise(position * 2.8 - uTime * 0.1) * 0.15;
    
    // Combine for a smooth abstract sculpture look
    float displacement = noise1 + noise2;
    
    vec3 newPos = position + normal * displacement;
    
    vLocalPosition = newPos; 
    vec4 worldPosition = modelMatrix * vec4(newPos, 1.0);
    vWorldPosition = worldPosition.xyz;
    
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`;

const fragmentShader = `
uniform float uTime;
varying vec3 vWorldPosition;
varying vec3 vLocalPosition;
varying vec3 vNormal; // Fallback normal

void main() {
    // 1. CALC TRUE NORMAL FOR GLOSSY REFLECTIONS
    vec3 dx = dFdx(vWorldPosition);
    vec3 dy = dFdy(vWorldPosition);
    vec3 normal = normalize(cross(dx, dy));
    
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    if(dot(normal, viewDir) < 0.0) {
        normal = -normal;
    }

    // 2. ICY PASTEL COLOR PALETTE
    // cool blue, pale grey, silver white, soft aqua, frosted light cyan
    vec3 colBlue  = vec3(0.65, 0.8, 0.95);  // Soft Aqua/Cool Blue
    vec3 colCyan  = vec3(0.85, 0.95, 1.0);  // Frosted Light Cyan
    vec3 colGrey  = vec3(0.9, 0.9, 0.95);   // Pale Grey / Silver White
    
    // Diagonal color mix based on local position to create smooth gradients
    float mixX = smoothstep(-1.0, 1.0, vLocalPosition.x);
    float mixY = smoothstep(-1.0, 1.0, vLocalPosition.y);
    float mixZ = smoothstep(-1.0, 1.0, vLocalPosition.z);
    
    vec3 baseCol = mix(colBlue, colCyan, mixX);
    baseCol = mix(baseCol, colGrey, mixY);
    
    // 3. SMOOTH TRANSLUCENT & GLOSSY LIGHTING
    vec3 lightDir1 = normalize(vec3(1.0, 2.0, 2.0));
    vec3 lightDir2 = normalize(vec3(-2.0, -1.0, 1.5)); // Soft fill
    
    // Wrap diffuse (Subsurface scattering emulation for translucency)
    float diff1 = max(dot(normal, lightDir1), 0.0);
    float wDiff1 = diff1 * 0.6 + 0.4; // High wrap = highly translucent
    
    float diff2 = max(dot(normal, lightDir2), 0.0);
    float wDiff2 = diff2 * 0.5 + 0.5;

    // High Gloss Specular (Glossy Reflective Surface)
    vec3 half1 = normalize(lightDir1 + viewDir);
    vec3 half2 = normalize(lightDir2 + viewDir);
    float spec1 = pow(max(dot(normal, half1), 0.0), 128.0) * 1.5; // Tighter, brighter specular
    float spec2 = pow(max(dot(normal, half2), 0.0), 64.0) * 0.5;
    
    // Fake Environment Reflection (Silver/Icy shine)
    float extRim = 1.0 - max(dot(viewDir, normal), 0.0);
    float fresnel = pow(extRim, 4.0);
    vec3 envReflect = vec3(1.0, 1.0, 1.0) * fresnel * 0.8; 
    
    // Inner Glow (Subsurface/Frosted)
    float innerGlow = smoothstep(0.4, 1.0, 1.0 - extRim);
    vec3 subsurfaceColor = baseCol * innerGlow * 0.5;

    // Final composition: Diffuse translucency + Deep Glow + Glossy Specular + Environment Fresnel
    vec3 finalColor = (baseCol * wDiff1 * 0.8) + (baseCol * wDiff2 * 0.4) + subsurfaceColor + spec1 + spec2 + envReflect;

    // Tone map & output
    finalColor = min(finalColor, vec3(1.0)); // Prevent blowing out completely

    // Since this is drawn against a dark/starry background usually, the icy pastel 
    // will pop beautifully due to the high contrast, just like a glossy render.
    gl_FragColor = vec4(finalColor, 0.95); // Slight optical alpha
}
`;

// ----------------------------------------------------------------------
// 2. THE FLUID SCULPTURE COMPONENT
// ----------------------------------------------------------------------

const FluidSculpture = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { pointer, viewport, camera } = useThree();

    // Scale responsiveness
    const isMobile = viewport.width < 10;
    const scale = isMobile ? 2.5 : 4.0;

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
    }), []);

    useFrame((state) => {
        if (!meshRef.current || !materialRef.current) return;

        uniforms.uTime.value = state.clock.getElapsedTime();

        // Slow cinematic rotation as required by "minimal style"
        meshRef.current.rotation.y += 0.001;
        meshRef.current.rotation.x += 0.0005;

        // Interaction: Parallax tracking
        const targetX = pointer.x * 1.5;
        const targetY = pointer.y * 1.5;

        // Centered position, slightly offset to right on desktop to balance the text
        const baseX = isMobile ? 0 : 3;

        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, baseX + targetX, 0.02);
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.02);

        // Very subtle tilt based on mouse to keep it 'minimal'
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -(pointer.y * Math.PI) / 12, 0.03);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, (pointer.x * Math.PI) / 12, 0.03);
    });

    return (
        <Float speed={1.0} rotationIntensity={0.2} floatIntensity={0.3}>
            <mesh ref={meshRef} scale={[scale, scale, scale]}>
                {/* High detail sphere for smooth fluid displacement */}
                <sphereGeometry args={[1, 256, 256]} />
                <shaderMaterial
                    ref={materialRef}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={uniforms}
                    wireframe={false}
                    transparent={true}
                />
            </mesh>
        </Float>
    );
};

// ----------------------------------------------------------------------
// 3. SCENE WRAPPER
// ----------------------------------------------------------------------

const DebrisScene = () => {
    return (
        <group>
            <FluidSculpture />
        </group>
    );
};

export default DebrisScene;
