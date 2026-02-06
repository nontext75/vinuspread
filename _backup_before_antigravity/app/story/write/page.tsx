'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { useState } from 'react';

export default function StoryWritePage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    return (
        <main className="bg-black min-h-screen text-white pt-32 pb-20">
            {/* Header / Actions */}
            <div className="px-6 md:px-12 mb-8 flex justify-between items-center">
                <Link href="/story" className="inline-flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-white transition-colors">
                    <ArrowLeft size={16} />
                    CANCEL
                </Link>
                <button className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors">
                    <Save size={18} />
                    PUBLISH
                </button>
            </div>

            <div className="max-w-4xl mx-auto px-6 md:px-12">
                {/* Title Input */}
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-transparent text-5xl md:text-7xl font-black placeholder-white/40 outline-none border-b border-white/20 focus:border-white pb-4 mb-8 transition-colors"
                />

                {/* Meta Inputs (Mock) */}
                <div className="flex gap-4 mb-12">
                    <select className="bg-neutral-900 border border-white/30 px-6 py-3 rounded-full text-sm font-mono text-white focus:border-white transition-colors outline-none cursor-pointer">
                        <option className="bg-neutral-900 text-gray-500">SELECT CATEGORY</option>
                        <option className="bg-neutral-900">NEWS</option>
                        <option className="bg-neutral-900">INSIGHT</option>
                        <option className="bg-neutral-900">CULTURE</option>
                    </select>
                </div>

                {/* Editor Area */}
                <div className="border border-white/20 rounded-xl p-6 min-h-[60vh] focus-within:border-white/50 transition-colors">
                    <textarea
                        placeholder="Tell your story..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full h-full bg-transparent text-lg md:text-xl font-light leading-relaxed placeholder-white/30 outline-none border-none resize-none min-h-[55vh]"
                    />
                </div>
            </div>
        </main>
    );
}
