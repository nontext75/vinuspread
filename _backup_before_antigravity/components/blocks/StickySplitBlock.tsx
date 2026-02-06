"use client";

import React, { useRef } from 'react';
import { StickySplitBlockData } from '@/types/blocks';
import { motion, useScroll, useTransform, MotionValue, useSpring } from 'framer-motion';
import GeometricBackground from '@/components/visuals/GeometricBackground';

interface StickySplitBlockProps {
    data: StickySplitBlockData;
}

// Helper to create scroll-driven animations for each item
const ScrollItem = ({
    index,
    totalItems,
    scrollYProgress,
    value,
    isLight,
    isBackgroundMode
}: {
    index: number;
    totalItems: number;
    scrollYProgress: MotionValue<number>;
    value: any;
    isLight: boolean;
    isBackgroundMode?: boolean;
}) => {
    // Determine the scroll range for this item's lifecycle
    // Shifted (+1) to account for the "Title Only" initial phase
    const stepSize = 1 / (totalItems + 1);

    // MATCHING KEYFRAMES WITH IMAGE for perfect sync
    const start = (index + 0.8) * stepSize;
    const inPeak = (index + 1.0) * stepSize;
    const outPeak = (index + 1.8) * stepSize;
    const end = (index + 2.0) * stepSize;

    // Image/Text Y: Slide In -> Hold -> Slide Out
    const y = useTransform(
        scrollYProgress,
        [start, inPeak, outPeak, end],
        ["100%", "0%", "0%", "-100%"]
    );

    // Opacity: Fade In -> Hold -> Fade Out
    const opacity = useTransform(
        scrollYProgress,
        [start, start + 0.1, outPeak, end], // Stay visible until exit starts
        [0, 1, 1, 0]
    );

    // Text Y: Matches Image
    const textY = useTransform(
        scrollYProgress,
        [start, inPeak, outPeak, end],
        ["50px", "0px", "0px", "-50px"]
    );

    // Text Opacity
    const textOpacity = useTransform(
        scrollYProgress,
        [start, start + 0.1, outPeak, end],
        [0, 1, 1, 0]
    );

    // Force white text if background mode, otherwise follow theme
    const textColor = isBackgroundMode ? 'text-white' : (isLight ? 'text-slate-900' : 'text-white');

    // Background Mode Typography: Match "SPREAD" (Giant) - UNIFIED FOR ALL SECTIONS
    const titleClass = "text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tight leading-[0.9] uppercase";

    const subtitleClass = "text-2xl md:text-3xl mb-6 font-light opacity-90 tracking-wide whitespace-pre-wrap";

    return (
        <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className={`absolute top-0 left-0 w-full ${textColor} pointer-events-none`}
        >
            <h3 className={titleClass}>{value.title}</h3>
            <p className={subtitleClass}>{value.subtitle}</p>
            <p className="text-base md:text-lg opacity-60 max-w-md leading-relaxed">{value.description}</p>
        </motion.div>
    );
};


const StickySplitBlock: React.FC<StickySplitBlockProps> = ({ data }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Add Physics for Smoothness (User Feedback: "Lack of smoothness")
    // Tuned for "Buttery" feel: Lower stiffness, higher damping
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80, // Increased from 40 for more responsiveness
        damping: 30, // Increased from 20 to prevent overshoot/bounce
        mass: 1, // Reduced from 1.2 to remove "heavy" feeling
        restDelta: 0.001
    });

    const itemCount = data.values_list?.length || 0;
    const images = data.scroll_content.filter(item => item.type === 'image');

    const isLight = data.theme === 'light';
    const isBackgroundMode = data.layout === 'background';
    const bgColor = isBackgroundMode ? 'bg-black' : (isLight ? 'bg-white' : 'bg-black');

    // Darkening effect at end of section to transition to next
    const overlayOpacity = useTransform(
        smoothProgress,
        [0.85, 1],
        [0, 0.8]
    );

    if (!data.values_list) return null;

    return (
        <section
            ref={containerRef}
            className={`relative w-full ${bgColor} z-10`}
            style={{ height: `${(itemCount + 1.5) * 200}vh` }} // Increased height to slow down scroll
        >
            <div className="sticky top-0 w-full h-screen flex flex-col lg:flex-row overflow-hidden">

                {/* 1. Background Visuals (Section 2 Debris) */}
                {!isLight && !isBackgroundMode && (
                    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0">
                        <GeometricBackground mode="debris" />
                    </div>
                )}

                {/* 2. Full Screen Background Images (Section 3 Mode) */}
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
                            />
                        ))}
                        {/* Darker overlay for text contrast (White Text) */}
                        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                    </div>
                )}

                {/* Left Column: Fixed Header (Aligned with Right Column) */}
                <div className={`w-full h-full flex flex-col px-6 md:px-12 relative z-20 lg:w-1/2 pt-56`}>

                    {/* Header - Delayed Appearance (Time-based) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0, delay: 0.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className={`relative z-30 pointer-events-none ${isBackgroundMode ? 'text-white' : ''}`}
                    >
                        <div className={isBackgroundMode ? "[&_*]:text-white! [&_p]:text-white/90!" : ""} dangerouslySetInnerHTML={{ __html: data.sticky_content }} />
                    </motion.div>

                    {/* Rolling Text Container - MOVED TO RIGHT COLUMN FOR ALL MODES */}
                    {/* Previously here for Section 2, now removed to unify layout */}
                </div>

                {/* Right Column: Images AND Rolling Text (Unified Layout) */}
                <div className={`w-full h-full pointer-events-none lg:w-1/2 flex flex-col pt-72 px-12 relative z-20`}>

                    {/* CASE 1: Split Mode - Images (Floating Orbs) - Background Layer of Right Col */}
                    {!isBackgroundMode && images.map((img, idx) => (
                        <div key={idx} className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
                            <ScrollItemImage
                                index={idx}
                                totalItems={itemCount}
                                scrollYProgress={smoothProgress}
                                img={img}
                                isLight={isLight}
                                isBackgroundMode={false}
                            />
                        </div>
                    ))}

                    {/* TEXT CONTENT: Rendered for BOTH modes on the Right */}
                    <div className="relative w-full z-30">
                        {data.values_list.map((value, idx) => (
                            <ScrollItem
                                key={idx}
                                index={idx}
                                totalItems={itemCount}
                                scrollYProgress={smoothProgress}
                                value={value}
                                isLight={isLight}
                                isBackgroundMode={isBackgroundMode} // Pass mode for specific styling if needed
                            />
                        ))}
                    </div>
                </div>

                {/* Darkening Overlay for Section Transition */}
                <motion.div
                    style={{ opacity: overlayOpacity }}
                    className="absolute inset-0 bg-black pointer-events-none z-50"
                />
            </div>
        </section>
    );
};

