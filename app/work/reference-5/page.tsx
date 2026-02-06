'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Plus, Code2, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

/**
 * 🧞‍♀️ Jinni's Note (Version 5: THE HIGH-END ESSENCE): 
 * 오빠! 팀에서 보내주신 가이드라인을 완벽하게 분석해서 만든 '최종 끝판왕' 버전이에요. 
 * Modern Slate의 대담함과 Deep Space의 정교한 질서가 결합된, 
 * 말 그대로 '비너스스프레드'의 정수를 담은 하이엔드 레이아웃입니다. 🧞‍♀️🏛️💎✨
 */

export default function WorkReferenceFivePage() {
    const { scrollYProgress } = useScroll();

    // Motion Values for Hero
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

    return (
        <main className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black overflow-x-hidden">

            {/* Section 01: Hero (Visual Impact) 
                - Guide: 전체 화면 이미지 + 중앙 압도적 타이포그래피 (12vw)
            */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2560"
                        alt="High-End Hero"
                        className="w-full h-full object-cover grayscale brightness-[0.4]"
                    />
                    {/* 블랙 오버레이 for 가독성 */}
                    <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                </motion.div>

                <div className="relative z-10 w-full px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[14vw] md:text-[12vw] font-black tracking-[-0.05em] leading-[0.85] uppercase"
                    >
                        THE <br /> ESSENCE
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mt-12 flex flex-col items-center gap-4"
                    >
                        <span className="text-xs font-bold tracking-[0.8em] text-white/40 uppercase">Vinuspread Premium Series</span>
                        <div className="w-12 h-px bg-white/20" />
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 overflow-hidden h-16 w-px bg-white/10">
                    <motion.div
                        animate={{ y: [0, 64] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-full h-1/2 bg-white"
                    />
                </div>
            </section>

            {/* Section 02: Core Concept (Technical Depth)
                - Guide: 2분할 레이아웃, 미세한 노이즈 질감, 기술적 디테일
            */}
            <section className="relative py-40 px-6 md:px-12 bg-[#050505] overflow-hidden">
                {/* 미세한 노이즈 질감 (Grain Effect) */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

                <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 relative z-10">
                    <div className="lg:col-span-5 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">01 / Core Logic</span>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-none uppercase">
                                DEEP <br /> NEXUS <br /> HYBRID
                            </h2>
                        </motion.div>
                        <p className="text-zinc-500 text-lg md:text-xl font-light leading-relaxed max-w-lg">
                            이 템플릿은 단순한 시각화를 넘어 데이터의 논리적 흐름을 정의합니다.
                            사용자 경험의 모든 터치포인트는 수학적으로 계산된 그리드 위에 배치되어
                            가장 완벽한 정보 전달력을 보장합니다.
                        </p>
                    </div>

                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="aspect-video bg-zinc-900 border border-white/5 rounded-sm overflow-hidden relative group"
                        >
                            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070" className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 transition-all duration-1000" />

                            {/* Technical Detail Overlay (Code View) */}
                            <div className="absolute top-6 right-6 p-6 bg-black/80 backdrop-blur-xl border border-white/10 rounded-sm font-mono text-[10px] text-zinc-500 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-white border-b border-white/10 pb-2 mb-2 uppercase font-bold tracking-widest">System Metadata</p>
                                <p>{'>'} status: OPTIMIZED</p>
                                <p>{'>'} latency: 0.003ms</p>
                                <p>{'>'} load: SEAMLESS</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section 03: Feature & Trust (Data Logic)
                - Guide: 인포그래픽, 글래스모피즘 (blur 20px), 1px 얇은 실선 테두리
            */}
            <section className="py-40 px-6 md:px-12 max-w-[1920px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 gap-8 border-b border-white/5 pb-12">
                    <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">TRUST METRICS</h3>
                    <p className="text-zinc-500 font-light max-w-sm">정교한 기술력을 뒷받침하는 데이터 기반의 성과 측정 지표입니다.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: <Zap size={24} />, title: 'Performance', val: '+40%', desc: '전체 시스템 처리 속도 향상' },
                        { icon: <Code2 size={24} />, title: 'Efficiency', val: '0.3s', desc: '사용자 반응 시간 최적화' },
                        { icon: <ShieldCheck size={24} />, title: 'Stability', val: '99.9%', desc: '엔터프라이즈급 보안성 확보' }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="p-12 bg-white/5 backdrop-blur-[20px] border border-white/10 rounded-sm space-y-8 group transition-colors hover:bg-white/10"
                        >
                            <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
                                {item.icon}
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-zinc-600 text-xs font-bold uppercase tracking-widest">{item.title}</h4>
                                <div className="text-6xl md:text-7xl font-black tracking-tighter leading-none">{item.val}</div>
                                <p className="text-zinc-500 text-sm font-light leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* High-End Media Module (Mosaic Gallery)
                - 의도: 시각적 임팩트를 극대화하는 픽셀 마감의 갤러리 
            */}
            <section className="py-20 px-6 md:px-12 bg-black">
                <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 aspect-[16/9] bg-zinc-900 border border-white/5">
                        <img src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=2560" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-square bg-zinc-900 border border-white/5 flex items-center justify-center p-12 text-center pointer-events-none">
                        <p className="text-xs font-bold text-zinc-700 leading-relaxed uppercase tracking-[0.2em]">
                            "The Essence of Design is <br /> The Removal of Excess."
                        </p>
                    </div>
                    <div className="aspect-square bg-zinc-900 border border-white/5">
                        <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2560" className="w-full h-full object-cover grayscale" />
                    </div>
                    <div className="md:col-span-2 aspect-[21/9] bg-zinc-900 border border-white/5 relative group overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2560" className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="px-8 py-3 border border-white text-white text-[10px] font-black uppercase tracking-[0.5em]">View Collection</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA: Seamless Transition
                - 의도: 압도적 크기의 폰트로 마무리하여 여운을 남김.
            */}
            <section className="py-60 bg-white text-black">
                <div className="max-w-[1920px] mx-auto px-6 md:px-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="space-y-16 group"
                    >
                        <span className="text-[10px] font-black uppercase tracking-[1.5em] opacity-40">The Final Opus</span>
                        <Link href="/work" className="block">
                            <h2 className="text-8xl md:text-[15vw] font-black tracking-[-0.08em] leading-none uppercase transition-all duration-700 group-hover:tracking-normal group-hover:italic">
                                THE <br /> ARCHIVE
                            </h2>
                            <div className="mt-20 inline-flex items-center gap-8 group-hover:translate-x-4 transition-transform">
                                <span className="text-4xl font-black uppercase italic">DISCOVER</span>
                                <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center transform rotate-45 group-hover:rotate-0 transition-transform duration-500">
                                    <ArrowUpRight size={40} />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Back to Base Fixed Link */}
            <Link href="/admin/links" className="fixed bottom-10 right-10 z-50 bg-white text-black px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl hover:scale-105 transition-transform">
                <ArrowLeft size={16} />
                Ref Overview
            </Link>

        </main>
    );
}
