'use client';

import { motion } from 'framer-motion';

export default function FluidGradient() {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            {/* Deep Purple/Cyan Base */}
            <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_50%_50%,_#581c87_0%,_#000_100%)]" />

            {/* Moving Orbs/Blobs for Fluid Effect */}
            <motion.div
                animate={{
                    x: [0, 100, -100, 0],
                    y: [0, -100, 100, 0],
                    scale: [1, 1.2, 0.9, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-600/30 blur-[100px] mix-blend-screen"
            />

            <motion.div
                animate={{
                    x: [0, -150, 100, 0],
                    y: [0, 100, -50, 0],
                    scale: [1, 1.3, 1.1, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-cyan-600/20 blur-[120px] mix-blend-screen"
            />

            <motion.div
                animate={{
                    x: [0, 50, -50, 0],
                    y: [0, 50, -50, 0],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-[40%] left-[40%] w-[40vw] h-[40vw] rounded-full bg-blue-500/20 blur-[90px] mix-blend-overlay"
            />

            {/* Frosted Glass Overlay Texture */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] mix-blend-overlay opacity-30" />

            {/* Scanline/Noise (Optional for Tech feel) */}
            {/* <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-10 mix-blend-overlay" /> */}
        </div>
    );
}
