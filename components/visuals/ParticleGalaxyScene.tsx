"use client";

import React, { useRef } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";
import { Icosahedron } from "@react-three/drei";
import * as THREE from "three";
import './materials'; // Registers CirclePointMaterial

// Physics Hook
const useFloatingPhysics = (
  groupRef: React.RefObject<THREE.Group | null>,
  position: [number, number, number],
  radius: number,
  rotationSpeed: number,
  moveSpeed: number,
  isSatellite: boolean,
  is2D: boolean = false // New flag to restrict rotation
) => {
  const { viewport } = useThree();
  const positionRef = useRef(new THREE.Vector3(...position));
  const velocityRef = useRef(new THREE.Vector3(
    (Math.random() - 0.5) * 0.1 * moveSpeed, // Increased initial impulse
    (Math.random() - 0.5) * 0.1 * moveSpeed,
    0
  ));

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const mouseX = state.mouse.x;
    const mouseY = state.mouse.y;

    // 1. Rotation
    if (is2D) {
      // Only spin on Z axis for 2D objects
      groupRef.current.rotation.z += delta * rotationSpeed * 0.5 + (mouseX * delta * 0.05);
    } else {
      // 3D Rotation
      groupRef.current.rotation.y += delta * rotationSpeed + (mouseX * delta * 0.1);
      groupRef.current.rotation.x += delta * (rotationSpeed * 0.5) + (mouseY * delta * 0.1);
    }

    // 2. Physics & Movement
    const mouseWorld = new THREE.Vector3(
      (state.mouse.x * viewport.width) / 2,
      (state.mouse.y * viewport.height) / 2,
      0
    );

    const dist = positionRef.current.distanceTo(mouseWorld);
    const repulsionRadius = 4.0; // Reduced from 8.0 to allow passing

    if (dist < repulsionRadius) {
      const repulseDir = new THREE.Vector3().subVectors(positionRef.current, mouseWorld).normalize();
      const force = (repulsionRadius - dist) * 0.005; // Stronger local push
      velocityRef.current.add(repulseDir.multiplyScalar(force));

      // Spin reaction
      if (is2D) {
        groupRef.current.rotation.z += force * 0.1;
      } else {
        groupRef.current.rotation.x += force * 0.05;
        groupRef.current.rotation.y += force * 0.05;
      }
    }

    // Friction & Limits
    velocityRef.current.multiplyScalar(0.9995); // Extremely low friction
    const minSpeed = 0.002 * moveSpeed; // Allow slower drift
    const maxSpeed = 0.06 * moveSpeed; // Allow faster movement (2x previous)
    const currentSpeed = velocityRef.current.length();
    if (currentSpeed < minSpeed) velocityRef.current.setLength(minSpeed);
    if (currentSpeed > maxSpeed) velocityRef.current.setLength(maxSpeed);

    // Position Update
    positionRef.current.add(velocityRef.current);

    // Boundary Check (Bouncing)
    // Allow going slightly off-screen for organic feel
    const boundX = (viewport.width / 2) + radius * 0.5;
    const boundY = (viewport.height / 2) + radius * 0.5;

    if (positionRef.current.x > boundX || positionRef.current.x < -boundX) {
      velocityRef.current.x *= -1;
      positionRef.current.x = positionRef.current.x > 0 ? boundX : -boundX;
    }
    if (positionRef.current.y > boundY || positionRef.current.y < -boundY) {
      velocityRef.current.y *= -1;
      positionRef.current.y = positionRef.current.y > 0 ? boundY : -boundY;
    }

    groupRef.current.position.copy(positionRef.current);
  });
};

