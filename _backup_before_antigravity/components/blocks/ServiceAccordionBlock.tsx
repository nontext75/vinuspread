"use client";

import React, { useState } from 'react';
import { ServiceAccordionBlockData } from '@/types/blocks';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

interface ServiceAccordionBlockProps {
    data: ServiceAccordionBlockData;
}

const ServiceAccordionBlock: React.FC<ServiceAccordionBlockProps> = ({ data }) => {
    const [activeId, setActiveId] = useState<string | null>(data.services[0].id);

    return (
        <section className="relative w-full py-32 px-6 md:px-12 bg-white z-20 text-slate-950 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
                {/* Visual Side */}
                <div className="w-full lg:w-5/12 relative h-[50vh] lg:h-[70vh] sticky top-32 hidden lg:block rounded-2xl overflow-hidden shadow-2xl">
                    <AnimatePresence mode="wait">
                        {data.services.map((service) => (
                            activeId === service.id && (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <img
                                        src={service.src}
                                        alt={service.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/20" /> {/* Dark overlay reduced */}
                                    <div className="absolute bottom-8 left-8 p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                                        <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                                        <p className="text-white/80 font-light">{service.description}</p>
                                    </div>
                                </motion.div>
                            )
                        ))}
                    </AnimatePresence>
                </div>

                {/* List Side */}
                <motion.div
                    className="w-full lg:w-6/12 flex flex-col justify-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.15,
                                delayChildren: 0.2
                            }
                        }
                    }}
                >
                    <div className="mb-16">
                        <motion.h2
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                            }}
                            className="text-xl md:text-2xl font-bold mb-8 tracking-tighter text-slate-400"
                        >
                            {data.title}
                        </motion.h2>
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                            }}
                            className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.0] mb-8"
                            dangerouslySetInnerHTML={{ __html: data.subtitle }}
                        />
                    </div>

                    <div className="flex flex-col">
                        {data.services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                variants={{
                                    hidden: { opacity: 0, x: -20 },
                                    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
                                }}
                                onMouseEnter={() => setActiveId(service.id)}
                                className={`group py-8 border-b border-slate-200 cursor-pointer transition-all duration-300 ${activeId === service.id ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-mono tracking-widest text-slate-400">0{index + 1}</span>
                                    <Plus className={`w-6 h-6 transition-transform duration-300 ${activeId === service.id ? 'rotate-45 text-slate-900' : 'text-slate-300'}`} />
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-slate-900">{service.title}</h3>
                                <p className={`text-lg text-slate-600 font-light max-w-md overflow-hidden transition-all duration-500 ${activeId === service.id ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                                    {service.description}
                                </p>

                                {/* Mobile Image (Only visible on small screens) */}
                                <div className={`mt-6 lg:hidden overflow-hidden rounded-lg transition-all duration-500 ${activeId === service.id ? 'h-64 opacity-100' : 'h-0 opacity-0'}`}>
                                    <img src={service.src} alt={service.title} className="w-full h-full object-cover" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ServiceAccordionBlock;
