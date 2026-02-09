export type BlockType =
    | 'hero'
    | 'sticky_split'
    | 'grid_gallery'
    | 'horizontal_gallery'
    | 'interactive_visual'
    | 'stacking_cards'
    | 'service_accordion'
    // Project Specific Blocks
    | 'project_intro'
    | 'text_section'
    | 'image_grid'
    | 'comparison_slider'
    | 'project_specs';

export interface BlockData {
    [key: string]: any;
}

export interface ContentBlock {
    id: string;
    type: BlockType;
    data: BlockData;
}

// ... (existing interfaces)

export interface ProjectIntroBlockData extends BlockData {
    title: string;
    description: string;
    client?: string;
    year?: string;
    category?: string;
    role?: string;
}

export interface TextSectionBlockData extends BlockData {
    title?: string;
    content: string; // Markdown or HTML
    alignment?: 'left' | 'center' | 'right';
}

export interface ImageGridBlockData extends BlockData {
    layout: 'grid' | 'masonry' | 'carousel' | 'full';
    images: {
        src: string;
        alt?: string;
        caption?: string;
    }[];
}

export interface ComparisonSliderBlockData extends BlockData {
    before: string;
    after: string;
    label_before?: string;
    label_after?: string;
}

export interface ProjectSpecsBlockData extends BlockData {
    specs: {
        label: string;
        value: string;
    }[];
}

// Specific Block Data Interfaces
export interface HeroBlockData extends BlockData {
    title: string;
    subtitle?: string;
    video_url?: string;
    image_url?: string;
}

export interface StickySplitBlockData extends BlockData {
    theme?: 'dark' | 'light';
    layout?: 'split' | 'background'; // New layout mode
    containerMode?: 'sticky' | 'relative';
    sticky_content: string; // Markdown or HTML
    values_list?: {
        title: string;
        subtitle: string;
        description: string;
    }[];
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
        link?: string;
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

export interface StackingCardsBlockData extends BlockData {
    title: string;
    description: string;
    cards: {
        title: string;
        subtitle: string;
        description: string;
        src: string; // Image URL
    }[];
}

export interface ServiceAccordionBlockData extends BlockData {
    title: string;
    subtitle: string;
    services: {
        id: string;
        title: string;
        description: string;
        src: string; // Hover Image
    }[];
}
