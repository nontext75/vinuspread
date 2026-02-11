'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Share2, ChevronRight, MessageSquare } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Database } from '@/types/database';

type Story = Database['public']['Tables']['stories']['Row'];

export default function StoryDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [story, setStory] = useState<Story | null>(null);
    const [nextStory, setNextStory] = useState<Story | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Mouse Parallax Logic
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 50;
            const y = (clientY / window.innerHeight - 0.5) * 50;
            setMousePos({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const fetchStoryAndNext = async () => {
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

                // Fetch next story
                const { data: nextData } = await supabase
                    .from('stories')
                    .select('*')
                    .eq('status', 'published')
                    .neq('id', storyId)
                    .order('created_at', { ascending: false })
                    .limit(1);

                if (nextData && nextData.length > 0) {
                    setNextStory(nextData[0]);
                }
            }
            setLoading(false);
        };

        fetchStoryAndNext();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <motion.div
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.98, 1, 0.98] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-white font-mono text-[10px] tracking-[0.5em] uppercase"
                >
                    Entering the Archive...
                </motion.div>
            </div>
        );
    }

    if (!story) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6">
                <h1 className="text-4xl font-bold mb-6 tracking-tighter">Story Not Found</h1>
                <Link href="/story" className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">Return to Stories</span>
                </Link>
            </div>
        );
    }

    // Helper for image URL
    const getStoryImageUrl = (image: any) => {
        if (!image) return 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000';
        if (typeof image === 'string') {
            if (image.includes('vinus.co.kr')) return `/api/proxy-image?url=${encodeURIComponent(image)}`;
            return image;
        }
        if (image.url) return image.url;
        return 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000';
    };

    return (
        <main className="bg-black min-h-screen text-white selection:bg-white selection:text-black overflow-x-hidden">
            {/* Minimal Reading Progress Bar (Fixed at very top, fits below GNB if needed) */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-white z-[100] origin-left"
                style={{ scaleX }}
            />

            {/* Cinematic Hero Section with Parallax */}
            <section className="relative h-[90vh] md:h-screen w-full flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        x: mousePos.x * 0.5,
                        y: mousePos.y * 0.5
                    }}
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], opacity: { duration: 1.5 } }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={getStoryImageUrl(story.image)}
                        alt=""
                        className="w-[110%] h-[110%] -left-[5%] -top-[5%] object-cover grayscale brightness-[0.3] scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
                </motion.div>

                <div className="relative z-10 text-center max-w-6xl px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="inline-block px-4 py-1 border border-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 mb-8"
                    >
                        {story.category || 'INSIGHT'}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.8] uppercase mb-12"
                        style={{ x: mousePos.x * -0.2, y: mousePos.y * -0.2 }}
                    >
                        {story.title}
                    </motion.h1>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 100 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="h-[1px] bg-white/50 mx-auto mb-12"
                    />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1.5 }}
                        className="text-xl md:text-3xl text-zinc-400 font-light max-w-3xl mx-auto leading-tight tracking-tight"
                    >
                        "{story.excerpt}"
                    </motion.p>
                </div>

                {/* Vertical Date Indicator */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                    className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-12"
                >
                    <div className="w-[1px] h-32 bg-gradient-to-b from-transparent to-white/20" />
                    <span className="text-[10px] uppercase tracking-[1em] font-medium text-white/40 rotate-90 whitespace-nowrap">
                        {new Date(story.created_at).toLocaleDateString()}
                    </span>
                    <div className="w-[1px] h-32 bg-gradient-to-t from-transparent to-white/20" />
                </motion.div>
            </section>

            {/* Main Content with Reveal Effects */}
            <section className="relative z-10 py-40 px-6 md:px-12 bg-black">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="prose prose-invert prose-2xl max-w-none
                                   prose-p:text-zinc-400 prose-p:font-light prose-p:leading-relaxed prose-p:mb-16
                                   prose-headings:text-white prose-headings:tracking-tighter prose-headings:font-black
                                   prose-img:rounded-sm prose-img:border prose-img:border-white/5 prose-img:my-32
                                   prose-strong:text-white prose-strong:font-bold 
                                   prose-blockquote:border-white/20 prose-blockquote:bg-white/5 prose-blockquote:p-12 prose-blockquote:rounded-lg prose-blockquote:not-italic"
                        dangerouslySetInnerHTML={{
                            __html: (story.content || '').replace(
                                /src="(https?:\/\/(?:www\.)?vinus\.co\.kr\/[^"]+)"/g,
                                (match, url) => `src="/api/proxy-image?url=${encodeURIComponent(url)}"`
                            ).replace(
                                /src='(https?:\/\/(?:www\.)?vinus\.co\.kr\/[^']+)'/g,
                                (match, url) => `src="/api/proxy-image?url=${encodeURIComponent(url)}"`
                            )
                        }}
                    />

                    {/* Up Next Preview - High Impact */}
                    {nextStory && (
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-80 pt-40 border-t border-white/10 text-center"
                        >
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.5em] mb-16 block">Continue Reading</span>
                            <Link href={`/story/${nextStory.id}`} className="group relative block overflow-hidden">
                                <motion.h3
                                    className="text-5xl md:text-[8rem] font-black tracking-tighter leading-[0.8] group-hover:text-zinc-500 transition-colors duration-700 uppercase"
                                >
                                    {nextStory.title}
                                </motion.h3>
                                <div className="mt-12 flex justify-center">
                                    <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500 scale-75 group-hover:scale-100">
                                        <ChevronRight size={40} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    )}

                    {/* Meta Navigation */}
                    <footer className="mt-40 pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
                        <Link href="/story" className="group flex items-center gap-4 text-zinc-500 hover:text-white transition-all">
                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
                                <ArrowLeft size={18} />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest">Back to the Library</span>
                        </Link>

                        <div className="flex gap-12 items-center">
                            <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest">Connect & Share</span>
                            <div className="flex gap-6">
                                <button className="text-xs font-bold text-zinc-400 hover:text-white transition-colors">Twitter</button>
                                <button className="text-xs font-bold text-zinc-400 hover:text-white transition-colors">LinkedIn</button>
                                <button className="p-2 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                                    <Share2 size={14} />
                                </button>
                            </div>
                        </div>
                    </footer>
                </div>
            </section>
        </main>
    );
}
