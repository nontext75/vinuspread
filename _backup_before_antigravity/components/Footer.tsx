'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ContactModal from './ContactModal';

const Footer = () => {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <footer className="bg-white text-black min-h-[50vh] flex flex-col justify-between px-6 md:px-12 py-20 relative overflow-hidden">
            {/* Contact Modal Portal */}
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50" />

            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start gap-12">
                <div className="md:w-1/2">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.9]">
                        LET'S BUILD <br />
                        <span className="">SOMETHING ICONIC.</span>
                    </h2>
                    <button
                        onClick={() => setIsContactOpen(true)}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-colors"
                    >
                        CONTACT US
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-12 md:gap-24">
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm uppercase tracking-widest mb-2 font-bold">Sitemap</h3>
                        <Link href="/" className="text-lg hover:text-slate-500 transition-colors">Home</Link>
                        <Link href="/work" className="text-lg hover:text-slate-500 transition-colors">Work</Link>
                        <Link href="/agency" className="text-lg hover:text-slate-500 transition-colors">Agency</Link>
                        {/* Contact removed from sitemap as it is now a modal action */}
                        <button onClick={() => setIsContactOpen(true)} className="text-lg hover:text-slate-500 transition-colors text-left">Contact</button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm uppercase tracking-widest mb-2 font-bold">Socials</h3>
                        <a href="#" className="flex items-center gap-1 text-lg hover:text-slate-500 transition-colors group">
                            Instagram <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <a href="#" className="flex items-center gap-1 text-lg hover:text-slate-500 transition-colors group">
                            Threads <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto w-full mt-24 flex flex-col md:flex-row justify-between items-end border-t border-slate-200 pt-8 gap-4">
                <p className="text-sm font-medium">
                    © {new Date().getFullYear()} VINUSPREAD. All rights reserved.
                </p>
                {/* <p className="text-xs font-medium">
                    Designed & Developed by VINUS Tech.
                </p> */}
            </div>
        </footer>
    );
};

export default Footer;
