import React from 'react';
import { ContentBlock } from '@/types/blocks';
import HeroBlock from '@/components/blocks/HeroBlock';
import StickySplitBlock from '@/components/blocks/StickySplitBlock';
import GridGalleryBlock from '@/components/blocks/GridGalleryBlock';
import HorizontalGalleryBlock from '@/components/blocks/HorizontalGalleryBlock';
import InteractiveVisualBlock from '@/components/visuals/InteractiveVisualBlock';
import StackingCardsBlock from '@/components/blocks/StackingCardsBlock';
import ServiceAccordionBlock from '@/components/blocks/ServiceAccordionBlock';

interface BlockRendererProps {
    blocks: ContentBlock[];
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
    if (!blocks || !Array.isArray(blocks)) return null;

    return (
        <div className="flex flex-col w-full">
            {blocks.map((block) => {
                switch (block.type) {
                    case 'hero':
                        return <HeroBlock key={block.id} data={block.data as any} />;
                    case 'sticky_split':
                        return <StickySplitBlock key={block.id} data={block.data as any} />;
                    case 'grid_gallery':
                        return <GridGalleryBlock key={block.id} data={block.data as any} />;
                    case 'horizontal_gallery':
                        return <HorizontalGalleryBlock key={block.id} data={block.data as any} />;
                    case 'interactive_visual':
                        return <InteractiveVisualBlock key={block.id} data={block.data as any} />;
                    case 'stacking_cards':
                        return <StackingCardsBlock key={block.id} data={block.data as any} />;
                    case 'service_accordion':
                        return <ServiceAccordionBlock key={block.id} data={block.data as any} />;
                    default:
                        console.warn(`Unknown block type: ${block.type}`);
                        return (
                            <div className="p-4 border-2 border-dashed border-red-500 text-red-500 m-4 rounded">
                                Unknown block type: {block.type}
                            </div>
                        );
                }
            })}
        </div>
    );
};

export default BlockRenderer;
