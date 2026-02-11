'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TechCard {
    title: string;
    description: string;
    icon: LucideIcon;
}

interface ProjectTechSystemProps {
    title: string;
    subtitle: string;
    specs: { label: string; value: string }[];
    cards: TechCard[];
    className?: string;
}

const ProjectTechSystem: React.FC<ProjectTechSystemProps> = ({ title, subtitle, specs, cards, className }) => {
    return (
        <section className={cn("py-32 w-full", className)}>
            <div className="w-full">
                <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
                    <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-7xl md:text-9xl font-extrabold leading-tight tracking-tighter text-white uppercase"
                    >
                        {title.split(' ').map((word, i) => (
                            <React.Fragment key={i}>
                                {word}<br />
                            </React.Fragment>
                        ))}
                    </motion.h2>

                    <div className="flex flex-wrap gap-12 mt-4">
                        {specs.map((spec, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="border-l border-white/20 pl-6"
                            >
                                <span className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">{spec.label}</span>
                                <span className="block text-xl font-bold text-white uppercase">{spec.value}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/10">
                    {cards.map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="p-10 border-r border-b border-white/10 hover:bg-white/5 transition-colors duration-500 group"
                        >
                            <card.icon className="w-8 h-8 mb-8 text-white/40 group-hover:text-white transition-colors" />
                            <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">{card.title}</h3>
                            <p className="text-white/60 leading-relaxed text-sm">
                                {card.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectTechSystem;
