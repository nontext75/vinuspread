'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Eye,
    Edit3,
    Trash2,
    Loader2
} from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Database } from '@/types/database';

type Story = Database['public']['Tables']['stories']['Row'];

export default function AdminStoriesPage() {
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        fetchStories();
    }, []);

    const fetchStories = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('stories')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setStories(data || []);
        } catch (error) {
            console.error('Error fetching stories:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">Stories</h1>
                    <p className="text-gray-400 text-sm">Manage your blog posts and announcements.</p>
                </div>
                <Link href="/admin/stories/write">
                    <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl font-bold hover:bg-gray-800 transition-all">
                        <Plus size={20} />
                        <span>Write Story</span>
                    </button>
                </Link>
            </header>

            {/* Filters & Search */}
            <div className="flex gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search stories..."
                        className="w-full bg-white border border-gray-100 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-gray-200 shadow-sm"
                    />
                </div>
                <button className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl border border-gray-100 text-gray-600 font-bold shadow-sm">
                    <Filter size={18} />
                    <span>Filter</span>
                </button>
            </div>

            {/* Stories List */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-50 overflow-hidden min-h-[400px]">
                {loading ? (
                    <div className="flex items-center justify-center p-20 text-gray-400">
                        <Loader2 className="animate-spin" size={32} />
                    </div>
                ) : stories.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-20 text-center text-gray-400">
                        <p className="text-lg font-bold mb-2">No stories yet</p>
                        <p className="text-sm">Create your first story to get started.</p>
                    </div>
                ) : (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-50">
                                <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Title</th>
                                <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
                                <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                                <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {stories.map((story) => (
                                <tr key={story.id} className="hover:bg-gray-50/30 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-900 group-hover:text-black transition-colors">{story.title}</span>
                                            <span className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                                <Eye size={12} /> {story.views || 0} views
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-sm text-gray-500 font-medium">{story.category}</td>
                                    <td className="px-8 py-5 text-sm text-gray-500 font-medium">
                                        {new Date(story.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${story.status === 'published'
                                            ? 'bg-emerald-50 text-emerald-600'
                                            : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {story.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/admin/stories/write?id=${story.id}`}>
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
