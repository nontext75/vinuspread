"use client";

import React, { useRef } from 'react';
import { StackingCardsBlockData } from '@/types/blocks';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface StackingCardsBlockProps {
    data: StackingCardsBlockData;
}

const Card = ({
    i,
    card,
    progress,
    range,
    targetScale
}: {
    i: number;
    card: StackingCardsBlockData['cards'][0];
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
}) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
            <motion.div
                style={{
                    scale,
                    top: `calc(-5vh + ${i * 25}px)`
                }}
                className="flex flex-col relative -top-[25%] h-[500px] w-full max-w-5xl rounded-[32px] p-10 origin-top border border-white/10 bg-[#0a0a0a] overflow-hidden"
            >
                <div className="flex h-full gap-12 group">
                    <div className="w-[40%] flex flex-col justify-between z-10">
                        <div>
                            <span className="text-xl font-medium text-muted-foreground mb-2 block tracking-wider uppercase">0{i + 1}</span>
                            <h2 className="text-5xl font-bold tracking-tight mb-4">{card.title}</h2>
                            <p className="text-2xl text-muted-foreground font-light">{card.subtitle}</p>
                        </div>
                        <p className="text-lg leading-relaxed text-gray-400 font-light border-l-2 border-primary/50 pl-6">
                            {card.description}
                        </p>
                    </div>

                    <div className="w-[60%] h-full rounded-2xl overflow-hidden relative">
                        <motion.div
                            className="w-full h-full"
                            style={{ scale: imageScale }}
                        >
                            <img
                                src={card.src}
                                alt={card.title}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const StackingCardsBlock: React.FC<StackingCardsBlockProps> = ({ data }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <section ref={container} className="relative bg-[#02040a]">
            {/* Intro Header */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-32">
                <h2 className="text-xl md:text-2xl font-bold mb-8 tracking-tighter text-muted-foreground">
                    {data.title}
                </h2>
                <div className="text-5xl md:text-7xl lg:text-8xl leading-none font-black tracking-tight text-white mb-12">
                    <span dangerouslySetInnerHTML={{ __html: data.description }} />
                </div>
            </div>

            {/* Cards */}
            <div className="mt-[-20vh] pb-[20vh]"> {/* Adjust overlap */}
                {data.cards.map((card, i) => {
                    const targetScale = 1 - (data.cards.length - i) * 0.05;
                    return (
                        <Card
                            key={i}
                            i={i}
                            card={card}
                            progress={scrollYProgress}
                            range={[i * 0.25, 1]}
                            targetScale={targetScale}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default StackingCardsBlock;
