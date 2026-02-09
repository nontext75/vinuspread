'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Share2, Calendar, Tag, ExternalLink, Plus } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Database } from '@/types/database';
import { TemplateV1, TemplateV2, TemplateV3, TemplateV4, TemplateV5 } from '@/components/work/layouts/ProjectTemplates';
import ProjectBlockRenderer from '@/components/blocks/ProjectBlockRenderer';
import { ContentBlock } from '@/types/blocks';

type Project = Database['public']['Tables']['projects']['Row'];

export default function WorkDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const supabase = createClient();

    const { scrollY, scrollYProgress } = useScroll();
    const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const heroScale = useTransform(scrollY, [0, 600], [1, 1.1]);
    const contentY = useTransform(scrollY, [0, 600], [0, -100]);
    const progressBarScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const [prevProject, setPrevProject] = useState<{ id: string, title: string } | null>(null);
    const [nextProject, setNextProject] = useState<{ id: string, title: string } | null>(null);

    useEffect(() => {
        console.log('WorkDetailPage Mounted with ID:', id);
        const fetchProject = async () => {
            const projectId = Array.isArray(id) ? id[0] : id;
            if (!projectId) return;

            setLoading(true);

            // 1. Current Project
            const { data: current, error: curError } = await supabase
                .from('projects')
                .select('*')
                .eq('id', projectId)
                .single();

            if (curError || !current) {
                console.error('Error fetching project:', curError);
                setError(curError || new Error('Project not found'));
                setLoading(false);
                return;
            }

            setProject(current);

            // 2. Find Prev/Next based on sort_order
            const { data: allProjects } = await supabase
                .from('projects')
                .select('id, title, sort_order')
                .order('sort_order', { ascending: true });

            if (allProjects) {
                const currentIndex = allProjects.findIndex(p => p.id === projectId);
                if (currentIndex > 0) setPrevProject(allProjects[currentIndex - 1]);
                else setPrevProject(null);

                if (currentIndex < allProjects.length - 1) setNextProject(allProjects[currentIndex + 1]);
                else setNextProject(null);
            }

            setLoading(false);
        };

        fetchProject();
    }, [id]);

    // Nav & Progress bar
    const renderHeader = () => (
        <motion.div
            style={{ scaleX: progressBarScaleX }}
            className="fixed top-0 left-0 w-full h-[2px] bg-white z-[60] origin-left pointer-events-none"
        />
    );

    // Redesigned navigation CTA
    const renderNextCTA = () => (
        <section className="px-6 md:px-12 py-32 bg-zinc-950 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                    {/* Previous Project */}
                    <div className="text-left order-2 md:order-1">
                        {prevProject ? (
                            <Link href={`/work/${prevProject.id}`} className="group block space-y-4">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] block">Previous Project</span>
                                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tighter group-hover:text-white/60 transition-colors line-clamp-1">
                                    {prevProject.title}
                                </h3>
                            </Link>
                        ) : (
                            <div className="opacity-20 grayscale pointer-events-none">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] block">First Project</span>
                                <h3 className="text-xl font-bold uppercase tracking-tighter">Beginning</h3>
                            </div>
                        )}
                    </div>

                    {/* Back to List (Center) */}
                    <div className="flex justify-center order-1 md:order-2">
                        <Link href="/work" className="group flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 transform group-hover:scale-110">
                                <Plus className="rotate-45" size={24} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 group-hover:text-white transition-colors">Archive</span>
                        </Link>
                    </div>

                    {/* Next Project */}
                    <div className="text-right order-3 md:order-3">
                        {nextProject ? (
                            <Link href={`/work/${nextProject.id}`} className="group block space-y-4">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] block">Next Project</span>
                                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tighter group-hover:text-white/60 transition-colors line-clamp-1">
                                    {nextProject.title}
                                </h3>
                            </Link>
                        ) : (
                            <div className="opacity-20 grayscale pointer-events-none">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] block">End of Journey</span>
                                <h3 className="text-xl font-bold uppercase tracking-tighter">Last One</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );

    // Mouse Parallax Logic
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 30;
            const y = (clientY / window.innerHeight - 0.5) * 30;
            setMousePos({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Layout Selector
    const renderLayout = () => {
        if (!project) return null;
        console.log('Rendering layout for project:', project.title, 'Version:', project.reference_version);

        try {
            switch (project.reference_version) {
                case 'v1': return <TemplateV1 project={project} />;
                case 'v2': return <TemplateV2 project={project} />;
                case 'v3': return <TemplateV3 project={project} />;
                case 'v4': return <TemplateV4 project={project} />;
                case 'v5': return <TemplateV5 project={project} />;
                default:
                    console.log('Falling back to default layout');
                    return (
                        <div className="bg-black min-h-screen text-white overflow-x-hidden">
                            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(20,20,20,1)_0%,_rgba(0,0,0,1)_100%)] z-[-1]" />
                            <section className="relative h-[90vh] md:h-screen w-full flex items-end overflow-hidden pb-20 md:pb-40 px-6 md:px-12">
                                <motion.div
                                    style={{
                                        opacity: heroOpacity,
                                        scale: heroScale,
                                        x: mousePos.x,
                                        y: mousePos.y
                                    }}
                                    className="absolute inset-0"
                                >
                                    <img
                                        src={project.image?.includes('vinus.co.kr')
                                            ? `/api/proxy-image?url=${encodeURIComponent(project.image)}`
                                            : (project.image || '')}
                                        alt=""
                                        className="w-[110%] h-[110%] -left-[5%] -top-[5%] object-cover grayscale-[0.2]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                </motion.div>
                                <div className="relative z-10 w-full text-left">
                                    <motion.div
                                        initial={{ opacity: 0, y: 60 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                        className="max-w-[1920px] mx-auto"
                                        style={{ x: mousePos.x * -0.5, y: mousePos.y * -0.5 }}
                                    >
                                        <div className="flex flex-wrap items-center gap-4 mb-8">
                                            <span className="bg-white text-black px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm">{project.category}</span>
                                            <div className="flex items-center gap-2 text-white/50 text-xs font-mono tracking-widest uppercase italic"><Calendar size={12} /><span>{project.year} Creative Archive</span></div>
                                        </div>
                                        <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] mb-12">
                                            {project.title || 'Untitled Project'}
                                        </h1>
                                        <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl leading-relaxed italic border-l border-white/20 pl-8">
                                            {project.description}
                                        </p>
                                    </motion.div>
                                </div>
                            </section>
                            <motion.section style={{ y: contentY }} className="relative z-20 py-40 bg-black border-t border-white/5">
                                <div className="w-full px-6 md:px-12">
                                    <div className="max-w-[1400px] mx-auto space-y-40">
                                        {project.content ? (() => {
                                            try {
                                                if (project.content.trim().startsWith('[') || project.content.trim().startsWith('{')) {
                                                    const blocks = JSON.parse(project.content) as ContentBlock[];
                                                    return <ProjectBlockRenderer blocks={blocks} />;
                                                }
                                            } catch (e) {
                                                console.error('Content Block Parsing Error:', e);
                                            }
                                            return (
                                                <div
                                                    className="project-content-renderer prose prose-invert prose-2xl max-w-none prose-img:rounded-sm prose-img:border prose-img:border-white/5 prose-img:my-20 prose-p:text-zinc-500 prose-p:font-light prose-p:leading-relaxed prose-p:mb-12 prose-headings:text-white prose-headings:tracking-tighter prose-headings:font-black"
                                                    dangerouslySetInnerHTML={{
                                                        __html: (project.content || '').replace(
                                                            /src="(https?:\/\/(?:www\.)?vinus\.co\.kr\/[^"]+)"/g,
                                                            (match, url) => `src="/api/proxy-image?url=${encodeURIComponent(url)}"`
                                                        )
                                                    }}
                                                />
                                            );
                                        })() : (
                                            <div className="aspect-video w-full bg-zinc-900 overflow-hidden border border-white/5 rounded-sm">
                                                <img
                                                    src={project.image?.includes('vinus.co.kr')
                                                        ? `/api/proxy-image?url=${encodeURIComponent(project.image)}`
                                                        : (project.image || '')}
                                                    alt=""
                                                    className="w-full h-full object-cover grayscale opacity-60"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.section>
                        </div>
                    );
            }
        } catch (e) {
            console.error('renderLayout Error:', e);
            throw e;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono uppercase tracking-[0.2em] text-xs">
                <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    Loading Project Experience...
                </motion.span>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6">
                <h1 className="text-4xl font-black tracking-tighter mb-6 uppercase">Project Not Found</h1>
                <p className="text-zinc-500 mb-8 font-mono text-xs">{error ? String(error.message) : 'Data reconciliation failed.'}</p>
                <Link href="/work" className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all">
                    Back to Work
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black relative">
            {/* JINNI DEBUG OVERLAY */}
            <div className="fixed bottom-4 right-4 z-[200] opacity-20 pointer-events-none font-mono text-[8px] uppercase">
                {project.title} | {project.reference_version || 'v_default'}
            </div>

            {renderHeader()}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div key={project.id}>
                    {renderLayout()}
                </div>
            </motion.div>

            {renderNextCTA()}
        </div>
    );
}
