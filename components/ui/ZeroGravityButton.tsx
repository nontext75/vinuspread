'use client';

import { useRef, useEffect } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ZeroGravityButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode;
    className?: string;
}

export default function ZeroGravityButton({ children, className, onClick, ...props }: ZeroGravityButtonProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Ripple Logic
    const ripples = useRef<{ x: number; y: number; radius: number; opacity: number }[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ripples.current.forEach((ripple, index) => {
                ripple.radius += 2; // Expand speed
                ripple.opacity -= 0.02; // Fade speed

                ctx.beginPath();
                ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity})`;
                ctx.lineWidth = 2;
                ctx.stroke();

                if (ripple.opacity <= 0) {
                    ripples.current.splice(index, 1);
                }
            });

            if (ripples.current.length > 0) {
                animationId = requestAnimationFrame(animate);
            }
        };

        animate();

        return () => cancelAnimationFrame(animationId);
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Add Ripple
        ripples.current.push({ x, y, radius: 0, opacity: 1 });

        // Trigger Canvas Animation if stopped
        const canvas = canvasRef.current;
        if (canvas) {
            // Re-trigger animation loop logic if needed, simplify by always running loop?
            // Or just simpler: standard canvas loop.
            // For efficiency, run loop only when ripples exist.
            // Re-run useEffect logic? No, let's keep it simple.
            // Move loop outside?
            // Actually, in React, just ensure the loop keeps running or restarts.

            // Simplified: Just restart loop logic here
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const run = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    let active = false;
                    ripples.current.forEach((r, i) => {
                        r.radius += 4; // Faster expansion
                        r.opacity -= 0.02;
                        if (r.opacity > 0) {
                            ctx.beginPath();
                            ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
                            ctx.strokeStyle = `rgba(255, 255, 255, ${r.opacity})`;
                            ctx.lineWidth = 2; // Thicker ring
                            ctx.stroke();
                            active = true;
                        } else {
                            ripples.current.splice(i, 1);
                        }
                    });
                    if (active) requestAnimationFrame(run);
                }
                run();
            }
        }

        if (onClick) onClick(e);
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            className={cn(
                "relative overflow-hidden group bg-white text-black px-8 py-4 rounded-full font-bold tracking-widest uppercase text-sm",
                "hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow duration-500",
                className
            )}
            onClick={handleClick}
            {...props}
        >
            {/* Glow / Gradient Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer" />

            <span className="relative z-10">{children}</span>

            {/* Ripple Canvas Overlay */}
            <canvas
                ref={canvasRef}
                width={300} // Enough for button
                height={100}
                className="absolute inset-0 pointer-events-none z-20"
            />
        </motion.button>
    );
}
