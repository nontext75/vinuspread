'use client';

import { MotionConfig } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PerformanceGuard({ children }: { children: React.ReactNode }) {
    const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

    useEffect(() => {
        // Check for reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setShouldReduceMotion(mediaQuery.matches);

        const handleChange = () => setShouldReduceMotion(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <MotionConfig reducedMotion={shouldReduceMotion ? "always" : "user"}>
            {children}
        </MotionConfig>
    );
}
