'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function StoryDetailPage() {
    const params = useParams(); // In real app, fetch data based on params.id

    return (
        <main className="bg-black min-h-screen text-white pt-32 pb-20">
            {/* Back Link */}
            <div className="px-6 md:px-12 mb-12">
                <Link href="/story" className="inline-flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-white transition-colors">
                    <ArrowLeft size={16} />
                    BACK TO STORIES
                </Link>
            </div>

            <article className="max-w-4xl mx-auto px-6 md:px-12">
                {/* Header */}
                <header className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap gap-6 text-sm font-mono text-gray-400 mb-6"
                    >
                        <span className="flex items-center gap-2">
                            <Tag size={14} />
                            INSIGHT
                        </span>
                        <span className="flex items-center gap-2">
                            <Calendar size={14} />
                            2024.01.15
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-8"
                    >
                        Defining the New Digital Luxury in Automotive
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-full aspect-[16/9] bg-neutral-900 overflow-hidden mb-12"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000"
                            alt="Cover"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </header>

                {/* Content Body */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="prose prose-invert prose-lg md:prose-xl max-w-none font-light text-gray-300"
                >
                    <p>
                        In an era where digital touchpoints often precede physical interaction, the definition of luxury in the automotive sector is shifting. It is no longer just about the leather stitching or the engine roar; it is about the fluidity of the interface, the responsiveness of the configurator, and the immersion of the brand story online.
                    </p>
                    <p>
                        At VINUSPREAD, we believe that digital luxury is defined by **frictionless elegance**. Just as a car door should close with a reassuring thud, a website should load with a perceptible smoothness. Animations should not distract but guide. Typography should breathe.
                    </p>
                    <h3>The Role of Motion</h3>
                    <p>
                        Motion design is the new chrome. It catches the eye and conveys quality. However, unlike chrome, it serves a functional purpose. It explains spatial relationships, provides feedback, and creates a sense of continuity.
                    </p>
                    <blockquote>
                        "Luxury is attention to detail, originality, exclusivity and above all, quality." - Angelo Bonati
                    </blockquote>
                    <p>
                        We apply this philosophy to every pixel. From the micro-interaction of a button hover to the macro-transition between pages, every moment is an opportunity to reinforce the brand's premium standing.
                    </p>
                </motion.div>
            </article>
        </main>
    );
}
