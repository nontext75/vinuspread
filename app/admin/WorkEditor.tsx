'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Image as ImageIcon, Plus, Trash2, Layout, Type, Layers } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/types/database';

// 🧞‍♀️ Jinni's Note: This is the scaffold for the new Admin Work Editor! 
// It will allow managing the complex fields required for the Ultimate Master Template.

type Project = Database['public']['Tables']['projects']['Row'];

export default function WorkEditor({ projectId }: { projectId?: string }) {
    const [project, setProject] = useState<Partial<Project>>({
        title: '',
        category: 'WEB',
        year: new Date().getFullYear().toString(),
        description: '',
        content: '[]',
        image: '',
        motion_type: 'default'
    });

    // Future: Add state for extra fields like "Tech Specs", "Gallery Images", "Quote" 
    // which might need to be stored in a JSON column or separate tables.

    // For now, this is a placeholder to show I'm ready to build it!

    return (
        <div className="p-6 bg-zinc-900 min-h-screen text-white">
            <header className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-3xl font-bold uppercase tracking-tight">Work Editor</h1>
                    <p className="text-zinc-500 text-sm">Manage Ultimate Master Template Content</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all rounded-sm">
                    <Save size={16} />
                    <span>Save Project</span>
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info */}
                    <section className="bg-black p-8 rounded-sm border border-white/5 space-y-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Type size={20} className="text-zinc-500" />
                            Basic Information
                        </h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2 col-span-2">
                                <label className="text-xs uppercase font-bold text-zinc-500">Project Title</label>
                                <input
                                    type="text"
                                    className="w-full bg-zinc-900 border border-white/10 p-4 rounded-sm focus:border-white/30 outline-none text-xl font-bold"
                                    placeholder="PROJECT NAME"
                                    value={project.title}
                                    onChange={(e) => setProject({ ...project, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-zinc-500">Category</label>
                                <select
                                    className="w-full bg-zinc-900 border border-white/10 p-3 rounded-sm focus:border-white/30 outline-none"
                                    value={project.category || 'WEB'}
                                    onChange={(e) => setProject({ ...project, category: e.target.value as any })}
                                >
                                    <option value="WEB">WEB</option>
                                    <option value="MOBILE">MOBILE</option>
                                    <option value="CHARACTER">CHARACTER</option>
                                    <option value="PDP">PDP</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-zinc-500">Year</label>
                                <input
                                    type="text"
                                    className="w-full bg-zinc-900 border border-white/10 p-3 rounded-sm focus:border-white/30 outline-none"
                                    value={project.year || ''}
                                    onChange={(e) => setProject({ ...project, year: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-zinc-500">Description (Intro)</label>
                            <textarea
                                className="w-full bg-zinc-900 border border-white/10 p-4 rounded-sm focus:border-white/30 outline-none h-32 resize-none leading-relaxed"
                                placeholder="Project description for the intro block..."
                                value={project.description || ''}
                                onChange={(e) => setProject({ ...project, description: e.target.value })}
                            />
                        </div>
                    </section>

                    {/* Content Blocks (Placeholder for where the rich editor would go) */}
                    <section className="bg-black p-8 rounded-sm border border-white/5 space-y-6 opacity-50 pointer-events-none">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Layout size={20} className="text-zinc-500" />
                            Content Blocks (In Development)
                        </h2>
                        <div className="h-64 flex items-center justify-center border-2 border-dashed border-zinc-800 rounded-sm">
                            <span className="text-zinc-600 uppercase tracking-widest text-xs">Rich Text / Block Editor Area</span>
                        </div>
                    </section>
                </div>

                {/* Sidebar (Meta & Media) */}
                <div className="space-y-8">
                    {/* Media */}
                    <section className="bg-black p-6 rounded-sm border border-white/5 space-y-6">
                        <h2 className="text-lg font-bold flex items-center gap-2">
                            <ImageIcon size={18} className="text-zinc-500" />
                            Media Assets
                        </h2>
                        <div className="space-y-4">
                            <div className="aspect-video bg-zinc-900 border border-white/10 rounded-sm flex items-center justify-center flex-col gap-4 hover:border-white/30 transition-colors cursor-pointer group">
                                <ImageIcon size={32} className="text-zinc-700 group-hover:text-zinc-500 transition-colors" />
                                <span className="text-[10px] uppercase font-bold text-zinc-700 group-hover:text-zinc-500">Main Hero Image</span>
                            </div>
                            <input
                                type="text"
                                className="w-full bg-zinc-900 border border-white/10 p-2 text-xs rounded-sm focus:border-white/30 outline-none"
                                placeholder="Image URL..."
                                value={project.image || ''}
                                onChange={(e) => setProject({ ...project, image: e.target.value })}
                            />
                        </div>
                    </section>

                    {/* Tech & System (JSON Editor Placeholder) */}
                    <section className="bg-black p-6 rounded-sm border border-white/5 space-y-6">
                        <h2 className="text-lg font-bold flex items-center gap-2">
                            <Layers size={18} className="text-zinc-500" />
                            Tech System Specs
                        </h2>
                        <div className="p-4 bg-zinc-900 rounded-sm font-mono text-xs text-zinc-400">
                            JSON Config: {'{ "architecture": "...", "interface": "..." }'}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
