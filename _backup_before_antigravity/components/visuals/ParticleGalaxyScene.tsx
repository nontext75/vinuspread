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
    (Math.random() - 0.5) * 0.1 * moveSpeed,
    (Math.random() - 0.5) * 0.1 * moveSpeed,
    0
  ));
  // Random time offset for noise
  const timeOffset = useRef(Math.random() * 100);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime() + timeOffset.current;
    const mouseX = state.mouse.x;
    const mouseY = state.mouse.y;

    // 1. Rotation
    if (is2D) {
      groupRef.current.rotation.z += delta * rotationSpeed * 0.5 + (mouseX * delta * 0.05);
    } else {
      groupRef.current.rotation.y += delta * rotationSpeed + (mouseX * delta * 0.1);
      groupRef.current.rotation.x += delta * (rotationSpeed * 0.5) + (mouseY * delta * 0.1);
    }

    // 2. Physics & Movement

    // A. Random Wander Force (Noise-like) - Prevents clumping
    // Using sin/cos with different frequencies to simulate noise
    const wanderStrength = 0.002 * moveSpeed;
    velocityRef.current.x += Math.sin(time * 0.5) * wanderStrength;
    velocityRef.current.y += Math.cos(time * 0.3) * wanderStrength;

    // B. Mouse Repulsion
    const mouseWorld = new THREE.Vector3(
      (state.mouse.x * viewport.width) / 2,
      (state.mouse.y * viewport.height) / 2,
      0
    );

    const dist = positionRef.current.distanceTo(mouseWorld);
    const repulsionRadius = 4.0;

    if (dist < repulsionRadius) {
      const repulseDir = new THREE.Vector3().subVectors(positionRef.current, mouseWorld).normalize();
      const force = (repulsionRadius - dist) * 0.005;
      velocityRef.current.add(repulseDir.multiplyScalar(force));

      if (is2D) {
        groupRef.current.rotation.z += force * 0.1;
      } else {
        groupRef.current.rotation.x += force * 0.05;
        groupRef.current.rotation.y += force * 0.05;
      }
    }

    // Friction & Limits
    velocityRef.current.multiplyScalar(0.99); // Increased friction slightly for control
    const minSpeed = 0.005 * moveSpeed; // Slightly higher min speed to keep them alive
    const maxSpeed = 0.08 * moveSpeed;
    const currentSpeed = velocityRef.current.length();
    if (currentSpeed < minSpeed) velocityRef.current.setLength(minSpeed);
    if (currentSpeed > maxSpeed) velocityRef.current.setLength(maxSpeed);

    // Position Update
    positionRef.current.add(velocityRef.current);

    // Boundary Check (Bouncing)
    const boundX = (viewport.width / 2) + radius * 0.2; // Tighter bounds to keep them visible
    const boundY = (viewport.height / 2) + radius * 0.2;

    if (positionRef.current.x > boundX || positionRef.current.x < -boundX) {
      velocityRef.current.x *= -1;
      // Add a little kick to prevent sticking to walls
      velocityRef.current.x += (Math.random() - 0.5) * 0.01;
      positionRef.current.x = positionRef.current.x > 0 ? boundX : -boundX;
    }
    if (positionRef.current.y > boundY || positionRef.current.y < -boundY) {
      velocityRef.current.y *= -1;
      velocityRef.current.y += (Math.random() - 0.5) * 0.01;
      positionRef.current.y = positionRef.current.y > 0 ? boundY : -boundY;
    }

    groupRef.current.position.copy(positionRef.current);
  });
};

// Reusable Network Sphere Component
// Renders an Icosahedron with:
// 1. Wireframe (Lines)
// 2. Points (Nodes at vertices) - Now with filtering support
const NetworkSphere = ({
  radius,
  detail,
  position = [0, 0, 0] as [number, number, number],
  color = "#ffffff",
  wireframeOpacity = 0.2, // Balanced
  pointSize = 4.0,       // Shader size (approx pixels)
  rotationSpeed = 0.1,
  moveSpeed = 1.0,      // Multiplier for floating speed
  isSatellite = false,
  nodeDensity = 1.0 // New prop: 0.0 to 1.0
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
  nodeDensity?: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { gl } = useThree();

  useFloatingPhysics(groupRef, position, radius, rotationSpeed, moveSpeed, isSatellite, false);

  // Generate filtered points geometry based on density
  const pointGeometry = React.useMemo(() => {
    // Base geometry to get vertices
    const tempGeo = new THREE.IcosahedronGeometry(radius, detail);
    if (nodeDensity >= 1.0) return tempGeo;

    const posAttribute = tempGeo.getAttribute('position');
    const vertexCount = posAttribute.count;
    const targetCount = Math.floor(vertexCount * nodeDensity);

    // Randomly select indices (or simple stride)
    // Using a shuffled index array to pick random points
    const indices = Array.from({ length: vertexCount }, (_, i) => i);
    // Shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    const selectedIndices = indices.slice(0, targetCount);

    const newPositions = new Float32Array(targetCount * 3);
    for (let i = 0; i < targetCount; i++) {
      const idx = selectedIndices[i];
      newPositions[i * 3] = posAttribute.getX(idx);
      newPositions[i * 3 + 1] = posAttribute.getY(idx);
      newPositions[i * 3 + 2] = posAttribute.getZ(idx);
    }

    const newGeo = new THREE.BufferGeometry();
    newGeo.setAttribute('position', new THREE.BufferAttribute(newPositions, 3));

    return newGeo;
  }, [radius, detail, nodeDensity]);

  return (
    <group ref={groupRef} position={position}>
      {/* 1. The Wireframe Mesh (Lines) - Always full structure */}
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

      {/* 2. The Vertices (Nodes) - Filtered by density */}
      <points geometry={pointGeometry}>
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

        {/* @ts-ignore */}
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
        radius={6.8}
        detail={2} // Keep as is
        wireframeOpacity={0.06} // Reduced from 0.08
        pointSize={6.0}
        rotationSpeed={0.02}
        moveSpeed={0.5}
        nodeDensity={1.0}
      />

      {/* 2. Satellite Sphere 1 (Bouncing) - Small */}
      <NetworkSphere
        radius={0.9}
        detail={2} // Keep detail 2 for round shape
        position={[8, 4, 0]}
        wireframeOpacity={0.07}
        pointSize={2.5} // Reduced from 3.5
        rotationSpeed={0.05}
        moveSpeed={1.1}
        isSatellite={true}
        nodeDensity={0.25} // ~40 nodes (True middle ground)
      />

      {/* 3. Satellite Sphere 2 (Bouncing) - Large Satellite */}
      <NetworkSphere
        radius={4.2}
        detail={1} // Keep as 1
        position={[-8, -5, 0]}
        wireframeOpacity={0.06} // Reduced
        pointSize={5.0}
        rotationSpeed={0.03}
        moveSpeed={0.7}
        isSatellite={true}
        nodeDensity={0.7} // ~30 nodes
      />

      {/* 4. Satellite Sphere 3 (New, Medium) - Medium */}
      <NetworkSphere
        radius={2.2}
        detail={1} // Back to 1
        position={[0, -6, 0]}
        wireframeOpacity={0.07} // Reduced
        pointSize={4.0}
        rotationSpeed={0.04}
        moveSpeed={1.0}
        isSatellite={true}
        nodeDensity={0.6} // ~25 nodes
      />

      {/* 4. Ambient Debris (2D Constellations) */}
      {Array.from({ length: 6 }).map((_, i) => { // Reduced from 12 to 6
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
