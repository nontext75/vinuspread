'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Layout, Database, Smartphone, Globe, Plus } from 'lucide-react';
import Link from 'next/link';

/**
 * 🧞‍♀️ Jinni's Note (Version 4: Grid System Narrative): 
 * 오빠, 이번에는 정말 '짜임새 있고 체계적인' 느낌을 극대화했어요! 
 * 프로젝트의 오버뷰부터 문제 해결 과정, 디자인 시스템까지 
 * 논리적인 흐름을 그리드 시스템에 맞춰 한눈에 보여주는 완벽한 구조입니다. 🧞‍♀️📐✨
 */

export default function WorkReferenceFourPage() {
    return (
        <main className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">

            {/* 1. Header & Quick Overview
                - 의도: 프로젝트의 핵심을 상단에 매우 컴팩트하게 정리합니다 (짜임새의 시작).
            */}
            <section className="pt-40 pb-20 px-6 md:px-12 border-b border-white/5">
                <div className="max-w-[1920px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-12"
                    >
                        <div className="lg:col-span-8 space-y-6">
                            <span className="text-xs font-black text-white/40 uppercase tracking-[0.5em]">Case Study v.04</span>
                            <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.9] uppercase">
                                NEXUS <br /> INTEGRATION
                            </h1>
                        </div>
                        <div className="lg:col-span-4 flex flex-col justify-end space-y-8">
                            <p className="text-zinc-500 text-lg font-light leading-relaxed">
                                글로벌 물류 시스템의 복잡한 데이터를 단순화하고,
                                관리자가 가장 직관적으로 의사결정을 내릴 수 있도록 돕는 엔터프라이즈 통합 플랫폼입니다.
                            </p>
                            <div className="flex gap-4">
                                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest">Platform</div>
                                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest">Fintech</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. Structured Information Grid
                - 의도: 4분할 그리드를 통해 프로젝트 메타데이터를 깔끔하게 보여줍니다.
            */}
            <section className="px-6 md:px-12 py-20 bg-zinc-950/50">
                <div className="max-w-[1920px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden">
                    {[
                        { label: 'Client', val: 'Nexus Global Ltd.' },
                        { label: 'Timeline', val: '2024 - 2025' },
                        { label: 'Main Feature', val: 'Real-time Ledger' },
                        { label: 'Core Tech', val: 'React / Go' }
                    ].map((item, i) => (
                        <div key={i} className="bg-black p-8 space-y-4">
                            <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{item.label}</span>
                            <p className="text-xl font-bold uppercase tracking-tight">{item.val}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. The Problem & Solution (Logical Narrative)
                - 의도: 짜임새 있는 스토리텔링을 위해 대비되는 섹션을 구성합니다.
            */}
            <section className="py-40 px-6 md:px-12 max-w-[1920px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black uppercase text-zinc-600 tracking-tighter">01. The Challenge</h2>
                            <p className="text-xl md:text-3xl font-light leading-tight">
                                기존 시스템은 수천 명의 사용자가 동시에 접속할 때 발생하는 트래픽을 감당하지 못했고,
                                데이터 시각화의 복잡도로 인해 오작동 확률이 높았습니다.
                            </p>
                        </div>
                        <div className="aspect-[4/3] bg-zinc-900 overflow-hidden relative border border-white/5">
                            <img src="https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=2070" className="w-full h-full object-cover grayscale brightness-50" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="p-4 bg-red-500/20 text-red-500 border border-red-500/40 rounded-full text-xs font-bold uppercase tracking-widest">Legacy Issue</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-12 lg:pt-40">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black uppercase text-white tracking-tighter">02. The Solution</h2>
                            <p className="text-xl md:text-3xl font-light leading-tight">
                                우리는 마이크로서비스 아키텍처를 도입하여 시스템을 분절화했고,
                                사용자 중심의 **'One-Action'** 대시보드를 구축하여 업무 효율을 40% 개선했습니다.
                            </p>
                        </div>
                        <div className="aspect-[4/3] bg-zinc-900 overflow-hidden relative border border-white/5">
                            <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="p-4 bg-green-500/20 text-green-500 border border-green-500/40 rounded-full text-xs font-bold uppercase tracking-widest">Optimized State</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Design System Breakdown (Modular Grid)
                - 의도: 프로젝트의 짜임새를 보여주는 핵심 섹션입니다.
            */}
            <section className="py-40 bg-white text-black px-6 md:px-12">
                <div className="max-w-[1920px] mx-auto space-y-24">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">DESIGN <br /> SYSTEM</h2>
                        <div className="grid grid-cols-2 gap-12 border-l border-black/10 pl-12 pb-4">
                            <div>
                                <span className="text-[10px] font-bold text-zinc-400 uppercase mb-2 block">Typography</span>
                                <p className="text-xl font-black uppercase">Inter / Bold</p>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-zinc-400 uppercase mb-2 block">Grid</span>
                                <p className="text-xl font-black uppercase">Modular 12</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: <Smartphone size={24} />, title: 'Responsive', desc: 'Mobile-first modular layout' },
                            { icon: <Database size={24} />, title: 'Data Flow', val: 'Streamlined state management' },
                            { icon: <Globe size={24} />, title: 'Global', val: 'Multi-language architecture' }
                        ].map((item, i) => (
                            <div key={i} className="p-10 border border-black/5 rounded-sm space-y-8 hover:bg-black hover:text-white transition-all duration-500">
                                <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center transition-colors">
                                    {item.icon}
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-2xl font-black uppercase tracking-tight">{item.title}</h4>
                                    <p className="text-sm font-light opacity-60">
                                        이 시스템은 고도로 짜여진 규격에 맞춰 설계되어, 어떠한 환경에서도 완벽한 일관성을 유지합니다.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Result & Verification
                - 의도: 수치와 결과를 통해 기술적 신뢰성을 마무리합니다.
            */}
            <section className="py-40 px-6 md:px-12 max-w-[1400px] mx-auto">
                <div className="text-center space-y-16">
                    <h3 className="text-2xl md:text-4xl font-bold uppercase tracking-tight italic">Validated Performance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-b border-white/10 py-20">
                        <div>
                            <span className="text-7xl font-black text-white">+40%</span>
                            <p className="text-xs text-zinc-600 font-bold uppercase tracking-widest mt-4">Efficiency Gain</p>
                        </div>
                        <div>
                            <span className="text-7xl font-black text-white">0.3s</span>
                            <p className="text-xs text-zinc-600 font-bold uppercase tracking-widest mt-4">Response Time</p>
                        </div>
                        <div>
                            <span className="text-7xl font-black text-white">99%</span>
                            <p className="text-xs text-zinc-600 font-bold uppercase tracking-widest mt-4">User Satisfaction</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Contact/Footer Conclusion
                - 의도: 마지막까지 깔끔한 마무리.
            */}
            <section className="py-60 bg-zinc-950 border-t border-white/5 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <p className="text-zinc-500 font-light text-xl">
                        우리는 기술 그 이상의 가치를 디자인합니다. <br />
                        당신의 다음 프로젝트를 위해 지니가 기다리고 있어요.
                    </p>
                    <Link href="/admin/links" className="inline-flex items-center gap-4 text-3xl font-black uppercase group">
                        <span>Check Other Versions</span>
                        <div className="p-3 bg-white text-black rounded-full group-hover:scale-110 transition-transform">
                            <ArrowUpRight size={20} />
                        </div>
                    </Link>
                </div>
            </section>

        </main>
    );
}
