"use client";

import React, { useRef, useEffect } from 'react';
import { InteractiveVisualBlockData } from '@/types/blocks';

interface InteractiveVisualBlockProps {
    data: InteractiveVisualBlockData;
}

const InteractiveVisualBlock: React.FC<InteractiveVisualBlockProps> = ({ data }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
        const particleCount = 100;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 1,
                    vy: (Math.random() - 0.5) * 1,
                    size: Math.random() * 2 + 1
                });
            }
        };

        const draw = (mouse: { x: number; y: number }) => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';

            particles.forEach(p => {
                // Mouse interaction
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const forceRange = 100;

                if (dist < forceRange) {
                    const angle = Math.atan2(dy, dx);
                    const force = (forceRange - dist) / forceRange;
                    p.vx -= Math.cos(angle) * force * 0.5;
                    p.vy -= Math.sin(angle) * force * 0.5;
                }

                p.x += p.vx;
                p.y += p.vy;

                // Friction
                p.vx *= 0.99;
                p.vy *= 0.99;

                // Bounds
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(() => draw(mouse));
        };

        window.addEventListener('resize', resize);

        // Track mouse
        let mouse = { x: -1000, y: -1000 };
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };
        canvas.addEventListener('mousemove', handleMouseMove);

        resize();
        draw(mouse);

        return () => {
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className="relative w-full h-[600px] bg-slate-950 overflow-hidden my-10">
            <canvas
                ref={canvasRef}
                className="w-full h-full"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-slate-500 text-sm tracking-widest uppercase border px-4 py-2 border-slate-800 rounded-full">
                    Interactive Visual Area
                </span>
            </div>
        </section>
    );
};

export default InteractiveVisualBlock;
