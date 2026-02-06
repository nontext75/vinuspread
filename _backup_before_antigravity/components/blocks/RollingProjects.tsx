"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RECENTS = [
    { id: 1, title: 'Shinhan Easy', category: 'Financial Edu Platform' },
    { id: 2, title: 'SAMSUNG Medical Hospital Center', category: 'Mobile Application' },
    { id: 3, title: 'Daekyo New Chinese Character', category: 'Application' },
];

const RollingProjects = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % RECENTS.length);
        }, 4000); // 4 seconds for readability

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col gap-3 relative overflow-visible w-96">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                Recent Works
            </span>
            <div className="relative h-20 w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={RECENTS[index].id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 20, opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute inset-0 flex flex-col justify-center items-start gap-1"
                    >
                        <h3 className="text-xl font-bold text-white tracking-tight uppercase leading-none">
                            {RECENTS[index].title}
                        </h3>
                        <span className="text-xl font-bold text-white tracking-tight uppercase leading-none">
                            {RECENTS[index].category}
                        </span>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default RollingProjects;
