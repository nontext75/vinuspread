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
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Determine width for horizontal scroll
    // Mocking ~4000px scrollable width or dynamic based on items. 
    // Ideally, we'd use a measured width, but for now we'll estimate based on item count.
    // 15 items * 25vw + gaps ~= 400vw width roughly.
    // Transform scrollY (vertical) to x (horizontal).
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

    return (
        <section ref={targetRef} className="relative h-[600vh] bg-neutral-950 z-10"> {/* Increased scroll height for smoother feel */}
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                {/* Header Overlay (Optional, stationary or moves slightly) */}
                {/* Header Overlay - Positioned to match StickySplitBlock (Section 3) */}
                <div className="absolute top-32 left-6 md:left-12 z-20 pointer-events-none">
                    <p className="text-xl md:text-2xl font-bold mb-4 tracking-tighter text-muted-foreground">
                        Selected Works ({data.items.length})
                    </p>
                    <h2 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tight leading-[0.9] uppercase text-foreground">
                        {data.title}
                    </h2>
                </div>

                {/* Horizontal Scrolling Track */}
                <motion.div
                    style={{ x }}
                    className="flex gap-6 md:gap-12 px-6 md:px-24 w-max h-[50vh] md:h-[60vh] items-center"
                >
                    {/* Intro Spacer to push first item past the header title area */}
                    <div className="w-[10vw]" />

                    {data.items.map((item, index) => {
                        const Wrapper = item.link ? Link : React.Fragment;
                        const wrapperProps = item.link ? { href: item.link, className: "h-full block" } : {};

                        // If Link, we need to handle the structure carefully.
                        // Actually, easiest is to wrap the inner content
                        const content = (
                            <div
                                key={index}
                                className="relative h-full aspect-[3/4] md:aspect-[4/5] flex-shrink-0 flex flex-col group overflow-hidden cursor-pointer"
                            >
                                {/* Image with Unfurl Animation - sliding up mask or scale */}
                                <motion.div
                                    initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
                                    whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                                    transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    className="w-full flex-1 relative overflow-hidden bg-muted"
                                >
                                    <img
                                        src={item.src}
                                        alt={item.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                                    />
                                </motion.div>

                                {/* Title & Category - Always Visible Below Image */}
                                <div className="mt-4 flex flex-col justify-start">
                                    <h3 className="text-foreground text-2xl font-bold uppercase tracking-tight leading-none mb-1 group-hover:text-muted-foreground transition-colors">
                                        {item.title}
                                    </h3>
                                    <span className="text-muted-foreground/60 text-sm font-medium uppercase tracking-wider">
                                        {item.category} — {item.year}
                                    </span>
                                </div>

                                {/* Number Indicator - Floating Top Left (Optional, keep or remove? User didn't complain, keeping it style-wise) */}
                                <div className="absolute top-2 left-2 text-xs font-bold text-white/50 z-10 mix-blend-difference">
                                    {(index + 1).toString().padStart(2, '0')}
                                </div>
                            </div>
                        );

                        return item.link ? (
                            <Link key={index} href={item.link} className='h-full block'>
                                {content}
                            </Link>
                        ) : (
                            <React.Fragment key={index}>
                                {content}
                            </React.Fragment>
                        );

                    })}

                    {/* View All Projects Card - Append at the end */}
                    {data.view_all_link && (
                        <Link href={data.view_all_link} className="h-full block group/viewall">
                            <div className="relative h-full aspect-[3/4] md:aspect-[4/5] flex-shrink-0 flex flex-col items-center justify-center bg-white/5 border border-white/10 hover:bg-white hover:border-transparent transition-all duration-500 cursor-pointer overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/viewall:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10 flex flex-col items-center gap-6">
                                    <div className="w-16 h-16 rounded-full border border-white/30 group-hover/viewall:border-black/20 flex items-center justify-center transition-colors duration-500">
                                        <ArrowRight className="w-6 h-6 text-white group-hover/viewall:text-black transition-colors duration-500" />
                                    </div>
                                    <span className="text-3xl md:text-4xl font-black uppercase text-center leading-none text-white group-hover/viewall:text-black transition-colors duration-500">
                                        View<br />All<br />Projects
                                    </span>
                                </div>
                            </div>
                        </Link>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default HorizontalGalleryBlock;
