'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import GeometricBackground from '@/components/visuals/GeometricBackground';
import { cn } from '@/lib/utils';

interface ProjectHeroProps {
    title: string;
    subtitle?: string;
    category?: string;
    className?: string;
    backgroundImage?: string | null;
}

const ProjectHero: React.FC<ProjectHeroProps> = ({ title, subtitle, category, className, backgroundImage }) => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 800], [0, 200]);
    const opacity = useTransform(scrollY, [0, 600], [1, 0]);

    // Ensure valid image url or fallback
    const bgImage = backgroundImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80";

    // Proxy if needed
    const finalImage = bgImage.includes('vinus.co.kr')
        ? `/api/proxy-image?url=${encodeURIComponent(bgImage)}`
        : bgImage;

    return (
        <section className={cn("relative h-screen w-full flex items-end overflow-hidden pb-20 md:pb-40 bg-black", className)}>
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0"
            >
                <img
                    src={finalImage}
                    alt=""
                    className="w-[110%] h-[110%] -left-[5%] -top-[5%] object-cover grayscale-[0.2]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </motion.div>

            <div className="relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-[1720px] mx-auto w-full px-6 md:px-12"
                >
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        <span className="bg-white text-black px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] rounded-none">
                            {category || "DIGITAL EXPERIENCE"}
                        </span>
                        <div className="flex items-center gap-2 text-white/50 text-xs font-mono tracking-widest uppercase border-l border-white/20 pl-4">
                            <span>2024 Creative Archive</span>
                        </div>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-6 text-white max-w-none">
                        {title}
                    </h1>

                    {subtitle && (
                        <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 right-12 hidden md:flex flex-col items-center gap-4"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 rotate-90 origin-right translate-y-[-50px]">Scroll</span>
                <div className="w-[1px] h-20 bg-gradient-to-b from-white/20 to-transparent" />
            </motion.div>
        </section>
    );
};

export default ProjectHero;
