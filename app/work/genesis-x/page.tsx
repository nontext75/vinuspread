'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function GenesisXPage() {
    const { scrollYProgress } = useScroll();
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);

    return (
        <main className="bg-black min-h-screen text-white">

            {/* 1. Hero Section */}
            <section className="relative w-full h-[90vh] overflow-hidden">
                <motion.div
                    style={{ scale: heroScale, opacity: heroOpacity }}
                    className="absolute inset-0 w-full h-full"
                >
                    <img
                        src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000"
                        alt="Genesis X Concept"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </motion.div>

                {/* Hero Title */}
                <div className="absolute bottom-12 left-6 md:left-12">
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter"
                    >
                        Genesis X<br />Concept
                    </motion.h1>
                </div>
            </section>

            {/* 2. Project Info Grid */}
            <section className="px-6 md:px-12 py-24 border-b border-white/10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-sm font-mono text-gray-400 mb-2">CLIENT</h3>
                        <p className="text-xl font-medium">Genesis Motor</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-mono text-gray-400 mb-2">YEAR</h3>
                        <p className="text-xl font-medium">2024</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-mono text-gray-400 mb-2">SERVICE</h3>
                        <p className="text-xl font-medium">Digital Experience<br />Website Renewal</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-mono text-gray-400 mb-2">URL</h3>
                        <a href="#" className="text-xl font-medium hover:text-gray-300 underline underline-offset-4">View Site</a>
                    </div>
                </div>
            </section>

            {/* 3. Overview Text */}
            <section className="px-6 md:px-12 py-32 flex flex-col md:flex-row gap-12 lg:gap-24">
                <div className="md:w-1/3">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Two Lines,<br />One Future.</h2>
                </div>
                <div className="md:w-2/3">
                    <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-300 font-light">
                        The Genesis X Concept embodies the brand's 'Athletic Elegance' design philosophy.
                        Our mission was to translate this physical masterpiece into a digital experience that evokes the same emotion.
                        We focused on the 'Two Lines' signature, creating a fluid, immersive scrolling journey that mimics the aerodynamic flow of the vehicle.
                    </p>
                    <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-300 font-light mt-8">
                        Through WebGL and high-fidelity 3D rendering, we brought the Gran Berlinetta to life on the screen, allowing users to explore every curve and detail in real-time.
                    </p>
                </div>
            </section>

            {/* 4. Full Width Image */}
            <section className="w-full mb-32">
                <img
                    src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2670"
                    alt="Dashboard Detail"
                    className="w-full h-auto"
                />
                <p className="text-center text-sm font-mono text-gray-500 mt-4">Interior Detail: Driver-oriented cockpit</p>
            </section>

            {/* 5. Process / feature Section */}
            <section className="px-6 md:px-12 mb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-neutral-900 p-12 flex flex-col justify-center">
                        <h3 className="text-3xl font-bold mb-6">Interactive 3D</h3>
                        <p className="text-gray-400 leading-relaxed">
                            We implemented a custom 3D viewer that allows users to rotate and inspect the vehicle.
                            Optimized for performance across all devices, ensuring a seamless experience without compromising visual fidelity.
                        </p>
                    </div>
                    <div className="aspect-square relative overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070"
                            alt="Wireframe process"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* 6. Mobile Layouts */}
            <section className="px-6 md:px-12 py-32 bg-neutral-900">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-bold mb-4">Responsive Design</h2>
                    <p className="text-gray-400">Seamless experience on all screen sizes</p>
                </div>
                <div className="flex justify-center gap-8 flex-wrap">
                    {/* Mockup Frames */}
                    <div className="w-full max-w-sm aspect-[9/19] bg-black border-4 border-neutral-800 rounded-[3rem] overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000" className="w-full h-full object-cover" alt="Mobile 1" />
                    </div>
                    <div className="w-full max-w-sm aspect-[9/19] bg-black border-4 border-neutral-800 rounded-[3rem] overflow-hidden mt-12">
                        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000" className="w-full h-full object-cover" alt="Mobile 2" />
                    </div>
                </div>
            </section>

            {/* 7. Next Project */}
            <section className="px-6 md:px-12 py-32 border-t border-white/10">
                <Link href="/work" className="group block">
                    <h3 className="text-sm font-mono text-gray-500 mb-4">NEXT PROJECT</h3>
                    <div className="flex justify-between items-center">
                        <span className="text-2xl md:text-4xl font-bold tracking-tight group-hover:text-gray-300 transition-colors">MIH Website</span>
                        <ArrowRight size={32} className="transform group-hover:translate-x-4 transition-transform" />
                    </div>
                </Link>
            </section>
        </main>
    );
}
