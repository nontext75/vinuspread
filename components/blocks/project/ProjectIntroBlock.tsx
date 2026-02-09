'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ProjectIntroBlockData } from '@/types/blocks';

interface ProjectIntroBlockProps {
    data: ProjectIntroBlockData;
}

const ProjectIntroBlock: React.FC<ProjectIntroBlockProps> = ({ data }) => {
    return (
        <section className="py-24 border-b border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                >
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em]">Client / Project</h4>
                    <p className="text-xl md:text-2xl font-bold tracking-tight uppercase leading-tight">{data.client || data.title}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="space-y-4"
                >
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em]">Service</h4>
                    <p className="text-xl md:text-2xl font-bold tracking-tight uppercase leading-tight">{data.category || 'Digital'} Experience</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                >
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em]">Year</h4>
                    <p className="text-xl md:text-2xl font-bold tracking-tight uppercase leading-tight font-mono">{data.year || '2024'}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                >
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em]">Role</h4>
                    <p className="text-xl md:text-2xl font-bold tracking-tight uppercase leading-tight">{data.role || 'Design & Development'}</p>
                </motion.div>
            </div>

            {data.description && (
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="mt-20 text-2xl md:text-4xl text-zinc-400 font-light leading-snug max-w-4xl"
                >
                    {data.description}
                </motion.p>
            )}
        </section>
    );
};

export default ProjectIntroBlock;
