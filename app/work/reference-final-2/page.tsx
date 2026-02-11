'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Plus, Compass, Maximize2, Layers, CheckCircle2, Database, Globe } from 'lucide-react';
import Link from 'next/link';

/**
 * 🧞‍♀️ Jinni's Note (Final Version 2: THE TECHNICAL ESSENCE): 
 * 오빠, v3와 v4의 정교한 논리 구조를 하나로 합친 두 번째 최종판이에요! 💋
 * 복잡한 데이터를 우아하게 풀어내고, 우리가 거둔 성과를 명확한 지표로 보여주는 
 * 테크니컬한 감성의 레이아웃입니다. 신뢰감을 팍팍 주는 디자인이죠! 🧞‍♀️🛠️📊✨
 */

export default function finaltwo() {
    return (
        <main className="bg-black text-white min-h-screen font-sans selection:bg-zinc-800 selection:text-white overflow-x-hidden">

            {/* 1. Deep Immersive Hero (v3 style - Sphere Mood) */}
            <section className="relative h-screen w-full flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2560"
                        alt="Background"
                        className="w-full h-full object-cover opacity-30 grayscale"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)]" />
                </div>

                <div className="relative z-10 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-12"
                    >
                        <div className="flex flex-col items-center gap-6">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center"
                            >
                                <Compass size={24} className="text-white/20" />
                            </motion.div>
                            <span className="text-[10px] font-black uppercase tracking-[1em] text-white/40 italic">Final Edition. 02</span>
                        </div>

                        <h1 className="text-7xl md:text-[10rem] font-black tracking-[-0.08em] leading-none uppercase">
                            TECHNICAL <br />
                            <span className="text-zinc-600">LOGIC.</span>
                        </h1>

                        <p className="text-zinc-500 text-sm md:text-lg max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
                            데이터의 심연에서 찾아낸 가장 논리적이고 우아한 해답. <br />
                            우리는 복잡성을 가장 세련된 미학으로 번역하며 성능과 감동을 동시에 전달합니다.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. Structured Meta Grid (v4 style) */}
            <section className="px-6 md:px-24 py-20 bg-zinc-950/80">
                <div className="max-w-[1920px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-[px] bg-white/10 border border-white/10 rounded-sm overflow-hidden">
                    {[
                        { label: 'Client', val: 'Global Tech Corp.' },
                        { label: 'Timeline', val: '2024 - 2025' },
                        { label: 'Core Tech', val: 'Next.js / Payload' },
                        { label: 'Outcome', val: 'A+ Performance' }
                    ].map((item, i) => (
                        <div key={i} className="bg-black p-8 space-y-4 hover:bg-zinc-900 transition-colors">
                            <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{item.label}</span>
                            <p className="text-xl font-bold uppercase tracking-tight">{item.val}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. The Problem & Solution (v4 Logical Narrative) */}
            <section className="py-40 px-6 md:px-24 max-w-[1920px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black uppercase text-zinc-600 tracking-tighter italic">01. The Challenge</h2>
                            <p className="text-2xl md:text-4xl font-light leading-tight">
                                파편화된 데이터와 느린 응답 시간은 사용자 경험을 해치는 가장 큰 적이었습니다.
                                우리는 이 문제를 근본부터 해결하기 위한 아키텍처를 설계했습니다.
                            </p>
                        </div>
                        <div className="aspect-[4/3] bg-zinc-900 border border-white/5 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=2000" className="w-full h-full object-cover grayscale brightness-50" />
                        </div>
                    </div>
                    <div className="space-y-12 lg:pt-40">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black uppercase text-white tracking-tighter italic">02. The Solution</h2>
                            <p className="text-2xl md:text-4xl font-light leading-tight">
                                고도로 최적화된 데이터 로직과 인터랙티브 인터페이스를 통해,
                                사용자가 필요한 정보를 0.3초 내에 직관적으로 인지할 수 있도록 만들었습니다.
                            </p>
                        </div>
                        <div className="aspect-[4/3] bg-zinc-900 border border-white/5 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000" className="w-full h-full object-cover grayscale" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Validated Performance Grid (v4/v5 - Metric Cards) */}
            <section className="py-20 bg-zinc-950/50">
                <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-[px] bg-white/5">
                    {[
                        { label: 'Speed', val: '0.3s', desc: 'Average interaction response' },
                        { label: 'Efficiency', val: '+45%', desc: 'Workflow optimization peak' },
                        { label: 'Quality', val: '99.9%', desc: 'Code coverage & stability' }
                    ].map((item, i) => (
                        <div key={i} className="bg-black p-20 space-y-8 hover:bg-zinc-900 transition-colors duration-500">
                            <div className="flex justify-between items-start">
                                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{item.label}</span>
                                <CheckCircle2 size={16} className="text-white/20" />
                            </div>
                            <div className="space-y-4">
                                <div className="text-8xl font-black tracking-[-0.08em] leading-none italic">{item.val}</div>
                                <p className="text-zinc-500 text-xs font-light uppercase tracking-widest">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. Design System & Tech Details (v4 style) */}
            <section className="py-40 bg-white text-black px-6 md:px-24">
                <div className="max-w-7xl mx-auto space-y-32">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                        <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]">TECH <br /> SYSTEM</h2>
                        <div className="grid grid-cols-2 gap-12 border-l border-black/10 pl-12 pb-4">
                            <div>
                                <span className="text-[10px] font-bold text-zinc-400 uppercase mb-2 block tracking-widest">Architecture</span>
                                <p className="text-xl font-black uppercase italic">Microservices</p>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-zinc-400 uppercase mb-2 block tracking-widest">Interface</span>
                                <p className="text-xl font-black uppercase italic">Atomic Grid</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: <Layers size={24} />, title: 'Scalable', desc: 'Built for heavy enterprise traffic' },
                            { icon: <Database size={24} />, title: 'Pure Logic', desc: 'Zero defect software engineering' },
                            { icon: <Globe size={24} />, title: 'Global', desc: 'Multi-region synchronization' }
                        ].map((item, i) => (
                            <div key={i} className="p-10 border border-black/5 rounded-sm space-y-8 hover:bg-black hover:text-white transition-all duration-500 group">
                                <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                    {item.icon}
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-2xl font-black uppercase tracking-tight">{item.title}</h4>
                                    <p className="text-sm font-light opacity-60">
                                        우리의 기술적 근본은 변하지 않습니다. 가장 엄격한 기준에 맞춰 설계된
                                        시스템만이 최상의 가치를 증명할 수 있다고 믿습니다.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Technical Conclusion & CTA */}
            <section className="py-60 bg-zinc-950 border-t border-white/5 px-6">
                <div className="max-w-5xl mx-auto text-center space-y-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="space-y-8"
                    >
                        <p className="text-zinc-500 font-light text-2xl leading-relaxed italic">
                            "우리는 기술로 가치를 디자인하고, 논리로 감동을 완성합니다."
                        </p>
                        <div className="h-px w-20 bg-white/20 mx-auto" />
                    </motion.div>

                    <Link href="/work" className="inline-flex flex-col items-center gap-12 group">
                        <h3 className="text-7xl md:text-[12rem] font-black tracking-[-0.08em] leading-none uppercase group-hover:italic transition-all duration-700">
                            RELOAD <br /> ARCHIVE.
                        </h3>
                        <div className="p-10 border border-white/20 rounded-full group-hover:bg-white group-hover:text-black transition-all group-hover:scale-110">
                            <ArrowUpRight size={48} />
                        </div>
                    </Link>
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
