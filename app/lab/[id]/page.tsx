'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Download, Heart, MessageCircle, Share2, Maximize2, Play, Code, ArrowUpRight, Monitor, Layers, Palette, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { LAB_ITEMS, LabItem } from '@/lib/mock/lab-items';

// --- Category Label Mapping ---
const CATEGORY_LABELS: Record<string, string> = {
    'watchface': 'Watchface',
    'emoticon': 'Emoticon',
    'icons': 'Icon',
    'experiment': 'Experiment',
    'video': 'Video',
    'interactive': 'Interactive'
};

// --- Shared Components ---

const DetailHeader = ({ title, category }: { title: string, category: string }) => {
    // Get display label or fallback to uppercase slug
    const displayCategory = CATEGORY_LABELS[category] || category.toUpperCase();

    return (
        <div className="mb-12">
            <div className="flex items-center gap-2 text-zinc-500 mb-8 font-mono text-sm tracking-widest uppercase">
                <Link href="/lab" className="hover:text-white transition-colors">LAB</Link>
                <ChevronRight size={14} />
                <span className="text-amber-500">{displayCategory}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">{title}</h1>

                <div className="flex gap-4">
                    <button className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                        <Share2 size={20} />
                    </button>
                    <button className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                        <Heart size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const DetailMeta = ({ item, downloadLabel = "DOWNLOAD" }: { item: LabItem, downloadLabel?: string }) => (
    <div className="space-y-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 border-t border-b border-white/10 py-8">
            <div>
                <div className="text-zinc-500 text-xs uppercase tracking-widest mb-2 font-mono">DATE</div>
                <div className="font-mono text-lg">{new Date(item.created_at).toLocaleDateString()}</div>
            </div>
            <div>
                <div className="text-zinc-500 text-xs uppercase tracking-widest mb-2 font-mono">LICENSE</div>
                <div className="font-mono text-lg">MIT / CC0</div>
            </div>
            <div>
                <div className="text-zinc-500 text-xs uppercase tracking-widest mb-2 font-mono">DOWNLOADS</div>
                <div className="font-mono text-lg">{item.stats.download.toLocaleString()}</div>
            </div>
            <div>
                <div className="text-zinc-500 text-xs uppercase tracking-widest mb-2 font-mono">LIKES</div>
                <div className="font-mono text-lg">{item.stats.like.toLocaleString()}</div>
            </div>
        </div>

        <div className="flex justify-center">
            {/* Control width to not be full-bleed on large screens, max-width of previous sidebar style */}
            <button className="w-full md:max-w-[420px] bg-white text-black font-bold h-16 rounded-full hover:bg-zinc-200 transition-colors flex items-center justify-center gap-3 text-lg tracking-wide">
                <Download size={22} />
                {downloadLabel}
            </button>
        </div>
    </div>
);

const DetailDescription = ({ description }: { description: string }) => (
    <div className="space-y-6 mb-12 max-w-4xl">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4 font-mono">OVERVIEW</h3>
        <p className="text-zinc-400 leading-loose text-lg font-light break-keep">{description}</p>
    </div>
);

// --- 1. Asset View (Watchface, Emoticon, Icon) ---
const AssetView = ({ item }: { item: LabItem }) => {
    // Get display label or fallback to uppercase slug
    const category = item.category.toLowerCase();
    const displayCategory = CATEGORY_LABELS[category] || category.toUpperCase();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                <div className="aspect-square relative rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 group">
                    <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((_, idx) => (
                        <div key={idx} className="aspect-square rounded-xl bg-zinc-900 border border-white/10 overflow-hidden relative opacity-40 hover:opacity-100 cursor-pointer transition-all hover:border-white/50">
                            <div className="w-full h-full bg-white/5" />
                        </div>
                    ))}
                </div>
            </motion.div>

            <div className="lg:pt-4">
                <div className="flex items-center gap-3 mb-8 pb-8 border-b border-white/10">
                    {category === 'watchface' && <Monitor className="text-amber-500" size={24} />}
                    {category === 'emoticon' && <MessageCircle className="text-amber-500" size={24} />}
                    {category === 'icons' && <Layers className="text-amber-500" size={24} />}
                    <span className="text-2xl font-bold capitalize tracking-tight">{displayCategory}</span>
                </div>

                <DetailDescription description={item.description} />
                <DetailMeta item={item} downloadLabel="DOWNLOAD PACK" />
            </div>
        </div>
    );
};

// --- 2. Interactive View (Interactive) ---
const InteractiveView = ({ item }: { item: LabItem }) => (
    <div className="flex flex-col gap-12">
        {/* HOISTED DESCRIPTION */}
        <DetailDescription description={item.description} />

        <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full aspect-[21/9] bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl mb-8"
        >
            {item.videoUrl ? (
                <video
                    src={item.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900">
                    <Play className="text-white/10 w-32 h-32 mb-8" />
                    <p className="text-zinc-600 font-mono text-sm tracking-[0.2em] uppercase">PREVIEW</p>
                </div>
            )}
        </motion.div>

        <div className="border-t border-white/10 pt-12">
            <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5 font-mono mb-12">
                <div className="flex gap-4 mb-4 border-b border-white/5 pb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <p className="text-green-400 mb-2 font-mono">npm install {item.id}-module</p>
                <p className="text-zinc-500 font-mono">Package installed. Ready to use.</p>
            </div>

            <DetailMeta item={item} />
        </div>
    </div>
);

// --- 3. Experiment View (General) ---
const ExperimentView = ({ item }: { item: LabItem }) => (
    <div className="flex flex-col gap-12">
        {/* HOISTED DESCRIPTION */}
        <DetailDescription description={item.description} />

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full aspect-[16/10] bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 relative mb-8"
        >
            {item.type === 'video' || item.videoUrl ? (
                <video
                    src={item.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                />
            ) : (
                <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover"
                />
            )}
        </motion.div>

        <div className="border-t border-white/10 pt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {['GLSL', 'Physics', 'Generative', 'Noise'].map(tag => (
                    <div key={tag} className="text-center py-4 rounded-xl bg-zinc-900/50 border border-white/5 text-zinc-400 text-sm hover:bg-white/5 transition-colors cursor-default font-mono uppercase tracking-widest">{tag}</div>
                ))}
            </div>

            <DetailMeta item={item} />
        </div>
    </div>
);


export default function LabDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const item = LAB_ITEMS.find(i => i.id === id) || LAB_ITEMS[0];

    // Fallback if data is totally empty (rare)
    if (!item) return <div className="min-h-screen bg-black text-white pt-40 px-12 font-mono">LOADING...</div>;

    const category = item.category.toLowerCase();

    let ViewComponent;

    if (['watchface', 'emoticon', 'icons'].includes(category)) {
        ViewComponent = AssetView;
    } else if (['interactive'].includes(category)) {
        ViewComponent = InteractiveView;
    } else {
        ViewComponent = ExperimentView;
    }

    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-32 px-6 md:px-12">
            <div className="max-w-[1800px] mx-auto">
                <DetailHeader title={item.title} category={category} />
                <div className="mt-8">
                    <ViewComponent item={item} />
                </div>
            </div>
        </main>
    );
}
