'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Cpu, Globe, Zap, Layers, Hash } from 'lucide-react';
import Link from 'next/link';

/**
 * 🧞‍♀️ Jinni's Note (Version 3: Tech-Noir Immersive): 
 * 오빠, 이번에는 정말 '다크하고 테크니컬한' 감성을 가져왔어요. 
 * 하이테크 솔루션이나 정밀한 대시보드 프로젝트를 보여줄 때 최고의 레이아웃이에요. 
 * '무결점' 그 자체를 상징하는 네온 컬러와 격자 구조가 특징입니다!
 */

export default function WorkReferenceThreePage() {
    return (
        <main className="bg-black text-white min-h-screen font-mono selection:bg-blue-500 selection:text-white overflow-x-hidden">

            {/* 1. Terminal Intro Hero
                - 의도: 프로젝트의 기술적 정체성을 강렬하게 선언합니다.
            */}
            <section className="relative h-screen flex flex-col items-center justify-center border-b border-blue-500/20">
                {/* Background Grid */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                <div className="relative z-10 text-center space-y-4 px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-blue-500 text-xs mb-4"
                    >
                        [ SYSTEM_INITIALIZED_2025 ]
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "circOut" }}
                        className="text-5xl md:text-[8rem] font-bold tracking-tighter leading-none"
                    >
                        ZERO <br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '2px #3b82f6' }}>GRAVITY</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-zinc-500 text-sm max-w-lg mx-auto leading-relaxed"
                    >
                        High-Performance Cloud Infrastructure Interface & <br />
                        Data Visualization System for Vinuspread Corp.
                    </motion.p>
                </div>

                {/* Status Bar */}
                <div className="absolute bottom-10 left-0 w-full px-6 md:px-12 flex justify-between items-end border-t border-white/5 pt-10">
                    <div className="flex gap-12 text-[10px] text-zinc-600">
                        <div className="space-y-1">
                            <span>COORDINATES</span>
                            <p className="text-white">37.5665 / 126.9780</p>
                        </div>
                        <div className="space-y-1">
                            <span>STATUS</span>
                            <p className="text-blue-500 animate-pulse">OPTIMIZED</p>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="w-40 h-1 bg-zinc-900 overflow-hidden">
                            <motion.div
                                animate={{ x: ['100%', '-100%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-1/2 h-full bg-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Specification Grid
                - 의도: 수치와 기술적 디테일에 집중합니다.
            */}
            <section className="py-32 px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-16">
                        <div className="aspect-video w-full bg-zinc-900 rounded-lg border border-blue-500/10 relative overflow-hidden group">
                            <div className="absolute top-4 left-4 flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                            </div>
                            <img
                                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070"
                                className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <Cpu size={18} className="text-blue-500" /> CORE_ARCHITECTURE
                                </h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    우리는 데이터의 흐름을 시각화하는 것 이상을 생각합니다.
                                    복잡한 서버 상태를 직관적인 노드 시스템으로 변환하여, 관리자가 단 1초 만에 이상 징후를 발견할 수 있도록 설계했습니다.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <Zap size={18} className="text-blue-500" /> REALTIME_SYNC
                                </h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    지연 없는(Zero-latency) 반응형 인터페이스는 모든 대시보드의 생명입니다.
                                    글로벌 클러스터 어디에서도 동일한 속도로 반응하는 완벽한 동기화 환경을 구축했습니다.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-zinc-900/50 p-8 rounded-lg border border-white/5 space-y-12">
                            <h4 className="text-xs font-bold text-blue-500 tracking-[0.3em]">TECHNICAL_STACK</h4>
                            <div className="space-y-6">
                                {[
                                    { k: 'Interface', v: 'Three.js / React' },
                                    { k: 'Data Flow', v: 'WebSockets / gRPC' },
                                    { k: 'Security', v: 'End-to-End Encrypted' },
                                    { k: 'Rendering', v: 'GPU Accelerated' }
                                ].map((stack, i) => (
                                    <div key={i} className="flex justify-between border-b border-white/5 pb-4">
                                        <span className="text-[10px] text-zinc-600 italic">0{i + 1}. {stack.k}</span>
                                        <span className="text-[11px] font-bold">{stack.v}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full py-4 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-blue-500 transition-colors">
                                View Documentation
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Immersive Blue Break
                - 의도: 차가운 블랙에서 깊은 블루로 전환하여 몰입감을 높입니다.
            */}
            <section className="py-40 bg-blue-950 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover" />
                <div className="max-w-[1920px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
                    <Hash className="text-blue-500 mb-8" size={32} />
                    <h2 className="text-4xl md:text-7xl font-bold text-center tracking-tighter max-w-4xl leading-[1.1]">
                        BEYOND THE <br />
                        <span className="bg-blue-500 text-white px-4">DATA HORIZON</span>
                    </h2>
                </div>
            </section>

            {/* 4. Motion Showcase
                - 의도: 프로젝트의 생동감(Animation)을 강조합니다.
            */}
            <section className="py-40 px-6 md:px-12 max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "Network Nodes", desc: "Dynamic topology visualization" },
                    { title: "Load Balancing", desc: "Intelligent packet distribution" },
                    { title: "Threat Detection", desc: "AI-driven security perimeter" }
                ].map((feature, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -10 }}
                        className="bg-zinc-900 border border-white/5 p-10 space-y-6 flex flex-col items-center text-center"
                    >
                        <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/40">
                            <Layers size={24} className="text-blue-500" />
                        </div>
                        <h4 className="text-lg font-bold">{feature.title}</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed">{feature.desc}</p>
                    </motion.div>
                ))}
            </section>

            {/* 5. Terminal Conclusion
                - 의도: 마지막까지 테크니컬한 톤앤매너를 유지합니다.
            */}
            <section className="py-60 bg-zinc-950 border-t border-white/5">
                <div className="max-w-3xl mx-auto px-6 font-mono text-zinc-500 space-y-4">
                    <p className="text-xs">{'>'} TASK_COMPLETE</p>
                    <p className="text-xs">{'>'} PROJECT_DELIVERED_SUCCESSFULLY</p>
                    <p className="text-xs">{'>'} ALL_SYSTEMS_GO</p>
                    <Link href="/work" className="block text-2xl md:text-4xl font-bold text-white mt-12 hover:text-blue-500 transition-colors italic">
                        _RETURN_TO_BASE.EXE
                    </Link>
                </div>
            </section>

        </main>
    );
}
