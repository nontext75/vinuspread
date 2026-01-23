"use client";

import React from 'react';
import { StickySplitBlockData } from '@/types/blocks';
import { motion } from 'framer-motion';

interface StickySplitBlockProps {
    data: StickySplitBlockData;
}

const StickySplitBlock: React.FC<StickySplitBlockProps> = ({ data }) => {
    return (
        <section className="container mx-auto px-4 py-20">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                {/* Sticky Side */}
                <div className="w-full lg:w-1/2">
                    <div className="lg:sticky lg:top-32">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="prose prose-xl prose-invert max-w-none"
                        >
                            {/* Safe to render HTML if trusted source, otherwise sanitize. For now assuming trusted */}
                            <div dangerouslySetInnerHTML={{ __html: data.sticky_content }} />
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Side */}
                <div className="w-full lg:w-1/2 flex flex-col gap-32 pb-20">
                    {data.scroll_content.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="w-full"
                        >
                            {item.type === 'image' && item.src && (
                                <div className="overflow-hidden rounded-lg shadow-2xl">
                                    <img
                                        src={item.src}
                                        alt="Content"
                                        className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                                    />
                                </div>
                            )}

                            {item.type === 'text' && item.text && (
                                <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                                    {item.text}
                                </p>
                            )}

                            {item.type === 'video' && item.src && (
                                <div className="overflow-hidden rounded-lg shadow-2xl aspect-video bg-slate-800">
                                    {/* Placeholder for video component */}
                                    <div className="flex items-center justify-center h-full text-slate-500">
                                        Video: {item.src}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StickySplitBlock;
