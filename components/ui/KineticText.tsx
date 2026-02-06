'use client';

import { useRef } from 'react';
import {
    motion,
    useScroll,
    useVelocity,
    useTransform,
    useSpring,
} from 'framer-motion';
import { cn } from '@/lib/utils';

interface KineticTextProps {
    children: string;
    className?: string;
    baseVelocity?: number;
}

export default function KineticText({
    children,
    className,
    baseVelocity = 100
}: KineticTextProps) {
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    // Skew based on scroll velocity
    // Velocity is usually between -1000 and 1000 or more depending on scroll speed.
    // We Map velocity to a skew angle (deg).
    // e.g., 1000 -> 5deg, -1000 -> -5deg
    const skewX = useTransform(smoothVelocity, [-1000, 1000], [-5, 5]);

    // Also maybe slight x movement? The requirement specified "Skew effect".
    // "scroll-velocity 기반의 기울기(Skew) 효과 적용"

    return (
        <span className={cn("inline-block overflow-hidden", className)}>
            <motion.span
                style={{ skewX }}
                className="inline-block origin-bottom"
            >
                {children}
            </motion.span>
        </span>
    );
}
