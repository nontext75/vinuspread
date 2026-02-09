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
    const titleY = useTransform(scrollYProgress, [start, inPeak, outPeak, end], ["80px", "0px", "0px", "-80px"]);
    const subY = useTransform(scrollYProgress, [start, inPeak, outPeak, end], ["120px", "0px", "0px", "-120px"]);
    const descY = useTransform(scrollYProgress, [start, inPeak, outPeak, end], ["160px", "0px", "0px", "-160px"]);

    const textColor = isBackgroundMode ? 'text-white' : (isLight ? 'text-slate-900' : 'text-white');
    const titleClass = "text-6xl md:text-8xl lg:text-9xl font-black mb-2 tracking-tighter leading-[0.8] uppercase opacity-80 transition-opacity duration-300 hover:opacity-100 cursor-pointer";
    const subtitleClass = "text-2xl md:text-3xl mb-6 font-light opacity-90 tracking-wide whitespace-pre-wrap";

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
// 3. HYPER-DENSE WIREFRAME SHAPES (SVG COMPONENTS)
// ----------------------------------------------------------------------

const DenseWireframeTorus = ({ className }: { className?: string }) => {
    // Generate Torus Grid Paths - HYPER DENSITY
    const paths = useMemo(() => {
        const elements = [];
        // Longitudinal rings (circling the hole)
        for (let i = 0; i < 48; i++) { // Increased 24 -> 48
            const rotation = i * 7.5;
            elements.push(
                <ellipse key={`ring-${i}`} cx="50" cy="50" rx="42" ry="12"
                    transform={`rotate(${rotation} 50 50)`}
                    className="opacity-20" vectorEffect="non-scaling-stroke" />
            );
        }
        // Latitudinal rings (concentric)
        for (let j = 0; j < 12; j++) { // Increased 6 -> 12
            const rx = 15 + (j * 2.5);
            const ry = 5 + (j * 1);
            elements.push(
                <ellipse key={`conc-${j}`} cx="50" cy="50" rx={rx} ry={ry}
                    className="opacity-30" vectorEffect="non-scaling-stroke" />
            );
        }
        return elements;
    }, []);

    return (
        <svg viewBox="0 0 100 100" className={className} style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 0.1 }}>
            {paths}
        </svg>
    );
};

const DenseWireframeCone = ({ className }: { className?: string }) => {
    // Generate Cone Grid Paths - HYPER DENSITY
    const paths = useMemo(() => {
        const elements = [];
        // Vertical Meridians
        for (let i = 0; i < 40; i++) { // Increased 20 -> 40
            const xBase = 5 + (i * 2.25); // Dense spread
            elements.push(
                <line key={`v-${i}`} x1="50" y1="5" x2={xBase} y2="95" className="opacity-30" vectorEffect="non-scaling-stroke" />
            );
        }
        // Horizontal Parallels
        for (let j = 0; j < 30; j++) { // Increased 15 -> 30
            const y = 95 - (j * 3);
            const width = 45 * (y / 95);
            const height = 12 * (y / 95);
            elements.push(
                <ellipse key={`h-${j}`} cx="50" cy={y} rx={width} ry={height} className="opacity-40" vectorEffect="non-scaling-stroke" />
            );
        }
        return elements;
    }, []);

    return (
        <svg viewBox="0 0 100 100" className={className} style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 0.15 }}>
            {paths}
        </svg>
    );
};

