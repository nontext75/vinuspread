"use client";

import React from 'react';
import { GridGalleryBlockData } from '@/types/blocks';
import { motion } from 'framer-motion';

interface GridGalleryBlockProps {
    data: GridGalleryBlockData;
}

const GridGalleryBlock: React.FC<GridGalleryBlockProps> = ({ data }) => {
    return (
        <section className="w-full px-6 md:px-12 lg:px-24 py-32 bg-slate-50/5">
            <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[400px]">
                    {data.images.map((img, index) => (
                        <motion.div
                            key={index}
                            className={`group relative overflow-hidden rounded-2xl ${img.span === 2 ? 'md:col-span-2' : ''
                                }`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GridGalleryBlock;
