'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Plus, Minus, Layers, Target, Compass } from 'lucide-react';
import Link from 'next/link';

/**
 * 🧞‍♀️ Jinni's Note (Version 5 Re-Engineered: THE HIGH-END ESSENCE - Structural Harmony): 
 * 오빠, 죄송해요! 절충안이 오히려 짜임새를 해쳤던 것 같아요. 
 * 이번에는 다시 '정박 지점'을 확실히 잡으면서도 세련미를 놓치지 않는 '구조적 조화'에 집중했어요.
 * 웅장한 그리드 시스템과 명확한 위계로, 누가 봐도 "해외 스튜디오급"이라는 탄성이 나올 거예요! 🧞‍♀️📐💎✨
 */

export default function WorkReferenceFivePage() {
    const { scrollYProgress } = useScroll();

    // Background parallax & overlay
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const bgOpacity = useTransform(scrollYProgress, [0, 0.2], [0.4, 0.2]);

    return (
        <main className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black overflow-x-hidden">

            {/* 1. Immersive Editorial Hero
                - 가독성과 구조의 정박 지점을 위해 8vw의 균형 잡힌 타이포그래피 + 12컬럼 가이드라인 적용
            */}
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
                                <span className="text-[10px] font-black uppercase tracking-[1em] text-white/40">Edition. 005</span>
                                <div className="h-px w-24 bg-white/20" />
                            </div>
                            <h1 className="text-[12vw] lg:text-[8vw] font-black tracking-[-0.04em] leading-[0.85] uppercase">
                                ARCHITECTURAL <br />
                                <span className="text-zinc-500">ESSENCE.</span>
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
                                우리는 데이터의 흐름을 공간의 미학으로 재해석합니다.
                                모든 픽셀은 엄격한 그리드 질서 속에서 자신의 자리를 찾으며,
                                단순한 정보를 예술적 경험으로 승화시킵니다.
                            </p>
                            <div className="flex gap-4">
                                <span className="text-[10px] font-bold px-3 py-1 bg-white text-black uppercase tracking-widest">Global</span>
                                <span className="text-[10px] font-bold px-3 py-1 border border-white/20 uppercase tracking-widest">2025</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. Strict 12-Column Grid Storytelling
                - 좌측: 명확한 주제 / 우측: 시각적 입증 
            */}
            <section className="py-40 px-6 md:px-24 max-w-[1920px] mx-auto border-b border-white/5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                    <div className="lg:col-span-4 space-y-24 sticky top-40 h-fit">
                        <div className="space-y-8">
                            <h2 className="text-4xl font-black uppercase tracking-tighter italic">The Logic</h2>
                            <p className="text-zinc-400 font-light leading-relaxed">
                                기존의 무질서한 데이터 구조를 타파하고, 비너스스프레드만의 'Nexus Grid'를 도입했습니다.
                                이는 정보의 위계를 시각화하는 가장 강력한 수단이 됩니다.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <span className="block text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-2">Category</span>
                                <p className="text-xs font-bold uppercase tracking-tight">Fintech Solution</p>
                            </div>
                            <div>
                                <span className="block text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-2">Service</span>
                                <p className="text-xs font-bold uppercase tracking-tight">UX/UI Design</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-8 space-y-12">
                        <div className="aspect-[16/10] bg-zinc-900 border border-white/5 overflow-hidden group">
                            <img src="https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=2000" className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" />
                        </div>
                        <div className="grid grid-cols-2 gap-12">
                            <div className="aspect-[4/5] bg-zinc-900 border border-white/5 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000" className="w-full h-full object-cover grayscale brightness-50" />
                            </div>
                            <div className="aspect-[4/5] bg-zinc-900 border border-white/5 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. High-Density Trust Metrics
                - 짜임새를 위한 대칭적 그리드 카드 시스템
            */}
            <section className="py-20 bg-zinc-950/50 border-white/5">
                <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/5">
                    {[
                        { label: 'Growth', val: '+124%', desc: 'Platform performance improved' },
                        { label: 'Uptime', val: '99.98%', desc: 'Enterprise stability ensured' },
                        { label: 'Security', val: 'L5 Grad', desc: 'Top tier encryption logic' }
                    ].map((item, i) => (
                        <div key={i} className="bg-black p-20 space-y-8 hover:bg-zinc-900 transition-colors duration-500">
                            <div className="flex justify-between items-start">
                                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{item.label}</span>
                                <Plus size={16} className="text-white/20" />
                            </div>
                            <div className="space-y-4">
                                <div className="text-7xl font-black tracking-tighter leading-none">{item.val}</div>
                                <p className="text-zinc-500 text-xs font-light uppercase tracking-widest">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Full-Width Structural Visual
                - 시각적 환기를 위한 대형 필러 섹션
            */}
            <section className="py-40 bg-black">
                <div className="px-6 md:px-24">
                    <div className="aspect-[21/9] bg-zinc-900 overflow-hidden relative border border-white/10">
                        <img src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=2560" className="w-full h-full object-cover grayscale opacity-60" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                            <div className="max-w-4xl space-y-12">
                                <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                                    "THE PUREST FORM OF DATA IS <br /> THE ABSENCE OF FRICTION."
                                </h3>
                                <div className="text-xs font-bold tracking-[1em] text-white/40 uppercase">Vinuspread Philosophy</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Minimal High-End Conclusion
                - 극도의 절제미를 살린 아카이브 마무리
            */}
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
                                <h2 className="text-6xl md:text-[10vw] font-black tracking-[-0.05em] leading-none uppercase group-hover:italic transition-all duration-700">
                                    THE_ARCHIVE
                                </h2>
                            </Link>
                        </motion.div>
                    </div>
                    <div className="lg:col-span-4 flex flex-col items-center lg:items-end gap-12">
                        <div className="w-32 h-32 rounded-full border border-black flex items-center justify-center p-8 group hover:bg-black transition-colors cursor-pointer">
                            <ArrowUpRight size={48} className="group-hover:text-white transition-colors" />
                        </div>
                        <div className="text-right space-y-2 opacity-40">
                            <p className="text-[9px] font-black uppercase tracking-widest leading-none">Vinuspread official collection</p>
                            <p className="text-[9px] font-black uppercase tracking-widest leading-none">Ref No. 2025-05-ESSENCE</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Float Menu Backup */}
            <Link href="/admin/links" className="fixed bottom-12 right-12 z-50 mix-blend-difference hover:scale-110 transition-transform">
                <div className="p-4 bg-white text-black rounded-sm shadow-2xl">
                    <Layers size={20} />
                </div>
            </Link>

        </main>
    );
}
