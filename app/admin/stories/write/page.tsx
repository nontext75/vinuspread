'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Database } from '@/types/database';
import TiptapEditor from '@/components/admin/TiptapEditor';

type StoryInsert = Database['public']['Tables']['stories']['Insert'];

export default function WriteStoryPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!id);

    const [form, setForm] = useState<StoryInsert>({
        title: '',
        excerpt: '',
        category: 'INSIGHT',
        content: '',
        status: 'draft',
    });

    useEffect(() => {
        if (id) {
            fetchStory(id);
        }
    }, [id]);

    const fetchStory = async (storyId: string) => {
        try {
            const { data, error } = await supabase
                .from('stories')
                .select('*')
                .eq('id', storyId)
                .single();

            if (error) throw error;
            if (data) {
                setForm({
                    title: data.title,
                    excerpt: data.excerpt,
                    category: data.category,
                    content: data.content,
                    status: data.status,
                });
            }
        } catch (error) {
            console.error('Error fetching story:', error);
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
                    .from('stories')
                    .update(form)
                    .eq('id', id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('stories')
                    .insert(form);
                if (error) throw error;
            }
            router.push('/admin/stories');
            router.refresh();
        } catch (error) {
            console.error('Error saving story:', error);
            alert('Failed to save story');
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
                    <Link href="/admin/stories" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <ArrowLeft size={20} className="text-gray-500" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight">{id ? 'Edit Story' : 'New Story'}</h1>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, status: 'draft' }))}
                        className="px-6 py-3 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                        Save Draft
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center gap-2 bg-black text-white px-8 py-3 rounded-2xl font-bold hover:bg-gray-800 transition-all disabled:opacity-50"
                    >
                        {loading && <Loader2 size={18} className="animate-spin" />}
                        <span>{id ? 'Update' : 'Publish'}</span>
                    </button>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50 space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-600 mb-2">Title</label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full text-2xl font-bold border-b border-gray-100 py-2 focus:outline-none focus:border-black transition-colors placeholder:text-gray-300"
                        placeholder="Enter story title..."
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-2">Category</label>
                        <select
                            value={form.category || 'INSIGHT'}
                            onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                            className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 font-bold text-gray-700 focus:ring-0"
                        >
                            <option value="INSIGHT">INSIGHT</option>
                            <option value="NEWS">NEWS</option>
                            <option value="CULTURE">CULTURE</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-600 mb-2">Excerpt</label>
                    <textarea
                        value={form.excerpt || ''}
                        onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                        className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 min-h-[100px] resize-none focus:ring-1 focus:ring-gray-200"
                        placeholder="Brief summary for the card preview..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-600 mb-2">Content</label>
                    <TiptapEditor
                        content={form.content || ''}
                        onChange={(html) => setForm({ ...form, content: html })}
                    />
                </div>
            </form>
        </div>
    );
}
