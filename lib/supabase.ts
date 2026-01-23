import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

export function createClient() {
    // Check if env vars are present to avoid crash
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
        throw new Error("Supabase URL or Key missing");
    }

    return createSupabaseClient<Database>(url, key);
}
