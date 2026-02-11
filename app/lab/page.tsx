'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import LabItemCard from '@/components/lab/LabItemCard';
import { LAB_ITEMS, LabItem } from '@/lib/mock/lab-items'; // Shared Mock Data

const CATEGORIES = [
    { label: 'ALL', value: 'all' },
    { label: 'Watchface', value: 'watchface' },
    { label: 'Emoticon', value: 'emoticon' },
    { label: 'Icon', value: 'icons' },
    { label: 'Experiment', value: 'experiment' },
];

export default function LabPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [items, setItems] = useState<LabItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const supabase = createClient();

    useEffect(() => {
        const loadItems = async () => {
            setLoading(true);

            let filtered = LAB_ITEMS;

            if (activeCategory !== 'all') {
                filtered = filtered.filter(item => item.category === activeCategory || (activeCategory === 'video' && item.type === 'video') || (activeCategory === 'experiment' && item.type === 'experiment'));
            }

            if (searchTerm) {
                filtered = filtered.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
            }

            setItems(filtered);
            setLoading(false);
        };

        loadItems();
    }, [activeCategory, searchTerm]);

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20">
            {/* Page Header (Full Width) */}
            <section className="px-6 md:px-12 mb-20 w-full">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-8xl md:text-[140px] font-black tracking-tighter mb-8 leading-[0.8] uppercase"
                >
                    LAB
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full h-[1px] bg-white/20 mb-12"
                />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap gap-4 md:gap-8"
                    >
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.value}
                                onClick={() => setActiveCategory(cat.value)}
                                className={`
                                    text-sm md:text-base font-bold tracking-widest uppercase py-2 px-1 relative transition-colors duration-300
                                    ${activeCategory === cat.value ? 'text-white' : 'text-zinc-600 hover:text-white'}
                                `}
                            >
                                {cat.label}
                                {activeCategory === cat.value && (
                                    <motion.div
                                        layoutId="activeCategory"
                                        className="absolute bottom-0 left-0 w-full h-[2px] bg-white"
                                    />
                                )}
                            </button>
                        ))}
                    </motion.div>

                    {/* Minimal Search */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="relative w-full md:w-64"
                    >
                        <input
                            type="text"
                            placeholder="SEARCH REFERENCE"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-sm font-mono uppercase focus:outline-none focus:border-white transition-colors placeholder:text-zinc-700"
                        />
                        <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                    </motion.div>
                </div>
            </section>

            <div className="max-w-[1800px] mx-auto px-6 md:px-12">
                {/* Grid Layout Engine */}
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className={`grid gap-8 md:gap-12 ${activeCategory === 'watchface' || activeCategory === 'icons'
                            ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5' // Dense Grid for assets
                            : 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4' // Standard Mixed Grid
                            }`}
                    >
                        {items.map((item, index) => {
                            // Determine Grid Spans based on 'size' prop
                            let spanClass = "col-span-1 row-span-1";

                            // Only apply dynamic spans in 'ALL' or 'EXPERIMENT' modes
                            if (activeCategory === 'all' || activeCategory === 'experiment' || activeCategory === 'video') {
                                if (item.size === 'wide') spanClass = "md:col-span-2 col-span-1";
                                if (item.size === 'large') spanClass = "md:col-span-2 md:row-span-2 col-span-1";
                            }

                            return (
                                <div key={item.id} className={spanClass}>
                                    <LabItemCard item={item} index={index} />
                                </div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

                {items.length === 0 && !loading && (
                    <div className="py-20 text-center text-zinc-500">
                        No items found in the lab.
                    </div>
                )}
            </div>
        </div>
    );
}
