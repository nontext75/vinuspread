'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProjectGalleryGridProps {
    images: {
        src: string;
        alt?: string;
        span?: 'left' | 'center-top' | 'center-bottom' | 'right';
    }[];
    className?: string;
}

const ProjectGalleryGrid: React.FC<ProjectGalleryGridProps> = ({ images, className }) => {
    return (
        <section className={cn("py-20 px-6 max-w-[1920px] mx-auto", className)}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                {/* Left Large Column */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="col-span-12 md:col-span-5 aspect-[4/5] md:aspect-auto overflow-hidden bg-zinc-900 border border-white/5"
                >
                    <img src={images[0]?.src} alt={images[0]?.alt} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100" />
                </motion.div>

                {/* Center Stack Column */}
                <div className="col-span-12 md:col-span-3 flex flex-col gap-6 md:gap-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex-1 aspect-square md:aspect-auto overflow-hidden bg-zinc-900 border border-white/5"
                    >
                        <img src={images[1]?.src} alt={images[1]?.alt} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex-1 aspect-square md:aspect-auto overflow-hidden bg-zinc-900 border border-white/5"
                    >
                        <img src={images[2]?.src} alt={images[2]?.alt} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                    </motion.div>
                </div>

                {/* Right Large Column */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="col-span-12 md:col-span-4 aspect-[2/3] md:aspect-auto overflow-hidden bg-zinc-900 border border-white/5"
                >
                    <img src={images[3]?.src} alt={images[3]?.alt} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100" />
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectGalleryGrid;
