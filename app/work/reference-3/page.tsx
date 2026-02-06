'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Maximize2, Layers, Compass, Plus } from 'lucide-react';
import Link from 'next/link';

/**
 * 🧞‍♀️ Jinni's Note (Version 3: Dark Immersive - Baunfire Evolution): 
 * 오빠, 죄송해요! 3번 버전도 우리 'Baunfire' 컨셉에 맞춰서 훨씬 더 세련되게 바꿨어요.
 * 이번 버전은 테크니컬한 감성은 유지하되, 이질적인 네온이나 폰트를 버리고 
 * 우리 사이트 특유의 '깊이감 있는 어둠'과 '유연한 인터랙션'을 극대화한 버전이에요!
 */

export default function WorkReferenceThreePage() {
    const { scrollYProgress } = useScroll();

    // 이질적인 Mono 폰트 대신, 기본 시스템 폰트를 사용하여 일체감을 높였습니다.
    return (
        <main className="bg-black text-white min-h-screen font-sans selection:bg-zinc-800 selection:text-white overflow-x-hidden">

            {/* 1. Deep Immersive Hero
                - 의도: 메인 페이지의 'Sphere' 모드의 감성을 디테일 페이지로 가져옵니다.
            */}
            <section className="relative h-screen w-full flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2560"
                        alt="Background"
                        className="w-full h-full object-cover opacity-40 grayscale"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_80%)]" />
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
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center"
                            >
                                <Compass size={24} className="text-white/40" />
                            </motion.div>
                            <span className="text-[10px] font-black uppercase tracking-[1em] text-white/50">Core Deep Insight</span>
                        </div>

                        <h1 className="text-7xl md:text-[12rem] font-black tracking-tighter leading-none uppercase">
                            DEEP <br /> SPACE
                        </h1>

                        <p className="text-zinc-500 text-sm md:text-lg max-w-xl mx-auto font-light leading-relaxed tracking-wide">
                            보이지 않는 데이터를 시각의 영역으로 끌어올리는 과정. <br />
                            우리는 정보의 본질을 가장 우아한 방식으로 시각화합니다.
                        </p>
                    </motion.div>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/20">
                    <div className="w-px h-20 bg-gradient-to-b from-white to-transparent" />
                    <span className="text-[8px] font-bold uppercase tracking-[0.3em]">Explore Sequence</span>
                </div>
            </section>

            {/* 2. Minimalist Split Layout
                - 의도: 불필요한 장식을 제거하고 텍스트와 이미지의 여백을 Baunfire 스타일로 정렬합니다.
            */}
            <section className="py-40 px-6 md:px-12 max-w-[1920px] mx-auto border-t border-white/5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                    <div className="space-y-16">
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-none">
                                DATA AS <br /> AN ART FORM.
                            </h2>
                            <div className="w-20 h-1 bg-white" />
                        </div>
                        <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed">
                            데이터는 단순한 숫자의 나열이 아닙니다. 그것은 사용자의 행동이고, 브랜드의 현재이며, 미래의 가능성입니다.
                            우리는 이 복잡한 구조를 Baunfire의 절제된 감각으로 재구성했습니다.
                        </p>
                        <div className="flex gap-12 pt-8">
                            <div className="space-y-2">
                                <span className="block text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Focus</span>
                                <p className="text-sm font-bold uppercase tracking-tight">Clarity & Depth</p>
                            </div>
                            <div className="space-y-2">
                                <span className="block text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Method</span>
                                <p className="text-sm font-bold uppercase tracking-tight">Interactive Grid</p>
                            </div>
                        </div>
                    </div>
                    <div className="aspect-square bg-zinc-950 border border-white/5 overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2000"
                            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                        />
                    </div>
                </div>
            </section>

            {/* 3. Floating Mosaic Gallery
                - 의도: 메인 페이지의 인터랙티브 카드 배열 방식을 상세 페이지에 최적화했습니다.
            */}
            <section className="py-20 bg-zinc-950 container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[800px]">
                    <div className="md:col-span-8 bg-zinc-900 border border-white/5 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000" className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-700" />
                    </div>
                    <div className="md:col-span-4 grid grid-rows-2 gap-6">
                        <div className="bg-zinc-900 border border-white/5 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1000" className="w-full h-full object-cover grayscale brightness-75" />
                        </div>
                        <div className="bg-zinc-900 border border-white/5 overflow-hidden relative group">
                            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000" className="w-full h-full object-cover grayscale brightness-75" />
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Maximize2 size={32} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Technical Sophistication
                - 의도: 테크니컬한 요소들을 튀지 않게, 시스템 폰트와 절제된 라인으로 표현했습니다.
            */}
            <section className="py-40 px-6 md:px-12 max-w-5xl mx-auto space-y-32">
                <div className="text-center space-y-8">
                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight">UNCOMPROMISING <br /> PRECISION.</h3>
                    <p className="text-zinc-500 font-light leading-relaxed">
                        모든 픽셀은 제 자리가 있습니다. 우리는 보이지 않는 백엔드의 효율성을 <br />
                        프론트엔드의 아름다움으로 완벽하게 번역합니다.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {[
                        { icon: <Layers size={20} />, label: 'Architecture', val: 'Scalable' },
                        { icon: <Plus size={20} />, label: 'Logic', val: 'Zero Defect' },
                        { icon: <Maximize2 size={20} />, label: 'Experience', val: 'Seamless' },
                        { icon: <ArrowUpRight size={20} />, label: 'Performance', val: 'Ultra Fast' }
                    ].map((item, i) => (
                        <div key={i} className="space-y-6">
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mx-auto text-white/40">
                                {item.icon}
                            </div>
                            <div className="space-y-1">
                                <span className="block text-[8px] font-bold text-zinc-600 uppercase tracking-widest">{item.label}</span>
                                <p className="text-xs font-bold uppercase tracking-tight">{item.val}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. Seamless Next Project CTA
                - 의도: 검은 배경에서 자연스럽게 흰 배경으로 전환하며 깔끔한 피날레를 선사합니다.
            */}
            <section className="py-60 bg-white text-black">
                <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-center group"
                    >
                        <span className="text-[10px] font-black uppercase tracking-[1em] mb-12 block opacity-40">Previous Epic</span>
                        <Link href="/work">
                            <h2 className="text-6xl md:text-[14rem] font-black tracking-tighter leading-none uppercase group-hover:italic transition-all duration-700">
                                BEYOND <br /> DATA
                            </h2>
                            <div className="mt-20 inline-flex items-center gap-6 bg-black text-white px-12 py-6 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform">
                                NEXT CASE STUDY
                                <ArrowUpRight size={20} />
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </section>

        </main>
    );
}
