'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';

/**
 * 🧞‍♀️ Jinni's Note: 
 * 이 페이지는 오빠가 앞으로 새로운 프로젝트 콘텐츠를 만들 때 참고할 수 있는 "골든 템플릿" 구조예요.
 * 단순히 이미지만 나열하는 게 아니라, 하나의 "영화 같은 이야기(Narrative)"를 전달하는 데 집중했어요.
 */

export default function WorkReferencePage() {
    return (
        <main className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">

            {/* 1. Cinematic Hero Section 
                - 의도: 프로젝트의 첫인상을 웅장하게 전달합니다. 
                - 팁: 최대한 고해상도의 대표 이미지를 배경으로 사용하세요.
            */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2560"
                        alt="Hero background"
                        className="w-full h-full object-cover opacity-60 grayscale-[0.3]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
                </div>

                <div className="relative z-10 text-center space-y-8 px-6">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block text-[10px] font-black tracking-[0.5em] uppercase border border-white/30 px-4 py-1.5 rounded-full"
                    >
                        Feature Case Study
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-7xl md:text-[12rem] font-black tracking-tighter leading-none uppercase"
                    >
                        FUTURE <br /> VISION
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col items-center gap-4 text-zinc-400"
                    >
                        <p className="text-sm font-light tracking-widest uppercase">Scroll to explore the story</p>
                        <ArrowDown className="animate-bounce" size={20} />
                    </motion.div>
                </div>
            </section>

            {/* 2. Project Meta Grid
                - 의도: 프로젝트의 핵심 정보를 빠르고 전문적으로 전달합니다.
                - 팁: 서비스 성격에 따라 Role이나 Service 항목을 유연하게 조정하세요.
            */}
            <section className="py-32 px-6 md:px-12 max-w-[1920px] mx-auto border-b border-white/5">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 lg:gap-8">
                    <div className="lg:col-span-1 space-y-12">
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Client</h4>
                            <p className="text-2xl font-bold tracking-tight uppercase">SAMSUNG ELECTRONICS</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Industry</h4>
                            <p className="text-2xl font-bold tracking-tight uppercase">Tech / Lifestyle</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Location</h4>
                            <p className="text-2xl font-bold tracking-tight uppercase">Seoul, S.Korea</p>
                        </div>
                    </div>

                    <div className="lg:col-span-3 space-y-16">
                        <div className="max-w-3xl">
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-none mb-10">
                                REDEFINING THE DIGITAL EXPERIENCE FOR THE NEXT ERA.
                            </h2>
                            <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
                                기존의 틀을 깨고 새로운 시각적 언어를 구축하는 과정에서 우리는 '단순함'의 미학을 재발견했습니다.
                                이 프로젝트는 사용자 인터랙션의 본질을 탐구하며 감도 높은 비주얼과 매끄러운 경험을 결합했습니다.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10">
                            {[
                                { label: 'Service', value: 'Web Design' },
                                { label: 'Role', value: 'Art Direction' },
                                { label: 'Year', value: '2025' },
                                { label: 'Platform', value: 'Desktop / Mobile' }
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

            {/* 3. Full-Width Visual Impact
                - 의도: 텍스트 후 시각적 환기를 유도합니다.
                - 팁: 가장 강렬한 레이아웃 이미지를 이곳에 배치하세요.
            */}
            <section className="py-20 md:py-40">
                <div className="w-full aspect-[21/9] bg-zinc-900 border-y border-white/5 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2560"
                        alt="Visual showcase"
                        className="w-full h-full object-cover grayscale opacity-80"
                    />
                </div>
            </section>

            {/* 4. Split Layout (Concept & Detail)
                - 의도: 대조되는 정보(개념 vs 디테일)를 효과적으로 보여줍니다.
            */}
            <section className="py-40 px-6 md:px-12 max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <div className="space-y-12">
                    <h3 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                        THE <br /> CORE <br /> CONCEPT
                    </h3>
                    <p className="text-lg text-zinc-500 font-light leading-relaxed max-w-lg">
                        디테일은 단순한 꾸밈이 아닙니다. 그것은 브랜드가 사용자에게 전달하는 정성입니다.
                        우리는 아주 작은 인터랙션 하나에도 브랜드의 철학이 서릴 수 있도록 설계했습니다.
                    </p>
                    <ul className="space-y-4">
                        {['Minimal UI Architecture', 'Fluid Motion Design', 'Sophisticated Typography'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm font-bold tracking-widest uppercase">
                                <ChevronRight size={14} className="text-white/40" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="aspect-square bg-zinc-900 overflow-hidden border border-white/10 group">
                    <img
                        src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2560"
                        alt="Concept detail"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </div>
            </section>

            {/* 5. Triple Grid (The Process)
                - 의도: 과정이나 다양한 디테일을 리드미컬하게 보여줍니다.
            */}
            <section className="py-40 px-6 md:px-12 bg-zinc-950">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="aspect-[3/4] bg-zinc-900 border border-white/5">
                        <img src="https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <div className="aspect-[3/4] bg-zinc-900 border border-white/5 md:translate-y-20">
                        <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <div className="aspect-[3/4] bg-zinc-900 border border-white/5">
                        <img src="https://images.unsplash.com/photo-1634942537034-223402488f2b?q=80&w=1000" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                    </div>
                </div>
                <div className="mt-40 text-center max-w-2xl mx-auto space-y-8">
                    <h5 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.5em]">Process & Detail</h5>
                    <p className="text-zinc-400 font-light leading-relaxed">
                        우리의 디자인은 보이지 않는 곳에서 완성됩니다. 픽셀 하나, 여백의 1mm까지 집요하게 탐구하며 무결점의 결과물을 향해 갑니다. 이것이 바이너스프레드가 지향하는 '프리미엄'의 정의입니다.
                    </p>
                </div>
            </section>

            {/* 6. Narrative Conclusion 
                - 의도: 프로젝트의 결론 또는 성과를 명확히 합니다.
            */}
            <section className="py-60 flex flex-col items-center text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="max-w-4xl space-y-12"
                >
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase">
                        A NEW STANDARD <br /> WAS BORN.
                    </h2>
                    <div className="w-24 h-px bg-white/20 mx-auto" />
                    <p className="text-xl md:text-2xl text-zinc-500 font-light max-w-2xl mx-auto leading-relaxed italic">
                        "디자인은 단순한 보임의 도구가 아니라, 브랜드의 가치를 증명하는 방식이다."
                    </p>
                </motion.div>
            </section>

            {/* 7. The Next Adventure CTA 
                - 의도: 이탈 없이 다음 프로젝트로 유도합니다.
            */}
            <section className="py-40 bg-white text-black border-t border-zinc-200">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase tracking-[1em] mb-12 opacity-40">Previous Project</span>
                    <Link href="/work" className="group text-center">
                        <h3 className="text-6xl md:text-[10rem] font-black tracking-tighter leading-none group-hover:italic transition-all duration-500 uppercase">
                            EXPLORE <br /> MORE
                        </h3>
                        <div className="mt-16 inline-flex items-center gap-4 bg-black text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-110 transition-transform">
                            Return to List
                            <ArrowLeft className="rotate-180" size={16} />
                        </div>
                    </Link>
                </div>
            </section>

            {/* Floating Navigation (Jinni's Bonus) */}
            <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full flex gap-8 items-center">
                <Link href="/work" className="text-[10px] font-bold tracking-widest uppercase hover:text-zinc-400 transition-colors">Overview</Link>
                <div className="w-1 h-1 rounded-full bg-white/20" />
                <button className="text-[10px] font-bold tracking-widest uppercase hover:text-zinc-400 transition-colors">Case Study</button>
                <div className="w-1 h-1 rounded-full bg-white/20" />
                <button className="text-[10px] font-bold tracking-widest uppercase hover:text-zinc-400 transition-colors">Gallery</button>
            </nav>

        </main>
    );
}
