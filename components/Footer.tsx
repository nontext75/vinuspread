import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-950 text-white min-h-[50vh] flex flex-col justify-between px-6 md:px-12 py-20 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent opacity-50" />

            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start gap-12">
                <div className="md:w-1/2">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">
                        Let's build <br />
                        <span className="text-slate-500">something iconic.</span>
                    </h2>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-slate-200 transition-colors"
                    >
                        Start a Project
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-12 md:gap-24">
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm uppercase tracking-widest text-slate-500 mb-2">Sitemap</h3>
                        <Link href="/" className="text-lg hover:text-slate-300 transition-colors">Home</Link>
                        <Link href="/work" className="text-lg hover:text-slate-300 transition-colors">Work</Link>
                        <Link href="/agency" className="text-lg hover:text-slate-300 transition-colors">Agency</Link>
                        <Link href="/contact" className="text-lg hover:text-slate-300 transition-colors">Contact</Link>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm uppercase tracking-widest text-slate-500 mb-2">Socials</h3>
                        <a href="#" className="flex items-center gap-1 text-lg hover:text-slate-300 transition-colors group">
                            LinkedIn <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <a href="#" className="flex items-center gap-1 text-lg hover:text-slate-300 transition-colors group">
                            Instagram <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <a href="#" className="flex items-center gap-1 text-lg hover:text-slate-300 transition-colors group">
                            Twitter <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto w-full mt-24 flex flex-col md:flex-row justify-between items-end border-t border-slate-900 pt-8 gap-4">
                <p className="text-slate-500 text-sm">
                    © {new Date().getFullYear()} VINUS SPREAD. All rights reserved.
                </p>
                <p className="text-slate-600 text-xs">
                    Designed & Developed by VINUS Tech.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
