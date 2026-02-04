export type BlockType = 'hero' | 'sticky_split' | 'grid_gallery' | 'horizontal_gallery' | 'interactive_visual';

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
        text?: string; // Legacy/Simple
        // Structured Bilingual Text
        title?: string;
        description_en?: string;
        description_ko?: string;
    }[];
}

export interface HorizontalGalleryBlockData extends BlockData {
    title: string;          // Section Title (e.g. PURPOSEFUL SPACES)
    view_all_link?: string;
    items: {
        src: string;
        alt: string;
        title: string;      // Project Title (e.g. GENESIS SPACE)
        category: string;   // Project Category (e.g. SPACE)
        year: string;       // Project Year (e.g. 2023)
    }[];
}

export interface GridGalleryBlockData extends BlockData {
    title?: string; // Section Title (e.g. PURPOSEFUL SPACES)
    view_all_link?: string;
    images: {
        src: string;
        alt: string;
        span?: number;
        // New Metadata for Reference Design
        title?: string;     // e.g. GENESIS SPACE
        category?: string;  // e.g. WEBSITE
        year?: string;      // e.g. 2023
    }[];
}

export interface InteractiveVisualBlockData extends BlockData {
    type: 'particles' | 'distortion' | 'wave';
}
