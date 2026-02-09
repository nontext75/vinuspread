"use client";

import React, { useRef, useEffect } from 'react';
import { HeroBlockData } from '@/types/blocks';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import GeometricBackground from '@/components/visuals/GeometricBackground';
import RollingProjects from './RollingProjects';

interface HeroBlockProps {
    data: HeroBlockData;
}

const HeroBlock: React.FC<HeroBlockProps> = ({ data }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [visualMode, setVisualMode] = React.useState<'galaxy' | 'orbit' | 'debris'>('galaxy');

    // Removed GSAP animation in favor of Framer Motion Variants (User Request)
    // useEffect(() => { ... gsap ... }, []);

    return (
        <section
            ref={containerRef}
            className="sticky top-0 z-0 h-screen flex flex-col justify-center items-start overflow-hidden px-6 md:px-12"
        >
            {/* Background Visual Area - Using GeometricBackground for tuned physics/camera */}
            <GeometricBackground mode={visualMode} />

            {/* Visual Toggle Buttons - Improved ergonomics for mobile */}
            <div className="absolute bottom-24 md:bottom-12 right-6 md:right-12 z-30 flex items-center md:gap-6 gap-4 bg-black/20 backdrop-blur-md md:bg-transparent p-3 md:p-0 rounded-full border border-white/10 md:border-none">
                <button
                    onClick={() => setVisualMode('galaxy')}
                    className={cn(
                        "text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300",
                        visualMode === 'galaxy'
                            ? "text-white opacity-100 scale-110"
                            : "text-white/40 hover:text-white/80"
                    )}
                >
                    Sphere
                </button>
                <div className="w-[1px] h-3 md:h-4 bg-white/20" />
                <button
                    onClick={() => setVisualMode('orbit')}
                    className={cn(
                        "text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300",
                        visualMode === 'orbit'
                            ? "text-white opacity-100 scale-110"
                            : "text-white/40 hover:text-white/80"
                    )}
                >
                    Orbit
                </button>
                <div className="w-[1px] h-3 md:h-4 bg-white/20" />
                <button
                    onClick={() => setVisualMode('debris')}
                    className={cn(
                        "text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300",
                        visualMode === 'debris'
                            ? "text-white opacity-100 scale-110"
                            : "text-white/40 hover:text-white/80"
                    )}
                >
                    Debris
                </button>
            </div>

            <div className="z-10 text-left max-w-7xl w-full pointer-events-none mt-12 md:mt-0">
                <h1
                    ref={titleRef}
                    className="text-[14vw] md:text-[10vw] leading-[0.85] md:leading-[0.9] font-black tracking-tighter mb-4 md:mb-8 uppercase mix-blend-difference text-white py-4 overflow-visible"
                >
                    {data.title}
                </h1>
                {data.subtitle && (
                    <p
                        className="text-lg md:text-2xl lg:text-4xl text-white font-light max-w-4xl tracking-wide whitespace-pre-line opacity-80"
                    >
                        {data.subtitle}
                    </p>
                )}
            </div>

            {/* Recent Projects Rolling */}
            <motion.div
                className="absolute bottom-12 left-6 md:left-12 z-20 pointer-events-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
            >
                <RollingProjects />
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Scroll</span>
                <motion.div
                    className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"
                    animate={{ scaleY: [0, 1, 0], transformOrigin: ['top', 'top', 'bottom'] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
            </motion.div>
        </section>
    );
};

export default HeroBlock;
