"use client";

import React, { useRef, useEffect } from 'react';
import { HeroBlockData } from '@/types/blocks';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

interface HeroBlockProps {
    data: HeroBlockData;
}

const HeroBlock: React.FC<HeroBlockProps> = ({ data }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

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
            className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden px-4"
        >
            {/* Background Visual Area - Placeholder for Interactive Visual */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 opacity-50">
                {/* TODO: Add WebGL/Canvas visual here */}
            </div>

            <div className="z-10 text-center max-w-5xl mx-auto">
                <h1
                    ref={titleRef}
                    className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400"
                >
                    {data.title}
                </h1>
                {data.subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl mx-auto"
                    >
                        {data.subtitle}
                    </motion.p>
                )}
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
                <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center p-1">
                    <div className="w-1 h-3 bg-white rounded-full" />
                </div>
            </motion.div>
        </section>
    );
};

export default HeroBlock;
