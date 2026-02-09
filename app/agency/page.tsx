'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Monitor, Smartphone, Palette, PenTool, Layout } from 'lucide-react';

const CLIENTS = [
    { name: 'SAMSUNG', logo: 'SAMSUNG' },
    { name: 'LG CNS', logo: 'LG CNS' },
    { name: 'DAEKYO', logo: 'DAEKYO' },
    { name: 'KOSCOM', logo: 'KOSCOM' },
    { name: '신한금융그룹', logo: 'SHINHAN' },
    { name: 'KEPCO', logo: 'KEPCO' },
    { name: 'KT ALPHA', logo: 'KT ALPHA' },
    { name: '롯데렌터카', logo: 'LOTTE' },
    { name: 'DELOITTE', logo: 'DELOITTE' },
    { name: 'HYUNDAI', logo: 'HYUNDAI' },
    { name: 'NH', logo: 'NH' },
    { name: '에이스침대', logo: 'ACE' },
    { name: 'GYMBOREE', logo: 'GYMBOREE' },
    { name: 'KOREAN RE', logo: 'KOREANRE' },
    { name: '한국SGI', logo: 'SGI' },
    { name: 'NEPA', logo: 'NEPA' },
    { name: 'K Shopping', logo: 'KSHOP' },
    { name: '아주대학교', logo: 'AJOU' },
    { name: '웅진싱크빅', logo: 'WOONGJIN' },
    { name: '풀무원', logo: 'PULMUONE' },
    { name: 'Hunet', logo: 'HUNET' },
    { name: '한국타이어', logo: 'HANKOOK' },
    { name: '천재교육', logo: 'CHUNJAE' },
    { name: '은행연합회', logo: 'KFB' },
    { name: '연세대학교의료원', logo: 'YONSEI' },
    { name: '롯데시네마', logo: 'LOTTECINEMA' },
    { name: 'BNK', logo: 'BNK' },
];

const BUSINESS_FIELDS = [
    {
        title: 'WEBSITE',
        icon: <Monitor className="w-8 h-8" />,
        desc: '통일된 경험의 웹&모바일 UI / UX 플랫폼을 개발합니다. 자체 개발한 CMS를 통해 빠르고 안정적인 서비스개발과 시공간적 아름다움이 더해진 온라인 비즈니스를 지원합니다.'
    },
    {
        title: 'APPLICATION',
        icon: <Smartphone className="w-8 h-8" />,
        desc: 'IOS, Android, Window 환경의 어플리케이션 UI를 제작합니다. 서비스의 목적에 최적화된 레이아웃과 효율적인 인터렉션을 통해 보다 완성도 높은 APP을 제작합니다.'
    },
    {
        title: 'BRANDING',
        icon: <Palette className="w-8 h-8" />,
        desc: '전달하려는 메시지와 핵심적 가치에 집중합니다. 디테일한 분석과 다양한 조합을 통한 전략적인 브랜드 아이덴티티를 수립합니다.'
    },
    {
        title: 'CHARACTER & ILLUSTRATION',
        icon: <PenTool className="w-8 h-8" />,
        desc: '바이너스프레드 특유의 유머러스하고 개성 있는 캐릭터를 제작합니다. 스토리에 캐릭터가 녹아들어 지속적으로 성장할 수 있는 생명체를 개발합니다.'
    },
    {
        title: 'EDITORIAL',
        icon: <Layout className="w-8 h-8" />,
        desc: '마케팅 전략에 따른 다양한 시각적 디자인 요소를 제작합니다. 전달하려는 메시지가 온전히 전해질 수 있도록 설계 단계부터 적극적으로 참여합니다.'
    }
];