// Separate component for Image to avoid nesting issues in the map above
const ScrollItemImage = ({ index, totalItems, scrollYProgress, img, isLight, isBackgroundMode }: any) => {
    const stepSize = 1 / (totalItems + 1);

    // Adjusted for PAUSE PHASE (Matching ScrollItem) with prolonged hold
    // FIX: For Background Mode loop 0 (First Item), ensure it covers the Title phase (Start=0)
    const isFirstBg = isBackgroundMode && index === 0;

    const start = isFirstBg ? 0 : (index + 0.8) * stepSize;
    const inPeak = (index + 1.1) * stepSize;

    // We need complete range for Split Mode (Orb) to exit.
    const outPeak = (index + 1.9) * stepSize;
    const end = (index + 2.2) * stepSize;

    // For Split Mode (Orb), we use the full lifecycle (Enter -> Exit).
    const ySplit = useTransform(scrollYProgress, [start, inPeak, outPeak, end], ["120%", "0%", "0%", "-120%"]);
    const opacitySplit = useTransform(scrollYProgress, [start, start + 0.1, outPeak, end], [1, 1, 1, 1]);

    // For Background Mode (Stacking):
    // Index 0: Always 1.
    // Index > 0: 0 -> 1 at 'start'. remains 1.
    const opacityBg = useTransform(
        scrollYProgress,
        [start, inPeak],
        isFirstBg ? [1, 1] : [0, 1]
    );

    // Randomized/Organic Styling based on index
    const layoutStyles = [
        "w-[40vw] h-[40vw] md:w-[30vw] md:h-[30vw] absolute right-[-5%] top-[20%]", // Right edge
        "w-[35vw] h-[35vw] md:w-[25vw] md:h-[25vw] absolute left-[10%] top-[15%]",  // Behind Text (Left)
        "w-[50vw] h-[50vw] md:w-[40vw] md:h-[40vw] absolute left-[40%] top-[30%] -translate-x-1/2", // Center-ish
        "w-[45vw] h-[45vw] md:w-[35vw] md:h-[35vw] absolute right-[10%] bottom-[10%]", // Bottom Right
        "w-[30vw] h-[30vw] md:w-[20vw] md:h-[20vw] absolute left-[5%] bottom-[20%]" // Bottom Left
    ];
    const currentStyle = isBackgroundMode
        ? "absolute inset-0 w-full h-full"
        : `relative overflow-hidden shadow-2xl rounded-full ${layoutStyles[index % layoutStyles.length]}`;

    return (
        <motion.div
            style={{
                y: isBackgroundMode ? 0 : ySplit,
                opacity: isBackgroundMode ? opacityBg : opacitySplit,
                zIndex: isBackgroundMode ? index : 10
            }}
            className={currentStyle}
        >
            {img?.src && (
                <img
                    src={img.src}
                    alt="Visual"
                    className="w-full h-full object-cover"
                />
            )}
            <div className={`absolute inset-0 ${isLight ? 'bg-white/10' : 'bg-black/30'}`} />
        </motion.div>
    );
}

export default StickySplitBlock;
