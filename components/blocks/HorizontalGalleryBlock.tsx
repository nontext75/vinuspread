"use client";

import React, { useRef } from 'react';
import { HorizontalGalleryBlockData } from '@/types/blocks';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface HorizontalGalleryBlockProps {
    data: HorizontalGalleryBlockData;
}

const HorizontalGalleryBlock: React.FC<HorizontalGalleryBlockProps> = ({ data }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const { scrollXProgress } = useScroll({ container: scrollRef });

    // Parallax effect for the section header (optional)
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <section ref={containerRef} className="w-full py-48 md:py-64 overflow-hidden bg-background relative">
            {/* Header */}
            <div className="container px-6 md:px-12 mx-auto mb-16 flex items-end justify-between border-b border-foreground/10 pb-8">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-black tracking-tight uppercase"
                >
                    {data.title}
                </motion.h2>

                {data.view_all_link && (
                    <Link
                        href={data.view_all_link}
                        className="group flex items-center gap-2 text-sm md:text-base font-medium tracking-widest uppercase hover:text-muted-foreground transition-colors mb-2"
                    >
                        View All
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                )}
            </div>

            {/* Horizontal Scroll Content */}
            <div className="relative w-full group">
                {/* Custom Cursor Hint (Optional, sophisticated add-on) */}
                <div className="absolute top-4 right-12 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground bg-background/80 px-2 py-1 rounded-full border border-foreground/10 backdrop-blur-sm">
                        Drag to Explore
                    </span>
                </div>

                <motion.div
                    ref={scrollRef}
                    className="flex gap-8 px-6 md:px-12 overflow-x-auto pb-12 cursor-grab active:cursor-grabbing scrollbar-hide"
                    drag="x"
                    dragConstraints={containerRef}
                    style={{ overflowX: 'auto', display: 'flex', scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Ensure scrollbar is hidden
                >
                    <style jsx global>{`
                        .scrollbar-hide::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>

                    {data.items.map((item, index) => (
                        <motion.div
                            key={index}
                            className="flex-none w-[80vw] md:w-[45vw] lg:w-[30vw] group/item"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-6">
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-item-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-item-hover:bg-black/10 transition-colors duration-500" />
                            </div>

                            {/* Metadata */}
                            <div className="flex flex-col gap-1 border-t border-foreground/10 pt-4 transition-colors group-item-hover:border-foreground/50">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight group-item-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <span className="text-sm font-medium text-muted-foreground">
                                        {item.year}
                                    </span>
                                </div>
                                <span className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                    {item.category}
                                </span>
                            </div>
                        </motion.div>
                    ))}

                    {/* Padding right to allow scrolling to end */}
                    <div className="flex-none w-12" />
                </motion.div>

                {/* Custom Progress Bar */}
                <div className="absolute bottom-0 left-6 right-6 md:left-12 md:right-12 h-[1px] bg-foreground/10 mt-8">
                    <motion.div
                        className="h-full bg-foreground origin-left"
                        style={{ scaleX: scrollXProgress }}
                    />
                </div>
            </div>
        </section>
    );
};

export default HorizontalGalleryBlock;
