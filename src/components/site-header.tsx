"use client";

import { useEffect, useState } from "react";

export function SiteHeader() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const update = () => {
      const element = document.elementFromPoint(window.innerWidth / 2, 90);
      const section = element?.closest("[data-header-theme]");
      setIsLight(section?.getAttribute("data-header-theme") === "light");
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const colorClass = isLight
    ? "text-[#111217]/78 [text-shadow:0_1px_18px_rgba(255,255,255,.8)]"
    : "text-white/82 [text-shadow:0_1px_18px_rgba(0,0,0,.35)]";

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between px-5 text-sm md:px-12">
      <a className={`font-semibold tracking-tight transition-colors duration-300 ${colorClass}`} href="#">
        vinuspread
      </a>
      <nav className={`hidden items-center gap-8 transition-colors duration-300 md:flex ${colorClass}`}>
        <a href="#work">experience</a>
        <a href="#services">services</a>
        <a href="#lab">lab</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
