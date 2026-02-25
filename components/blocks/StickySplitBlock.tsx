"use client";

import React, { useRef, useState, useMemo } from 'react';
import { StickySplitBlockData } from '@/types/blocks';
import { motion, useScroll, useTransform, MotionValue, useSpring } from 'framer-motion';

interface StickySplitBlockProps {
    data: StickySplitBlockData;
}

// ----------------------------------------------------------------------
// 1. DATA & HELPER TYPES
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// 2. CHILD COMPONENTS (SCROLL ITEM TEXT)
// ----------------------------------------------------------------------

const ScrollItem = ({
    index,
    totalItems,
    scrollYProgress,
    value,
    isLight,
    isBackgroundMode,
    setHoveredIndex
}: {
    index: number;
    totalItems: number;
    scrollYProgress: MotionValue<number>;
    value: any;
    isLight: boolean;
    isBackgroundMode?: boolean;
    setHoveredIndex: (index: number | null) => void;
}) => {
    const stepSize = 1 / (totalItems + 1);
    const start = (index + 0.8) * stepSize;
    const inPeak = (index + 1.0) * stepSize;
    const outPeak = (index + 1.8) * stepSize;
    const end = (index + 2.0) * stepSize;

    const opacity = useTransform(scrollYProgress, [start, start + 0.1, outPeak, end], [0, 1, 1, 0]);
    const titleY = useTransform(scrollYProgress, [start, inPeak, outPeak, end], ["40px", "0px", "0px", "-80px"]);
    const subY = useTransform(scrollYProgress, [start, inPeak, outPeak, end], ["60px", "0px", "0px", "-100px"]);
    const descY = useTransform(scrollYProgress, [start, inPeak, outPeak, end], ["80px", "0px", "0px", "-120px"]);

    const textColor = isBackgroundMode ? 'text-white' : (isLight ? 'text-slate-900' : 'text-white');
    const titleClass = "text-4xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-2 md:mb-4 tracking-tighter leading-[0.9] uppercase opacity-90 transition-opacity duration-300 hover:opacity-100 cursor-pointer drop-shadow-sm";
    const subtitleClass = "text-xl md:text-3xl mb-4 md:mb-6 font-light opacity-90 tracking-wide whitespace-pre-wrap";

    return (
        <motion.div
            style={{ opacity }}
            className={`absolute top-0 left-0 w-full ${textColor} pointer-events-none flex flex-col justify-center h-full`}
        >
            <div className="pointer-events-auto"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}>
                <motion.h3 style={{ y: titleY }} className={titleClass}>{value.title}</motion.h3>
                <motion.p style={{ y: subY }} className={subtitleClass}>{value.subtitle}</motion.p>
                <motion.p style={{ y: descY }} className="text-base md:text-lg opacity-60 max-w-md leading-relaxed">{value.description}</motion.p>
            </div>
        </motion.div>
    );
};

// ----------------------------------------------------------------------
// 3. (REMOVED) HYPER-DENSE WIREFRAME SHAPES 
// Performance Root Cause: SVG redraws during scroll
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// 4. MAIN IMAGE COMPONENT (WITH DEBRIS)
// ----------------------------------------------------------------------

