'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProjectQuoteProps {
    quote: string;
    author?: string;
    bgImage: string;
    className?: string;
}

const ProjectQuote: React.FC<ProjectQuoteProps> = ({ quote, author, bgImage, className }) => {
    const containerRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <section ref={containerRef} className={cn("relative h-screen min-h-[600px] overflow-hidden flex items-center justify-center snap-start snap-always", className)}>
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0"
            >
                {/* Video Background */}
                {bgImage.includes('.mp4') || bgImage.includes('.webm') ? (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover scale-110 pointer-events-none opacity-60"
                    >
                        <source src={bgImage} type={bgImage.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
                    </video>
                ) : (
                    <img src={bgImage} alt="Background" className="w-full h-full object-cover scale-110 opacity-60" />
                )}
            </motion.div>

            <div className="relative z-20 px-6 max-w-[1720px] w-full mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter uppercase whitespace-pre-line">
                        "{quote}"
                    </h2>
                    {author && (
                        <div className="mt-8 flex items-center justify-center gap-4">
                            <div className="w-12 h-[1px] bg-white/30" />
                            <span className="text-xs uppercase tracking-[0.3em] text-white/50">{author}</span>
                            <div className="w-12 h-[1px] bg-white/30" />
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectQuote;