export default function AgencyPage() {
    return (
        <main className="bg-black min-h-screen text-white pt-48 pb-20 overflow-hidden relative selection:bg-white selection:text-black">
            {/* Background Grain */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* 1. Hero Section */}
            <section className="px-6 md:px-12 mb-40 relative z-10">
                <div className="max-w-[1920px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-4"
                    >
                        <span className="text-zinc-500 font-bold uppercase tracking-[0.5em] text-[10px]">About Our DNA</span>
                        <h1 className="text-7xl md:text-[12rem] font-black tracking-tighter leading-[0.8] mb-12">
                            AGENCY
                        </h1>
                    </motion.div>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-[1px] bg-white/20 origin-left"
                    />
                </div>
            </section>

            {/* 2. Philosophy: Essential Values */}
            <section className="px-6 md:px-12 mb-80 relative z-10 max-w-[1920px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-24 items-start">
                    <div className="lg:sticky lg:top-48 max-w-xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-xl font-bold text-zinc-600 uppercase tracking-widest mb-12 flex items-center gap-4"
                        >
                            <span className="w-12 h-px bg-zinc-800" />
                            Essential Values
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-7xl font-black tracking-tighter leading-[1.0] mb-12 italic uppercase"
                        >
                            We focus on <br />
                            Essential <br />
                            Values.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-zinc-500 font-light leading-relaxed text-lg"
                        >
                            빠르게 변하는 시대 속에서도 변하지 않는 본질의 가치에 주목하며, <br />
                            구조적 경계와 한계를 뛰어넘는 아름다운 디자인을 지향합니다.
                        </motion.p>
                    </div>

                    <div className="flex-1 grid grid-cols-1 gap-32">
                        {[
                            { title: 'THINK', subtitle: '관찰하고 고민하는 통찰력', desc: '고객과 공통된 목표를 설정하고 고민합니다. 다양한 선택의 결정을 통해 최선의 방법을 제시합니다.', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200' },
                            { title: 'MIND', subtitle: '가치를 창조하는 마음', desc: '목적에 맞는 새로운 가치로 재창조합니다. 우리가 만든 가치가 어제보다 더 아름다운 오늘을 만듭니다.', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200' },
                            { title: 'BEHAVIOR', subtitle: '두려움 없는 탐험과 실험', desc: '멈추지 않고 끊임없이 탐구하고 실험합니다. 본질적인 가치를 표현하려는 즐거운 고민을 즐깁니다.', img: 'https://images.unsplash.com/photo-1522071823991-b1ae5e6a3048?q=80&w=1200' }
                        ].map((val, idx) => (
                            <motion.div
                                key={val.title}
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ margin: "-10%" }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative"
                            >
                                <div className="relative aspect-[16/9] mb-12 overflow-hidden border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-1000">
                                    <img src={val.img} alt={val.title} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s] ease-out" />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-1000" />
                                    <h3 className="absolute bottom-12 left-12 text-7xl md:text-9xl font-black tracking-tighter text-white/90 group-hover:text-white transition-colors uppercase">
                                        {val.title}
                                    </h3>
                                </div>
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-2">
                                    <div className="space-y-4">
                                        <h4 className="text-2xl font-bold tracking-tight uppercase group-hover:text-zinc-300 transition-colors">{val.subtitle}</h4>
                                        <p className="text-zinc-500 text-lg leading-relaxed font-light max-w-xl">{val.desc}</p>
                                    </div>
                                    <span className="text-[10px] font-black tracking-[0.5em] text-zinc-800">0{idx + 1}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Identity: Spread the Beautiful Things */}
            <section className="relative py-80 bg-zinc-950 overflow-hidden">
                <motion.div
                    initial={{ x: '10%' }}
                    whileInView={{ x: '-10%' }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
                    className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-[30rem] font-black text-white/[0.02] leading-none select-none pointer-events-none"
                >
                    VINUSPREAD VINUSPREAD VINUSPREAD
                </motion.div>

                <div className="px-6 md:px-12 max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="space-y-16"
                        >
                            <h2 className="text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.8] mb-12">
                                SPREAD THE <br /> BEAUTIFUL <br /> THINGS
                            </h2>
                            <div className="w-24 h-px bg-white/20" />
                            <p className="text-3xl font-light text-zinc-400 italic">
                                "Spreading Beautiful <br /> Viruses to the World."
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 gap-12">
                            {[
                                { k: 'VENUS', v: 'BEAUTY', symbol: '🌸' },
                                { k: 'VIRUS', v: 'INFECT', symbol: '✨' },
                                { k: 'SPREAD', v: 'DISTRIBUTE', symbol: '💨' }
                            ].map((item, idx) => (
                                <motion.div
                                    key={item.k}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.2 }}
                                    className="flex items-center gap-12 group p-12 border border-white/5 bg-zinc-900/50 backdrop-blur-xl hover:border-white/20 transition-all duration-500 rounded-sm"
                                >
                                    <span className="text-4xl">{item.symbol}</span>
                                    <div>
                                        <h3 className="text-3xl font-black tracking-widest uppercase mb-2 group-hover:text-zinc-200">{item.k}</h3>
                                        <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-xs">{item.v}</p>
                                    </div>
                                    <ArrowUpRight className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Business Fields: Vertical List with Visual Preview */}
            <section className="py-80 px-6 md:px-12 max-w-[1920px] mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row gap-32">
                    <div className="flex-1 space-y-12">
                        <motion.h3
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-7xl md:text-[10rem] font-black tracking-tighter leading-none mb-24"
                        >
                            FIELD OF <br />BUSINESS
                        </motion.h3>

                        <div className="space-y-4">
                            {BUSINESS_FIELDS.map((field, idx) => (
                                <motion.div
                                    key={field.title}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group py-12 border-b border-white/10 hover:border-white/40 transition-all duration-500 cursor-pointer"
                                >
                                    <div className="flex items-center gap-12">
                                        <span className="text-zinc-700 font-mono text-sm tracking-widest">0{idx + 1}</span>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-6 mb-4">
                                                <h4 className="text-3xl md:text-5xl font-black tracking-tight uppercase transition-transform group-hover:translate-x-4 duration-500">
                                                    {field.title}
                                                </h4>
                                                <div className="text-zinc-600 group-hover:text-white transition-colors">
                                                    {field.icon}
                                                </div>
                                            </div>
                                            <p className="text-zinc-500 max-w-2xl font-light text-lg transition-opacity duration-300 opacity-60 group-hover:opacity-100">
                                                {field.desc}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Clients: Elegant Monochrome Grid */}
            <section className="px-6 md:px-12 py-80 border-t border-white/5 bg-zinc-950">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-32">
                        <div className="space-y-8">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-6xl md:text-[8rem] font-black tracking-tighter leading-none italic"
                            >
                                CLIENTS.
                            </motion.h2>
                            <p className="text-2xl md:text-3xl font-light text-zinc-500 leading-snug max-w-3xl border-l-[3px] border-white/10 pl-8">
                                Connect values between people. <br />
                                We move people's hearts.
                            </p>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.5em] mb-4">Network Archive</span>
                            <div className="w-48 h-px bg-zinc-800" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 border-t border-l border-white/5">
                        {CLIENTS.map((client, i) => (
                            <motion.div
                                key={client.name}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: (i % 6) * 0.1 }}
                                className="aspect-[3/2] border-r border-b border-white/5 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-700 bg-black group relative"
                            >
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
                                <span className="text-[11px] font-black tracking-[0.2em] text-zinc-700 group-hover:text-white transition-colors duration-500 uppercase overflow-hidden text-center px-4">
                                    {client.name}
                                </span>
                            </motion.div>
                        ))}
                        {/* Empty placeholder cells to complete grid */}
                        {Array.from({ length: (6 - CLIENTS.length % 6) % 6 }).map((_, i) => (
                            <div key={`empty-${i}`} className="aspect-[3/2] border-r border-b border-white/5" />
                        ))}
                    </div>
                </div>
            </section>

            <div className="h-40" />
        </main>
    );
}
