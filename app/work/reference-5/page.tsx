'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Plus, Code2, ShieldCheck, Zap, Minus } from 'lucide-react';
import Link from 'next/link';

/**
 * 🧞‍♀️ Jinni's Note (Version 5 Refined: THE HIGH-END ESSENCE - Understated Premium): 
 * 오빠! '텍스트의 과함'을 덜어내고, 압도적인 '이미지 중심의 미학'을 강조한 개선안이에요.
 * 타이포그래피는 4.5vw로 과감하게 줄여서 세련미를 더했고, 아웃라인 스타일과 
 * 세로 배치를 통해 정보가 아닌 하나의 '오브제'처럼 느껴지게 설계했습니다. 🧞‍♀️🏛️💎✨
 */

export default function WorkReferenceFivePage() {
    const { scrollYProgress } = useScroll();

    // Progressive Disclosure for Hero
    const heroContentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const heroContentY = useTransform(scrollYProgress, [0, 0.15], [0, 20]);
    const bgScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

    return (
        <main className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black overflow-x-hidden">

            {/* Section 01: Hero (Visual Impact) 
                - 개선안: 4.5vw 타이틀, Bottom-Left 배치, Outlined Text 활용
            */}
            <section className="relative h-screen w-full flex items-end overflow-hidden p-8 md:p-16">
                <motion.div
                    style={{ scale: bgScale }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2560"
                        alt="High-End Hero"
                        className="w-full h-full object-cover grayscale brightness-[0.3]"
                    />
                    {/* Darken 60% with Gradient for extra depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
                </motion.div>

                <motion.div
                    style={{ opacity: heroContentOpacity, y: heroContentY }}
                    className="relative z-10 w-full flex flex-col md:flex-row justify-between items-end gap-12"
                >
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 text-white/40">
                            <Minus size={20} />
                            <span className="text-[10px] font-black uppercase tracking-[0.8em]">Core Identity</span>
                        </div>
                        <h1 className="text-[10vw] md:text-[4.5vw] font-black tracking-[-0.05em] leading-[0.9] uppercase">
                            THE <br />
                            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>ESSENCE</span>
                        </h1>
                    </div>

                    <div className="max-w-xs text-right hidden md:block">
                        <p className="text-[10px] font-bold text-zinc-500 uppercase leading-loose tracking-[0.2em]">
                            Visualized Precision / <br />
                            Logical Structure / <br />
                            Deep Architecture
                        </p>
                    </div>
                </motion.div>

                {/* Vertical Decorative Text */}
                <div className="absolute top-1/2 right-12 -translate-y-1/2 hidden lg:block opacity-20 pointer-events-none">
                    <span className="text-[10px] font-black uppercase tracking-[2em] whitespace-nowrap origin-center rotate-90 inline-block">
                        SERIES_CODE_X_005
                    </span>
                </div>
            </section>

            {/* Section 02: Core Concept (Technical Depth) 
                - 개선안: 세로형 비주얼 위주의 2분할, 미세한 노이즈
            */}
            <section className="relative py-60 px-6 md:px-12 bg-[#020202] overflow-hidden">
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

                <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-32 items-center">
                    <div className="lg:col-span-4 space-y-16">
                        <div className="space-y-8">
                            <div className="w-12 h-1 bg-white" />
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight uppercase">
                                DEEP <br /> NEXUS
                            </h2>
                        </div>
                        <p className="text-zinc-500 text-lg font-light leading-relaxed">
                            우리는 정보의 본질을 가장 우아한 방식으로 시각화합니다.
                            과시하지 않는 디자인이 전하는 강력한 메시지, 그것이 우리가 지향하는 하이엔드의 정수입니다.
                        </p>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="aspect-[3/4] overflow-hidden border border-white/5"
                            >
                                <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070" className="w-full h-full object-cover grayscale brightness-50" />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="aspect-[3/4] overflow-hidden border border-white/5 md:translate-y-20"
                            >
                                <img src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070" className="w-full h-full object-cover" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 03: Feature & Trust (Data Logic) 
                - 개선안: 숫자 크기 축소, 극도로 얇은 선(Line) 중심의 카드
            */}
            <section className="py-60 px-6 md:px-12 max-w-[1920px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden">
                    {[
                        { icon: <Zap size={18} />, title: 'Performance', val: '+40%', desc: 'Optimization' },
                        { icon: <Code2 size={18} />, title: 'Latency', val: '0.3s', desc: 'Real-time' },
                        { icon: <ShieldCheck size={18} />, title: 'Security', val: '99.9%', desc: 'Safe' }
                    ].map((item, i) => (
                        <div key={i} className="bg-black p-16 space-y-12 transition-colors hover:bg-zinc-900 group">
                            <div className="text-zinc-600 group-hover:text-white transition-colors">{item.icon}</div>
                            <div className="space-y-4">
                                <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">{item.title}</span>
                                <div className="text-4xl font-black tracking-tight">{item.val}</div>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em] pt-4">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* High-End Gallery Break 
                - 개선안: 정보 없이 이미지만으로 압도하는 구간
            */}
            <section className="h-[120vh] relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=2560"
                    className="w-full h-full object-cover fixed top-0 pointer-events-none z-[-1]"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-center space-y-8"
                    >
                        <span className="text-[10px] font-black uppercase tracking-[2em] opacity-40">Visual Pureness</span>
                        <div className="max-w-xl text-zinc-400 font-light leading-relaxed">
                            픽셀 단위의 정교함이 모여 하나의 작품을 완성합니다. <br />
                            우리는 당신의 브랜드가 가진 본연의 아름다움을 가장 깊이 있게 탐구합니다.
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Section 04: The Archive (Final CTA) 
                - 개선안: 대형 텍스트 삭제, 12px 캡션과 번호(Serial Number) 체계 중심
            */}
            <section className="py-60 bg-white text-black px-6 md:px-12 flex flex-col items-center">
                <div className="space-y-32 w-full max-w-4xl text-center">
                    <div className="space-y-8">
                        <span className="text-[10px] font-black uppercase tracking-[1em] opacity-40">Ref: Arch-005</span>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500">
                            THE_FINAL_ARCHIVE_SUITE
                        </h2>
                    </div>

                    <Link href="/work" className="group block">
                        <div className="flex flex-col items-center gap-12">
                            <div className="text-[10px] font-black italic tracking-[0.5em] group-hover:tracking-[1em] transition-all">
                                [ 01 / EXPLORE_COLLECTION ]
                            </div>
                            <div className="w-24 h-24 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                                <ArrowUpRight size={32} />
                            </div>
                        </div>
                    </Link>

                    <div className="grid grid-cols-3 gap-12 pt-40 border-t border-black/5">
                        {[
                            { num: '01', label: 'MODERN' },
                            { num: '02', label: 'PURE' },
                            { num: '03', label: 'BOLD' }
                        ].map((item, i) => (
                            <div key={i} className="space-y-4">
                                <span className="text-[9px] font-black text-zinc-300">{item.num}</span>
                                <p className="text-[10px] font-black tracking-widest">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Back to Base Fixed Link */}
            <Link href="/admin/links" className="fixed bottom-10 right-10 z-50 bg-black text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-4 shadow-2xl hover:scale-105 transition-transform">
                <ArrowLeft size={16} />
                _RETURN_TO_BASE
            </Link>

        </main>
    );
}