// Reusable Network Sphere Component
// Renders an Icosahedron with:
// 1. Wireframe (Lines)
// 2. Points (Nodes at vertices)
const NetworkSphere = ({
  radius,
  detail,
  position = [0, 0, 0] as [number, number, number],
  color = "#ffffff",
  wireframeOpacity = 0.2, // Balanced
  pointSize = 4.0,       // Shader size (approx pixels)
  rotationSpeed = 0.1,
  moveSpeed = 1.0,      // Multiplier for floating speed
  isSatellite = false
}: {
  radius: number;
  detail: number;
  position?: [number, number, number];
  color?: string;
  wireframeOpacity?: number;
  pointSize?: number;
  rotationSpeed?: number;
  moveSpeed?: number;
  isSatellite?: boolean;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { gl } = useThree();

  useFloatingPhysics(groupRef, position, radius, rotationSpeed, moveSpeed, isSatellite, false);

  return (
    <group ref={groupRef} position={position}>
      {/* 1. The Wireframe Mesh (Lines) */}
      <Icosahedron args={[radius, detail]}>
        <meshBasicMaterial
          color={color}
          wireframe={true}
          transparent
          opacity={wireframeOpacity}
          blending={THREE.AdditiveBlending} // Makes it look like light (White) instead of paint (Grey)
          depthWrite={false}
        />
      </Icosahedron>

      {/* 2. The Vertices (Nodes) */}
      <points>
        <icosahedronGeometry args={[radius, detail]} />

        {/* @ts-ignore */}
        <circlePointMaterial
          color={new THREE.Color(color)}
          opacity={0.8}
          transparent
          uSize={pointSize}
          uPixelRatio={gl.getPixelRatio()}
        />
      </points>
    </group>
  );
};

// New 2D Debris Component
const NetworkDebris = ({
  position,
  scale = 1.0,
  moveSpeed = 1.0,
  pointSize = 3.0,
  opacity = 0.2
}: {
  position: [number, number, number];
  scale?: number;
  moveSpeed?: number;
  pointSize?: number;
  opacity?: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { gl } = useThree();

  // Generate random constellation geometry once
  const { geometry, edgesGeometry } = React.useMemo(() => {
    const pointCount = 3 + Math.floor(Math.random() * 3); // 3-5 points
    const pts = [];
    // Generate points in a flat 2D area (XY plane)
    for (let i = 0; i < pointCount; i++) {
      const angle = (i / pointCount) * Math.PI * 2 + (Math.random() * 0.5);
      const r = 0.5 + Math.random() * 1.5; // Spread
      pts.push(
        Math.cos(angle) * r,
        Math.sin(angle) * r,
        0
      );
    }

    const bufferGeo = new THREE.BufferGeometry();
    bufferGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));

    // Connect them sequentially to form a loop or line
    const indices = [];
    for (let i = 0; i < pointCount - 1; i++) {
      indices.push(i, i + 1);
    }
    // randomly close loop?
    if (Math.random() > 0.5) indices.push(pointCount - 1, 0);

    bufferGeo.setIndex(indices);

    return { geometry: bufferGeo, edgesGeometry: bufferGeo };
  }, []);

  useFloatingPhysics(groupRef, position, scale * 2, 0.05, moveSpeed, true, true);

  return (
    <group ref={groupRef} scale={[scale, scale, 1]}>
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial
          color="#ffffff"
          transparent
          opacity={opacity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
      <points geometry={geometry}>

        <circlePointMaterial
          color={new THREE.Color("#ffffff")}
          opacity={opacity * 2} // Points slightly brighter
          transparent
          uSize={pointSize}
          uPixelRatio={gl.getPixelRatio()}
        />
      </points>
    </group>
  );
};

const ParticleGalaxyScene = () => {
  return (
    <group>
      {/* Ambient Lighting (Optional, MeshBasicMaterial doesn't need it but good for future) */}
      {/* <ambientLight intensity={0.5} /> */}

      {/* 1. Main Sphere (Static Center) */}
      <NetworkSphere
        radius={6.8} // Increased from 4.5 (approx 1.5x)
        detail={2} // Reduced detail for sharper network look
        wireframeOpacity={0.18} // Reduced from 0.25 to prevent being too prominent
        pointSize={6.0} // Somewhat visible
        rotationSpeed={0.02}
        moveSpeed={0.5} // Slower main sphere
      />

      {/* 2. Satellite Sphere 1 (Bouncing) */}
      <NetworkSphere
        radius={0.9} // Increased from 0.6 (1.5x)
        detail={1} // Low poly for distinct shape
        position={[8, 4, 0]}
        wireframeOpacity={0.25} // Reduced from 0.35
        pointSize={3.5}  // Reduced size relative to radius
        rotationSpeed={0.05}
        moveSpeed={1.1} // Slightly reduced speed
        isSatellite={true}
      />

      {/* 3. Satellite Sphere 2 (Bouncing) */}
      <NetworkSphere
        radius={4.2} // Increased from 2.8 (1.5x)
        detail={1} // Low poly for distinct shape
        position={[-8, -5, 0]}
        wireframeOpacity={0.22} // Reduced from 0.3
        pointSize={5.0} // Smaller pts
        rotationSpeed={0.03}
        moveSpeed={0.7} // 30% slower
        isSatellite={true}
      />

      {/* 4. Satellite Sphere 3 (New, Medium) */}
      <NetworkSphere
        radius={2.2}
        detail={1}
        position={[0, -6, 0]}
        wireframeOpacity={0.25} // Reduced from 0.35
        pointSize={4.0}
        rotationSpeed={0.04}
        moveSpeed={1.0}
        isSatellite={true}
      />

      {/* 4. Ambient Debris (2D Constellations) */}
      {Array.from({ length: 12 }).map((_, i) => {
        const x = (Math.sin(i * 54.3) * 12);
        const y = (Math.cos(i * 21.6) * 8);

        return (
          <NetworkDebris
            key={`debris-2d-${i}`}
            position={[x, y, 0]}
            scale={0.8 + Math.random() * 0.7} // Increased size (approx 1.5x)
            moveSpeed={0.3 + Math.random() * 0.3} // Slow drift
            pointSize={3.0}
            opacity={0.25} // Increased visibility
          />
        );
      })}
    </group>
  );
};

export default ParticleGalaxyScene;