const DenseWireframeIcosa = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 0.2 }}>
        {/* Outer Hexagon */}
        <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" className="opacity-60" />
        {/* Lattice Pattern filled in */}
        {[...Array(10)].map((_, i) => (
            <line key={`l1-${i}`} x1={5 + i * 5} y1="27.5" x2={50 + i * 5} y2="5" className="opacity-20" />
        ))}
        {/* Inner Connections (Triangulation) */}
        <line x1="50" y1="5" x2="50" y2="50" className="opacity-40" />
        <line x1="95" y1="27.5" x2="50" y2="50" className="opacity-40" />
        <line x1="95" y1="72.5" x2="50" y2="50" className="opacity-40" />
        <line x1="50" y1="95" x2="50" y2="50" className="opacity-40" />
        <line x1="5" y1="72.5" x2="50" y2="50" className="opacity-40" />
        <line x1="5" y1="27.5" x2="50" y2="50" className="opacity-40" />
        {/* Cross connections */}
        <line x1="27.5" y1="16" x2="72.5" y2="84" className="opacity-20" />
        <line x1="72.5" y1="16" x2="27.5" y2="84" className="opacity-20" />
        {/* More internal details */}
        <circle cx="50" cy="50" r="20" className="opacity-10" />
        <circle cx="50" cy="50" r="10" className="opacity-10" />
    </svg>
);

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
        "w-[70vw] h-[70vw] md:w-[28vw] md:h-[28vw] absolute left-[50%] top-[45%] md:top-[50%] -translate-x-1/2 -translate-y-1/2 z-20",
        "w-[60vw] h-[60vw] md:w-[26vw] md:h-[26vw] absolute left-[40%] top-[43%] md:top-[48%] -translate-x-1/2 -translate-y-1/2 z-10",
        "w-[75vw] h-[75vw] md:w-[30vw] md:h-[30vw] absolute left-[60%] top-[47%] md:top-[52%] -translate-x-1/2 -translate-y-1/2 z-30"
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
            {/* --- 1. COMPLEX SATELLITE SYSTEM (Layered Wireframes) --- */}
            {!isBackgroundMode && (
                <>
                    {/* Element A: Big Wireframe Ring (Dense Torus) */}
                    <motion.div
                        style={{ rotate: rotate, y: debrisY_Slow }}
                        className="absolute inset-[-40%] z-0 text-white mix-blend-plus-lighter"
                    >
                        <DenseWireframeTorus className="w-full h-full" />
                    </motion.div>

                    {/* Element B: Floating Geometric (Dense Cone/Icosa) */}
                    <motion.div
                        style={{ y: debrisY_Fast, x: 100, rotate: rotateReverse }}
                        className="absolute -right-32 top-0 w-48 h-48 md:w-64 md:h-64 z-0 text-cyan-200 mix-blend-screen"
                    >
                        {index % 2 === 0 ? <DenseWireframeCone className="w-full h-full" /> : <DenseWireframeIcosa className="w-full h-full" />}
                    </motion.div>

                    {/* Element C: Small Satellite - Counter movement */}
                    <motion.div
                        style={{ y: debrisY_Reverse, x: -80 }}
                        className="absolute -left-10 bottom-10 w-24 h-24 md:w-32 md:h-32 z-30 text-purple-300 blend-screen"
                    >
                        <DenseWireframeIcosa className="w-full h-full" />
                    </motion.div>
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

    // Physics tuned for "Buttery Smooth" feel
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 40, damping: 40, mass: 1.2, restDelta: 0.0001
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
                    <div key={idx} className="absolute inset-0 w-full h-full pointer-events-none z-20 mix-blend-screen">
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
                <div className={`w-full h-[40vh] lg:h-full flex flex-col px-6 md:px-12 relative z-10 lg:w-1/2 justify-end lg:justify-center pb-8 lg:pb-0`}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0, delay: 0.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className={`relative z-30 pointer-events-none ${isBackgroundMode ? 'text-white' : ''} max-w-xl lg:max-w-none`}
                    >
                        <div
                            className={`
                                ${isBackgroundMode ? "[&_*]:text-white! [&_p]:text-white/90!" : ""}
                                [&_p.text-5xl]:bg-gradient-to-b [&_p.text-5xl]:from-white [&_p.text-5xl]:to-white/20 [&_p.text-5xl]:text-transparent [&_p.text-5xl]:bg-clip-text
                                [&_p.text-5xl]:text-4xl [&_p.text-5xl]:md:text-7xl [&_p.text-5xl]:lg:text-9xl
                            `}
                            dangerouslySetInnerHTML={{ __html: data.sticky_content }}
                        />
                    </motion.div>
                </div>

                {/* Right Column - Sliding Values */}
                <div className={`w-full h-[60vh] lg:h-full pointer-events-none lg:w-1/2 flex flex-col pt-0 px-6 md:px-12 relative z-10 justify-start lg:justify-center`}>
                    <div className="relative w-full h-full flex items-center">
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
