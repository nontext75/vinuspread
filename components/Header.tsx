"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const Header = () => {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }

        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    });

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 transition-colors duration-300 ${scrolled ? "bg-slate-900/80 backdrop-blur-md border-b border-slate-800" : "bg-transparent"
                }`}
        >
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <Link href="/" className="text-xl font-bold tracking-tighter text-white z-50 mix-blend-difference">
                    VINUSPREAD
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {['Work', 'Agency', 'News', 'Contact'].map((item) => (
                        <Link key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-300 hover:text-white transition-colors uppercase tracking-widest">
                            {item}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Button Placeholder - In real implementation, add a sheet/drawer */}
                <button className="md:hidden text-white">
                    <span className="sr-only">Menu</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                </button>
            </div>
        </motion.header>
    );
};

export default Header;
