'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Share2, Calendar, Tag, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Database } from '@/types/database';

type Project = Database['public']['Tables']['projects']['Row'];

export default function WorkDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const { scrollY } = useScroll();
    const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const heroScale = useTransform(scrollY, [0, 600], [1, 1.1]);
    const contentY = useTransform(scrollY, [0, 600], [0, -100]);

    useEffect(() => {
        const fetchProject = async () => {
            const projectId = Array.isArray(id) ? id[0] : id;
            if (!projectId) return;

            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('id', projectId)
                .single();

            if (error) {
                console.error('Error fetching project:', error);
                setLoading(false);
            } else {
                setProject(data);
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-white font-mono tracking-widest text-sm"
                >
                    LOADING PROJECT...
                </motion.div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6">
                <h1 className="text-4xl font-bold mb-6">Project Not Found</h1>
                <Link href="/work" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                    <span>Back to Work</span>
                </Link>
            </div>
        );
    }

    return (
        <main className="bg-black min-h-screen text-white overflow-x-hidden">
            {/* Background Texture/Gradient */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(20,20,20,1)_0%,_rgba(0,0,0,1)_100%)] z-[-1]" />

            {/* Sticky Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="pointer-events-auto"
                >
                    <Link href="/work" className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full transition-all duration-300">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-widest">Back to Work</span>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="pointer-events-auto hidden md:block"
                >
                    <button className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-full transition-all">
                        <Share2 size={18} />
                    </button>
                </motion.div>
            </nav>

            {/* Hero Section */}
            <section className="relative h-[90vh] md:h-screen w-full flex items-end overflow-hidden">
                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale }}
                    className="absolute inset-0"
                >
                    <img
                        src={project.image || ''}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale-[0.2]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </motion.div>

                <div className="relative z-10 w-full px-6 md:px-12 pb-20 md:pb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-6xl"
                    >
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className="bg-white text-black px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm">
                                {project.category}
                            </span>
                            <div className="flex items-center gap-2 text-white/50 text-xs font-mono">
                                <Calendar size={12} />
                                <span>{project.year}</span>
                            </div>
                        </div>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
                            {project.title}
                        </h1>
                        <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                            {project.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <motion.section
                style={{ y: contentY }}
                className="relative z-20 py-32 bg-black border-t border-white/5"
            >
                <div className="w-full px-6 md:px-12">
                    {/* Project Brief Info - Expanded */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-32 border-b border-white/5 pb-16">
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em]">Client / Project</h4>
                            <p className="text-xl md:text-2xl font-bold tracking-tight uppercase">{project.title}</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em]">Service</h4>
                            <p className="text-xl md:text-2xl font-bold tracking-tight uppercase">{project.category} Experience</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em]">Year</h4>
                            <p className="text-xl md:text-2xl font-bold tracking-tight uppercase font-mono">{project.year}</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em]">Role</h4>
                            <p className="text-xl md:text-2xl font-bold tracking-tight uppercase">Creative Direction & Design</p>
                        </div>
                    </div>

                    {/* Main Content Area (Rendered from CMS Content) */}
                    <div className="max-w-[1400px] mx-auto space-y-24">
                        {project.content ? (
                            <div
                                className="project-content-renderer prose prose-invert prose-2xl max-w-none
                                           prose-img:w-full prose-img:rounded-sm prose-img:border prose-img:border-white/5 prose-img:my-20
                                           prose-p:text-zinc-500 prose-p:font-light prose-p:leading-relaxed prose-p:mb-12
                                           prose-headings:text-white prose-headings:tracking-tighter prose-headings:font-black
                                           prose-strong:text-white prose-strong:font-bold"
                                dangerouslySetInnerHTML={{
                                    __html: project.content.replace(
                                        /src="https?:\/\/vinus\.co\.kr\/([^"]+)"/g,
                                        (match, path) => `src="/api/proxy-image?url=${encodeURIComponent('https://vinus.co.kr/' + path)}"`
                                    )
                                }}
                            />
                        ) : (
                            <div className="space-y-24">
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="aspect-video w-full bg-zinc-900 overflow-hidden border border-white/5 rounded-sm"
                                >
                                    <img
                                        src={project.image || ''}
                                        alt="Project Detail"
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                                    <motion.div
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="space-y-8"
                                    >
                                        <h3 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                                            Premium Digital <br /> Storytelling
                                        </h3>
                                        <div className="w-20 h-1 bg-white" />
                                        <p className="text-zinc-500 text-base md:text-lg leading-relaxed font-light">
                                            {project.description}
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.section>

            {/* Footer Navigation */}
            <section className="px-6 md:px-12 py-32 bg-zinc-950 border-t border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.5em] mb-8">Next Project</span>
                    <Link href="/work" className="group">
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter hover:text-zinc-500 transition-colors uppercase leading-none">
                            Discover More
                        </h2>
                        <div className="mt-8 flex justify-center">
                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                <ArrowLeft className="rotate-180" size={24} />
                            </div>
                        </div>
                    </Link>
                </div>
            </section>
        </main>
    );
}
