'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export default function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <header className={cn(
                "fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 py-4 md:px-12 md:py-6 flex justify-between items-center",
                scrolled ? "bg-transparent py-4" : "bg-transparent border-none shadow-none backdrop-blur-none"
            )}>
                <Link href="/" className="text-2xl font-black tracking-tighter uppercase z-50 hover:text-primary transition-colors duration-300 mix-blend-difference text-white">
                    VINUSPREAD
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-10 items-center mix-blend-difference text-white">
                    {['Work', 'Agency', 'News', 'Contact'].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm font-bold uppercase tracking-[0.2em] text-white/80 hover:text-primary relative group transition-colors duration-300"
                        >
                            {item}
                            <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
                        </Link>
                    ))}
                </nav>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden flex flex-col gap-1.5 z-50 p-2 group mix-blend-difference text-white"
                >
                    <span className={cn("w-8 h-[2px] bg-white transition-all duration-300 group-hover:bg-primary", menuOpen && "rotate-45 translate-y-2.5")} />
                    <span className={cn("w-8 h-[2px] bg-white transition-all duration-300 group-hover:bg-primary", menuOpen && "opacity-0")} />
                    <span className={cn("w-8 h-[2px] bg-white transition-all duration-300 group-hover:bg-primary", menuOpen && "-rotate-45 -translate-y-2.5")} />
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={cn(
                "fixed inset-0 bg-background z-40 flex flex-col justify-center items-center gap-8 transition-all duration-500 ease-in-out md:hidden backdrop-blur-3xl",
                menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
            )}>
                {['Work', 'Agency', 'News', 'Contact'].map((item, i) => (
                    <Link
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        onClick={() => setMenuOpen(false)}
                        className="text-5xl font-black uppercase tracking-tighter text-white hover:text-primary transition-all duration-300 transform translate-y-8 opacity-0"
                        style={{
                            transitionDelay: menuOpen ? `${i * 100}ms` : '0ms',
                            transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                            opacity: menuOpen ? 1 : 0
                        }}
                    >
                        {item}
                    </Link>
                ))}
            </div>
        </>
    )
}
