'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Database } from '@/types/database';

type Story = Database['public']['Tables']['stories']['Row'];

export default function StoryDetailPage() {
    const { id } = useParams();
    const [story, setStory] = useState<Story | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchStory = async () => {
            const storyId = Array.isArray(id) ? id[0] : id;
            if (!storyId) return;

            const { data, error } = await supabase
                .from('stories')
                .select('*')
                .eq('id', storyId)
                .single();

            if (error) {
                console.error('Error fetching story:', error);
            } else {
                setStory(data);
            }
            setLoading(false);
        };

        fetchStory();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white font-mono text-sm animate-pulse tracking-widest">LOADING STORY...</div>
            </div>
        );
    }

    if (!story) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
                <h1 className="text-4xl font-bold mb-4">Story Not Found</h1>
                <Link href="/story" className="text-zinc-500 hover:text-white transition-colors">Back to Stories</Link>
            </div>
        );
    }

    return (
        <main className="bg-black min-h-screen text-white pt-32 pb-20">
            {/* Back Link */}
            <div className="px-6 md:px-12 mb-12">
                <Link href="/story" className="inline-flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-white transition-colors">
                    <ArrowLeft size={16} />
                    BACK TO STORIES
                </Link>
            </div>

            <article className="max-w-4xl mx-auto px-6 md:px-12">
                {/* Header */}
                <header className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap gap-6 text-sm font-mono text-gray-400 mb-6"
                    >
                        <span className="flex items-center gap-2">
                            <Tag size={14} />
                            {story.category || 'INSIGHT'}
                        </span>
                        <span className="flex items-center gap-2">
                            <Calendar size={14} />
                            {new Date(story.created_at).toLocaleDateString()}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-8"
                    >
                        {story.title}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-full aspect-[16/9] bg-neutral-900 overflow-hidden mb-12"
                    >
                        <img
                            src={story.image || 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000'}
                            alt={story.title}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </header>

                {/* Content Body */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="prose prose-invert prose-lg md:prose-xl max-w-none font-light text-gray-300"
                    dangerouslySetInnerHTML={{
                        __html: (story.content || '').replace(
                            /src="https?:\/\/vinus\.co\.kr\/([^"]+)"/g,
                            (match, path) => `src="/api/proxy-image?url=${encodeURIComponent('https://vinus.co.kr/' + path)}"`
                        )
                    }}
                />
            </article>
        </main>
    );
}