const ScrollItemImage = ({ index, totalItems, scrollYProgress, img, isLight, isBackgroundMode, hoveredIndex }: any) => {
    const stepSize = 1 / (totalItems + 1);
    const isFirstBg = isBackgroundMode && index === 0;

    const start = isFirstBg ? 0 : (index + 0.8) * stepSize;
    const inPeak = (index + 1.1) * stepSize;
    const outPeak = (index + 1.9) * stepSize;
    const end = (index + 2.2) * stepSize;

    const ySplit = useTransform(scrollYProgress, [start, inPeak, outPeak, end], ["120%", "0%", "0%", "-120%"]);
    const opacitySplit = useTransform(scrollYProgress, [start, start + 0.1, outPeak, end], [1, 1, 1, 1]);
    const opacityBg = useTransform(scrollYProgress, [start, inPeak], isFirstBg ? [1, 1] : [0, 1]);

    // Parallax Debris - "Time Delayed" Movements
    const debrisY_Slow = useTransform(scrollYProgress, [start, end], ["80%", "-80%"]);
    const debrisY_Fast = useTransform(scrollYProgress, [start, end], ["180%", "-180%"]);
    const debrisY_Reverse = useTransform(scrollYProgress, [start, end], ["-50%", "50%"]);

    const rotate = useTransform(scrollYProgress, [start, end], [0, 120]);
    const rotateReverse = useTransform(scrollYProgress, [start, end], [360, 240]);

    const layoutStyles = [
        "w-[55vw] h-[55vw] md:w-[28vw] md:h-[28vw] absolute left-[50%] top-[40%] md:top-[50%] -translate-x-1/2 -translate-y-1/2 z-20",
        "w-[45vw] h-[45vw] md:w-[26vw] md:h-[26vw] absolute left-[40%] top-[38%] md:top-[48%] -translate-x-1/2 -translate-y-1/2 z-10",
        "w-[60vw] h-[60vw] md:w-[30vw] md:h-[30vw] absolute left-[60%] top-[42%] md:top-[52%] -translate-x-1/2 -translate-y-1/2 z-30"
    ];

    const currentStyle = isBackgroundMode
        ? "absolute inset-0 w-full h-full"
        : `relative overflow-visible ${layoutStyles[index % layoutStyles.length]}`;

    const isHovered = hoveredIndex === index;

    return (
        <motion.div
            style={{
                y: isBackgroundMode ? 0 : ySplit,
                opacity: isBackgroundMode ? opacityBg : opacitySplit,
                zIndex: isBackgroundMode ? index : 10,
            }}
            className={currentStyle}
        >
            {/* --- 1. LIGHTWEIGHT SATELLITE SYSTEM (CSS Only) --- */}
            {!isBackgroundMode && (
                <>
                    {/* Element A: Glowing Aura */}
                    <motion.div
                        className="absolute inset-[-40%] z-0 rounded-full border border-white/10 opacity-50 will-change-transform"
                        style={{
                            rotate: rotate,
                            y: debrisY_Slow,
                            boxShadow: 'inset 0 0 50px rgba(255,255,255,0.05), 0 0 100px rgba(255,255,255,0.05)'
                        }}
                    />

                    {/* Element B: Floating Ring */}
                    <motion.div
                        style={{ y: debrisY_Fast, x: 50, rotate: rotateReverse }}
                        className="absolute -right-16 md:-right-32 top-0 w-32 h-32 md:w-64 md:h-64 z-0 rounded-full border-[0.5px] border-cyan-200/30 border-dashed will-change-transform"
                    />

                    {/* Element C: Small Satellite Ring */}
                    <motion.div
                        style={{ y: debrisY_Reverse, x: -40 }}
                        className="absolute -left-4 md:-left-10 bottom-4 md:bottom-10 w-20 h-20 md:w-32 md:h-32 z-30 rounded-full border-[0.5px] border-purple-300/30 will-change-transform"
                    />
                </>
            )}

            {/* --- 2. CORE VISUAL (The Image Orb) --- */}
            {/* Wrapper for the actual mask and image */}
            <motion.div
                className={`w-full h-full relative overflow-hidden ${!isBackgroundMode && "rounded-full shadow-2xl border border-white/5"}`}
                animate={!isBackgroundMode ? {
                    scale: isHovered ? 1.05 : 1.0,
                    filter: isHovered ? "brightness(1.1)" : "brightness(1)"
                } : {}}
                transition={{ duration: 0.4 }}
            >
                {/* Image Inside */}
                {img?.src && (
                    <img
                        src={img.src}
                        alt="Visual"
                        className={`w-full h-full object-cover transform scale-110 transition-transform duration-1000 ease-out ${isHovered ? "scale-125" : ""}`}
                    />
                )}

                {/* Inner Glow/Reflection */}
                <div className={`absolute inset-0 ${isLight ? 'bg-white/10' : 'bg-gradient-to-tr from-black/50 via-transparent to-white/10'}`} />
            </motion.div>
        </motion.div>
    );
}


// ----------------------------------------------------------------------
// 5. MAIN BLOCK COMPONENT
// ----------------------------------------------------------------------

