'use client';

import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Plus, Minus, Layers, Target, Compass, ChevronRight, Maximize2, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Database } from '@/types/database';
import ProjectBlockRenderer from '@/components/blocks/ProjectBlockRenderer';
import { ContentBlock } from '@/types/blocks';

type Project = Database['public']['Tables']['projects']['Row'];

interface TemplateProps {
    project: Project;
}

// Custom hook for mouse parallax
const useMouseParallax = (intensity = 40) => {
    const [mouseTransform, setMouseTransform] = React.useState({ x: 0, y: 0 });
    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * intensity;
            const y = (e.clientY / window.innerHeight - 0.5) * intensity;
            setMouseTransform({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [intensity]);
    return mouseTransform;
};

const ProjectBriefInfo = ({ project }: { project: Project }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-32 border-b border-white/5 pb-16"
    >
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
    </motion.div>
);

const ContentRenderer = ({ content }: { content: string | null }) => {
    if (!content) return null;

    // Detect if content is JSON blocks
    try {
        if (content.trim().startsWith('[') || content.trim().startsWith('{')) {
            const blocks = JSON.parse(content) as ContentBlock[];
            return <ProjectBlockRenderer blocks={blocks} />;
        }
    } catch (e) {
        // Not JSON, fallback to HTML
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="project-content-renderer prose prose-invert prose-2xl max-w-none
                       prose-img:w-full prose-img:rounded-sm prose-img:border prose-img:border-white/5 prose-img:my-20
                       prose-p:text-zinc-500 prose-p:font-light prose-p:leading-relaxed prose-p:mb-12
                       prose-headings:text-white prose-headings:tracking-tighter prose-headings:font-black
                       prose-strong:text-white prose-strong:font-bold"
            dangerouslySetInnerHTML={{
                __html: content.replace(
                    /src="(https?:\/\/(?:www\.)?vinus\.co\.kr\/[^"]+)"/g,
                    (match, url) => `src="/api/proxy-image?url=${encodeURIComponent(url)}"`
                )
            }}
        />
    );
};

// --- Template V1: Golden Narrative ---
export const TemplateV1: React.FC<TemplateProps> = ({ project }) => {
    const mouse = useMouseParallax(30);
    const heroImage = project.image?.includes('vinus.co.kr')
        ? `/api/proxy-image?url=${encodeURIComponent(project.image)}`
        : (project.image || '');

    return (
        <main className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ x: mouse.x, y: mouse.y }}
                    className="absolute inset-0 z-0"
                >
                    <img src={heroImage} alt="" className="w-[110%] h-[110%] -left-[5%] -top-[5%] object-cover opacity-60 grayscale-[0.3]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
                </motion.div>
                <div className="relative z-10 text-center space-y-8 px-6 text-stroke-white">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="text-7xl md:text-[12rem] font-black tracking-tighter leading-none uppercase"
                        style={{ x: mouse.x * -0.3, y: mouse.y * -0.3 }}
                    >
                        {(project.title || '').split(' ').map((word, i) => (
                            <React.Fragment key={i}>{word} <br /></React.Fragment>
                        ))}
                    </motion.h1>
                </div>
            </section>
            <section className="py-32 px-6 md:px-12 max-w-[1920px] mx-auto">
                <ProjectBriefInfo project={project} />
                <div className="max-w-4xl mx-auto py-20">
                    <ContentRenderer content={project.content} />
                    {!project.content && <p className="text-2xl text-zinc-400 font-light leading-relaxed italic">{project.description || 'No description available.'}</p>}
                </div>
            </section>
        </main>
    );
};

// --- Template V2: Modular Narrative ---
export const TemplateV2: React.FC<TemplateProps> = ({ project }) => {
    const mouse = useMouseParallax(25);
    const heroImage = project.image?.includes('vinus.co.kr')
        ? `/api/proxy-image?url=${encodeURIComponent(project.image)}`
        : (project.image || '');

    return (
        <main className="bg-black text-white min-h-screen font-sans">
            <section className="relative h-[120vh] w-full">
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    <motion.img
                        style={{ x: mouse.x, y: mouse.y }}
                        src={heroImage}
                        className="w-[110%] h-[110%] -left-[5%] -top-[5%] object-cover grayscale brightness-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2 }}
                            className="text-7xl md:text-[12rem] font-black tracking-tighter leading-none uppercase"
                            style={{ x: mouse.x * -0.5, y: mouse.y * -0.5 }}
                        >
                            {project.title || 'Untitled Project'}
                        </motion.h1>
                    </div>
                </div>
            </section>
            <section className="px-6 md:px-12 max-w-[1920px] mx-auto py-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="lg:sticky lg:top-40 h-fit space-y-12"
                    >
                        <h2 className="text-5xl font-black uppercase tracking-tighter">{project.title || 'Untitled Project'}</h2>
                        <p className="text-zinc-500 text-xl font-light leading-relaxed">{project.description || 'No description available.'}</p>
                    </motion.div>
                    <div className="space-y-24">
                        <ContentRenderer content={project.content} />
                    </div>
                </div>
            </section>
        </main>
    );
};

