'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ProjectPaginationProps {
    prev: { title: string; href: string } | null;
    next: { title: string; href: string } | null;
    archiveHref: string;
    className?: string;
}

const ProjectPagination: React.FC<ProjectPaginationProps> = ({ prev, next, archiveHref, className }) => {
    return (
        <section className={cn("py-20 bg-black border-t border-white/10", className)}>
            <div className="max-w-[1720px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-3 items-center">
                    {/* Previous */}
                    <div className="text-left">
                        {prev ? (
                            <Link href={prev.href} className="group inline-block">
                                <span className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2 transition-colors group-hover:text-white">Previous Project</span>
                                <h4 className="text-sm md:text-xl font-bold text-white uppercase tracking-tighter transition-transform group-hover:-translate-x-2">{prev.title}</h4>
                            </Link>
                        ) : (
                            <span className="block text-[10px] uppercase tracking-widest text-zinc-800">First Project</span>
                        )}
                    </div>

                    {/* Archive / Close */}
                    <div className="flex flex-col items-center justify-center">
                        <Link href={archiveHref} className="relative group p-4 border border-white/20 rounded-full hover:bg-white hover:border-white transition-all duration-500">
                            <X className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Back to Archive</span>
                        </Link>
                    </div>

                    {/* Next */}
                    <div className="text-right">
                        {next ? (
                            <Link href={next.href} className="group inline-block">
                                <span className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2 transition-colors group-hover:text-white">Next Project</span>
                                <h4 className="text-sm md:text-xl font-bold text-white uppercase tracking-tighter transition-transform group-hover:translate-x-2">{next.title}</h4>
                            </Link>
                        ) : (
                            <span className="block text-[10px] uppercase tracking-widest text-zinc-800">Last Project</span>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectPagination;
