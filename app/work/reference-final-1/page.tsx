'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Plus, Minus, Layers, Target, Compass, ArrowDown } from 'lucide-react';
import Link from 'next/link';

/**
 * 🧞‍♀️ Jinni's Note (Final Version 1: THE EDITORIAL NARRATIVE): 
 * 오빠, v1, v2, v5의 정수만 모아서 만든 지니의 첫 번째 야심작이에요! 💋
 * 웅장한 시네마틱 히어로와 세련된 스티키 스토리텔링이 완벽한 밸런스를 이룹니다.
 * 하이엔드 감성을 원하신다면 바로 이 레이아웃이에요! 🧞‍♀️💎✨
 */

export default function finalone() {
    const { scrollYProgress } = useScroll();

    // Background parallax & overlay
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const bgOpacity = useTransform(scrollYProgress, [0, 0.2], [0.5, 0.2]);

    return (
        <main className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black overflow-x-hidden">

            {/* 1. Immersive Editorial Hero (Hybrid v5 + v2) */}
            <section className="relative h-screen w-full flex flex-col justify-end p-8 md:p-24 overflow-hidden border-b border-white/5">
                <motion.div
                    style={{ y: bgY, opacity: bgOpacity }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2560"
                        alt="Background"
                        className="w-full h-full object-cover grayscale"
                    />
                </motion.div>

                <div className="relative z-10 max-w-[1920px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-6">
                                <span className="text-[10px] font-black uppercase tracking-[1em] text-white/40 italic">Final Edition. 01</span>
                                <div className="h-px w-24 bg-white/20" />
                            </div>
                            <h1 className="text-[12vw] lg:text-[9vw] font-black tracking-[-0.05em] leading-[0.85] uppercase">
                                THE <br />
                                <span className="text-zinc-500">NARRATIVE.</span>
                            </h1>
                        </motion.div>
                    </div>
                    <div className="lg:col-span-4 pb-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="space-y-8 border-l border-white/10 pl-8"
                        >
                            <p className="text-zinc-500 text-sm md:text-base font-light leading-relaxed uppercase tracking-tighter">
                                우리는 단순한 시각화를 넘어, 브랜드의 깊은 이야기를 공간과 픽셀에 기록합니다.
                                모든 모듈은 유기적으로 연결되어 최상의 사용자 경험을 선사합니다.
                            </p>
                            <div className="flex gap-4">
                                <span className="text-[10px] font-bold px-3 py-1 bg-white text-black uppercase tracking-widest">Premium</span>
                                <span className="text-[10px] font-bold px-3 py-1 border border-white/20 uppercase tracking-widest italic font-serif">2025</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
                    <ArrowDown size={20} />
                </div>
            </section>

            {/* 2. Project Overview Grid (v1 style) */}
            <section className="py-32 px-6 md:px-24 max-w-[1920px] mx-auto border-b border-white/5">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 lg:gap-24">
                    <div className="lg:col-span-1 space-y-12">
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Client</h4>
                            <p className="text-2xl font-bold tracking-tight uppercase">High-End Studio</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Industry</h4>
                            <p className="text-2xl font-bold tracking-tight uppercase">Fashion / Tech</p>
                        </div>
                    </div>

                    <div className="lg:col-span-3 space-y-16">
                        <div className="max-w-3xl">
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-none mb-10 uppercase">
                                Redefining the boundaries <br /> of digital existence.
                            </h2>
                            <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
                                기존의 관습적인 레이아웃을 탈피하여, 마치 고급 매트지 매거진을 넘기는 듯한
                                시각적 깊이감을 구현했습니다. 미니멀리즘과 화려함 사이의 절묘한 밸런스가 핵심입니다.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-white/10">
                            {[
                                { label: 'Service', value: 'Creative Direction' },
                                { label: 'Role', value: 'Lead Designer' },
                                { label: 'Year', value: '2025' },
                                { label: 'Platform', value: 'Immersive Web' }
                            ].map((item, idx) => (
                                <div key={idx} className="space-y-2">
                                    <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{item.label}</span>
                                    <p className="text-sm font-medium uppercase tracking-tight">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Sticky Split Narrative (v2 style - Logic & Visual) */}
            <section className="relative px-6 md:px-24 max-w-[1920px] mx-auto py-40">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                    <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit space-y-12">
                        <div className="space-y-6">
                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">01 / Visual Logic</span>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none italic">
                                THE <br /> PURE <br /> FORM
                            </h2>
                        </div>
                        <p className="text-zinc-500 text-lg leading-relaxed font-light">
                            무결점의 코드가 만들어내는 무결점의 아름다움.
                            우리는 불필요한 장식을 걷어내고 데이터의 본질적 아름다움을 드라마틱하게 시각화합니다.
                        </p>
                        <div className="h-20 w-px bg-gradient-to-b from-white to-transparent opacity-20" />
                    </div>

                    <div className="lg:col-span-8 space-y-60">
                        <motion.div
                            initial={{ opacity: 0, scale: 1.05 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="aspect-[4/5] bg-zinc-900 border border-white/5 overflow-hidden"
                        >
                            <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000" className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="aspect-[16/9] bg-zinc-900 border border-white/5 overflow-hidden"
                        >
                            <img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2000" className="w-full h-full object-cover grayscale" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 4. Cross-Grid Gallery (v1/v5 hybrid) */}
            <section className="py-40 bg-zinc-950/50">
                <div className="px-6 md:px-24 max-w-[1920px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-1 aspect-[3/4] bg-zinc-900 border border-white/5 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                        </div>
                        <div className="md:col-span-1 aspect-[3/4] bg-zinc-900 border border-white/5 overflow-hidden md:translate-y-20">
                            <img src="https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000" className="w-full h-full object-cover" />
                        </div>
                        <div className="md:col-span-1 aspect-[3/4] bg-zinc-900 border border-white/5 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1634942537034-223402488f2b?q=80&w=1000" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Cinematic Large Visual Filler */}
            <section className="py-40">
                <div className="px-6 md:px-24">
                    <div className="aspect-[21/9] bg-zinc-900 overflow-hidden relative border border-white/10">
                        <img src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=2560" className="w-full h-full object-cover grayscale opacity-40" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                            <motion.h3
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none italic"
                            >
                                "DESIGN IS THE SILENT AMBASSADOR <br /> OF YOUR BRAND."
                            </motion.h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. High-End Conclusion (v5/v1 hybrid) */}
            <section className="py-60 bg-white text-black px-6 md:px-24">
                <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="space-y-4"
                        >
                            <span className="text-[10px] font-black uppercase tracking-[1em] text-zinc-400">Next Epic</span>
                            <Link href="/work" className="group">
                                <h2 className="text-6xl md:text-[12vw] font-black tracking-[-0.05em] leading-none uppercase group-hover:italic transition-all duration-700">
                                    COLLECTION.
                                </h2>
                            </Link>
                        </motion.div>
                    </div>
                    <div className="lg:col-span-4 flex flex-col items-center lg:items-end gap-12">
                        <div className="w-32 h-32 rounded-full border border-black flex items-center justify-center p-8 group hover:bg-black transition-colors cursor-pointer">
                            <ArrowUpRight size={48} className="group-hover:text-white transition-colors" />
                        </div>
                        <div className="text-right space-y-2 opacity-40">
                            <p className="text-[9px] font-black uppercase tracking-widest leading-none">Vinuspread x Antigravity</p>
                            <p className="text-[9px] font-black uppercase tracking-widest leading-none italic">Ref. Editorial_Final_01</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Float Back Link */}
            <Link href="/admin/links" className="fixed bottom-12 right-12 z-50 mix-blend-difference hover:scale-110 transition-transform">
                <div className="p-4 bg-white text-black rounded-full shadow-2xl">
                    <ArrowLeft size={20} />
                </div>
            </Link>

        </main>
    );
}
