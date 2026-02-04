import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

// Custom Shader for Round Points
// Default PointsMaterial renders squares. This ensures perfect circles.
export const CirclePointMaterial = shaderMaterial(
    {
        color: new THREE.Color("#ffffff"),
        opacity: 0.8,
        uSize: 5.0, // Pixel size base
        uPixelRatio: 1
    },
    // Vertex
    `
    uniform float uSize;
    uniform float uPixelRatio;
    
    void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        
        // Constant size for Orthographic view (No perspective attenuation)
        // Works well for Telephoto too
        gl_PointSize = uSize * uPixelRatio;
    }
    `,
    // Fragment
    `
    uniform vec3 color;
    uniform float opacity;
    
    void main() {
        // Draw circle
        float r = distance(gl_PointCoord, vec2(0.5));
        if (r > 0.5) discard;
        
        // Anti-aliasing
        float alpha = opacity * (1.0 - smoothstep(0.4, 0.5, r));
        
        gl_FragColor = vec4(color, alpha);
    }
    `
);

// Allow usage as <circlePointMaterial /> in JSX
extend({ CirclePointMaterial });
