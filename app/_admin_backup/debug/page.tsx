'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export default function DebugPage() {
    const [status, setStatus] = useState('Checking DB...');
    const [projectResult, setProjectResult] = useState<any>(null);
    const [storyResult, setStoryResult] = useState<any>(null);
    const supabase = createClient();

    useEffect(() => {
        checkDB();
    }, []);

    const checkDB = async () => {
        // Check Projects
        const { data: projects, error: pError } = await supabase.from('projects').select('*');
        setProjectResult({ data: projects, error: pError });

        // Check Stories
        const { data: stories, error: sError } = await supabase.from('stories').select('*');
        setStoryResult({ data: stories, error: sError });

        setStatus('Check Complete.');
    };

    return (
        <div className="p-10 font-mono text-sm space-y-8">
            <h1 className="text-2xl font-bold">Database Debugger</h1>

            <div className="p-4 border rounded bg-gray-50">
                <h2 className="font-bold mb-2">Projects Table</h2>
                {projectResult?.error ? (
                    <p className="text-red-600 font-bold">ERROR: {JSON.stringify(projectResult.error)}</p>
                ) : (
                    <div>
                        <p className="text-green-600 font-bold mb-2">Count: {projectResult?.data?.length || 0}</p>
                        <pre className="bg-white p-2 border overflow-auto max-h-40">
                            {JSON.stringify(projectResult?.data?.slice(0, 2), null, 2)}
                        </pre>
                    </div>
                )}
            </div>

            <div className="p-4 border rounded bg-gray-50">
                <h2 className="font-bold mb-2">Stories Table</h2>
                {storyResult?.error ? (
                    <p className="text-red-600 font-bold">ERROR: {JSON.stringify(storyResult.error)}</p>
                ) : (
                    <div>
                        <p className="text-green-600 font-bold mb-2">Count: {storyResult?.data?.length || 0}</p>
                        <pre className="bg-white p-2 border overflow-auto max-h-40">
                            {JSON.stringify(storyResult?.data?.slice(0, 2), null, 2)}
                        </pre>
                    </div>
                )}
            </div>

            <button onClick={checkDB} className="bg-blue-500 text-white px-4 py-2 rounded">
                Re-Check
            </button>
        </div>
    );
}
