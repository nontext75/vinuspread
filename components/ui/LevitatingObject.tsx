'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LevitatingObjectProps {
    children: React.ReactNode;
    className?: string;
    damping?: number;
    stiffness?: number;
    maxDisplacement?: number;
}

export default function LevitatingObject({
    children,
    className,
    damping = 30,
    stiffness = 200,
    maxDisplacement = 10
}: LevitatingObjectProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Physics springs
    const springConfig = { damping, stiffness };
    const x = useSpring(0, springConfig);
    const y = useSpring(0, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            // Interaction Radius (e.g., 300px)
            const radius = 300;

            if (distance < radius) {
                // Determine Push or Pull
                // If cursor is ON the element (or very close), Pull.
                // If cursor is NEAR the element, Push away slightly.

                const isHovering =
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom;

                if (isHovering) {
                    // Pull effect (Attraction)
                    // Move TOWARDS the mouse
                    const pullFactor = 0.2; // Strength of attraction
                    x.set(distanceX * pullFactor);
                    y.set(distanceY * pullFactor);
                } else {
                    // Push effect (Repulsion)
                    // Move AWAY from the mouse
                    // Force decreases as distance increases
                    const force = (radius - distance) / radius; // 0 to 1
                    const pushFactor = -maxDisplacement * force;

                    // Normalize direction
                    const dirX = distanceX / distance;
                    const dirY = distanceY / distance;

                    x.set(dirX * pushFactor * 10); // Scale factor for visible push
                    y.set(dirY * pushFactor * 10);
                }
            } else {
                // Reset
                x.set(0);
                y.set(0);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [x, y, maxDisplacement]);

    return (
        <motion.div
            ref={ref}
            style={{ x, y }}
            className={cn("relative", className)}
        >
            {children}
        </motion.div>
    );
}
