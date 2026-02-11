export interface LabItem {
    id: string;
    title: string;
    category: string;
    type: 'download' | 'video' | 'experiment';
    size: 'small' | 'wide' | 'large';
    thumbnail: string;
    videoUrl?: string;
    description: string;
    stats: {
        download: number;
        like: number;
        talk: number;
    };
    created_at: string;
}

export const LAB_ITEMS: LabItem[] = [
    {
        id: 'lab-exp-1',
        title: 'FLUID SIMULATION',
        category: 'experiment',
        type: 'experiment',
        size: 'large',
        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000',
        videoUrl: 'https://cdn.pixabay.com/video/2023/02/09/149952-797587127_large.mp4',
        description: 'Interactive fluid dynamics simulation using WebGL. Responds to mouse movement and clicks.',
        stats: { download: 120, like: 850, talk: 45 },
        created_at: new Date().toISOString()
    },
    {
        id: 'lab-dl-1',
        title: 'ECLIPSE WATCH FACE',
        category: 'watchface',
        type: 'download',
        size: 'small',
        thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000',
        description: 'Minimalist dark mode watch face for Galaxy Watch & Pixel Watch. Battery efficient OLED friendly design.',
        stats: { download: 1242, like: 350, talk: 42 },
        created_at: new Date().toISOString()
    },
    {
        id: 'lab-vid-1',
        title: 'KINETIC TYPOGRAPHY',
        category: 'video',
        type: 'video',
        size: 'wide',
        thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000',
        videoUrl: 'https://cdn.pixabay.com/video/2020/09/16/49969-460677840_large.mp4',
        description: 'Motion graphic study exploring kinetic typography techniques using After Effects and GSAP.',
        stats: { download: 45, like: 210, talk: 12 },
        created_at: new Date().toISOString()
    },
    {
        id: 'lab-icn-1',
        title: 'NEON ICONS',
        category: 'icons',
        type: 'download',
        size: 'small',
        thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
        description: 'Cyberpunk aesthetic system icons for Windows & macOS. Includes 150+ vector icons.',
        stats: { download: 890, like: 210, talk: 15 },
        created_at: new Date().toISOString()
    },
    {
        id: 'lab-exp-2',
        title: 'GLITCH TEXT EFFECT',
        category: 'experiment',
        type: 'experiment',
        size: 'wide',
        thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000',
        description: 'Pure CSS glitch effect implementation. No JavaScript required, lightweight and performant.',
        stats: { download: 340, like: 520, talk: 28 },
        created_at: new Date().toISOString()
    },
    {
        id: 'lab-dl-2',
        title: 'CHRONO DIAL',
        category: 'watchface',
        type: 'download',
        size: 'small',
        thumbnail: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=1000',
        description: 'Luxury analog style digital watch face with customizable complications.',
        stats: { download: 1800, like: 420, talk: 55 },
        created_at: new Date().toISOString()
    }
];
