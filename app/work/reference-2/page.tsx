'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Plus } from 'lucide-react';
import Link from 'next/link';

/**
 * 🧞‍♀️ Jinni's Note (Version 2: Modular Narrative - Baunfire Style): 
 * 오빠, 이번에는 우리 메인 시스템의 'Baunfire' 스타일과 완벽하게 조화를 이루는 구조예요.
 * 스티키(Sticky) 레이아웃과 큼직한 타이포그래피, 그리고 모듈형 그리드를 사용해서 
 * 기존 시스템과 이질감 없이 아주 프리미엄한 느낌을 줍니다!
 */

export default function WorkReferenceTwoPage() {
    const { scrollYProgress } = useScroll();

    return (
        <main className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">

            {/* 1. Immersive Sticky Hero
                - 기존 시스템의 '모던 슬레이트' 감성을 유지하면서 텍스트가 위로 올라오는 방식입니다.
            */}
            <section className="relative h-[120vh] w-full">
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2560"
                        alt="Hero"
                        className="w-full h-full object-cover grayscale brightness-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-6"
                        >
                            <h1 className="text-7xl md:text-[14rem] font-black tracking-tighter leading-none uppercase">
                                MODERN <br /> SLATE
                            </h1>
                            <p className="text-sm md:text-xl font-light tracking-[0.5em] text-zinc-400 uppercase">
                                Automotive Experience Design
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. Structured Narrative (Sticky Left)
                - 의도: 왼쪽에는 고정된 텍스트, 오른쪽에는 흘러가는 이미지를 배치하여 읽기 편안한 정보 전달을 유도합니다.
            */}
            <section className="relative px-6 md:px-12 max-w-[1920px] mx-auto py-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Sticky Column */}
                    <div className="lg:sticky lg:top-40 h-fit space-y-12">
                        <div className="space-y-4">
                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">01 / Narrative</span>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                                THE <br /> ARCHITECTURE <br /> OF SPEED
                            </h2>
                        </div>
                        <p className="text-zinc-500 text-lg md:text-xl leading-relaxed font-light max-w-md">
                            우리는 속도라는 추상적인 개념을 디지털 아키텍처로 변환했습니다.
                            사용자가 앱을 켜는 순간부터 목적지에 도착하기까지, 모든 순간이 유기적으로 연결되도록 설계되었습니다.
                        </p>
                        <div className="grid grid-cols-2 gap-8 py-8 border-t border-white/10">
                            <div>
                                <h4 className="text-[9px] font-bold text-zinc-700 uppercase mb-2">Service</h4>
                                <p className="text-sm font-bold uppercase tracking-tight">HMI Design</p>
                            </div>
                            <div>
                                <h4 className="text-[9px] font-bold text-zinc-700 uppercase mb-2">Duration</h4>
                                <p className="text-sm font-bold uppercase tracking-tight">6 Months</p>
                            </div>
                        </div>
                    </div>

                    {/* Scrolling Column */}
                    <div className="space-y-40">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="aspect-[4/5] bg-zinc-900 border border-white/5"
                        >
                            <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070" className="w-full h-full object-cover" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="aspect-[16/9] bg-zinc-900 border border-white/5"
                        >
                            <img src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070" className="w-full h-full object-cover grayscale" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. High-Impact Full-Width Module
                - 의도: 맥락 사이의 분위기를 환기시키는 대형 이미지 모듈입니다.
            */}
            <section className="py-20">
                <div className="w-full aspect-[21/9] bg-zinc-950 overflow-hidden relative group">
                    <img
                        src="https://images.unsplash.com/photo-1542282088-fe8426682e8f?q=80&w=2560"
                        alt="Wide Visual"
                        className="w-full h-full object-cover grayscale opacity-50 transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h3 className="text-4xl md:text-8xl font-black tracking-[0.2em] uppercase opacity-20 pointer-events-none group-hover:opacity-10 transition-opacity">
                            PRECISION
                        </h3>
                    </div>
                </div>
            </section>

            {/* 4. Feature Grid (Modular Card Style)
                - 의도: 개별 기능이나 하이라이트를 카드 형태로 보여줍니다 (기존 PhysicsCard 감성 활용).
            */}
            <section className="py-40 px-6 md:px-12 max-w-[1920px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">SYSTEM HIGHLIGHTS</h2>
                    <p className="text-zinc-500 font-light max-w-sm">주요 인터랙션과 디자인 시스템의 핵심 컴포넌트들을 소개합니다.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        { title: 'Dynamic HUD', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000' },
                        { title: 'Fluid Navigation', img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000' },
                        { title: 'Smart Cockpit', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000' }
                    ].map((item, i) => (
                        <div key={i} className="group space-y-6">
                            <div className="aspect-[4/5] bg-zinc-900 border border-white/10 overflow-hidden rounded-sm relative">
                                <img src={item.img} className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110" />
                                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Plus className="text-white bg-black/50 p-2 rounded-full backdrop-blur-sm" size={40} />
                                </div>
                            </div>
                            <h4 className="text-xl font-bold uppercase tracking-tight">{item.title}</h4>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. Baunfire Conclusion CTA
                - 의도: 이탈 방지 및 다음 여정으로의 강력한 유도 (Full-screen CTA).
            */}
            <section className="py-60 bg-white text-black text-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="space-y-12"
                >
                    <span className="text-[10px] font-black uppercase tracking-[1em] opacity-40">Ready to build?</span>
                    <Link href="/work" className="block group">
                        <h2 className="text-6xl md:text-[12rem] font-black tracking-[0.05em] leading-none uppercase transition-all duration-500 group-hover:tracking-tighter">
                            NEXT <br /> PROJECT
                        </h2>
                        <div className="mt-20 inline-flex items-center gap-6 border-b-2 border-black pb-4 group-hover:translate-x-4 transition-transform">
                            <span className="text-2xl font-black uppercase tracking-widest italic">Go Explore</span>
                            <ArrowUpRight size={40} strokeWidth={3} />
                        </div>
                    </Link>
                </motion.div>
            </section>

        </main>
    );
}