// --- Template V3: Dark Immersive ---
export const TemplateV3: React.FC<TemplateProps> = ({ project }) => {
    const mouse = useMouseParallax(35);
    const heroImage = project.image?.includes('vinus.co.kr')
        ? `/api/proxy-image?url=${encodeURIComponent(project.image)}`
        : (project.image || '');

    return (
        <main className="bg-black text-white min-h-screen font-sans">
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ x: mouse.x, y: mouse.y }}
                    className="absolute inset-0 z-0"
                >
                    <img src={heroImage} alt="" className="w-[110%] h-[110%] -left-[5%] -top-[5%] object-cover opacity-40 grayscale" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_80%)]" />
                </motion.div>
                <div className="relative z-10 text-center px-6 space-y-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="text-7xl md:text-[12rem] font-black tracking-tighter leading-none uppercase"
                        style={{ x: mouse.x * -0.4, y: mouse.y * -0.4 }}
                    >
                        {project.title || 'Untitled Project'}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="text-zinc-500 text-lg max-w-xl mx-auto font-light leading-relaxed italic"
                    >
                        {project.description || 'No description available.'}
                    </motion.p>
                </div>
            </section>
            <section className="py-40 px-6 md:px-12 max-w-[1920px] mx-auto border-t border-white/5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
                    <div className="space-y-16">
                        <ContentRenderer content={project.content} />
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                        className="aspect-square bg-zinc-950 border border-white/5 overflow-hidden"
                    >
                        <img src={heroImage} className="w-full h-full object-cover grayscale opacity-50" />
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

// --- Template V4: Grid Narrative ---
export const TemplateV4: React.FC<TemplateProps> = ({ project }) => {
    const mouse = useMouseParallax(20);
    const heroImage = project.image?.includes('vinus.co.kr')
        ? `/api/proxy-image?url=${encodeURIComponent(project.image)}`
        : (project.image || '');

    return (
        <main className="bg-[#0a0a0a] text-white min-h-screen font-sans selection:bg-white selection:text-black pt-32">
            <section className="pb-40 px-6 md:px-24">
                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-b border-white/10 pb-20"
                >
                    <div className="md:col-span-8">
                        <motion.h1
                            className="text-6xl md:text-[12rem] font-black tracking-tighter leading-none uppercase"
                            style={{ x: mouse.x * -0.2 }}
                        >
                            {project.title || 'Untitled Project'}
                        </motion.h1>
                    </div>
                    <div className="md:col-span-4 pb-4">
                        <p className="text-zinc-500 text-lg font-light leading-relaxed uppercase tracking-tighter italic">
                            {project.description || 'No description available.'}
                        </p>
                    </div>
                </motion.div>

                {/* Visual Anchor */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 1.5 }}
                    className="mt-20 aspect-video w-full overflow-hidden border border-white/5 bg-zinc-900"
                >
                    <motion.img
                        style={{ scale: 1.1, x: mouse.x * 0.5, y: mouse.y * 0.5 }}
                        src={heroImage}
                        className="w-full h-full object-cover grayscale opacity-60"
                    />
                </motion.div>

                <div className="py-32">
                    <ContentRenderer content={project.content} />
                </div>
            </section>
        </main>
    );
};

// --- Template V5: High-End Essence ---
export const TemplateV5: React.FC<TemplateProps> = ({ project }) => {
    const { scrollYProgress } = useScroll();
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const mouse = useMouseParallax(40);
    const heroImage = project.image?.includes('vinus.co.kr')
        ? `/api/proxy-image?url=${encodeURIComponent(project.image)}`
        : (project.image || '');

    return (
        <main className="bg-black text-white min-h-screen font-sans">
            <section className="relative h-screen w-full flex flex-col justify-end p-8 md:p-24 overflow-hidden border-b border-white/5">
                <motion.div
                    style={{ y: bgY, x: mouse.x * 0.5 }}
                    className="absolute inset-0 z-0"
                >
                    <img src={heroImage} alt="Background" className="w-[110%] h-[110%] -left-[5%] object-cover grayscale opacity-40" />
                </motion.div>
                <div className="relative z-10 max-w-[1920px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                    <div className="lg:col-span-8">
                        <motion.h1
                            initial={{ opacity: 0, x: -60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[12vw] lg:text-[8vw] font-black tracking-[-0.04em] leading-[0.85] uppercase"
                            style={{ y: mouse.y * -0.5 }}
                        >
                            {(project.title || '').split(' ').map((word, i) => (
                                <React.Fragment key={i}>{word} <br /></React.Fragment>
                            ))}
                        </motion.h1>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="lg:col-span-4 pb-4 border-l border-white/10 pl-8"
                    >
                        <p className="text-zinc-500 text-sm md:text-base font-light leading-relaxed uppercase tracking-tighter">
                            {project.description}
                        </p>
                    </motion.div>
                </div>
            </section>
            <section className="py-40 px-6 md:px-24 max-w-[1920px] mx-auto">
                <ContentRenderer content={project.content} />
            </section>
        </main>
    );
};
