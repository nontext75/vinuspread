'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AtmosphericBackground() {
    const { scrollY } = useScroll();
    const [pageHeight, setPageHeight] = useState(1000);
    const [stars, setStars] = useState<{ slow: any[], fast: any[] }>({ slow: [], fast: [] });

    useEffect(() => {
        setPageHeight(document.body.scrollHeight);

        // Generate random stars on client side only to avoid hydration mismatch
        const generateStars = (count: number) => Array.from({ length: count }).map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.3 + 0.05
        }));

        setStars({
            slow: generateStars(15),
            fast: generateStars(25) // More stars for depth
        });
    }, []);

    // Filter Effects
    // Top(0px): blur(0px), brightness(100%)
    // Scroll(500px): blur(15px), brightness(40%)
    const blur = useTransform(scrollY, [0, 500], ["blur(0px)", "blur(15px)"]);
    const brightness = useTransform(scrollY, [0, 500], ["brightness(100%)", "brightness(40%)"]);

    // Opacity Fade Out (Hero Only)
    // Fade out completely by 800px (approx end of Hero)
    const containerOpacity = useTransform(scrollY, [0, 800], [1, 0]);

    // Parallax Dots
    // Faster dots (Foreground)
    const y1 = useTransform(scrollY, [0, 1000], [0, -300]);
    // Slower dots (Background)
    const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

    useEffect(() => {
        setPageHeight(document.body.scrollHeight);
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-neutral-950">
            {/* Atmospheric Layer */}
            <motion.div
                className="absolute inset-0 transition-will-change"
                style={{
                    filter: useTransform(() => `${blur.get()} ${brightness.get()}`), // Combine filters
                    opacity: containerOpacity // Apply fade out
                }}
            >
                {/* Base Gradient or Texture */}
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-black opacity-80" />
            </motion.div>

            {/* Parallax Stars/Dots Layer 1 (Slow) */}
            <motion.div style={{ y: y2 }} className="absolute inset-0">
                {/* Randomly generated subtle stars */}
                {[...Array(15)].map((_, i) => (
                    <div
                        key={`star-slow-${i}`}
                        className="absolute bg-white rounded-full opacity-20"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 2 + 1}px`,
                            height: `${Math.random() * 2 + 1}px`,
                            opacity: Math.random() * 0.3 + 0.1
                        }}
                    />
                ))}
            </motion.div>

            {/* Parallax Stars/Dots Layer 2 (Fast) */}
            <motion.div style={{ y: y1 }} className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={`star-fast-${i}`}
                        className="absolute bg-white rounded-full opacity-30"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 1.5 + 0.5}px`,
                            height: `${Math.random() * 1.5 + 0.5}px`,
                            opacity: Math.random() * 0.4 + 0.1
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
}
