'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ProjectSpecsBlockData } from '@/types/blocks';

interface ProjectSpecsBlockProps {
    data: ProjectSpecsBlockData;
}

const ProjectSpecsBlock: React.FC<ProjectSpecsBlockProps> = ({ data }) => {
    return (
        <section className="py-24 border-t border-b border-white/5 bg-zinc-950/50">
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
                    {data.specs.map((spec, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="space-y-2"
                        >
                            <h5 className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.3em]">{spec.label}</h5>
                            <p className="text-sm font-medium tracking-tight text-zinc-300 uppercase">{spec.value}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectSpecsBlock;
