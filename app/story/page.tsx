'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, PenTool } from 'lucide-react';
import LevitatingObject from '@/components/ui/LevitatingObject';

import { createClient } from '@/lib/supabase/client';
import { Database } from '@/types/database';
import { useEffect, useState } from 'react';

type Story = Database['public']['Tables']['stories']['Row'];

export default function StoryPage() {
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchStories = async () => {
            const { data, error } = await supabase
                .from('stories')
                .select('*')
                .eq('status', 'published')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching stories:', error);
            } else {
                setStories(data || []);
            }
            setLoading(false);
        };

        fetchStories();
    }, []);
    return (
        <main className="bg-black min-h-screen text-white pt-32 pb-20">
            {/* Page Header */}
            <section className="px-6 md:px-12 mb-20 relative">
                <div className="flex justify-between items-end mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-7xl md:text-9xl font-black tracking-tighter"
                    >
                        STORY
                    </motion.h1>

                    {/* Write Button (For Admin/User) */}
                    <Link href="/story/write">
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="hidden md:flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors"
                        >
                            <PenTool size={18} />
                            <span className="text-sm font-bold uppercase tracking-widest">Write Story</span>
                        </motion.button>
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full h-[1px] bg-white/20"
                />
            </section>

            {/* Story Grid */}
            <section className="px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                    {stories.map((story, idx) => (
                        <Link key={story.id} href={`/story/${story.id}`} className="block group">
                            <motion.article
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.8, delay: idx * 0.1 }}
                            >
                                <LevitatingObject className="h-full">
                                    {/* Image */}
                                    <div className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-900 mb-8">
                                        <img
                                            src={story.image?.startsWith('http://vinus.co.kr')
                                                ? `/api/proxy-image?url=${encodeURIComponent(story.image)}`
                                                : (story.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000')}
                                            alt={story.title}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                                        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full">
                                            <span className="text-xs font-mono font-bold text-white">{story.category}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col gap-4">
                                        <div className="flex justify-between items-baseline border-b border-white/10 pb-4 group-hover:border-white/50 transition-colors">
                                            <span className="text-sm font-mono text-gray-500">
                                                {new Date(story.created_at).toLocaleDateString()}
                                            </span>
                                            <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </div>

                                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight group-hover:text-gray-300 transition-colors">
                                            {story.title}
                                        </h2>

                                        <p className="text-gray-400 font-light leading-relaxed line-clamp-2">
                                            {story.excerpt}
                                        </p>
                                    </div>
                                </LevitatingObject>
                            </motion.article>
                        </Link>
                    ))}
                    {loading && (
                        <div className="col-span-1 md:col-span-2 text-center py-20 text-gray-500 font-mono animate-pulse">
                            Loading stories...
                        </div>
                    )}
                    {!loading && stories.length === 0 && (
                        <div className="col-span-1 md:col-span-2 text-center py-20 text-gray-500 font-mono">
                            No stories found.
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
