'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import PhysicsCard from '@/components/ui/PhysicsCard';
import LevitatingObject from '@/components/ui/LevitatingObject';

import { createClient } from '@/lib/supabase/client';
import { Database } from '@/types/database';
import { useEffect } from 'react';

type Project = Database['public']['Tables']['projects']['Row'];

const CATEGORIES = ['ALL', 'WEB', 'MOBILE', 'CHARACTER', 'PDP'];

export default function WorkPage() {
    const [activeCategory, setActiveCategory] = useState("ALL");
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchProjects = async () => {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('sort_order', { ascending: true });

            if (error) {
                console.error('Error fetching projects:', error);
            } else {
                setProjects(data || []);
            }
            setLoading(false);
        };

        fetchProjects();
    }, []);

    // Filter Logic with flexible matching and fallback
    const groupedProjects = {
        WEB: projects.filter(p => ['WEB', 'WEBSITE', 'PC'].includes(p.category?.toUpperCase() || '')),
        MOBILE: projects.filter(p => ['MOBILE', 'APP', 'MOBILE WEB'].includes(p.category?.toUpperCase() || '')),
        CHARACTER: projects.filter(p => ['CHARACTER', 'CHRACTER', 'ILLUST', 'ILLUSTRATION'].includes(p.category?.toUpperCase() || '')),
        PDP: projects.filter(p => ['PDP', 'PRODUCT', 'DETAIL'].includes(p.category?.toUpperCase() || '')),
    };

    const displayProjects = activeCategory === 'ALL'
        ? groupedProjects
        : { [activeCategory]: groupedProjects[activeCategory as keyof typeof groupedProjects] || [] };

    return (
        <main className="bg-black min-h-screen text-white pt-48 pb-20">

            {/* Page Header */}
            <section className="px-6 md:px-12 mb-20">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-7xl md:text-9xl font-black tracking-tighter mb-8"
                >
                    OUR WORK
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full h-[1px] bg-white/20 mb-12"
                />

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap gap-4 md:gap-8"
                >
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`text-sm md:text-base font-bold tracking-widest uppercase py-2 px-1 relative transition-colors duration-300 ${activeCategory === cat ? 'text-white' : 'text-zinc-600 hover:text-white'}`}
                        >
                            {cat}
                            {activeCategory === cat && (
                                <motion.div
                                    layoutId="activeCategory"
                                    className="absolute bottom-0 left-0 w-full h-[2px] bg-white"
                                />
                            )}
                        </button>
                    ))}
                </motion.div>
            </section>

            {/* Categorized Lists */}
            <div className="flex flex-col gap-40 w-full max-w-[1920px] mx-auto min-h-[50vh]">
                {!loading && Object.entries(displayProjects).map(([category, items], sectionIdx) => (
                    items.length > 0 && (
                        <section key={category} className="px-6 md:px-12">
                            {/* Category Header */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="flex items-baseline gap-4 mb-16 border-b border-white/10 pb-6"
                            >
                                <h2 className="text-4xl md:text-6xl font-bold tracking-tight">{category}</h2>
                                <span className="text-sm font-light opacity-50">({items.length})</span>
                            </motion.div>

                            {/* Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
                                {items.map((project, idx) => (
                                    <Link key={project.id} href={`/work/${project.id}`} className="block">
                                        <motion.div
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-10%" }}
                                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                                            className="group relative"
                                        >
                                            {/* Image Container */}
                                            <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-900 mb-6 border border-white/5 transition-colors duration-500 group-hover:border-white/20">
                                                <img
                                                    src={project.image?.startsWith('http://vinus.co.kr')
                                                        ? `/api/proxy-image?url=${encodeURIComponent(project.image)}`
                                                        : (project.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000')}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-all duration-700 ease-out grayscale group-hover:grayscale-0 group-hover:scale-105"
                                                />
                                                {/* Overlay (Subtle) */}
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                                                {/* Hover Icon (Clean) */}
                                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 bg-white text-black rounded-full p-2">
                                                    <ArrowUpRight size={20} />
                                                </div>
                                            </div>

                                            {/* Info */}
                                            <div className="flex flex-col gap-2">
                                                <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-2 group-hover:border-white/40 transition-colors duration-300">
                                                    <h3 className="text-xl md:text-2xl font-bold tracking-tight uppercase">{project.title}</h3>
                                                    <span className="text-[10px] font-mono opacity-50 border border-white/20 px-2 py-0.5 rounded-full">{project.year}</span>
                                                </div>
                                                <p className="text-xs md:text-sm text-gray-500 font-light max-w-md line-clamp-2 leading-relaxed">
                                                    {project.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )
                ))}

                {loading && (
                    <div className="text-center py-20 text-gray-500 font-mono animate-pulse">
                        Loading projects...
                    </div>
                )}
                {!loading && projects.length === 0 && (
                    <div className="text-center py-20 text-gray-500 font-mono">
                        No projects found.
                    </div>
                )}
            </div>

            <div className="h-40" />
        </main>
    );
}
