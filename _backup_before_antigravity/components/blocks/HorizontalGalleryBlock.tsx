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
        <section ref={targetRef} className="relative h-[500vh] bg-background"> {/* 500vh scroll track */}
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
                    className="flex gap-12 px-12 md:px-24 w-max h-[60vh] items-center"
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
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
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
                </motion.div>
            </div>
        </section>
    );
};

export default HorizontalGalleryBlock;
