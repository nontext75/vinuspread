'use client';

import React from 'react';
import SiteLayout from '@/components/SiteLayout';
import ProjectHero from '@/components/blocks/project/ProjectHero';
import ProjectIntroBlock from '@/components/blocks/project/ProjectIntroBlock';
import ProjectGalleryGrid from '@/components/blocks/project/ProjectGalleryGrid';
import ProjectTechSystem from '@/components/blocks/project/ProjectTechSystem';
import ProjectQuote from '@/components/blocks/project/ProjectQuote';
import ProjectPagination from '@/components/blocks/project/ProjectPagination';
import { Layers, Database, Globe } from 'lucide-react';
import Footer from '@/components/Footer';

export default function UltimateMasterPage() {
    return (
        <SiteLayout>
            <main className="bg-black min-h-screen">
                {/* Visual Hero - 최상단 (Samsung Galaxy style EXACT) */}
                <ProjectHero
                    title="SAMSUNG GALAXY ON SERIES"
                    category="Web Experience"
                    subtitle="A seamless integration of hardware performance and digital storytelling, delivering the core essence of the Galaxy series."
                />

                <div className="max-w-[1920px] mx-auto px-6 md:px-12">
                    {/* Hero Intro - Clean & Bold */}
                    <ProjectIntroBlock
                        data={{
                            title: "SAMSUNG GALAXY ON",
                            description: "우리의 기술적 근본은 변하지 않습니다. 가장 압도적인 기술과 유려한 디자인이 만나 최상의 가치를 증명합니다.",
                            details: [
                                { label: "Category", value: "Flagship Campaign" },
                                { label: "Client", value: "Samsung Electronics" },
                                { label: "Year", value: "2024" }
                            ],
                            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80"
                        }}
                    />

                    {/* Complex Gallery Grid 1 - Stable & Premium */}
                    <ProjectGalleryGrid
                        images={[
                            { src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80", alt: "Tech Detail" },
                            { src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80", alt: "Work Detail" },
                            { src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80", alt: "Graph Detail" },
                            { src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80", alt: "Workspace Detail" }
                        ]}
                    />

                    {/* Tech System Section - Premium Contrast */}
                    <ProjectTechSystem
                        className="-mx-6 md:-mx-12 px-6 md:px-12"
                        title="TECH SYSTEM"
                        subtitle="PURE ARCHITECTURE"
                        specs={[
                            { label: "Architecture", value: "Microservices" },
                            { label: "Interface", value: "Atomic Grid" }
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
                                icon: Database
                            },
                            {
                                title: "Global",
                                description: "우리의 시스템은 전 세계 어디에서도 상업적 가치를 유지하며 최적의 퍼포먼스를 보여줍니다.",
                                icon: Globe
                            }
                        ]}
                    />

                    {/* Complex Gallery Grid 2 - Dark Context */}
                    <ProjectGalleryGrid
                        className="bg-black py-40"
                        images={[
                            { src: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80", alt: "Code Detail" },
                            { src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80", alt: "Script Detail" },
                            { src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80", alt: "Monitor Detail" },
                            { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80", alt: "Hardware Detail" }
                        ]}
                    />
                </div>

                {/* Cinematic Quote - Immersive Parallax */}
                <ProjectQuote
                    quote={"THE PUREST FORM OF DATA IS\nTHE ABSENCE OF FRICTION."}
                    author="VINUSPREAD PHILOSOPHY"
                    bgImage="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80"
                />

                {/* Project Pagination - Seamless Flow */}
                <ProjectPagination
                    className="border-none bg-zinc-950"
                    prev={{ title: "SAMSUNG SMARTSLEEP PDP", href: "#" }}
                    next={{ title: "SAMSUNG GALAXY S6 LANDING", href: "#" }}
                    archiveHref="/work"
                />
            </main>
            <Footer />
        </SiteLayout>
    );
}
