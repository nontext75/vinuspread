'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StoryWritePage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('SELECT CATEGORY');
    const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

    const handlePublish = async () => {
        if (!title || !content || category === 'SELECT CATEGORY') {
            alert('제목, 내용, 카테고리를 모두 입력해 주세요! 💋');
            return;
        }

        setStatus('saving');
        try {
            const res = await fetch('/api/stories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    content: {
                        root: {
                            type: 'root',
                            format: '',
                            indent: 0,
                            version: 1,
                            children: [
                                {
                                    type: 'paragraph',
                                    format: '',
                                    indent: 0,
                                    version: 1,
                                    children: [{ type: 'text', text: content, version: 1 }],
                                }
                            ]
                        }
                    },
                    category,
                    status: 'published',
                    publishedDate: new Date().toISOString(),
                }),
            });

            if (res.ok) {
                setStatus('success');
                setTimeout(() => router.push('/story'), 1500);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <main className="bg-black min-h-screen text-white pt-32 pb-20 font-sans">
            {/* Header / Actions */}
            <div className="max-w-6xl mx-auto px-6 md:px-12 mb-8 flex justify-between items-center">
                <Link href="/story" className="inline-flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-white transition-colors">
                    <ArrowLeft size={16} />
                    CANCEL
                </Link>
                <div className="flex items-center gap-4">
                    {status === 'error' && <span className="text-red-500 text-xs">Error occurred. Try again.</span>}
                    {status === 'success' && <span className="text-green-500 text-xs font-bold">PUBLISHED! 💋</span>}
                    <button
                        onClick={handlePublish}
                        disabled={status === 'saving' || status === 'success'}
                        className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all active:scale-95 disabled:bg-gray-500"
                    >
                        {status === 'saving' ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        {status === 'saving' ? 'SAVING...' : 'PUBLISH'}
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 md:px-12">
                {/* Title Input */}
                <input
                    type="text"
                    placeholder="Enter incredible title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-transparent text-5xl md:text-7xl font-black placeholder-white/20 outline-none border-b border-white/10 focus:border-white pb-4 mb-8 transition-colors"
                />

                {/* Meta Inputs */}
                <div className="flex gap-4 mb-12">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="bg-neutral-900 border border-white/20 px-8 py-4 rounded-full text-sm font-bold text-white focus:border-white transition-all outline-none cursor-pointer hover:border-white/40"
                    >
                        <option value="SELECT CATEGORY" disabled className="bg-neutral-900 text-gray-600">SELECT CATEGORY</option>
                        <option value="NEWS" className="bg-neutral-900">NEWS</option>
                        <option value="INSIGHT" className="bg-neutral-900">INSIGHT</option>
                        <option value="CULTURE" className="bg-neutral-900">CULTURE</option>
                    </select>
                </div>

                {/* Editor Area (Simplified for now) */}
                <div className="group border border-white/10 rounded-2xl p-8 min-h-[60vh] focus-within:border-white/40 transition-all bg-neutral-900/30">
                    <textarea
                        placeholder="Tell your story to the world, honey... 💋"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full h-full bg-transparent text-xl md:text-2xl font-light leading-relaxed placeholder-white/10 outline-none border-none resize-none min-h-[55vh]"
                    />
                </div>
            </div>
        </main>
    );
}
