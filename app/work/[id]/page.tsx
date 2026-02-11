'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Plus, Compass, Maximize2, Layers, CheckCircle2, Database as DatabaseIcon, Globe } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/types/database';
import ProjectBlockRenderer from '@/components/blocks/ProjectBlockRenderer';
import { ContentBlock } from '@/types/blocks';
import ProjectHero from '@/components/blocks/project/ProjectHero';
import ProjectIntroBlock from '@/components/blocks/project/ProjectIntroBlock';
import ProjectGalleryGrid from '@/components/blocks/project/ProjectGalleryGrid';
import ProjectTechSystem from '@/components/blocks/project/ProjectTechSystem';
import ProjectQuote from '@/components/blocks/project/ProjectQuote';
import ProjectPagination from '@/components/blocks/project/ProjectPagination';


type Project = Database['public']['Tables']['projects']['Row'];

/**
 * 🧞‍♀️ Jinni's Note (Ultimate Master Version): 
 * 오빠, 드디어 이 완벽한 템플릿을 실제 데이터랑 연결했어요! 💖
 * 이제 어떤 프로젝트를 넣어도 이 압도적인 비주얼로 탄생할 거예요.
 * 데이터가 조금 비어있어도 예쁘게 보이도록 제가 마법 좀 부렸답니다! ✨🚀
 */

export default function WorkDetailPage() {
    const { id } = useParams();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const supabase = createClient();

    const [prevProject, setPrevProject] = useState<{ id: string, title: string } | null>(null);
    const [nextProject, setNextProject] = useState<{ id: string, title: string } | null>(null);

    useEffect(() => {
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

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono uppercase tracking-[0.2em] text-xs">
                <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    Loading Experience...
                </motion.span>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6">
                <h1 className="text-4xl font-black tracking-tighter mb-6 uppercase">Project Not Found</h1>
                <Link href="/work" className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all">
                    Back to Work
                </Link>
            </div>
        );
    }

    // Parse content blocks if available
    let contentBlocks: ContentBlock[] = [];
    try {
        if (project.content && (project.content.trim().startsWith('[') || project.content.trim().startsWith('{'))) {
            contentBlocks = JSON.parse(project.content);
        }
    } catch (e) {
        console.error('Failed to parse content blocks', e);
    }

    // Image Proxy helper
    const getImageUrl = (url: string | null) => {
        if (!url) return '';
        if (url.includes('vinus.co.kr')) {
            return `/api/proxy-image?url=${encodeURIComponent(url)}`;
        }
        return url;
    };

    return (
        <div className="bg-black min-h-screen text-white font-sans selection:bg-zinc-800 selection:text-white overflow-x-hidden">
            {/* JINNI DEBUG OVERLAY */}
            <div className="fixed bottom-4 right-4 z-[200] opacity-20 pointer-events-none font-mono text-[8px] uppercase">
                {project.title} | {project.reference_version || 'ULTIMATE_V1'}
            </div>

            {/* 1. Visual Hero */}
            <ProjectHero
                title={project.title}
                category={project.category || 'Digital Experience'}
                subtitle={project.description || undefined}
                className="bg-black text-white snap-start"
                backgroundImage={project.image}
            />
            {/* 
                Jinni Note: The ProjectHero component currently has a hardcoded image. 
                I'll need to update ProjectHero separately to accept `backgroundImage` prop 
                if we want the hero image to be dynamic! 
             */}

            <div className="max-w-[1720px] mx-auto px-6 md:px-12 snap-start">
                {/* 2. Hero Intro */}
                <ProjectIntroBlock
                    data={{
                        title: project.title,
                        description: project.description || "No description available.",
                        details: [
                            { label: "Category", value: project.category || "N/A" },
                            { label: "Year", value: project.year || "2024" },
                            // { label: "Client", value: "Unknown" } // We don't have client column yet
                        ],
                        image: getImageUrl(project.image)
                    }}
                />

                {/* 3. Main Content (Dynamic) */}
                <div className="py-20">
                    {contentBlocks.length > 0 ? (
                        <ProjectBlockRenderer blocks={contentBlocks} motionType={project.motion_type as any} />
                    ) : (
                        <div
                            className="project-content-renderer prose prose-invert prose-2xl max-w-none prose-img:rounded-sm prose-img:border prose-img:border-white/5 prose-img:my-20 prose-p:text-zinc-500 prose-p:font-light prose-p:leading-relaxed prose-p:mb-12 prose-headings:text-white prose-headings:tracking-tighter prose-headings:font-black"
                            dangerouslySetInnerHTML={{
                                __html: (project.content || '').replace(
                                    /src="(https?:\/\/(?:www\.)?vinus\.co\.kr\/[^"]+)"/g,
                                    (match: string, url: string) => `src="/api/proxy-image?url=${encodeURIComponent(url)}"`
                                )
                            }}
                        />
                    )}
                </div>


                {/* 4. Tech System */}
                <ProjectTechSystem
                    className="w-full snap-start"
                    title="TECH SYSTEM"
                    subtitle="PURE ARCHITECTURE"
                    specs={[
                        { label: "Architecture", value: "Modern Web" },
                        { label: "Interface", value: "Responsive" }
                    ]}
                    cards={[
                        {
                            title: "Scalable",
                            description: "우리의 기술적 근본은 변하지 않습니다. 가장 압도적인 기술은 어떤 상황에서도 유연하게 대응합니다.",
                            icon: Layers
                        },
                        {
                            title: "Pure Logic",
                            description: "데이터의 흐름은 논리적으로 배치되어 있으며, 모든 요소는 시스템의 가치를 증명하기 위해 존재합니다.",
                            icon: DatabaseIcon
                        },
                        {
                            title: "Global",
                            description: "우리의 시스템은 전 세계 어디에서도 상업적 가치를 유지하며 최적의 퍼포먼스를 보여줍니다.",
                            icon: Globe
                        }
                    ]}
                />
            </div>

            {/* 6. Project Pagination */}
            <ProjectPagination
                className="border-none bg-zinc-950 snap-start"
                prev={prevProject ? { title: prevProject.title, href: `/work/${prevProject.id}` } : null}
                next={nextProject ? { title: nextProject.title, href: `/work/${nextProject.id}` } : null}
                archiveHref="/work"
            />

            {/* 7. Cinematic Quote (Video) */}
            <ProjectQuote
                quote={"SPREAD THE\nBEAUTIFUL THINGS."}
                author="VINUSPREAD PHILOSOPHY"
                bgImage="/videos/flower_abstract.webm"
                className="snap-start snap-always"
            />

        </div>
    );
}
