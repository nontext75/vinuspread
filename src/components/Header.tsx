"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

function MagneticButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const btnRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    const btn = btnRef.current;
    if (!btn) return;
    gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <div className="inline-block" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div ref={btnRef} className={`will-change-transform ${className}`}>
        {children}
      </div>
    </div>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [onDarkBackground, setOnDarkBackground] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const updateTheme = () => {
      const probeY = 48;
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-header-theme]"));
      const activeSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= probeY && rect.bottom > probeY;
      });
      setOnDarkBackground(activeSection?.dataset.headerTheme === "dark");
    };

    updateTheme();
    window.addEventListener("scroll", updateTheme, { passive: true });
    window.addEventListener("resize", updateTheme);
    return () => {
      window.removeEventListener("scroll", updateTheme);
      window.removeEventListener("resize", updateTheme);
    };
  }, [pathname]);

  const navItems = [
    { label: "Experience", href: "/work" },
    { label: "Studio", href: "/studio" },
    { label: "Story", href: "/news" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Floating Header */}
      <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-200 ${onDarkBackground ? "text-white" : "text-[#0d0d0d]"}`}>
        <div className="w-full px-6 md:px-16 h-24 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            vinuspread
          </Link>

          <div className="flex items-center gap-8">
            <nav className="hidden items-center gap-7 text-base font-medium md:flex">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`hover:opacity-60 transition-opacity pb-1 border-b ${
                      isActive ? "border-current" : "border-transparent"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <MagneticButton>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="group flex items-center gap-3 rounded-full border border-current px-5 py-2.5 transition-colors hover:opacity-60"
              >
                <span className="text-xs uppercase tracking-widest font-medium">Menu</span>
                <Menu className="size-4 transition-transform group-hover:rotate-90" />
              </button>
            </MagneticButton>
          </div>
        </div>
      </header>

      {/* Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0d0d0d] text-[#ffffff]"
          >
            <div className="flex h-24 shrink-0 items-center justify-between px-6 md:px-16">
              <Link href="/" onClick={() => setMenuOpen(false)} className="text-xl font-semibold tracking-tight">
                vinuspread
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex size-10 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-[#0d0d0d]"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="my-auto flex flex-col gap-6 px-6 md:px-16">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.08, duration: 0.6 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block text-[clamp(3.5rem,9vw,8rem)] font-light leading-none uppercase hover:translate-x-4 transition-transform duration-300 ${
                        isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="mx-6 mb-8 flex flex-col justify-between gap-6 border-t border-white/10 pt-8 text-sm opacity-60 md:mx-16 md:mb-12 md:flex-row">
              <p>Product Management &amp; Design Studio — Seoul, Korea</p>
              <a href="mailto:vinus@vinus.co.kr" className="hover:underline text-white">
                vinus@vinus.co.kr
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
