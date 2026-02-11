'use client';

import React from 'react';
import { ContentBlock } from '@/types/blocks';
import { MotionType, motionPresets } from '@/lib/motion';
import { motion } from 'framer-motion';
import ProjectIntroBlock from './project/ProjectIntroBlock';
import TextSectionBlock from './project/TextSectionBlock';
import ImageGridBlock from './project/ImageGridBlock';
import ComparisonSliderBlock from './project/ComparisonSliderBlock';
import ProjectSpecsBlock from './project/ProjectSpecsBlock';

interface ProjectBlockRendererProps {
    blocks: ContentBlock[];
    motionType?: MotionType;
}

const ProjectBlockRenderer: React.FC<ProjectBlockRendererProps> = ({ blocks, motionType = 'slide-up' }) => {
    if (!blocks || !Array.isArray(blocks)) return null;

    const motionVariant = motionPresets[motionType] || motionPresets['slide-up'];

    return (
        <div className="flex flex-col w-full">
            {blocks.map((block, idx) => {
                const content = (() => {
                    switch (block.type) {
                        case 'project_intro':
                            return <ProjectIntroBlock data={block.data as any} />;
                        case 'text_section':
                            return <TextSectionBlock data={block.data as any} />;
                        case 'image_grid':
                            return <ImageGridBlock data={block.data as any} />;
                        case 'comparison_slider':
                            return <ComparisonSliderBlock data={block.data as any} />;
                        case 'project_specs':
                            return <ProjectSpecsBlock data={block.data as any} />;
                        default:
                            return (
                                <div className="py-8 opacity-40 border-t border-white/5 text-[10px] uppercase tracking-widest text-center">
                                    Custom Block: {block.type}
                                </div>
                            );
                    }
                })();

                return (
                    <motion.div
                        key={block.id || idx}
                        variants={motionVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                    >
                        {content}
                    </motion.div>
                );
            })}
        </div>
    );
};

export default ProjectBlockRenderer;
