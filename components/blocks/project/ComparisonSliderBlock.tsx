'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ComparisonSliderBlockData } from '@/types/blocks';

interface ComparisonSliderBlockProps {
    data: ComparisonSliderBlockData;
}

const ComparisonSliderBlock: React.FC<ComparisonSliderBlockProps> = ({ data }) => {
    const [position, setPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = 'touches' in e
            ? e.touches[0].clientX - rect.left
            : (e as React.MouseEvent).clientX - rect.left;

        const newPosition = (x / rect.width) * 100;
        setPosition(Math.max(0, Math.min(100, newPosition)));
    };

    return (
        <section className="py-24">
            <div
                ref={containerRef}
                className="relative aspect-video w-full overflow-hidden bg-zinc-900 border border-white/5 cursor-col-resize select-none"
                onMouseMove={handleMove}
                onTouchMove={handleMove}
            >
                {/* After Image (Base) */}
                <img src={data.after} alt="After" className="absolute inset-0 w-full h-full object-cover" />

                {/* Before Image (Top, Clipped) */}
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
                >
                    <img src={data.before} alt="Before" className="w-full h-full object-cover" />
                </div>

                {/* Slider Handle */}
                <div
                    className="absolute top-0 bottom-0 w-[1px] bg-white z-10"
                    style={{ left: `${position}%` }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white bg-black/50 backdrop-blur-md flex items-center justify-center">
                        <div className="flex gap-1">
                            <div className="w-[1px] h-3 bg-white/50" />
                            <div className="w-[1px] h-3 bg-white/50" />
                        </div>
                    </div>
                </div>

                {/* Labels */}
                <div className="absolute bottom-6 left-6 z-20 px-3 py-1 bg-black/40 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest pointer-events-none">
                    {data.label_before || 'Before'}
                </div>
                <div className="absolute bottom-6 right-6 z-20 px-3 py-1 bg-black/40 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest pointer-events-none">
                    {data.label_after || 'After'}
                </div>
            </div>
        </section>
    );
};

export default ComparisonSliderBlock;
