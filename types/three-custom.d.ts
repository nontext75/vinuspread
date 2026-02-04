import { Object3DNode, MaterialNode } from "@react-three/fiber";
import * as THREE from "three";

// Define the uniforms for your custom shader
type CirclePointMaterialUniforms = {
    uSize?: number;
    uPixelRatio?: number;
    color?: THREE.Color;
    opacity?: number;
};

// Start by defining the specific material type
export type CirclePointMaterialType = THREE.ShaderMaterial & CirclePointMaterialUniforms;

// Add to JSX.IntrinsicElements
declare global {
    namespace JSX {
        interface IntrinsicElements {
            circlePointMaterial: MaterialNode<CirclePointMaterialType, CirclePointMaterialUniforms>;
        }
    }
}
