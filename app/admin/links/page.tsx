'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Layout, Database, FileText, Settings, Home } from 'lucide-react';
import Link from 'next/link';

export default function AdminLinksPage() {
    const categories = [
        {
            title: "Main Pages",
            icon: <Home className="text-blue-500" size={20} />,
            links: [
                { name: "Home (Interactive)", url: "/" },
                { name: "Work List", url: "/work" },
                { name: "Story List", url: "/story" },
            ]
        },
        {
            title: "Admin & CMS",
            icon: <Settings className="text-orange-500" size={20} />,
            links: [
                { name: "Admin Dashboard", url: "/admin" },
                { name: "Data Migration Tool", url: "/admin/migration" },
                { name: "Work Management", url: "/admin/works" },
                { name: "Story Management", url: "/admin/stories" },
            ]
        },
        {
            title: "Design References (Templates)",
            icon: <Layout className="text-purple-500" size={20} />,
            links: [
                { name: "Ref v1: Cinematic Narrative", url: "/work/reference" },
                { name: "Ref v2: Editorial Minimal", url: "/work/reference-2" },
                { name: "Ref v3: Tech-Noir Immersive", url: "/work/reference-3" },
            ]
        },
        {
            title: "Static Resources",
            icon: <FileText className="text-green-500" size={20} />,
            links: [
                { name: "Supabase Project Info", url: "https://supabase.com/dashboard" },
                { name: "Legacy Site", url: "https://vinus.co.kr" },
            ]
        }
    ];

    return (
        <main className="bg-black min-h-screen text-white pt-40 pb-20 px-6">
            <div className="max-w-4xl mx-auto space-y-16">
                <header className="space-y-4">
                    <h1 className="text-5xl font-black tracking-tighter uppercase">Project Sitemap</h1>
                    <p className="text-zinc-500 font-light">
                        개발 및 관리에 필요한 모든 주요 페이지들을 한곳에 모았습니다. <br />
                        지니와 함께 작업할 때 이곳을 시작점으로 활용해 보세요! 🧞‍♀️✨
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-zinc-900/50 border border-white/5 rounded-2xl p-8 space-y-6 hover:border-white/20 transition-all group"
                        >
                            <div className="flex items-center gap-3">
                                {cat.icon}
                                <h2 className="text-lg font-bold tracking-tight uppercase">{cat.title}</h2>
                            </div>
                            <ul className="space-y-4">
                                {cat.links.map((link, lIdx) => (
                                    <li key={lIdx}>
                                        <Link
                                            href={link.url}
                                            target={link.url.startsWith('http') ? "_blank" : "_self"}
                                            className="flex items-center justify-between text-zinc-400 hover:text-white transition-colors group/link"
                                        >
                                            <span className="text-sm font-medium">{link.name}</span>
                                            <div className="flex items-center gap-2">
                                                <code className="text-[10px] bg-white/5 px-2 py-1 rounded font-mono group-hover/link:bg-white/10 transition-colors">
                                                    {link.url}
                                                </code>
                                                <ExternalLink size={14} className="opacity-0 group-hover/link:opacity-100 transition-all translate-x-1 group-hover/link:translate-x-0" />
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                <footer className="pt-20 text-center">
                    <div className="inline-block p-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                        <div className="bg-black px-6 py-2 rounded-full">
                            <span className="text-xs font-bold tracking-widest uppercase">Vinuspread x Antigravity</span>
                        </div>
                    </div>
                </footer>
            </div>
        </main>
    );
}
