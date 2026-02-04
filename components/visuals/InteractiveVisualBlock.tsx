"use client";

import React from 'react';
import { InteractiveVisualBlockData } from '@/types/blocks';
import GeometricBackground from './GeometricBackground';
import { cn } from '@/lib/utils'; // Import cn

interface InteractiveVisualBlockProps {
    data: InteractiveVisualBlockData;
}

const InteractiveVisualBlock: React.FC<InteractiveVisualBlockProps> = ({ data }) => {
    const [visualMode, setVisualMode] = React.useState<'galaxy' | 'orbit'>('galaxy');

    return (
        <section className="relative w-full h-[600px] bg-slate-950 overflow-hidden my-10 border-y border-white/10 group">
            <GeometricBackground mode={visualMode} />

            {/* Visual Toggle Button */}
            <button
                onClick={() => setVisualMode(prev => prev === 'galaxy' ? 'orbit' : 'galaxy')}
                className="absolute bottom-6 right-6 md:right-12 z-20 flex items-center gap-2 px-4 py-2 text-[10px] font-bold tracking-widest uppercase text-white/50 hover:text-white border border-white/10 hover:border-white/40 rounded-full transition-all duration-300 backdrop-blur-md hover:bg-white/5"
            >
                <span className={cn("w-2 h-2 rounded-full transition-colors", visualMode === 'galaxy' ? "bg-primary" : "bg-white/20")} />
                {visualMode === 'galaxy' ? 'Switch to Orbit' : 'Switch to Sphere'}
            </button>
        </section>
    );
};

export default InteractiveVisualBlock;
