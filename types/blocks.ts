export type BlockType = 'hero' | 'sticky_split' | 'grid_gallery' | 'interactive_visual';

export interface BlockData {
    [key: string]: any;
}

export interface ContentBlock {
    id: string;
    type: BlockType;
    data: BlockData;
}

// Specific Block Data Interfaces
export interface HeroBlockData extends BlockData {
    title: string;
    subtitle?: string;
    video_url?: string;
    image_url?: string;
}

export interface StickySplitBlockData extends BlockData {
    sticky_content: string; // Markdown or HTML
    scroll_content: {
        type: 'image' | 'text' | 'video';
        src?: string;
        text?: string;
    }[];
}

export interface GridGalleryBlockData extends BlockData {
    images: {
        src: string;
        alt: string;
        span?: number; // Col span (1 or 2)
    }[];
}

export interface InteractiveVisualBlockData extends BlockData {
    type: 'particles' | 'distortion' | 'wave';
}
