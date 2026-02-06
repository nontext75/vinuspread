'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Briefcase,
    Edit3,
    Trash2,
    Loader2
} from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Database } from '@/types/database';

type Project = Database['public']['Tables']['projects']['Row'];

export default function AdminWorksPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('sort_order', { ascending: true }) // Sort by order for works
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProjects(data || []);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">Works</h1>
                    <p className="text-gray-400 text-sm">Manage your portfolio projects.</p>
                </div>
                <Link href="/admin/works/write">
                    <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl font-bold hover:bg-gray-800 transition-all">
                        <Plus size={20} />
                        <span>Add Project</span>
                    </button>
                </Link>
            </header>

            {/* Filters & Search */}
            <div className="flex gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="w-full bg-white border border-gray-100 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-gray-200 shadow-sm"
                    />
                </div>
                <button className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl border border-gray-100 text-gray-600 font-bold shadow-sm">
                    <Filter size={18} />
                    <span>Filter</span>
                </button>
            </div>

            {/* Projects List */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-50 overflow-hidden min-h-[400px]">
                {loading ? (
                    <div className="flex items-center justify-center p-20 text-gray-400">
                        <Loader2 className="animate-spin" size={32} />
                    </div>
                ) : projects.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-20 text-center text-gray-400">
                        <p className="text-lg font-bold mb-2">No projects yet</p>
                        <p className="text-sm">Add your first project to get started.</p>
                    </div>
                ) : (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-50">
                                <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Title</th>
                                <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
                                <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Year</th>
                                <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Order</th>
                                <th className="px-8 py-5 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {projects.map((project) => (
                                <tr key={project.id} className="hover:bg-gray-50/30 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            {/* Thumbnail placeholder */}
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                                {project.image ? (
                                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Briefcase size={16} className="text-gray-300" />
                                                )}
                                            </div>
                                            <span className="font-bold text-gray-900 group-hover:text-black transition-colors">{project.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-sm text-gray-500 font-medium">{project.category}</td>
                                    <td className="px-8 py-5 text-sm text-gray-500 font-medium">{project.year}</td>
                                    <td className="px-8 py-5 text-sm text-gray-500 font-medium">#{project.sort_order}</td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/admin/works/write?id=${project.id}`}>
                                                <button className="p-2 text-gray-400 hover:text-black transition-colors">
                                                    <Edit3 size={18} />
                                                </button>
                                            </Link>
                                            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-black transition-colors">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
