'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { Database } from '@/types/database';
import TiptapEditor from '@/components/admin/TiptapEditor';

type ProjectInsert = Database['public']['Tables']['projects']['Insert'];

export default function WriteWorkPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!id);

    const [form, setForm] = useState<ProjectInsert>({
        title: '',
        category: 'WEB',
        year: new Date().getFullYear().toString(),
        description: '',
        content: '',
        sort_order: 0,
        image: null
    });

    useEffect(() => {
        if (id) {
            fetchProject(id);
        }
    }, [id]);

    const fetchProject = async (projectId: string) => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('id', projectId)
                .single();

            if (error) throw error;
            if (data) {
                setForm({
                    title: data.title,
                    category: data.category,
                    year: data.year,
                    description: data.description,
                    content: data.content,
                    sort_order: data.sort_order,
                    image: data.image
                });
            }
        } catch (error) {
            console.error('Error fetching project:', error);
        } finally {
            setFetching(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (id) {
                const { error } = await supabase
                    .from('projects')
                    .update(form)
                    .eq('id', id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('projects')
                    .insert(form);
                if (error) throw error;
            }
            router.push('/admin/works');
            router.refresh();
        } catch (error) {
            console.error('Error saving project:', error);
            alert('Failed to save project');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="animate-spin text-gray-400" size={32} />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/works" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <ArrowLeft size={20} className="text-gray-500" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight">{id ? 'Edit Project' : 'New Project'}</h1>
                        <p className="text-sm text-gray-400">Add a new portfolio piece.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center gap-2 bg-black text-white px-8 py-3 rounded-2xl font-bold hover:bg-gray-800 transition-all disabled:opacity-50"
                    >
                        {loading && <Loader2 size={18} className="animate-spin" />}
                        <span>{id ? 'Update Project' : 'Add Project'}</span>
                    </button>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50 space-y-8">
                <div>
                    <label className="block text-sm font-bold text-gray-600 mb-2">Project Title</label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full text-2xl font-bold border-b border-gray-100 py-2 focus:outline-none focus:border-black transition-colors placeholder:text-gray-300"
                        placeholder="Enter project name..."
                        required
                    />
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-2">Category</label>
                        <select
                            value={form.category || 'WEB'}
                            onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                            className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 font-bold text-gray-700 focus:ring-0"
                        >
                            <option value="WEB">WEB</option>
                            <option value="MOBILE">MOBILE</option>
                            <option value="CHARACTER">CHARACTER</option>
                            <option value="PDP">PDP</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-2">Year</label>
                        <input
                            type="text"
                            value={form.year || ''}
                            onChange={(e) => setForm({ ...form, year: e.target.value })}
                            className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 font-bold text-gray-700 focus:ring-0"
                            placeholder="e.g. 2024"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-2">Sort Order</label>
                        <input
                            type="number"
                            value={form.sort_order || 0}
                            onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) })}
                            className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 font-bold text-gray-700 focus:ring-0"
                        />
                    </div>
                </div>

                {/* Main Image Placeholder */}
                <div>
                    <label className="block text-sm font-bold text-gray-600 mb-2">Main Image</label>
                    <div className="w-full h-48 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 group hover:border-black/20 hover:bg-gray-50/50 transition-colors cursor-pointer">
                        <div className="p-4 bg-white rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform">
                            <ImageIcon size={24} />
                        </div>
                        <span className="text-xs font-bold">Click to upload (Coming Soon)</span>
                    </div>
                    <input
                        type="hidden"
                        value={form.image || ''}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-600 mb-2">Description (Brief)</label>
                    <textarea
                        value={form.description || ''}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 min-h-[100px] resize-none focus:ring-1 focus:ring-gray-200"
                        placeholder="Short description for list view..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-600 mb-2">Case Study Content</label>
                    <TiptapEditor
                        content={form.content || ''}
                        onChange={(html) => setForm({ ...form, content: html })}
                    />
                </div>
            </form>
        </div>
    );
}
