'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PhysicsCardProps extends HTMLMotionProps<'div'> {
    children: ReactNode;
    className?: string;
    disableFloat?: boolean;
}

export default function PhysicsCard({
    children,
    className,
    disableFloat = false,
    ...props
}: PhysicsCardProps) {
    return (
        <motion.div
            className={cn("bg-transparent", className)}
            whileHover={!disableFloat ? {
                y: -15,
                boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
                transition: { type: "spring", stiffness: 300, damping: 20 }
            } : undefined}
            {...props}
        >
            {children}
        </motion.div>
    );
}
