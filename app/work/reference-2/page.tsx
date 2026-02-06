'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Plus, MoveRight } from 'lucide-react';
import Link from 'next/link';

/**
 * 🧞‍♀️ Jinni's Note (Version 2: Editorial Minimal): 
 * 오빠, 이번에는 조금 더 정갈하고 잡지 같은(Editorial) 느낌의 레이아웃을 가져왔어요.
 * 첫 번째 버전이 '영화' 같았다면, 이 버전은 '프리미엄 매거진' 같은 느낌이에요.
 */

export default function WorkReferenceTwoPage() {
    return (
        <main className="bg-[#0a0a0a] text-white min-h-screen font-sans selection:bg-white selection:text-black">

            {/* 1. Minimalist Header
                - 의도: 여백의 미를 살려 브랜드의 고결함을 강조합니다.
            */}
            <header className="pt-40 pb-20 px-6 md:px-12 max-w-[1920px] mx-auto border-b border-white/5">
                <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 text-zinc-500"
                        >
                            <span className="text-[10px] font-mono tracking-widest uppercase">Portfolio v.2</span>
                            <div className="w-12 h-px bg-zinc-800" />
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-6xl md:text-9xl font-light tracking-tight leading-none"
                        >
                            Editorial <br />
                            <span className="font-serif italic pl-12 md:pl-24">Aesthetics</span>
                        </motion.h1>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="max-w-xs text-right space-y-4"
                    >
                        <p className="text-sm text-zinc-400 font-light leading-relaxed">
                            우리는 복잡함을 거부하고 본질에 집중합니다.
                            여백은 낭비가 아니라, 메시지가 숨 쉬는 공간입니다.
                        </p>
                        <div className="text-[10px] font-bold tracking-widest uppercase underline underline-offset-8">
                            Concept 2025
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* 2. Side-Scrolling or Wide Storytelling
                - 의도: 시각적 긴장감을 조절하는 변칙적인 레이아웃입니다.
            */}
            <section className="py-40">
                <div className="px-6 md:px-12 max-w-[1920px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                        {/* Sticky Info Sidebar */}
                        <aside className="lg:col-span-3 space-y-20 lg:sticky lg:top-40 h-fit">
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Outline</h4>
                                <p className="text-zinc-400 text-sm leading-loose font-light">
                                    이 섹션은 이미지와 함께 설명이 따라가는 'Sticky' 방식이에요.
                                    사용자가 스크롤 하는 동안 왼쪽의 텍스트가 고정되어 정보를 계속 전달하죠.
                                </p>
                            </div>
                            <div className="space-y-8">
                                <Plus size={24} className="text-zinc-700" />
                                <div className="space-y-2">
                                    <span className="block text-[10px] font-bold uppercase">Photography</span>
                                    <span className="block text-xl font-light">Unsplash Studio</span>
                                </div>
                                <div className="space-y-2">
                                    <span className="block text-[10px] font-bold uppercase">Typography</span>
                                    <span className="block text-xl font-light">Inter Variable</span>
                                </div>
                            </div>
                        </aside>

                        {/* Content Images */}
                        <div className="lg:col-span-9 space-y-40">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="aspect-[16/10] bg-zinc-900 overflow-hidden"
                            >
                                <img src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2067" className="w-full h-full object-cover" />
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="aspect-[4/5] bg-zinc-900"
                                >
                                    <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070" className="w-full h-full object-cover grayscale" />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="aspect-[4/5] bg-zinc-900 md:mt-24"
                                >
                                    <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070" className="w-full h-full object-cover" />
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="aspect-[21/9] bg-zinc-900"
                            >
                                <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070" className="w-full h-full object-cover" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Quote Section
                - 의도: 프로젝트의 철학이나 클라이언트 피드백을 강조합니다.
            */}
            <section className="py-60 bg-white text-black">
                <div className="max-w-5xl mx-auto px-6 text-center space-y-12">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Design Philosophy</span>
                    <h2 className="text-4xl md:text-7xl font-light tracking-tight leading-tight">
                        "좋은 디자인은 눈에 띄는 것이 아니라, <br />
                        <span className="font-serif italic">기억되는 것이다."</span>
                    </h2>
                </div>
            </section>

            {/* 4. Details Gallery
                - 의도: 변칙적인 크기의 그리드로 시각적 재미를 줍니다.
            */}
            <section className="py-40 px-6 md:px-12 max-w-[1920px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-2 aspect-video bg-zinc-900">
                        <img src="https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=2000" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-square bg-zinc-900">
                        <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000" className="w-full h-full object-cover grayscale" />
                    </div>
                    <div className="aspect-square bg-zinc-900">
                        <img src="https://images.unsplash.com/photo-1522542550221-31fd19255a08?q=80&w=1000" className="w-full h-full object-cover" />
                    </div>
                </div>
            </section>

            {/* 5. Minimal CTA
                - 의도: 여백을 극대화하여 깔끔한 마무리를 지향합니다.
            */}
            <section className="py-80 px-6 text-center">
                <Link href="/work" className="group space-y-8 block">
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Next Story</span>
                    <h2 className="text-5xl md:text-[8rem] font-light tracking-tighter uppercase group-hover:tracking-widest transition-all duration-1000">
                        Character <br />
                        <span className="font-serif italic">YOMO</span>
                    </h2>
                    <div className="flex justify-center pt-12">
                        <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                            <MoveRight size={32} />
                        </div>
                    </div>
                </Link>
            </section>

        </main>
    );
}
