"use client";

import React from 'react';
import { StickySplitBlockData } from '@/types/blocks';
import { motion } from 'framer-motion';

interface StickySplitBlockProps {
    data: StickySplitBlockData;
}

const StickySplitBlock: React.FC<StickySplitBlockProps> = ({ data }) => {
    return (
        <section className="w-full px-6 md:px-12 py-40 md:py-64"> {/* Increased vertical spacing */}
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
                {/* Sticky Side */}
                <div className="w-full lg:w-5/12">
                    <div className="lg:sticky lg:top-32">
                        <motion.div
                            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                            transition={{ duration: 1.0, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-10%" }}
                            className="max-w-none"
                        >
                            {/* Safe to render HTML if trusted source, otherwise sanitize. For now assuming trusted */}
                            <div dangerouslySetInnerHTML={{ __html: data.sticky_content }} />
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Side */}
                <div className="w-full lg:w-1/2 flex flex-col gap-40 pb-20"> {/* Increased gap between items */}
                    {data.scroll_content.map((item, index) => (
                        <motion.div
                            key={index}
                            className="w-full"
                        >
                            {item.type === 'image' && item.src && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 50 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: "circOut" }}
                                    viewport={{ once: true, margin: "-15%" }}
                                    className="overflow-hidden rounded-lg shadow-2xl"
                                >
                                    <motion.img
                                        src={item.src}
                                        alt="Content"
                                        className="w-full h-auto object-cover"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                    />
                                </motion.div>
                            )}

                            {item.type === 'text' && (
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    viewport={{ once: true, margin: "-10%" }}
                                >
                                    {/* Legacy/Simple Text */}
                                    {item.text && !item.title && (
                                        <div dangerouslySetInnerHTML={{ __html: item.text }} className="text-lg md:text-xl text-slate-400 leading-relaxed font-light" />
                                    )}

                                    {/* Structured Bilingual Text */}
                                    {item.title && (
                                        <div className="mb-16 pl-6 border-l-2 border-foreground/10"> {/* Added accent border */}
                                            <h3 className="text-3xl md:text-4xl font-semibold mb-4">{item.title}</h3>
                                            <p className="text-xl md:text-2xl mb-2 font-light">{item.description_en}</p>
                                            <p className="text-sm text-muted-foreground font-light">{item.description_ko}</p>
                                        </div>
                                    )}
                                </motion.div>
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
