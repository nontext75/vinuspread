'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { createClient } from '@/lib/supabase/client';
import { Database } from '@/types/database';
import { useEffect, useState } from 'react';

type Project = Database['public']['Tables']['projects']['Row'];

const CATEGORIES = ['ALL', 'WEB', 'MOBILE', 'BRANDING', 'ETC'];

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

    // Filter Logic
    const groupedProjects = {
        WEB: projects.filter(p => p.category === 'WEB'),
        MOBILE: projects.filter(p => p.category === 'MOBILE'),
        BRANDING: projects.filter(p => p.category === 'BRANDING'),
        ETC: projects.filter(p => p.category === 'ETC'),
    };

    const displayProjects = activeCategory === 'ALL'
        ? groupedProjects
        : { [activeCategory]: groupedProjects[activeCategory as keyof typeof groupedProjects] };

    return (
        <main className="bg-black min-h-screen text-white pt-32 pb-20">

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
                                            <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-900 mb-6 font-mono">
                                                <img
                                                    src={project.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000'}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                                />
                                                {/* Overlay */}
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                                                {/* Hover Icon */}
                                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black rounded-full p-2">
                                                    <ArrowUpRight size={20} />
                                                </div>
                                            </div>

                                            {/* Info */}
                                            <div className="flex flex-col gap-2">
                                                <div className="flex justify-between items-start border-b border-white/20 pb-4 mb-2 group-hover:border-white transition-colors duration-300">
                                                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight uppercase">{project.title}</h3>
                                                    <span className="text-xs font-mono opacity-50 border border-white/30 px-2 py-1 rounded-full">{project.year}</span>
                                                </div>
                                                <p className="text-sm md:text-base text-gray-400 font-light max-w-md line-clamp-2">
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
