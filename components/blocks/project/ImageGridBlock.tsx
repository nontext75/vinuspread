'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ImageGridBlockData } from '@/types/blocks';
import { cn } from '@/lib/utils';

interface ImageGridBlockProps {
    data: ImageGridBlockData;
}

const ImageGridBlock: React.FC<ImageGridBlockProps> = ({ data }) => {
    const renderLayout = () => {
        switch (data.layout) {
            case 'full':
                return (
                    <div className="space-y-12">
                        {data.images.map((img, i) => (
                            <motion.figure
                                key={i}
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full aspect-[21/9] overflow-hidden bg-zinc-900 border border-white/5"
                            >
                                <img src={img.src} alt={img.alt || ''} className="w-full h-full object-cover" />
                                {img.caption && <figcaption className="mt-4 text-[10px] uppercase tracking-widest text-zinc-500">{img.caption}</figcaption>}
                            </motion.figure>
                        ))}
                    </div>
                );
            case 'grid':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {data.images.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="aspect-square md:aspect-video w-full overflow-hidden bg-zinc-900 border border-white/5"
                            >
                                <img src={img.src} alt={img.alt || ''} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                            </motion.div>
                        ))}
                    </div>
                );
            default:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {data.images.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="aspect-[4/5] w-full overflow-hidden bg-zinc-900 border border-white/5"
                            >
                                <img src={img.src} alt={img.alt || ''} className="w-full h-full object-cover" />
                            </motion.div>
                        ))}
                    </div>
                );
        }
    };

    return (
        <section className="py-24">
            {renderLayout()}
        </section>
    );
};

export default ImageGridBlock;
