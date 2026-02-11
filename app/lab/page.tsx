'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import LabItemCard from '@/components/lab/LabItemCard';

const CATEGORIES = [
    { label: 'ALL', value: 'all' },
    { label: 'WATCH FACE', value: 'watchface' },
    { label: 'EMOTICON', value: 'emoticon' },
    { label: 'ICONS', value: 'icons' },
    { label: 'ETC', value: 'etc' },
];

export default function LabPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const supabase = createClient();

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            let query = supabase.from('lab_items').select('*');

            if (activeCategory !== 'all') {
                query = query.eq('category', activeCategory as any);
            }

            const { data, error } = await query;

            if (error || !data || data.length === 0) {
                console.log('Using Mock Data for LAB');
                // FALLBACK MOCK DATA - Expanded for full grid look
                const MOCK_ITEMS = [
                    {
                        id: 'mock-1',
                        title: 'ECLIPSE WATCH FACE',
                        category: 'watchface',
                        thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000',
                        description: 'Minimalist dark mode watch face for Galaxy Watch & Pixel Watch.',
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
                        description: 'Cyberpunk aesthetic system icons for Windows & macOS.',
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
                        description: 'High-gloss 3D rendered emoticons for social apps.',
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
                        description: 'Windows 95 style retro theme for modern web dashboards.',
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
                        description: 'Luxury analog style digital watch face.',
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
                        description: 'Outdoor and camping vector icons line pack.',
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
                        description: 'Generative design UI components for React.',
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
                        description: 'Frosted glass effect icon pack.',
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
                        description: 'Generated pixel art avatars for profiles.',
                        download_count: 980,
                        like_count: 230,
                        talk_count: 45,
                        created_at: new Date().toISOString()
                    }
                ];

                if (activeCategory === 'all') {
                    setItems(MOCK_ITEMS);
                } else {
                    setItems(MOCK_ITEMS.filter(item => item.category === activeCategory));
                }
            } else {
                setItems(data || []);
            }
            setLoading(false);
        };

        fetchItems();
    }, [activeCategory]);

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="bg-black min-h-screen text-white pt-48 pb-20">
            {/* Page Header */}
            <section className="px-6 md:px-12 mb-20">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-8xl md:text-[140px] font-black tracking-tighter mb-8 leading-[0.8] uppercase"
                >
                    LAB
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full h-[1px] bg-white/20 mb-12"
                />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap gap-4 md:gap-8"
                    >
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.value}
                                onClick={() => setActiveCategory(cat.value)}
                                className={`
                                    text-sm md:text-base font-bold tracking-widest uppercase py-2 px-1 relative transition-colors duration-300
                                    ${activeCategory === cat.value ? 'text-white' : 'text-zinc-600 hover:text-white'}
                                `}
                            >
                                {cat.label}
                                {activeCategory === cat.value && (
                                    <motion.div
                                        layoutId="activeCategory"
                                        className="absolute bottom-0 left-0 w-full h-[2px] bg-white"
                                    />
                                )}
                            </button>
                        ))}
                    </motion.div>

                    {/* Minimal Search */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="relative w-full md:w-64"
                    >
                        <input
                            type="text"
                            placeholder="SEARCH REFERENCE"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-sm font-mono uppercase focus:outline-none focus:border-white transition-colors placeholder:text-zinc-700"
                        />
                        <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                    </motion.div>
                </div>
            </section>

            {/* Grid */}
            <section className="px-6 md:px-12 w-full max-w-[1920px] mx-auto min-h-[50vh]">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24 animate-pulse">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="aspect-[4/3] bg-zinc-900 border border-white/5" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
                        {filteredItems.map((item, index) => (
                            <LabItemCard key={item.id} item={item} index={index} />
                        ))}

                        {filteredItems.length === 0 && !loading && (
                            <div className="col-span-full py-20 text-center text-zinc-600 font-mono text-sm uppercase tracking-widest">
                                No Assets Found.
                            </div>
                        )}
                    </div>
                )}
            </section>
        </main>
    );
}
