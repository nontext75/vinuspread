"use client";

import { useEffect, useLayoutEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

function MagneticButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const btnRef = useRef<HTMLDivElement>(null);
  const reduceMotion = true;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.45 });

  useEffect(() => {
    if (!reduceMotion) return;
    x.set(0);
    y.set(0);
  }, [reduceMotion, x, y]);

  const handlePointerMove = (event: React.PointerEvent) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.24);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.24);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="inline-block" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      <motion.div
        ref={btnRef}
        style={{ x: springX, y: springY }}
        className={`will-change-transform ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPresent, setMenuPresent] = useState(false);
  const [onDarkBackground, setOnDarkBackground] = useState(
    () => pathname === "/" || (pathname.startsWith("/work/") && pathname !== "/work"),
  );
  const reduceMotion = true;
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const routeStartsOnDark = pathname === "/" || (pathname.startsWith("/work/") && pathname !== "/work");
    let frame = 0;

    const syncTheme = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-header-theme]"));

        if (sections.length === 0) {
          setOnDarkBackground(routeStartsOnDark);
          return;
        }

        const probeY = 48;
        const activeSection = sections.find((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= probeY && rect.bottom > probeY;
        });

        const isDark = activeSection?.dataset.headerTheme === "dark";
        document.documentElement.dataset.headerOnDark = isDark ? "true" : "false";
        setOnDarkBackground(isDark);
      });
    };

    syncTheme();
    const themeInterval = window.setInterval(syncTheme, 160);
    window.addEventListener("scroll", syncTheme, { passive: true });
    document.addEventListener("scroll", syncTheme, { passive: true, capture: true });
    window.addEventListener("resize", syncTheme, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(themeInterval);
      window.removeEventListener("scroll", syncTheme);
      document.removeEventListener("scroll", syncTheme, { capture: true });
      window.removeEventListener("resize", syncTheme);
    };
  }, [pathname]);

  useEffect(() => {
    if (!menuPresent) return;

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const menuTrigger = menuButtonRef.current;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const bodyPaddingRight = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;
    const focusFrame = requestAnimationFrame(() => closeButtonRef.current?.focus({ preventScroll: true }));

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${bodyPaddingRight + scrollbarWidth}px`;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(
        menuOverlayRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true");

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;

      const focusTarget = previousFocus && document.contains(previousFocus) ? previousFocus : menuTrigger;
      focusTarget?.focus({ preventScroll: true });
    };
  }, [menuPresent]);

  const navItems = [
    { label: "Experience", href: "/work" },
    { label: "Studio", href: "/studio" },
    { label: "Story", href: "/news" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Floating Header */}
      <header
        aria-hidden={menuPresent}
        className={`site-header fixed inset-x-0 top-0 z-40 transition-colors duration-200 motion-reduce:transition-none ${onDarkBackground ? "text-white" : "text-vinus-ink"}`}
      >
        <div className="flex h-[72px] w-full items-center justify-between px-5 md:px-10 xl:h-[88px] xl:px-16">
          <Link href="/" className="relative flex h-6 w-[107px] shrink-0 items-center md:h-9 md:w-40" aria-label="Vinuspread home">
            <span className="site-logo-light absolute inset-0">
              <BrandLogo tone="light" priority className="h-6 w-[107px] md:h-9 md:w-40" />
            </span>
            <span className="site-logo-dark absolute inset-0">
              <BrandLogo tone="dark" priority className="h-6 w-[107px] md:h-9 md:w-40" />
            </span>
          </Link>

          <div className="flex items-center gap-6 md:gap-[54px]">
            <nav className="body-md hidden items-center gap-8 font-medium xl:gap-[25px] md:flex">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex min-h-10 items-center justify-center transition-opacity duration-200 hover:opacity-60 motion-reduce:transition-none ${isActive ? "opacity-100" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <MagneticButton>
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => {
                  setMenuPresent(true);
                  setMenuOpen(true);
                }}
                aria-expanded={menuPresent}
                aria-controls="site-menu-overlay"
                aria-haspopup="dialog"
                className={`site-menu-button group flex h-10 items-center gap-2 rounded-full px-4 py-2 transition-opacity duration-200 hover:opacity-70 active:scale-[0.97] motion-reduce:transform-none motion-reduce:transition-none ${onDarkBackground ? "bg-white text-vinus-ink" : "bg-vinus-ink text-white"}`}
              >
                <span className="label-sm font-medium">Menu</span>
                <Menu className="size-3 transition-transform group-hover:rotate-90 motion-reduce:transform-none motion-reduce:transition-none" />
              </button>
            </MagneticButton>
          </div>
        </div>
      </header>

      {/* Overlay Menu */}
      <AnimatePresence onExitComplete={() => setMenuPresent(false)}>
        {menuOpen && (
          <motion.div
            ref={menuOverlayRef}
            id="site-menu-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-vinus-ink text-vinus-white"
          >
            <div className="flex h-[72px] shrink-0 items-center justify-between px-5 md:px-10 xl:h-[88px] xl:px-16">
              <Link href="/" onClick={() => setMenuOpen(false)} className="relative flex h-6 w-[107px] shrink-0 items-center md:h-9 md:w-40" aria-label="Vinuspread home">
                <BrandLogo tone="light" priority className="h-6 w-[107px] md:h-9 md:w-40" />
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex size-11 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-vinus-ink active:scale-[0.97] motion-reduce:transform-none motion-reduce:transition-none"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="my-auto flex flex-col gap-[var(--space-compact)] px-6 md:px-[var(--space-edge)]">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.label}
                    initial={reduceMotion ? false : { y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={reduceMotion ? { duration: 0 } : { delay: 0.1 + index * 0.08, duration: 0.6 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`heading-page block min-w-11 font-normal uppercase transition-transform duration-300 hover:translate-x-4 motion-reduce:transform-none motion-reduce:transition-none ${
                        isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="label-sm mx-[var(--space-compact)] mb-[var(--space-content)] flex flex-col justify-between gap-[var(--space-compact)] border-t border-white/10 pt-[var(--space-compact)] opacity-60 md:mx-[var(--space-edge)] md:flex-row">
              <p className="label-sm">Product Management &amp; Design Studio - Seoul, Korea</p>
              <a href="mailto:vinus@vinus.co.kr" className="label-sm text-white hover:underline">
                vinus@vinus.co.kr
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
