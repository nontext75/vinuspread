"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const IntroAnimation = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    setIsVisible(false); // Remove from DOM after animation
                    // Optional: Trigger content reveal here if needed, 
                    // but we can just let underneath content be visible
                }
            });

            tl.to(textRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.5
            })
                .to(textRef.current, {
                    opacity: 0,
                    y: -50,
                    duration: 0.8,
                    ease: "power3.in",
                    delay: 0.5
                })
                .to(containerRef.current, {
                    yPercent: -100,
                    duration: 1,
                    ease: "power4.inOut"
                })
                .set(containerRef.current, { display: "none" });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    if (!isVisible) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center pointer-events-none"
        >
            <h1
                ref={textRef}
                className="text-4xl md:text-6xl font-bold text-white tracking-tighter opacity-0 translate-y-10"
            >
                VINUSPREAD
            </h1>
        </div>
    );
};

export default IntroAnimation;
