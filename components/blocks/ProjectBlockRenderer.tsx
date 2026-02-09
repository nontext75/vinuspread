'use client';

import React from 'react';
import { ContentBlock } from '@/types/blocks';
import ProjectIntroBlock from './project/ProjectIntroBlock';
import TextSectionBlock from './project/TextSectionBlock';
import ImageGridBlock from './project/ImageGridBlock';
import ComparisonSliderBlock from './project/ComparisonSliderBlock';
import ProjectSpecsBlock from './project/ProjectSpecsBlock';

interface ProjectBlockRendererProps {
    blocks: ContentBlock[];
}

const ProjectBlockRenderer: React.FC<ProjectBlockRendererProps> = ({ blocks }) => {
    if (!blocks || !Array.isArray(blocks)) return null;

    return (
        <div className="flex flex-col w-full">
            {blocks.map((block) => {
                switch (block.type) {
                    case 'project_intro':
                        return <ProjectIntroBlock key={block.id} data={block.data as any} />;
                    case 'text_section':
                        return <TextSectionBlock key={block.id} data={block.data as any} />;
                    case 'image_grid':
                        return <ImageGridBlock key={block.id} data={block.data as any} />;
                    case 'comparison_slider':
                        return <ComparisonSliderBlock key={block.id} data={block.data as any} />;
                    case 'project_specs':
                        return <ProjectSpecsBlock key={block.id} data={block.data as any} />;
                    default:
                        // Fallback to generic block renderer or message
                        return (
                            <div key={block.id} className="py-8 opacity-40 border-t border-white/5 text-[10px] uppercase tracking-widest text-center">
                                Custom Block: {block.type}
                            </div>
                        );
                }
            })}
        </div>
    );
};

export default ProjectBlockRenderer;
