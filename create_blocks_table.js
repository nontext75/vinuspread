const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = 'https://qsdrlwqmvtcczykginoz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzZHJsd3FtdnRjY3p5a2dpbm96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNDgzNjAsImV4cCI6MjA4NDcyNDM2MH0.XzFgNoty5BRpSIBVbfzhOL56f8wp-DGM0QHkjMpHkqE';
const supabase = createClient(supabaseUrl, supabaseKey);

async function createBlocksTable() {
    console.log('Creating blocks table...');

    // SQL to create the table
    const sql = `
        CREATE TABLE IF NOT EXISTS public.blocks (
            id text PRIMARY KEY,
            type text NOT NULL,
            sort_order integer DEFAULT 0,
            data jsonb DEFAULT '{}'::jsonb,
            created_at timestamp within time zone DEFAULT now(),
            updated_at timestamp within time zone DEFAULT now()
        );
    `;

    // Execute SQL via RPC if available, or error if we can't direct SQL.
    // Supabase JS client doesn't support raw SQL directly without an RPC function usually.
    // But we can try to use a different approach or assume the user has an RPC for this, 
    // OR we can try to use the 'pg' library if available.
    // 'pg' is not in package.json.

    // Alternative: We can't easily create tables via supabase-js client unless we have a specific function.
    // HOWEVER, the user asked to "Connect to OpenCode". The goal is to get OpenCode working.
    // The `cleanup_data.js` script failing is a side effect of me trying to demonstrate "tool usage".
    // Maybe I should just skip the `blocks` part of cleanup_data.js?

    console.log("Supabase JS client cannot create tables directly without RPC.");
    console.log("Skipping table creation. Please use Supabase Dashboard SQL Editor.");

    // Actually, checking package.json again...
    // We have nothing to run raw SQL.
    // So I will modify cleanup_data.js to gracefully handle missing table and NOT crash.
}

createBlocksTable();
