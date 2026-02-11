'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, Download, MessageCircle } from 'lucide-react';
import Image from 'next/image';

interface LabItemCardProps {
    item: any;
    index: number;
}

const LabItemCard: React.FC<LabItemCardProps> = ({ item, index }) => {
    // Helper to handle image URLs safely
    const getImageUrl = (url: any) => {
        if (!url) return '/placeholder-lab.jpg';
        if (typeof url === 'string') return url;
        if (url.url) return url.url; // Payload media object
        return '/placeholder-lab.jpg';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group relative"
        >
            <Link href={`/lab/${item.id}`} className="block">
                {/* Image Container - Matching Work Page Aspect Ratio & Style */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-900 mb-6 border border-white/5 transition-colors duration-500 group-hover:border-white/20">
                    <Image
                        src={getImageUrl(item.thumbnail)}
                        alt={item.title}
                        fill
                        className="object-cover transition-all duration-700 ease-out grayscale group-hover:grayscale-0 group-hover:scale-105"
                    />

                    {/* Overlay (Subtle) */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                    {/* Hover Icon (Clean) - Optional, similar to work page */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 bg-white text-black p-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest">View</span>
                    </div>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-2 group-hover:border-white/40 transition-colors duration-300">
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight uppercase group-hover:text-white transition-colors">{item.title}</h3>
                        <div className="flex gap-2">
                            <span className="text-[10px] font-mono opacity-50 border border-white/20 px-2 py-0.5 rounded-full uppercase">
                                {item.category}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-xs text-zinc-500 font-mono uppercase">
                        <span>{item.description || 'Digital Asset'}</span>
                        <div className="flex gap-4">
                            <span className="flex items-center gap-1 hover:text-white transition-colors"><Download className="w-3 h-3" /> {item.download_count || 0}</span>
                            <span className="flex items-center gap-1 hover:text-white transition-colors"><Heart className="w-3 h-3" /> {item.like_count || 0}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default LabItemCard;
