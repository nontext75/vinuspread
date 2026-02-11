'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';
import ProjectHero from '@/components/blocks/project/ProjectHero'; // Using ProjectHero for consistency
import ProjectPagination from '@/components/blocks/project/ProjectPagination';

export default function LabDetailPage() {
    const { id } = useParams();
    const [item, setItem] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const fetchItem = async () => {
            if (!id) return;
            const queryId = Array.isArray(id) ? id[0] : id;

            // Check if it's a mock ID
            if (queryId.startsWith('mock-')) {
                const MOCK_DB = [
                    {
                        id: 'mock-1',
                        title: 'ECLIPSE WATCH FACE',
                        category: 'watchface',
                        thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000',
                        description: 'Minimalist dark mode watch face for Galaxy Watch & Pixel Watch. Features battery saving mode and customizable accent colors. Inspired by the total solar eclipse.',
                        download_count: 1242,
                        like_count: 350,
                        talk_count: 42,
                        created_at: new Date().toISOString()
                    },
                    {
                        id: 'mock-2',
                        title: 'NEON ICONS PACK',
                        category: 'icons',
                        thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
                        description: 'Cyberpunk aesthetic system icons for Windows & macOS. Includes over 150+ custom icons for popular applications and system folders.',
                        download_count: 890,
                        like_count: 210,
                        talk_count: 15,
                        created_at: new Date().toISOString()
                    },
                    {
                        id: 'mock-3',
                        title: '3D EMOTICON SET',
                        category: 'emoticon',
                        thumbnail: 'https://images.unsplash.com/photo-1534644107580-3a4dbd494a95?auto=format&fit=crop&q=80&w=1000',
                        description: 'High-gloss 3D rendered emoticons for social apps. Perfect for discord stickers or custom slack emojis.',
                        download_count: 3200,
                        like_count: 850,
                        talk_count: 120,
                        created_at: new Date().toISOString()
                    },
                    {
                        id: 'mock-4',
                        title: 'RETRO OS THEME',
                        category: 'etc',
                        thumbnail: 'https://images.unsplash.com/photo-1614741118881-1e42ea2401d2?auto=format&fit=crop&q=80&w=1000',
                        description: 'Windows 95 style retro theme for modern web dashboards. Brings back the nostalgia of gray bevels and pixel fonts.',
                        download_count: 560,
                        like_count: 130,
                        talk_count: 8,
                        created_at: new Date().toISOString()
                    },
                    {
                        id: 'mock-5',
                        title: 'CHRONO DIAL',
                        category: 'watchface',
                        thumbnail: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=1000',
                        description: 'Luxury analog style digital watch face. High contrast markers and deep blue chronograph aesthetic.',
                        download_count: 1800,
                        like_count: 420,
                        talk_count: 55,
                        created_at: new Date().toISOString()
                    },
                    {
                        id: 'mock-6',
                        title: 'GLAMPING ICON SET',
                        category: 'icons',
                        thumbnail: 'https://images.unsplash.com/photo-1504280506541-aca1cd12e211?auto=format&fit=crop&q=80&w=1000',
                        description: 'Outdoor and camping vector icons line pack. Clean monoline style suitable for travel apps and map interfaces.',
                        download_count: 450,
                        like_count: 90,
                        talk_count: 12,
                        created_at: new Date().toISOString()
                    },
                    {
                        id: 'mock-7',
                        title: 'FUTURE UI KIT',
                        category: 'etc',
                        thumbnail: 'https://images.unsplash.com/photo-1481487484168-9b930d55208d?auto=format&fit=crop&q=80&w=1000',
                        description: 'Generative design UI components for React. Includes abstract shapes, gradients, and futuristic layout patterns.',
                        download_count: 2100,
                        like_count: 560,
                        talk_count: 89,
                        created_at: new Date().toISOString()
                    },
                    {
                        id: 'mock-8',
                        title: 'GLASS MORPHISM',
                        category: 'icons',
                        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000',
                        description: 'Frosted glass effect icon pack. Semi-transparent layers with blur effects for a modern OS look.',
                        download_count: 1560,
                        like_count: 340,
                        talk_count: 22,
                        created_at: new Date().toISOString()
                    },
                    {
                        id: 'mock-9',
                        title: 'PIXEL ART AVATARS',
                        category: 'emoticon',
                        thumbnail: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1000',
                        description: 'Generated pixel art avatars for profiles. Diverse characters with retro 8-bit aesthetic.',
                        download_count: 980,
                        like_count: 230,
                        talk_count: 45,
                        created_at: new Date().toISOString()
                    }
                ];
                setItem(MOCK_DB.find(i => i.id === queryId));
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('lab_items')
                .select('*')
                .eq('id', queryId)
                .single();

            if (error) {
                console.error('Error fetching lab item:', error);
            } else {
                setItem(data);
            }
            setLoading(false);
        };

        fetchItem();
    }, [id]);

    const getImageUrl = (url: any) => {
        if (!url) return '/placeholder-lab-detail.jpg';
        if (typeof url === 'string') return url;
        if (url.url) return url.url;
        return '/placeholder-lab-detail.jpg';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono uppercase tracking-[0.2em] text-xs">
                <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    Loading Asset...
                </motion.span>
            </div>
        );
    }

    if (!item) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Item not found</div>;

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-zinc-800 selection:text-white">

            {/* 1. Reuse ProjectHero for consistent header */}
            <ProjectHero
                title={item.title}
                category={`LAB / ${item.category || 'Asset'}`}
                className="bg-black text-white"
                backgroundImage={getImageUrl(item.detail_image || item.thumbnail)}
            />

            <div className="max-w-[1720px] mx-auto px-6 md:px-12 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                    {/* Left: Visual */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="lg:col-span-8"
                    >
                        <div className="relative w-full aspect-square md:aspect-video bg-zinc-900 rounded-sm border border-white/10 overflow-hidden">
                            <Image
                                src={getImageUrl(item.detail_image || item.thumbnail)}
                                alt={item.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Right: Info & Actions */}
                    <div className="lg:col-span-4 sticky top-32 self-start">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-xs font-mono text-zinc-500 mb-8 border-b border-white/10 pb-4 uppercase tracking-widest">
                                Asset Information
                            </h2>

                            <div className="space-y-8 mb-12">
                                <div>
                                    <span className="block text-xs uppercase text-zinc-500 mb-2">Description</span>
                                    <p className="text-lg font-light leading-relaxed text-zinc-300">
                                        {item.description || "No description provided."}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="block text-xs uppercase text-zinc-500 mb-1">Downloads</span>
                                        <span className="text-xl font-mono">{item.download_count || 0}</span>
                                    </div>
                                    <div>
                                        <span className="block text-xs uppercase text-zinc-500 mb-1">Likes</span>
                                        <span className="text-xl font-mono">{item.like_count || 0}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <a
                                    href={item.download_url || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-white text-black py-5 uppercase font-bold tracking-widest text-xs hover:bg-zinc-200 transition-colors flex items-center justify-center gap-3"
                                >
                                    <Download className="w-4 h-4" />
                                    Download Asset
                                </a>

                                <div className="grid grid-cols-2 gap-4">
                                    <button className="py-5 border border-white/20 uppercase font-bold tracking-widest text-xs hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                                        <Heart className="w-4 h-4" />
                                        Like
                                    </button>
                                    <button className="py-5 border border-white/20 uppercase font-bold tracking-widest text-xs hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                                        <Share2 className="w-4 h-4" />
                                        Share
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Usage / License Info (Optional aesthetic divider) */}
            <div className="max-w-[1720px] mx-auto px-6 md:px-12 py-20 border-t border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">License & Usage</h3>
                        <p className="text-zinc-500 font-light leading-relaxed">
                            This asset is provided for personal and commercial use.
                            Redistribution or resale of the source files is strictly prohibited.
                            Please credit Vinuspread when using in public projects.
                        </p>
                    </div>
                </div>
            </div>

            <ProjectPagination
                className="border-none bg-zinc-950"
                prev={null}
                next={null}
                archiveHref="/lab"
            />
        </div>
    );
}
