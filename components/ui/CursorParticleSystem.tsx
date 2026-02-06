'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorParticleSystem() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = { x: useMotionValue(0), y: useMotionValue(0) };

    // Smooth mouse for particles
    const smoothMouse = {
        x: useSpring(mouse.x, { damping: 25, stiffness: 200 }),
        y: useSpring(mouse.y, { damping: 25, stiffness: 200 })
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        // Resize
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        class Particle {
            x: number;
            y: number;
            originX: number;
            originY: number;
            vx: number;
            vy: number;
            size: number;
            color: string;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.originX = x;
                this.originY = y;
                this.vx = 0;
                this.vy = 0;
                this.size = Math.random() * 2 + 1;
                this.color = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`;
            }

            update(mouseX: number, mouseY: number) {
                // Antigravity Logic
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDistance = 150;
                const force = (forceDistance - distance) / forceDistance;

                if (distance < forceDistance) {
                    // Push away
                    const angle = Math.atan2(dy, dx);
                    const pushX = Math.cos(angle) * force * 15; // Power
                    const pushY = Math.sin(angle) * force * 15;
                    this.vx -= pushX;
                    this.vy -= pushY;
                }

                // Return to origin (Spring)
                const homeDx = this.originX - this.x;
                const homeDy = this.originY - this.y;

                this.vx += homeDx * 0.05; // Stiffness
                this.vy += homeDy * 0.05;

                // Friction
                this.vx *= 0.9;
                this.vy *= 0.9;

                this.x += this.vx;
                this.y += this.vy;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const cols = Math.floor(window.innerWidth / 50);
            const rows = Math.floor(window.innerHeight / 50);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    // Random offset grid
                    const x = i * 50 + Math.random() * 50;
                    const y = j * 50 + Math.random() * 50;
                    particles.push(new Particle(x, y));
                }
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const mx = mouse.x.get();
            const my = mouse.y.get();

            particles.forEach(p => {
                p.update(mx, my);
                p.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x.set(e.clientX);
            mouse.y.set(e.clientY);
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[5]"
        />
    );
}
