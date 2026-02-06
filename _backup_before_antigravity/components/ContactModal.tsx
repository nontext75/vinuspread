'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[100] bg-white text-black flex flex-col"
                >
                    {/* Header / Close */}
                    <div className="flex justify-between items-center px-6 md:px-12 py-8">
                        <span className="font-mono text-sm uppercase tracking-widest text-gray-500">Inquiry</span>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X size={32} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-center px-6 md:px-12 overflow-y-auto">
                        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
                            <div className="md:w-1/2">
                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 leading-[0.9]"
                                >
                                    LET'S TALK.
                                </motion.h2>
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-xl md:text-2xl text-gray-500 font-light mb-16"
                                >
                                    Tell us about your vision. We're ready to build.
                                </motion.p>
                            </div>

                            <div className="md:w-1/2">
                                {/* Form */}
                                <motion.form
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="flex flex-col gap-8"
                                    onSubmit={(e) => e.preventDefault()}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Name</label>
                                            <input type="text" placeholder="John Doe" className="border-b border-gray-300 py-4 text-xl outline-none focus:border-black transition-colors bg-transparent placeholder-gray-200" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email</label>
                                            <input type="email" placeholder="john@example.com" className="border-b border-gray-300 py-4 text-xl outline-none focus:border-black transition-colors bg-transparent placeholder-gray-200" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Message</label>
                                        <textarea placeholder="Tell us about your project..." className="border-b border-gray-300 py-4 text-xl outline-none focus:border-black transition-colors bg-transparent placeholder-gray-200 min-h-[100px] resize-none" />
                                    </div>

                                    <div className="flex justify-end mt-8">
                                        <button className="px-10 py-4 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-all hover:scale-105">
                                            SEND MESSAGE
                                        </button>
                                    </div>
                                </motion.form>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