const StickySplitBlock: React.FC<StickySplitBlockProps> = ({ data }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

    // Physics tuned for an optimal balance of responsiveness and smoothness
    // Softened stiffness and damping to remove "catchy/stiff" (딱딱 걸리는) feeling
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 50, damping: 20, mass: 1, restDelta: 0.001
    });

    const itemCount = data.values_list?.length || 0;
    const images = data.scroll_content.filter(item => item.type === 'image');
    const isLight = data.theme === 'light';
    const isBackgroundMode = data.layout === 'background';
    const bgColor = isBackgroundMode ? 'bg-black' : (isLight ? 'bg-white' : 'bg-black');
    const overlayOpacity = useTransform(smoothProgress, [0.9, 1], [0, 1]);

    if (!data.values_list) return null;

    return (
        <section
            ref={containerRef}
            className={`relative w-full ${bgColor} z-10`}
            style={{ height: `${(itemCount + 0.5) * 130}vh` }}
        >
            <div className="sticky top-0 w-full h-screen flex flex-col lg:flex-row overflow-hidden">
                {/* Atmospheric Background WITH OPACITY TWEAK */}
                {!isLight && !isBackgroundMode && (
                    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        <img
                            src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670"
                            alt="Atmosphere"
                            className="w-full h-full object-cover opacity-40 md:opacity-60 scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black z-10" />
                    </div>
                )}

                {/* Floating Images Layer */}
                {!isBackgroundMode && images.map((img, idx) => (
                    <div key={idx} className="absolute inset-0 w-full h-full pointer-events-none z-20 will-change-transform">
                        <ScrollItemImage
                            index={idx}
                            totalItems={itemCount}
                            scrollYProgress={smoothProgress}
                            img={img}
                            isLight={isLight}
                            isBackgroundMode={false}
                            hoveredIndex={hoveredIndex}
                        />
                    </div>
                ))}

                {/* Background Mode Layer */}
                {isBackgroundMode && (
                    <div className="absolute inset-0 w-full h-full z-0">
                        {images.map((img, idx) => (
                            <ScrollItemImage
                                key={idx}
                                index={idx}
                                totalItems={itemCount}
                                scrollYProgress={smoothProgress}
                                img={img}
                                isLight={isLight}
                                isBackgroundMode={true}
                                hoveredIndex={hoveredIndex}
                            />
                        ))}
                        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                    </div>
                )}

                {/* Left Column - Content */}
                <div className={`w-full h-[35vh] lg:h-full flex flex-col px-6 md:px-12 relative z-30 lg:w-1/2 justify-end lg:justify-center pb-4 lg:pb-0`}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0, delay: 0.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className={`relative w-full max-w-xl lg:max-w-none pointer-events-none ${isBackgroundMode ? 'text-white' : ''}`}
                    >
                        <div
                            className={`
                                ${isBackgroundMode ? "[&_*]:text-white! [&_p]:text-white/90!" : ""}
                                [&_p.text-5xl]:text-white [&_p.text-5xl]:leading-[1.1] [&_p.text-5xl]:tracking-tight
                                [&_p.text-5xl]:text-4xl [&_p.text-5xl]:md:text-6xl [&_p.text-5xl]:lg:text-8xl [&_p.text-5xl]:xl:text-9xl
                            `}
                            dangerouslySetInnerHTML={{ __html: data.sticky_content }}
                        />
                    </motion.div>
                </div>

                {/* Right Column - Sliding Values */}
                <div className={`w-full h-[65vh] lg:h-full pointer-events-none lg:w-1/2 flex flex-col px-6 md:px-12 relative z-30 justify-center pb-20 lg:pb-0`}>
                    <div className="relative w-full h-full flex items-center justify-start lg:justify-center mt-8 lg:mt-0">
                        {data.values_list.map((value, idx) => (
                            <ScrollItem
                                key={idx}
                                index={idx}
                                totalItems={itemCount}
                                scrollYProgress={smoothProgress}
                                value={value}
                                isLight={isLight}
                                isBackgroundMode={isBackgroundMode}
                                setHoveredIndex={setHoveredIndex}
                            />
                        ))}
                    </div>
                </div>

                <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-black pointer-events-none z-50" />
            </div>
        </section>
    );
};

export default StickySplitBlock;
