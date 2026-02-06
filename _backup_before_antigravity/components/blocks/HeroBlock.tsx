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

    useEffect(() => {
        // Basic GSAP entrance animation
        const ctx = gsap.context(() => {
            gsap.from(titleRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
                delay: 0.2
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="sticky top-0 z-0 h-screen flex flex-col justify-center items-start overflow-hidden px-6 md:px-12"
        >
            {/* Background Visual Area - Using GeometricBackground for tuned physics/camera */}
            <GeometricBackground mode={visualMode} />

            {/* Visual Toggle Buttons - Aligned with Portfolio Rolling */}
            <div className="absolute bottom-12 right-6 md:right-12 z-30 flex items-center gap-6">
                <button
                    onClick={() => setVisualMode('galaxy')}
                    className={cn(
                        "text-xs font-bold tracking-widest uppercase transition-all duration-300",
                        visualMode === 'galaxy'
                            ? "text-white opacity-100 scale-110"
                            : "text-white/40 hover:text-white/80"
                    )}
                >
                    Sphere
                </button>
                <div className="w-[1px] h-4 bg-white/20" /> {/* Seperator */}
                <button
                    onClick={() => setVisualMode('orbit')}
                    className={cn(
                        "text-xs font-bold tracking-widest uppercase transition-all duration-300",
                        visualMode === 'orbit'
                            ? "text-white opacity-100 scale-110"
                            : "text-white/40 hover:text-white/80"
                    )}
                >
                    Orbit
                </button>
                <div className="w-[1px] h-4 bg-white/20" /> {/* Seperator */}
                <button
                    onClick={() => setVisualMode('debris')}
                    className={cn(
                        "text-xs font-bold tracking-widest uppercase transition-all duration-300",
                        visualMode === 'debris'
                            ? "text-white opacity-100 scale-110"
                            : "text-white/40 hover:text-white/80"
                    )}
                >
                    Debris
                </button>
            </div>

            <div className="z-10 text-left max-w-7xl w-full pointer-events-none">
                <h1
                    ref={titleRef}
                    className="text-[10vw] leading-[0.85] font-black tracking-tighter mb-8 uppercase mix-blend-difference text-white"
                >
                    {data.title}
                </h1>
                {data.subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="text-2xl md:text-4xl text-white font-light max-w-4xl tracking-wide whitespace-pre-line"
                    >
                        {data.subtitle}
                    </motion.p>
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
