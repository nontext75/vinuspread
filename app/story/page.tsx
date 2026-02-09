'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, PenTool, Plus, ArrowRight } from 'lucide-react';

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
        <main className="bg-black min-h-screen text-white pt-48 pb-20 relative overflow-hidden">
            {/* Background Grain/Texture */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Page Header - Synchronized with WORK page */}
            <section className="px-6 md:px-12 mb-20 relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-7xl md:text-9xl font-black tracking-tighter mb-8"
                >
                    STORY
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full h-[1px] bg-white/20"
                />
            </section>

            {/* Story List - Minimalist Horizontal Layout */}
            <section className="px-6 md:px-12 relative z-10 w-full max-w-[1920px] mx-auto min-h-[50vh]">
                <div className="flex flex-col border-t border-white/5">
                    {stories.map((story, idx) => (
                        <Link key={story.id} href={`/story/${story.id}`} className="block group">
                            <motion.article
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.05 }}
                                className="flex flex-col md:flex-row md:items-center justify-between py-12 md:py-16 border-b border-white/10 group-hover:border-white/40 transition-all duration-500"
                            >
                                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                                    <span className="text-[10px] font-mono text-zinc-600 block order-2 md:order-1 tracking-widest uppercase">
                                        [{String(idx + 1).padStart(2, '0')}] — {new Date(story.created_at).getFullYear()}
                                    </span>
                                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase group-hover:translate-x-4 transition-transform duration-500 order-1 md:order-2">
                                        {story.title}
                                    </h2>
                                </div>

                                <div className="flex items-center justify-between md:justify-end gap-12 mt-8 md:mt-0">
                                    <div className="hidden lg:block max-w-sm">
                                        <p className="text-zinc-500 font-light text-sm line-clamp-1 italic">
                                            {story.excerpt}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className="px-2 py-0.5 border border-white/20 text-[9px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors duration-300 rounded-full">
                                            {story.category || 'INSIGHT'}
                                        </span>
                                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                            <ArrowUpRight size={20} />
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        </Link>
                    ))}

                    {loading && (
                        <div className="py-20 text-center text-zinc-500 font-mono text-xs tracking-widest animate-pulse">
                            COLLECTING ARCHIVES...
                        </div>
                    )}

                    {!loading && stories.length === 0 && (
                        <div className="py-20 text-center text-zinc-700 border border-white/5 border-dashed rounded-lg mt-12">
                            <span className="text-xs uppercase tracking-[0.5em] font-bold">No stories found in the vault</span>
                        </div>
                    )}
                </div>
            </section>

            <div className="h-40" />
        </main>
    );
}
