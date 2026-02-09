'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TextSectionBlockData } from '@/types/blocks';
import { cn } from '@/lib/utils';

interface TextSectionBlockProps {
    data: TextSectionBlockData;
}

const TextSectionBlock: React.FC<TextSectionBlockProps> = ({ data }) => {
    const alignmentClass = {
        left: 'text-left mr-auto',
        center: 'text-center mx-auto',
        right: 'text-right ml-auto',
    }[data.alignment || 'left'];

    return (
        <section className="py-24">
            <div className={cn("max-w-4xl w-full", alignmentClass)}>
                {data.title && (
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-12"
                    >
                        {data.title}
                    </motion.h2>
                )}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 1 }}
                    className="prose prose-invert prose-2xl max-w-none 
                               prose-p:text-zinc-500 prose-p:font-light prose-p:leading-relaxed prose-p:mb-8
                               prose-headings:text-white prose-headings:tracking-tighter prose-headings:font-black
                               prose-strong:text-white prose-strong:font-bold prose-blockquote:border-white/20"
                    dangerouslySetInnerHTML={{
                        __html: (data.content || '').replace(
                            /src="(https?:\/\/(?:www\.)?vinus\.co\.kr\/[^"]+)"/g,
                            (match, url) => `src="/api/proxy-image?url=${encodeURIComponent(url)}"`
                        )
                    }}
                />
            </div>
        </section>
    );
};

export default TextSectionBlock;
